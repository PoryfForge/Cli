'use strict';

/**
 * profiles/help-tree — 「help 全树」这种采集方式的标记档。
 *
 * 它不是一个真正的解析档：help 全树的递归抓取、解析与渲染都已经在 `bin/cli-cap`
 * 里实现并验证过了，没必要在这里重写一遍。
 *
 * 这个文件存在的意义是让「clis.json 里引用的 profile 一定有对应文件」这条不变式成立，
 * 顺便把「什么时候该用 help-tree」写清楚。
 *
 * 什么时候用：
 *   CLI 的能力**编译在二进制里**、`--help` 能完整列出来。典型是 Go 写的 CLI
 *   （如 wps365-cli，19 个顶层命令、200 个节点全部由 --help 暴露）。
 *
 * 什么时候别用：
 *   能力不在 help 里 —— 飞书 CLI 写在 skill 的「+快捷命令」表格里，
 *   企业微信 CLI 的服务目录要登录后由服务端 discovery 下发。
 *   那种情况要写真正的解析档（见 profiles/lark.js、profiles/wecom.js）。
 *
 * 对应的 clis.json 写法：
 *   "acquire": {
 *     "kind": "release-bin",        // 或 "local-bin"（厂商安装器已装进 PATH）
 *     "profile": "help-tree",
 *     "scan": { "depth": 3, "max": 900, "desc": "一句话能力描述" }
 *   }
 */

module.exports = {
  id: 'help-tree',
  /** 走 bin/cli-cap，不该被 skill-digest 当作解析档调用 */
  parse() {
    throw new Error(
      'help-tree 不是可调用的解析档：它由 bin/cli-cap 的 help 全树扫描实现。' +
        '若要把某个 CLI 改成这种采集方式，请把 acquire.kind 设为 release-bin 或 local-bin。'
    );
  },
};
