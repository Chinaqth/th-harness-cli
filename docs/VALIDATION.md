# Release Validation

Current embedded baseline:

- CLI: `0.2.2`
- Kernel: `73242b4a94b958c0415e04f579d4f58dc46c3d04`
- Domain Packs: `a4ef0e468e675f2f4d339876f7e590af68b4f561`

Run:

```bash
npm run bundle:build
npm run check
```

The suite validates isolated `HARNESS_HOME`, `CODEX_HOME`, and both Skill roots; installation without source repositories; idempotency; user guidance preservation; unmanaged Skill collision; Bundle tampering; transactional reinstall rollback; discovery from a project without `.harness`; positive and fail-closed routing; duplicate overlays; Runtime drift; precise uninstall; missing ownership records; reinstall; and npm package contents.

GitHub Actions runs the suite on Node.js 20 and 22. A separate package-smoke job installs the generated tarball into isolated user, Codex, Harness, Skill, npm-prefix, and project paths. Tag and manual release checks produce a reviewed tarball artifact; publishing remains an explicit release action.

Before release, install the generated tarball under an isolated npm prefix and repeat `install`, `doctor`, `check`, `context`, `route`, `uninstall`, and reinstall. Inspect the package listing for Git metadata, caches, temporary files, and development-machine paths.
