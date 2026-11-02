# Lifecycle v4 Release Synchronization

CLI 1.1.0 bundles committed Kernel `38405d35fe6c16d7cdb960c03a026d275589da8c` and Domain `6ee71225947651863b48c11f1db58ae5536f6249` as release Bundle `1.1.0+38405d3.6ee7122`.

Active Domains are engineering.backend, engineering.harmonyos, engineering.ios and engineering.web. Kernel and Domain source repositories are merged into main; the Kernel pin matches the Domain commit. Sources were clean during the release build.

Kernel 39 tests and Domain 54 tests passed. CLI validation covers version reporting against package metadata, isolated installation, update, rollback, managed Skill relocation and installed routing/lifecycle behavior. The CLI suite and Bundle integrity check must pass before delivery.

These checks do not establish real-service, real-device or independent product acceptance. This synchronization does not publish to an npm registry. The existing installer retains project-specific guidance targeting when present in its prior installation record; this release does not change that behavior.
