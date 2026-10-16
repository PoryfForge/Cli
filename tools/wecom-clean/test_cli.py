"""Offline safety check: python test_cli.py (no server or password needed)."""
import argparse
import base64
import contextlib
import gzip
import hashlib
import io
import json
import math
from pathlib import Path
import tempfile
import re
from types import SimpleNamespace
from unittest.mock import patch

import wecom_clean as cli


def main():
    p = cli.parser()
    args = p.parse_args(["clean", "--host", "192.0.2.10"])
    assert not args.apply and args.keep_days == 30
    assert " -Apply" not in cli.action_source(args, r"C:\Temp\one")
    assert "-MaxScan 200000" in cli.action_source(args, r"C:\Temp\one")
    args.apply = True
    args.profile = r"C:\Users\O'Brien; $(Get-Process)"
    script = cli.action_source(args, r"C:\Temp\one")
    assert " -Apply" in script and "'C:\\Users\\O''Brien; $(Get-Process)'" in script
    for invalid in ("http://192.0.2.10", "host;whoami", "host/path", "1.2.3.999", "user@host", "fe80::1%eth0", ""):
        try:
            cli.host_value(invalid)
            raise AssertionError("Invalid host accepted")
        except argparse.ArgumentTypeError:
            pass
    for invalid in (r"C:\Users\..\Windows", r"\\host\share", r"C:\Users\x:stream"):
        try:
            cli.profile_value(invalid)
            raise AssertionError("Invalid profile accepted")
        except argparse.ArgumentTypeError:
            pass
    for argument in (["check", "--host", "test", "--apply"], ["clean", "--host", "test", "--keep-days", "0"],
                     ["clean", "--hosts-file", "servers.txt", "--apply"], ["check", "--host", "test", "--max-scan", "0"],
                     ["check", "--host", "test", "--hosts-file", "servers.txt"]):
        with contextlib.redirect_stderr(io.StringIO()):
            try:
                p.parse_args(argument)
                raise AssertionError("Invalid arguments accepted")
            except SystemExit as exc:
                assert exc.code == 2

    payload = Path(cli.__file__).with_name("WeCom-Maintenance.ps1").read_bytes()
    assert payload.startswith(b"\xef\xbb\xbf")  # Windows PowerShell 5.1 must read Chinese text correctly.
    chunks = []
    commands = []
    def upload_remote(session, source):
        commands.append(source)
        assert len(base64.b64encode(("$ErrorActionPreference='Stop';$ProgressPreference='SilentlyContinue';" + source).encode("utf-16le"))) <= 7500
        match = re.search(r"FromBase64String\('([^']+)'\)", source)
        if match:
            chunks.append(base64.b64decode(match.group(1)))
        return hashlib.sha256(payload).hexdigest().encode() if "Get-FileHash" in source else b""
    with patch.object(cli, "invoke_ps", upload_remote):
        cli.upload(None, r"C:\Users\Administrator\AppData\Local\Temp\WeComClean-test", payload)
    assert gzip.decompress(b"".join(chunks)) == payload
    assert len(commands) < 2 + math.ceil(len(payload) / 1100)
    with patch.object(cli, "invoke_ps", return_value=b"invalid hash"):
        try:
            cli.upload(None, r"C:\Temp\one", payload)
            raise AssertionError("Corrupt upload accepted")
        except RuntimeError:
            pass

    # Test real argument -> dispatch -> saved report flow, including a lost connection.
    with tempfile.TemporaryDirectory() as tmp:
        for drop in (False, True):
            actions = []
            commands = []
            def remote(session, source):
                commands.append(source)
                if "New-Item -ItemType Directory" in source:
                    return base64.b64encode(b"C:\\Temp\\WeComClean-test")
                if "-Mode CleanTemp" in source:
                    actions.append(source)
                    if drop:
                        raise TimeoutError("connection lost example-password")
                    report = {"Mode": "CleanTemp", "Status": "Preview", "Apply": False,
                              "Candidates": {"Count": 3, "Bytes": 1024}}
                    return base64.b64encode(json.dumps(report).encode())
                return b""

            session = SimpleNamespace(protocol=SimpleNamespace(transport=SimpleNamespace(session=None)))
            output = io.StringIO()
            with patch("winrm.Session", return_value=session) as connect, patch.object(cli, "invoke_ps", remote), \
                    patch.object(cli, "upload"), patch.object(cli.getpass, "getpass", return_value="example-password"), \
                    contextlib.redirect_stdout(output), contextlib.redirect_stderr(output):
                arguments = ["clean", "--host", "192.0.2.10", "--report-dir", str(Path(tmp) / str(drop))]
                code = cli.main(arguments + (["--apply"] if drop else []))
            assert len(actions) == 1  # No re-execution after an uncertain result.
            assert (" -Apply" in actions[0]) == drop
            assert connect.call_args.kwargs["message_encryption"] == "always"
            assert connect.call_args.kwargs["server_cert_validation"] == "validate"
            assert connect.call_args.kwargs["proxy"] is None
            records = list((Path(tmp) / str(drop)).rglob("*.json"))
            assert all("example-password" not in x.read_text() for x in records)
            assert "example-password" not in output.getvalue()
            meta = json.loads(next(x for x in records if x.name == "run.json").read_text())
            if drop:
                assert code == 3 and meta["Phase"] == "OutcomeUnknown"
                assert not any("[IO.Directory]::Delete" in x for x in commands)
            else:
                assert code == 0 and meta["Phase"] == "Finished"
                assert meta["RemoteArtifactsRemoved"]
                assert "report.json" in {x.name for x in records}
                assert any("[IO.Directory]::Delete($root,$false)" in x for x in commands)

        hostfile = Path(tmp) / "servers.txt"
        hostfile.write_text("\ufeff# example\n192.0.2.10\nSERVER.EXAMPLE.COM\nserver.example.com # duplicate\n", encoding="utf-8")
        assert cli.read_hosts(hostfile) == ["192.0.2.10", "server.example.com"]
        attempted = []
        def check_one(args, password):
            attempted.append(args.host)
            assert args.command == "check" and not getattr(args, "apply", False)
            assert password == "example-password"
            run = args.report_dir / str(len(attempted))
            run.mkdir()
            if len(attempted) == 1:
                return 1, run  # One unreachable host must not prevent checking the next.
            cli.save_json(run / "report.json", {"Status": "Preview", "After": {
                "DiskFreeGB": 0.5, "AvailableMB": 100, "TotalMB": 2048, "CommitPercent": 90},
                "Candidates": {"ScanLimitReached": True, "ScanErrors": 1}})
            return 0, run
        with patch.object(cli, "run_one", check_one), patch.object(cli.getpass, "getpass", return_value="example-password") as prompt, \
                contextlib.redirect_stdout(io.StringIO()):
            code = cli.main(["check", "--hosts-file", str(hostfile), "--report-dir", str(Path(tmp) / "fleet")])
        assert code == 1 and attempted == ["192.0.2.10", "server.example.com"]
        prompt.assert_called_once()
        summary = json.loads(next((Path(tmp) / "fleet").glob("*/summary.json")).read_text())
        assert summary["Complete"] and summary["Total"] == 2
        assert summary["Results"][0]["Status"] == "Failed"
        assert len(summary["Results"][1]["Alerts"]) == 5
        assert "example-password" not in json.dumps(summary)

        hostfile.write_text("192.0.2.10\n192.0.2.11\n192.0.2.12\n")
        interrupted = []
        def interrupt_second(args, password):
            interrupted.append(args.host)
            if len(interrupted) == 2:
                raise KeyboardInterrupt()
            return 1, args.report_dir / "first-failed"
        with patch.object(cli, "run_one", interrupt_second), patch.object(cli.getpass, "getpass", return_value="example-password"), \
                contextlib.redirect_stdout(io.StringIO()), contextlib.redirect_stderr(io.StringIO()):
            code = cli.main(["check", "--hosts-file", str(hostfile), "--report-dir", str(Path(tmp) / "interrupted")])
        partial = json.loads(next((Path(tmp) / "interrupted").glob("*/summary.json")).read_text())
        assert code == 130 and len(interrupted) == 2
        assert not partial["Complete"] and len(partial["Results"]) == 1 and partial["Total"] == 3

        for text in ("# no hosts\n", "192.0.2.1\nhttp://invalid\n", "\n".join(f"server{i}" for i in range(501))):
            hostfile.write_text(text)
            with patch.object(cli.getpass, "getpass") as prompt, contextlib.redirect_stderr(io.StringIO()):
                try:
                    cli.main(["check", "--hosts-file", str(hostfile)])
                    raise AssertionError("Invalid host file accepted")
                except SystemExit as exc:
                    assert exc.code == 2
            prompt.assert_not_called()

        saved = Path(tmp) / "durable.json"
        cli.save_json(saved, {"complete": True})
        with patch.object(Path, "replace", side_effect=OSError("simulated disk error")):
            try:
                cli.save_json(saved, {"complete": False})
                raise AssertionError("Write failure ignored")
            except OSError:
                pass
        assert json.loads(saved.read_text()) == {"complete": True}
        assert not list(Path(tmp).glob("durable.json.tmp-*"))
    print("PASS: preview, input validation, gzip/hash, scan cap, atomic reports, batch isolation, no password logs, no mutation retry")


if __name__ == "__main__":
    main()
