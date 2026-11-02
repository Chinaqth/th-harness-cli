# Responsibility Boundaries

The following ownership proposal is inferred from the registered Backend Engineering scope [REPO-MANIFEST] and the cited professional sources. It defines reusable engineering responsibilities, not an existing organization chart or a grant of production authority.

| Area | Backend Engineering responsibility | Boundary and coordination |
|---|---|---|
| Service interfaces | Own server-side contracts, validation, compatibility analysis, and implementation evidence. | Consumer/UI owners decide presentation and adoption; agree contract changes before breaking consumers. OpenAPI describes interfaces rather than granting ownership of consumers [WEB-OAS]. |
| Business behavior | Enforce approved invariants, authorization outcomes, and workflow transitions. | Product/domain owners supply business meaning and acceptance criteria; do not invent policy from technical convenience [WEB-OWASP]. |
| Persistence | Own service data access, transaction correctness, and migration implementation/rehearsal. | Coordinate backup, recovery, database operations, retention, and destructive actions with authorized owners. Isolation and alteration behavior require engine-specific verification [WEB-PG-ISOLATION] [WEB-PG-MIGRATION]. |
| Asynchronous services | Own producer/consumer contracts, processing effects, failure handling, and bounded concurrency. | Broker/platform owners own infrastructure operations; distinguish transport confirmation from successful business completion [WEB-RABBITMQ]. |
| Dependency reliability | Own application timeouts, retry safety, and idempotent effect handling. | Agree capacity and failure budgets with dependent-service and reliability owners; retries can worsen overload [WEB-AWS-RETRIES]. |
| Security | Implement and test application controls within the approved identity and policy model. | Identity/security/privacy owners supply specialized policy and approvals; this Domain does not certify compliance or invent authorization rules [WEB-OWASP]. |
| Observability | Emit and verify relevant application signals. | Coordinate telemetry collection, access, retention, and alert operations with platform/reliability owners; instrumentation alone does not establish operational readiness [WEB-OTEL]. |
| Testing and release | Own reproducible implementation verification and service rollout/recovery proposals. | Independent acceptance, production authorization, and release decisions remain with designated authorities. Local tests cannot prove deployed behavior [WEB-SRE-TESTING] [WEB-SRE-RELEASE]. |

## Handoff and escalation rules

Before implementation, identify actual stack versions, contracts, data effects, downstream dependencies, and acceptance authority. Public examples do not prescribe Java, Go, Python, Node.js, PostgreSQL, RabbitMQ, AWS, microservices, or a particular framework [WEB-OAS] [WEB-PG-ISOLATION] [WEB-RABBITMQ]. For non-HTTP protocols and alternative stores/transports, research the selected implementation's official contracts before making specific guarantees.

Escalate unresolved business rules, cross-service breaking changes, destructive migrations, privileged access, production mutations, security exceptions, and unmet recovery objectives to their downstream owners. Resolve these within task/project scope; do not treat reusable Domain activation as authorization. Release automation and canary practice describe safer delivery mechanisms, not permission to deploy [WEB-SRE-RELEASE].

Report verified local behavior, dependency integration, deployed observation, unavailable coverage, and independent acceptance separately. Passing tests reduce uncertainty within their tested environment; they do not erase configuration or rollout uncertainty [WEB-SRE-TESTING]. Preserve failures and blocked coverage rather than claiming completion from schema validation or document completeness.

The manifest and registry establish only the registered identity and draft starting state [REPO-MANIFEST] [REPO-REGISTRY]. Internal reviewers, permissions, standards, private architecture, commands, objectives, and approval evidence remain explicit downstream unknowns in the ledger; none is invented or marked as a reusable activation prerequisite.
