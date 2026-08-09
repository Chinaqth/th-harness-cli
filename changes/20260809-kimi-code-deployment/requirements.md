# Kimi Code Deployment Requirements

1. Detect Kimi Code without creating its home directory.
2. Use `KIMI_CODE_HOME` or the default `~/.kimi-code` home.
3. Project managed Skills into `$KIMI_CODE_HOME/skills` and bounded guidance into `$KIMI_CODE_HOME/AGENTS.md`.
4. Support explicit `HARNESS_PLATFORMS=kimi` and isolated `HARNESS_KIMI_SKILL_ROOT`.
5. Preserve existing Kimi guidance and never modify credentials, configuration, sessions, logs, or `SYSTEM.md`.
6. Keep install, update, and uninstall ownership-safe and idempotent.
