# Harness CLI Repository Guidance

Write repository content in English by default. `README-CH.md` is the explicitly maintained Chinese companion; keep other generated repository content in English unless the user explicitly requests an authoritative locale-specific source.

This repository owns only installation, update, uninstall, and version reporting for the deployed Harness Runtime. It must not implement or copy Kernel routing policy or Domain professional content.

Before completing a change:

1. Run `npm run check`.
2. Test installation with isolated `HARNESS_HOME`, `CODEX_HOME`, and Skill roots.
3. Preserve existing user guidance and never overwrite an unmanaged Skill.
4. Keep installation idempotent and uninstall limited to CLI-managed artifacts.
5. Keep product projects untouched; Harness workflow and routing behavior belongs to the deployed Kernel and Domains.
