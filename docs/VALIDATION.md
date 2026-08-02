# Release Validation

Current embedded baseline:

- CLI: `0.2.1`
- Kernel: `0ca5c027ca8fc0685e579c320864f5d39403c31b`
- Domain Packs: `a5e87f54e1ee0a2cca6215eed771639721f1a1dc`

Run:

```bash
npm run bundle:build
npm run check
```

The suite validates isolated `HARNESS_HOME`, `CODEX_HOME`, and both Skill roots; installation without source repositories; idempotency; user guidance preservation; unmanaged Skill collision; Bundle tampering; transactional reinstall rollback; discovery from a project without `.harness`; positive and fail-closed routing; duplicate overlays; Runtime drift; precise uninstall; missing ownership records; reinstall; and npm package contents.

GitHub Actions runs the suite on Node.js 20 and 22. A separate package-smoke job installs the generated tarball into isolated user, Codex, Harness, Skill, npm-prefix, and project paths. Tag and manual release checks produce a reviewed tarball artifact; publishing remains an explicit release action.

Before release, install the generated tarball under an isolated npm prefix and repeat `install`, `doctor`, `check`, `context`, `route`, `uninstall`, and reinstall. Inspect the package listing for Git metadata, caches, temporary files, and development-machine paths.
