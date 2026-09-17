# CLI 能力库

把厂商提供的 **SaaS 能力型 CLI** 的能力面，提前固化成本地文档。

> Agent 每次要用某个 CLI 都得现翻一遍 `--help`。查完为什么不留下来？下次直接命中。

[索引页（可视化）](docs/index.html) · [总索引](INDEX.md) · [机器可读索引](index.json) · [Agent 接入说明](AGENTS.md) · [贡献指南](CONTRIBUTING.md)

---

## 它解决什么问题

Agent 用命令行工具时的典型失败模式有两种：

1. **不知道这个 CLI 能干什么** —— 只能反复翻 `--help`，翻了就忘，下次再翻。
2. **凭印象编命令** —— 猜一个看起来对的子命令和参数，跑失败，再猜。

根因是「能力面」没有沉淀成可查的资产。这个仓库就是那层资产：

- **给人看**：`docs/index.html`（带搜索）、`INDEX.md`
- **给 AI 查**：`registry/<名字>/CAPABILITY.md`（单文件自带全部命令 + 全局约定 + 厂商规则）
- **给程序读**：`index.json`、`registry/<名字>/capability.json`

---

## 收录范围

**只收**厂商提供的能力型 CLI —— 这类工具能力面大、有账号体系、调用有副作用，
且 `--help` 之外往往还有官方写给 Agent 的规则，值得固化下来反复查。

**不收**系统自带工具与通用包管理器（`git` / `curl` / `sqlite3` / `brew` / `npm` / `docker`）。
那些现查 `help` 足够便宜，存进来只是噪声。

---

## 当前收录

| CLI | 能干什么 | 规模 | 采集方式 |
|---|---|---|---|
| [`feishu-cli`](registry/feishu-cli/CAPABILITY.md) | 飞书 / Lark 全能力：消息、日历、文档、多维表格、任务、审批、考勤… | 23 个业务域 · 343 个快捷命令 · 120 个 API 方法 | 仓库 skill 文档 |
| [`wecom-cli`](registry/wecom-cli/CAPABILITY.md) | 企业微信：消息、邮件、在线文档、智能表格、待办、日程、会议、微盘、通讯录 | 12 个业务域 · 93 条命令 | 仓库 skill 文档 |
| [`wps365-cli`](registry/wps365-cli/CAPABILITY.md) | WPS 365：日历、消息、通讯录、邮箱、云文档、智能文档、智能表格、多维表、会议 | 200 个命令节点 | release 二进制 help 全树 |
| [`dreamina`](registry/dreamina/CAPABILITY.md) | 即梦 AIGC：文生图 / 图生图 / 文生视频 / 图生视频 / 多模态参考 | 23 个命令节点 | 本机 CLI help + 官方 SKILL.md |

**采集方式很重要**，它决定了这份快照能信多少 —— 见 [AGENTS.md 的说明](AGENTS.md#怎么读采集方式它决定你能信多少)。

---

## 三种用法

### ① 只是想查某个 CLI 能干什么 —— 什么都不用装

直接在 GitHub 上读：`INDEX.md` 的「按需求找方案」表，以及
`registry/<名字>/CAPABILITY.md`。快照都入库了，不 clone 也能看。

### ② 想让自己的 Agent 每次都先来查 —— clone 一次，装一次 skill（推荐）

```bash
git clone https://github.com/PoryfForge/Cli.git && cd Cli
bin/install-skill
```

`bin/install-skill` 会探测本机装了哪个 Agent，把 `skills/cli-capability-lookup/`
装进对应的 skills 目录（WorkBuddy 是 `~/.workbuddy/skills/`，Claude Code 是
`~/.claude/skills/`），**并把里面的路径换成你的 clone 位置** —— 所以仓库放哪儿都行。

```bash
bin/install-skill --list                    # 看探测到哪些 Agent 目录
bin/install-skill --target claude           # 显式指定目标
bin/install-skill --target ./my-agent/skills  # 或直接给路径
bin/install-skill --dry-run                 # 只看会做什么
bin/install-skill --uninstall               # 移除
```

装完之后，Agent 遇到飞书 / 企业微信 / WPS 365 / 即梦 相关任务时会**先查库**，
而不是现翻 `--help`、更不是凭印象编命令。想验证：新开一个会话，问「飞书 CLI 能干什么」。

> 用 **Codex** 这类读 `AGENTS.md` 的 Agent：库根的 `AGENTS.md` 就是写给它的 ——
> 把本仓库作为工作目录的上下文即可；或把 `AGENTS.md` 的内容并进你的全局指令文件。

> **注意：本库只放「能力面文档」，不含 CLI 本体。** 真要调飞书 / 企业微信 / WPS 365 /
> 即梦，你得自己装那些 CLI 并完成授权（本库的采集器会把它们临时拉到 `.cache/` 里跑
> `--help`，但**不会**写进你的 `PATH`、也不碰你的账号配置）。
> 本库负责让你和你的 Agent 知道「它有什么、该怎么调」，不代替它们运行。
> 另外 `bin/` 下的脚本需要 Node.js ≥ 18 —— 只想查文档的话不需要任何环境。

### ③ 当成程序的数据源 —— 读结构化文件，别解析 markdown

| 文件 | 内容 |
|---|---|
| `index.json` | 全部 CLI 的索引：各业务域计数、采集方式、能力文档路径 |
| `registry/<名字>/capability.json` | 单个 CLI 的完整能力树（域 → 命令 → 参数） |
| `registry/<名字>/capability.meta.json` | 快照元数据：版本、commit、采集时间 |
| `routes.json` | 中文意图路由表：「想做什么 → 用哪条命令」 |

---

## 快速开始

```bash
git clone https://github.com/PoryfForge/Cli.git && cd Cli

bin/install-skill                         # 接进你的 Agent（见上文第 ② 种用法）

bin/cli-cap list                          # 看收录了什么
bin/cli-cap search 日程                    # 不知道用哪个 CLI 时先跨库搜
bin/cli-cap show wecom-cli 待办             # 在某个 CLI 的能力面里搜
open docs/index.html                      # 可视化索引，带搜索
```

### 刷新（CLI 升级后）

能力面会随厂商版本变化。全部刷新：

```bash
bin/refresh                 # 重新采集全部 CLI + 重建索引
bin/refresh wecom-cli       # 只刷一个
bin/refresh --list          # 看清单里有什么
npm test                    # 清单体检 + 渲染契约 + 检索测试
```

刷新只需要 Node.js ≥ 18，**无第三方依赖**（只用 Node 内置模块 + 系统 `tar` / `unzip`）。

---

## 怎么加一个新 CLI

**只改一个文件**：往 [`clis.json`](clis.json) 加一条记录，然后跑 `bin/refresh <名字>`。
脚本本身不用动。

先判断能力从哪来：

```
「这个 CLI 的能力面，--help 能完整列出来吗？」

├─ 能 → acquire.kind = "release-bin"（或 "local-bin"，若厂商安装器已装进 PATH）
│        profile = "help-tree"，不用写代码
│
└─ 不能 → 仓库里有 skills/*/SKILL.md 吗？
          ├─ 有 → acquire.kind = "skill-repo"，写一个 profiles/<名字>.js
          └─ 没有（靠服务端/CDN 下发）→ 取一份 release 装本地跑 help，
                                        并把「文档未覆盖的部分」在快照里写明
```

解析档只负责「把厂商文档解析成统一的能力模型」，**渲染由 `lib/capmodel.js` 统一完成** ——
所以新加的 CLI 产出的文档形态天然和已有的对齐。完整步骤与字段说明见
[CONTRIBUTING.md](CONTRIBUTING.md)。

---

## 目录结构

```
.
├── INDEX.md               # 总索引：路由表 + CLI 清单
├── index.json             # 同一份索引的机器可读版本
├── AGENTS.md              # 给 AI Agent 的接入说明（含各 CLI 硬性规则）
├── CONTRIBUTING.md        # 怎么加一个 CLI
├── clis.json              # 收录清单（唯一需要手工维护的配置）
├── routes.json            # 「想做什么 → 用哪条命令」的中文意图路由表
├── bin/
│   ├── cli-cap            # scan / list / index / search / show / remember
│   ├── skill-digest       # 按清单采集
│   ├── refresh            # 一键刷新
│   └── install-skill      # 把 skills/ 装进你本机的 Agent 目录
├── skills/                # 给 Agent 的 skill 模板（含路径占位符，安装时填入）
│   └── cli-capability-lookup/
├── lib/
│   ├── capmodel.js        # 统一能力模型 → 统一渲染
│   └── fetchsource.js     # 取源（源码 / release 二进制）
├── profiles/              # 各 CLI 的解析档
├── registry/<名字>/       # 能力快照（CAPABILITY.md / capability.json / raw/ / vendor/）
├── docs/index.html        # 可视化索引
└── tests/                 # 测试
```

---

## 设计取舍

**为什么有 `clis.json` 而不是把配置写在脚本里？**
「加一个 CLI」和「写采集代码」是两种不同的活。清单把前者变成纯配置，
所以这个库能靠 PR 长大，而不需要每个贡献者都读懂采集流程。

**为什么解析档和渲染层分开？**
飞书 CLI 把命令写在 `+快捷命令` 表格里，企业微信 CLI 写在 bash 代码块里，
WPS 直接编译进二进制 —— 采集方式注定无法统一。但**产出文档的形态必须统一**，
否则 Agent 每查一个 CLI 就要重新适应一份排版。所以：解析各写各的，渲染只有一份。

**为什么描述宁可留空？**
「给 AI 的错误信息比缺失信息危险得多。」取不到可靠描述时留空，
Agent 会去跑 `--help`；填错了，Agent 会照错的做。

**采集器的红线**
只执行 `<cmd> --help` / `-h` / `help` / `--version`。不安装、不改用户环境、
不执行任何会改远端状态或消耗配额的命令。`release-bin` 只把可执行文件解到 `.cache/`，
不写入 `PATH`。

---

## 已知限制

- 源码按分支拉取，靠 `meta.commit` 记录采集时的提交；要严格可复现请把 `ref` 换成 tag。
- 动态命令树（服务端 discovery）无法离线穷举，快照只覆盖官方文档写明的部分。
- `release-bin` 按当前机器平台取二进制，跨平台命令树一般一致，但平台独有命令需在对应平台刷新。

## 许可证

脚本与文档：MIT。`registry/` 下的能力快照派生自各厂商公开仓库，版权归各厂商所有，
来源与许可证见 [LICENSE](LICENSE)。
