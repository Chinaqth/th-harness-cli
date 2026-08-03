# Runtime Bundle Refresh Requirements

## Objective

Refresh the embedded Runtime to the merged automatic Domain activation releases and publish Skills from active Domain Packs.

## Risk

G1. The update changes managed user Runtime content and Skill projections but remains manifest-driven and reversible.

## Acceptance Criteria

- The bundled Domain revision equals the Kernel source pin.
- Kernel and Domain source checks pass.
- The active `engineering.web` Pack is present in the registry.
- `web-interface-delivery` is declared and projected as an active Domain Skill.
- The draft Android Pack remains unavailable to routing.
- Isolated install, check, uninstall, and reinstall pass without modifying a product project.
