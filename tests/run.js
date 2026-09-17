#!/usr/bin/env node
'use strict';

/**
 * 测试入口：跑 tests/ 下所有 *.test.js。
 * 每个测试文件自己管理临时目录，互不影响，也不触碰用户真实数据。
 *
 * 用法：node tests/run.js   或   npm test
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const dir = __dirname;
const files = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith('.test.js'))
  .sort();

let failed = 0;
for (const f of files) {
  process.stdout.write(`\n── ${f} ──\n`);
  const r = spawnSync(process.execPath, [path.join(dir, f)], { stdio: 'inherit' });
  if (r.status !== 0) failed++;
}

process.stdout.write(
  failed ? `\n✗ ${failed}/${files.length} 个测试文件失败\n` : `\n✓ 全部通过（${files.length} 个测试文件）\n`
);
process.exit(failed ? 1 : 0);
