# Release Validation

Current embedded baseline:

- CLI: `0.2.0`
- Kernel: `850027074ecc0a9909ec18309f60d8ad487e23da`
- Domain Packs: `d640ab44b3bd798e01c6cf20eb625adba7190eb3`

Run:

```bash
npm run bundle:build
npm run check
```

The suite validates isolated `HARNESS_HOME`, `CODEX_HOME`, and both Skill roots; installation without source repositories; idempotency; user guidance preservation; unmanaged Skill collision; discovery from a project without `.harness`; fail-closed routing; precise uninstall; missing ownership records; reinstall; and npm package contents.

Before release, install the generated tarball under an isolated npm prefix and repeat `install`, `doctor`, `check`, `context`, `route`, `uninstall`, and reinstall. Inspect the package listing for Git metadata, caches, temporary files, and development-machine paths.
