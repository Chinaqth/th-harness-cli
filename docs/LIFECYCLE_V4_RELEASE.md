# Lifecycle v4 Release Synchronization

CLI 1.0.0 bundles committed Kernel `db9ec08718c2f13c45e3c28d07ac353dbd7bf7eb` and Domain `3ea7d882ae251796be96b96f80290231e58f16e0` as release Bundle `1.0.0+db9ec08.3ea7d88`.

The Kernel pin matches the Domain commit. Sources were clean during the release build. Kernel 39 tests, Domain 51 tests, and CLI 23 tests passed. Bundle verification checked 905 Runtime files. CLI tests cover isolated installation, update, rollback, managed Skill relocation, and installed routing/lifecycle behavior.

These are local automated checks, not independent professional acceptance or real-device validation. Source branches are `feat/lifecycle-v4`; this delivery does not merge them into main or publish to an npm registry.
