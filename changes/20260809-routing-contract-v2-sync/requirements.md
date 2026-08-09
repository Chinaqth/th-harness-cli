# Runtime Bundle Sync and CLI Scope Requirements

1. Rebuild the deployed Runtime Bundle from Kernel `66f64c9` and Domain Packs `0ca789c`.
2. Preserve the Kernel routing contracts and Domain capabilities as authoritative Bundle content.
3. Keep the CLI public interface limited to `install`, `update`, `uninstall`, and `version`.
4. Do not implement Task Envelope resolution, Routing Plan generation, Kernel policy, or Domain professional behavior in CLI source.
5. Make update transactional, remove obsolete managed projections, preserve user guidance, and never overwrite unmanaged Skills.
6. Keep lifecycle tests isolated from ambient platform environment variables.
