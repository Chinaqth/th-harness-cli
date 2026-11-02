---
name: backend-execute
description: Execute a prepared engineering.backend task through bounded authorized changes, risk-based verification and an evidence handoff for independent evaluation.
---

# Backend Execute

## Binding and entry

Implement only the execute stage for `engineering.backend` under Kernel 4.0. Follow
[DOMAIN.md](../../DOMAIN.md), [rules](../../rules/BASE.md), the [workflow](../../workflows/WORKFLOW.md),
and [evaluation contract](../../evaluators/EVALUATOR.md); consume the [prepare](../backend-prepare/SKILL.md)
handoff. Kernel owns activation, matching, scheduling and task state; execution grants no acceptance.
No routine `task.md` presentation, digest confirmation or quality checkpoint applies;
explicit user/platform authority remains binding. [REPO-MANIFEST]

Require current artifact identity, authorized scope, exact task/capability, verified backend
context, references/dependencies/tools, actual stack versions, approved invariants/access contracts,
ordered slices, acceptance/risk matrix, discovered commands and safe environments/data,
recovery decisions and unresolved inputs. Recheck drift before each dependent slice.
Missing context, capability, prerequisite, necessary semantics or authority blocks that slice;
record `needs_input` or `needs-org-input`, affected action, required evidence/decision and resolver.
Continue feasible independent work. Invalid context cannot become generic/model-native fallback;
if no Domain matches, visibly end the task and inform the user.

## Host invocation and receipt contract

The host invokes this Markdown Skill; the Kernel scheduler dispatches stages and records
receipts, without running a model or performing backend implementation. Resolve the
maintained Kernel source and actual runtime through the host installation. Its
`docs/LIFECYCLE.md`, `schemas/stage-result.schema.json`, `scripts/lifecycle.py`
(`claim`, `submit`, `record_unavailable`, `checklist`) and `scripts/task_runtime.py`
define the transport contract; do not turn their interface into an invented product command.

Before any mutation, inspect the dispatched invocation and authoritative task state.
Verify `invocation.stage` is `execute`; its `bindings` include `engineering.backend`,
the selected version and capability IDs, and this lifecycle Skill; and the routed task
and prepare handoff match the authorized objective and current artifact identity.
Verify the state's explicit `project_root` and active project bridge identify the selected
product project. Obtain these from actual host/task records, never from the Kernel checkout
or current directory. Retain the exact `invocation.id` and `invocation.context_id`.
Missing or inconsistent context prevents correlated execution: report the specific defect
to the host and hold dependent mutations instead of inventing identifiers. A binding or
context ID supplies neither authority nor evidence of execution or independent acceptance.

Keep the task envelope, route, state, implementation handoff, receipt and sanitized evidence
inside that selected product project, normally `changes/<task-id>/`; never write product-task
records into the Kernel source repository. Preserve dirty user-owned files in that project
through a recoverable snapshot or isolation where needed before changing affected files.
After inspecting actual changes and effects, save a JSON receipt for the host containing:

- `status`: exactly `completed`, `partial`, `unavailable`, or `error`, describing execution
  of this stage. `completed` requires the prepared executable scope and handoff actually
  performed; it does not assert product acceptance. Use `partial` for unfinished execution,
  including dependent slices held for missing prerequisites; `unavailable` when execution
  could not be performed; and `error` for an execution error. Record professional `blocked`,
  `needs_input` and `needs-org-input` gaps in `issues` and the handoff, never as status values.
  Writing a receipt or documenting a plan cannot make unperformed work completed.
- `context_id`: copy the exact dispatched `invocation.context_id` without replacement.
- `artifacts`: product-project-relative paths to actual changed artifacts, handoff and
  evidence. Resolve under verified `project_root`, reject absolute paths and escapes,
  and report only files whose existence and current contents were inspected.
- `checks`: objects with stable string `id`, factual `status` of `passed`, `failed`,
  `unverified`, or `not_applicable`, and an `evidence` array. Passed and failed checks require
  nonempty actual supporting evidence for the current artifacts. Planned, unavailable or
  skipped checks remain `unverified` with the reason recorded; explain exclusions. Record
  expected and observed effects and evidence boundaries, not success inferred from a plan.
- `issues`: objects with `code` and `message` for unresolved inputs, failures, held dependent
  work, recovery and resolver. Preserve incoming unresolved issues; use `resolved_issue_ids`
  only for actual incoming IDs resolved by inspected evidence. Include factual `assumptions`
  and `next_actions` arrays identifying uncertainty, safe independent work and required
  decisions/owners; never describe proposed recovery or deployment as performed.

The host submits the saved receipt through the maintained `task_runtime.py record` interface,
using the actual `--state`, original `invocation.id` as `--invocation-id`, and saved receipt
as `--result`. Confirm acceptance; reconcile rejected duplicate, stale or mismatched receipts
without relabeling them or generating replacement context IDs. On `reconcile`, inspect the
original pending invocation, existing source/data/external effects and evidence before any
further action. Submit the observed result against that original invocation; never blindly
replay a migration, write, publication or other mutation because its receipt is absent.
Unknown outcomes hold dependent work until effects can be established or safely reconciled.

If the host cannot invoke this Skill, crashes, or cannot obtain usable output, it uses the
maintained `task_runtime.py unavailable` mechanism with actual `--state`, original
`--invocation-id` and factual `--message`. Do not fabricate a successful receipt to advance
the lifecycle. Kernel receipt validation and checklist establish structural facts and
freshness only; missing independent evaluation remains unassessed.

## Execution procedure

1. Inspect current source/contracts and baseline changes against prepare. Preserve dirty
   user-owned work through a recoverable snapshot or isolation where needed; never overwrite,
   revert or misattribute it. Return material scope, stack, semantics or acceptance changes to prepare.
2. Consult official documentation for the selected protocol/runtime/framework/database/broker/client
   versions before implementation-specific decisions. Ledger PostgreSQL/RabbitMQ examples mandate
   no stack. Use only commands discovered from maintained project tooling with recorded origin,
   working directory, configuration and safe boundary; invent no commands, credentials or budgets.
3. Apply bounded, reversible implementation slices using the selected workflow lane below;
   include applicable cross-cutting controls without selecting additional routed capabilities.

| Exact task type | Actions and required observed effects |
| --- | --- |
| `backend.api-contract` | Compare old/new protocol contracts and consumers; implement payload/validation/error/security alignment; validate compatibility and accepted/rejected requests. [WEB-OAS] [WEB-OWASP] |
| `backend.service-implementation` | Implement approved server invariants and actor/resource/state/order checks; verify permitted, unauthorized, invalid-state, out-of-order and relevant competing effects. [WEB-OWASP] [WEB-PG-ISOLATION] |
| `backend.persistence` | Implement verified engine/isolation/constraint and transaction boundaries; exercise competing writes/failures and final persisted state; retry complete transactions where required, accounting separately for external effects. [WEB-PG-ISOLATION] [WEB-AWS-RETRIES] |
| `backend.migration` | Check existing data, lock/resource effects and supported application versions; sequence changes; rehearse normal/interrupted/partial execution and recovery or forward repair with authorized representative data; disclose irreversible effects. Code rollback is not data restoration. [WEB-PG-MIGRATION] [WEB-SRE-RELEASE] |
| `backend.async-processing` | Separate transport acceptance, acknowledgement and durable business completion; implement duplicate/idempotency scope, ordering, bounded in-flight work and poison disposition; test redelivery/restart and resulting effect counts. Confirmations prove no exactly-once effects. [WEB-RABBITMQ] [WEB-AWS-RETRIES] |
| `backend.dependency-resilience` | Set the retry-owning layer and supplied wait/attempt/concurrency/duration limits; justify backoff/jitter; verify idempotency or reconciliation under overload, exhaustion and timeout/lost response after an effect. Never blindly repeat ambiguous non-idempotent effects. [WEB-AWS-RETRIES] |
| `backend.service-security` | Implement protected transport, approved identity integration, endpoint/resource authorization, validation and management restrictions; test identity/access rejection and safe errors/audits/telemetry without prohibited disclosure at the actual claimed boundary. [WEB-OWASP] |
| `backend.observability` | Emit complementary traces/metrics/logs with safe correlation; exercise successes/failures and inspect collection/export; distinguish instrumentation, collection and operational alert use. [WEB-OTEL] |
| `backend.verification-delivery` | Run discovered risk-based unit/integration/system/regression/concurrency/failure/security/performance checks; inspect actual effects; prepare monitored rollout/stop/recovery handoff or perform only explicitly authorized operations. [WEB-SRE-TESTING] [WEB-SRE-RELEASE] |

4. Bind checks to prepared fixtures and expected responses, state, effect counts and signals;
   inspect actual effects beyond exit codes. Mark excluded lanes/negative paths with reasons.
   Preserve sanitized failures, unavailable environments, skipped and unassessed coverage.
   Diagnose/repair within scope and rerun affected checks after edits; continue safe independent
   slices while failed prerequisites hold only dependent work. Local/mock checks prove no real integration.
5. Hold destructive data operations, privileged access, production changes, deployment and
   publication until applicable explicit authority exists. Missing required recovery or duplicate
   safety blocks dependent operations; contain unsafe effects/disclosure and preserve safe evidence.
   Do not improvise destructive recovery. This Skill and Domain activation supply no permission.

## Independent evaluation handoff

Return current artifacts/diff and identity; implemented behavior and compatibility/data/effect
decisions; lane/risk matrix; exact commands/tools, origins, working context, sanitized inputs,
dependency/environment versions, expected/observed results and evidence locations; failures,
recovery/repair material, irreversible effects, residual risks and precise gaps/next owners.
Separate local/mock, actual dependency integration, deployed observation and independent acceptance;
distinguish proposed rollout/restoration from performed operations. Refresh affected evidence after
material changes. Hand the prepared contract and current evidence to independent evaluate;
do not self-accept or transfer earlier verdicts to changed artifacts. [WEB-SRE-TESTING] [WEB-SRE-RELEASE]
