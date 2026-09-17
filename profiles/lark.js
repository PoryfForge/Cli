'use strict';

/**
 * profiles/lark — 飞书 CLI（lark-cli）解析档。
 *
 * 能力来源：仓库 skills/*\/SKILL.md 里的「+快捷命令」表格 + 各域 API Resources 小节。
 * 文档规范：命令写成 `+action-name`，集中在表格的「命令」列，说明在相邻单元格。
 *
 * 解析函数沿用首版验证过的实现（对表格结构做了大量容错），这里只把渲染改成统一模型。
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------- 基础解析

function parseFrontmatter(txt) {
  const m = txt.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const lines = m[1].split('\n');
  const out = {};
  const unquote = (s) => s.replace(/\\"/g, '"').replace(/\\n/g, '\n');
  for (let i = 0; i < lines.length; i++) {
    const kv = lines[i].match(/^\s*([a-zA-Z_][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    const key = kv[1];
    let v = kv[2].trim();
    if (/^[>|][+-]?$/.test(v)) {
      const buf = [];
      while (i + 1 < lines.length && /^\s+\S/.test(lines[i + 1])) buf.push(lines[++i].trim());
      v = buf.join(' ');
    } else if (/^"/.test(v) && !/^".*"$/.test(v)) {
      const buf = [v];
      while (i + 1 < lines.length && !/"\s*$/.test(buf[buf.length - 1])) buf.push(lines[++i].trim());
      v = buf.join(' ').replace(/^"|"$/g, '');
    } else if (/^".*"$/.test(v)) {
      v = v.slice(1, -1);
    }
    out[key] = unquote(v);
  }
  return out;
}

const SHORTCUT_RE = /\+[a-z][a-z0-9]*(?:-[a-z0-9]+)*/g;
const SHORTCUT_HAS = /\+[a-z][a-z0-9]*(?:-[a-z0-9]+)*/; // 无 g 标志，供 .test() 使用

const stripMd = (s) =>
  String(s || '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[`*]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const cleanDesc = (s) =>
  stripMd(s)
    .replace(/\]\([^)]*\)/g, '')
    .replace(/^[\s/、，,|—–\-:：)）\]（(]+/, '')
    .replace(/[\s/|、，,—–\-]+$/, '')
    .trim();

const escapeRegExp = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * 抓一个 SKILL.md 里属于本域的 +快捷命令。
 * 各 skill 的章节命名不统一，所以不按小节标题找；名字求全（表格 + 带本域前缀的行），
 * 说明求准（只认结构干净的表格行）—— 宁可没有说明，也不能给错说明。
 */
function parseShortcuts(txt, domains) {
  const names = new Set();
  const descs = new Map();

  const isCmdCell = (c) => /^[`\[]{0,2}\+[a-z]/.test(c);
  const looksLikeUsage = (c) => {
    const d = cleanDesc(c);
    if (!d) return true;
    if (/references\//.test(d)) return true;
    if (/^lark-cli\s/.test(d)) return true;
    if (/^[+-]{1,2}[a-z][\w-]*$/.test(d)) return true;
    if (/^`?[a-z][a-z0-9_.]*(:[a-z0-9_.*]+)+`?$/.test(d)) return true; // 权限表里的 scope
    return false;
  };

  const domainRes = (domains || []).map(
    (d) => new RegExp(`(?:lark-cli\\s+)?\\b${escapeRegExp(d)}\\s+(\\+[a-z][\\w-]*)`, 'g')
  );

  const take = (name, desc) => {
    if (!name || name.length < 4) return;
    names.add(name);
    const d = cleanDesc(desc);
    if (d.length >= 4 && !looksLikeUsage(desc) && d.length > (descs.get(name) || '').length) {
      descs.set(name, d);
    }
  };

  for (const line of txt.split('\n')) {
    const t = line.trim();

    // ---- 1. 表格行
    if (t.startsWith('|') && t.endsWith('|')) {
      const cells = t
        .slice(1, -1)
        .split('|')
        .map((c) => c.trim())
        .filter((c) => c && !/^-+$/.test(c));
      if (cells.length >= 2) {
        const cmdIdx = cells.map((c, i) => (SHORTCUT_HAS.test(c) ? i : -1)).filter((i) => i >= 0);
        if (cmdIdx.length) {
          let descCell = '';
          if (isCmdCell(cells[0])) {
            // 说明里可能含未转义的 `|`，会把单元格切碎，合并还原
            const prose = cells
              .filter((c) => !isCmdCell(c) && !SHORTCUT_HAS.test(c))
              .filter((c) => !/^`?[a-z][a-z0-9_.]*(:[a-z0-9_.*]+)+`?$/.test(cleanDesc(c)));
            descCell = prose.join('|');
          } else if (!cmdIdx.includes(0)) {
            descCell = cells[0];
          }
          for (const i of cmdIdx) {
            SHORTCUT_RE.lastIndex = 0;
            for (const n of cells[i].match(SHORTCUT_RE) || []) take(n, descCell);
          }
        }
      }
      continue;
    }

    // ---- 2. 带本域前缀的引用
    for (const re of domainRes) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(t))) take(m[1], '');
    }

    // ---- 3. 列表行：`- **场景 — [+cmd](ref)**：说明`
    const hits = t.match(SHORTCUT_RE);
    if (hits && hits.length === 1 && !/^\s*--/.test(t)) {
      const n = hits[0];
      const idx = t.indexOf(n);
      const before = cleanDesc(t.slice(0, idx)).replace(/[\[(\*\s]+$/, '');
      const after = cleanDesc(t.slice(idx + n.length).replace(/^\(?[^)]*\)?\]*\**/, '')).replace(
        /^[：:—–\s]+/,
        ''
      );
      if (before.length >= 4 && before.length <= 24) take(n, before);
      else if (/^[：:]/.test(t.slice(idx + n.length).trim().replace(/^\][^：:]*/, ''))) take(n, after);
    }
  }

  return [...names]
    .map((name) => ({ name, desc: descs.get(name) || '', ref: '' }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** 抓 "## API Resources" 小节：### resource 下的 - `method` — desc */
function parseApiResources(txt) {
  const out = [];
  const lines = txt.split('\n');
  let inSection = false;
  let resource = '';
  for (const line of lines) {
    if (/^##\s/.test(line)) {
      inSection = /api\s+resources/i.test(line);
      resource = '';
      continue;
    }
    if (!inSection) continue;
    const h = line.match(/^###\s+(.+?)\s*$/);
    if (h) {
      resource = h[1].trim();
      continue;
    }
    const m = line.match(/^\s*-\s*`([^`]+)`\s*[—-]\s*(.+?)\s*$/);
    if (m && resource) out.push({ resource, method: m[1], desc: m[2] });
  }
  return out;
}

const clean = (s) => String(s || '').replace(/\s+/g, ' ').trim();
const tidyDesc = (s) =>
  clean(s)
    .replace(/\[Must-read\]\([^)]*\)/g, '[必读]')
    .replace(/\s*\|\s*/g, ' / ');

// ---------------------------------------------------------------- 域顺序

const DOMAIN_ORDER = [
  'lark-calendar', 'lark-im', 'lark-doc', 'lark-drive', 'lark-markdown', 'lark-sheets',
  'lark-slides', 'lark-base', 'lark-task', 'lark-mail', 'lark-contact', 'lark-wiki',
  'lark-meeting', 'lark-vc', 'lark-minutes', 'lark-note', 'lark-whiteboard', 'lark-attendance',
  'lark-approval', 'lark-okr', 'lark-apps', 'lark-event', 'lark-vc-agent', 'lark-application',
];

const sortSkills = (skills) => {
  const idx = (n) => {
    const i = DOMAIN_ORDER.indexOf(n);
    return i === -1 ? 999 : i;
  };
  return [...skills].sort((a, b) => idx(a.name) - idx(b.name) || a.name.localeCompare(b.name));
};

const isWorkflow = (s) => /workflow|maker|explorer|shared/.test(s.name);

// ---------------------------------------------------------------- 任务路由

const ROUTES = [
  ['看看我今天的日程', '`lark-cli calendar +agenda --as user`'],
  ['约个会 / 建日程 / 邀请人', '`lark-cli calendar +create ...`'],
  ['查某人这周有没有空', '`lark-cli calendar +freebusy ...`'],
  ['找一间会议室', '`lark-cli calendar +room-find ...`'],
  ['给某人/某群发条消息', '`lark-cli im +messages-send --chat-id <oc_xxx> --text "..." --as bot`'],
  ['回复某条消息', '`lark-cli im +messages-reply ...`'],
  ['搜聊天记录', '`lark-cli im +messages-search --query "关键词"`'],
  ['建个群 / 拉人', '`lark-cli im +chat-create ...`'],
  ['下载聊天里的文件/图片', '`lark-cli im +messages-resources-download ...`'],
  ['发飞书卡片', '`lark-cli im +messages-send --msg-type interactive`（先读卡片创建流程）'],
  ['写一篇飞书文档', '`lark-cli docs +create --doc-format markdown --content ...`'],
  ['改文档 / patch 文档', '`lark-cli docs +patch ...`'],
  ['读文档内容', '`lark-cli docs +read ...`'],
  ['搜文档', '`lark-cli drive +search ...`'],
  ['上传/下载文件到云空间', '`lark-cli drive +upload` / `+download`'],
  ['建多维表格 / 加记录', '`lark-cli base +record-create ...`'],
  ['查多维表格数据', '`lark-cli base +record-search ...`'],
  ['读写电子表格', '`lark-cli sheets +read` / `+write` / `+append`'],
  ['建演示文稿 / 加页', '`lark-cli slides +create` / `+page-add`'],
  ['建任务 / 完成任务', '`lark-cli task +create` / `+complete`'],
  ['查邮件 / 发邮件', '`lark-cli mail +list` / `+send`'],
  ['查某人邮箱或手机号', '`lark-cli contact +user-search --query "张三"`'],
  ['查会议 / 会议纪要', '`lark-cli meeting +list` / `lark-cli minutes +...`'],
  ['查考勤打卡', '`lark-cli attendance +...`'],
  ['处理审批', '`lark-cli approval +task-list` / `+approve`'],
  ['查/更新 OKR', '`lark-cli okr +...`'],
  ['知识库建文档', '`lark-cli wiki +...`'],
  ['画流程图/架构图', '`lark-cli whiteboard +...`'],
  ['订阅飞书事件（实时）', '`lark-cli event consume ...`'],
  ['API 没被快捷命令覆盖', '`lark-cli <域> <资源> <方法>`，先跑 `lark-cli schema <域>.<资源>.<方法>`'],
  ['完全自定义端点', '`lark-cli api GET /open-apis/...`'],
];

// ---------------------------------------------------------------- 解析

function parse({ srcDir, pkgVersion }) {
  const skillsDir = path.join(srcDir, 'skills');
  const skillNames = fs
    .readdirSync(skillsDir)
    .filter((d) => fs.statSync(path.join(skillsDir, d)).isDirectory())
    .sort();

  const skills = skillNames.map((dir) => {
    const file = path.join(skillsDir, dir, 'SKILL.md');
    const txt = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
    const fm = parseFrontmatter(txt);
    const cliHelp = (fm.cliHelp || '').trim();
    // lark-doc 实际是 `lark-cli docs`、lark-meeting 横跨 vc/minutes/note，
    // 所以优先从 cliHelp 里取全部前缀
    const prefixes = [...cliHelp.matchAll(/lark-cli\s+([a-z][\w-]*)/g)].map((m) => m[1]);
    if (!prefixes.length) prefixes.push(dir.replace(/^lark-/, ''));
    const refsDir = path.join(skillsDir, dir, 'references');
    let refs = 0;
    if (fs.existsSync(refsDir)) {
      const walk = (d) => {
        for (const e of fs.readdirSync(d, { withFileTypes: true })) {
          if (e.isDirectory()) walk(path.join(d, e.name));
          else if (e.name.endsWith('.md')) refs++;
        }
      };
      walk(refsDir);
    }
    return {
      dir,
      name: fm.name || dir,
      version: fm.version || '',
      description: tidyDesc(fm.description || ''),
      cliHelp,
      prefixes,
      domPrefix: prefixes[0],
      shortcuts: parseShortcuts(txt, prefixes),
      apis: parseApiResources(txt),
      refs,
      hasSkillMd: !!txt,
    };
  });

  const domains = sortSkills(skills.filter((s) => !isWorkflow(s)));
  const extras = skills.filter(isWorkflow);
  const totalShortcuts = skills.reduce((a, s) => a + s.shortcuts.length, 0);
  const totalApis = skills.reduce((a, s) => a + s.apis.length, 0);
  const totalRefs = skills.reduce((a, s) => a + s.refs, 0);

  const meta = {
    name: 'feishu-cli',
    title: '飞书 CLI',
    command: 'lark-cli',
    version: pkgVersion || '',
    repo: 'https://github.com/larksuite/cli',
    license: 'MIT',
    install: 'npx @larksuite/cli@latest install',
    scannedAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
    source: 'skill-repo',
    nodes: totalShortcuts,
    stats: {
      业务域: domains.length,
      快捷命令: totalShortcuts,
      API方法: totalApis,
      参考文档: totalRefs,
    },
  };

  const model = {
    meta,
    tagline:
      `飞书/Lark 官方开源的命令行工具，把开放平台能力封装成终端命令，原生面向 AI Agent。` +
      `覆盖 **${domains.length} 个业务域**、**${totalShortcuts} 个快捷命令**、**${totalApis} 个 API 方法**，` +
      `底层可达 2500+ 开放平台端点。`,
    howToUse: [
      '在「能力域总表」里按场景找到对应域（例如"发消息" → `im`）。',
      '在「命令全量清单」里找到该域的 `+xxx` 命令及其说明。',
      '需要精确参数时跑 `lark-cli <域> <命令> --help`，或查 `api-resources.md`。',
      '写操作一律先 `--dry-run` 预览。',
    ],
    overview: [
      ['可执行文件', '`lark-cli`'],
      ['版本', meta.version ? `\`${meta.version}\`` : '—'],
      ['仓库', meta.repo],
      ['业务域', String(domains.length)],
      ['快捷命令（Shortcuts）', String(totalShortcuts)],
      ['API 方法', String(totalApis)],
      ['深度参考文档', `${totalRefs} 篇`],
      ['快照时间', meta.scannedAt],
    ],
    install: {
      code: [
        '# 1. 安装 CLI',
        meta.install,
        '',
        '# 2. 安装官方 Agent Skills（让 AI 能自动读懂各域用法）',
        'npx skills add larksuite/cli -y -g',
        '',
        '# 3. 配置应用凭证（输出授权链接给用户在浏览器完成）',
        'lark-cli config init --new',
        '',
        '# 4. 登录授权（--recommend = 自动勾选常用权限）',
        'lark-cli auth login --recommend',
        '',
        '# 5. 验证',
        'lark-cli auth status        # 显示 valid 即成功',
      ].join('\n'),
      notes: ['首次使用需在飞书开放平台创建自建应用，并把 `app_id` / `app_secret` 交给 CLI。'],
    },
    model: {
      title: '三层命令调用模型',
      intro: '同一件事有三种粒度，优先用最上面那层。',
      rows: [
        ['层级', '形态', '何时用'],
        ['1. 快捷命令', '`lark-cli <域> +<动作>`', '**首选**。已封装默认值、表格输出、dry-run'],
        ['2. API 命令', '`lark-cli <域> <资源> <方法>`', '快捷命令没覆盖的官方端点，100+ 精选'],
        ['3. 通用调用', '`lark-cli api <METHOD> <PATH>`', '兜底，覆盖 2500+ 端点'],
      ],
      code: [
        'lark-cli calendar +agenda                                  # 层级 1',
        'lark-cli calendar calendars list                           # 层级 2',
        'lark-cli api GET /open-apis/calendar/v4/calendars          # 层级 3',
        'lark-cli schema calendar.events.instance_view              # 查参数结构',
      ].join('\n'),
      note:
        '`lark-cli schema <域>.<资源>.<方法>` 会打印该方法的参数、请求体、响应结构、支持身份和所需 scope。**调 API 层前先跑 schema，别猜字段。**',
    },
    domainsIntro: '「当用户需要…」这一列就是路由依据：拿不准用哪个域时，在这里按场景匹配。',
    domains: domains.map((s) => ({
      id: s.name.replace(/^lark-/, ''),
      label: s.name.replace(/^lark-/, ''),
      prefix: s.prefixes.join('` / `'),
      description: s.description || '—',
      note: s.cliHelp ? `> 快速查全部子命令：\`${s.cliHelp}\`` : '',
      commands: s.shortcuts.map((c) => ({
        name: `lark-cli ${s.domPrefix} ${c.name}`,
        desc: tidyDesc(c.desc),
        ref: '',
      })),
      _apis: s.apis,
      _refs: s.refs,
    })),
    // 辅助/工作流模块也带命令，不能只留描述（否则它们的快捷命令会从清单里消失）
    extras: extras.map((s) => ({
      id: s.name.replace(/^lark-/, ''),
      label: s.name.replace(/^lark-/, ''),
      description: s.description || '—',
      commands: s.shortcuts.map((c) => ({
        name: `lark-cli ${s.domPrefix} ${c.name}`,
        desc: tidyDesc(c.desc),
        ref: '',
      })),
    })),
    routes: ROUTES,
    conventions: [
      {
        title: '身份：决定你代表谁操作',
        body: [
          '| 写法 | 身份 | Token | 能碰到什么 |',
          '|---|---|---|---|',
          '| `--as user` | 用户本人 | `user_access_token` | 个人日历、私聊、个人文档；受该用户自身权限约束 |',
          '| `--as bot` | 应用自己 | `tenant_access_token` | 应用级资源；查用户私有资源会**返回空成功而非报错** |',
          '',
          '- 动手前先确认身份。同一 API 换身份结果可能不同（群主/管理员、群成员、租户边界都按当前调用者判定）。',
          '- 默认身份由 `lark-cli config default-as` 配置。',
        ].join('\n'),
      },
      {
        title: '输出格式',
        body: [
          '| 值 | 用途 |',
          '|---|---|',
          '| `--format json` | **默认**，完整 JSON 响应，Agent 友好 |',
          '| `--format table` | 易读表格，给人看 |',
          '| `--format pretty` | 人性化美化输出 |',
          '| `--format ndjson` | 换行分隔 JSON，适合管道处理 |',
          '| `--format csv` | 逗号分隔值，适合导表 |',
        ].join('\n'),
      },
      {
        title: '判断成功：用 `ok == true`，不要用 `code == 0`',
        body: [
          '成功信封（stdout，退出码 0）：',
          '',
          '```json',
          '{ "ok": true, "identity": "user", "data": { "...": "..." }, "meta": { "count": 1 } }',
          '```',
          '',
          '错误信封（stderr，退出码非 0）：',
          '',
          '```json',
          '{ "ok": false, "identity": "user", "error": { "type": "api", "subtype": "...", "code": 99991679, "message": "...", "hint": "..." } }',
          '```',
          '',
          '> 成功信封**没有**顶层 `code` / `msg`。按老 OpenAPI 格式 `{"code":0,"msg":"ok"}` 判断会把所有成功调用误判为失败。`code` 只出现在错误信封的 `error` 内。',
        ].join('\n'),
      },
      {
        title: '分页',
        body: [
          '```bash',
          '--page-all            # 自动翻页取全量',
          '--page-limit 5        # 最多 5 页',
          '--page-delay 500      # 每页间隔 500ms',
          '```',
        ].join('\n'),
      },
      {
        title: '安全与高风险操作',
        body: [
          '| 规则 | 说明 |',
          '|---|---|',
          '| 写操作先预览 | 支持 `--dry-run` 的命令一律先预览请求 |',
          '| 写/删前问用户 | 必须先确认用户意图再执行 |',
          '| **退出码 10 = 高风险门禁** | 不是错误。停下 → 向用户展示 `action`/`risk`/关键参数 → 拿到**显式同意**后，把 `hint` 指的确认 flag **追加到原始 argv 末尾**重试；**绝不静默绕过** |',
          '| 禁止回显密钥 | appSecret、accessToken 等不得明文打到终端 |',
          '| 路径只能用相对路径 | `--file` / `--output` / `--output-dir` / `@file` 只接受 cwd 下的相对路径，绝对路径会报 `unsafe file path`；大 JSON 优先走 stdin |',
          '| 授权 URL 必须配二维码 | 输出含 `verification_url` / `console_url` 时用 `lark-cli auth qrcode` 生成 PNG 一并展示，URL 原样转发不重写 |',
        ].join('\n'),
      },
      {
        title: '认证命令',
        body: [
          '| 命令 | 说明 |',
          '|---|---|',
          '| `auth login` | OAuth 登录，支持交互式 TUI 或参数指定 scope |',
          '| `auth login --recommend` | 自动选择常用权限（最省事） |',
          '| `auth login --domain calendar,task` | 按业务域授权 |',
          '| `auth login --scope "calendar:calendar:read"` | 精确 scope |',
          '| `auth login --domain calendar --no-wait` | Agent 模式：立即返回验证 URL 不阻塞 |',
          '| `auth login --device-code <CODE>` | 恢复轮询 |',
          '| `auth status` | 查看登录状态与已授权 scope |',
          '| `auth check` | 校验指定 scope（exit 0 有权限，1 缺失） |',
          '| `auth scopes` | 列出应用可用 scope |',
          '| `auth list` | 列出所有已认证用户 |',
          '| `auth logout` | 登出并删除凭证 |',
        ].join('\n'),
      },
      {
        title: '配置与其他全局能力',
        body: [
          '| 命令 | 说明 |',
          '|---|---|',
          '| `config init` / `config init --new` | 配置应用凭证 |',
          '| `config show` | 查看当前配置 |',
          '| `config default-as` | 设置默认身份 |',
          '| `config risk-control on/off/default` | 风控信号开关 |',
          '| `lark-cli schema [<域>.<资源>.<方法>]` | 查看 API 参数/请求体/响应/身份/scope |',
          '| `lark-cli doctor` | 环境自检 |',
          '| `lark-cli whoami` | 当前身份 |',
          '| `lark-cli profile list/use/add` | 多应用配置切换 |',
        ].join('\n'),
      },
    ],
    rules: {
      title: '各域 Skill 说明（完整触发条件）',
      from: `官方 ${meta.repo} 的 skills/*/SKILL.md`,
      body: sortSkills(skills)
        .map((s) => {
          const bits = [];
          if (s.shortcuts.length) bits.push(`${s.shortcuts.length} 个快捷命令`);
          if (s.apis.length) bits.push(`${s.apis.length} 个 API 方法`);
          if (s.refs) bits.push(`${s.refs} 篇深度参考`);
          return [
            `### ${s.name}${s.version ? ` (v${s.version})` : ''}`,
            '',
            s.description || '',
            '',
            bits.length ? `*规模：${bits.join(' · ')}*` : '',
            '',
          ]
            .filter((x) => x !== '')
            .join('\n');
        })
        .join('\n\n'),
    },
    footer:
      `*快照由 \`bin/skill-digest feishu-cli\` 从 ${meta.repo} 源码聚合生成，` +
      `版本 \`${meta.version}\`，时间 ${meta.scannedAt}。*\n` +
      `*CLI 升级后刷新：\`bin/refresh feishu-cli\`*`,
  };

  // ---------------- 附加文件：API 方法全量清单
  const apiDomains = sortSkills(skills.filter((s) => s.apis.length));
  const apiLines = [];
  apiLines.push('---');
  apiLines.push('name: feishu-cli-api');
  apiLines.push(`version: ${meta.version}`);
  apiLines.push(`scanned_at: ${meta.scannedAt}`);
  apiLines.push(`api_methods: ${totalApis}`);
  apiLines.push('---');
  apiLines.push('');
  apiLines.push('# 飞书 CLI · API 方法全量清单');
  apiLines.push('');
  apiLines.push(
    `这是第 2 层「API 命令」的完整清单，共 **${totalApis} 个方法**；` +
      `第 3 层 \`lark-cli api <METHOD> <PATH>\` 可达 2500+ 端点。`
  );
  apiLines.push('');
  apiLines.push('```bash');
  apiLines.push('lark-cli <域> <资源> <方法> [--params \'{...}\'] [--data \'{...}\']   # 调用');
  apiLines.push('lark-cli schema <域>.<资源>.<方法>                                 # 先看参数结构，别猜字段');
  apiLines.push('```');
  apiLines.push('');
  apiLines.push(
    '> Identity 列写了该方法支持 `user` / `bot`。同一方法换身份可能一个成功一个失败 —— 群主/管理员身份、群成员资格、租户边界、应用可用范围都按当前调用者判定。'
  );
  apiLines.push('');
  for (const s of apiDomains) {
    const dom = s.name.replace(/^lark-/, '');
    apiLines.push(`## ${dom} · ${s.apis.length} 个方法`);
    apiLines.push('');
    const byRes = {};
    for (const a of s.apis) (byRes[a.resource] = byRes[a.resource] || []).push(a);
    for (const [res, items] of Object.entries(byRes)) {
      apiLines.push(`### \`${dom}.${res}\``);
      apiLines.push('');
      apiLines.push('| 方法 | 调用 | 说明 |');
      apiLines.push('|---|---|---|');
      for (const it of items) {
        apiLines.push(
          `| \`${it.method}\` | \`lark-cli ${dom} ${res} ${it.method}\` | ${tidyDesc(it.desc).replace(/\|/g, '\\|')} |`
        );
      }
      apiLines.push('');
    }
  }
  apiLines.push('---');
  apiLines.push('');
  apiLines.push('*未列出的端点用第 3 层：`lark-cli api <METHOD> <PATH>`。*');
  apiLines.push('');

  return {
    model,
    extraFiles: { 'api-resources.md': apiLines.join('\n') },
  };
}

module.exports = { id: 'lark', parse };
