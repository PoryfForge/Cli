# CLI 收录候选

核对日期：2026-09-18。按本库「厂商提供的 SaaS 能力型 CLI」范围筛选。

本文是候选研究记录，不是可直接照单执行的能力快照。**已收录的条目能力面在 `registry/`，
这里的「核对结论」只记判断依据与遗留问题。**

---

## 已收录

| CLI / 可执行命令 | 能力面 | 采集方式 | 遗留问题 |
|---|---|---|---|
| GitHub CLI / `gh` | 仓库、PR、Issue、Actions、release、搜索、`gh api` 直连 REST/GraphQL | release 二进制 help + 官方 `skills/gh/SKILL.md` | 无。官方 skill 随仓库 `trunk` 分支走，快照记了 `docsCommit` |
| 1Password CLI / `op` | 凭据读取、`op run` / `op inject` 注入、条目与保险库管理 | release 二进制 help（agilebits CDN，非 GitHub） | 厂商没有给 Agent 的 SKILL.md；本库的安全纪律写在 `AGENTS.md`，属本库约束不是官方规则 |
| Multica CLI / `multica` | 跨设备任务派发、执行状态与结果、workspace / runtime / agent 管理 | release 二进制 help + 仓库 `CLI_AND_DAEMON.md` 留档 | 无官方 SKILL.md，规则从官方文档提炼；自托管场景未验证 |
| Grok CLI / `grok` | 非交互单轮执行、联网检索、会话、MCP / 插件、ACP 宿主接入 | release 二进制 help（x.ai 原始二进制，非压缩包） | `--allow` / `--permission-mode` 的规则写法和沙箱能力未实测 |
| 腾讯广告 CLI / `tencentads` | 只有 API Key 鉴权管理 | release 二进制 help（npm 注册表的平台子包） | **见下「存疑」**。业务调用完全未验证 |

### 存疑：腾讯广告 CLI 的归属与覆盖面

两点必须留在记录里，不能当已确认：

1. **发行方**：`tencentads-cli` 的 npm 发布者账号是个人账号（个人 QQ 邮箱），
   仓库页没有 homepage / repository 字段。但它被腾讯广告官方技能站
   （[skills.ad.qq.com](https://skills.ad.qq.com/)、`@tencent-adm/tencentads-*` 系列）
   明确列为**前置依赖**，所以不是野生包，也不是明确的厂商包 —— 定位待与官方确认。
2. **覆盖面**：默认 edition 只发布 `auth` 域，营销管理命令标着 `enterprise`。
   真正的业务能力（账号、营销单元、创意、报表、人群）在官方技能站的 `.mjs` 脚本里，
   不在 CLI 里。本库**没有收录那些脚本，也没做过任何业务调用验证**。
   要用腾讯广告，请以官方技能站为准，不要拿这份快照当业务入口。

---

## 仍是候选

按本库范围核对过官方来源，但**尚未安装、登录、扫描命令树或实测业务调用**。
优先级是结合已收录能力作出的收录建议。

| 候选 / 可执行命令 | 可服务的用户需求 | 官方来源与接入条件 | 建议采集方式 |
|---|---|---|---|
| 钉钉 Workspace CLI / `dws` | 消息与群、日历、待办、审批、考勤、文档、AI 表格、云盘、邮件、会议纪要 | [钉钉官方仓库](https://github.com/DingTalk-Real-AI/dingtalk-workspace-cli)。企业访问需要管理员授权；文档仍标注共创阶段 | 保留官方 `docs/command-index.md` 和 `skills/`，结合 help 与 schema 核对命令契约 |
| Notion CLI / `ntn` | 页面 API 操作、数据源创建与查询、文件上传，以及 Workers 管理 | [Notion CLI 官方文档](https://developers.notion.com/cli/get-started/overview)。登录授权到相应工作区 | CLI 命令参考加 API 请求语法；单独区分内容操作与 Workers 开发部署 |
| Todoist CLI / `td` | 自然语言记任务、查看今日待办、项目与任务管理 | [Doist 官方仓库](https://github.com/Doist/todoist-cli)。支持 OAuth 与只读授权模式 | help 加 `skills/todoist-cli/`，特别保存日期、项目、身份和读写权限约定 |
| ElevenLabs CLI / `elevenlabs` | 文本转语音，以及语音 Agent 的创建、同步、测试和管理 | [ElevenLabs 官方仓库](https://github.com/elevenlabs/cli)。API 调用需要凭证 | 它自带 `elevenlabs generate-skills`，能从内嵌 API 定义离线生成各命令组的 `SKILL.md`，官方说明不需要 API key —— 这种现成的能力导出方式值得优先复用 |
| 语雀 / `yuque` | 浏览知识库、列出/搜索/读取文档、交互创建文档 | [语雀组织仓库](https://github.com/yuque/yuque-cli)。同时提供 REPL 和一次性命令 | 先核对哪些操作支持非交互执行；文档输入涉及终端编辑器 |
| Box / `box` | 云文件和文件夹管理、Box AI、电子签署 | [Box 官方文档](https://developer.box.com/guides/cli)。普通用户登录的权限范围限于文件/文件夹、AI、Sign | 更多权限需要平台应用，接入前先明确账号类型 |
| Atlassian / `acli` | Jira Cloud 工作项、项目、看板、冲刺管理 | [Atlassian 官方命令参考](https://developer.atlassian.com/cloud/acli/reference/commands/jira/) | 按实际命令域录入，不能推断已覆盖全部 Atlassian 产品 |

## 单列来源与支持状态

Google Workspace CLI（`gws`）能操作 Gmail、Drive、Calendar、Sheets、Docs、Chat 等服务，
从 Google Discovery Service 动态构建命令，并附带 Agent Skills。
项目位于 `googleworkspace` 组织下，但 README 明确声明它不是 Google 正式支持的产品，且仍在积极开发。
若收录，必须保留这一标注，不能仅凭组织名承诺官方支持。来源：[项目仓库](https://github.com/googleworkspace/cli)。

它与飞书的综合能力形态接近，面向 Google Workspace 用户时值得优先评估。
采集时要同时记录 **CLI 版本、采集日期以及当次 API 定义范围** ——
动态命令树会随服务端定义变化，只记二进制版本不足以说明快照覆盖了什么。

Slack CLI 的官方定位是创建和管理 Slack 应用。若目标是应用开发，可作为后续候选；
若目标是直接代用户处理聊天与办公事务，需先核对具体业务能力，
不能把应用开发工具当成完整聊天客户端。来源：[Slack 官方文档](https://docs.slack.dev/tools/slack-cli/)。

---

## 核对中记下的坑

这些都是接入时踩到的、**对下一个 CLI 同样适用**的经验：

1. **平台命名各家自创，别在脚本里做映射推断。**
   `gh` 写 `macOS_arm64`、`grok` 写 `macos-aarch64`、`op` 写 `darwin_arm64`、`multica` 写 `darwin-arm64`。
   清单里逐平台写死；猜错会静默下到别的平台的二进制，而它照样能跑 `--help`。
2. **版本号要区分「带 v 的 tag」和「裸版本号」。**
   GitHub 下载路径用 `v2.101.0`，资产文件名用 `2.101.0`。混用就是 404。
3. **不是所有厂商都发压缩包。** `grok` 直接发裸二进制；`op` 走自己的 CDN 而非 GitHub Releases；
   `tencentads` 只发在 npm 注册表的平台子包里。清单要能描述这四种，代码不该认厂商。
4. **官方 Agent 规则未必在发布包里。**
   `cli/cli` 的 `skills/gh/SKILL.md` 只在源码仓库里，取 release 二进制拿不到 ——
   得再取一份源码。这类文档恰恰是最有价值的部分（讲「怎样才算做对」，而不只是「能做什么」）。
5. **归档里的可执行文件名可能带平台后缀。** `tencentads-darwin-arm64.tgz` 里是
   `tencentads_darwin_arm64`，不是 `tencentads`；靠精确名找不到。
6. **别把 npm 发布者当成厂商认证。** 见上文「存疑」。
7. **help 里有本机路径，会在留档里泄露用户名。**
   `gh copilot` 的帮助会把 `$HOME` 展开成真实路径打印出来。采集入口统一折成 `~`，
   发布前扫全仓 `/Users/<你>` 应零命中。
8. **一次扫描的产物是「全集」，不是「增量」。**
   `raw/` 每次清空重写。`gh copilot` 的子命令来自本机装的扩展，扩展一没，旧留档就成了
   「留档里有、能力文档里没有」的孤儿，读的人无从判断该信哪个。

## 后续录入原则

1. 先选用户实际使用的平台；「文档显示有此能力」和「当前账号能调用」分别记录。
2. 固定所依据的发布版本或源码提交，优先复用官方命令清单、Schema、Skills 和 references。
3. 用 help 扫描补足命令树；采集深度应覆盖叶子命令，记录扫描失败和未覆盖范围。
4. `CAPABILITY.md` 保留身份、授权、输出成功条件与关键限制；`routes.json` 只保存有依据的场景映射。
5. 完成能力快照后才进入正式索引；未实测的条目在 `clis.json` 的 `scopeNote` 里写明。
