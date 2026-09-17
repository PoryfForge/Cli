---
name: feishu-cli-api
version: 1.0.96
scanned_at: 2026-09-17 06:52:39
api_methods: 120
---

# 飞书 CLI · API 方法全量清单

这是第 2 层「API 命令」的完整清单，共 **120 个方法**；第 3 层 `lark-cli api <METHOD> <PATH>` 可达 2500+ 端点。

```bash
lark-cli <域> <资源> <方法> [--params '{...}'] [--data '{...}']   # 调用
lark-cli schema <域>.<资源>.<方法>                                 # 先看参数结构，别猜字段
```

> Identity 列写了该方法支持 `user` / `bot`。同一方法换身份可能一个成功一个失败 —— 群主/管理员身份、群成员资格、租户边界、应用可用范围都按当前调用者判定。

## im · 42 个方法

### `im.chats`

| 方法 | 调用 | 说明 |
|---|---|---|
| `create` | `lark-cli im chats create` | 创建群。Identity: `bot` only (`tenant_access_token`). |
| `get` | `lark-cli im chats get` | 获取群信息。Identity: supports `user` and `bot`; the caller must be in the target chat to get full details, and must belong to the same tenant for internal chats. |
| `link` | `lark-cli im chats link` | 获取群分享链接。Identity: supports `user` and `bot`; the caller must be in the target chat, must be an owner or admin when chat sharing is restricted to owners/admins, and must belong to the same tenant for internal chats. |
| `update` | `lark-cli im chats update` | 更新群信息。Identity: supports `user` and `bot`. |

### `im.chat.members`

| 方法 | 调用 | 说明 |
|---|---|---|
| `create` | `lark-cli im chat.members create` | 将用户或机器人拉入群聊。Identity: supports `user` and `bot`; the caller must be in the target chat; for `bot` calls, added users must be within the app's availability; for internal chats the operator must belong to the same tenant; if only owners/admins can add members, the caller must be an owner/admin, or a chat-creator bot with `im:chat:operate_as_owner`. |
| `delete` | `lark-cli im chat.members delete` | 将用户或机器人移出群聊。Identity: supports `user` and `bot`; only group owner, admin, or creator bot can remove others; max 50 users or 5 bots per request. |

### `im.chat.user_setting`

| 方法 | 调用 | 说明 |
|---|---|---|
| `batch_query` | `lark-cli im chat.user_setting batch_query` | 批量查询当前用户在群内的个人偏好设置 (e.g. `is_muted` mutes normal messages, `is_mute_at_all` mutes @all messages); up to 10 chats per request. Identity: `user` only (`user_access_token`); the caller must be in each target chat. |
| `batch_update` | `lark-cli im chat.user_setting batch_update` | 批量更新当前用户在群内的个人偏好设置 (e.g. `is_muted` mutes normal messages, `is_mute_at_all` mutes @all messages); up to 10 chats per request. Identity: `user` only (`user_access_token`); the caller must be in each target chat. |

### `im.chat.nickname`

| 方法 | 调用 | 说明 |
|---|---|---|
| `get` | `lark-cli im chat.nickname get` | 获取自己的群昵称。Get your own nickname in the chat (self-only). Identity: `user` only (`user_access_token`); returns an empty string when no nickname is set. |
| `update` | `lark-cli im chat.nickname update` | 设置自己的群昵称。Set or update your own nickname in the chat (self-only). Identity: `user` only (`user_access_token`); `nickname` must be a non-empty string (max 300 bytes). Use DELETE to clear it. |
| `delete` | `lark-cli im chat.nickname delete` | 清空自己的群昵称。Clear your own nickname in the chat (self-only). Identity: `user` only (`user_access_token`). |

### `im.chat.join_requests`

| 方法 | 调用 | 说明 |
|---|---|---|
| `list` | `lark-cli im chat.join_requests list` | 列出群的待审批入群申请（仅群主/管理员，user_access_token）。List pending join requests for a chat. Identity: `user` only (`user_access_token`); the caller must be the chat owner or an admin. Paginated (`page_size` 1-100); stop on `has_more == false` — `page_token` is returned even on the last page, so paging while it is present never terminates. |
| `handle` | `lark-cli im chat.join_requests handle` | 批量审批入群申请（approve/reject，仅群主/管理员，user_access_token）。Approve or reject pending join requests in bulk (1-50 items, processed in order). Identity: `user` only (`user_access_token`); the caller must be the chat owner or an admin. `results[]` mirrors `items[]` in count and order — check each `result` (`success` / `failed` / `already_handled`); exit 0 does not mean every item succeeded. |

### `im.chat.managers`

| 方法 | 调用 | 说明 |
|---|---|---|
| `add_managers` | `lark-cli im chat.managers add_managers` | 指定群管理员。Identity: supports `user` and `bot`; only the group owner can add managers; max 10 managers per chat (20 for super-large chats), and at most 5 bots per request. |
| `delete_managers` | `lark-cli im chat.managers delete_managers` | 删除群管理员。Identity: supports `user` and `bot`; only the group owner can remove managers; max 50 users or 5 bots per request. |

### `im.chat.moderation`

| 方法 | 调用 | 说明 |
|---|---|---|
| `get` | `lark-cli im chat.moderation get` | 获取群成员发言权限。Identity: supports `user` and `bot`; the caller must be in the target chat and belong to the same tenant. |
| `update` | `lark-cli im chat.moderation update` | 更新群发言权限。Identity: supports `user` and `bot`; only the group owner (or creator bot with `im:chat:operate_as_owner`) can update; the caller must be in the chat. |

### `im.messages`

| 方法 | 调用 | 说明 |
|---|---|---|
| `read_status` | `lark-cli im messages read_status` | 批量查询当前用户对消息的已读状态。Identity: `user` only (`user_access_token`); accepts up to 50 message IDs and returns readable items plus invalid message IDs.[必读] |
| `delete` | `lark-cli im messages delete` | 撤回消息。Identity: supports `user` and `bot`; for `bot` calls, the bot must be in the chat to revoke group messages; to revoke another user's group message, the bot must be the owner, an admin, or the creator; for user P2P recalls, the target user must be within the bot's availability. |
| `forward` | `lark-cli im messages forward` | 转发消息。Identity: supports `user` and `bot`. |
| `merge_forward` | `lark-cli im messages merge_forward` | 合并转发消息。Identity: `bot` only (`tenant_access_token`). |
| `read_users` | `lark-cli im messages read_users` | 查询消息已读信息。Identity: supports `user` and `bot`; the caller must still be in the chat. A user can query messages they sent within the last 7 days, while a bot can query only messages sent by that bot within the last 7 days.[必读] |
| `patch` | `lark-cli im messages patch` | 更新已发送的消息卡片。Update an interactive message card sent by the app. Identity: supports `user` and `bot`; the message must have been sent within the last 14 days, and `content` must be a JSON-serialized string no larger than 30 KB.[必读] |
| `urgent_app` | `lark-cli im messages urgent_app` | 发送应用内加急。Identity: `bot` only (`tenant_access_token`); the bot must be the message sender and must be in the conversation that contains the message. |
| `urgent_phone` | `lark-cli im messages urgent_phone` | 发送电话加急。Identity: `bot` only (`tenant_access_token`); the bot must be the message sender and must be in the conversation that contains the message. |
| `urgent_sms` | `lark-cli im messages urgent_sms` | 发送短信加急。Identity: `bot` only (`tenant_access_token`); the bot must be the message sender and must be in the conversation that contains the message. |

### `im.reactions`

| 方法 | 调用 | 说明 |
|---|---|---|
| `batch_query` | `lark-cli im reactions batch_query` | 批量获取消息表情。Identity: supports `user` and `bot`.[必读] |
| `create` | `lark-cli im reactions create` | 添加消息表情回复。Identity: supports `user` and `bot`; the caller must be in the conversation that contains the message.[必读] |
| `delete` | `lark-cli im reactions delete` | 删除消息表情回复。Identity: supports `user` and `bot`; the caller must be in the conversation that contains the message, and can only delete reactions added by itself.[必读] |
| `list` | `lark-cli im reactions list` | 获取消息表情回复。Identity: supports `user` and `bot`; the caller must be in the conversation that contains the message.[必读] |

### `im.threads`

| 方法 | 调用 | 说明 |
|---|---|---|
| `forward` | `lark-cli im threads forward` | 转发话题。Identity: supports `user` and `bot`. |

### `im.images`

| 方法 | 调用 | 说明 |
|---|---|---|
| `create` | `lark-cli im images create` | 上传图片。Identity: supports `user` and `bot`; user identity requires `im:resource` scope on the UAT. |

### `im.files`

| 方法 | 调用 | 说明 |
|---|---|---|
| `create` | `lark-cli im files create` | 上传文件。Identity: supports `user` and `bot`; user identity requires `im:resource` scope on the UAT. |

### `im.pins`

| 方法 | 调用 | 说明 |
|---|---|---|
| `create` | `lark-cli im pins create` | Pin 消息。Identity: supports `user` and `bot`. |
| `delete` | `lark-cli im pins delete` | 移除 Pin 消息。Identity: supports `user` and `bot`. |
| `list` | `lark-cli im pins list` | 获取群内 Pin 消息。Identity: supports `user` and `bot`. |

### `im.feed.groups`

| 方法 | 调用 | 说明 |
|---|---|---|
| `batch_add_item` | `lark-cli im feed.groups batch_add_item` | Batch add feed cards to a feed group. Identity: `user` only (`user_access_token`).[必读] |
| `batch_query` | `lark-cli im feed.groups batch_query` | Batch query feed groups. Identity: `user` only (`user_access_token`).[必读] |
| `batch_remove_item` | `lark-cli im feed.groups batch_remove_item` | Batch remove feed cards from a feed group. Identity: `user` only (`user_access_token`).[必读] |
| `create` | `lark-cli im feed.groups create` | Create a feed group. Identity: `user` only (`user_access_token`).[必读] |
| `delete` | `lark-cli im feed.groups delete` | Delete a feed group. Identity: `user` only (`user_access_token`).[必读] |
| `update` | `lark-cli im feed.groups update` | Update a feed group. Identity: `user` only (`user_access_token`).[必读] |

## drive · 15 个方法

### `drive.files`

| 方法 | 调用 | 说明 |
|---|---|---|
| `copy` | `lark-cli drive files copy` | 复制文件；优先使用 [`drive +copy`](references/lark-drive-copy.md) |
| `create_folder` | `lark-cli drive files create_folder` | 新建文件夹 |
| `list` | `lark-cli drive files list` | 获取文件夹下的清单；使用前阅读 [`references/lark-drive-files-list.md`](references/lark-drive-files-list.md) |
| `patch` | `lark-cli drive files patch` | 修改文件标题；优先使用 [`drive +update-title`](references/lark-drive-update-title.md) shortcut |

### `drive.permission.members`

| 方法 | 调用 | 说明 |
|---|---|---|
| `auth` | `lark-cli drive permission.members auth` |  |
| `create` | `lark-cli drive permission.members create` | 增加协作者权限 |
| `transfer_owner` | `lark-cli drive permission.members transfer_owner` |  |

### `drive.metas`

| 方法 | 调用 | 说明 |
|---|---|---|
| `batch_query` | `lark-cli drive metas batch_query` | 获取文档元数据 |

### `drive.user`

| 方法 | 调用 | 说明 |
|---|---|---|
| `remove_subscription` | `lark-cli drive user remove_subscription` | 取消订阅用户、应用维度事件 |
| `subscription` | `lark-cli drive user subscription` | 订阅用户、应用维度事件（本次开放评论添加事件） |
| `subscription_status` | `lark-cli drive user subscription_status` | 查询用户、应用对指定事件的订阅状态 |

### `drive.file.statistics`

| 方法 | 调用 | 说明 |
|---|---|---|
| `get` | `lark-cli drive file.statistics get` | 获取文件统计信息 |

### `drive.file.view_records`

| 方法 | 调用 | 说明 |
|---|---|---|
| `list` | `lark-cli drive file.view_records list` | 获取文档的访问者记录 |

### `drive.file.comment.reply.reactions`

| 方法 | 调用 | 说明 |
|---|---|---|
| `update_reaction` | `lark-cli drive file.comment.reply.reactions update_reaction` | 添加/删除 reaction；优先使用 `drive +react-reply` |

### `drive.quota_details`

| 方法 | 调用 | 说明 |
|---|---|---|
| `get` | `lark-cli drive quota_details get` | 获取当前用户的容量信息，包含各业务使用量、租户配额是否超限、用户配额、所在部门配额 |

## task · 34 个方法

### `task.tasks`

| 方法 | 调用 | 说明 |
|---|---|---|
| `create` | `lark-cli task tasks create` | 创建任务 |
| `delete` | `lark-cli task tasks delete` | 删除任务 |
| `get` | `lark-cli task tasks get` | 获取任务详情 |
| `list` | `lark-cli task tasks list` | 列取任务列表 |
| `patch` | `lark-cli task tasks patch` | 更新任务 |

### `task.tasklists`

| 方法 | 调用 | 说明 |
|---|---|---|
| `add_members` | `lark-cli task tasklists add_members` | 添加清单成员 |
| `create` | `lark-cli task tasklists create` | 创建清单 |
| `delete` | `lark-cli task tasklists delete` | 删除清单 |
| `get` | `lark-cli task tasklists get` | 获取清单详情 |
| `list` | `lark-cli task tasklists list` | 获取清单列表 |
| `patch` | `lark-cli task tasklists patch` | 更新清单 |
| `remove_members` | `lark-cli task tasklists remove_members` | 移除清单成员 |
| `tasks` | `lark-cli task tasklists tasks` | 获取清单任务列表 |

### `task.subtasks`

| 方法 | 调用 | 说明 |
|---|---|---|
| `create` | `lark-cli task subtasks create` | 创建子任务 |
| `list` | `lark-cli task subtasks list` | 获取任务的子任务列表 |

### `task.members`

| 方法 | 调用 | 说明 |
|---|---|---|
| `add` | `lark-cli task members add` | 添加任务成员 |
| `remove` | `lark-cli task members remove` | 移除任务成员 |

### `task.sections`

| 方法 | 调用 | 说明 |
|---|---|---|
| `create` | `lark-cli task sections create` | 创建自定义分组 |
| `delete` | `lark-cli task sections delete` | 删除自定义分组 |
| `get` | `lark-cli task sections get` | 获取自定义分组详情 |
| `list` | `lark-cli task sections list` | 获取自定义分组列表 |
| `patch` | `lark-cli task sections patch` | 更新自定义分组 |
| `tasks` | `lark-cli task sections tasks` | 获取自定义分组任务列表 |

### `task.custom_fields`

| 方法 | 调用 | 说明 |
|---|---|---|
| `create` | `lark-cli task custom_fields create` | 创建自定义字段 |
| `get` | `lark-cli task custom_fields get` | 获取自定义字段详情 |
| `patch` | `lark-cli task custom_fields patch` | 更新自定义字段 |
| `list` | `lark-cli task custom_fields list` | 获取自定义字段列表 |
| `add` | `lark-cli task custom_fields add` | 将自定义字段加入资源 |
| `remove` | `lark-cli task custom_fields remove` | 将自定义字段移出资源 |

### `task.custom_field_options`

| 方法 | 调用 | 说明 |
|---|---|---|
| `create` | `lark-cli task custom_field_options create` | 创建自定义字段选项 |
| `patch` | `lark-cli task custom_field_options patch` | 更新自定义字段选项 |

### `task.agent`

| 方法 | 调用 | 说明 |
|---|---|---|
| `update_agent_profile` | `lark-cli task agent update_agent_profile` | 更新任务代理的主页内容数据。 |
| `register_agent` | `lark-cli task agent register_agent` | 注册AI 智能体 |

### `task.agent_task_step_info`

| 方法 | 调用 | 说明 |
|---|---|---|
| `append_task_steps` | `lark-cli task agent_task_step_info append_task_steps` | 写入任务记录。 |

## wiki · 9 个方法

### `wiki.spaces`

| 方法 | 调用 | 说明 |
|---|---|---|
| `create` | `lark-cli wiki spaces create` | 创建知识空间 |
| `get` | `lark-cli wiki spaces get` | 获取知识空间信息 |
| `list` | `lark-cli wiki spaces list` | 获取知识空间列表 |

### `wiki.members`

| 方法 | 调用 | 说明 |
|---|---|---|
| `create` | `lark-cli wiki members create` | 添加知识空间成员 |
| `delete` | `lark-cli wiki members delete` | 删除知识空间成员 |
| `list` | `lark-cli wiki members list` | 获取知识空间成员列表 |

### `wiki.nodes`

| 方法 | 调用 | 说明 |
|---|---|---|
| `copy` | `lark-cli wiki nodes copy` | 创建知识空间节点副本 |
| `create` | `lark-cli wiki nodes create` | 创建知识空间节点 |
| `list` | `lark-cli wiki nodes list` | 获取知识空间子节点列表 |

## attendance · 1 个方法

### `attendance.user_tasks`

| 方法 | 调用 | 说明 |
|---|---|---|
| `query` | `lark-cli attendance user_tasks query` | 查询用户考勤打卡记录 |

## okr · 19 个方法

### `okr.alignments`

| 方法 | 调用 | 说明 |
|---|---|---|
| `delete` | `lark-cli okr alignments delete` | 删除对齐关系 |
| `get` | `lark-cli okr alignments get` | 获取对齐关系 |

### `okr.categories`

| 方法 | 调用 | 说明 |
|---|---|---|
| `list` | `lark-cli okr categories list` | 批量获取分类 |

### `okr.cycles`

| 方法 | 调用 | 说明 |
|---|---|---|
| `list` | `lark-cli okr cycles list` | 批量获取用户周期 |

### `okr.cycle.objectives`

| 方法 | 调用 | 说明 |
|---|---|---|
| `list` | `lark-cli okr cycle.objectives list` | 批量获取用户周期下的目标 |

### `okr.indicators`

| 方法 | 调用 | 说明 |
|---|---|---|
| `patch` | `lark-cli okr indicators patch` | 更新量化指标 |

### `okr.key_results`

| 方法 | 调用 | 说明 |
|---|---|---|
| `delete` | `lark-cli okr key_results delete` | 删除关键结果 |
| `get` | `lark-cli okr key_results get` | 获取关键结果 |
| `patch` | `lark-cli okr key_results patch` | 更新关键结果 |

### `okr.key_result.indicators`

| 方法 | 调用 | 说明 |
|---|---|---|
| `list` | `lark-cli okr key_result.indicators list` | 获取关键结果的量化指标 |

### `okr.objectives`

| 方法 | 调用 | 说明 |
|---|---|---|
| `delete` | `lark-cli okr objectives delete` | 删除目标 |
| `get` | `lark-cli okr objectives get` | 获取目标 |
| `key_results_position` | `lark-cli okr objectives key_results_position` | 更新全部关键结果的位置 |
| `key_results_weight` | `lark-cli okr objectives key_results_weight` | 更新全部关键结果的权重 |
| `patch` | `lark-cli okr objectives patch` | 更新目标 |

### `okr.objective.alignments`

| 方法 | 调用 | 说明 |
|---|---|---|
| `create` | `lark-cli okr objective.alignments create` | 创建对齐关系 |
| `list` | `lark-cli okr objective.alignments list` | 批量获取目标下的对齐关系 |

### `okr.objective.indicators`

| 方法 | 调用 | 说明 |
|---|---|---|
| `list` | `lark-cli okr objective.indicators list` | 获取目标的量化指标 |

### `okr.objective.key_results`

| 方法 | 调用 | 说明 |
|---|---|---|
| `list` | `lark-cli okr objective.key_results list` | 批量获取目标下的关键结果 |

---

*未列出的端点用第 3 层：`lark-cli api <METHOD> <PATH>`。*
