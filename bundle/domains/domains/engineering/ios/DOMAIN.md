# iOS Engineering

## Purpose

Own reusable native iOS engineering practice, bounded delivery, and independent evaluation. Turn an agreed app change into reviewable implementation and traceable evidence for its actual supported configurations. [IOS-IDENTITY] [IOS-TEST] [IOS-DEVICE]

## Ownership

- Domain ID: `engineering.ios`
- Primary owner: `Albert`
- Version: `0.1.0`
- Current lifecycle status: authoritative in [domain.json](domain.json), synchronized with the [registry](../../../registry/domains.json).
- Kernel protocol: `4.0`

Identity is defined by [domain.json](domain.json) and the [registry](../../../registry/domains.json). [IOS-IDENTITY] Under the repository [architecture](../../../docs/ARCHITECTURE.md) and [governance](../../../docs/GOVERNANCE.md), Kernel owns activation, matching, stage scheduling and task state; this Domain owns professional preparation, execution, independent evaluation and summary. There is no routine task-plan presentation or digest approval gate. User instructions and platform authorization remain binding.

## Native iOS scope

- Implement SwiftUI, UIKit and their interoperability according to the existing app architecture, deployment availability and task contract. Own app-side navigation, lifecycle, view/model state and observable success, loading, empty and failure behavior where applicable. Do not mandate a framework migration, minimum iOS version or toolchain version. [IOS-UI] [IOS-UIKIT] [IOS-STATE]
- Make state ownership, actor isolation, task lifetime and cancellation explicit. Respect documented UIKit main-thread requirements and relevant Swift concurrency isolation boundaries. [IOS-UIKIT] [IOS-CONCURRENCY]
- Deliver app-side persistence and network integration against explicit contracts. Select storage for actual requirements and availability; SwiftData is an option rather than a required migration. Inspect secure connection behavior and ATS exceptions; lower-level networking requires its own security assessment. [IOS-DATA] [IOS-NETWORK]
- Protect small secrets with appropriate Keychain use; inspect applicable privacy manifests, SDK and required-reason API use. Request protected resources when needed with purpose strings and useful denial fallback. Implement accessibility for the agreed main user tasks. [IOS-SECRETS] [IOS-PRIVACY] [IOS-CONSENT] [IOS-ACCESSIBILITY]
- Produce build, test, accessibility and device evidence suited to the change. Prepare signing/archive/distribution material only within verified access and task authorization. [IOS-TEST] [IOS-ACCESSIBILITY] [IOS-DEVICE] [IOS-DISTRIBUTION]

## Exclusions and handoffs

- Product/design authorities provide user journeys, content, priorities and acceptance requirements. Return implementation behavior, unresolved choices and accessibility evidence to them; framework implementation does not establish product acceptance. [IOS-UI] [IOS-ACCESSIBILITY]
- Service owners provide backend, identity and synchronization contracts. Own the iOS client and its observable outcomes; hand server correctness, availability and policy questions to the responsible service owner. [IOS-NETWORK] [IOS-DATA]
- Security/privacy/legal authorities supply organization policy, lawful purposes, retention and risk decisions. Supply applicable platform implementation and evidence; do not infer legal compliance or policy approval from platform documentation. [IOS-SECRETS] [IOS-PRIVACY] [IOS-CONSENT]
- Release authorities supply team/account access, signing assets, entitlements, channel and publication authorization. Return archive and distribution evidence with its limits. Xcode archive validation is limited automated screening, not complete release acceptance. [IOS-DEVICE] [IOS-DISTRIBUTION]
- Other platform and backend implementation belongs to its responsible Domain. Multiplatform framework availability does not extend this Domain beyond its registered native iOS remit. [IOS-IDENTITY] [IOS-UI] [IOS-UIKIT]

## Inputs and evidence-bearing outputs

Accept a bounded task, product requirements and acceptance journeys; actual project structure and architecture; deployment targets, language/toolchain settings, schemes and run destinations; dependencies and service/data contracts; available tools, devices and permissions; and relevant organization policies. Unknown project facts remain explicit inputs to resolve, not reusable defaults. [IOS-UI] [IOS-STATE] [IOS-DEVICE] [IOS-CONSENT]

| Domain stage | Required output |
| --- | --- |
| Prepare | Scope and affected targets; state/lifecycle and integration boundaries; actual build/test commands and configurations; applicable verification matrix; assumptions and access gaps. [IOS-UI] [IOS-UIKIT] [IOS-STATE] [IOS-DEVICE] |
| Execute | Reviewable code/configuration changes tied to scope, reproducible implementation checks, and recorded deviations or failures. Cover applicable concurrency, data, protection and accessibility behavior. [IOS-CONCURRENCY] [IOS-DATA] [IOS-NETWORK] [IOS-SECRETS] [IOS-PRIVACY] [IOS-CONSENT] [IOS-ACCESSIBILITY] |
| Independently evaluate | Assessment by an evaluator independent of implementation authorship, using actual acceptance journeys and appropriate unit, integration, UI, performance, accessibility and device checks. Record criteria, configurations, results, evidence references, defects and unavailable coverage. [IOS-TEST] [IOS-ACCESSIBILITY] [IOS-DEVICE] |
| Summarize | Handoff identifying delivered behavior, evidence-supported conclusions, unresolved risks, blocked/skipped coverage, project-specific recovery information and authorized next steps. Keep local checks, simulator evidence, physical-device evidence and release acceptance distinct. [IOS-TEST] [IOS-DEVICE] [IOS-DISTRIBUTION] |

These stage responsibilities follow repository governance; the cited platform sources support the technical content and limits of their outputs.

## Failure behavior

Record an ordinary failure, its affected criterion and supporting diagnostic evidence; continue feasible independent work. Report whether a criterion passed, failed or was blocked, and distinguish skipped checks. A failed build/test is not a pass, and unavailable device, service, assistive-technology or distribution access is not successful verification. Simulator execution does not establish physical-device performance or feature behavior. [IOS-TEST] [IOS-ACCESSIBILITY] [IOS-DEVICE] [IOS-DISTRIBUTION]

When requirements or compatibility are unresolved, inspect available project evidence and bound the affected action. When permissions, credentials, signing access or external contracts are missing, stop only dependent actions and request the concrete missing input through the task context. Preserve applicable authorization boundaries; do not invent access, bypass platform controls or broaden scope to conceal a failure. Protected-resource denial must lead to an appropriate app fallback. [IOS-DEVICE] [IOS-DISTRIBUTION] [IOS-CONSENT]

## Maturity and unresolved organization inputs

Pack activation attests to the completeness and validation of reusable Domain content under repository governance, including routing, capability contracts, lifecycle stage implementations, professional rules, evaluators and durable activation evidence. It does not establish product acceptance, physical-device verification, Runtime success or release acceptance. Preparation artifacts and source research likewise do not establish those outcomes; each requires its own applicable evidence and authority. [IOS-IDENTITY] [IOS-TEST] [IOS-DEVICE] [IOS-DISTRIBUTION]

Keep the following as `needs-org-input` in downstream tasks when relevant: reviewers and acceptance/release authorities; private architecture and standards; supported OS/device matrix and performance budgets; schemes and commands; tool/device/service availability; signing and entitlement permissions; privacy/security/legal policy; distribution channel; acceptance evidence and recovery arrangements. They do not prevent authoring this public baseline, but can limit execution or acceptance. [IOS-IDENTITY] [IOS-CONSENT] [IOS-DEVICE] [IOS-DISTRIBUTION]

Source IDs resolve in the validated [durable source ledger](evidence/sources.json). Authoring provenance does not replace the activation evidence required by repository governance.
