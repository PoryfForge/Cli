---
name: 1password-cli
kind: cli
command: op
version: 2.39.0
title: 1Password CLI
license: 厂商专有
repo: https://app-updates.agilebits.com/product_history/CLI2
scanned_at: 2026-09-18 06:38:25
source: release-bin + help-tree
nodes: 68
---

# 1Password CLI（`op`）— 能力快照

> 1Password 官方 CLI：凭据保险库与条目的读写、op run / op inject 把密钥以环境变量或文件形式注入进程，另含 service account、SSH 代理与文档（Document）管理

## 怎么用这份文档

- 这是由 `op --help` 递归提取的能力快照；覆盖范围受扫描深度、节点上限及 help 输出限制，不保证包含全部接口。
- 需要二级细节时，直接查本文档对应小节；如需最新参数，跑 `<命令路径> --help`。
- 用法：先在下表定位子命令，再按该小节的 usage 与 flag 拼命令。

## 概览

| 项 | 值 |
|---|---|
| 可执行文件 | `op` |
| 版本 | `2.39.0` |
| 仓库 | https://app-updates.agilebits.com/product_history/CLI2 |
| 许可证 | 厂商专有 |
| 采集方式 | 官方 release 二进制（`--help` 递归） |
| 本轮抓取命令数 | 68（顶层 1） |
| 抓取时间 | 2026-09-18 06:38:25 |
| 原始 help 留档 | `raw/` |

## 安装

```bash
brew install 1password-cli
```

## 顶层用法

```
op [command] [flags]
```

## 顶层选项

| Flag | 说明 |
|---|---|
| `--account account` | Select the account to execute the command by account shorthand, sign-in address, account ID, or user ID. For a list |
| `--cache` | Store and use cached information. Caching is enabled by default on UNIX-like systems. Caching is not available on |
| `--config directory` | Use this configuration directory. |
| `--debug` | Enable debug mode. Can also be enabled by setting the OP_DEBUG environment variable to true. |
| `--encoding type` | Use this character encoding type. Default: UTF-8. Supported: SHIFT_JIS, gbk. |
| `--format string` | Use this output format. Can be 'human-readable' or 'json'. Can be set as the OP_FORMAT environment variable. |
| `-h, --help` | Get help for op. |
| `--iso-timestamps` | Format timestamps according to ISO 8601 / RFC 3339. Can be set as the OP_ISO_TIMESTAMPS environment variable. |
| `--no-color` | Print output without color. |
| `--session token` | Authenticate with this session token. 1Password CLI outputs session tokens for successful 'op signin' commands when |
| `-v, --version` | version for op |

## 命令树

| 命令 | 说明 / 用法概要 |
|---|---|
| `op account` | Manage your locally configured 1Password accounts |
| `op account add` | &nbsp;&nbsp;&nbsp;&nbsp;Add an account to sign in to for the first time |
| `op account forget` | &nbsp;&nbsp;&nbsp;&nbsp;Remove a 1Password account from this device |
| `op account get` | &nbsp;&nbsp;&nbsp;&nbsp;Get details about your account |
| `op account list` | &nbsp;&nbsp;&nbsp;&nbsp;List users and accounts set up on this device |
| `op completion` | Generate shell completion information |
| `op connect` | Manage Connect server instances and tokens in your 1Password account |
| `op connect group` | &nbsp;&nbsp;&nbsp;&nbsp;Manage group access to Secrets Automation |
| `op connect server` | &nbsp;&nbsp;&nbsp;&nbsp;Manage Connect servers |
| `op connect token` | &nbsp;&nbsp;&nbsp;&nbsp;Manage Connect server tokens |
| `op connect vault` | &nbsp;&nbsp;&nbsp;&nbsp;Manage Connect server vault access |
| `op document` | Perform CRUD operations on Document items in your vaults |
| `op document create` | &nbsp;&nbsp;&nbsp;&nbsp;Create a document item |
| `op document delete` | &nbsp;&nbsp;&nbsp;&nbsp;Delete or archive a document item |
| `op document edit` | &nbsp;&nbsp;&nbsp;&nbsp;Edit a document item |
| `op document get` | &nbsp;&nbsp;&nbsp;&nbsp;Download a document |
| `op document list` | &nbsp;&nbsp;&nbsp;&nbsp;Get a list of documents |
| `op events-api` | Manage Events API integrations in your 1Password account |
| `op events-api create` | &nbsp;&nbsp;&nbsp;&nbsp;Set up an integration with the Events API |
| `op group` | Manage the groups in your 1Password account |
| `op group create` | &nbsp;&nbsp;&nbsp;&nbsp;Create a group |
| `op group delete` | &nbsp;&nbsp;&nbsp;&nbsp;Remove a group |
| `op group edit` | &nbsp;&nbsp;&nbsp;&nbsp;Edit a group's name or description |
| `op group get` | &nbsp;&nbsp;&nbsp;&nbsp;Get details about a group |
| `op group list` | &nbsp;&nbsp;&nbsp;&nbsp;List groups |
| `op group user` | &nbsp;&nbsp;&nbsp;&nbsp;Manage group membership |
| `op inject` | Inject secrets into a config file |
| `op item` | Perform CRUD operations on the 1Password items in your vaults |
| `op item create` | &nbsp;&nbsp;&nbsp;&nbsp;Create an item |
| `op item delete` | &nbsp;&nbsp;&nbsp;&nbsp;Delete or archive an item |
| `op item edit` | &nbsp;&nbsp;&nbsp;&nbsp;Edit an item's details |
| `op item get` | &nbsp;&nbsp;&nbsp;&nbsp;Get an item's details |
| `op item list` | &nbsp;&nbsp;&nbsp;&nbsp;List items |
| `op item move` | &nbsp;&nbsp;&nbsp;&nbsp;Move an item between vaults |
| `op item share` | &nbsp;&nbsp;&nbsp;&nbsp;Share an item |
| `op item template` | &nbsp;&nbsp;&nbsp;&nbsp;Manage templates |
| `op plugin` | Manage the shell plugins you use to authenticate third-party CLIs |
| `op plugin clear` | &nbsp;&nbsp;&nbsp;&nbsp;Clear shell plugin configuration |
| `op plugin credential` | &nbsp;&nbsp;&nbsp;&nbsp;Manage credentials for shell plugins |
| `op plugin init` | &nbsp;&nbsp;&nbsp;&nbsp;Configure a shell plugin |
| `op plugin inspect` | &nbsp;&nbsp;&nbsp;&nbsp;Inspect your existing shell plugin configurations |
| `op plugin list` | &nbsp;&nbsp;&nbsp;&nbsp;List all available shell plugins |
| `op plugin run` | &nbsp;&nbsp;&nbsp;&nbsp;Provision credentials from 1Password and run this command |
| `op read` | Read a secret reference |
| `op run` | Pass secrets as environment variables to a process |
| `op signin` | Sign in to a 1Password account |
| `op signout` | Sign out of a 1Password account |
| `op update` | Check for and download updates. |
| `op user` | Manage users within this 1Password account |
| `op user confirm` | &nbsp;&nbsp;&nbsp;&nbsp;Confirm a user |
| `op user delete` | &nbsp;&nbsp;&nbsp;&nbsp;Remove a user and all their data from the account |
| `op user edit` | &nbsp;&nbsp;&nbsp;&nbsp;Edit a user's name or Travel Mode status |
| `op user get` | &nbsp;&nbsp;&nbsp;&nbsp;Get details about a user |
| `op user list` | &nbsp;&nbsp;&nbsp;&nbsp;List users |
| `op user provision` | &nbsp;&nbsp;&nbsp;&nbsp;Provision a user in the authenticated account |
| `op user reactivate` | &nbsp;&nbsp;&nbsp;&nbsp;Reactivate a suspended user |
| `op user recovery` | &nbsp;&nbsp;&nbsp;&nbsp;Manage user recovery in your 1Password account |
| `op user suspend` | &nbsp;&nbsp;&nbsp;&nbsp;Suspend a user |
| `op vault` | Manage permissions and perform CRUD operations on your 1Password vaults |
| `op vault create` | &nbsp;&nbsp;&nbsp;&nbsp;Create a new vault |
| `op vault delete` | &nbsp;&nbsp;&nbsp;&nbsp;Remove a vault |
| `op vault edit` | &nbsp;&nbsp;&nbsp;&nbsp;Edit a vault's name, description, icon, or Travel Mode status |
| `op vault get` | &nbsp;&nbsp;&nbsp;&nbsp;Get details about a vault |
| `op vault group` | &nbsp;&nbsp;&nbsp;&nbsp;Manage group vault access |
| `op vault list` | &nbsp;&nbsp;&nbsp;&nbsp;List all vaults in the account |
| `op vault user` | &nbsp;&nbsp;&nbsp;&nbsp;Manage user vault access |
| `op whoami` | Get information about a signed-in account |

## 逐命令详情

### `op account`

Manage your locally configured 1Password accounts

```
op account [command] [flags]
```

**子命令**：`add` · `get` · `list` · `forget`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for account |

### `op account add`

Add an account to sign in to for the first time

```
op account add [flags]
```

| Flag | 说明 |
|---|---|
| `--address string` | The sign-in address for your account. |
| `--email string` | The email address associated with your account. |
| `-h, --help` | help for add |
| `--raw` | Only return the session token. |
| `--shorthand string` | Set a custom account shorthand for your account. |
| `--signin` | Immediately sign in to the added account. |

### `op account forget`

Remove a 1Password account from this device

```
op account forget [ <account> ] [flags]
```

| Flag | 说明 |
|---|---|
| `--all` | Forget all authenticated accounts. |
| `-h, --help` | help for forget |

### `op account get`

Get details about your account

```
op account get [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for get |

### `op account list`

List users and accounts set up on this device

```
op account list [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for list |

### `op completion`

Generate shell completion information

```
op completion <shell> [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for completion |

### `op connect`

Manage Connect server instances and tokens in your 1Password account

```
op connect [command] [flags]
```

**子命令**：`group` · `server` · `token` · `vault`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for connect |

### `op connect group`

Manage group access to Secrets Automation

```
op connect group [command] [flags]
```

**子命令**：`grant` · `revoke`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for group |

### `op connect server`

Manage Connect servers

```
op connect server [command] [flags]
```

**子命令**：`create` · `get` · `edit` · `delete` · `list`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for server |

### `op connect token`

Manage Connect server tokens

```
op connect token [command] [flags]
```

**子命令**：`create` · `edit` · `delete` · `list`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for token |

### `op connect vault`

Manage Connect server vault access

```
op connect vault [command] [flags]
```

**子命令**：`grant` · `revoke`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for vault |

### `op document`

Perform CRUD operations on Document items in your vaults

```
op document [command] [flags]
```

**子命令**：`create` · `get` · `edit` · `delete` · `list`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for document |

### `op document create`

Create a document item

```
op document create [{ <file> | - }] [flags]
```

| Flag | 说明 |
|---|---|
| `--file-name name` | Set the file's name. |
| `-h, --help` | help for create |
| `--tags tags` | Set the tags to the specified (comma-separated) values. |
| `--title title` | Set the document item's title. |
| `--vault vault` | Save the document in this vault. Default: Private, Personal, or Employee, depending on your account type. |

### `op document delete`

Delete or archive a document item

```
op document delete [{ <itemName> | <itemID> | - }] [flags]
```

| Flag | 说明 |
|---|---|
| `--archive` | Move the document to the Archive. |
| `-h, --help` | help for delete |
| `--vault vault` | Delete the document in this vault. |

### `op document edit`

Edit a document item

```
op document edit { <itemName> | <itemID> } [{ <file> | - }] [flags]
```

| Flag | 说明 |
|---|---|
| `--file-name name` | Set the file's name. |
| `-h, --help` | help for edit |
| `--tags tags` | Set the tags to the specified (comma-separated) values. An empty value removes all tags. |
| `--title title` | Set the document item's title. |
| `--vault vault` | Look up document in this vault. |

### `op document get`

Download a document

```
op document get { <itemName> | <itemID> } [flags]
```

| Flag | 说明 |
|---|---|
| `--file-mode filemode` | Set filemode for the output file. It is ignored without the --out-file flag. (default 0600) |
| `--force` | Forcibly print an unintelligible document to an interactive terminal. If --out-file is specified, save the |
| `-h, --help` | help for get |
| `--include-archive` | Include document items in the Archive. Can also be set using OP_INCLUDE_ARCHIVE environment variable. |
| `-o, --out-file path` | Save the document to the file path instead of stdout. |
| `--vault vault` | Look for the document in this vault. |

### `op document list`

Get a list of documents

```
op document list [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for list |
| `--include-archive` | Include document items in the Archive. Can also be set using OP_INCLUDE_ARCHIVE environment variable. |
| `--vault vault` | Only list documents in this vault. |

### `op events-api`

Manage Events API integrations in your 1Password account

```
op events-api [command] [flags]
```

**子命令**：`create`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for events-api |

### `op events-api create`

Set up an integration with the Events API

```
op events-api create <name> [flags]
```

| Flag | 说明 |
|---|---|
| `--expires-in duration` | Set how the long the events-api token is valid for in (s)econds, (m)inutes, (h)ours, (d)ays, and/or (w)eeks. |
| `--features features` | Set the comma-separated list of features the integration token can be used for. Options: 'signinattempts', |
| `-h, --help` | help for create |

### `op group`

Manage the groups in your 1Password account

```
op group [command] [flags]
```

**子命令**：`user` · `create` · `get` · `edit` · `delete` · `list`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for group |

### `op group create`

Create a group

```
op group create <name> [flags]
```

| Flag | 说明 |
|---|---|
| `--description string` | Set the group's description. |
| `-h, --help` | help for create |

### `op group delete`

Remove a group

```
op group delete [{ <groupName> | <groupID> | - }] [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for delete |

### `op group edit`

Edit a group's name or description

```
op group edit [{ <groupName> | <groupID> | - }] [flags]
```

| Flag | 说明 |
|---|---|
| `--description description` | Change the group's description. |
| `-h, --help` | help for edit |
| `--name name` | Change the group's name. |

### `op group get`

Get details about a group

```
op group get [{ <groupName> | <groupID> | - }] [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for get |

### `op group list`

List groups

```
op group list [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for list |
| `--user user` | List groups that a user belongs to. |
| `--vault vault` | List groups that have direct access to a vault. |

### `op group user`

Manage group membership

```
op group user [command] [flags]
```

**子命令**：`grant` · `revoke` · `list`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for user |

### `op inject`

Inject secrets into a config file

```
op inject [flags]
```

| Flag | 说明 |
|---|---|
| `--file-mode filemode` | Set filemode for the output file. It is ignored without the --out-file flag. (default 0600) |
| `-f, --force` | Do not prompt for confirmation. |
| `-h, --help` | help for inject |
| `-i, --in-file string` | The filename of a template file to inject. |
| `-o, --out-file string` | Write the injected template to a file instead of stdout. |

### `op item`

Perform CRUD operations on the 1Password items in your vaults

```
op item [command] [flags]
```

**子命令**：`template` · `create` · `get` · `edit` · `delete` · `list` · `move` · `share`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for item |

### `op item create`

Create an item

```
op item create [ - ] [ <assignment>... ] [flags]
```

| Flag | 说明 |
|---|---|
| `--category category` | Set the item's category. |
| `--dry-run` | Test the command and output a preview of the resulting item. |
| `--favorite` | Add item to favorites. |
| `--generate-password[=recipe]` | Add a randomly-generated password to a Login or Password item. |
| `-h, --help` | help for create |
| `--reveal` | Don't conceal sensitive fields. |
| `--ssh-generate-key` | The type of SSH key to create: Ed25519 or RSA. For RSA, specify 2048, 3072, or 4096 (default) bits. |
| `--tags tags` | Set the tags to the specified (comma-separated) values. |
| `--template string` | Specify the file path to read an item template from. |
| `--title title` | Set the item's title. |
| `--url URL` | Set the URL associated with the item |
| `--vault vault` | Save the item in this vault. Default: Private, Personal, or Employee, depending on your account type. |

### `op item delete`

Delete or archive an item

```
op item delete [{ <itemName> | <itemID> | <shareLink> | - }] [flags]
```

| Flag | 说明 |
|---|---|
| `--archive` | Move the item to the Archive. |
| `-h, --help` | help for delete |
| `--vault string` | Look for the item in this vault. |

### `op item edit`

Edit an item's details

```
op item edit { <itemName> | <itemID> | <shareLink> } [ <assignment> ... ] [flags]
```

| Flag | 说明 |
|---|---|
| `--dry-run` | Perform a dry run of the command and output a preview of the resulting item. |
| `--favorite` | Whether this item is a favorite item. Options: true, false |
| `--generate-password[=recipe]` | Give the item a randomly generated password. |
| `-h, --help` | help for edit |
| `--reveal` | Don't conceal sensitive fields. |
| `--tags tags` | Set the tags to the specified (comma-separated) values. An empty value will remove all tags. |
| `--template string` | Specify the filepath to read an item template from. |
| `--title title` | Set the item's title. |
| `--url URL` | Set the URL associated with the item |
| `--vault vault` | Edit the item in this vault. |

### `op item get`

Get an item's details

```
op item get [{ <itemName> | <itemID> | <shareLink> | - }] [flags]
```

| Flag | 说明 |
|---|---|
| `--fields strings` | Return data from specific fields. Use 'label=' to get the field by name or 'type=' to filter fields by type. Specify |
| `-h, --help` | help for get |
| `--include-archive` | Include items in the Archive. Can also be set using OP_INCLUDE_ARCHIVE environment variable. |
| `--otp` | Output the primary one-time password for this item. |
| `--reveal` | Don't conceal sensitive fields. |
| `--share-link` | Get a shareable link for the item. |
| `--vault string` | Look for the item in this vault. |

### `op item list`

List items

```
op item list [flags]
```

| Flag | 说明 |
|---|---|
| `--categories categories` | Only list items in these categories (comma-separated). |
| `--favorite` | Only list favorite items |
| `-h, --help` | help for list |
| `--include-archive` | Include items in the Archive. Can also be set using OP_INCLUDE_ARCHIVE environment variable. |
| `--long` | Output a more detailed item list. |
| `--tags tags` | Only list items with these tags (comma-separated). |
| `--vault vault` | Only list items in this vault. |

### `op item move`

Move an item between vaults

```
op item move [{ <itemName> | <itemID> | <shareLink> | - }] [flags]
```

| Flag | 说明 |
|---|---|
| `--current-vault string` | Vault where the item is currently saved. |
| `--destination-vault string` | The vault you want to move the item to. |
| `-h, --help` | help for move |
| `--reveal` | Don't conceal sensitive fields. |

### `op item share`

Share an item

```
op item share { <itemName> | <itemID> } [flags]
```

| Flag | 说明 |
|---|---|
| `--emails strings` | Email addresses to share with. |
| `--expires-in duration` | Expire link after the duration specified in (s)econds, (m)inutes, (h)ours, (d)ays, and/or (w)eeks. (default 7d) |
| `-h, --help` | help for share |
| `--vault string` | Look for the item in this vault. |
| `--view-once` | Expire link after a single view. |

### `op item template`

Manage templates

```
op item template [command] [flags]
```

**子命令**：`get` · `list`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for template |

### `op plugin`

Manage the shell plugins you use to authenticate third-party CLIs

```
op plugin [command] [flags]
```

**子命令**：`credential` · `list` · `clear` · `init` · `inspect` · `run`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for plugin |

### `op plugin clear`

Clear shell plugin configuration

```
op plugin clear <plugin-name> [flags]
```

| Flag | 说明 |
|---|---|
| `--all` | Clear all configurations for this plugin that apply to this directory and/or terminal session, including the global default. |
| `-f, --force` | Apply immediately without asking for confirmation. |
| `-h, --help` | help for clear |

### `op plugin credential`

Manage credentials for shell plugins

```
op plugin credential [command] [flags]
```

**子命令**：`import`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for credential |

### `op plugin init`

Configure a shell plugin

```
op plugin init [ <plugin-executable> ] [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for init |

### `op plugin inspect`

Inspect your existing shell plugin configurations

```
op plugin inspect [ <plugin-name> ] [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for inspect |

### `op plugin list`

List all available shell plugins

```
op plugin list [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for list |

### `op plugin run`

Provision credentials from 1Password and run this command

```
op plugin run <command>... [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for run |

### `op read`

Read a secret reference

```
op read <reference> [flags]
```

| Flag | 说明 |
|---|---|
| `--file-mode filemode` | Set filemode for the output file. It is ignored without the --out-file flag. (default 0600) |
| `-f, --force` | Do not prompt for confirmation. |
| `-h, --help` | help for read |
| `-n, --no-newline` | Do not print a new line after the secret. |
| `-o, --out-file string` | Write the secret to a file instead of stdout. |

### `op run`

Pass secrets as environment variables to a process

```
op run -- <command> <command>... [flags]
```

| Flag | 说明 |
|---|---|
| `--env-file stringArray` | Enable Dotenv integration with specific Dotenv files to parse. For example: --env-file=.env. |
| `-h, --help` | help for run |
| `--no-masking` | Disable masking of secrets on stdout and stderr. |

### `op signin`

Sign in to a 1Password account

```
op signin [flags]
```

| Flag | 说明 |
|---|---|
| `-f, --force` | Ignore warnings and print raw output from this command. |
| `-h, --help` | help for signin |
| `--raw` | Only return the session token. |

### `op signout`

Sign out of a 1Password account

```
op signout [flags]
```

| Flag | 说明 |
|---|---|
| `--all` | Sign out of all signed-in accounts. |
| `--forget` | Remove the details for a 1Password account from this device. |
| `-h, --help` | help for signout |

### `op update`

Check for and download updates.

```
op update [flags]
```

| Flag | 说明 |
|---|---|
| `--channel string` | Look for updates from a specific channel. allowed: stable, beta |
| `--directory string` | Download the update to this ''path''. |
| `-h, --help` | help for update |

### `op user`

Manage users within this 1Password account

```
op user [command] [flags]
```

**子命令**：`recovery` · `provision` · `confirm` · `get` · `edit` · `suspend` · `reactivate` · `delete` · `list`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for user |

### `op user confirm`

Confirm a user

```
op user confirm [{ <email> | <name> | <userID> | - }] [flags]
```

| Flag | 说明 |
|---|---|
| `--all` | Confirm all unconfirmed users. |
| `-h, --help` | help for confirm |

### `op user delete`

Remove a user and all their data from the account

```
op user delete [{ <email> | <name> | <userID> | - }] [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for delete |

### `op user edit`

Edit a user's name or Travel Mode status

```
op user edit [{ <email> | <name> | <userID> | - }] [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for edit |
| `--name string` | Set the user's name. |

### `op user get`

Get details about a user

```
op user get [{ <email> | <name> | <userID> | --me | - }] [flags]
```

| Flag | 说明 |
|---|---|
| `--fingerprint` | Get the user's public key fingerprint. |
| `-h, --help` | help for get |
| `--me` | Get the authenticated user's details. |
| `--public-key` | Get the user's public key. |

### `op user list`

List users

```
op user list [flags]
```

| Flag | 说明 |
|---|---|
| `--group group` | List users who belong to a group. |
| `-h, --help` | help for list |
| `--vault vault` | List users who have direct access to vault. |

### `op user provision`

Provision a user in the authenticated account

```
op user provision [flags]
```

| Flag | 说明 |
|---|---|
| `--email string` | Provide the user's email address. |
| `-h, --help` | help for provision |
| `--language string` | Provide the user's account language. (default "en") |
| `--name string` | Provide the user's name. |

### `op user reactivate`

Reactivate a suspended user

```
op user reactivate [{ <email> | <name> | <userID> | - }] [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for reactivate |

### `op user recovery`

Manage user recovery in your 1Password account

```
op user recovery [command] [flags]
```

**子命令**：`begin`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for recovery |

### `op user suspend`

Suspend a user

```
op user suspend [{ <email> | <name> | <userID> | - }] [flags]
```

| Flag | 说明 |
|---|---|
| `--deauthorize-devices-after duration` | Deauthorize the user's devices after a time (rounded down to seconds). |
| `-h, --help` | help for suspend |

### `op vault`

Manage permissions and perform CRUD operations on your 1Password vaults

```
op vault [command] [flags]
```

**子命令**：`group` · `user` · `create` · `get` · `edit` · `delete` · `list`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for vault |

### `op vault create`

Create a new vault

```
op vault create <name> [flags]
```

| Flag | 说明 |
|---|---|
| `--description description` | Set the group's description. |
| `-h, --help` | help for create |
| `--icon string` | Set the vault icon. |

### `op vault delete`

Remove a vault

```
op vault delete [{ <vaultName> | <vaultID> | - }] [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for delete |

### `op vault edit`

Edit a vault's name, description, icon, or Travel Mode status

```
op vault edit [{ <vaultName> | <vaultID> | - }] [flags]
```

| Flag | 说明 |
|---|---|
| `--description description` | Change the vault's description. |
| `-h, --help` | help for edit |
| `--icon icon` | Change the vault's icon. |
| `--name name` | Change the vault's name. |

### `op vault get`

Get details about a vault

```
op vault get [{ <vaultName> | <vaultID> | - }] [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for get |

### `op vault group`

Manage group vault access

```
op vault group [command] [flags]
```

**子命令**：`grant` · `revoke` · `list`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for group |

### `op vault list`

List all vaults in the account

```
op vault list [flags]
```

| Flag | 说明 |
|---|---|
| `--group string` | List vaults a group has access to. |
| `-h, --help` | help for list |
| `--permission permissions` | List only vaults that the specified user/group has this permission for. |
| `--user string` | List vaults that a given user has access to. |

### `op vault user`

Manage user vault access

```
op vault user [command] [flags]
```

**子命令**：`grant` · `revoke` · `list`

| Flag | 说明 |
|---|---|
| `-h, --help` | help for user |

### `op whoami`

Get information about a signed-in account

```
op whoami [flags]
```

| Flag | 说明 |
|---|---|
| `-h, --help` | help for whoami |
