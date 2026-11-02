# Capability Map

Domain: `engineering.backend` — Backend Engineering, registered version `0.1.0`, draft, owner Albert. Identity and scope are repository facts [REPO-MANIFEST] [REPO-REGISTRY].

This is a reusable professional baseline inferred from authoritative public documentation retrieved on 2026-10-24. Capability descriptions are proposed Domain responsibilities, not claims that a product implementation or acceptance already exists. Source-specific examples establish concrete engineering concerns without selecting those products for downstream projects.

| Capability | Practical baseline and expected evidence | Sources |
|---|---|---|
| CAP-API-CONTRACTS | Document operations, payloads, validation, errors, and access requirements; identify consumer compatibility impacts and validate the chosen schema. | [WEB-OAS] [WEB-OWASP] |
| CAP-BUSINESS-LOGIC | Record invariants and allowed transitions; implement server-side enforcement and tests for invalid ordering and rejected actions. | [WEB-OWASP] [WEB-SRE-TESTING] |
| CAP-PERSISTENCE | Select transaction boundaries and isolation deliberately; reproduce competing writes and verify retry scope against the actual engine. | [WEB-PG-ISOLATION] |
| CAP-MIGRATIONS | Inventory existing data and dependent application versions; assess destructive operations, staging/backfill sequencing, and recovery or forward repair. | [WEB-PG-MIGRATION] [WEB-SRE-RELEASE] |
| CAP-ASYNC-PROCESSING | Separate broker acceptance from completed effects; define acknowledgements, duplicates, poison-message disposition, and bounded concurrency; exercise restart and redelivery failures. | [WEB-RABBITMQ] [WEB-AWS-RETRIES] |
| CAP-DEPENDENCY-RESILIENCE | Document timeout/retry budgets and idempotency; test ambiguous outcomes and exhausted retries without amplifying load. | [WEB-AWS-RETRIES] |
| CAP-SERVICE-SECURITY | Verify protected transport, authorization, workflow validation, safe errors, and restricted administration; retain negative-test and audit evidence. | [WEB-OWASP] |
| CAP-OBSERVABILITY | Use complementary request traces, measurements, and event logs; demonstrate useful signals across service and worker boundaries. | [WEB-OTEL] |
| CAP-TESTING-DELIVERY | Choose tests by changed risk; record actual commands, inputs, environment, artifact identity, outcomes, and coverage gaps. Define monitored rollout decisions and recovery criteria. | [WEB-SRE-TESTING] [WEB-SRE-RELEASE] |
| CAP-STACK-NEUTRALITY | Discover the target repository's language, framework, database, broker, and cloud before choosing executable implementation guidance. | [WEB-OAS] [WEB-PG-ISOLATION] [WEB-RABBITMQ] |

## Evidence limits and practical adoption

OpenAPI supports language-neutral HTTP contracts; it does not make every backend an HTTP service [WEB-OAS]. PostgreSQL and RabbitMQ demonstrate implementation-specific guarantees; re-check equivalents for a different datastore or transport [WEB-PG-ISOLATION] [WEB-RABBITMQ]. A mock or unit pass establishes only its tested boundary; deployed configuration and dependencies require separate evidence [WEB-SRE-TESTING].

For each downstream task, bind this baseline to its business requirements, exact stack versions, affected consumers, operational environment, and risk. Do not infer transaction isolation, message ordering, delivery guarantees, or rollback safety from tool names. Schema deletion can destroy data, and rolling back application code cannot itself prove restoration [WEB-PG-MIGRATION] [WEB-SRE-RELEASE].

The ledger records unknown reviewers, permissions, internal standards, private architecture, commands, reliability targets, and approvals as downstream gaps. Every `required_for_activation` is false; unknown project facts do not prevent a reusable baseline, and activation does not resolve those facts.
