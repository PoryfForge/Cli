'use strict';

/**
 * fetchsource — 采集源获取层。
 *
 * 不同 CLI 的「能力从哪来」不一样，但只有两种形态：
 *   1. skill-repo : 厂商仓库里带 skills/*\/SKILL.md —— 下载源码压缩包，解出需要的目录
 *   2. release-bin: 能力编译在二进制里，只能跑 --help —— 取官方发布的可执行文件
 *
 * release-bin 的「官方发布在哪」各家差别很大，都靠 manifest 描述，代码不认厂商：
 *   · 托管    GitHub Releases（默认，靠 repo 推路径）
 *             厂商 CDN 直链（agilebits、x.ai…）—— 用 acquire.url 逐平台写全
 *   · 版本号  GitHub releases/latest；或 acquire.versionSource 指向厂商的版本端点
 *   · 形态    压缩包（zip / tar.gz / tgz）；或 `archive: "none"` 的裸二进制
 *
 * 这里只负责「把源拿到本地」，不含任何解析逻辑。
 * 两种方式都不会执行任何业务命令；release-bin 只会在扫描阶段跑 --help。
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');

function log(msg) {
  process.stdout.write(msg + '\n');
}

// ---------------------------------------------------------------- 平台映射

const OS_KEY = { darwin: 'darwin', linux: 'linux', win32: 'win32' };
const ARCH_KEY = { arm64: 'arm64', x64: 'x64' };

/**
 * 清单里的 repo 是给人看的完整 URL，但 GitHub API 路径和 release 下载路径都要 `owner/repo`。
 * 两种写法都接受，统一在这里归一。
 */
function repoSlug(repo) {
  const s = String(repo || '').trim().replace(/\.git$/, '').replace(/\/+$/, '');
  const m = s.match(/^(?:https?:\/\/)?(?:www\.)?github\.com\/([^/]+\/[^/]+)$/i);
  if (m) return m[1];
  if (/^[^/\s]+\/[^/\s]+$/.test(s)) return s;
  throw new Error(`看不懂的仓库地址：${repo}（应为 owner/repo 或 https://github.com/owner/repo）`);
}

/**
 * 占位符替换。下载路径（url）与归档内的文件名（asset）用同一套键，含义固定：
 *   {version}      解析出来的版本号原样（GitHub 的 tag 名常带 v，下载路径要用这个）
 *   {versionBare}  去掉 v 前缀的版本（资产文件名里通常不带 v，别混用）
 *   {os} {arch}    规范化平台键（darwin / arm64…）
 *
 * 同一个字符位置在不同项目里含义不同（gh 写 macOS、grok 写 macos、op 写 darwin），
 * 所以平台相关的部分一律由 manifest 逐平台写死，这里不做任何猜测式映射。
 */
function subst(tpl, vars) {
  return String(tpl)
    .replace(/\{versionBare\}/g, String(vars.version).replace(/^v/, ''))
    .replace(/\{version\}/g, vars.version)
    .replace(/\{os\}/g, vars.os)
    .replace(/\{arch\}/g, vars.arch)
    .replace(/\{asset\}/g, vars.asset || '');
}

// ---------------------------------------------------------------- 通用工具

async function download(url, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`下载失败 ${url} → HTTP ${res.status} ${res.statusText}`);
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  return dest;
}

/**
 * release 需要 tag：manifest 写 "latest" 时去 GitHub API 解析当前最新。
 * 注意 `/releases/latest` 会跳过预发布版本并直接 404，所以再用 releases 列表兜底。
 */
async function resolveVersion(repo, wanted) {
  if (wanted && wanted !== 'latest') return wanted;
  const slug = repoSlug(repo);
  const headers = { accept: 'application/vnd.github+json', 'user-agent': 'cli-capability-library' };
  const res = await fetch(`https://api.github.com/repos/${slug}/releases/latest`, { headers });
  if (res.ok) return (await res.json()).tag_name;
  const list = await fetch(`https://api.github.com/repos/${slug}/releases?per_page=1`, { headers });
  if (!list.ok) throw new Error(`查询 ${slug} 的 release 失败：HTTP ${res.status} / ${list.status}`);
  const arr = await list.json();
  if (!Array.isArray(arr) || !arr.length) {
    throw new Error(`${slug} 没有任何 release —— 若该 CLI 靠源码分发，请把 acquire.kind 改成 skill-repo`);
  }
  return arr[0].tag_name;
}

/**
 * 记录采集时的 commit —— 能力面会随分支移动，留个 commit 才能追溯「这份快照对应哪一版」。
 * 拿不到（离线、限流）不算失败，返回空串。
 */
async function resolveCommit(repo, ref) {
  try {
    const slug = repoSlug(repo);
    const res = await fetch(`https://api.github.com/repos/${slug}/commits/${ref}`, {
      headers: { accept: 'application/vnd.github+json', 'user-agent': 'cli-capability-library' },
    });
    if (!res.ok) return '';
    return (await res.json()).sha || '';
  } catch {
    return '';
  }
}

/**
 * 版本号从哪来。三种可能，按优先级：
 *   1. manifest 写死了具体版本（可复现性最好，但会过时）
 *   2. manifest 给了 versionSource —— 厂商自己的版本端点，不是 GitHub
 *   3. 退回 GitHub releases（默认）
 */
async function resolveVersionFrom(spec) {
  if (spec.version && spec.version !== 'latest') return spec.version;

  const vs = spec.versionSource;
  if (vs) {
    const res = await fetch(vs.url, { headers: { 'user-agent': 'cli-capability-library' } });
    if (!res.ok) throw new Error(`查版本失败 ${vs.url} → HTTP ${res.status}`);
    if (vs.kind === 'url-json') {
      const body = await res.json();
      const got = String(vs.path || 'version')
        .split('.')
        .reduce((acc, k) => (acc == null ? acc : acc[k]), body);
      if (!got) throw new Error(`版本端点 ${vs.url} 里没有 ${vs.path || 'version'} 字段`);
      return String(got);
    }
    if (vs.kind === 'url-text') {
      const line = String(await res.text()).split('\n')[0].trim();
      if (!line) throw new Error(`版本端点 ${vs.url} 返回空`);
      return line;
    }
    throw new Error(`不认识的 versionSource.kind：${vs.kind}（可用：url-json / url-text）`);
  }

  return resolveVersion(spec.repo, 'latest');
}

/**
 * 决定「下载哪个文件、从哪下」。manifest 三种写法，按优先级：
 *   1. acquire.url 逐平台写全 URL —— 非 GitHub 托管、且路径里带平台名时用这个
 *   2. acquire.urlTemplate + acquire.asset / assetTemplate
 *   3. 默认 GitHub Releases 路径
 */
function resolveDownload(spec, vars) {
  const key = `${vars.os}-${vars.arch}`;
  const version = vars.version;

  // 顶层 acquire.url 允许两种写法：逐平台的对象，或单条模板字符串
  const explicit = spec.url && typeof spec.url === 'object' ? spec.url[key] : spec.url;
  if (explicit) {
    const url = subst(explicit, { ...vars, asset: '' });
    return { url, asset: path.basename(new URL(url).pathname) };
  }

  const assetTpl = (spec.asset && spec.asset[key]) || spec.assetTemplate;
  if (!assetTpl) {
    throw new Error(
      `manifest 里没有为 ${key} 定义下载资产。请补 acquire.url["${key}"]、acquire.asset["${key}"] 或 acquire.assetTemplate。`
    );
  }
  const asset = subst(assetTpl, vars);
  const url = spec.urlTemplate
    ? subst(spec.urlTemplate, { ...vars, asset })
    : `https://github.com/${repoSlug(spec.repo)}/releases/download/${version}/${asset}`;
  return { url, asset };
}

/**
 * 压缩形态。manifest 没写就按 URL 后缀推断 —— 推不出来宁可报错，
 * 也不能猜：把裸二进制当 tar.gz 解会得到一个空目录，看起来却像「成功了」。
 */
function resolveArchive(spec, url) {
  if (spec.archive) return spec.archive;
  const p = new URL(url).pathname.toLowerCase();
  if (p.endsWith('.zip')) return 'zip';
  if (p.endsWith('.tar.gz') || p.endsWith('.tgz')) return 'tar.gz';
  throw new Error(
    `无法从 URL 后缀判断压缩形态：${url}\n` +
      `（若是裸二进制请显式写 "archive": "none"，否则写 "zip" 或 "tar.gz"）`
  );
}

// ---------------------------------------------------------------- 1. skill-repo

/**
 * 下载并解出 skill 仓库里要用的部分。
 * 整个仓库往往很大（飞书 CLI 有几千个文件），所以只解 manifest 列出的路径。
 */
async function fetchSkillRepo(spec, { dest, force }) {
  const marker = path.join(dest, '.fetched');
  if (!force && fs.existsSync(marker)) return { srcDir: dest, fetched: false };

  const tar = path.join(ROOT, '.cache', `${path.basename(dest)}.${Date.now()}.tar.gz`);
  log(`→ 下载源码 ${spec.tarball}`);
  await download(spec.tarball, tar);

  fs.rmSync(dest, { recursive: true, force: true });
  fs.mkdirSync(dest, { recursive: true });
  // 顶层目录名由 GitHub 决定（<repo>-<branch>），用 --wildcards 之后按 index 剥离更稳，
  // 这里沿用 tar 的 --strip-components=1，配合 spec.stripPrefix 指定前缀。
  const args = ['-xzf', tar, '-C', dest, '--strip-components=1'];
  const items = (spec.extract || []).map((p) => `${spec.stripPrefix}/${p}`);
  const r = spawnSync('tar', [...args, ...items], { stdio: ['ignore', 'pipe', 'pipe'] });
  fs.rmSync(tar, { force: true });
  if (r.status !== 0) {
    throw new Error(
      `解压失败：${(r.stderr || '').toString().trim().slice(0, 300)}\n` +
        `（检查 clis.json 里的 stripPrefix / extract 是否与仓库结构一致）`
    );
  }
  fs.writeFileSync(marker, new Date().toISOString());
  log(`✓ 源码已更新到 ${path.relative(ROOT, dest)}/`);
  return { srcDir: dest, fetched: true };
}

// ---------------------------------------------------------------- 2. release-bin

/**
 * 取官方 release 的可执行文件到本地缓存目录。
 * 只解压，不安装到 PATH、不改动用户环境。
 */
async function fetchReleaseBinary(spec, { dest, force }) {
  const os = OS_KEY[process.platform];
  const arch = ARCH_KEY[process.arch];
  if (!os || !arch) throw new Error(`不支持的平台：${process.platform}/${process.arch}`);

  const version = await resolveVersionFrom(spec);
  const { url, asset } = resolveDownload(spec, { os, arch, version });
  const archive = resolveArchive(spec, url);

  const binPath = path.join(dest, spec.binName);
  if (!force && fs.existsSync(binPath)) return { binPath, version, fetched: false };

  fs.mkdirSync(dest, { recursive: true });

  // 裸二进制：直接落到目标名，没有解压这一步
  if (archive === 'none') {
    log(`→ 下载 ${version} 的裸二进制 ${asset}`);
    await download(url, binPath);
    fs.chmodSync(binPath, 0o755);
    log(`✓ 可执行文件就绪：${path.relative(ROOT, binPath)}（${version}）`);
    return { binPath, version, fetched: true };
  }

  const file = path.join(dest, asset);
  log(`→ 下载 ${version} 的 ${asset}`);
  await download(url, file);

  const r =
    archive === 'zip'
      ? spawnSync('unzip', ['-o', '-q', file, '-d', dest], { stdio: ['ignore', 'pipe', 'pipe'] })
      : spawnSync('tar', ['-xzf', file, '-C', dest], { stdio: ['ignore', 'pipe', 'pipe'] });
  if (r.status !== 0) {
    fs.rmSync(file, { force: true });
    throw new Error(`解压失败（${archive}）：${(r.stderr || '').toString().slice(0, 200)}`);
  }
  fs.rmSync(file, { force: true });

  // 压缩包里可能带子目录，也可能把平台名拼进文件名（tencentads_darwin_arm64），
  // 所以先按精确名找，再按 manifest 给的 pattern 找。
  let found = binPath;
  if (!fs.existsSync(found)) found = findBin(dest, spec.binName, spec.binPattern);
  if (!found) {
    throw new Error(
      `解压后没找到可执行文件 ${spec.binName}（目录：${dest}）` +
        (spec.binPattern ? `，也没匹配上 ${spec.binPattern}` : '') +
        `\n（若归档内的文件名带平台后缀，用 acquire.binPattern 描述它）`
    );
  }
  // 归一成 dest/<binName>：否则每次 refresh 都会因为「找不到 binPath」而重新下载
  if (found !== binPath) {
    fs.copyFileSync(found, binPath);
    fs.chmodSync(binPath, 0o755);
  } else {
    fs.chmodSync(binPath, 0o755);
  }
  log(`✓ 可执行文件就绪：${path.relative(ROOT, binPath)}（${version}）`);
  return { binPath, version, fetched: true };
}

/**
 * 在解压目录里找可执行文件。先精确名，再可选的 pattern（归档内名字带平台后缀时用）。
 * 同一层有多个候选时取体积最大的 —— 通常那才是真二进制，其余是签名/包装脚本。
 */
function findBin(dir, name, patternSource) {
  const hits = [];
  const re = patternSource ? new RegExp(patternSource) : null;
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name === name || e.name === `${name}.exe` || (re && re.test(e.name))) hits.push(p);
    }
  };
  walk(dir);
  if (!hits.length) return null;
  if (hits.length === 1) return hits[0];
  return hits.sort((a, b) => fs.statSync(b).size - fs.statSync(a).size)[0];
}

module.exports = {
  fetchSkillRepo,
  fetchReleaseBinary,
  resolveVersion,
  resolveVersionFrom,
  resolveDownload,
  resolveArchive,
  resolveCommit,
  subst,
  download,
  repoSlug,
};
