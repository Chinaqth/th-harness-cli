# Harness Engineering CLI

Harness CLI 为当前用户安装、更新和卸载版本锁定的 Harness Kernel 与 Enterprise Domain Runtime，并向已探测到的 AI Agent 平台（目前包括 Codex、Hermes Agent 和 Kimi Code CLI）部署适配器和报告已安装版本。Kernel 工作流与 Domain 路由仍由 Harness Engineering 负责。

[English README](README.md)

## 安装

CLI 不提供远程 registry 部署，需通过本地仓库检出进行安装。要求 Node.js 20 或更高版本以及 Git；运行时不要求本地存在 Kernel 或 Domain 源码仓库。

```bash
git clone git@github.com:Chinaqth/th-harness-cli.git
cd th-harness-cli
npm install -g .
harness install
```

如需部署到其他机器，可先执行 `npm pack` 生成 tarball，拷贝到目标机器后运行 `npm install -g chinaqth-harness-cli-<version>.tgz`，再执行 `harness install`。

`harness install` 会只读探测平台、验证内置 Bundle 清单和 SHA-256 校验值，把 Runtime 部署到 `~/.harness/runtime`，并只为探测到的平台安装适配器：Codex 使用 `~/.codex/AGENTS.md` 受控区块及 `~/.codex/skills`；Hermes 使用 `~/.hermes/skills` 并获得仅限 Hermes 的 `harness-runtime` 适配 Skill；Kimi Code 使用 `$KIMI_CODE_HOME/AGENTS.md` 受控区块及 `$KIMI_CODE_HOME/skills`（默认 Home 为 `~/.kimi-code`）。共享 Skills 同时投影到 `~/.agents/skills`。安装器不会修改平台身份、凭据、会话或记忆，遇到同名非受管 Skill 时会安全失败。

安装只代表 Harness 可用，不会对所有项目自动启用。需要接入时，在项目根目录放置：

```json
{
  "contract_code": "harness-engineering",
  "enabled": true
}
```

适配器会先精确比较 `contract_code`，匹配后才判断 `enabled`。文件缺失、无法解析、代码不匹配或未启用时，Kernel 和 Domain 保持未激活。

探测依据为默认平台目录（`~/.codex`、`~/.hermes`、`~/.kimi-code`）已经存在，或显式配置了 `CODEX_HOME`、`HERMES_HOME`、`KIMI_CODE_HOME`。自动化环境可用 `HARNESS_PLATFORMS=codex,hermes,kimi` 明确选择适配器；`HARNESS_KIMI_SKILL_ROOT` 只覆盖 Kimi Skill 投影目录，不改变 Kimi 自身的配置和会话 Home。

```text
~/.harness/
├── manifest.json
├── runtime/
│   ├── kernel/
│   └── domains/
└── state/install-record.json
```

## 更新

```bash
harness update
```

`harness update` 要求存在受管安装。它会校验并暂存新 Bundle，原子替换 Runtime，刷新受管规则和 Skill 投影，移除已废弃的受管投影，并在事务失败时恢复旧 Runtime。它不会覆盖非受管 Skill。

## 版本

```bash
harness version
harness version --json
```

该命令显示 CLI 版本；已安装 Runtime 时，还会显示 Runtime Bundle、Kernel revision 和 Domain revision。

## 卸载

```bash
harness uninstall
npm uninstall -g @chinaqth/harness-cli
```

第一条命令只移除 manifest 确认所有权的 Runtime、平台 Skill 投影、状态和受控规则区块；保留平台主目录、产品项目、用户规则、非受管 Skills、Hermes 身份与记忆，以及 CLI npm 包。第二条命令才删除 CLI 程序。

## 发布 Bundle

Runtime 从权威源码仓库生成；CLI 只负责部署，不维护或执行第二份 Kernel 路由策略：

```bash
HARNESS_KERNEL_SOURCE=/path/to/kernel \
HARNESS_DOMAIN_SOURCE=/path/to/domain-packs \
npm run bundle:build
npm run check
```

构建器会校验 Kernel 的 Domain revision pin，排除 Git 元数据和临时文件，并生成包含精确 revision 与文件校验值的 `bundle/bundle-manifest.json`。

参见[架构](docs/ARCHITECTURE.md)、[验证](docs/VALIDATION.md)和[回滚](docs/ROLLBACK.md)。
