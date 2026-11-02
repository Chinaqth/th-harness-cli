---
name: backend-summarize
description: Summarize an engineering.backend task using current scope, changes, verification and independent findings, with explicit evidence boundaries, recovery limits and next-owner decisions.
---

# Backend Summarize

## Binding and inputs

Implement only summarize for `engineering.backend` under Kernel 4.0. Follow
[DOMAIN.md](../../DOMAIN.md), [rules](../../rules/BASE.md), the [workflow](../../workflows/WORKFLOW.md)
and [evaluation contract](../../evaluators/EVALUATOR.md). Consume the actual
[prepare](../backend-prepare/SKILL.md) scope/acceptance contract,
[execute](../backend-execute/SKILL.md) changes and verification handoff, and
[evaluate](../backend-evaluate/SKILL.md) independent findings/verdict artifacts when available.
Include partial or blocked results; missing inputs must not prevent an honest summary.
Kernel owns activation, matching, scheduling and task state. Professional verdicts neither
change Kernel state nor introduce a quality gate. No routine plan/digest confirmation applies.

## Host invocation, freshness and receipt contract

The host invokes this Markdown Skill; the Kernel scheduler dispatches and records receipts
without running a model or supplying professional conclusions. Resolve the maintained Kernel
source and actual runtime through the host installation. Its `docs/LIFECYCLE.md`,
`schemas/stage-result.schema.json`, `scripts/lifecycle.py` (`claim`, `submit`,
`record_unavailable`, `checklist`) and `scripts/task_runtime.py` define the transport contract;
these interfaces do not supply a product command, permission or independent acceptance.

Inspect the dispatched invocation and authoritative task state. Verify `invocation.stage`
is `summarize`; its `bindings` include `engineering.backend`, the selected version and
capability IDs, and this lifecycle Skill; and the task and available handoffs match the
authorized objective. Verify the state's explicit `project_root` and active project bridge
identify the selected product project from actual host/task records. Never infer that root
from the Kernel checkout or current directory. Retain the exact `invocation.id` and
`invocation.context_id`; a context ID correlates a receipt and proves neither independence,
execution nor authority. Missing or inconsistent context prevents a correlated result;
report the defect to the host without inventing identifiers or using a generic fallback.

Read current artifacts, prior receipts, unresolved issues and the Kernel-derived checklist.
Inspect the state's tracked project-relative `artifacts` and current digest using maintained
`artifacts_digest(state)` semantics; compare the current digest with
`invocation.artifact_digest` and any `evaluation_digest`. Also inspect relevant wider source,
uncommitted content and environment identity: the tracked digest proves no coverage of
omitted artifacts or configuration. Preserve current versus historical evaluation explicitly,
including `evaluation_current`, `completion_at_evaluation`, and any downgraded check's
`prior_status` and freshness limitation. No missing or stale assessment becomes a current pass.

Summarize existing current facts without mutating professional artifacts or tracked reports.
Return the actual narrative in the receipt's `summary` string; do not create and add a new
summary report, receipt or evidence file to the tracked artifact set. The Kernel adds receipt
`artifacts` before recomputing the digest, so even adding a report can invalidate assessment.
Keep task envelope, route, state, receipt and sanitized evidence inside the selected product
project, normally `changes/<task-id>/`, never the Kernel source repository. A saved receipt
must stay outside the tracked set. If correction or inventory change is necessary, disclose
it and return it to the host/execute for a fresh assessment; do not silently repair during
summarize, reuse an old digest, or edit task state to preserve a verdict.

Save a JSON receipt containing:

- `status`: exactly `completed`, `partial`, `unavailable`, or `error`, describing summary-stage
  execution. `completed` means the factual reconciliation and handoff were produced, even
  when product work is partial or blocked; it asserts no product success. Use `partial` for
  unfinished summarization, `unavailable` when it could not be performed, and `error` for a
  summarization execution error. Professional verdicts and `needs_input`/`needs-org-input`
  belong in the narrative/issues, never in this top-level status.
- `context_id`: the exact dispatched `invocation.context_id`, copied without replacement.
- `summary`: actual reviewable summary text from the reconciliation procedure and handoff
  below, including retained failures, coverage limits, freshness and next-owner decisions.
  An empty field, file path or statement that a summary was written is not summary content.
- `artifacts`: omit or list only already tracked, inspected, existing product-project-relative
  files. Resolve each under verified `project_root`; reject absolute paths and escapes.
  Do not introduce new paths, including the saved receipt or a new summary report.
- `checks`: objects with stable string `id`, factual `status` of `passed`, `failed`,
  `unverified`, or `not_applicable`, and an `evidence` array. Passed/failed checks require
  nonempty actual supporting evidence for their claimed current boundary. Preserve existing
  IDs and evidence/provenance; do not relabel historical checks as newly performed or overwrite
  failed/unverified checks with narrative optimism. Planned, skipped or unavailable coverage
  remains `unverified` with reasons; exclusions explain applicability.
- `issues`: objects with `code` and `message` for factual failures, missing inputs, freshness
  or independence limits, affected claims/actions, recovery and resolver. Preserve incoming
  unresolved issues; `resolved_issue_ids` may name only actual incoming IDs resolved by
  inspected evidence. Include factual `assumptions` and `next_actions` arrays, distinguishing
  performed work from proposals, required decisions and unknown owners.

The Kernel derives the checklist from receipts and owns lifecycle state and completion.
Do not synthesize a replacement checklist, set flow state, or issue `completion`,
`evaluated_digest` or `repair_requested` as a summarize verdict. Report current genuine
independent completion exactly within its evidence boundary; retain historical completion
separately. Without current valid evaluation, target completion remains `unassessed`, not
inferred failure or success. Summary execution status is separate from every professional
verdict, environmental evidence level and business acceptance-owner decision.

The host uses the maintained `task_runtime.py record` interface with actual `--state`,
original `invocation.id` as `--invocation-id`, and saved receipt as `--result`. Confirm
acceptance; structural acceptance is no professional verdict. On `reconcile`, inspect the
original pending invocation, existing source/data/external effects, receipts and freshness
before further action, then submit the observed result against the original ID when valid.
Never blindly replay a mutation or operation because a receipt is absent. Reconcile stale,
duplicate or mismatched receipts without relabeling them or replacing context IDs.

If the host cannot invoke this Skill, crashes, or cannot obtain usable output, it uses the
maintained `task_runtime.py unavailable` mechanism with actual `--state`, original
`--invocation-id` and factual `--message`. Do not fabricate summary success or acceptance to
advance the lifecycle. The Kernel can render existing structured facts while identifying the
missing summary stage; that rendering supplies no new professional conclusion.

## Reconciliation procedure

1. Verify current artifact identity, including uncommitted content, against scope, changes,
   checks and independent assessment. Record drift and withhold unsupported current-revision
   claims; prior verdicts do not transfer after material changes. Preserve provenance and
   sanitized evidence locations; never expose secrets or private payloads. [WEB-SRE-TESTING] [WEB-OWASP]
2. Lead with concrete delivered behavior, why it addresses the authorized objective, changed
   surfaces and compatibility/data effects. Distinguish completed changes from attempted,
   unchanged or blocked scope; do not call planned behavior delivered. [WEB-OAS] [WEB-SRE-TESTING]
3. Reconcile each applicable acceptance assertion with observed effects and independent findings.
   Retain evaluator identity/independence, assessed revision, scope, severity, per-assertion and
   overall verdicts exactly within their evidence boundary; do not self-issue or upgrade acceptance.
   Required violations remain `fail`; essential unavailable assessment inputs remain `blocked`;
   untouched criteria/revisions or independence dimensions remain `unassessed`. A scoped `pass`
   requires the evaluation contract's current independent evidence. Record missing business
   acceptance decisions separately. [WEB-SRE-TESTING]
4. Keep local/static/mock checks, actual dependency integration, deployed observations and
   independent acceptance separate. For each record artifact/environment/dependency identity,
   command/tool and context, expected/observed effects, result and evidence locator. Enumerate
   baseline/new failures, unavailable, skipped and unassessed coverage with reason, consequence
   and recovery input; no evidence level implies another. [WEB-SRE-TESTING]
5. Describe proposed recovery/forward repair versus authorized performed operations: trigger,
   affected versions/data, discovered procedure, rehearsal/observed boundary, irreversible effects,
   unmet requirements and residual risks. Code rollback proves no data restoration. For release
   scope include observation/stop criteria, actual operation results and decision owner; unknown
   commands or authority remain gaps. Summary/activation grants no commit, push, publication,
   deployment, privileged access or destructive authority. [WEB-PG-MIGRATION] [WEB-SRE-RELEASE]

## Reviewable output and handoff

Return: delivered behavior and rationale; current artifact/scope references; assertion/result
matrix and independent verdict references; four separate evidence-level records; retained
failures/coverage limits; compatibility/data/recovery risks and proposed/performed operations;
then actionable decisions. Each unresolved item names affected action/claim, missing input or
authority, safe completed work, required decision and next owner (or explicit unknown role).
Route consumer adoption, business meaning, database/broker operations, security policy,
collection/alerts and release/acceptance to their actual designated owners without inventing contacts.
Use `needs_input`/`needs-org-input` for unknown project facts; hold only dependent actions/claims.
Return repairs to execute and material scope changes to prepare, then refresh affected evidence
and independent assessment. These are handoff instructions, not evidence those actions occurred.

Stable bracketed IDs resolve to the validated research ledger; repository governance supplies
Kernel boundaries and the Domain identity/scope is supported by [REPO-MANIFEST].
