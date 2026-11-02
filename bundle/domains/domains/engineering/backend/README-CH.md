# Backend Engineering Domain 中文导览

`engineering.backend` 由 Albert 担任主 Owner，提供技术栈中立的服务端工程实践。本文件忠实解释英文生产制品，供查阅职责、实际行为与证据边界；不新增政策、工具能力、权限或验收结论。当前身份、版本与生命周期状态以 [manifest](domain.json) 和[中央注册表](../../../registry/domains.json) 为准；Owner 与可选 Reviewer 以 [owners.json](owners.json) 为准，空 Reviewer 列表不代表已完成独立评估。[REPO-MANIFEST] [REPO-REGISTRY]

## 实际工作范围

[capabilities.json](capabilities.json) 声明以下九类聚焦能力；每类使用相同四阶段工作流，具体任务仍需覆盖所有受影响的横向风险。

| 精确任务类型／能力 ID | 职责与实际产出 |
| --- | --- |
| `backend.api-contract` | 定义操作、载荷、校验、错误和访问要求；比较消费者兼容性，并验证合法及拒绝请求。[WEB-OAS] [WEB-OWASP] |
| `backend.service-implementation` | 落实获准的服务端业务不变量与状态转换；检查身份、资源、状态、顺序及相关并发操作的实际效果。[WEB-OWASP] [WEB-PG-ISOLATION] |
| `backend.persistence` | 确定事务、约束和外部副作用边界；依据实际引擎验证隔离、并发写入、失败及必要的完整事务重试。[WEB-PG-ISOLATION] [WEB-AWS-RETRIES] |
| `backend.migration` | 检查既有数据、应用版本、锁及资源影响；安排迁移顺序，演练部分完成、中断与恢复或前向修复，并披露不可逆影响。[WEB-PG-MIGRATION] [WEB-SRE-RELEASE] |
| `backend.async-processing` | 区分接收、确认与持久业务完成；规定重复处理、在途上限、毒消息处置，并验证重投、重启和副作用次数。[WEB-RABBITMQ] [WEB-AWS-RETRIES] |
| `backend.dependency-resilience` | 明确重试所属层及项目提供的等待、次数、时长、并发预算；验证退避、抖动、幂等或对账，以及超时后已生效等不确定结果。[WEB-AWS-RETRIES] |
| `backend.service-security` | 在已提供的身份与政策模型内实现传输、访问、输入、工作流和管理面控制；用负向场景验证安全错误、审计与遥测披露边界。[WEB-OWASP] [WEB-OTEL] |
| `backend.observability` | 建立互补的追踪、指标和日志及安全关联；触发成功与失败路径，检查采集／导出，另述告警及运维使用覆盖。[WEB-OTEL] |
| `backend.verification-delivery` | 为当前候选制品提供按风险选择的测试证据；交付发布观察、停止和恢复方案，另记获授权且实际执行的操作。[WEB-SRE-TESTING] [WEB-SRE-RELEASE] |

语言、框架、数据库、消息系统、云及拓扑均由下游项目证据确定。OpenAPI、PostgreSQL 与 RabbitMQ 是来源中的具体例证，不是强制选型；非 HTTP 协议也需查明其实际契约。业务含义、消费者要求、真实版本、维护中的命令、环境与数据边界、政策、预算、权限及验收负责人由项目提供。缺失项按英文契约记录为 `needs_input`／`needs-org-input`，仅停止依赖该输入的行动，继续可行且已获授权的独立工作。

## 完整生产目录清单

以下路径均相对于本 Domain 根目录，包含 19 个非隐藏文件和 10 个子目录；不把隐藏占位文件计为生产说明项。每项链接指向已存在的对应制品或目录。

| 路径 | 职责与实际行为 |
| --- | --- |
| `DOMAIN.md` | [专业总契约](DOMAIN.md)：规定服务端职责、输入输出、边界、交接和失败行为，区分 Domain 专业责任与 Kernel 调度责任。 |
| `domain.json` | [机器 manifest](domain.json)：记录身份、版本、状态、Owner、适用任务与信号、协议兼容性及证据引用；与中央注册表共同提供实时状态。 |
| `owners.json` | [归属记录](owners.json)：声明主 Owner Albert 与可选 Reviewer 列表，供维护时定位责任；不替项目指定发布或验收权威。 |
| `lifecycle.json` | [生命周期绑定](lifecycle.json)：将 prepare、execute、evaluate、summarize 分别绑定至下列四个真实 Skill 路径。 |
| `capabilities.json` | [能力装配](capabilities.json)：为九类任务关联 Workflow、四个 Skill、Evaluator 和范围约束；当前工具及跨能力依赖列表为空，既不授予工具访问，也不证明项目技术前提满足。 |
| `routes.json` | [路由声明](routes.json)：九条精确任务路由各选一个同名能力，优先级均为 100；信号描述所需后端上下文，实际核验由 prepare 完成。 |
| `README-CH.md` | [本中文导览](README-CH.md)：枚举现有生产文件和目录，解释权威英文契约，供中文读者定位内容。 |
| `rules/` | [专业规则目录](rules/)：集中存放适用条件、约束、所需证据与失败动作。 |
| `rules/BASE.md` | [BE-01 至 BE-11](rules/BASE.md)：覆盖上下文、兼容性、业务与授权、事务、迁移、异步、重试、安全、可观测性、证据和交付恢复，要求保留失败与边界。 |
| `workflows/` | [工作流目录](workflows/)：存放四阶段顺序、进入条件、产出、验证矩阵与恢复交接流程。 |
| `workflows/WORKFLOW.md` | [执行工作流](workflows/WORKFLOW.md)：从准备契约进入有界实现和正负向验证，再交独立评估与总结；范围变化返回 prepare，修改后刷新相关证据。 |
| `evaluators/` | [评估契约目录](evaluators/)：存放服务端行为与证据的独立评估要求。 |
| `evaluators/EVALUATOR.md` | [专业评估契约](evaluators/EVALUATOR.md)：逐类评估真实服务旅程、负向路径和最终副作用，定义 P0–P3 问题级别与 `pass`、`fail`、`blocked`、`unassessed` 的范围化语义；产品任务评估与 Pack 维护评估分开。 |
| `skills/` | [阶段 Skill 目录](skills/)：存放 lifecycle 绑定使用的四个专业入口。 |
| `skills/backend-prepare/` | [准备入口目录](skills/backend-prepare/)：承载后端上下文与依赖核验的阶段实现。 |
| `skills/backend-prepare/SKILL.md` | [prepare 实现](skills/backend-prepare/SKILL.md)：核验实际后端信号、能力引用、依赖、版本、命令和权限，生成有界实施／验证契约、风险矩阵及缺口清单。 |
| `skills/backend-execute/` | [执行入口目录](skills/backend-execute/)：承载已准备任务的有界实现与检查。 |
| `skills/backend-execute/SKILL.md` | [execute 实现](skills/backend-execute/SKILL.md)：保护无关已有改动，按已就绪切片实现并检查响应、状态、次数和信号；保留失败，向独立评估交接当前制品及证据。 |
| `skills/backend-evaluate/` | [独立评估入口目录](skills/backend-evaluate/)：承载独立观察、复现与结论交接。 |
| `skills/backend-evaluate/SKILL.md` | [evaluate 实现](skills/backend-evaluate/SKILL.md)：使用独立于实现作者的上下文，核对当前制品身份并复现关键旅程及失败路径；记录证据层级、发现、结论和未覆盖边界。 |
| `skills/backend-summarize/` | [总结入口目录](skills/backend-summarize/)：承载结果核对、恢复说明与下一责任人交接。 |
| `skills/backend-summarize/SKILL.md` | [summarize 实现](skills/backend-summarize/SKILL.md)：核对当前修订、交付行为和评估结果，分开报告各证据层级、失败与缺口，区分建议恢复／发布和实际执行结果。 |
| `templates/` | [模板目录](templates/)：保存不含具体项目事实的可复用任务记录结构。 |
| `templates/task-evidence.md` | [任务证据模板](templates/task-evidence.md)：提供主机调用关联、四阶段填写字段、风险矩阵、命令与预期／实测效果、独立结论、覆盖缺口、恢复及交接表；它是人工证据结构，不是实际 JSON 回执，空字段不构成证据。 |
| `evidence/` | [支撑证据目录](evidence/)：保存来源、能力研究、责任边界与本地路由观察；不将研究或夹具结果提升为产品验收。 |
| `evidence/sources.json` | [验证过的来源账本](evidence/sources.json)：保存稳定来源 ID、定位、主张、能力研究假设与组织信息缺口，供英文制品追溯依据。 |
| `evidence/capability-map.md` | [能力研究映射](evidence/capability-map.md)：把研究能力假设映射至来源、预期证据与适用边界；含技术栈中立这一横向原则，实际九类路由以 capabilities/routes 为准。 |
| `evidence/responsibility-boundaries.md` | [责任边界研究](evidence/responsibility-boundaries.md)：区分后端、消费者、业务、数据库／消息平台、安全、可靠性和发布／验收职责，说明需要实际项目负责人补充的交接。 |
| `evidence/activation.md` | [本地来源就绪与路由观察](evidence/activation.md)：保存历史快照、激活后检查失败与状态回退时点，以及 18 项 Kernel 路由夹具、11 项合成回执场景和隔离 active 副本 54 项测试的身份、结果、复现代码与限制；作者观察记录不构成当前激活决定、独立评估或安装 Runtime 验证。 |

## 四阶段如何协作

依据 [DOMAIN.md](DOMAIN.md)、[lifecycle.json](lifecycle.json) 与[工作流](workflows/WORKFLOW.md)，Kernel 4.0 负责激活、精确 `task_type` 匹配及优先级、阶段调度和任务状态；Domain 负责 prepare → execute → 独立 evaluate → summarize 的专业工作。当前 Kernel 不强制核验仓库信号或能力依赖，因此路由命中后 prepare 仍需逐项核验，空依赖列表也不能代替真实技术前提检查。没有匹配 Domain 时可见地结束任务并告知用户；上下文核验失败不能转为通用或模型原生回退。

四阶段按英文契约传递当前制品身份、已获授权的范围、业务／兼容性决策、风险断言、可复现检查和缺口。普通任务没有例行 `task.md` 展示、摘要确认或专业质量审批门；用户与平台的明确授权始终有效。该说明不替代实际项目权限，也不把专业结论转成新的 Kernel 状态门。

## 主机调用与真实回执

四个阶段 Skill 与[任务证据模板](templates/task-evidence.md) 说明同一传输契约：主机实际调用 Markdown Skill，Kernel 调度阶段、验证回执并维护状态，不负责运行专业模型。主机按安装来源定位维护中的 Kernel 协议和实际 Runtime；这些接口不是下游产品的臆造命令。每次工作前核对真实调用的阶段、Domain／版本／能力／Skill 绑定、授权目标、状态中的显式 `project_root` 及有效项目桥接。产品根目录来自主机和任务记录，不能从当前目录或 Kernel checkout 推断；任务信封、路由、状态、回执及脱敏证据放在该产品项目中，通常为 `changes/<task-id>/`，不能写进 Kernel 源码仓库。

保存原始 `invocation.id`，并把分发的 `invocation.context_id` 原样复制到回执 `context_id`；缺失或不一致时向主机报告并停止依赖该上下文的工作，不能自造标识。精确关联只证明回执对应哪个调用，不证明真实执行、独立性、权限或成功。评估仍需真实、独立于实现作者的新上下文，并记录评估者、实现作者及独立性限制。

- 回执 `status` 仅为 `completed`、`partial`、`unavailable`、`error`，描述该阶段实际执行情况；`completed` 不能代表产品验收。专业 `blocked`、`needs_input`、`needs-org-input` 放在 `issues`／叙述中。`artifacts` 只列已检查存在的产品项目相对路径，不接受绝对路径或目录逃逸。
- `checks` 含稳定 `id`、事实状态 `passed`／`failed`／`unverified`／`not_applicable` 和 `evidence` 数组；通过与失败均需非空实际证据。计划、跳过或不可用检查保持 `unverified` 并说明原因，排除项说明适用性。保留未解决问题；仅凭实际证据解决原有问题 ID，并如实记录假设和下一行动。
- 主机通过维护中的 `record` 接口，以真实状态路径、原调用 ID 和保存的 JSON 回执提交并确认接受。`reconcile` 要先核对原待处理调用的既有副作用和证据，不能因缺回执盲目重放操作。重复、过期和上下文不符的回执需协调，不能换标识伪装成新结果。主机无法调用、崩溃或输出不可用时走真实 `record_unavailable`／CLI `unavailable` 路径；未执行评估不能用普通评估回执或虚构结论代替。
- 真正独立评估才提供 `completion=achieved`／`partial`／`unachieved`，以目标达成证据支持，并令 `evaluated_digest` 同时等于分发的 `invocation.artifact_digest` 和当前已跟踪制品摘要。缺环境或权限本身不能证明目标失败；无可支持的真实评估时走 unavailable，完成情况保持 `unassessed`。摘要只覆盖已跟踪路径与字节，不证明遗漏范围已覆盖或评估独立。
- evaluate／summarize 不修改已跟踪制品或报告，也不把新回执／报告加入跟踪集合；新增路径同样改变摘要。需要修改或补齐清单时交回主机／execute 协调并重新评估。summarize 在 `summary` 中返回实际叙述，不发布新 `completion`、`evaluated_digest` 或 `repair_requested` 修复请求；区分 `evaluation_current`、历史 `completion_at_evaluation`、当前完成情况及检查的 `prior_status`／新鲜度。缺失或过期评估保持 `unassessed`，不能由总结推成成功或失败。

## 如何阅读证据与历史状态

来源账本和能力／边界研究中的初始注册 `draft` 描述属于研究时点事实；路由报告中的临时 `active` 副本、故意无效输入与历史摘要只说明当次隔离夹具。实时状态查阅 manifest 与中央注册表，后续修订不能沿用旧摘要绑定的评估结论。

[evidence/activation.md](evidence/activation.md) 区分三类本地证据：18 项观察直接调用 Kernel 来源解析器，覆盖九类任务匹配、优先级、禁用／未知能力、版本不符、初始草稿排除及信号／依赖未强制执行；信号缺失或未解析依赖仍匹配是已知限制。另有 11 项合成回执场景调用真实 Kernel 调度／提交方法，使用合成绑定、制品与主机回执，覆盖上下文、状态、检查证据、路径、评估摘要、重复提交及 unavailable 等行为；其中合成 `achieved` 仅证明传输处理，四阶段结束也保留准备检查失败。第三类是在临时副本内仅把 backend 注册表／manifest 状态设为 active 后，运行实际完整验证器及 54 项测试；它验证 active 来源的结构检查，不是对当前仓库执行激活。

报告保留原始 finalizer 的激活输出及其后实际 active 检查因 prepare 缺少 `context_id` 而失败的证据：当时共运行 54 项测试、1 项失败；此前 draft 状态下的通过没有覆盖这条 active 专属断言。Builder 随后仅将 backend manifest／注册表状态恢复为 draft，这是历史回退时点，不能写成永久当前状态。修复后的合成回执和隔离 active 副本检查，以及作者重新执行的本地维护检查，均不能抹去旧失败，也不能沿用修复前评估授权当前结论。

以上夹具未执行 Markdown 阶段 Skill、独立专业模型评估、已安装 Runtime 或真实后端服务，也未验证真实数据库／消息系统、部署、遥测采集、迁移或恢复。实际当前状态仍查 manifest／注册表；当前最终 Pack 结论、独立验收和激活决定各需自己的最新证据，不能由本导览或这些夹具宣布就绪。

依照[评估契约](evaluators/EVALUATOR.md)，本地／静态／模拟、真实依赖集成、部署观察与独立验收分别报告；文件完整、Schema 通过、路由命中及作者测试均不能互相替代。发布或恢复方案须与已获授权且实际执行的操作分开；应用代码回退不能证明数据恢复。独立评估、Pack 激活、项目接受决定与运行环境验证各需其当前证据。权限、命令、预算、组织政策和验收负责人等未知事实仍留给下游任务补齐。[WEB-SRE-TESTING] [WEB-SRE-RELEASE]

本导览使用的稳定来源 ID 均见 [evidence/sources.json](evidence/sources.json)：REPO-MANIFEST、REPO-REGISTRY、WEB-OAS、WEB-PG-ISOLATION、WEB-PG-MIGRATION、WEB-RABBITMQ、WEB-AWS-RETRIES、WEB-OWASP、WEB-OTEL、WEB-SRE-TESTING、WEB-SRE-RELEASE。来源支持专业基线，不提供任务权限或产品验收；Kernel 边界来自仓库治理及英文契约。
