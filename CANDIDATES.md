# CLI 收录候选

核对日期：2026-09-17。按本库“厂商提供的 SaaS 能力型 CLI”范围筛选。

状态：已核对下列官方文档或厂商组织仓库；尚未安装、登录、扫描命令树或实测业务调用。
本文是候选研究记录，不是可直接照单执行的能力快照，条目尚未进入 `registry/`。
优先级是结合本库现有飞书、即梦能力作出的收录建议。

## 建议第一批

| 候选 / 可执行命令 | 可服务的用户需求 | 官方来源与接入条件 | 建议采集方式 |
|---|---|---|---|
| 钉钉 Workspace CLI / `dws` | 消息与群、日历、待办、审批、考勤、文档、AI 表格、云盘、邮件、会议纪要 | [钉钉官方仓库](https://github.com/DingTalk-Real-AI/dingtalk-workspace-cli)。企业访问需要管理员授权；文档仍标注共创阶段 | 保留官方 `docs/command-index.md` 和 `skills/`，结合 help 与 schema 核对命令契约 |
| 企业微信 CLI / `wecom-cli` | 消息、邮件、文档、在线/智能表格、待办、日程、会议、微盘、通讯录 | [企业微信官方仓库](https://github.com/WecomTeam/wecom-cli)。支持账号授权；机器人主动消息受最近对话范围限制 | 采集官方 CLI 参考与 `skills/`，分别记录用户授权及机器人能力边界 |
| WPS 365 CLI / `wps365-cli` | 云文档、智能文档、智能表格、多维表、邮件、日历、消息、会议 | [WPS 365 官方仓库](https://github.com/wps365-open/cli)。创建/绑定应用后授权；区分用户与应用身份 | help 加官方命令定义；记录 CDN spec 版本或快照，避免只记可执行文件版本 |
| Notion CLI / `ntn` | 页面 API 操作、数据源创建与查询、文件上传，以及 Workers 管理 | [Notion CLI 官方文档](https://developers.notion.com/cli/get-started/overview)。登录授权到相应工作区 | CLI 命令参考加 API 请求语法；单独区分内容操作与 Workers 开发部署 |
| Todoist CLI / `td` | 自然语言记任务、查看今日待办、项目与任务管理 | [Doist 官方仓库](https://github.com/Doist/todoist-cli)。支持 OAuth 与只读授权模式 | help 加 `skills/todoist-cli/`，特别保存日期、项目、身份和读写权限约定 |
| ElevenLabs CLI / `elevenlabs` | 文本转语音，以及语音 Agent 的创建、同步、测试和管理 | [ElevenLabs 官方仓库](https://github.com/elevenlabs/cli)。API 调用需要凭证 | help 加官方生成的 Skills；先区分平台 API 命令与 Agents as Code 工作流 |

前三项与飞书一样覆盖多种办公业务，适合作为国内办公用户的第一批扩展。
后三项补充知识管理、个人任务和音频创作，减少能力库集中在同一种办公套件的问题。

ElevenLabs 提供 `elevenlabs generate-skills`，可以从所安装 CLI 的内嵌 API 定义生成各命令组的
`SKILL.md`，官方说明该操作可离线且不需要 API key。这种已有的能力导出方式值得优先复用。
来源：[ElevenLabs CLI 官方说明](https://elevenlabs.io/docs/eleven-agents/operate/cli)。

## 根据用户群补充

| 候选 / 可执行命令 | 可服务的用户需求 | 收录判断与来源 |
|---|---|---|
| 语雀 / `yuque` | 浏览知识库、列出/搜索/读取文档、交互创建文档 | [语雀组织仓库](https://github.com/yuque/yuque-cli)。同时提供 REPL 和一次性命令，先核对哪些操作支持非交互执行；文档输入涉及终端编辑器 |
| Box / `box` | 云文件和文件夹管理、Box AI、电子签署 | [Box 官方文档](https://developer.box.com/guides/cli)。普通用户登录的权限范围限于文件/文件夹、AI、Sign，更多权限需要平台应用 |
| Atlassian / `acli` | Jira Cloud 工作项、项目、看板、冲刺管理 | [Atlassian 官方命令参考](https://developer.atlassian.com/cloud/acli/reference/commands/jira/)。适合项目管理团队；按实际命令域录入，不能推断已覆盖全部 Atlassian 产品 |
| GitHub / `gh` | Issue、PR、Projects、Actions 工作流和发布管理 | [GitHub 官方手册](https://cli.github.com/manual/)。适合研发团队，可录入 GitHub SaaS 协作能力；本库仍不收通用本地 Git 命令 |

## 单列来源与支持状态

Google Workspace CLI（`gws`）能操作 Gmail、Drive、Calendar、Sheets、Docs、Chat 等服务，
从 Google Discovery Service 动态构建命令，并附带 Agent Skills。
项目位于 `googleworkspace` 组织下，但 README 明确声明它不是 Google 正式支持的产品，且仍在积极开发。
若收录，必须保留这一标注，不能仅凭组织名承诺官方支持。来源：[项目仓库](https://github.com/googleworkspace/cli)。

它与飞书的综合能力形态接近。面向 Google Workspace 用户时值得优先评估；采集时应同时记录
CLI 版本、采集日期以及当次 API 定义范围，因为动态命令树可能随服务端定义变化。

Slack CLI 的官方定位是创建和管理 Slack 应用。若目标是应用开发，可作为后续候选；
若目标是直接代用户处理聊天与办公事务，需先核对具体业务能力，不能把应用开发工具当成完整聊天客户端。
来源：[Slack 官方文档](https://docs.slack.dev/tools/slack-cli/)。

## 后续录入原则

1. 先选用户实际使用的平台；“文档显示有此能力”和“当前账号能调用”分别记录。
2. 固定所依据的发布版本或源码提交，优先复用官方命令清单、Schema、Skills 和 references。
3. 用 help 扫描补足命令树；采集深度应覆盖叶子命令，记录扫描失败和未覆盖范围。
4. `CAPABILITY.md` 保留身份、授权、输出成功条件与关键限制；`routes.json` 只保存有依据的场景映射。
5. 完成能力快照后才进入正式索引；未实测的条目标明“文档核对，未实测”。

以上采集方式是接入建议，尚未验证与本库提取器的兼容性。
