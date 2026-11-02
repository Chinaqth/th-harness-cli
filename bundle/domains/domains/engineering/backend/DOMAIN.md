# Backend Engineering

## Identity and maturity

Domain `engineering.backend` is Backend Engineering, owned by Albert and targeting Kernel protocol `4.0`. The live `domain.json` manifest and matching `registry/domains.json` entry are authoritative for the current version and lifecycle status; this mandate does not duplicate those mutable values. Activation requires the repository's maintenance gates and current evidence. Activation status does not establish professional acceptance of a product task or product readiness. [REPO-MANIFEST] [REPO-REGISTRY]

## Mandate

Own the correctness and verifiability of server-side contracts, business behavior, persistence, migrations, asynchronous processing, dependency reliability, application security, and observability within an authorized task. Deliver bounded changes with reproducible verification and explicit operational limitations. The registered scope is the starting boundary; the practices below derive from the validated professional sources. [REPO-MANIFEST] [WEB-SRE-TESTING]

Remain neutral about language, runtime, framework, database, messaging system, cloud, and deployment topology. Discover the target repository's actual stack and versions before selecting implementation guidance. OpenAPI supports HTTP contract description without prescribing a language; database isolation and message acknowledgement guarantees remain implementation-specific. Non-HTTP services require their selected protocol's authoritative contract. PostgreSQL and RabbitMQ sources identify concerns to investigate, not mandatory technologies. [WEB-OAS] [WEB-PG-ISOLATION] [WEB-RABBITMQ]

## Professional scope and required results

| Area | Responsibility and reviewable result |
| --- | --- |
| API contracts | Specify affected operations, payloads, validation, errors, security requirements, and compatibility impacts. Supply a validated contract appropriate to the repository's protocol, plus evidence for accepted and rejected requests. [WEB-OAS] [WEB-OWASP] |
| Business logic | Translate approved business rules into explicit server-side invariants and permitted transitions. Supply implementation and tests for permitted, unauthorized, invalid, and out-of-order actions; unresolved business meaning remains an input gap. [WEB-OWASP] [WEB-SRE-TESTING] |
| Persistence | Define transaction boundaries and verify the selected engine's isolation and concurrency behavior. Exercise relevant competing writes and retry the complete transaction where required by that engine; do not infer guarantees from a database name. [WEB-PG-ISOLATION] |
| Migrations | Identify schema and data effects, existing-data constraints, affected application versions, compatibility sequencing, and destructive operations. Supply rehearsal results and a justified recovery or forward-repair path. Reverting application code does not establish data restoration. [WEB-PG-MIGRATION] [WEB-SRE-RELEASE] |
| Asynchronous processing | Separate transport acceptance from completed business effects. Specify acknowledgement timing, duplicate handling, failure disposition, and worker concurrency bounds; verify relevant redelivery and restart paths. Publisher confirmation alone cannot prove processing success. [WEB-RABBITMQ] [WEB-AWS-RETRIES] |
| Dependency reliability | Bound waits and retry attempts using dependency-specific evidence. Define idempotency and ambiguous-outcome handling, backoff, and jitter where retries apply; verify exhaustion and overload behavior. A timeout does not prove absence of side effects. [WEB-AWS-RETRIES] |
| Application security | Implement protected transport, the approved identity integration, endpoint authorization, input/content validation, workflow checks, restrained error disclosure, audit logging, and management-surface restrictions as applicable. Supply negative-path evidence; authentication alone does not establish authorization. [WEB-OWASP] |
| Observability | Emit and verify complementary traces, metrics, and event logs for changed requests and asynchronous work. Demonstrate that the signals expose relevant outcomes and failure paths; instrumenting code alone does not verify collection or operational use. [WEB-OTEL] |
| Testing and delivery | Select unit, integration, system, regression, concurrency, failure, and performance checks according to changed risks. Record commands, inputs, artifact identity, environment, results, and gaps. Propose monitored rollout and recovery criteria when release work is in scope, using the actual delivery environment. [WEB-SRE-TESTING] [WEB-SRE-RELEASE] |

## Inputs

Before dependent implementation, obtain or explicitly record missing items:

- Authorized objective, task boundaries, approved business invariants, affected consumers, compatibility requirements, and measurable acceptance criteria. [WEB-OAS] [WEB-OWASP]
- Actual repository context, stack versions, service boundaries, contracts, database and broker semantics, external dependencies, existing build/test/migration tooling, and available integration environments. [WEB-PG-ISOLATION] [WEB-RABBITMQ] [WEB-SRE-TESTING]
- Applicable identity/security policy, data classification and handling constraints, operational objectives, capacity/retry budgets, recovery expectations, and task-specific access or change authority. These organizational facts require downstream input; public sources do not establish them. [WEB-OWASP] [WEB-AWS-RETRIES] [WEB-SRE-RELEASE]
- Designated business, consumer, platform, security, release, and independent acceptance contacts where the task needs their decisions. These are coordination roles to resolve for the project, not an asserted organization chart. [REPO-MANIFEST]

## Outputs and evidence boundaries

Produce a scoped implementation or an explicit blocked result; affected contracts and compatibility notes; transaction, migration, asynchronous, and resilience decisions applicable to the change; reproducible checks including negative paths; and a handoff recording remaining risks, recovery options, and unresolved decisions. Include only applicable outputs and explain omitted coverage. [WEB-OAS] [WEB-PG-ISOLATION] [WEB-PG-MIGRATION] [WEB-RABBITMQ] [WEB-AWS-RETRIES] [WEB-SRE-TESTING]

Report local checks, actual dependency integration, deployed observation, and independent acceptance separately. Record failures, unavailable environments, skipped checks, and unverified acceptance explicitly. A unit or mock pass proves only the tested boundary; deployed configuration and rollout behavior require their own evidence. A rollout proposal or canary design is not deployment authorization or evidence that a rollout occurred. [WEB-SRE-TESTING] [WEB-SRE-RELEASE]

## Ownership, exclusions, and handoffs

Backend Engineering owns the service-side implementation and its evidence within the authorized scope. Consumer owners coordinate contract adoption and presentation. Business owners decide product meaning and policy. Database/platform owners coordinate infrastructure, backups, recovery operations, and broker administration. Security/privacy owners supply policy and specialized decisions. Reliability/platform owners coordinate collection, alert operations, and capacity. Release and acceptance authorities retain their respective decisions. Resolve the actual project contacts before relying on a handoff. [REPO-MANIFEST] [WEB-OAS] [WEB-OWASP] [WEB-PG-MIGRATION] [WEB-RABBITMQ] [WEB-OTEL] [WEB-SRE-RELEASE]

The Domain does not own client UI implementation, invent business policy or infrastructure topology, certify regulatory compliance, grant privileged access, or authorize publication, deployment, destructive data operations, or production changes. Carry cross-service breaking changes, security exceptions, irreversible data effects, and unmet recovery requirements to the appropriate authorized project owner with concrete impacts and options. Domain activation does not supply those permissions. [REPO-MANIFEST] [WEB-OWASP] [WEB-PG-MIGRATION] [WEB-SRE-RELEASE]

## Kernel 4.0 lifecycle contract

Kernel owns activation, matching, stage scheduling, and task state; this Domain owns professional preparation, execution, independent evaluation, and summary. The four stage implementations are declared through `lifecycle.json`. There is no routine `task.md` presentation, digest approval, or professional-quality checkpoint imposed on ordinary tasks. Explicit user and platform authority continues to bind every stage. These are repository governance requirements from `AGENTS.md`, `docs/ARCHITECTURE.md`, and `docs/GOVERNANCE.md`.

1. **Prepare:** Verify actual backend context, authorized scope, required inputs, selected capabilities, their declared dependencies, and implementation-specific contracts. Kernel route selection uses exact `task_type` and priority; it does not enforce repository signals or capability dependencies. The Domain must perform those checks before execute. The route contract selects one capability per route with empty cross-capability dependencies; that does not eliminate the need to check task-specific technical prerequisites. Prepare produces a bounded work/verification contract and explicit gaps.
2. **Execute:** Perform authorized, context-verified work against the prepared contract; retain implementation decisions, checks, and failure evidence. Do not substitute guessed business rules, credentials, tooling, or guarantees for missing inputs. Continue feasible independent work when an ordinary failure leaves it safe and useful to do so.
3. **Evaluate:** An independent evaluator assesses the actual artifact and critical behavior against the contract and available evidence. Document completeness and schema validity cannot substitute for integration or deployed acceptance. [WEB-SRE-TESTING]
4. **Summarize:** State delivered behavior, verified boundaries, failures, blocked/skipped coverage, unresolved decisions, and next-owner handoffs. Distinguish proposed recovery and rollout from performed operations. [WEB-SRE-TESTING] [WEB-SRE-RELEASE]

Routing and capability details belong in `routes.json` and `capabilities.json`; professional invariants, procedure, and acceptance details belong in `rules/BASE.md`, `workflows/WORKFLOW.md`, and `evaluators/EVALUATOR.md`. The activation contract requires valid bindings for all four stages in `lifecycle.json`, supporting Skills, independent assessment of the current artifacts, and durable activation evidence. The manifest, registry, and their referenced evidence establish whether those gates are met; this document defines the requirement without asserting activation or product-task acceptance.

## Unknowns and failure behavior

Reviewers, internal architecture and standards, stack versions, commands, data/security policies, operational objectives, environment availability, permissions, and release/acceptance authority are task-specific `needs-org-input` until supplied. They do not prevent this public baseline from being authored and are not invented activation prerequisites. Record the decision needed, affected work, evidence missing, and owner to resolve it where known.

If backend context or a required selected capability/dependency is missing, report the precise mismatch and stop dependent execution; preserve feasible independent work and existing evidence. If a business or safety-critical guarantee cannot be justified from the selected implementation's authoritative contract, record `needs_input` for that guarantee. Missing access or environments produce blocked coverage, not a pass. Ordinary check failures remain visible for repair and independent evaluation. [WEB-PG-ISOLATION] [WEB-RABBITMQ] [WEB-SRE-TESTING]

If no Domain matches, visibly terminate the task and inform the user; do not execute through a generic or model-native fallback. A selected route that fails the Domain's context checks must likewise not become a fallback execution path. This follows the repository's Kernel/Domain boundary.

## Source traceability

Bracketed source IDs refer to the validated research ledger used for this iteration. They identify supporting baseline claims, not task permissions or product acceptance. Repository governance and the verified routing behavior above are explicit maintenance constraints; public engineering sources do not claim to define Kernel behavior. The professional ledger sources are `REPO-MANIFEST`, `REPO-REGISTRY`, `WEB-OAS`, `WEB-PG-ISOLATION`, `WEB-PG-MIGRATION`, `WEB-RABBITMQ`, `WEB-AWS-RETRIES`, `WEB-OWASP`, `WEB-OTEL`, `WEB-SRE-TESTING`, and `WEB-SRE-RELEASE`.
