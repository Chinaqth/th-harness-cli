# Backend Engineering Evaluator

## Mandate and independence

Assess a backend product task against its prepared acceptance contract, [DOMAIN.md](../DOMAIN.md), [BE-01–BE-11](../rules/BASE.md), and the [delivery workflow](../workflows/WORKFLOW.md).
This contract evaluates behavior and evidence; Domain Pack authoring/activation validation is a separate maintenance activity. [REPO-MANIFEST] [WEB-SRE-TESTING]

Use an evaluator context independent of implementation authorship. Record evaluator identity/context and role, implementation author, artifact examined, and any independence limitation.
An implementation author's test report is input evidence, never self-issued independent acceptance. If no independent context is available, retain implementation results and mark independent acceptance unassessed;
if an attempted independent assessment cannot proceed because that context or authority is unavailable, mark that assessment blocked. Do not invent an acceptance owner or their decision. (BE-10)

Kernel 4.0 owns activation, exact task-type matching/priority, stage scheduling, and task state. The Domain owns professional assessment; these verdicts do not invent Kernel quality gates or task-state transitions.
Prepare verifies repository signals, capability prerequisites/dependencies and authority because current Kernel routing does not enforce them. No routine plan/digest confirmation gate is added.
No matching Domain visibly terminates and informs the user; invalid selected context cannot become generic/model-native fallback. Repository governance supplies these boundaries.

## Assessment inputs and evidence record

Require the bounded preparation contract, actual repository/service context, approved invariants and acceptance assertions, current implementation/diff and artifact identity,
affected consumer/protocol contracts, selected stack/dependency versions, applicable risk matrix, execution evidence, known baseline failures, and unresolved inputs. (BE-01, BE-10)
Discover commands and environment facts from the target project; this reusable evaluator prescribes no language, engine, broker, cloud, command, credential, numerical budget, or organization policy.
Use the selected implementation's authoritative semantics; PostgreSQL and RabbitMQ references illustrate concerns, not mandatory technologies. [WEB-PG-ISOLATION] [WEB-RABBITMQ]

For each criterion preserve a reproducible, sanitized record containing:

- Criterion/risk and applicable BE rule; approved expected behavior and its contract/source reference; applicable lane and justified exclusions.
- Repository/revision plus changed-artifact identity, including relevant uncommitted content; actual protocol/runtime/framework, engine/broker/client versions and configuration boundary.
- Evaluator identity/context, observation time, authorized environment, deployed/build identity where relevant, actual dependencies, mocks/substitutions, and access/authority limits.
- Exact observed command or tool invocation, working context and command origin; safe inputs/fixtures and preconditions; expected response, state, effects and signals.
- Observed response, final persisted/business state, side effects and relevant telemetry; reproducible output/evidence locator; result and limitations, including failed/skipped/blocked coverage.

Never store secrets, tokens, credentials, sensitive payloads, or private customer/business data as evidence. Preserve safe representations and protected evidence references under the supplied handling policy. (BE-08)
Missing required policy, authority, environment, version or semantics blocks only dependent assertions/actions. Name the gap, impact, required input and resolving owner where known; continue feasible independent work.

## Mandatory behavioral assessment

Map every changed risk to an assertion and evidence level. Independently inspect the actual artifact, then execute the critical user/service journey with available authorized tooling;
observe the resulting state/effects rather than relying solely on return codes, generated documentation, screenshots of configuration, or author statements. [WEB-SRE-TESTING]
Every affected lane requires its successful journey and risk-relevant negative paths. Record initial state, actor/identity, request/message, dependency interactions, terminal effect and recovery outcome as applicable.
If the actual journey cannot run, document the precise blocked boundary; unit/schema success cannot replace it. For contract-only scope, assess contract validation and consumer compatibility directly,
and leave implementation/runtime acceptance unassessed unless that behavior is actually exercised. Justify each not-applicable lane/path using observed scope; do not silently omit it.

| Task lane | Acceptance and negative-path evidence |
| --- | --- |
| `backend.api-contract` | Compare old/new operations, payload constraints, errors and security requirements; verify consumer compatibility or authorized breaking-change coordination. Validate selected protocol syntax plus accepted/rejected implementation requests where implemented. Invalid/missing values, content types and access must follow the declared safe error contract. A schema pass alone proves syntax, not runtime conformance. BE-02, BE-08. [WEB-OAS] [WEB-OWASP] |
| `backend.service-implementation` | Exercise approved server-side invariants and permitted transitions; reject unauthorized, invalid-state and out-of-order operations and verify absence of prohibited effects. Exercise competing operations when they can invalidate a transition; client sequencing and authentication alone prove neither correctness nor authorization. BE-03, BE-04. [WEB-OWASP] [WEB-PG-ISOLATION] |
| `backend.persistence` | Verify transaction boundaries, actual engine/isolation/constraints and final state under relevant concurrent writes and failure. Demonstrate complete-transaction retry where required, and account separately for external effects. Mock/alternate-engine results do not establish selected-engine concurrency guarantees. BE-04, BE-07. [WEB-PG-ISOLATION] |
| `backend.migration` | Rehearse with representative authorized existing data; compare schema/data before and after, constraint compatibility and supported application-version sequencing. Exercise relevant interruption/partial completion and recovery or forward repair; disclose irreversible loss and unmet recovery requirements. Code rollback does not prove data restoration. BE-05, BE-11. [WEB-PG-MIGRATION] [WEB-SRE-RELEASE] |
| `backend.async-processing` | Distinguish transport/publisher acceptance, acknowledgement and completed durable business effects. Exercise duplicate/redelivery, worker restart, relevant ordering/concurrent work, ambiguous completion and poison/exhausted failure disposition with verified in-flight bounds. Inspect business state and prove duplicate safety within its stated scope; confirmations do not establish exactly-once effects. BE-06, BE-07. [WEB-RABBITMQ] [WEB-AWS-RETRIES] |
| `backend.dependency-resilience` | Verify supplied timeout/attempt/concurrency/overall-duration budgets, retry-owning layer and justified backoff/jitter. Inject timeout, overload, retry exhaustion and lost response after a committed effect; observe bounded behavior and duplicate-safe reconciliation. A timeout cannot establish absence of side effects. BE-07. [WEB-AWS-RETRIES] |
| `backend.service-security` | Verify protected transport at the actual termination/delegation boundary, including rejection of disallowed unprotected access, and approved identity acceptance plus missing/invalid/expired identity rejection as applicable. Test endpoint/resource authorization, validation, management restrictions and safe errors. Inspect sanitized errors/audit/logs/traces/metrics for credentials, tokens and sensitive data disclosure. State unavailable deployed controls separately. BE-03, BE-08. [WEB-OWASP] [WEB-OTEL] |
| `backend.observability` | Trigger changed success and failure journeys and inspect useful complementary traces, measurements and events, correlation and disclosure controls. Verify collection/export at the claimed boundary; separately establish alert/operational use if claimed. Code instrumentation alone proves neither collection nor diagnosis. BE-08, BE-09. [WEB-OTEL] |
| `backend.verification-delivery` | Verify candidate-bound risk coverage, regression and applicable integration/system/concurrency/security/failure/performance results against supplied criteria. For release scope, inspect actual authority, rollout/control observation and stop criteria, recovery evidence and residual risks; distinguish proposed procedures from performed deployment/restoration. BE-10, BE-11. [WEB-SRE-TESTING] [WEB-SRE-RELEASE] |

Apply cross-cutting security, business-effect, dependency and telemetry assertions to every affected lane; selecting one task type does not waive those risks.
Use project-supplied thresholds and acceptance owners. Missing thresholds block dependent performance/reliability claims, without inventing targets or stopping unrelated checks.

## Evidence levels and claim limits

Report these dimensions separately; independent assessment can examine any level and does not automatically elevate its environmental coverage. (BE-10)

| Dimension | What can be established |
| --- | --- |
| Local/static/mock | Parsing, contract/schema validity, compilation, unit or hermetic behavior within observed substitutions. No claim of real dependency, deployed configuration or live acceptance. |
| Actual dependency integration | Observed behavior with identified real dependencies/versions, data and configuration within that environment. No inference about an untested deployed topology. |
| Deployed observation | Behavior of the identified deployed candidate and verified transport/identity/dependency/telemetry boundaries under authorized conditions. No inference about unexercised paths or rollout/recovery. |
| Independent acceptance | An independent evaluator's criterion-by-criterion verdict at the explicitly observed level and current artifact identity; project acceptance-owner decisions remain separately identified. |

Retain baseline/new failures and justified skips. After material artifact/configuration changes, refresh affected observations and independent assessment; prior verdicts do not transfer to unassessed revisions.

## Findings and verdicts

Each finding names affected behavior/artifact, violated criterion/rule, expected versus observed effects, safe reproduction/evidence, severity, impact, required correction and remaining coverage.
Severity expresses demonstrated impact; unknown environment or authority is a coverage gap, not an invented defect. Use these Domain reporting conventions:

- **P0 — Critical:** Demonstrated uncontrolled exposure, unauthorized critical effects or catastrophic/irreversible data damage requiring immediate containment of affected activity.
- **P1 — High:** Critical journey/invariant fails, material security or data-integrity violation, unsafe duplicate effects, or required recovery is demonstrably ineffective.
- **P2 — Moderate:** Bounded functional, compatibility, resilience or observability defect requiring correction; evidence shows the critical journey remains viable within stated limits.
- **P3 — Low:** Minor clarity/maintainability/evidence usability issue with no demonstrated material behavioral impact; record the improvement and its scope.

Assign a verdict per assertion and an explicit overall scoped assessment:

- **pass:** All required applicable assertions in the stated assessment boundary have sufficient current independent evidence and no unresolved criterion violation; justified exclusions and residual risks remain visible.
- **fail:** Observed behavior/artifacts violate a required criterion. Identify severity and correction; successful unrelated checks cannot erase the failure. A finding's priority alone is not a pass waiver.
- **blocked:** A required assessment was attempted or planned but essential input, authority, environment or evidence is unavailable. Name only the dependent claims withheld and the recovery input.
- **unassessed:** No assessment has been performed for that assertion, artifact revision, environment or independence dimension. Do not imply pass from silence, skips or implementation-authored checks.

For an overall scoped result, demonstrated required violations yield fail even alongside blocked coverage; otherwise essential blocked criteria prevent pass, and untouched required criteria leave the result unassessed.
Report the per-boundary outcomes so a local pass cannot mask blocked integration/deployed/independent acceptance. Unknown business acceptance authority withholds that decision, not all feasible verification.

## Handoff and traceability

Return current artifact identity, evaluator independence, critical journeys and negatives exercised, lane/risk matrix, evidence levels, findings/verdicts, residual risks and precise unresolved inputs/owners.
Return in-scope corrections to execute and reassess changed evidence. Keep release/recovery proposals, authorized actions and observed results distinct; this evaluator grants no production/destructive/deployment permission.
Bracketed stable IDs resolve to the validated authoring ledger: REPO-MANIFEST, WEB-OAS, WEB-PG-ISOLATION, WEB-PG-MIGRATION, WEB-RABBITMQ, WEB-AWS-RETRIES, WEB-OWASP, WEB-OTEL,
WEB-SRE-TESTING and WEB-SRE-RELEASE. They support the professional baseline; evidence formats, severity conventions and verdicts operationalize BE rules, not claimed public-source or Kernel task gates.
