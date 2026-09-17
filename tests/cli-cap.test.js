#!/usr/bin/env node
'use strict';

// 在独立临时库验证保存 → 重建索引 → 新进程查询，不触碰用户的路由或调用业务 CLI。
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cli-cap-test-'));
const run = (...args) => {
  const result = spawnSync(process.execPath, [path.join(root, 'bin/cli-cap'), ...args], {
    encoding: 'utf8', timeout: 10000,
  });
  assert.ifError(result.error);
  return result;
};
const ok = (...args) => {
  const result = run(...args);
  assert.equal(result.status, 0, result.stderr);
  return result.stdout;
};

try {
  fs.mkdirSync(path.join(root, 'bin'));
  fs.copyFileSync(path.join(__dirname, '../bin/cli-cap'), path.join(root, 'bin/cli-cap'));
  for (const name of ['alpha', 'beta']) {
    const dir = path.join(root, 'registry', name);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'capability.json'), JSON.stringify({
      meta: { name, command: name, version: '1.2.3', scannedAt: '2026-09-17', nodes: 1 },
      nodes: [],
    }));
    fs.writeFileSync(path.join(dir, 'CAPABILITY.md'), '# 能力\n共享检索词\n规则：--dry-run\n');
    fs.writeFileSync(path.join(dir, 'api-resources.md'), '# API\n独有接口字段\n');
  }
  const routeFile = path.join(root, 'routes.json');
  fs.writeFileSync(routeFile, JSON.stringify({ _comment: '保留元数据', routes: [] }));
  const command = 'alpha query --filter="a=b" --output=<file>';
  ok('remember', 'alpha', '--intent=查看某天日程', `--command=${command}`, '--note=用户身份 | 未实测');
  let doc = JSON.parse(fs.readFileSync(routeFile, 'utf8'));
  assert.equal(doc._comment, '保留元数据');
  assert.equal(doc.routes[0].command, command); // --key=value 中的后续等号必须原样保留。
  assert.equal(doc.routes[0].snapshotVersion, '1.2.3');
  assert.ok(Number.isFinite(Date.parse(doc.routes[0].recordedAt)));
  assert.match(fs.readFileSync(path.join(root, 'INDEX.md'), 'utf8'), /用户身份 \\\| 未实测/);
  assert.match(fs.readFileSync(path.join(root, 'docs/index.html'), 'utf8'), /--output=&lt;file&gt;/);
  assert.match(ok('search', '某天日程'), /alpha query/); // 独立进程仍能读到刚保存的路由。
  assert.match(ok('show', 'alpha', '某天日程'), /alpha query/);
  const both = ok('search', '共享检索词');
  assert.match(both, /### alpha/);
  assert.match(both, /### beta/);
  assert.match(both, /CAPABILITY\.md:2:/);
  assert.match(ok('search', '独有接口字段'), /api-resources\.md:2:/);
  assert.match(ok('search', '--', '--dry-run'), /规则：--dry-run/);
  assert.match(ok('search', '不存在的关键词'), /未命中不代表/);
  assert.notEqual(run('search').status, 0);

  ok('remember', 'alpha', '--intent', '查看某天日程', '--command', 'alpha query --day=today');
  doc = JSON.parse(fs.readFileSync(routeFile, 'utf8'));
  assert.equal(doc.routes.length, 1); // 同一 CLI 和意图更新，不产生重复条目。
  assert.equal(doc.routes[0].note, '用户身份 | 未实测');
  assert.equal(doc.routes[0].command, 'alpha query --day=today');
  ok('remember', 'beta', '--intent', '查看某天日程', '--command', 'beta query');
  assert.equal(JSON.parse(fs.readFileSync(routeFile, 'utf8')).routes.length, 2);

  const before = fs.readFileSync(routeFile, 'utf8');
  for (const args of [
    ['remember', 'unknown', '--intent=x', '--command=x'],
    ['remember', '../outside', '--intent=x', '--command=x'],
    ['remember', 'alpha', '--intent=x', '--command'],
    ['remember', 'alpha', '--intent=x', '--command='],
    ['remember', 'alpha', '--intent=x', '--command=x', '--note'],
    ['remember', 'alpha', '--intent=x', '--command=x', '--typo=x'],
  ]) {
    assert.notEqual(run(...args).status, 0);
    assert.equal(fs.readFileSync(routeFile, 'utf8'), before);
  }
  for (const damaged of ['{invalid', '{"routes":{}}']) {
    fs.writeFileSync(routeFile, damaged);
    assert.notEqual(run('remember', 'alpha', '--intent=x', '--command=x').status, 0);
    assert.equal(fs.readFileSync(routeFile, 'utf8'), damaged);
  }
  console.log('✓ 检索、保存、更新、等号参数、索引同步和失败不覆盖检查通过');
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}
