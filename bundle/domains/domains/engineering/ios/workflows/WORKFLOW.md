# Native iOS Delivery Workflow

Apply [DOMAIN.md](../DOMAIN.md), [ownership](../owners.json), and applicable [rules](../rules/BASE.md). [IOS-IDENTITY]
Repository [architecture](../../../../docs/ARCHITECTURE.md) and [governance](../../../../docs/GOVERNANCE.md) assign scheduling and task state to Kernel 4.0; the Domain supplies professional stage work.
There is no routine task-plan presentation or digest approval checkpoint. Honor user instructions and platform authorization.
Requirements, project architecture, configurations, commands and authority are discovered inputs, never reusable defaults.

## Lifecycle and evidence contract

- The host invokes only the dispatched stage and preserves its invocation ID and `context_id` when submitting the receipt under the existing Kernel lifecycle contract.
- Return stage `status`: `completed`, `partial`, `unavailable` or `error`, with artifacts, checks, issues, assumptions and next actions as applicable. Stage completion does not establish acceptance.
- Checks use stable IDs, factual `passed`, `failed`, `unverified` or `not_applicable` status and evidence references; passed/failed checks require evidence. Describe blocked/skipped coverage explicitly without inventing receipt enum values.
- Keep evidence in the selected target project's task context. Record criterion, expected/actual behavior, reproducible steps or commands, configuration, result and redacted evidence location. [IOS-TEST] [IOS-DEVICE]
- Before each dependent action, verify the selected capability, dependencies, tools/compatibility and action-specific permission. Missing prerequisites block that action, not unrelated feasible work. [IOS-DEVICE] [IOS-DISTRIBUTION]
- Reconcile observed side effects after interruption and retain the original invocation ID; never replay a mutation merely because a receipt is missing.

## 1. Prepare

**Entry:** Kernel selected this Domain and dispatched preparation; task and available project evidence are inspectable.

1. Confirm outcome, authorized implementation/review mode, acceptance journeys, affected repositories/targets and exclusions. Preserve dirty user work and identify recovery needs before source mutation.
2. Verify actual native iOS targets, target membership, platform/deployment settings, destinations and applicable SwiftUI/UIKit surfaces. A `.swift` file or `ios.*` task type alone does not establish scope. Reject macOS-only, server Swift and watchOS-only work. [IOS-UI] [IOS-UIKIT] [IOS-DEVICE]
3. Verify capability prerequisites. Resolver matching uses exact task types; metadata signals do not establish native iOS applicability. If scope is absent or unverified, record admission-blocked with evidence/missing input and withhold dependent implementation. This differs from resolver `no_match`; do not relabel it or introduce a fallback Domain.
4. Inspect actual architecture, state/lifecycle/navigation boundaries, language mode, toolchain/SDK and API availability. Identify data/service contracts and dependencies; do not mandate framework, storage or OS migration. [IOS-UI] [IOS-UIKIT] [IOS-STATE] [IOS-CONCURRENCY] [IOS-DATA]
5. Discover actual schemes, configurations, build/test commands, destinations and services from project evidence/tools. Record availability and access gaps; never invent commands, signing teams or device support. [IOS-TEST] [IOS-DEVICE]
6. Map risk and acceptance journeys to unit, integration, UI, performance, accessibility and device checks. Identify simulator limits, physical-device needs, assistive-technology coverage, independent evaluator context and project authorities. [IOS-TEST] [IOS-ACCESSIBILITY] [IOS-DEVICE]
7. Record concrete steps, affected surfaces, verification criteria, assumptions, risks and project-specific recovery. Keep unknown organization facts as `needs-org-input`; obtain missing input before dependent action.

**Output/handoff:** Scope/admission record, configuration/dependency inventory, discovered commands, verification matrix, recovery approach and access gaps for execute/evaluate. Review-only tasks receive an inspection path without forced mutation.

**Failure:** Preserve diagnostics and unresolved requirements. Continue feasible inspection; withhold unsupported, destructive or unauthorized dependent actions. Admission failure never manufactures `no_match` or alternate professional execution.

## 2. Execute

**Entry:** Dispatched execute, usable preparation and verified prerequisites for intended actions. Admission-blocked tasks permit only inspection/reporting needed to explain or resolve the block.

1. Recheck current project state, scope and changed inputs. Preserve user changes; record deviations and revise affected checks when evidence changes the approach.
2. Implement bounded changes within actual architecture/deployment availability. Make state owners, lifecycle transitions, bindings, UI isolation, async task lifetime and cancellation explicit. Cover applicable initial/loading/success/empty/error/re-entry behavior. [IOS-UI] [IOS-UIKIT] [IOS-STATE] [IOS-CONCURRENCY]
3. Verify affected data compatibility, migration/recovery expectations, service failure behavior and secure transport. Any ATS exception needs a scoped authorized decision; assess lower-level networking separately. [IOS-DATA] [IOS-NETWORK]
4. Verify applicable Keychain handling, purpose strings, denial fallback and privacy-manifest/SDK/API requirements. Redact secrets and retain missing policy decisions for the responsible authority. [IOS-SECRETS] [IOS-CONSENT] [IOS-PRIVACY]
5. Implement affected main-task accessibility behavior; distinguish inspection, automation and exercised assistive-technology checks. [IOS-ACCESSIBILITY]
6. Run selected implementation checks with discovered commands and actual configurations. Retain failures/logs; fix within scope where feasible and rerun affected checks. Separate simulator and physical-device results. [IOS-TEST] [IOS-DEVICE]
7. Perform signing, entitlement, archive/distribution actions only after verifying prerequisites, access, channel and action-specific authorization. Archive validation establishes only its limited screening result. [IOS-DEVICE] [IOS-DISTRIBUTION]
8. For review-only work, inspect relevant surfaces and collect findings/evidence using applicable criteria; do not force source/configuration changes.

**Output/handoff:** Reviewable changes or review findings, requirement-to-artifact references, implementation results/configurations, deviations, recovery details and unresolved defects/access gaps. Supply current artifacts to independent evaluation.

**Failure:** Record ordinary build/test/behavior failures and continue feasible independent work. Stop dependent unsafe/unauthorized actions. Do not bypass trust, invent credentials or widen scope to hide failures. [IOS-NETWORK] [IOS-SECRETS] [IOS-CONSENT]

## 3. Independently evaluate

**Entry:** Dispatched evaluation with current artifact digest, requirements and available evidence; evaluator context is independent of implementation authorship. Correlation IDs alone do not prove independence.

1. Establish independence and confirm actual artifacts match the dispatched digest. Read requirements and artifacts; verify implementer assertions against evidence.
2. Recheck applicability/prerequisites per criterion. Exercise risk-relevant build/unit/integration/UI/performance checks and journeys, including failure, denial, cancellation, re-entry and data compatibility where affected. [IOS-TEST] [IOS-CONCURRENCY] [IOS-DATA] [IOS-CONSENT]
3. Exercise main tasks with the relevant device/settings/assistive-technology matrix. Separate automated inspection from exercised accessibility and unavailable coverage. [IOS-ACCESSIBILITY]
4. Verify device-dependent behavior/performance on appropriate physical devices when available. Separate simulator evidence; missing device access leaves coverage unverified. Inspect authorized release evidence within its demonstrated limits. [IOS-DEVICE] [IOS-DISTRIBUTION]
5. Return criterion results, evidence, defects, gaps and `completion` (`achieved`, `partial` or `unachieved`) with matching `evaluated_digest`; use `repair_requested` for useful bounded repairs. Evaluate review-only findings against the review contract.

**Output/handoff:** Independent assessment of current artifacts, reproducible evidence/configurations, unresolved findings and repair recommendations. Do not mutate professional artifacts during evaluation.

**Failure:** If independence/tools/evaluation execution are unavailable, report unavailable with cause and missing coverage, never a fabricated verdict. Record ordinary failed criteria. Repairs return to execute under Kernel scheduling/bounds; changed artifacts invalidate the old digest-bound assessment and require reevaluation.

## 4. Summarize

**Entry:** Dispatched summary with available receipts, issues and evaluation freshness, including unavailable/partial stages.

1. State delivered behavior or review findings with artifact/evidence references and tested configurations. Distinguish implementation checks, independent assessment, simulator, physical-device and release evidence. [IOS-TEST] [IOS-DEVICE] [IOS-DISTRIBUTION]
2. List failed, blocked, skipped/unverified coverage, residual risks, stale evaluation and concrete `needs-org-input`. Local passes, archive validation and Pack activation do not establish product/device/release acceptance. [IOS-ACCESSIBILITY] [IOS-DEVICE] [IOS-DISTRIBUTION]
3. Hand product decisions to product/design authority, service contracts to service owners, policy to security/privacy/legal authority and signing/publication to release authority. Identify required roles when people are unknown.
4. Provide project-specific recovery, data/configuration limits and authorized next actions from observed facts. Return summary content and checklist fields under the existing receipt contract; do not mutate professional artifacts.

**Output:** Traceable delivery/review handoff with evidence-supported outcomes and remaining action owners; no invented acceptance or access.

**Failure:** Summarize available facts despite earlier failures and disclose unavailable stages. Kernel rendering of structured facts when summary is unavailable supplies no professional fallback conclusion.

## Sources and unresolved inputs

Source IDs resolve in the validated [source ledger](../evidence/sources.json). Lifecycle receipt semantics follow the existing Kernel protocol; platform citations support technical behavior and evidence limits.
Downstream projects supply private architecture, commands, device/OS matrices, budgets, policies, reviewers, acceptance authority, services, signing assets and publication authorization. Gaps limit dependent actions and claims, not this public baseline.
