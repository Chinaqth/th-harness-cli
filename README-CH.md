# Harness Engineering CLI

Harness CLI 为当前用户安装版本锁定的 Harness Kernel 和 Enterprise Domain Runtime，并向已探测到的 AI Agent 平台部署适配器。目前支持 Codex 和 Hermes Agent。产品项目保持不变，新项目无需初始化即可被发现。

[English README](README.md)

## 安装

要求 Node.js 20 或更高版本。运行时安装不要求 Git，也不要求本地存在 Kernel 或 Domain 源码仓库。

```bash
npm install -g @chinaqth/harness-cli
harness install
```

`harness platforms` 只读探测平台。`harness install` 会验证内置 Bundle 清单和 SHA-256 校验值，把 Runtime 部署到 `~/.harness/runtime`，并只为探测到的平台安装适配器：Codex 使用 `~/.codex/AGENTS.md` 受控区块及 `~/.codex/skills`；Hermes 使用官方原生目录 `~/.hermes/skills`，并获得仅限 Hermes 的 `harness-runtime` 路由适配 Skill；共享 Skills 同时投影到 `~/.agents/skills`。安装器不会修改 Hermes 的 `config.yaml`、`SOUL.md` 或记忆文件，遇到同名非受管 Skill 时会安全失败。

探测依据为默认平台目录（`~/.codex`、`~/.hermes`）已经存在，或显式配置了 `CODEX_HOME`/`HERMES_HOME`。自动化环境可用 `HARNESS_PLATFORMS=codex,hermes` 明确选择适配器。

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

第一条命令只移除 manifest 确认所有权的 Runtime、平台 Skill 投影、状态和受控规则区块；保留平台主目录、产品项目、用户规则、非受管 Skills、Hermes 身份与记忆，以及 CLI npm 包。第二条命令才删除 CLI 程序。

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
