---
name: ios-evaluate
description: Independently assess native iOS changes in the evaluate lifecycle stage dispatched by Harness Kernel 4.0.
---

# iOS Evaluate

## Entry and assessment boundary

Run only the actual dispatched evaluate stage for `engineering.ios`. Read the invocation,
task envelope, selected capability, supplied context, requirements and available preparation
and implementation evidence. Preserve the original invocation ID and `context_id`; bind the
assessment to the actual current artifact revision and digest. Apply [DOMAIN.md](../../DOMAIN.md),
[ownership](../../owners.json), [rules](../../rules/BASE.md),
[workflow](../../workflows/WORKFLOW.md) and [evaluator](../../evaluators/EVALUATOR.md).
Repository [architecture](../../../../../docs/ARCHITECTURE.md) and
[governance](../../../../../docs/GOVERNANCE.md) assign routing, scheduling and task state to
Kernel 4.0. The host invokes this Skill and submits the factual receipt through the existing
lifecycle interface; do not invent an invocation or dispatch repairs yourself.

Use a fresh evaluator context distinct from implementation authorship. Record evaluator
identity/role, context and the factual basis of independence; changing correlation IDs alone
is insufficient. Treat implementer self-checks as inherited evidence. If independence is
unavailable, report that cause, leave independent acceptance `unassessed` and identify blocked
criteria; feasible inspection may continue without being labeled independent acceptance.
There is no routine plan presentation, digest approval or quality gate. Honor user instructions
and action-specific platform authorization. Do not mutate evaluated source or configuration;
for review-only tasks, assess findings against the review contract without forcing changes.

## Procedure

1. **Bind inputs and freshness.** Inspect actual artifacts, project instructions, working state,
   revision/digest, requirements, affected targets and acceptance conditions. Distinguish
   inherited evidence from independently repeated checks. Verify evidence identifies its
   tested artifact/configuration; missing or stale evidence cannot support current acceptance.
   Changed artifacts invalidate the prior digest-bound assessment. Preserve earlier records
   as historical and reassess affected criteria against the current digest before claiming
   acceptance. If inputs change during assessment, disclose the mismatch and do not submit
   the old result as a verdict on new artifacts.
2. **Verify native admission and access.** Confirm actual native iOS targets, source membership,
   platform/deployment settings and destinations. A `.swift` file or exact route match alone
   proves no native iOS scope. For macOS-only, server Swift, watchOS-only or unverified native
   scope, withhold native changes and dependent execution; inspect/report scope evidence and
   missing input. Preserve actual selection: admission-blocked differs from resolver `no_match`
   and permits no fallback Domain. Discover actual schemes, configurations, commands, tools,
   SDK/language settings, services, data, devices and permissions before dependent checks.
   Never assume Xcode, simulator/device access, signing teams, credentials, minimum OS or
   framework migration. [IOS-UI] [IOS-UIKIT] [IOS-STATE] [IOS-DEVICE]
3. **Build the criterion matrix.** Derive stable criterion IDs from requirements and evaluator
   I1–I9. Record affected target/journey, expected observable result, applicable risk and
   project-supplied budgets. Select appropriate build, unit, integration, UI, performance,
   accessibility and device checks. Explain genuinely inapplicable items by scope; missing
   access is a coverage gap. Verify implementer assertions against actual artifacts and
   replay the agreed main acceptance journeys with real test inputs and observable outputs.
   A source review, compiled target or rendered screen cannot establish unexercised behavior.
   [IOS-TEST] [IOS-DEVICE]
4. **Exercise applicable behavior and negative paths.** Use the actual project architecture,
   compatibility requirements and discovered procedures; cover these surfaces when affected:

| Surface | Assessment and evidence |
| --- | --- |
| UI and state | Verify initial/loading/success/empty/error, navigation, re-entry and recovery. Inspect state owners, lifetimes, bindings and update paths. Exercise repeated requests, lifecycle exit, cancellation and delayed/out-of-order completion; check UIKit UI-thread requirements and Swift isolation/suspension assumptions. Compiler success alone proves no absence of races or stale updates. [IOS-UI] [IOS-UIKIT] [IOS-STATE] [IOS-CONCURRENCY] |
| Data | Inspect persistence/schema/serialization/cache/sync contracts. Exercise representative supported existing data and migration/recovery for changed formats. Record unsupported versions and missing retention/deletion policy; invent no compatibility guarantee or SwiftData requirement. [IOS-DATA] |
| Network | Exercise relevant success, unavailable service, transport error and malformed-response behavior. Inspect ATS settings and authorized scoped exceptions; assess lower-level networking separately. Never bypass trust evaluation; client success proves no server correctness. [IOS-NETWORK] [IOS-TEST] |
| Protection | Inspect affected iOS Keychain access/error paths, secret-free diagnostics, purpose strings and denied/unavailable resource fallback. Check actual SDK/API/data use for privacy-manifest and required-reason applicability. Redact secrets/personal data; platform declarations establish no legal or organization approval. [IOS-SECRETS] [IOS-CONSENT] [IOS-PRIVACY] |
| Accessibility | Exercise affected main tasks with relevant device/settings/assistive-technology coverage, including applicable VoiceOver, Voice Control, Switch Control and visual/media settings. Observe labels, order, operation and completion. Distinguish inspection, automated checks and exercised assistive technology; screenshots or automation alone establish no full accessibility acceptance. [IOS-ACCESSIBILITY] |
| Device and performance | Run appropriate tests against actual budgets and configurations. Verify physical-device-dependent behavior/performance on appropriate physical devices; simulator evidence supports only its exercised configuration. Missing physical-device access leaves required coverage unverified. [IOS-TEST] [IOS-DEVICE] |
| Release | When in scope and authorized, inspect account/team access, entitlements, signing, archive and intended channel. Record actual results and limits; archive validation is limited screening, not publication or full release acceptance. [IOS-DEVICE] [IOS-DISTRIBUTION] |

   Include invalid input, empty data, denied permission, unavailable dependencies, cancellation,
   repeated actions and recovery where relevant. Record untested applicable paths explicitly.
   For review-only work, verify finding accuracy, reproduction, scope and evidence; do not
   claim unexercised app behavior. [IOS-TEST] [IOS-CONCURRENCY] [IOS-CONSENT]
5. **Record criterion outcomes.** For each criterion retain requirement/applicability, expected
   versus actual result, evaluated digest and artifact references, actual scheme/configuration,
   deployment/Xcode/SDK/language/OS/destination, simulator or physical device, services/test
   data and applicable accessibility settings. Include reproducible commands/steps, execution
   time and exit/result status where available, inspectable redacted logs/result bundles/test
   reports/recordings/observations, verdict, limitations, missing input and repair/recheck steps.
   Keep evidence in the selected target project's task context, with project-relative receipt
   references. An asserted command or document proves no unperformed run. [IOS-TEST] [IOS-DEVICE]
6. **Assess without repairing.** Use the evaluator's criterion verdicts: `pass` for current
   evidence meeting the condition; `fail` for demonstrated violation; `blocked` for a concrete
   unavailable prerequisite; `unassessed` for skipped/not-run, stale or unsupported assessment.
   Record inapplicable criteria separately with scope reasons. Use project severity when
   supplied, otherwise the evaluator's Critical/Major/Minor definitions; tie demonstrated
   impact to affected users/configurations and evidence. Uncertainty is not a proven defect.
   Aggregate `fail` if any applicable criterion fails; otherwise `blocked` for a required
   blocked criterion, `unassessed` for missing required assessment, and `pass` only when all
   required applicable criteria pass on current artifacts. Preserve concurrent failures/gaps.
   A local subset, source/build/simulator checks or Pack activation alone establish no
   independent product, physical-device or release acceptance. [IOS-TEST] [IOS-DEVICE] [IOS-DISTRIBUTION]

## Receipt and handoff

Return tested behavior/configurations, criterion records, severity-bound findings, evidence,
failed/blocked/skipped coverage, residual risk, freshness limits and bounded repair/recheck
recommendations. Preserve project-specific recovery facts. Report applicable unknown private
architecture, policies, budgets, device/OS matrix, services, reviewers, acceptance/release
authority or signing/publication access as `needs-org-input`; do not invent people or permissions.

Submit under the original invocation ID and `context_id` using the actual receipt contract:
stage `status` (`completed`, `partial`, `unavailable`, `error`), project-relative `artifacts`,
`checks`, `issues`, `assumptions` and `next_actions` as applicable. Checks use stable IDs and
`passed`, `failed`, `unverified` or `not_applicable`; attach inspectable evidence to passed/failed
checks. Map blocked/unassessed/skipped criteria to `unverified` with explicit reasons; invent
no receipt enums. Return `completion` (`achieved`, `partial`, `unachieved`), matching
`evaluated_digest` and useful bounded `repair_requested` details according to actual assessment.
Missing evidence cannot become achieved completion. Stage execution status and professional
verdict are separate: completed assessment may report demonstrated failures.

If evaluation execution or independence is unavailable, report the cause and missing coverage,
never a fabricated independent verdict. Preserve ordinary failures and continue feasible checks;
stop only dependent unsupported, unsafe or unauthorized actions. Route repairs through execute
under Kernel scheduling; do not alter evaluated professional artifacts. After interruption,
reconcile actual runs and side effects under the original invocation before resuming; a missing
receipt does not justify replaying a mutation. Hand current evidence and remaining authority
needs to summary without claiming unperformed acceptance.

Source IDs resolve in the validated [source ledger](../../evidence/sources.json). Platform
citations support technical criteria; independence, verdicts and receipt/progression semantics
implement the repository's professional assessment contract.
