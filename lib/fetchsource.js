'use strict';

/**
 * fetchsource — 采集源获取层。
 *
 * 不同 CLI 的「能力从哪来」不一样，但只有两种形态：
 *   1. skill-repo : 厂商仓库里带 skills/*\/SKILL.md —— 下载源码压缩包，解出需要的目录
 *   2. release-bin: 能力编译在二进制里，只能跑 --help —— 取官方 release 的可执行文件
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
 * 解析 release 资产名。manifest 里给模板，用 {os} {arch} {version} 占位；
 * 不同项目命名习惯不同（apple-darwin / unknown-linux-gnu…），所以模板由 manifest 决定。
 */
function assetName(tpl, { os, arch, version }) {
  return tpl
    .replace(/\{os\}/g, os)
    .replace(/\{arch\}/g, arch)
    .replace(/\{version\}/g, version.replace(/^v/, ''));
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

  const version = await resolveVersion(spec.repo, spec.version || 'latest');
  // 各项目资产命名习惯不同，所以优先用 manifest 里的显式平台映射
  const key = `${os}-${arch}`;
  const asset =
    (spec.asset && spec.asset[key]) ||
    (spec.assetTemplate ? assetName(spec.assetTemplate, { os, arch, version }) : null);
  if (!asset) {
    throw new Error(
      `manifest 里没有为 ${key} 定义 release 资产。请补 acquire.asset["${key}"] 或 acquire.assetTemplate。`
    );
  }
  const binPath = path.join(dest, spec.binName);

  if (!force && fs.existsSync(binPath)) return { binPath, version, fetched: false };

  const url = spec.urlTemplate
    ? spec.urlTemplate.replace(/\{version\}/g, version).replace(/\{asset\}/g, asset)
    : `https://github.com/${repoSlug(spec.repo)}/releases/download/${version}/${asset}`;

  fs.mkdirSync(dest, { recursive: true });
  const archive = path.join(dest, asset);
  log(`→ 下载 ${version} 的 ${asset}`);
  await download(url, archive);

  if (asset.endsWith('.zip')) {
    const r = spawnSync('unzip', ['-o', '-q', archive, '-d', dest], { stdio: ['ignore', 'pipe', 'pipe'] });
    if (r.status !== 0) throw new Error(`解压失败：${(r.stderr || '').toString().slice(0, 200)}`);
  } else {
    const r = spawnSync('tar', ['-xzf', archive, '-C', dest], { stdio: ['ignore', 'pipe', 'pipe'] });
    if (r.status !== 0) throw new Error(`解压失败：${(r.stderr || '').toString().slice(0, 200)}`);
  }
  fs.rmSync(archive, { force: true });
  // 压缩包里可能带子目录，找一下真正的可执行文件
  if (!fs.existsSync(binPath)) {
    const found = findBin(dest, spec.binName);
    if (!found) throw new Error(`解压后没找到可执行文件 ${spec.binName}（目录：${dest}）`);
    return { binPath: found, version, fetched: true };
  }
  fs.chmodSync(binPath, 0o755);
  log(`✓ 可执行文件就绪：${path.relative(ROOT, binPath)}（${version}）`);
  return { binPath, version, fetched: true };
}

function findBin(dir, name) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      const r = findBin(p, name);
      if (r) return r;
    } else if (e.name === name || e.name === `${name}.exe`) {
      try {
        fs.chmodSync(p, 0o755);
      } catch {
        /* ignore */
      }
      return p;
    }
  }
  return null;
}

module.exports = { fetchSkillRepo, fetchReleaseBinary, resolveVersion, resolveCommit, download, repoSlug };
