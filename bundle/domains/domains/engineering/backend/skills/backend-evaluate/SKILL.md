---
name: backend-evaluate
description: Independently evaluate a prepared engineering.backend task against current artifacts, critical journeys and risk-based evidence, reporting scoped verdicts and acceptance limits.
---

# Backend Evaluate

## Binding, independence and inputs

Implement only the evaluate stage for `engineering.backend` under Kernel 4.0. Follow
[DOMAIN.md](../../DOMAIN.md), [rules](../../rules/BASE.md), the [workflow](../../workflows/WORKFLOW.md)
and [evaluation contract](../../evaluators/EVALUATOR.md); consume the [prepare](../backend-prepare/SKILL.md)
contract and [execute](../backend-execute/SKILL.md) handoff. Kernel owns activation, matching,
scheduling and task state; professional verdicts create no Kernel gate or state transition.
No routine `task.md` presentation or digest approval applies; explicit user/platform authority binds.

The host must invoke this Skill in a fresh evaluator context independent of implementation authorship. Record evaluator identity,
context/role, implementation author and independence limits; author reports are input evidence,
never self-issued independent acceptance. If fresh independent context is unavailable, retain
safe checks and mark independent acceptance `unassessed`; an attempted/planned assessment missing
essential context or authority is `blocked`. Do not invent an acceptance owner or their decision.
Missing business acceptance authority withholds that decision while feasible lifecycle work continues.

Require prepared criteria/invariants, exact task/capability and lane/risk matrix, actual context,
current artifacts/diff and digest or equivalent identity including uncommitted content, consumer
contracts, actual stack/dependency versions, discovered commands, authorized environments/data,
execution results, baseline failures and unresolved inputs. Verify identity, provenance and drift.

## Host invocation, freshness and receipt contract

The host invokes this Markdown Skill; the Kernel scheduler dispatches stages and records
receipts without running a model or supplying professional assessment. Resolve the maintained
Kernel source and actual runtime through the host installation. Its `docs/LIFECYCLE.md`,
`schemas/stage-result.schema.json`, `scripts/lifecycle.py` (`claim`, `submit`,
`record_unavailable`, `checklist`) and `scripts/task_runtime.py` define the transport contract;
these interfaces are not invented product commands.

Inspect the dispatched invocation and authoritative task state before assessment. Verify
`invocation.stage` is `evaluate`; its `bindings` include `engineering.backend`, the selected
version, capability IDs and this lifecycle Skill; and the routed task and prepare/execute
handoffs match the authorized objective. Verify the state's explicit `project_root` and active
project bridge identify the selected product project using actual host/task records, never the
Kernel checkout or current directory. Retain the exact `invocation.id` and
`invocation.context_id`. A context ID correlates a receipt; it proves neither independence,
execution nor permission. Record actual host evaluator separation and its limits. Missing or
inconsistent binding/context/project prevents a correlated assessment; report it to the host
without inventing identifiers or using generic/model-native fallback.

Keep task envelope, route, state, receipt and sanitized evidence inside that selected product
project, normally `changes/<task-id>/`; never write product-task records in the Kernel source
repository. Inspect every file in the state's tracked `artifacts` and compute the current
tracked-artifact digest using the maintained `artifacts_digest(state)` semantics. Require it
to equal the exact dispatched `invocation.artifact_digest` before and after assessment and
at submission. This digest covers the state's tracked project-relative paths and bytes; it
is not proof that an omitted relevant source, uncommitted change or deployed configuration
was assessed. Record that wider identity and any coverage gap separately.

Assess the dispatched snapshot without modifying a tracked artifact or tracked report.
Use read-only inspection and authorized isolated test fixtures; tests must not change the
tracked snapshot. Preserve detailed observations in receipt fields and safe evidence outside
the tracked set. Do not add a new receipt, evaluation report or evidence path to `artifacts`:
submission adds those paths before checking the digest and would invalidate this invocation.
If relevant files were omitted from the tracked set, or material source/configuration/report
mutation is needed, return the correction or inventory gap to the host/execute. Reconcile the
pending invocation explicitly and obtain a fresh invocation for the changed tracked snapshot;
never reuse the old digest, silently change task state, or transfer an earlier verdict.

For a genuine independent assessment, save a JSON receipt containing:

- `status`: exactly `completed`, `partial`, `unavailable`, or `error`, describing stage execution.
  `completed` requires the scoped independent assessment and handoff actually performed; a
  documented blocked criterion is not a passed criterion. Use `partial` for unfinished stage
  work and `error` for an assessment execution error. Unperformed evaluation uses the host
  unavailable path below. Professional `pass`, `fail`, `blocked`, `unassessed`, `needs_input`
  and `needs-org-input` are never top-level execution status values.
- `context_id`: copy the exact dispatched `invocation.context_id` without replacement.
- `completion`: exactly `achieved`, `partial`, or `unachieved`, with an evidence-backed statement
  about the authorized target. `achieved` requires sufficient current independent evidence for
  all required target criteria; `partial` describes a genuinely assessed target whose attainment
  is only partial or whose remaining required coverage is unresolved; `unachieved` requires
  evidence that the target is not achieved. Missing environment/authority or blocked coverage
  alone does not demonstrate target failure. Keep scoped professional verdicts and their limits
  separate; never substitute `pass`, `fail`, `blocked` or `unassessed` in this field. If no genuine
  independent target assessment can support any completion value, use unavailable instead of
  manufacturing a verdict.
- `evaluated_digest`: the exact `invocation.artifact_digest`, only after verifying it also equals
  the current tracked-artifact digest. A receipt with stale artifacts must not be submitted as current.
- `artifacts`: omit or list only already tracked, inspected, existing product-project-relative files.
  Resolve each under verified `project_root`; reject absolute paths and escapes. Do not list the
  new receipt/report or introduce any new path that changes the tracked digest.
- `checks`: objects with stable string `id`, factual `status` of `passed`, `failed`, `unverified`
  or `not_applicable`, and an `evidence` array. Passed/failed checks require nonempty actual
  supporting evidence. Planned, skipped or unavailable checks remain `unverified` with reasons;
  exclusions explain applicability. Record expected/observed effects and evidence boundaries.
- `issues`: objects with `code` and `message` for findings, blocked dependent claims, missing
  inputs, independence limits, resolver and recovery. Preserve incoming unresolved issues;
  `resolved_issue_ids` may name only actual incoming IDs resolved by inspected evidence.
  Include factual `assumptions` and `next_actions`, scoped professional verdicts and evidence
  levels, separately identifying any business acceptance-owner decision still withheld.
  Use optional `repair_requested` only for an evidenced in-scope correction returned to execute;
  Kernel owns the bounded repair loop and any exhaustion record.

The host uses the maintained `task_runtime.py record` interface with actual `--state`, original
`invocation.id` as `--invocation-id`, and saved receipt as `--result`. Confirm acceptance;
structural acceptance and checklist freshness are not independent proof of professional quality.
On `reconcile`, inspect the original pending invocation, existing source/data/external effects,
assessment evidence and freshness before further action; submit the observed result against the
original ID only if valid. Never blindly replay a mutation, test with effects or external operation
because no receipt was persisted. Reconcile duplicate, stale or mismatched receipts without
relabeling them or replacing context IDs; changed artifacts require a fresh assessment invocation.

If the host cannot invoke a fresh independent context, the evaluator crashes, output is malformed,
or no usable genuine independent assessment is possible, the host uses the maintained
`task_runtime.py unavailable` interface with actual `--state`, original `--invocation-id` and a
factual `--message`. This explicit path records absence and leaves Kernel target completion
`unassessed`; it does not prove target failure. Do not fabricate a completed receipt or invent
completion/digest fields to advance the lifecycle. Retain safe checks and professional coverage
limits as evidence without presenting them as the missing independent verdict.

## Independent assessment procedure

1. Map each applicable criterion to its BE rule, expected response/state/effects/signals, evidence
   level and safe reproducible check. Inspect actual artifacts and source contracts independently.
   Use project tooling and selected implementations' official version semantics; invent no stack,
   command, budget, credential, policy or permission. Justify excluded lanes and negative paths.
2. Reproduce the critical user/service journey and applicable negative paths below in authorized
   environments. Observe actor, initial state, requests/messages, dependency interactions, terminal
   state/effect counts and recovery results; return codes and author assertions alone are insufficient.

| Affected lane | Independent observations and risk-relevant negatives |
| --- | --- |
| `backend.api-contract` | Old/new protocol validation, consumers and compatibility; valid/rejected values, content types, errors/access and implemented runtime conformance. Contract-only scope leaves runtime acceptance unassessed. [WEB-OAS] [WEB-OWASP] |
| `backend.service-implementation` | Approved invariants/transitions; authorized effects versus unauthorized/resource-mismatched, invalid-state, out-of-order and relevant competing actions, including absence of prohibited effects. [WEB-OWASP] [WEB-PG-ISOLATION] |
| `backend.persistence` | Actual engine/version/isolation/constraints, transaction failure and concurrent writes, final state and complete-transaction retry where required; external effects separately. Mocks prove no selected-engine guarantees. [WEB-PG-ISOLATION] |
| `backend.migration` | Authorized representative existing data, before/after state, locks and supported version sequencing; interruption/partial completion and verified recovery/forward repair with irreversible effects disclosed. Code rollback proves no data restoration. [WEB-PG-MIGRATION] [WEB-SRE-RELEASE] |
| `backend.async-processing` | Acceptance/acknowledgement versus durable completion; duplicate/redelivery, restart, ordering/concurrency, ambiguous completion and poison/exhaustion disposition; in-flight bounds and effect counts. Confirms prove no exactly-once effects. [WEB-RABBITMQ] [WEB-AWS-RETRIES] |
| `backend.dependency-resilience` | Supplied wait/attempt/concurrency/duration budgets, retry owner and backoff/jitter; timeout/overload/exhaustion and lost response after effect, with duplicate-safe reconciliation. [WEB-AWS-RETRIES] |
| `backend.service-security` | Actual transport termination/delegation and rejection of disallowed unprotected access; approved identity and missing/invalid/expired identity, endpoint/resource access, validation, management restrictions and safe disclosure. [WEB-OWASP] |
| `backend.observability` | Success/failure traces, metrics/logs, safe correlation and collection/export; operational alert use separately. Inspect errors/audits/telemetry for prohibited data across affected lanes. [WEB-OTEL] |
| `backend.verification-delivery` | Candidate-bound regression/integration/system/concurrency/security/failure/performance criteria; actual release authority, rollout/stop observations and recovery evidence only where authorized and performed. [WEB-SRE-TESTING] [WEB-SRE-RELEASE] |

3. Apply cross-cutting security, data integrity, duplicate safety and telemetry risks to every affected
   lane. Use safe fixtures; preserve sanitized evidence and protected references under supplied policy,
   never secrets or private payloads. Hold unauthorized destructive/production/deployment/publication
   operations; this Skill supplies no permission. Contain demonstrated unsafe effects within authority.
4. Record per criterion: rule/contract, artifact digest/revision, evaluator/context, observation time,
   build/deployed identity, environment/dependency versions/configuration and mocks, exact command/tool,
   origin/working context, safe fixtures/preconditions, expected/observed effects, evidence locator and
   failures/skips/limits. Missing input/environment/authority blocks only dependent claims and actions.

## Verdict and summary handoff

Apply the evaluation contract's P0–P3 severity and per-assertion/scoped verdicts: `pass` requires
all required applicable assertions to have sufficient current independent evidence and no violation;
`fail` records a demonstrated required violation; `blocked` identifies essential unavailable inputs
for planned/attempted assessment; `unassessed` identifies untouched assertions/revisions/dimensions.
Overall, required violations yield fail even with blocked coverage; otherwise essential blocks prevent
pass, and untouched required criteria leave unassessed. Preserve exclusions and residual risks.
Report local/static/mock, actual dependency integration, deployed observation and independent acceptance
separately; no evidence level implies another. Return artifact identity, independence, lane/risk matrix,
journeys/negatives, reproducible findings with expected/observed behavior, severity, correction, verdicts,
coverage gaps and required input/owner to summarize. Return in-scope corrections to execute and refresh
affected evidence/assessment after changes; never transfer verdicts to changed artifacts. Distinguish
proposed rollout/recovery from performed operations. [WEB-SRE-TESTING] [WEB-SRE-RELEASE]

Stable bracketed IDs resolve to the validated research ledger; repository governance supplies Kernel boundaries.
