# Backend Engineering Delivery Workflow

This procedure implements the professional work of `engineering.backend` under [DOMAIN.md](../DOMAIN.md) and [BE-01–BE-11](../rules/BASE.md). Apply only the task's relevant lanes;
record justified exclusions. Its outputs are product-task evidence, distinct from Domain authoring and activation checks. [REPO-MANIFEST] [WEB-SRE-TESTING]

## Lifecycle and entry contract

Kernel 4.0 owns activation, exact `task_type` matching and priority, stage scheduling, and task state. Backend owns prepare, execute, independent evaluate, and summarize. Kernel
does not validate repository signals or capability dependencies; prepare must do so before dependent execution. One route selects one capability, with no cross-capability
dependency chain. Cross-cutting technical prerequisites still require explicit checks. Repository `AGENTS.md`, `docs/ARCHITECTURE.md`, and `docs/GOVERNANCE.md` supply this
boundary.

No routine plan-presentation or digest-confirmation checkpoint applies. Explicit user/platform authority remains binding, including authority for destructive data changes,
privileged access, deployment, and publication. No matching Domain visibly ends the task and informs the user; no generic or model-native fallback is allowed. A backend route with
invalid context cannot become a fallback. (BE-01, BE-11)

**Inputs:** Requested objective and task type; authorized scope; target repository; current contracts and consumers; approved business/access rules; actual stack versions;
available tools, dependencies, data and environments; acceptance criteria; recovery requirements and relevant decision owners. Unknown project facts remain `needs-org-input` with
their affected actions named. [WEB-OAS] [WEB-OWASP] [WEB-SRE-RELEASE]

**Evidence record:** For each check retain artifact/revision identity, risk and rule, exact discovered command/tool and working context, sanitized inputs, environment and
dependency versions, expected result, observed result, outcome, and limitations. Keep local/mock, actual dependency integration, deployed observation, and independent acceptance
separate. Never include secrets or private payloads. (BE-08, BE-10)

## 1. Prepare

**Entry:** A backend task is selected and its request is available. Selection alone establishes neither context nor authority.

1. Inspect repository guidance and the affected service's actual source, contracts, package/lock files, build configuration, migration configuration, and CI definitions as applicable. Identify service boundaries and preserve existing unrelated changes. Record the current artifact identity and relevant baseline failures. (BE-01, BE-10)
2. Identify the selected capability and its existing workflow/Skill/evaluator references. Confirm required references, tools, permissions, technical prerequisites, and declared dependencies are available; do not treat an empty capability dependency list as a technical readiness assertion. Record evidence for each prerequisite. (BE-01)
3. Verify the manifest task type against concrete backend surfaces using the lane table below. If context does not support it, identify the mismatch and block dependent execution. Do not reinterpret repository signals as Kernel matching gates. (BE-01) [REPO-MANIFEST]
4. Obtain approved business invariants, allowed transitions, consumer obligations, identity/access policy, data classification, and measurable acceptance criteria. Resolve ambiguous semantics before implementing dependent behavior. Record decision owner and required input for each unresolved item. (BE-02, BE-03, BE-08)
5. Determine selected protocol, runtime/framework, engine, broker, clients and versions. Verify implementation-specific contracts from their authoritative documentation; PostgreSQL and RabbitMQ sources are examples, not stack requirements. (BE-01, BE-04, BE-06) [WEB-OAS] [WEB-PG-ISOLATION] [WEB-RABBITMQ]
6. Discover exact build, lint, contract, test, migration and delivery commands from the target repository's maintained tooling. Record command origin, working directory, required configuration and safe data/environment boundary. Do not invent commands, paths, credentials, environments or numerical budgets. Missing tooling blocks only the checks/actions requiring it. (BE-01, BE-10)
7. Assess consumer compatibility, rejected effects, concurrent changes, data loss/irreversibility, duplicate processing, timeout ambiguity, overload, disclosure, missing telemetry and release risks. Map applicable risks to the verification matrix and explicit expected outcomes. Obtain project-specific thresholds where needed. (BE-02–BE-11)
8. Order bounded implementation slices and checks; identify dependent holds and safe independent work. Define recovery/forward repair, rollout stop criteria when relevant, and concrete handoffs. A release proposal supplies no release permission. (BE-05, BE-10, BE-11)

**Output:** A bounded preparation contract containing observed context, one selected capability, verified prerequisites, affected surfaces, lane sequence, acceptance assertions,
actual commands, authority, risk-to-check map, recovery decisions, and precise gaps.

**Exit:** Execute only slices whose context, inputs, dependencies and authority are established. Preserve other slices as explicitly blocked with required resolution. Missing
production access does not prevent authorized local work. (BE-01, BE-11)

## 2. Execute

**Entry:** Use the prepared contract and current artifacts. Revisit prepare if scope, stack, dependency semantics, authority, or acceptance criteria materially change.

1. Apply the selected lane's ordered actions in a bounded slice. Integrate applicable cross-cutting controls within that slice; the table does not select additional routed capabilities or infer capability availability.
2. Run the slice's discovered checks and inspect resulting business/data effects, not only process exit codes. Preserve sanitized failures and environment limitations alongside passing evidence. (BE-10)
3. Repair within authorized scope and refresh affected evidence after material edits. Continue safe independent slices when an ordinary failure leaves them feasible; hold dependent slices with the exact failed prerequisite and next action.
4. Collect the current implementation, contract/configuration changes, decisions, checks, recovery material, and gaps for independent evaluation. Do not self-issue independent acceptance. (BE-10, BE-11)

### Task-specific lanes

Each row lists required context, ordered actions, and outputs. Apply relevant security, resilience, observability and verification controls to all affected lanes; mark exclusions
with reasons.

| Exact task type | Required context | Ordered implementation actions and outputs |
| --- | --- | --- |
| `backend.api-contract` | Selected protocol/version, existing operations, consumers, compatibility policy and access requirements. | Compare old/new contract; specify payloads, validation, errors and security; implement/validate contract alignment; exercise accepted/rejected requests and consumer-sensitive changes. Output contract diff, compatibility decision and behavior evidence. BE-02, BE-08. [WEB-OAS] [WEB-OWASP] |
| `backend.service-implementation` | Approved invariants, transition table, authorization policy, affected effects and consumers. | Map rules to server-side decisions; validate actor/resource/state/order; implement bounded business behavior; coordinate atomicity with persistence; verify valid and rejected transitions and resulting effects. Output invariant-to-code/check map. BE-02–BE-04. [WEB-OWASP] [WEB-SRE-TESTING] |
| `backend.persistence` | Actual engine/version, schema, constraints, isolation, transaction and external-effect boundaries. | Choose transaction boundaries under verified semantics; implement access and constraints; reproduce competing writes/failures; inspect final state; retry complete transactions where required and account for external effects separately. Output transaction rationale and engine-backed evidence. BE-04, BE-07. [WEB-PG-ISOLATION] [WEB-AWS-RETRIES] |
| `backend.migration` | Before/after data/schema contract, existing-data compatibility, application versions, authorized rehearsal data and recovery requirements. | Check existing values and destructive effects; sequence schema/data/application changes; assess locks/resources; rehearse normal and interrupted/partial execution; verify recovery or forward repair and residual irreversibility. Output sequencing, rehearsal and recovery results. Hold unauthorized destructive actions. BE-05, BE-11. [WEB-PG-MIGRATION] [WEB-SRE-RELEASE] |
| `backend.async-processing` | Transport/client semantics, processing-effect contract, ordering needs, acknowledgement settings and worker limits. | Separate acceptance from completed effects; define acknowledgement timing, duplicate/idempotency scope and bounded in-flight work; implement failure/poison disposition; test duplicate, redelivery and restart boundaries against resulting state. Output producer/consumer sequence and evidence; never infer exactly-once effects. BE-06–BE-08. [WEB-RABBITMQ] [WEB-AWS-RETRIES] |
| `backend.dependency-resilience` | Dependency behavior, client semantics, project wait/retry/capacity budgets and mutation safety contract. | Select retry-owning layer; bound waits/attempts/concurrency/duration; justify backoff/jitter; implement idempotency or reconciliation; inject timeout, overload, exhaustion and lost-response scenarios. Output configuration rationale and bounded-effect evidence. BE-07. [WEB-AWS-RETRIES] |
| `backend.service-security` | Actual identity integration, access and data policies, service/management surfaces and approved exception authority. | Enforce protected transport and boundary validation; verify endpoint/resource authorization and workflow order; restrict management access; sanitize errors/audits/telemetry; exercise unauthorized, malformed and disclosure cases. Output control-to-negative-check map, sanitized samples and policy gaps. BE-03, BE-08. [WEB-OWASP] |
| `backend.observability` | Changed request/worker paths, risk map, collection boundary, data policy and applicable operational targets/owners. | Select complementary traces/metrics/logs; correlate relevant boundaries safely; emit success/failure signals; inspect collection/export; distinguish instrumentation, collection and operational alert use. Output captured signals and explicit unverified operational coverage. BE-08, BE-09. [WEB-OTEL] |
| `backend.verification-delivery` | Changed artifact identity, acceptance criteria, actual commands/environments, dependency availability and release authority if relevant. | Map risk to unit/integration/system/regression/concurrency/failure/security/performance checks; run authorized checks; inspect effects; propose monitored rollout and recovery or execute only authorized operations; retain results and limitations. Output reproducible verification and release/recovery handoff. BE-10, BE-11. [WEB-SRE-TESTING] [WEB-SRE-RELEASE] |

### Measurable verification and negative paths

Bind each applicable row to concrete fixtures, expected effects, an exact discovered check, and the required evidence level during prepare. Use project-approved thresholds for
quantitative assertions; missing required targets remain blocked input. A justified not-applicable row states why the changed boundary cannot exercise that risk. (BE-10)

| Changed risk | Positive assertion | Negative/failure assertion | Required observation |
| --- | --- | --- | --- |
| Contract and compatibility | Valid supported request/message produces its declared response/effect. | Malformed/missing/unsupported values are rejected through declared errors; impacted consumers are identified. | Contract validation plus implementation responses/effects; separate unavailable consumer checks. BE-02. |
| Business/access | Authorized actor performs the approved transition. | Unauthorized/resource-mismatched, invalid-state and out-of-order actions cannot cause the protected effect. | Actor/state fixtures, error result and unchanged protected state/effect count. BE-03, BE-08. |
| Persistence/concurrency | Successful transaction preserves declared invariants. | Competing writes and transaction failure preserve invariants; required retries encompass the complete transaction. | Actual-engine/version/isolation, interleaving, final persisted values and retry scope. BE-04. |
| Migration | Existing authorized representative data satisfies the new contract under supported version sequencing. | Interrupted/partial execution and incompatible existing values follow the declared recovery/repair or safe stop path. | Before/after data checks, version sequence, rehearsal/recovery results and irreversibility. BE-05. |
| Asynchronous effects | Accepted work eventually reaches its defined completed-effect state under tested conditions. | Duplicate, redelivery, worker restart and poison input follow the bounded declared policy without unapproved repeated effects. | Transport acknowledgement and resulting business state separately; duplicate/effect counts and failure disposition. BE-06. |
| Dependency resilience | In-budget completion produces the defined result. | Timeout after effect, overload and exhausted retries preserve safe bounded behavior or explicit reconciliation. | Attempts, elapsed time, concurrency, effect counts and ambiguous-outcome record against supplied budgets. BE-07. |
| Security/disclosure | Authorized use passes required transport and input/access controls. | Invalid input/access/management requests fail safely; errors and telemetry reveal no prohibited data. | Response/effect assertions, access tests and sanitized error/audit/telemetry inspection. BE-08. |
| Observability | Changed successes expose the selected useful signals. | Injected relevant failures are distinguishable and correlatable within the verified collection boundary. | Captured traces/measurements/events and verified export boundary; alert use separately stated. BE-09. |
| Delivery/recovery | Candidate meets relevant checks and any authorized rollout observations. | Regression, stop-criterion breach or recovery scenario produces its declared hold/recovery decision. | Candidate identity, environment, expected/actual checks, authority and performed versus proposed operations. BE-10, BE-11. |

The matrix derives from [WEB-OAS], [WEB-PG-ISOLATION], [WEB-PG-MIGRATION], [WEB-RABBITMQ], [WEB-AWS-RETRIES], [WEB-OWASP], [WEB-OTEL], [WEB-SRE-TESTING] and [WEB-SRE-RELEASE]; it
defines task-specific assertions rather than universal numeric targets.

**Execute output:** Current bounded artifacts, compatibility/data/effect decisions, evidence records, populated matrix, recovery material, retained failures and blocked/skipped
coverage. Unavailable actual dependencies cannot produce an integration pass.

## 3. Independent evaluate

**Entry:** Provide the evaluator the preparation contract, current artifact identity, applicable BE rules, implementation/diff, reproducible evidence, matrix and unresolved gaps.
Identify evaluator independence from implementation authorship; an author's checks remain implementation evidence. (BE-10)

1. Verify scope, authority, actual artifact identity, evidence provenance and dependency/environment boundaries against the prepared contract.
2. Inspect changed behavior and critical paths; independently reproduce risk-relevant positive and negative assertions using available authorized environments and discovered tooling. Check the resulting state/effects and telemetry where applicable.
3. Assess contract compatibility, invariants, concurrency, migration recovery, async completion, retry ambiguity, security and observability according to applicability. Do not substitute document completeness, mocks or schema checks for required real integration evidence.
4. Record findings with affected behavior, rule, reproducible evidence, severity, required correction and coverage limits. State pass, fail or blocked for the assessed boundary; missing essential environments/inputs block that boundary, and demonstrated violations fail it.
5. Return corrections to execute within scope. Refresh affected artifact-bound evidence and independent assessment after material changes; never carry a verdict to an unassessed revision.

**Output:** Independent findings/verdict tied to the assessed artifacts, checks and evidence level, plus unresolved acceptance/operational gaps. Missing an independent evaluator
leaves independent acceptance unverified; feasible implementation work may continue. (BE-10) [WEB-SRE-TESTING]

## 4. Summarize and hand off

**Entry:** Available execution/evaluation results, including partial or blocked work; summary must not wait for a fabricated pass.

1. State the delivered behavior, changed surfaces and current artifact identity. Reconcile each acceptance assertion with its actual result and applicable independent finding. (BE-02, BE-10)
2. Report local/mock checks, actual dependency integration, deployed observations and independent acceptance separately; enumerate failed, blocked, skipped and unassessed coverage with concrete reasons and consequences. (BE-10)
3. Describe recovery or forward repair: trigger, affected versions/data, exact discovered procedure, verified rehearsal boundary, irreversible effects and unmet requirements. If the procedure is unknown, state the gap instead of supplying a guessed command. (BE-05, BE-11)
4. For release scope, state observation/stop criteria, authorized versus proposed actions, performed results, residual risk and decision owner. Proposed canary/recovery work is not performed deployment or restoration. (BE-11)
5. Hand off consumer adoption to actual consumer owners; business meaning to the business decision owner; database/broker/recovery operations to authorized platform owners; policy exceptions to security/privacy; collection/alerts to reliability/platform; and release/acceptance to their designated authorities. Unknown contacts remain named role gaps. (BE-11)
6. For every unresolved item, provide affected action, missing evidence/input/authority, safe work already completed, required decision, and next owner where known. Never imply that Domain activation resolves project gaps.

**Output:** A reviewable delivery/recovery handoff, independent verdict or explicit unverified status, residual risks and actionable next-owner decisions. [WEB-SRE-TESTING]
[WEB-SRE-RELEASE]

## Failure handling throughout

- Preserve ordinary command/test failures with sanitized reproduction details; diagnose and repair within scope, then rerun affected checks. Continue independent safe work without hiding the failure. (BE-10)
- Missing context, capability prerequisites, business policy, actual-engine semantics, safe retry contract or authority blocks the precise dependent operation. Identify its missing input and resolver; do not guess defaults or silently skip the requirement. (BE-01, BE-03–BE-08)
- Suspected unsafe disclosure, unauthorized effects or data damage requires containing the affected activity and notifying the authorized owner through the task's approved channel. Preserve safe evidence; do not broaden permissions or improvise destructive recovery. (BE-05, BE-08, BE-11)
- Missing external access/environments or independent acceptance produces blocked/unverified coverage, not success. Recover by obtaining the missing prerequisite and refreshing affected checks at the current artifact identity. (BE-10)
- Scope changes return to prepare; no-match termination and explicit user/platform authority remain binding. No routine quality approval gate is added by this workflow.

## Traceability

Source IDs resolve to the validated authoring research ledger. This workflow operationalizes the existing BE rules; source references support engineering concerns, not project
permissions, numeric targets or product acceptance. Repository lifecycle/routing requirements derive from current governance and the Domain contract. The workflow deliberately
supplies no product build/test/migration commands: prepare must discover and record those from the actual target project. [REPO-MANIFEST]
