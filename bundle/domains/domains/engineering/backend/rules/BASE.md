# Backend Engineering Rules

These enforceable invariants apply to `engineering.backend`. MUST and MUST NOT are requirements. Each rule declares its applicability, required evidence, and failure action. A justified not-applicable result identifies the task boundary and supporting context; silence is not an exemption. Public sources support the professional baseline; project facts and authority must be obtained downstream.

## BE-01 — Verified context before dependent execution

**Applies:** Every selected backend task, including tasks routed by exact task type.

**Invariant:** Prepare MUST verify concrete server-side repository context, authorized scope, requested capabilities, selected capability prerequisites and dependencies, actual stack versions, affected consumers, and available verification environments. Kernel 4.0 matches task types and priority; repository signals and capability dependencies are not automatically checked by the current Kernel. A selected route therefore MUST NOT stand in for these checks. Use the selected protocol, database, broker, and client documentation before claiming implementation-specific guarantees. No language, framework, cloud, datastore, broker, architecture, or organization numerical target is mandated by this baseline. [REPO-MANIFEST] [WEB-OAS] [WEB-PG-ISOLATION] [WEB-RABBITMQ]

**Evidence:** A bounded preparation contract identifies observed context, affected capabilities, each dependency and its verification, acceptance criteria, authority, and unresolved inputs.

**Failure action:** Stop dependent execution when context, required capability, dependency, authority, or necessary semantics are absent. Record the precise gap and required decision; continue feasible independent work. No matching Domain MUST visibly terminate the task and inform the user; a failed context check MUST NOT become generic or model-native fallback execution. These Kernel boundaries follow repository `AGENTS.md`, `docs/ARCHITECTURE.md`, and `docs/GOVERNANCE.md`.

## BE-02 — Contract validation and compatibility

**Applies:** Changed service operations, messages, payloads, schemas, validation, errors, or access requirements.

**Invariant:** Define the affected contract and compare old and new consumer-visible behavior. Cover required/optional values, types, constraints, error outcomes, and security requirements as applicable. HTTP APIs MUST use their selected contract tooling and version; non-HTTP interfaces MUST use the actual protocol contract. Validate implementation behavior as well as contract syntax. Breaking changes require an authorized compatibility or coordinated adoption decision; do not infer compatibility from successful compilation or an additive-looking schema edit. [WEB-OAS] [WEB-OWASP]

**Evidence:** Contract diff, affected consumer inventory, compatibility assessment, schema/tool results, and accepted/rejected request or message checks against the implementation.

**Failure action:** Repair contract/implementation mismatches. Hold incompatible dependent adoption until its impact and authorized coordination are resolved; report unavailable consumer coverage explicitly.

## BE-03 — Server-side business transitions and authorization

**Applies:** Operations that read protected resources, change business state, or perform side effects.

**Invariant:** Enforce approved business invariants and permitted state transitions on the server, including endpoint/resource access under the supplied identity and authorization model. Authentication alone MUST NOT establish authorization. Validate workflow order and current state; do not trust client sequencing, hidden UI controls, or caller-supplied ownership. Business meaning and exception policy MUST come from authorized project inputs. Coordinate transition checks with BE-04 when competing writes can invalidate them. [WEB-OWASP] [WEB-PG-ISOLATION]

**Evidence:** Explicit invariant/transition contract and tests for permitted, unauthorized, invalid-state, out-of-order, and relevant competing operations, with rejected-effect assertions.

**Failure action:** Reject invalid operations through the approved safe error contract. Missing business or access policy blocks dependent implementation; do not invent permissive defaults.

## BE-04 — Selected database semantics and concurrency

**Applies:** Persistent reads/writes, multi-step state changes, transactions, constraints, and concurrency-sensitive logic.

**Invariant:** Establish transaction boundaries, selected engine/version, isolation level, relevant constraints, and observable concurrency guarantees. Verify that concurrent executions preserve business invariants. Do not assume identical isolation behavior across engines or infer a stable snapshot across statements. Where the selected engine requires serialization retry, retry the complete transaction and account for effects outside that transaction through BE-07. A database transaction does not by itself make external effects atomic. [WEB-PG-ISOLATION] [WEB-AWS-RETRIES]

**Evidence:** Engine-specific contract reference, transaction/isolation decision, reproducible relevant competing-write and failure tests, final persisted-state assertions, and retry-scope evidence.

**Failure action:** Stop affected mutations when correctness depends on unverified semantics; repair demonstrated anomalies. Unavailable actual-engine tests remain blocked coverage, never an integration pass.

## BE-05 — Migration compatibility, data effects, and recovery

**Applies:** Schema changes, constraints, backfills, data conversion, deletion, and application/data-version sequencing.

**Invariant:** Disclose affected data and consumers, existing-data compatibility, lock/resource implications under selected engine semantics, ordering, and destructive or irreversible effects. Define and rehearse a reversible path or an explicit forward-repair path, including interrupted execution and partial completion where relevant. Never label application-code rollback as data restoration. Destructive changes and privileged/production mutations require applicable explicit authority before execution; a migration script, baseline rule, or Domain activation grants none. A forward-repair proposal does not resolve an unmet project recovery requirement. [WEB-PG-MIGRATION] [WEB-SRE-RELEASE]

**Evidence:** Before/after schema and data contract, existing-data checks, migration rehearsal with representative authorized data, supported application-version sequence, recovery/repair verification, residual irreversibility, and applicable authority.

**Failure action:** Hold dependent application/migration steps when compatibility, destructive permission, or required recovery cannot be established. Report data-loss scope and hand the concrete decision to the authorized owner.

## BE-06 — Asynchronous acceptance and completed effects

**Applies:** Producers, consumers, queues, background workers, and asynchronous task contracts.

**Invariant:** Distinguish publisher/transport acceptance from completed business processing. Define acknowledgement timing relative to durable effects, duplicate detection/idempotent handling and its retention scope, redelivery/restart behavior, ordering requirements, and bounded worker concurrency/in-flight work using the selected transport's actual semantics. Do not claim exactly-once business effects from a publisher confirmation or acknowledgement mode. Define bounded failure handling and poison-message disposition such as authorized dead-letter, quarantine, or rejection; unbounded immediate requeue MUST NOT serve as the failure policy. [WEB-RABBITMQ] [WEB-AWS-RETRIES]

**Evidence:** Producer/consumer effect contract, selected broker settings and verified limits, acknowledgement/effect sequence, duplicate/redelivery and worker-restart tests, poison-failure outcomes, and inspection of resulting business state.

**Failure action:** Withhold unsupported delivery/completion claims. Stop affected dependent processing changes if duplicate safety or acknowledgement semantics remain unknown; surface exhausted/poison failures through the approved operational path without exposing sensitive payloads.

## BE-07 — Bounded dependency waits and safe retries

**Applies:** Network calls, external side effects, transaction retries, polling, and retried background work.

**Invariant:** Bound waits, attempts, concurrency, and overall retry duration using dependency behavior and supplied project budgets. Define retryable outcomes and the retry-owning layer to avoid amplification. Use justified backoff/jitter where retries apply; do not invent latency, capacity, or availability targets. Mutating retries require a verified idempotency contract or an explicit safe reconciliation strategy. Timeout or connection failure MUST NOT be treated as proof that no effect occurred. Account for ambiguous outcomes before repeating an effect. [WEB-AWS-RETRIES] [WEB-PG-ISOLATION]

**Evidence:** Dependency-specific timeout/retry rationale, retry limits/configuration, idempotency scope, tests for exhaustion, overload, lost response after an effect, and reconciliation or duplicate-safe outcomes.

**Failure action:** Do not automatically repeat an ambiguous non-idempotent effect. Record uncertainty and use the authorized reconciliation/escalation path. Missing required budgets or safety contracts block dependent settings or operations.

## BE-08 — Safe service surfaces and private telemetry

**Applies:** Service entry points, protected transport, identity integration, management endpoints, errors, audit events, and telemetry.

**Invariant:** Implement and verify applicable protected transport and the approved identity integration at the actual protocol and deployment boundary, including any transport termination or identity delegation. REST endpoints MUST use HTTPS; non-HTTP interfaces MUST use protection appropriate to their selected protocol and approved security policy. Verify accepted identity and rejected missing, invalid, or expired identity where applicable; authentication alone does not establish authorization under BE-03. Validate inputs/content and access at service boundaries; restrict management surfaces under supplied policy. Return safe errors without internal implementation details. Do not expose credentials, tokens, or sensitive business/customer data through errors, logs, traces, metrics, or test evidence. Apply project data classification, access, handling, and retention rules; unknown sensitive-data policy requires a safe minimal representation and resolution before dependent collection. Security exceptions require actual authority. [WEB-OWASP] [WEB-OTEL]

**Evidence:** Applicable security controls and policy inputs; identified protocol/deployment, transport termination and identity delegation boundaries; sanitized effective configuration and actual connection/request results demonstrating protected transport, rejection of disallowed unprotected access, and approved identity acceptance/rejection; negative access/validation tests, error samples, audit/telemetry samples checked for disclosure, and management-surface verification. Identify each tested boundary and any unavailable deployed verification separately from local/mock checks.

**Failure action:** Remove/contain unsafe disclosure or access before affected delivery; preserve sanitized evidence. Missing transport/identity policy, integration access, or actual-boundary verification MUST block the dependent service exposure or delivery/readiness claim: name the affected entry point, missing control or check, required input/access/environment, and resolving owner where known; continue feasible independent work. Stop collection or publication that depends on unresolved sensitive-data permission. Escalate policy exceptions without asserting compliance certification.

## BE-09 — Observable outcomes

**Applies:** Changed request paths, workers, dependency calls, and operational failure paths.

**Invariant:** Select complementary traces, measurements, and event logs appropriate to the changed risk and demonstrate observable outcomes and failures. Correlate work across relevant boundaries without violating BE-08. Distinguish emitted instrumentation, verified collection/export, and actual alert/operational use; one does not prove the others. Obtain actual operational thresholds and ownership when required instead of inventing them. [WEB-OTEL] [WEB-SRE-TESTING]

**Evidence:** Signal-to-risk mapping, captured success/failure signals, demonstrated collection boundary, and explicit unverified operational coverage.

**Failure action:** Repair misleading or missing required signals; withhold operational-readiness claims where collection, alerting, or ownership is unverified.

## BE-10 — Risk-based verification and honest evidence levels

**Applies:** Every changed artifact and delivery claim.

**Invariant:** Map changed risks to appropriate unit, integration, system, regression, concurrency, failure, security, and performance checks. Explain omissions. Record actual commands/tools, inputs, environment/dependency versions, artifact identity, expected/observed results, failures, and coverage limits using authorized sanitized data. Separate local/mock checks, real dependency integration, deployed observation, and independent acceptance. A document/schema check or hermetic test pass MUST NOT establish live acceptance. Preserve failed, blocked, skipped, and unassessed outcomes. [WEB-SRE-TESTING] [WEB-PG-ISOLATION] [WEB-OWASP]

**Evidence:** Risk-to-check mapping and reproducible results tied to the actual changed artifact, with coverage gaps and distinct evidence levels. Material changes require refreshed affected evidence.

**Failure action:** Repair failures within authorized scope; preserve evidence and continue feasible independent work. Missing environments or acceptance authority remain explicit gaps; do not manufacture successful results or self-issue independent acceptance.

## BE-11 — Authorized release and recovery handoff

**Applies:** Release-readiness statements, rollout plans, deployment actions, and recovery handoffs.

**Invariant:** Identify affected versions/dependencies, rollout observation and stop criteria, recovery or forward repair, residual risks, and the responsible project decision owner. Verify recovery to the applicable evidence level. A canary or release proposal is distinct from performed deployment and its results. Do not grant deployment, publication, production access, or destructive authority through this rule. Unknown reviewers, internal standards, commands, objectives, credentials, permissions, and release/acceptance owners are `needs-org-input`; halt only the actions dependent on them. [WEB-SRE-RELEASE] [WEB-SRE-TESTING] [WEB-PG-MIGRATION] [REPO-MANIFEST]

**Evidence:** Concrete release/recovery handoff with authority, verified and proposed operations distinguished, monitoring boundaries, unresolved decisions, and required next owner.

**Failure action:** Hold unauthorized operations and unsupported readiness claims; surface unmet recovery requirements. Repository governance adds no routine `task.md` presentation or digest approval gate to ordinary tasks; explicit user/platform authority continues to bind all actions.

## Source and governance interpretation

Bracketed IDs resolve to the validated research ledger for this authoring iteration: `REPO-MANIFEST`, `WEB-OAS`, `WEB-PG-ISOLATION`, `WEB-PG-MIGRATION`, `WEB-RABBITMQ`, `WEB-AWS-RETRIES`, `WEB-OWASP`, `WEB-OTEL`, `WEB-SRE-TESTING`, and `WEB-SRE-RELEASE`. These are traceable baseline derivations, not assertions that every public source mandates this Domain's exact evidence format. PostgreSQL and RabbitMQ illustrate concrete semantics to verify; they do not prescribe the downstream stack. Kernel and permission requirements derive from the repository governance and current Domain contract. These rules specialize and MUST NOT weaken Kernel safety, authorization, evidence, governance, or no-match termination.
