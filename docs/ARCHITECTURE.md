# Harness CLI Architecture

The CLI owns installation, discovery, diagnostics, deterministic routing, and precise removal. Kernel governance and Domain professional content remain authoritative in their own repositories.

```text
Kernel revision + Domain revision
  -> checked Runtime Bundle in the npm package
    -> ~/.harness/runtime/{kernel,domains}
      -> detected-platform adapters and Skill projections
        -> optional project .harness/domains.json
```

Platform discovery is read-only and adapter-driven. An existing platform home or explicit home environment variable is evidence of installation; discovery never creates a platform directory. The Codex adapter owns a bounded guidance block and a Skill projection. The Hermes adapter owns projections into its native `~/.hermes/skills` directory plus a generated `harness-runtime` Skill that delegates policy and routing to the installed Runtime; it intentionally leaves `config.yaml`, `SOUL.md`, and memories untouched.

`harness install` validates every Bundle file before mutation, stages a complete Runtime beside the destination, switches the Runtime, writes bounded guidance where the platform supports it, creates only declared Skill links, and commits `manifest.json` plus `state/install-record.json`. A failed transaction restores the previous Runtime and guidance.

The Runtime manifest records exact source revisions, installed file checksums, and projections. Runtime commands read only installed files and never require the source Git repositories.

The release Bundle includes Domain repository runtime content and administrative Skills, but excludes repository-development `.codex` configuration and Custom Agents. Those files orchestrate work inside the authoritative Domain repository and are not user-runtime policy. Functional Domain Skills are projected only when their registry entry is `active`; draft Domain content remains visible to maintainers but cannot become globally selectable.

A product project is valid without Harness files. Its optional overlay can add stricter facts and select capabilities, but cannot weaken Kernel constraints. Routing fails closed unless a capability is registered, active, exact-version compatible, and project-enabled.

Uninstall is the inverse operation. It requires both ownership records, rejects modified projections or Runtime files, removes only manifest-recorded platform adapters, and never modifies a product project or platform-owned identity/configuration.
