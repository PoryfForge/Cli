'use strict';

/**
 * profiles/wecom — 企业微信 CLI（wecom-cli）解析档。
 *
 * 能力来源：仓库 skills/wecomcli-*\/{SKILL.md,references/*.md} + docs/cli-reference.md。
 * 文档规范：命令写成完整的 `wecom-cli <service> [resource...] <method>`，
 *          散落在 bash 代码块与行内代码里；每个主题篇的 H1 往往就是「命令 + 说明」。
 *
 * 注意：这个 CLI 的命令树是**服务端 discovery 动态下发**的 —— 查看帮助与调用工具
 * 都需要凭证与网络（见 docs/cli-reference.md）。所以本文档记录的是「官方技能文档里
 * 写明了的命令」，不是穷举；拿到凭证后 `wecom-cli <service> --help` 才是权威。
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------- 基础解析

function parseFrontmatter(txt) {
  const m = txt.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const out = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^\s*([a-zA-Z_][\w-]*):\s*(.*)$/);
    if (kv) out[kv[1]] = kv[2].trim().replace(/^"|"$/g, '');
  }
  return out;
}

const squeeze = (s) => String(s || '').replace(/\s+/g, ' ').trim();

/**
 * 命令形态：`wecom-cli <service> [resource...] <method>`，也支持 `+helper`。
 * 只吃「小写词/短横线」组成的位置参数，flag 与 JSON 参数自然被排除。
 */
const CMD_RE = /wecom-cli\s+((?:[a-z][\w-]*)(?:\s+[a-z][\w-]*)*(?:\s+\+[a-z][\w-]*)?)/g;

/** 这些首词不是 service，是文档里出现的其他工具或动词，要排掉 */
const NOT_SERVICE = new Set([
  'search', 'exec', 'recall', 'run', 'tool', 'tools', 'bash', 'sh', 'json',
  'help', 'version', 'npm', 'npx', 'node',
]);

/** docs/cli-reference.md 里列出的服务品类，用来标注「未在文档列出」 */
const DOCUMENTED_SERVICES = new Set([
  'message', 'mail', 'doc', 'sheet', 'smartsheet', 'smartpage', 'calendar',
  'meeting', 'todo', 'disk', 'contact', 'media', 'identity',
  'auth', 'schema', 'cache',
]);

/** 这些标题是结构性的，不能当命令说明 */
const GENERIC_HEADING = /^(命令|参数|返回|返回字段|请求参数|目录|规范|规则|约束|工作流|正常路径|异常路径|示例|用法|说明|参考|注意事项|边界|限制|禁令|命令调用格式|命令拼接安全规范|文档与资源标识|意图前置判断|从用户消息推断字段|前置|概览|概述|背景|附录|变更|修订)$/;

/**
 * 结构性标题的识别词。`### 场景导航`「两条禁令」这类标题描述的是**文档的组织方式**，
 * 拿它当命令说明会得到 "场景导航" 这种毫无信息量、甚至误导的值。
 */
const STRUCTURAL_HEADING = /导航|速查|索引|清单|枚举|详述|大全|约束|规范|依赖|提示|必读|优先级|决策|流程|策略|分类|判定|判定表|模板|格式|示例|字段|参数|返回|概述|背景|声明|说明|注意|边界|限制|禁令|规则|误区|常见问题|错误|前置|适用|能力|权限|术语|变量|技能|手册|指南/;

/** 区段序号：`五、图表操作`「二、导入文档为智能表格」这类标题只是分节，不是命令说明 */
const NUMBERED_HEADING = /^[一二三四五六七八九十百\d]+\s*[、.．,，)）]/;

function isUsableHeading(t) {
  if (!t || t.length < 3) return false;
  if (GENERIC_HEADING.test(t) || STRUCTURAL_HEADING.test(t)) return false;
  if (NUMBERED_HEADING.test(t)) return false;
  return true;
}

/** 从标题里提炼说明：`calendar schedules list / get — 查看日程安排` → `查看日程安排` */
function headingToDesc(raw) {
  let d = squeeze(String(raw || '').replace(/^#+\s*/, ''));
  if (!d) return '';
  d = d.replace(/^(操作参考|参考|说明|指南)\s*[：:]\s*/, '');
  const dash = d.match(/^(.*?)\s*[—–]\s*(.+)$/);
  if (dash) {
    const [, before, after] = dash;
    // 破折号前是纯命令片段（全小写 ASCII）→ 说明在后面；否则说明在前面
    const looksLikeCmd = /^[a-z0-9\s/.,+_-]+$/.test(before) && /[a-z]/.test(before);
    d = looksLikeCmd ? after : before;
  }
  d = d.replace(/`[^`]*`/g, ' ').replace(/\bwecom-cli\b/g, ' ');
  // 标题尾巴里挂着的命令片段：`获取关联的数据表信息 (smartpage databases get)`
  d = d.replace(/\s*[（(]\s*[a-z][a-z0-9\s`'/.+_-]*\s*[)）]\s*$/, '');
  // 区段序号：`五、图表操作` → `图表操作`；`二、读取智能表格数据` → `读取智能表格数据`
  d = d.replace(/^[一二三四五六七八九十百\d]+\s*[、.．,，)）]\s*/, '');
  return squeeze(d).replace(/[：:、，,;；]+$/, '');
}

/**
 * 标题里是否**显式写着**这条命令 —— 形如 `## 获取关联的数据表信息 (smartpage databases get)`。
 * 这种标题就是「动作 + 命令」的直译，是最权威的说明来源，比表格列还可靠。
 */
function headingStatesCmd(rawHeading, cmd) {
  if (!rawHeading) return false;
  const h = squeeze(String(rawHeading).replace(/`/g, ''));
  return h.includes(cmd);
}

/** 抽 `## 适用范围` 下的「适用 / 不适用」，这是很可靠的路由依据 */
function parseScope(txt) {
  const lines = txt.split('\n');
  const grab = (sectionName) => {
    const out = [];
    let on = false;
    for (const line of lines) {
      const h = line.match(/^#{2,4}\s+(.+?)\s*$/);
      if (h) {
        const t = squeeze(h[1]);
        if (new RegExp(`^${sectionName}$`).test(t)) {
          on = true;
          continue;
        }
        if (on) break;
        continue;
      }
      if (!on) continue;
      const b = line.match(/^\s*[-*]\s+(.+)$/);
      if (b) out.push(squeeze(b[1]));
      else if (out.length && !line.trim()) continue;
    }
    return out;
  };
  return { yes: grab('适用').slice(0, 5), no: grab('不适用').slice(0, 4) };
}

// ---------------------------------------------------------------- 命令抽取

/** 行首的 `**动作**`：`- **拉取会议列表**：调用 ...` —— 这是很干净的说明来源 */
const BOLD_DESC_RE = /^\s*(?:[-*+]|\d+\.)?\s*\*\*([^*]{4,24})\*\*/;

/** 这些加粗词是结构性标签或空泛元动作，不是动作说明 */
const GENERIC_BOLD = /^(适用|不适用|注意|说明|示例|命令|参数|返回|前提|前置|重要|警告|提示|禁止|边界|限制|规则|约束|注意点|常见问题|错误处理|翻页策略|异常路径|正常路径|意图分类|示例代码|补充说明)$|^(调用|执行|使用|运行)[^：]{0,6}(接口|命令|工具|步骤)$/;

/** `references/xxx.md` 这类指针不是说明 */
const REF_POINTER = /references\/|见\s*`?[a-z-]+\.md|docs\/cli-reference/;

/**
 * 一个单元格算不算「命令单元格」：命令得出现在开头，而不是被夹在散文里。
 * 后者出现在**字段定义表**（`| 字段 | 类型 | 说明 |`）中 —— 那种表的末列是
 * 字段说明，取来会得到 "string" 这种垃圾。
 */
function isCommandCell(cell) {
  return /^`?wecom-cli\s/.test(String(cell).replace(/^["'（(]+/, ''));
}

/**
 * 从一个技能目录里抽出全部命令。
 *
 * 说明取值分四档，唯一硬规则是**宁可没有说明，也不能给错说明**：
 *   3 = 模板表格行的末列（`| 场景 | 命令 | 说明 |`）
 *   2 = 行首 `**动作**：` 加粗词
 *   1 = 该篇只提到这一条命令时，用最近的标题 / H1 兜底
 *   0 = 留空
 * 早期版本直接用「最近的标题」，结果把「场景导航」「两条禁令」这类结构性标题
 * 当成了命令说明，价值为负 —— 结构性标题现在一律不采信。
 */
function parseSkillCommands(dir) {
  const files = [];
  const walk = (d, depth) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p, depth + 1);
      else if (e.name.endsWith('.md')) files.push(p);
    }
  };
  walk(dir, 0);

  const found = new Map(); // cmd -> { desc, ref, pri }
  const order = files
    .filter((f) => path.basename(f) === 'SKILL.md')
    .concat(files.filter((f) => path.basename(f) !== 'SKILL.md'));

  for (const file of order) {
    const txt = fs.readFileSync(file, 'utf8');
    const rel = path.relative(dir, file);
    const h1 = (txt.match(/^#\s+(.+?)\s*$/m) || [])[1] || '';
    const occurrences = [];
    let heading = '';
    let rawHeading = '';
    let inFence = false;

    for (const line of txt.split('\n')) {
      if (/^\s*```/.test(line)) {
        inFence = !inFence;
        continue;
      }
      const h = line.match(/^(#{1,4})\s+(.+?)\s*$/);
      if (h) {
        const t = squeeze(h[2]);
        if (h[1].length >= 2) {
          rawHeading = t;
          heading = isUsableHeading(headingToDesc(t)) ? t : '';
        }
        continue;
      }

      CMD_RE.lastIndex = 0;
      const hits = [];
      let hit;
      while ((hit = CMD_RE.exec(line))) {
        const cmd = squeeze(hit[1]);
        const tokens = cmd.split(/\s+/);
        if (tokens.length < 2) continue; // 裸服务名不是可执行命令
        if (NOT_SERVICE.has(tokens[0])) continue;
        hits.push(cmd);
      }
      if (!hits.length) continue;

      // 说明候选：标题显式带命令 > 表格末列 > 行首加粗词 > 最近可用标题
      let desc = '';
      let pri = 0;
      const authoritative = hits.some((c) => headingStatesCmd(rawHeading, c));

      if (authoritative) {
        const hd = headingToDesc(rawHeading);
        // 即便标题里写了命令，标题本身是结构性的话（`## 参数说明 (xxx cmd)`）也不要
        if (hd && isUsableHeading(hd) && !REF_POINTER.test(hd)) {
          desc = hd;
          pri = 4;
        }
      }

      if (!pri && /^\s*\|/.test(line)) {
        const cells = squeeze(line)
          .replace(/^\||\|$/g, '')
          .split('|')
          .map((c) => squeeze(c))
          .filter((c) => c && !/^-{2,}$/.test(c));
        const cmdCells = cells.filter(isCommandCell);
        // 没有任何「命令打头」的单元格 → 这不是场景→命令表（多半是字段定义表），整行不采信
        const prose = cmdCells.length ? cells.filter((c) => !isCommandCell(c)) : [];
        // 末列才是说明
        const cand = prose.filter((c) => !REF_POINTER.test(c)).pop() || '';
        if (cand) {
          desc = cand.replace(/`[^`]*`/g, ' ').replace(/\bwecom-cli\b/g, ' ');
          pri = 3;
        }
      } else if (!pri && !inFence) {
        const b = line.match(BOLD_DESC_RE);
        // 加粗词必须紧挨着命令（≤ 40 字），否则多半是句里另一个话题的加粗 ——
        // 例如「- **正文图片走通用下载…**：…**禁止**把 URL 塞给 `media download`」
        if (b && !GENERIC_BOLD.test(squeeze(b[1]))) {
          const gap = line.slice(b.index).indexOf('wecom-cli');
          if (gap >= 0 && gap <= b[0].length + 40) {
            desc = b[1];
            pri = 2;
          }
        }
      }
      // 兜底：最近一个「可用标题」。`### 列出文件` 直接压着它的命令，是很好的说明；
      // 结构性标题已在 isUsableHeading 里挡掉了。
      if (!pri) {
        const hd = headingToDesc(heading);
        if (hd && !REF_POINTER.test(hd)) {
          desc = hd;
          pri = 1;
        }
      }
      desc = squeeze(desc);

      for (const cmd of hits) {
        // pri=4 是「标题里写明了这条命令」，描述只属于对得上的那条命令
        const own = headingStatesCmd(rawHeading, cmd);
        occurrences.push(pri === 4 ? { cmd, desc: own ? desc : '', pri: own ? 4 : 0, heading } : { cmd, desc, pri, heading });
      }
    }

    // ---- 收尾一：标题兜底只在「这一篇确实只讲一条命令」时延伸到 H1
    const distinct = new Set(occurrences.map((o) => o.cmd));

    // ---- 收尾二：同一命令在同一篇里挂在**多个不同标题**下 → 那些标题是变体名
    //      （`### Markdown 消息` / `### 图片消息` / `### 语音消息` 都压着同一个 send），
    //      描述的是变体而不是命令本身，一律不采信。pri=4 是标题里显式写了命令的，不受此限。
    const headingsByCmd = new Map();
    for (const o of occurrences) {
      if (o.pri !== 1 || !o.heading) continue;
      if (!headingsByCmd.has(o.cmd)) headingsByCmd.set(o.cmd, new Set());
      headingsByCmd.get(o.cmd).add(o.heading);
    }

    for (const o of occurrences) {
      if (o.pri === 1 && (headingsByCmd.get(o.cmd) || new Set()).size > 1) {
        o.desc = '';
        o.pri = 0;
        continue;
      }
      if (o.pri) continue;
      if (distinct.size !== 1) continue;
      // H1 是文档标题（`企业微信邮件管理技能`），不天然等于命令说明 —— 也要过同一把尺子
      const own = headingToDesc(o.heading);
      const cand = isUsableHeading(own) ? own : headingToDesc(h1);
      const fb = isUsableHeading(cand) ? cand : '';
      o.desc = REF_POINTER.test(fb) ? '' : fb;
      o.pri = o.desc ? 1 : 0;
    }

    for (const o of occurrences) {
      const prev = found.get(o.cmd);
      if (!prev) found.set(o.cmd, { desc: o.desc, ref: rel, pri: o.pri });
      else if (o.pri > prev.pri) found.set(o.cmd, { desc: o.desc, ref: rel, pri: o.pri });
      else if (o.pri === prev.pri && !prev.desc && o.desc) found.set(o.cmd, { desc: o.desc, ref: prev.ref, pri: o.pri });
    }
  }

  return [...found.entries()]
    .map(([name, v]) => ({ name: `wecom-cli ${name}`, desc: v.desc || '', ref: v.ref }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

// ---------------------------------------------------------------- 解析

function parse({ srcDir }) {
  const pkg = JSON.parse(fs.readFileSync(path.join(srcDir, 'package.json'), 'utf8'));
  const skillsDir = path.join(srcDir, 'skills');
  const skillDirs = fs
    .readdirSync(skillsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  const skills = skillDirs.map((dir) => {
    const p = path.join(skillsDir, dir);
    const skillFile = path.join(p, 'SKILL.md');
    const txt = fs.existsSync(skillFile) ? fs.readFileSync(skillFile, 'utf8') : '';
    const fm = parseFrontmatter(txt);
    const commands = parseSkillCommands(p);
    const refsDir = path.join(p, 'references');
    const refs = fs.existsSync(refsDir)
      ? fs.readdirSync(refsDir).filter((f) => f.endsWith('.md')).length
      : 0;
    // 服务前缀取命令里出现最多的首词
    const counts = new Map();
    for (const c of commands) {
      const svc = c.name.split(/\s+/)[1];
      counts.set(svc, (counts.get(svc) || 0) + 1);
    }
    const prefixes = [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([k]) => k);
    return {
      id: dir.replace(/^wecomcli-/, ''),
      label: dir.replace(/^wecomcli-/, ''),
      name: fm.name || dir,
      description: squeeze(fm.description || ''),
      commands,
      refs,
      prefixes,
      scope: parseScope(txt),
    };
  });

  const isAux = (s) => ['shared', 'media'].includes(s.id);
  const domains = skills.filter((s) => !isAux(s));
  const extras = skills.filter(isAux);
  const totalCmds = skills.reduce((a, s) => a + s.commands.length, 0);
  const totalRefs = skills.reduce((a, s) => a + s.refs, 0);
  const knownServices = new Set(skills.flatMap((s) => s.prefixes));
  const undeclared = [...knownServices].filter((s) => s && !DOCUMENTED_SERVICES.has(s));

  const meta = {
    name: 'wecom-cli',
    title: '企业微信 CLI',
    command: 'wecom-cli',
    version: pkg.version || '',
    repo: 'https://github.com/WecomTeam/wecom-cli',
    license: pkg.license || 'MIT',
    install: 'npm install -g @wecom/cli',
    scannedAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
    source: 'skill-repo',
    nodes: totalCmds,
    stats: {
      技能域: domains.length,
      文档内命令: totalCmds,
      参考文档: totalRefs,
    },
  };

  const model = {
    meta,
    tagline:
      `企业微信官方 CLI（Rust 实现，经 npm 包 \`@wecom/cli\` 分发），覆盖消息、邮件、在线文档、` +
      `在线表格、智能表格、智能文档、待办、日程、会议、微盘、通讯录等办公能力。` +
      `命令树由服务端 discovery 动态下发，随附 **${skills.length} 个官方 Agent Skills**。`,
    howToUse: [
      '先读下面「全局约定」的第一节，把三个前置检查做完 —— 这个 CLI 的命令树需要凭证才能列出。',
      '按场景在「能力域总表」里找到对应域，再到「命令全量清单」里取命令。',
      '命令是 `<service> [resource...] <method>` 形态，请求体优先用 `--json`；具体参数跑 `wecom-cli <service> <method> --help`。',
      '本篇记录的是官方技能文档里写明的命令。**真实可用的服务列表以 `wecom-cli --help` 为准**（需先授权）。',
    ],
    overview: [
      ['可执行文件', '`wecom-cli`'],
      ['版本', meta.version ? `\`${meta.version}\`` : '—'],
      ['仓库', meta.repo],
      ['官方 Agent Skills', `${skills.length} 个（${domains.length} 个业务域 + ${extras.length} 个辅助）`],
      ['文档内命令', `${totalCmds} 条`],
      ['深度参考文档', `${totalRefs} 篇`],
      ['快照时间', meta.scannedAt],
      ['命令树来源', '服务端 discovery 动态下发（**需凭证与网络**）'],
    ],
    install: {
      code: [
        '# 1. 安装 CLI（需要 Node.js >= 18）',
        'npm install -g @wecom/cli',
        '',
        '# 2. 安装官方 Agent Skills（必需，否则 AI 读不到各域用法）',
        'npx skills add WeComTeam/wecom-cli -y -g',
        '',
        '# 3. 初始化凭证：扫码或手填 Bot ID + Secret（仅需一次）',
        'wecom-cli auth init',
        '',
        '# 4. 确认授权状态（authorized 即就绪）',
        'wecom-cli auth show --status',
        '',
        '# 5. 确认 CLI 版本 >= 1.2.1（官方技能的硬要求）',
        'wecom-cli --version',
      ].join('\n'),
      notes: [
        '凭证需要企业微信侧创建**智能机器人**并拿到 Bot ID / Secret（扫码接入可自动创建绑定）。',
        '凭据加密存在 `~/.config/wecom/credentials.enc`（AES-256-GCM，0600），明文密钥不落盘。',
      ],
    },
    model: {
      title: '四类命令形态',
      intro:
        '这个 CLI 不像飞书那样有语义化的 `+快捷命令` 层，而是「服务方法调用」为主。' +
        '命令树由服务端 discovery 下发后在本地构建，所以**没有网络和凭证就看不了帮助**。',
      rows: [
        ['形态', '说明', '备注'],
        ['`wecom-cli <service> [resource...] <method>`', '调用远程服务方法', '主力形态，方法可带嵌套资源路径'],
        ['`wecom-cli <service> +<helper>`', '本地 helper', '由产品层注册的本地组合动作'],
        ['`wecom-cli auth <init|show>`', '授权管理', '内建扩展命令'],
        ['`wecom-cli schema …` / `wecom-cli cache …`', 'schema 查询与缓存管理', '**隐藏在 `--help` 之外**，调试与集成用'],
      ],
      code: [
        '# 列出所有服务与品类（需已授权）',
        'wecom-cli --help',
        '',
        '# 列出某服务下的全部方法',
        'wecom-cli <service> --help',
        '',
        '# 列出某方法需要的输入（含 TS 类型声明）',
        'wecom-cli <service> [resource...] <method> --help',
        'wecom-cli <service> <method> --doc',
        '',
        '# 内建：直接拿 schema',
        'wecom-cli schema list',
        'wecom-cli schema get <service.resource.method>',
      ].join('\n'),
      note:
        '`--schema` / `--doc` 在服务级与方法级都可用，是比翻文档更可靠的参数来源。',
    },
    domainsIntro:
      '「能做什么（含触发场景）」这一列取自官方 skill 的 description 原文，是最可靠的路由依据。',
    domains: domains.map((s) => ({
      id: s.id,
      label: s.label,
      prefix: s.prefixes.map((p) => p).join('` / `'),
      description: s.description || '—',
      note: [
        s.scope.yes.length ? `**适用**：${s.scope.yes.join('；')}` : '',
        s.scope.no.length ? `**不适用**：${s.scope.no.join('；')}` : '',
      ]
        .filter(Boolean)
        .join('　\n'),
      commands: s.commands,
      _refs: s.refs,
    })),
    // 辅助模块（shared / media）同样带命令，要一并列进清单
    extras: extras.map((s) => ({
      id: s.id,
      label: s.label,
      description: s.description || '—',
      commands: s.commands,
    })),
    routes: [
      ['给某人 / 某群发消息', '`wecom-cli message aibot sessions list` → 取 `chat_id` → `wecom-cli message aibot send`'],
      ['查最近能发消息的会话', '`wecom-cli message aibot sessions list`'],
      ['当前身份是谁', '`wecom-cli identity whoami`'],
      ['查某人 / 按拼音搜同事', '`wecom-cli contact users search`'],
      ['看日程 / 查某天的安排', '`wecom-cli calendar schedules list --json \'{"begin_time":"…","end_time":"…"}\'`'],
      ['约日程 / 建日程', '`wecom-cli calendar schedules create`'],
      ['改 / 取消日程', '`wecom-cli calendar schedules update` / `cancel`'],
      ['查大家有没有空', '`wecom-cli calendar schedules free list`'],
      ['找会议室 / 楼栋', '`wecom-cli meeting rooms search` / `meeting rooms buildings list`'],
      ['预约会议', '`wecom-cli meeting create`'],
      ['查会议列表 / 详情', '`wecom-cli meeting list` / `get`'],
      ['要会议纪要 / 转写原文', '`wecom-cli meeting original get`'],
      ['建待办 / 完成任务', '`wecom-cli todo create` / `todo finish`'],
      ['看待办列表', '`wecom-cli todo list`'],
      ['搜邮件 / 读邮件', '`wecom-cli mail search` / `mail get`'],
      ['写在线文档', '`wecom-cli doc import`，再用 `wecom-cli doc contents append` 追加正文'],
      ['读 / 覆盖文档正文', '`wecom-cli doc contents get` / `contents overwrite`'],
      ['搜文档 / 改名 / 管权限', '`wecom-cli doc search` / `doc names update` / `doc members update`'],
      ['读写在线表格', '`wecom-cli sheet ranges get` / `sheet contents update` / `sheet rows append`'],
      ['智能表格增删记录', '`wecom-cli smartsheet records …`（先看该域清单）'],
      ['建智能文档 / 编辑内容', '`wecom-cli smartpage create` / `smartpage blocks update`'],
      ['上传 / 下载文件', '`wecom-cli media upload` / `media download`（拿到 media_id 再发消息）'],
      ['微盘文件管理', '`wecom-cli disk files list` / `upload` / `download` / `folders create`'],
      ['授权状态不对 / 未安装', '`wecom-cli auth show --status` → `wecom-cli auth init`'],
    ],
    conventions: [
      {
        title: '使用前置：三步检查（官方硬要求）',
        body: [
          '官方 `wecomcli-shared` 技能规定：**首次准备执行任何 `wecom-cli` 命令前，必须先完成这三步**。',
          '',
          '```bash',
          '# Step 1 — 检查安装与版本（要求 >= 1.2.1）',
          'wecom-cli --version',
          'npm install -g @wecom/cli        # 缺失或版本过低时',
          '',
          '# Step 2 — 检查授权状态',
          'wecom-cli auth show --status     # authorized / unauthorized',
          '',
          '# Step 3 — 未授权时初始化（扫码，仅需一次）',
          'wecom-cli auth init --noninteractive',
          'wecom-cli auth show --status     # 复查，authorized 才继续',
          '```',
          '',
          '- 已安装、版本达标且已授权时，**不重复安装或初始化**。',
          '- 安装、升级、初始化或复查失败时，**不执行后续业务命令**，把错误告知用户。',
          '- 授权输出既不是 `authorized` 也不是 `unauthorized` 时，不要猜，直接报错给用户。',
        ].join('\n'),
      },
      {
        title: 'ID 类字段禁止外露（优先级最高）',
        body: [
          '这条约束对所有域生效，**优先级高于各业务技能的输出格式，且不因用户主动索要而放宽**。',
          '',
          '- **禁止**：最终回复里出现 `userid` / `open_vid` / `department_id` / `chat_id` 等标识。',
          '  凡接口返回的内部标识（`mail_id` / `media_id` / `file_id` / `space_id` / `folder_id` /',
          '  `docid` / `content_id` / `msg_id` / `cursor` 等，命名以 `_id` 结尾或语义上属于机器标识的）',
          '  只能内部流转，用于后续调用。',
          '- **必须**：用可读名称组织回复 —— `name` / `username` / 部门名 / 邮箱 / `subject` /',
          '  `doc_name` / `chat_name` / `title`。',
          '- 只拿到 ID 没有可读名称时，先用 `wecomcli-contact` 之类换取名称；换不到就用自然语言指代',
          '  （「上一封日报邮件」），**禁止退化为展示 ID**。',
          '- 让用户在多个候选里选时，用「序号 + 名称/主题/时间」构造列表，不要用 ID 让用户辨认。',
          '- 用户直接要「把 ID 给我」时，说明该标识属于内部字段不便提供，改用可读信息或继续把事办完。',
          '- 例外：可读链接（`doc_url`、微盘分享链接）不受限，即使链接里本身含标识串。',
        ].join('\n'),
      },
      {
        title: '请求体：三种给法，可组合',
        body: [
          '```bash',
          'wecom-cli <service> [resource...] <method> [--param value ...] [--json \'<JSON>\'] [flags]',
          '```',
          '',
          '| 方式 | 说明 |',
          '|---|---|',
          '| 命名参数 | 由方法 schema 生成的参数（如 `--id root`），类型与必填性以 `--help` 为准 |',
          '| `--json \'<JSON>\'` | 直接给定完整请求体 JSON 字符串 |',
          '| `--set path=value` | 深层路径覆盖，可重复（如 `--set extra.flag=true`）；非法 JSON 片段会自动修复 |',
          '',
          '```bash',
          '# 无参方法（含嵌套资源路径）',
          'wecom-cli message aibot sessions list',
          '',
          '# 用 --json 给请求体',
          'wecom-cli doc search --json \'{"keywords":["周报"],"limit":10}\'',
          '```',
        ].join('\n'),
      },
      {
        title: '通用执行 flag',
        body: [
          '| Flag | 说明 |',
          '|---|---|',
          '| `--dry-run` | 仅在本地校验并打印将发送的请求，**不实际调用** |',
          '| `--page-count <n>` | 启用游标式自动分页，最多拉 n 页；输出为 NDJSON（每行一页） |',
          '| `--page-delay <ms>` | 分页请求间隔毫秒数，默认 100 |',
          '| `--output` / `-o <file>` | 将响应体写入文件 |',
          '| `--output-dir <dir>` | 指定下载文件的落盘目录（默认当前目录） |',
          '',
          '输出形态：',
          '',
          '- 默认：compact JSON 输出到 stdout。',
          '- 下载类方法：文件落盘到当前目录（可用 `--output-dir` / `--output` 改），stdout 输出 `DownloadResult` JSON（`content_type` / `file_path` / `size`），文件以 `0600` 落盘。',
          '- 分页：NDJSON 多行输出。',
          '- 日志与提示一律走 stderr，不污染 stdout 的 JSON。',
        ].join('\n'),
      },
      {
        title: '退出码与错误格式',
        body: [
          '| 退出码 | 含义 |',
          '|---|---|',
          '| `0` | 成功（含 `--help` / `--version`） |',
          '| `1` | 运行时错误（网络、鉴权、IO、后台业务错误） |',
          '| `2` | 用法错误（参数缺失、未知命令） |',
          '',
          '错误以结构化 JSON 输出到 **stdout**：',
          '',
          '```json',
          '{ "error": { "type": "AuthError", "code": 893201, "message": "..." } }',
          '```',
          '',
          '- CLI 自身错误的 code 段：`893000–893099`（lib）、`893100–893199`（transport）、`893200–893299`（bin），`893999` 为兜底。',
          '- 后台业务错误（`errcode != 0`）直接透传原响应体与 `errcode`。',
          '- **判断成功看退出码 0，不要只看 `error` 字段是否存在。**',
        ].join('\n'),
      },
      {
        title: '运行时路径、环境变量与配置文件',
        body: [
          '| 项目 | 默认位置 | 备注 |',
          '|---|---|---|',
          '| 配置目录 | `~/.config/wecom` | 可由 `WECOM_CLI_CONFIG_DIR` 覆盖 |',
          '| 凭据文件 | `<config_dir>/credentials.enc` | AES-256-GCM（0600） |',
          '| 加密密钥 | 系统 keyring 或 `<config_dir>/.encryption_key` | 无 keyring 时的文件回退 |',
          '| discovery 缓存 | `<config_dir>/cache` | 服务目录与 schema 缓存，**TTL 60 秒** |',
          '| 下载目录 | 当前工作目录 | 单次调用可用 `--output-dir` 覆盖 |',
          '',
          '| 环境变量 | 作用 |',
          '|---|---|',
          '| `WECOM_CLI_CONFIG_DIR` | 覆盖默认配置目录 |',
          '| `WECOM_CLI_ADDITIONAL_HEADERS` | 额外请求头，值为 JSON object；也支持 `WECOM_CLI_ADDITIONAL_HEADERS_*` 后缀形式 |',
          '| `WECOM_CLI_LOG_LEVEL` | 打开 stderr 文本日志并设置过滤级别（如 `debug`） |',
          '| `WECOM_CLI_LOG_DIR` | 打开 JSON Lines 日志，按天写入 `<dir>/ww.log.<日期>`（UTC+8） |',
          '',
          '- 环境变量优先级高于配置文件。',
          '- **access token 不允许经 `config.json` 配置**，只来自 `credentials.enc`。',
        ].join('\n'),
      },
      {
        title: '消息发送的能力边界（最容易误解）',
        body: [
          '机器人**只能向「最近有过消息往来的会话」主动发消息**，不能凭姓名或 ID 任意发送。',
          '',
          '1. 先跑 `wecom-cli message aibot sessions list` 拿到本次可用的会话列表。',
          '2. 从本次返回的 `sessions[]` 里选定目标，把该项的 `chat_id` **原样复制**给 `send`。',
          '',
          '以下值**都不能**直接当 `send.chat_id`：用户输入的 ID、历史轮次里存下来的 `chat_id`、',
          '`wecomcli-contact` 返回的 `userid`、按姓名/群名自行构造的值。它们最多只能当匹配线索。',
          '',
          '例外：可以给「授权人」本人发消息 —— 用 `wecom-cli identity whoami` 拿到的授权人 ID',
          '可直接作为 `chat_id`，无需先跑 `sessions list`。',
        ].join('\n'),
      },
      {
        title: '发送媒体文件的正确顺序',
        body: [
          '要发图片/文件/语音/视频且手上只有本地路径时，**必须先换 media_id**：',
          '',
          '```bash',
          'wecom-cli media upload <type> --file <本地路径>   # 先拿 media_id',
          'wecom-cli message aibot send --json \'{...}\'        # 再用 media_id 发送',
          '```',
          '',
          '- 上传时的 `type` 必须与发送时的 `msg_type` 对齐。',
          '`wecomcli-media` 只负责文件搬运，不解析文件内容。',
        ].join('\n'),
      },
    ],
    rules: {
      title: '各域官方 Skill 说明与边界（完整原文摘要）',
      from: `官方 ${meta.repo} 的 skills/*/SKILL.md`,
      body: skills
        .map((s) => {
          const bits = [];
          if (s.commands.length) bits.push(`${s.commands.length} 条命令`);
          if (s.refs) bits.push(`${s.refs} 篇深度参考`);
          const body = [
            `### ${s.name}`,
            '',
            s.description || '',
            '',
            bits.length ? `*规模：${bits.join(' · ')}*` : '',
            s.scope.yes.length ? `\n**适用**\n${s.scope.yes.map((x) => `- ${x}`).join('\n')}` : '',
            s.scope.no.length ? `\n**不适用**\n${s.scope.no.map((x) => `- ${x}`).join('\n')}` : '',
          ]
            .filter((x) => x !== '')
            .join('\n');
          return body;
        })
        .join('\n\n'),
    },
    footer:
      `*快照由 \`bin/skill-digest wecom-cli\` 从 ${meta.repo} 源码聚合生成，` +
      `版本 \`${meta.version}\`，时间 ${meta.scannedAt}。*\n` +
      `*命令树随服务端 discovery 变化，拿到凭证后请以 \`wecom-cli --help\` 为准；` +
      `升级后刷新：\`bin/refresh wecom-cli\`*`,
  };

  if (undeclared.length) {
    model.overview.push([
      '⚠ 文档未列出的服务前缀',
      undeclared.map((s) => `\`${s}\``).join('、') + '（以 `wecom-cli --help` 为准）',
    ]);
  }

  return { model, extraFiles: {} };
}

module.exports = { id: 'wecom', parse };
