# AGENTS.md

给 AI Agent（Codex / Claude Code / WorkBuddy 等）读的接入说明。

---

## 这是什么

一个 **CLI 能力库**：把厂商 SaaS 能力型 CLI 的能力面，提前固化成本地文档。

要解决的具体问题：Agent 不知道某个 CLI 到底能做什么，于是每次现场翻 `--help`、翻不到就凭印象编命令。
查完一次就该存下来 —— 这里就是「存下来」的地方。

**收录范围**：厂商提供的 SaaS 能力型 CLI —— 飞书、GitHub、Multica、企业微信、WPS 365、
1Password、Grok、即梦、腾讯广告。
系统自带工具（`git` / `curl`）、包管理器（`brew` / `npm`）、数据库客户端**不在范围内**。
（`gh` 只收 GitHub 的 SaaS 协作能力，本机通用 `git` 命令仍不收。）

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
| **release 二进制 help 全树** | 取官方发布的可执行文件递归跑 `--help` | 命令树与 flag 完整；描述可能来自父命令摘要 |
| **release 二进制 help 全树 + 官方 SKILL.md** | 同上，另从厂商仓库取来写给 Agent 的规则 | 命令树完整，且含厂商的行为约定 |
| **本机 CLI help 全树 + 官方 SKILL.md** | 本机已装 CLI 的 help + 随包 SKILL.md | 同上，但**版本随你本机**，可能与官方发布不一致 |

`CAPABILITY.md` 的 frontmatter 与「采集方式」两处都标了这一项，以文档里写的为准 ——
文档是快照，**Agent 读的是文档，不是本机那个 CLI**。

**关键**：企业微信 CLI 的服务目录由**服务端 discovery 动态下发**，离线无法穷举 ——
快照只覆盖官方技能文档写明的命令，文档里已如实标注。别把快照当全集。

**另有一类「采集说明」要看**：`CAPABILITY.md` 概览正下方若出现 `> **采集说明**：…`，
那是这份快照**已知的边界**，往往意味着某部分命令不稳定或不可照字面信 ——
例如 `gh` 的部分子命令来自**本机安装的扩展**，别人机器上未必有。
遇到这类说明，**以本机 `<命令> --help` 为准**，不要拿快照当权威。
（不是每份文档都有；没有就说明没有已知缺口。）

---

## 各 CLI 的硬性规则

规则来源分两类，**下面会分别标出来**：
- **官方**：厂商写给 Agent 的文档（已在 `registry/<名字>/vendor/` 留档）。优先级最高。
- **本库约束**：把「调用有副作用」这件事落到可执行的操作纪律上，多为安全与不可逆操作的护栏。

完整内容一律在 `registry/<名字>/CAPABILITY.md`，这里只挑最容易踩的。

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

### GitHub CLI（`gh`）

完整规则见 `registry/github-cli/CAPABILITY.md` 文末「官方 Agent 使用规则」
（原文取自官方仓库的 `skills/gh/SKILL.md`）。最容易踩的六条：

1. **不要给它加防交互的补丁**（官方）。`gh` 在非 TTY 下本来就跳过 pager、去掉 ANSI、
   需要必填参数时直接报错而不是挂起提示 —— 别去设 `GH_PAGER`，也不存在 `--no-pager` 这个 flag。
2. **要结构化输出就用 `--json`，别去解析列对齐的表格**（官方）。
   不确定有哪些字段时先跑一次 `--json` 不带字段名，它会打印全部可用字段；
   过滤用 `--jq`，套模板用 `--template`。
3. **`-T` 在有些命令上是另一个意思**（官方）。`gh pr create -T` / `gh issue create -T`
   指的是 body 模板，不是 `--template` —— 用之前先确认。
4. **列表会静默截断，默认通常只有 30 条**（官方）。`gh issue list` / `gh pr list` / `gh search`
   要加 `-L N`；这两个 list 也拿不到 `totalCount`，真要总数走 `gh api graphql`。
   调原始 API 翻页用 `gh api --paginate`。
5. **搜索限定词要拆成独立 token**（官方）。`gh search issues repo:x/y is:open` 可以，
   `gh search issues "repo:x/y is:open"` 会被当成一整串关键词并报 `Invalid search query`；
   只有多词的自由文本才加引号。想按人 / 标签 / 跨仓筛，优先用 `gh search` 而不是 `list --search`。
6. **仓库归属靠当前目录推断**（官方）。不在仓库目录里，或要操作别的仓库，
   必须显式写 `-R OWNER/REPO`，否则会操作错仓库。
   （本库约束：涉及 `gh secret set`、`gh release`、`pr merge` 等写操作前，先跟用户确认目标仓库与环境。）

### Multica CLI（`multica`）

规则来自官方文档（`multica.ai/docs`）与仓库里随版本分发的 `CLI_AND_DAEMON.md`。最容易踩的六条：

1. **任务是在「runtime」上跑的，不是在这台机器上**。一个 runtime = **一台机器 + 一个编码 CLI**；
   同一台机器装了 Claude Code 和 Codex，就是两个 runtime。
   派任务前先 `multica runtime list` 确认目标在线（离线 runtime 上的任务只会排队）。
2. **daemon 只认本机 PATH 里已有的编码 CLI**，而且**一个都没有时 daemon 起不来**。
   新装或新登录某个 Agent 之后，必须 `multica daemon restart` 才会被探测到。
3. **离线的代价不对称**：已排队的任务最多等 2 小时；**正在跑的任务直接失败**
   （符合条件的会自动重试）。心跳 15 秒一次，异常退出后约 3 分钟内才显示离线。
4. **并发有上限**：单 daemon 默认最多 20 个任务、单个 Agent 最多 6 个，取两者较小值。
   并行任务抢的是同一台机器的算力、同一个工具账号的配额和同一个工作目录。
5. **别把「本地执行」理解成「密钥只在这台机器上」**（官方明确提醒）：
   Agent 的自定义环境变量和 MCP 配置是**存在服务端的**。所以要往
   `multica agent env` 里塞东西时，先想清楚它是服务端数据。
6. **runtime 默认私有**。只有 owner 能把它设成公开；把别人的机器开成公共执行环境，
   烧的是对方的算力和账号额度。

### 1Password CLI（`op`）

以下都是**本库约束** —— `op` 的 help 只讲「怎么调」，不讲「调完怎么不泄露」：

1. **`op read` 的输出就是明文密钥。** 不要把结果回显到回复、日志、命令历史或文件里；
   需要给程序用时，直接管道给下一步，别先打印再复制。
2. **优先 `op run --env-file` / `op inject`，而不是「取出来再传」**：
   明文只活在子进程环境或目标文件里。用 `inject` 生成的含密文件必须进 `.gitignore`。
3. **先确认身份再取密钥**：`op whoami` / `op account list`。多账号环境下取错账号，
   表现为「拿到了一个看起来对的密钥」，排查成本很高。
4. **不可逆操作要逐条确认**：`op item delete`、`op vault` / `op group` 的权限变更、
   `op user` 的恢复与停用，都没有撤销。
5. **要 JSON 用 `--format json`**（或 `OP_FORMAT=json`），别解析人类可读输出。
6. 非交互环境（CI / 无浏览器）用 service account token（`OP_SERVICE_ACCOUNT_TOKEN`），
   不要试图把交互式登录塞进脚本。

### Grok CLI（`grok`）

规则基于其自身 help 与官方构建文档。最容易踩的六条：

1. **默认开的是交互式 TUI**。脚本 / CI / 由 Agent 调用时，要显式走单轮模式：
   `grok -p "<prompt>"`（或 `--prompt-file` / `--prompt-json`），跑完即退出。
2. **默认会为 shell 命令和文件改动弹权限确认**。无人值守的场景要么给出 `--allow <规则>` 白名单、
   要么接受 `--always-approve` —— **不要为了「跑通」就默认加 `--always-approve`**，
   那等于让它无确认地改本机。更稳的做法是用 `--sandbox <profile>` 或 `--permission-mode` 收窄。
3. **要机器可读结果就加 `--output-format json`**（还有 `streaming-json`）；
   结构要固定可以配 `--json-schema`。
4. **要知道自己跑在什么环境里**：`grok inspect` 显示它在当前目录发现的实际配置，
   配置没生效时先看它，别猜。
5. **联网检索是模型的内置工具，不是独立子命令**。想关掉用 `--disable-web-search`；
   想限制可用工具用 `--tools` / `--disallowed-tools`。
6. **会话可按 `--session-id` 续 / `-c` 继续 / `--fork-session` 分叉**；
   要回看历史用 `grok sessions list|search`，导出用 `grok export`。

### 腾讯广告 CLI（`tencentads`）

**注意：这个 CLI 目前的命令面很薄，别当成完整业务入口。**

1. CLI 自身只发布了 **`auth`** 域（`auth login` / `status` / `logout`）。
   用 `tencentads --list-commands` 可以看到：营销管理类命令标着 `enterprise`，
   默认 edition 不包含。
2. **账号 / 营销单元 / 创意 / 报表这些业务查询，CLI 里没有对应命令**。
   官方把这些做成了技能站的脚本（`skills.ad.qq.com`，`@tencent-adm/tencentads-*` 系列），
   本库**尚未收录，也没做过业务调用验证** —— 要用请先去官方技能站核对。
3. `tencentads-cli` 这个 npm 包的发布者账号是个人账号，虽被官方技能文档列为前置依赖，
   **是否为厂商直接维护待确认**。参考它给出的命令契约时留个心眼。
4. 凭据落在 `~/.tencent-ads`（`--config-dir` 可改）。API Key 属于密钥，
   不要回显在对话里 —— 参照 1Password 那节的第 1 条纪律。

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
