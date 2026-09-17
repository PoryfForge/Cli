'use strict';

/**
 * capmodel — 能力快照的统一数据模型与渲染器。
 *
 * 背景：不同厂商把 CLI 能力写在完全不同的地方 ——
 *   飞书 CLI 写在 skill 的「+快捷命令」表格里，
 *   企业微信 CLI 写在 skill 的 bash 代码块里，
 *   WPS 365 CLI 直接编译进二进制、靠 --help 全树暴露。
 *
 * 采集方式各不相同，但**产出的文档形态应该一致**：
 * 一份给 AI 查命令的 CAPABILITY.md。所以把「怎么采」和「怎么渲染」拆开：
 *   profiles/<cli>.js  → 解析成下面这个模型（只说事实）
 *   lib/capmodel.js    → 把模型渲染成 markdown（只管排版）
 *
 * 模型字段（除 meta / tagline 外都可省略，渲染器会自动跳过空段）：
 *
 *   meta          { name, title, command, version, repo, license, install,
 *                   scannedAt, source, stats:{...}, nodes }
 *   tagline       string  一句话概述（markdown）
 *   howToUse      string[]  「这份文档怎么用」的步骤
 *   overview      [k,v][] 概览表行
 *   install       { code, notes[] }
 *   model         { title, intro, rows[][], code, note }  调用模型
 *   domains       [{ id, label, prefix, description, commands:[{name,desc,ref}], note }]
 *   extras        [{ label, description }]  辅助模块（不算业务域）
 *   routes        [ [用户说, 命令][] ]      任务 → 命令速查
 *   conventions   [{ title, body }]         全局约定，body 为 markdown
 *   rules         { title, from, body }     官方 Agent 使用规则原文
 *   footer        string
 */

const escCell = (x) => String(x == null ? '' : x).replace(/\|/g, '\\|').replace(/\n+/g, ' ').trim();
const squeeze = (s) => String(s == null ? '' : s).replace(/[ \t]+/g, ' ').trim();

/** 表格：rows 为数组的数组；第一行是表头 */
function table(rows, aligns) {
  if (!rows || !rows.length) return [];
  const [head, ...body] = rows;
  const sep = head.map((_, i) => {
    const a = (aligns || [])[i];
    if (a === 'r') return '---:';
    if (a === 'c') return ':---:';
    return '---';
  });
  const line = (cells) => `| ${cells.map((c) => escCell(c)).join(' | ')} |`;
  return [line(head), `|${sep.join('|')}|`, ...body.map(line)];
}

function render(model) {
  const m = model.meta || {};
  const L = [];
  const push = (...xs) => L.push(...xs);

  // ---------------- frontmatter
  push('---');
  push(`name: ${m.name}`);
  push(`kind: cli`);
  push(`command: ${m.command}`);
  if (m.version) push(`version: ${m.version}`);
  if (m.license) push(`license: ${m.license}`);
  push(`source: ${m.repo || ''}`);
  push(`acquired_by: ${m.source || ''}`);
  push(`scanned_at: ${m.scannedAt}`);
  for (const [k, v] of Object.entries(m.stats || {})) {
    push(`${String(k).replace(/\s+/g, '_')}: ${v}`);
  }
  push('---');
  push('');

  // ---------------- 标题
  push(`# ${m.title}（\`${m.command}\`）— 能力快照`);
  push('');
  if (model.tagline) {
    push(`> ${squeeze(model.tagline)}`);
    push('');
  }

  // ---------------- 怎么用
  if (model.howToUse && model.howToUse.length) {
    push('## 这份文档怎么用');
    push('');
    model.howToUse.forEach((s, i) => push(`${i + 1}. ${s}`));
    push('');
  }

  // ---------------- 概览
  if (model.overview && model.overview.length) {
    push('## 概览');
    push('');
    push(...table([['项', '值'], ...model.overview]));
    push('');
  }

  // ---------------- 安装
  if (model.install && model.install.code) {
    push('## 安装与首次配置');
    push('');
    push('```bash');
    push(model.install.code.replace(/\s+$/, ''));
    push('```');
    push('');
    for (const n of model.install.notes || []) push(`- ${n}`);
    if ((model.install.notes || []).length) push('');
  }

  // ---------------- 调用模型
  if (model.model) {
    const mm = model.model;
    push(`## ${mm.title || '调用模型'}`);
    push('');
    if (mm.intro) {
      push(mm.intro);
      push('');
    }
    if (mm.rows && mm.rows.length) {
      push(...table(mm.rows));
      push('');
    }
    if (mm.code) {
      push('```bash');
      push(mm.code.replace(/\s+$/, ''));
      push('```');
      push('');
    }
    if (mm.note) {
      push(`> ${mm.note}`);
      push('');
    }
  }

  // ---------------- 能力域总表
  const domains = model.domains || [];
  if (domains.length) {
    push('## 能力域总表');
    push('');
    if (model.domainsIntro) {
      push(model.domainsIntro);
      push('');
    }
    const hasCount = domains.some((d) => d.commands && d.commands.length);
    const head = hasCount ? ['域', '命令前缀', '能做什么（含触发场景）', '命令数'] : ['域', '命令前缀', '能做什么（含触发场景）'];
    const rows = [head, ...domains.map((d) => {
      const r = [`**${d.label}**`, d.prefix ? `\`${d.prefix}\`` : '—', d.description || '—'];
      if (hasCount) r.push(d.commands && d.commands.length ? String(d.commands.length) : '—');
      return r;
    })];
    push(...table(rows, hasCount ? [null, null, null, 'r'] : null));
    push('');
  }

  if (model.extras && model.extras.length) {
    push('### 辅助与工作流模块');
    push('');
    push(...table([['模块', '能做什么'], ...model.extras.map((e) => [`**${e.label}**`, e.description || '—'])]));
    push('');
  }

  // ---------------- 命令全量清单
  // 辅助模块也可能带命令（例如飞书的工作流技能），一并纳入，避免漏掉
  const withCmds = [...domains, ...(model.extras || [])].filter((d) => d.commands && d.commands.length);
  if (withCmds.length) {
    const total = withCmds.reduce((a, d) => a + d.commands.length, 0);
    push('## 命令全量清单');
    push('');
    push(`共 ${total} 条命令/调用形态，按域分组。`);
    push('');
    for (const d of withCmds) {
      push(`### ${d.label} · ${d.commands.length} 条`);
      push('');
      if (d.note) {
        push(d.note);
        push('');
      }
      push(...table([
        ['命令', '说明'],
        ...d.commands.map((c) => [`\`${c.name}\``, c.desc || '']),
      ]));
      push('');
      const refs = d.commands.filter((c) => c.ref);
      if (refs.length) {
        push(`> 深度参考：${[...new Set(refs.map((c) => c.ref))].map((r) => `\`${r}\``).join('、')}`);
        push('');
      }
    }
  }

  // ---------------- 任务路由
  if (model.routes && model.routes.length) {
    push('## 任务 → 命令 速查');
    push('');
    push('高频场景的直接映射。表里没有的，去上面「能力域总表」按场景匹配。');
    push('');
    push(...table([['用户说', '命令'], ...model.routes]));
    push('');
  }

  // ---------------- 全局约定
  if (model.conventions && model.conventions.length) {
    push('## 全局约定（每个命令都适用）');
    push('');
    for (const c of model.conventions) {
      push(`### ${c.title}`);
      push('');
      push(c.body.replace(/\s+$/, ''));
      push('');
    }
  }

  // ---------------- 官方规则
  if (model.rules && model.rules.body) {
    push(`## ${model.rules.title || '官方 Agent 使用规则'}`);
    push('');
    push(`> 原文来自 ${model.rules.from}。厂商写的判断标准优先于一般经验。`);
    push('');
    push(model.rules.body.replace(/\s+$/, ''));
    push('');
  }

  // ---------------- 页脚
  if (model.footer) {
    push('---');
    push('');
    push(model.footer);
    push('');
  }

  return L.join('\n').replace(/\n{3,}/g, '\n\n').replace(/\n+$/, '\n');
}

/**
 * 生成索引用的 meta（cli-cap 读它来列库）。
 *
 * stats 里的中文键是给人看的标签，会随厂商术语变化；
 * 所以另外给一组稳定的机器键（domains / commands / apiMethods / refs），
 * 让索引与网页不用猜键名。
 */
function indexMeta(model) {
  const m = model.meta || {};
  const domains = model.domains || [];
  const extras = model.extras || [];
  const commands = [...domains, ...extras].reduce((a, d) => a + ((d.commands || []).length), 0);
  const stat = (zh, en) => Number((m.stats && (m.stats[zh] ?? m.stats[en])) || 0);
  return {
    name: m.name,
    command: m.command,
    title: m.title,
    version: m.version || '',
    description: model.tagline ? squeeze(model.tagline.replace(/[*`]/g, '')) : '',
    repo: m.repo || '',
    license: m.license || '',
    install: m.install || '',
    scannedAt: m.scannedAt,
    source: m.source || '',
    commit: m.commit || '',
    stats: m.stats || {},
    domains: domains.length,
    extras: extras.length,
    commands: commands || m.nodes || 0,
    apiMethods: stat('API方法', 'apiMethods'),
    refs: stat('参考文档', 'referenceDocs'),
    nodes: m.nodes || commands || 0,
    manual: true,
  };
}

module.exports = { render, indexMeta, escCell, table, squeeze };
