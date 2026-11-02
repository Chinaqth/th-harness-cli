# Local Source Readiness and Routing Evidence

## Scope and authority

This author report records 18 observed local Kernel routing fixtures supplied on 2026-10-24 for `engineering.backend` version `0.1.0`, owner Albert, protocol `4.0`. It is source evidence for Pack maintenance, not an activation decision, independent evaluation, installed Runtime verification, or product readiness claim. The initial captured source snapshot contained a draft manifest/registry entry; temporary copies alone were made active or intentionally invalid. No production registry or manifest was mutated by the fixture script. Consult the live [manifest](../domain.json) and [registry](../../../../registry/domains.json) for lifecycle status after this historical observation. [REPO-MANIFEST] [REPO-REGISTRY]

The author read the actual [lifecycle](../lifecycle.json), [capabilities](../capabilities.json), [routes](../routes.json), and four linked stage Skills. The lifecycle binds prepare, execute, evaluate and summarize to `skills/backend-{stage}/SKILL.md`. All nine task types have an exact route, matching capability, priority 100 and the four Skill references. Each capability declares empty tools and dependencies; these fields grant no tool access and prove no task-specific prerequisite. The [prepare contract](../skills/backend-prepare/SKILL.md) requires actual backend context, capability/reference/dependency checks, maintained commands, versions and authority before dependent execution. Those are contractual instructions, not executed proof.

Durable supporting evidence: [validated source ledger](sources.json), [capability map](capability-map.md), [responsibility boundaries](responsibility-boundaries.md), [Domain contract](../DOMAIN.md), [rules](../rules/BASE.md), [workflow](../workflows/WORKFLOW.md), [evaluation contract](../evaluators/EVALUATOR.md), and [task evidence template](../templates/task-evidence.md). Ledger citations here are REPO-MANIFEST, REPO-REGISTRY and WEB-SRE-TESTING; the latter supports keeping test boundaries distinct, not these fixture outcomes. Repository governance supplies Kernel ownership. The ledger's initial registration facts are historical; live files remain authoritative.

## Observed method and immutable identity

The recorded command was `python3 changes/engineering.backend-completion/checks/route-fixtures.py` from the Domain Pack repository, using sibling Kernel source at `/Users/albertq/harness-work-space/harness-engineering-workstation`. The fixture imported `resolve_route.resolve`, `source_tree.tree_digest` and `schema_validation.validate_instance`; it validated each envelope against the Kernel task-envelope schema before invoking resolve directly with a content digest. It copied `DOMAIN_ENTRIES` into a temporary directory, then made one isolated copy per scenario. The raw outputs include temporary paths under macOS `/private/var/folders/.../T/backend-route-ok2iy8if/`; they are not persistent artifacts. Author inspection environment: macOS 26.6.2 arm64, system `python3` 3.9.6. The raw recording does not independently attest the original interpreter version or exact run timestamp; 2026-10-24 is the supplied observation date, not a fabricated precise timestamp.

The raw JSON and original script were inspected under the task's temporary `changes/engineering.backend-completion/checks/` directory. The durable tables and full reproduction code below preserve the meaningful results when that directory is removed. Hashes identify historical content; they do not assert archived byte availability or equivalence to later source edits. Initial snapshot digest covers the complete Domain source entries, not only this Pack. Adding this report and other evidence changes subsequent digests.

| Historical input | SHA-256 / content reference |
| --- | --- |
| Initial draft snapshot D | `sha256:917b4f5343b2702a74d64dfe09c29d836e0129d2487adc89be7587115c89a062` |
| Kernel `scripts/resolve_route.py` | `71438c098308e2157516030c9d6083904929011519ae7761940e737b846c2b20` |
| Kernel `scripts/source_tree.py` | `c95a8b7e2f2702921dc3bcbd39ed7ab3b4ef14694a9d65808bce9f02ff4f9253` |
| Original fixture script | `e8f3ddc2682cf571fd829b7f51fc562a7c3693db1e9e704286dcd84b3d8ad103` |
| Fixture snapshot A | `sha256:55ee73b0e99be4aa54f908f6b0afa1bdebe6a3e3cddf449bbacfdffa8f6141cd` |
| Fixture snapshot P | `sha256:9b58329689c742e6fab0cb696966e08436c316f7bc27e8ab2429902e5c21e55a` |
| Fixture snapshot U | `sha256:10d33fd6158373c23129b5f911844403cc25e1fc971e36f2c16230f09dde81d5` |
| Fixture snapshot C | `sha256:0d58322d57599798f284143bf468779eb7e0731ce7120438e9b325ea07a7aed1` |

A is the active copy; P adds a priority-101 API route; U assigns the API capability a nonexistent dependency; C assigns its route a nonexistent capability. Overlay-only scenarios retain A. D remains the original draft snapshot. Content addressing verifies copied bytes, not professional or runtime correctness.

Historical backend file digests (before this report and sibling evidence were added):

| Relative path | SHA-256 |
| --- | --- |
| `DOMAIN.md` | `cd62aa00ffce1dc7508c9082a7e867f7347a5701411b48fb139e722180f88788` |
| `README-CH.md` | `76877b3ba9f342bd081e1e770854195bd61cdf9e4ffa6f9d605d2b934502335e` |
| `capabilities.json` | `fede3d35a043fd12d747c4677b61a493b5b1bf3b8a921f2be313ac987526b3c3` |
| `domain.json` | `40e23a100ee35ce73642714077a5e1847c7ddbaac4484104223dcf904c03685f` |
| `evaluators/EVALUATOR.md` | `d171cdd096ba0631818ea3eada6d5106e0a876cfb3848a844fde99248757c8f4` |
| `lifecycle.json` | `ae2bcb52977a1794f55a1dc78384f44b27eab842e5b96f1fd916d3a92bb75153` |
| `owners.json` | `b637cd90c2928816949e7874348f0ecaf49c2a2525cb5a7e7dd231697c0c8820` |
| `routes.json` | `d9f2e23d7fb0ba76e5718da92cf99b463abc787b10f561ee9f52585eefa333ea` |
| `rules/BASE.md` | `558df381e0d992e218a8700e92e9981e9daa8b25276733766cef9dd09a29e359` |
| `skills/.gitkeep` | `01ba4719c80b6fe911b091a7c05124b64eeece964e09c058ef8f9805daca546b` |
| `skills/backend-evaluate/SKILL.md` | `2d57326fd9bc882a66aeb4e7973bfd6fe7248f44c7f952b695db78ca0afe2043` |
| `skills/backend-execute/SKILL.md` | `c660158bc486f9c6da904e2ff1b54dae268c07c0abca9aee8e40ab351847b570` |
| `skills/backend-prepare/SKILL.md` | `402e5f4a00e9fa3d87f2552252e4cc617b9a1c4d9642f756907361a33922816a` |
| `skills/backend-summarize/SKILL.md` | `b5c46ac53ef9d93468a0b6287db5175600e428069139cc7ea22172e1ac1ae6f3` |
| `templates/.gitkeep` | `01ba4719c80b6fe911b091a7c05124b64eeece964e09c058ef8f9805daca546b` |
| `templates/task-evidence.md` | `def8d39a7d58246cb39b3b867a9c3bcb2220a89c320320fabd5caf17683338c3` |
| `workflows/WORKFLOW.md` | `5e57d940b6a6ab2c9d631967ee1479f187b381e7777810c6f9d2c989d2a57cd9` |

## Eighteen actual routing observations

Every matched selection was `engineering.backend` version `0.1.0`; normal route and capability equal the task type. Returned stage references were all four lifecycle bindings pinned to the scenario's source reference. These observations establish dispatch metadata only. Base envelopes used schema `2.0`, task class `engineering`, operation `inspect`, intent “Inspect a backend API contract”, deliverable “Scoped backend review”, constraint “Read-only fixture”, signal “server-side API contract”, surface “backend service”, and required evidence “routing result”. The code below preserves full inputs and mutations.

| Scenario | Input / mutation | Expected | Actual observation | Snapshot |
| --- | --- | --- | --- | --- |
| `positive` | `backend.api-contract` | `matched` | matched; backend.api-contract | A |
| `positive-backend-api-contract` | `backend.api-contract` | `matched` | matched; backend.api-contract | A |
| `positive-backend-service-implementation` | `backend.service-implementation` | `matched` | matched; backend.service-implementation | A |
| `positive-backend-persistence` | `backend.persistence` | `matched` | matched; backend.persistence | A |
| `positive-backend-migration` | `backend.migration` | `matched` | matched; backend.migration | A |
| `positive-backend-async-processing` | `backend.async-processing` | `matched` | matched; backend.async-processing | A |
| `positive-backend-dependency-resilience` | `backend.dependency-resilience` | `matched` | matched; backend.dependency-resilience | A |
| `positive-backend-service-security` | `backend.service-security` | `matched` | matched; backend.service-security | A |
| `positive-backend-observability` | `backend.observability` | `matched` | matched; backend.observability | A |
| `positive-backend-verification-delivery` | `backend.verification-delivery` | `matched` | matched; backend.verification-delivery | A |
| `negative-signal-observation` | `API type; repository_signals=[]` | `matched` | matched; signal absence did not reject | A |
| `unsupported-task` | `frontend.visual` | `no_match` | no_match; no selections | A |
| `priority` | `API route clone, priority 101` | `matched` | matched; fixture-high-priority selected | P |
| `disabled-capability` | `overlay disables only backend.api-contract` | `no_match` | no_match; disabled_capability issue; no selections | A |
| `unresolved-dependency-observation` | `API dependency backend.fixture-missing` | `matched` | matched; unresolved dependency not enforced | U |
| `unknown-route-capability` | `route capability backend.fixture-missing` | `error` | ValueError: Route references unknown capability | C |
| `version-mismatch` | `overlay version 0.0.0` | `error` | ValueError: Overlay version mismatch: engineering.backend | A |
| `draft-not-selected` | `unmodified draft snapshot` | `no_match` | no_match; no selections | D |

The three `no_match` outputs returned the Kernel's visible Chinese terminal message meaning: no Domain matched, the task ended, and no concrete task was executed. There was no generic fallback selection. Disabled-capability coverage is a single-capability fail-closed observation for this route, not exhaustive overlay coverage. Priority coverage compares 100 with 101, not equal-priority ambiguity. Errors were caught as local `ValueError` outcomes, not service responses.

The missing-signal and unresolved-dependency matches are known non-enforcement observations, not successful context or dependency validation. Kernel uses exact task type and priority; Domain prepare must verify actual backend signals and all task prerequisites. The invalid dependency fixture deliberately demonstrated that a route match cannot establish prerequisite readiness. No stage Skill runtime was invoked, so fail-closed prepare behavior itself remains untested here. Draft rejection and temporary active fixtures do not prove the live Pack was activated.

## Durable reproduction

Save the following block as a local Python file outside production source and run `python3 <saved-file.py> <domain-pack-repository> <kernel-repository>`. It prints results to stdout and mutates only temporary copies. It requires the Kernel source modules and task-envelope schema; verify their historical hashes above before asserting identical-code reproduction. Original snapshot bytes must be independently retained to reproduce historical digests exactly. Running against later live content is a fresh observation: compare expected behaviors, report new digests and do not relabel it as the original run. The standalone variant adapts the original fixed repository/output paths to arguments/stdout and now explicitly constructs the draft fixture by setting both backend statuses in its temporary copy to draft. This additional fixture construction makes later-source runs independent of the live status; it is not the identical historical script and does not change the original 18 observations or their hashes.

```python
import copy, hashlib, json, shutil, sys, tempfile
from pathlib import Path
ROOT=Path(sys.argv[1]).resolve()
KERNEL=Path(sys.argv[2]).resolve()
sys.path.insert(0,str(KERNEL/'scripts'))
from resolve_route import resolve
from source_tree import tree_digest,DOMAIN_ENTRIES
from schema_validation import validate_instance
def load(p):return json.loads(p.read_text())
def save(p,v):p.write_text(json.dumps(v,indent=2)+'\n')
def mutate_status(p,status):
 r=load(p/'registry/domains.json');next(x for x in r['domains'] if x['id']=='engineering.backend')['status']=status;save(p/'registry/domains.json',r)
 m=load(p/'domains/engineering/backend/domain.json');m['status']=status;save(p/'domains/engineering/backend/domain.json',m)
def digest(p):return hashlib.sha256(p.read_bytes()).hexdigest()
base={'schema_version':'2.0','task_id':'backend-pack-local-routing','intent':'Inspect a backend API contract','task_class':'engineering','task_type':'backend.api-contract','operation':'inspect','deliverables':['Scoped backend review'],'constraints':['Read-only fixture'],'repository_signals':['server-side API contract'],'affected_surfaces':['backend service'],'required_evidence':['routing result']}
schema=load(KERNEL/'schemas/task-envelope.schema.json')
scenarios=[]
with tempfile.TemporaryDirectory(prefix='backend-route-') as td:
 snap=Path(td)/'snapshot';snap.mkdir()
 for entry in DOMAIN_ENTRIES:
  src=ROOT/entry;dst=snap/entry
  if src.is_dir():shutil.copytree(src,dst,ignore=shutil.ignore_patterns('__pycache__','.DS_Store','*.pyc'))
  elif src.is_file():dst.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(src,dst)
 initial_ref=tree_digest(snap)
 def run(name,change=None,envelope=None,overlay=None,active=True,expected='matched',limitation=None):
  p=Path(td)/name;shutil.copytree(snap,p)
  mutate_status(p,'active' if active else 'draft')
  if change:change(p)
  env=copy.deepcopy(envelope or base);env['task_id']=name
  errors=validate_instance(env,schema)
  assert not errors,errors
  ref=tree_digest(p)
  try:actual=resolve(env,p,{'ref':ref},overlay);outcome=actual['status']
  except (ValueError,OSError,KeyError,TypeError) as e:actual={'exception':type(e).__name__,'message':str(e)};outcome='error'
  if outcome!=expected:raise AssertionError((name,expected,actual))
  if outcome=='matched':assert any(s['domain_id']=='engineering.backend' for s in actual['selections'])
  scenarios.append({'id':name,'input':env,'overlay':overlay,'fixture_active':active,'source_ref':ref,'expected_outcome':expected,'actual_outcome':outcome,'actual':actual,'limitation':limitation})
 run('positive')
 for task_type in load(snap/'domains/engineering/backend/domain.json')['applicability']['task_types']:
  env=copy.deepcopy(base);env['task_type']=task_type;run('positive-'+task_type.replace('.','-'),envelope=env)
 env=copy.deepcopy(base);env['repository_signals']=[]
 run('negative-signal-observation',envelope=env,limitation='Kernel ignores repository_signals; matching alone is insufficient. Domain prepare must verify actual backend context before execution. No Skill runtime is executed by this fixture.')
 env=copy.deepcopy(base);env['task_type']='frontend.visual'
 run('unsupported-task',envelope=env,expected='no_match')
 def ambiguity(p):
  f=p/'domains/engineering/backend/routes.json';r=load(f);x=copy.deepcopy(next(x for x in r['routes'] if 'backend.api-contract' in x['task_types']));x['id']='fixture-high-priority';x['priority']+=1;r['routes'].append(x);save(f,r)
 run('priority',change=ambiguity)
 assert scenarios[-1]['actual']['selections'][0]['route_id']=='fixture-high-priority'
 overlay={'domains':[{'id':'engineering.backend','enabled':True,'version':'0.1.0','disabled_capabilities':['backend.api-contract']}]}
 run('disabled-capability',overlay=overlay,expected='no_match')
 assert any(x['code']=='disabled_capability' for x in scenarios[-1]['actual']['issues'])
 def dependency(p):
  f=p/'domains/engineering/backend/capabilities.json';r=load(f);next(x for x in r['capabilities'] if x['id']=='backend.api-contract')['dependencies']=['backend.fixture-missing'];save(f,r)
 run('unresolved-dependency-observation',change=dependency,limitation='Kernel does not resolve capability dependencies. This intentionally invalid fixture still matches; actual Pack declares no cross-capability dependencies and prepare must verify task-specific prerequisites. This is not a runtime proof of Skill execution.')
 def missing(p):
  f=p/'domains/engineering/backend/routes.json';r=load(f);next(x for x in r['routes'] if 'backend.api-contract' in x['task_types'])['capabilities']=['backend.fixture-missing'];save(f,r)
 run('unknown-route-capability',change=missing,expected='error')
 overlay={'domains':[{'id':'engineering.backend','enabled':True,'version':'0.0.0'}]}
 run('version-mismatch',overlay=overlay,expected='error')
 run('draft-not-selected',active=False,expected='no_match')
 result={'schema_version':'1.0','domain_id':'engineering.backend','scope':'Local content-addressed source snapshots and temporary active/invalid fixtures; no installed Runtime or backend service exercised','command':'python3 changes/engineering.backend-completion/checks/route-fixtures.py','kernel_root':str(KERNEL),'kernel_files_sha256':{n:digest(KERNEL/'scripts'/n) for n in ['resolve_route.py','source_tree.py']},'initial_snapshot_ref':initial_ref,'backend_files_sha256':{str(p.relative_to(snap/'domains/engineering/backend')):digest(p) for p in (snap/'domains/engineering/backend').rglob('*') if p.is_file()},'scenarios':scenarios}
 print(json.dumps(result,indent=2,ensure_ascii=False))
 print('Observed '+str(len(scenarios))+' routing fixtures; source-only limitations recorded')
```

## Claims withheld and separate checks

No Skill runtime, installed Runtime, deployed backend service, datastore, broker, telemetry collector, production access, migration, rollout or recovery was tested. No product check commands, credentials, numerical budgets or private organization facts were supplied by this fixture. Downstream permissions, stack, internal policies, objectives and acceptance owners remain `needs-org-input` when necessary for a particular action; only dependent work is held. Local source/fixture results do not establish integration, deployed behavior or independent acceptance. [WEB-SRE-TESTING]

Final deterministic repository checks and fresh independent artifact/Pack evaluation are separate maintenance gates with their own actual logs, revision identities and verdict records. This author report does not issue their verdicts, score itself, activate the Pack or claim their completion. Material edits invalidate any prior digest-bound evaluation. Consult those separate records for final outcomes; no historical routing result transfers acceptance to changed content.

Earlier author checks on 2026-10-24: the then-embedded standalone reproduction executed successfully against a fresh temporary draft copy and asserted all 18 expected outcomes; its content references differed from the historical snapshot as documented. All relative Markdown dependency links resolved. The required command `HARNESS_PYTHON=/Users/albertq/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 ./scripts/domain-check.sh` exited 1 at the README inventory check: backend README omitted this report, three sibling evidence files, four stage Skills and the task-evidence template; iOS README omitted three evidence files and two stage Skills. These observed cross-file inventory failures were preserved for the separately assigned README work; this author changed no inventory files. A first author run rejected a localized no-match quotation under the English-first rule; the report now describes that recorded message in English, and the subsequent run reached the inventory failures above. No later validator stages or final independent gates are claimed from that failed command.


Iteration 2 author check completed at `2026-10-24T11:11:53Z`: the revised code block was extracted verbatim to an external temporary file and executed using system Python against (1) the current draft source, initial snapshot `sha256:75667e949566e502d9bc0f45cc91ae1434f10e674d5f910ba01d6740f5893762`, and (2) an isolated source copy with only the backend registry and manifest statuses set to active, initial snapshot `sha256:838186c57e29486dd5343a2897aeffd1e8585c722b8ac0555ad9ca17a9dc7673`. Both executions exited 0 and asserted all 18 expected outcomes, including `draft-not-selected` returning `no_match`. Both Kernel module hashes matched the historical table. Complete source-tree digests before and after each execution were equal; fixture mutations remained in temporary scenario copies. These are new time-bound author checks of the revised method, distinct from the original observations and historical hashes. The cited source snapshots precede this check paragraph; later report or sibling edits change their digests. They do not establish independent evaluation, activation, Runtime verification or backend product acceptance.

The iteration 2 required repository check exited 1 at the same pre-existing iOS README inventory failures observed immediately before this revision: missing descriptions for `evidence/capability-map.md`, `evidence/responsibility-boundaries.md`, `evidence/sources.json`, and `skills/ios-{evaluate,execute,prepare}/SKILL.md`. No backend inventory error was reported on these two runs. This later result does not erase the earlier failures recorded above; later validator stages remain unverified by these failed runs. All relative Markdown dependency links still resolve. Only this report was revised by this author; no registry, manifest, Chinese guide, evaluation record or other production artifact was changed.


## Iteration 3 — receipt protocol remediation and isolated active-source checks

These observations were supplied and inspected on 2026-10-24 after the iteration 2
snapshot. The preserved Builder tool output in
`initial-finalizer-tool-output.json`, recorded at `2026-10-24T11:28:54.358Z`
(tool call `call_ca90f5263a5c49a6b776ea4e06d26d68`), records exit 0 and
`Activated engineering.backend; registry and manifest now report active`, followed
by an active backend status inspection. The observed command used the bundled Python
runtime with `.agents/skills/complete-domain-pack/scripts/finalize_domain_pack.py
--root . --domain-id engineering.backend --ledger domains/engineering/backend/evidence/sources.json
--session changes/engineering.backend-completion/session.json` after historical
`final.2`. This is the retained original tool result, not a fresh finalizer execution
or new independent approval. That event is not a current final Pack verdict: the subsequent actual active-only repository test exposed missing
`context_id` in `backend-prepare/SKILL.md`. The preserved
`post-activation-domain-check.log` records registry, Skill and custom-agent validation
passing, followed by `test_active_domains_have_real_stage_skills` failing at
`tests/test_lifecycle.py:22`, with `AssertionError: 'context_id' not found`; the suite
ran 54 tests in 0.426s and ended `FAILED (failures=1)`. The earlier
`pre-final2-domain-check.log` recorded 54 tests in 0.424s with `OK`, while the backend
was draft and that active-only requirement did not exercise it. That earlier pass
did not establish active-source coverage. Test output mentioning activation or
registration of other Domains comes from repository test fixtures; it grants no
backend activation or product-task authority.

The builder restored only its backend manifest and registry status to `draft` after
this failure. Author inspection confirmed those backend statuses at this revision;
this paragraph is a time-bound observation, not a permanent status assertion.
[REPO-MANIFEST] [REPO-REGISTRY] No failure record was removed or replaced by a later
pass. The earlier finalizer/evaluation cannot authorize a current claim after these
material repairs; independent re-evaluation and any maintenance activation decision
remain separate work. This author performed neither.

### What was repaired and what the checks establish

The four [prepare](../skills/backend-prepare/SKILL.md),
[execute](../skills/backend-execute/SKILL.md),
[evaluate](../skills/backend-evaluate/SKILL.md) and
[summarize](../skills/backend-summarize/SKILL.md) contracts and the
[task evidence template](../templates/task-evidence.md) now specify the complete
host/receipt protocol rather than merely inserting a token to satisfy the test.
Inspected maintained Kernel sources are `docs/LIFECYCLE.md`,
`schemas/stage-result.schema.json`, `scripts/lifecycle.py` and
`scripts/task_runtime.py` in the sibling Kernel repository. These are implementation
contract facts, separate from public professional ledger claims:

- The host invokes Markdown Skills. Kernel dispatches and validates factual receipts;
  it does not run the professional model. Verify the explicit selected `project_root`,
  active project bridge, stage/binding and original invocation ID/context before work.
  Product task files belong in that selected project, normally `changes/<task-id>/`.
- Receipt status is `completed`, `partial`, `unavailable` or `error`; professional
  blocked/input gaps are recorded separately. Copy the dispatched `context_id`.
  Artifacts are project-relative inspected files; checks use stable IDs, factual
  status and evidence arrays, with evidence required for passed/failed checks.
  Preserve issues, assumptions, next actions and evidence for any resolved incoming IDs.
- A pending invocation returns `reconcile`: inspect prior effects before submitting
  against its original ID. Duplicate/stale receipts and context mismatches are rejected.
  Missing/unusable host output uses actual `record_unavailable`/CLI `unavailable`;
  it does not fabricate a professional evaluation or completion verdict.
- Genuine evaluate receipts require `completion` of `achieved`, `partial` or
  `unachieved` and `evaluated_digest` equal to dispatched and current tracked-artifact
  digests. Do not add receipt/report paths or modify tracked artifacts during evaluation
  or summary. Digest equality proves neither omitted-scope coverage nor independence.
  An unperformed evaluation uses unavailable recovery and remains `unassessed`.
- Summarize reads current facts and freshness, returns narrative in `summary`, and
  supplies no new completion verdict. Missing/stale evaluation stays unassessed;
  current and historical completion and check freshness remain distinct.

Contract prose was inspected; no Markdown Skill was executed by these fixtures.
The synthetic receipt fixture calls the actual Kernel scheduler methods with synthetic
bindings, project artifact and host receipts. It performs no independent model
assessment, backend service operation or installed Runtime execution. Its synthetic
`achieved` value demonstrates transport handling only, not professional acceptance.
The isolated active-source fixture runs the actual complete Domain repository validator
and unit suite against a temporary source copy with only backend registry/manifest
statuses changed to active. This tests active-source structural checks, not model behavior,
service correctness or live activation. [WEB-SRE-TESTING]

### Captured remediation observations and identities

The inspected original commands/scripts were
`python3 changes/engineering.backend-completion/checks/receipt-fixtures.py` and
`python3 changes/engineering.backend-completion/checks/active-pack-fixture.py`.
The latter explicitly launched
`HARNESS_PYTHON=/Users/albertq/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 ./scripts/domain-check.sh`
inside the isolated temporary repository. No exact start timestamp or original fixture
interpreter version was recorded in these JSON/log outputs; none is inferred here.
The inspected `active-fixture-result.json` reports exit code 0; its matching
`active-fixture-domain-check.log` reports all three validators passed and
`Ran 54 tests in 0.394s`, followed by `OK`. Its source reference covers that copied
source at that observation, before this report append or later sibling edits:

| Captured remediation input | SHA-256 / content reference |
| --- | --- |
| Isolated active source | `sha256:33e776a49f22c545b0e703c80fae6e5975b730ae53b89963e5759994e25efa87` |
| Repaired backend prepare Skill | `18b16ccc83765f535fd16c5a9e1fe5b3e1274409c1a89c1ab25f1568826bac19` |
| Repaired backend execute Skill | `89f1eb78cf65a5b606bcf023c7754a3dc2712219e24c1fce3bfd738c308f9152` |
| Repaired backend evaluate Skill | `1367dd767404a8d1b41c8dbdc845e4975689778a0798886d565107b92b672e48` |
| Repaired backend summarize Skill | `811df4bbfbb66c163a5d92a815758cf7c78ebecd68dcca2be7469f1d5f2ac5be` |
| Kernel `scripts/lifecycle.py` used by receipt fixture | `72486bc398f86a547cacbc83ac338b96284a75e7ffbdfa6d6843977ac5df3237` |
| Kernel `scripts/task_runtime.py` used by receipt fixture | `ab5c698e28ca03f377b8b1fa427e9b3ca344a9f4f4c22e9e24ec67b4a50293a2` |

These hashes preserve identity, not retained historical bytes or future equivalence.
The original 18 routing observations and their first standalone reproduction above
remain unchanged. The following 11 observations are additional receipt scenarios,
not extra routing cases; rejected submissions asserted unchanged task-state bytes:

| Synthetic receipt scenario | Actual Kernel observation |
| --- | --- |
| `pending-reconcile` | Existing invocation returned; no replay performed |
| `wrong-context` | Result context does not match dispatch |
| `invalid-status` | Result needs factual execution status |
| `empty-passed-evidence` | Verified check needs evidence |
| `artifact-escape` | ValueError: resolved ../escape.txt is outside the temporary selected project; state unchanged. The captured temporary path is not a durable artifact. |
| `invalid-completion` | Evaluation must state target completion |
| `wrong-evaluated-digest` | Evaluation refers to stale artifacts; reconcile current evaluation |
| `stale-evaluated-artifact` | Evaluation refers to stale artifacts; reconcile current evaluation |
| `four-stage-receipts` | All four actual Kernel submit calls accepted; scoped synthetic completion and current digest retained |
| `duplicate-receipt` | Duplicate or stale invocation receipt |
| `unavailable-evaluator` | Explicit unavailable path proceeds to summary with unassessed completion, no fabricated verdict |

The four-stage case deliberately retains a failed preparation check in a `partial`
receipt, then accepts execution, synthetic evaluation and summary. Flow ending and
current digest handling do not erase that failure or prove the target passed. The
unavailable-evaluator case ends through summary with `completion=unassessed` and
`evaluation_current=false`; it manufactures no verdict. Error-message wording and
paths may change with maintained Kernel revisions.

### Durable standalone receipt method

Save this second Python block outside production source and run
`python3 <receipt-file.py> <kernel-repository>`. This adapts the captured fixture's
fixed Kernel path to an argument and replaces writing `receipt-scenarios.json` beside
the script with JSON on stdout. It also asserts the observed scenario count. All
state/artifact/bridge writes occur only inside a temporary project. It invokes actual
Kernel methods without a model, service or installed Runtime. Compare the printed
Kernel hashes to the captured table; changed source is a new observation. The code
and scenario table remain usable after the task's `changes/` directory is removed.

```python
import hashlib,json,sys,tempfile
from pathlib import Path
KERNEL=Path(sys.argv[1]).resolve()
sys.path.insert(0,str(KERNEL/'scripts'))
import lifecycle
observed=[]
def note(name,outcome):observed.append({'scenario':name,'observed':outcome})
with tempfile.TemporaryDirectory(prefix='backend-receipts-') as td:
 root=Path(td);(root/'.harness.json').write_text(json.dumps({'contract_code':'harness-engineering','enabled':True}))
 (root/'artifact.txt').write_text('synthetic fixture artifact\n')
 def start(name):
  p=root/(name+'.json');env={'task_id':name};plan={'status':'matched','task_id':name,'selections':[{'domain_id':'engineering.backend','version':'0.1.0','capability_ids':['backend.api-contract'],'stages':{s:{'path':'domains/engineering/backend/skills/backend-'+s+'/SKILL.md','source_revision':'synthetic-binding-fixture'} for s in lifecycle.STAGES}}]}
  lifecycle.start(plan,env,root,p);return p
 def rejected(path,inv,result,name):
  before=path.read_bytes()
  try:lifecycle.submit(path,inv['id'],result)
  except (ValueError,OSError) as e:assert before==path.read_bytes();note(name,str(e));return
  raise AssertionError('Invalid receipt unexpectedly accepted: '+name)
 def receipt(inv,**kw):return {'status':'completed','context_id':inv['context_id'],**kw}
 path=start('positive');inv=lifecycle.claim(path)['invocation']
 assert lifecycle.claim(path)['status']=='reconcile';note('pending-reconcile','Existing invocation returned; no replay performed')
 rejected(path,inv,{'status':'completed','context_id':'wrong'},'wrong-context')
 rejected(path,inv,{'status':'blocked','context_id':inv['context_id']},'invalid-status')
 rejected(path,inv,receipt(inv,checks=[{'id':'bad-check','status':'passed','evidence':[]}]),'empty-passed-evidence')
 rejected(path,inv,receipt(inv,artifacts=['../escape.txt']),'artifact-escape')
 lifecycle.submit(path,inv['id'],receipt(inv,status='partial',artifacts=['artifact.txt'],checks=[{'id':'fixture-limitation','status':'failed','evidence':['Synthetic preparation limitation; no product work performed']}]))
 assert lifecycle.claim(path)['invocation']['stage']=='execute';inv=json.loads(path.read_text())['pending']
 lifecycle.submit(path,inv['id'],receipt(inv,checks=[{'id':'fixture-artifact','status':'passed','evidence':['Synthetic artifact exists: artifact.txt']}]))
 inv=lifecycle.claim(path)['invocation'];assert inv['stage']=='evaluate'
 rejected(path,inv,receipt(inv,completion='pass',evaluated_digest=inv['artifact_digest']),'invalid-completion')
 rejected(path,inv,receipt(inv,completion='achieved',evaluated_digest='sha256:wrong'),'wrong-evaluated-digest')
 original=(root/'artifact.txt').read_bytes();(root/'artifact.txt').write_text('changed\n')
 rejected(path,inv,receipt(inv,completion='achieved',evaluated_digest=inv['artifact_digest']),'stale-evaluated-artifact');(root/'artifact.txt').write_bytes(original)
 lifecycle.submit(path,inv['id'],receipt(inv,completion='achieved',evaluated_digest=inv['artifact_digest']))
 inv=lifecycle.claim(path)['invocation'];assert inv['stage']=='summarize'
 lifecycle.submit(path,inv['id'],receipt(inv,summary='Synthetic scheduler fixture completed; no product acceptance.'))
 state=json.loads(path.read_text());assert state['flow_status']=='ended' and lifecycle.checklist(state)['evaluation_current']
 note('four-stage-receipts','All four actual Kernel submit calls accepted; scoped synthetic completion and current digest retained')
 rejected(path,inv,receipt(inv,summary='duplicate'),'duplicate-receipt')
 path=start('unavailable')
 for stage in ('prepare','execute'):
  inv=lifecycle.claim(path)['invocation'];assert inv['stage']==stage;lifecycle.submit(path,inv['id'],receipt(inv))
 inv=lifecycle.claim(path)['invocation'];assert inv['stage']=='evaluate'
 lifecycle.record_unavailable(path,inv['id'],'Synthetic host unavailable; no professional evaluation occurred')
 inv=lifecycle.claim(path)['invocation'];assert inv['stage']=='summarize'
 lifecycle.submit(path,inv['id'],receipt(inv,summary='Evaluation unavailable; completion unassessed.'))
 state=json.loads(path.read_text());assert lifecycle.checklist(state)['completion']=='unassessed' and not lifecycle.checklist(state)['evaluation_current']
 note('unavailable-evaluator','Explicit unavailable path proceeds to summary with unassessed completion, no fabricated verdict')
result={'schema_version':'1.0','scope':'Actual Kernel scheduler/receipt methods with synthetic bindings, artifacts and host receipts in temporary project only; no Markdown Skill, independent model evaluation, backend service or installed Runtime executed','kernel_files_sha256':{n:hashlib.sha256((KERNEL/'scripts'/n).read_bytes()).hexdigest() for n in ('lifecycle.py','task_runtime.py')},'scenarios':observed}
assert len(observed)==11
print(json.dumps(result,indent=2))
```

### Durable standalone active-source full-suite method

Save this third Python block outside production source and run
`python3 <active-file.py> <domain-pack-repository> <kernel-repository> <validator-python-executable>`.
For the captured validator configuration, the last argument was
`/Users/albertq/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3`.
Select an actually available interpreter and record it; this is a maintenance fixture,
not an invented downstream product command. Adaptations replace fixed ROOT, KERNEL and
interpreter values with arguments and replace both fixed output writes with JSON on
stdout. The full suite executes in the temporary repository, including tests which
exercise registration/activation on their own copies. It does not invoke the standard
finalizer on the input repository. Input files are read only; registry/manifest status
mutations, validator-generated files and test mutations stay inside temporary copies.
The copied repository excludes `.git`, `changes`, caches and OS metadata, exactly as
the captured fixture did. Use maintained Domain repository scripts/tests and Kernel
`source_tree.tree_digest`; historical bytes are required for identical hashes.

```python
import hashlib,json,os,shutil,subprocess,sys,tempfile
from pathlib import Path
ROOT=Path(sys.argv[1]).resolve()
KERNEL=Path(sys.argv[2]).resolve();sys.path.insert(0,str(KERNEL/'scripts'))
from source_tree import tree_digest
PYTHON=str(Path(sys.argv[3]).resolve())
with tempfile.TemporaryDirectory(prefix='backend-active-pack-') as td:
 snap=Path(td)/'repo';shutil.copytree(ROOT,snap,ignore=shutil.ignore_patterns('.git','changes','__pycache__','.DS_Store','*.pyc'))
 for relative,is_registry in [('registry/domains.json',True),('domains/engineering/backend/domain.json',False)]:
  p=snap/relative;v=json.loads(p.read_text())
  if is_registry:next(x for x in v['domains'] if x['id']=='engineering.backend')['status']='active'
  else:v['status']='active'
  p.write_text(json.dumps(v,indent=2)+'\n')
 ref=tree_digest(snap);env=dict(os.environ,HARNESS_PYTHON=PYTHON)
 result=subprocess.run(['./scripts/domain-check.sh'],cwd=snap,env=env,text=True,capture_output=True)
 log=result.stdout+result.stderr
 payload={'scope':'Isolated temporary source Pack with backend registry/manifest set active; actual full repository validator and unit suite, no installed Runtime or Markdown Skill/service execution','source_ref':ref,'command':'HARNESS_PYTHON='+PYTHON+' ./scripts/domain-check.sh','exit_code':result.returncode,'backend_stage_sha256':{stage:hashlib.sha256((snap/'domains/engineering/backend/skills'/('backend-'+stage)/'SKILL.md').read_bytes()).hexdigest() for stage in ('prepare','execute','evaluate','summarize')},'observed_log':log}
 print(json.dumps(payload,indent=2))
 raise SystemExit(result.returncode)
```

Both adapted methods preserve the inspected original assertions and operations except
for the explicit path/output/count changes above. New runs print new content identities
and retain failures through nonzero exits; they must not be relabeled as the captured
remediation run. No current final Pack pass, independent acceptance, live activation,
installed Runtime, database/broker integration or deployed behavior is established here.


Iteration 3 author reproduction on 2026-10-24 extracted all three Python blocks
verbatim to external temporary files and compiled each with the bundled runtime
`/Users/albertq/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3`.
Each execution exited 0: the original first block asserted 18 routing cases; the
second asserted 11 synthetic receipt scenarios with the same two Kernel hashes
listed above; the third ran the complete 54-test suite successfully on a temporary
active-source copy with source reference
`sha256:5a50e776e1491ef27cdc67881ae1520a7402c49d7ffb2e2229e16a45cbb46797`.
Its four stage hashes matched the captured remediation table. This new source
reference precedes this check paragraph and cannot identify the later final report
bytes. `PYTHONDONTWRITEBYTECODE=1` was set for those fixture runs. All relative
Markdown links resolved. The required actual repository command
`HARNESS_PYTHON=/Users/albertq/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 ./scripts/domain-check.sh`
then exited 0 with all three validators passing and `Ran 54 tests in 0.477s`, `OK`.
This local maintenance result preserves the earlier failures and supplies no current
independent artifact/Pack verdict, activation decision or product acceptance. Only
this report was changed by this author; stage contracts, status files, inventory,
evaluation records and other production artifacts were not edited by this author.
