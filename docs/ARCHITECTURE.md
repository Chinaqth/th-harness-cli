# Harness CLI Architecture

The CLI owns installation, discovery, diagnostics, deterministic routing, and precise removal. Kernel governance and Domain professional content remain authoritative in their own repositories.

```text
Kernel revision + Domain revision
  -> checked Runtime Bundle in the npm package
    -> ~/.harness/runtime/{kernel,domains}
      -> Codex adapter and Skill projections
        -> optional project .harness/domains.json
```

`harness install` validates every Bundle file before mutation, stages a complete Runtime beside the destination, switches the Runtime, writes a bounded Codex adapter, creates only declared Skill links, and commits `manifest.json` plus `state/install-record.json`. A failed transaction restores the previous Runtime and guidance.

The Runtime manifest records exact source revisions, installed file checksums, and projections. Runtime commands read only installed files and never require the source Git repositories.

A product project is valid without Harness files. Its optional overlay can add stricter facts and select capabilities, but cannot weaken Kernel constraints. Routing fails closed unless a capability is registered, active, exact-version compatible, and project-enabled.

Uninstall is the inverse operation. It requires both ownership records, rejects modified projections or Runtime files, removes only the managed Codex block, and never modifies a product project.
