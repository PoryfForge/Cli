"""Offline safety check: python test_cli.py (no server or password needed)."""
import argparse
import base64
import contextlib
import io
import json
from pathlib import Path
import tempfile
from types import SimpleNamespace
from unittest.mock import patch

import wecom_clean as cli


def main():
    p = cli.parser()
    args = p.parse_args(["clean", "--host", "192.0.2.10"])
    assert not args.apply and args.keep_days == 30
    assert " -Apply" not in cli.action_source(args, r"C:\Temp\one")
    args.apply = True
    args.profile = r"C:\Users\O'Brien; $(Get-Process)"
    script = cli.action_source(args, r"C:\Temp\one")
    assert " -Apply" in script and "'C:\\Users\\O''Brien; $(Get-Process)'" in script
    for invalid in ("http://192.0.2.10", "host;whoami", "host/path", "1.2.3.999", "user@host", ""):
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
    for argument in (["check", "--host", "test", "--apply"], ["clean", "--host", "test", "--keep-days", "0"]):
        with contextlib.redirect_stderr(io.StringIO()):
            try:
                p.parse_args(argument)
                raise AssertionError("Invalid arguments accepted")
            except SystemExit as exc:
                assert exc.code == 2

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
    print("PASS: preview defaults, validation, literal quoting, encrypted connection, reports, no password logs, no mutation retry")


if __name__ == "__main__":
    main()
