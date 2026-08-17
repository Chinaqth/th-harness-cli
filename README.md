# Harness Engineering CLI

Harness CLI installs, updates, and uninstalls a version-locked Harness Kernel and Enterprise Domain Runtime for the current user. It deploys adapters to detected AI agent platforms, currently Codex, Hermes Agent, and Kimi Code CLI, and reports installed versions. Kernel workflow and Domain routing remain owned by Harness Engineering.

[中文说明](README-CH.md)

## Install

The CLI has no remote registry deployment; it is installed from a local repository checkout. Requirements: Node.js 20 or newer and Git. Local Kernel or Domain checkouts are not required at runtime.

```bash
git clone git@github.com:Chinaqth/th-harness-cli.git
cd th-harness-cli
npm install -g .
harness install
```

To deploy on another machine, build a tarball with `npm pack`, copy it over, and run `npm install -g chinaqth-harness-cli-<version>.tgz`, then `harness install`.

`harness install` performs read-only platform discovery, verifies the bundled manifest and SHA-256 checksums, deploys the Runtime under `~/.harness/runtime`, and installs only the adapters for detected platforms. Codex receives a managed block in `~/.codex/AGENTS.md` and Skills in `~/.codex/skills`; Hermes receives Skills plus a platform-only `harness-runtime` adapter in `~/.hermes/skills`; Kimi Code receives a managed block in `$KIMI_CODE_HOME/AGENTS.md` and Skills in `$KIMI_CODE_HOME/skills` (default home: `~/.kimi-code`). Shared Skills are also projected to `~/.agents/skills`. The installer does not edit platform identity, credentials, sessions, or memories, and refuses to overwrite unmanaged Skills.

Installation makes Harness available but does not activate it for every project. To opt in, place
this exact bridge in the project root:

```json
{
  "contract_code": "harness-engineering",
  "enabled": true
}
```

Adapters compare `contract_code` first and evaluate `enabled` only after an exact match. An absent,
malformed, mismatched, or disabled bridge leaves the Kernel and Domains inactive.

Detection uses an existing default platform home (`~/.codex`, `~/.hermes`, or `~/.kimi-code`) or an explicitly configured `CODEX_HOME`, `HERMES_HOME`, or `KIMI_CODE_HOME`. For automation, set `HARNESS_PLATFORMS=codex,hermes,kimi` to select adapters explicitly. `HARNESS_KIMI_SKILL_ROOT` may override only the Kimi Skill projection directory; it does not change Kimi's own configuration or session home.

```text
~/.harness/
├── manifest.json
├── runtime/
│   ├── kernel/
│   └── domains/
└── state/install-record.json
```

## Update

```bash
harness update
```

`harness update` requires an existing managed installation. It validates and stages the new Bundle, atomically replaces the Runtime, refreshes managed guidance and Skill projections, removes obsolete managed projections, and restores the previous Runtime if the transaction fails. It never overwrites an unmanaged Skill.

## Version

```bash
harness version
harness version --json
```

The command reports the CLI version and, when installed, the Runtime Bundle, Kernel revision, and Domain revision.

## Uninstall

```bash
harness uninstall
npm uninstall -g @chinaqth/harness-cli
```

The first command removes only manifest-owned Runtime files, platform Skill projections, state, and managed guidance blocks. It preserves platform homes, product projects, user guidance, unmanaged Skills, Hermes identity and memory, and the npm package. The second command removes the CLI package.

## Release Bundle

The Runtime is generated from authoritative repositories. The CLI deploys it and does not maintain or execute a second copy of Kernel routing policy:

```bash
HARNESS_KERNEL_SOURCE=/path/to/kernel \
HARNESS_DOMAIN_SOURCE=/path/to/domain-packs \
npm run bundle:build
npm run check
```

The builder checks the Kernel’s immutable Domain pin, excludes Git metadata and temporary artifacts, and emits `bundle/bundle-manifest.json` with exact revisions and file checksums.

See [architecture](docs/ARCHITECTURE.md), [validation](docs/VALIDATION.md), and [rollback](docs/ROLLBACK.md).
