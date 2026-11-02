---
name: ios-execute
description: Implement the execute lifecycle stage for native iOS tasks dispatched by Harness Kernel 4.0.
---

# iOS Execute

## Entry and execution boundary

Run only the dispatched execute stage for `engineering.ios`. Read the actual invocation,
task envelope, selected capability, supplied context and usable outputs from
[prepare](../ios-prepare/SKILL.md). Preserve the original invocation ID and `context_id`.
Apply [DOMAIN.md](../../DOMAIN.md), [ownership](../../owners.json),
[rules](../../rules/BASE.md), [workflow](../../workflows/WORKFLOW.md) and
[evaluation criteria](../../evaluators/EVALUATOR.md). Repository
[architecture](../../../../../docs/ARCHITECTURE.md) and
[governance](../../../../../docs/GOVERNANCE.md) assign routing, scheduling and task state
to Kernel 4.0. The host invokes this Skill and submits its factual receipt through the
existing lifecycle interface; do not manufacture an invocation or dispatch another stage.
There is no routine plan presentation, digest approval or quality checkpoint. Honor user
instructions, review-only intent and action-specific platform authorization.

Keep artifacts and redacted evidence in the explicitly selected target project's task
context with project-relative receipt references, not in Kernel or reusable Domain sources.
After interruption, reconcile observed side effects before continuing under the original
invocation ID; a missing receipt does not authorize replaying a mutation.

## Procedure

1. **Reconcile preparation with current facts.** Read the bounded scope, exclusions,
   requirements, acceptance journeys, native admission, configuration/dependency inventory,
   discovered commands, verification matrix, prerequisites and recovery approach. Inspect
   current project instructions, working state and changed inputs. Preserve dirty user work
   and record its ownership; do not overwrite, revert or attribute unrelated edits. Resolve
   overlaps with a recoverable approach before dependent mutation. Record deviations and
   update affected checks in task context when facts change.
2. **Recheck native admission and prerequisites.** Verify the affected native iOS target,
   source membership, platform/deployment settings and destination against current evidence.
   A route match or `.swift` file alone is insufficient. For macOS-only, server Swift,
   watchOS-only or unverified native scope, withhold dependent implementation and limit work
   to inspection/reporting needed to explain or resolve admission. Preserve the actual route;
   admission-blocked is not resolver `no_match` and permits no fallback Domain. Verify the
   selected capability's dependencies, tools, compatibility and permissions before each
   dependent action. Missing inputs stop that action while feasible independent work continues.
   Never invent schemes, commands, credentials, signing teams or device access. [IOS-UI] [IOS-UIKIT] [IOS-DEVICE]
3. **Honor execution intent.** For review-only tasks, inspect applicable surfaces, reproduce
   issues where authorized and produce scoped findings with evidence; do not force source or
   configuration changes. For implementation, change only agreed files/targets and necessary
   dependencies. Preserve existing architecture and actual deployment/API availability; add
   suitable availability handling where needed. Do not impose a SwiftUI/UIKit, Observation,
   storage, minimum-OS or toolchain migration. [IOS-UI] [IOS-UIKIT] [IOS-STATE]
4. **Implement state and lifecycle behavior.** Identify changed state owners, lifetimes,
   bindings and update paths. Deliver applicable initial/loading/success/empty/error,
   navigation, re-entry and recovery behavior in the agreed journeys. Respect documented
   UIKit UI-thread requirements and Swift actor isolation. Check assumptions across suspension
   points; give async work an explicit owner, lifetime and cooperative cancellation behavior.
   Prevent obsolete or cancelled completions from publishing invalid state. Verify repeated
   requests and lifecycle exit where affected using the actual language mode. [IOS-UI] [IOS-UIKIT] [IOS-STATE] [IOS-CONCURRENCY]
5. **Implement applicable integration and protection behavior.** Use the following bounded
   checks; justify inapplicable rows by scope and retain missing policy/access as unresolved.

| Surface | Required implementation and evidence |
| --- | --- |
| Data | Preserve explicit storage/schema/serialization/cache/sync contracts. For changed formats, verify representative supported existing data and migration/recovery behavior before claiming compatibility. Stop dependent destructive changes without established handling/authority. SwiftData remains optional. [IOS-DATA] |
| Network | Implement contract-based success/failure/unavailable behavior and secure transport. Inspect ATS settings; scope and justify exceptions with an authorized decision. Assess lower-level networking separately; never bypass trust evaluation to pass a check. Client success does not prove server correctness. [IOS-NETWORK] |
| Secrets | Use appropriate iOS Keychain handling for small stored secrets and check affected access/error paths. Keep credentials and personal data out of source, fixtures, logs and evidence; never import macOS-only Keychain assumptions. [IOS-SECRETS] [IOS-CONSENT] |
| Privacy and consent | Inspect actual app/SDK/API/data use and applicable privacy-manifest/required-reason requirements. Request protected resources when needed with accurate purpose strings and useful denied/unavailable fallback. Minimize collection; preserve missing lawful-purpose/retention/policy decisions for the responsible authority. Platform declarations establish no legal approval. [IOS-PRIVACY] [IOS-CONSENT] |
| Accessibility | Implement usable labels, order and operation for affected main tasks. Check relevant settings and assistive technologies, including applicable VoiceOver, Voice Control and Switch Control. Distinguish inspection, automation and exercised assistive-technology behavior. [IOS-ACCESSIBILITY] |

6. **Run bounded implementation checks.** Use commands/procedures discovered from the project
   and verified available tools. Record criterion ID, requirement, expected/actual outcome,
   changed artifacts, command/steps, scheme, configuration, deployment/toolchain/OS,
   destination, services/test data, exit/result status and inspectable evidence location.
   Select relevant build/unit/integration/UI/performance and negative-path checks from the
   prepared matrix. Preserve failed diagnostics; repair within scope and rerun affected checks
   where feasible, retaining earlier results. Label missing prerequisites and skipped/not-run
   coverage explicitly. Compilation alone proves neither concurrency behavior nor task
   completion; simulator results do not establish physical-device features/performance.
   [IOS-TEST] [IOS-CONCURRENCY] [IOS-DEVICE]
7. **Respect release authority.** Perform entitlement, signing, provisioning, archive or
   distribution actions only within scope and after verifying actual access, prerequisites,
   intended channel and action-specific authorization. Record actual results and limits;
   archive validation is limited screening, not publication or full release acceptance.
   [IOS-DEVICE] [IOS-DISTRIBUTION]

## Handoff and receipt

Produce reviewable changes or review findings, requirement-to-artifact references, current
implementation evidence/configurations, deviations, unresolved defects/access gaps and
project-specific recovery limits. Identify applicable `needs-org-input` for private architecture,
policies, device matrix, budgets, services, reviewers, acceptance/release authority and access.
Supply current artifacts for independent evaluation; self-checks are implementation evidence,
not an independent verdict. Changed artifacts invalidate prior digest-bound assessment.

Use the actual receipt contract: `context_id`, stage `status`, project-relative `artifacts`,
`checks`, `issues`, `assumptions` and `next_actions` as applicable, submitted against the
original invocation ID. Check IDs are stable; statuses are `passed`, `failed`, `unverified`
or `not_applicable`, with evidence arrays. Passed/failed checks need inspectable evidence;
map blocked/skipped/not-run checks to `unverified` with reasons. Do not invent receipt enums,
an evaluation completion verdict, acceptance or execution evidence.

Use `completed` when execution outputs are delivered, `partial` for partially available
outputs, `unavailable` when execution cannot be performed and `error` for a stage execution
error. These describe stage execution, not acceptance. Record ordinary failures and continue
feasible independent work; stop dependent unsupported, unsafe or unauthorized actions and
state the exact missing prerequisite and next step. Local passes, inspection and archive
validation establish no unperformed independent, physical-device or release acceptance.
[IOS-TEST] [IOS-ACCESSIBILITY] [IOS-DEVICE] [IOS-DISTRIBUTION]

Source IDs identify the validated authoring research: Apple platform documentation and
Swift.org concurrency documentation. Platform citations support technical content;
receipt/progression behavior follows the repository lifecycle contract.
