---
name: feishu-cli
kind: cli
command: lark-cli
version: 1.0.96
license: MIT
source: https://github.com/larksuite/cli
acquired_by: skill-repo
scanned_at: 2026-09-17 06:52:39
业务域: 23
快捷命令: 343
API方法: 120
参考文档: 437
---

# 飞书 CLI（`lark-cli`）— 能力快照

> 飞书/Lark 官方开源的命令行工具，把开放平台能力封装成终端命令，原生面向 AI Agent。覆盖 **23 个业务域**、**343 个快捷命令**、**120 个 API 方法**，底层可达 2500+ 开放平台端点。

## 这份文档怎么用

1. 在「能力域总表」里按场景找到对应域（例如"发消息" → `im`）。
2. 在「命令全量清单」里找到该域的 `+xxx` 命令及其说明。
3. 需要精确参数时跑 `lark-cli <域> <命令> --help`，或查 `api-resources.md`。
4. 写操作一律先 `--dry-run` 预览。

## 概览

| 项 | 值 |
|---|---|
| 可执行文件 | `lark-cli` |
| 版本 | `1.0.96` |
| 仓库 | https://github.com/larksuite/cli |
| 业务域 | 23 |
| 快捷命令（Shortcuts） | 343 |
| API 方法 | 120 |
| 深度参考文档 | 437 篇 |
| 快照时间 | 2026-09-17 06:52:39 |
| 对应 commit | `cb5a3d704379` |

## 安装与首次配置

```bash
# 1. 安装 CLI
npx @larksuite/cli@latest install

# 2. 安装官方 Agent Skills（让 AI 能自动读懂各域用法）
npx skills add larksuite/cli -y -g

# 3. 配置应用凭证（输出授权链接给用户在浏览器完成）
lark-cli config init --new

# 4. 登录授权（--recommend = 自动勾选常用权限）
lark-cli auth login --recommend

# 5. 验证
lark-cli auth status        # 显示 valid 即成功
```

- 首次使用需在飞书开放平台创建自建应用，并把 `app_id` / `app_secret` 交给 CLI。

## 三层命令调用模型

同一件事有三种粒度，优先用最上面那层。

| 层级 | 形态 | 何时用 |
|---|---|---|
| 1. 快捷命令 | `lark-cli <域> +<动作>` | **首选**。已封装默认值、表格输出、dry-run |
| 2. API 命令 | `lark-cli <域> <资源> <方法>` | 快捷命令没覆盖的官方端点，100+ 精选 |
| 3. 通用调用 | `lark-cli api <METHOD> <PATH>` | 兜底，覆盖 2500+ 端点 |

```bash
lark-cli calendar +agenda                                  # 层级 1
lark-cli calendar calendars list                           # 层级 2
lark-cli api GET /open-apis/calendar/v4/calendars          # 层级 3
lark-cli schema calendar.events.instance_view              # 查参数结构
```

> `lark-cli schema <域>.<资源>.<方法>` 会打印该方法的参数、请求体、响应结构、支持身份和所需 scope。**调 API 层前先跑 schema，别猜字段。**

## 能力域总表

「当用户需要…」这一列就是路由依据：拿不准用哪个域时，在这里按场景匹配。

| 域 | 命令前缀 | 能做什么（含触发场景） | 命令数 |
|---|---|---|---:|
| **calendar** | `calendar` | 飞书日历：管理日历日程和会议室。查看/搜索日程、创建/更新日程、管理参会人、查询忙闲和推荐时段、预定会议室。当用户需要查看日程安排、创建/修改会议、查询/预定会议室时使用。不负责：查询过去的视频会议记录（走 lark-meeting）、待办任务（走 lark-task）。 | 17 |
| **im** | `im` | 飞书即时通讯：收发消息和管理群聊。发送和回复消息、搜索聊天记录、管理群聊成员、上传下载图片和文件、管理表情回复、发送应用内/短信/电话加急、发送和处理交互卡片（Interactive Card）、监听卡片按钮回调（card.action.trigger）。当用户需要发消息、查看或搜索聊天记录、下载聊天中的文件、查看群成员、搜索群、创建群聊或话题群、管理标记数据、管理 Feed 置顶（添加/移除/查询置顶会话）、管理标签数据、处理卡片回调时使用。 | 24 |
| **doc** | `docs` / `mindnotes` | 飞书云文档（Docx / Wiki）内容操作：读取、创建、编辑文档，插入或下载图片附件，以及操作思维笔记。用户提供文档 URL/token（包括 doubao.com 的 /docx/、/wiki/）时使用；按 URL 路径/token 而非域名路由。文档内嵌资源按读取参考中的统一规则分流。独立评论操作走 lark-drive；随正文读取评论使用 docs +fetch。表格或 Base 内部数据操作不在本 skill。 | 7 |
| **drive** | `drive` | 飞书云空间（云盘/云存储）：管理 Drive 文件和文件夹，包含上传/下载、创建文件夹、复制/移动/删除、查看元数据、查询权限设置、评论/权限/订阅、标题、版本、飞书文档密级标签（secure labels）和本地文件导入。用户需要整理云盘目录、处理云空间资源 URL/token、判断链接类型/真实 token/标题，或导入 Word/Markdown/Excel/CSV/PPTX/.base 为 docx/sheet/bitable/slides 时使用；doubao.com 云空间 URL/token 也按资源路径和 token 路由，不回退 WebFetch。不负责：文档内容编辑（走 lark-doc）、表格/Base 表内数据操作（走 lark-sheets/lark-base）、知识空间节点/成员管理（走 lark-wiki）、原生 Markdown 文件读写/patch/diff（走 lark-markdown）。 | 43 |
| **markdown** | `markdown` | 飞书 Markdown：查看、创建、上传、编辑和比较飞书中的原生 Markdown 文件。当用户要操作飞书 Markdown 文件，或比较其远端版本及本地草稿时使用。纯本地 Markdown 文件操作不触发本 skill。不负责将 Markdown 导入为飞书在线文档，也不负责文件搜索、权限、评论、移动、删除等云空间管理操作。 | 5 |
| **sheets** | `sheets` | 飞书电子表格：创建和操作电子表格。支持工作表与行列结构（增删/合并/尺寸/隐藏/冻结/分组）、单元格读写（值/公式/样式/批注/单元格图片）、区域复制移动排序填充、查找替换、批量更新，图表、透视表、条件格式、筛选器与筛选视图、下拉列表、迷你图、浮动图片等对象的创建与维护，以及公式校验、历史版本回滚、本地 Excel/CSV 与飞书表格的导入导出。当用户需要创建或编辑表格、统计汇总与可视化、表格美化、公式计算（含 Excel 公式迁移）、金融/财务建模（DCF、三张表、预算、Sensitivity 等）时使用。多维表格（Base/bitable）请改用 lark-base；若用户是想按名称或关键词搜索云空间（云盘/云存储）里的表格文件，请改用 lark-drive 的 drive +search 先定位资源。当用户给出 doubao.com 的 /sheets/ URL/token 时，也应直接使用本 skill，不要因为域名不是飞书而回退到 WebFetch；路由依据是 URL 路径模式和 token，而不是域名。 | 44 |
| **slides** | `slides` | 飞书幻灯片：创建和编辑幻灯片。创建演示文稿、读取幻灯片内容、管理幻灯片页面（创建、删除、读取、局部替换）。当用户需要创建或编辑幻灯片、读取或修改单个页面时使用。当用户给出 doubao.com 的 /slides/ URL/token 时，也应直接使用本 skill，不要因为域名不是飞书而回退到 WebFetch；路由依据是 URL 路径模式和 token，而不是域名。不负责：云文档内容编辑（走 lark-doc）、云文档里的独立画板对象（走 lark-whiteboard）、上传或下载普通文件（走 lark-drive）。 | 13 |
| **base** | `base` | 飞书多维表格（Base）操作：建表、字段、记录、视图、统计、公式/lookup、表单、仪表盘、应用模式（BaseApp/AppMode 页面与组件）、Workspace 目录、workflow、角色权限、模板中心（多维表格模板分类/列表/搜索）；遇到 Base/多维表格/bitable、BaseApp/AppMode、/base/ 或 /app/ 链接时使用。BaseApp 不走 lark-apps；文件导入/导出转 lark-drive，认证/授权转 lark-shared。 | 11 |
| **task** | `task` | 飞书任务：管理任务、清单和任务智能体。创建待办任务、查看和更新任务状态、拆分子任务、组织任务清单、分配协作成员、上传任务附件、注册或注销任务智能体、更新任务智能体的主页数据、写入智能体任务记录。当用户需要创建待办事项、查看任务列表、跟踪任务进度、管理项目清单或给他人分配任务、为任务上传附件文件、注册注销任务智能体、更新智能体主页数据、写入任务记录时使用。 | 17 |
| **mail** | `mail` | 飞书邮箱：Use when user mentions 起草邮件、写邮件、草稿、发送/回复/转发邮件、查阅邮件、看邮件、搜索邮件、邮件文件夹、邮件标签、邮件联系人、监听新邮件、邮件收信规则等；use for mail/email intent only. Do not use for docs/sheets/calendar/auth setup/pure contact lookup/IM chat tasks. | 21 |
| **contact** | `contact` | 飞书 / Lark 通讯录:按姓名 / 邮箱解析成 open_id,或按 open_id 反查姓名 / 部门 / 邮箱 / 联系方式 / 个人状态 / 签名,以及按关键词搜索当前用户可见的机器人 / 智能体(agent)。当用户提到一个名字要下一步发消息 / 排日程,或拿到 open_id 想查具体信息时使用。不负责部门树遍历、按部门列员工、组织架构图,这类需求走原生 OpenAPI。 | 4 |
| **wiki** | `wiki` | 飞书知识库：管理知识空间、空间成员和文档节点。创建和查询知识空间、查看和管理空间成员、管理节点层级结构、在知识库中组织文档和快捷方式。当用户需要在知识库中查找或创建文档、浏览知识空间结构、查看或管理空间成员、移动或复制节点时使用。当用户给出 doubao.com 的 /wiki/ URL/token 时，也应直接使用本 skill，不要因为域名不是飞书而回退到 WebFetch；路由依据是 URL 路径模式和 token，而不是域名。不负责：上传文件到知识库节点下（走 lark-drive）、编辑文档/表格/Base 内容（走 lark-doc / lark-sheets / lark-base）。 | 13 |
| **meeting** | `vc` / `minutes` / `note` | 飞书视频会议：查询会议记录与会议产物(纪要/逐字稿/妙记)、妙记搜索/上传/下载/编辑、机器人参与会议；查询进行中的会议、实时会议内容(发言/聊天/共享文档)问答(会上/会里)、发送会中聊天/表情；基于 meeting_id、meeting_no、event_id、note_id、minute_token、vc-node-id 或妙记 URL 查询相关信息。预约会议、忙闲和会议室管理走 lark-calendar。 | 23 |
| **vc** | `vc` | 仅当用户或上游配置显式指定 lark-vc 时使用，相关请求统一交由 lark-meeting 技能处理。 | — |
| **minutes** | `minutes` | 仅当用户或上游配置显式指定 lark-minutes 时使用，相关请求统一交由 lark-meeting 技能处理。 | — |
| **note** | `note` | 仅当用户或上游配置显式指定 lark-note 时使用，相关请求统一交由 lark-meeting 技能处理。 | — |
| **whiteboard** | `whiteboard` | 飞书画板：查询和编辑飞书云文档中的画板。支持导出画板为预览图片、导出原始节点结构、使用多种格式更新画板内容。 当用户需要查看画板内容、导出画板图片、编辑画板时使用此 skill。不负责：飞书云文档内容编辑（lark-doc）、文档内嵌电子表格/Base（lark-sheets / lark-base）。 | 2 |
| **attendance** | `attendance` | 飞书考勤打卡：查询自己的考勤打卡记录 | — |
| **approval** | `approval` | 飞书审批：查询和处理审批待办/已办/实例，搜索可发起审批定义、查看定义详情并发起原生审批实例。当用户要处理审批任务、查看审批实例、搜索或发起审批时使用。审批待办不是飞书任务；非审批类待办走 lark-task。不负责创建审批定义；三方审批定义不走原生提单。 | — |
| **okr** | `okr` | 飞书 OKR：管理目标与关键结果。查看和编辑 OKR 周期、目标、关键结果、对齐关系、量化指标和进展记录。当用户需要查看或创建 OKR、管理目标和关键结果、查看对齐关系时使用。不负责：待办任务管理（lark-task）、日程/会议安排（lark-calendar）、绩效评估 | 23 |
| **apps** | `apps` / `apps` | 妙搭（Spark/Miaoda）应用开发与托管：应用创建、本地全栈开发、云端生成迭代、创意设计（UI mockup / 可交互原型 / 线框图 / 落地页 / 仪表盘 / 幻灯片 deck / 视觉探索）、AI相关能力和飞书平台能力或者其他外部能力集成、日志/Trace/监控指标/PV/UV 查询、环境变量管理、应用协作者与协作权限设置、应用角色与成员管理、自动化触发器（定时/记录变更/Webhook/飞书审批）。当用户要开发/新建一个系统·工具·平台·应用，或要本地开发 / 云端开发 / 修改 / 部署 / 发布 / 上线 / 拿可分享链接，或用 HTML 做页面·网站·部署到妙搭，或要设计 / design / mockup / prototype / wireframe / 做 PPT / deck / 视觉探索，或提到妙搭/Spark/Miaoda（应用运行时域名形如 *.aiforce.cloud）、应用数据库、应用文件存储、开放 API Key、可见范围、应用协作者/开发权限、应用角色/角色成员、线上日志、接口请求量、错误量、延迟、访问量、环境变量、给妙搭应用配自动化任务/定时触发/审批通过后自动触发时使用。不负责普通云盘文件上传（lark-drive）、飞书文档编辑（lark-doc）、原生幻灯片创建（lark-slides）。 | 70 |
| **event** | `event` | Lark/Feishu real-time event listening / subscribing / consuming: stream events as NDJSON via `lark-cli event consume <EventKey>` (covers IM messages/reactions/chat changes, Approval status changes, Task updates, VC meeting started/joined/ended, Minutes generated, Whiteboard updated, etc.). Use for Lark bots, real-time message processing, long-running subscribers, streaming webhook/push handlers. Supports `--max-events` / `--timeout` bounded runs and a stderr ready-marker contract — designed for AI agents running as subprocesses. | — |
| **vc-agent** | `vc-agent` | 仅当用户或上游配置显式指定 lark-vc-agent 时使用，相关请求统一交由 lark-meeting 技能处理。 | — |

### 辅助与工作流模块

| 模块 | 能做什么 |
|---|---|
| **openapi-explorer** | 飞书/Lark 原生 OpenAPI 探索：从官方文档库中挖掘未经 CLI 封装的原生 OpenAPI 接口。当用户的需求无法被现有 lark-* skill 或 lark-cli 已注册命令满足，需要查找并调用原生飞书 OpenAPI 时使用。 |
| **shared** | Use for lark-cli setup/auth tasks: auth login/status/logout, user vs bot identity, business-domain permissions (--domain, including all/docs/drive), missing scopes, revoking authorization, or handling _notice JSON. |
| **skill-maker** | 创建 lark-cli 的自定义 Skill。当用户需要把飞书 API 操作封装成可复用的 Skill（包装原子 API 或编排多步流程）时使用。 |
| **workflow-meeting-summary** | 会议纪要整理工作流：汇总指定时间范围内的会议纪要并生成结构化报告。当用户需要整理会议纪要、生成会议周报、回顾一段时间内的会议内容时使用。 |
| **workflow-standup-report** | 日程待办摘要：编排 calendar +agenda 和 task +get-my-tasks，生成指定日期的日程与未完成任务摘要。适用于了解今天/明天/本周的安排。 |

## 命令全量清单

共 343 条命令/调用形态，按域分组。

### calendar · 17 条

> 快速查全部子命令：`lark-cli calendar --help`

| 命令 | 说明 |
|---|---|
| `lark-cli calendar +agenda` | 查看日程安排（默认今天） |
| `lark-cli calendar +chat-search` |  |
| `lark-cli calendar +create` | 创建日程并邀请参会人（ISO 8601 时间） |
| `lark-cli calendar +delete` | 删除日程；重复性日程/例外必须传 --apply-to（详见 重复性日程操作规范） |
| `lark-cli calendar +detail` | 从日程进一步拿 AI 智能纪要 / 逐字稿 / 妙记产物 |
| `lark-cli calendar +freebusy` |  |
| `lark-cli calendar +get` |  |
| `lark-cli calendar +join-event` | 凭分享 token 加入日程（分享链接/二维码/分享卡片/RSVP 卡片） |
| `lark-cli calendar +list-attendees` | 列出日程的参与人和会议室（支持按 --type 过滤：user / resource / chat / third_party） |
| `lark-cli calendar +meeting` | 从日程获取关联的视频会议 ID 或用户绑定的会议纪要文档 |
| `lark-cli calendar +room-find` |  |
| `lark-cli calendar +rsvp` | 回复日程（接受/拒绝/待定） |
| `lark-cli calendar +search-event` | 按关键词搜索日程 |
| `lark-cli calendar +search-user` |  |
| `lark-cli calendar +suggestion` | 根据非明确时间或一段时间范围，推荐多个可用时间块方案 |
| `lark-cli calendar +transfer` | 转让日程组织者（「把这个日程交给 XX」「组织者改成 XX」「这个会转给我」「bot 建完还给我」） |
| `lark-cli calendar +update` | 更新既有日程字段，或独立增量添加/移除参会人和会议室；重复性日程/例外必须传 --apply-to（详见 重复性日程操作规范） |

### im · 24 条

> 快速查全部子命令：`lark-cli im --help`

| 命令 | 说明 |
|---|---|
| `lark-cli im +chat-create` | Create a group chat or topic chat; user/bot; --chat-mode group / topic; private/public; invites users/bots; optionally sets bot manager |
| `lark-cli im +chat-list` | List chats the current user/bot is a member of; defaults to groups; pass --types=p2p,group to include p2p single chats (user-only); user/bot; supports sorting, auto-pagination, --exclude-muted (user-only) |
| `lark-cli im +chat-members-list` | List members of a chat; returns separate users[] / bots[] buckets; callable as user or bot; --member-types filters which kinds to return; --page-all pagination; surfaces truncations[] when the server caps a bucket |
| `lark-cli im +chat-messages-list` | List messages in a chat or P2P conversation; user/bot; accepts --chat-id or --user-id, resolves P2P chat_id, supports time range, --order asc/desc sorting, auto-pagination |
| `lark-cli im +chat-search` | Search visible group chats by --query keyword and/or --member-ids; user/bot; e.g. look up chat_id by group name; supports type filters, sorting, auto-pagination, and --exclude-muted (user identity only) |
| `lark-cli im +chat-update` | Update group chat name or description; user/bot; updates a chat's name or description |
| `lark-cli im +feed-group-list` | List the caller's feed groups (tags); user-only; supports --page-all auto-pagination |
| `lark-cli im +feed-group-list-item` | List feed cards in a feed group (tag); user-only; enriches each item with chat_name resolved from feed_id; supports --page-all auto-pagination |
| `lark-cli im +feed-group-query-item` | Look up specific feed cards in a feed group (tag) by ID; user-only; enriches each item with chat_name resolved from feed_id |
| `lark-cli im +feed-shortcut-create` | Add chats to the user's feed shortcuts; user-only; oc_xxx chat IDs only; batch up to 10 per call; --head/--tail controls insertion order; partial failures return an ok:false ledger |
| `lark-cli im +feed-shortcut-list` | List one page of the user's feed shortcuts; user-only; omit --page-token for the first page; default output enriches CHAT entries under detail; pass --no-detail to skip the extra lookup and im:chat:read scope |
| `lark-cli im +feed-shortcut-remove` | Remove chats from the user's feed shortcuts; user-only; batch up to 10 per call; removing an absent shortcut is idempotent success; real per-item failures return an ok:false ledger |
| `lark-cli im +flag-cancel` | Cancel (remove) a bookmark. When no --flag-type is given, best-effort double-cancel: removes message layer and (when chat_type is determinable) feed layer |
| `lark-cli im +flag-create` | Create a bookmark on a message; user-only; defaults to message-layer flag; use --flag-type feed for feed-layer flag (item_type auto-detected from chat mode) |
| `lark-cli im +flag-list` | List bookmarks; user-only; auto-enriches feed-type thread entries with message content; --page-all is capped by --page-limit (default 20, max 1000), and has_more=true means the result is incomplete |
| `lark-cli im +message-read-users` | user: im:message:readonly (recommended), im:message, im:message:basic, or im:message:get_as_user; bot: im:message:readonly |
| `lark-cli im +messages-edit` | Edit a message's content (text/post, including the attachment zone); bot-only (user identity is rejected by the server); PUT /open-apis/im/v1/messages/:message_id |
| `lark-cli im +messages-mget` | Batch get messages by IDs; user/bot; fetches up to 50 om_ message IDs, formats sender names, expands thread replies |
| `lark-cli im +messages-read-status` | Batch query whether the current user read 1–50 messages; user-only; returns readable items and invalid message IDs |
| `lark-cli im +messages-reply` | Reply to a message (supports thread replies); user/bot; supports text/markdown/post/media replies, reply-in-thread, idempotency key |
| `lark-cli im +messages-resources-download` | Download an image/file from a message; folders are not directly downloadable — expand with im files folder --recursive first, then download the files inside; user/bot |
| `lark-cli im +messages-search` | Search messages across chats (supports keyword, sender, time range filters) with user or bot identity; filters by chat/sender/attachment/time, supports auto-pagination via --page-all / --page-limit, enriches results via batched mget and chats batch_query |
| `lark-cli im +messages-send` | Send a message to a chat or direct message; user/bot; sends to chat-id or user-id with text/markdown/post/media, supports idempotency key |
| `lark-cli im +threads-messages-list` | List messages in a thread; user/bot; accepts om_/omt_ input, resolves message IDs to thread_id, supports --order asc/desc sorting, auto-pagination |

### doc · 7 条

> 快速查全部子命令：`lark-cli docs --help;lark-cli mindnotes --help`

| 命令 | 说明 |
|---|---|
| `lark-cli docs +create` | 导入 / 空文档 |
| `lark-cli docs +fetch` | 读取 / 摘要 |
| `lark-cli docs +media-download` | 下载素材 |
| `lark-cli docs +media-insert` | 插入本地素材 |
| `lark-cli docs +media-preview` | 预览素材 |
| `lark-cli docs +script` | 草稿初始化、解析与统计 |
| `lark-cli docs +update` | 编辑 / block 直达链接 |

### drive · 43 条

> 快速查全部子命令：`lark-cli drive --help`

| 命令 | 说明 |
|---|---|
| `lark-cli drive +add-comment` | 给 doc/docx/file/sheet/slides/base(bitable) 添加全文/局部评论；不支持妙搭 apps。 |
| `lark-cli drive +add-reply` | 给已有评论添加回复。 |
| `lark-cli drive +apply-permission` | 以 user 身份向文档 owner 申请访问权限。 |
| `lark-cli drive +batch-query-comments` | 按评论 ID 批量获取评论。 |
| `lark-cli drive +copy` | copy — 复制文件；优先使用 [drive |
| `lark-cli drive +cover` | 查看或下载文件封面图规格。 |
| `lark-cli drive +create-folder` | 新建 Drive 文件夹，支持父文件夹与 bot 创建后自动授权。 |
| `lark-cli drive +create-shortcut` | 在另一个文件夹里创建现有 Drive 文件的快捷方式。 |
| `lark-cli drive +delete` | 删除 Drive 文件或文件夹，文件夹删除会轮询异步任务。 |
| `lark-cli drive +delete-reply` | 删除评论下的某条回复（高风险，需 --yes）。 |
| `lark-cli drive +download` | 下载 Drive 文件到本地。 |
| `lark-cli drive +export` | 将 doc/docx/sheet/bitable/slides 导出为本地文件。 |
| `lark-cli drive +export-download` | 根据导出产物的 file_token 下载文件。 |
| `lark-cli drive +fetch` | 读取文档内容 |
| `lark-cli drive +import` | 将本地文件导入为飞书在线文档、表格、多维表格或幻灯片。 |
| `lark-cli drive +inspect` | 检视 URL 的类型、标题和 canonical token；wiki URL 会自动解包到底层文档。 |
| `lark-cli drive +list-comments` | 分页获取评论列表。 |
| `lark-cli drive +list-replies` | 分页获取某条评论下的回复。 |
| `lark-cli drive +member-add` | 添加一个或最多 10 个 Drive 文档、文件、文件夹或 wiki 节点协作者/授权成员；封装 Drive permission member create/batch_create，真实写入需要 --yes。 |
| `lark-cli drive +member-list` | 查询 Drive 文档、文件、文件夹或 wiki 节点的协作者/授权成员列表。 |
| `lark-cli drive +member-remove` | 移除一个 Drive 文档、文件、文件夹或 wiki 节点协作者；封装 Drive permission member delete，真实写入需要 --yes。 |
| `lark-cli drive +move` | 移动 Drive 文件或文件夹；Wiki 层级移动走 lark-wiki。 |
| `lark-cli drive +node-copy` |  |
| `lark-cli drive +permission-get-setting` | 查询文件、文件夹或云文档自身的公开访问、分享、协作者管理、安全与评论权限设置；支持 URL 或裸 token + --type；不递归读取文件夹子文档权限。 |
| `lark-cli drive +preview` | 查看或下载文件内容，或者查看文件可用预览格式并获取 PDF / HTML / 文本 / 图片等转换预览产物。 |
| `lark-cli drive +pull` | 从 Drive 拉取文件到本地目录，支持重复远端路径处理和增量模式。 |
| `lark-cli drive +push` | 将本地目录推送到 Drive 文件夹，支持 skip / smart / overwrite 与确认后删除远端。 |
| `lark-cli drive +react-reply` | 给回复加/删表情回应。 |
| `lark-cli drive +resolve-comment` | 把评论标记为已解决（is_solved=true）。 |
| `lark-cli drive +restore-comment` | 恢复/重新打开已解决评论（is_solved=false）。 |
| `lark-cli drive +search` | 搜索文档、Wiki、表格、文件夹等云空间对象；支持 --edited-since、--created-by-me、--mine、--doc-types 等扁平 flag；区分 original creator 与 owner 语义。 |
| `lark-cli drive +secure-label-list` | 列出当前用户可用的密级标签。 |
| `lark-cli drive +secure-label-update` | 更新 Drive 文件或文档的密级标签。 |
| `lark-cli drive +status` | 比较本地目录与 Drive 文件夹差异；默认按 SHA-256 精确比较，--quick 使用修改时间近似比较。 |
| `lark-cli drive +sync` | 双向同步本地目录与 Drive 文件夹：拉取 new_remote、推送 new_local，modified 按 --on-conflict=remote-wins\ / local-wins\ / keep-both\ / ask 处理；--quick 用修改时间近似比较；--on-duplicate-remote 支持 fail / newest / oldest；只同步 type=file，跳过在线文档和 shortcut，且不会删除两端多余文件。 |
| `lark-cli drive +task` | 查询 import/export/move/delete 等异步任务结果。 |
| `lark-cli drive +update-reply` | 整体替换某条回复的内容。 |
| `lark-cli drive +update-title` | 重命名文件、文件夹、在线文档或知识库。 |
| `lark-cli drive +upload` | 上传本地文件到 Drive 文件夹或 wiki 节点；修改/重写/更新已有文件时优先覆盖上传，而不是直接上传一个新文件。 |
| `lark-cli drive +version-delete` | 删除指定历史版本。 |
| `lark-cli drive +version-get` | 下载指定历史版本。 |
| `lark-cli drive +version-history` | 查看文件历史版本。 |
| `lark-cli drive +version-revert` | 回滚到指定历史版本。 |

### markdown · 5 条

> 快速查全部子命令：`lark-cli markdown --help`

| 命令 | 说明 |
|---|---|
| `lark-cli markdown +create` | Create a Markdown file in Drive |
| `lark-cli markdown +diff` | Compare two remote Markdown versions, or compare remote Markdown against a local file |
| `lark-cli markdown +fetch` | Fetch a Markdown file from Drive |
| `lark-cli markdown +overwrite` | Overwrite an existing Markdown file in Drive |
| `lark-cli markdown +patch` | Patch a Markdown file in Drive via fetch-local-replace-overwrite |

### sheets · 44 条

> 快速查全部子命令：`lark-cli sheets --help`

| 命令 | 说明 |
|---|---|
| `lark-cli sheets +batch-chart-create` | 画图表 / 可视化 / 柱状图 / 折线图 / 饼图 / 趋势 / 占比 |
| `lark-cli sheets +cells-batch-clear` | 批量清除多区域 |
| `lark-cli sheets +cells-clear` | 行列操作 |
| `lark-cli sheets +cells-get` |  |
| `lark-cli sheets +cells-merge` | 行列操作 |
| `lark-cli sheets +cells-replace` | 查找 / 替换文本 |
| `lark-cli sheets +cells-search` | 查找 / 替换文本 |
| `lark-cli sheets +cells-set` | Lark Sheet Write Cells |
| `lark-cli sheets +cells-set-image` | 写入数据 |
| `lark-cli sheets +cells-set-style` | 写入数据 |
| `lark-cli sheets +cells-unmerge` | 行列操作 |
| `lark-cli sheets +changeset-get` | 复核编辑变更 / 取版本间差异 |
| `lark-cli sheets +chart-config-update` | 画图表 / 可视化 / 柱状图 / 折线图 / 饼图 / 趋势 / 占比 |
| `lark-cli sheets +chart-create` | 画图表 / 可视化 / 柱状图 / 折线图 / 饼图 / 趋势 / 占比 |
| `lark-cli sheets +chart-create-basic` | 画图表 / 可视化 / 柱状图 / 折线图 / 饼图 / 趋势 / 占比 |
| `lark-cli sheets +chart-data-update` | 画图表 / 可视化 / 柱状图 / 折线图 / 饼图 / 趋势 / 占比 |
| `lark-cli sheets +chart-list` | 画图表 / 可视化 / 柱状图 / 折线图 / 饼图 / 趋势 / 占比 |
| `lark-cli sheets +chart-update` | 画图表 / 可视化 / 柱状图 / 折线图 / 饼图 / 趋势 / 占比 |
| `lark-cli sheets +cols-resize` | 行列操作 |
| `lark-cli sheets +cond-format-create` | 条件格式 / 条件高亮 / 数据条 / 色阶 |
| `lark-cli sheets +csv-get` |  |
| `lark-cli sheets +csv-put` | Lark Sheet Write Cells |
| `lark-cli sheets +dim-delete` | 子表结构 |
| `lark-cli sheets +dim-insert` | 格式继承（新列/新行） |
| `lark-cli sheets +filter-create` | 保存多份筛选状态 / 命名筛选视图 |
| `lark-cli sheets +filter-view-create` | 保存多份筛选状态 / 命名筛选视图 |
| `lark-cli sheets +float-image-create` | 插图：自由摆放的装饰 |
| `lark-cli sheets +history-list` | 查编辑历史 / 回滚到历史版本 |
| `lark-cli sheets +history-revert` | 查编辑历史 / 回滚到历史版本 |
| `lark-cli sheets +history-revert-status` | 查编辑历史 / 回滚到历史版本 |
| `lark-cli sheets +pivot-create` | 分组汇总 / 透视 |
| `lark-cli sheets +range-copy` | 格式继承（新列/新行） |
| `lark-cli sheets +range-sort` | 行列操作 |
| `lark-cli sheets +revision-get` | 工作簿操作 |
| `lark-cli sheets +rows-resize` | 行列操作 |
| `lark-cli sheets +sheet-copy` | 工作簿操作 |
| `lark-cli sheets +sheet-info` | 子表结构 |
| `lark-cli sheets +sparkline-create` | 迷你图 / 单元格内趋势线 |
| `lark-cli sheets +styles-put` | 美化收尾 |
| `lark-cli sheets +table-put` | Lark Sheet Sheet Structure |
| `lark-cli sheets +workbook-create` | Lark Sheet Styles Put |
| `lark-cli sheets +workbook-export` | 工作簿操作 |
| `lark-cli sheets +workbook-import` | 工作簿操作 |
| `lark-cli sheets +workbook-info` | 工作簿操作 |

### slides · 13 条

> 快速查全部子命令：`lark-cli slides --help`

| 命令 | 说明 |
|---|---|
| `lark-cli slides +add-slide` | 向已有演示文稿追加或插入一页（--before-slide-id 控制位置），XML 支持 @file / stdin，<img src="@./path"> 占位符自动上传 |
| `lark-cli slides +create` | 2. 创建流程：新建演示文稿用 slides |
| `lark-cli slides +delete-slide` | 按 slide_id 删除一页 |
| `lark-cli slides +history-list` | 查看或回滚历史版本 |
| `lark-cli slides +history-revert` | 查看或回滚历史版本 |
| `lark-cli slides +history-revert-status` | 查看或回滚历史版本 |
| `lark-cli slides +media-download` | 根据 Slides 图片 file_token 下载本地图片；--output 选填，未传时使用 --output-dir 默认值 .lark-slides/media 并自动生成文件名；调用后使用返回的 path，不要猜测实际路径；直连下载无权限时自动回退到源文件预览 |
| `lark-cli slides +media-upload` | 上传本地图片到指定演示文稿，返回 file_token（用作 <img src="...">），最大 20 MB |
| `lark-cli slides +node-get` |  |
| `lark-cli slides +replace-slide` | 对已有幻灯片页面进行块级替换/插入（block_replace / block_insert），自动注入 id 和 <content/>，不改变页序 |
| `lark-cli slides +screenshot` | 把幻灯片页面截图保存为本地图片；用 --slide-number 指定页码（从 1 开始，多页重复传入）或用 --slide-id 指定页面；单张用 --output .lark-slides/screenshots/<deck-or-task-id>/page-01，批量用 --output-dir .lark-slides/screenshots/<deck-or-task-id>（一次最多 10 页）；后续必须读取返回的 output / screenshots[].path |
| `lark-cli slides +update-slide` | 把一整页 XML 交给已有页面，页面变成 --content 描述的样子；能一次改样式/插入/删除/备注/背景，slide_id 和页序不变。没写进 --content 的元素会被删除 |
| `lark-cli slides +xml-get` | 读取全文或单页 XML；用 --presentation 指定演示文稿，单页传 --slide-id 或 --slide-number；用 --output 把 XML 存到本地文件（必须是 CWD 内的相对路径，如 .lark-slides/plan/<deck>/readback.xml） |

### base · 11 条

> 快速查全部子命令：`lark-cli base --help`

| 命令 | 说明 |
|---|---|
| `lark-cli base +app-page-list` | 3. 页面： 使用 |
| `lark-cli base +base-get` | 读取 Base： Base 信息用 |
| `lark-cli base +dashboard-block-get-data` | 3. 读取内容： |
| `lark-cli base +record-batch-create` |  |
| `lark-cli base +record-batch-update` |  |
| `lark-cli base +record-get` | 已知若干个 record_id： |
| `lark-cli base +record-list` | 其余读取： |
| `lark-cli base +record-search` | 关键词搜索： |
| `lark-cli base +search` | 最近访问：lark-cli drive |
| `lark-cli base +title-resolve` |  |
| `lark-cli base +url-resolve` |  |

### task · 17 条

> 快速查全部子命令：`lark-cli task --help`

| 命令 | 说明 |
|---|---|
| `lark-cli task +assign` | assign or remove task members |
| `lark-cli task +comment` | add a comment to a task |
| `lark-cli task +complete` | mark a task as complete |
| `lark-cli task +create` | create a task |
| `lark-cli task +followers` | manage task followers |
| `lark-cli task +get-my-tasks` | List tasks assigned to me |
| `lark-cli task +get-related-tasks` | list tasks related to me |
| `lark-cli task +reminder` | manage task reminders |
| `lark-cli task +reopen` | reopen a completed task |
| `lark-cli task +search` | > 任务搜索相关性提示： |
| `lark-cli task +set-ancestor` | set or clear a task ancestor |
| `lark-cli task +tasklist-create` | create a tasklist and optionally add tasks |
| `lark-cli task +tasklist-members` | manage tasklist members |
| `lark-cli task +tasklist-search` | search tasklists |
| `lark-cli task +tasklist-task-add` | add tasks to a tasklist |
| `lark-cli task +update` | update task attributes |
| `lark-cli task +upload-attachment` | upload a local file as an attachment to a task |

### mail · 21 条

> 快速查全部子命令：`lark-cli mail --help`

| 命令 | 说明 |
|---|---|
| `lark-cli mail +decline-receipt` | Dismiss the read-receipt request banner on an incoming mail by clearing its READ_RECEIPT_REQUEST label, without sending a receipt. Use when the user wants to silence the prompt but refuse to confirm they have read it. Idempotent — safe to re-run. |
| `lark-cli mail +draft-create` |  |
| `lark-cli mail +draft-edit` | Use when updating an existing mail draft without sending it. Prefer this shortcut over calling raw drafts.get or drafts.update directly, because it performs draft-safe MIME read/patch/write editing while preserving unchanged structure, attachments, and headers where possible. |
| `lark-cli mail +forward` | Forward a message and save as draft (default). Use --confirm-send to send immediately after user confirmation. Original message block included automatically. |
| `lark-cli mail +lint-html` | Lint mail HTML body for compatibility / safety / Feishu-native rules. Returns warnings/errors and (default) auto-fixed HTML. Read-only: no draft, no API call. Use this BEFORE creating a draft to preview what the writing-path lint would change, or as a CI gate for static HTML templates. |
| `lark-cli mail +message` |  |
| `lark-cli mail +message-trash` | 3. 用户确认后 → |
| `lark-cli mail +messages` | Use when reading full content for multiple emails by message ID. Accepts comma-separated message IDs; CLI handles more than 20 IDs in batches and merges output. |
| `lark-cli mail +reply` | Reply to a message and save as draft (default). Use --confirm-send to send immediately after user confirmation. Sets Re: subject, In-Reply-To, and References headers automatically. |
| `lark-cli mail +reply-all` | Reply to all recipients and save as draft (default). Use --confirm-send to send immediately after user confirmation. Includes all original To and CC automatically. |
| `lark-cli mail +send` | Compose a new email and save as draft (default). Use --confirm-send to send immediately after user confirmation. |
| `lark-cli mail +send-receipt` | Send a read-receipt reply for an incoming message that requested one (i.e. carries the READ_RECEIPT_REQUEST label). Body is auto-generated (subject / recipient / send time / read time) to match the Lark client's receipt format — callers cannot customize it, matching the industry norm that read-receipt bodies are system-generated templates, not free-form replies. Intended for agent use after the user confirms. |
| `lark-cli mail +share-to-chat` | Share an email or thread as a card to a Lark IM chat. |
| `lark-cli mail +signature` | List or view email signatures with default usage info. |
| `lark-cli mail +template-create` | Create a personal mail template. Scans HTML <img src> local paths (reusing draft inline-image detection), uploads inline images and non-inline attachments to Drive, rewrites HTML to cid: references, and POSTs a Template payload to mail.user_mailbox.templates.create. |
| `lark-cli mail +template-update` | Update an existing mail template. Supports --inspect (read-only projection), --print-patch-template (prints a JSON skeleton for --patch-file), and flat flags (--set-subject / --set-name / etc). Internally it GETs the template, applies the patch, rewrites <img> local paths to cid: refs, and PUTs a full-replace update (no optimistic locking: last-write-wins). |
| `lark-cli mail +thread` | Use when querying a full mail conversation/thread by thread ID. Returns all messages in chronological order, including replies and drafts, with body content and attachments metadata, including inline images. |
| `lark-cli mail +thread-modify` | Modify existing mail threads by adding/removing label IDs or moving them to a folder. Batches thread IDs in groups of 20 and returns success_thread_ids / failed_thread_ids. |
| `lark-cli mail +thread-trash` | Soft-delete existing mail threads. Batches thread IDs in groups of 20 and returns success_thread_ids / failed_thread_ids. Requires --yes. |
| `lark-cli mail +triage` | List mail summaries (date/from/subject/message_id). Use --query for full-text search, --filter for exact-match conditions. |
| `lark-cli mail +watch` | Watch for incoming mail events via WebSocket (requires scope mail:event and bot event mail.user_mailbox.event.message_received_v1 added). Run with --print-output-schema to see per-format field reference before parsing output. |

### contact · 4 条

> 快速查全部子命令：`lark-cli contact --help`

| 命令 | 说明 |
|---|---|
| `lark-cli contact +get-user` | 已知 open_id 取他人资料 |
| `lark-cli contact +messages-send` |  |
| `lark-cli contact +search-bot` | 按关键词搜索当前用户可见的机器人 / 智能体 |
| `lark-cli contact +search-user` | 按姓名 / 邮箱搜员工拿 open_id |

### wiki · 13 条

> 快速查全部子命令：`lark-cli wiki --help`

| 命令 | 说明 |
|---|---|
| `lark-cli wiki +delete-space` | Delete a wiki space, polling the async delete task when needed |
| `lark-cli wiki +member-add` | Add a member to a wiki space |
| `lark-cli wiki +member-list` | List members of a wiki space (supports pagination) |
| `lark-cli wiki +member-remove` | Remove a member from a wiki space |
| `lark-cli wiki +move` | Move a wiki node, or move a Drive document into Wiki |
| `lark-cli wiki +move-to-drive` | Move a wiki node to a Drive folder and poll the async task |
| `lark-cli wiki +node-copy` | Copy a wiki node to a target space or parent node |
| `lark-cli wiki +node-create` | Create a wiki node with automatic space resolution |
| `lark-cli wiki +node-delete` | Delete a wiki node, polling the async delete task when needed |
| `lark-cli wiki +node-get` | Get a wiki node's details by node_token / obj_token / Lark URL |
| `lark-cli wiki +node-list` | List wiki nodes in a space or under a parent node (supports pagination) |
| `lark-cli wiki +space-create` | Create a wiki space (user identity only) |
| `lark-cli wiki +space-list` | List all wiki spaces accessible to the caller |

### meeting · 23 条

> 快速查全部子命令：`lark-cli vc --help;lark-cli minutes --help;lark-cli note --help`

| 命令 | 说明 |
|---|---|
| `lark-cli vc +apply-permission` |  |
| `lark-cli vc +detail` |  |
| `lark-cli vc +download` |  |
| `lark-cli vc +meeting-countdown` |  |
| `lark-cli vc +meeting-end` |  |
| `lark-cli vc +meeting-events` |  |
| `lark-cli vc +meeting-invite` |  |
| `lark-cli vc +meeting-join` |  |
| `lark-cli vc +meeting-leave` |  |
| `lark-cli vc +meeting-list-active` |  |
| `lark-cli vc +meeting-message-send` |  |
| `lark-cli vc +meeting-screenshot` |  |
| `lark-cli vc +member-add` |  |
| `lark-cli vc +member-list` |  |
| `lark-cli vc +recording` |  |
| `lark-cli vc +search` |  |
| `lark-cli vc +speaker-replace` |  |
| `lark-cli vc +summary` |  |
| `lark-cli vc +todo` |  |
| `lark-cli vc +transcript` |  |
| `lark-cli vc +update` |  |
| `lark-cli vc +upload` |  |
| `lark-cli vc +word-replace` |  |

### whiteboard · 2 条

> 快速查全部子命令：`lark-cli whiteboard --help`

| 命令 | 说明 |
|---|---|
| `lark-cli whiteboard +export` | 导出画板为预览图片、SVG 矢量图、代码或原始节点结构。 |
| `lark-cli whiteboard +update` | 更新画板，支持 PlantUML、Mermaid、SVG 或 OpenAPI 原生格式 |

### okr · 23 条

> 快速查全部子命令：`lark-cli okr --help`

| 命令 | 说明 |
|---|---|
| `lark-cli okr +batch-create` | 批量创建 Objective（可带备注）和 KR |
| `lark-cli okr +comment-create` | 创建新评论或回复已有评论(仅支持 --as user) |
| `lark-cli okr +comment-delete` | 永久删除单条评论(仅支持 --as user) |
| `lark-cli okr +comment-detail` | 获取周期下 Cycle/Objective/KeyResult/Progress 的全部评论 |
| `lark-cli okr +comment-get` | 获取单条评论详情 |
| `lark-cli okr +comment-list` | 查询/创建/修改/解决 OKR 评论 |
| `lark-cli okr +comment-patch` | 修改评论内容(仅支持 --as user) |
| `lark-cli okr +comment-reopen` | 重新打开评论或划词评论串(仅支持 --as user) |
| `lark-cli okr +comment-solve` | 解决评论或划词评论串(仅支持 --as user) |
| `lark-cli okr +create` | 创建单个 Objective（可带备注），或向已有 Objective 新增 KR |
| `lark-cli okr +cycle-detail` | 获取特定 OKR 中所有目标和关键结果的内容 |
| `lark-cli okr +cycle-list` | 分页获取特定用户的 OKR 周期列表，可以用 --time-range 对当前页后置筛选 |
| `lark-cli okr +indicator-update` | 更新 Objective 或 KR 的当前进度指标。更复杂的量化指标操作见 量化指标管理 |
| `lark-cli okr +patch` | 部分更新 Objective 或 KR（content、notes、score、deadline） |
| `lark-cli okr +progress-create` | 为目标或关键结果创建进展记录 |
| `lark-cli okr +progress-delete` | 删除指定 ID 的进展记录（不可恢复） |
| `lark-cli okr +progress-get` | 根据 ID 获取单条 OKR 进展记录 |
| `lark-cli okr +progress-list` | 分页获取目标或关键结果的进展记录列表 |
| `lark-cli okr +progress-update` | 更新指定 ID 的进展记录内容 |
| `lark-cli okr +reorder` | 调整 Objective 或 KR 的顺位 |
| `lark-cli okr +search-user` |  |
| `lark-cli okr +upload-image` | 上传图片用于 OKR 进展记录的富文本内容 |
| `lark-cli okr +weight` | 调整 Objective 或 KR 的权重 |

### apps · 70 条

> 快速查全部子命令：`lark-cli apps --help; lark-cli apps +<cmd> --help`

| 命令 | 说明 |
|---|---|
| `lark-cli apps +access-scope-get` | 设置或查看运行时可见范围 |
| `lark-cli apps +access-scope-set` | 设置或查看运行时可见范围 |
| `lark-cli apps +analytics-list` | 查线上日志、Trace、请求数、错误率、延迟、CPU、memory、PV/UV/访问量 |
| `lark-cli apps +automation-list` | 管理妙搭应用自动化触发器（定时/记录变更/Webhook/飞书审批四类触发器的查询/创建/更新/启停；Webhook URL·Token 一次性回显、不落盘） |
| `lark-cli apps +cache-clear` | 调试应用运行时缓存：查看/删除单个业务 key、清空指定环境缓存 |
| `lark-cli apps +cache-delete` | 调试应用运行时缓存：查看/删除单个业务 key、清空指定环境缓存 |
| `lark-cli apps +cache-get` | 调试应用运行时缓存：查看/删除单个业务 key、清空指定环境缓存 |
| `lark-cli apps +chat` | 云端 Agent 生成/迭代应用（开发方式已定为云端后） |
| `lark-cli apps +create` | 创建新应用资产、拿 app_id |
| `lark-cli apps +db-audit-disable` | 看表 / 看结构 / 初始化多环境 / 导入导出数据 / 变更追溯 / 行级审计 / dev→online 发布 / 时间点恢复 / 查 DB 用量 |
| `lark-cli apps +db-audit-enable` | 看表 / 看结构 / 初始化多环境 / 导入导出数据 / 变更追溯 / 行级审计 / dev→online 发布 / 时间点恢复 / 查 DB 用量 |
| `lark-cli apps +db-audit-list` | 看表 / 看结构 / 初始化多环境 / 导入导出数据 / 变更追溯 / 行级审计 / dev→online 发布 / 时间点恢复 / 查 DB 用量 |
| `lark-cli apps +db-audit-status` | 看表 / 看结构 / 初始化多环境 / 导入导出数据 / 变更追溯 / 行级审计 / dev→online 发布 / 时间点恢复 / 查 DB 用量 |
| `lark-cli apps +db-changelog-list` | 看表 / 看结构 / 初始化多环境 / 导入导出数据 / 变更追溯 / 行级审计 / dev→online 发布 / 时间点恢复 / 查 DB 用量 |
| `lark-cli apps +db-data-export` | 看表 / 看结构 / 初始化多环境 / 导入导出数据 / 变更追溯 / 行级审计 / dev→online 发布 / 时间点恢复 / 查 DB 用量 |
| `lark-cli apps +db-data-import` | 看表 / 看结构 / 初始化多环境 / 导入导出数据 / 变更追溯 / 行级审计 / dev→online 发布 / 时间点恢复 / 查 DB 用量 |
| `lark-cli apps +db-env-create` | 看表 / 看结构 / 初始化多环境 / 导入导出数据 / 变更追溯 / 行级审计 / dev→online 发布 / 时间点恢复 / 查 DB 用量 |
| `lark-cli apps +db-env-diff` | 看表 / 看结构 / 初始化多环境 / 导入导出数据 / 变更追溯 / 行级审计 / dev→online 发布 / 时间点恢复 / 查 DB 用量 |
| `lark-cli apps +db-env-migrate` | 看表 / 看结构 / 初始化多环境 / 导入导出数据 / 变更追溯 / 行级审计 / dev→online 发布 / 时间点恢复 / 查 DB 用量 |
| `lark-cli apps +db-execute` | 逐条执行 SQL（SELECT / DML / DDL）；建表 / 改表 / 写 SQL 的平台规范 |
| `lark-cli apps +db-quota-get` | 看表 / 看结构 / 初始化多环境 / 导入导出数据 / 变更追溯 / 行级审计 / dev→online 发布 / 时间点恢复 / 查 DB 用量 |
| `lark-cli apps +db-recovery-apply` | 看表 / 看结构 / 初始化多环境 / 导入导出数据 / 变更追溯 / 行级审计 / dev→online 发布 / 时间点恢复 / 查 DB 用量 |
| `lark-cli apps +db-recovery-diff` | 看表 / 看结构 / 初始化多环境 / 导入导出数据 / 变更追溯 / 行级审计 / dev→online 发布 / 时间点恢复 / 查 DB 用量 |
| `lark-cli apps +db-table-get` | 看表 / 看结构 / 初始化多环境 / 导入导出数据 / 变更追溯 / 行级审计 / dev→online 发布 / 时间点恢复 / 查 DB 用量 |
| `lark-cli apps +db-table-list` | 看表 / 看结构 / 初始化多环境 / 导入导出数据 / 变更追溯 / 行级审计 / dev→online 发布 / 时间点恢复 / 查 DB 用量 |
| `lark-cli apps +env-delete` | 管理应用环境变量（查看/设置/删除） |
| `lark-cli apps +env-list` | 管理应用环境变量（查看/设置/删除） |
| `lark-cli apps +env-pull` | 本地开发时 .env.local 损坏/丢失，重新拉取启动期环境变量 |
| `lark-cli apps +env-set` | 管理应用环境变量（查看/设置/删除） |
| `lark-cli apps +export` | 只要一份源码快照、不做本地开发；或要取别人分享给你的应用源码（你对其仓库无权限） |
| `lark-cli apps +file-delete` | 管理应用文件存储：上传/下载本地文件、列出/查看/删除已存文件、生成临时分享链接、查存储用量 |
| `lark-cli apps +file-download` | 管理应用文件存储：上传/下载本地文件、列出/查看/删除已存文件、生成临时分享链接、查存储用量 |
| `lark-cli apps +file-get` | 管理应用文件存储：上传/下载本地文件、列出/查看/删除已存文件、生成临时分享链接、查存储用量 |
| `lark-cli apps +file-list` | 管理应用文件存储：上传/下载本地文件、列出/查看/删除已存文件、生成临时分享链接、查存储用量 |
| `lark-cli apps +file-quota-get` | 管理应用文件存储：上传/下载本地文件、列出/查看/删除已存文件、生成临时分享链接、查存储用量 |
| `lark-cli apps +file-sign` | 管理应用文件存储：上传/下载本地文件、列出/查看/删除已存文件、生成临时分享链接、查存储用量 |
| `lark-cli apps +file-upload` | 管理应用文件存储：上传/下载本地文件、列出/查看/删除已存文件、生成临时分享链接、查存储用量 |
| `lark-cli apps +get` | 查单个应用详情（类型、名称、发布状态等） |
| `lark-cli apps +git-credential-init` |  |
| `lark-cli apps +html-publish` | 旧版存量 HTML 应用（无 Git 管理）继续上传已有静态产物 |
| `lark-cli apps +init` | 只要一份源码快照、不做本地开发；或要取别人分享给你的应用源码（你对其仓库无权限） |
| `lark-cli apps +list` | 找已有 app_id、按名字过滤应用 |
| `lark-cli apps +log-get` | 查线上日志、Trace、请求数、错误率、延迟、CPU、memory、PV/UV/访问量 |
| `lark-cli apps +log-list` | 查线上日志、Trace、请求数、错误率、延迟、CPU、memory、PV/UV/访问量 |
| `lark-cli apps +member-add` | 管理应用协作者（列出/添加/改权限/移除）或协作权限设置 |
| `lark-cli apps +member-list` | 管理应用协作者（列出/添加/改权限/移除）或协作权限设置 |
| `lark-cli apps +member-remove` | 管理应用协作者（列出/添加/改权限/移除）或协作权限设置 |
| `lark-cli apps +member-settings-get` | 管理应用协作者（列出/添加/改权限/移除）或协作权限设置 |
| `lark-cli apps +member-settings-set` | 管理应用协作者（列出/添加/改权限/移除）或协作权限设置 |
| `lark-cli apps +member-update` | 管理应用协作者（列出/添加/改权限/移除）或协作权限设置 |
| `lark-cli apps +metric-list` | 查线上日志、Trace、请求数、错误率、延迟、CPU、memory、PV/UV/访问量 |
| `lark-cli apps +openapi-key-list` | 管理妙搭应用开放 API Key（创建/查看/启停/重置/删除凭证；密钥仅 create/reset 一次性返回） |
| `lark-cli apps +plugin-install` | 外部能力(AI模型能力和飞书平台能力)集成/插件/Plugin/Capability |
| `lark-cli apps +plugin-list` | 外部能力(AI模型能力和飞书平台能力)集成/插件/Plugin/Capability |
| `lark-cli apps +plugin-uninstall` | 外部能力(AI模型能力和飞书平台能力)集成/插件/Plugin/Capability |
| `lark-cli apps +release-create` | 部署/上线应用（"部署""上线""推上去并部署""发布到云端"）；查发布状态/历史 |
| `lark-cli apps +release-get` | 部署/上线应用（"部署""上线""推上去并部署""发布到云端"）；查发布状态/历史 |
| `lark-cli apps +release-list` | 部署/上线应用（"部署""上线""推上去并部署""发布到云端"）；查发布状态/历史 |
| `lark-cli apps +role` | apps |
| `lark-cli apps +role-` |  |
| `lark-cli apps +role-list` | 管理 app_... 应用内角色、角色成员，或查询用户匹配角色 |
| `lark-cli apps +role-match-list` | 管理 app_... 应用内角色、角色成员，或查询用户匹配角色 |
| `lark-cli apps +role-member-list` | 管理 app_... 应用内角色、角色成员，或查询用户匹配角色 |
| `lark-cli apps +session-create` | 云端 Agent 生成/迭代应用（开发方式已定为云端后） |
| `lark-cli apps +session-get` | 查看某次会话某一轮（turn）的回复消息（含仍在生成中的本轮）/ 导出上一轮模型回复（"这一轮回复了什么""上一轮的回复""导出某轮消息"） |
| `lark-cli apps +session-messages-list` | 查看某次会话某一轮（turn）的回复消息（含仍在生成中的本轮）/ 导出上一轮模型回复（"这一轮回复了什么""上一轮的回复""导出某轮消息"） |
| `lark-cli apps +trace-get` | 查线上日志、Trace、请求数、错误率、延迟、CPU、memory、PV/UV/访问量 |
| `lark-cli apps +trace-list` | 查线上日志、Trace、请求数、错误率、延迟、CPU、memory、PV/UV/访问量 |
| `lark-cli apps +update` | 改应用名或描述 |
| `lark-cli apps +user-id-convert` | 把一批 ID 在妙搭 user_id ↔ 飞书 open_id / union_id / 飞书 user_id 之间互转（例如拿到 open_id 但下游要 user_id） |

### workflow-meeting-summary · 4 条

| 命令 | 说明 |
|---|---|
| `lark-cli workflow-meeting-summary +create` |  |
| `lark-cli workflow-meeting-summary +detail` | > lark-cli minutes |
| `lark-cli workflow-meeting-summary +search` | {时间范围} ─► vc |
| `lark-cli workflow-meeting-summary +update` |  |

### workflow-standup-report · 2 条

| 命令 | 说明 |
|---|---|
| `lark-cli workflow-standup-report +agenda` | {date} ─┬─► calendar |
| `lark-cli workflow-standup-report +get-my-tasks` | lark-task |

## 任务 → 命令 速查

高频场景的直接映射。表里没有的，去上面「能力域总表」按场景匹配。

| 用户说 | 命令 |
|---|---|
| 看看我今天的日程 | `lark-cli calendar +agenda --as user` |
| 约个会 / 建日程 / 邀请人 | `lark-cli calendar +create ...` |
| 查某人这周有没有空 | `lark-cli calendar +freebusy ...` |
| 找一间会议室 | `lark-cli calendar +room-find ...` |
| 给某人/某群发条消息 | `lark-cli im +messages-send --chat-id <oc_xxx> --text "..." --as bot` |
| 回复某条消息 | `lark-cli im +messages-reply ...` |
| 搜聊天记录 | `lark-cli im +messages-search --query "关键词"` |
| 建个群 / 拉人 | `lark-cli im +chat-create ...` |
| 下载聊天里的文件/图片 | `lark-cli im +messages-resources-download ...` |
| 发飞书卡片 | `lark-cli im +messages-send --msg-type interactive`（先读卡片创建流程） |
| 写一篇飞书文档 | `lark-cli docs +create --doc-format markdown --content ...` |
| 改文档 / patch 文档 | `lark-cli docs +patch ...` |
| 读文档内容 | `lark-cli docs +read ...` |
| 搜文档 | `lark-cli drive +search ...` |
| 上传/下载文件到云空间 | `lark-cli drive +upload` / `+download` |
| 建多维表格 / 加记录 | `lark-cli base +record-create ...` |
| 查多维表格数据 | `lark-cli base +record-search ...` |
| 读写电子表格 | `lark-cli sheets +read` / `+write` / `+append` |
| 建演示文稿 / 加页 | `lark-cli slides +create` / `+page-add` |
| 建任务 / 完成任务 | `lark-cli task +create` / `+complete` |
| 查邮件 / 发邮件 | `lark-cli mail +list` / `+send` |
| 查某人邮箱或手机号 | `lark-cli contact +user-search --query "张三"` |
| 查会议 / 会议纪要 | `lark-cli meeting +list` / `lark-cli minutes +...` |
| 查考勤打卡 | `lark-cli attendance +...` |
| 处理审批 | `lark-cli approval +task-list` / `+approve` |
| 查/更新 OKR | `lark-cli okr +...` |
| 知识库建文档 | `lark-cli wiki +...` |
| 画流程图/架构图 | `lark-cli whiteboard +...` |
| 订阅飞书事件（实时） | `lark-cli event consume ...` |
| API 没被快捷命令覆盖 | `lark-cli <域> <资源> <方法>`，先跑 `lark-cli schema <域>.<资源>.<方法>` |
| 完全自定义端点 | `lark-cli api GET /open-apis/...` |

## 全局约定（每个命令都适用）

### 身份：决定你代表谁操作

| 写法 | 身份 | Token | 能碰到什么 |
|---|---|---|---|
| `--as user` | 用户本人 | `user_access_token` | 个人日历、私聊、个人文档；受该用户自身权限约束 |
| `--as bot` | 应用自己 | `tenant_access_token` | 应用级资源；查用户私有资源会**返回空成功而非报错** |

- 动手前先确认身份。同一 API 换身份结果可能不同（群主/管理员、群成员、租户边界都按当前调用者判定）。
- 默认身份由 `lark-cli config default-as` 配置。

### 输出格式

| 值 | 用途 |
|---|---|
| `--format json` | **默认**，完整 JSON 响应，Agent 友好 |
| `--format table` | 易读表格，给人看 |
| `--format pretty` | 人性化美化输出 |
| `--format ndjson` | 换行分隔 JSON，适合管道处理 |
| `--format csv` | 逗号分隔值，适合导表 |

### 判断成功：用 `ok == true`，不要用 `code == 0`

成功信封（stdout，退出码 0）：

```json
{ "ok": true, "identity": "user", "data": { "...": "..." }, "meta": { "count": 1 } }
```

错误信封（stderr，退出码非 0）：

```json
{ "ok": false, "identity": "user", "error": { "type": "api", "subtype": "...", "code": 99991679, "message": "...", "hint": "..." } }
```

> 成功信封**没有**顶层 `code` / `msg`。按老 OpenAPI 格式 `{"code":0,"msg":"ok"}` 判断会把所有成功调用误判为失败。`code` 只出现在错误信封的 `error` 内。

### 分页

```bash
--page-all            # 自动翻页取全量
--page-limit 5        # 最多 5 页
--page-delay 500      # 每页间隔 500ms
```

### 安全与高风险操作

| 规则 | 说明 |
|---|---|
| 写操作先预览 | 支持 `--dry-run` 的命令一律先预览请求 |
| 写/删前问用户 | 必须先确认用户意图再执行 |
| **退出码 10 = 高风险门禁** | 不是错误。停下 → 向用户展示 `action`/`risk`/关键参数 → 拿到**显式同意**后，把 `hint` 指的确认 flag **追加到原始 argv 末尾**重试；**绝不静默绕过** |
| 禁止回显密钥 | appSecret、accessToken 等不得明文打到终端 |
| 路径只能用相对路径 | `--file` / `--output` / `--output-dir` / `@file` 只接受 cwd 下的相对路径，绝对路径会报 `unsafe file path`；大 JSON 优先走 stdin |
| 授权 URL 必须配二维码 | 输出含 `verification_url` / `console_url` 时用 `lark-cli auth qrcode` 生成 PNG 一并展示，URL 原样转发不重写 |

### 认证命令

| 命令 | 说明 |
|---|---|
| `auth login` | OAuth 登录，支持交互式 TUI 或参数指定 scope |
| `auth login --recommend` | 自动选择常用权限（最省事） |
| `auth login --domain calendar,task` | 按业务域授权 |
| `auth login --scope "calendar:calendar:read"` | 精确 scope |
| `auth login --domain calendar --no-wait` | Agent 模式：立即返回验证 URL 不阻塞 |
| `auth login --device-code <CODE>` | 恢复轮询 |
| `auth status` | 查看登录状态与已授权 scope |
| `auth check` | 校验指定 scope（exit 0 有权限，1 缺失） |
| `auth scopes` | 列出应用可用 scope |
| `auth list` | 列出所有已认证用户 |
| `auth logout` | 登出并删除凭证 |

### 配置与其他全局能力

| 命令 | 说明 |
|---|---|
| `config init` / `config init --new` | 配置应用凭证 |
| `config show` | 查看当前配置 |
| `config default-as` | 设置默认身份 |
| `config risk-control on/off/default` | 风控信号开关 |
| `lark-cli schema [<域>.<资源>.<方法>]` | 查看 API 参数/请求体/响应/身份/scope |
| `lark-cli doctor` | 环境自检 |
| `lark-cli whoami` | 当前身份 |
| `lark-cli profile list/use/add` | 多应用配置切换 |

## 各域 Skill 说明（完整触发条件）

> 原文来自 官方 https://github.com/larksuite/cli 的 skills/*/SKILL.md。厂商写的判断标准优先于一般经验。

### lark-calendar (v1.0.0)
飞书日历：管理日历日程和会议室。查看/搜索日程、创建/更新日程、管理参会人、查询忙闲和推荐时段、预定会议室。当用户需要查看日程安排、创建/修改会议、查询/预定会议室时使用。不负责：查询过去的视频会议记录（走 lark-meeting）、待办任务（走 lark-task）。
*规模：17 个快捷命令 · 14 篇深度参考*

### lark-im (v1.0.0)
飞书即时通讯：收发消息和管理群聊。发送和回复消息、搜索聊天记录、管理群聊成员、上传下载图片和文件、管理表情回复、发送应用内/短信/电话加急、发送和处理交互卡片（Interactive Card）、监听卡片按钮回调（card.action.trigger）。当用户需要发消息、查看或搜索聊天记录、下载聊天中的文件、查看群成员、搜索群、创建群聊或话题群、管理标记数据、管理 Feed 置顶（添加/移除/查询置顶会话）、管理标签数据、处理卡片回调时使用。
*规模：24 个快捷命令 · 42 个 API 方法 · 60 篇深度参考*

### lark-doc
飞书云文档（Docx / Wiki）内容操作：读取、创建、编辑文档，插入或下载图片附件，以及操作思维笔记。用户提供文档 URL/token（包括 doubao.com 的 /docx/、/wiki/）时使用；按 URL 路径/token 而非域名路由。文档内嵌资源按读取参考中的统一规则分流。独立评论操作走 lark-drive；随正文读取评论使用 docs +fetch。表格或 Base 内部数据操作不在本 skill。
*规模：7 个快捷命令 · 43 篇深度参考*

### lark-drive (v1.0.0)
飞书云空间（云盘/云存储）：管理 Drive 文件和文件夹，包含上传/下载、创建文件夹、复制/移动/删除、查看元数据、查询权限设置、评论/权限/订阅、标题、版本、飞书文档密级标签（secure labels）和本地文件导入。用户需要整理云盘目录、处理云空间资源 URL/token、判断链接类型/真实 token/标题，或导入 Word/Markdown/Excel/CSV/PPTX/.base 为 docx/sheet/bitable/slides 时使用；doubao.com 云空间 URL/token 也按资源路径和 token 路由，不回退 WebFetch。不负责：文档内容编辑（走 lark-doc）、表格/Base 表内数据操作（走 lark-sheets/lark-base）、知识空间节点/成员管理（走 lark-wiki）、原生 Markdown 文件读写/patch/diff（走 lark-markdown）。
*规模：43 个快捷命令 · 15 个 API 方法 · 60 篇深度参考*

### lark-markdown (v1.2.2)
飞书 Markdown：查看、创建、上传、编辑和比较飞书中的原生 Markdown 文件。当用户要操作飞书 Markdown 文件，或比较其远端版本及本地草稿时使用。纯本地 Markdown 文件操作不触发本 skill。不负责将 Markdown 导入为飞书在线文档，也不负责文件搜索、权限、评论、移动、删除等云空间管理操作。
*规模：5 个快捷命令 · 5 篇深度参考*

### lark-sheets (v3.5.2)
飞书电子表格：创建和操作电子表格。支持工作表与行列结构（增删/合并/尺寸/隐藏/冻结/分组）、单元格读写（值/公式/样式/批注/单元格图片）、区域复制移动排序填充、查找替换、批量更新，图表、透视表、条件格式、筛选器与筛选视图、下拉列表、迷你图、浮动图片等对象的创建与维护，以及公式校验、历史版本回滚、本地 Excel/CSV 与飞书表格的导入导出。当用户需要创建或编辑表格、统计汇总与可视化、表格美化、公式计算（含 Excel 公式迁移）、金融/财务建模（DCF、三张表、预算、Sensitivity 等）时使用。多维表格（Base/bitable）请改用 lark-base；若用户是想按名称或关键词搜索云空间（云盘/云存储）里的表格文件，请改用 lark-drive 的 drive +search 先定位资源。当用户给出 doubao.com 的 /sheets/ URL/token 时，也应直接使用本 skill，不要因为域名不是飞书而回退到 WebFetch；路由依据是 URL 路径模式和 token，而不是域名。
*规模：44 个快捷命令 · 20 篇深度参考*

### lark-slides (v1.0.0)
飞书幻灯片：创建和编辑幻灯片。创建演示文稿、读取幻灯片内容、管理幻灯片页面（创建、删除、读取、局部替换）。当用户需要创建或编辑幻灯片、读取或修改单个页面时使用。当用户给出 doubao.com 的 /slides/ URL/token 时，也应直接使用本 skill，不要因为域名不是飞书而回退到 WebFetch；路由依据是 URL 路径模式和 token，而不是域名。不负责：云文档内容编辑（走 lark-doc）、云文档里的独立画板对象（走 lark-whiteboard）、上传或下载普通文件（走 lark-drive）。
*规模：13 个快捷命令 · 36 篇深度参考*

### lark-base (v1.2.23)
飞书多维表格（Base）操作：建表、字段、记录、视图、统计、公式/lookup、表单、仪表盘、应用模式（BaseApp/AppMode 页面与组件）、Workspace 目录、workflow、角色权限、模板中心（多维表格模板分类/列表/搜索）；遇到 Base/多维表格/bitable、BaseApp/AppMode、/base/ 或 /app/ 链接时使用。BaseApp 不走 lark-apps；文件导入/导出转 lark-drive，认证/授权转 lark-shared。
*规模：11 个快捷命令 · 26 篇深度参考*

### lark-task (v1.0.0)
飞书任务：管理任务、清单和任务智能体。创建待办任务、查看和更新任务状态、拆分子任务、组织任务清单、分配协作成员、上传任务附件、注册或注销任务智能体、更新任务智能体的主页数据、写入智能体任务记录。当用户需要创建待办事项、查看任务列表、跟踪任务进度、管理项目清单或给他人分配任务、为任务上传附件文件、注册注销任务智能体、更新智能体主页数据、写入任务记录时使用。
*规模：17 个快捷命令 · 34 个 API 方法 · 17 篇深度参考*

### lark-mail (v1.0.0)
飞书邮箱：Use when user mentions 起草邮件、写邮件、草稿、发送/回复/转发邮件、查阅邮件、看邮件、搜索邮件、邮件文件夹、邮件标签、邮件联系人、监听新邮件、邮件收信规则等；use for mail/email intent only. Do not use for docs/sheets/calendar/auth setup/pure contact lookup/IM chat tasks.
*规模：21 个快捷命令 · 30 篇深度参考*

### lark-contact (v1.0.0)
飞书 / Lark 通讯录:按姓名 / 邮箱解析成 open_id,或按 open_id 反查姓名 / 部门 / 邮箱 / 联系方式 / 个人状态 / 签名,以及按关键词搜索当前用户可见的机器人 / 智能体(agent)。当用户提到一个名字要下一步发消息 / 排日程,或拿到 open_id 想查具体信息时使用。不负责部门树遍历、按部门列员工、组织架构图,这类需求走原生 OpenAPI。
*规模：4 个快捷命令 · 3 篇深度参考*

### lark-wiki (v1.0.3)
飞书知识库：管理知识空间、空间成员和文档节点。创建和查询知识空间、查看和管理空间成员、管理节点层级结构、在知识库中组织文档和快捷方式。当用户需要在知识库中查找或创建文档、浏览知识空间结构、查看或管理空间成员、移动或复制节点时使用。当用户给出 doubao.com 的 /wiki/ URL/token 时，也应直接使用本 skill，不要因为域名不是飞书而回退到 WebFetch；路由依据是 URL 路径模式和 token，而不是域名。不负责：上传文件到知识库节点下（走 lark-drive）、编辑文档/表格/Base 内容（走 lark-doc / lark-sheets / lark-base）。
*规模：13 个快捷命令 · 9 个 API 方法 · 13 篇深度参考*

### lark-meeting (v1.0.0)
飞书视频会议：查询会议记录与会议产物(纪要/逐字稿/妙记)、妙记搜索/上传/下载/编辑、机器人参与会议；查询进行中的会议、实时会议内容(发言/聊天/共享文档)问答(会上/会里)、发送会中聊天/表情；基于 meeting_id、meeting_no、event_id、note_id、minute_token、vc-node-id 或妙记 URL 查询相关信息。预约会议、忙闲和会议室管理走 lark-calendar。
*规模：23 个快捷命令 · 23 篇深度参考*

### lark-vc (v1.0.0)
仅当用户或上游配置显式指定 lark-vc 时使用，相关请求统一交由 lark-meeting 技能处理。

### lark-minutes (v1.0.0)
仅当用户或上游配置显式指定 lark-minutes 时使用，相关请求统一交由 lark-meeting 技能处理。

### lark-note (v1.0.0)
仅当用户或上游配置显式指定 lark-note 时使用，相关请求统一交由 lark-meeting 技能处理。

### lark-whiteboard (v1.0.0)
飞书画板：查询和编辑飞书云文档中的画板。支持导出画板为预览图片、导出原始节点结构、使用多种格式更新画板内容。 当用户需要查看画板内容、导出画板图片、编辑画板时使用此 skill。不负责：飞书云文档内容编辑（lark-doc）、文档内嵌电子表格/Base（lark-sheets / lark-base）。
*规模：2 个快捷命令 · 3 篇深度参考*

### lark-attendance (v1.0.0)
飞书考勤打卡：查询自己的考勤打卡记录
*规模：1 个 API 方法*

### lark-approval (v1.2.0)
飞书审批：查询和处理审批待办/已办/实例，搜索可发起审批定义、查看定义详情并发起原生审批实例。当用户要处理审批任务、查看审批实例、搜索或发起审批时使用。审批待办不是飞书任务；非审批类待办走 lark-task。不负责创建审批定义；三方审批定义不走原生提单。
*规模：16 篇深度参考*

### lark-okr (v1.0.0)
飞书 OKR：管理目标与关键结果。查看和编辑 OKR 周期、目标、关键结果、对齐关系、量化指标和进展记录。当用户需要查看或创建 OKR、管理目标和关键结果、查看对齐关系时使用。不负责：待办任务管理（lark-task）、日程/会议安排（lark-calendar）、绩效评估
*规模：23 个快捷命令 · 19 个 API 方法 · 25 篇深度参考*

### lark-apps (v1.0.0)
妙搭（Spark/Miaoda）应用开发与托管：应用创建、本地全栈开发、云端生成迭代、创意设计（UI mockup / 可交互原型 / 线框图 / 落地页 / 仪表盘 / 幻灯片 deck / 视觉探索）、AI相关能力和飞书平台能力或者其他外部能力集成、日志/Trace/监控指标/PV/UV 查询、环境变量管理、应用协作者与协作权限设置、应用角色与成员管理、自动化触发器（定时/记录变更/Webhook/飞书审批）。当用户要开发/新建一个系统·工具·平台·应用，或要本地开发 / 云端开发 / 修改 / 部署 / 发布 / 上线 / 拿可分享链接，或用 HTML 做页面·网站·部署到妙搭，或要设计 / design / mockup / prototype / wireframe / 做 PPT / deck / 视觉探索，或提到妙搭/Spark/Miaoda（应用运行时域名形如 *.aiforce.cloud）、应用数据库、应用文件存储、开放 API Key、可见范围、应用协作者/开发权限、应用角色/角色成员、线上日志、接口请求量、错误量、延迟、访问量、环境变量、给妙搭应用配自动化任务/定时触发/审批通过后自动触发时使用。不负责普通云盘文件上传（lark-drive）、飞书文档编辑（lark-doc）、原生幻灯片创建（lark-slides）。
*规模：70 个快捷命令 · 30 篇深度参考*

### lark-event (v1.0.0)
Lark/Feishu real-time event listening / subscribing / consuming: stream events as NDJSON via `lark-cli event consume <EventKey>` (covers IM messages/reactions/chat changes, Approval status changes, Task updates, VC meeting started/joined/ended, Minutes generated, Whiteboard updated, etc.). Use for Lark bots, real-time message processing, long-running subscribers, streaming webhook/push handlers. Supports `--max-events` / `--timeout` bounded runs and a stderr ready-marker contract — designed for AI agents running as subprocesses.
*规模：7 篇深度参考*

### lark-vc-agent (v1.0.0)
仅当用户或上游配置显式指定 lark-vc-agent 时使用，相关请求统一交由 lark-meeting 技能处理。

### lark-openapi-explorer (v1.0.0)
飞书/Lark 原生 OpenAPI 探索：从官方文档库中挖掘未经 CLI 封装的原生 OpenAPI 接口。当用户的需求无法被现有 lark-* skill 或 lark-cli 已注册命令满足，需要查找并调用原生飞书 OpenAPI 时使用。

### lark-shared (v1.1.0)
Use for lark-cli setup/auth tasks: auth login/status/logout, user vs bot identity, business-domain permissions (--domain, including all/docs/drive), missing scopes, revoking authorization, or handling _notice JSON.
*规模：6 篇深度参考*

### lark-skill-maker (v1.0.0)
创建 lark-cli 的自定义 Skill。当用户需要把飞书 API 操作封装成可复用的 Skill（包装原子 API 或编排多步流程）时使用。

### lark-workflow-meeting-summary (v1.0.0)
会议纪要整理工作流：汇总指定时间范围内的会议纪要并生成结构化报告。当用户需要整理会议纪要、生成会议周报、回顾一段时间内的会议内容时使用。
*规模：4 个快捷命令*

### lark-workflow-standup-report (v1.0.0)
日程待办摘要：编排 calendar +agenda 和 task +get-my-tasks，生成指定日期的日程与未完成任务摘要。适用于了解今天/明天/本周的安排。
*规模：2 个快捷命令*

---

*快照由 `bin/skill-digest feishu-cli` 从 https://github.com/larksuite/cli 源码聚合生成，版本 `1.0.96`，时间 2026-09-17 06:52:39。*
*CLI 升级后刷新：`bin/refresh feishu-cli`*
