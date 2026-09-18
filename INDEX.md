# CLI 能力库 · 总索引

> 共收录 9 个 CLI。**Agent 动手前先读这里，别再现场翻 help。**
>
> 收录范围：**厂商提供的 SaaS 能力型 CLI**（飞书 CLI、即梦 CLI 这类）。系统自带工具（git / curl）、包管理器（brew / npm）、通用数据库客户端不在范围内 —— 那些现查 help 足够便宜。

## 按需求找方案

先想清楚「要做什么」→ 在这里挑工具和命令 → 打开能力文档看参数。不要凭印象造命令。

| 我想做的事 | 用哪个 CLI | 关键命令 | 注意事项 |
|---|---|---|---|
| 发飞书消息 / 回复 / 搜聊天记录 | `feishu-cli` | `lark-cli im +messages-send \| +messages-reply \| +messages-search` | 写操作先加 --dry-run 预览 |
| 看今天的日程 / 查忙闲 / 订会议室 | `feishu-cli` | `lark-cli calendar +agenda \| +freebusy \| +room-find` | 个人日程必须 --as user，否则查不到 |
| 写 / 改 / 读飞书文档 | `feishu-cli` | `lark-cli docs +create \| +update \| +fetch` | 先读对应 reference 再用 |
| 读写多维表格 / 电子表格 | `feishu-cli` | `lark-cli base +record-search \| lark-cli sheets +cells-get / +cells-set` | base 是 bitable，sheets 是电子表格，别混 |
| 上传下载飞书云空间文件 | `feishu-cli` | `lark-cli drive +upload \| +download \| +search` | 路径只能传 cwd 下的相对路径 |
| 建飞书任务 / 查考勤 / 处理审批 / 管 OKR | `feishu-cli` | `lark-cli task +create \| attendance +… \| approval +task-list \| okr +…` | 审批待办 ≠ 飞书任务 |
| 飞书接口没被快捷命令覆盖 | `feishu-cli` | `lark-cli <域> <资源> <方法>；先跑 lark-cli schema <域>.<资源>.<方法>` | 别猜字段，schema 会给出参数结构 |
| 给企业微信的人 / 群发消息 | `wecom-cli` | `wecom-cli message aibot sessions list → 取 chat_id → wecom-cli message aibot send` | 只能发给「最近有往来的会话」或授权人；chat_id 必须来自本次 sessions list |
| 查企微日程 / 约日程 / 查大家有没有空 | `wecom-cli` | `wecom-cli calendar schedules list \| create \| update \| free list` | 只含无会议链接的日程；查询窗口仅当前前后 30 天 |
| 预约企业微信在线会议 / 要会议纪要 | `wecom-cli` | `wecom-cli meeting create \| list \| get \| original get` | 「开会」这种歧义表达要先追问是日程还是在线会议 |
| 建 / 查 / 完成企业微信待办 | `wecom-cli` | `wecom-cli todo create \| list \| get \| finish \| update \| delete` |  |
| 搜企业微信邮件 / 读邮件 | `wecom-cli` | `wecom-cli mail search \| get` | 邮件是只读能力，发信走 mail send（技能文档表述以官方为准） |
| 新建 / 读写企业微信在线文档 | `wecom-cli` | `wecom-cli doc import \| doc contents get \| contents append \| contents overwrite` | 只有出现 doc/docx/word/在线文档 这类强类型词才走 doc 域 |
| 读写企业微信在线表格 / 智能表格 | `wecom-cli` | `wecom-cli sheet ranges get \| contents update \| rows append；智能表格见 smartsheet 域` | 未指明「在线表格」时默认按智能表格（smartsheet）处理 |
| 在企业微信里搜文档 / 改名 / 管权限 | `wecom-cli` | `wecom-cli doc search \| doc names update \| doc members update` | 对所有文档类型通用 |
| 上传 / 下载文件到企业微信（微盘、消息附件） | `wecom-cli` | `wecom-cli media upload / download；微盘走 wecom-cli disk files …` | 发媒体前必须先 media upload 拿 media_id，且 type 与 msg_type 对齐 |
| 按姓名 / 拼音找企业微信同事 | `wecom-cli` | `wecom-cli contact users search` | 回复里禁止出现 userid 等内部 ID，要用可读名称 |
| 企微命令报错 / 未授权 | `wecom-cli` | `wecom-cli auth show --status → wecom-cli auth init` | 版本需 >= 1.2.1；命令树靠服务端 discovery 下发，必须先授权 |
| 用文字生成图片（文生图） | `dreamina` | `dreamina text2image --prompt="..." --resolution_type=2k [--ratio=1:1] [--poll=60]` | 消耗积分，跑之前先告知用户；必须给 --resolution_type |
| 改已有图片 / 放大清晰度 | `dreamina` | `dreamina image2image … \| dreamina image_upscale …` | 图生图走 image2image，不是 text2image |
| 用文字生成视频（文生视频） | `dreamina` | `dreamina text2video --prompt="..." [--poll=120]` | 积分消耗高于图片；--poll 只等有限秒数，超时要用 query_result 续查 |
| 让图片动起来 / 首尾帧过渡 / 多帧故事 / 多模态参考 | `dreamina` | `dreamina image2video \| frames2video \| multiframe2video \| multimodal2video` | 单图用 image2video；首尾帧用 frames2video；多图故事 multiframe2video；混合参考 multimodal2video |
| 取即梦生成结果 / 把产物下载到本地 | `dreamina` | `dreamina query_result --submit_id=<id> [--download_dir=<dir>]` | 退出码 0 只代表提交成功；必须 gen_status=success 才算成，fail 要报 fail_reason |
| 看即梦历史任务 / 查剩余积分 | `dreamina` | `dreamina list_task [--gen_status=success] \| dreamina user_credit` | 跑付费任务前先 user_credit 确认余额 |
| 登录即梦 / 管理创作会话 | `dreamina` | `dreamina login \| relogin \| dreamina session create / list / search / rename / delete` | 复用已有登录态，别没事就 relogin；无浏览器环境用 login --headless + login checklogin |
| 建 / 改 WPS 日程，查忙闲 | `wps365-cli` | `wps365-cli calendar event create \| list \| update \| search；加 --dry-run 预览` | 时间用 +08:00 带时区的 ISO 格式 |
| 发 WPS 消息 / 管群聊 | `wps365-cli` | `wps365-cli im message send --to "u1,u2" --text "..."` | 先 --dry-run 看请求体再真发 |
| 读写 WPS 云文档 / 团队文档 | `wps365-cli` | `wps365-cli drive file list \| search \| download \| rename；正文用 drive file-content` | 文档库是 drive doclib，和 drive file 不是一回事 |
| WPS 智能文档 / 智能表格 / 多维表 | `wps365-cli` | `wps365-cli airpage … \| airsheet … \| dbsheet …` | 三个域名字像但对象不同：airpage=智能文档，airsheet=智能表格，dbsheet=多维表 |
| 查 WPS 邮箱 / 建草稿 | `wps365-cli` | `wps365-cli mail folder list \| message list \| message search \| draft create` |  |
| WPS 会议：列表 / 详情 / 纪要 | `wps365-cli` | `wps365-cli meeting …` | 会议纪要与摘要也在 meeting 域下 |
| WPS 接口没被精装命令覆盖 | `wps365-cli` | `wps365-cli api get\|post\|put\|patch\|delete\|head "/v7/..."` | 兜底通道，覆盖全部开放平台端点；先用 -o table 看清结构 |
| 命令树缺了新命令 / 想升级 WPS CLI | `wps365-cli` | `wps365-cli update；然后 wps365-cli spec update -y` | 命令定义从 CDN 拉，升级二进制后要再更一次 spec |
| 查 / 建 / 改 / 克隆 GitHub 仓库 | `github-cli` | `gh repo view \| create \| fork \| edit \| clone \| list` | gh 会从当前目录的 git remote 推断仓库；不在仓库目录里就必须写 -R OWNER/REPO |
| 看 / 审 / 合并 PR | `github-cli` | `gh pr list \| view \| diff \| checkout \| review \| merge` | 非交互环境（Agent / CI）下 gh 不会提示补参，直接报错；建 PR 必须显式给 --title 与 --body |
| 提 Issue / 查 Issue / 评论关闭 | `github-cli` | `gh issue list \| view \| create \| comment \| close` | list 默认只回 30 条，要全量加 -L N；gh issue list 拿不到总数，真要总数走 gh api graphql 查 totalCount |
| 看 Actions 运行状态 / 日志 / 重跑 | `github-cli` | `gh run list \| view \| watch \| rerun \| cancel` | 排失败优先 gh run view --log-failed，只取失败步骤的日志 |
| 查 / 建 release、传发布产物 | `github-cli` | `gh release list \| view \| create \| upload \| download` |  |
| 拿结构化数据 / 调 GitHub API | `github-cli` | `gh <任意命令> --json <字段列表> [--jq '<expr>']；或 gh api <path> [--paginate]` | 别自己拼 curl：gh api 会带上当前登录态。不加字段名先跑一次 --json 能列出全部可用字段；列表命令结果会被静默截断，翻页用 gh api --paginate |
| 跨 GitHub 搜仓库 / 代码 / Issue / PR | `github-cli` | `gh search repos \| code \| issues \| prs \| commits` | 要仓库内精确结果用 gh <域> list --search，比 gh search 更贴合当前仓库 |
| GitHub 密钥 / 变量 / 工作流权限管理 | `github-cli` | `gh secret set \| list ；gh variable set \| list` | 写操作影响仓库配置，执行前跟用户确认目标仓库与环境名 |
| 取一条密钥 / 密码 / 令牌 | `1password-cli` | `op read op://<vault>/<item>/<field>` | 输出即明文。不要把结果回显到对话、日志或提交里 —— 需要给程序用时直接管道给下一步 |
| 把密钥以环境变量注入某个进程 | `1password-cli` | `op run --env-file=.env -- <cmd>` | 明文只存在于子进程环境里，比先 op read 再 export 安全 |
| 把密钥填进配置文件模板 | `1password-cli` | `op inject -i <模板> -o <输出>` | 模板里写 op:// 引用，生成的真实文件要加进 .gitignore |
| 增删改查 1Password 条目 / 保险库 | `1password-cli` | `op item get \| create \| edit \| delete \| list ；op vault list \| create` | 删条目 / 改权限是不可逆操作，执行前逐条跟用户确认 |
| 查当前登录的是哪个 1Password 账号 | `1password-cli` | `op whoami ；op account list` | 多账号时先确认，避免把密钥读到错误的账号下 |
| 让第三方 CLI 用 1Password 认证 | `1password-cli` | `op plugin list \| init \| inspect` | shell plugin 机制，凭证不进 shell history |
| 把任务派给某台机器上的编码 Agent 跑 | `multica` | `multica issue create ；multica issue assign` | 先确认目标 runtime 在线（multica runtime list），离线的 runtime 上任务只会排队 |
| 看任务跑到哪了 / 结果是什么 | `multica` | `multica issue runs ；multica issue run-messages ；multica issue timeline` | timeline 给的是状态与归属变更的时间线，具体输出在 run-messages |
| 中断 / 重跑某个任务 | `multica` | `multica issue cancel-task ；multica issue rerun` | 现在还有在跑的 run；cancel 会打断正在执行的 Agent |
| 把这台机器接进 Multica 当执行节点 | `multica` | `multica setup ；multica daemon start \| status \| logs` | daemon 只认本机 PATH 里已有的编码 CLI（claude / codex 等），装完要 restart 才会重新探测 |
| 看工作区里有哪些可用执行环境 | `multica` | `multica runtime list ；multica runtime activity` | 一个 runtime = 一台机器 + 一个编码 CLI，不是一台机器一个 |
| 定时 / 事件触发跑 Agent | `multica` | `multica autopilot create ；multica autopilot trigger-add` | webhook 触发要先跟用户确认对外暴露的 URL 与凭据 |
| 管 Multica 上的 Agent 定义与技能 | `multica` | `multica agent create \| list \| update \| skills ；multica skill import \| list` | agent env 里的自定义环境变量存在服务端，别往里塞明文密钥 |
| 非交互地跑一次 Grok（脚本 / CI 里用） | `grok-cli` | `grok -p "<prompt>" [--output-format json] [--max-turns N]` | headless 单轮模式，跑完就退出。默认会弹权限确认，脚本里要显式加 --yolo 或配 --tools 白名单 |
| 让 Grok 联网查资料（含 X 平台） | `grok-cli` | `grok -p "<问题>"` | 联网检索是模型的内置工具，不是独立子命令；要限制检索范围就在 prompt 里写明 |
| 把 Grok 嵌进编辑器 / 自建宿主 | `grok-cli` | `grok agent stdio \| serve \| headless` | 走 ACP（JSON-RPC over stdio），宿主负责 UI；stdio 是主要方式 |
| 给 Grok 挂 MCP 服务器 / 插件 | `grok-cli` | `grok mcp add \| list \| enable ；grok plugin install \| list \| marketplace` | MCP 配置写在 ~/.grok/config.toml；改完要重启会话 |
| 回看 / 导出 Grok 的历史会话 | `grok-cli` | `grok sessions list \| search ；grok export <session>` | 会话按工作目录归档；导出的是 Markdown 转录 |
| 排查 Grok 本机环境问题 | `grok-cli` | `grok doctor ；grok inspect` | inspect 显示当前目录下 Grok 实际发现的配置，配置没生效时先看它 |
| 配置 / 检查腾讯广告 API Key 鉴权 | `tencentads` | `tencentads auth login \| status \| logout` | 凭据落在 ~/.tencent-ads；用 --config-dir 可换目录。API Key 不要回显在对话里 |
| 查腾讯广告这个 CLI 到底支持哪些命令 | `tencentads` | `tencentads --list-commands` | 命令面按 edition 变化：默认 edition 只有 auth，营销管理相关命令标着 enterprise |
| 查腾讯广告的账号 / 营销单元 / 创意 / 报表数据 | `tencentads` | `（该 CLI 当前没有对应命令，见 registry/tencentads/CAPABILITY.md）` | 业务能力在腾讯广告官方技能站的 tencentads-* 系列脚本里（skills.ad.qq.com），本库尚未收录，也还没做过业务调用验证 |

## 已收录的 CLI

按业务域数量排序。`采集方式` 说明这份快照是从哪儿来的 —— 这是判断它可信范围的关键。

| CLI | 能干什么 | 域 | 命令 | 采集方式 | 版本 | 能力文档 |
|---|---|---:|---:|---|---|---|
| **github-cli** | GitHub 官方 CLI：仓库 / Issue / PR / Actions 工作流 / release / 搜索 / gist / codespace / project 等协作能力，另含 gh api 直连 REST 与 GraphQL 的兜底入口 | 24 | 214 | release 二进制 help 全树 + 官方 SKILL.md | 2.101.0 | [快照](registry/github-cli/CAPABILITY.md) · [官方原文](registry/github-cli/vendor) |
| **feishu-cli** | 飞书/Lark 官方开源的命令行工具，把开放平台能力封装成终端命令，原生面向 AI Agent。覆盖 23 个业务域、343 个快捷命令、120 个 API 方法，底层可达 2500+ 开放平台端点。 | 23 | 343 | 仓库 skill 文档 | 1.0.96 | [快照](registry/feishu-cli/CAPABILITY.md) · [API 清单](registry/feishu-cli/api-resources.md) · [官方原文](registry/feishu-cli/vendor) |
| **multica** | Multica 官方 CLI：把任务派发到已连接的机器上执行、管理 workspace 与 issue，daemon 负责发现本机可用的编码 Agent 并回传运行状态与结果 | 16 | 134 | release 二进制 help 全树 | 0.4.44 | [快照](registry/multica/CAPABILITY.md) · [官方原文](registry/multica/vendor) |
| **wecom-cli** | 企业微信官方 CLI（Rust 实现，经 npm 包 @wecom/cli 分发），覆盖消息、邮件、在线文档、在线表格、智能表格、智能文档、待办、日程、会议、微盘、通讯录等办公能力。命令树由服务端 discovery 动态下发，随附 14 个官方 Agent Skills。 | 12 | 93 | 仓库 skill 文档 | 1.3.0 | [快照](registry/wecom-cli/CAPABILITY.md) · [官方原文](registry/wecom-cli/vendor) |
| **wps365-cli** | WPS 365 官方 CLI：日历、消息、通讯录、邮箱、云文档、智能文档、智能表格、多维表、会议 9 大业务域，另含 api 兜底命令与 spec 管理 | 9 | 200 | release 二进制 help 全树 | 0.3.5 | [快照](registry/wps365-cli/CAPABILITY.md) |
| **1password-cli** | 1Password 官方 CLI：凭据保险库与条目的读写、op run / op inject 把密钥以环境变量或文件形式注入进程，另含 service account、SSH 代理与文档（Document）管理 | 9 | 68 | release 二进制 help 全树 | 2.39.0 | [快照](registry/1password-cli/CAPABILITY.md) |
| **grok-cli** | xAI 官方 Grok CLI：交互式 TUI、单轮 headless 模式与 ACP agent 模式，带联网检索（含 X 平台）、本机文件与命令执行、会话与子 Agent 管理 | 7 | 63 | release 二进制 help 全树 | 1.0.34 | [快照](registry/grok-cli/CAPABILITY.md) |
| **dreamina** | 即梦（Dreamina）官方 AIGC CLI：文生图 / 图生图 / 文生视频 / 图生视频 / 多模态参考，含账号、会话与任务管理 | 2 | 23 | 本机 CLI help 全树 + 官方 SKILL.md | 673dd28-dirty | [快照](registry/dreamina/CAPABILITY.md) · [官方原文](registry/dreamina/vendor) |
| **tencentads** | 腾讯广告（腾讯营销）API CLI：登录鉴权与状态查询，其余能力按营销 API v3.0 的资源名暴露——账号与管家、营销单元、创意与组件、素材、报表与人群等 | — | 11 | release 二进制 help 全树 | 1.1.5 | [快照](registry/tencentads/CAPABILITY.md) |

## 新增 / 更新一个 CLI

```bash
bin/refresh                                                  # 一键刷新全部已收录 CLI + 索引

bin/cli-cap scan <命令名> --depth 1                          # 递归抓 help 全树
bin/cli-cap scan <命令名> --skill <SKILL.md>                 # 顺带合并厂商官方 Agent 规则
bin/cli-cap show <名字> <关键词>                              # 按关键词查已录入的能力
bin/cli-cap search <关键词>                                   # 跨 CLI 搜索路由与能力文档
bin/cli-cap remember <名字> --intent "需求" --command "命令模板" --note "注意事项"
bin/cli-cap index                                            # 重建 INDEX.md 与 docs/index.html
```

想加一个新的 CLI：往 `clis.json` 加一条记录，再跑 `bin/refresh <名字>`。
同一类分发方式（GitHub Release / 厂商 CDN 直链 / npm 注册表 / 裸二进制）都不需要改脚本；
只有碰到全新的分发渠道时才需要动 `lib/fetchsource.js`。解析档与字段说明见 `CONTRIBUTING.md`。

`remember` 保存到 `routes.json` 并自动重建索引；同一个 CLI、同一个意图再次保存会更新原条目，不执行业务命令。也可手工编辑后运行 `bin/cli-cap index`。
