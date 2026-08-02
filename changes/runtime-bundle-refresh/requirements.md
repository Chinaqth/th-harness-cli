# Runtime Bundle Refresh Requirements

## Objective

Refresh the embedded Runtime to the merged Kernel and Domain revisions and publish newly available administrative Skills without exposing repository-development configuration to product projects.

## Risk

G1. The change updates user-level managed Runtime content and Skill projections, but remains reversible through the manifest-driven installer and uninstaller.

## Acceptance Criteria

- The Kernel Domain pin equals the bundled Domain revision.
- Kernel and Domain source checks pass before Bundle generation.
- All Domain administrative Skills are declared in the Bundle manifest.
- Functional Skills are declared only for registry entries with `active` status.
- Draft Android content is bundled but cannot be routed or globally projected as a functional Skill.
- Domain repository `.codex` development configuration is excluded from the Runtime Bundle.
- Isolated install, upgrade, uninstall, and empty-project discovery pass.
