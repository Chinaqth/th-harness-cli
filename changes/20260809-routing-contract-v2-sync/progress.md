# Runtime Bundle Sync and CLI Scope Progress

## Source revisions

- Kernel: `66f64c9e3638eed1ef77b29f7de65cdfc8188c5e`.
- Domain Packs: `0ca789ced412a5cceb4c247c3dd726fcb10b9882`.
- Bundle: `0.2.2+66f64c9.0ca789c`, with the Kernel and Domain routing content preserved as deployed artifacts.

## CLI changes

- Public commands are limited to install, update, uninstall, and version.
- Task routing, workflow selection, risk assessment, approvals, and Routing Plan generation are no longer implemented by CLI source.
- Update validates the Bundle, stages and atomically replaces the Runtime, refreshes projections, removes obsolete managed links, and restores prior state on failure.
- Version reports both the package version and installed Runtime provenance.
- Platform discovery remains an internal install/update mechanism.

## Verification

- `npm run check` passes: Bundle verification, lifecycle tests, and package dry-run.
- An isolated `HARNESS_HOME`, `CODEX_HOME`, and Skill-root journey completed:
  install → update → version → uninstall, with 30 managed projections removed.
