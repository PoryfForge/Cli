---
name: dreamina
kind: cli
command: dreamina
version: 673dd28-dirty
title: 即梦 CLI
license: 厂商专有
repo: https://jimeng.jianying.com/cli
scanned_at: 2026-09-18 06:27:45
source: local-bin + help-tree + official-skill
nodes: 23
official_skill: vendor/SKILL.md
---

# 即梦 CLI（`dreamina`）— 能力快照

> 即梦（Dreamina）官方 AIGC CLI：文生图 / 图生图 / 文生视频 / 图生视频 / 多模态参考，含账号、会话与任务管理

## 怎么用这份文档

- 这是由 `dreamina --help` 递归提取的能力快照；覆盖范围受扫描深度、节点上限及 help 输出限制，不保证包含全部接口。
- 需要二级细节时，直接查本文档对应小节；如需最新参数，跑 `<命令路径> --help`。
- 用法：先在下表定位子命令，再按该小节的 usage 与 flag 拼命令。
- **动手前先读文末「官方 Agent 使用规则」**：那是厂商写给 Agent 的判断标准（例如怎样才算任务成功、哪些操作要先警示用户），比 help 更权威。

## 概览

| 项 | 值 |
|---|---|
| 可执行文件 | `dreamina` |
| 版本 | `673dd28-dirty` |
| 仓库 | https://jimeng.jianying.com/cli |
| 许可证 | 厂商专有 |
| 采集方式 | 本机安装的 CLI（`--help` 递归）+ 官方 SKILL.md |
| 本轮抓取命令数 | 23（顶层 1） |
| 抓取时间 | 2026-09-18 06:27:45 |
| 原始 help 留档 | `raw/` |
| 官方 Agent 规则 | `vendor/SKILL.md`（已合并到文末） |

## 安装

```bash
curl -fsSL https://jimeng.jianying.com/cli | bash
```

## 顶层用法

```
dreamina [flags]
```

## 命令树

### Generator Commands

| 命令 | 说明 / 用法概要 |
|---|---|
| `dreamina frames2video` | Submit a Dreamina first-last-frames video task |
| `dreamina image_upscale` | Submit a Dreamina image upscale task |
| `dreamina image2image` | Submit a Dreamina image-to-image task |
| `dreamina image2video` | Animate one image into video; use multiframe2video for multi-image stories |
| `dreamina multiframe2video` | Create a coherent video story from multiple images |
| `dreamina multimodal2video` | Dreamina flagship video mode (全能参考 / formerly ref2video) with all-around references and Seedance |
| `dreamina text2image` | Submit a Dreamina text-to-image task |
| `dreamina text2video` | Submit a Dreamina text-to-video task |

### Built-in Commands

| 命令 | 说明 / 用法概要 |
|---|---|
| `dreamina help` | Help about any command |
| `dreamina list_task` | List saved tasks with status and result summary |
| `dreamina login` | Log in locally with OAuth Device Flow before using task and account commands |
| `dreamina logout` | Clear the local OAuth login state |
| `dreamina query_result` | Query the current result of an async generation task |
| `dreamina relogin` | Clear the local OAuth login state and force a fresh OAuth login |
| `dreamina session` | Manage sessions (create/list/search/rename/delete) |
| `dreamina session create` | &nbsp;&nbsp;&nbsp;&nbsp;Create a new session (auto-named or custom) |
| `dreamina session delete` | &nbsp;&nbsp;&nbsp;&nbsp;Delete a session (alias: rm) |
| `dreamina session list` | &nbsp;&nbsp;&nbsp;&nbsp;List your recent sessions (alias: ls) |
| `dreamina session rename` | &nbsp;&nbsp;&nbsp;&nbsp;Change a session's name (alias: update) |
| `dreamina session search` | &nbsp;&nbsp;&nbsp;&nbsp;Find a session ID by its name (alias: find) |
| `dreamina user_credit` | Show the current user's remaining credit balance |
| `dreamina version` | Print build version and commit information |

## 逐命令详情

### `dreamina frames2video`

Submit a Dreamina first-last-frames video task

```
dreamina frames2video [flags]
```

| Flag | 说明 |
|---|---|
| `--first string` | local first-frame image path |
| `--last string` | local last-frame image path |
| `--prompt string` | generation prompt |
| `--session int` | session id (default 0 "默认对话") |
| `--duration int` | video duration in seconds; supported ranges: seedance1.5pro -> 5-12, seedance2.0 family/seedance2.0mini -> 4-15, seedance2.5 -> 4-30 (default 5) |
| `--video_resolution string` | required; supported values by model: seedance2.5 -> 480p, 720p, or 1080p; seedance2.0_vip -> 720p, 1080p, or 4k; all other models -> 720p |
| `--model_version string` | supported values: seedance1.5pro, seedance2.0, seedance2.0fast, seedance2.0_vip, seedance2.0fast_vip, seedance2.0mini, seedance2.5; default: seedance2.0_vip |
| `--poll int` | submit then poll query_result for up to N seconds at 1s intervals (0 disables polling) |
| `-h, --help` | help for frames2video |
| `--version` | print build version information |

### `dreamina help`

Help about any command

```
dreamina help [command] [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for help |
| `--version` | print build version information |

### `dreamina image_upscale`

Submit a Dreamina image upscale task

```
dreamina image_upscale [flags]
```

| Flag | 说明 |
|---|---|
| `--image string` | local input image path |
| `--session int` | session id (default 0 "默认对话") |
| `--resolution_type string` | supported values: 2k, 4k, 8k |
| `--poll int` | submit then poll query_result for up to N seconds at 1s intervals (0 disables polling) |
| `-h, --help` | help for image_upscale |
| `--version` | print build version information |

### `dreamina image2image`

Submit a Dreamina image-to-image task

```
dreamina image2image [flags]
```

| Flag | 说明 |
|---|---|
| `--images strings` | local input image paths |
| `--prompt string` | edit prompt |
| `--session int` | session id (default 0 "默认对话") |
| `--ratio string` | supported values: 21:9, 16:9, 3:2, 4:3, 1:1, 3:4, 2:3, 9:16; default: 16:9 |
| `--resolution_type string` | required; supported values by model: 4.0/4.1/4.5/4.6/4.7/5.0 -> 2k or 4k; 5.0Pro -> 1.5k, 2k, or 4k |
| `--width int` | custom output width in pixels; requires --height; mutually exclusive with --ratio |
| `--height int` | custom output height in pixels; requires --width; mutually exclusive with --ratio |
| `--model_version string` | supported values: 4.0, 4.1, 4.5, 4.6, 4.7, 5.0, 5.0Pro; default: 5.0 |
| `--generate_num int` | number of images to generate; supported range: 1-10 (default 1) |
| `--poll int` | submit then poll query_result for up to N seconds at 1s intervals (0 disables polling) |
| `-h, --help` | help for image2image |
| `--version` | print build version information |

### `dreamina image2video`

Animate one image into video; use multiframe2video for multi-image stories

```
dreamina image2video [flags]
```

| Flag | 说明 |
|---|---|
| `--image string` | local first-frame image path |
| `--prompt string` | generation prompt |
| `--duration int` | video duration in seconds; supported ranges by model: seedance1.0fast -> 5-10, seedance1.5pro -> 5-12, seedance2.0 family/seedance2.0mini -> 4-15, seedance2.5 -> 4-30 (default 5) |
| `--video_resolution string` | required; supported values by model: seedance2.5 -> 480p, 720p, or 1080p; seedance2.0_vip -> 720p, 1080p, or 4k; all other models -> 720p |
| `--model_version string` | supported values: seedance1.0fast, seedance1.5pro, seedance2.0, seedance2.0fast, seedance2.0_vip, seedance2.0fast_vip, seedance2.0mini, seedance2.5 |
| `--session int` | session id (default 0 "默认对话") |
| `--poll int` | submit then poll query_result for up to N seconds at 1s intervals (0 disables polling) |
| `-h, --help` | help for image2video |
| `--version` | print build version information |

### `dreamina list_task`

List saved tasks with status and result summary

```
dreamina list_task [flags]
```

| Flag | 说明 |
|---|---|
| `--gen_status string` | filter by gen_status |
| `--gen_task_type string` | filter by gen_task_type |
| `-h, --help` | help for list_task |
| `--limit int` | max number of tasks to return (default 20) |
| `--offset int` | offset for pagination |
| `--submit_id string` | filter by submit_id |
| `--version` | print build version information |

### `dreamina login`

Log in locally with OAuth Device Flow before using task and account commands

```
dreamina login [flags]
```

| Flag | 说明 |
|---|---|
| `--headless` | print OAuth authorization material and exit without polling checklogin |
| `-h, --help` | help for login |
| `--version` | print build version information |

### `dreamina logout`

Clear the local OAuth login state

```
dreamina logout [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for logout |
| `--version` | print build version information |

### `dreamina multiframe2video`

Create a coherent video story from multiple images

```
dreamina multiframe2video [flags]
```

| Flag | 说明 |
|---|---|
| `--images strings` | local reference image paths |
| `--prompt string` | shorthand prompt for exactly 2 images |
| `--duration float` | shorthand transition duration in seconds for exactly 2 images; supported range: 1-8; total duration must be >= 2 (default 3) |
| `--video_resolution string` | required; supported values: 720p, 1080p |
| `--transition-prompt stringArray` | repeat once per transition segment; for N images provide N-1 prompts |
| `--transition-duration stringArray` | repeat once per transition segment in seconds; supported range: 1-8; for N images provide N-1 durations, or omit to default each segment to 3 |
| `--session int` | session id (default 0 "默认对话") |
| `--poll int` | submit then poll query_result for up to N seconds at 1s intervals (0 disables polling) |
| `-h, --help` | help for multiframe2video |
| `--version` | print build version information |

### `dreamina multimodal2video`

Dreamina flagship video mode (全能参考 / formerly ref2video) with all-around references and Seedance

```
dreamina multimodal2video [flags]
```

| Flag | 说明 |
|---|---|
| `--image stringArray` | repeat for each local input image path |
| `--video stringArray` | repeat for each local input video path |
| `--audio stringArray` | repeat for each local input audio path |
| `--prompt string` | optional multimodal edit prompt |
| `--duration int` | video duration in seconds; supported ranges by model: seedance2.5 -> 4-30; all other models -> 4-15 (default 5) |
| `--ratio string` | supported values: 1:1, 3:4, 16:9, 4:3, 9:16, 21:9 |
| `--video_resolution string` | required; supported values by model: seedance2.5 -> 480p, 720p, or 1080p; seedance2.0_vip -> 720p, 1080p, or 4k; all other models -> 720p |
| `--model_version string` | supported values: seedance2.0, seedance2.0fast, seedance2.0_vip, seedance2.0fast_vip, seedance2.0mini, seedance2.5 |
| `--session int` | session id (default 0 "默认对话") |
| `--poll int` | submit then poll query_result for up to N seconds at 1s intervals (0 disables polling) |
| `-h, --help` | help for multimodal2video |
| `--version` | print build version information |

### `dreamina query_result`

Query the current result of an async generation task

```
dreamina query_result [flags]
```

| Flag | 说明 |
|---|---|
| `--download_dir string` | download result media into the target directory |
| `-h, --help` | help for query_result |
| `--submit_id string` | task submit_id |
| `--version` | print build version information |

### `dreamina relogin`

Clear the local OAuth login state and force a fresh OAuth login

```
dreamina relogin [flags]
```

| Flag | 说明 |
|---|---|
| `--headless` | print OAuth authorization material and exit without polling checklogin |
| `-h, --help` | help for relogin |
| `--version` | print build version information |

### `dreamina session`

Manage sessions (create/list/search/rename/delete)

```
dreamina session [flags]
```

**子命令**：`create` · `list` · `search` · `rename` · `delete`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for session |
| `--version` | print build version information |

### `dreamina session create`

Create a new session (auto-named or custom)

```
dreamina session create [name] [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for create |
| `--version` | print build version information |

### `dreamina session delete`

Delete a session (alias: rm)

```
dreamina session delete <session_id> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for delete |
| `--version` | print build version information |

### `dreamina session list`

List your recent sessions (alias: ls)

```
dreamina session list [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for list |
| `-n, --max-count int` | maximum number of sessions to display (default 30) |
| `--version` | print build version information |

### `dreamina session rename`

Change a session's name (alias: update)

```
dreamina session rename <session_id> <new_name> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for rename |
| `--version` | print build version information |

### `dreamina session search`

Find a session ID by its name (alias: find)

```
dreamina session search <name> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for search |
| `--version` | print build version information |

### `dreamina text2image`

Submit a Dreamina text-to-image task

```
dreamina text2image [flags]
```

| Flag | 说明 |
|---|---|
| `--prompt string` | generation prompt |
| `--session int` | session id (default 0 "默认对话") |
| `--ratio string` | supported values: 21:9, 16:9, 3:2, 4:3, 1:1, 3:4, 2:3, 9:16; default: 16:9 |
| `--resolution_type string` | required; supported values by model: 3.0/3.1 -> 1k or 2k; 4.0/4.1/4.5/4.6/4.7/5.0 -> 2k or 4k; 5.0Pro -> 1.5k, 2k, or 4k |
| `--width int` | custom output width in pixels; requires --height; mutually exclusive with --ratio |
| `--height int` | custom output height in pixels; requires --width; mutually exclusive with --ratio |
| `--model_version string` | supported values: 3.0, 3.1, 4.0, 4.1, 4.5, 4.6, 4.7, 5.0, 5.0Pro; default: 5.0 |
| `--generate_num int` | number of images to generate; supported range: 1-10 (default 1) |
| `--poll int` | submit then poll query_result for up to N seconds at 1s intervals (0 disables polling) |
| `-h, --help` | help for text2image |
| `--version` | print build version information |

### `dreamina text2video`

Submit a Dreamina text-to-video task

```
dreamina text2video [flags]
```

| Flag | 说明 |
|---|---|
| `--prompt string` | generation prompt |
| `--session int` | session id (default 0 "默认对话") |
| `--duration int` | video duration in seconds; supported ranges by model: seedance2.5 -> 4-30; all other models -> 4-15 (default 5) |
| `--ratio string` | supported values: 1:1, 3:4, 16:9, 4:3, 9:16, 21:9 |
| `--video_resolution string` | required; supported values by model: seedance2.5 -> 480p, 720p, or 1080p; seedance2.0_vip -> 720p, 1080p, or 4k; all other models -> 720p |
| `--model_version string` | supported values: seedance2.0, seedance2.0fast, seedance2.0_vip, seedance2.0fast_vip, seedance2.0mini, seedance2.5; default: seedance2.0fast |
| `--poll int` | submit then poll query_result for up to N seconds at 1s intervals (0 disables polling) |
| `-h, --help` | help for text2video |
| `--version` | print build version information |

### `dreamina user_credit`

Show the current user's remaining credit balance

```
dreamina user_credit [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for user_credit |
| `--version` | print build version information |

### `dreamina version`

Print build version and commit information

```
dreamina version [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for version |
| `--version` | print build version information |

## 官方 Agent 使用规则

> 摘自官方 SKILL.md：`~/.dreamina_cli/dreamina/SKILL.md`（留档于 `vendor/SKILL.md`）。这是厂商对 Agent 的约定，优先于一般经验。

**官方定位**：Use when an agent needs Dreamina（即梦） login, sessions, task history, or image/video generation through the dreamina CLI.

Use this skill when you need Dreamina（即梦） image or video generation, login, session management, or task history work through `dreamina`.

即梦 is the Chinese product name of Dreamina. If the user says 即梦, treat it as Dreamina and use this skill.

This skill is intentionally short. Detailed flags and supported values belong to the CLI itself, so always treat `dreamina -h` and `dreamina <subcommand> -h` as the primary reference.

### What this tool is for

`dreamina` is the local CLI entrypoint for all currently exposed Dreamina（即梦） image and video generation workflows, plus the account/session operations around them.

Use it for:

- checking or reusing an existing Dreamina login session
- checking account credit
- managing sessions with `dreamina session`
- clearing the local OAuth login state with `dreamina logout`
- submitting image generation tasks
- submitting video generation tasks
- querying async task results and downloading result media
- reviewing saved task history

### Default workflow

When using this CLI as an agent:

1. Start with `dreamina -h`.
2. Before using any command for real, run `dreamina <subcommand> -h`.
3. Reuse the current login state unless the user explicitly asks you to `login`, `relogin`, `logout`, or finish a headless login with `checklogin`.
4. When login is required, run `dreamina login` or `dreamina relogin`. The CLI uses OAuth Device Flow and prints `verification_uri`, `user_code`, and `device_code`.
5. Default login waits for authorization to complete. With `--headless`, the CLI prints the device-flow material and exits; then use `dreamina login checklogin --device_code=<device_code>` to finish the login later.
6. Be explicit about whether you are only reading help, submitting a real task, or querying an existing task.
7. Warn the user before running commands that may consume credits.

### Login completion: mandatory user-visible confirmation

`dreamina login` / `dreamina relogin` prints OAuth Device Flow instructions and then waits for authorization. When the command finishes successfully, tell the user explicitly that login succeeded or the local OAuth state was reused.

- **Do not** wait for the user to ask “登录好了吗”.
- **Do not** stop after only sending the device code: keep the login command running, read stdout to the end, then confirm success/reuse/failure.
- **Failure** must still be reported with the concrete error and the next step.

### Choosing the right command

At a high level:

- Use `user_credit` to check budget.
- Use `session` to create, list, search, rename, or delete sessions; all generator commands accept `--session=<id>` and `0` is the default session.
- Use `query_result` when you already have a `submit_id`; add `--download_dir` when you want the generated media saved locally.
- Use `list_task` to review recent saved tasks, especially when you want to filter by status or task type.
- Use `text2image` for prompt-only image generation, `image2image` for image-guided editing, and `image_upscale` for upscaling.
- Use `text2video` for prompt-only video generation.
- Use `image2video` when one main image is enough.
- Use `frames2video` for first-and-last-frame driven video generation.
- Use `multiframe2video` for Dreamina's fixed-model, image-only intelligent multi-frame flow: multiple images in, one coherent story video out. This command does not expose model selection.
- Use `multimodal2video` for Dreamina's flagship video mode when the task needs all-around references across images, video, and audio, or when a Seedance 2.5 multi-image request needs model selection. If the legacy name `ref2video` appears, trust `dreamina -h` for the current command surface.

For the exact flags and supported combinations, rely on each subcommand's `-h`.

### Model selection rule

Do not hardcode model support from this skill.

If the user specifies a model, always check the relevant subcommand help before running it:

```bash
dreamina <subcommand> -h
```

Use the subcommand help to confirm:

- whether that command exposes model selection
- whether the requested model is supported on that command
- what other constraints apply to that model, such as duration, ratio, resolution, or whether the command supports `model_version` at all

Additional guidance:

- some commands do not expose model selection at all
- runtime availability and queue capacity can change
- if the user does not specify a model, preserve the subcommand's current default instead of overriding it
- if the user expresses a speed or quality preference, inspect the current help and select a model only when that preference requires an explicit choice

### How to judge submit acceptance and terminal success

Do not rely on shell exit code alone.

For async generation commands, `submit_id` plus `gen_status=querying` means only that the submission was accepted. It is not evidence that generation finished successfully.

Treat the task as terminally successful only when `gen_status=success`. If `gen_status=fail`, inspect `fail_reason` and reply proactively with the concrete reason.

Use `--poll=N` on a generation command to wait for up to N seconds for a terminal result. If the command still returns `querying` after that bounded wait:

- save the `submit_id`
- continue with `query_result --submit_id=<id>` until the task reaches `success` or `fail`

### Follow-up pattern for async tasks

After a submit returns `querying` without reaching a terminal result during `--poll=N`:

1. Save the `submit_id`.
2. Use `query_result --submit_id=<id>` for follow-up.
3. Use `list_task` when you want to review saved tasks in bulk.

If you are running a test sweep, keep results in a machine-readable format so you can query the returned `submit_id` values later.

### Important user-facing rules

- Some generation commands are asynchronous; submit and query are separate steps.
- Some models may require a one-time authorization on Dreamina Web.
  If the CLI returns `AigcComplianceConfirmationRequired`, reply proactively: ask them to complete that web-side confirmation first, then retry.
- Do not assume that different commands support the same models, ratios, durations, or resolutions.
  Check each subcommand's `-h` before use.

### Good agent behavior

- Relay OAuth Device Flow instructions exactly enough for the user to complete login.
- Always close the loop when the login command finishes with a user-visible confirmation.
- Prefer small, reviewable batches when running real generation tasks.
- Keep a record of the command, arguments, `submit_id`, and final status for every paid test you run.
- If you are preparing a report, separate:
  - help-only inspection
  - submit-stage validation
  - later async result follow-up
