# Responsibility Boundaries

## Owned baseline

The Domain owns bounded native iOS engineering: Swift/SwiftUI/UIKit implementation and interoperability, app-side lifecycle and state ownership, concurrency, suitable local persistence, secure client integration, applicable privacy configuration, accessibility implementation, technical verification and delivery evidence. It does not prescribe a universal architecture, SwiftData migration, minimum OS version or Swift language mode. Those decisions depend on the actual app and supported configurations. [IOS-IDENTITY] [IOS-UI] [IOS-UIKIT] [IOS-STATE] [IOS-CONCURRENCY] [IOS-DATA]

UIKit's documented main-thread restrictions and Swift's isolation rules are technical constraints. A compiling concurrent program is not by itself proof of correct product logic, cancellation behavior, UI flow or backend integration. Verification must test the relevant behavior. [IOS-UIKIT] [IOS-CONCURRENCY] [IOS-TEST]

## Handoffs and exclusions

- **Product and design:** Require concrete user journeys, content and acceptance requirements from the downstream task. Native UI frameworks enable implementation; they do not determine product priorities or approve the experience. Engineering supplies implementation and accessibility evidence for the agreed tasks. [IOS-UI] [IOS-ACCESSIBILITY]
- **Backend and identity services:** Own the iOS client integration and its observable outcomes. Server API semantics, service availability, server data integrity and identity-provider policy require the responsible service contract. ATS protects supported client connections but does not establish server correctness or cover every lower-level networking API. [IOS-NETWORK]
- **Data and architecture:** Own bounded app-side persistence work against an explicit data contract. SwiftData documentation establishes an available technology, not authority to replace an existing store or decide organization retention and synchronization policy. [IOS-DATA]
- **Security, privacy and legal:** Implement applicable platform mechanisms, protect small secrets, inspect SDK/API usage and support purpose strings, consent-related UI and denial fallback. Platform documentation does not establish lawful processing, retention, privacy notices, threat acceptance or regulatory compliance; obtain those project decisions from their designated authority. [IOS-SECRETS] [IOS-PRIVACY] [IOS-CONSENT]
- **Devices and acceptance:** Simulator runs provide useful coverage but do not reproduce every physical-device feature or performance characteristic. Missing physical-device, assistive-technology or service access must remain an explicit evidence gap; local build success cannot substitute for unavailable coverage. [IOS-DEVICE] [IOS-ACCESSIBILITY] [IOS-TEST]
- **Signing and distribution:** Prepare and inspect archives and applicable signing/distribution prerequisites within authorized access. Program membership, team roles, credentials, entitlements and product release authorization are downstream inputs. Limited Xcode archive validation does not imply TestFlight, App Store or organizational acceptance. [IOS-DISTRIBUTION]
- **Other platforms:** SwiftUI's multiplatform APIs and UIKit's wider platform coverage do not expand this Domain's registered ownership to macOS, watchOS, visionOS, Android, HarmonyOS, web or backend implementation. Route those deliverables to their responsible Domain while retaining explicit iOS integration boundaries. [IOS-IDENTITY] [IOS-UI] [IOS-UIKIT]

## Downstream unknowns

Reviewers, permissions, internal standards, private architecture, product commands, supported device/OS matrix, performance budgets, distribution channel, approval evidence and recovery arrangements are unknown. Record and resolve them per project/task. Every gap in `sources.json` has `required_for_activation: false`: these unknowns limit downstream execution or acceptance when relevant; they do not prevent publishing a reusable public professional baseline. The Boolean treatment comes from the supplied research contract, not an Apple platform requirement. [IOS-IDENTITY] [IOS-DEVICE] [IOS-DISTRIBUTION]

Independent evaluation must preserve what each evidence source can establish: test results, device coverage and distribution screening support different conclusions. An evaluator should assess actual results and disclose unavailable coverage without inventing organizational approvers or declaring product acceptance from preparation artifacts. [IOS-TEST] [IOS-DEVICE] [IOS-DISTRIBUTION]
