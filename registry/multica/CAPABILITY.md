---
name: multica
kind: cli
command: multica
version: 0.4.44
title: Multica CLI
license: Multica License（Apache-2.0 + 附加条件）
repo: https://github.com/multica-ai/multica
scanned_at: 2026-09-18 06:38:35
source: release-bin + help-tree
nodes: 134
---

# Multica CLI（`multica`）— 能力快照

> Multica 官方 CLI：把任务派发到已连接的机器上执行、管理 workspace 与 issue，daemon 负责发现本机可用的编码 Agent 并回传运行状态与结果

## 怎么用这份文档

- 这是由 `multica --help` 递归提取的能力快照；覆盖范围受扫描深度、节点上限及 help 输出限制，不保证包含全部接口。
- 需要二级细节时，直接查本文档对应小节；如需最新参数，跑 `<命令路径> --help`。
- 用法：先在下表定位子命令，再按该小节的 usage 与 flag 拼命令。

## 概览

| 项 | 值 |
|---|---|
| 可执行文件 | `multica` |
| 版本 | `0.4.44` |
| 仓库 | https://github.com/multica-ai/multica |
| 许可证 | Multica License（Apache-2.0 + 附加条件） |
| 采集方式 | 官方 release 二进制（`--help` 递归） |
| 本轮抓取命令数 | 134（顶层 1） |
| 抓取时间 | 2026-09-18 06:38:35 |
| 原始 help 留档 | `raw/` |

## 安装

```bash
brew tap multica-ai/tap && brew install multica
```

## 顶层选项

| Flag | 说明 |
|---|---|
| `--debug` | Print full error details on failure (env: MULTICA_DEBUG) |
| `-h, --help` | help for multica |
| `--profile string` | Configuration profile name (e.g. dev) — isolates config, daemon state, and workspaces |
| `--server-url string` | Multica server URL (env: MULTICA_SERVER_URL) |
| `-v, --version` | version for multica |
| `--workspace-id string` | Workspace ID (env: MULTICA_WORKSPACE_ID) |

## 命令树

| 命令 | 说明 / 用法概要 |
|---|---|
| `multica agent` | Work with agents |
| `multica agent archive` | &nbsp;&nbsp;&nbsp;&nbsp;Archive an agent |
| `multica agent avatar` | &nbsp;&nbsp;&nbsp;&nbsp;Upload an avatar image for an agent |
| `multica agent copy` | &nbsp;&nbsp;&nbsp;&nbsp;Copy an existing agent into a new one (optionally on a different runtime) |
| `multica agent create` | &nbsp;&nbsp;&nbsp;&nbsp;Create a new agent |
| `multica agent env` | &nbsp;&nbsp;&nbsp;&nbsp;Read and update an agent's custom environment variables (audited) |
| `multica agent get` | &nbsp;&nbsp;&nbsp;&nbsp;Get agent details |
| `multica agent list` | &nbsp;&nbsp;&nbsp;&nbsp;List agents in the workspace |
| `multica agent mcp` | &nbsp;&nbsp;&nbsp;&nbsp;Manage which workspace MCP servers an agent uses |
| `multica agent restore` | &nbsp;&nbsp;&nbsp;&nbsp;Restore an archived agent |
| `multica agent skills` | &nbsp;&nbsp;&nbsp;&nbsp;Manage agent skill assignments |
| `multica agent tasks` | &nbsp;&nbsp;&nbsp;&nbsp;List runs for an agent |
| `multica agent update` | &nbsp;&nbsp;&nbsp;&nbsp;Update an agent |
| `multica attachment` | Work with attachments |
| `multica attachment download` | &nbsp;&nbsp;&nbsp;&nbsp;Download an attachment to a local file |
| `multica attachment upload` | &nbsp;&nbsp;&nbsp;&nbsp;Upload a file to attach to your chat reply |
| `multica auth` | Authenticate multica with Multica |
| `multica auth logout` | &nbsp;&nbsp;&nbsp;&nbsp;Remove stored authentication token |
| `multica auth status` | &nbsp;&nbsp;&nbsp;&nbsp;Show current authentication status |
| `multica autopilot` | Manage autopilots (scheduled/triggered agent automations) |
| `multica autopilot create` | &nbsp;&nbsp;&nbsp;&nbsp;Create a new autopilot |
| `multica autopilot delete` | &nbsp;&nbsp;&nbsp;&nbsp;Delete an autopilot |
| `multica autopilot get` | &nbsp;&nbsp;&nbsp;&nbsp;Get autopilot details (webhook credentials redacted by default) |
| `multica autopilot list` | &nbsp;&nbsp;&nbsp;&nbsp;List autopilots in the workspace |
| `multica autopilot runs` | &nbsp;&nbsp;&nbsp;&nbsp;List execution history for an autopilot |
| `multica autopilot trigger` | &nbsp;&nbsp;&nbsp;&nbsp;Manually trigger an autopilot to run once |
| `multica autopilot trigger-add` | &nbsp;&nbsp;&nbsp;&nbsp;Add a schedule or webhook trigger to an autopilot |
| `multica autopilot trigger-delete` | &nbsp;&nbsp;&nbsp;&nbsp;Delete a trigger |
| `multica autopilot trigger-list` | &nbsp;&nbsp;&nbsp;&nbsp;List an autopilot's triggers (ids for trigger-update/-delete/-rotate-url) |
| `multica autopilot trigger-rotate-url` | &nbsp;&nbsp;&nbsp;&nbsp;Rotate the webhook URL of a webhook trigger |
| `multica autopilot trigger-update` | &nbsp;&nbsp;&nbsp;&nbsp;Update an existing trigger |
| `multica autopilot update` | &nbsp;&nbsp;&nbsp;&nbsp;Update an autopilot |
| `multica chat` | Work with the current chat conversation |
| `multica chat history` | &nbsp;&nbsp;&nbsp;&nbsp;Overview of the channel this conversation is in (messages + thread list) |
| `multica chat thread` | &nbsp;&nbsp;&nbsp;&nbsp;Read one thread's messages (the current thread, or a specific id) |
| `multica config` | Manage configuration for multica |
| `multica config set` | &nbsp;&nbsp;&nbsp;&nbsp;Set a CLI configuration value |
| `multica config show` | &nbsp;&nbsp;&nbsp;&nbsp;Show current CLI configuration |
| `multica daemon` | Control the local agent runtime daemon |
| `multica daemon disk-usage` | &nbsp;&nbsp;&nbsp;&nbsp;Show daemon workspace disk usage by run or workspace |
| `multica daemon logs` | &nbsp;&nbsp;&nbsp;&nbsp;Show daemon logs |
| `multica daemon restart` | &nbsp;&nbsp;&nbsp;&nbsp;Restart the running daemon (stop + start) |
| `multica daemon start` | &nbsp;&nbsp;&nbsp;&nbsp;Start the local agent runtime daemon |
| `multica daemon status` | &nbsp;&nbsp;&nbsp;&nbsp;Show daemon status |
| `multica daemon stop` | &nbsp;&nbsp;&nbsp;&nbsp;Stop the running daemon |
| `multica issue` | Work with issues |
| `multica issue assign` | &nbsp;&nbsp;&nbsp;&nbsp;Assign an issue to a member, agent, or squad |
| `multica issue cancel-task` | &nbsp;&nbsp;&nbsp;&nbsp;Cancel an in-progress or queued run (interrupts in-flight agent) |
| `multica issue children` | &nbsp;&nbsp;&nbsp;&nbsp;List an issue's sub-issues grouped by stage |
| `multica issue comment` | &nbsp;&nbsp;&nbsp;&nbsp;Work with issue comments |
| `multica issue create` | &nbsp;&nbsp;&nbsp;&nbsp;Create a new issue |
| `multica issue get` | &nbsp;&nbsp;&nbsp;&nbsp;Get issue details |
| `multica issue label` | &nbsp;&nbsp;&nbsp;&nbsp;Manage labels on an issue |
| `multica issue list` | &nbsp;&nbsp;&nbsp;&nbsp;List issues in the workspace |
| `multica issue metadata` | &nbsp;&nbsp;&nbsp;&nbsp;Manage per-issue metadata (KV) |
| `multica issue property` | &nbsp;&nbsp;&nbsp;&nbsp;Manage custom property values on an issue |
| `multica issue pull-requests` | &nbsp;&nbsp;&nbsp;&nbsp;List pull requests linked to an issue |
| `multica issue reorder` | &nbsp;&nbsp;&nbsp;&nbsp;Move an issue within its status column |
| `multica issue rerun` | &nbsp;&nbsp;&nbsp;&nbsp;Re-enqueue an issue's current agent assignment as a fresh run |
| `multica issue run-messages` | &nbsp;&nbsp;&nbsp;&nbsp;List messages for an execution |
| `multica issue runs` | &nbsp;&nbsp;&nbsp;&nbsp;List execution history for an issue |
| `multica issue search` | &nbsp;&nbsp;&nbsp;&nbsp;Search issues by title, description, or comments |
| `multica issue status` | &nbsp;&nbsp;&nbsp;&nbsp;Change issue status |
| `multica issue subscriber` | &nbsp;&nbsp;&nbsp;&nbsp;Work with issue subscribers |
| `multica issue timeline` | &nbsp;&nbsp;&nbsp;&nbsp;Chronological issue history — when status/assignee changed, how long it has been stuck |
| `multica issue update` | &nbsp;&nbsp;&nbsp;&nbsp;Update an issue |
| `multica label` | Work with issue labels |
| `multica label create` | &nbsp;&nbsp;&nbsp;&nbsp;Create a new label |
| `multica label delete` | &nbsp;&nbsp;&nbsp;&nbsp;Delete a label |
| `multica label get` | &nbsp;&nbsp;&nbsp;&nbsp;Get label details |
| `multica label list` | &nbsp;&nbsp;&nbsp;&nbsp;List labels in the workspace |
| `multica label update` | &nbsp;&nbsp;&nbsp;&nbsp;Update a label |
| `multica login` | Authenticate and set up workspaces |
| `multica project` | Work with projects |
| `multica project create` | &nbsp;&nbsp;&nbsp;&nbsp;Create a new project |
| `multica project delete` | &nbsp;&nbsp;&nbsp;&nbsp;Delete a project |
| `multica project get` | &nbsp;&nbsp;&nbsp;&nbsp;Get project details |
| `multica project list` | &nbsp;&nbsp;&nbsp;&nbsp;List projects in the workspace |
| `multica project resource` | &nbsp;&nbsp;&nbsp;&nbsp;Manage resources attached to a project |
| `multica project status` | &nbsp;&nbsp;&nbsp;&nbsp;Change project status |
| `multica project update` | &nbsp;&nbsp;&nbsp;&nbsp;Update a project |
| `multica property` | Manage workspace custom issue properties |
| `multica property archive` | &nbsp;&nbsp;&nbsp;&nbsp;Archive a property definition (hidden from pickers; values preserved) |
| `multica property create` | &nbsp;&nbsp;&nbsp;&nbsp;Create a property definition (workspace owner/admin only) |
| `multica property get` | &nbsp;&nbsp;&nbsp;&nbsp;Show one property definition |
| `multica property list` | &nbsp;&nbsp;&nbsp;&nbsp;List property definitions |
| `multica property unarchive` | &nbsp;&nbsp;&nbsp;&nbsp;Restore an archived property definition |
| `multica property update` | &nbsp;&nbsp;&nbsp;&nbsp;Update a property definition (owner/admin only; type is immutable) |
| `multica repo` | Work with repositories |
| `multica repo add` | &nbsp;&nbsp;&nbsp;&nbsp;Add repositories to the workspace registry |
| `multica repo checkout` | &nbsp;&nbsp;&nbsp;&nbsp;Check out a repository into the working directory |
| `multica repo list` | &nbsp;&nbsp;&nbsp;&nbsp;List workspace repositories |
| `multica repo remove` | &nbsp;&nbsp;&nbsp;&nbsp;Remove repositories from the workspace registry |
| `multica runtime` | Work with agent runtimes |
| `multica runtime activity` | &nbsp;&nbsp;&nbsp;&nbsp;Get hourly run activity for a runtime |
| `multica runtime delete` | &nbsp;&nbsp;&nbsp;&nbsp;Delete a runtime from the workspace |
| `multica runtime list` | &nbsp;&nbsp;&nbsp;&nbsp;List runtimes in the workspace |
| `multica runtime profile` | &nbsp;&nbsp;&nbsp;&nbsp;Manage custom runtime profiles |
| `multica runtime rename` | &nbsp;&nbsp;&nbsp;&nbsp;Set a custom display name for a runtime |
| `multica runtime update` | &nbsp;&nbsp;&nbsp;&nbsp;Initiate a CLI update on a runtime |
| `multica setup` | Configure the CLI, authenticate, and start the daemon |
| `multica setup cloud` | &nbsp;&nbsp;&nbsp;&nbsp;Configure the CLI for Multica Cloud (multica.ai) |
| `multica setup self-host` | &nbsp;&nbsp;&nbsp;&nbsp;Configure the CLI for a self-hosted Multica server |
| `multica skill` | Work with skills |
| `multica skill create` | &nbsp;&nbsp;&nbsp;&nbsp;Create a new skill |
| `multica skill delete` | &nbsp;&nbsp;&nbsp;&nbsp;Delete a skill |
| `multica skill files` | &nbsp;&nbsp;&nbsp;&nbsp;Work with skill files |
| `multica skill get` | &nbsp;&nbsp;&nbsp;&nbsp;Get skill details and its file list (use --with-content for the bodies) |
| `multica skill import` | &nbsp;&nbsp;&nbsp;&nbsp;Import a skill from a URL (clawhub.ai, skills.sh, github.com) or a local .skill/.zip archive |
| `multica skill list` | &nbsp;&nbsp;&nbsp;&nbsp;List skills in the workspace |
| `multica skill refresh` | &nbsp;&nbsp;&nbsp;&nbsp;Re-download a skill from its imported source, preserving its id and agent assignments |
| `multica skill search` | &nbsp;&nbsp;&nbsp;&nbsp;Search for installable skills |
| `multica skill update` | &nbsp;&nbsp;&nbsp;&nbsp;Update a skill |
| `multica squad` | Work with squads |
| `multica squad activity` | &nbsp;&nbsp;&nbsp;&nbsp;Record a squad leader evaluation on an issue |
| `multica squad create` | &nbsp;&nbsp;&nbsp;&nbsp;Create a new squad |
| `multica squad delete` | &nbsp;&nbsp;&nbsp;&nbsp;Delete (archive) a squad |
| `multica squad get` | &nbsp;&nbsp;&nbsp;&nbsp;Get squad details |
| `multica squad list` | &nbsp;&nbsp;&nbsp;&nbsp;List squads in the workspace |
| `multica squad member` | &nbsp;&nbsp;&nbsp;&nbsp;Work with squad members |
| `multica squad update` | &nbsp;&nbsp;&nbsp;&nbsp;Update a squad |
| `multica update` | Update multica to the latest version |
| `multica user` | Work with your user account |
| `multica user profile` | &nbsp;&nbsp;&nbsp;&nbsp;Get or update your personal profile |
| `multica version` | Print version information |
| `multica workspace` | Work with workspaces |
| `multica workspace create` | &nbsp;&nbsp;&nbsp;&nbsp;Create a workspace |
| `multica workspace get` | &nbsp;&nbsp;&nbsp;&nbsp;Get workspace details |
| `multica workspace list` | &nbsp;&nbsp;&nbsp;&nbsp;List all workspaces you belong to |
| `multica workspace mcp` | &nbsp;&nbsp;&nbsp;&nbsp;Manage the workspace's MCP server library |
| `multica workspace member` | &nbsp;&nbsp;&nbsp;&nbsp;Manage workspace members |
| `multica workspace switch` | &nbsp;&nbsp;&nbsp;&nbsp;Set the default workspace for this profile |
| `multica workspace update` | &nbsp;&nbsp;&nbsp;&nbsp;Update workspace metadata (admin/owner only) |

## 逐命令详情

### `multica agent`

Work with agents

**子命令**：`archive` · `avatar` · `copy` · `create` · `env` · `get` · `list` · `mcp` · `restore` · `skills` · `tasks` · `update`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for agent |
| `--help` | Show help for command |

### `multica agent archive`

Archive an agent

| Flag | 说明 |
|---|---|
| `-h, --help` | help for archive |
| `--output string` | Output format: table or json (default "json") |
| `--help` | Show help for command |

### `multica agent avatar`

Upload an avatar image for an agent

| Flag | 说明 |
|---|---|
| `--file string` | Path to the avatar image file (required) |
| `-h, --help` | help for avatar |
| `--output string` | Output format: table or json (default "json") |
| `--help` | Show help for command |

### `multica agent copy`

Copy an existing agent into a new one (optionally on a different runtime)

| Flag | 说明 |
|---|---|
| `--custom-args string` | Override custom CLI arguments as a JSON array. |
| `--custom-env string` | Set custom_env on the copy as a JSON object (never copied from the source). Prefer --custom-env-stdin/--custom-env-file for secrets. Pass '{}' for an empty map. |
| `--custom-env-file string` | Read --custom-env from a file path (suggested mode: 0600). Mutually exclusive with --custom-env and --custom-env-stdin. |
| `--custom-env-stdin` | Read --custom-env from stdin. Mutually exclusive with --custom-env and --custom-env-file. |
| `--description string` | Override the copied description |
| `-h, --help` | help for copy |
| `--instructions string` | Override the copied instructions |
| `--max-concurrent-tasks int32` | Override maximum concurrent tasks (default 6) |
| `--mcp-config string` | Set mcp_config on the copy as a JSON object (never copied from the source). Prefer --mcp-config-stdin/--mcp-config-file for secrets. |
| `--mcp-config-file string` | Read --mcp-config from a file path (suggested mode: 0600). Mutually exclusive with --mcp-config and --mcp-config-stdin. |
| `--mcp-config-stdin` | Read --mcp-config from stdin. Mutually exclusive with --mcp-config and --mcp-config-file. |
| `--model string` | Model identifier for the copy. Required when --runtime-id selects a different runtime (pass "" to accept the target runtime default). Empty otherwise = runtime default. |
| `--name string` | Name for the new agent (default: "<source name> (copy)") |
| `--no-skills` | Do not copy the source agent's workspace skill assignments. |
| `--output string` | Output format: table or json (default "json") |
| `--permission-mode string` | Override invocation permission mode: private or public_to. Authoritative over --visibility. |
| `--public-to-member strings` | public_to: allow the given member user id(s) to invoke the copy. Repeatable. |
| `--public-to-workspace` | public_to: allow every workspace member to invoke the copy. |
| `--runtime-config string` | Set runtime_config on the copy as a JSON string (never copied from the source). |
| `--runtime-id string` | Target runtime ID (default: the source agent's runtime). A different value forks the agent onto that runtime. |
| `--service-tier string` | Override Codex service tier. Not carried across a runtime change unless set here. |
| `--thinking-level string` | Override thinking level. Not carried across a runtime change unless set here. |
| `--visibility string` | Override visibility: private or workspace (legacy; mapped to --permission-mode) |
| `--help` | Show help for command |

### `multica agent create`

Create a new agent

| Flag | 说明 |
|---|---|
| `--conversation-starters string` | Conversation starters as a JSON array of {"label","prompt"} objects (at most 3; label ≤80, prompt ≤4000). Shown above the Chat composer; selecting one fills the composer and does not start a run. Omit to default to none. |
| `--custom-args string` | Custom CLI arguments as JSON array. For model selection prefer --model; some providers (codex app-server, openclaw) reject --model in custom_args. |
| `--custom-env string` | Custom environment variables as JSON object, e.g. '{"KEY":"value"}'. Treated as secret material — never logged by the CLI, but values passed on the command line are visible to shell history and 'ps'; prefer --custom-env-stdin or --custom-env-file for real secrets. Pass '{}' to set an empty map. |
| `--custom-env-file string` | Read the --custom-env JSON object from a file path (suggested mode: 0600). Mutually exclusive with --custom-env and --custom-env-stdin. |
| `--custom-env-stdin` | Read the --custom-env JSON object from stdin. Keeps secrets out of shell history and 'ps'. Mutually exclusive with --custom-env and --custom-env-file. |
| `--description string` | Agent description |
| `-h, --help` | help for create |
| `--instructions string` | Agent instructions |
| `--max-concurrent-tasks int32` | Maximum concurrent runs (1-50) (default 6) |
| `--mcp-config string` | MCP server configuration as a JSON object, e.g. '{"mcpServers":{"shortcut":{...}}}'. Treated as secret material (MCP entries often carry API tokens) — never logged by the CLI, but values passed on the command line are visible to shell history and 'ps'; prefer --mcp-config-stdin or --mcp-config-file for real secrets. |
| `--mcp-config-file string` | Read the --mcp-config JSON object from a file path (suggested mode: 0600). Mutually exclusive with --mcp-config and --mcp-config-stdin. |
| `--mcp-config-stdin` | Read the --mcp-config JSON object from stdin. Keeps secrets out of shell history and 'ps'. Mutually exclusive with --mcp-config and --mcp-config-file. |
| `--model string` | Model identifier (e.g. claude-sonnet-4-6, openai/gpt-4o). Prefer this over passing --model in --custom-args. |
| `--name string` | Agent name (required) |
| `--output string` | Output format: table or json (default "json") |
| `--permission-mode string` | Invocation permission mode: private (owner only) or public_to (allow-list via --public-to-*). Authoritative over --visibility when set. |
| `--public-to-member strings` | public_to: allow the given member user id(s) to invoke this agent. Repeatable. |
| `--public-to-workspace` | public_to: allow every workspace member to invoke this agent. |
| `--runtime-config string` | Runtime config as JSON string |
| `--runtime-id string` | Runtime ID (required) |
| `--service-tier string` | Codex execution speed: empty = inherit local Codex configuration; default = explicit Standard when supported by the daemon's installed Codex CLI; a catalog tier such as priority = explicit Fast. |
| `--thinking-level string` | Reasoning/effort level for the agent's runtime (e.g. Claude: low\|medium\|high\|xhigh\|max; Codex values come from the runtime model catalog). The set is runtime/model-specific; malformed values are rejected server-side and the daemon validates the exact model/level pair. Some runtimes (e.g. hermes) expose no reasoning control and reject every value. Empty = runtime default. |
| `--visibility string` | Visibility: private or workspace (legacy; mapped to --permission-mode. private->private, workspace->public_to+workspace target) (default "private") |
| `--help` | Show help for command |

### `multica agent env`

Read and update an agent's custom environment variables (audited)

**子命令**：`get` · `set`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for env |
| `--help` | Show help for command |

### `multica agent get`

Get agent details

| Flag | 说明 |
|---|---|
| `-h, --help` | help for get |
| `--output string` | Output format: table or json (default "json") |
| `--help` | Show help for command |

### `multica agent list`

List agents in the workspace

| Flag | 说明 |
|---|---|
| `-h, --help` | help for list |
| `--include-archived` | Include archived agents |
| `--output string` | Output format: table or json (default "table") |
| `--help` | Show help for command |

### `multica agent mcp`

Manage which workspace MCP servers an agent uses

**子命令**：`add` · `disable` · `enable` · `list` · `remove`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for mcp |
| `--help` | Show help for command |

### `multica agent restore`

Restore an archived agent

| Flag | 说明 |
|---|---|
| `-h, --help` | help for restore |
| `--output string` | Output format: table or json (default "json") |
| `--help` | Show help for command |

### `multica agent skills`

Manage agent skill assignments

**子命令**：`add` · `list` · `set`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for skills |
| `--help` | Show help for command |

### `multica agent tasks`

List runs for an agent

| Flag | 说明 |
|---|---|
| `-h, --help` | help for tasks |
| `--output string` | Output format: table or json (default "table") |
| `--help` | Show help for command |

### `multica agent update`

Update an agent

| Flag | 说明 |
|---|---|
| `--conversation-starters string` | New conversation starters as a JSON array of {"label","prompt"} objects (at most 3; label ≤80, prompt ≤4000). Pass '[]' to clear. Omit to leave the stored value unchanged. |
| `--custom-args string` | New custom CLI arguments as JSON array. For model selection prefer --model; some providers (codex app-server, openclaw) reject --model in custom_args. |
| `--description string` | New description |
| `-h, --help` | help for update |
| `--instructions string` | New instructions |
| `--max-concurrent-tasks int32` | New max concurrent runs (1-50) |
| `--mcp-config string` | New MCP server configuration as a JSON object, e.g. '{"mcpServers":{...}}'. Pass 'null' to clear. Treated as secret material — never logged by the CLI, but values passed on the command line are visible to shell history and 'ps'; prefer --mcp-config-stdin or --mcp-config-file for real secrets. |
| `--mcp-config-file string` | Read the --mcp-config JSON from a file path (suggested mode: 0600). Mutually exclusive with --mcp-config and --mcp-config-stdin. |
| `--mcp-config-stdin` | Read the --mcp-config JSON from stdin. Keeps secrets out of shell history and 'ps'. Mutually exclusive with --mcp-config and --mcp-config-file. |
| `--model string` | New model identifier. Pass an empty string to clear and fall back to the runtime default. |
| `--name string` | New name |
| `--output string` | Output format: table or json (default "json") |
| `--permission-mode string` | New invocation permission mode: private or public_to. Authoritative over --visibility. Owner-only. |
| `--public-to-member strings` | public_to: allow the given member user id(s) to invoke this agent. Repeatable. |
| `--public-to-workspace` | public_to: allow every workspace member to invoke this agent. |
| `--runtime-config string` | New runtime config as JSON string |
| `--runtime-id string` | New runtime ID |
| `--service-tier string` | New Codex execution speed: default = explicit Standard when supported by the daemon's installed Codex CLI; a catalog tier such as priority = explicit Fast. Pass an empty string to clear and inherit local Codex configuration. |
| `--status string` | New status |
| `--thinking-level string` | New reasoning/effort level for the agent's runtime (e.g. Claude: low\|medium\|high\|xhigh\|max; Codex values come from the runtime model catalog). The set is runtime/model-specific; malformed values are rejected server-side and the daemon validates the exact model/level pair. Some runtimes (e.g. hermes) expose no reasoning control and reject every value. Pass an empty string to clear and fall back to the runtime default. |
| `--visibility string` | New visibility: private or workspace (legacy; mapped to --permission-mode) |
| `--help` | Show help for command |

### `multica attachment`

Work with attachments

**子命令**：`download` · `upload`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for attachment |
| `--help` | Show help for command |

### `multica attachment download`

Download an attachment to a local file

| Flag | 说明 |
|---|---|
| `-h, --help` | help for download |
| `-o, --output-dir string` | Directory to save the downloaded file (default ".") |
| `--help` | Show help for command |

### `multica attachment upload`

Upload a file to attach to your chat reply

| Flag | 说明 |
|---|---|
| `-h, --help` | help for upload |
| `--task string` | Chat task id to attach to (defaults to MULTICA_TASK_ID) |
| `--help` | Show help for command |

### `multica auth`

Authenticate multica with Multica

**子命令**：`logout` · `status`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for auth |
| `--help` | Show help for command |

### `multica auth logout`

Remove stored authentication token

| Flag | 说明 |
|---|---|
| `-h, --help` | help for logout |
| `--help` | Show help for command |

### `multica auth status`

Show current authentication status

| Flag | 说明 |
|---|---|
| `-h, --help` | help for status |
| `--help` | Show help for command |

### `multica autopilot`

Manage autopilots (scheduled/triggered agent automations)

**子命令**：`create` · `delete` · `get` · `list` · `runs` · `trigger` · `trigger-add` · `trigger-delete` · `trigger-list` · `trigger-rotate-url` · `trigger-update` · `update`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for autopilot |
| `--help` | Show help for command |

### `multica autopilot create`

Create a new autopilot

| Flag | 说明 |
|---|---|
| `--agent string` | Assignee agent (name or ID) — required |
| `--description string` | Autopilot description (used as the run prompt) |
| `-h, --help` | help for create |
| `--issue-title-template string` | Template for issue titles (create_issue mode). Only {{date}} (UTC, YYYY-MM-DD) is interpolated; any other {{...}} token is rejected at create-time. |
| `--mode string` | Execution mode: create_issue or run_only (required) |
| `--output string` | Output format: table or json (default "json") |
| `--project string` | Project ID (optional) |
| `--subscriber stringArray` | Member subscriber to notify for issues this autopilot creates (name or user ID; repeatable) |
| `--title string` | Autopilot title (required) |
| `--help` | Show help for command |

### `multica autopilot delete`

Delete an autopilot

| Flag | 说明 |
|---|---|
| `-h, --help` | help for delete |
| `--help` | Show help for command |

### `multica autopilot get`

Get autopilot details (webhook credentials redacted by default)

| Flag | 说明 |
|---|---|
| `-h, --help` | help for get |
| `--output string` | Output format: table or json (default "json") |
| `--show-secrets` | Include live webhook credentials in JSON output (unsafe for logs) |
| `--help` | Show help for command |

### `multica autopilot list`

List autopilots in the workspace

| Flag | 说明 |
|---|---|
| `--full-id` | Show full UUIDs in table output |
| `-h, --help` | help for list |
| `--output string` | Output format: table or json (default "table") |
| `--status string` | Filter by status (active, paused) |
| `--help` | Show help for command |

### `multica autopilot runs`

List execution history for an autopilot

| Flag | 说明 |
|---|---|
| `-h, --help` | help for runs |
| `--limit int` | Max number of runs to return (default 20) |
| `--offset int` | Pagination offset |
| `--output string` | Output format: table or json (default "table") |
| `--help` | Show help for command |

### `multica autopilot trigger`

Manually trigger an autopilot to run once

| Flag | 说明 |
|---|---|
| `-h, --help` | help for trigger |
| `--output string` | Output format: table or json (default "json") |
| `--help` | Show help for command |

### `multica autopilot trigger-add`

Add a schedule or webhook trigger to an autopilot

| Flag | 说明 |
|---|---|
| `--cron string` | Cron expression (required for --kind schedule) |
| `-h, --help` | help for trigger-add |
| `--kind string` | Trigger kind: schedule or webhook (default "schedule") |
| `--label string` | Optional human-readable label |
| `--output string` | Output format: table or json (default "json") |
| `--timezone string` | IANA timezone (default UTC; schedule only) |
| `--help` | Show help for command |

### `multica autopilot trigger-delete`

Delete a trigger

| Flag | 说明 |
|---|---|
| `-h, --help` | help for trigger-delete |
| `--help` | Show help for command |

### `multica autopilot trigger-list`

List an autopilot's triggers (ids for trigger-update/-delete/-rotate-url)

| Flag | 说明 |
|---|---|
| `--full-id` | Show full UUIDs in table output |
| `-h, --help` | help for trigger-list |
| `--output string` | Output format: table or json (default "table") |
| `--help` | Show help for command |

### `multica autopilot trigger-rotate-url`

Rotate the webhook URL of a webhook trigger

| Flag | 说明 |
|---|---|
| `-h, --help` | help for trigger-rotate-url |
| `--output string` | Output format: table or json (default "json") |
| `-y, --yes` | Skip the interactive confirmation prompt |
| `--help` | Show help for command |

### `multica autopilot trigger-update`

Update an existing trigger

| Flag | 说明 |
|---|---|
| `--cron string` | New cron expression |
| `--enabled` | Enable or disable the trigger (default true) |
| `-h, --help` | help for trigger-update |
| `--label string` | New label |
| `--output string` | Output format: table or json (default "json") |
| `--timezone string` | New IANA timezone |
| `--help` | Show help for command |

### `multica autopilot update`

Update an autopilot

| Flag | 说明 |
|---|---|
| `--agent string` | New assignee agent (name or ID) |
| `--clear-subscribers` | Remove all autopilot subscribers |
| `--description string` | New description |
| `-h, --help` | help for update |
| `--issue-title-template string` | New issue title template. Only {{date}} (UTC, YYYY-MM-DD) is interpolated; any other {{...}} token is rejected. |
| `--mode string` | New execution mode (create_issue or run_only) |
| `--output string` | Output format: table or json (default "json") |
| `--project string` | New project ID (use empty string to clear) |
| `--status string` | New status (active, paused) |
| `--subscriber stringArray` | Replace subscribers with this member (name or user ID; repeatable) |
| `--title string` | New title |
| `--help` | Show help for command |

### `multica chat`

Work with the current chat conversation

**子命令**：`history` · `thread`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for chat |
| `--help` | Show help for command |

### `multica chat history`

Overview of the channel this conversation is in (messages + thread list)

| Flag | 说明 |
|---|---|
| `--before string` | Opaque cursor (a next_cursor from a prior page) to read older messages |
| `-h, --help` | help for history |
| `--limit int` | Maximum number of messages to return (the server clamps the range) |
| `--output string` | Output format: table or json (default "json") |
| `--help` | Show help for command |

### `multica chat thread`

Read one thread's messages (the current thread, or a specific id)

| Flag | 说明 |
|---|---|
| `--before string` | Opaque cursor (a next_cursor from a prior page) to read older messages |
| `-h, --help` | help for thread |
| `--limit int` | Maximum number of messages to return (the server clamps the range) |
| `--output string` | Output format: table or json (default "json") |
| `--help` | Show help for command |

### `multica config`

Manage configuration for multica

**子命令**：`set` · `show`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for config |
| `--help` | Show help for command |

### `multica config set`

Set a CLI configuration value

| Flag | 说明 |
|---|---|
| `-h, --help` | help for set |
| `--help` | Show help for command |

### `multica config show`

Show current CLI configuration

| Flag | 说明 |
|---|---|
| `-h, --help` | help for show |
| `--help` | Show help for command |

### `multica daemon`

Control the local agent runtime daemon

**子命令**：`disk-usage` · `logs` · `restart` · `start` · `status` · `stop`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for daemon |
| `--help` | Show help for command |

### `multica daemon disk-usage`

Show daemon workspace disk usage by run or workspace

| Flag | 说明 |
|---|---|
| `--all-profiles` | Scan every workspace root (default root + all ~/.multica/profiles/* roots, incl. the Desktop app's) and report a combined total |
| `--by-task` | Per-run view (default; mutually exclusive with --by-workspace) |
| `--by-workspace` | Aggregate output by workspace instead of by run |
| `-h, --help` | help for disk-usage |
| `--output string` | Output format: table or json (default "table") |
| `--top int` | Keep only the largest N entries (per root in --all-profiles mode) |
| `--workspaces-root string` | Override the workspaces root path (default: same as the daemon) |
| `--help` | Show help for command |

### `multica daemon logs`

Show daemon logs

| Flag | 说明 |
|---|---|
| `-f, --follow` | Follow log output |
| `-h, --help` | help for logs |
| `-n, --lines int` | Number of lines to show (default 50) |
| `--help` | Show help for command |

### `multica daemon restart`

Restart the running daemon (stop + start)

| Flag | 说明 |
|---|---|
| `--agent-timeout duration` | Absolute per-run wall-clock cap; 0 = no cap, rely on the watchdogs (env: MULTICA_AGENT_TIMEOUT) |
| `--auto-update-interval duration` | How often to poll GitHub for a newer release (env: MULTICA_DAEMON_AUTO_UPDATE_INTERVAL) |
| `--codex-handshake-timeout duration` | Codex app-server startup RPC timeout (env: MULTICA_CODEX_HANDSHAKE_TIMEOUT) |
| `--codex-semantic-inactivity-timeout duration` | Codex semantic inactivity timeout (env: MULTICA_CODEX_SEMANTIC_INACTIVITY_TIMEOUT) |
| `--daemon-id string` | Unique daemon identifier (env: MULTICA_DAEMON_ID) |
| `--device-name string` | Human-readable device name (env: MULTICA_DAEMON_DEVICE_NAME) |
| `--foreground` | Run in the foreground instead of background |
| `--heartbeat-interval duration` | Heartbeat interval (env: MULTICA_DAEMON_HEARTBEAT_INTERVAL) |
| `-h, --help` | help for restart |
| `--max-concurrent-tasks int` | Maximum concurrent runs (env: MULTICA_DAEMON_MAX_CONCURRENT_TASKS) |
| `--no-auto-reload` | Disable restarting when the multica binary on disk changes version (env: MULTICA_DAEMON_AUTO_RELOAD=false) |
| `--no-auto-update` | Disable periodic CLI self-update (env: MULTICA_DAEMON_AUTO_UPDATE=false) |
| `--poll-interval duration` | Run poll interval (env: MULTICA_DAEMON_POLL_INTERVAL) |
| `--runtime-name string` | Runtime display name (env: MULTICA_AGENT_RUNTIME_NAME) |
| `--workspaces-root string` | Base directory for run workspaces (env: MULTICA_WORKSPACES_ROOT) |
| `--ws-claim-poll-interval duration` | Healthy WebSocket claim safety-poll upper bound (env: MULTICA_DAEMON_WS_CLAIM_POLL_INTERVAL) |
| `--help` | Show help for command |

### `multica daemon start`

Start the local agent runtime daemon

| Flag | 说明 |
|---|---|
| `--agent-timeout duration` | Absolute per-run wall-clock cap; 0 = no cap, rely on the watchdogs (env: MULTICA_AGENT_TIMEOUT) |
| `--auto-update-interval duration` | How often to poll GitHub for a newer release (env: MULTICA_DAEMON_AUTO_UPDATE_INTERVAL) |
| `--codex-handshake-timeout duration` | Codex app-server startup RPC timeout (env: MULTICA_CODEX_HANDSHAKE_TIMEOUT) |
| `--codex-semantic-inactivity-timeout duration` | Codex semantic inactivity timeout (env: MULTICA_CODEX_SEMANTIC_INACTIVITY_TIMEOUT) |
| `--daemon-id string` | Unique daemon identifier (env: MULTICA_DAEMON_ID) |
| `--device-name string` | Human-readable device name (env: MULTICA_DAEMON_DEVICE_NAME) |
| `--foreground` | Run in the foreground instead of background |
| `--heartbeat-interval duration` | Heartbeat interval (env: MULTICA_DAEMON_HEARTBEAT_INTERVAL) |
| `-h, --help` | help for start |
| `--max-concurrent-tasks int` | Maximum concurrent runs (env: MULTICA_DAEMON_MAX_CONCURRENT_TASKS) |
| `--no-auto-reload` | Disable restarting when the multica binary on disk changes version (env: MULTICA_DAEMON_AUTO_RELOAD=false) |
| `--no-auto-update` | Disable periodic CLI self-update (env: MULTICA_DAEMON_AUTO_UPDATE=false) |
| `--poll-interval duration` | Run poll interval (env: MULTICA_DAEMON_POLL_INTERVAL) |
| `--runtime-name string` | Runtime display name (env: MULTICA_AGENT_RUNTIME_NAME) |
| `--workspaces-root string` | Base directory for run workspaces (env: MULTICA_WORKSPACES_ROOT) |
| `--ws-claim-poll-interval duration` | Healthy WebSocket claim safety-poll upper bound (env: MULTICA_DAEMON_WS_CLAIM_POLL_INTERVAL) |
| `--help` | Show help for command |

### `multica daemon status`

Show daemon status

| Flag | 说明 |
|---|---|
| `-h, --help` | help for status |
| `--output string` | Output format: table or json (default "table") |
| `--help` | Show help for command |

### `multica daemon stop`

Stop the running daemon

| Flag | 说明 |
|---|---|
| `-h, --help` | help for stop |
| `--help` | Show help for command |

### `multica issue`

Work with issues

```
Show aggregated token usage for an issue
```

**子命令**：`assign` · `cancel-task` · `children` · `comment` · `create` · `get` · `label` · `list` · `metadata` · `property` · `pull-requests` · `reorder` · `rerun` · `run-messages` · `runs` · `search` · `status` · `subscriber` · `timeline` · `update`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for issue |
| `--help` | Show help for command |

### `multica issue assign`

Assign an issue to a member, agent, or squad

| Flag | 说明 |
|---|---|
| `-h, --help` | help for assign |
| `--no-start` | Assign ownership without starting an agent run |
| `--output string` | Output format: table or json (default "json") |
| `--to string` | Assignee name (member, agent, or squad; fuzzy match) |
| `--to-id string` | Assignee UUID — member, agent, or squad (mutually exclusive with --to) |
| `--unassign` | Remove current assignee |
| `--help` | Show help for command |

### `multica issue cancel-task`

Cancel an in-progress or queued run (interrupts in-flight agent)

| Flag | 说明 |
|---|---|
| `-h, --help` | help for cancel-task |
| `--issue string` | Issue ID/key to scope short run ID prefix resolution |
| `--output string` | Output format: table or json (default "json") |
| `--help` | Show help for command |

### `multica issue children`

List an issue's sub-issues grouped by stage

| Flag | 说明 |
|---|---|
| `--full-id` | Show full UUIDs in table output |
| `-h, --help` | help for children |
| `--output string` | Output format: table or json (default "table") |
| `--help` | Show help for command |

### `multica issue comment`

Work with issue comments

**子命令**：`add` · `delete` · `list` · `resolve` · `unresolve`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for comment |
| `--help` | Show help for command |

### `multica issue create`

Create a new issue

| Flag | 说明 |
|---|---|
| `--allow-duplicate` | Allow creating an issue even when an active duplicate exists |
| `--allow-external-file` | Allow --description-file / --attachment to read a path outside the current working directory. Off by default so a stale file from another run/environment can't be picked up (MUL-4252). |
| `--assignee string` | Assignee name (member, agent, or squad; fuzzy match) |
| `--assignee-id string` | Assignee UUID — member, agent, or squad (mutually exclusive with --assignee) |
| `--attachment strings` | File path(s) to attach (can be specified multiple times) |
| `--attachment-id strings` | Existing attachment UUID(s) to bind to the created issue (can be specified multiple times) |
| `--description string` | Issue description (decodes \n, \r, \t, \\; pipe via --description-stdin to preserve literal backslashes) |
| `--description-file string` | Read issue description from a UTF-8 file (preserves multi-line content verbatim; use this on Windows when stdin piping mangles non-ASCII bytes). The path must be inside the current working directory unless --allow-external-file is set. |
| `--description-stdin` | Read issue description from stdin (preserves multi-line content verbatim) |
| `--due-date string` | Due date (calendar day, YYYY-MM-DD) |
| `-h, --help` | help for create |
| `--output string` | Output format: table or json (default "json") |
| `--parent string` | Parent issue ID |
| `--priority string` | Issue priority |
| `--project string` | Project ID |
| `--stage int` | Stage ordinal (>=1) grouping this sub-issue into an ordered barrier group under its parent; omit for unstaged. The parent assignee is woken only when every sub-issue in a stage finishes. |
| `--start-date string` | Start date (calendar day, YYYY-MM-DD) |
| `--status string` | Issue status |
| `--title string` | Issue title (required) |
| `--help` | Show help for command |

### `multica issue get`

Get issue details

| Flag | 说明 |
|---|---|
| `-h, --help` | help for get |
| `--output string` | Output format: table or json (default "json") |
| `--help` | Show help for command |

### `multica issue label`

Manage labels on an issue

**子命令**：`add` · `list` · `remove`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for label |
| `--help` | Show help for command |

### `multica issue list`

List issues in the workspace

| Flag | 说明 |
|---|---|
| `--assignee string` | Filter by assignee name (member, agent, or squad; fuzzy match) |
| `--assignee-id string` | Filter by assignee UUID — member, agent, or squad (mutually exclusive with --assignee) |
| `--direction string` | Sort direction (asc or desc); requires --sort to be a non-position column or a property sort (position is always ascending) |
| `--fields string` | JSON output only: comma-separated list of issue fields to include (e.g. id,title,status,priority). Filtering happens client-side after the full response is fetched, so this shrinks CLI output size and agent context cost, not network/server-side cost. Omit for the full issue object (default, unchanged). Valid fields: id, workspace_id, number, identifier, title, description, status, status_category, status_name, priority, assignee_type, assignee_id, creator_type, creator_id, parent_issue_id, project_id, position, stage, start_date, due_date, created_at, updated_at, revision, last_activity_at, metadata, properties, labels |
| `--full-id` | Show full UUIDs in table output |
| `-h, --help` | help for list |
| `--limit int` | Page size, 1 to 100 (the server returns at most 100 issues per request; use --offset to page through more) (default 50) |
| `--metadata strings` | Filter by metadata key=value (repeatable; combined with AND). Value is JSON-parsed: 'true'/'false' → bool, numbers → number, otherwise string. Wrap as '"42"' to force a string when the value would otherwise sniff as a number. |
| `--offset int` | Number of issues to skip (for pagination; while --output json reports has_more, advance it by the number of issues in that same response) |
| `--output string` | Output format: table or json (default "table") |
| `--priority string` | Filter by priority |
| `--project string` | Filter by project ID |
| `--property stringArray` | Filter by custom property, written as "Name=Value" (repeatable, one value per flag). Name is a property name (case-insensitive) or its UUID. Value depends on the type: an option name or id for select and multi_select, true or false for checkbox, a member name, email, or id for actor types, and the value itself for text, url, number, and date (YYYY-MM-DD). Use __none__ to match issues where the property is unset; it works for every type, so an option or member actually named __none__ has to be given by id, as does a property whose name contains "=" or ends in <, > or ! (the >=, <=, and != spellings are reserved for comparison filters). Repeating a property matches ANY of its values; different properties must ALL match. |
| `--sort string` | Sort column: position (default, manual board order), title, created_at, start_date, due_date, priority, or property:<name-or-id> to sort by a custom property (select properties sort by option order) |
| `--status string` | Filter by status |
| `--help` | Show help for command |

### `multica issue metadata`

Manage per-issue metadata (KV)

**子命令**：`delete` · `get` · `list` · `set`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for metadata |
| `--help` | Show help for command |

### `multica issue property`

Manage custom property values on an issue

**子命令**：`list` · `set` · `unset`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for property |
| `--help` | Show help for command |

### `multica issue pull-requests`

List pull requests linked to an issue

| Flag | 说明 |
|---|---|
| `-h, --help` | help for pull-requests |
| `--output string` | Output format: table or json (default "table") |
| `--help` | Show help for command |

### `multica issue reorder`

Move an issue within its status column

| Flag | 说明 |
|---|---|
| `--after string` | Place the issue directly below this issue (same column) |
| `--before string` | Place the issue directly above this issue (same column) |
| `--bottom` | Move the issue to the bottom of its status column |
| `-h, --help` | help for reorder |
| `--output string` | Output format: table or json (default "json") |
| `--top` | Move the issue to the top of its status column |
| `--help` | Show help for command |

### `multica issue rerun`

Re-enqueue an issue's current agent assignment as a fresh run

| Flag | 说明 |
|---|---|
| `-h, --help` | help for rerun |
| `--output string` | Output format: table or json (default "json") |
| `--help` | Show help for command |

### `multica issue run-messages`

List messages for an execution

| Flag | 说明 |
|---|---|
| `-h, --help` | help for run-messages |
| `--issue string` | Issue ID/key to scope short run ID prefix resolution |
| `--output string` | Output format: table or json (default "json") |
| `--since int` | Only return messages after this sequence number |
| `--help` | Show help for command |

### `multica issue runs`

List execution history for an issue

| Flag | 说明 |
|---|---|
| `--active` | Only in-flight runs (queued, dispatched, running, waiting_local_directory) instead of the full execution history. Answers "is an agent working on this right now" without pulling every past run. |
| `--full-id` | Show full run UUIDs in table output |
| `-h, --help` | help for runs |
| `--output string` | Output format: table or json (default "table") |
| `--siblings` | Widen to this issue's sub-issue family — its parent (or itself, when it has no parent) plus every child of that parent — so you can see whether another run is already working alongside you before starting overlapping code or PR work. Implies --active. Returns a compact per-run row (run, issue, agent, status, started) rather than the full execution-log record. Ordered running-first, newest-first within a status, and capped at 20 rows; when the cap truncates the answer the CLI says so on stderr, so a short list is never mistaken for a complete one. Advisory only: it reports work in flight, it does not reserve or serialise anything. |
| `--help` | Show help for command |

### `multica issue search`

Search issues by title, description, or comments

| Flag | 说明 |
|---|---|
| `-h, --help` | help for search |
| `--include-closed` | Include done and cancelled issues |
| `--limit int` | Maximum number of results to return (default 20) |
| `--output string` | Output format: table or json (default "table") |
| `--help` | Show help for command |

### `multica issue status`

Change issue status

| Flag | 说明 |
|---|---|
| `-h, --help` | help for status |
| `--no-start` | Change status without starting an agent run |
| `--output string` | Output format: table or json (default "table") |
| `--help` | Show help for command |

### `multica issue subscriber`

Work with issue subscribers

**子命令**：`add` · `list` · `remove`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for subscriber |
| `--help` | Show help for command |

### `multica issue timeline`

Chronological issue history — when status/assignee changed, how long it has been stuck

| Flag | 说明 |
|---|---|
| `--action strings` | Only return activities with these actions (repeatable or comma-separated). Implies --activity-only, since comments carry no action. Known actions: created, status_changed, priority_changed, assignee_changed, title_changed, description_updated, start_date_changed, due_date_changed, task_completed, task_failed, squad_leader_evaluated. |
| `--activity-only` | Drop comments and return every activity record — including the task_completed / task_failed entries the server already writes, not just field changes. Much cheaper to read than the full timeline; use --action when you want only state transitions. |
| `--full-id` | Show full UUIDs in table output |
| `-h, --help` | help for timeline |
| `--output string` | Output format: table or json (default "table") |
| `--since string` | Only return entries created after this timestamp (RFC3339) |
| `--tail int` | Only return the N most recent entries (applied after every other filter) |
| `--help` | Show help for command |

### `multica issue update`

Update an issue

| Flag | 说明 |
|---|---|
| `--allow-external-file` | Allow --description-file to read a path outside the current working directory. Off by default so a stale temp file from another run/environment can't be picked up (MUL-4252). |
| `--assignee string` | New assignee name (member, agent, or squad; fuzzy match) |
| `--assignee-id string` | New assignee UUID — member, agent, or squad (mutually exclusive with --assignee) |
| `--description string` | New description (decodes \n, \r, \t, \\; pipe via --description-stdin to preserve literal backslashes) |
| `--description-file string` | Read new description from a UTF-8 file (preserves multi-line content verbatim; use this on Windows when stdin piping mangles non-ASCII bytes). The path must be inside the current working directory unless --allow-external-file is set. |
| `--description-stdin` | Read new description from stdin (preserves multi-line content verbatim) |
| `--due-date string` | New due date (calendar day, YYYY-MM-DD) |
| `-h, --help` | help for update |
| `--no-start` | Apply the update without starting an agent run |
| `--output string` | Output format: table or json (default "json") |
| `--parent string` | Parent issue ID (use --parent "" to clear) |
| `--priority string` | New priority |
| `--project string` | Project ID |
| `--start-date string` | New start date (calendar day, YYYY-MM-DD; pass empty string to clear) |
| `--status string` | New status |
| `--title string` | New title |
| `--help` | Show help for command |

### `multica label`

Work with issue labels

**子命令**：`create` · `delete` · `get` · `list` · `update`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for label |
| `--help` | Show help for command |

### `multica label create`

Create a new label

| Flag | 说明 |
|---|---|
| `--color string` | Hex color like #3b82f6 (required) |
| `-h, --help` | help for create |
| `--name string` | Label name (required) |
| `--output string` | Output format: table or json (default "json") |
| `--help` | Show help for command |

### `multica label delete`

Delete a label

| Flag | 说明 |
|---|---|
| `-h, --help` | help for delete |
| `--output string` | Output format: table or json (default "json") |
| `--help` | Show help for command |

### `multica label get`

Get label details

| Flag | 说明 |
|---|---|
| `-h, --help` | help for get |
| `--output string` | Output format: table or json (default "json") |
| `--help` | Show help for command |

### `multica label list`

List labels in the workspace

| Flag | 说明 |
|---|---|
| `--full-id` | Show full UUIDs in table output |
| `-h, --help` | help for list |
| `--output string` | Output format: table or json (default "table") |
| `--help` | Show help for command |

### `multica label update`

Update a label

| Flag | 说明 |
|---|---|
| `--color string` | New hex color |
| `-h, --help` | help for update |
| `--name string` | New name |
| `--output string` | Output format: table or json (default "json") |
| `--help` | Show help for command |

### `multica login`

Authenticate and set up workspaces

| Flag | 说明 |
|---|---|
| `--callback-host string` | Host/IP the OAuth callback URL points at when the browser can reach this CLI directly. For SSH-only machines, use the printed tunnel hint instead. |
| `-h, --help` | help for login |
| `--help` | Show help for command |

### `multica project`

Work with projects

**子命令**：`create` · `delete` · `get` · `list` · `resource` · `status` · `update`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for project |
| `--help` | Show help for command |

### `multica project create`

Create a new project

| Flag | 说明 |
|---|---|
| `--description string` | Project description |
| `--due-date string` | Due date (calendar day, YYYY-MM-DD) |
| `-h, --help` | help for create |
| `--icon string` | Project icon (emoji) |
| `--lead string` | Lead name (member or agent) |
| `--output string` | Output format: table or json (default "json") |
| `--repo stringArray` | Attach a github_repo resource by URL (may be repeated) |
| `--start-date string` | Start date (calendar day, YYYY-MM-DD) |
| `--status string` | Project status |
| `--title string` | Project title (required) |
| `--help` | Show help for command |

### `multica project delete`

Delete a project

| Flag | 说明 |
|---|---|
| `-h, --help` | help for delete |
| `--output string` | Output format: table or json (default "json") |
| `--help` | Show help for command |

### `multica project get`

Get project details

| Flag | 说明 |
|---|---|
| `-h, --help` | help for get |
| `--output string` | Output format: table or json (default "json") |
| `--help` | Show help for command |

### `multica project list`

List projects in the workspace

| Flag | 说明 |
|---|---|
| `--full-id` | Show full UUIDs in table output |
| `-h, --help` | help for list |
| `--output string` | Output format: table or json (default "table") |
| `--status string` | Filter by status |
| `--help` | Show help for command |

### `multica project resource`

Manage resources attached to a project

**子命令**：`add` · `list` · `remove` · `update`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for resource |
| `--help` | Show help for command |

### `multica project status`

Change project status

| Flag | 说明 |
|---|---|
| `-h, --help` | help for status |
| `--output string` | Output format: table or json (default "table") |
| `--help` | Show help for command |

### `multica project update`

Update a project

| Flag | 说明 |
|---|---|
| `--description string` | New description |
| `--due-date string` | New due date (calendar day, YYYY-MM-DD; pass empty string to clear) |
| `-h, --help` | help for update |
| `--icon string` | New icon (emoji) |
| `--lead string` | New lead name (member or agent) |
| `--output string` | Output format: table or json (default "json") |
| `--start-date string` | New start date (calendar day, YYYY-MM-DD; pass empty string to clear) |
| `--status string` | New status |
| `--title string` | New title |
| `--help` | Show help for command |

### `multica property`

Manage workspace custom issue properties

**子命令**：`archive` · `create` · `get` · `list` · `unarchive` · `update`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for property |
| `--help` | Show help for command |

### `multica property archive`

Archive a property definition (hidden from pickers; values preserved)

| Flag | 说明 |
|---|---|
| `-h, --help` | help for archive |
| `--output string` | Output format: table or json (default "table") |
| `--help` | Show help for command |

### `multica property create`

Create a property definition (workspace owner/admin only)

| Flag | 说明 |
|---|---|
| `--description string` | Property description |
| `-h, --help` | help for create |
| `--icon string` | Property icon key from the Web picker (for example, flag, tag, or shield) |
| `--name string` | Property name (required) |
| `--option stringArray` | Select option as "Name" or "Name:#rrggbb" (repeatable; select types only) |
| `--output string` | Output format: table or json (default "table") |
| `--type string` | Property type: text, number, select, multi_select, date, checkbox, url, actor, multi_actor (required) |
| `--help` | Show help for command |

### `multica property get`

Show one property definition

| Flag | 说明 |
|---|---|
| `-h, --help` | help for get |
| `--output string` | Output format: table or json (default "json") |
| `--help` | Show help for command |

### `multica property list`

List property definitions

| Flag | 说明 |
|---|---|
| `-h, --help` | help for list |
| `--include-archived` | Include archived properties |
| `--output string` | Output format: table or json (default "table") |
| `--help` | Show help for command |

### `multica property unarchive`

Restore an archived property definition

| Flag | 说明 |
|---|---|
| `-h, --help` | help for unarchive |
| `--output string` | Output format: table or json (default "table") |
| `--help` | Show help for command |

### `multica property update`

Update a property definition (owner/admin only; type is immutable)

| Flag | 说明 |
|---|---|
| `--description string` | New property description |
| `-h, --help` | help for update |
| `--icon string` | New property icon key from the Web picker; pass an empty value to clear |
| `--name string` | New property name |
| `--option stringArray` | Replacement option list as "Name" or "Name:#rrggbb" (repeatable) |
| `--output string` | Output format: table or json (default "table") |
| `--help` | Show help for command |

### `multica repo`

Work with repositories

**子命令**：`add` · `checkout` · `list` · `remove`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for repo |
| `--help` | Show help for command |

### `multica repo add`

Add repositories to the workspace registry

| Flag | 说明 |
|---|---|
| `--description string` | Optional description; only valid when adding one URL |
| `-h, --help` | help for add |
| `--output string` | Output format: table or json (default "json") |
| `--url stringArray` | Repository URL to add (may be repeated) |
| `--help` | Show help for command |

### `multica repo checkout`

Check out a repository into the working directory

| Flag | 说明 |
|---|---|
| `--fresh` | discard an existing checkout's uncommitted changes and untracked files and start over on a new branch from the latest default branch (or --ref); commits stay on the old branch |
| `-h, --help` | help for checkout |
| `--ref string` | branch, tag, or commit to check out instead of the remote default branch |
| `--help` | Show help for command |

### `multica repo list`

List workspace repositories

| Flag | 说明 |
|---|---|
| `-h, --help` | help for list |
| `--output string` | Output format: table or json (default "table") |
| `--help` | Show help for command |

### `multica repo remove`

Remove repositories from the workspace registry

| Flag | 说明 |
|---|---|
| `-h, --help` | help for remove |
| `--output string` | Output format: table or json (default "json") |
| `--url stringArray` | Repository URL to remove (may be repeated) |
| `--help` | Show help for command |

### `multica runtime`

Work with agent runtimes

```
Get token usage for a runtime
```

**子命令**：`activity` · `delete` · `list` · `profile` · `rename` · `update`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for runtime |
| `--help` | Show help for command |

### `multica runtime activity`

Get hourly run activity for a runtime

| Flag | 说明 |
|---|---|
| `-h, --help` | help for activity |
| `--output string` | Output format: table or json (default "table") |
| `--help` | Show help for command |

### `multica runtime delete`

Delete a runtime from the workspace

| Flag | 说明 |
|---|---|
| `--cascade` | Unbind active agents from the runtime, cancel their runs, then delete the runtime |
| `-h, --help` | help for delete |
| `--output string` | Output format: table or json (default "table") |
| `--help` | Show help for command |

### `multica runtime list`

List runtimes in the workspace

| Flag | 说明 |
|---|---|
| `-h, --help` | help for list |
| `--output string` | Output format: table or json (default "table") |
| `--help` | Show help for command |

### `multica runtime profile`

Manage custom runtime profiles

**子命令**：`create` · `delete` · `list` · `set-path` · `unset-path` · `update`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for profile |
| `--help` | Show help for command |

### `multica runtime rename`

Set a custom display name for a runtime

| Flag | 说明 |
|---|---|
| `-h, --help` | help for rename |
| `--machine` | Apply the name to every runtime on the same machine |
| `--output string` | Output format: table or json (default "table") |
| `--help` | Show help for command |

### `multica runtime update`

Initiate a CLI update on a runtime

| Flag | 说明 |
|---|---|
| `-h, --help` | help for update |
| `--output string` | Output format: table or json (default "json") |
| `--target-version string` | Target version to update to (required) |
| `--wait` | Wait for update to complete (poll until done) |
| `--help` | Show help for command |

### `multica setup`

Configure the CLI, authenticate, and start the daemon

**子命令**：`cloud` · `self-host`

| Flag | 说明 |
|---|---|
| `--callback-host string` | Host/IP the OAuth callback URL points at when the browser can reach this CLI directly. For SSH-only machines, use the printed tunnel hint instead. |
| `-h, --help` | help for setup |
| `--help` | Show help for command |

### `multica setup cloud`

Configure the CLI for Multica Cloud (multica.ai)

| Flag | 说明 |
|---|---|
| `--callback-host string` | Host/IP the OAuth callback URL points at when the browser can reach this CLI directly. For SSH-only machines, use the printed tunnel hint instead. |
| `-h, --help` | help for cloud |
| `--help` | Show help for command |

### `multica setup self-host`

Configure the CLI for a self-hosted Multica server

| Flag | 说明 |
|---|---|
| `--app-url string` | Frontend app URL (e.g. https://app.internal.co) (env: MULTICA_APP_URL) |
| `--callback-host string` | Host/IP the OAuth callback URL points at when the browser can reach this CLI directly. For SSH-only machines, use the printed tunnel hint instead. |
| `--frontend-port int` | Frontend port (used when --app-url is not set) (default 3000) |
| `-h, --help` | help for self-host |
| `--port int` | Backend server port (used when --server-url is not set) (default 8080) |
| `--server-url string` | Backend server URL (e.g. https://api.internal.co) (env: MULTICA_SERVER_URL) |
| `--help` | Show help for command |

### `multica skill`

Work with skills

**子命令**：`create` · `delete` · `files` · `get` · `import` · `list` · `refresh` · `search` · `update`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for skill |
| `--help` | Show help for command |

### `multica skill create`

Create a new skill

| Flag | 说明 |
|---|---|
| `--config string` | Skill config as JSON string |
| `--content string` | Skill content (SKILL.md body) |
| `--content-file string` | Read skill content from a UTF-8 file. Mutually exclusive with --content and --content-stdin. |
| `--content-stdin` | Read skill content from stdin. Mutually exclusive with --content and --content-file. |
| `--description string` | Skill description |
| `-h, --help` | help for create |
| `--name string` | Skill name (required) |
| `--output string` | Output format: table or json (default "json") |
| `--help` | Show help for command |

### `multica skill delete`

Delete a skill

| Flag | 说明 |
|---|---|
| `-h, --help` | help for delete |
| `--yes` | Skip confirmation prompt |
| `--help` | Show help for command |

### `multica skill files`

Work with skill files

**子命令**：`delete` · `list` · `upsert`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for files |
| `--help` | Show help for command |

### `multica skill get`

Get skill details and its file list (use --with-content for the bodies)

| Flag | 说明 |
|---|---|
| `-h, --help` | help for get |
| `--output string` | Output format: table or json (default "json") |
| `--with-content` | Include the SKILL.md body and every file body. Off by default: the response grows with the skill and large skills cannot be fetched this way over slow links. |
| `--help` | Show help for command |

### `multica skill import`

Import a skill from a URL (clawhub.ai, skills.sh, github.com) or a local .skill/.zip archive

| Flag | 说明 |
|---|---|
| `--file string` | Path to a local skill archive (.skill or .zip) to import. Mutually exclusive with --url. |
| `-h, --help` | help for import |
| `--on-conflict string` | Conflict strategy when a skill with the same name exists: fail, overwrite, rename, or skip (default "fail") |
| `--output string` | Output format: table or json (default "json") |
| `--url string` | URL to import from (clawhub.ai, skills.sh, or github.com). Mutually exclusive with --file. |
| `--help` | Show help for command |

### `multica skill list`

List skills in the workspace

| Flag | 说明 |
|---|---|
| `-h, --help` | help for list |
| `--output string` | Output format: table or json (default "table") |
| `--help` | Show help for command |

### `multica skill refresh`

Re-download a skill from its imported source, preserving its id and agent assignments

| Flag | 说明 |
|---|---|
| `-h, --help` | help for refresh |
| `--output string` | Output format: table or json (default "json") |
| `--help` | Show help for command |

### `multica skill search`

Search for installable skills

| Flag | 说明 |
|---|---|
| `-h, --help` | help for search |
| `--output string` | Output format: table or json (default "json") |
| `--help` | Show help for command |

### `multica skill update`

Update a skill

| Flag | 说明 |
|---|---|
| `--config string` | New config as JSON string |
| `--content string` | New content |
| `--content-file string` | Read new content from a UTF-8 file. Mutually exclusive with --content and --content-stdin. |
| `--content-stdin` | Read new content from stdin. Mutually exclusive with --content and --content-file. |
| `--description string` | New description |
| `-h, --help` | help for update |
| `--name string` | New name |
| `--output string` | Output format: table or json (default "json") |
| `--help` | Show help for command |

### `multica squad`

Work with squads

**子命令**：`activity` · `create` · `delete` · `get` · `list` · `member` · `update`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for squad |
| `--help` | Show help for command |

### `multica squad activity`

Record a squad leader evaluation on an issue

| Flag | 说明 |
|---|---|
| `-h, --help` | help for activity |
| `--output string` | Output format: table or json (default "table") |
| `--reason string` | Short explanation of the decision |
| `--help` | Show help for command |

### `multica squad create`

Create a new squad

| Flag | 说明 |
|---|---|
| `--description string` | Squad description |
| `-h, --help` | help for create |
| `--leader string` | Leader agent (name or ID) — required |
| `--name string` | Squad name (required) |
| `--output string` | Output format: table or json (default "json") |
| `--help` | Show help for command |

### `multica squad delete`

Delete (archive) a squad

| Flag | 说明 |
|---|---|
| `-h, --help` | help for delete |
| `--output string` | Output format: table or json (default "table") |
| `--help` | Show help for command |

### `multica squad get`

Get squad details

| Flag | 说明 |
|---|---|
| `-h, --help` | help for get |
| `--output string` | Output format: table or json (default "table") |
| `--help` | Show help for command |

### `multica squad list`

List squads in the workspace

| Flag | 说明 |
|---|---|
| `-h, --help` | help for list |
| `--output string` | Output format: table or json (default "table") |
| `--help` | Show help for command |

### `multica squad member`

Work with squad members

**子命令**：`add` · `list` · `remove` · `set-role`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for member |
| `--help` | Show help for command |

### `multica squad update`

Update a squad

| Flag | 说明 |
|---|---|
| `--avatar-url string` | New avatar URL |
| `--description string` | New description |
| `-h, --help` | help for update |
| `--instructions string` | New instructions |
| `--leader string` | New leader agent (name or ID) |
| `--name string` | New name |
| `--output string` | Output format: table or json (default "json") |
| `--help` | Show help for command |

### `multica update`

Update multica to the latest version

| Flag | 说明 |
|---|---|
| `--download-timeout duration` | Maximum time to wait for the release archive download (default 2m0s) |
| `-h, --help` | help for update |
| `--help` | Show help for command |

### `multica user`

Work with your user account

**子命令**：`profile`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for user |
| `--help` | Show help for command |

### `multica user profile`

Get or update your personal profile

**子命令**：`get` · `update`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for profile |
| `--help` | Show help for command |

### `multica version`

Print version information

| Flag | 说明 |
|---|---|
| `-h, --help` | help for version |
| `--output string` | Output format: text or json (default "text") |
| `--help` | Show help for command |

### `multica workspace`

Work with workspaces

**子命令**：`create` · `get` · `list` · `mcp` · `member` · `switch` · `update`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for workspace |
| `--help` | Show help for command |

### `multica workspace create`

Create a workspace

| Flag | 说明 |
|---|---|
| `--context string` | Workspace context (decodes \n, \r, \t, \\; pipe via --context-stdin to preserve literal backslashes) |
| `--context-stdin` | Read context from stdin (preserves multi-line content verbatim) |
| `--description string` | Workspace description (decodes \n, \r, \t, \\; pipe via --description-stdin to preserve literal backslashes) |
| `--description-stdin` | Read description from stdin (preserves multi-line content verbatim) |
| `-h, --help` | help for create |
| `--issue-prefix string` | Issue prefix (uppercased server-side) |
| `--name string` | Workspace name |
| `--output string` | Output format: table or json (default "json") |
| `--slug string` | Workspace slug |
| `--help` | Show help for command |

### `multica workspace get`

Get workspace details

| Flag | 说明 |
|---|---|
| `-h, --help` | help for get |
| `--output string` | Output format: table or json (default "json") |
| `--help` | Show help for command |

### `multica workspace list`

List all workspaces you belong to

| Flag | 说明 |
|---|---|
| `--full-id` | Show full UUIDs in table output |
| `-h, --help` | help for list |
| `--output string` | Output format: table or json (default "table") |
| `--help` | Show help for command |

### `multica workspace mcp`

Manage the workspace's MCP server library

**子命令**：`add` · `list` · `remove` · `update`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for mcp |
| `--help` | Show help for command |

### `multica workspace member`

Manage workspace members

**子命令**：`invite` · `list`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for member |
| `--help` | Show help for command |

### `multica workspace switch`

Set the default workspace for this profile

| Flag | 说明 |
|---|---|
| `-h, --help` | help for switch |
| `--help` | Show help for command |

### `multica workspace update`

Update workspace metadata (admin/owner only)

| Flag | 说明 |
|---|---|
| `--context string` | New workspace context (decodes \n, \r, \t, \\; pipe via --context-stdin to preserve literal backslashes) |
| `--context-stdin` | Read context from stdin (preserves multi-line content verbatim) |
| `--description string` | New description (decodes \n, \r, \t, \\; pipe via --description-stdin to preserve literal backslashes) |
| `--description-stdin` | Read description from stdin (preserves multi-line content verbatim) |
| `-h, --help` | help for update |
| `--issue-prefix string` | New issue prefix (uppercased server-side) |
| `--name string` | New workspace name |
| `--output string` | Output format: table or json (default "json") |
| `--help` | Show help for command |
