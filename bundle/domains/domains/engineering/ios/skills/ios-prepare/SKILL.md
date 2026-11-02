---
name: ios-prepare
description: Implement the prepare lifecycle stage for native iOS tasks dispatched by Harness Kernel 4.0.
---

# iOS Prepare

## Entry and contract

Run only the dispatched prepare stage for `engineering.ios`. Read the actual invocation,
task envelope, selected capability and supplied context/inputs; preserve the invocation ID
and `context_id`. Kernel owns route selection, scheduling and task state; the host invokes
this Skill and submits its factual receipt using the existing lifecycle interface.
Apply [DOMAIN.md](../../DOMAIN.md), [ownership](../../owners.json), [rules](../../rules/BASE.md),
[workflow](../../workflows/WORKFLOW.md) and [evaluation criteria](../../evaluators/EVALUATOR.md).
Follow repository [architecture](../../../../../docs/ARCHITECTURE.md) and
[governance](../../../../../docs/GOVERNANCE.md). There is no routine plan presentation,
digest approval or quality checkpoint. Honor existing user instructions and platform authority.

Keep task artifacts/evidence in the explicitly selected target project's task context,
using project-relative receipt artifact references. Do not put product records in the
Kernel or reusable Domain source repository. Inspect only necessary context; redact secrets.
On resumed outstanding invocation, reconcile observed side effects and retain its original
ID; a missing receipt never authorizes replaying a mutation.

## Preparation procedure

1. **Bind intent and workspace.** Establish the requested outcome, implementation versus
   review-only intent, affected repositories, acceptance journeys and exclusions. Inspect
   current project instructions and working state. Record existing user changes, affected
   files and preservation/recovery needs; do not overwrite or attribute unrelated changes.
   A review-only task receives an inspection/evidence plan without forced source mutation.
2. **Establish native admission before dependent execution.** Record actual project/workspace
   or package structure, targets, source membership, platform/deployment settings, schemes,
   destinations and relevant SwiftUI/UIKit surfaces. A narrow exact `ios.*` route selection
   or `.swift` file alone does not establish native iOS applicability. Reject macOS-only,
   server Swift and watchOS-only scope before dependent native changes. Unknown/unverified
   target scope is admission-blocked: identify missing evidence and permit only the
   inspection/reporting needed to resolve or explain it. Preserve the actual route decision;
   admission failure is not resolver `no_match` and never triggers professional fallback.
   Multiplatform projects require an identified affected native iOS target. [IOS-UI] [IOS-UIKIT] [IOS-DEVICE]
3. **Inspect compatibility and boundaries.** Record actual configurations, deployment targets,
   SDK/Xcode availability, Swift language/concurrency settings, architecture, navigation,
   state owners and lifetimes, bindings and update paths. Identify API availability/fallback
   needs and applicable UIKit UI-thread requirements, actor isolation, suspension points,
   task lifetime and cancellation. Preserve established architecture; impose no framework,
   Observation, storage or minimum-OS migration. [IOS-UI] [IOS-UIKIT] [IOS-STATE] [IOS-CONCURRENCY]
4. **Inventory dependencies and access.** Check the selected capability's required dependencies,
   tools, compatibility and permissions against observed project/environment evidence.
   Inspect dependency declarations/resolution, service/data contracts, test fixtures and
   available devices/services. Discover actual build/test steps from project configuration,
   documentation and available tools; record scheme, configuration and destination, plus
   command provenance and whether steps were inspected or run. Never invent executable
   commands, signing teams, credentials, toolchain availability or supported devices.
   Separate non-secret prerequisite status from action-specific authorization; missing
   authorization stops dependent actions. [IOS-TEST] [IOS-DEVICE] [IOS-DISTRIBUTION]
5. **Build an actionable bounded plan.** Map requirements to affected files/targets, ordered
   implementation or review steps, dependency boundaries, expected observable behavior,
   verification and recovery. Identify independent work that remains feasible when a
   prerequisite fails. Keep project-specific decisions and unresolved inputs in task context.
6. **Construct the applicable verification matrix.** For each relevant row below, record a
   stable criterion ID, requirement, target/journey, expected outcome, actual configuration,
   proposed procedure, evidence location, prerequisites and responsible role. Explain
   inapplicable rows by scope; missing access is blocked coverage, never inapplicability.

| Surface | Preparation and planned evidence |
| --- | --- |
| State and lifecycle | Owners, navigation, initial/loading/success/empty/error/re-entry transitions and observable journey checks. [IOS-UI] [IOS-UIKIT] [IOS-STATE] |
| Concurrency | UI isolation, shared state across suspension, cancellation, repeated requests and obsolete completion behavior. [IOS-CONCURRENCY] [IOS-UIKIT] |
| Data | Existing storage/schema/serialization, cache/sync contracts, supported existing-data fixtures, migration/recovery limits and policy inputs; SwiftData remains optional. [IOS-DATA] |
| Network | Client/service boundaries, success/error/unavailable behavior, secure transport and ATS exceptions; assess lower-level networking separately. [IOS-NETWORK] |
| Secrets and privacy | Small-secret Keychain handling, redacted diagnostics, protected-resource purpose strings and denied/unavailable fallback; actual SDK/API/data use and privacy-manifest applicability. Identify missing policy authority. [IOS-SECRETS] [IOS-CONSENT] [IOS-PRIVACY] |
| Accessibility | Affected main tasks, relevant settings and assistive technologies, including applicable VoiceOver, Voice Control and Switch Control; distinguish inspection, automation and exercised behavior. [IOS-ACCESSIBILITY] |
| Build, tests and devices | Risk-relevant unit/integration/UI/performance checks, project budgets and supported configurations; distinguish simulator evidence from required physical-device behavior/performance. [IOS-TEST] [IOS-DEVICE] |
| Release, when in scope | Actual account/team, entitlements, signing, channel and authorized archive/distribution prerequisites. Archive validation provides limited screening, not full release acceptance. [IOS-DEVICE] [IOS-DISTRIBUTION] |

## Outputs, failure handling and receipt

Produce inspectable scope/admission and configuration/dependency records, an actionable plan,
the verification matrix, prerequisite/access checks, evidence references and unresolved inputs.
Record `needs-org-input` for unknown private architecture, policies, acceptance/release roles,
device matrix, budgets, services or permissions; do not invent facts or authorization.
Identify independent evaluator needs; a context token alone does not prove independence.

Return the existing receipt shape with actual `context_id`, stage `status`, project-relative
`artifacts`, `checks`, `issues`, `assumptions` and `next_actions` as applicable; submit it
against the original invocation ID. Checks use stable IDs and `passed`, `failed`, `unverified`
or `not_applicable`, with evidence arrays; passed/failed checks require inspectable evidence.
Map blocked, skipped or not-run checks to `unverified` with concrete reasons. Do not invent
receipt enums or an evaluation completion verdict for preparation.

Use `completed` when preparation outputs are delivered, `partial` when only part is available,
`unavailable` when preparation cannot be performed, and `error` for a stage execution error.
These statuses describe stage execution, not native admission or product acceptance. Record
ordinary failures and diagnostics; continue feasible independent preparation. Stop unsupported,
unsafe or unauthorized dependent actions and state the exact missing prerequisite and next step.
Preparation, inspected commands and local checks establish no unperformed device, independent
product or release acceptance. [IOS-TEST] [IOS-DEVICE] [IOS-DISTRIBUTION]

Source IDs resolve in the validated [source ledger](../../evidence/sources.json).
Platform citations support technical content; receipt and progression behavior follows the repository lifecycle contract.
