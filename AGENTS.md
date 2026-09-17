# AGENTS.md

给 AI Agent（Codex / Claude Code / WorkBuddy 等）读的接入说明。

---

## 这是什么

一个 **CLI 能力库**：把厂商 SaaS 能力型 CLI 的能力面，提前固化成本地文档。

要解决的具体问题：Agent 不知道某个 CLI 到底能做什么，于是每次现场翻 `--help`、翻不到就凭印象编命令。
查完一次就该存下来 —— 这里就是「存下来」的地方。

**收录范围**：厂商提供的 SaaS 能力型 CLI（飞书 / 企业微信 / WPS 365 / 即梦）。
系统自带工具（`git` / `curl`）、包管理器（`brew` / `npm`）、数据库客户端**不在范围内**。

> **想让 Agent 自动来查，而不是每次靠人提醒？**
> 跑一次 `bin/install-skill`，它会把 `skills/cli-capability-lookup/` 装进本机的
> Agent skills 目录（`~/.workbuddy/skills/` 或 `~/.claude/skills/`），
> **并把本库的绝对路径写进去** —— 所以仓库 clone 到哪儿都行。
> `--list` 看探测结果，`--dry-run` 预演，`--uninstall` 移除。

---

## 动手前的强制流程

需要调用库里的 CLI 时，按这个顺序做，**不要跳步**：

### 1. 查索引

两个等价入口，按读取习惯选一个：

| 入口 | 适合 |
|---|---|
| `INDEX.md` | 人直接读；「按需求找方案」表是路由依据 |
| `index.json` | 程序 / Agent 读，结构化，比 markdown 好解析 |

不确定该用哪个 CLI 时：

```bash
bin/cli-cap search <关键词>       # 跨 CLI 搜路由 + 能力文档 + 官方规则
```

### 2. 读对应能力文档

`registry/<名字>/CAPABILITY.md` —— **照着文档拼命令，不要自己造。**

文档里有两个段落必须看：

- **「全局约定」**：身份、输出格式、成功判定、退出码语义。忽略这些会把成功当失败。
- **「官方 Agent 使用规则」**（如有）：厂商写给 Agent 的判断标准，**优先于一般经验**。

精确检索比通读快：

```bash
bin/cli-cap show <名字> <关键词>       # 在某 CLI 的能力面里搜（含官方规则命中）
bin/cli-cap list                      # 看已收录了什么
```

### 3. 查不到就补录

**关键词没命中 ≠ 不支持。** 先换词、再查能力文档，仍没有就查官方资料。
确认新用法后用 `remember` 记下意图与命令模板：

```bash
bin/cli-cap remember <名字> \
  --intent "看今天的日程" \
  --command "lark-cli calendar +agenda --as user" \
  --note "个人日程必须用用户身份"
```

要新增一个 CLI：往 `clis.json` 加一条记录，跑 `bin/refresh <名字>`。详见 `CONTRIBUTING.md`。

> 快照受**版本与采集范围**限制。文档里没列出的能力，以 `<cmd> --help` 为准；
> 涉及写操作或消耗配额前，先跟用户确认。

---

## 怎么读「采集方式」——它决定你能信多少

索引里的 `采集方式` 一列不是装饰，它标了这份快照的来源：

| 采集方式 | 含义 | 可信范围 |
|---|---|---|
| **仓库 skill 文档** | 从厂商仓库的 `skills/*/SKILL.md` 聚合 | 命令名与触发条件可靠；**参数细节**要跑 `--help` 确认 |
| **release 二进制 help 全树** | 取官方 release 可执行文件递归跑 `--help` | 命令树与 flag 完整；描述可能来自父命令摘要 |
| **本机 CLI help 全树 + 官方 SKILL.md** | 本机已装 CLI 的 help + 随包 SKILL.md | 同上，另含厂商行为规则 |

**关键**：企业微信 CLI 的服务目录由**服务端 discovery 动态下发**，离线无法穷举 ——
快照只覆盖官方技能文档写明的命令，文档里已如实标注。别把快照当全集。

---

## 各 CLI 的硬性规则

### 飞书 CLI（`lark-cli`）

完整版见 `registry/feishu-cli/CAPABILITY.md` 的「全局约定」。最容易踩的六条：

1. **身份先定**：`--as user` 代表用户本人，`--as bot` 代表应用。
   bot 查用户私有资源会**返回空成功而非报错** —— 别把空结果当成「没有数据」。
2. **判断成功用 `ok == true`**，不要用 `code == 0`。成功信封没有顶层 `code`/`msg`。
3. **写操作先 `--dry-run`**。
4. **退出码 10 不是错误**，是高风险确认门禁：向用户展示 `action`/`risk`/关键参数，
   拿到显式同意后把 `hint` 指的 flag 追加到原命令末尾重试。**绝不静默绕过。**
5. **文件路径只能传相对路径**（cwd 下），绝对路径会被拒。
6. 快捷命令（`+xxx`）优先；调 API 层前先跑 `lark-cli schema <域>.<资源>.<方法>` 看参数结构。

### 企业微信 CLI（`wecom-cli`）

完整版见 `registry/wecom-cli/CAPABILITY.md` 的「全局约定」。最容易踩的六条：

1. **退出码语义**：`0` 成功、`1` 运行时错误、`2` 用法错误。
   错误 JSON 打到 **stdout**（`{"error":{...}}`），日志走 stderr。
2. **命令树需要凭证与网络**：`wecom-cli --help` 靠服务端 discovery 下发。
   授权状态用 `wecom-cli auth show --status`（输出 `authorized` / `unauthorized`）。
3. **ID 类字段禁止外露**：最终回复里不能出现 `userid` / `chat_id` / `mail_id` 等内部标识，
   必须换成可读名称（`name` / `chat_name` / `subject` / `doc_name`）。
   **这条优先级最高，且不因用户索要而放宽。** 可读链接不受限。
4. **消息只能发给「最近有往来的会话」或授权人**。`chat_id` 必须取自**本次**
   `wecom-cli message aibot sessions list` 的返回；历史 `chat_id`、通讯录 `userid`、
   用户输入的 ID 都不能直接用。
5. **发媒体要先换 `media_id`**：`wecom-cli media upload` → 再 `message aibot send`，
   且上传的 `type` 要与发送的 `msg_type` 对齐。
6. **请求体优先 `--json`**；深层覆盖用 `--set path=value`（可重复）。

### WPS 365 CLI（`wps365-cli`）

完整版见 `registry/wps365-cli/CAPABILITY.md`。最容易踩的五条：

1. **双轨命令**：优先用精装命令（`calendar event create` 这种语义化的）；
   没覆盖的端点走兜底 `wps365-cli api get|post|... "/v7/..."`。
2. **域名字像但对象不同**：`airpage`=智能文档、`airsheet`=智能表格、`dbsheet`=多维表、
   `drive`=云文档与文件。别按字面猜。
3. **写操作先 `--dry-run`**，看请求体再真发。
4. **时间要带时区**：`--start "2026-09-01T14:00:00+08:00"`。
5. **命令定义从 CDN 拉**，升级二进制后要再跑一次 `wps365-cli spec update -y`。

### 即梦 CLI（`dreamina`）

完整版见 `registry/dreamina/CAPABILITY.md` 文末的「官方 Agent 使用规则」。最容易踩的七条：

1. **别用退出码判断成功**。异步生成返回 `submit_id` + `gen_status=querying` 只说明
   *提交被接受*；**只有 `gen_status=success` 才算任务成功**。`fail` 时读 `fail_reason`
   并主动把具体原因告诉用户。
2. **所有生成操作都消耗积分**。真跑之前先告知用户；`dreamina user_credit` 查余额。
3. **`--poll=N` 是有界等待**，超时后用 `dreamina query_result --submit_id=<id>` 续查，别反复重投。
4. **复用已有登录态**，除非用户明确要求登录类操作。
5. **不要从文档里硬编码模型支持范围**，先跑 `dreamina <子命令> -h` 确认。
6. **不同命令支持的模型 / 比例 / 时长 / 分辨率互不相同**，别假设一致。
7. 遇到 `AigcComplianceConfirmationRequired`：请用户先去即梦网页端完成一次性确认，再重试。

---

## 目录结构

```
.
├── INDEX.md               # 总索引：路由表 + CLI 清单（人和 Agent 的入口）
├── index.json             # 同一份索引的机器可读版本
├── AGENTS.md              # 本文件
├── CONTRIBUTING.md        # 怎么加一个新 CLI（改 clis.json + 可选解析档）
├── clis.json              # 收录清单：每个 CLI 怎么采、从哪采
├── routes.json            # 意图路由表（中文），索引与检索都读它
├── bin/
│   ├── cli-cap            # scan / list / index / search / show / remember
│   ├── skill-digest       # 按清单采集（skill-repo / release-bin / local-bin）
│   ├── refresh            # 一键刷新：读 clis.json，全刷 + 重建索引
│   └── install-skill      # 把 skills/ 装进本机 Agent 目录（自动填入库路径）
├── skills/
│   └── cli-capability-lookup/SKILL.md   # Agent 自动来查的入口（含路径占位符）
├── lib/
│   ├── capmodel.js        # 统一能力模型 → 统一渲染成 CAPABILITY.md
│   └── fetchsource.js     # 取源：下载源码 / 取 release 可执行文件
├── profiles/              # 各 CLI 的解析档（lark / wecom / help-tree）
├── registry/<名字>/       # 各 CLI 的能力快照
│   ├── CAPABILITY.md      #   给 AI 查的主文档
│   ├── capability.json    #   结构化数据
│   ├── capability.meta.json
│   ├── raw/               #   help 原文 / 源码解析留档
│   └── vendor/            #   厂商官方原文（SKILL.md / AGENTS.md 等）
├── docs/index.html        # 总索引的可视化版本（带搜索）
├── tests/                 # 清单体检 + 渲染契约 + 检索测试
└── .cache/                # 采集缓存，可随时删
```

---

## 维护

```bash
bin/refresh                 # 全刷 + 重建索引
bin/refresh wecom-cli       # 只刷一个
bin/refresh --list          # 看清单里有什么
npm test                    # 清单体检 + 渲染契约 + 检索
```
