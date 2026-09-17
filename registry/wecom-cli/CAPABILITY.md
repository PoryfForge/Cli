---
name: wecom-cli
kind: cli
command: wecom-cli
version: 1.3.0
license: MIT
source: https://github.com/WecomTeam/wecom-cli
acquired_by: skill-repo
scanned_at: 2026-09-17 06:52:39
技能域: 12
文档内命令: 93
参考文档: 51
---

# 企业微信 CLI（`wecom-cli`）— 能力快照

> 企业微信官方 CLI（Rust 实现，经 npm 包 `@wecom/cli` 分发），覆盖消息、邮件、在线文档、在线表格、智能表格、智能文档、待办、日程、会议、微盘、通讯录等办公能力。命令树由服务端 discovery 动态下发，随附 **14 个官方 Agent Skills**。

## 这份文档怎么用

1. 先读下面「全局约定」的第一节，把三个前置检查做完 —— 这个 CLI 的命令树需要凭证才能列出。
2. 按场景在「能力域总表」里找到对应域，再到「命令全量清单」里取命令。
3. 命令是 `<service> [resource...] <method>` 形态，请求体优先用 `--json`；具体参数跑 `wecom-cli <service> <method> --help`。
4. 本篇记录的是官方技能文档里写明的命令。**真实可用的服务列表以 `wecom-cli --help` 为准**（需先授权）。

## 概览

| 项 | 值 |
|---|---|
| 可执行文件 | `wecom-cli` |
| 版本 | `1.3.0` |
| 仓库 | https://github.com/WecomTeam/wecom-cli |
| 官方 Agent Skills | 14 个（12 个业务域 + 2 个辅助） |
| 文档内命令 | 93 条 |
| 深度参考文档 | 51 篇 |
| 快照时间 | 2026-09-17 06:52:39 |
| 命令树来源 | 服务端 discovery 动态下发（**需凭证与网络**） |
| 对应 commit | `dcf6929884b5` |

## 安装与首次配置

```bash
# 1. 安装 CLI（需要 Node.js >= 18）
npm install -g @wecom/cli

# 2. 安装官方 Agent Skills（必需，否则 AI 读不到各域用法）
npx skills add WeComTeam/wecom-cli -y -g

# 3. 初始化凭证：扫码或手填 Bot ID + Secret（仅需一次）
wecom-cli auth init

# 4. 确认授权状态（authorized 即就绪）
wecom-cli auth show --status

# 5. 确认 CLI 版本 >= 1.2.1（官方技能的硬要求）
wecom-cli --version
```

- 凭证需要企业微信侧创建**智能机器人**并拿到 Bot ID / Secret（扫码接入可自动创建绑定）。
- 凭据加密存在 `~/.config/wecom/credentials.enc`（AES-256-GCM，0600），明文密钥不落盘。

## 四类命令形态

这个 CLI 不像飞书那样有语义化的 `+快捷命令` 层，而是「服务方法调用」为主。命令树由服务端 discovery 下发后在本地构建，所以**没有网络和凭证就看不了帮助**。

| 形态 | 说明 | 备注 |
|---|---|---|
| `wecom-cli <service> [resource...] <method>` | 调用远程服务方法 | 主力形态，方法可带嵌套资源路径 |
| `wecom-cli <service> +<helper>` | 本地 helper | 由产品层注册的本地组合动作 |
| `wecom-cli auth <init\|show>` | 授权管理 | 内建扩展命令 |
| `wecom-cli schema …` / `wecom-cli cache …` | schema 查询与缓存管理 | **隐藏在 `--help` 之外**，调试与集成用 |

```bash
# 列出所有服务与品类（需已授权）
wecom-cli --help

# 列出某服务下的全部方法
wecom-cli <service> --help

# 列出某方法需要的输入（含 TS 类型声明）
wecom-cli <service> [resource...] <method> --help
wecom-cli <service> <method> --doc

# 内建：直接拿 schema
wecom-cli schema list
wecom-cli schema get <service.resource.method>
```

> `--schema` / `--doc` 在服务级与方法级都可用，是比翻文档更可靠的参数来源。

## 能力域总表

「能做什么（含触发场景）」这一列取自官方 skill 的 description 原文，是最可靠的路由依据。

| 域 | 命令前缀 | 能做什么（含触发场景） | 命令数 |
|---|---|---|---:|
| **calendar** | `calendar` / `meeting` | 企业微信日程管理。当用户需要预约日程、预订会议室、查看/更新/取消日程或查忙闲时触发。本技能负责『日程』——即不含在线会议链接的安排（也涵盖纯线下面对面碰头）；若用户要的是『在线会议』（含会议号/入会链接、可远程或视频参会），改用 wecomcli-meeting 技能。用户仅说'开会/约个会/某会'等、未明确要创建的是日程还是在线会议时，必须先读取本技能并按其中的消歧流程向用户追问确认后再处理，不可臆断直接创建。 | 9 |
| **contact** | `contact` | 使用 wecom-cli 按姓名、拼音、英文名或别名搜索企业微信通讯录中的人员，并查询匹配人员的 userid、部门和职务。适用于查找联系人、区分同名人员、获取用户 userid，以及列出全部同名人员。 | 1 |
| **disk** | `disk` | 企业微信微盘（Disk / 网盘）文件操作技能。承接"微盘 / 网盘"里的文件列出、搜索、读取元信息、上传、下载、重命名、新建文件夹操作。用户明确提到"微盘"/"网盘"/"共享空间"时必须先读取本技能获取完整指引，不得凭记忆处理。用户说"上传到微盘"、"帮我在微盘里搜一下 xxx"、"微盘那个 PPT 在哪"、"下载微盘那个文件"、"把微盘那个文件重命名成 xxx"、或直接给出 `https://drive.weixin.qq.com/s?k=...` 形式的微盘文件链接时使用本技能。与 `wecomcli-doc` / `wecomcli-sheet` / `wecomcli-smartsheet` / `wecomcli-smartpage` 的区别：本技能处理微盘里所有文件（含在线文档）的搜索/列表/基础信息/位置/路径/重命名等文件级操作；在线文档（`doc/sheet/smartsheet/smartpage` 类型）的内容读写走对应文档技能，不由本技能接管。当用户问「这个文档在微盘哪里」或问某文件在微盘的位置时，由本技能用 get 返回空间名/文件夹名/路径等元信息。 | 7 |
| **doc** | `doc` | 企业微信在线 doc 文档技能。能够新建 doc、导入本地 .doc/.docx/.txt 为 doc、读取 doc 内容、向 doc 追加或覆盖写入。仅当用户明确出现「doc」「docx」「word」「在线文档」「office 文档」等强类型词，或提供 https://doc.weixin.qq.com/doc/xxx 链接时才使用本技能。用户说"文档""新建文档""写文档""整理成文档""输出到文档"等未指定类型的泛化表达，一律使用 wecomcli-smartpage。 | 4 |
| **doc-manage** | `doc` | 企业微信文档公共管理：搜索文档（最近浏览/创建）、文档改名、添加文档成员权限、设置文档加入规则。适用于所有文档类型（doc文档 / 在线表格 / 智能表格 / 智能文档）。新建或导入doc文档请使用 wecomcli-doc；新建或导入在线表格请使用 wecomcli-sheet；智能表格内容 CRUD 请使用 wecomcli-smartsheet；生成智能文档请使用 wecomcli-smartpage。"看过哪些文档/浏览历史"类需求走本技能，不要走 wecom_get_user_memory。 | 4 |
| **email** | `mail` | 企业微信邮件：发送/回复/转发邮件、搜索邮件列表、获取邮件详情（正文、附件、内嵌图片解析），支持通过邮件发送日程邀约和会议预定。当用户涉及内部邮件收发、邮件查询、邮件管理等需求时使用。注意：日程和会议有单独的技能，仅当用户明确提到"邮箱"或"邮件"时（如"通过邮箱发送会议邀请"、"发封会议邮件"），才使用本技能处理会议日程邮件。 | 3 |
| **meeting** | `meeting` | 企业微信会议管理。本技能负责『在线会议』——即含在线会议链接（含会议号/入会链接、可远程或视频参会）的会议的创建、查询、搜索、获取详情（含会议信息、纪要、待办）、查询会议转写原文（逐字发言记录）、更新、取消等全部操作；若用户要的是不含在线会议链接的『日程』（也涵盖纯线下面对面碰头），改用 wecomcli-calendar 技能。用户仅说'开会/约个会/某会/某会议'等、未明确要创建的是日程还是在线会议时，必须先读取本技能并按其中的消歧流程向用户追问确认后再处理，不可臆断直接创建。 | 7 |
| **message** | `message` / `identity` | 查询当前可以发送消息的聊天会话范围，并向会话列表中的单聊或群聊发送文本、Markdown、图片、文件、语音、视频消息。用户要求“给某人发消息”“在某个群里通知”“给最近会话发消息”或“把图片/文件/语音/视频发到企业微信”时使用。 | 3 |
| **sheet** | `sheet` | 企业微信在线表格文档管理：新建在线表格、导入 CSV/Excel 为在线表格、读取表格信息与数据、修改表格内容、追加行数据、子表管理。当用户提到'表格'、'在线表格'、'excel表格'这些关键词触发，或链接形如 https://doc.weixin.qq.com/sheet/xxx 时触发。文档公共操作请使用 wecomcli-doc-manage；doc文档操作请使用 wecomcli-doc；智能表格内容 CRUD 请使用 wecomcli-smartsheet。 | 7 |
| **smartpage** | `smartpage` / `media` | 企业微信智能文档（smartpage）操作技能。能够新建文档、导入 .md 为文档、读取文档内容、修改文档内容（整页重写、局部编辑、增删子页面）、上传附件到文档，以及搭建带看板/图表的数据系统页面和信息收集表单页面。当用户提及文档，智能文档，智能主页、提供 https://doc.weixin.qq.com/smartpage/xxx 或 https://page.weixin.qq.com/smartpage/xxx 链接、要求整理成文档，或表达"新建文档""把 md 导入成文档"等未指定文档类型的需求时，也应使用本技能。 | 11 |
| **smartsheet** | `smartsheet` | 企业微信智能表格内容操作技能——专注于智能表格（smartsheet）的数据、结构与样式管理：读取表结构与记录、管理子表/字段/记录/视图/图表，以及修改行列样式（填色/高亮）；记录新增或更新遇到 851003 / no authority 时通过 Webhook 兜底写入。触发条件：用户提到智能表格、企微表格、smartsheet 的内容操作或样式修改，或链接形如 https://doc.weixin.qq.com/smartsheet/s3_xxx。企业微信表格分为「智能表格」和「在线表格」两种类型，本文档介绍的是智能表格的相关技能。智能表格包含子表（sheet）、视图（view）、字段/列（field），每条记录（record）以 `record_id` 作为主键，结构类似关系型数据库。当用户未明确说明使用「在线表格」时，一律默认使用功能更强大的智能表格（本技能）。 | 26 |
| **todo** | `todo` | 管理企业微信待办，支持创建、删除或退出、完成、查询和筛选，以及修改标题、描述、参与人名单和截止时间。 | 6 |

### 辅助与工作流模块

| 模块 | 能做什么 |
|---|---|
| **media** | 企业微信媒体文件上传/下载技能。承接基于 media_id 下载媒体文件到本地，以及上传本地文件获取 media_id 两类操作。当其他技能（微盘、邮件等）返回了 media_id 需要落地为本地文件，或已有本地文件需要转换为 media_id 供其他技能使用时，必须先读取本技能获取完整指引，不得凭记忆处理。本技能不解析/识别文件内容，仅负责文件本身的搬运。 |
| **shared** | wecom-cli 业务技能的公共前置检查、获取机器人及授权真人身份，以及通用输出约束。任何 wecomcli-* 技能首次准备执行 wecom-cli 命令前，都必须同时读取本技能，检查 CLI 是否安装、版本是否不低于 1.2.1，以及企业微信凭证是否已授权；仅在缺失、版本过低或未授权时执行安装或初始化。本技能还定义所有技能通用的 ID 类字段禁止外露约束。本技能不处理具体业务请求。 |

## 命令全量清单

共 93 条命令/调用形态，按域分组。

### calendar · 9 条

**适用**：预约 / 创建日程（含纯线下面对面碰头，即不带在线会议链接的安排）；查看 / 浏览日程（今天有什么安排、查本周日程）；搜索日程（按关键词、按组织人、按参与人找某个日程）；更新 / 修改日程（改时间、改地点、加减人、换会议室；不支持更新周期日程）；取消日程（不支持取消周期日程）　
**不适用**：创建、更新、取消周期 / 重复日程（每周 / 每月 / 每天重复）→ 均不支持，引导用户在企业微信客户端手动操作；回复 / 拒绝日程邀请（接受 / 拒绝 / 待定，含"拒绝这个日程""不参加"）→ 不支持，引导用户在企业微信客户端操作或私信发起人

| 命令 | 说明 |
|---|---|
| `wecom-cli calendar schedules cancel` | 取消日程 |
| `wecom-cli calendar schedules create` |  |
| `wecom-cli calendar schedules free list` | 查询参与人共同空闲 |
| `wecom-cli calendar schedules get` | 读取日程详情 |
| `wecom-cli calendar schedules list` | 读取日程列表 |
| `wecom-cli calendar schedules search` | 搜索日程 |
| `wecom-cli calendar schedules update` | 更新日程 |
| `wecom-cli meeting rooms buildings list` |  |
| `wecom-cli meeting rooms search` |  |

> 深度参考：`references/calendar-cancel.md`、`references/calendar-create.md`、`references/calendar-freebusy.md`、`references/calendar-agenda.md`、`references/calendar-search.md`、`references/calendar-update.md`、`references/calendar-meeting-room.md`

### contact · 1 条

| 命令 | 说明 |
|---|---|
| `wecom-cli contact users search` | 企业微信联系人搜索 |

> 深度参考：`SKILL.md`

### disk · 7 条

**适用**：列出微盘最近查看的文件；按关键词/类型/创建者/共享空间搜索微盘文件或文件夹；读取微盘文件基础信息；上传本地文件到微盘指定文件夹；下载微盘文件到本地　
**不适用**：移动微盘文件或文件夹 → 告知用户暂未支持，建议前往企业微信客户端手动操作；删除微盘文件 / 复制微盘文件 → 告知用户暂未支持，建议前往企业微信客户端手动操作；删除 / 重命名微盘文件夹（`folder`）、调整目录树结构 → 告知用户暂未支持，建议前往企业微信客户端手动操作；创建 / 删除共享空间（`space`）、修改空间成员与空间设置 → 告知用户暂未支持，建议前往企业微信客户端手动操作

| 命令 | 说明 |
|---|---|
| `wecom-cli disk files download` | 下载文件 |
| `wecom-cli disk files get` | 读取文件信息 |
| `wecom-cli disk files list` | 列出文件 |
| `wecom-cli disk files rename` | 重命名文件 |
| `wecom-cli disk files search` | 搜索文件 |
| `wecom-cli disk files upload` | 上传文件 |
| `wecom-cli disk folders create` | 创建文件夹 |

> 深度参考：`SKILL.md`

### doc · 4 条

**适用**：新建 / 导入企微 doc 文档；读取 doc 文档内容；向 doc 文档追加一行 / 覆盖写入doc 文档　
**不适用**：搜索文档 / 修改文档权限 / 重命名 / 加成员 → 改用 `wecomcli-doc-manage`；在线表格操作 → 改用 `wecomcli-sheet`；智能表格操作 → 改用 `wecomcli-smartsheet`；含字段 / 记录 / 筛选 / 排序 / 统计 / 分组等结构化数据语义 → 改用 `wecomcli-smartsheet` 或 `wecomcli-smartpage`（禁止用 doc + markdown 静态表格变通）

| 命令 | 说明 |
|---|---|
| `wecom-cli doc contents append` | 追加内容到在线文档 |
| `wecom-cli doc contents get` | 读取doc文档内容 |
| `wecom-cli doc contents overwrite` | 覆盖在线文档内容 |
| `wecom-cli doc import` | 导入doc文档 |

> 深度参考：`references/doc-contents-append.md`、`SKILL.md`、`references/doc-contents-overwrite.md`

### doc-manage · 4 条

| 命令 | 说明 |
|---|---|
| `wecom-cli doc members update` | 添加文档成员 |
| `wecom-cli doc names update` | 修改文档名 |
| `wecom-cli doc rules update` |  |
| `wecom-cli doc search` |  |

> 深度参考：`references/doc-members-update.md`、`references/doc-names-update.md`、`references/doc-rules-update.md`、`SKILL.md`

### email · 3 条

**适用**：发送新邮件：向指定收件人/抄送/密送发送邮件，支持本地附件和内嵌图片；日程邀约 / 会议邮件：通过邮件发送日程邀约和会议预定（仅当用户明确提到"邮箱"或"邮件"时）；回复邮件：对已有邮件进行回复 / 全部回复；转发邮件：将已有邮件转发给其他收件人；浏览 / 搜索邮件：按关键词 / 发件人 / 时间 / 已读未读 / 文件夹 / 标签 / 附件 / 星标 / 重要等条件查询邮件列表　
**不适用**：纯日程 / 会议管理（创建、修改、取消、查询日程或会议本身） → 日程改用 `wecomcli-calendar`、在线会议改用 `wecomcli-meeting`；本技能只负责"通过邮件发送"的日程 / 会议类邮件（日程邀约、会议邮件），不负责日程 / 会议本身的管理；标记已读 / 未读、删除邮件、保存草稿、邮件标签写操作（打/加/移除/取消标签、tag、label） → 告知用户暂未支持，建议前往企业微信客户端处理（按标签/文件夹搜索邮件是支持的，见"浏览 / 搜索邮件"）；邮箱账号设置 / 签名 / 自动回复 / 邮件规则配置 → 告知用户暂未支持，建议前往企业微信客户端处理；撤回已发送邮件 / 修改已发送邮件 → 告知用户暂未支持，建议前往企业微信客户端处理

| 命令 | 说明 |
|---|---|
| `wecom-cli mail get` | 读取邮件详情 |
| `wecom-cli mail search` |  |
| `wecom-cli mail send` |  |

> 深度参考：`references/get-mail.md`、`references/reply-mail.md`、`SKILL.md`

### meeting · 7 条

**适用**：创建 / 新建在线会议（含会议号 / 入会链接，可远程 / 视频参会；含"线下开 + 外地同事远程接入"的会）；查看 / 浏览会议列表（最近有什么会、查某时间段的会议）；搜索会议（按关键词、会议名找某个会议）；查看会议详情（主题、时间、参会人等）；更新 / 修改会议（改时间、加减人；不支持更新周期会议）　
**不适用**：创建、更新、取消周期 / 重复会议（每周 / 每月 / 每天重复）→ 均不支持，引导用户在企业微信客户端手动操作；回复 / 拒绝会议邀请（接受 / 拒绝 / 待定，含"拒绝这个会""不参加"）→ 不支持，引导用户在企业微信客户端操作或私信发起人

| 命令 | 说明 |
|---|---|
| `wecom-cli meeting cancel` | 取消会议 |
| `wecom-cli meeting create` | 创建会议 |
| `wecom-cli meeting get` | 获取详情 |
| `wecom-cli meeting list` | 拉取会议列表 |
| `wecom-cli meeting original get` | 拉取转写 |
| `wecom-cli meeting search` | 搜索会议 |
| `wecom-cli meeting update` | 更新会议 |

> 深度参考：`references/meeting-cancel.md`、`references/meeting-create.md`、`references/meeting-search.md`、`references/meeting-list.md`、`references/meeting-original-get.md`、`references/meeting-update.md`

### message · 3 条

**适用**：适用于给授权人发消息，使用 `wecom-cli identity whoami` 获取授权人ID，可作为 `chat_id` 使用，无需调用 `sessions list`。；适用于查询当前有权限发送消息的聊天会话范围并给这些范围中的成员或群聊发送 Markdown 消息、图片、文件、AMR 语音或视频　
**不适用**：发送对象不是授权人且不在本次 `sessions list` 返回结果中 → 告知用户当前只能向最近活跃的会话或授权人发送

| 命令 | 说明 |
|---|---|
| `wecom-cli identity whoami` |  |
| `wecom-cli message aibot send` |  |
| `wecom-cli message aibot sessions list` |  |

> 深度参考：`SKILL.md`

### sheet · 7 条

**适用**：新建 / 导入企微在线表格；读取 / 修改 / 追加在线表格内容；添加 / 删除在线表格子表　
**不适用**：搜索文档 / 修改文档权限 / 重命名 / 加成员 → 改用 `wecomcli-doc-manage`；用户给的链接是 `https://doc.weixin.qq.com/smartsheet/...` → 改用 `wecomcli-smartsheet`；若遇到的 `docid` 以 `s3` 开头（形如 `s3_xxxx`）→ 改用 `wecomcli-smartsheet`

| 命令 | 说明 |
|---|---|
| `wecom-cli sheet contents update` | 修改表格内容 |
| `wecom-cli sheet get` |  |
| `wecom-cli sheet import` | 新建在线表格 |
| `wecom-cli sheet ranges get` | 读取子表数据 |
| `wecom-cli sheet rows append` | 追加一行数据 |
| `wecom-cli sheet subsheets add` | 添加子工作表 |
| `wecom-cli sheet subsheets delete` | 删除子工作表 |

> 深度参考：`references/sheet-contents-update.md`、`SKILL.md`、`references/sheet-ranges-get.md`、`references/sheet-rows-append.md`、`references/sheet-subsheets-add.md`、`references/sheet-subsheets-delete.md`

### smartpage · 11 条

| 命令 | 说明 |
|---|---|
| `wecom-cli media download` |  |
| `wecom-cli smartpage blocks update` | 编辑页面 Block |
| `wecom-cli smartpage create` | 路径 B：先创建空白再追加内容 |
| `wecom-cli smartpage databases get` | 获取关联的数据表信息 |
| `wecom-cli smartpage files upload` | 上传附件到文档空间 |
| `wecom-cli smartpage images upload` | 上传附件到文档空间 |
| `wecom-cli smartpage import` | 新建智能文档场景 |
| `wecom-cli smartpage pages append` | 追加内容到页面 |
| `wecom-cli smartpage pages get` | 读取所有页面内容 |
| `wecom-cli smartpage pages overwrite` | 覆盖页面内容 |
| `wecom-cli smartpage pages update` | 修改页面结构 |

> 深度参考：`references/smartpage-edit.md`、`SKILL.md`、`references/mdx-syntax.md`

### smartsheet · 26 条

**适用**：读取智能表格信息与数据（全量/筛选）；修改表结构（子表/字段）；记录类型定义及操作；给单元格/行/列填色、着色、染色、标红、标黄、标绿、高亮、加底色、做条件格式；视图类型定义及操作　
**不适用**：文件级权限管理、添加成员、设置加入规则 → 转交 `wecomcli-doc-manage` 技能；删除智能表格文件 → 暂不支持；修改智能表格名称 → 转交 `wecomcli-doc-manage` 技能；搜索智能表格 / 按名称查找 / 查看最近浏览或创建的智能表格 → 转交 `wecomcli-doc-manage` 技能

| 命令 | 说明 |
|---|---|
| `wecom-cli smartsheet charts add` | 图表操作 |
| `wecom-cli smartsheet charts delete` | 写操作，支持新增/修改/删除仪表盘图表 |
| `wecom-cli smartsheet charts list` | 查询图表列表 |
| `wecom-cli smartsheet charts update` | 写操作，支持新增/修改/删除仪表盘图表 |
| `wecom-cli smartsheet create` | 新建智能表格 |
| `wecom-cli smartsheet fields` |  |
| `wecom-cli smartsheet fields add` | 写操作，字段操作独立命令 |
| `wecom-cli smartsheet fields delete` | 写操作，字段操作独立命令 |
| `wecom-cli smartsheet fields list` | 查询字段列表 |
| `wecom-cli smartsheet fields update` | 写操作，字段操作独立命令 |
| `wecom-cli smartsheet files upload` |  |
| `wecom-cli smartsheet images upload` |  |
| `wecom-cli smartsheet import` | 导入文档为智能表格 |
| `wecom-cli smartsheet records add` | 记录操作 |
| `wecom-cli smartsheet records delete` | 写操作，支持新增/修改/删除行记录 |
| `wecom-cli smartsheet records list` |  |
| `wecom-cli smartsheet records query` | 读取智能表格数据 |
| `wecom-cli smartsheet records update` | 写操作，支持新增/修改/删除行记录 |
| `wecom-cli smartsheet sheets add` | 子表操作 |
| `wecom-cli smartsheet sheets delete` | 写操作，支持新增/修改/删除子表 |
| `wecom-cli smartsheet sheets list` | 查询子表列表 |
| `wecom-cli smartsheet sheets update` | 写操作，支持新增/修改/删除子表 |
| `wecom-cli smartsheet views add` | 视图操作 |
| `wecom-cli smartsheet views delete` | 写操作，支持新增/修改/删除视图 |
| `wecom-cli smartsheet views list` | 查询视图列表 |
| `wecom-cli smartsheet views update` | 写操作，支持新增/修改/删除视图 |

> 深度参考：`references/smart-sheet-edit.md`、`references/smart-sheet-read.md`、`references/common.md`、`references/smart-sheet-record-values.md`

### todo · 6 条

| 命令 | 说明 |
|---|---|
| `wecom-cli todo create` | 创建待办 |
| `wecom-cli todo delete` | 删除/退出待办 |
| `wecom-cli todo finish` |  |
| `wecom-cli todo get` | 批量获取待办详情 |
| `wecom-cli todo list` | 按时间范围查询待办 |
| `wecom-cli todo update` |  |

> 深度参考：`references/todo-create.md`、`references/todo-delete.md`、`references/todo-finish.md`、`references/todo-get.md`、`references/todo-list.md`、`references/todo-update.md`

### media · 2 条

| 命令 | 说明 |
|---|---|
| `wecom-cli media download` | 下载媒体文件 |
| `wecom-cli media upload` | 上传媒体文件 |

> 深度参考：`SKILL.md`

### shared · 3 条

| 命令 | 说明 |
|---|---|
| `wecom-cli auth init` | Step 3：初始化凭证（仅未授权时） |
| `wecom-cli auth show` |  |
| `wecom-cli identity whoami` | 获取个人身份 |

> 深度参考：`SKILL.md`

## 任务 → 命令 速查

高频场景的直接映射。表里没有的，去上面「能力域总表」按场景匹配。

| 用户说 | 命令 |
|---|---|
| 给某人 / 某群发消息 | `wecom-cli message aibot sessions list` → 取 `chat_id` → `wecom-cli message aibot send` |
| 查最近能发消息的会话 | `wecom-cli message aibot sessions list` |
| 当前身份是谁 | `wecom-cli identity whoami` |
| 查某人 / 按拼音搜同事 | `wecom-cli contact users search` |
| 看日程 / 查某天的安排 | `wecom-cli calendar schedules list --json '{"begin_time":"…","end_time":"…"}'` |
| 约日程 / 建日程 | `wecom-cli calendar schedules create` |
| 改 / 取消日程 | `wecom-cli calendar schedules update` / `cancel` |
| 查大家有没有空 | `wecom-cli calendar schedules free list` |
| 找会议室 / 楼栋 | `wecom-cli meeting rooms search` / `meeting rooms buildings list` |
| 预约会议 | `wecom-cli meeting create` |
| 查会议列表 / 详情 | `wecom-cli meeting list` / `get` |
| 要会议纪要 / 转写原文 | `wecom-cli meeting original get` |
| 建待办 / 完成任务 | `wecom-cli todo create` / `todo finish` |
| 看待办列表 | `wecom-cli todo list` |
| 搜邮件 / 读邮件 | `wecom-cli mail search` / `mail get` |
| 写在线文档 | `wecom-cli doc import`，再用 `wecom-cli doc contents append` 追加正文 |
| 读 / 覆盖文档正文 | `wecom-cli doc contents get` / `contents overwrite` |
| 搜文档 / 改名 / 管权限 | `wecom-cli doc search` / `doc names update` / `doc members update` |
| 读写在线表格 | `wecom-cli sheet ranges get` / `sheet contents update` / `sheet rows append` |
| 智能表格增删记录 | `wecom-cli smartsheet records …`（先看该域清单） |
| 建智能文档 / 编辑内容 | `wecom-cli smartpage create` / `smartpage blocks update` |
| 上传 / 下载文件 | `wecom-cli media upload` / `media download`（拿到 media_id 再发消息） |
| 微盘文件管理 | `wecom-cli disk files list` / `upload` / `download` / `folders create` |
| 授权状态不对 / 未安装 | `wecom-cli auth show --status` → `wecom-cli auth init` |

## 全局约定（每个命令都适用）

### 使用前置：三步检查（官方硬要求）

官方 `wecomcli-shared` 技能规定：**首次准备执行任何 `wecom-cli` 命令前，必须先完成这三步**。

```bash
# Step 1 — 检查安装与版本（要求 >= 1.2.1）
wecom-cli --version
npm install -g @wecom/cli        # 缺失或版本过低时

# Step 2 — 检查授权状态
wecom-cli auth show --status     # authorized / unauthorized

# Step 3 — 未授权时初始化（扫码，仅需一次）
wecom-cli auth init --noninteractive
wecom-cli auth show --status     # 复查，authorized 才继续
```

- 已安装、版本达标且已授权时，**不重复安装或初始化**。
- 安装、升级、初始化或复查失败时，**不执行后续业务命令**，把错误告知用户。
- 授权输出既不是 `authorized` 也不是 `unauthorized` 时，不要猜，直接报错给用户。

### ID 类字段禁止外露（优先级最高）

这条约束对所有域生效，**优先级高于各业务技能的输出格式，且不因用户主动索要而放宽**。

- **禁止**：最终回复里出现 `userid` / `open_vid` / `department_id` / `chat_id` 等标识。
  凡接口返回的内部标识（`mail_id` / `media_id` / `file_id` / `space_id` / `folder_id` /
  `docid` / `content_id` / `msg_id` / `cursor` 等，命名以 `_id` 结尾或语义上属于机器标识的）
  只能内部流转，用于后续调用。
- **必须**：用可读名称组织回复 —— `name` / `username` / 部门名 / 邮箱 / `subject` /
  `doc_name` / `chat_name` / `title`。
- 只拿到 ID 没有可读名称时，先用 `wecomcli-contact` 之类换取名称；换不到就用自然语言指代
  （「上一封日报邮件」），**禁止退化为展示 ID**。
- 让用户在多个候选里选时，用「序号 + 名称/主题/时间」构造列表，不要用 ID 让用户辨认。
- 用户直接要「把 ID 给我」时，说明该标识属于内部字段不便提供，改用可读信息或继续把事办完。
- 例外：可读链接（`doc_url`、微盘分享链接）不受限，即使链接里本身含标识串。

### 请求体：三种给法，可组合

```bash
wecom-cli <service> [resource...] <method> [--param value ...] [--json '<JSON>'] [flags]
```

| 方式 | 说明 |
|---|---|
| 命名参数 | 由方法 schema 生成的参数（如 `--id root`），类型与必填性以 `--help` 为准 |
| `--json '<JSON>'` | 直接给定完整请求体 JSON 字符串 |
| `--set path=value` | 深层路径覆盖，可重复（如 `--set extra.flag=true`）；非法 JSON 片段会自动修复 |

```bash
# 无参方法（含嵌套资源路径）
wecom-cli message aibot sessions list

# 用 --json 给请求体
wecom-cli doc search --json '{"keywords":["周报"],"limit":10}'
```

### 通用执行 flag

| Flag | 说明 |
|---|---|
| `--dry-run` | 仅在本地校验并打印将发送的请求，**不实际调用** |
| `--page-count <n>` | 启用游标式自动分页，最多拉 n 页；输出为 NDJSON（每行一页） |
| `--page-delay <ms>` | 分页请求间隔毫秒数，默认 100 |
| `--output` / `-o <file>` | 将响应体写入文件 |
| `--output-dir <dir>` | 指定下载文件的落盘目录（默认当前目录） |

输出形态：

- 默认：compact JSON 输出到 stdout。
- 下载类方法：文件落盘到当前目录（可用 `--output-dir` / `--output` 改），stdout 输出 `DownloadResult` JSON（`content_type` / `file_path` / `size`），文件以 `0600` 落盘。
- 分页：NDJSON 多行输出。
- 日志与提示一律走 stderr，不污染 stdout 的 JSON。

### 退出码与错误格式

| 退出码 | 含义 |
|---|---|
| `0` | 成功（含 `--help` / `--version`） |
| `1` | 运行时错误（网络、鉴权、IO、后台业务错误） |
| `2` | 用法错误（参数缺失、未知命令） |

错误以结构化 JSON 输出到 **stdout**：

```json
{ "error": { "type": "AuthError", "code": 893201, "message": "..." } }
```

- CLI 自身错误的 code 段：`893000–893099`（lib）、`893100–893199`（transport）、`893200–893299`（bin），`893999` 为兜底。
- 后台业务错误（`errcode != 0`）直接透传原响应体与 `errcode`。
- **判断成功看退出码 0，不要只看 `error` 字段是否存在。**

### 运行时路径、环境变量与配置文件

| 项目 | 默认位置 | 备注 |
|---|---|---|
| 配置目录 | `~/.config/wecom` | 可由 `WECOM_CLI_CONFIG_DIR` 覆盖 |
| 凭据文件 | `<config_dir>/credentials.enc` | AES-256-GCM（0600） |
| 加密密钥 | 系统 keyring 或 `<config_dir>/.encryption_key` | 无 keyring 时的文件回退 |
| discovery 缓存 | `<config_dir>/cache` | 服务目录与 schema 缓存，**TTL 60 秒** |
| 下载目录 | 当前工作目录 | 单次调用可用 `--output-dir` 覆盖 |

| 环境变量 | 作用 |
|---|---|
| `WECOM_CLI_CONFIG_DIR` | 覆盖默认配置目录 |
| `WECOM_CLI_ADDITIONAL_HEADERS` | 额外请求头，值为 JSON object；也支持 `WECOM_CLI_ADDITIONAL_HEADERS_*` 后缀形式 |
| `WECOM_CLI_LOG_LEVEL` | 打开 stderr 文本日志并设置过滤级别（如 `debug`） |
| `WECOM_CLI_LOG_DIR` | 打开 JSON Lines 日志，按天写入 `<dir>/ww.log.<日期>`（UTC+8） |

- 环境变量优先级高于配置文件。
- **access token 不允许经 `config.json` 配置**，只来自 `credentials.enc`。

### 消息发送的能力边界（最容易误解）

机器人**只能向「最近有过消息往来的会话」主动发消息**，不能凭姓名或 ID 任意发送。

1. 先跑 `wecom-cli message aibot sessions list` 拿到本次可用的会话列表。
2. 从本次返回的 `sessions[]` 里选定目标，把该项的 `chat_id` **原样复制**给 `send`。

以下值**都不能**直接当 `send.chat_id`：用户输入的 ID、历史轮次里存下来的 `chat_id`、
`wecomcli-contact` 返回的 `userid`、按姓名/群名自行构造的值。它们最多只能当匹配线索。

例外：可以给「授权人」本人发消息 —— 用 `wecom-cli identity whoami` 拿到的授权人 ID
可直接作为 `chat_id`，无需先跑 `sessions list`。

### 发送媒体文件的正确顺序

要发图片/文件/语音/视频且手上只有本地路径时，**必须先换 media_id**：

```bash
wecom-cli media upload <type> --file <本地路径>   # 先拿 media_id
wecom-cli message aibot send --json '{...}'        # 再用 media_id 发送
```

- 上传时的 `type` 必须与发送时的 `msg_type` 对齐。
`wecomcli-media` 只负责文件搬运，不解析文件内容。

## 各域官方 Skill 说明与边界（完整原文摘要）

> 原文来自 官方 https://github.com/WecomTeam/wecom-cli 的 skills/*/SKILL.md。厂商写的判断标准优先于一般经验。

### wecomcli-calendar
企业微信日程管理。当用户需要预约日程、预订会议室、查看/更新/取消日程或查忙闲时触发。本技能负责『日程』——即不含在线会议链接的安排（也涵盖纯线下面对面碰头）；若用户要的是『在线会议』（含会议号/入会链接、可远程或视频参会），改用 wecomcli-meeting 技能。用户仅说'开会/约个会/某会'等、未明确要创建的是日程还是在线会议时，必须先读取本技能并按其中的消歧流程向用户追问确认后再处理，不可臆断直接创建。
*规模：9 条命令 · 7 篇深度参考*

**适用**
- 预约 / 创建日程（含纯线下面对面碰头，即不带在线会议链接的安排）
- 查看 / 浏览日程（今天有什么安排、查本周日程）
- 搜索日程（按关键词、按组织人、按参与人找某个日程）
- 更新 / 修改日程（改时间、改地点、加减人、换会议室；不支持更新周期日程）
- 取消日程（不支持取消周期日程）

**不适用**
- 创建、更新、取消周期 / 重复日程（每周 / 每月 / 每天重复）→ 均不支持，引导用户在企业微信客户端手动操作
- 回复 / 拒绝日程邀请（接受 / 拒绝 / 待定，含"拒绝这个日程""不参加"）→ 不支持，引导用户在企业微信客户端操作或私信发起人

### wecomcli-contact
使用 wecom-cli 按姓名、拼音、英文名或别名搜索企业微信通讯录中的人员，并查询匹配人员的 userid、部门和职务。适用于查找联系人、区分同名人员、获取用户 userid，以及列出全部同名人员。
*规模：1 条命令*

### wecomcli-disk
企业微信微盘（Disk / 网盘）文件操作技能。承接"微盘 / 网盘"里的文件列出、搜索、读取元信息、上传、下载、重命名、新建文件夹操作。用户明确提到"微盘"/"网盘"/"共享空间"时必须先读取本技能获取完整指引，不得凭记忆处理。用户说"上传到微盘"、"帮我在微盘里搜一下 xxx"、"微盘那个 PPT 在哪"、"下载微盘那个文件"、"把微盘那个文件重命名成 xxx"、或直接给出 `https://drive.weixin.qq.com/s?k=...` 形式的微盘文件链接时使用本技能。与 `wecomcli-doc` / `wecomcli-sheet` / `wecomcli-smartsheet` / `wecomcli-smartpage` 的区别：本技能处理微盘里所有文件（含在线文档）的搜索/列表/基础信息/位置/路径/重命名等文件级操作；在线文档（`doc/sheet/smartsheet/smartpage` 类型）的内容读写走对应文档技能，不由本技能接管。当用户问「这个文档在微盘哪里」或问某文件在微盘的位置时，由本技能用 get 返回空间名/文件夹名/路径等元信息。
*规模：7 条命令*

**适用**
- 列出微盘最近查看的文件
- 按关键词/类型/创建者/共享空间搜索微盘文件或文件夹
- 读取微盘文件基础信息
- 上传本地文件到微盘指定文件夹
- 下载微盘文件到本地

**不适用**
- 移动微盘文件或文件夹 → 告知用户暂未支持，建议前往企业微信客户端手动操作
- 删除微盘文件 / 复制微盘文件 → 告知用户暂未支持，建议前往企业微信客户端手动操作
- 删除 / 重命名微盘文件夹（`folder`）、调整目录树结构 → 告知用户暂未支持，建议前往企业微信客户端手动操作
- 创建 / 删除共享空间（`space`）、修改空间成员与空间设置 → 告知用户暂未支持，建议前往企业微信客户端手动操作

### wecomcli-doc
企业微信在线 doc 文档技能。能够新建 doc、导入本地 .doc/.docx/.txt 为 doc、读取 doc 内容、向 doc 追加或覆盖写入。仅当用户明确出现「doc」「docx」「word」「在线文档」「office 文档」等强类型词，或提供 https://doc.weixin.qq.com/doc/xxx 链接时才使用本技能。用户说"文档""新建文档""写文档""整理成文档""输出到文档"等未指定类型的泛化表达，一律使用 wecomcli-smartpage。
*规模：4 条命令 · 3 篇深度参考*

**适用**
- 新建 / 导入企微 doc 文档
- 读取 doc 文档内容
- 向 doc 文档追加一行 / 覆盖写入doc 文档

**不适用**
- 搜索文档 / 修改文档权限 / 重命名 / 加成员 → 改用 `wecomcli-doc-manage`
- 在线表格操作 → 改用 `wecomcli-sheet`
- 智能表格操作 → 改用 `wecomcli-smartsheet`
- 含字段 / 记录 / 筛选 / 排序 / 统计 / 分组等结构化数据语义 → 改用 `wecomcli-smartsheet` 或 `wecomcli-smartpage`（禁止用 doc + markdown 静态表格变通）

### wecomcli-doc-manage
企业微信文档公共管理：搜索文档（最近浏览/创建）、文档改名、添加文档成员权限、设置文档加入规则。适用于所有文档类型（doc文档 / 在线表格 / 智能表格 / 智能文档）。新建或导入doc文档请使用 wecomcli-doc；新建或导入在线表格请使用 wecomcli-sheet；智能表格内容 CRUD 请使用 wecomcli-smartsheet；生成智能文档请使用 wecomcli-smartpage。"看过哪些文档/浏览历史"类需求走本技能，不要走 wecom_get_user_memory。
*规模：4 条命令 · 3 篇深度参考*

### wecomcli-email
企业微信邮件：发送/回复/转发邮件、搜索邮件列表、获取邮件详情（正文、附件、内嵌图片解析），支持通过邮件发送日程邀约和会议预定。当用户涉及内部邮件收发、邮件查询、邮件管理等需求时使用。注意：日程和会议有单独的技能，仅当用户明确提到"邮箱"或"邮件"时（如"通过邮箱发送会议邀请"、"发封会议邮件"），才使用本技能处理会议日程邮件。
*规模：3 条命令 · 7 篇深度参考*

**适用**
- 发送新邮件：向指定收件人/抄送/密送发送邮件，支持本地附件和内嵌图片
- 日程邀约 / 会议邮件：通过邮件发送日程邀约和会议预定（仅当用户明确提到"邮箱"或"邮件"时）
- 回复邮件：对已有邮件进行回复 / 全部回复
- 转发邮件：将已有邮件转发给其他收件人
- 浏览 / 搜索邮件：按关键词 / 发件人 / 时间 / 已读未读 / 文件夹 / 标签 / 附件 / 星标 / 重要等条件查询邮件列表

**不适用**
- 纯日程 / 会议管理（创建、修改、取消、查询日程或会议本身） → 日程改用 `wecomcli-calendar`、在线会议改用 `wecomcli-meeting`；本技能只负责"通过邮件发送"的日程 / 会议类邮件（日程邀约、会议邮件），不负责日程 / 会议本身的管理
- 标记已读 / 未读、删除邮件、保存草稿、邮件标签写操作（打/加/移除/取消标签、tag、label） → 告知用户暂未支持，建议前往企业微信客户端处理（按标签/文件夹搜索邮件是支持的，见"浏览 / 搜索邮件"）
- 邮箱账号设置 / 签名 / 自动回复 / 邮件规则配置 → 告知用户暂未支持，建议前往企业微信客户端处理
- 撤回已发送邮件 / 修改已发送邮件 → 告知用户暂未支持，建议前往企业微信客户端处理

### wecomcli-media
企业微信媒体文件上传/下载技能。承接基于 media_id 下载媒体文件到本地，以及上传本地文件获取 media_id 两类操作。当其他技能（微盘、邮件等）返回了 media_id 需要落地为本地文件，或已有本地文件需要转换为 media_id 供其他技能使用时，必须先读取本技能获取完整指引，不得凭记忆处理。本技能不解析/识别文件内容，仅负责文件本身的搬运。
*规模：2 条命令*

**适用**
- 根据其他技能或用户提供的 `media_id` 下载媒体文件到本地
- 上传本地文件（本地路径已知）获取 `media_id`，供其他技能后续使用（如微盘上传素材）

**不适用**
- 解析/识别文件内容（正文提取、OCR、看图问答、PDF/Word/Excel 解析等） → 本 skill 只负责把文件下载到本地拿 `file_path`，如需查看内容请直接通过 `file_path` 读取该本地文件
- 搜索/发现其他业务场景中已存在的 `media_id`（如邮件附件、微盘文件列表/搜索等） → 由对应业务技能负责产出并返回 `media_id`，本 skill 只接收已有的 `media_id` 做下载；本地文件转`media_id` 的场景仍走本 skill 的 `upload`
- 编造或猜测 `media_id` / 本地文件路径 → 两者必须来自其他技能返回或用户明确提供，禁止自行构造

### wecomcli-meeting
企业微信会议管理。本技能负责『在线会议』——即含在线会议链接（含会议号/入会链接、可远程或视频参会）的会议的创建、查询、搜索、获取详情（含会议信息、纪要、待办）、查询会议转写原文（逐字发言记录）、更新、取消等全部操作；若用户要的是不含在线会议链接的『日程』（也涵盖纯线下面对面碰头），改用 wecomcli-calendar 技能。用户仅说'开会/约个会/某会/某会议'等、未明确要创建的是日程还是在线会议时，必须先读取本技能并按其中的消歧流程向用户追问确认后再处理，不可臆断直接创建。
*规模：7 条命令 · 6 篇深度参考*

**适用**
- 创建 / 新建在线会议（含会议号 / 入会链接，可远程 / 视频参会；含"线下开 + 外地同事远程接入"的会）
- 查看 / 浏览会议列表（最近有什么会、查某时间段的会议）
- 搜索会议（按关键词、会议名找某个会议）
- 查看会议详情（主题、时间、参会人等）
- 更新 / 修改会议（改时间、加减人；不支持更新周期会议）

**不适用**
- 创建、更新、取消周期 / 重复会议（每周 / 每月 / 每天重复）→ 均不支持，引导用户在企业微信客户端手动操作
- 回复 / 拒绝会议邀请（接受 / 拒绝 / 待定，含"拒绝这个会""不参加"）→ 不支持，引导用户在企业微信客户端操作或私信发起人

### wecomcli-message
查询当前可以发送消息的聊天会话范围，并向会话列表中的单聊或群聊发送文本、Markdown、图片、文件、语音、视频消息。用户要求“给某人发消息”“在某个群里通知”“给最近会话发消息”或“把图片/文件/语音/视频发到企业微信”时使用。
*规模：3 条命令*

**适用**
- 适用于给授权人发消息，使用 `wecom-cli identity whoami` 获取授权人ID，可作为 `chat_id` 使用，无需调用 `sessions list`。
- 适用于查询当前有权限发送消息的聊天会话范围并给这些范围中的成员或群聊发送 Markdown 消息、图片、文件、AMR 语音或视频

**不适用**
- 发送对象不是授权人且不在本次 `sessions list` 返回结果中 → 告知用户当前只能向最近活跃的会话或授权人发送

### wecomcli-shared
wecom-cli 业务技能的公共前置检查、获取机器人及授权真人身份，以及通用输出约束。任何 wecomcli-* 技能首次准备执行 wecom-cli 命令前，都必须同时读取本技能，检查 CLI 是否安装、版本是否不低于 1.2.1，以及企业微信凭证是否已授权；仅在缺失、版本过低或未授权时执行安装或初始化。本技能还定义所有技能通用的 ID 类字段禁止外露约束。本技能不处理具体业务请求。
*规模：3 条命令*

### wecomcli-sheet
企业微信在线表格文档管理：新建在线表格、导入 CSV/Excel 为在线表格、读取表格信息与数据、修改表格内容、追加行数据、子表管理。当用户提到'表格'、'在线表格'、'excel表格'这些关键词触发，或链接形如 https://doc.weixin.qq.com/sheet/xxx 时触发。文档公共操作请使用 wecomcli-doc-manage；doc文档操作请使用 wecomcli-doc；智能表格内容 CRUD 请使用 wecomcli-smartsheet。
*规模：7 条命令 · 5 篇深度参考*

**适用**
- 新建 / 导入企微在线表格
- 读取 / 修改 / 追加在线表格内容
- 添加 / 删除在线表格子表

**不适用**
- 搜索文档 / 修改文档权限 / 重命名 / 加成员 → 改用 `wecomcli-doc-manage`
- 用户给的链接是 `https://doc.weixin.qq.com/smartsheet/...` → 改用 `wecomcli-smartsheet`
- 若遇到的 `docid` 以 `s3` 开头（形如 `s3_xxxx`）→ 改用 `wecomcli-smartsheet`

### wecomcli-smartpage
企业微信智能文档（smartpage）操作技能。能够新建文档、导入 .md 为文档、读取文档内容、修改文档内容（整页重写、局部编辑、增删子页面）、上传附件到文档，以及搭建带看板/图表的数据系统页面和信息收集表单页面。当用户提及文档，智能文档，智能主页、提供 https://doc.weixin.qq.com/smartpage/xxx 或 https://page.weixin.qq.com/smartpage/xxx 链接、要求整理成文档，或表达"新建文档""把 md 导入成文档"等未指定文档类型的需求时，也应使用本技能。
*规模：11 条命令 · 4 篇深度参考*

### wecomcli-smartsheet
企业微信智能表格内容操作技能——专注于智能表格（smartsheet）的数据、结构与样式管理：读取表结构与记录、管理子表/字段/记录/视图/图表，以及修改行列样式（填色/高亮）；记录新增或更新遇到 851003 / no authority 时通过 Webhook 兜底写入。触发条件：用户提到智能表格、企微表格、smartsheet 的内容操作或样式修改，或链接形如 https://doc.weixin.qq.com/smartsheet/s3_xxx。企业微信表格分为「智能表格」和「在线表格」两种类型，本文档介绍的是智能表格的相关技能。智能表格包含子表（sheet）、视图（view）、字段/列（field），每条记录（record）以 `record_id` 作为主键，结构类似关系型数据库。当用户未明确说明使用「在线表格」时，一律默认使用功能更强大的智能表格（本技能）。
*规模：26 条命令 · 10 篇深度参考*

**适用**
- 读取智能表格信息与数据（全量/筛选）
- 修改表结构（子表/字段）
- 记录类型定义及操作
- 给单元格/行/列填色、着色、染色、标红、标黄、标绿、高亮、加底色、做条件格式
- 视图类型定义及操作

**不适用**
- 文件级权限管理、添加成员、设置加入规则 → 转交 `wecomcli-doc-manage` 技能
- 删除智能表格文件 → 暂不支持
- 修改智能表格名称 → 转交 `wecomcli-doc-manage` 技能
- 搜索智能表格 / 按名称查找 / 查看最近浏览或创建的智能表格 → 转交 `wecomcli-doc-manage` 技能

### wecomcli-todo
管理企业微信待办，支持创建、删除或退出、完成、查询和筛选，以及修改标题、描述、参与人名单和截止时间。
*规模：6 条命令 · 6 篇深度参考*

---

*快照由 `bin/skill-digest wecom-cli` 从 https://github.com/WecomTeam/wecom-cli 源码聚合生成，版本 `1.3.0`，时间 2026-09-17 06:52:39。*
*命令树随服务端 discovery 变化，拿到凭证后请以 `wecom-cli --help` 为准；升级后刷新：`bin/refresh wecom-cli`*
