# Native iOS Engineering Rules

These invariants apply to `engineering.ios` within the scope and ownership in [DOMAIN.md](../DOMAIN.md) and [owners.json](../owners.json). [IOS-IDENTITY]
Platform sources support technical constraints; the evidence requirements below operationalize this Domain's professional contract.
Kernel responsibilities and failure progression follow repository [architecture](../../../../docs/ARCHITECTURE.md) and [governance](../../../../docs/GOVERNANCE.md).

For each applicable rule, retain the affected target or journey, checked configuration, result and inspectable evidence reference.
Mark a rule inapplicable with a scope-based reason; missing access is `blocked`, not inapplicability or success.
Record failures and continue feasible independent work. Stop only dependent or unauthorized actions and identify the missing input.
There is no routine task-plan presentation or digest approval checkpoint; user instructions and platform authorization remain binding.

## R1 — Compatibility and existing architecture

- **Applies:** Any source, dependency, target or build-setting change. [IOS-UI] [IOS-UIKIT] [IOS-STATE] [IOS-DEVICE]
- **Check:** Inspect actual deployment targets, SDK/toolchain and language settings, schemes and supported destinations. Match SwiftUI, UIKit and interoperability to existing architecture; justify a scoped deviation. Check introduced APIs against supported OS versions and provide an appropriate available implementation or fallback. Do not impose a universal minimum OS/toolchain, Observation adoption or framework migration.
- **Evidence:** Affected configuration inventory, API availability decisions, architecture boundary and relevant build/run results.
- **Failure:** Record the unsupported configuration; bound or revise the implementation before claiming compatibility. Unknown project settings require project input.

## R2 — State and lifecycle ownership

- **Applies:** Changes to models, views, navigation, bindings or lifecycle behavior. [IOS-UI] [IOS-UIKIT] [IOS-STATE]
- **Check:** Identify each changed state's owner, lifetime and update path, including bindings and shared model access. Preserve the app's architecture. Cover applicable initial, loading, success, empty, error and re-entry behavior in the agreed journeys.
- **Evidence:** State/lifecycle decisions linked to changed code and checks of affected observable transitions.
- **Failure:** Record conflicting ownership, lost updates or lifecycle defects and their affected journeys; do not substitute a successful render for behavior verification.

## R3 — Concurrency, UI isolation and cancellation

- **Applies:** Async work, shared mutable state, task creation or UI updates. [IOS-UIKIT] [IOS-CONCURRENCY]
- **Check:** Respect documented UIKit main-thread requirements and Swift actor isolation, including relevant MainActor boundaries. Inspect state assumptions across suspension points. Identify task ownership, termination and cooperative cancellation; prevent obsolete or cancelled work from publishing invalid UI state. Use mechanisms compatible with the actual language mode and deployment target.
- **Evidence:** Isolation/lifetime decisions, applicable compiler diagnostics and behavior checks for cancellation, repeated requests or lifecycle exit where affected.
- **Failure:** Retain diagnostics or reproduction of races/stale updates; compiling alone does not establish correct concurrency behavior.

## R4 — Data contracts and compatibility

- **Applies:** Persistence, schema, serialized data, caching or synchronization changes. [IOS-DATA]
- **Check:** Identify the existing store, affected data contract and compatibility expectations. For format/schema changes, state supported existing-data versions, migration behavior and recovery limits explicitly; verify representative existing data before claiming compatibility. Select storage for requirements and availability; SwiftData is optional. Obtain retention, deletion and synchronization policy from the project authority.
- **Evidence:** Contract/schema delta, applicable migration or compatibility fixtures and outcomes, recovery assumptions and unresolved policy inputs.
- **Failure:** Record unsupported data or migration paths; stop dependent destructive actions until handling and authority are established. Do not invent migration guarantees.

## R5 — Secure client networking

- **Applies:** Connection, endpoint, transport configuration or network dependency changes. [IOS-NETWORK]
- **Check:** Inspect connection security, error behavior and applicable ATS settings. Prefer secure standard URL-loading connections; scope and justify any ATS exception with an authorized project decision. Assess lower-level networking security explicitly because ATS does not cover it. Do not bypass trust evaluation to make a check pass or infer server correctness from client success.
- **Evidence:** Changed transport/configuration paths, exception rationale if any, and applicable success/failure connection results without secrets.
- **Failure:** Record insecure or unverified paths and affected integration checks; request missing service/security decisions and continue unrelated work.

## R6 — Secret handling

- **Applies:** Credentials, tokens, cryptographic keys, certificates or secret-bearing diagnostics. [IOS-SECRETS] [IOS-CONSENT]
- **Check:** Use appropriate iOS Keychain protection for small stored secrets; inspect access/error handling. Keep secrets out of source, fixtures, logs and evidence. Do not import macOS-specific Keychain assumptions into iOS behavior or invent credentials/access.
- **Evidence:** Storage/access design and redacted checks of affected secret-handling paths; identify configuration supplied externally.
- **Failure:** Record exposure or unavailable protection without reproducing secret values; stop the affected handling path and obtain the responsible security input.

## R7 — Protected resources and privacy applicability

- **Applies:** Sensitive data/resource access, collected data, tracking, SDK changes or required-reason APIs. [IOS-CONSENT] [IOS-PRIVACY]
- **Check:** Request protected access when needed, supply accurate purpose strings and provide useful denied/unavailable fallback. Inspect actual app/SDK behavior, privacy manifests and applicable required-reason/SDK requirements; do not assume every SDK has identical obligations. Minimize collection and protect stored/transmitted data. Obtain lawful purpose, notices and retention decisions from the designated authority.
- **Evidence:** Resource/API/SDK applicability inventory, relevant configuration and purpose strings, denial-path results and unresolved policy decisions.
- **Failure:** Record missing declarations, unsupported purpose or broken denial behavior; stop dependent access. Platform mechanisms do not establish legal compliance or organization approval.

## R8 — Accessibility of main tasks

- **Applies:** User-visible behavior, navigation, content or controls. [IOS-ACCESSIBILITY]
- **Check:** Identify affected main user tasks and a relevant device/settings/assistive-technology matrix. Exercise applicable VoiceOver, Voice Control, Switch Control and visual/media settings; inspect usable labels, order, operation and completion in the affected journey.
- **Evidence:** Task, device/OS/settings, assistive technology, steps and observed result; distinguish inspection, automated checks and exercised assistive-technology behavior.
- **Failure:** Record task barriers and unavailable coverage separately. A screenshot or automated check alone cannot establish full accessibility acceptance.

## R9 — Verification scope and evidence limits

- **Applies:** Every delivery claim. [IOS-TEST] [IOS-DEVICE] [IOS-ACCESSIBILITY]
- **Check:** Select unit, integration, UI, performance, accessibility and device checks according to changed risk and acceptance journeys. Derive actual commands from the project and available tools. Record scheme, destination, relevant OS/toolchain and results. Verify physical-device-dependent features/performance on appropriate physical devices; keep simulator results distinct.
- **Evidence:** Reproducible steps or commands, configurations, result artifacts and criterion-level pass/fail/blocked outcomes; label skipped checks with reasons. Independent evaluation must be separate from implementation authorship.
- **Failure:** Preserve failures and coverage gaps. No build, simulator run or preparation document establishes unperformed device checks, independent acceptance or release readiness.

## R10 — Permissions, release and authority

- **Applies:** Protected access, entitlements, provisioning, signing, archive, distribution or external changes. [IOS-CONSENT] [IOS-DEVICE] [IOS-DISTRIBUTION]
- **Check:** Verify actual account/team access, capabilities, signing prerequisites, intended channel and action-specific authorization before dependent actions. Honor user/platform boundaries. Never invent commands, environment availability, permission, reviewer or acceptance authority; keep unknown project facts as `needs-org-input`.
- **Evidence:** Non-secret prerequisite/access status, authorization reference, actual archive/distribution result if performed, and remaining limits. Xcode archive validation is limited automated screening.
- **Failure:** Stop unauthorized/dependent actions, record concrete missing access and continue feasible work. Do not claim TestFlight/App Store publication or product/release acceptance from archive validation.

Source IDs resolve in the validated [source ledger](../evidence/sources.json). Project-specific commands, architecture, device matrices, policy and acceptance authority belong in downstream task context, not this reusable baseline.
