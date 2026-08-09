# Runtime Bundle Sync and CLI Scope Contract

## Scope

- Refresh the deployed Runtime Bundle from authoritative Kernel and Domain Packs revisions.
- Expose only `harness install`, `harness update`, `harness uninstall`, and `harness version`.
- Deploy Kernel workflows, schemas, routing mechanisms, and Domain capabilities without interpreting them in the CLI.

## Boundaries

- Harness Engineering owns Task Envelope to Routing Plan conversion.
- The CLI owns only Runtime lifecycle and version reporting.
- Installation remains idempotent.
- Update requires an existing managed installation and uses an atomic replacement transaction.
- Uninstall removes only manifest-owned artifacts.
- User guidance and unmanaged Skills are preserved.

## Acceptance

- `npm run check` passes.
- Isolated tests cover install, update, obsolete projection cleanup, rollback, uninstall, and version reporting.
- Removed public commands are absent from CLI help and implementation.
