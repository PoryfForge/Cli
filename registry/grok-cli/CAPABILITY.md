---
name: grok-cli
kind: cli
command: grok
version: 1.0.34
title: Grok CLI
license: 厂商专有
repo: https://x.ai/cli
scanned_at: 2026-09-18 06:27:40
source: release-bin + help-tree
nodes: 63
---

# Grok CLI（`grok`）— 能力快照

> xAI 官方 Grok CLI：交互式 TUI、单轮 headless 模式与 ACP agent 模式，带联网检索（含 X 平台）、本机文件与命令执行、会话与子 Agent 管理

## 怎么用这份文档

- 这是由 `grok --help` 递归提取的能力快照；覆盖范围受扫描深度、节点上限及 help 输出限制，不保证包含全部接口。
- 需要二级细节时，直接查本文档对应小节；如需最新参数，跑 `<命令路径> --help`。
- 用法：先在下表定位子命令，再按该小节的 usage 与 flag 拼命令。

## 概览

| 项 | 值 |
|---|---|
| 可执行文件 | `grok` |
| 版本 | `1.0.34` |
| 仓库 | https://x.ai/cli |
| 许可证 | 厂商专有 |
| 采集方式 | 官方 release 二进制（`--help` 递归） |
| 本轮抓取命令数 | 63（顶层 1） |
| 抓取时间 | 2026-09-18 06:27:40 |
| 原始 help 留档 | `raw/` |

## 安装

```bash
curl -fsSL https://x.ai/cli/install.sh | bash
```

## 顶层用法

```
grok [OPTIONS] [PROMPT] [COMMAND]
```

## 顶层选项

| Flag | 说明 |
|---|---|
| `--agent` | <NAME> |
| `--agents` | <JSON> |
| `--allow` | <RULE> |
| `--always-approve` |  |
| `-c, --continue` |  |
| `--cwd` | <CWD> |
| `--debug` |  |
| `--debug-file` | <FILE> |
| `--deny` | <RULE> |
| `--disable-web-search` |  |
| `--disallowed-tools` | <TOOLS> |
| `--fork-session` |  |
| `--fullscreen` |  |
| `-h, --help` |  |
| `--include-partial-messages` |  |
| `--json-schema` | <SCHEMA> |
| `--leader-socket` | <PATH> |
| `-m, --model` | <MODEL> |
| `--max-turns` | <N> |
| `--minimal` |  |
| `--no-alt-screen` |  |
| `--no-plan` |  |
| `--no-subagents` |  |
| `--oauth` |  |
| `--output-format` | <OUTPUT_FORMAT> |
| `-p, --single` | <PROMPT> |
| `--permission-mode` | <MODE> |
| `--prompt-file` | <PATH> |
| `--prompt-json` | <JSON> |
| `--reasoning-effort` | <EFFORT> |
| `--restore-code` |  |
| `--rules` | <RULES> |
| `-s, --session-id` | <SESSION_ID> |
| `--sandbox` | <PROFILE> |
| `--system-prompt-override` | <PROMPT> |
| `--tools` | <TOOLS> |
| `-v, --version` |  |
| `--verbatim` |  |
| `--worktree-ref` | <WORKTREE_REF> |

## 命令树

| 命令 | 说明 / 用法概要 |
|---|---|
| `grok agent` | Run Grok without the interactive UI |
| `grok agent headless` | &nbsp;&nbsp;&nbsp;&nbsp;Run the agent headlessly over the Grok WebSocket relay |
| `grok agent leader` | &nbsp;&nbsp;&nbsp;&nbsp;Run as the shared leader process for other clients |
| `grok agent serve` | &nbsp;&nbsp;&nbsp;&nbsp;Run the agent as a WebSocket server |
| `grok agent stdio` | &nbsp;&nbsp;&nbsp;&nbsp;Run the agent over stdio |
| `grok clone` | Lazy-clone a git repository via grove (NFS on macOS, FUSE on Linux) |
| `grok completions` | Generate shell completion scripts (bash, zsh, fish, powershell, ...) |
| `grok cursor-worker` | Register this machine as a Cursor private worker (via the leader) |
| `grok cursor-worker start` | &nbsp;&nbsp;&nbsp;&nbsp;Register the leader as a Cursor private worker (or restart it with new options) |
| `grok cursor-worker status` | &nbsp;&nbsp;&nbsp;&nbsp;Show the current worker status and its Cloud Agent claims [aliases: list] |
| `grok cursor-worker stop` | &nbsp;&nbsp;&nbsp;&nbsp;Unregister from Cursor and release the claims (the leader keeps running) |
| `grok dashboard` | Open the Agent Dashboard view at startup. The dashboard shows every session, top-level and subagents. Disabled when `[dashboard].enabled = false` in `~/.grok/config.toml` or when the `GROK_AGENT_DASHBOARD=0` env var is set |
| `grok doctor` | Check terminal, clipboard, color, and input support without starting Grok |
| `grok doctor fix` | &nbsp;&nbsp;&nbsp;&nbsp;Apply an automatic fix |
| `grok du` | Show what the grok home (~/.grok) uses on disk [aliases: disk-usage] |
| `grok export` | Export a session transcript as Markdown |
| `grok inspect` | Show the configuration Grok discovers for this directory |
| `grok leader` | Manage running leader processes |
| `grok leader info` | &nbsp;&nbsp;&nbsp;&nbsp;Show details for a leader process |
| `grok leader kill` | &nbsp;&nbsp;&nbsp;&nbsp;Stop all running leader processes |
| `grok leader list` | &nbsp;&nbsp;&nbsp;&nbsp;List running leader processes |
| `grok login` | Sign in to Grok |
| `grok logout` | Sign out and clear cached credentials |
| `grok mcp` | Manage MCP server configurations |
| `grok mcp add` | &nbsp;&nbsp;&nbsp;&nbsp;Add or update an MCP server |
| `grok mcp disable` | &nbsp;&nbsp;&nbsp;&nbsp;Disable an MCP server |
| `grok mcp doctor` | &nbsp;&nbsp;&nbsp;&nbsp;Diagnose MCP server configuration and connectivity |
| `grok mcp enable` | &nbsp;&nbsp;&nbsp;&nbsp;Enable an MCP server |
| `grok mcp list` | &nbsp;&nbsp;&nbsp;&nbsp;List configured MCP servers |
| `grok mcp remove` | &nbsp;&nbsp;&nbsp;&nbsp;Remove an MCP server |
| `grok memory` | Manage cross-session memory |
| `grok memory clear` | &nbsp;&nbsp;&nbsp;&nbsp;Clear memory files (workspace by default) |
| `grok models` | List available models and exit |
| `grok plugin` | Manage plugins and marketplace sources |
| `grok plugin details` | &nbsp;&nbsp;&nbsp;&nbsp;Show a plugin's component inventory |
| `grok plugin disable` | &nbsp;&nbsp;&nbsp;&nbsp;Disable a plugin without uninstalling it |
| `grok plugin enable` | &nbsp;&nbsp;&nbsp;&nbsp;Enable a disabled plugin |
| `grok plugin install` | &nbsp;&nbsp;&nbsp;&nbsp;Install a plugin from a git URL or local path |
| `grok plugin list` | &nbsp;&nbsp;&nbsp;&nbsp;List installed plugins |
| `grok plugin marketplace` | &nbsp;&nbsp;&nbsp;&nbsp;Manage marketplace sources |
| `grok plugin tag` | &nbsp;&nbsp;&nbsp;&nbsp;Create a release git tag from the plugin's manifest version |
| `grok plugin uninstall` | &nbsp;&nbsp;&nbsp;&nbsp;Uninstall an installed plugin by name [aliases: rm, remove] |
| `grok plugin update` | &nbsp;&nbsp;&nbsp;&nbsp;Update installed plugin(s) |
| `grok plugin validate` | &nbsp;&nbsp;&nbsp;&nbsp;Validate a plugin manifest |
| `grok sessions` | List, search, or restore sessions |
| `grok sessions delete` | &nbsp;&nbsp;&nbsp;&nbsp;Permanently delete a session from history |
| `grok sessions list` | &nbsp;&nbsp;&nbsp;&nbsp;List recent sessions (same as search with no query) |
| `grok sessions search` | &nbsp;&nbsp;&nbsp;&nbsp;Search sessions by keyword |
| `grok setup` | Fetch and install managed configuration |
| `grok trace` | Export or upload session trace data |
| `grok update` | Check for updates or install a specific version |
| `grok version` | Print version information [aliases: v] |
| `grok worktree` | Manage git worktrees |
| `grok worktree clean-artifacts` | &nbsp;&nbsp;&nbsp;&nbsp;Purge escape-dir artifact contents (`git clean` does not) |
| `grok worktree db` | &nbsp;&nbsp;&nbsp;&nbsp;Database maintenance |
| `grok worktree detach` | &nbsp;&nbsp;&nbsp;&nbsp;Convert a Grove-projected worktree into a plain git worktree |
| `grok worktree gc` | &nbsp;&nbsp;&nbsp;&nbsp;Remove expired worktrees, keeping any whose work would not survive |
| `grok worktree list` | &nbsp;&nbsp;&nbsp;&nbsp;List tracked worktrees [aliases: ls] |
| `grok worktree rm` | &nbsp;&nbsp;&nbsp;&nbsp;Remove worktrees |
| `grok worktree salvage` | &nbsp;&nbsp;&nbsp;&nbsp;Recover hydrated and dirty files when the source repo is gone |
| `grok worktree show` | &nbsp;&nbsp;&nbsp;&nbsp;Show details for a specific worktree |
| `grok wrap` | Run any command with local clipboard support (forwards OSC 52 to the system clipboard) |

## 逐命令详情

### `grok agent`

Run Grok without the interactive UI

```
grok agent [OPTIONS] [COMMAND]
```

**子命令**：`stdio` · `headless` · `serve` · `leader` · `help`

| Flag | 说明 |
|---|---|
| `--reauth` |  |
| `-m, --model` | <MODEL> |
| `--reasoning-effort` | <EFFORT> |
| `--always-approve` |  |
| `--agent-profile` | <PATH> |
| `--plugin-dir` | <DIR> |
| `--leader` |  |
| `--no-leader` |  |
| `--grok-ws-origin` | <GROK_WS_ORIGIN> |
| `--grok-ws-url` | <GROK_WS_URL> |
| `--cli-chat-proxy-base-url` | <CLI_CHAT_PROXY_BASE_URL> |
| `--xai-api-base-url` | <XAI_API_BASE_URL> |
| `--debug` |  |
| `--debug-file` | <FILE> |
| `-h, --help` |  |
| `--leader-socket` | <PATH> |

### `grok agent headless`

Run the agent headlessly over the Grok WebSocket relay

```
grok agent headless [OPTIONS]
```

| Flag | 说明 |
|---|---|
| `--grok-ws-origin` | <GROK_WS_ORIGIN> |
| `--grok-ws-url` | <GROK_WS_URL> |
| `--debug` |  |
| `--debug-file` | <FILE> |
| `-h, --help` |  |
| `--leader-socket` | <PATH> |

### `grok agent leader`

Run as the shared leader process for other clients

```
grok agent leader [OPTIONS]
```

| Flag | 说明 |
|---|---|
| `--no-exit-on-disconnect` |  |
| `--relay-on-demand` |  |
| `--no-auto-update` |  |
| `--cursor-worker` |  |
| `--cursor-worker-name` | <NAME> |
| `--cursor-worker-dir` | <DIR> |
| `--cursor-worker-max-agents` | <N> |
| `--grok-ws-origin` | <GROK_WS_ORIGIN> |
| `--grok-ws-url` | <GROK_WS_URL> |
| `--debug` |  |
| `--debug-file` | <FILE> |
| `-h, --help` |  |
| `--leader-socket` | <PATH> |

### `grok agent serve`

Run the agent as a WebSocket server

```
grok agent serve [OPTIONS]
```

| Flag | 说明 |
|---|---|
| `--bind` | <BIND> |
| `--secret` | <SECRET> |
| `--remote` | <REMOTE> |
| `--grok-ws-origin` | <GROK_WS_ORIGIN> |
| `--grok-ws-url` | <GROK_WS_URL> |
| `--debug` |  |
| `--debug-file` | <FILE> |
| `-h, --help` |  |
| `--leader-socket` | <PATH> |

### `grok agent stdio`

Run the agent over stdio

```
grok agent stdio [OPTIONS]
```

| Flag | 说明 |
|---|---|
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok clone`

Lazy-clone a git repository via grove (NFS on macOS, FUSE on Linux)

```
grok clone [OPTIONS] <URL> [DIR]
```

| Flag | 说明 |
|---|---|
| `-b, --branch <BRANCH>` | Branch or ref to check out |
| `--cone <PATH>` | Sparse-checkout cone path (repeatable) |
| `--full-history` | Fetch complete history during clone instead of the fast depth-1 bootstrap. After a depth-1 clone, `git fetch --deepen=N origin` / `--unshallow origin` affect only the selected branch. Another branch needs an explicit depth-limited refspec |
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok completions`

Generate shell completion scripts (bash, zsh, fish, powershell, ...)

```
grok completions [OPTIONS] <SHELL>
```

| Flag | 说明 |
|---|---|
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok cursor-worker`

Register this machine as a Cursor private worker (via the leader)

```
grok cursor-worker [OPTIONS] <COMMAND>
```

**子命令**：`start` · `stop` · `status` · `help`

| Flag | 说明 |
|---|---|
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok cursor-worker start`

Register the leader as a Cursor private worker (or restart it with new options)

```
grok cursor-worker start [OPTIONS]
```

| Flag | 说明 |
|---|---|
| `--name <NAME>` | Worker display name shown in Cursor (default: `[cursor_worker].name`, then the hostname) |
| `--worker-dir <DIR>` | Repository directory offered to Cursor Cloud Agents; repeatable, the first one is the registered working directory. Defaults to `[cursor_worker].worker_dirs` |
| `--max-agents <N>` | Maximum concurrent Cloud Agent claims (default: `[cursor_worker].max_agents`; unset means no cap) |
| `--leader` | Force leader mode for this command, overriding config |
| `--no-leader` | Refuse to start even when config enables leader mode |
| `--timeout <SECS>` | Seconds to wait for the registration before printing the status; `0` returns as soon as the leader accepted the start [default: 90] |
| `--json` | Emit machine-readable JSON output |
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok cursor-worker status`

Show the current worker status and its Cloud Agent claims [aliases: list]

```
grok cursor-worker status [OPTIONS]
```

| Flag | 说明 |
|---|---|
| `--pid <PID>` | Leader process ID from `grok leader list` |
| `--json` | Emit machine-readable JSON output |
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok cursor-worker stop`

Unregister from Cursor and release the claims (the leader keeps running)

```
grok cursor-worker stop [OPTIONS]
```

| Flag | 说明 |
|---|---|
| `--pid <PID>` | Leader process ID from `grok leader list` |
| `--json` | Emit machine-readable JSON output |
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok dashboard`

Open the Agent Dashboard view at startup. The dashboard shows every session, top-level and subagents. Disabled when `[dashboard].enabled = false` in `~/.grok/config.toml` or when the `GROK_AGENT_DASHBOARD=0` env var is set

```
grok dashboard [OPTIONS]
```

| Flag | 说明 |
|---|---|
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok doctor`

Check terminal, clipboard, color, and input support without starting Grok

```
grok doctor [OPTIONS] grok doctor <COMMAND>
```

**子命令**：`fix` · `help`

| Flag | 说明 |
|---|---|
| `--json` | Print the diagnostic report as JSON |
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok doctor fix`

Apply an automatic fix

```
grok doctor fix [OPTIONS] [ID]
```

| Flag | 说明 |
|---|---|
| `--yes` | Apply the displayed changes without confirmation |
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok du`

Show what the grok home (~/.grok) uses on disk [aliases: disk-usage]

```
grok du [OPTIONS]
```

| Flag | 说明 |
|---|---|
| `--json` | Emit machine-readable JSON output |
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok export`

Export a session transcript as Markdown

```
grok export [OPTIONS] <SESSION_ID> [OUTPUT]
```

| Flag | 说明 |
|---|---|
| `-c, --clipboard` | Copy to clipboard instead of writing to stdout |
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok inspect`

Show the configuration Grok discovers for this directory

```
grok inspect [OPTIONS]
```

| Flag | 说明 |
|---|---|
| `--json` | Emit machine-readable JSON output |
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok leader`

Manage running leader processes

```
grok leader [OPTIONS] <COMMAND>
```

**子命令**：`list` · `info` · `kill` · `help`

| Flag | 说明 |
|---|---|
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok leader info`

Show details for a leader process

```
grok leader info [OPTIONS]
```

| Flag | 说明 |
|---|---|
| `--pid <PID>` | Leader process ID from `grok leader list` |
| `--json` | Emit machine-readable JSON output |
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok leader kill`

Stop all running leader processes

```
grok leader kill [OPTIONS]
```

| Flag | 说明 |
|---|---|
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok leader list`

List running leader processes

```
grok leader list [OPTIONS]
```

| Flag | 说明 |
|---|---|
| `--json` | Emit machine-readable JSON output |
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok login`

Sign in to Grok

```
grok login [OPTIONS]
```

| Flag | 说明 |
|---|---|
| `--oauth` | Use Grok OAuth via auth.x.ai |
| `--device-auth` | Use device-code authentication for headless/remote environments [aliases: --device-code] |
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok logout`

Sign out and clear cached credentials

```
grok logout [OPTIONS]
```

| Flag | 说明 |
|---|---|
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok mcp`

Manage MCP server configurations

```
grok mcp [OPTIONS] <COMMAND>
```

**子命令**：`list` · `add` · `remove` · `enable` · `disable` · `doctor` · `help`

| Flag | 说明 |
|---|---|
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok mcp add`

Add or update an MCP server

```
grok mcp add [OPTIONS] <NAME> [COMMAND_OR_URL] [ARGS]...
```

| Flag | 说明 |
|---|---|
| `-t, --transport` | <TRANSPORT> |
| `-s, --scope` | <SCOPE> |
| `--debug` |  |
| `--debug-file` | <FILE> |
| `-h, --help` |  |
| `--leader-socket` | <PATH> |

### `grok mcp disable`

Disable an MCP server

```
grok mcp disable [OPTIONS] <NAME>
```

| Flag | 说明 |
|---|---|
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok mcp doctor`

Diagnose MCP server configuration and connectivity

```
grok mcp doctor [OPTIONS] [NAME]
```

| Flag | 说明 |
|---|---|
| `--json` | Emit machine-readable JSON output |
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok mcp enable`

Enable an MCP server

```
grok mcp enable [OPTIONS] <NAME>
```

| Flag | 说明 |
|---|---|
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok mcp list`

List configured MCP servers

```
grok mcp list [OPTIONS]
```

| Flag | 说明 |
|---|---|
| `--json` | Emit machine-readable JSON output |
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok mcp remove`

Remove an MCP server

```
grok mcp remove [OPTIONS] <NAME>
```

| Flag | 说明 |
|---|---|
| `-s, --scope` | <SCOPE> |
| `--debug` |  |
| `--debug-file` | <FILE> |
| `-h, --help` |  |
| `--leader-socket` | <PATH> |

### `grok memory`

Manage cross-session memory

```
grok memory [OPTIONS] <COMMAND>
```

**子命令**：`clear` · `help`

| Flag | 说明 |
|---|---|
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok memory clear`

Clear memory files (workspace by default)

```
grok memory clear [OPTIONS]
```

| Flag | 说明 |
|---|---|
| `--workspace` | Clear workspace-scoped memory (MEMORY.md, sessions/, index.sqlite) |
| `--global` | Clear global MEMORY.md |
| `--all` | Clear both workspace and global memory |
| `-y, --yes` | Skip confirmation prompt |
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok models`

List available models and exit

```
grok models [OPTIONS]
```

| Flag | 说明 |
|---|---|
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok plugin`

Manage plugins and marketplace sources

```
grok plugin [OPTIONS] <COMMAND>
```

**子命令**：`list` · `install` · `uninstall` · `update` · `enable` · `disable` · `details` · `validate` · `tag` · `marketplace` · `help`

| Flag | 说明 |
|---|---|
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok plugin details`

Show a plugin's component inventory

```
grok plugin details [OPTIONS] <NAME>
```

| Flag | 说明 |
|---|---|
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok plugin disable`

Disable a plugin without uninstalling it

```
grok plugin disable [OPTIONS] <NAME>
```

| Flag | 说明 |
|---|---|
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok plugin enable`

Enable a disabled plugin

```
grok plugin enable [OPTIONS] <NAME>
```

| Flag | 说明 |
|---|---|
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok plugin install`

Install a plugin from a git URL or local path

```
grok plugin install [OPTIONS] <SOURCE>
```

| Flag | 说明 |
|---|---|
| `--trust` | Trust the plugin immediately (skip confirmation prompt) |
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok plugin list`

List installed plugins

```
grok plugin list [OPTIONS]
```

| Flag | 说明 |
|---|---|
| `--json` | Emit machine-readable JSON output |
| `--available` | Include available plugins from marketplace sources. Requires --json |
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok plugin marketplace`

Manage marketplace sources

```
grok plugin marketplace [OPTIONS] <COMMAND>
```

**子命令**：`list` · `add` · `remove` · `update` · `help`

| Flag | 说明 |
|---|---|
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok plugin tag`

Create a release git tag from the plugin's manifest version

```
grok plugin tag [OPTIONS] [PATH]
```

| Flag | 说明 |
|---|---|
| `--push` | Push the tag to the remote after creating it |
| `-f, --force` | Create the tag even if the working tree is dirty or tag exists |
| `--dry-run` | Print what would be tagged without creating the tag |
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok plugin uninstall`

Uninstall an installed plugin by name [aliases: rm, remove]

```
grok plugin uninstall [OPTIONS] <NAME>
```

| Flag | 说明 |
|---|---|
| `--confirm` | Skip confirmation for multi-plugin repos |
| `--keep-data` | Preserve the plugin's persistent data directory |
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok plugin update`

Update installed plugin(s)

```
grok plugin update [OPTIONS] [NAME]
```

| Flag | 说明 |
|---|---|
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok plugin validate`

Validate a plugin manifest

```
grok plugin validate [OPTIONS] [PATH]
```

| Flag | 说明 |
|---|---|
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok sessions`

List, search, or restore sessions

```
grok sessions [OPTIONS] <COMMAND>
```

**子命令**：`list` · `search` · `delete` · `help`

| Flag | 说明 |
|---|---|
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok sessions delete`

Permanently delete a session from history

```
grok sessions delete [OPTIONS] <ID>
```

| Flag | 说明 |
|---|---|
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok sessions list`

List recent sessions (same as search with no query)

```
grok sessions list [OPTIONS]
```

| Flag | 说明 |
|---|---|
| `-n, --limit <LIMIT>` | Maximum number of sessions to show [default: 20] |
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok sessions search`

Search sessions by keyword

```
grok sessions search [OPTIONS] <QUERY>
```

| Flag | 说明 |
|---|---|
| `-n, --limit <LIMIT>` | Maximum number of sessions to show [default: 20] |
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok setup`

Fetch and install managed configuration

```
grok setup [OPTIONS]
```

| Flag | 说明 |
|---|---|
| `--json` | Print the fetched configuration as JSON instead of installing it; writes nothing to ~/.grok |
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok trace`

Export or upload session trace data

```
grok trace [OPTIONS] <SESSION_ID>
```

| Flag | 说明 |
|---|---|
| `--local` | Save locally only, skip remote upload |
| `-o, --output <OUTPUT>` | Output path (default: $GROK_HOME/trace-exports/<session-id>.tar.gz) |
| `--json` | Emit machine-readable JSON output |
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok update`

Check for updates or install a specific version

```
grok update [OPTIONS]
```

| Flag | 说明 |
|---|---|
| `--check` | Check for updates without installing |
| `--json` | Emit machine-readable JSON output (for --check) |
| `--force-reinstall` | Force re-download and install even if already up to date |
| `--version <VERSION>` | Install a specific version (e.g. 0.1.150 or 0.1.151-alpha.2) |
| `--alpha` | Switch to the alpha release channel (faster updates, may have bugs) |
| `--stable` | Switch to the stable release channel (default, weekly releases) |
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok version`

Print version information [aliases: v]

```
grok version [OPTIONS]
```

| Flag | 说明 |
|---|---|
| `--json` | Emit machine-readable JSON output |
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok worktree`

Manage git worktrees

```
grok worktree [OPTIONS] <COMMAND>
```

**子命令**：`list` · `show` · `rm` · `gc` · `detach` · `salvage` · `clean-artifacts` · `db` · `help`

| Flag | 说明 |
|---|---|
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok worktree clean-artifacts`

Purge escape-dir artifact contents (`git clean` does not)

```
grok worktree clean-artifacts [OPTIONS] <ID_OR_PATH>
```

| Flag | 说明 |
|---|---|
| `--dry-run` | List jail children and exit without deleting |
| `--yes` | Required to actually delete (irreversible) |
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok worktree db`

Database maintenance

```
grok worktree db [OPTIONS] <COMMAND>
```

**子命令**：`rebuild` · `stats` · `path` · `help`

| Flag | 说明 |
|---|---|
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok worktree detach`

Convert a Grove-projected worktree into a plain git worktree

```
grok worktree detach [OPTIONS] <ID_OR_PATH>
```

| Flag | 说明 |
|---|---|
| `--allow-copy` | Permit a copy when dest and backing are on different devices |
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok worktree gc`

Remove expired worktrees, keeping any whose work would not survive

```
grok worktree gc [OPTIONS]
```

| Flag | 说明 |
|---|---|
| `--dry-run` | Report what would be removed without removing it |
| `--max-age <MAX_AGE>` | Expire worktrees idle longer than this, e.g. `7d`. Without it, nothing expires |
| `-f, --force` | Skip the live-process and protected-path guards. This does not override the safety check; use `grok worktree rm` for that |
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok worktree list`

List tracked worktrees [aliases: ls]

```
grok worktree list [OPTIONS]
```

| Flag | 说明 |
|---|---|
| `--repo` | <REPO> |
| `--type` | <TYPE> |
| `--json` |  |
| `--all` |  |
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok worktree rm`

Remove worktrees

```
grok worktree rm [OPTIONS] <IDS>...
```

| Flag | 说明 |
|---|---|
| `-f, --force` |  |
| `--dry-run` |  |
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok worktree salvage`

Recover hydrated and dirty files when the source repo is gone

```
grok worktree salvage [OPTIONS] --out <OUT> <ID_OR_PATH>
```

| Flag | 说明 |
|---|---|
| `--out <OUT>` | Directory to write the salvaged plain repo into |
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok worktree show`

Show details for a specific worktree

```
grok worktree show [OPTIONS] <ID_OR_PATH>
```

| Flag | 说明 |
|---|---|
| `--debug` | Enable debug logging |
| `--debug-file <FILE>` | Write debug logs to FILE |
| `-h, --help` | Print help |
| `--leader-socket <PATH>` | Use a custom leader socket path instead of the default `~/.grok/leader.sock`. A local/branch build can thus run an isolated leader without colliding with the default one already running on the machine Name it `~/.grok/leader-*.sock` to keep `grok leader list/kill` able to find it; any other location works but won't be auto-discovered |

### `grok wrap`

Run any command with local clipboard support (forwards OSC 52 to the system clipboard)

```
grok wrap [OPTIONS] <CMD>...
```

| Flag | 说明 |
|---|---|
| `--debug` |  |
| `--debug-file` | <FILE> |
| `-h, --help` |  |
| `--leader-socket` | <PATH> |
