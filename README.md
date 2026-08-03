# Harness Engineering CLI

Harness CLI installs a version-locked Harness Kernel and Enterprise Domain Runtime for the current user and deploys adapters to detected AI agent platforms. Codex and Hermes Agent are currently supported. Product projects stay untouched and are discoverable without initialization.

[中文说明](README-CH.md)

## Install

Requirements: Node.js 20 or newer. Git and local Kernel or Domain checkouts are not required at runtime.

```bash
npm install -g @chinaqth/harness-cli
harness install
```

`harness platforms` performs read-only platform discovery. `harness install` verifies the bundled manifest and SHA-256 checksums, deploys the Runtime under `~/.harness/runtime`, and installs only the adapters for detected platforms. Codex receives a managed block in `~/.codex/AGENTS.md` and Skills in `~/.codex/skills`; Hermes receives Skills plus a platform-only `harness-runtime` routing adapter in `~/.hermes/skills`. Shared Skills are also projected to `~/.agents/skills`. The installer does not edit Hermes `config.yaml`, `SOUL.md`, or memories, and refuses to overwrite unmanaged Skills.

Detection uses an existing default platform home (`~/.codex` or `~/.hermes`) or an explicitly configured `CODEX_HOME`/`HERMES_HOME`. For automation, set `HARNESS_PLATFORMS=codex,hermes` to select adapters explicitly.

```text
~/.harness/
├── manifest.json
├── runtime/
│   ├── kernel/
│   └── domains/
└── state/install-record.json
```

## Use

From any project, including one without a `.harness` directory:

```bash
harness doctor
harness check
harness context
harness route --task /path/to/task-envelope.json
```

Projects may opt into registered Domain capabilities with `.harness/domains.json`. Routing selects only active, exact-version, project-enabled capabilities. Missing capability produces a traceable `unroutable` result.

## Uninstall

```bash
harness uninstall
npm uninstall -g @chinaqth/harness-cli
```

The first command removes only manifest-owned Runtime files, platform Skill projections, state, and managed guidance blocks. It preserves platform homes, product projects, user guidance, unmanaged Skills, Hermes identity and memory, and the npm package. The second command removes the CLI package.

## Release Bundle

The Runtime is generated from authoritative repositories and is not maintained as a second policy source:

```bash
HARNESS_KERNEL_SOURCE=/path/to/kernel \
HARNESS_DOMAIN_SOURCE=/path/to/domain-packs \
npm run bundle:build
npm run check
```

The builder checks the Kernel’s immutable Domain pin, excludes Git metadata and temporary artifacts, and emits `bundle/bundle-manifest.json` with exact revisions and file checksums.

See [architecture](docs/ARCHITECTURE.md), [validation](docs/VALIDATION.md), and [rollback](docs/ROLLBACK.md).
