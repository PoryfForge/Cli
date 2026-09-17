# CLI 能力库 · 总索引

> 共收录 4 个 CLI。**Agent 动手前先读这里，别再现场翻 help。**
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

## 已收录的 CLI

按业务域数量排序。`采集方式` 说明这份快照是从哪儿来的 —— 这是判断它可信范围的关键。

| CLI | 能干什么 | 域 | 命令 | 采集方式 | 版本 | 能力文档 |
|---|---|---:|---:|---|---|---|
| **feishu-cli** | 飞书/Lark 官方开源的命令行工具，把开放平台能力封装成终端命令，原生面向 AI Agent。覆盖 23 个业务域、343 个快捷命令、120 个 API 方法，底层可达 2500+ 开放平台端点。 | 23 | 343 | 仓库 skill 文档 | 1.0.96 | [快照](registry/feishu-cli/CAPABILITY.md) · [API 清单](registry/feishu-cli/api-resources.md) · [官方原文](registry/feishu-cli/vendor) |
| **wecom-cli** | 企业微信官方 CLI（Rust 实现，经 npm 包 @wecom/cli 分发），覆盖消息、邮件、在线文档、在线表格、智能表格、智能文档、待办、日程、会议、微盘、通讯录等办公能力。命令树由服务端 discovery 动态下发，随附 14 个官方 Agent Skills。 | 12 | 93 | 仓库 skill 文档 | 1.3.0 | [快照](registry/wecom-cli/CAPABILITY.md) · [官方原文](registry/wecom-cli/vendor) |
| **wps365-cli** | WPS 365 官方 CLI：日历、消息、通讯录、邮箱、云文档、智能文档、智能表格、多维表、会议 9 大业务域，另含 api 兜底命令与 spec 管理 | 9 | 200 | release 二进制 help 全树 | 0.3.5 | [快照](registry/wps365-cli/CAPABILITY.md) |
| **dreamina** | 即梦（Dreamina）官方 AIGC CLI：文生图 / 图生图 / 文生视频 / 图生视频 / 多模态参考，含账号、会话与任务管理 | 2 | 23 | 本机 CLI help 全树 + 官方 SKILL.md | 673dd28-dirty | [快照](registry/dreamina/CAPABILITY.md) · [官方原文](registry/dreamina/vendor) |

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
采集方式和解析档的说明见 `CONTRIBUTING.md` —— 加 CLI 不用改任何脚本。

`remember` 保存到 `routes.json` 并自动重建索引；同一个 CLI、同一个意图再次保存会更新原条目，不执行业务命令。也可手工编辑后运行 `bin/cli-cap index`。
