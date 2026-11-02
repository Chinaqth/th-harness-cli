# Native iOS Task Delivery Record

Fill placeholders from observed task facts; repeat rows as needed. This template introduces no policy beyond [DOMAIN.md](../DOMAIN.md), [rules](../rules/BASE.md), [workflow](../workflows/WORKFLOW.md) and [evaluator](../evaluators/EVALUATOR.md).
Source IDs resolve in the validated [source ledger](../evidence/sources.json). Keep this completed record and inspectable evidence in the target project's task context; redact secrets and personal data.

## Task and stage identity

| Field | Task value |
| --- | --- |
| Task / requirements / authorized scope / exclusions | `<references and bounded outcome>` |
| Mode / selected Domain / capability | `<implementation or review-only; actual selection>` |
| Dispatched stage / invocation ID / context_id | `<actual dispatch identifiers>` |
| Stage status / reason | `<completed, partial, unavailable or error; execution facts>` |
| Current artifact digest / identity method | `<digest and reproducible artifact scope>` |
| Assumptions / needs-org-input | `<unknown fact, affected action, required role/input>` |

Stage completion describes execution, not professional acceptance. Do not invent invocations, results or permissions; report unavailable stages explicitly.

## Prepare: admission and execution context

| Field | Observed facts and evidence |
| --- | --- |
| Native iOS admission | `<actual target membership, platform/deployment settings, destinations; evidence>` |
| Admission outcome / affected dependent actions | `<supported scope or admission-blocked; missing evidence/input>` |
| Project baseline / user changes / recovery | `<repository and artifact identity; preserved changes; verified recovery approach>` |
| Targets / architecture / state boundaries | `<affected targets, SwiftUI/UIKit interoperability, state owners/lifetimes/navigation>` |
| Toolchain / SDK / language / API availability | `<actual settings, compatibility constraints and fallback decisions>` |
| Data / service / dependency contracts | `<actual dependency versions, schemas, endpoints/contracts and availability; no secrets>` |
| Tools / access / action-specific authority | `<prerequisite status, non-secret access evidence, authorization reference or missing input>` |
| Verification selection / independent evaluator | `<required journeys, risks, check types, evaluator role and available context>` |

A `.swift` file or task-type match alone does not establish native iOS applicability. Withhold dependent native changes for absent/unverified scope, including macOS-only, server Swift and watchOS-only tasks. Record selected-Domain admission blocks separately from resolver `no_match`; do not relabel selection or supply a fallback. Review-only work requires an inspection path without forced mutation. [IOS-IDENTITY] [IOS-UI] [IOS-UIKIT] [IOS-DEVICE]

Record discovered commands rather than prescribing reusable defaults. Verify prerequisites before each dependent action; missing access blocks that action while feasible independent work continues. [IOS-TEST] [IOS-DEVICE] [IOS-DISTRIBUTION]

| Check/action ID | Discovery reference | Actual command or steps / working context | Scheme / configuration / deployment / destination | Dependencies / permissions / availability |
| --- | --- | --- | --- | --- |
| `<ID>` | `<project/tool evidence>` | `<reproducible command or inspection steps>` | `<actual configuration>` | `<verified prerequisites or concrete block>` |

## Execute: bounded implementation or review

| Requirement / rule | Change or review finding / artifact reference | Implementation check and evidence | Deviation / unresolved issue / recovery limit |
| --- | --- | --- | --- |
| `<requirement and applicable rule>` | `<observed implementation or reproducible review finding>` | `<check ID, actual result and evidence>` | `<facts, affected scope and next action>` |

Record applicable state transitions, task lifetime/cancellation and UI isolation; data compatibility/migration/recovery; secure networking/ATS decisions; Keychain handling, privacy/SDK/API applicability and protected-resource denial; and main-task accessibility. Mark out-of-scope items with reasons, not invented results. [IOS-UI] [IOS-UIKIT] [IOS-STATE] [IOS-CONCURRENCY] [IOS-DATA] [IOS-NETWORK] [IOS-SECRETS] [IOS-PRIVACY] [IOS-CONSENT] [IOS-ACCESSIBILITY]
Retain failed diagnostics and rerun references after bounded repairs. After interruption, reconcile observed side effects before any replay; preserve invocation identity. Record review-only findings without claiming unexercised behavior.

## Independent evaluation: current-artifact acceptance

- Evaluator identity/role and basis for independence: `<context independent of implementation authorship; IDs alone are insufficient>`.
- Dispatched digest / observed digest / freshness: `<matching evaluated artifacts, changed inputs, stale assessments>`.
- Overall professional verdict and basis: `<pass, fail, blocked or unassessed under evaluator aggregation; unavailable independent assessment when applicable>`.
- Evaluation completion / repair_requested: `<achieved, partial or unachieved; bounded repair/recheck request when useful>`.

Repeat the following record for each stable criterion ID; use the evaluator's applicable I1-I9 checks and the actual task requirements. [IOS-TEST] [IOS-ACCESSIBILITY] [IOS-DEVICE]

| Criterion field | Recorded value |
| --- | --- |
| ID / requirement / applicability | `<affected target or main journey; scope reason; required or genuinely inapplicable>` |
| Expected behavior / budget | `<observable condition and project-supplied limit>` |
| Evaluated digest / artifact references | `<current identity and relevant files/configuration>` |
| Configuration | `<scheme, build configuration, deployment target, Xcode/SDK/language, OS, simulator or physical device, services/data, assistive technology/settings>` |
| Procedure / execution time / execution state | `<actual command or steps; timestamp; run, skipped, not-run or interrupted with reason>` |
| Actual behavior / exit or result status | `<observed result; explicitly unavailable where no result exists>` |
| Evidence / provenance | `<inspectable redacted logs, results, recording or observations; inherited versus independently repeated>` |
| Criterion verdict | `<pass, fail, blocked or unassessed; reason>` |
| Defect severity / impact | `<project scheme or evaluator Critical/Major/Minor; demonstrated impact, or unknown impact>` |
| Limitation / missing input / responsible role / repair | `<concrete gap, bounded remedy and recheck>` |

Keep `blocked` (missing prerequisite), skipped execution and `unassessed` (no supported assessment) distinct; skipped checks remain unassessed with reasons. Missing access is not inapplicability. Record genuinely inapplicable criteria outside the assessed set with scope reasons.
Aggregate per the evaluator: demonstrated applicable failure means `fail`; otherwise required blocks mean `blocked`, missing required assessments mean `unassessed`, and only current passes for every required applicable criterion mean `pass`. Preserve concurrent outcomes. If independence/evaluation is unavailable, disclose it without fabricating a verdict.
Changed artifacts invalidate the earlier digest-bound assessment; retain history and reevaluate current artifacts. Implementation self-checks do not establish independent acceptance.

## Handoff: outcomes, limits and next authority

| Evidence boundary | Supported result / configuration / evidence | Failed, blocked, skipped or unassessed coverage / next authority |
| --- | --- | --- |
| Local implementation checks | `<actual evidence or unavailable>` | `<remaining checks and role>` |
| Simulator | `<actual exercised configuration or unavailable>` | `<unverified configurations and role>` |
| Physical device / performance | `<actual device evidence or unavailable>` | `<device-dependent gaps and role>` |
| Accessibility | `<inspection, automation and exercised assistive-technology results separately>` | `<untested main tasks/settings and role>` |
| Independent product acceptance | `<current assessment/authority evidence or unavailable>` | `<requirements and product/design authority>` |
| Signing / archive / validation / distribution / release | `<each actual authorized result or unavailable>` | `<access, channel, authorization and release authority>` |

Simulator evidence does not establish physical-device behavior/performance; archive validation supplies limited automated screening, not full release acceptance. Local passes and Pack activation do not establish independent product/device/release acceptance. [IOS-TEST] [IOS-ACCESSIBILITY] [IOS-DEVICE] [IOS-DISTRIBUTION]

- Delivered behavior or review findings: `<artifact and evidence references; supported configurations>`.
- Residual defects/risks and limitations: `<severity, affected scope, failed/blocked/skipped/unassessed evidence and stale digest limits>`.
- Project-specific recovery: `<observed restoration steps/prerequisites, data/configuration limits, validation and unavailable recovery evidence>`.
- Next authorized actions and authority: `<action, prerequisite, evidence, responsible role; product/design, service, security/privacy/legal or release handoff as applicable>`.
- Remaining needs-org-input: `<private requirements/policies, matrix/budgets, reviewers, services, access or authorization; dependent action>`.

When producing the actual lifecycle receipt, preserve invocation/context IDs and use existing check statuses `passed`, `failed`, `unverified` or `not_applicable`. Attach evidence for passed/failed checks; map blocked/unassessed criteria to `unverified` with reasons. Keep receipt check status, stage status, completion and professional verdict separate; this Markdown record is not a replacement receipt.
