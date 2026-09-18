---
name: tencentads
kind: cli
command: tencentads
version: 1.1.5
title: 腾讯广告 CLI
license: MIT
repo: https://www.npmjs.com/package/tencentads-cli
scanned_at: 2026-09-18 06:27:41
source: release-bin + help-tree
nodes: 11
---

# 腾讯广告 CLI（`tencentads`）— 能力快照

> 腾讯广告（腾讯营销）API CLI：登录鉴权与状态查询，其余能力按营销 API v3.0 的资源名暴露——账号与管家、营销单元、创意与组件、素材、报表与人群等

## 怎么用这份文档

- 这是由 `tencentads --help` 递归提取的能力快照；覆盖范围受扫描深度、节点上限及 help 输出限制，不保证包含全部接口。
- 需要二级细节时，直接查本文档对应小节；如需最新参数，跑 `<命令路径> --help`。
- 用法：先在下表定位子命令，再按该小节的 usage 与 flag 拼命令。

## 概览

| 项 | 值 |
|---|---|
| 可执行文件 | `tencentads` |
| 版本 | `1.1.5` |
| 仓库 | https://www.npmjs.com/package/tencentads-cli |
| 许可证 | MIT |
| 采集方式 | 官方 release 二进制（`--help` 递归） |
| 本轮抓取命令数 | 11（顶层 1） |
| 抓取时间 | 2026-09-18 06:27:41 |
| 原始 help 留档 | `raw/` |

## 安装

```bash
npm install -g tencentads-cli
```

## 顶层用法

```
tencentads [flags] tencentads [command]
```

## 顶层选项

| Flag | 说明 |
|---|---|
| `--config-dir string` | Directory for credentials file (default: ~/.tencent-ads) |
| `--edition string` | Edition to use with --list-commands (default: build-time edition "default") |
| `-h, --help` | help for tencentads |
| `--list-commands` | Print command tree for the given edition and exit |
| `-v, --version` | version for tencentads |

## 命令树

| 命令 | 说明 / 用法概要 |
|---|---|
| `tencentads auth` | Manage authentication |
| `tencentads auth login` | &nbsp;&nbsp;&nbsp;&nbsp;Authenticate with Tencent Ads |
| `tencentads auth logout` | &nbsp;&nbsp;&nbsp;&nbsp;Log out and disable the current API key |
| `tencentads auth status` | &nbsp;&nbsp;&nbsp;&nbsp;Show current authentication status |
| `tencentads completion` | Generate the autocompletion script for the specified shell |
| `tencentads completion bash` | &nbsp;&nbsp;&nbsp;&nbsp;Generate the autocompletion script for bash |
| `tencentads completion fish` | &nbsp;&nbsp;&nbsp;&nbsp;Generate the autocompletion script for fish |
| `tencentads completion powershell` | &nbsp;&nbsp;&nbsp;&nbsp;Generate the autocompletion script for powershell |
| `tencentads completion zsh` | &nbsp;&nbsp;&nbsp;&nbsp;Generate the autocompletion script for zsh |
| `tencentads help` | Help about any command |

## 逐命令详情

### `tencentads auth`

Manage authentication

```
tencentads auth [command]
```

**子命令**：`login` · `logout` · `status`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for auth |
| `--config-dir string` | Directory for credentials file (default: ~/.tencent-ads) |

### `tencentads auth login`

Authenticate with Tencent Ads

```
tencentads auth login [flags]
```

| Flag | 说明 |
|---|---|
| `--api-key string` | API key to save directly (skips browser OAuth) |
| `--description string` | Key description (defaults to hostname) |
| `-h, --help` | help for login |
| `--config-dir string` | Directory for credentials file (default: ~/.tencent-ads) |

### `tencentads auth logout`

Log out and disable the current API key

```
tencentads auth logout [flags]
```

| Flag | 说明 |
|---|---|
| `--force` | Clear local credentials even if the server-side disable fails |
| `-h, --help` | help for logout |
| `--config-dir string` | Directory for credentials file (default: ~/.tencent-ads) |

### `tencentads auth status`

Show current authentication status

```
tencentads auth status [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for status |
| `--config-dir string` | Directory for credentials file (default: ~/.tencent-ads) |

### `tencentads completion`

Generate the autocompletion script for the specified shell

```
tencentads completion [command]
```

**子命令**：`bash` · `fish` · `powershell` · `zsh`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for completion |
| `--config-dir string` | Directory for credentials file (default: ~/.tencent-ads) |

### `tencentads completion bash`

Generate the autocompletion script for bash

```
tencentads completion bash
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for bash |
| `--no-descriptions` | disable completion descriptions |
| `--config-dir string` | Directory for credentials file (default: ~/.tencent-ads) |

### `tencentads completion fish`

Generate the autocompletion script for fish

```
tencentads completion fish [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for fish |
| `--no-descriptions` | disable completion descriptions |
| `--config-dir string` | Directory for credentials file (default: ~/.tencent-ads) |

### `tencentads completion powershell`

Generate the autocompletion script for powershell

```
tencentads completion powershell [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for powershell |
| `--no-descriptions` | disable completion descriptions |
| `--config-dir string` | Directory for credentials file (default: ~/.tencent-ads) |

### `tencentads completion zsh`

Generate the autocompletion script for zsh

```
tencentads completion zsh [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for zsh |
| `--no-descriptions` | disable completion descriptions |
| `--config-dir string` | Directory for credentials file (default: ~/.tencent-ads) |

### `tencentads help`

Help about any command

```
tencentads help [command] [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for help |
| `--config-dir string` | Directory for credentials file (default: ~/.tencent-ads) |
