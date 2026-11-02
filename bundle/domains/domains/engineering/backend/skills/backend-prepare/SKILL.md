---
name: backend-prepare
description: Prepare a routed engineering.backend task by verifying backend context, capabilities, authority, dependencies and risks, then produce a bounded execution and verification contract.
---

# Backend Prepare

## Binding and inputs

Implement only the prepare stage for `engineering.backend` under Kernel 4.0. Follow
[DOMAIN.md](../../DOMAIN.md), [rules](../../rules/BASE.md), the [workflow](../../workflows/WORKFLOW.md),
and the [evaluation contract](../../evaluators/EVALUATOR.md). Read the current
[manifest](../../domain.json) and [capabilities](../../capabilities.json).
Kernel owns activation, exact task-type matching/priority, scheduling and task state;
the Domain owns professional preparation. Kernel does not enforce repository signals or capability dependencies.

Take the routed request/task type and selected capability, authorized objective/scope,
repository context, project overlay/guidance, consumer and business/access contracts,
acceptance criteria, available environments/tools and supplied authority as inputs.
Unknown project facts are explicit gaps, not defaults. Preserve explicit user/platform
authority across stages; no routine `task.md` presentation, digest approval or quality checkpoint applies.

## Host invocation and receipt contract

The host invokes this Markdown Skill; the Kernel scheduler does not run a model or perform
professional preparation. Use the maintained Kernel source selected by the host: its
`docs/LIFECYCLE.md`, `schemas/stage-result.schema.json`, and `scripts/lifecycle.py`
(`claim`, `submit`, `record_unavailable`, `checklist`) define the transport contract;
`scripts/task_runtime.py` exposes the host interface. Resolve that maintained source and
its actual runtime through the host installation, without inventing a product command.

Before preparation, inspect the dispatched invocation and authoritative task state.
Verify `invocation.stage` is `prepare`, its `bindings` include `engineering.backend`
with the selected version, capability IDs and this lifecycle Skill, and the routed task
matches the authorized objective. Verify the state's explicit `project_root` and active
project bridge against the selected product project. Obtain these from actual host/task
records; do not infer the product root from the Kernel checkout or the current directory.
Retain the exact `invocation.id` and `invocation.context_id`. Neither a context ID nor a
binding grants authority, proves actual independent execution, or establishes readiness.
Missing or inconsistent invocation context prevents a correlated result; report the
specific problem to the host instead of inventing IDs or claiming preparation succeeded.

Keep the task envelope, route, state, preparation contract, receipt and sanitized evidence
inside that selected product project, normally `changes/<task-id>/`. Never put product-task
records in the Kernel source repository. Save the bounded preparation contract there and
return a JSON receipt to the host containing:

- `status`: exactly `completed`, `partial`, `unavailable`, or `error`, describing preparation
  execution. `completed` means the preparation work and its gaps were recorded, not that
  dependent execution or product acceptance passed. Use `partial` for unfinished preparation,
  `unavailable` when it could not be performed, and `error` for a preparation execution error.
  Professional `blocked`, `needs_input` and `needs-org-input` gaps belong in `issues` and the
  contract, never in the top-level status.
- `context_id`: the exact dispatched `invocation.context_id`, copied without replacement.
- `artifacts`: project-relative file paths to the actual preparation contract and evidence;
  resolve them under the verified `project_root`, reject absolute paths and escapes, and
  report only files whose existence and contents were inspected.
- `checks`: objects with stable string `id`, factual `status` of `passed`, `failed`,
  `unverified`, or `not_applicable`, and an `evidence` array. Passed and failed checks require
  nonempty supporting evidence. Record preparation/prerequisite observations here; planned
  execution checks remain `unverified`, and exclusions explain their applicability.
- `issues`: objects with `code` and `message` identifying missing inputs, failed prerequisites,
  affected dependent work and recovery/resolver; preserve incoming unresolved issues.
  Include relevant `assumptions` and `next_actions` arrays, distinguishing observed facts,
  unresolved decisions and safe independent work. Resolve incoming issue IDs only with
  actual evidence; no prepare receipt supplies an independent completion verdict.

The host uses the maintained `task_runtime.py record` interface with the actual state path,
`--invocation-id` equal to the original `invocation.id`, and `--result` pointing to the saved
receipt. Confirm submission was accepted; duplicate, stale or mismatched receipts must be
reconciled, not relabeled. On `reconcile`, inspect actual existing side effects and evidence
first, then report the observed result against the original pending invocation; never
blindly replay work because its receipt is absent. If the host cannot invoke the stage,
the evaluator/host crashes, or usable output cannot be produced, the host uses the maintained
`task_runtime.py unavailable` mechanism with the actual `--state`, original `--invocation-id`
and factual `--message`. Do not fabricate a receipt or pass to advance the lifecycle.
The Kernel validates receipt structure; its checklist preserves facts and freshness but
establishes no professional acceptance. A missing independent evaluation remains unassessed.

## Preparation procedure

1. Inspect affected server-side source/contracts, package and lock files, build/CI and
   migration configuration. Record repository/artifact identity, service boundaries,
   observed backend signals, existing unrelated changes and relevant baseline failures.
   Verify actual backend context against the routed task; route selection alone proves none of it.
2. Resolve the exact selected capability in the current manifest/capability contract.
   Check its referenced workflow, Skill and evaluator, every declared dependency,
   required tool and permission, plus task-specific technical prerequisites. Record
   available/missing evidence individually; empty dependency lists do not prove readiness.
3. Discover actual protocol, runtime/framework, database, broker and client versions
   from project evidence. Consult their official implementation/version contracts for
   required semantics; baseline PostgreSQL/RabbitMQ sources do not mandate those technologies.
   Discover exact check commands, origin, working directory, configuration and safe
   environment/data boundary from maintained project tooling; invent no commands or credentials.
4. Establish approved invariants, transitions, actors/resource access, affected consumers,
   compatibility obligations, data policy, operational/recovery targets and task authority.
   Public sources establish no organization policy, numerical budget or permission.
5. Classify every lane below as affected or excluded with a reason; assign affected risks
   concrete expected effects and positive/negative checks at the necessary evidence level.

| Exact task type | Preparation focus and risk to verify |
| --- | --- |
| `backend.api-contract` | Protocol/schema version, operations/payload/error/security diff, consumer compatibility; accepted and rejected inputs. [WEB-OAS] [WEB-OWASP] |
| `backend.service-implementation` | Approved invariants/transitions and effects; unauthorized, invalid-state, out-of-order and competing actions. [WEB-OWASP] [WEB-PG-ISOLATION] |
| `backend.persistence` | Actual engine/isolation/constraints and transaction boundaries; concurrency anomalies, complete-transaction retry and external effects. [WEB-PG-ISOLATION] [WEB-AWS-RETRIES] |
| `backend.migration` | Existing-data/application compatibility, locks, sequencing, destructive effects; partial/interrupted rehearsal and verified recovery or forward repair. [WEB-PG-MIGRATION] [WEB-SRE-RELEASE] |
| `backend.async-processing` | Acceptance versus completed effects, acknowledgement/duplicates/order and worker bounds; redelivery, restart and poison disposition. [WEB-RABBITMQ] [WEB-AWS-RETRIES] |
| `backend.dependency-resilience` | Supplied timeout/attempt/duration/concurrency budgets, retry owner and idempotency; overload, exhaustion and timeout after effect. [WEB-AWS-RETRIES] |
| `backend.service-security` | Actual transport/identity/access/data policy and management boundaries; unauthorized/malformed requests, safe errors and disclosure checks. [WEB-OWASP] |
| `backend.observability` | Request/worker traces, metrics/logs and safe correlation; success/failure collection/export evidence, operational use separately. [WEB-OTEL] |
| `backend.verification-delivery` | Candidate identity, risk-based checks, integration environments, rollout stop/recovery criteria and authority; regression and recovery limits. [WEB-SRE-TESTING] [WEB-SRE-RELEASE] |

6. Apply cross-cutting risks to every affected lane without selecting extra capabilities.
   Sequence bounded implementation slices and their prerequisite checks, recovery/repair
   decisions and handoffs. Distinguish a rollout/recovery proposal from authorized operations;
   code rollback does not establish restored data. Prepare supplies no privileged, destructive,
   production, deployment or publication authority.

## Output and dependent-work boundary

Return a bounded contract: observed context/artifact identity; exact task/capability;
verified references, versions, dependencies, tools and authority; affected surfaces and
ordered slices; lane/risk/acceptance matrix; discovered commands with safe fixtures,
expected responses/state/effects/signals, evidence locations and required environment;
recovery/compatibility decisions and owner handoffs. Separate local/mock, actual dependency
integration, deployed observation and independent acceptance; planned checks establish no pass.
For each unresolved field record `needs_input` or `needs-org-input`, missing evidence/decision,
affected action/check/claim, resolver if known, and safe independent work versus blocked dependent work.
Execute may consume only slices with established context, inputs, dependencies and authority.
Preserve failures and unavailable/skipped coverage. Material scope/semantics changes return to prepare.
If no Domain matches, visibly end the task and inform the user. Invalid backend context or
missing required capability/prerequisite blocks dependent execution; never use generic/model-native fallback.

Stable bracketed source IDs identify the validated research ledger; [REPO-MANIFEST] supports
Domain identity/scope. Repository governance supplies Kernel boundaries; sources grant no task authority.
