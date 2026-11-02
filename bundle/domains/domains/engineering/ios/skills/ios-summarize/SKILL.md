---
name: ios-summarize
description: Implement the summarize lifecycle stage for native iOS tasks dispatched by Harness Kernel 4.0.
---

# iOS Summarize

## Entry and authority

Run only the dispatched summarize stage for `engineering.ios`. Read the actual invocation,
task envelope, selected capability, current artifacts, stage receipts, issues and available
independent assessment. Preserve the invocation ID and `context_id`; never manufacture a
receipt for an uninvoked stage. Kernel owns routing, scheduling, freshness and task state;
the host invokes this Skill and submits its factual receipt through the existing interface.
Apply [DOMAIN.md](../../DOMAIN.md), [ownership](../../owners.json), [rules](../../rules/BASE.md),
[workflow](../../workflows/WORKFLOW.md) and [evaluator](../../evaluators/EVALUATOR.md).
Follow repository [architecture](../../../../../docs/ARCHITECTURE.md) and
[governance](../../../../../docs/GOVERNANCE.md). There is no routine plan/digest approval
checkpoint. Preserve user instructions, platform permissions and action-specific authority.

Summarize observed work, including unavailable or partial stages. Do not implement repairs,
rerun mutations, modify professional artifacts, change lifecycle state directly, commit,
publish or perform distribution as part of summary. On resumed invocation reconcile existing
outputs under its original ID; a missing receipt does not authorize replaying side effects.
Keep task evidence in the selected project context, with project-relative receipt artifact
references; do not place product records in the Kernel or reusable Domain repository.

## Reconcile evidence before drawing conclusions

1. **Bind scope and admission.** Read the requested outcome and implementation/review-only
   contract, actual affected targets and native iOS admission record. Exact `ios.*` selection
   and `.swift` files alone do not prove native iOS scope. Preserve macOS-only, server Swift,
   watchOS-only or unverified-platform admission blocks and missing prerequisites. Selected
   Domain admission failure is not resolver `no_match`; do not reroute or supply fallback
   professional execution. Report feasible inspection separately from withheld native work.
   [IOS-UI] [IOS-UIKIT] [IOS-DEVICE]
2. **Reconcile delivery.** Compare requirements, current changed artifacts and actual stage
   outputs. Identify delivered behavior or review findings, deviations and unfinished scope.
   Attribute user-owned changes accurately. Link each material requirement to its artifact,
   criterion and evidence; distinguish inspected/proposed commands from executed procedures.
   Derive paths, schemes, commands and configurations from observed project records, never
   reusable defaults. [IOS-TEST] [IOS-DEVICE]
3. **Check assessment authority and freshness.** Inspect evaluator identity and demonstrated
   independence from implementation authorship; different context IDs alone are insufficient.
   Compare actual current artifact identity with the invocation digest, evaluated digest and
   Kernel freshness record. Preserve the independent verdict and its criterion-level limits.
   Absent, stale or unsupported independence evidence leaves current independent acceptance
   `unassessed`; never supply a new verdict or upgrade implementation self-checks. Retain old
   results as historical and report the required independent evaluation/reassessment.
4. **Reconcile results and issues.** Preserve passed, failed, blocked and skipped/not-run
   coverage, including ordinary build/test/behavior failures. State whether a result was
   independently repeated or inherited, and its actual configuration and evidence location.
   Summarize solved routine issues compactly; retain material unresolved findings, severity,
   impact and missing inputs. Do not turn failures, missing access or skipped checks into
   success or inapplicability. Continue the factual handoff despite earlier stage failures.

## User-facing handoff

Return a concise summary and evidence-backed checklist covering these parallel facts:

| Item | Required content |
| --- | --- |
| Outcome and requirements | Delivered observable behavior or review findings, relevant artifact references, requirement coverage, deviations and remaining scope. No forced implementation claim for review-only work. |
| Checks and configurations | Actual procedure/result, criterion and evidence; relevant scheme, build configuration, deployment target, Xcode/SDK/language settings, OS, destination, services and test data where recorded. Do not infer untested supported configurations. [IOS-TEST] [IOS-DEVICE] |
| Evidence levels | Separate local build/static/unit/integration checks, simulator runs, physical-device behavior/performance, independently exercised journeys, product acceptance and release acceptance. Record which authority supplied each conclusion. Simulator results do not establish physical-device behavior/performance; archive validation is limited automated screening. Pack activation establishes none of these product outcomes. [IOS-TEST] [IOS-DEVICE] [IOS-DISTRIBUTION] |
| Accessibility and protection | Preserve affected main-task accessibility settings/assistive technology and whether evidence is inspection, automation or exercised behavior. Report applicable consent/denial, privacy and secret-handling gaps without exposing sensitive values; platform mechanisms do not establish legal/policy approval. [IOS-ACCESSIBILITY] [IOS-CONSENT] [IOS-PRIVACY] [IOS-SECRETS] |
| Limitations and recovery | Failed, blocked, skipped/unverified coverage, stale evaluation, residual risks and concrete recovery facts. Identify affected data/configuration versions, migration limits, preservation/backups and reversible steps only when supported by the project; otherwise state the missing recovery input. [IOS-DATA] |
| Next authority | Concrete remaining action, prerequisite and responsible role. Hand product/design decisions to that authority, service contracts to service owners, security/privacy/legal policy to its authority and signing/publication to release authority. Unknown people, supported matrices, budgets, policy, services, permissions and acceptance evidence remain `needs-org-input`; invent neither names nor authorization. [IOS-NETWORK] [IOS-CONSENT] [IOS-DEVICE] [IOS-DISTRIBUTION] |

## Receipt and freshness behavior

Own the final professional checklist content using current observed data; Kernel rendering
does not supply a professional conclusion. Return `summary`, project-relative existing
`artifacts`, `checks`, `issues`, `assumptions` and `next_actions` as applicable, with the actual
`context_id`, submitted against the original invocation ID. Issues need a `message`; resolve
prior issue IDs only with observed resolution evidence. Each check needs a stable `id`,
`status` and `evidence` array. Use `passed`, `failed`, `unverified` or `not_applicable`;
passed/failed checks require inspectable evidence. Map blocked, skipped, not-run and stale
coverage to `unverified` with explicit reasons; use scope-based reasons for inapplicability.
Do not overwrite an earlier criterion's failed/unverified result with a summary-processing
pass, or relabel historical evidence as current.

Return stage `status` as `completed` for a delivered factual handoff, `partial` for incomplete
summary output, `unavailable` when summary execution cannot be performed, or `error` for a
stage execution error. A completed summary can report failed/unassessed work; it does not
set evaluation `completion`, grant acceptance or authorize release. Do not fabricate an
evaluation receipt or change `evaluated_digest` to make old evidence appear current.

If professional artifacts have changed, disclose the change and preserve the actual receipt
and digest evidence. Under the existing Kernel contract, summary submission detects a
digest mismatch, records `summary_modified_artifacts`, clears `evaluation_digest`, sets
completion to `unassessed` and schedules reevaluation within its configured freshness bounds;
repeated instability is reported as `unstable_artifacts`. Do not bypass this behavior or
claim acceptance before current independent reassessment. Kernel also renders stale
passed/failed checklist evidence as `unverified`, retaining the prior status. Summary must
not introduce a new professional artifact merely to report results, since that changes the
evaluated artifact set. Missing summary execution permits only Kernel's factual rendering,
not fabricated Domain conclusions.

Source IDs resolve in the validated [durable source ledger](../../evidence/sources.json).
Platform citations support technical evidence limits; lifecycle and receipt behavior follows
the existing Kernel 4.0 contract.
