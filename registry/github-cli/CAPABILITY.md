---
name: github-cli
kind: cli
command: gh
version: 2.101.0
title: GitHub CLI
license: MIT
repo: https://github.com/cli/cli
scanned_at: 2026-09-18 06:38:14
source: release-bin + help-tree + official-skill
nodes: 214
official_skill: vendor/SKILL.md
---

# GitHub CLI（`gh`）— 能力快照

> GitHub 官方 CLI：仓库 / Issue / PR / Actions 工作流 / release / 搜索 / gist / codespace / project 等协作能力，另含 gh api 直连 REST 与 GraphQL 的兜底入口

## 怎么用这份文档

- 这是由 `gh --help` 递归提取的能力快照；覆盖范围受扫描深度、节点上限及 help 输出限制，不保证包含全部接口。
- 需要二级细节时，直接查本文档对应小节；如需最新参数，跑 `<命令路径> --help`。
- 用法：先在下表定位子命令，再按该小节的 usage 与 flag 拼命令。
- **动手前先读文末「官方 Agent 使用规则」**：那是厂商写给 Agent 的判断标准（例如怎样才算任务成功、哪些操作要先警示用户），比 help 更权威。

## 概览

| 项 | 值 |
|---|---|
| 可执行文件 | `gh` |
| 版本 | `2.101.0` |
| 仓库 | https://github.com/cli/cli |
| 许可证 | MIT |
| 采集方式 | 官方 release 二进制（`--help` 递归）+ 官方 SKILL.md |
| 本轮抓取命令数 | 214（顶层 1） |
| 抓取时间 | 2026-09-18 06:38:14 |
| 原始 help 留档 | `raw/` |
| 官方 Agent 规则 | `vendor/SKILL.md`（已合并到文末） |

> **采集说明**：`gh` 的一部分子命令来自**本机安装的扩展**而非内置（最典型的是 `gh copilot`）。扩展装没装、版本不同，扫出来的树就会不一样，对照时以本机 `gh <命令> --help` 为准。

## 安装

```bash
brew install gh
```

## 顶层选项

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |
| `--version` | Show gh version |

## 命令树

| 命令 | 说明 / 用法概要 |
|---|---|
| `gh agent-task` | Work with agent tasks (preview) |
| `gh agent-task create` | &nbsp;&nbsp;&nbsp;&nbsp;Create an agent task (preview) |
| `gh agent-task list` | &nbsp;&nbsp;&nbsp;&nbsp;List agent tasks (preview) |
| `gh agent-task view` | &nbsp;&nbsp;&nbsp;&nbsp;View an agent task session (preview) |
| `gh alias` | Create command shortcuts |
| `gh alias delete` | &nbsp;&nbsp;&nbsp;&nbsp;Delete set aliases |
| `gh alias import` | &nbsp;&nbsp;&nbsp;&nbsp;Import aliases from a YAML file |
| `gh alias list` | &nbsp;&nbsp;&nbsp;&nbsp;List your aliases |
| `gh alias set` | &nbsp;&nbsp;&nbsp;&nbsp;Create a shortcut for a gh command |
| `gh api` | Make an authenticated GitHub API request |
| `gh attestation` | Work with artifact attestations |
| `gh attestation download` | &nbsp;&nbsp;&nbsp;&nbsp;Download an artifact's attestations for offline use |
| `gh attestation trusted-root` | &nbsp;&nbsp;&nbsp;&nbsp;Output trusted_root.jsonl contents, likely for offline verification |
| `gh attestation verify` | &nbsp;&nbsp;&nbsp;&nbsp;Verify an artifact's integrity using attestations |
| `gh auth` | Authenticate gh and git with GitHub |
| `gh auth login` | &nbsp;&nbsp;&nbsp;&nbsp;Log in to a GitHub account |
| `gh auth logout` | &nbsp;&nbsp;&nbsp;&nbsp;Log out of a GitHub account |
| `gh auth refresh` | &nbsp;&nbsp;&nbsp;&nbsp;Refresh stored authentication credentials |
| `gh auth setup-git` | &nbsp;&nbsp;&nbsp;&nbsp;Setup git with GitHub CLI |
| `gh auth status` | &nbsp;&nbsp;&nbsp;&nbsp;Display active account and authentication state on each known GitHub host |
| `gh auth switch` | &nbsp;&nbsp;&nbsp;&nbsp;Switch active GitHub account |
| `gh auth token` | &nbsp;&nbsp;&nbsp;&nbsp;Print the authentication token gh uses for a hostname and account |
| `gh browse` | Open repositories, issues, pull requests, and more in the browser |
| `gh cache` | Manage GitHub Actions caches |
| `gh cache delete` | &nbsp;&nbsp;&nbsp;&nbsp;Delete GitHub Actions caches |
| `gh cache list` | &nbsp;&nbsp;&nbsp;&nbsp;List GitHub Actions caches |
| `gh co` | Alias for "pr checkout" |
| `gh codespace` | Connect to and manage codespaces |
| `gh codespace code` | &nbsp;&nbsp;&nbsp;&nbsp;Open a codespace in Visual Studio Code |
| `gh codespace cp` | &nbsp;&nbsp;&nbsp;&nbsp;Copy files between local and remote file systems |
| `gh codespace create` | &nbsp;&nbsp;&nbsp;&nbsp;Create a codespace |
| `gh codespace delete` | &nbsp;&nbsp;&nbsp;&nbsp;Delete codespaces |
| `gh codespace edit` | &nbsp;&nbsp;&nbsp;&nbsp;Edit a codespace |
| `gh codespace jupyter` | &nbsp;&nbsp;&nbsp;&nbsp;Open a codespace in JupyterLab |
| `gh codespace list` | &nbsp;&nbsp;&nbsp;&nbsp;List codespaces |
| `gh codespace logs` | &nbsp;&nbsp;&nbsp;&nbsp;Access codespace logs |
| `gh codespace ports` | &nbsp;&nbsp;&nbsp;&nbsp;List ports in a codespace |
| `gh codespace rebuild` | &nbsp;&nbsp;&nbsp;&nbsp;Rebuild a codespace |
| `gh codespace ssh` | &nbsp;&nbsp;&nbsp;&nbsp;SSH into a codespace |
| `gh codespace stop` | &nbsp;&nbsp;&nbsp;&nbsp;Stop a running codespace |
| `gh codespace view` | &nbsp;&nbsp;&nbsp;&nbsp;View details about a codespace |
| `gh completion` | Generate shell completion scripts |
| `gh config` | Manage configuration for gh |
| `gh config clear-cache` | &nbsp;&nbsp;&nbsp;&nbsp;Clear the cli cache |
| `gh config get` | &nbsp;&nbsp;&nbsp;&nbsp;Print the value of a given configuration key |
| `gh config list` | &nbsp;&nbsp;&nbsp;&nbsp;Print a list of configuration keys and values |
| `gh config set` | &nbsp;&nbsp;&nbsp;&nbsp;Update configuration with a value for the given key |
| `gh copilot` | Run the GitHub Copilot CLI (preview) |
| `gh discussion` | Work with GitHub Discussions (preview) |
| `gh discussion comment` | &nbsp;&nbsp;&nbsp;&nbsp;Add, edit, or delete a comment or a reply on a discussion (preview) |
| `gh discussion create` | &nbsp;&nbsp;&nbsp;&nbsp;Create a new discussion (preview) |
| `gh discussion edit` | &nbsp;&nbsp;&nbsp;&nbsp;Edit a discussion (preview) |
| `gh discussion list` | &nbsp;&nbsp;&nbsp;&nbsp;List discussions in a repository (preview) |
| `gh discussion view` | &nbsp;&nbsp;&nbsp;&nbsp;View a discussion (preview) |
| `gh extension` | Manage gh extensions |
| `gh extension browse` | &nbsp;&nbsp;&nbsp;&nbsp;Enter a UI for browsing, adding, and removing extensions |
| `gh extension create` | &nbsp;&nbsp;&nbsp;&nbsp;Create a new extension |
| `gh extension install` | &nbsp;&nbsp;&nbsp;&nbsp;Install a gh extension from a repository |
| `gh extension list` | &nbsp;&nbsp;&nbsp;&nbsp;List installed extension commands |
| `gh extension remove` | &nbsp;&nbsp;&nbsp;&nbsp;Remove an installed extension |
| `gh extension search` | &nbsp;&nbsp;&nbsp;&nbsp;Search extensions to the GitHub CLI |
| `gh extension upgrade` | &nbsp;&nbsp;&nbsp;&nbsp;Upgrade installed extensions |
| `gh gist` | Manage gists |
| `gh gist clone` | &nbsp;&nbsp;&nbsp;&nbsp;Clone a gist locally |
| `gh gist create` | &nbsp;&nbsp;&nbsp;&nbsp;Create a new gist |
| `gh gist delete` | &nbsp;&nbsp;&nbsp;&nbsp;Delete a gist |
| `gh gist edit` | &nbsp;&nbsp;&nbsp;&nbsp;Edit one of your gists |
| `gh gist list` | &nbsp;&nbsp;&nbsp;&nbsp;List your gists |
| `gh gist rename` | &nbsp;&nbsp;&nbsp;&nbsp;Rename a file in a gist |
| `gh gist view` | &nbsp;&nbsp;&nbsp;&nbsp;View a gist |
| `gh gpg-key` | Manage GPG keys |
| `gh gpg-key add` | &nbsp;&nbsp;&nbsp;&nbsp;Add a GPG key to your GitHub account |
| `gh gpg-key delete` | &nbsp;&nbsp;&nbsp;&nbsp;Delete a GPG key from your GitHub account |
| `gh gpg-key list` | &nbsp;&nbsp;&nbsp;&nbsp;Lists GPG keys in your GitHub account |
| `gh issue` | Manage issues |
| `gh issue close` | &nbsp;&nbsp;&nbsp;&nbsp;Close issue |
| `gh issue comment` | &nbsp;&nbsp;&nbsp;&nbsp;Add a comment to an issue |
| `gh issue create` | &nbsp;&nbsp;&nbsp;&nbsp;Create a new issue |
| `gh issue delete` | &nbsp;&nbsp;&nbsp;&nbsp;Delete issue |
| `gh issue develop` | &nbsp;&nbsp;&nbsp;&nbsp;Manage linked branches for an issue |
| `gh issue edit` | &nbsp;&nbsp;&nbsp;&nbsp;Edit issues |
| `gh issue list` | &nbsp;&nbsp;&nbsp;&nbsp;List issues in a repository |
| `gh issue lock` | &nbsp;&nbsp;&nbsp;&nbsp;Lock issue conversation |
| `gh issue pin` | &nbsp;&nbsp;&nbsp;&nbsp;Pin an issue |
| `gh issue reopen` | &nbsp;&nbsp;&nbsp;&nbsp;Reopen issue |
| `gh issue status` | &nbsp;&nbsp;&nbsp;&nbsp;Show status of relevant issues |
| `gh issue transfer` | &nbsp;&nbsp;&nbsp;&nbsp;Transfer issue to another repository |
| `gh issue unlock` | &nbsp;&nbsp;&nbsp;&nbsp;Unlock issue conversation |
| `gh issue unpin` | &nbsp;&nbsp;&nbsp;&nbsp;Unpin an issue |
| `gh issue view` | &nbsp;&nbsp;&nbsp;&nbsp;View an issue |
| `gh label` | Manage labels |
| `gh label clone` | &nbsp;&nbsp;&nbsp;&nbsp;Clones labels from one repository to another |
| `gh label create` | &nbsp;&nbsp;&nbsp;&nbsp;Create a new label |
| `gh label delete` | &nbsp;&nbsp;&nbsp;&nbsp;Delete a label from a repository |
| `gh label edit` | &nbsp;&nbsp;&nbsp;&nbsp;Edit a label |
| `gh label list` | &nbsp;&nbsp;&nbsp;&nbsp;List labels in a repository |
| `gh licenses` | View third-party license information |
| `gh org` | Manage organizations |
| `gh org list` | &nbsp;&nbsp;&nbsp;&nbsp;List organizations for the authenticated user. |
| `gh pr` | Manage pull requests |
| `gh pr checkout` | &nbsp;&nbsp;&nbsp;&nbsp;Check out a pull request in git |
| `gh pr checks` | &nbsp;&nbsp;&nbsp;&nbsp;Show CI status for a single pull request |
| `gh pr close` | &nbsp;&nbsp;&nbsp;&nbsp;Close a pull request |
| `gh pr comment` | &nbsp;&nbsp;&nbsp;&nbsp;Add a comment to a pull request |
| `gh pr create` | &nbsp;&nbsp;&nbsp;&nbsp;Create a pull request |
| `gh pr diff` | &nbsp;&nbsp;&nbsp;&nbsp;View changes in a pull request |
| `gh pr edit` | &nbsp;&nbsp;&nbsp;&nbsp;Edit a pull request |
| `gh pr list` | &nbsp;&nbsp;&nbsp;&nbsp;List pull requests in a repository |
| `gh pr lock` | &nbsp;&nbsp;&nbsp;&nbsp;Lock pull request conversation |
| `gh pr merge` | &nbsp;&nbsp;&nbsp;&nbsp;Merge a pull request |
| `gh pr ready` | &nbsp;&nbsp;&nbsp;&nbsp;Mark a pull request as ready for review |
| `gh pr reopen` | &nbsp;&nbsp;&nbsp;&nbsp;Reopen a pull request |
| `gh pr revert` | &nbsp;&nbsp;&nbsp;&nbsp;Revert a pull request |
| `gh pr review` | &nbsp;&nbsp;&nbsp;&nbsp;Add a review to a pull request |
| `gh pr status` | &nbsp;&nbsp;&nbsp;&nbsp;Show status of relevant pull requests |
| `gh pr unlock` | &nbsp;&nbsp;&nbsp;&nbsp;Unlock pull request conversation |
| `gh pr view` | &nbsp;&nbsp;&nbsp;&nbsp;View a pull request |
| `gh preview` | Execute previews for gh features |
| `gh preview prompter` | &nbsp;&nbsp;&nbsp;&nbsp;Execute a test program to preview the prompter |
| `gh project` | Work with GitHub Projects. |
| `gh project close` | &nbsp;&nbsp;&nbsp;&nbsp;Close a project |
| `gh project copy` | &nbsp;&nbsp;&nbsp;&nbsp;Copy a project |
| `gh project create` | &nbsp;&nbsp;&nbsp;&nbsp;Create a project |
| `gh project delete` | &nbsp;&nbsp;&nbsp;&nbsp;Delete a project |
| `gh project edit` | &nbsp;&nbsp;&nbsp;&nbsp;Edit a project |
| `gh project field-create` | &nbsp;&nbsp;&nbsp;&nbsp;Create a field in a project |
| `gh project field-delete` | &nbsp;&nbsp;&nbsp;&nbsp;Delete a field in a project |
| `gh project field-list` | &nbsp;&nbsp;&nbsp;&nbsp;List the fields in a project |
| `gh project item-add` | &nbsp;&nbsp;&nbsp;&nbsp;Add a pull request or an issue to a project |
| `gh project item-archive` | &nbsp;&nbsp;&nbsp;&nbsp;Archive an item in a project |
| `gh project item-create` | &nbsp;&nbsp;&nbsp;&nbsp;Create a draft issue item in a project |
| `gh project item-delete` | &nbsp;&nbsp;&nbsp;&nbsp;Delete an item from a project by ID |
| `gh project item-edit` | &nbsp;&nbsp;&nbsp;&nbsp;Edit an item in a project |
| `gh project item-list` | &nbsp;&nbsp;&nbsp;&nbsp;List the items in a project |
| `gh project link` | &nbsp;&nbsp;&nbsp;&nbsp;Link a project to a repository or a team |
| `gh project list` | &nbsp;&nbsp;&nbsp;&nbsp;List the projects for an owner |
| `gh project unlink` | &nbsp;&nbsp;&nbsp;&nbsp;Unlink a project from a repository or a team |
| `gh project view` | &nbsp;&nbsp;&nbsp;&nbsp;View a project |
| `gh release` | Manage releases |
| `gh release create` | &nbsp;&nbsp;&nbsp;&nbsp;Create a new release |
| `gh release delete` | &nbsp;&nbsp;&nbsp;&nbsp;Delete a release |
| `gh release delete-asset` | &nbsp;&nbsp;&nbsp;&nbsp;Delete an asset from a release |
| `gh release download` | &nbsp;&nbsp;&nbsp;&nbsp;Download release assets |
| `gh release edit` | &nbsp;&nbsp;&nbsp;&nbsp;Edit a release |
| `gh release list` | &nbsp;&nbsp;&nbsp;&nbsp;List releases in a repository |
| `gh release upload` | &nbsp;&nbsp;&nbsp;&nbsp;Upload assets to a release |
| `gh release verify` | &nbsp;&nbsp;&nbsp;&nbsp;Verify the attestation for a release |
| `gh release verify-asset` | &nbsp;&nbsp;&nbsp;&nbsp;Verify that a given asset originated from a release |
| `gh release view` | &nbsp;&nbsp;&nbsp;&nbsp;View information about a release |
| `gh repo` | Manage repositories |
| `gh repo archive` | &nbsp;&nbsp;&nbsp;&nbsp;Archive a repository |
| `gh repo autolink` | &nbsp;&nbsp;&nbsp;&nbsp;Manage autolink references |
| `gh repo clone` | &nbsp;&nbsp;&nbsp;&nbsp;Clone a repository locally |
| `gh repo create` | &nbsp;&nbsp;&nbsp;&nbsp;Create a new repository |
| `gh repo delete` | &nbsp;&nbsp;&nbsp;&nbsp;Delete a repository |
| `gh repo deploy-key` | &nbsp;&nbsp;&nbsp;&nbsp;Manage deploy keys in a repository |
| `gh repo edit` | &nbsp;&nbsp;&nbsp;&nbsp;Edit repository settings |
| `gh repo fork` | &nbsp;&nbsp;&nbsp;&nbsp;Create a fork of a repository |
| `gh repo gitignore` | &nbsp;&nbsp;&nbsp;&nbsp;List and view available repository gitignore templates |
| `gh repo license` | &nbsp;&nbsp;&nbsp;&nbsp;Explore repository licenses |
| `gh repo list` | &nbsp;&nbsp;&nbsp;&nbsp;List repositories owned by user or organization |
| `gh repo read-dir` | &nbsp;&nbsp;&nbsp;&nbsp;List a directory in a repository (preview) |
| `gh repo read-file` | &nbsp;&nbsp;&nbsp;&nbsp;Read a file from a repository (preview) |
| `gh repo rename` | &nbsp;&nbsp;&nbsp;&nbsp;Rename a repository |
| `gh repo set-default` | &nbsp;&nbsp;&nbsp;&nbsp;Configure default repository for this directory |
| `gh repo sync` | &nbsp;&nbsp;&nbsp;&nbsp;Sync a repository |
| `gh repo unarchive` | &nbsp;&nbsp;&nbsp;&nbsp;Unarchive a repository |
| `gh repo view` | &nbsp;&nbsp;&nbsp;&nbsp;View a repository |
| `gh ruleset` | View info about repo rulesets |
| `gh ruleset check` | &nbsp;&nbsp;&nbsp;&nbsp;View rules that would apply to a given branch |
| `gh ruleset list` | &nbsp;&nbsp;&nbsp;&nbsp;List rulesets for a repository or organization |
| `gh ruleset view` | &nbsp;&nbsp;&nbsp;&nbsp;View information about a ruleset |
| `gh run` | View details about workflow runs |
| `gh run cancel` | &nbsp;&nbsp;&nbsp;&nbsp;Cancel a workflow run |
| `gh run delete` | &nbsp;&nbsp;&nbsp;&nbsp;Delete a workflow run |
| `gh run download` | &nbsp;&nbsp;&nbsp;&nbsp;Download artifacts generated by a workflow run |
| `gh run list` | &nbsp;&nbsp;&nbsp;&nbsp;List recent workflow runs |
| `gh run rerun` | &nbsp;&nbsp;&nbsp;&nbsp;Rerun a run |
| `gh run view` | &nbsp;&nbsp;&nbsp;&nbsp;View a summary of a workflow run |
| `gh run watch` | &nbsp;&nbsp;&nbsp;&nbsp;Watch a run until it completes, showing its progress |
| `gh search` | Search for repositories, issues, and pull requests |
| `gh search code` | &nbsp;&nbsp;&nbsp;&nbsp;Search within code |
| `gh search commits` | &nbsp;&nbsp;&nbsp;&nbsp;Search for commits |
| `gh search issues` | &nbsp;&nbsp;&nbsp;&nbsp;Search for issues |
| `gh search prs` | &nbsp;&nbsp;&nbsp;&nbsp;Search for pull requests |
| `gh search repos` | &nbsp;&nbsp;&nbsp;&nbsp;Search for repositories |
| `gh secret` | Manage GitHub secrets |
| `gh secret delete` | &nbsp;&nbsp;&nbsp;&nbsp;Delete secrets |
| `gh secret list` | &nbsp;&nbsp;&nbsp;&nbsp;List secrets |
| `gh secret set` | &nbsp;&nbsp;&nbsp;&nbsp;Create or update secrets |
| `gh skill` | Install and manage agent skills (preview) |
| `gh skill install` | &nbsp;&nbsp;&nbsp;&nbsp;Install agent skills from a GitHub repository (preview) |
| `gh skill list` | &nbsp;&nbsp;&nbsp;&nbsp;List installed skills (preview) |
| `gh skill preview` | &nbsp;&nbsp;&nbsp;&nbsp;Preview a skill from a GitHub repository (preview) |
| `gh skill publish` | &nbsp;&nbsp;&nbsp;&nbsp;Validate and publish skills to a GitHub repository (preview) |
| `gh skill search` | &nbsp;&nbsp;&nbsp;&nbsp;Search for skills across GitHub (preview) |
| `gh skill update` | &nbsp;&nbsp;&nbsp;&nbsp;Update installed skills to their latest versions (preview) |
| `gh ssh-key` | Manage SSH keys |
| `gh ssh-key add` | &nbsp;&nbsp;&nbsp;&nbsp;Add an SSH key to your GitHub account |
| `gh ssh-key delete` | &nbsp;&nbsp;&nbsp;&nbsp;Delete an SSH key from your GitHub account |
| `gh ssh-key list` | &nbsp;&nbsp;&nbsp;&nbsp;Lists SSH keys in your GitHub account |
| `gh status` | Print information about relevant issues, pull requests, and notifications across repositories |
| `gh variable` | Manage GitHub Actions variables |
| `gh variable delete` | &nbsp;&nbsp;&nbsp;&nbsp;Delete variables |
| `gh variable get` | &nbsp;&nbsp;&nbsp;&nbsp;Get variables |
| `gh variable list` | &nbsp;&nbsp;&nbsp;&nbsp;List variables |
| `gh variable set` | &nbsp;&nbsp;&nbsp;&nbsp;Create or update variables |
| `gh workflow` | View details about GitHub Actions workflows |
| `gh workflow disable` | &nbsp;&nbsp;&nbsp;&nbsp;Disable a workflow |
| `gh workflow enable` | &nbsp;&nbsp;&nbsp;&nbsp;Enable a workflow |
| `gh workflow list` | &nbsp;&nbsp;&nbsp;&nbsp;List workflows |
| `gh workflow run` | &nbsp;&nbsp;&nbsp;&nbsp;Run a workflow by creating a workflow_dispatch event |
| `gh workflow view` | &nbsp;&nbsp;&nbsp;&nbsp;View the summary of a workflow |

## 逐命令详情

### `gh agent-task`

Work with agent tasks (preview)

**子命令**：`create` · `list` · `view`

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh agent-task create`

Create an agent task (preview)

| Flag | 说明 |
|---|---|
| `-b, --base string` | Base branch for the pull request (use default branch if not provided) |
| `-a, --custom-agent string` | Use a custom agent for the task. e.g., use 'my-agent' for the 'my-agent.md' agent |
| `--follow` | Follow agent session logs |
| `-F, --from-file file` | Read task description from file (use "-" to read from standard input) |
| `--help` | Show help for command |

### `gh agent-task list`

List agent tasks (preview)

| Flag | 说明 |
|---|---|
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `-L, --limit int` | Maximum number of agent tasks to fetch (default 30) |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `-w, --web` | Open agent tasks in the browser |
| `--help` | Show help for command |

### `gh agent-task view`

View an agent task session (preview)

| Flag | 说明 |
|---|---|
| `--follow` | Follow agent session logs |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `--log` | Show agent session logs |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `-w, --web` | Open agent task in the browser |
| `--help` | Show help for command |

### `gh alias`

Create command shortcuts

**子命令**：`delete` · `import` · `list` · `set`

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh alias delete`

Delete set aliases

| Flag | 说明 |
|---|---|
| `--all` | Delete all aliases |
| `--help` | Show help for command |

### `gh alias import`

Import aliases from a YAML file

| Flag | 说明 |
|---|---|
| `--clobber` | Overwrite existing aliases of the same name |
| `--help` | Show help for command |

### `gh alias list`

List your aliases

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh alias set`

Create a shortcut for a gh command

| Flag | 说明 |
|---|---|
| `--clobber` | Overwrite existing aliases of the same name |
| `-s, --shell` | Declare an alias to be passed through a shell interpreter |
| `--help` | Show help for command |

### `gh api`

Make an authenticated GitHub API request

| Flag | 说明 |
|---|---|
| `--allow-escape-sequences` | Allow printing terminal escape sequences |
| `--cache duration` | Cache the response, e.g. "3600s", "60m", "1h" |
| `--hostname string` | The GitHub hostname for the request (default "github.com") |
| `-i, --include` | Include HTTP response status line and headers in the output |
| `--input file` | The file to use as body for the HTTP request (use "-" to read from standard input) |
| `-q, --jq string` | Query to select values from the response using jq syntax |
| `-X, --method string` | The HTTP method for the request (default "GET") |
| `--paginate` | Make additional HTTP requests to fetch all pages of results |
| `-p, --preview strings` | Opt into GitHub API previews (names should omit '-preview') |
| `--silent` | Do not print the response body |
| `--slurp` | Use with "--paginate" to return an array of all pages of either JSON arrays or objects |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--verbose` | Include full HTTP request and response in the output |
| `--help` | Show help for command |

### `gh attestation`

Work with artifact attestations

**子命令**：`download` · `trusted-root` · `verify`

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh attestation download`

Download an artifact's attestations for offline use

| Flag | 说明 |
|---|---|
| `-d, --digest-alg string` | The algorithm used to compute a digest of the artifact: {sha256\|sha512} (default "sha256") |
| `--hostname string` | Configure host to use |
| `-L, --limit int` | Maximum number of attestations to fetch (default 30) |
| `-o, --owner string` | GitHub organization to scope attestation lookup by |
| `--predicate-type string` | Filter attestations by provided predicate type |
| `-R, --repo string` | Repository name in the format <owner>/<repo> |
| `--help` | Show help for command |

### `gh attestation trusted-root`

Output trusted_root.jsonl contents, likely for offline verification

| Flag | 说明 |
|---|---|
| `--hostname string` | Configure host to use |
| `--tuf-root string` | Path to the TUF root.json file on disk |
| `--tuf-url string` | URL to the TUF repository mirror |
| `--verify-only` | Don't output trusted_root.jsonl contents |
| `--help` | Show help for command |

### `gh attestation verify`

Verify an artifact's integrity using attestations

| Flag | 说明 |
|---|---|
| `-b, --bundle string` | Path to bundle on disk, either a single bundle in a JSON file or a JSON lines file with multiple bundles |
| `--bundle-from-oci` | When verifying an OCI image, fetch the attestation bundle from the OCI registry instead of from GitHub |
| `--cert-identity string` | Enforce that the certificate's SubjectAlternativeName matches the provided value exactly |
| `-i, --cert-identity-regex string` | Enforce that the certificate's SubjectAlternativeName matches the provided regex |
| `--cert-oidc-issuer string` | Enforce that the issuer of the OIDC token matches the provided value (default "https://token.actions.githubusercontent.com") |
| `--custom-trusted-root string` | Path to a trusted_root.jsonl file; likely for offline verification |
| `--deny-self-hosted-runners` | Fail verification for attestations generated on self-hosted runners |
| `-d, --digest-alg string` | The algorithm used to compute a digest of the artifact: {sha256\|sha512} (default "sha256") |
| `--format string` | Output format: {json} |
| `--hostname string` | Configure host to use |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `-L, --limit int` | Maximum number of attestations to fetch (default 30) |
| `--no-public-good` | Do not verify attestations signed with Sigstore public good instance |
| `-o, --owner string` | GitHub organization to scope attestation lookup by |
| `--predicate-type string` | Enforce that verified attestations' predicate type matches the provided value (default "https://slsa.dev/provenance/v1") |
| `-R, --repo string` | Repository name in the format <owner>/<repo> |
| `--signer-digest string` | Enforce that the digest associated with the signer workflow matches the provided value |
| `--signer-repo string` | Enforce that the workflow that signed the attestation's repository matches the provided value (<owner>/<repo>) |
| `--signer-workflow string` | Enforce that the workflow that signed the attestation matches the provided value ([host/]<owner>/<repo>/<path>/<to>/<workflow>) |
| `--source-digest string` | Enforce that the digest associated with the source repository matches the provided value |
| `--source-ref string` | Enforce that the git ref associated with the source repository matches the provided value |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--help` | Show help for command |

### `gh auth`

Authenticate gh and git with GitHub

**子命令**：`login` · `logout` · `refresh` · `setup-git` · `status` · `switch` · `token`

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh auth login`

Log in to a GitHub account

| Flag | 说明 |
|---|---|
| `-c, --clipboard` | Copy one-time OAuth device code to clipboard |
| `-p, --git-protocol string` | The protocol to use for git operations on this host: {ssh\|https} |
| `-h, --hostname string` | The hostname of the GitHub instance to authenticate with |
| `--insecure-storage` | Save authentication credentials in plain text instead of credential store |
| `-s, --scopes strings` | Additional authentication scopes to request |
| `--skip-ssh-key` | Skip generate/upload SSH key prompt |
| `-w, --web` | Open a browser to authenticate |
| `--with-token` | Read token from standard input |
| `--help` | Show help for command |

### `gh auth logout`

Log out of a GitHub account

| Flag | 说明 |
|---|---|
| `-h, --hostname string` | The hostname of the GitHub instance to log out of |
| `-u, --user string` | The account to log out of |
| `--help` | Show help for command |

### `gh auth refresh`

Refresh stored authentication credentials

| Flag | 说明 |
|---|---|
| `-c, --clipboard` | Copy one-time OAuth device code to clipboard |
| `-h, --hostname string` | The GitHub host to use for authentication |
| `--insecure-storage` | Save authentication credentials in plain text instead of credential store |
| `-r, --remove-scopes strings` | Authentication scopes to remove from gh |
| `--reset-scopes` | Reset authentication scopes to the default minimum set of scopes |
| `-s, --scopes strings` | Additional authentication scopes for gh to have |
| `--help` | Show help for command |

### `gh auth setup-git`

Setup git with GitHub CLI

| Flag | 说明 |
|---|---|
| `-h, --hostname string` | The hostname to configure git for |
| `--help` | Show help for command |

### `gh auth status`

Display active account and authentication state on each known GitHub host

| Flag | 说明 |
|---|---|
| `-a, --active` | Display the active account only |
| `-h, --hostname string` | Check only a specific hostname's auth status |
| `--jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `-t, --show-token` | Display the auth token |
| `--template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--help` | Show help for command |

### `gh auth switch`

Switch active GitHub account

| Flag | 说明 |
|---|---|
| `-h, --hostname string` | The hostname of the GitHub instance to switch account for |
| `-u, --user string` | The account to switch to |
| `--help` | Show help for command |

### `gh auth token`

Print the authentication token gh uses for a hostname and account

| Flag | 说明 |
|---|---|
| `-h, --hostname string` | The hostname of the GitHub instance authenticated with |
| `-u, --user string` | The account to output the token for |
| `--help` | Show help for command |

### `gh browse`

Open repositories, issues, pull requests, and more in the browser

| Flag | 说明 |
|---|---|
| `-a, --actions` | Open repository actions |
| `--blame` | Open blame view for a file |
| `-b, --branch string` | Select another branch by passing in the branch name |
| `-n, --no-browser` | Print destination URL instead of opening the browser |
| `-p, --projects` | Open repository projects |
| `-r, --releases` | Open repository releases |
| `-s, --settings` | Open repository settings |
| `-w, --wiki` | Open repository wiki |
| `--help` | Show help for command |

### `gh cache`

Manage GitHub Actions caches

**子命令**：`delete` · `list`

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh cache delete`

Delete GitHub Actions caches

| Flag | 说明 |
|---|---|
| `-a, --all` | Delete all caches, can be used with --ref to delete all caches for a specific ref |
| `-r, --ref string` | Delete by cache key and ref, formatted as refs/heads/<branch name> or refs/pull/<number>/merge |
| `--help` | Show help for command |

### `gh cache list`

List GitHub Actions caches

| Flag | 说明 |
|---|---|
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `-k, --key string` | Filter by cache key prefix |
| `-L, --limit int` | Maximum number of caches to fetch (default 30) |
| `-O, --order string` | Order of caches returned: {asc\|desc} (default "desc") |
| `-r, --ref string` | Filter by ref, formatted as refs/heads/<branch name> or refs/pull/<number>/merge |
| `-S, --sort string` | Sort fetched caches: {created_at\|last_accessed_at\|size_in_bytes} (default "last_accessed_at") |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--help` | Show help for command |

### `gh co`

Alias for "pr checkout"

| Flag | 说明 |
|---|---|
| `-b, --branch string` | Local branch name to use (default [the name of the head branch]) |
| `--detach` | Checkout PR with a detached HEAD |
| `-f, --force` | Reset the existing local branch to the latest state of the pull request |
| `--recurse-submodules` | Update all submodules after checkout |
| `--worktree path` | Check out the pull request into a worktree at the given path |
| `--help` | Show help for command |

### `gh codespace`

Connect to and manage codespaces

**子命令**：`code` · `cp` · `create` · `delete` · `edit` · `jupyter` · `list` · `logs` · `ports` · `rebuild` · `ssh` · `stop` · `view`

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh codespace code`

Open a codespace in Visual Studio Code

| Flag | 说明 |
|---|---|
| `-c, --codespace string` | Name of the codespace |
| `--insiders` | Use the insiders version of Visual Studio Code |
| `-R, --repo string` | Filter codespace selection by repository name (user/repo) |
| `--repo-owner string` | Filter codespace selection by repository owner (username or org) |
| `-w, --web` | Use the web version of Visual Studio Code |
| `--help` | Show help for command |

### `gh codespace cp`

Copy files between local and remote file systems

| Flag | 说明 |
|---|---|
| `-c, --codespace string` | Name of the codespace |
| `-e, --expand` | Expand remote file names on remote shell |
| `-p, --profile string` | Name of the SSH profile to use |
| `-r, --recursive` | Recursively copy directories |
| `-R, --repo string` | Filter codespace selection by repository name (user/repo) |
| `--repo-owner string` | Filter codespace selection by repository owner (username or org) |
| `--help` | Show help for command |

### `gh codespace create`

Create a codespace

| Flag | 说明 |
|---|---|
| `-b, --branch string` | Repository branch |
| `--default-permissions` | Do not prompt to accept additional permissions requested by the codespace |
| `--devcontainer-path string` | Path to the devcontainer.json file to use when creating codespace |
| `-d, --display-name string` | Display name for the codespace (48 characters or less) |
| `--idle-timeout duration` | Allowed inactivity before codespace is stopped, e.g. "10m", "1h" |
| `-l, --location string` | Location: {EastUs\|SouthEastAsia\|WestEurope\|WestUs2} (determined automatically if not provided) |
| `-m, --machine string` | Hardware specifications for the VM |
| `-R, --repo string` | Repository name with owner: user/repo |
| `--retention-period duration` | Allowed time after shutting down before the codespace is automatically deleted (maximum 30 days), e.g. "1h", "72h" |
| `-s, --status` | Show status of post-create command and dotfiles |
| `-w, --web` | Create codespace from browser, cannot be used with --display-name, --idle-timeout, or --retention-period |
| `--help` | Show help for command |

### `gh codespace delete`

Delete codespaces

| Flag | 说明 |
|---|---|
| `--all` | Delete all codespaces |
| `-c, --codespace string` | Name of the codespace |
| `--days N` | Delete codespaces older than N days |
| `-f, --force` | Skip confirmation for codespaces that contain unsaved changes |
| `-o, --org login` | The login handle of the organization (admin-only) |
| `-R, --repo string` | Filter codespace selection by repository name (user/repo) |
| `--repo-owner string` | Filter codespace selection by repository owner (username or org) |
| `-u, --user username` | The username to delete codespaces for (used with --org) |
| `--help` | Show help for command |

### `gh codespace edit`

Edit a codespace

| Flag | 说明 |
|---|---|
| `-c, --codespace string` | Name of the codespace |
| `-d, --display-name string` | Set the display name |
| `-m, --machine string` | Set hardware specifications for the VM |
| `-R, --repo string` | Filter codespace selection by repository name (user/repo) |
| `--repo-owner string` | Filter codespace selection by repository owner (username or org) |
| `--help` | Show help for command |

### `gh codespace jupyter`

Open a codespace in JupyterLab

| Flag | 说明 |
|---|---|
| `-c, --codespace string` | Name of the codespace |
| `-R, --repo string` | Filter codespace selection by repository name (user/repo) |
| `--repo-owner string` | Filter codespace selection by repository owner (username or org) |
| `--help` | Show help for command |

### `gh codespace list`

List codespaces

| Flag | 说明 |
|---|---|
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `-L, --limit int` | Maximum number of codespaces to list (default 30) |
| `-o, --org login` | The login handle of the organization to list codespaces for (admin-only) |
| `-R, --repo string` | Repository name with owner: user/repo |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `-u, --user username` | The username to list codespaces for (used with --org) |
| `-w, --web` | List codespaces in the web browser, cannot be used with --user or --org |
| `--help` | Show help for command |

### `gh codespace logs`

Access codespace logs

| Flag | 说明 |
|---|---|
| `-c, --codespace string` | Name of the codespace |
| `-f, --follow` | Tail and follow the logs |
| `-R, --repo string` | Filter codespace selection by repository name (user/repo) |
| `--repo-owner string` | Filter codespace selection by repository owner (username or org) |
| `--help` | Show help for command |

### `gh codespace ports`

List ports in a codespace

**子命令**：`forward` · `visibility`

| Flag | 说明 |
|---|---|
| `-c, --codespace string` | Name of the codespace |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `-R, --repo string` | Filter codespace selection by repository name (user/repo) |
| `--repo-owner string` | Filter codespace selection by repository owner (username or org) |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--help` | Show help for command |

### `gh codespace rebuild`

Rebuild a codespace

| Flag | 说明 |
|---|---|
| `-c, --codespace string` | Name of the codespace |
| `--full` | Perform a full rebuild |
| `-R, --repo string` | Filter codespace selection by repository name (user/repo) |
| `--repo-owner string` | Filter codespace selection by repository owner (username or org) |
| `--help` | Show help for command |

### `gh codespace ssh`

SSH into a codespace

| Flag | 说明 |
|---|---|
| `-c, --codespace string` | Name of the codespace |
| `--config` | Write OpenSSH configuration to stdout |
| `-d, --debug` | Log debug data to a file |
| `--debug-file string` | Path of the file log to |
| `--profile string` | Name of the SSH profile to use |
| `-R, --repo string` | Filter codespace selection by repository name (user/repo) |
| `--repo-owner string` | Filter codespace selection by repository owner (username or org) |
| `--server-port int` | SSH server port number (0 => pick unused) |
| `--help` | Show help for command |

### `gh codespace stop`

Stop a running codespace

| Flag | 说明 |
|---|---|
| `-c, --codespace string` | Name of the codespace |
| `-o, --org login` | The login handle of the organization (admin-only) |
| `-R, --repo string` | Filter codespace selection by repository name (user/repo) |
| `--repo-owner string` | Filter codespace selection by repository owner (username or org) |
| `-u, --user username` | The username to stop codespace for (used with --org) |
| `--help` | Show help for command |

### `gh codespace view`

View details about a codespace

| Flag | 说明 |
|---|---|
| `-c, --codespace string` | Name of the codespace |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `-R, --repo string` | Filter codespace selection by repository name (user/repo) |
| `--repo-owner string` | Filter codespace selection by repository owner (username or org) |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--help` | Show help for command |

### `gh completion`

Generate shell completion scripts

| Flag | 说明 |
|---|---|
| `-s, --shell string` | Shell type: {bash\|zsh\|fish\|powershell} |
| `--help` | Show help for command |

### `gh config`

Manage configuration for gh

**子命令**：`clear-cache` · `get` · `list` · `set`

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh config clear-cache`

Clear the cli cache

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh config get`

Print the value of a given configuration key

| Flag | 说明 |
|---|---|
| `-h, --host string` | Get per-host setting |
| `--help` | Show help for command |

### `gh config list`

Print a list of configuration keys and values

| Flag | 说明 |
|---|---|
| `-h, --host string` | Get per-host configuration |
| `--help` | Show help for command |

### `gh config set`

Update configuration with a value for the given key

| Flag | 说明 |
|---|---|
| `-h, --host string` | Set per-host setting |
| `--help` | Show help for command |

### `gh copilot`

Run the GitHub Copilot CLI (preview)

| Flag | 说明 |
|---|---|
| `--remove` | Remove the downloaded Copilot CLI |
| `--help` | Show help for command |

### `gh discussion`

Work with GitHub Discussions (preview)

**子命令**：`create` · `list` · `comment` · `edit` · `view`

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh discussion comment`

Add, edit, or delete a comment or a reply on a discussion (preview)

| Flag | 说明 |
|---|---|
| `-b, --body string` | Comment body text |
| `-F, --body-file string` | Read body text from file (use "-" to read from standard input) |
| `--delete` | Delete the specified comment |
| `--edit` | Edit the specified comment |
| `--yes` | Skip the delete confirmation prompt |
| `--help` | Show help for command |

### `gh discussion create`

Create a new discussion (preview)

| Flag | 说明 |
|---|---|
| `-b, --body string` | Body for the discussion |
| `-F, --body-file string` | Read body text from file (use "-" to read from stdin) |
| `-c, --category string` | Category name or slug for the discussion |
| `-l, --label strings` | Labels to apply to the discussion |
| `-t, --title string` | Title for the discussion |
| `--help` | Show help for command |

### `gh discussion edit`

Edit a discussion (preview)

| Flag | 说明 |
|---|---|
| `--add-label name` | Add labels by name |
| `-b, --body string` | New body for the discussion |
| `-F, --body-file string` | Read body text from file (use "-" to read from standard input) |
| `-c, --category string` | New category name or slug for the discussion |
| `--remove-label name` | Remove labels by name |
| `-t, --title string` | New title for the discussion |
| `--help` | Show help for command |

### `gh discussion list`

List discussions in a repository (preview)

| Flag | 说明 |
|---|---|
| `--after string` | Cursor for the next page of results |
| `--answered` | Filter by answered state |
| `-A, --author string` | Filter by author |
| `-c, --category string` | Filter by category name or slug |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `-l, --label strings` | Filter by label |
| `-L, --limit int` | Maximum number of discussions to fetch (default 30) |
| `--order string` | Order of results: {asc\|desc} (default "desc") |
| `-S, --search query` | Search discussions with query |
| `--sort string` | Sort by field: {created\|updated} (default "updated") |
| `-s, --state string` | Filter by state: {open\|closed\|all} (default "open") |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `-w, --web` | List discussions in the web browser |
| `--help` | Show help for command |

### `gh discussion view`

View a discussion (preview)

| Flag | 说明 |
|---|---|
| `--after string` | Cursor for the next page |
| `-c, --comments` | View discussion comments |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `-L, --limit int` | Maximum number of comments or replies to fetch (default 30) |
| `--order string` | Order of comments or replies: {oldest\|newest} (default "newest") |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `-w, --web` | Open a discussion in the browser |
| `--help` | Show help for command |

### `gh extension`

Manage gh extensions

**子命令**：`browse` · `create` · `exec` · `install` · `list` · `remove` · `search` · `upgrade`

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh extension browse`

Enter a UI for browsing, adding, and removing extensions

| Flag | 说明 |
|---|---|
| `--debug` | Log to /tmp/extBrowse-* |
| `-s, --single-column` | Render TUI with only one column of text |
| `--help` | Show help for command |

### `gh extension create`

Create a new extension

| Flag | 说明 |
|---|---|
| `--precompiled string` | Create a precompiled extension. Possible values: go, other |
| `--help` | Show help for command |

### `gh extension install`

Install a gh extension from a repository

| Flag | 说明 |
|---|---|
| `--force` | Force upgrade extension, or ignore if latest already installed |
| `--pin string` | Pin extension to a release tag or commit ref |
| `--help` | Show help for command |

### `gh extension list`

List installed extension commands

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh extension remove`

Remove an installed extension

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh extension search`

Search extensions to the GitHub CLI

| Flag | 说明 |
|---|---|
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `--license strings` | Filter based on license type |
| `-L, --limit int` | Maximum number of extensions to fetch (default 30) |
| `--order string` | Order of repositories returned, ignored unless '--sort' flag is specified: {asc\|desc} (default "desc") |
| `--owner strings` | Filter on owner |
| `--sort string` | Sort fetched repositories: {forks\|help-wanted-issues\|stars\|updated} (default "best-match") |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `-w, --web` | Open the search query in the web browser |
| `--help` | Show help for command |

### `gh extension upgrade`

Upgrade installed extensions

| Flag | 说明 |
|---|---|
| `--all` | Upgrade all extensions |
| `--dry-run` | Only display upgrades |
| `--force` | Force upgrade extension |
| `--help` | Show help for command |

### `gh gist`

Manage gists

**子命令**：`clone` · `create` · `delete` · `edit` · `list` · `rename` · `view`

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh gist clone`

Clone a gist locally

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh gist create`

Create a new gist

| Flag | 说明 |
|---|---|
| `-d, --desc string` | A description for this gist |
| `-f, --filename string` | Provide a filename to be used when reading from standard input |
| `-p, --public` | List the gist publicly (default "secret") |
| `-w, --web` | Open the web browser with created gist |
| `--help` | Show help for command |

### `gh gist delete`

Delete a gist

| Flag | 说明 |
|---|---|
| `--yes` | Confirm deletion without prompting |
| `--help` | Show help for command |

### `gh gist edit`

Edit one of your gists

| Flag | 说明 |
|---|---|
| `-a, --add string` | Add a new file to the gist |
| `-d, --desc string` | New description for the gist |
| `-f, --filename string` | Select a file to edit |
| `-r, --remove string` | Remove a file from the gist |
| `--help` | Show help for command |

### `gh gist list`

List your gists

| Flag | 说明 |
|---|---|
| `--filter expression` | Filter gists using a regular expression |
| `--include-content` | Include gists' file content when filtering |
| `-L, --limit int` | Maximum number of gists to fetch (default 10) |
| `--public` | Show only public gists |
| `--secret` | Show only secret gists |
| `--help` | Show help for command |

### `gh gist rename`

Rename a file in a gist

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh gist view`

View a gist

| Flag | 说明 |
|---|---|
| `--allow-escape-sequences` | Allow printing terminal escape sequences |
| `-f, --filename string` | Display a single file from the gist |
| `--files` | List file names from the gist |
| `-r, --raw` | Print raw instead of rendered gist contents |
| `-w, --web` | Open gist in the browser |
| `--help` | Show help for command |

### `gh gpg-key`

Manage GPG keys

**子命令**：`add` · `delete` · `list`

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh gpg-key add`

Add a GPG key to your GitHub account

| Flag | 说明 |
|---|---|
| `-t, --title string` | Title for the new key |
| `--help` | Show help for command |

### `gh gpg-key delete`

Delete a GPG key from your GitHub account

| Flag | 说明 |
|---|---|
| `-y, --yes` | Skip the confirmation prompt |
| `--help` | Show help for command |

### `gh gpg-key list`

Lists GPG keys in your GitHub account

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh issue`

Manage issues

**子命令**：`create` · `list` · `status` · `close` · `comment` · `delete` · `develop` · `edit` · `lock` · `pin` · `reopen` · `transfer` · `unlock` · `unpin` · `view`

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh issue close`

Close issue

| Flag | 说明 |
|---|---|
| `-c, --comment string` | Leave a closing comment |
| `--duplicate-of string` | Mark as duplicate of another issue by number or URL |
| `-r, --reason string` | Reason for closing: {completed\|not planned\|duplicate} |
| `--help` | Show help for command |

### `gh issue comment`

Add a comment to an issue

| Flag | 说明 |
|---|---|
| `--attach file` | Attach an image or video file, in '<file>#<image alt text>' format |
| `-b, --body text` | The comment body text |
| `-F, --body-file file` | Read body text from file (use "-" to read from standard input) |
| `--create-if-none` | Create a new comment if no comments are found. Can be used only with --edit-last |
| `--delete-last` | Delete the last comment of the current user |
| `--edit-last` | Edit the last comment of the current user |
| `-e, --editor` | Skip prompts and open the text editor to write the body in |
| `-w, --web` | Open the web browser to write the comment |
| `--yes` | Skip the delete confirmation prompt when --delete-last is provided |
| `--help` | Show help for command |

### `gh issue create`

Create a new issue

| Flag | 说明 |
|---|---|
| `-a, --assignee login` | Assign people by their login. Use "@me" to self-assign. |
| `--attach file` | Attach an image or video file, in '<file>#<image alt text>' format |
| `--blocked-by numbers` | Mark the new issue as blocked by these issue numbers or URLs |
| `--blocking numbers` | Mark the new issue as blocking these issue numbers or URLs |
| `-b, --body string` | Supply a body. Will prompt for one otherwise. |
| `-F, --body-file file` | Read body text from file (use "-" to read from standard input) |
| `-e, --editor` | Skip prompts and open the text editor to write the title and body in. The first line is the title and the remaining text is the body. |
| `-l, --label name` | Add labels by name |
| `-m, --milestone name` | Add the issue to a milestone by name |
| `--parent number` | Add the new issue as a sub-issue of the specified parent number or URL |
| `-p, --project title` | Add the issue to projects by title |
| `--recover string` | Recover input from a failed run of create |
| `-T, --template name` | Template name to use as starting body text |
| `-t, --title string` | Supply a title. Will prompt for one otherwise. |
| `--type name` | Set the issue type by name |
| `-w, --web` | Open the browser to create an issue |
| `--help` | Show help for command |

### `gh issue delete`

Delete issue

| Flag | 说明 |
|---|---|
| `--yes` | Confirm deletion without prompting |
| `--help` | Show help for command |

### `gh issue develop`

Manage linked branches for an issue

| Flag | 说明 |
|---|---|
| `-b, --base string` | Name of the remote branch you want to make your new branch from |
| `--branch-repo string` | Name or URL of the repository where you want to create your new branch |
| `-c, --checkout` | Checkout the branch after creating it |
| `-l, --list` | List linked branches for the issue |
| `-n, --name string` | Name of the branch to create |
| `--worktree path` | Check out the branch into a worktree at the given path |
| `--help` | Show help for command |

### `gh issue edit`

Edit issues

| Flag | 说明 |
|---|---|
| `--add-assignee login` | Add assigned users by their login. Use "@me" to assign yourself, or "@copilot" to assign Copilot. |
| `--add-blocked-by number` | Add 'blocked by' relationships by issue number or URL |
| `--add-blocking number` | Add 'blocking' relationships by issue number or URL |
| `--add-label name` | Add labels by name |
| `--add-project title` | Add the issue to projects by title |
| `--add-sub-issue number` | Add sub-issues by number or URL |
| `--attach file` | Attach an image or video file, in '<file>#<image alt text>' format |
| `-b, --body string` | Set the new body. |
| `-F, --body-file file` | Read body text from file (use "-" to read from standard input) |
| `-m, --milestone name` | Edit the milestone the issue belongs to by name |
| `--parent number` | Set the parent issue by number or URL |
| `--remove-assignee login` | Remove assigned users by their login. Use "@me" to unassign yourself, or "@copilot" to unassign Copilot. |
| `--remove-blocked-by number` | Remove 'blocked by' relationships by issue number or URL |
| `--remove-blocking number` | Remove 'blocking' relationships by issue number or URL |
| `--remove-label name` | Remove labels by name |
| `--remove-milestone` | Remove the milestone association from the issue |
| `--remove-parent` | Remove the parent issue |
| `--remove-project title` | Remove the issue from projects by title |
| `--remove-sub-issue number` | Remove sub-issues by number or URL |
| `--remove-type` | Remove the issue type from the issue |
| `-t, --title string` | Set the new title. |
| `--type name` | Set the issue type by name |
| `--help` | Show help for command |

### `gh issue list`

List issues in a repository

| Flag | 说明 |
|---|---|
| `--app string` | Filter by GitHub App author |
| `-a, --assignee string` | Filter by assignee |
| `-A, --author string` | Filter by author (use --app to filter by a GitHub App) |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `-l, --label strings` | Filter by label |
| `-L, --limit int` | Maximum number of issues to fetch (default 30) |
| `--mention string` | Filter by mention |
| `-m, --milestone string` | Filter by milestone number or title |
| `-S, --search query` | Search issues with query |
| `-s, --state string` | Filter by state: {open\|closed\|all} (default "open") |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--type name` | Filter by issue type name |
| `-w, --web` | List issues in the web browser |
| `--help` | Show help for command |

### `gh issue lock`

Lock issue conversation

| Flag | 说明 |
|---|---|
| `-r, --reason string` | Optional reason for locking conversation (off_topic, resolved, spam, too_heated). |
| `--help` | Show help for command |

### `gh issue pin`

Pin an issue

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh issue reopen`

Reopen issue

| Flag | 说明 |
|---|---|
| `-c, --comment string` | Add a reopening comment |
| `--help` | Show help for command |

### `gh issue status`

Show status of relevant issues

| Flag | 说明 |
|---|---|
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--help` | Show help for command |

### `gh issue transfer`

Transfer issue to another repository

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh issue unlock`

Unlock issue conversation

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh issue unpin`

Unpin an issue

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh issue view`

View an issue

| Flag | 说明 |
|---|---|
| `-c, --comments` | View issue comments |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `-w, --web` | Open an issue in the browser |
| `--help` | Show help for command |

### `gh label`

Manage labels

**子命令**：`clone` · `create` · `delete` · `edit` · `list`

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh label clone`

Clones labels from one repository to another

| Flag | 说明 |
|---|---|
| `-f, --force` | Overwrite labels in the destination repository |
| `--help` | Show help for command |

### `gh label create`

Create a new label

| Flag | 说明 |
|---|---|
| `-c, --color string` | Color of the label |
| `-d, --description string` | Description of the label |
| `-f, --force` | Update the label color and description if label already exists |
| `--help` | Show help for command |

### `gh label delete`

Delete a label from a repository

| Flag | 说明 |
|---|---|
| `--yes` | Confirm deletion without prompting |
| `--help` | Show help for command |

### `gh label edit`

Edit a label

| Flag | 说明 |
|---|---|
| `-c, --color string` | Color of the label |
| `-d, --description string` | Description of the label |
| `-n, --name string` | New name of the label |
| `--help` | Show help for command |

### `gh label list`

List labels in a repository

| Flag | 说明 |
|---|---|
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `-L, --limit int` | Maximum number of labels to fetch (default 30) |
| `--order string` | Order of labels returned: {asc\|desc} (default "asc") |
| `-S, --search string` | Search label names and descriptions |
| `--sort string` | Sort fetched labels: {created\|name} (default "created") |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `-w, --web` | List labels in the web browser |
| `--help` | Show help for command |

### `gh licenses`

View third-party license information

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh org`

Manage organizations

**子命令**：`list`

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh org list`

List organizations for the authenticated user.

| Flag | 说明 |
|---|---|
| `-L, --limit int` | Maximum number of organizations to list (default 30) |
| `--help` | Show help for command |

### `gh pr`

Manage pull requests

**子命令**：`create` · `list` · `status` · `checkout` · `checks` · `close` · `comment` · `diff` · `edit` · `lock` · `merge` · `ready` · `reopen` · `revert` · `review` · `unlock` · `view`

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh pr checkout`

Check out a pull request in git

| Flag | 说明 |
|---|---|
| `-b, --branch string` | Local branch name to use (default [the name of the head branch]) |
| `--detach` | Checkout PR with a detached HEAD |
| `-f, --force` | Reset the existing local branch to the latest state of the pull request |
| `--recurse-submodules` | Update all submodules after checkout |
| `--worktree path` | Check out the pull request into a worktree at the given path |
| `--help` | Show help for command |

### `gh pr checks`

Show CI status for a single pull request

| Flag | 说明 |
|---|---|
| `--fail-fast` | Exit watch mode on first check failure |
| `-i, --interval int` | Refresh interval in seconds in watch mode (default 10) |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `--required` | Only show checks that are required |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--watch` | Watch checks until they finish |
| `-w, --web` | Open the web browser to show details about checks |
| `--help` | Show help for command |

### `gh pr close`

Close a pull request

| Flag | 说明 |
|---|---|
| `-c, --comment string` | Leave a closing comment |
| `-d, --delete-branch` | Delete the local and remote branch after close |
| `--help` | Show help for command |

### `gh pr comment`

Add a comment to a pull request

| Flag | 说明 |
|---|---|
| `--attach file` | Attach an image or video file, in '<file>#<image alt text>' format |
| `-b, --body text` | The comment body text |
| `-F, --body-file file` | Read body text from file (use "-" to read from standard input) |
| `--create-if-none` | Create a new comment if no comments are found. Can be used only with --edit-last |
| `--delete-last` | Delete the last comment of the current user |
| `--edit-last` | Edit the last comment of the current user |
| `-e, --editor` | Skip prompts and open the text editor to write the body in |
| `-w, --web` | Open the web browser to write the comment |
| `--yes` | Skip the delete confirmation prompt when --delete-last is provided |
| `--help` | Show help for command |

### `gh pr create`

Create a pull request

| Flag | 说明 |
|---|---|
| `-a, --assignee login` | Assign people by their login. Use "@me" to self-assign. |
| `--attach file` | Attach an image or video file, in '<file>#<image alt text>' format |
| `-B, --base branch` | The branch into which you want your code merged |
| `-b, --body string` | Body for the pull request |
| `-F, --body-file file` | Read body text from file (use "-" to read from standard input) |
| `-d, --draft` | Mark pull request as a draft |
| `--dry-run` | Print details instead of creating the PR. May still push git changes. |
| `-e, --editor` | Skip prompts and open the text editor to write the title and body in. The first line is the title and the remaining text is the body. |
| `-f, --fill` | Use commit info for title and body |
| `--fill-first` | Use first commit info for title and body |
| `--fill-verbose` | Use commits msg+body for description |
| `-H, --head branch` | The branch that contains commits for your pull request (default [current branch]) |
| `-l, --label name` | Add labels by name |
| `-m, --milestone name` | Add the pull request to a milestone by name |
| `--no-maintainer-edit` | Disable maintainer's ability to modify pull request |
| `-p, --project title` | Add the pull request to projects by title |
| `--recover string` | Recover input from a failed run of create |
| `-r, --reviewer handle` | Request reviews from people or teams by their handle |
| `-T, --template file` | Template file to use as starting body text |
| `-t, --title string` | Title for the pull request |
| `-w, --web` | Open the web browser to create a pull request |
| `--help` | Show help for command |

### `gh pr diff`

View changes in a pull request

| Flag | 说明 |
|---|---|
| `--allow-escape-sequences` | Allow printing terminal escape sequences |
| `--color string` | Use color in diff output: {always\|never\|auto} (default "auto") |
| `-e, --exclude patterns` | Exclude files matching glob patterns from the diff |
| `--name-only` | Display only names of changed files |
| `--patch` | Display diff in patch format |
| `-w, --web` | Open the pull request diff in the browser |
| `--help` | Show help for command |

### `gh pr edit`

Edit a pull request

| Flag | 说明 |
|---|---|
| `--add-assignee login` | Add assigned users by their login. Use "@me" to assign yourself, or "@copilot" to assign Copilot. |
| `--add-label name` | Add labels by name |
| `--add-project title` | Add the pull request to projects by title |
| `--add-reviewer login` | Add or re-request reviewers by their login. Use "@copilot" to request review from Copilot. |
| `--attach file` | Attach an image or video file, in '<file>#<image alt text>' format |
| `-B, --base branch` | Change the base branch for this pull request |
| `-b, --body string` | Set the new body. |
| `-F, --body-file file` | Read body text from file (use "-" to read from standard input) |
| `-m, --milestone name` | Edit the milestone the pull request belongs to by name |
| `--remove-assignee login` | Remove assigned users by their login. Use "@me" to unassign yourself, or "@copilot" to unassign Copilot. |
| `--remove-label name` | Remove labels by name |
| `--remove-milestone` | Remove the milestone association from the pull request |
| `--remove-project title` | Remove the pull request from projects by title |
| `--remove-reviewer login` | Remove reviewers by their login. Use "@copilot" to remove review request from Copilot. |
| `-t, --title string` | Set the new title. |
| `--help` | Show help for command |

### `gh pr list`

List pull requests in a repository

| Flag | 说明 |
|---|---|
| `--app string` | Filter by GitHub App author |
| `-a, --assignee string` | Filter by assignee |
| `-A, --author string` | Filter by author (use --app to filter by a GitHub App) |
| `-B, --base string` | Filter by base branch |
| `-d, --draft` | Filter by draft state |
| `-H, --head string` | Filter by head branch ("<owner>:<branch>" syntax not supported) |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `-l, --label strings` | Filter by label |
| `-L, --limit int` | Maximum number of items to fetch (default 30) |
| `-S, --search query` | Search pull requests with query |
| `-s, --state string` | Filter by state: {open\|closed\|merged\|all} (default "open") |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `-w, --web` | List pull requests in the web browser |
| `--help` | Show help for command |

### `gh pr lock`

Lock pull request conversation

| Flag | 说明 |
|---|---|
| `-r, --reason string` | Optional reason for locking conversation (off_topic, resolved, spam, too_heated). |
| `--help` | Show help for command |

### `gh pr merge`

Merge a pull request

| Flag | 说明 |
|---|---|
| `--admin` | Use administrator privileges to merge a pull request that does not meet requirements |
| `-A, --author-email text` | Email text for merge commit author |
| `--auto` | Automatically merge only after necessary requirements are met |
| `-b, --body text` | Body text for the merge commit |
| `-F, --body-file file` | Read body text from file (use "-" to read from standard input) |
| `-d, --delete-branch` | Delete the local and remote branch after merge |
| `--disable-auto` | Disable auto-merge for this pull request |
| `--match-head-commit SHA` | Commit SHA that the pull request head must match to allow merge |
| `-m, --merge` | Merge the commits with the base branch |
| `-r, --rebase` | Rebase the commits onto the base branch |
| `-s, --squash` | Squash the commits into one commit and merge it into the base branch |
| `-t, --subject text` | Subject text for the merge commit |
| `--help` | Show help for command |

### `gh pr ready`

Mark a pull request as ready for review

| Flag | 说明 |
|---|---|
| `--undo` | Convert a pull request to "draft" |
| `--help` | Show help for command |

### `gh pr reopen`

Reopen a pull request

| Flag | 说明 |
|---|---|
| `-c, --comment string` | Add a reopening comment |
| `--help` | Show help for command |

### `gh pr revert`

Revert a pull request

| Flag | 说明 |
|---|---|
| `-b, --body string` | Body for the revert pull request |
| `-F, --body-file file` | Read body text from file (use "-" to read from standard input) |
| `-d, --draft` | Mark revert pull request as a draft |
| `-t, --title string` | Title for the revert pull request |
| `--help` | Show help for command |

### `gh pr review`

Add a review to a pull request

| Flag | 说明 |
|---|---|
| `-a, --approve` | Approve pull request |
| `-b, --body string` | Specify the body of a review |
| `-F, --body-file file` | Read body text from file (use "-" to read from standard input) |
| `-c, --comment` | Comment on a pull request |
| `-r, --request-changes` | Request changes on a pull request |
| `--help` | Show help for command |

### `gh pr status`

Show status of relevant pull requests

| Flag | 说明 |
|---|---|
| `-c, --conflict-status` | Display the merge conflict status of each pull request |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--help` | Show help for command |

### `gh pr unlock`

Unlock pull request conversation

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh pr view`

View a pull request

| Flag | 说明 |
|---|---|
| `-c, --comments` | View pull request comments |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `-w, --web` | Open a pull request in the browser |
| `--help` | Show help for command |

### `gh preview`

Execute previews for gh features

**子命令**：`prompter`

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh preview prompter`

Execute a test program to preview the prompter

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh project`

Work with GitHub Projects.

**子命令**：`close` · `copy` · `create` · `delete` · `edit` · `field-create` · `field-delete` · `field-list` · `item-add` · `item-archive` · `item-create` · `item-delete` · `item-edit` · `item-list` · `link` · `list` · `unlink` · `view`

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh project close`

Close a project

| Flag | 说明 |
|---|---|
| `--format string` | Output format: {json} |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--owner string` | Login of the owner. Use "@me" for the current user. |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--undo` | Reopen a closed project |
| `--help` | Show help for command |

### `gh project copy`

Copy a project

| Flag | 说明 |
|---|---|
| `--drafts` | Include draft issues when copying |
| `--format string` | Output format: {json} |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--source-owner string` | Login of the source owner. Use "@me" for the current user. |
| `--target-owner string` | Login of the target owner. Use "@me" for the current user. |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--title string` | Title for the new project |
| `--help` | Show help for command |

### `gh project create`

Create a project

| Flag | 说明 |
|---|---|
| `--format string` | Output format: {json} |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--owner string` | Login of the owner. Use "@me" for the current user. |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--title string` | Title for the project |
| `--help` | Show help for command |

### `gh project delete`

Delete a project

| Flag | 说明 |
|---|---|
| `--format string` | Output format: {json} |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--owner string` | Login of the owner. Use "@me" for the current user. |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--help` | Show help for command |

### `gh project edit`

Edit a project

| Flag | 说明 |
|---|---|
| `-d, --description string` | New description of the project |
| `--format string` | Output format: {json} |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--owner string` | Login of the owner. Use "@me" for the current user. |
| `--readme string` | New readme for the project |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--title string` | New title for the project |
| `--visibility string` | Change project visibility: {PUBLIC\|PRIVATE} |
| `--help` | Show help for command |

### `gh project field-create`

Create a field in a project

| Flag | 说明 |
|---|---|
| `--data-type string` | DataType of the new field.: {TEXT\|SINGLE_SELECT\|DATE\|NUMBER} |
| `--format string` | Output format: {json} |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--name string` | Name of the new field |
| `--owner string` | Login of the owner. Use "@me" for the current user. |
| `--single-select-options strings` | Options for SINGLE_SELECT data type |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--help` | Show help for command |

### `gh project field-delete`

Delete a field in a project

| Flag | 说明 |
|---|---|
| `--format string` | Output format: {json} |
| `--id string` | ID of the field to delete |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--help` | Show help for command |

### `gh project field-list`

List the fields in a project

| Flag | 说明 |
|---|---|
| `--format string` | Output format: {json} |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `-L, --limit int` | Maximum number of fields to fetch (default 30) |
| `--owner string` | Login of the owner. Use "@me" for the current user. |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--help` | Show help for command |

### `gh project item-add`

Add a pull request or an issue to a project

| Flag | 说明 |
|---|---|
| `--format string` | Output format: {json} |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--owner string` | Login of the owner. Use "@me" for the current user. |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--url string` | URL of the issue or pull request to add to the project |
| `--help` | Show help for command |

### `gh project item-archive`

Archive an item in a project

| Flag | 说明 |
|---|---|
| `--format string` | Output format: {json} |
| `--id string` | ID of the item to archive |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--owner string` | Login of the owner. Use "@me" for the current user. |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--undo` | Unarchive an item |
| `--help` | Show help for command |

### `gh project item-create`

Create a draft issue item in a project

| Flag | 说明 |
|---|---|
| `--body string` | Body for the draft issue |
| `--format string` | Output format: {json} |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--owner string` | Login of the owner. Use "@me" for the current user. |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--title string` | Title for the draft issue |
| `--help` | Show help for command |

### `gh project item-delete`

Delete an item from a project by ID

| Flag | 说明 |
|---|---|
| `--format string` | Output format: {json} |
| `--id string` | ID of the item to delete |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--owner string` | Login of the owner. Use "@me" for the current user. |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--help` | Show help for command |

### `gh project item-edit`

Edit an item in a project

| Flag | 说明 |
|---|---|
| `--body string` | Body of the draft issue item |
| `--clear` | Remove field value |
| `--date string` | Date value for the field (YYYY-MM-DD) |
| `--field string` | Name of the field to update |
| `--field-id string` | ID of the field to update |
| `--format string` | Output format: {json} |
| `--id string` | ID of the item to edit |
| `--iteration-id string` | ID of the iteration value to set on the field |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--number float` | Number value for the field |
| `--owner string` | Login of the owner. Use "@me" for the current user. |
| `--project-id string` | ID of the project to which the field belongs to |
| `--single-select-option-id string` | ID of the single select option value to set on the field |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--text string` | Text value for the field |
| `--title string` | Title of the draft issue item |
| `--url string` | URL of the issue or pull request whose project item to edit |
| `--help` | Show help for command |

### `gh project item-list`

List the items in a project

| Flag | 说明 |
|---|---|
| `--field stringArray` | Name of a field to show as an extra column |
| `--field-id stringArray` | ID of a field to show as an extra column |
| `--format string` | Output format: {json} |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `-L, --limit int` | Maximum number of items to fetch (default 30) |
| `--owner string` | Login of the owner. Use "@me" for the current user |
| `--query string` | Filter items using the Projects filter syntax, e.g. "assignee:octocat -status:Done" |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--help` | Show help for command |

### `gh project link`

Link a project to a repository or a team

| Flag | 说明 |
|---|---|
| `--owner string` | Login of the owner. Use "@me" for the current user. |
| `-R, --repo string` | The repository to be linked to this project |
| `-T, --team string` | The team to be linked to this project |
| `--help` | Show help for command |

### `gh project list`

List the projects for an owner

| Flag | 说明 |
|---|---|
| `--closed` | Include closed projects |
| `--format string` | Output format: {json} |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `-L, --limit int` | Maximum number of projects to fetch (default 30) |
| `--owner string` | Login of the owner |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `-w, --web` | Open projects list in the browser |
| `--help` | Show help for command |

### `gh project unlink`

Unlink a project from a repository or a team

| Flag | 说明 |
|---|---|
| `--owner string` | Login of the owner. Use "@me" for the current user. |
| `-R, --repo string` | The repository to be unlinked from this project |
| `-T, --team string` | The team to be unlinked from this project |
| `--help` | Show help for command |

### `gh project view`

View a project

| Flag | 说明 |
|---|---|
| `--format string` | Output format: {json} |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--owner string` | Login of the owner. Use "@me" for the current user. |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `-w, --web` | Open a project in the browser |
| `--help` | Show help for command |

### `gh release`

Manage releases

**子命令**：`create` · `list` · `delete` · `delete-asset` · `download` · `edit` · `upload` · `verify` · `verify-asset` · `view`

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh release create`

Create a new release

| Flag | 说明 |
|---|---|
| `--discussion-category string` | Start a discussion in the specified category |
| `-d, --draft` | Save the release as a draft instead of publishing it |
| `--fail-on-no-commits` | Fail if there are no commits since the last release (no impact on the first release) |
| `--generate-notes` | Automatically generate title and notes for the release via GitHub Release Notes API |
| `--latest` | Mark this release as "Latest" (default [automatic based on date and version]). --latest=false to explicitly NOT set as latest |
| `-n, --notes string` | Release notes |
| `-F, --notes-file file` | Read release notes from file (use "-" to read from standard input) |
| `--notes-from-tag` | Fetch notes from the tag annotation or message of commit associated with tag |
| `--notes-start-tag string` | Tag to use as the starting point for generating release notes |
| `-p, --prerelease` | Mark the release as a prerelease |
| `--target branch` | Target branch or full commit SHA (default [main branch]) |
| `-t, --title string` | Release title |
| `--verify-tag` | Abort in case the git tag doesn't already exist in the remote repository |
| `--help` | Show help for command |

### `gh release delete`

Delete a release

| Flag | 说明 |
|---|---|
| `--cleanup-tag` | Delete the specified tag in addition to its release |
| `-y, --yes` | Skip the confirmation prompt |
| `--help` | Show help for command |

### `gh release delete-asset`

Delete an asset from a release

| Flag | 说明 |
|---|---|
| `-y, --yes` | Skip the confirmation prompt |
| `--help` | Show help for command |

### `gh release download`

Download release assets

| Flag | 说明 |
|---|---|
| `--allow-escape-sequences` | Allow printing terminal escape sequences when writing an asset to standard output |
| `-A, --archive format` | Download the source code archive in the specified format (zip or tar.gz) |
| `--clobber` | Overwrite existing files of the same name |
| `-D, --dir directory` | The directory to download files into (default ".") |
| `-O, --output file` | The file to write a single asset to (use "-" to write to standard output) |
| `-p, --pattern stringArray` | Download only assets that match a glob pattern |
| `--skip-existing` | Skip downloading when files of the same name exist |
| `--help` | Show help for command |

### `gh release edit`

Edit a release

| Flag | 说明 |
|---|---|
| `--discussion-category string` | Start a discussion in the specified category when publishing a draft |
| `--draft` | Save the release as a draft instead of publishing it |
| `--latest` | Explicitly mark the release as "Latest" |
| `-n, --notes string` | Release notes |
| `-F, --notes-file file` | Read release notes from file (use "-" to read from standard input) |
| `--prerelease` | Mark the release as a prerelease |
| `--tag string` | The name of the tag |
| `--target branch` | Target branch or full commit SHA (default [main branch]) |
| `-t, --title string` | Release title |
| `--verify-tag` | Abort in case the git tag doesn't already exist in the remote repository |
| `--help` | Show help for command |

### `gh release list`

List releases in a repository

| Flag | 说明 |
|---|---|
| `--exclude-drafts` | Exclude draft releases |
| `--exclude-pre-releases` | Exclude pre-releases |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `-L, --limit int` | Maximum number of items to fetch (default 30) |
| `-O, --order string` | Order of releases returned: {asc\|desc} (default "desc") |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--help` | Show help for command |

### `gh release upload`

Upload assets to a release

| Flag | 说明 |
|---|---|
| `--clobber` | Delete and re-upload existing assets of the same name |
| `--help` | Show help for command |

### `gh release verify`

Verify the attestation for a release

| Flag | 说明 |
|---|---|
| `--format string` | Output format: {json} |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--help` | Show help for command |

### `gh release verify-asset`

Verify that a given asset originated from a release

| Flag | 说明 |
|---|---|
| `--format string` | Output format: {json} |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--help` | Show help for command |

### `gh release view`

View information about a release

| Flag | 说明 |
|---|---|
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `-w, --web` | Open the release in the browser |
| `--help` | Show help for command |

### `gh repo`

Manage repositories

**子命令**：`create` · `list` · `archive` · `autolink` · `clone` · `delete` · `deploy-key` · `edit` · `fork` · `gitignore` · `license` · `read-dir` · `read-file` · `rename` · `set-default` · `sync` · `unarchive` · `view`

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh repo archive`

Archive a repository

| Flag | 说明 |
|---|---|
| `-y, --yes` | Skip the confirmation prompt |
| `--help` | Show help for command |

### `gh repo autolink`

Manage autolink references

**子命令**：`create` · `delete` · `list` · `view`

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh repo clone`

Clone a repository locally

| Flag | 说明 |
|---|---|
| `--no-upstream` | Do not add an upstream remote when cloning a fork |
| `-u, --upstream-remote-name string` | Upstream remote name when cloning a fork (default "upstream") |
| `--help` | Show help for command |

### `gh repo create`

Create a new repository

| Flag | 说明 |
|---|---|
| `--add-readme` | Add a README file to the new repository |
| `-c, --clone` | Clone the new repository to the current directory |
| `-d, --description string` | Description of the repository |
| `--disable-issues` | Disable issues in the new repository |
| `--disable-wiki` | Disable wiki in the new repository |
| `-g, --gitignore string` | Specify a gitignore template for the repository |
| `-h, --homepage URL` | Repository home page URL |
| `--include-all-branches` | Include all branches from template repository |
| `--internal` | Make the new repository internal |
| `-l, --license string` | Specify an Open Source License for the repository |
| `--private` | Make the new repository private |
| `--public` | Make the new repository public |
| `--push` | Push local commits to the new repository |
| `-r, --remote string` | Specify remote name for the new repository |
| `-s, --source string` | Specify path to local repository to use as source |
| `-t, --team name` | The name of the organization team to be granted access |
| `-p, --template repository` | Make the new repository based on a template repository |
| `--help` | Show help for command |

### `gh repo delete`

Delete a repository

| Flag | 说明 |
|---|---|
| `--yes` | Confirm deletion without prompting |
| `--help` | Show help for command |

### `gh repo deploy-key`

Manage deploy keys in a repository

**子命令**：`add` · `delete` · `list`

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh repo edit`

Edit repository settings

| Flag | 说明 |
|---|---|
| `--accept-visibility-change-consequences` | Accept the consequences of changing the repository visibility |
| `--add-topic strings` | Add repository topic |
| `--allow-forking` | Allow forking of an organization repository |
| `--allow-update-branch` | Allow a pull request head branch that is behind its base branch to be updated |
| `--default-branch name` | Set the default branch name for the repository |
| `--delete-branch-on-merge` | Delete head branch when pull requests are merged |
| `-d, --description string` | Description of the repository |
| `--enable-advanced-security` | Enable advanced security in the repository |
| `--enable-auto-merge` | Enable auto-merge functionality |
| `--enable-discussions` | Enable discussions in the repository |
| `--enable-issues` | Enable issues in the repository |
| `--enable-merge-commit` | Enable merging pull requests via merge commit |
| `--enable-projects` | Enable projects in the repository |
| `--enable-rebase-merge` | Enable merging pull requests via rebase |
| `--enable-secret-scanning` | Enable secret scanning in the repository |
| `--enable-secret-scanning-push-protection` | Enable secret scanning push protection in the repository. Secret scanning must be enabled first |
| `--enable-squash-merge` | Enable merging pull requests via squashed commit |
| `--enable-wiki` | Enable wiki in the repository |
| `-h, --homepage URL` | Repository home page URL |
| `--remove-topic strings` | Remove repository topic |
| `--squash-merge-commit-message string` | The default value for a squash merge commit message: {default\|pr-title\|pr-title-commits\|pr-title-description} |
| `--template` | Make the repository available as a template repository |
| `--visibility string` | Change the visibility of the repository to {public,private,internal} |
| `--help` | Show help for command |

### `gh repo fork`

Create a fork of a repository

| Flag | 说明 |
|---|---|
| `--clone` | Clone the fork |
| `--default-branch-only` | Only include the default branch in the fork |
| `--fork-name string` | Rename the forked repository |
| `--org string` | Create the fork in an organization |
| `--remote` | Add a git remote for the fork |
| `--remote-name string` | Specify the name for the new remote (default "origin") |
| `--help` | Show help for command |

### `gh repo gitignore`

List and view available repository gitignore templates

**子命令**：`list` · `view`

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh repo license`

Explore repository licenses

**子命令**：`list` · `view`

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh repo list`

List repositories owned by user or organization

| Flag | 说明 |
|---|---|
| `--archived` | Show only archived repositories |
| `--fork` | Show only forks |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `-l, --language string` | Filter by primary coding language |
| `-L, --limit int` | Maximum number of repositories to list (default 30) |
| `--no-archived` | Omit archived repositories |
| `--source` | Show only non-forks |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--topic strings` | Filter by topic |
| `--visibility string` | Filter by repository visibility: {public\|private\|internal} |
| `--help` | Show help for command |

### `gh repo read-dir`

List a directory in a repository (preview)

| Flag | 说明 |
|---|---|
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `--ref string` | The branch, tag, or commit to list from |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--help` | Show help for command |

### `gh repo read-file`

Read a file from a repository (preview)

| Flag | 说明 |
|---|---|
| `--allow-escape-sequences` | Allow printing terminal escape sequences |
| `--clobber` | Overwrite the output path if it already exists |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `-o, --output path` | Write the file to a path instead of stdout |
| `--ref string` | The branch, tag, or commit to read from |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--help` | Show help for command |

### `gh repo rename`

Rename a repository

| Flag | 说明 |
|---|---|
| `-y, --yes` | Skip the confirmation prompt |
| `--help` | Show help for command |

### `gh repo set-default`

Configure default repository for this directory

| Flag | 说明 |
|---|---|
| `-u, --unset` | Unset the current default repository |
| `-v, --view` | View the current default repository |
| `--help` | Show help for command |

### `gh repo sync`

Sync a repository

| Flag | 说明 |
|---|---|
| `-b, --branch string` | Branch to sync (default [default branch]) |
| `--force` | Hard reset the branch of the destination repository to match the source repository |
| `-s, --source string` | Source repository |
| `--help` | Show help for command |

### `gh repo unarchive`

Unarchive a repository

| Flag | 说明 |
|---|---|
| `-y, --yes` | Skip the confirmation prompt |
| `--help` | Show help for command |

### `gh repo view`

View a repository

| Flag | 说明 |
|---|---|
| `-b, --branch string` | View a specific branch of the repository |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `-w, --web` | Open a repository in the browser |
| `--help` | Show help for command |

### `gh ruleset`

View info about repo rulesets

**子命令**：`check` · `list` · `view`

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh ruleset check`

View rules that would apply to a given branch

| Flag | 说明 |
|---|---|
| `--default` | Check rules on default branch |
| `-w, --web` | Open the branch rules page in a web browser |
| `--help` | Show help for command |

### `gh ruleset list`

List rulesets for a repository or organization

| Flag | 说明 |
|---|---|
| `-L, --limit int` | Maximum number of rulesets to list (default 30) |
| `-o, --org string` | List organization-wide rulesets for the provided organization |
| `-p, --parents` | Whether to include rulesets configured at higher levels that also apply (default true) |
| `-w, --web` | Open the list of rulesets in the web browser |
| `--help` | Show help for command |

### `gh ruleset view`

View information about a ruleset

| Flag | 说明 |
|---|---|
| `-o, --org string` | Organization name if the provided ID is an organization-level ruleset |
| `-p, --parents` | Whether to include rulesets configured at higher levels that also apply (default true) |
| `-w, --web` | Open the ruleset in the browser |
| `--help` | Show help for command |

### `gh run`

View details about workflow runs

**子命令**：`cancel` · `delete` · `download` · `list` · `rerun` · `view` · `watch`

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh run cancel`

Cancel a workflow run

| Flag | 说明 |
|---|---|
| `--force` | Force cancel a workflow run |
| `--help` | Show help for command |

### `gh run delete`

Delete a workflow run

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh run download`

Download artifacts generated by a workflow run

| Flag | 说明 |
|---|---|
| `-D, --dir string` | The directory to download artifacts into (default ".") |
| `-n, --name stringArray` | Download artifacts that match any of the given names |
| `-p, --pattern stringArray` | Download artifacts that match a glob pattern |
| `--help` | Show help for command |

### `gh run list`

List recent workflow runs

| Flag | 说明 |
|---|---|
| `-a, --all` | Include disabled workflows |
| `-b, --branch string` | Filter runs by branch |
| `-c, --commit SHA` | Filter runs by the SHA of the commit |
| `--created date` | Filter runs by the date it was created |
| `-e, --event event` | Filter runs by which event triggered the run |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `-L, --limit int` | Maximum number of runs to fetch (default 20) |
| `-s, --status string` | Filter runs by status: {queued\|completed\|in_progress\|requested\|waiting\|pending\|action_required\|cancelled\|failure\|neutral\|skipped\|stale\|startup_failure\|success\|timed_out} |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `-u, --user string` | Filter runs by user who triggered the run |
| `-w, --workflow string` | Filter runs by workflow |
| `--help` | Show help for command |

### `gh run rerun`

Rerun a run

| Flag | 说明 |
|---|---|
| `-d, --debug` | Rerun with debug logging |
| `--failed` | Rerun only failed jobs, including dependencies |
| `-j, --job string` | Rerun a specific job ID from a run, including dependencies |
| `--help` | Show help for command |

### `gh run view`

View a summary of a workflow run

| Flag | 说明 |
|---|---|
| `-a, --attempt uint` | The attempt number of the workflow run |
| `--exit-status` | Exit with non-zero status if run failed |
| `-j, --job string` | View a specific job ID from a run |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `--log` | View full log for either a run or specific job |
| `--log-failed` | View the log for any failed steps in a run or specific job |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `-v, --verbose` | Show job steps |
| `-w, --web` | Open run in the browser |
| `--help` | Show help for command |

### `gh run watch`

Watch a run until it completes, showing its progress

| Flag | 说明 |
|---|---|
| `--compact` | Show only relevant/failed steps |
| `--exit-status` | Exit with non-zero status if run fails |
| `-i, --interval int` | Refresh interval in seconds (default 3) |
| `--help` | Show help for command |

### `gh search`

Search for repositories, issues, and pull requests

**子命令**：`code` · `commits` · `issues` · `prs` · `repos`

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh search code`

Search within code

| Flag | 说明 |
|---|---|
| `--extension string` | Filter on file extension |
| `--filename string` | Filter on filename |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `--language string` | Filter results by language |
| `-L, --limit int` | Maximum number of code results to fetch (default 30) |
| `--match strings` | Restrict search to file contents or file path: {file\|path} |
| `--owner strings` | Filter on owner |
| `--size string` | Filter on size range, in kilobytes |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `-w, --web` | Open the search query in the web browser |
| `--help` | Show help for command |

### `gh search commits`

Search for commits

| Flag | 说明 |
|---|---|
| `--author string` | Filter by author |
| `--author-date date` | Filter based on authored date |
| `--author-email string` | Filter on author email |
| `--author-name string` | Filter on author name |
| `--committer string` | Filter by committer |
| `--committer-date date` | Filter based on committed date |
| `--committer-email string` | Filter on committer email |
| `--committer-name string` | Filter on committer name |
| `--hash string` | Filter by commit hash |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `-L, --limit int` | Maximum number of commits to fetch (default 30) |
| `--merge` | Filter on merge commits |
| `--order string` | Order of commits returned, ignored unless '--sort' flag is specified: {asc\|desc} (default "desc") |
| `--owner strings` | Filter on repository owner |
| `--parent string` | Filter by parent hash |
| `--sort string` | Sort fetched commits: {author-date\|committer-date} (default "best-match") |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--tree string` | Filter by tree hash |
| `--visibility strings` | Filter based on repository visibility: {public\|private\|internal} |
| `-w, --web` | Open the search query in the web browser |
| `--help` | Show help for command |

### `gh search issues`

Search for issues

| Flag | 说明 |
|---|---|
| `--app string` | Filter by GitHub App author |
| `--archived` | Filter based on the repository archived state {true\|false} |
| `--assignee string` | Filter by assignee |
| `--author string` | Filter by author (use --app to filter by a GitHub App) |
| `--closed date` | Filter on closed at date |
| `--commenter user` | Filter based on comments by user |
| `--comments number` | Filter on number of comments |
| `--created date` | Filter based on created at date |
| `--include-prs` | Include pull requests in results |
| `--interactions number` | Filter on number of reactions and comments |
| `--involves user` | Filter based on involvement of user |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `--label strings` | Filter on label |
| `--language string` | Filter based on the coding language |
| `-L, --limit int` | Maximum number of results to fetch (default 30) |
| `--locked` | Filter on locked conversation status |
| `--match strings` | Restrict search to specific field of issue: {title\|body\|comments} |
| `--mentions user` | Filter based on user mentions |
| `--milestone title` | Filter by milestone title |
| `--no-assignee` | Filter on missing assignee |
| `--no-label` | Filter on missing label |
| `--no-milestone` | Filter on missing milestone |
| `--no-project` | Filter on missing project |
| `--order string` | Order of results returned, ignored unless '--sort' flag is specified: {asc\|desc} (default "desc") |
| `--owner strings` | Filter on repository owner |
| `--reactions number` | Filter on number of reactions |
| `--search-type string` | Type of issue search to perform: {lexical\|semantic\|hybrid} (default "lexical") |
| `--sort string` | Sort fetched results: {comments\|created\|interactions\|reactions\|reactions-+1\|reactions--1\|reactions-heart\|reactions-smile\|reactions-tada\|reactions-thinking_face\|updated} (default "best-match") |
| `--state string` | Filter based on state: {open\|closed} |
| `--team-mentions string` | Filter based on team mentions |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--updated date` | Filter on last updated at date |
| `--visibility strings` | Filter based on repository visibility: {public\|private\|internal} |
| `-w, --web` | Open the search query in the web browser |
| `--help` | Show help for command |

### `gh search prs`

Search for pull requests

| Flag | 说明 |
|---|---|
| `--app string` | Filter by GitHub App author |
| `--archived` | Filter based on the repository archived state {true\|false} |
| `--assignee string` | Filter by assignee |
| `--author string` | Filter by author (use --app to filter by a GitHub App) |
| `-B, --base string` | Filter on base branch name |
| `--checks string` | Filter based on status of the checks: {pending\|success\|failure} |
| `--closed date` | Filter on closed at date |
| `--commenter user` | Filter based on comments by user |
| `--comments number` | Filter on number of comments |
| `--created date` | Filter based on created at date |
| `--draft` | Filter based on draft state |
| `-H, --head string` | Filter on head branch name |
| `--interactions number` | Filter on number of reactions and comments |
| `--involves user` | Filter based on involvement of user |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `--label strings` | Filter on label |
| `--language string` | Filter based on the coding language |
| `-L, --limit int` | Maximum number of results to fetch (default 30) |
| `--locked` | Filter on locked conversation status |
| `--match strings` | Restrict search to specific field of issue: {title\|body\|comments} |
| `--mentions user` | Filter based on user mentions |
| `--merged` | Filter based on merged state |
| `--merged-at date` | Filter on merged at date |
| `--milestone title` | Filter by milestone title |
| `--no-assignee` | Filter on missing assignee |
| `--no-label` | Filter on missing label |
| `--no-milestone` | Filter on missing milestone |
| `--no-project` | Filter on missing project |
| `--order string` | Order of results returned, ignored unless '--sort' flag is specified: {asc\|desc} (default "desc") |
| `--owner strings` | Filter on repository owner |
| `--reactions number` | Filter on number of reactions |
| `--review string` | Filter based on review status: {none\|required\|approved\|changes_requested} |
| `--review-requested user` | Filter on user or team requested to review |
| `--reviewed-by user` | Filter on user who reviewed |
| `--sort string` | Sort fetched results: {comments\|reactions\|reactions-+1\|reactions--1\|reactions-smile\|reactions-thinking_face\|reactions-heart\|reactions-tada\|interactions\|created\|updated} (default "best-match") |
| `--state string` | Filter based on state: {open\|closed} |
| `--team-mentions string` | Filter based on team mentions |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--updated date` | Filter on last updated at date |
| `--visibility strings` | Filter based on repository visibility: {public\|private\|internal} |
| `-w, --web` | Open the search query in the web browser |
| `--help` | Show help for command |

### `gh search repos`

Search for repositories

| Flag | 说明 |
|---|---|
| `--archived` | Filter based on the repository archived state {true\|false} |
| `--created date` | Filter based on created at date |
| `--followers number` | Filter based on number of followers |
| `--forks number` | Filter on number of forks |
| `--good-first-issues number` | Filter on number of issues with the 'good first issue' label |
| `--help-wanted-issues number` | Filter on number of issues with the 'help wanted' label |
| `--include-forks string` | Include forks in fetched repositories: {false\|true\|only} |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `--language string` | Filter based on the coding language |
| `--license strings` | Filter based on license type |
| `-L, --limit int` | Maximum number of repositories to fetch (default 30) |
| `--match strings` | Restrict search to specific field of repository: {name\|description\|readme} |
| `--number-topics number` | Filter on number of topics |
| `--order string` | Order of repositories returned, ignored unless '--sort' flag is specified: {asc\|desc} (default "desc") |
| `--owner strings` | Filter on owner |
| `--size string` | Filter on a size range, in kilobytes |
| `--sort string` | Sort fetched repositories: {forks\|help-wanted-issues\|stars\|updated} (default "best-match") |
| `--stars number` | Filter on number of stars |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--topic strings` | Filter on topic |
| `--updated date` | Filter on last updated at date |
| `--visibility strings` | Filter based on visibility: {public\|private\|internal} |
| `-w, --web` | Open the search query in the web browser |
| `--help` | Show help for command |

### `gh secret`

Manage GitHub secrets

**子命令**：`delete` · `list` · `set`

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh secret delete`

Delete secrets

| Flag | 说明 |
|---|---|
| `-a, --app string` | Delete a secret for a specific application: {actions\|agents\|codespaces\|dependabot} |
| `-e, --env string` | Delete a secret for an environment |
| `-o, --org string` | Delete a secret for an organization |
| `-u, --user` | Delete a secret for your user |
| `--help` | Show help for command |

### `gh secret list`

List secrets

| Flag | 说明 |
|---|---|
| `-a, --app string` | List secrets for a specific application: {actions\|agents\|codespaces\|dependabot} |
| `-e, --env string` | List secrets for an environment |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `-o, --org string` | List secrets for an organization |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `-u, --user` | List a secret for your user |
| `--help` | Show help for command |

### `gh secret set`

Create or update secrets

| Flag | 说明 |
|---|---|
| `-a, --app string` | Set the application for a secret: {actions\|agents\|codespaces\|dependabot} |
| `-b, --body string` | The value for the secret (reads from standard input if not specified) |
| `-e, --env environment` | Set deployment environment secret |
| `-f, --env-file file` | Load secret names and values from a dotenv-formatted file |
| `--no-repos-selected` | No repositories can access the organization secret |
| `--no-store` | Print the encrypted, base64-encoded value instead of storing it on GitHub |
| `-o, --org organization` | Set organization secret |
| `-r, --repos repositories` | List of repositories that can access an organization or user secret |
| `-u, --user` | Set a secret for your user |
| `-v, --visibility string` | Set visibility for an organization secret: {all\|private\|selected} (default "private") |
| `--help` | Show help for command |

### `gh skill`

Install and manage agent skills (preview)

**子命令**：`install` · `list` · `preview` · `publish` · `search` · `update`

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh skill install`

Install agent skills from a GitHub repository (preview)

| Flag | 说明 |
|---|---|
| `--agent string` | Target agent (see supported values above) |
| `--all` | Install all skills without prompting for skill selection |
| `--allow-hidden-dirs` | Include skills in hidden directories (e.g. .claude/skills/, .agents/skills/) |
| `--dir string` | Install to a custom directory (overrides --agent and --scope) |
| `-f, --force` | Overwrite existing skills without prompting |
| `--from-local` | Treat the argument as a local directory path instead of a repository |
| `--pin string` | Pin to a specific git tag or commit SHA |
| `--scope string` | Installation scope: {project\|user} (default "project") |
| `--upstream` | Install from the upstream source when a re-published skill is detected |
| `--help` | Show help for command |

### `gh skill list`

List installed skills (preview)

| Flag | 说明 |
|---|---|
| `--agent string` | Filter by target agent: {github-copilot\|claude-code\|cursor\|codex\|gemini-cli\|antigravity\|antigravity-cli\|antigravity2.0\|adal\|amp\|augment\|bob\|cline\|codebuddy\|command-code\|continue\|cortex\|crush\|deepagents\|devin\|droid\|firebender\|goose\|grok\|iflow-cli\|junie\|kilo\|kimi-cli\|kiro-cli\|kode\|mcpjam\|mistral-vibe\|mux\|neovate\|openclaw\|opencode\|openhands\|pi\|pochi\|qoder\|qwen-code\|replit\|roo\|trae\|trae-cn\|universal\|warp\|zencoder} |
| `--dir string` | Scan a custom directory for installed skills |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `--scope string` | Filter by installation scope: {project\|user} |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--help` | Show help for command |

### `gh skill preview`

Preview a skill from a GitHub repository (preview)

| Flag | 说明 |
|---|---|
| `--allow-hidden-dirs` | Include skills in hidden directories (e.g. .claude/skills/, .agents/skills/) |
| `--help` | Show help for command |

### `gh skill publish`

Validate and publish skills to a GitHub repository (preview)

| Flag | 说明 |
|---|---|
| `--dry-run` | Validate without publishing |
| `--fix` | Auto-fix issues where possible without publishing (e.g. strip install metadata) |
| `--tag string` | Version tag for the release (e.g. v1.0.0) |
| `--help` | Show help for command |

### `gh skill search`

Search for skills across GitHub (preview)

| Flag | 说明 |
|---|---|
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `-L, --limit int` | Maximum number of results per page (default 15) |
| `--owner string` | Filter results to a specific GitHub user or organization |
| `--page int` | Page number of results to fetch (default 1) |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--help` | Show help for command |

### `gh skill update`

Update installed skills to their latest versions (preview)

| Flag | 说明 |
|---|---|
| `--all` | Update all skills without prompting |
| `--dir string` | Scan a custom directory for installed skills |
| `--dry-run` | Report available updates without modifying files |
| `--force` | Re-download even if already up to date |
| `--unpin` | Clear pinned version and include pinned skills in update |
| `--help` | Show help for command |

### `gh ssh-key`

Manage SSH keys

**子命令**：`add` · `delete` · `list`

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh ssh-key add`

Add an SSH key to your GitHub account

| Flag | 说明 |
|---|---|
| `-t, --title string` | Title for the new key |
| `--type string` | Type of the ssh key: {authentication\|signing} (default "authentication") |
| `--help` | Show help for command |

### `gh ssh-key delete`

Delete an SSH key from your GitHub account

| Flag | 说明 |
|---|---|
| `-y, --yes` | Skip the confirmation prompt |
| `--help` | Show help for command |

### `gh ssh-key list`

Lists SSH keys in your GitHub account

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh status`

Print information about relevant issues, pull requests, and notifications across repositories

| Flag | 说明 |
|---|---|
| `-e, --exclude strings` | Comma separated list of repos to exclude in owner/name format |
| `-o, --org string` | Report status within an organization |
| `--help` | Show help for command |

### `gh variable`

Manage GitHub Actions variables

**子命令**：`delete` · `get` · `list` · `set`

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh variable delete`

Delete variables

| Flag | 说明 |
|---|---|
| `-e, --env string` | Delete a variable for an environment |
| `-o, --org string` | Delete a variable for an organization |
| `--help` | Show help for command |

### `gh variable get`

Get variables

| Flag | 说明 |
|---|---|
| `-e, --env string` | Get a variable for an environment |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `-o, --org string` | Get a variable for an organization |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--help` | Show help for command |

### `gh variable list`

List variables

| Flag | 说明 |
|---|---|
| `-e, --env string` | List variables for an environment |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `-o, --org string` | List variables for an organization |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--help` | Show help for command |

### `gh variable set`

Create or update variables

| Flag | 说明 |
|---|---|
| `-b, --body string` | The value for the variable (reads from standard input if not specified) |
| `-e, --env environment` | Set deployment environment variable |
| `-f, --env-file file` | Load variable names and values from a dotenv-formatted file |
| `-o, --org organization` | Set organization variable |
| `-r, --repos repositories` | List of repositories that can access an organization variable |
| `-v, --visibility string` | Set visibility for an organization variable: {all\|private\|selected} (default "private") |
| `--help` | Show help for command |

### `gh workflow`

View details about GitHub Actions workflows

**子命令**：`disable` · `enable` · `list` · `run` · `view`

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh workflow disable`

Disable a workflow

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh workflow enable`

Enable a workflow

| Flag | 说明 |
|---|---|
| `--help` | Show help for command |

### `gh workflow list`

List workflows

| Flag | 说明 |
|---|---|
| `-a, --all` | Include disabled workflows |
| `-q, --jq expression` | Filter JSON output using a jq expression |
| `--json fields` | Output JSON with the specified fields |
| `-L, --limit int` | Maximum number of workflows to fetch (default 50) |
| `-t, --template string` | Format JSON output using a Go template; see "gh help formatting" |
| `--help` | Show help for command |

### `gh workflow run`

Run a workflow by creating a workflow_dispatch event

| Flag | 说明 |
|---|---|
| `--json` | Read workflow inputs as JSON via STDIN |
| `-r, --ref string` | Branch or tag name which contains the version of the workflow file you'd like to run |
| `--help` | Show help for command |

### `gh workflow view`

View the summary of a workflow

| Flag | 说明 |
|---|---|
| `-r, --ref string` | The branch or tag name which contains the version of the workflow file you'd like to view |
| `-w, --web` | Open workflow in the browser |
| `-y, --yaml` | View the workflow yaml file |
| `--help` | Show help for command |

## 官方 Agent 使用规则

> 摘自官方 SKILL.md：`~/Documents/Cli总结/.cache/src/github-cli-docs/skills/gh/SKILL.md`（留档于 `vendor/SKILL.md`）。这是厂商对 Agent 的约定，优先于一般经验。

**官方定位**：Patterns for invoking the GitHub CLI (gh) from agents. Covers structured output, pagination, repo targeting, search vs list, gh api fallback.

### Interactivity policy

`gh` already does the right thing in non-TTY contexts: it skips the pager,
strips ANSI color, and errors out fast with a helpful message instead of
prompting (e.g. `must provide --title and --body when not running interactively`).
You don't need to defensively set `GH_PAGER` or pass `--no-pager` (no such
flag exists).

### Parsing JSON

Human output from `gh` is column-formatted. If you want structured data:

- Add `--json field1,field2,...` for structured output.
- Run a command with `--json` and **no field list** to print the full set of
  available fields, then pick what you need.
- Use `--jq '<expr>'` for filtering without piping through a separate `jq`.
- Use `--template '<go-template>'` (alongside `--json`) when you want shaped
  text output. Note that `--template`/`-T` collides with a body-template flag
  on a few commands (e.g. `gh pr create -T`, `gh issue create -T`); always
  check `--help` before assuming which one you're hitting.

### Pagination and silent truncation

List commands cap results.

- `gh issue list`, `gh pr list`, `gh search ...`: pass `-L N` (`--limit N`).
  The default is usually 30.
- `gh issue list` / `gh pr list` do not expose aggregate totals like
  `totalCount` via `--json`. If you need a true total, use `gh api graphql`
  to query `totalCount`; otherwise, treat `-L` as the cap for the current call.
- For raw API calls use `gh api --paginate <path>`. Combine with
  `--jq` and (optionally) `--slurp` to assemble one array.

### Repo targeting

`gh` infers the repo from the cwd's git remotes. 

Pass `--repo OWNER/REPO` (`-R`) to override the resolved CWD repo.

### Search vs list

- `gh search issues|prs|code|repos|commits|users` uses GitHub's search
  index and accepts the full search syntax (`is:open`, `author:`,
  `label:`, `repo:owner/name`, `in:title`, ...). Pass each qualifier as
  its own bare token, not as one quoted string:
  `gh search issues repo:cli/cli is:open author:monalisa` works, but
  `gh search issues "repo:cli/cli is:open"` is treated as a single keyword (parsed as `repo:"cli/cli is:open"`)
  and fails with `Invalid search query`. Quote only multi-word free text
  (`gh search issues "broken feature"`). Most qualifiers also have a
  dedicated flag (`--repo`, `--author`, `--label`, ...). Prefer search for
  anything cross-repo or filtered by author/label.
- `gh issue list --search "..."` and `gh pr list --search "..."` take the
  query as one quoted string (it is a flag value) and are scoped to one repo.
- Bots author as GitHub Apps, so `--author dependabot` matches nothing. Use
  `--app dependabot` (on `pr`/`issue list` and `search prs|issues`; expands
  to `author:app/<slug>`) or `--author "dependabot[bot]"`.
- `gh search issues` also takes `--search-type <lexical|semantic|hybrid>`
  (github.com/GHEC only, issues only): use `semantic` when the user describes a
  problem in natural language rather than exact terms, and `hybrid` to blend
  keyword and semantic ranking; `lexical` (default) is exact matching.

### Issue types, sub-issues, and relationships

Newer `gh issue` subcommands model issue types, sub-issue hierarchy, and
blocked-by/blocking relationships.

- `gh issue create`: `--type <name>`, `--parent <number|url>` (creates the
  new issue as a sub-issue), `--blocked-by <number|url,...>`, `--blocking <number|url,...>`.
- `gh issue edit` (edits one or more issues in the same repo, e.g.
  `gh issue edit 23 34`): `--type <name>` / `--remove-type`,
  `--parent <n|url>` / `--remove-parent`,
  `--add-sub-issue <n,n>` / `--remove-sub-issue <n,n>`,
  `--add-blocked-by <n,n>` / `--remove-blocked-by <n,n>`,
  `--add-blocking <n,n>` / `--remove-blocking <n,n>`. Relationship and parent
  refs are issue numbers or URLs; a URL may point to another repo on the same
  host, but a different host is rejected. `--add-sub-issue` cannot be used
  when editing more than one issue.
- `gh issue list --type <name>` filters by issue type.
- `gh issue view` and `gh issue list` accept these as `--json` fields (prefer
  them over scraping the default text output): `issueType`, `parent`,
  `subIssues`, `subIssuesSummary`, `blockedBy`, `blocking`. `subIssues`,
  `blockedBy`, and `blocking` are objects shaped
  `{"nodes": [...], "totalCount": N}` (not flat arrays), and `nodes` is capped
  (`subIssues` at 100, `blockedBy`/`blocking` at 50), so compare the node count
  against `totalCount` to detect truncation.
- GHES: issue types and sub-issues need 3.17+; blocked-by/blocking
  relationships need 3.19+.

### Attaching images and videos

`--attach <path>` is available on `gh issue create`, `gh issue edit`,
`gh issue comment`, `gh pr create`, `gh pr edit`, and `gh pr comment`.

- Repeat `--attach` to upload multiple files:
  `gh issue comment 12 --attach ./before.png --attach ./after.png`.
- Each command invocation accepts at most 50 `--attach` values total across
  images and videos.
- Supported files are `png`, `jpg`, `jpeg`, `gif`, `webp`, `svg`, `mp4`,
  `mov`, and `webm`.
- For an image, append alt text to the path after `#`. Quote the value so the
  shell does not treat `#` as a comment:
  `gh pr create --attach './login.png#The login error state'`. Without alt
  text, the filename is used.
- `--attach` paths and local Markdown destinations may be absolute or relative
  to the directory where `gh` runs.
- If the body references an attached path, `gh` rewrites that Markdown
  reference to the uploaded URL. The reference keeps its existing alt text.
  Otherwise, `gh` appends the attachment to the body. For example:
  `gh pr edit 23 --body '![error](./login.png)' --attach ./login.png`.
- Videos cannot take alt text. A standalone `![recording](./repro.mp4)` becomes
  a bare player URL, while an inline video image becomes a link. A
  reference-style video image such as `![recording][clip]` with
  `[clip]: ./repro.mp4` is rejected; use a reference-style link instead.
- `gh issue create` and `gh pr create`: `--attach` cannot be used with
  `--web`. `gh pr create --attach` also cannot be used with `--dry-run`.
- `gh issue edit`: `--attach` can edit only one issue at a time.
- `gh issue comment` and `gh pr comment`: `--attach` cannot be used with
  `--web` or `--delete-last`. It works alone, with `--edit-last`, or with one
  of `--body`, `--body-file`, or `--editor`.
- Uploads require GitHub.com or a GHE.com tenant, an OAuth token, classic PAT,
  or fine-grained PAT, and `WRITE`, `MAINTAIN`, or `ADMIN` repository
  permission. GitHub Enterprise Server and GitHub App tokens are unsupported.
- Uploads stop at the first failure. If earlier files uploaded, `gh` still
  writes those attachments and exits non-zero. Create and edit commands also
  print the issue or pull request URL.

### Discussions (`gh discussion`)

Preview command set, subject to change. Subcommands:

- `gh discussion list [--state open|closed|all] [--category <name>] [--author <handle>] [--label <name>,...] [--answered] [--search <query>] [--sort created|updated] [--order asc|desc] [--limit N] [--after <cursor>] [--json <fields>] [--web]`
  lists a repo's discussions. `--state` defaults to open, `--sort` to updated,
  `--order` to desc. `--answered` is tri-state (`--answered=false` for
  unanswered) for Q&A categories.
- `gh discussion view {<number>|<url>|<comment-id>|<comment-url>} [--comments] [--order oldest|newest] [--limit N] [--after <cursor>] [--json <fields>] [--web]`
  shows a discussion's body; add `--comments` for its comments, or pass a
  comment ID/URL as the argument to list that comment's replies (no
  `--replies` flag; `--comments` is rejected with a comment argument).
  `--order` (default newest), `--limit`, and `--after` apply only to comment
  and reply listings.
- `gh discussion create [--title <t>] [--body <b> | --body-file <path>] [--category <name>] [--label <name>,...]`
  creates a discussion. `--title`, a body (`--body` or `--body-file`), and
  `--category` are required non-interactively; omitting any will prompt on a
  terminal.
- `gh discussion edit {<number>|<url>} [--title <t>] [--body <b>] [--body-file <path>] [--category <name>] [--add-label <name>,...] [--remove-label <name>,...]`
  edits title, body, category, or labels.
- `gh discussion comment {<number>|<discussion-url>|<comment-id>|<comment-url>} [--body <b>] [--body-file <path>] [--edit] [--delete] [--yes]`
  adds a top-level comment (when given a discussion) or a reply (when given a
  comment); `--edit` or `--delete` updates or removes a comment/reply and
  needs a comment ID or URL. `--yes` skips the `--delete` confirmation.
- `--json`/`--jq`/`--template` are available on `list` and `view` only;
  `create` and `edit` print the discussion URL. `comment` prints the discussion comment (or reply) URL.

### Reading files and directories (`gh repo read-file` / `read-dir`)

Preview commands, subject to change. They read a repo's contents over the API
without cloning, and honor `--repo OWNER/REPO` (`-R`) and `--ref <branch|tag|commit>`
(default branch when omitted).

- `gh repo read-file <path> [--ref <ref>] [--output <path> [--clobber]] [--allow-escape-sequences] [--json <fields>] [--jq <expr>]`
  prints a file's contents. In non-TTY contexts the raw bytes go straight to
  stdout (pipe-friendly); binary files are written as-is when piped but are
  refused on a TTY. By default, a file containing terminal escape sequences is
  refused; pass `--allow-escape-sequences` to read it anyway. `--output <path>` (`-o`) writes to
  disk instead of stdout (a trailing slash writes under a directory using the
  remote file name; `--clobber` allows overwrite); writing to disk always
  includes the raw bytes regardless of escape sequences. `--output` and `--json` are
  mutually exclusive. `--json` fields include `name`, `path`, `gitSHA`, `size`,
  `type`, `encoding`, and `content` (base64 encoded).
- `gh repo read-dir [<path>] [--ref <ref>] [--json <fields>] [--jq <expr>]`
  lists a directory; with no path it lists the repo root. Non-TTY output is tab
  separated as type, name, octal mode, and byte size. `--json` fields include
  `name`, `path`, `type`, `gitType`, `mode`, `modeOctal`, `gitSHA`, `size`, and
  `submodule`. A path pointing at a file errors and points you at `read-file`
  (and vice versa).

### Fall back to `gh api` for anything `--json` doesn't expose

Sometimes useful data isn't on the typed commands. Examples:

- Review-thread comments on a PR: `gh api repos/{owner}/{repo}/pulls/{n}/comments`
  (the `--comments` flag on `gh pr view` shows issue-level comments only).
- Arbitrary GraphQL: `gh api graphql -f query='...' -F var=value`.
- REST shortcuts: `gh api repos/{owner}/{repo}/...` - note the
  `{owner}/{repo}` placeholder is filled in for you when run from a repo
  with detected remotes; pass them literally if you want determinism.

### Authentication

- `gh auth status` prints the active host(s), user, and which env var (if
  any) is being honored.
- `gh auth status --json` is supported.

### Other notes

- `gh pr checkout <n>` switches branches. Use `gh pr diff <n>` or
  `gh pr view <n>` if you only need to read.
- `gh pr checkout <n> --worktree <path>` checks the PR out into a git worktree
  at `<path>` instead of switching the current branch.
- `gh issue develop <n> --checkout` creates a linked branch for the issue and
  checks it out. Add `--worktree <path>` to check that branch out into a git
  worktree at `<path>` instead of switching the current branch;
  `--worktree` requires `--checkout`, cannot be blank, and cannot be combined
  with `--list`.
- `NO_COLOR`, `CLICOLOR_FORCE`, and `GH_FORCE_TTY` are honored. Set
  `GH_FORCE_TTY=1` if you want TTY-style output (colors, tables, the
  pager, interactivity) inside an agent harness; leave it unset unless needed.
