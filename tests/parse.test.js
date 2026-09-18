#!/usr/bin/env node
'use strict';

/**
 * help 解析的回归测试。
 *
 * 这里每条断言都对应一个真实踩过的坑：解析写歪不会报错，只会让能力快照静默变差
 * —— 命令树空了、混进不存在的命令、或者版本号取成半截。都是事后翻文档才发现，
 * 所以用真实厂商的 help 片段钉住。
 */

const assert = require('node:assert/strict');
const path = require('node:path');

const {
  parseHelp,
  parseCommandLine,
  pickVersion,
  shortenHomeInText,
  stringifyRoutes,
} = require(path.join(__dirname, '..', 'bin', 'cli-cap'));

// ---------------------------------------------------------------- gh 风格
// 命令名后面带冒号；分节头是全大写的英文短语
const GH_HELP = `Work seamlessly with GitHub from the command line.

USAGE
  gh <command> <subcommand> [flags]

CORE COMMANDS
  auth:          Authenticate gh and git with GitHub
  issue:         Manage issues
  pr:            Manage pull requests
  repo:          Manage repositories

ADDITIONAL COMMANDS
  api:           Make an authenticated GitHub API request
  config:        Manage configuration for gh

HELP TOPICS
  accessibility: Learn about GitHub CLI's accessibility experiences
  exit-codes:    Exit codes used by gh
  reference:     A comprehensive reference of all gh commands

FLAGS
  --help      Show help for command
  --version   Show gh version

EXAMPLES
  $ gh issue create
`;

{
  const r = parseHelp(GH_HELP, 'gh');
  const names = r.commands.map((c) => c.name);

  assert.deepEqual(
    names,
    ['auth', 'issue', 'pr', 'repo', 'api', 'config'],
    '命令名里的冒号应被剥掉（"auth:" → "auth"），否则会去跑 `gh auth: --help`，整棵树都空'
  );
  assert.ok(
    !names.includes('accessibility') && !names.includes('exit-codes'),
    'HELP TOPICS 是「进一步了解」小节，里面的条目不是子命令，不能收进命令树'
  );
  assert.ok(
    r.commands.every((c) => c.desc),
    '每条命令都应带上说明（说明是分组列表里唯一的解释来源）'
  );
  assert.match(r.summary, /Work seamlessly/, '首段应被当作能力描述');
  assert.equal(r.usage, '', 'gh 的 USAGE 不带冒号，取不到就留空，不能瞎猜');
  assert.deepEqual(r.examples, ['$ gh issue create'], '示例应被单独收集');
}

// ---------------------------------------------------------------- 不该走回退
// 帮助里已经出现 FLAGS 分节 = 厂商本来就是结构化输出，
// 那没有 COMMANDS 节就是真没有子命令，再按缩进硬扫只会扫出假命令。
const OP_HELP = `Read the value of the field in 1Password specified by a secret reference.

Usage:  op read <reference> [flags]

Examples:
Print the secret saved in the field 'password', on the item 'db', in the vault
'app-prod':

\top read op://app-prod/db/password

Flags:
      --account string   The account to use
  -h, --help             help for read
`;

{
  const r = parseHelp(OP_HELP, 'op');
  assert.deepEqual(
    r.commands,
    [],
    '有 FLAGS 分节时不该回退扫描：Examples 里的 `op read …` 会被当成一个叫 read 的假子命令'
  );
  assert.match(r.usage, /op read <reference>/, 'usage 带冒号时应能取到');
}

// 完全没有分节头的帮助才走回退（cobra 之外的 CLIs 常这样）
const BARE_HELP = `A tool that does things.

  build     Build the project
  deploy    Deploy it
  test      Run the tests
`;

{
  const r = parseHelp(BARE_HELP, 'x');
  assert.deepEqual(
    r.commands.map((c) => c.name),
    ['build', 'deploy', 'test'],
    '没有分节头的 CLI 仍要能靠回退扫出子命令'
  );
}

// ---------------------------------------------------------------- 版本号
assert.equal(pickVersion('tencentads version v1.1.5'), '1.1.5', '\\b 在 v1.1.5 里匹配不到开头，会截成 1.5');
assert.equal(pickVersion('gh version 2.101.0 (2026-08-12)'), '2.101.0');
assert.equal(pickVersion('wps365-cli version 0.3.5'), '0.3.5');
assert.equal(pickVersion('{"version":"673dd28-dirty","commit":"abc"}'), '673dd28-dirty', 'JSON 形态优先');
assert.equal(pickVersion('no version here'), '', '取不到就留空，别硬凑');

// ---------------------------------------------------------------- 单行解析
assert.deepEqual(
  parseCommandLine('  auth:          Authenticate gh and git with GitHub', 1),
  { name: 'auth', desc: 'Authenticate gh and git with GitHub', indent: 2 }
);
assert.equal(
  parseCommandLine('  -h, --help    help for read', 1),
  null,
  '选项行不是子命令'
);

// ---------------------------------------------------------------- 本机路径脱敏
// gh copilot 的帮助里会把 $HOME 展开成真实路径打印出来。采集层不在入口折掉，
// 留档里就带上本机用户名，进版本库即泄露。这里钉住折叠规则与边界。
{
  const home = process.env.HOME;
  assert.ok(home, '测试需要有 HOME 才能验证');
  assert.equal(
    shortenHomeInText(`downloaded to ${home}/.local/share/gh/copilot.`),
    'downloaded to ~/.local/share/gh/copilot.',
    '帮助文本里的 HOME 绝对路径应折成 ~'
  );
  assert.equal(
    shortenHomeInText(`${home}/bin:${home}/.cargo/bin`),
    '~/bin:~/.cargo/bin',
    '同一行出现多次也要全部折掉'
  );
  assert.equal(
    shortenHomeInText(`${home}x/should-stay`),
    `${home}x/should-stay`,
    '前缀相同但不是 HOME 的路径不能误折（/Users/me2 ≠ /Users/me）'
  );
}

// ---------------------------------------------------------------- 路由表写回
// routes.json 里人工用空行分隔不同 CLI。直接 JSON.stringify 会把空行吃掉，
// 跑一次 remember 整份表就变成一坨。写回时必须把分组补回来。
{
  const doc = {
    _comment: '说明',
    routes: [
      { intent: '甲', cli: 'a', command: 'a1' },
      { intent: '乙', cli: 'a', command: 'a2' },
      { intent: '丙', cli: 'b', command: 'b1' },
    ],
  };
  const out = stringifyRoutes(doc);
  assert.deepEqual(JSON.parse(out), doc, '写回后必须仍是等价 JSON');
  assert.match(out, /"command": "a2"\n    \},\n\n    \{/, '同 CLI 之间不空行、换 CLI 时空一行');
  assert.match(out, /"_comment": "说明",\n  "routes":/, '顶层 _comment 要保留并排在 routes 之前');
  assert.equal(out.at(-1), '\n', '文件以换行结尾');
}

console.log(
  '✓ help 解析回归通过：带冒号的命令名、HELP TOPICS 边界、回退门槛、版本号前缀、路径脱敏、路由表写回'
);
