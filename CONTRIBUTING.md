# 贡献指南

这个仓库的目标只有一个：**让 AI Agent 动手前先查库，而不是每次现翻 `--help` 或凭印象编命令。**

所以最有价值的贡献是「多收一个 CLI」或「把已有的快照采得更准」，而不是改脚本。

---

## 一、先判断：这个 CLI 该不该收

收录范围是**厂商提供的 SaaS 能力型 CLI**。满足以下任一条就不收：

| 特征 | 收不收 | 理由 |
|---|---|---|
| 有账号体系、调用有副作用（会改远端数据） | ✅ 收 | 正是容易用错、需要先查的那类 |
| 厂商另外写了写给 Agent 的规则（SKILL.md / AGENTS.md） | ✅ 优先收 | 厂商的判断标准比通用经验权威 |
| 能力面大、命令多、层次深 | ✅ 收 | 现查 `help` 的成本高 |
| 系统自带工具（`git` / `curl` / `osascript`） | ❌ 不收 | 现查 `help` 足够便宜，收进来只稀释索引 |
| 包管理器（`brew` / `npm`） | ❌ 不收 | 同上 |
| 数据库客户端（`sqlite3`） | ❌ 不收 | 同上 |

---

## 二、再判断：能力从哪来（决定采集方式）

这是唯一需要动脑的地方。**先花五分钟把三种情况分清**，后面全是机械动作。

```
打开厂商仓库，问一个问题：
「这个 CLI 的能力面，`--help` 能完整列出来吗？」

├─ 能 → acquire.kind = "release-bin"（或 "local-bin"），profile = "help-tree"
│        例：wps365-cli —— Go 写的，19 个顶层命令、200 个节点全在 help 里
│
└─ 不能 → 看能力写在哪儿
          ├─ 仓库里有 skills/*/SKILL.md → acquire.kind = "skill-repo"，要写解析档
          │    例：feishu-cli（+快捷命令表格）、wecom-cli（bash 代码块）
          │
          └─ 靠服务端动态下发 / CDN spec，仓库里只有安装脚本
               → 取一份 release 二进制跑 help；并把「文档里未列出的部分」在文档里说明清楚
```

### `kind` 三种取值

| kind | 什么时候用 | 需要的字段 |
|---|---|---|
| `skill-repo` | 厂商仓库带 `skills/`，能力写在 SKILL.md 里 | `tarball` `stripPrefix` `extract` `srcDir` `versionFrom` `vendor` |
| `release-bin` | 能力在二进制里，且仓库有 GitHub Release 资产 | `binName` `binDir` `asset`（按平台映射） |
| `local-bin` | CLI 由厂商安装器装进 `PATH`，不通过 GitHub 分发 | `scan` `skill`（可选，随包的官方 SKILL.md） |

---

## 三、加一个 CLI：五步

### 第 1 步 · 往 `clis.json` 加一条记录

这是**唯一**必须改的文件。以企业微信 CLI 为例：

```json
{
  "name": "wecom-cli",
  "title": "企业微信 CLI",
  "command": "wecom-cli",
  "repo": "https://github.com/WecomTeam/wecom-cli",
  "license": "MIT",
  "install": "npm install -g @wecom/cli",
  "acquire": {
    "kind": "skill-repo",
    "profile": "wecom",
    "srcDir": ".cache/src/wecom-cli",
    "ref": "main",
    "tarball": "https://codeload.github.com/WecomTeam/wecom-cli/tar.gz/refs/heads/main",
    "stripPrefix": "wecom-cli-main",
    "versionFrom": "package.json",
    "vendor": ["AGENTS.md", "docs/cli-reference.md"],
    "extract": ["skills", "docs", "AGENTS.md", "README.md", "package.json"]
  }
}
```

几个容易踩的点：

- `stripPrefix` 是压缩包解出来的**顶层目录名**（GitHub 的 tar 包固定是 `<repo>-<branch>`）。写错会直接解压失败，脚本会提示。
- `extract` 只列分析用得上的路径。飞书 CLI 整仓几千个文件，全解会白白拉慢刷新。
- `repo` 写完整 URL 即可，代码内部会归一成 `owner/repo` 给 API 用。

### 第 2 步 · （仅 skill-repo）写一个解析档

`profiles/<profile>.js`，导出一个 `parse()`：

```js
module.exports = {
  id: 'wecom',
  /**
   * @param {{srcDir: string, pkgVersion: string, entry: object}} ctx
   * @returns {{model: object, extraFiles?: Record<string,string>}}
   */
  parse({ srcDir, pkgVersion, entry }) {
    // 1. 读源码，解析出「有哪些域、每个域有哪些命令」
    // 2. 填进统一的能力模型（见下）
    return { model, extraFiles: {} };
  },
};
```

**能力模型的字段**（除 `meta` 外都可省略，渲染器会自动跳过空段）：

| 字段 | 说明 |
|---|---|
| `meta` | `{ name, title, command, version, repo, license, scannedAt, source, stats, nodes }` |
| `tagline` | 一句话概述（markdown） |
| `howToUse` | 「这份文档怎么用」的步骤数组 |
| `overview` | 概览表行 `[k, v][]` |
| `install` | `{ code, notes[] }` |
| `model` | 调用模型 `{ title, intro, rows[][], code, note }` |
| `domains` | 业务域数组，每项 `{ id, label, prefix, description, commands:[{name,desc,ref}], note }` |
| `extras` | 辅助/工作流模块，**也支持 `commands`** |
| `routes` | 任务速查 `[用户说, 命令][]` |
| `conventions` | 全局约定 `{ title, body }[]`，`body` 是 markdown |
| `rules` | 厂商官方 Agent 规则原文 `{ title, from, body }` |

渲染由 `lib/capmodel.js` 统一负责，**不要在解析档里拼 markdown 结构** —— 只在 `conventions` / `rules` 里放厂商特有的散文。这样新 CLI 的文档形态天然和已有的对齐。

> ⚠️ 一条硬规则：**宁可没有说明，也不能给错说明。**
> 给 AI 的错误信息比缺失信息危险得多。解析档里取不到可靠的描述时，留空。

### 第 3 步 · 采集

```bash
bin/refresh <名字> --force
```

### 第 4 步 · 看产物是否可信

```bash
# 命令树、描述、flag 是否合理
sed -n '1,120p' registry/<名字>/CAPABILITY.md

# 有没有大面积空描述（超过一半空 = 解析档没取对位置）
node bin/cli-cap show <名字> <关键词>

# 找得到吗
node bin/cli-cap search <关键词>
```

### 第 5 步 · 路由与测试

往 `routes.json` 加几条**中文意图**（这是 Agent 的主要入口，也是 `cli-cap search` 的中文检索层）：

```bash
bin/cli-cap remember <名字> \
  --intent "看今天的日程" \
  --command "xxx calendar list" \
  --note "个人日程要带用户身份"
```

然后：

```bash
npm test        # 清单体检 + 渲染契约 + 检索
```

`tests/manifest.test.js` 会自动校验：必填字段、`kind`/`profile` 合法、`registry/` 里每个目录都有出处、`routes.json` 引用的 CLI 存在。**加完别忘了跑。**

---

## 四、红线

1. **只允许执行 help 类命令。** 采集器只跑 `--help` / `-h` / `help` / `--version`（取版本用）。
   任何会改远端状态、会消耗配额、会发消息的调用都是红线 —— 包括「就试一次」。
2. **不安装、不改用户环境。** `release-bin` 只把可执行文件解到 `.cache/` 并跑 help，
   不写入 `PATH`、不动配置文件。
3. **不录入凭证与业务数据。** 命令模板里的 ID 一律用占位符（`<chat_id>` / `<doc_id>`）。
4. **凭据与 token 永不入库**，`raw/` 里也只放 help 原文。
5. **快照要标清可信范围。** 采集方式、版本、commit 都写在文档里；
   文档没列出的能力要显式说明「以 `<cmd> --help` 为准」，不能假装完整。

---

## 五、已知限制

- **源码未固定 commit**：`skill-repo` 按分支拉取，靠 `meta.commit` 记录当时对应的提交。
  想要严格可复现，就把 `ref` 换成 tag 或具体 commit。
- **动态命令树没法离线穷举**：企业微信 CLI 的服务目录由服务端 discovery 下发，
  快照只能覆盖官方技能文档里写明的命令。文档里已如实标注。
- **`raw/` 会随版本增长**：目前入库以便溯源。仓库变大时在 `.gitignore` 里打开 `registry/*/raw/`。
- **单一平台快照**：`release-bin` 按当前机器平台取二进制，命令树一般跨平台一致，
  但若某平台独有命令，需要在那台机器上刷新。

---

## 六、提交

```bash
git add -A
git commit -m "feat(<名字>): 收录 <名字> 的完整能力面"
```

提交信息建议写清三件事：**收了什么、怎么采的、哪些是文档核对而非实测**。
后者尤其重要 —— 「文档显示有此能力」和「当前账号能调用」是两回事，不要把前者写成后者。
