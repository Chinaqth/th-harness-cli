# Harness Engineering CLI

Harness CLI 为当前用户安装版本锁定的 Harness Kernel 和 Enterprise Domain Runtime。产品项目保持不变，新项目无需初始化即可被发现。

[English README](README.md)

## 安装

要求 Node.js 20 或更高版本。运行时安装不要求 Git，也不要求本地存在 Kernel 或 Domain 源码仓库。

```bash
npm install -g @chinaqth/harness-cli
harness install
```

`harness install` 会验证内置 Bundle 清单和 SHA-256 校验值，把 Runtime 部署到 `~/.harness/runtime`，在 `~/.codex/AGENTS.md` 中维护一个受控接入区块，并把清单声明的 Skills 投影到 `~/.agents/skills` 和 `~/.codex/skills`。遇到同名非受管 Skill 时会安全失败。

```text
~/.harness/
├── manifest.json
├── runtime/
│   ├── kernel/
│   └── domains/
└── state/install-record.json
```

## 使用

可从任意项目执行，包括没有 `.harness` 目录的新项目：

```bash
harness doctor
harness check
harness context
harness route --task /path/to/task-envelope.json
```

项目可通过 `.harness/domains.json` 选择已注册能力。路由只选择 `active`、版本精确匹配且项目已启用的能力；能力缺失时返回可追踪的 `unroutable`。

## 卸载

```bash
harness uninstall
npm uninstall -g @chinaqth/harness-cli
```

第一条命令只移除 manifest 确认所有权的 Runtime、Skill 投影、状态和 Codex 受控区块；保留产品项目、用户规则、非受管 Skills 和 CLI npm 包。第二条命令才删除 CLI 程序。

## 发布 Bundle

Runtime 从权威源码仓库生成，CLI 不独立维护 Kernel policy 或 Domain 专业内容：

```bash
HARNESS_KERNEL_SOURCE=/path/to/kernel \
HARNESS_DOMAIN_SOURCE=/path/to/domain-packs \
npm run bundle:build
npm run check
```

构建器会校验 Kernel 的 Domain revision pin，排除 Git 元数据和临时文件，并生成包含精确 revision 与文件校验值的 `bundle/bundle-manifest.json`。

参见[架构](docs/ARCHITECTURE.md)、[验证](docs/VALIDATION.md)和[回滚](docs/ROLLBACK.md)。
