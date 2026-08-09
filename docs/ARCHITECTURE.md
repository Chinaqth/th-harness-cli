# Harness CLI Architecture

The CLI owns installation, transactional update, precise removal, and version reporting. Kernel governance, task routing, and Domain professional content remain authoritative in Harness Engineering.

```text
Kernel revision + Domain revision
  -> checked Runtime Bundle in the npm package
    -> ~/.harness/runtime/{kernel,domains}
      -> detected-platform adapters and Skill projections
        -> Harness Engineering consumes the deployed Runtime
```

Platform discovery is read-only and adapter-driven. An existing platform home or explicit home environment variable is evidence of installation; discovery never creates a platform directory. The Codex adapter owns a bounded guidance block and Skill projections. The Hermes adapter owns projections into `~/.hermes/skills` plus a generated `harness-runtime` Skill, while leaving identity, configuration, and memories untouched. The Kimi Code adapter owns a bounded block in `$KIMI_CODE_HOME/AGENTS.md` and projections into `$KIMI_CODE_HOME/skills`; it does not modify Kimi configuration, credentials, sessions, logs, or `SYSTEM.md`.

`harness install` validates every Bundle file before mutation, stages a complete Runtime beside the destination, switches the Runtime, writes bounded guidance where the platform supports it, creates only declared Skill links, and commits `manifest.json` plus `state/install-record.json`. Repeated installation is idempotent.

`harness update` requires both ownership records and uses the same transaction to replace an existing Runtime. It refreshes projections and removes obsolete managed links. A failed transaction restores the previous Runtime, projections, and guidance.

The Runtime manifest records exact source revisions, installed file checksums, and projections. `harness version` reads this manifest; no CLI command interprets Kernel task or routing policy.

The release Bundle includes Domain repository runtime content and administrative Skills, but excludes repository-development `.codex` configuration and Custom Agents. Those files orchestrate work inside the authoritative Domain repository and are not user-runtime policy. Functional Domain Skills are projected only when their registry entry is `active`; draft Domain content remains visible to maintainers but cannot become globally selectable.

Uninstall is the inverse operation. It requires both ownership records, rejects modified projections or Runtime files, removes only manifest-recorded platform adapters, and never modifies a product project or platform-owned identity/configuration.
