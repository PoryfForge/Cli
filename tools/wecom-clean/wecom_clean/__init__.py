"""Remote CLI for the bundled, bounded Windows maintenance script."""

import argparse
import base64
import getpass
import hashlib
import ipaddress
import json
from pathlib import Path
import re
import sys
from datetime import datetime, timezone
import uuid
import warnings

VERSION = "1.0.0"
MODES = {"check": "Check", "clean": "CleanTemp", "memory": "TrimMemory", "self-test": "SelfTest"}


def host_value(value):
    try:
        return str(ipaddress.ip_address(value))
    except ValueError:
        pass
    labels = value.split(".")
    if (len(value) > 253 or not value or re.fullmatch(r"[\d.]+", value)
            or any(not re.fullmatch(r"[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?", x) for x in labels)):
        raise argparse.ArgumentTypeError("请输入单个 IP 或主机名，不要带 http://、端口或路径")
    return value


def bounded(low, high):
    def parse(value):
        try:
            number = int(value)
        except ValueError:
            raise argparse.ArgumentTypeError("请输入整数") from None
        if not low <= number <= high:
            raise argparse.ArgumentTypeError(f"范围必须为 {low}–{high}")
        return number
    return parse


def profile_value(value):
    if not re.fullmatch(r"[A-Za-z]:\\[^\x00-\x1f\"<>|?*:]+", value) or any(x in (".", "..") for x in value.split("\\")):
        raise argparse.ArgumentTypeError(r"请填写服务器上的绝对用户目录，例如 C:\Users\Administrator")
    return value.rstrip("\\")


def parser():
    p = argparse.ArgumentParser(description="企业微信服务器清理 CLI：默认预览，密码隐藏输入。")
    p.add_argument("--version", action="version", version=VERSION)
    commands = p.add_subparsers(dest="command", required=True)
    for name, help_text in (("check", "检查资源和旧图片"), ("clean", "清理旧临时图片"),
                            ("memory", "尝试一次临时释放内存"), ("self-test", "只操作专用测试文件")):
        sub = commands.add_parser(name, help=help_text, description=help_text)
        sub.add_argument("--host", required=True, type=host_value, help="服务器 IP 或主机名")
        sub.add_argument("--user", default="administrator", help=r"登录账号，也可使用 DOMAIN\user")
        sub.add_argument("--https", action="store_true", help="使用 HTTPS，并验证服务器证书")
        sub.add_argument("--port", type=bounded(1, 65535), help="默认 HTTP 5985 / HTTPS 5986")
        sub.add_argument("--ca-bundle", type=Path, help="HTTPS 自建 CA 的 PEM 文件")
        sub.add_argument("--report-dir", type=Path, default=Path("wecom-clean-reports"), help="本地报告目录")
        if name in ("check", "clean"):
            sub.add_argument("--profile", type=profile_value, help="服务器上的用户目录；默认登录账号的目录")
            sub.add_argument("--keep-days", type=bounded(7, 3650), default=30, help="保留最近天数，默认 30")
            sub.add_argument("--max-files", type=bounded(1, 50000), default=10000, help="每批文件上限，默认 10000")
            sub.add_argument("--max-mb", type=bounded(1, 10240), default=512, help="每批 MiB 上限，默认 512")
        if name in ("clean", "memory"):
            sub.add_argument("--apply", action="store_true", help="实际执行；不加此参数只预览")
    return p


def ps_string(value):
    """A PowerShell literal, never executable user input."""
    return "'" + str(value).replace("'", "''") + "'"


def endpoint(args):
    host = f"[{args.host}]" if ":" in args.host else args.host
    return f"{'https' if args.https else 'http'}://{host}:{args.port or (5986 if args.https else 5985)}/wsman"


def save_json(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2), encoding="utf-8")


def invoke_ps(session, source):
    source = "$ErrorActionPreference='Stop';$ProgressPreference='SilentlyContinue';" + source
    encoded = base64.b64encode(source.encode("utf-16le")).decode("ascii")
    if len(encoded) > 7500:
        raise RuntimeError("内部命令超过长度限制，未发送")
    result = session.run_cmd("powershell.exe", ["-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-EncodedCommand", encoded])
    if result.status_code:
        detail = result.std_err.decode("utf-8", errors="replace")[:1600]
        raise RuntimeError(f"服务器 PowerShell 执行失败 ({result.status_code}): {detail}")
    return result.std_out.strip()


def upload(session, stage, payload):
    script = ps_string(stage + r"\WeCom-Maintenance.ps1")
    # Small chunks also work with the Windows command-line length limit.
    invoke_ps(session, f"$f=[IO.File]::Open({script},'CreateNew','Write','None');$f.Dispose()")
    for offset in range(0, len(payload), 1100):
        data = base64.b64encode(payload[offset:offset + 1100]).decode("ascii")
        invoke_ps(session, f"$f=[IO.File]::Open({script},'Append','Write','None');try{{$b=[Convert]::FromBase64String('{data}');$f.Write($b,0,$b.Length)}}finally{{$f.Dispose()}}")
    actual = invoke_ps(session, f"(Get-FileHash -LiteralPath {script} -Algorithm SHA256).Hash").decode("ascii")
    if actual.lower() != hashlib.sha256(payload).hexdigest():
        raise RuntimeError("服务器脚本校验失败，未执行清理")


def action_source(args, stage):
    script = ps_string(stage + r"\WeCom-Maintenance.ps1")
    report = ps_string(stage + r"\report.json")
    console = ps_string(stage + r"\console.txt")
    options = f"-Mode {MODES[args.command]} -ReportPath {report}"
    if args.command in ("check", "clean"):
        options += f" -KeepDays {args.keep_days} -MaxFiles {args.max_files} -MaxMB {args.max_mb}"
        if args.profile:
            options += " -ProfilePath " + ps_string(args.profile)
    if getattr(args, "apply", False):
        options += " -Apply"
    # The engine writes structured errors in report.json even when it throws.
    return f"try{{& {script} {options} *> {console}}}catch{{}};[Convert]::ToBase64String([IO.File]::ReadAllBytes({report}))"


def summarize(report):
    for key, title in (("Before", "执行前"), ("After", "执行后")):
        if key in report:
            s = report[key]
            print(f"{title}: RAM 可用 {s['AvailableMB']} / {s['TotalMB']} MiB，提交率 {s['CommitPercent']}%，{s['SystemDisk']} 可用 {s['DiskFreeGB']} GiB")
    if "Scope" in report:
        print("扫描目录: " + "; ".join(report["Scope"]["Roots"]))
    if "Candidates" in report:
        c = report["Candidates"]
        print(f"本批候选: {c['Count']} 个，{c['Bytes'] / 1048576:.2f} MiB（不是全部缓存总量）")
    if "Cleanup" in report:
        c = report["Cleanup"]
        print(f"实际删除: {c['DeletedCount']} 个，{c['DeletedBytes'] / 1048576:.2f} MiB；跳过 {c['SkippedCount']} 个")
    if "Test" in report:
        print("自检: " + ("通过，仅处理专用测试文件" if report["Test"]["Passed"] else "未通过"))
    print("结果: " + report.get("Status", "Unknown"))
    for key in ("Message", "Error"):
        if report.get(key):
            print(report[key])


def remove_staging(session, stage):
    # Only our three known files; never recurse into an unknown directory.
    source = (f"$root={ps_string(stage)};$d=New-Object IO.DirectoryInfo($root);"
              "while($null -ne $d){if(!$d.Exists -or ($d.Attributes -band [IO.FileAttributes]::ReparsePoint)){throw 'Unsafe staging path'};$d=$d.Parent};"
              "foreach($name in @('WeCom-Maintenance.ps1','console.txt','report.json')){[IO.File]::Delete((Join-Path $root $name))};"
              "[IO.Directory]::Delete($root,$false)")
    invoke_ps(session, source)


def main(argv=None):
    p = parser()
    args = p.parse_args(argv)
    if args.ca_bundle and (not args.https or not args.ca_bundle.is_file()):
        p.error("--ca-bundle 需要 --https，且文件必须存在")
    if not args.user.strip():
        p.error("账号不能为空")
    try:
        import winrm
    except ImportError:
        print("缺少依赖；请先在工具目录执行 python -m pip install .", file=sys.stderr)
        return 2

    run_id = uuid.uuid4().hex
    run_dir = args.report_dir.resolve() / (datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ-") + run_id[:12])
    meta = {"Version": VERSION, "Endpoint": endpoint(args), "Command": args.command,
            "Apply": getattr(args, "apply", False), "Phase": "Preparing", "RunId": run_id}
    password = ""
    stage = None
    action_started = False
    report_received = False
    session = None
    try:
        run_dir.mkdir(parents=True, exist_ok=False)
        save_json(run_dir / "run.json", meta)
        print(f"目标: {args.host}；操作: {args.command}；" + ("实际执行" if meta["Apply"] else "预览/检查"), flush=True)
        if args.command == "clean" and meta["Apply"]:
            print(f"将永久删除本批 {args.keep_days} 天以前的合格临时图片，上限 {args.max_mb} MiB / {args.max_files} 个。", flush=True)
        with warnings.catch_warnings():
            warnings.simplefilter("error", getpass.GetPassWarning)
            password = getpass.getpass("Server password (hidden): ")
        if not password:
            raise ValueError("密码不能为空")
        session = winrm.Session(endpoint(args), auth=(args.user, password), transport="ntlm",
                                message_encryption="always", server_cert_validation="validate",
                                ca_trust_path=str(args.ca_bundle.resolve()) if args.ca_bundle else None,
                                proxy=None, operation_timeout_sec=20, read_timeout_sec=60)
        # The directory is unique to this run; never reuse or overwrite previous runs.
        bootstrap = ("if($PSVersionTable.PSVersion -lt [version]'5.1'){throw 'Requires Windows PowerShell 5.1'};"
                     "$root=[IO.Path]::GetTempPath();$d=New-Object IO.DirectoryInfo($root);"
                     "while($null -ne $d){if(!$d.Exists -or ($d.Attributes -band [IO.FileAttributes]::ReparsePoint)){throw 'Unsafe staging path'};$d=$d.Parent};"
                     f"$stage=Join-Path $root 'WeComClean-{run_id}';"
                     "$null=New-Item -ItemType Directory -Path $stage;"
                     "[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($stage))")
        stage = base64.b64decode(invoke_ps(session, bootstrap), validate=True).decode("utf-8")
        meta.update(RemoteDirectory=stage, Phase="Uploading")
        save_json(run_dir / "run.json", meta)
        print("已连接，正在校验清理脚本……", flush=True)
        upload(session, stage, Path(__file__).with_name("WeCom-Maintenance.ps1").read_bytes())
        meta["Phase"] = "Running"
        save_json(run_dir / "run.json", meta)
        print("正在执行并收集报告……", flush=True)
        action_started = True
        raw = base64.b64decode(invoke_ps(session, action_source(args, stage)), validate=True)
        report = json.loads(raw.decode("utf-8-sig"))
        if (report.get("Mode") != MODES[args.command] or report.get("Apply") != meta["Apply"]
                or report.get("Status") not in ("Completed", "Preview", "Skipped", "PartialFailure", "Error")):
            raise ValueError("服务器报告不完整")
        (run_dir / "report.json").write_bytes(raw)
        report_received = True
        meta.update(Phase="Finished", Status=report["Status"])
        save_json(run_dir / "run.json", meta)
        summarize(report)
        print(f"本地报告: {run_dir / 'report.json'}")
        if report["Status"] in ("Completed", "Preview", "Skipped"):
            try:
                remove_staging(session, stage)
                meta["RemoteArtifactsRemoved"] = True
            except Exception:
                print(f"本次操作结果已保存；工具临时文件未能移除，位置: {stage}")
                meta["RemoteArtifactsRemoved"] = False
            save_json(run_dir / "run.json", meta)
        else:
            print(f"服务器留档: {stage}")
        return 1 if report["Status"] in ("Error", "PartialFailure") else 0
    except (Exception, KeyboardInterrupt) as exc:
        message = "用户中断" if isinstance(exc, KeyboardInterrupt) else str(exc)
        if password:
            message = message.replace(password, "[hidden]")
        if action_started and not report_received:
            meta["Phase"] = "OutcomeUnknown"
            print("未收到完整结果：操作可能已执行，不能判定失败；请检查服务器 report.json 后再决定是否重试。", file=sys.stderr)
        elif not report_received:
            meta["Phase"] = "FailedBeforeAction"
            print("清理操作尚未启动。", file=sys.stderr)
        meta["ClientError"] = message[:2000]
        try:
            if run_dir.is_dir():
                save_json(run_dir / "run.json", meta)
        except OSError:
            pass
        print(message[:2000], file=sys.stderr)
        print(f"本地记录: {run_dir}", file=sys.stderr)
        if stage:
            print(f"服务器留档: {stage}", file=sys.stderr)
        return 3 if action_started and not report_received else 1
    finally:
        # Preserve remote evidence after uncertain outcomes; no automatic reruns.
        if session is not None and session.protocol.transport.session is not None:
            session.protocol.transport.session.close()

