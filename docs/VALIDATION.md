# Release Validation

The embedded baseline is recorded in `bundle/bundle-manifest.json` and reported by `harness version` after installation.

Run:

```bash
npm run bundle:build
npm run check
```

The suite validates isolated `HARNESS_HOME`, `CODEX_HOME`, `KIMI_CODE_HOME`, and platform Skill roots; read-only Codex, Hermes, and Kimi discovery; installation without source repositories; idempotency; user guidance preservation; unmanaged Skill collision; Bundle tampering; transactional update and rollback; obsolete managed projection cleanup; version reporting; Runtime drift; precise uninstall; missing ownership records; reinstall; and npm package contents.

GitHub Actions runs the suite on Node.js 20 and 22. A separate package-smoke job installs the generated tarball into isolated user, Codex, Harness, Skill, npm-prefix, and project paths. Tag and manual release checks produce a reviewed tarball artifact; publishing remains an explicit release action.

Before release, install the generated tarball under an isolated npm prefix and exercise `install`, `version`, `update`, `uninstall`, and reinstall. Inspect the package listing for Git metadata, caches, temporary files, and development-machine paths.
