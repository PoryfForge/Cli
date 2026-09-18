#!/usr/bin/env node
'use strict';

// 收录清单（clis.json）的体检。
// 清单是「可维护添加」的唯一入口 —— 它一错，采集就会静默跑歪，所以这里把该有的约束都钉住。

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'clis.json'), 'utf8'));

const KINDS = new Set(['skill-repo', 'release-bin', 'local-bin']);
const PROFILES = new Set(
  fs.existsSync(path.join(ROOT, 'profiles'))
    ? fs
        .readdirSync(path.join(ROOT, 'profiles'))
        .filter((f) => f.endsWith('.js'))
        .map((f) => f.replace(/\.js$/, ''))
    : []
);

assert.ok(Array.isArray(manifest.clis) && manifest.clis.length, 'clis.json 必须有 clis 数组');
assert.ok(PROFILES.size, 'profiles/ 下至少要有一个解析档');

const seen = new Set();
for (const entry of manifest.clis) {
  const where = `clis.json 条目 ${entry.name || '(缺 name)'}`;

  for (const key of ['name', 'title', 'command', 'repo']) {
    assert.ok(entry[key], `${where} 缺少必填字段 ${key}`);
  }
  assert.ok(!seen.has(entry.name), `${where} 名字重复`);
  seen.add(entry.name);

  // 名字会当作目录名用，必须是可以直接落盘的片段
  assert.match(entry.name, /^[a-z0-9][a-z0-9._-]*$/, `${where} 的名字只能是小写字母数字与 . _ -`);

  const acq = entry.acquire;
  assert.ok(acq, `${where} 缺少 acquire`);
  assert.ok(KINDS.has(acq.kind), `${where} 的 acquire.kind 不认识：${acq.kind}`);
  assert.ok(PROFILES.has(acq.profile), `${where} 引用了不存在的解析档 profiles/${acq.profile}.js`);

  if (acq.kind === 'skill-repo') {
    assert.ok(acq.tarball, `${where} 的 skill-repo 需要 acquire.tarball`);
    assert.ok(acq.stripPrefix, `${where} 的 skill-repo 需要 acquire.stripPrefix`);
    assert.ok(Array.isArray(acq.extract) && acq.extract.length, `${where} 的 skill-repo 需要 acquire.extract`);
    assert.ok(acq.srcDir, `${where} 的 skill-repo 需要 acquire.srcDir`);
    // 解压路径拼的是 <stripPrefix>/<extract 项>，前缀写错会直接解压失败
    assert.doesNotMatch(acq.stripPrefix, /\//, `${where} 的 stripPrefix 应是单个顶层目录名`);
  }

  if (acq.kind === 'release-bin') {
    assert.ok(acq.binName, `${where} 的 release-bin 需要 acquire.binName`);
    assert.ok(acq.binDir, `${where} 的 release-bin 需要 acquire.binDir`);

    // 「下载哪个文件」有三条路：逐平台直链 / 逐平台资产名 / 单条资产模板
    const urlMap = acq.url && typeof acq.url === 'object' ? acq.url : null;
    const hasUrl = Boolean(acq.url);
    assert.ok(
      hasUrl || (acq.asset && Object.keys(acq.asset).length) || acq.assetTemplate,
      `${where} 的 release-bin 需要 acquire.url（逐平台直链）、acquire.asset 或 acquire.assetTemplate`
    );
    for (const k of Object.keys(acq.asset || {})) {
      assert.match(k, /^\w+-\w+$/, `${where} 的 acquire.asset 键应为 <os>-<arch>，实际是 ${k}`);
    }
    for (const k of Object.keys(urlMap || {})) {
      assert.match(k, /^\w+-\w+$/, `${where} 的 acquire.url 键应为 <os>-<arch>，实际是 ${k}`);
    }
    // 逐平台写 URL 时最容易犯的错是复制粘贴后忘了改平台名，这样所有平台会下到同一个文件
    const urls = Object.entries(urlMap || {});
    assert.equal(
      new Set(urls.map(([, u]) => u)).size,
      urls.length,
      `${where} 的 acquire.url 有重复的平台地址（多半是复制粘贴漏改）。` +
        `若该 CLI 各平台共用同一个地址，请改成单条字符串：acquire.url = "<url 模板>"`
    );

    assert.ok(
      !acq.archive || ['zip', 'tar.gz', 'none'].includes(acq.archive),
      `${where} 的 acquire.archive 只能是 zip / tar.gz / none`
    );

    // 版本号从哪来：GitHub 仓库能查 release，非 GitHub 托管就必须自带版本源
    const isGithub = /github\.com\/[^/]+\/[^/]+/.test(entry.repo || '');
    assert.ok(
      acq.version || acq.versionSource || isGithub,
      `${where} 的 repo 不是 GitHub 地址，必须给 acquire.version（写死）或 acquire.versionSource（查厂商端点）`
    );
    if (acq.versionSource) {
      assert.ok(
        ['url-json', 'url-text'].includes(acq.versionSource.kind),
        `${where} 的 acquire.versionSource.kind 只能是 url-json / url-text`
      );
      assert.ok(acq.versionSource.url, `${where} 的 acquire.versionSource 需要 url`);
    }

    // 官方 Agent 文档：不在发布包里，单独取源码，规则与前缀解压一致
    const docs = acq.docs;
    if (docs) {
      assert.ok(docs.tarball, `${where} 的 acquire.docs 需要 tarball`);
      assert.ok(docs.stripPrefix, `${where} 的 acquire.docs 需要 stripPrefix`);
      assert.doesNotMatch(docs.stripPrefix, /\//, `${where} 的 acquire.docs.stripPrefix 应是单个顶层目录名`);
      assert.ok(
        Array.isArray(docs.extract) && docs.extract.length,
        `${where} 的 acquire.docs 需要 extract`
      );
      if (docs.skill) {
        assert.ok(
          docs.extract.includes(docs.skill),
          `${where} 的 acquire.docs.skill（${docs.skill}）不在 extract 列表里，会取不到`
        );
      }
    }
  }

  if (acq.kind === 'local-bin') {
    assert.ok(acq.scan, `${where} 的 local-bin 需要 acquire.scan`);
  }

  if (acq.scan) {
    assert.ok(Number(acq.scan.depth) >= 0, `${where} 的 scan.depth 必须是非负整数`);
    assert.ok(Number(acq.scan.max) > 0, `${where} 的 scan.max 必须为正整数`);
  }

  // note 会以单行引用块渲染进 CAPABILITY.md —— 换行会把引用块截断成半截
  if (entry.note !== undefined) {
    assert.equal(typeof entry.note, 'string', `${where} 的 note 应为字符串`);
    assert.ok(entry.note.trim(), `${where} 的 note 不能是空串（要表达「没有缺口」就整条删掉）`);
    assert.doesNotMatch(entry.note, /\n/, `${where} 的 note 不能换行（会渲染成半截引用块）`);
  }
}

// registry 里每个目录都应该有出处 —— 否则它就是没人能刷新的孤儿快照
const registryDir = path.join(ROOT, 'registry');
if (fs.existsSync(registryDir)) {
  for (const d of fs.readdirSync(registryDir, { withFileTypes: true })) {
    if (!d.isDirectory()) continue;
    if (d.name.startsWith('.')) continue;
    assert.ok(seen.has(d.name), `registry/${d.name}/ 没有在 clis.json 里声明 —— 加一条记录，或删掉这个目录`);
    assert.ok(
      fs.existsSync(path.join(registryDir, d.name, 'CAPABILITY.md')),
      `registry/${d.name}/ 缺少 CAPABILITY.md，跑 bin/refresh ${d.name} 生成`
    );
  }
}

// 路由里引用的 CLI 必须真实存在，否则索引会指向空
const routes = JSON.parse(fs.readFileSync(path.join(ROOT, 'routes.json'), 'utf8')).routes || [];
for (const r of routes) {
  assert.ok(seen.has(r.cli), `routes.json 里的 ${r.cli} 不在清单中`);
  assert.ok(r.intent && r.command, `routes.json 有条目缺 intent 或 command`);
}

console.log(
  `✓ 清单体检通过：${manifest.clis.length} 个 CLI、${PROFILES.size} 个解析档、${routes.length} 条路由`
);
