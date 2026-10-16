# 企业微信服务器清理 CLI

通过已有的 WinRM 连接检查 Windows 云服务器，预览或分批清理旧临时图片。适合把同一个工具提供给不同管理员，每次指定自己的服务器 IP。

[下载完整工具包 v1.1.0](https://github.com/PoryfForge/Cli/raw/refs/heads/main/tools/wecom-clean/WeCom-Clean-CLI-1.1.0.zip) · [完整使用说明](使用说明.txt) · [验证记录](验证记录.txt)

1.1.0 增加服务器清单检查、扫描数量上限、资源告警和完整报告写入保护，并用压缩传输减少上传调用。

## 安装与使用

操作电脑需要 Python ≥ 3.9。目标服务器需要 Windows PowerShell 5.1、已开启 WinRM，并允许本机管理连接；目标服务器无需安装 Python。工具不会修改防火墙或启用远程服务。

下载并解压工具包，在解压目录打开 Windows 终端：

```powershell
py -m pip install .\wecom_clean_cli-1.1.0-py3-none-any.whl

# 查看资源与本批旧图片
wecom-clean check --host SERVER_IP

# 只预览清理
wecom-clean clean --host SERVER_IP

# 实际清理一批
wecom-clean clean --host SERVER_IP --apply
```

将 `SERVER_IP` 替换为自己的服务器地址。默认账号 `administrator`，可用 `--user` 更改；密码在提示后隐藏输入，不写进命令或报告。命令不在 PATH 时，可使用 `py -m wecom_clean`。

macOS / Linux 可用 `python3 -m pip install ./wecom_clean_cli-1.1.0-py3-none-any.whl` 安装；系统要求虚拟环境时先创建并激活虚拟环境。从仓库源码安装时，在本目录执行 `python -m pip install .`。

## 命令与范围

| 命令 | 行为 |
| --- | --- |
| `check` | 检查 RAM、系统盘和本批旧图片；可按清单逐台检查，不删除业务文件 |
| `clean` | 默认预览；加 `--apply` 永久删除本批合格旧临时图片 |
| `memory` | 默认检查条件；加 `--apply` 尝试一次企业微信工作集压缩，条件不满足则跳过 |
| `self-test` | 只处理专用测试文件，内存 API 只作用于测试进程自身 |

清理默认保留最近 **30 天**，每批上限 **512 MiB / 10000 个文件**。只扫描所选用户 `AppData\Local\Temp` 根目录和直属数字会话子目录，只选 GUID 文件名的旧图片。跳过只读、被占用、目录链接及检查后变化的文件；不递归清理其他目录。

每次最多检查 **200000 个文件**，可用 `--max-scan` 调整（1–5000000）。达到上限会明确提示后续文件未检查；即使候选为零，也不能认定没有可清理的旧图片。扫描时个别文件变化导致读取失败，会计数并跳过。此上限约束检查数量，不保证固定耗时。

更保守的批次示例：

```powershell
wecom-clean clean --host SERVER_IP --keep-days 60 --max-mb 100 --max-files 2000
wecom-clean clean --host SERVER_IP --keep-days 60 --max-mb 100 --max-files 2000 --apply
```

默认扫描登录账号的用户目录。使用其他管理账号时，加 `--profile "C:\Users\Administrator"` 指向实际运行企业微信的用户目录。

`--apply` 就是执行指令，不再二次询问。删除不经过回收站、不自动备份。随机文件名或当前未被占用，不能证明发单任务以后不会再引用它；需按业务调整保留期。预览与执行分别检查，后台写入可能改变候选文件。

**磁盘空间和运行内存分别处理。** `clean` 释放磁盘空间；`memory` 只临时缩小工作集，可能回升或短暂变慢。它不能修复内存泄漏、卡死、网络掉线或重新扫码登录。内存模式的触发条件见[完整说明](使用说明.txt)。

## 一次检查多台服务器

复制 [servers.example.txt](servers.example.txt) 为 `servers.txt`，替换成实际服务器，每行一个 IP 或主机名。支持空行、`#` 注释和重复地址去重，最多 500 台。

```powershell
wecom-clean check --hosts-file servers.txt --max-scan 50000
```

输入一次密码后，用同一账号、密码及连接参数逐台检查清单中的服务器。凭据不同的服务器应拆分清单；这里只检查明确列出的地址，不扫描网段。批量入口不接受 `--apply`，也不能用于 `clean` / `memory`。

每台服务器保留独立报告，`fleet-.../summary.json` 汇总剩余磁盘、可用 RAM、内存提交率和告警。单台失败继续检查其他目标，失败行不会伪装成资源正常；按 Ctrl+C 中止后不再连接下一台，已完成结果仍在汇总中，`Complete` 为 `false`。更换批次参数前可先对单台执行 `check`。

## 连接与报告

默认 HTTP 5985，使用 NTLM 并强制消息加密。可加 `--https` 使用 HTTPS 5986，证书必须有效；自建 CA 可加 `--ca-bundle company-ca.pem`。`--port` 可指定管理端口。工具不提供忽略证书校验或明文 Basic 回退。

本地报告默认位于 `wecom-clean-reports/`，可用 `--report-dir` 更改。报告包含操作结果、资源前后状态及实际删除文件明细，不含密码。分享时注意其中的服务器地址和文件路径。

脚本先压缩上传，解压后仍校验原文 SHA256。以当前脚本计，上传内容约减少 66%，上传阶段从未压缩方案的 17 次远程调用降至 7 次；这不等于清理速度提升 66%。本地 JSON 先完整写入并同步文件，再替换目标记录，写入失败不会提前截断原报告。

正常完成且保存报告后，移除本次工具的远程临时文件。连接中断或报告不完整时，返回退出码 **3**，标记 `OutcomeUnknown`，保留远程记录；清理可能已经执行，先检查 `run.json` 中 `RemoteDirectory` 指向的 `report.json` 和 `console.txt`，不要直接重跑。

## 验证

```powershell
python test_cli.py
wecom-clean self-test --host SERVER_IP
```

已在 Windows Server 2012 R2 / Windows PowerShell 5.1 验证压缩上传、新版自检、扫描上限与清单汇总。本轮 CLI 验证没有删除业务图片；内置清理引擎的初版此前已完成小批量实际清理测试。其他系统、HTTPS 管理入口和数百台实机批次尚未实测，详见[验证记录](验证记录.txt)。

源码与安装包未内置真实服务器 IP 或密码。该工具独立于仓库中企业微信官方 SaaS CLI 的能力快照。
