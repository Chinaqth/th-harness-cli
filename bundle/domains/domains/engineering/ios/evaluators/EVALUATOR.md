# Native iOS Change Evaluator

## Authority and entry

Evaluate the bounded task against [DOMAIN.md](../DOMAIN.md), [ownership](../owners.json), applicable [rules](../rules/BASE.md) and the [workflow](../workflows/WORKFLOW.md). [IOS-IDENTITY]
Repository [architecture](../../../../docs/ARCHITECTURE.md) and [governance](../../../../docs/GOVERNANCE.md) assign route selection, scheduling and task state to Kernel 4.0.
This contract supplies independent professional assessment; it adds no routine approval checkpoint or numeric score threshold. Pack-maintenance scoring is separate from ordinary task acceptance.

- Enter on an actual evaluation dispatch with the current artifact digest, task requirements, preparation and available implementation evidence. Do not invent invocation receipts for work that was never invoked.
- Establish an evaluator context independent of implementation authorship. Record evaluator identity/role and basis for independence; different correlation IDs alone do not demonstrate it. Implementer self-checks remain implementation evidence.
- Check the actual native iOS targets, membership, deployment/platform settings and destinations. A `.swift` file or exact task-type route match alone does not prove native iOS applicability. [IOS-UI] [IOS-UIKIT] [IOS-DEVICE]
- Distinguish resolver `no_match` from a selected Domain whose prerequisites are admission-blocked. Preserve the actual selection and missing prerequisite; do not relabel it or invoke a fallback Domain.
- For macOS-only, server Swift, watchOS-only or unverified native iOS scope, withhold native changes and dependent execution. Inspect/report the scope evidence and missing input; continue other feasible assessment within the authorized task.
- Verify tools, configurations and action-specific permissions before dependent checks. Discover commands from the project; prescribe no universal commands, device matrix, minimum OS, toolchain or framework migration. [IOS-DEVICE] [IOS-DISTRIBUTION]

## Criterion and evidence record

Create stable criterion IDs derived from the task and applicable checks below. Each record contains:

| Field | Required content |
| --- | --- |
| Requirement and applicability | Task requirement/rule, affected target or main journey, scope-based applicability reason. |
| Expected behavior | Observable acceptance condition and any project-supplied budget or compatibility limit. |
| Artifact identity | Evaluated digest and relevant file/configuration references; identify changed inputs. |
| Configuration | Actual scheme, configuration, deployment target, relevant Xcode/SDK/language settings, OS, destination, simulator or physical device, services and test data; assistive technology/settings where relevant. |
| Procedure and observation | Reproducible command or steps, expected versus actual result, execution time and exit/result status where available. |
| Evidence | Inspectable logs, result bundles, test reports, recordings or redacted observations with stable locations; identify inherited evidence and independently repeated checks. |
| Assessment | Verdict, defect severity where applicable, limitations, missing input, responsible role and bounded repair/recheck recommendation. |

Retain failing diagnostics and disclose unavailable coverage. Redact secrets and personal data without erasing the basis of a finding. A document, screenshot or asserted command does not establish an unperformed run. [IOS-TEST] [IOS-SECRETS] [IOS-CONSENT]

## Applicable verification criteria

Select checks by affected behavior and risk; justify inapplicable items. Missing access is a coverage gap, not inapplicability. Each row requires criterion-level configuration, observation and evidence. [IOS-TEST] [IOS-DEVICE]

| ID | Criterion and observable checks |
| --- | --- |
| I1 — Scope and compatibility | Confirm native iOS scope and changed target membership, actual deployment/SDK/language settings and existing SwiftUI/UIKit architecture. Inspect introduced APIs and dependencies for supported OS availability, guarded behavior/fallback and relevant build/run outcomes. Do not infer every supported configuration from one build. [IOS-UI] [IOS-UIKIT] [IOS-STATE] [IOS-DEVICE] |
| I2 — Main journey | Exercise the agreed affected user journey end to end with actual inputs and observable outputs. Cover applicable initial/loading/success/empty/error states, navigation, re-entry and recovery. Use unit/integration/UI checks suited to the boundary; a rendered screen alone does not prove completion. [IOS-UI] [IOS-UIKIT] [IOS-TEST] |
| I3 — State and cancellation | Inspect state owners, lifetime, bindings and updates; verify applicable repeated requests, lifecycle exit/re-entry, cancellation and delayed/out-of-order completion. Check UIKit UI-thread requirements and Swift isolation/suspension assumptions. Record compiler diagnostics and behavior separately; compile success does not prove absence of stale updates/races. [IOS-STATE] [IOS-UIKIT] [IOS-CONCURRENCY] |
| I4 — Data compatibility | Inspect affected persistence, schemas, serialization, caching and synchronization contracts. For changed formats, exercise representative supported existing data and migration/recovery paths before claiming compatibility. Record unsupported versions and retention/deletion policy gaps; do not invent migration guarantees or require SwiftData. [IOS-DATA] |
| I5 — Network boundaries | Exercise affected success and failure behavior, including unavailable service, transport errors and malformed responses when relevant to the contract. Inspect ATS configuration and scoped exceptions; assess lower-level networking separately. Do not bypass trust evaluation or infer server correctness from a client success. [IOS-NETWORK] [IOS-TEST] |
| I6 — Secrets, consent and privacy | Inspect affected small-secret Keychain storage/access/error behavior, secret-free logs/fixtures, protected-resource purpose strings and denied/unavailable fallback. Inspect actual SDK/API/data use for privacy-manifest and required-reason applicability. Platform declarations do not establish legal compliance or organization approval. [IOS-SECRETS] [IOS-CONSENT] [IOS-PRIVACY] |
| I7 — Accessibility | Exercise affected main tasks against the relevant device/settings/assistive-technology matrix, including applicable VoiceOver, Voice Control, Switch Control and visual/media settings. Observe labels, order, operation and task completion. Separate static inspection, automation and exercised assistive-technology results; disclose untested coverage. [IOS-ACCESSIBILITY] |
| I8 — Device and performance | Select applicable unit, integration, UI and performance checks against task requirements and actual project budgets. Verify device-dependent features/performance on appropriate physical devices. Simulator results support only their exercised configuration and do not establish physical-device behavior/performance. [IOS-TEST] [IOS-DEVICE] |
| I9 — Release boundaries | When in scope, inspect account/team access, entitlements, signing, archive, channel and action-specific authorization. Run dependent actions only with verified prerequisites/authority. Report actual archive/validation/distribution results separately; Xcode archive validation is limited automated screening, not full release acceptance or publication. [IOS-DEVICE] [IOS-DISTRIBUTION] |

Include negative paths relevant to changed behavior: invalid input, empty data, denied permission, unavailable dependency, cancellation, repeated actions and recovery where applicable. Avoid forcing unrelated checks onto a bounded change. Record untested applicable paths explicitly. [IOS-TEST] [IOS-CONCURRENCY] [IOS-CONSENT]
For review-only tasks, assess finding accuracy, reproducibility, scope and evidence against the review contract; do not force implementation changes or claim unexercised app behavior.

## Severity and verdicts

Severity describes demonstrated impact, not an automatic task-progression gate. State affected users/configurations and evidence; use a project severity scheme when supplied, otherwise:

| Severity | Meaning |
| --- | --- |
| Critical | Demonstrated severe data loss, secret exposure, unauthorized sensitive access or comparable harm in the affected scope. |
| Major | Main task cannot complete, required supported configuration fails, or material correctness/accessibility/recovery defect. |
| Minor | Bounded defect with limited impact and a usable main journey; identify the actual consequence. |

Do not label uncertainty a demonstrated defect. Record unknown impact and evidence needed to resolve it.

| Verdict | Meaning |
| --- | --- |
| `pass` | The applicable criterion was exercised/verified with current inspectable evidence meeting its stated condition in the recorded configuration. |
| `fail` | Current evidence demonstrates a criterion violation; provide reproduction, impact and severity. |
| `blocked` | An applicable criterion cannot be assessed because a concrete prerequisite, access, requirement or independent evaluator context is unavailable. Identify what is missing. |
| `unassessed` | No supported assessment exists, including skipped/not-run checks, stale evidence or interrupted execution without a result. State why; this is never success. |

Record genuinely inapplicable criteria with the scope reason outside the assessed set. For the overall professional verdict, report `fail` when any applicable criterion demonstrably fails; otherwise `blocked` when a required criterion is blocked, `unassessed` when required assessment is missing, and `pass` only when all required applicable criteria pass on the current artifacts. Preserve all individual outcomes, including concurrent failures and blocks.
A passing local subset does not establish independent product, physical-device or release acceptance. Identify the downstream authority and remaining acceptance scope without inventing people or authorization. [IOS-TEST] [IOS-DEVICE] [IOS-DISTRIBUTION]

## Receipt, failure progression and handoff

- Submit under the actual invocation ID and `context_id` using the existing lifecycle schema. Stage `status` is `completed`, `partial`, `unavailable` or `error`; it describes stage execution, not professional acceptance.
- Receipt checks use `passed`, `failed`, `unverified` or `not_applicable`; attach evidence to passed/failed checks. Map professional blocked/unassessed criteria to `unverified` with explicit reasons, never invent receipt enum values.
- Return `completion` (`achieved`, `partial` or `unachieved`), matching `evaluated_digest`, criterion records, findings, gaps and useful bounded `repair_requested` details according to the actual assessment. Do not translate missing evidence into achieved completion.
- If independence or evaluation execution is unavailable, report the cause and unavailable coverage; never fabricate an independent verdict. Continue feasible inspection and other independent checks while leaving affected criteria blocked/unassessed.
- Preserve ordinary failures and continue feasible work. Stop only dependent unsupported, unsafe or unauthorized actions. Route repairs through execute under Kernel scheduling; do not mutate the evaluated professional artifacts during assessment.
- Changed artifacts invalidate the previous digest-bound assessment. Reevaluate affected evidence against the current digest before claiming current acceptance; retain earlier records as historical.
- Hand off tested behavior/configurations, failing and blocked/skipped coverage, severity, residual risk, evidence limits, repair/recheck steps and project-specific recovery facts. Report `needs-org-input` for applicable unknown reviewers, acceptance authority, policies, device/OS matrix, budgets, services, signing or publication access.

Source IDs resolve in the validated [source ledger](../evidence/sources.json). Platform citations support technical criteria; independence, verdict aggregation and lifecycle handling implement the repository's professional assessment contract.
