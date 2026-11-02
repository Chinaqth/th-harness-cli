# Backend Task Evidence

Fill `<...>` fields from the actual task; duplicate rows as needed. Empty fields prove nothing.
Use `needs_input`/`needs-org-input` for unknown facts and identify affected work and resolver.
Follow the [workflow](../workflows/WORKFLOW.md), [rules](../rules/BASE.md), [evaluator](../evaluators/EVALUATOR.md)
and the four lifecycle Skills. This record supplies neither permission nor independent acceptance.
Kernel owns routing/scheduling/state; prepare verifies context and dependencies. No routine digest approval applies.

## Host correlation and receipt references

This is a human evidence template, not a Kernel JSON receipt, invocation, session record or
claim that any stage ran. Fill it only from inspected task records; the four stage Skills
require separate actual JSON receipts and host submission. For evaluate/summarize, keep new
receipts and evidence outside the state's tracked artifact set; do not fill or update a
tracked copy of this template during those stages. Put their observations in receipt fields.

- Maintained protocol source/runtime: `<host-selected Kernel source revision/runtime identity; inspected docs/LIFECYCLE.md, schemas/stage-result.schema.json, scripts/lifecycle.py and scripts/task_runtime.py>`.
- Selected product project: `<actual state.project_root; active project bridge evidence; task ID; task envelope/route/state references>`.

Use actual host/state records, never the current directory or Kernel checkout, to identify
the product root. Keep product-task records inside that project, normally `changes/<task-id>/`.
The host invokes Markdown Skills; Kernel dispatches, validates receipts and maintains state.
These protocol facts come from maintained Kernel sources, not the professional research ledger.

| Stage (one row per actual invocation) | Dispatched identity and binding | Actual receipt/submission and evidence correlation |
| --- | --- | --- |
| `<invocation.stage; round; or explicitly not invoked>` | `<exact invocation.id and invocation.context_id; engineering.backend version, capability IDs and lifecycle Skill; state reference>` | `<actual receipt locator; copied context_id; host submission against original invocation.id; accepted/rejected/unavailable observation and reference; check/assertion IDs and evidence locators>` |

IDs establish correlation only; they prove no execution, independence, authority or success.
Missing/inconsistent context holds dependent work and is reported to the host; never invent IDs.
On reconcile, inspect existing effects and evidence against the original pending invocation;
never replay a mutation merely because its receipt is missing or relabel stale/duplicate receipts.

For actual receipt production, follow the bound stage Skill and maintained protocol:

- `status` is exactly `completed`, `partial`, `unavailable` or `error` for stage execution,
  separate from professional verdicts and target completion. `completed` requires the actual
  stage work/handoff; documenting gaps does not assert product success. Put professional
  `blocked`, `needs_input` and `needs-org-input` in the narrative/`issues`, not `status`.
- `context_id` copies the dispatch exactly. `artifacts` contains only inspected existing
  product-project-relative files under verified `project_root`, with no absolute paths/escapes.
  Evaluate/summarize omit it or list only already tracked paths; adding a receipt/report changes
  the tracked digest. Record actual evidence locators without implying every locator is an artifact.
- `checks` objects have stable string `id`, `status` exactly `passed`, `failed`, `unverified`
  or `not_applicable`, and an `evidence` array. `passed`/`failed` require nonempty actual evidence.
  Planned/skipped/unavailable checks stay `unverified` with reasons; justify exclusions.
  Human assertion outcomes below are scoped professional findings, not these transport enums.
- Preserve unresolved `issues` with `code`/`message`; use `resolved_issue_ids` only for actual
  incoming IDs resolved by inspected evidence. Record factual `assumptions` and `next_actions`.
- If invocation/output is unavailable, malformed or unusable, the host uses maintained
  `task_runtime.py unavailable` with actual state, original invocation ID and factual reason.
  In particular, unperformed evaluation needs this path, not an invented completion/digest or
  an ordinary evaluate receipt labelled unavailable. Kernel structure acceptance proves no quality.

## 1. Prepare — identity, scope and readiness

- Task/request reference and objective: `<request; intended observable behavior>`.
- Domain, exact task type, selected capability: `engineering.backend`; `<task_type>`; `<capability ID and source>`.
- Repository/service and current artifact identity: `<revision plus changed/uncommitted content identity; baseline evidence>`.
- Authorized scope/exclusions and acceptance owner: `<surfaces; boundaries; authority reference; owner or gap>`.
- Business invariant/transition contract: `<approved rule; actors/resources/states; permitted and prohibited effects; source/owner>`.
- Consumers and compatibility obligations: `<affected contracts/versions; adoption decision; owner>`.
- Existing unrelated changes and preservation: `<observed changes; snapshot/isolation reference if needed>`.

Actual context and semantics must precede dependent implementation. Official examples mandate no stack. [REPO-MANIFEST] [WEB-OAS] [WEB-PG-ISOLATION] [WEB-RABBITMQ]

| Context/prerequisite | Actual fact/version and evidence | Readiness or missing input; dependent hold; resolver |
| --- | --- | --- |
| Backend repository signals and routed-task fit | `<observed source/configuration>` | `<verified/mismatch/gap; affected action; owner>` |
| Protocol/runtime/framework/engine/broker/client | `<selected components/versions; official versioned documentation and relevant semantics>` | `<verified/gap; affected claim>` |
| Requested capability and required references | `<manifest/capability; existing workflow/Skills/evaluator; requested coverage>` | `<availability; uncovered request>` |
| Declared dependencies and technical prerequisites | `<each dependency/tool/configuration; observed availability; verification>` | `<ready/gap; blocked slice; resolver>` |
| Authority, data policy and operational targets | `<scope/access/mutation/deployment permission evidence; handling policy; supplied budgets>` | `<needs-org-input if unknown; dependent action>` |

Record every lane as applicable or excluded with observed justification; apply cross-cutting risks to affected lanes.

| Lane/risk | Applicability and concrete contract/decision to fill | Positive/negative assertion IDs and required evidence level |
| --- | --- | --- |
| API contract | `<protocol; old/new payload/errors/access; consumer compatibility>` [WEB-OAS] [WEB-OWASP] | `<valid/rejected request; implementation conformance; IDs>` |
| Service invariants | `<server transition and actor/resource/state/order checks>` [WEB-OWASP] | `<permitted/prohibited effects; competing transitions; IDs>` |
| Persistence | `<engine/isolation/constraints; transaction/external-effect boundaries>` [WEB-PG-ISOLATION] | `<concurrent/failing writes; final state; complete-transaction retry; IDs>` |
| Migration | `<existing data; versions; sequencing/locks; destructive effects>` [WEB-PG-MIGRATION] | `<normal/partial/interrupted rehearsal; recovery/repair; IDs>` |
| Async processing | `<acceptance/acknowledgement/completion; duplicate scope; order/in-flight limits>` [WEB-RABBITMQ] | `<completion/redelivery/restart/poison disposition; effect counts; IDs>` |
| Dependency resilience | `<retry owner; supplied wait/attempt/duration/concurrency budgets; idempotency/reconciliation>` [WEB-AWS-RETRIES] | `<success/timeout-after-effect/overload/exhaustion; bounded effects; IDs>` |
| Security | `<transport/identity/access/validation/management and disclosure boundaries>` [WEB-OWASP] | `<authorized/missing-invalid-expired identity/resource rejection; safe errors/audits; IDs>` |
| Observability | `<traces/metrics/logs; safe correlation; collection/export boundary>` [WEB-OTEL] | `<success/failure signals; disclosure; operational-alert coverage separately; IDs>` |
| Verification/delivery | `<regression/system/performance criteria; rollout/stop/recovery authority>` [WEB-SRE-TESTING] [WEB-SRE-RELEASE] | `<candidate checks/stop/recovery assertions; IDs>` |

- Ordered bounded slices and prerequisites: `<sequence; ready slices; dependent holds; safe independent work>`.
- Discovered tooling inventory: `<exact build/lint/contract/test/migration/delivery invocations; maintained origin; working directory; safe configuration/data boundary; gaps>`.

## 2. Execute — observed evidence

Record actual observations, including failures, beyond exit codes. Never include secrets or private payloads.
Keep sanitized outputs/protected references; refresh affected evidence after changes. [WEB-OWASP] [WEB-SRE-TESTING]

- Implemented/attempted changes and decisions: `<slice; behavior; diff; current artifact identity; compatibility/data effects>`.
- Material drift and return to prepare: `<changed scope/semantics/authority/criteria; decision reference or none observed>`.

| Check/assertion and BE rule; positive/negative path | Artifact/build identity; observer/time | Exact discovered invocation, origin and working context | Environment/dependency versions/configuration; mocks; safe fixture/preconditions | Expected response/state/effects/signals | Observed response/final state/effect counts/signals; exit result | Outcome; evidence locator; limitations |
| --- | --- | --- | --- | --- | --- | --- |
| `<ID; rule; accepted journey>` | `<identity; author/context; time>` | `<actual command/tool; source; cwd>` | `<authorized environment; actual dependencies/substitutions; input>` | `<approved expectation/threshold source>` | `<actual observation or not run>` | `<pass/fail/blocked/unassessed; sanitized reference; claim boundary>` |
| `<ID; rule; rejected/failure journey>` | `<identity; observer/time>` | `<actual command/tool or undiscovered>` | `<initial state/actor; injected fault; boundary>` | `<safe rejection/recovery; prohibited effects absent>` | `<observed state/effects or unavailable>` | `<outcome; reference; reason/limits>` |

## 3. Independent evaluate — findings and scoped verdicts

- Genuine assessment transport: `<actual receipt reference; status; completion achieved/partial/unachieved with target-attainment evidence; or host unavailable record and reason>`.
- Snapshot freshness: `<exact invocation.artifact_digest; current artifacts_digest(state) before/after assessment and at submission; equality evidence; wider source/uncommitted/configuration identity and omissions>`.

Only a genuine independent target assessment returns `completion` exactly `achieved`, `partial`
or `unachieved` and `evaluated_digest` equal to both dispatched and current tracked-artifact
digests. `achieved` requires all required criteria evidenced; `partial` requires genuine assessment
with partial attainment/unresolved required coverage; `unachieved` requires evidence of nonattainment.
Blocked coverage alone proves no failure. If no value is supportable, use the host unavailable
path; Kernel completion remains `unassessed`. Professional `pass/fail/blocked/unassessed` below
are distinct. Digest equality covers only tracked paths/bytes, not omitted scope or independence.
Do not modify tracked files/reports during assessment or add new artifact paths; return changes
or inventory gaps to host/execute for reconciliation and fresh assessment.

- Evaluator identity/context/role, implementation author and independence limits: `<actual identities/context and provenance>`.
- Prepared contract/current assessed artifact and evidence references: `<identity; independent inspection/reproductions; assertion IDs>`.
- Finding: `<ID; behavior/artifact; rule; expected versus observed; safe reproduction; P0–P3 severity/impact; required correction; remaining coverage>`.

Report each dimension independently; no level implies another. Use the evaluator's verdict semantics. [WEB-SRE-TESTING]

| Evidence dimension | Current artifact; assessed assertions; observations/references | Scoped outcome and precise claim limits |
| --- | --- | --- |
| Local/static/mock | `<identity; checks; substitutions>` | `<outcome; demonstrated local boundary>` |
| Actual dependency integration | `<identity; real dependency/environment; checks>` | `<outcome; unavailable dependency coverage>` |
| Deployed observation | `<deployed candidate/configuration; authorized observations>` | `<outcome; unexercised deployed boundaries>` |
| Independent acceptance | `<independent evaluator; assessed identity/level; per-assertion verdict references>` | `<pass/fail/blocked/unassessed; scoped overall verdict; business-owner decision separately>` |

`pass` needs sufficient current independent evidence for all required applicable assertions; a demonstrated required violation yields `fail` even alongside blocks. Essential unavailable assessment inputs yield `blocked`; untouched assertions/revisions/independence remain `unassessed`. Preserve justified exclusions. Return corrections to execute and refresh changed evidence/assessment; never transfer verdicts across revisions.

## 4. Summarize — delivery, recovery and handoff

Return actual reviewable narrative in the summarize receipt's `summary` string. Read current
artifacts, prior receipts and Kernel-derived checklist without mutating professional artifacts
or tracked reports; save the receipt outside the tracked set, and introduce no artifact paths.
Do not issue `completion`, `evaluated_digest` or `repair_requested` as a summary verdict or edit
Kernel state/checklist. Return needed corrections to host/execute and refresh assessment.

- Current versus historical evaluation: `<Kernel checklist reference; evaluation_current; current completion; completion_at_evaluation; current/dispatched/evaluation digests; prior_status and freshness limits for downgraded checks>`.

Preserve current independent conclusions within their evidence boundary; no missing/stale
assessment becomes success or failure. Without current valid evaluation, target completion
remains `unassessed`. Summary-stage execution, professional verdict, environmental evidence
level and business-owner decision remain separate.

- Delivered behavior versus attempted/blocked scope: `<outcome; rationale; changed surfaces/current identity; assertion-to-result reconciliation>`.
- Coverage ledger: `<baseline/new failures; skipped/unavailable/blocked/unassessed checks; reasons; consequences; missing input/authority; safe completed work; next decision/owner>`.
- Recovery/forward repair proposal: `<trigger; affected versions/data; exact discovered procedure or gap; observation/stop criteria; irreversible effects; owner; permission required>`.
- Authorized operations actually performed: `<authority reference; exact operation; artifact/environment; observed result/evidence; or none>`.
- Recovery rehearsal/restoration coverage and residual risk: `<verified boundary; unmet requirements; untested restoration; remaining risk>`.

Keep proposed rollout/recovery distinct from performed operations; code rollback establishes no data restoration. [WEB-PG-MIGRATION] [WEB-SRE-RELEASE]

| Handoff/decision | Required input/action and affected claim; safe completed work | Actual designated owner or unknown role; evidence/next step |
| --- | --- | --- |
| Consumer/business/data-broker/security/telemetry/release-acceptance | `<one row per relevant boundary; unresolved decision; held action>` | `<actual owner or needs-org-input; reference; next action>` |

Bracketed source IDs resolve to the validated authoring ledger; they support professional sections, not project facts, task authority or acceptance. Repository contracts supply Kernel boundaries.
