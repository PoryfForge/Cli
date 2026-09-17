#!/usr/bin/env node
'use strict';

// skills/ 模板与安装器的体检。
// 这个模板是「其他用户把库接进自己的 Agent」的唯一入口 —— 它一坏（占位符丢了、
// 说明块标记不配对），装出来的 skill 就会指向错误路径，而且**失败是静默的**：
// Agent 只是查不到库，不会报错。所以这里端到端跑一遍真实的安装/预演/卸载。

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const SKILL = path.join(ROOT, 'skills', 'cli-capability-lookup', 'SKILL.md');
const INSTALLER = path.join(ROOT, 'bin', 'install-skill');
const PLACEHOLDER = '{{CLI_CAP_ROOT}}';

assert.ok(fs.existsSync(SKILL), '缺少 skills/cli-capability-lookup/SKILL.md');
const tpl = fs.readFileSync(SKILL, 'utf8');

// frontmatter 是 Agent 决定「何时加载」的依据，name 必须和目录名一致
const fm = tpl.match(/^---\n([\s\S]*?)\n---\n/);
assert.ok(fm, 'SKILL.md 缺少 frontmatter');
assert.match(fm[1], /^name:\s*cli-capability-lookup$/m, 'frontmatter 的 name 应与目录名一致');
assert.match(fm[1], /^description:/m, 'frontmatter 缺少 description（Agent 靠它判断何时加载）');

// 模板里必须保留占位符，否则安装器无法写入本机路径
assert.ok(tpl.includes(PLACEHOLDER), `模板里应保留 ${PLACEHOLDER} 占位符`);

// 「只在未渲染时才有意义」的说明块：标记必须成对且有序，否则安装器剥不干净
const starts = (tpl.match(/<!-- unrendered-only:start -->/g) || []).length;
const ends = (tpl.match(/<!-- unrendered-only:end -->/g) || []).length;
assert.equal(starts, 1, '应有且仅有 1 个 unrendered-only:start 标记');
assert.equal(ends, 1, '应有且仅有 1 个 unrendered-only:end 标记');
assert.ok(
  tpl.indexOf('<!-- unrendered-only:start -->') < tpl.indexOf('<!-- unrendered-only:end -->'),
  'unrendered-only 标记顺序颠倒'
);

function run(args) {
  return spawnSync(process.execPath, [INSTALLER, ...args], { encoding: 'utf8' });
}

// 端到端：真装一次到临时目录
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cli-cap-skill-'));
const target = path.join(tmp, 'skills');

try {
  const r = run(['--target', target]);
  assert.equal(r.status, 0, `安装应退出 0，实际 ${r.status}\n${r.stderr}`);

  const dest = path.join(target, 'cli-capability-lookup', 'SKILL.md');
  assert.ok(fs.existsSync(dest), '安装后应存在 SKILL.md');
  const out = fs.readFileSync(dest, 'utf8');

  assert.ok(!out.includes(PLACEHOLDER), '安装后不应残留占位符');
  assert.ok(!out.includes('unrendered-only'), '安装后不应残留模板说明块');
  assert.ok(out.includes(ROOT), '安装后应写入本仓库的真实绝对路径');

  // 内容主体要还在 —— 别把模板替换成只剩个路径头的空壳
  assert.ok(out.length > tpl.length * 0.8, '渲染后的内容不应比模板明显缩水');
  assert.match(out, /bin\/cli-cap show/, '渲染后应仍含检索用法示例');

  // --dry-run 不能落盘
  const tmp2 = fs.mkdtempSync(path.join(os.tmpdir(), 'cli-cap-dry-'));
  const r2 = run(['--target', path.join(tmp2, 'skills'), '--dry-run']);
  assert.equal(r2.status, 0, '--dry-run 应退出 0');
  assert.ok(!fs.existsSync(path.join(tmp2, 'skills')), '--dry-run 不应创建任何目录');
  fs.rmSync(tmp2, { recursive: true, force: true });

  // --uninstall 要清干净
  const r3 = run(['--target', target, '--uninstall']);
  assert.equal(r3.status, 0, '--uninstall 应退出 0');
  assert.ok(!fs.existsSync(path.join(target, 'cli-capability-lookup')), '--uninstall 后目录应消失');

  // 不认识的参数必须报错退出，而不是静默忽略（静默忽略会装到错误的地方）
  assert.notEqual(run(['--nonsense']).status, 0, '无法识别的参数应报错退出');
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}

console.log('✓ skill 模板与安装器通过：占位符成对、渲染无残留、预演不落盘、可卸载');
