---
name: wps365-cli
kind: cli
command: wps365-cli
version: 0.3.5
title: WPS 365 CLI
license: MIT
repo: https://github.com/wps365-open/cli
scanned_at: 2026-09-18 06:27:54
source: release-bin + help-tree
nodes: 200
---

# WPS 365 CLI（`wps365-cli`）— 能力快照

> WPS 365 官方 CLI：日历、消息、通讯录、邮箱、云文档、智能文档、智能表格、多维表、会议 9 大业务域，另含 api 兜底命令与 spec 管理

## 怎么用这份文档

- 这是由 `wps365-cli --help` 递归提取的能力快照；覆盖范围受扫描深度、节点上限及 help 输出限制，不保证包含全部接口。
- 需要二级细节时，直接查本文档对应小节；如需最新参数，跑 `<命令路径> --help`。
- 用法：先在下表定位子命令，再按该小节的 usage 与 flag 拼命令。

## 概览

| 项 | 值 |
|---|---|
| 可执行文件 | `wps365-cli` |
| 版本 | `0.3.5` |
| 仓库 | https://github.com/wps365-open/cli |
| 许可证 | MIT |
| 采集方式 | 官方 release 二进制（`--help` 递归） |
| 本轮抓取命令数 | 200（顶层 1） |
| 抓取时间 | 2026-09-18 06:27:54 |
| 原始 help 留档 | `raw/` |

## 安装

```bash
curl -fsSL https://open-docs.wpscdn.cn/cli/install.sh | bash
```

## 顶层用法

```
wps365-cli [flags] wps365-cli [command]
```

## 顶层选项

| Flag | 说明 |
|---|---|
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `-h, --help` | help for wps365-cli |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |
| `-v, --version` | version for wps365-cli |

## 命令树

| 命令 | 说明 / 用法概要 |
|---|---|
| `wps365-cli airpage` | 智能文档 |
| `wps365-cli airpage block` | &nbsp;&nbsp;&nbsp;&nbsp;智能文档块（v2 JSON，--content 写入纯文本） |
| `wps365-cli airpage block create` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在智能文档中写入一段纯文本 |
| `wps365-cli airpage block delete` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除智能文档子块 |
| `wps365-cli airpage block get` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;查询智能文档块 |
| `wps365-cli airpage block update` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;更新智能文档段落文本 |
| `wps365-cli airpage create` | &nbsp;&nbsp;&nbsp;&nbsp;创建智能文档 |
| `wps365-cli airpage export` | &nbsp;&nbsp;&nbsp;&nbsp;导出为 docx/json/pdf |
| `wps365-cli airpage export create` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;创建智能文档导出任务 |
| `wps365-cli airpage export get` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;查询智能文档导出任务 |
| `wps365-cli airpage get` | &nbsp;&nbsp;&nbsp;&nbsp;获取智能文档基本信息 |
| `wps365-cli airpage import` | &nbsp;&nbsp;&nbsp;&nbsp;导入 OTL JSON |
| `wps365-cli airpage import create` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;导入 OTL JSON |
| `wps365-cli airsheet` | 智能表格 |
| `wps365-cli airsheet data` | &nbsp;&nbsp;&nbsp;&nbsp;单元格选区读写 |
| `wps365-cli airsheet data delete` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除选区数据 |
| `wps365-cli airsheet data find` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;查找选区数据 |
| `wps365-cli airsheet data get` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;读取选区数据 |
| `wps365-cli airsheet data update` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;更新选区数据 |
| `wps365-cli airsheet file` | &nbsp;&nbsp;&nbsp;&nbsp;智能表格文件 |
| `wps365-cli airsheet file create` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;创建智能表格 |
| `wps365-cli airsheet row` | &nbsp;&nbsp;&nbsp;&nbsp;行追加 |
| `wps365-cli airsheet row create` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;追加行 |
| `wps365-cli airsheet worksheet` | &nbsp;&nbsp;&nbsp;&nbsp;工作表 |
| `wps365-cli airsheet worksheet create` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;创建工作表 |
| `wps365-cli airsheet worksheet list` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;列出工作表 |
| `wps365-cli api` | Invoke low-level API requests |
| `wps365-cli api delete` | &nbsp;&nbsp;&nbsp;&nbsp;Execute DELETE request |
| `wps365-cli api get` | &nbsp;&nbsp;&nbsp;&nbsp;Execute GET request |
| `wps365-cli api head` | &nbsp;&nbsp;&nbsp;&nbsp;Execute HEAD request |
| `wps365-cli api patch` | &nbsp;&nbsp;&nbsp;&nbsp;Execute PATCH request |
| `wps365-cli api post` | &nbsp;&nbsp;&nbsp;&nbsp;Execute POST request |
| `wps365-cli api put` | &nbsp;&nbsp;&nbsp;&nbsp;Execute PUT request |
| `wps365-cli auth` | Authentication and credential management |
| `wps365-cli auth clean` | &nbsp;&nbsp;&nbsp;&nbsp;Remove all tokens, credentials, client_id and auto-generated keys |
| `wps365-cli auth login` | &nbsp;&nbsp;&nbsp;&nbsp;Perform delegated OAuth login |
| `wps365-cli auth logout` | &nbsp;&nbsp;&nbsp;&nbsp;Delete local delegated token |
| `wps365-cli auth qrcode` | &nbsp;&nbsp;&nbsp;&nbsp;Encode a URL as a QR code (PNG file or ASCII) |
| `wps365-cli auth refresh` | &nbsp;&nbsp;&nbsp;&nbsp;Refresh local token |
| `wps365-cli auth setup` | &nbsp;&nbsp;&nbsp;&nbsp;Save client_id and client_secret |
| `wps365-cli auth status` | &nbsp;&nbsp;&nbsp;&nbsp;Show current auth status |
| `wps365-cli auth token` | &nbsp;&nbsp;&nbsp;&nbsp;Print current access token to stdout |
| `wps365-cli calendar` | 日历、日程与忙闲管理 |
| `wps365-cli calendar create` | &nbsp;&nbsp;&nbsp;&nbsp;创建日历 |
| `wps365-cli calendar delete` | &nbsp;&nbsp;&nbsp;&nbsp;删除日历 |
| `wps365-cli calendar event` | &nbsp;&nbsp;&nbsp;&nbsp;日程的增删改查与搜索 |
| `wps365-cli calendar event create` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;创建日程 |
| `wps365-cli calendar event delete` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除日程 |
| `wps365-cli calendar event get` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;查询日程 |
| `wps365-cli calendar event list` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;查询日程列表 |
| `wps365-cli calendar event respond` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;答复日程邀请 |
| `wps365-cli calendar event search` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;搜索日程 |
| `wps365-cli calendar event update` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;修改日程 |
| `wps365-cli calendar event-minutes` | &nbsp;&nbsp;&nbsp;&nbsp;日程会议纪要 |
| `wps365-cli calendar event-minutes create` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;创建会议纪要 |
| `wps365-cli calendar event-room` | &nbsp;&nbsp;&nbsp;&nbsp;日程会议室管理 |
| `wps365-cli calendar event-room add` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;批量添加日程会议室 |
| `wps365-cli calendar event-room list` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;查询日程的会议室列表 |
| `wps365-cli calendar event-room remove` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;批量删除日程会议室 |
| `wps365-cli calendar free-busy` | &nbsp;&nbsp;&nbsp;&nbsp;忙闲信息查询 |
| `wps365-cli calendar free-busy list` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;查看日程忙闲 |
| `wps365-cli calendar get` | &nbsp;&nbsp;&nbsp;&nbsp;查看日历 |
| `wps365-cli calendar list` | &nbsp;&nbsp;&nbsp;&nbsp;查询日历列表 |
| `wps365-cli calendar primary` | &nbsp;&nbsp;&nbsp;&nbsp;主日历批量查询 |
| `wps365-cli calendar primary batch-get` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;批量获取主日历 |
| `wps365-cli calendar subscribe` | &nbsp;&nbsp;&nbsp;&nbsp;订阅日历 |
| `wps365-cli calendar unsubscribe` | &nbsp;&nbsp;&nbsp;&nbsp;取消订阅日历 |
| `wps365-cli calendar update` | &nbsp;&nbsp;&nbsp;&nbsp;修改日历 |
| `wps365-cli completion` | Generate shell completion scripts |
| `wps365-cli completion bash` | &nbsp;&nbsp;&nbsp;&nbsp;Generate bash completion script |
| `wps365-cli completion zsh` | &nbsp;&nbsp;&nbsp;&nbsp;Generate zsh completion script |
| `wps365-cli config` | Local configuration and application binding |
| `wps365-cli config get` | &nbsp;&nbsp;&nbsp;&nbsp;Get a config value |
| `wps365-cli config init` | &nbsp;&nbsp;&nbsp;&nbsp;Initialize CLI by binding an application |
| `wps365-cli config path` | &nbsp;&nbsp;&nbsp;&nbsp;Show config directory path |
| `wps365-cli config set` | &nbsp;&nbsp;&nbsp;&nbsp;Set a config value |
| `wps365-cli config unset` | &nbsp;&nbsp;&nbsp;&nbsp;Unset a config value |
| `wps365-cli dbsheet` | 多维表数据管理 |
| `wps365-cli dbsheet field` | &nbsp;&nbsp;&nbsp;&nbsp;字段管理 |
| `wps365-cli dbsheet field create` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;创建字段 |
| `wps365-cli dbsheet field delete` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除字段 |
| `wps365-cli dbsheet field update` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;更新字段 |
| `wps365-cli dbsheet record` | &nbsp;&nbsp;&nbsp;&nbsp;记录的增删改查 |
| `wps365-cli dbsheet record create` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;创建记录 |
| `wps365-cli dbsheet record delete` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除记录 |
| `wps365-cli dbsheet record get` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获取单条记录 |
| `wps365-cli dbsheet record list` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;列出所有记录 |
| `wps365-cli dbsheet record search` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;批量检索记录 |
| `wps365-cli dbsheet record update` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;更新记录 |
| `wps365-cli dbsheet schema` | &nbsp;&nbsp;&nbsp;&nbsp;多维表结构信息 |
| `wps365-cli dbsheet schema get` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获取多维表格 schema |
| `wps365-cli dbsheet sheet` | &nbsp;&nbsp;&nbsp;&nbsp;数据表管理 |
| `wps365-cli dbsheet sheet create` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;创建数据表 |
| `wps365-cli dbsheet sheet delete` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除数据表 |
| `wps365-cli dbsheet sheet update` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;更新数据表 |
| `wps365-cli drive` | 云文档与文件管理 |
| `wps365-cli drive create` | &nbsp;&nbsp;&nbsp;&nbsp;新建驱动盘 |
| `wps365-cli drive doclib` | &nbsp;&nbsp;&nbsp;&nbsp;文档库（团队文档）管理 |
| `wps365-cli drive doclib get` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获取文档库详情 |
| `wps365-cli drive doclib list` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获取文档库列表 |
| `wps365-cli drive file` | &nbsp;&nbsp;&nbsp;&nbsp;文件与文件夹操作 |
| `wps365-cli drive file batch-copy` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;批量复制文件 |
| `wps365-cli drive file batch-move` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;批量移动文件 |
| `wps365-cli drive file create` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;新建文件或文件夹 |
| `wps365-cli drive file delete` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除文件 |
| `wps365-cli drive file download` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获取文件下载信息 |
| `wps365-cli drive file get` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获取文件信息 |
| `wps365-cli drive file list` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获取子文件列表 |
| `wps365-cli drive file rename` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重命名文件或文件夹 |
| `wps365-cli drive file search` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;搜索文件 |
| `wps365-cli drive file-content` | &nbsp;&nbsp;&nbsp;&nbsp;文件正文内容 |
| `wps365-cli drive file-content get` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;文档内容抽取 |
| `wps365-cli drive file-path` | &nbsp;&nbsp;&nbsp;&nbsp;文件路径查询 |
| `wps365-cli drive file-path get` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获取文件路径 |
| `wps365-cli drive file-version` | &nbsp;&nbsp;&nbsp;&nbsp;文件版本管理 |
| `wps365-cli drive file-version get` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获取文件版本信息 |
| `wps365-cli drive file-version list` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获取文件版本列表 |
| `wps365-cli drive get` | &nbsp;&nbsp;&nbsp;&nbsp;获取盘信息 |
| `wps365-cli drive link` | &nbsp;&nbsp;&nbsp;&nbsp;文件分享链接管理 |
| `wps365-cli drive link close` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;取消文件分享 |
| `wps365-cli drive link open` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;开启文件分享 |
| `wps365-cli drive list` | &nbsp;&nbsp;&nbsp;&nbsp;获取盘列表 |
| `wps365-cli drive recent-file` | &nbsp;&nbsp;&nbsp;&nbsp;最近访问的文件 |
| `wps365-cli drive recent-file list` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获取最近文件列表 |
| `wps365-cli drive starred-file` | &nbsp;&nbsp;&nbsp;&nbsp;收藏的文件 |
| `wps365-cli drive starred-file list` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获取收藏文件列表 |
| `wps365-cli help` | Help about any command |
| `wps365-cli im` | 消息与群会话管理 |
| `wps365-cli im chat` | &nbsp;&nbsp;&nbsp;&nbsp;群会话管理 |
| `wps365-cli im chat create` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;创建会话 |
| `wps365-cli im chat delete` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;解散群 |
| `wps365-cli im chat get` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获取会话信息 |
| `wps365-cli im chat list` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获取会话列表 |
| `wps365-cli im chat update` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;更新群信息 |
| `wps365-cli im chat-member` | &nbsp;&nbsp;&nbsp;&nbsp;群成员管理 |
| `wps365-cli im chat-member add` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;添加群成员 |
| `wps365-cli im chat-member list` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获取群成员列表 |
| `wps365-cli im chat-member remove` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除群成员 |
| `wps365-cli im message` | &nbsp;&nbsp;&nbsp;&nbsp;消息发送与撤回 |
| `wps365-cli im message recall` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;撤回消息 |
| `wps365-cli im message send` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发送文本消息 |
| `wps365-cli im p2p-chat` | &nbsp;&nbsp;&nbsp;&nbsp;单聊会话查询 |
| `wps365-cli im p2p-chat get` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获取 P2P 会话 |
| `wps365-cli im unread-chat` | &nbsp;&nbsp;&nbsp;&nbsp;未读会话统计 |
| `wps365-cli im unread-chat count` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获取未读消息数 |
| `wps365-cli mail` | 邮箱与邮件管理 |
| `wps365-cli mail draft` | &nbsp;&nbsp;&nbsp;&nbsp;邮件草稿管理 |
| `wps365-cli mail draft create` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;创建草稿 |
| `wps365-cli mail draft send` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发送草稿 |
| `wps365-cli mail mailbox` | &nbsp;&nbsp;&nbsp;&nbsp;邮箱列表管理 |
| `wps365-cli mail mailbox list` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获取邮箱列表 |
| `wps365-cli mail mailbox-folder` | &nbsp;&nbsp;&nbsp;&nbsp;邮箱文件夹管理 |
| `wps365-cli mail mailbox-folder list` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获取邮箱目录列表 |
| `wps365-cli mail message` | &nbsp;&nbsp;&nbsp;&nbsp;邮件消息管理 |
| `wps365-cli mail message get` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获取邮件详情 |
| `wps365-cli mail message list` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获取邮件列表 |
| `wps365-cli mail message search` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;高级搜索邮件 |
| `wps365-cli mcp` | Expose curated commands as a stdio MCP server |
| `wps365-cli mcp config` | &nbsp;&nbsp;&nbsp;&nbsp;Print MCP client config snippet for Workbuddy / Claude / Cursor |
| `wps365-cli mcp doctor` | &nbsp;&nbsp;&nbsp;&nbsp;Check MCP prerequisites (spec load, credentials) |
| `wps365-cli mcp serve` | &nbsp;&nbsp;&nbsp;&nbsp;Start MCP stdio server (JSON-RPC on stdin/stdout) |
| `wps365-cli mcp tools` | &nbsp;&nbsp;&nbsp;&nbsp;List MCP tools mapped from the curated catalog |
| `wps365-cli meeting` | 在线会议管理 |
| `wps365-cli meeting end` | &nbsp;&nbsp;&nbsp;&nbsp;结束会议 |
| `wps365-cli meeting get` | &nbsp;&nbsp;&nbsp;&nbsp;获取会议详情 |
| `wps365-cli meeting list` | &nbsp;&nbsp;&nbsp;&nbsp;获取会议列表 |
| `wps365-cli meeting minute` | &nbsp;&nbsp;&nbsp;&nbsp;会议纪要 |
| `wps365-cli meeting minute list` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获取纪要列表 |
| `wps365-cli meeting minute-summary` | &nbsp;&nbsp;&nbsp;&nbsp;会议纪要摘要 |
| `wps365-cli meeting minute-summary get` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获取纪要总结要点 |
| `wps365-cli meeting minute-transcript` | &nbsp;&nbsp;&nbsp;&nbsp;会议纪要转写 |
| `wps365-cli meeting minute-transcript get` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获取纪要语音转写 |
| `wps365-cli meeting participant` | &nbsp;&nbsp;&nbsp;&nbsp;参会人管理 |
| `wps365-cli meeting participant invite` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;邀请参会人 |
| `wps365-cli meeting participant list` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获取参会人列表 |
| `wps365-cli meeting participant remove` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;移除参会人 |
| `wps365-cli meeting recording` | &nbsp;&nbsp;&nbsp;&nbsp;会议录制 |
| `wps365-cli meeting recording list` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获取录制列表 |
| `wps365-cli meeting recording-summary` | &nbsp;&nbsp;&nbsp;&nbsp;录制摘要 |
| `wps365-cli meeting recording-summary get` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获取录制总结要点 |
| `wps365-cli meeting set-host` | &nbsp;&nbsp;&nbsp;&nbsp;设置主持人 |
| `wps365-cli provider` | 管理 provider |
| `wps365-cli provider add` | &nbsp;&nbsp;&nbsp;&nbsp;新增 provider |
| `wps365-cli provider list` | &nbsp;&nbsp;&nbsp;&nbsp;列出已配置的 provider |
| `wps365-cli provider remove` | &nbsp;&nbsp;&nbsp;&nbsp;删除 provider |
| `wps365-cli provider show` | &nbsp;&nbsp;&nbsp;&nbsp;查看 provider 详情 |
| `wps365-cli provider update` | &nbsp;&nbsp;&nbsp;&nbsp;更新 provider |
| `wps365-cli spec` | Manage builtin wps365 spec files |
| `wps365-cli spec status` | &nbsp;&nbsp;&nbsp;&nbsp;Show local spec file status |
| `wps365-cli spec update` | &nbsp;&nbsp;&nbsp;&nbsp;Update official spec files from remote |
| `wps365-cli update` | Update wps365-cli from the official CDN |
| `wps365-cli user` | 企业用户与组织架构 |
| `wps365-cli user dept` | &nbsp;&nbsp;&nbsp;&nbsp;用户所属部门查询 |
| `wps365-cli user dept list` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获取用户所在部门列表 |
| `wps365-cli user get` | &nbsp;&nbsp;&nbsp;&nbsp;获取指定用户 |
| `wps365-cli user list` | &nbsp;&nbsp;&nbsp;&nbsp;列出所有用户 |
| `wps365-cli user me` | &nbsp;&nbsp;&nbsp;&nbsp;获取当前用户信息 |
| `wps365-cli user search` | &nbsp;&nbsp;&nbsp;&nbsp;搜索企业用户 |
| `wps365-cli version` | Show version information |

## 逐命令详情

### `wps365-cli airpage`

智能文档

```
wps365-cli airpage [command]
```

**子命令**：`block` · `create` · `export` · `get` · `import`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for airpage |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli airpage block`

智能文档块（v2 JSON，--content 写入纯文本）

```
wps365-cli airpage block [command]
```

**子命令**：`create` · `delete` · `get` · `update`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for block |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli airpage block create`

在智能文档中写入一段纯文本

```
wps365-cli airpage block create <file-id> [flags]
```

| Flag | 说明 |
|---|---|
| `--block-id string` | 父块 ID；doc 表示在文档根下插入 (default "doc") |
| `--content string` | (required) 要写入的一段纯文本（不是 Markdown） |
| `-h, --help` | help for create |
| `--index int` | 插入位置，从 0 开始；省略时由服务端默认插到首位 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli airpage block delete`

删除智能文档子块

```
wps365-cli airpage block delete <file-id> [flags]
```

| Flag | 说明 |
|---|---|
| `--block-id string` | 父块 ID；doc 表示从文档根下删除子块 (default "doc") |
| `--end-index int` | (required) 删除范围结束索引（不包含），必须大于 start-index |
| `-h, --help` | help for delete |
| `--start-index int` | (required) 删除范围起始索引（包含），从 0 开始 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli airpage block get`

查询智能文档块

```
wps365-cli airpage block get <file-id> [flags]
```

| Flag | 说明 |
|---|---|
| `--block-id string` | 要查询的块 ID；doc 表示文档根，title 表示标题块 (default "doc") |
| `-h, --help` | help for get |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli airpage block update`

更新智能文档段落文本

```
wps365-cli airpage block update <file-id> [flags]
```

| Flag | 说明 |
|---|---|
| `--block-id string` | (required) 要更新的段落块 ID |
| `--content string` | (required) 替换后的一段纯文本（不是 Markdown） |
| `-h, --help` | help for update |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli airpage create`

创建智能文档

```
wps365-cli airpage create [flags]
```

| Flag | 说明 |
|---|---|
| `--drive-id string` | (required) 盘 ID |
| `-h, --help` | help for create |
| `--name string` | (required) 文档名称 |
| `--on-name-conflict string` | (required) 同名冲突策略（rename / fail / overwrite） (default "rename") |
| `--parent-id string` | (required) 父目录 ID（根目录为 0） |
| `--template-id string` | 模板 ID；空白文档传空字符串 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli airpage export`

导出为 docx/json/pdf

```
wps365-cli airpage export [command]
```

**子命令**：`create` · `get`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for export |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli airpage export create`

创建智能文档导出任务

```
wps365-cli airpage export create <file-id> [flags]
```

| Flag | 说明 |
|---|---|
| `--ai-check` | docx 是否启用 AI 检查 |
| `--attrs string` | docx 导出 attrs |
| `--format string` | 导出格式（docx / json / pdf） (default "docx") |
| `-h, --help` | help for create |
| `--token-type string` | authentication identity: delegated\|app |
| `--version string` | docx 导出版本 |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli airpage export get`

查询智能文档导出任务

```
wps365-cli airpage export get <file-id> [flags]
```

| Flag | 说明 |
|---|---|
| `--format string` | (required) 导出格式 |
| `-h, --help` | help for get |
| `--internal-link` | 是否使用内部链接 |
| `--print` | 是否打印 |
| `--task-id string` | (required) 导出任务 ID |
| `--token-type string` | authentication identity: delegated\|app |
| `--version string` | (required) 文档版本 |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli airpage get`

获取智能文档基本信息

```
wps365-cli airpage get <file-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for get |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli airpage import`

导入 OTL JSON

```
wps365-cli airpage import [command]
```

**子命令**：`create`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for import |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli airpage import create`

导入 OTL JSON

```
wps365-cli airpage import create <file-id> [flags]
```

| Flag | 说明 |
|---|---|
| `--content string` | (required) OTL JSON 内容（按 OpenAPI 原样；不是 Markdown） |
| `-h, --help` | help for create |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli airsheet`

智能表格

```
wps365-cli airsheet [command]
```

**子命令**：`data` · `file` · `row` · `worksheet`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for airsheet |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli airsheet data`

单元格选区读写

```
wps365-cli airsheet data [command]
```

**子命令**：`delete` · `find` · `get` · `update`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for data |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli airsheet data delete`

删除选区数据

```
wps365-cli airsheet data delete <file-id> <worksheet-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for delete |
| `--range-data-body string` | (required) 范围 JSON 数组 |
| `--shift-type string` | 删除后的移动方式 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli airsheet data find`

查找选区数据

```
wps365-cli airsheet data find <file-id> <worksheet-id> [flags]
```

| Flag | 说明 |
|---|---|
| `--filter-body string` | (required) 过滤条件 JSON |
| `-h, --help` | help for find |
| `--range-body string` | (required) 查找范围 JSON |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli airsheet data get`

读取选区数据

```
wps365-cli airsheet data get <file-id> <worksheet-id> [flags]
```

| Flag | 说明 |
|---|---|
| `--col-from int` | (required) 起始列 |
| `--col-to int` | (required) 结束列 |
| `-h, --help` | help for get |
| `--row-from int` | (required) 起始行 |
| `--row-to int` | (required) 结束行 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli airsheet data update`

更新选区数据

```
wps365-cli airsheet data update <file-id> <worksheet-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for update |
| `--range-data-body string` | (required) range_data JSON 数组 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli airsheet file`

智能表格文件

```
wps365-cli airsheet file [command]
```

**子命令**：`create`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for file |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli airsheet file create`

创建智能表格

```
wps365-cli airsheet file create [flags]
```

| Flag | 说明 |
|---|---|
| `--drive-id string` | (required) 盘 ID |
| `-h, --help` | help for create |
| `--name string` | (required) 表格名称 |
| `--on-name-conflict string` | 同名冲突策略 |
| `--parent-id string` | 父目录 ID（根目录为 0） |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli airsheet row`

行追加

```
wps365-cli airsheet row [command]
```

**子命令**：`create`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for row |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli airsheet row create`

追加行

```
wps365-cli airsheet row create <file-id> <worksheet-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for create |
| `--range-data-body string` | (required) range_data JSON 数组 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli airsheet worksheet`

工作表

```
wps365-cli airsheet worksheet [command]
```

**子命令**：`create` · `list`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for worksheet |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli airsheet worksheet create`

创建工作表

```
wps365-cli airsheet worksheet create <file-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for create |
| `--name string` | 工作表名 |
| `--position-body string` | (required) 插入位置 JSON（after_sheet_id / before_sheet_id / end） |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli airsheet worksheet list`

列出工作表

```
wps365-cli airsheet worksheet list <file-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for list |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli api`

Invoke low-level API requests

```
wps365-cli api [command]
```

**子命令**：`delete` · `get` · `head` · `patch` · `post` · `put`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for api |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli api delete`

Execute DELETE request

```
wps365-cli api delete <path> [flags]
```

| Flag | 说明 |
|---|---|
| `--data string` | request body content |
| `--file string` | read request body from file |
| `--header stringArray` | repeatable request header, format key=value |
| `-h, --help` | help for delete |
| `--query stringArray` | repeatable query parameter, format key=value |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli api get`

Execute GET request

```
wps365-cli api get <path> [flags]
```

| Flag | 说明 |
|---|---|
| `--header stringArray` | repeatable request header, format key=value |
| `-h, --help` | help for get |
| `--query stringArray` | repeatable query parameter, format key=value |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli api head`

Execute HEAD request

```
wps365-cli api head <path> [flags]
```

| Flag | 说明 |
|---|---|
| `--header stringArray` | repeatable request header, format key=value |
| `-h, --help` | help for head |
| `--query stringArray` | repeatable query parameter, format key=value |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli api patch`

Execute PATCH request

```
wps365-cli api patch <path> [flags]
```

| Flag | 说明 |
|---|---|
| `--data string` | request body content |
| `--file string` | read request body from file |
| `--header stringArray` | repeatable request header, format key=value |
| `-h, --help` | help for patch |
| `--query stringArray` | repeatable query parameter, format key=value |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli api post`

Execute POST request

```
wps365-cli api post <path> [flags]
```

| Flag | 说明 |
|---|---|
| `--data string` | request body content |
| `--file string` | read request body from file |
| `--header stringArray` | repeatable request header, format key=value |
| `-h, --help` | help for post |
| `--query stringArray` | repeatable query parameter, format key=value |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli api put`

Execute PUT request

```
wps365-cli api put <path> [flags]
```

| Flag | 说明 |
|---|---|
| `--data string` | request body content |
| `--file string` | read request body from file |
| `--header stringArray` | repeatable request header, format key=value |
| `-h, --help` | help for put |
| `--query stringArray` | repeatable query parameter, format key=value |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli auth`

Authentication and credential management

```
wps365-cli auth [command]
```

**子命令**：`clean` · `login` · `logout` · `qrcode` · `refresh` · `setup` · `status` · `token`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for auth |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli auth clean`

Remove all tokens, credentials, client_id and auto-generated keys

```
wps365-cli auth clean [flags]
```

| Flag | 说明 |
|---|---|
| `--force` | skip confirmation prompt |
| `-h, --help` | help for clean |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli auth login`

Perform delegated OAuth login

```
wps365-cli auth login [flags]
```

| Flag | 说明 |
|---|---|
| `--device` | use device code flow (auto-opens browser when available; also works headless) |
| `-h, --help` | help for login |
| `--redirect-uri string` | optional, override the pre-registered local callback URL |
| `--scopes string` | permission scopes, comma-separated (required for auth-code login; optional with --device) |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli auth logout`

Delete local delegated token

```
wps365-cli auth logout [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for logout |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli auth qrcode`

Encode a URL as a QR code (PNG file or ASCII)

```
wps365-cli auth qrcode <url> [flags]
```

| Flag | 说明 |
|---|---|
| `--ascii` | print compact ASCII QR to stdout instead of writing a PNG |
| `--file string` | write PNG to this path (relative to the current directory) |
| `-h, --help` | help for qrcode |
| `--size int` | PNG size in pixels (32-1024); ignored with --ascii (default 256) |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli auth refresh`

Refresh local token

```
wps365-cli auth refresh [flags]
```

| Flag | 说明 |
|---|---|
| `--delegated` | refresh only the delegated token |
| `-h, --help` | help for refresh |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli auth setup`

Save client_id and client_secret

```
wps365-cli auth setup [flags]
```

| Flag | 说明 |
|---|---|
| `--api-base string` | API base URL, e.g. https://open.wps.cn |
| `--api-key string` | API key（仅外部 provider 的 provider-exec <name> auth setup 使用） |
| `--client-id string` | OAuth client_id |
| `--client-secret string` | OAuth client_secret |
| `-h, --help` | help for setup |
| `--redirect-uri string` | optional, pre-registered local callback URL, e.g. http://localhost:18365/callback |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli auth status`

Show current auth status

```
wps365-cli auth status [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for status |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli auth token`

Print current access token to stdout

```
wps365-cli auth token [flags]
```

| Flag | 说明 |
|---|---|
| `--app` | print app token (default: delegated token) |
| `-h, --help` | help for token |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli calendar`

日历、日程与忙闲管理

```
wps365-cli calendar [command]
```

**子命令**：`create` · `delete` · `event` · `event-minutes` · `event-room` · `free-busy` · `get` · `list` · `primary` · `subscribe` · `unsubscribe` · `update`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for calendar |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli calendar create`

创建日历

```
wps365-cli calendar create [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for create |
| `--name string` | (required) 日历标题，长度 1–40 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli calendar delete`

删除日历

```
wps365-cli calendar delete <calendar-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for delete |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli calendar event`

日程的增删改查与搜索

```
wps365-cli calendar event [command]
```

**子命令**：`create` · `delete` · `get` · `list` · `respond` · `search` · `update`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for event |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli calendar event create`

创建日程

```
wps365-cli calendar event create <calendar-id> [flags]
```

| Flag | 说明 |
|---|---|
| `--description string` | 日程描述，最长 2000 字符 |
| `--end string` | (required) 结束时间，RFC3339 格式，例如 2024-01-15T15:30:00+08:00 |
| `--free-busy-status string` | 忙闲状态 |
| `-h, --help` | help for create |
| `--location string` | 地点名称 |
| `--name string` | 日程标题 |
| `--online-meeting-body string` | 在线会议配置 JSON |
| `--recurrence-body string` | 重复规则 JSON |
| `--reminders string` | 提醒时间，单位为分钟，多个用逗号分隔 |
| `--start string` | (required) 起始时间，RFC3339 格式，例如 2024-01-15T14:30:00+08:00 |
| `--token-type string` | authentication identity: delegated\|app |
| `--visibility string` | 可见性 |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli calendar event delete`

删除日程

```
wps365-cli calendar event delete <calendar-id> <event-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for delete |
| `--mod-type string` | 重复日程删除范围，可选 one 或 all |
| `--no-notification` | 不向参与者发通知 |
| `--token-type string` | authentication identity: delegated\|app |
| `--which-day-time string` | 重复日程中要删的那一天的开始时间（毫秒时间戳），mod-type=one 时必填 |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli calendar event get`

查询日程

```
wps365-cli calendar event get <calendar-id> <event-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for get |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli calendar event list`

查询日程列表

```
wps365-cli calendar event list <calendar-id> [flags]
```

| Flag | 说明 |
|---|---|
| `--anchor-time string` | 锚点时间，RFC3339 格式 |
| `--end string` | 结束时间，RFC3339 格式 |
| `-h, --help` | help for list |
| `--page-size int` | 每页数量，1–100，默认 30 (default 30) |
| `--page-token string` | 分页标记 |
| `--start string` | 起始时间，RFC3339 格式，与 --end 配合使用，区间不超过 31 天 |
| `--sync-token string` | 增量同步 token |
| `--token-type string` | authentication identity: delegated\|app |
| `--with-cancelled` | 增量同步时是否包含已取消的日程 |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli calendar event respond`

答复日程邀请

```
wps365-cli calendar event respond <calendar-id> <event-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for respond |
| `--mod-type string` | (required) 答复范围，可选 normal、one、all (default "normal") |
| `--status string` | (required) 答复状态，可选 accepted、declined、tentative |
| `--token-type string` | authentication identity: delegated\|app |
| `--which-day-time string` | (required) 日程开始时间戳（毫秒） |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli calendar event search`

搜索日程

```
wps365-cli calendar event search <calendar-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for search |
| `--keyword string` | (required) 搜索关键词，长度 1–100 |
| `--page-size int` | 每页数量，1–500，默认 200 (default 200) |
| `--page-token string` | 分页标记 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli calendar event update`

修改日程

```
wps365-cli calendar event update <calendar-id> <event-id> [flags]
```

| Flag | 说明 |
|---|---|
| `--description string` | 日程描述 |
| `--end string` | 结束时间，RFC3339 格式 |
| `--free-busy-status string` | 忙闲状态 |
| `-h, --help` | help for update |
| `--location string` | 地点名称 |
| `--mod-type string` | 重复日程修改范围，可选 one 或 all |
| `--name string` | 日程标题 |
| `--no-notification` | 不向参与者发更新通知 |
| `--online-meeting-body string` | 在线会议配置 JSON |
| `--recurrence-body string` | 重复规则 JSON |
| `--reminders string` | 提醒时间，单位为分钟，多个用逗号分隔 |
| `--start string` | 起始时间，RFC3339 格式 |
| `--token-type string` | authentication identity: delegated\|app |
| `--visibility string` | 可见性 |
| `--which-day-time string` | 重复日程中要改的那一天的开始时间（毫秒时间戳），mod-type=one 时必填 |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli calendar event-minutes`

日程会议纪要

```
wps365-cli calendar event-minutes [command]
```

**子命令**：`create`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for event-minutes |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli calendar event-minutes create`

创建会议纪要

```
wps365-cli calendar event-minutes create <calendar-id> <event-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for create |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli calendar event-room`

日程会议室管理

```
wps365-cli calendar event-room [command]
```

**子命令**：`add` · `list` · `remove`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for event-room |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli calendar event-room add`

批量添加日程会议室

```
wps365-cli calendar event-room add <calendar-id> <event-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for add |
| `--room-ids string` | (required) 会议室 id，多个用逗号分隔，最多 40 个 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli calendar event-room list`

查询日程的会议室列表

```
wps365-cli calendar event-room list <calendar-id> <event-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for list |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli calendar event-room remove`

批量删除日程会议室

```
wps365-cli calendar event-room remove <calendar-id> <event-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for remove |
| `--room-ids string` | (required) 会议室 id，多个用逗号分隔，最多 50 个 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli calendar free-busy`

忙闲信息查询

```
wps365-cli calendar free-busy [command]
```

**子命令**：`list`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for free-busy |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli calendar free-busy list`

查看日程忙闲

```
wps365-cli calendar free-busy list [flags]
```

| Flag | 说明 |
|---|---|
| `--end string` | (required) 结束时间，RFC3339 格式，与 --start 间隔不超过 7 天 |
| `-h, --help` | help for list |
| `--room-ids string` | 会议室 ID，多个用逗号分隔，最多 50 个 |
| `--start string` | (required) 起始时间，RFC3339 格式 |
| `--token-type string` | authentication identity: delegated\|app |
| `--user-ids string` | 用户 ID，多个用逗号分隔，最多 50 个 |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli calendar get`

查看日历

```
wps365-cli calendar get <calendar-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for get |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli calendar list`

查询日历列表

```
wps365-cli calendar list [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for list |
| `--page-size int` | 每页返回的日历数量，默认为 20，最大值为 20 (default 20) |
| `--page-token string` | 分页标记，传入上一次响应中的 next_page_token |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli calendar primary`

主日历批量查询

```
wps365-cli calendar primary [command]
```

**子命令**：`batch-get`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for primary |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli calendar primary batch-get`

批量获取主日历

```
wps365-cli calendar primary batch-get [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for batch-get |
| `--token-type string` | authentication identity: delegated\|app |
| `--user-ids string` | (required) 用户 ID，多个用逗号分隔，最多 20 个 |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli calendar subscribe`

订阅日历

```
wps365-cli calendar subscribe <calendar-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for subscribe |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli calendar unsubscribe`

取消订阅日历

```
wps365-cli calendar unsubscribe <calendar-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for unsubscribe |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli calendar update`

修改日历

```
wps365-cli calendar update <calendar-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for update |
| `--name string` | 新的日历标题，长度 1–40 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli completion`

Generate shell completion scripts

```
wps365-cli completion [command]
```

**子命令**：`bash` · `zsh`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for completion |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli completion bash`

Generate bash completion script

```
wps365-cli completion bash [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for bash |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli completion zsh`

Generate zsh completion script

```
wps365-cli completion zsh [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for zsh |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli config`

Local configuration and application binding

```
wps365-cli config [command]
```

**子命令**：`get` · `init` · `path` · `set` · `unset`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for config |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli config get`

Get a config value

```
wps365-cli config get <key> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for get |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli config init`

Initialize CLI by binding an application

```
wps365-cli config init [flags]
```

| Flag | 说明 |
|---|---|
| `--app-id string` | bind an existing application by ID |
| `--debug` | verbose output for debugging |
| `--force` | overwrite existing binding without confirmation |
| `-h, --help` | help for init |
| `--new` | create a new application |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli config path`

Show config directory path

```
wps365-cli config path [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for path |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli config set`

Set a config value

```
wps365-cli config set <key> <value> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for set |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli config unset`

Unset a config value

```
wps365-cli config unset <key> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for unset |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli dbsheet`

多维表数据管理

```
wps365-cli dbsheet [command]
```

**子命令**：`field` · `record` · `schema` · `sheet`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for dbsheet |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli dbsheet field`

字段管理

```
wps365-cli dbsheet field [command]
```

**子命令**：`create` · `delete` · `update`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for field |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli dbsheet field create`

创建字段

```
wps365-cli dbsheet field create <file-id> <sheet-id> [flags]
```

| Flag | 说明 |
|---|---|
| `--fields-body string` | 字段定义 JSON 数组 |
| `-h, --help` | help for create |
| `--prefer-id` | 是否优先使用指定 ID |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli dbsheet field delete`

删除字段

```
wps365-cli dbsheet field delete <file-id> <sheet-id> [flags]
```

| Flag | 说明 |
|---|---|
| `--fields string` | (required) 待删除字段 ID 列表，多个用逗号分隔 |
| `-h, --help` | help for delete |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli dbsheet field update`

更新字段

```
wps365-cli dbsheet field update <file-id> <sheet-id> [flags]
```

| Flag | 说明 |
|---|---|
| `--fields-body string` | (required) 字段更新 JSON 数组 |
| `-h, --help` | help for update |
| `--prefer-id` | 是否优先使用指定 ID |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli dbsheet record`

记录的增删改查

```
wps365-cli dbsheet record [command]
```

**子命令**：`create` · `delete` · `get` · `list` · `search` · `update`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for record |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli dbsheet record create`

创建记录

```
wps365-cli dbsheet record create <file-id> <sheet-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for create |
| `--prefer-id` | 是否优先使用指定 ID |
| `--records-body string` | 记录数据 JSON 数组，每项含 fields_value |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli dbsheet record delete`

删除记录

```
wps365-cli dbsheet record delete <file-id> <sheet-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for delete |
| `--records string` | (required) 待删除记录 ID 列表，多个用逗号分隔 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli dbsheet record get`

获取单条记录

```
wps365-cli dbsheet record get <file-id> <sheet-id> <record-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for get |
| `--prefer-id` | 是否优先使用指定 ID |
| `--show-fields-info` | 是否返回字段 schema |
| `--show-record-extra-info` | 是否返回记录额外信息 |
| `--text-value string` | 文本值格式 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli dbsheet record list`

列出所有记录

```
wps365-cli dbsheet record list <file-id> <sheet-id> [flags]
```

| Flag | 说明 |
|---|---|
| `--fields string` | 返回字段列表，多个用逗号分隔 |
| `--filter-body string` | 筛选条件 JSON |
| `-h, --help` | help for list |
| `--max-records int` | 最大记录数 |
| `--page-size int` | 每页大小 |
| `--page-token string` | 分页 token |
| `--prefer-id` | 是否优先使用指定 ID |
| `--show-fields-info` | 是否返回字段 schema |
| `--show-record-extra-info` | 是否返回记录额外信息 |
| `--text-value string` | 文本值格式 |
| `--token-type string` | authentication identity: delegated\|app |
| `--view-id string` | 视图 ID |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli dbsheet record search`

批量检索记录

```
wps365-cli dbsheet record search <file-id> <sheet-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for search |
| `--prefer-id` | 是否优先使用指定 ID |
| `--records string` | (required) 记录 ID 列表，多个用逗号分隔 |
| `--show-fields-info` | 是否返回字段 schema |
| `--show-record-extra-info` | 是否返回记录额外信息 |
| `--text-value string` | 文本值格式 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli dbsheet record update`

更新记录

```
wps365-cli dbsheet record update <file-id> <sheet-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for update |
| `--prefer-id` | 是否优先使用指定 ID |
| `--records-body string` | 记录更新 JSON 数组，每项含 id 和 fields_value |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli dbsheet schema`

多维表结构信息

```
wps365-cli dbsheet schema [command]
```

**子命令**：`get`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for schema |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli dbsheet schema get`

获取多维表格 schema

```
wps365-cli dbsheet schema get <file-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for get |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli dbsheet sheet`

数据表管理

```
wps365-cli dbsheet sheet [command]
```

**子命令**：`create` · `delete` · `update`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for sheet |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli dbsheet sheet create`

创建数据表

```
wps365-cli dbsheet sheet create <file-id> [flags]
```

| Flag | 说明 |
|---|---|
| `--after-sheet-id int` | 插入到指定数据表之后（数据表 ID） |
| `--before-sheet-id int` | 插入到指定数据表之前（数据表 ID） |
| `--fields-body string` | (required) 字段定义 JSON 数组（字段类型使用 PascalCase，如 MultiLineText、SingleSelect） |
| `-h, --help` | help for create |
| `--name string` | 数据表名称 |
| `--token-type string` | authentication identity: delegated\|app |
| `--views-body string` | (required) 视图定义 JSON 数组（视图类型使用 PascalCase，如 Grid、Kanban） |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli dbsheet sheet delete`

删除数据表

```
wps365-cli dbsheet sheet delete <file-id> <sheet-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for delete |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli dbsheet sheet update`

更新数据表

```
wps365-cli dbsheet sheet update <file-id> <sheet-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for update |
| `--name string` | 新数据表名称 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli drive`

云文档与文件管理

```
wps365-cli drive [command]
```

**子命令**：`create` · `doclib` · `file` · `file-content` · `file-path` · `file-version` · `get` · `link` · `list` · `recent-file` · `starred-file`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for drive |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli drive create`

新建驱动盘

```
wps365-cli drive create [flags]
```

| Flag | 说明 |
|---|---|
| `--allotee-id string` | 归属身份 ID |
| `--allotee-type string` | 归属类型 (default "user") |
| `-h, --help` | help for create |
| `--name string` | (required) 盘名称 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli drive doclib`

文档库（团队文档）管理

```
wps365-cli drive doclib [command]
```

**子命令**：`get` · `list`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for doclib |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli drive doclib get`

获取文档库详情

```
wps365-cli drive doclib get [flags]
```

| Flag | 说明 |
|---|---|
| `--drive-id string` | (required) 文档库盘 ID |
| `-h, --help` | help for get |
| `--id-type string` | ID 类型 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli drive doclib list`

获取文档库列表

```
wps365-cli drive doclib list [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for list |
| `--page-size int` | (required) 每页数量 |
| `--page-token string` | 翻页 token |
| `--token-type string` | authentication identity: delegated\|app |
| `--user-role string` | 按角色过滤（owner/admin/normal），多个用逗号分隔 |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli drive file`

文件与文件夹操作

```
wps365-cli drive file [command]
```

**子命令**：`batch-copy` · `batch-move` · `create` · `delete` · `download` · `get` · `list` · `rename` · `search`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for file |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli drive file batch-copy`

批量复制文件

```
wps365-cli drive file batch-copy <drive-id> [flags]
```

| Flag | 说明 |
|---|---|
| `--dst-drive-id string` | (required) 目标盘 ID |
| `--dst-parent-id string` | (required) 目标父目录 ID |
| `--file-ids string` | (required) 文件 ID，多个用逗号分隔 |
| `-h, --help` | help for batch-copy |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli drive file batch-move`

批量移动文件

```
wps365-cli drive file batch-move <drive-id> [flags]
```

| Flag | 说明 |
|---|---|
| `--dst-drive-id string` | (required) 目标盘 ID |
| `--dst-parent-id string` | (required) 目标父目录 ID |
| `--file-ids string` | (required) 文件 ID，多个用逗号分隔 |
| `-h, --help` | help for batch-move |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli drive file create`

新建文件或文件夹

```
wps365-cli drive file create <drive-id> <parent-id> [flags]
```

| Flag | 说明 |
|---|---|
| `--file-type string` | (required) 文件类型 |
| `-h, --help` | help for create |
| `--id-type string` | ID 类型 |
| `--name string` | (required) 名称 |
| `--on-name-conflict string` | 同名冲突策略 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli drive file delete`

删除文件

```
wps365-cli drive file delete <drive-id> <file-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for delete |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli drive file download`

获取文件下载信息

```
wps365-cli drive file download <drive-id> <file-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for download |
| `--token-type string` | authentication identity: delegated\|app |
| `--with-hash` | 是否返回哈希 |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli drive file get`

获取文件信息

```
wps365-cli drive file get <drive-id> <file-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for get |
| `--id-type string` | ID 类型 |
| `--token-type string` | authentication identity: delegated\|app |
| `--with-drive` | 是否返回盘信息 |
| `--with-ext-attrs` | 是否返回扩展属性 |
| `--with-permission` | 是否返回权限信息 |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli drive file list`

获取子文件列表

```
wps365-cli drive file list <drive-id> <parent-id> [flags]
```

| Flag | 说明 |
|---|---|
| `--filter-exts string` | 按扩展名过滤 |
| `--filter-type string` | 按类型过滤 |
| `-h, --help` | help for list |
| `--id-type string` | ID 类型 |
| `--order string` | 排序方向 |
| `--order-by string` | 排序字段 |
| `--page-size int` | 分页大小 |
| `--page-token string` | 分页标记 |
| `--token-type string` | authentication identity: delegated\|app |
| `--with-ext-attrs` | 是否返回扩展属性 |
| `--with-permission` | 是否返回权限信息 |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli drive file rename`

重命名文件或文件夹

```
wps365-cli drive file rename <drive-id> <file-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for rename |
| `--id-type string` | ID 类型 |
| `--name string` | (required) 新名称 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli drive file search`

搜索文件

```
wps365-cli drive file search [flags]
```

| Flag | 说明 |
|---|---|
| `--drive-ids string` | 盘 ID 列表，多个用逗号分隔 |
| `--file-exts string` | 扩展名过滤 |
| `--file-type string` | 文件类型过滤 |
| `-h, --help` | help for search |
| `--keyword string` | 关键字 |
| `--page-size int` | 分页大小 |
| `--page-token string` | 分页标记 |
| `--parent-ids string` | 父目录 ID 列表，多个用逗号分隔 |
| `--token-type string` | authentication identity: delegated\|app |
| `--type string` | 搜索类型 (default "all") |
| `--with-permission` | 是否返回权限信息 |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli drive file-content`

文件正文内容

```
wps365-cli drive file-content [command]
```

**子命令**：`get`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for file-content |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli drive file-content get`

文档内容抽取

```
wps365-cli drive file-content get <drive-id> <file-id> [flags]
```

| Flag | 说明 |
|---|---|
| `--format string` | 内容格式 |
| `-h, --help` | help for get |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli drive file-path`

文件路径查询

```
wps365-cli drive file-path [command]
```

**子命令**：`get`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for file-path |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli drive file-path get`

获取文件路径

```
wps365-cli drive file-path get <drive-id> <file-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for get |
| `--id-type string` | ID 类型 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli drive file-version`

文件版本管理

```
wps365-cli drive file-version [command]
```

**子命令**：`get` · `list`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for file-version |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli drive file-version get`

获取文件版本信息

```
wps365-cli drive file-version get <drive-id> <file-id> <version-num> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for get |
| `--id-type string` | ID 类型 |
| `--token-type string` | authentication identity: delegated\|app |
| `--with-ext-attrs` | 是否返回扩展属性 |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli drive file-version list`

获取文件版本列表

```
wps365-cli drive file-version list <drive-id> <file-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for list |
| `--id-type string` | ID 类型 |
| `--page-size int` | 分页大小 |
| `--page-token string` | 分页标记 |
| `--token-type string` | authentication identity: delegated\|app |
| `--with-comment` | 是否返回版本备注 |
| `--with-ext-attrs` | 是否返回扩展属性 |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli drive get`

获取盘信息

```
wps365-cli drive get <drive-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for get |
| `--token-type string` | authentication identity: delegated\|app |
| `--with-ext-attrs` | 是否返回扩展属性 |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli drive link`

文件分享链接管理

```
wps365-cli drive link [command]
```

**子命令**：`close` · `open`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for link |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli drive link close`

取消文件分享

```
wps365-cli drive link close <drive-id> <file-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for close |
| `--mode string` | 关闭模式 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli drive link open`

开启文件分享

```
wps365-cli drive link open <drive-id> <file-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for open |
| `--role-id string` | (required) 角色 ID |
| `--scope string` | (required) 分享范围 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli drive list`

获取盘列表

```
wps365-cli drive list [flags]
```

| Flag | 说明 |
|---|---|
| `--allotee-id string` | 盘归属身份 ID |
| `--allotee-type string` | 盘归属身份类型（user、group、app） (default "user") |
| `-h, --help` | help for list |
| `--id-type string` | ID 类型 |
| `--page-size int` | 分页大小，最大 500 |
| `--page-token string` | 分页标记 |
| `--sources string` | 盘来源，多个用逗号分隔 |
| `--token-type string` | authentication identity: delegated\|app |
| `--with-ext-attrs` | 是否返回扩展属性 |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli drive recent-file`

最近访问的文件

```
wps365-cli drive recent-file [command]
```

**子命令**：`list`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for recent-file |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli drive recent-file list`

获取最近文件列表

```
wps365-cli drive recent-file list [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for list |
| `--id-type string` | ID 类型 |
| `--include-exts string` | 包含的扩展名 |
| `--page-size int` | 分页大小 |
| `--page-token string` | 分页标记 |
| `--token-type string` | authentication identity: delegated\|app |
| `--with-permission` | 是否返回权限信息 |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli drive starred-file`

收藏的文件

```
wps365-cli drive starred-file [command]
```

**子命令**：`list`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for starred-file |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli drive starred-file list`

获取收藏文件列表

```
wps365-cli drive starred-file list [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for list |
| `--id-type string` | ID 类型 |
| `--include-exts string` | 包含的扩展名 |
| `--page-size int` | 分页大小 |
| `--page-token string` | 分页标记 |
| `--token-type string` | authentication identity: delegated\|app |
| `--with-permission` | 是否返回权限信息 |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli help`

Help about any command

```
wps365-cli help [command] [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for help |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli im`

消息与群会话管理

```
wps365-cli im [command]
```

**子命令**：`chat` · `chat-member` · `message` · `p2p-chat` · `unread-chat`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for im |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli im chat`

群会话管理

```
wps365-cli im chat [command]
```

**子命令**：`create` · `delete` · `get` · `list` · `update`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for chat |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli im chat create`

创建会话

```
wps365-cli im chat create [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for create |
| `--member-ids string` | (required) 成员用户 ID，多个用逗号分隔；P2P 需包含操作者和对方 |
| `--name string` | 群名称（群聊时使用） |
| `--owner-id string` | 群主用户 ID（群聊时必填） |
| `--token-type string` | authentication identity: delegated\|app |
| `--type string` | (required) 会话类型，可选 p2p 或 group |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli im chat delete`

解散群

```
wps365-cli im chat delete <chat-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for delete |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli im chat get`

获取会话信息

```
wps365-cli im chat get <chat-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for get |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli im chat list`

获取会话列表

```
wps365-cli im chat list [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for list |
| `--page-size int` | 每页数量，1–100 |
| `--page-token string` | 分页标记 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli im chat update`

更新群信息

```
wps365-cli im chat update <chat-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for update |
| `--name string` | 新的群名称 |
| `--owner-id string` | 新的群主用户 ID |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli im chat-member`

群成员管理

```
wps365-cli im chat-member [command]
```

**子命令**：`add` · `list` · `remove`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for chat-member |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli im chat-member add`

添加群成员

```
wps365-cli im chat-member add <chat-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for add |
| `--token-type string` | authentication identity: delegated\|app |
| `--user-ids string` | (required) 成员用户 ID，多个用逗号分隔，最多 100 个 |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli im chat-member list`

获取群成员列表

```
wps365-cli im chat-member list <chat-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for list |
| `--page-size int` | 每页数量，1–100 |
| `--page-token string` | 分页标记 |
| `--status int` | 成员状态，可选 1: normal、2: dissolved (default 1) |
| `--token-type string` | authentication identity: delegated\|app |
| `--type string` | 成员类型，可选 user、app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli im chat-member remove`

删除群成员

```
wps365-cli im chat-member remove <chat-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for remove |
| `--token-type string` | authentication identity: delegated\|app |
| `--user-ids string` | (required) 成员用户 ID，多个用逗号分隔，最多 100 个 |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli im message`

消息发送与撤回

```
wps365-cli im message [command]
```

**子命令**：`recall` · `send`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for message |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli im message recall`

撤回消息

```
wps365-cli im message recall <message-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for recall |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli im message send`

发送文本消息

```
wps365-cli im message send [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for send |
| `--id-type string` | 高级参数，对应请求头 X-Kso-Id-Type (default "internal") |
| `--mentions-body string` | 高级参数，传入 mentions JSON，用于 <at ...> 标签对应的 at 信息 |
| `--partner-id string` | 关联组织 ID；当 receiver-type 为关联组织类型时使用 |
| `--receiver-type string` | 接收者类型，可选 user、dept、company、chat、enterprise_partner、enterprise_partner_dept、enterprise_partner_user (default "user") |
| `--text string` | (required) 发送的文本内容 |
| `--text-format string` | 文本格式，可选 plain 或 markdown (default "plain") |
| `--to string` | (required) 接收者 ID，多个用逗号分隔；同一次调用中的接收者类型必须一致 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli im p2p-chat`

单聊会话查询

```
wps365-cli im p2p-chat [command]
```

**子命令**：`get`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for p2p-chat |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli im p2p-chat get`

获取 P2P 会话

```
wps365-cli im p2p-chat get [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for get |
| `--id-type string` | 高级参数，对应请求头 X-Kso-Id-Type (default "internal") |
| `--token-type string` | authentication identity: delegated\|app |
| `--user-id string` | (required) 用户 ID |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli im unread-chat`

未读会话统计

```
wps365-cli im unread-chat [command]
```

**子命令**：`count`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for unread-chat |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli im unread-chat count`

获取未读消息数

```
wps365-cli im unread-chat count [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for count |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli mail`

邮箱与邮件管理

```
wps365-cli mail [command]
```

**子命令**：`draft` · `mailbox` · `mailbox-folder` · `message`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for mail |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli mail draft`

邮件草稿管理

```
wps365-cli mail draft [command]
```

**子命令**：`create` · `send`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for draft |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli mail draft create`

创建草稿

```
wps365-cli mail draft create <mailbox-id> [flags]
```

| Flag | 说明 |
|---|---|
| `--bcc string` | 密送人邮箱地址，多个用逗号分隔 |
| `--body string` | 邮件正文 |
| `--cc string` | 抄送人邮箱地址，多个用逗号分隔 |
| `-h, --help` | help for create |
| `--subject string` | 邮件标题 |
| `--to string` | 收件人邮箱地址，多个用逗号分隔 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli mail draft send`

发送草稿

```
wps365-cli mail draft send <mailbox-id> <message-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for send |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli mail mailbox`

邮箱列表管理

```
wps365-cli mail mailbox [command]
```

**子命令**：`list`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for mailbox |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli mail mailbox list`

获取邮箱列表

```
wps365-cli mail mailbox list [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for list |
| `--page-size int` | 每页数量，1–100 |
| `--page-token string` | 分页标记 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli mail mailbox-folder`

邮箱文件夹管理

```
wps365-cli mail mailbox-folder [command]
```

**子命令**：`list`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for mailbox-folder |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli mail mailbox-folder list`

获取邮箱目录列表

```
wps365-cli mail mailbox-folder list <mailbox-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for list |
| `--page-size int` | 每页数量，1–50，默认 10 (default 10) |
| `--page-token string` | 分页标记 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli mail message`

邮件消息管理

```
wps365-cli mail message [command]
```

**子命令**：`get` · `list` · `search`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for message |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli mail message get`

获取邮件详情

```
wps365-cli mail message get <mailbox-id> <folder-id> <message-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for get |
| `--token-type string` | authentication identity: delegated\|app |
| `--with-importance-flag` | 是否返回重要性标识 |
| `--with-ocr-body` | 是否返回 OCR 正文 |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli mail message list`

获取邮件列表

```
wps365-cli mail message list <mailbox-id> <folder-id> [flags]
```

| Flag | 说明 |
|---|---|
| `--end int` | 结束时间戳 |
| `--filter string` | 过滤条件，可选 unread、flagged，多个用逗号分隔 |
| `-h, --help` | help for list |
| `--page-size int` | 每页数量，1–10 |
| `--page-token string` | 分页标记 |
| `--start int` | 起始时间戳 |
| `--thread-id string` | 会话 ID，按会话筛选 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli mail message search`

高级搜索邮件

```
wps365-cli mail message search [flags]
```

| Flag | 说明 |
|---|---|
| `--end int` | 结束时间戳 |
| `--folders string` | 搜索目录范围 |
| `--from string` | 按发件人搜索 |
| `--has-attachment` | 是否有附件 |
| `-h, --help` | help for search |
| `--keyword string` | 搜索关键词 |
| `--mailbox-ids string` | (required) 邮箱 ID，多个用逗号分隔 |
| `--page-size int` | 每页数量，1–10 (default 5) |
| `--page-token string` | 分页标记 |
| `--start int` | 起始时间戳 |
| `--subject string` | 按标题搜索 |
| `--to string` | 按收件人搜索 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli mcp`

Expose curated commands as a stdio MCP server

```
wps365-cli mcp [command]
```

**子命令**：`config` · `doctor` · `serve` · `tools`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for mcp |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli mcp config`

Print MCP client config snippet for Workbuddy / Claude / Cursor

```
wps365-cli mcp config [flags]
```

| Flag | 说明 |
|---|---|
| `--app string` | target client: workbuddy\|claude\|cursor (default "workbuddy") |
| `-h, --help` | help for config |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli mcp doctor`

Check MCP prerequisites (spec load, credentials)

```
wps365-cli mcp doctor [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for doctor |
| `--json` | output JSON (default; always JSON) |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli mcp serve`

Start MCP stdio server (JSON-RPC on stdin/stdout)

```
wps365-cli mcp serve [flags]
```

| Flag | 说明 |
|---|---|
| `--domains string` | comma-separated domain prefixes to expose (e.g. calendar,im) |
| `-h, --help` | help for serve |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli mcp tools`

List MCP tools mapped from the curated catalog

```
wps365-cli mcp tools [flags]
```

| Flag | 说明 |
|---|---|
| `--domains string` | comma-separated domain prefixes (e.g. calendar,im) |
| `-h, --help` | help for tools |
| `--json` | output JSON (name, description, inputSchema) |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli meeting`

在线会议管理

```
wps365-cli meeting [command]
```

**子命令**：`end` · `get` · `list` · `minute` · `minute-summary` · `minute-transcript` · `participant` · `recording` · `recording-summary` · `set-host`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for meeting |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli meeting end`

结束会议

```
wps365-cli meeting end <meeting-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for end |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli meeting get`

获取会议详情

```
wps365-cli meeting get <meeting-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for get |
| `--id-type string` | 用户 ID 类型 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli meeting list`

获取会议列表

```
wps365-cli meeting list [flags]
```

| Flag | 说明 |
|---|---|
| `--end string` | (required) 查询结束时间（unix 时间，单位 sec） |
| `-h, --help` | help for list |
| `--join-code string` | 入会码；传入时只返回进行中的会议，不传时只返回已结束的会议。应用身份下必须传入 |
| `--page-size int` | 分页大小，默认 20，最大 50 (default 20) |
| `--page-token string` | 分页标记 |
| `--start string` | (required) 查询开始时间（unix 时间，单位 sec） |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli meeting minute`

会议纪要

```
wps365-cli meeting minute [command]
```

**子命令**：`list`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for minute |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli meeting minute list`

获取纪要列表

```
wps365-cli meeting minute list <meeting-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for list |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli meeting minute-summary`

会议纪要摘要

```
wps365-cli meeting minute-summary [command]
```

**子命令**：`get`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for minute-summary |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli meeting minute-summary get`

获取纪要总结要点

```
wps365-cli meeting minute-summary get <meeting-id> <minute-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for get |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli meeting minute-transcript`

会议纪要转写

```
wps365-cli meeting minute-transcript [command]
```

**子命令**：`get`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for minute-transcript |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli meeting minute-transcript get`

获取纪要语音转写

```
wps365-cli meeting minute-transcript get <meeting-id> <minute-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for get |
| `--id-type string` | 用户 ID 类型 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli meeting participant`

参会人管理

```
wps365-cli meeting participant [command]
```

**子命令**：`invite` · `list` · `remove`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for participant |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli meeting participant invite`

邀请参会人

```
wps365-cli meeting participant invite <meeting-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for invite |
| `--id-type string` | 用户 ID 类型 |
| `--invitees string` | (required) 被邀请人用户 ID，多个用逗号分隔，最多 20 个 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli meeting participant list`

获取参会人列表

```
wps365-cli meeting participant list <meeting-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for list |
| `--id-type string` | 用户 ID 类型 |
| `--page-size int` | 分页大小，默认 20，最大 100 (default 20) |
| `--page-token string` | 分页标记 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli meeting participant remove`

移除参会人

```
wps365-cli meeting participant remove <meeting-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for remove |
| `--id-type string` | 用户 ID 类型 |
| `--token-type string` | authentication identity: delegated\|app |
| `--user-ids string` | (required) 被移除用户 ID，多个用逗号分隔，最多 20 个 |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli meeting recording`

会议录制

```
wps365-cli meeting recording [command]
```

**子命令**：`list`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for recording |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli meeting recording list`

获取录制列表

```
wps365-cli meeting recording list <meeting-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for list |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli meeting recording-summary`

录制摘要

```
wps365-cli meeting recording-summary [command]
```

**子命令**：`get`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for recording-summary |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli meeting recording-summary get`

获取录制总结要点

```
wps365-cli meeting recording-summary get <meeting-id> <recording-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for get |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli meeting set-host`

设置主持人

```
wps365-cli meeting set-host <meeting-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for set-host |
| `--host-user-id string` | (required) 新主持人用户 ID |
| `--id-type string` | 用户 ID 类型 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli provider`

管理 provider

```
wps365-cli provider [command]
```

**子命令**：`add` · `list` · `remove` · `show` · `update`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for provider |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli provider add`

新增 provider

```
wps365-cli provider add [flags]
```

| Flag | 说明 |
|---|---|
| `--auth-client-id string` | provider OAuth client_id |
| `--auth-header string` | 运行时认证请求头名称 |
| `--auth-scheme string` | 运行时认证 scheme |
| `--auth-type string` | provider 认证类型：oauth2\|api-key |
| `--auth-url string` | OAuth 授权端点相对路径 |
| `--base-url string` | provider API 基础 URL |
| `--enabled` | 是否启用该 provider (default true) |
| `--from-file string` | 从 JSON/YAML 文件读取 provider 配置 |
| `-h, --help` | help for add |
| `--name string` | provider 名称（仅允许英文小写字母与数字） |
| `--source-curated-url string` | provider 远端 curated URL 或 API 路径 |
| `--source-type string` | provider source 类型：builtin\|remote |
| `--source-url string` | provider 远端 OpenAPI URL 或 API 路径 |
| `--token-url string` | OAuth token 端点相对路径 |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli provider list`

列出已配置的 provider

```
wps365-cli provider list [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for list |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli provider remove`

删除 provider

```
wps365-cli provider remove <name> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for remove |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli provider show`

查看 provider 详情

```
wps365-cli provider show <name> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for show |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli provider update`

更新 provider

```
wps365-cli provider update <name> [flags]
```

| Flag | 说明 |
|---|---|
| `--auth-client-id string` | provider OAuth client_id |
| `--auth-header string` | 运行时认证请求头名称 |
| `--auth-scheme string` | 运行时认证 scheme |
| `--auth-type string` | provider 认证类型：oauth2\|api-key |
| `--auth-url string` | OAuth 授权端点相对路径 |
| `--base-url string` | provider API 基础 URL |
| `--enabled` | 是否启用该 provider (default true) |
| `-h, --help` | help for update |
| `--name string` | provider 名称（仅允许英文小写字母与数字） |
| `--source-curated-url string` | provider 远端 curated URL 或 API 路径 |
| `--source-type string` | provider source 类型：builtin\|remote |
| `--source-url string` | provider 远端 OpenAPI URL 或 API 路径 |
| `--token-url string` | OAuth token 端点相对路径 |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli spec`

Manage builtin wps365 spec files

```
wps365-cli spec [command]
```

**子命令**：`status` · `update`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for spec |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli spec status`

Show local spec file status

```
wps365-cli spec status [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for status |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli spec update`

Update official spec files from remote

```
wps365-cli spec update [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for update |
| `-y, --yes` | skip confirmation prompt |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli update`

Update wps365-cli from the official CDN

```
wps365-cli update [flags]
```

| Flag | 说明 |
|---|---|
| `--check` | only compare versions; do not download or replace |
| `--force` | re-download and replace even if already up to date |
| `-h, --help` | help for update |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli user`

企业用户与组织架构

```
wps365-cli user [command]
```

**子命令**：`dept` · `get` · `list` · `me` · `search`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for user |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli user dept`

用户所属部门查询

```
wps365-cli user dept [command]
```

**子命令**：`list`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for dept |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli user dept list`

获取用户所在部门列表

```
wps365-cli user dept list <user-id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for list |
| `--id-type string` | ID 类型 |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli user get`

获取指定用户

```
wps365-cli user get <identifier> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for get |
| `--id-type string` | ID 类型 |
| `--status string` | 用户状态过滤，多个用逗号分隔，可选值：active、notactive、disabled |
| `--token-type string` | authentication identity: delegated\|app |
| `--type string` | 查询类型：id（默认）、email、phone、external-id (default "id") |
| `--with-dept` | 是否返回部门信息 |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli user list`

列出所有用户

```
wps365-cli user list [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for list |
| `--id-type string` | ID 类型 |
| `--page-size int` | 分页大小，默认 10，最大 50 (default 10) |
| `--page-token string` | 分页标记 |
| `--status stringArray` | 用户状态，可选值：active、notactive、disabled (default [active]) |
| `--token-type string` | authentication identity: delegated\|app |
| `--with-dept` | 是否返回部门信息 |
| `--with-total` | 是否返回总数 |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli user me`

获取当前用户信息

```
wps365-cli user me [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for me |
| `--token-type string` | authentication identity: delegated\|app |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli user search`

搜索企业用户

```
wps365-cli user search [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for search |
| `--id-type string` | ID 类型 |
| `--keyword string` | (required) 搜索关键字 |
| `--page-size int` | 分页大小 |
| `--page-token string` | 分页标记 |
| `--search-field stringArray` | 搜索字段，可选值：email、phone、user_name、login_name (default [user_name]) |
| `--search-source stringArray` | 搜索来源，可选值：company_user、enterprise_partner (default [company_user]) |
| `--search-source-v2 stringArray` | 搜索来源 v2，可选值：company_user、enterprise_partner |
| `--status stringArray` | 用户状态过滤，可选值：active、notactive、disabled、dimission (default [active]) |
| `--token-type string` | authentication identity: delegated\|app |
| `--user-type stringArray` | 用户类型，可选值：company_member、external_guest |
| `--with-total` | 是否返回总数 |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |

### `wps365-cli version`

Show version information

```
wps365-cli version [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for version |
| `--dry-run` | print the request without sending it |
| `--flatten` | flatten nested objects for columnar outputs |
| `--jq string` | apply a jq filter using the built-in Go engine |
| `--no-color` | disable colorized output |
| `-o, --output string` | output format: json\|yaml\|table\|tsv\|ndjson\|csv |
| `--quiet` | quiet mode, only output data and errors |
| `--timeout string` | HTTP request timeout for business API calls (e.g. 30s, 2m, 2min; 0/none = no timeout) |
