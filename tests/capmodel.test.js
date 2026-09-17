#!/usr/bin/env node
'use strict';

// 统一渲染层的测试。
// 采集方式千差万别，但产出的文档形态必须一致 —— 这里把「模型 → 文档」的契约钉死，
// 免得以后加新 CLI 时某个段落悄悄消失。

const assert = require('node:assert/strict');
const capmodel = require('../lib/capmodel.js');

const model = {
  meta: {
    name: 'demo-cli',
    title: '演示 CLI',
    command: 'demo',
    version: '1.2.3',
    repo: 'https://github.com/example/demo',
    license: 'MIT',
    scannedAt: '2026-01-01 00:00:00',
    source: 'skill-repo',
    nodes: 3,
    stats: { 业务域: 1, 命令: 3 },
  },
  tagline: '一句话概述。',
  howToUse: ['第一步。', '第二步。'],
  overview: [['可执行文件', '`demo`'], ['版本', '`1.2.3`']],
  install: { code: 'npm i -g demo', notes: ['需要 Node 18+'] },
  model: { title: '调用模型', rows: [['层级', '形态'], ['1', '`demo x`']], code: 'demo x', note: '先看 help。' },
  domains: [
    {
      id: 'im',
      label: 'im',
      prefix: 'im',
      description: '发消息',
      commands: [
        { name: 'demo im send', desc: '发送消息' },
        { name: 'demo im search', desc: '搜索消息' },
      ],
    },
  ],
  extras: [
    {
      id: 'flow',
      label: 'flow',
      description: '工作流',
      commands: [{ name: 'demo flow run', desc: '跑工作流' }],
    },
  ],
  routes: [['发消息', '`demo im send`']],
  conventions: [{ title: '身份', body: '`--as user` 代表本人。' }],
  rules: { title: '官方规则', from: '官方 SKILL.md', body: '成功判定看 `ok == true`。' },
  footer: '*生成于测试。*',
};

const md = capmodel.render(model);

// —— 主要段落一个都不能少
const sections = [
  '## 这份文档怎么用',
  '## 概览',
  '## 安装与首次配置',
  '## 调用模型',
  '## 能力域总表',
  '### 辅助与工作流模块',
  '## 命令全量清单',
  '## 任务 → 命令 速查',
  '## 全局约定（每个命令都适用）',
  '## 官方规则',
];
for (const s of sections) {
  assert.ok(md.includes(s), `渲染结果缺少段落：${s}`);
}

// —— frontmatter 要带上溯源信息，Agent 读单文件也能知道版本与出处
for (const line of ['name: demo-cli', 'command: demo', 'version: 1.2.3', 'license: MIT', 'acquired_by: skill-repo']) {
  assert.ok(md.includes(line), `frontmatter 缺少 ${line}`);
}

// —— 辅助模块的命令必须进清单（曾经漏过，详见 profiles/lark.js 的注释）
assert.ok(md.includes('demo flow run'), '辅助模块的命令没有进入命令清单');
assert.ok(md.includes('demo im send') && md.includes('demo im search'), '业务域命令缺失');
assert.ok(md.includes('共 3 条命令'), '命令总数应为 3（2 个业务域命令 + 1 个辅助模块命令）');

// —— 说明里的竖线不能破坏表格
const piped = capmodel.render({
  ...model,
  domains: [
    {
      id: 'x',
      label: 'x',
      prefix: 'x',
      description: 'A | B',
      commands: [{ name: 'demo x go', desc: '选项 group|topic' }],
    },
  ],
});
assert.ok(piped.includes('group\\|topic'), '说明里的竖线应当被转义，否则会切断表格单元格');

// —— indexMeta 的归一化计数
const meta = capmodel.indexMeta(model);
assert.equal(meta.domains, 1, 'domains 应为业务域数量');
assert.equal(meta.extras, 1, 'extras 应为辅助模块数量');
assert.equal(meta.commands, 3, 'commands 应为业务域与辅助模块命令之和');
assert.equal(meta.name, 'demo-cli');
assert.equal(meta.source, 'skill-repo');

// —— 空模型不该崩，也不该产出空壳段落
const bare = capmodel.render({ meta: { name: 'x', command: 'x', scannedAt: '' }, tagline: '' });
assert.ok(bare.startsWith('---'), '最少也要有 frontmatter');
assert.ok(!bare.includes('## 命令全量清单'), '没有命令时不该出现命令清单');

console.log('✓ 统一渲染层：段落契约、表格转义、归一化计数均符合预期');
