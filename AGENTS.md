# Harness CLI Repository Guidance

Write repository content in English by default. `README-CH.md` is the explicitly maintained Chinese companion; keep other generated repository content in English unless the user explicitly requests an authoritative locale-specific source.

This repository owns only installation, discovery, diagnostics, and deterministic routing runtime. It must not copy Kernel policy or Domain professional content.

Before completing a change:

1. Run `npm run check`.
2. Test installation with isolated `HARNESS_HOME`, `CODEX_HOME`, and Skill roots.
3. Preserve existing user guidance and never overwrite an unmanaged Skill.
4. Keep installation idempotent and uninstall limited to CLI-managed artifacts.
5. Keep the product-project contract optional: a new project must be discoverable without initialization.
