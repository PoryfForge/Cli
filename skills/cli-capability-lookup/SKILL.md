---
name: cli-capability-lookup
description: "Look up a SaaS CLI's complete capability surface before using it, instead of guessing commands or re-reading --help every time. Use this skill whenever a task involves a vendor-provided capability CLI — 飞书/lark-cli、GitHub/gh、Multica/multica、企业微信/wecom-cli、WPS 365/wps365-cli、1Password/op、Grok/grok、即梦/dreamina、腾讯广告/tencentads — or when the user asks what such a CLI can do, whether it supports some operation, or how to call it. Also use it to record a newly discovered capability, or to add a new CLI to the library so future sessions can reuse it."
description_zh: "先查 SaaS CLI 能力库再动手，避免每次现翻 help 或凭印象编命令"
description_en: "Look up a SaaS CLI's capability snapshot before using it"
---

# CLI 能力库查询

一个本地能力库，把**厂商提供的 SaaS 能力型 CLI** 的完整能力面固化成了文档。目标是：
**不要让 Agent 每次现查、也不要凭印象编命令。**

- 能力库根目录：`{{CLI_CAP_ROOT}}`
- 总索引：`INDEX.md`（人读）/ `index.json`（程序读）
- 每个 CLI：`registry/<名字>/CAPABILITY.md`

<!-- unrendered-only:start -->
> 上面写的是字面占位符 `{{CLI_CAP_ROOT}}`，说明你正在读**仓库里的模板**。真正要用它，
> 跑一次 `bin/install-skill` —— 安装时会把占位符换成你自己机器上的绝对路径。
> 若你是手动复制的这份文件，就把 `{{CLI_CAP_ROOT}}` 全部替换成你的 clone 路径
> （库根目录 = 含 `clis.json` 的那一层），不需要装什么依赖。
<!-- unrendered-only:end -->

**收录范围**：厂商提供的能力型 CLI。系统自带工具（git / curl / sqlite3）与包管理器
（brew / npm / docker）**不在库里** —— 那些现查 `--help` 足够便宜，别去库里找。

库里目前有什么，跑 `bin/cli-cap list` 看，别凭这份文档里的清单下判断（清单会过期）。

## 什么时候用这个 skill

- 要用**飞书 CLI（`lark-cli`）**：发消息、看日程、读写文档 / 多维表格、任务、审批、考勤……
- 要用 **GitHub CLI（`gh`）**：仓库、PR、Issue、Actions、release、搜索、调 GitHub API
- 要用 **Multica CLI（`multica`）**：把任务派到别的机器上跑、看执行状态与结果
- 要用**企业微信 CLI（`wecom-cli`）**：消息、邮件、在线文档、智能表格、待办、日程、会议、微盘……
- 要用 **WPS 365 CLI（`wps365-cli`）**：日历、消息、邮箱、云文档、智能文档、多维表格……
- 要用 **1Password CLI（`op`）**：取密钥、把密钥注入进程或配置文件
- 要用 **Grok CLI（`grok`）**：非交互跑一次、联网检索、管理会话与 MCP / 插件
- 要用**即梦 CLI（`dreamina`）**：文生图、图生图、文生视频、图生视频、查任务、查积分……
- 要用**腾讯广告 CLI（`tencentads`）**：API Key 鉴权（业务调用要看官方技能站，别指望这个 CLI）
- 用户问「这个 CLI 能干什么」「支不支持 YY」
- 你不确定某个命令的准确名字或参数，正要盲试
- 要用一个库外的 SaaS CLI：**先按第 3 步固化，再用**

## 工作流

### 第 1 步：查总索引

读 `INDEX.md`。它有两张表：

- **按需求找方案** —— 「我想做的事 → 用哪个 CLI → 关键命令」，这是路由依据
- **已收录的 CLI** —— 有哪些工具、采集方式、能力文档在哪

不确定该用哪个 CLI 时，跨库搜一次：

```bash
cd {{CLI_CAP_ROOT}}
bin/cli-cap search 日程        # 搜路由表 + 全部能力文档 + 官方规则
```

### 第 2 步：读能力文档

命中后读 `registry/<名字>/CAPABILITY.md`。这份文档包含该工具的**全部命令/参数/约定**，
照着拼命令，不要自己造。文档里三节必须看：

- **「采集说明」**（如有，在概览正下方）：这份快照**已知的边界**。出现它往往表示某部分
  命令受本机环境影响、不能照字面信（如 `gh` 的部分子命令来自本机装的扩展）。
  这类情况**以本机 `<命令> --help` 为准**。
- **「全局约定」**：身份、输出格式、成功判定、退出码语义。忽略这些会把成功当失败。
- **「官方 Agent 使用规则」**（如有）：厂商写给 Agent 的判断标准，**优先于一般经验**。

各 CLI 对应哪份文档，看 `INDEX.md` 的「已收录的 CLI」表 —— 别照抄本文档里的路径，
新收录的 CLI 不会出现在这里。

精确检索比通读快（会同时搜官方规则）：

```bash
bin/cli-cap show wecom-cli 待办    # 在企业微信 CLI 里搜「待办」
bin/cli-cap show wps365-cli 日程   # WPS 的日历命令
bin/cli-cap show feishu-cli 消息   # 飞书的发消息命令
bin/cli-cap list                   # 看已收录了什么
```

### 第 3 步：查不到就补录

**关键词没命中 ≠ 不支持。** 先换词、再查能力文档，仍没有就查官方资料。
确认新用法后用 `remember` 记下意图与命令模板：

```bash
bin/cli-cap remember <名字> \
  --intent "看今天的日程" \
  --command "lark-cli calendar +agenda --as user" \
  --note "个人日程必须用用户身份"
```

要**新增一个 CLI**：往 `clis.json` 加一条记录，跑 `bin/refresh <名字>`。
同一类分发方式（GitHub Release / 厂商 CDN 直链 / npm 注册表 / 裸二进制）都不用改脚本，
只有碰到全新的分发渠道才需要动 `lib/fetchsource.js` —— 字段写法见仓库里的 `CONTRIBUTING.md`。

```bash
bin/refresh --list          # 看清单里有什么
bin/refresh <名字> --force  # 强制重新下载源并采集
```

## 各 CLI 最容易踩的坑

**完整版在库根的 `AGENTS.md` 与各 `CAPABILITY.md` 里，动手前请读对应那一节。**
下面只是上手摘要，**不保证完整** —— 厂商规则以 `CAPABILITY.md` 为准。

### 飞书 CLI（`lark-cli`）

1. **身份先定**：`--as user` 是用户本人，`--as bot` 是应用。bot 查用户私有资源会
   **返回空成功而非报错** —— 别把空结果当成「没有数据」。
2. **判断成功用 `ok == true`**，不要用 `code == 0`。
3. **退出码 10 不是错误**，是高风险确认门禁：向用户展示 `action`/`risk`/关键参数，
   拿到显式同意后把 `hint` 指的 flag 追加到原命令末尾重试。**绝不静默绕过。**
4. 写操作先 `--dry-run`；文件路径只能传**相对路径**。

### GitHub CLI（`gh`）

1. **别加防交互的补丁**：非 TTY 下它本来就跳过 pager、需要必填参数时直接报错。
   没有 `--no-pager` 这个 flag。
2. **列表会静默截断**（默认常为 30 条）：`gh issue list` / `gh pr list` / `gh search` 要加 `-L N`；
   要结构化数据用 `--json <字段>`，字段名不确定就先跑一次不带字段名的 `--json`。
3. **`-T` 在 `pr create` / `issue create` 上是 body 模板**，不是 `--template`。
4. **仓库靠当前目录推断**：不在仓库目录里，或要操作别的仓库，必须写 `-R OWNER/REPO`。
5. 搜索限定词要拆成独立 token（`repo:x/y is:open`），整串加引号会报 `Invalid search query`。
6. **命令树受本机扩展影响**：`gh copilot` 之类的子命令来自本机装的扩展，
   别人机器上未必有。能力文档的「采集说明」已标注，**用之前先在本机跑一次 `--help` 确认真有**。

### Multica CLI（`multica`）

1. **任务跑在 runtime 上**，不是这台机器。一个 runtime = 一台机器 + 一个编码 CLI；
   派任务前先 `multica runtime list` 确认在线。
2. **daemon 只认本机 PATH 里已有的编码 CLI**，一个都没有时**起不来**；
   新装 / 新登录后要 `multica daemon restart` 才会被探测到。
3. 已排队的任务最多等 2 小时；**正在跑的任务在 runtime 掉线时直接失败**。
4. **「本地执行」不等于「密钥只在本机」**：Agent 的自定义环境变量与 MCP 配置存在服务端。

### 企业微信 CLI（`wecom-cli`）

1. **ID 类字段禁止外露**（`userid` / `chat_id` / `mail_id`）—— 最终回复必须换成可读名称。
   **优先级最高，不因用户索要而放宽。**
2. **消息只能发给「最近有往来的会话」或授权人**；`chat_id` 必须取自**本次**
   `wecom-cli message aibot sessions list` 的返回。
3. **发媒体先 `wecom-cli media upload` 拿 `media_id`**，上传 `type` 与发送 `msg_type` 对齐。
4. 退出码 `0`/`1`/`2`；错误 JSON 打到 **stdout**，日志走 stderr。
5. 命令树靠**服务端 discovery** 下发，离线快照只覆盖官方文档写明的部分。

### WPS 365 CLI（`wps365-cli`）

1. **双轨命令**：优先精装命令；没覆盖的端点走 `wps365-cli api get|post|... "/v7/..."`。
2. **域名字像但对象不同**：`airpage`=智能文档、`airsheet`=智能表格、`dbsheet`=多维表。
3. 写操作先 `--dry-run`；**时间要带时区**（`+08:00`）。

### 1Password CLI（`op`）

1. **`op read` 的输出就是明文密钥**，不要回显到回复、日志或命令历史里。
2. **优先 `op run --env-file` / `op inject`**，而不是「取出来再传」；
   `inject` 生成的含密文件必须进 `.gitignore`。
3. 取密钥前先 `op whoami` 确认账号，多账号下取错账号很难排查。
4. `op item delete` 与 `vault` / `group` 的权限变更是**不可逆**的，逐条跟用户确认。

### Grok CLI（`grok`）

1. **默认开交互式 TUI**；脚本 / Agent 里要显式用单轮模式 `grok -p "<prompt>"`。
2. **默认会为 shell 命令和文件改动弹确认**。别为了「跑通」就默认加 `--always-approve`，
   要无人值守就用 `--allow <规则>` 或 `--permission-mode` 收窄。
3. 要机器可读结果加 `--output-format json`（配 `--json-schema` 可固定结构）。
4. 配置没生效时先跑 `grok inspect`，看它在当前目录实际发现了什么，别猜。

### 即梦 CLI（`dreamina`）

1. **别用退出码判断成功**。返回 `submit_id` + `gen_status=querying` 只说明*提交被接受*；
   **只有 `gen_status=success` 才算成功**，`fail` 要读 `fail_reason` 并主动告诉用户。
2. **所有生成操作都消耗积分**，真跑前先告知用户；`dreamina user_credit` 查余额。
3. **`--poll=N` 是有界等待**：超时后用 `query_result --submit_id=<id>` 续查，别反复重投。
4. 复用已有登录态；不要硬编码模型支持范围，先跑 `dreamina <子命令> -h` 确认。

### 腾讯广告 CLI（`tencentads`）

1. **命令面很薄，别当业务入口**：默认版只有 `auth` 域（`tencentads --list-commands` 可查），
   账号 / 营销单元 / 创意 / 报表都不在这个 CLI 里。
2. 业务能力在腾讯广告官方技能站的脚本里（`skills.ad.qq.com`），**本库尚未收录、也未做过
   业务调用验证** —— 要用先去官方核对。
3. 其 npm 包的发布者账号是个人账号，是否厂商直接维护待确认。

## 维护

CLI 升级后能力面会变。重新固化：

```bash
cd {{CLI_CAP_ROOT}}
bin/refresh                  # 一键刷新全部已收录 CLI + 重建索引
bin/refresh dreamina         # 只刷新某一个
node tests/run.js            # 清单体检 + 渲染契约 + 检索测试
```

单条路径：`bin/skill-digest <名字> --fetch`（按清单采集，含自拉最新源码）。
