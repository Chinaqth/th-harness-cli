# iOS Engineering 中文使用与目录导览

`engineering.ios` 负责原生 iOS 工程的准备、交付、独立评估与总结，Owner 为 Albert。当前版本和生命周期状态以 [`domain.json`](domain.json) 与[中央注册表](../../../registry/domains.json)为准。本文件是英文生产契约的中文导览，不新增规则、权限或组织政策；专业边界见 [`DOMAIN.md`](DOMAIN.md)，调度与治理见[架构](../../../docs/ARCHITECTURE.md)和[治理](../../../docs/GOVERNANCE.md)。

## 第一次如何使用

你可以先提供“项目位置 + 希望完成的目标”，例如检查某个 iPhone 页面的问题或实现已明确的功能。任务上下文需要明确项目、需求与可观察的验收目标、受影响的目标范围，以及是实施还是只读审查；尚不清楚的内容由准备阶段检查项目并列出缺口。无需预先猜测 Xcode scheme（构建和运行方案）、命令、工具版本或设备：准备阶段从实际项目、文档和可用工具中发现并验证它们。[准备 Skill](skills/ios-prepare/SKILL.md)与[交付模板](templates/DELIVERY.md)说明所需记录。

本 Domain 可处理 SwiftUI、UIKit 及互操作、应用侧导航与状态生命周期、并发与取消、持久化、客户端网络、密钥保护、适用的隐私和权限配置、无障碍、测试与分发准备。它尊重现有架构和部署兼容性，不统一指定最低 iOS 版本、框架迁移或 SwiftData。产品需求与体验决策、服务端实现、组织安全隐私与法律决策、发布授权分别交接给对应责任方；其他平台实现不在本 Domain 范围内。完整说明见 [`DOMAIN.md`](DOMAIN.md)和[责任边界](evidence/responsibility-boundaries.md)。

[路由](routes.json)中的以下五个精确任务类型均映射到唯一能力 [`ios.native-engineering`](capabilities.json)：

| 任务类型 | 用途 |
| --- | --- |
| `ios.native-development` | 有界的原生 iOS 实施工作。 |
| `ios.native-review` | 原生 iOS 工程审查，按任务输出有证据的问题，不强制修改源码。 |
| `ios.testing` | 根据需求和风险选择并记录实际测试。 |
| `ios.accessibility` | 检查受影响主要任务的无障碍行为与覆盖情况。 |
| `ios.distribution-preparation` | 在适用授权与访问条件下准备签名、归档和分发材料。 |

Kernel 4.0 当前按精确 `task_type` 匹配；路由中的平台信号是适用性元数据，并非 Kernel 已执行的平台过滤。准备阶段还要验证实际原生 iOS target（构建目标）、源码归属、平台与部署设置及运行目的地。单个 `.swift` 文件、多平台框架名称或 `ios.*` 类型不构成准入证据；macOS-only、server Swift、watchOS-only 或尚未证实的 iOS 范围会阻止依赖该准入的动作。已选 Domain 的 `admission-blocked` 与解析器 `no_match` 不同，不可改写为后者或启用专业回退；真正无匹配 Domain 时任务立即结束。见[工作流](workflows/WORKFLOW.md)与[仓库说明](../../../README.md)。

任务类型或能力选择本身不授予源码编辑、签名、设备操作、分发、提交、推送或发布权限。[能力契约](capabilities.json)要求逐动作验证实际任务授权和平台权限。Reviewer、独立验收与发布责任人、私有架构和规范、设备/OS 矩阵、性能预算、服务与凭据、签名团队和组织政策等未知信息，在下游任务相关时记为 `needs-org-input`，在依赖动作前解决；它们无需全部预先齐备才能提供可复用的公共基线。缺失条件仅阻止依赖动作，其他可行工作继续，见 [`DOMAIN.md`](DOMAIN.md)与[来源账本](evidence/sources.json)。

## 四阶段如何协作

Kernel 负责激活、匹配、阶段调度与任务状态；宿主只调用已派发阶段的 Domain Skill，并按既有接口提交事实回执。[`lifecycle.json`](lifecycle.json)绑定以下四阶段，[工作流](workflows/WORKFLOW.md)规定交接；日常任务不新增计划展示、摘要批准或质量审批关卡，用户指令与平台授权仍然有效。

| 阶段与权威实现 | 实际行为与交付 |
| --- | --- |
| [prepare](skills/ios-prepare/SKILL.md) | 验证范围与原生准入，检查用户已有改动、架构与兼容性，发现真实方案、工具和命令，形成步骤、验证矩阵、恢复安排与访问缺口。 |
| [execute](skills/ios-execute/SKILL.md) | 按范围实施并运行适用检查，保留失败诊断、偏差和恢复限制；只读审查则交付可复现问题与证据。 |
| [evaluate](skills/ios-evaluate/SKILL.md) | 由独立于实施作者的评估上下文，针对当前制品摘要验证需求、主流程与相关负向路径，记录配置、证据、问题和修复建议。不同关联 ID 本身不能证明独立性。 |
| [summarize](skills/ios-summarize/SKILL.md) | 汇总实际交付、当前独立评估、失败与未覆盖项、风险、恢复和下一责任方；不借总结修改专业制品或补做发布。 |

阶段状态 `completed`、`partial`、`unavailable`、`error` 描述阶段执行；检查回执使用 `passed`、`failed`、`unverified`、`not_applicable`，通过和失败均需证据，阻塞或跳过以原因说明并映射为 `unverified`。专业评估采用 `pass`、`fail`、`blocked`、`unassessed`，与回执检查状态及 `completion` 分开记录。普通失败保留诊断，继续可行工作；制品变化会使旧摘要绑定评估失效，需要对当前制品重新独立评估。详见[评估器](evaluators/EVALUATOR.md)、[交付模板](templates/DELIVERY.md)与[总结 Skill](skills/ios-summarize/SKILL.md)。

任务记录和脱敏证据保存在选定目标项目的任务上下文，不放进 Kernel 或可复用 Domain 源码库。必须分别说明本地检查、模拟器、真机、辅助技术实际操作、独立产品验收与发布验收；模拟器不证明真机特性或性能，归档验证只提供有限自动筛查。源码 Pack 成为可用的 active Pack，也不等于已安装 CLI Runtime 可用或运行成功，更不等于设备、产品或发布验收。见[仓库说明](../../../README.md)、[`DOMAIN.md`](DOMAIN.md)和[交付模板](templates/DELIVERY.md)。

## 当前生产目录与文件清单

以下覆盖本目录全部非隐藏生产项：19 个文件、10 个子目录，另列根目录本身。目录链接用于定位，其行为以所链接的英文制品为准。

| 目录 | 职责与实际行为 |
| --- | --- |
| [`./`](.) | Domain Pack 根目录，汇集身份、能力、路由、四阶段实现和专业契约；整体职责见 [`DOMAIN.md`](DOMAIN.md)。 |
| [`rules/`](rules/) | 保存专业不变量，由 [BASE.md](rules/BASE.md)定义适用性、检查、证据与失败处理。 |
| [`workflows/`](workflows/) | 保存可重复交付流程，由 [WORKFLOW.md](workflows/WORKFLOW.md)规定四阶段步骤与交接。 |
| [`evaluators/`](evaluators/) | 保存独立评估契约，由 [EVALUATOR.md](evaluators/EVALUATOR.md)定义准则、结论与证据要求。 |
| [`templates/`](templates/) | 保存任务输出结构，[DELIVERY.md](templates/DELIVERY.md)由目标项目的观察事实填充，不预设项目配置。 |
| [`skills/`](skills/) | 保存四个实际阶段实现，由 [`lifecycle.json`](lifecycle.json)逐阶段引用。 |
| [`skills/ios-prepare/`](skills/ios-prepare/) | 封装准备入口，执行其 [SKILL.md](skills/ios-prepare/SKILL.md)的准入、发现与规划步骤。 |
| [`skills/ios-execute/`](skills/ios-execute/) | 封装实施入口，执行其 [SKILL.md](skills/ios-execute/SKILL.md)的有界变更或审查与自检步骤。 |
| [`skills/ios-evaluate/`](skills/ios-evaluate/) | 封装独立评估入口，执行其 [SKILL.md](skills/ios-evaluate/SKILL.md)的当前制品验证与结论记录。 |
| [`skills/ios-summarize/`](skills/ios-summarize/) | 封装总结入口，执行其 [SKILL.md](skills/ios-summarize/SKILL.md)的事实核对、时效检查与交接。 |
| [`evidence/`](evidence/) | 保存可持续引用的研究与历史验证来源；[来源账本](evidence/sources.json)和[生命周期证据](evidence/lifecycle-v4.json)分别说明来源与证明范围。 |

| 文件 | 职责与实际行为 |
| --- | --- |
| [`DOMAIN.md`](DOMAIN.md) | 定义目标、Owner、原生 iOS 范围、输入输出、交接和失败边界；约束专业交付并区分 Pack 成熟度与产品验收。 |
| [`domain.json`](domain.json) | 记录身份、当前版本/状态、适用任务类型、兼容性与激活证据引用；与中央注册表同步，供注册与兼容性校验使用。 |
| [`owners.json`](owners.json) | 记录主 Owner Albert，当前 Reviewer 列表为空；提供责任归属，不虚构下游验收或发布责任人。 |
| [`capabilities.json`](capabilities.json) | 声明唯一 `ios.native-engineering` 能力及五类任务，组装工作流、四个 Skill 和评估器，规定权限边界；工具与跨 Domain 依赖列表为空，不承诺已安装工具或自动授予访问。 |
| [`routes.json`](routes.json) | 以单一路由将五个精确任务类型映射到该能力，记录优先级与适用性信号；实际原生准入交给 prepare 验证。 |
| [`lifecycle.json`](lifecycle.json) | 将 `prepare`、`execute`、`evaluate`、`summarize` 绑定到四个真实 Skill 文件，供阶段调度引用。 |
| [`README-CH.md`](README-CH.md) | 本中文使用和目录导览；解释现有生产行为，不替代 [`DOMAIN.md`](DOMAIN.md)、[工作流](workflows/WORKFLOW.md)等英文权威契约。 |
| [`rules/BASE.md`](rules/BASE.md) | 定义 R1–R10：兼容与架构、状态生命周期、并发、数据、网络、密钥、隐私权限、无障碍、验证证据及发布权限；各项均有适用范围、检查、证据和失败处理。 |
| [`workflows/WORKFLOW.md`](workflows/WORKFLOW.md) | 规定四阶段入口、顺序动作、输出、失败与交接，回执关联和中断恢复；缺少回执不构成重放副作用的授权。 |
| [`evaluators/EVALUATOR.md`](evaluators/EVALUATOR.md) | 定义独立性、I1–I9 风险适用准则、负向路径、严重度与结论聚合；验证当前制品并披露继承证据、阻塞和未评估范围，不在评估时修改被评制品。 |
| [`templates/DELIVERY.md`](templates/DELIVERY.md) | 提供任务身份、准入、真实命令与配置、实施/审查、逐准则评估、证据分层、恢复和下一责任方的记录表；填充后的项目记录不替代生命周期回执。 |
| [`skills/ios-prepare/SKILL.md`](skills/ios-prepare/SKILL.md) | 实现派发的准备阶段：保护用户已有工作、验证原生准入、发现兼容与依赖、建立行动步骤和验证矩阵，再返回事实回执与未决输入。 |
| [`skills/ios-execute/SKILL.md`](skills/ios-execute/SKILL.md) | 实现派发的执行阶段：复核准备与权限，按范围实施或审查，检查适用技术边界，保留失败与偏差并交给独立评估。 |
| [`skills/ios-evaluate/SKILL.md`](skills/ios-evaluate/SKILL.md) | 实现派发的评估阶段：建立独立性和摘要时效，验证准入与实际配置，执行相关准则，返回当前评估和有界修复建议；不伪造未执行阶段的回执。 |
| [`skills/ios-summarize/SKILL.md`](skills/ios-summarize/SKILL.md) | 实现派发的总结阶段：核对范围、交付、评估独立性与时效，分层呈现证据与未覆盖项；缺少或过期评估保留为未评估，制品变化按既有 Kernel 新鲜度规则处理。 |
| [`evidence/sources.json`](evidence/sources.json) | 保存 14 个来源 ID、出处、提取主张、能力研究假设与组织缺口；为技术主张提供可追溯研究，不证明工具、项目、设备或发布已验收。 |
| [`evidence/capability-map.md`](evidence/capability-map.md) | 保存草稿研究时点的能力假设与预期证据映射；其中 `ios.prepare` 等为研究分工名称，当前可选择能力以 [`capabilities.json`](capabilities.json)为准，开头状态/版本描述是历史快照。 |
| [`evidence/responsibility-boundaries.md`](evidence/responsibility-boundaries.md) | 解释研究支持的专业拥有范围、产品/服务/安全法律/设备/发布交接与下游未知输入；保持平台机制和组织决定、模拟器和真机证据的边界。 |
| [`evidence/lifecycle-v4.json`](evidence/lifecycle-v4.json) | 保存临时候选快照上的实际 Kernel 路由结果、四阶段绑定与摘要、来源账本摘要和历史独立制品评估快照。它是历史候选路由与制品审查来源，不声称当前激活、最终 Pack 结论、完整套件或宿主四阶段执行；制品改动后旧摘要评估不再证明当前内容。 |

## 来源与维护时的阅读顺序

先读 [`DOMAIN.md`](DOMAIN.md)了解范围，再读[规则](rules/BASE.md)、[工作流](workflows/WORKFLOW.md)和[评估器](evaluators/EVALUATOR.md)，按实际派发阶段进入对应 Skill，使用[模板](templates/DELIVERY.md)记录项目事实。能力、路由与阶段绑定分别以各自 JSON 为准；研究文件中的草稿身份、能力假设和历史候选状态不是当前注册状态或实际验收结果。

技术来源均由持久化[来源账本](evidence/sources.json)解析：`IOS-IDENTITY`、`IOS-UI`、`IOS-UIKIT`、`IOS-STATE`、`IOS-CONCURRENCY`、`IOS-DATA`、`IOS-NETWORK`、`IOS-SECRETS`、`IOS-PRIVACY`、`IOS-CONSENT`、`IOS-TEST`、`IOS-ACCESSIBILITY`、`IOS-DEVICE`、`IOS-DISTRIBUTION`。Apple 与 Swift.org 来源支持技术内容；Kernel 调度、回执、独立性和失败推进遵循仓库治理与英文生产契约。研究材料与历史候选证据均不替代当前产品、真机、安装 Runtime 或发布验收。
