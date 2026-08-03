import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { install, uninstall, GUIDANCE_START } from "../src/install.js";
import { check, context, doctor, route } from "../src/runtime.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const bundleRoot = path.join(root, "bundle");
function fixture(t) {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), "harness-cli-"));
  t.after(() => fs.rmSync(temp, { recursive: true, force: true }));
  const env = {
    ...process.env,
    HARNESS_USER_HOME: path.join(temp, "user"),
    HARNESS_HOME: path.join(temp, "user", ".harness"),
    CODEX_HOME: path.join(temp, "user", ".codex"),
    HARNESS_AGENTS_SKILL_ROOT: path.join(temp, "user", ".agents", "skills"),
    HARNESS_CODEX_SKILL_ROOT: path.join(temp, "user", ".codex", "skills")
  };
  const project = path.join(temp, "project");
  fs.mkdirSync(project, { recursive: true });
  return { temp, env, project };
}
function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}
function writeJson(file, value) {
  write(file, `${JSON.stringify(value, null, 2)}\n`);
}
function copyBundle(item) {
  const target = path.join(item.temp, "bundle");
  fs.cpSync(bundleRoot, target, { recursive: true });
  return target;
}
function refreshBundleManifest(target) {
  const manifestFile = path.join(target, "bundle-manifest.json");
  const manifest = JSON.parse(fs.readFileSync(manifestFile, "utf8"));
  const walk = (directory, prefix = "") => fs.readdirSync(path.join(directory, prefix)).sort().flatMap((name) => {
    const relative = path.join(prefix, name);
    return fs.statSync(path.join(directory, relative)).isDirectory() ? walk(directory, relative) : [relative];
  });
  manifest.files = walk(target).filter((file) => file !== "bundle-manifest.json").map((file) => ({
    path: file,
    sha256: crypto.createHash("sha256").update(fs.readFileSync(path.join(target, file))).digest("hex")
  }));
  writeJson(manifestFile, manifest);
}

test("install is self-contained, idempotent, and preserves user guidance", (t) => {
  const item = fixture(t);
  const guidance = path.join(item.env.CODEX_HOME, "AGENTS.md");
  write(guidance, "# User rules\n");
  const first = install({ env: item.env, bundleRoot });
  const second = install({ env: item.env, bundleRoot });
  assert.equal(first.kernel.revision, second.kernel.revision);
  const text = fs.readFileSync(guidance, "utf8");
  assert.match(text, /User rules/);
  assert.equal(text.split(GUIDANCE_START).length - 1, 1);
  assert.ok(fs.existsSync(path.join(item.env.HARNESS_HOME, "runtime", "kernel", "AGENTS.md")));
  assert.equal(doctor({ project: item.project, env: item.env }).passed, true);
  assert.equal(check({ project: item.project, env: item.env }).passed, true);
});

test("fresh project is discoverable and routes fail closed", (t) => {
  const item = fixture(t);
  install({ env: item.env, bundleRoot });
  assert.equal(context({ project: item.project, env: item.env }).project_overlay.present, false);
  const task = path.join(item.temp, "task.json");
  write(task, JSON.stringify({
    schema_version: "1.0", task_id: "test", intent: "Test routing", task_type: "feature",
    deliverables: ["result"], constraints: [], repository_signals: ["node"],
    required_evidence: ["tests"], risk_hints: []
  }));
  const plan = route({ project: item.project, taskFile: task, env: item.env });
  assert.equal(plan.status, "unroutable");
  assert.deepEqual(plan.selections, []);
});

test("bundled active Web Domain routes only after explicit project enablement", (t) => {
  const item = fixture(t);
  install({ env: item.env, bundleRoot });
  writeJson(path.join(item.project, ".harness", "domains.json"), {
    schema_version: "1.0",
    domains: [{
      id: "engineering.web", version: "0.1.0", enabled: true, local_owner: "product-web",
      additional_signals: [], constraints: [], disabled_capabilities: [], mappings: []
    }]
  });
  const task = path.join(item.temp, "web-task.json");
  writeJson(task, {
    schema_version: "1.0", task_id: "web-feature", intent: "Implement a semantic web interface",
    task_type: "web-frontend-implementation", deliverables: ["interface"], constraints: [],
    repository_signals: ["HTML element semantics, content model, document structure, form, or native interactive control"],
    required_evidence: ["tests"], risk_hints: []
  });
  const plan = route({ project: item.project, taskFile: task, env: item.env });
  assert.equal(plan.status, "routed");
  assert.equal(plan.selections[0].domain_id, "engineering.web");
  assert.deepEqual(plan.selections[0].skills, ["web-interface-delivery"]);
  assert.ok(fs.lstatSync(path.join(item.env.HARNESS_CODEX_SKILL_ROOT, "web-interface-delivery")).isSymbolicLink());
});

test("active and project-enabled synthetic Domain produces a routed plan", (t) => {
  const item = fixture(t);
  const syntheticBundle = copyBundle(item);
  const domainRoot = path.join(syntheticBundle, "domains", "domains", "engineering", "web");
  writeJson(path.join(syntheticBundle, "domains", "registry", "domains.json"), {
    schema_version: "1.0",
    domains: [{ id: "engineering.web", path: "domains/engineering/web", version: "1.0.0", status: "active", owner: "web-team" }]
  });
  writeJson(path.join(domainRoot, "domain.json"), { id: "engineering.web", version: "1.0.0", status: "active" });
  writeJson(path.join(domainRoot, "routes.json"), {
    routes: [{ id: "feature", priority: 100, task_types: ["feature"], signals: ["node"], capabilities: ["delivery"] }]
  });
  writeJson(path.join(domainRoot, "capabilities.json"), {
    capabilities: [{
      id: "delivery", task_types: ["feature"], workflows: ["DELIVERY.md"], skills: ["web-delivery"],
      tools: ["npm"], evaluators: ["EVALUATOR.md"], permissions: ["repository:write"]
    }]
  });
  write(path.join(domainRoot, "skills", "web-delivery", "SKILL.md"), "---\nname: web-delivery\ndescription: Deliver web changes.\n---\n");
  const syntheticManifestFile = path.join(syntheticBundle, "bundle-manifest.json");
  const syntheticManifest = JSON.parse(fs.readFileSync(syntheticManifestFile, "utf8"));
  syntheticManifest.skills.push({
    name: "web-delivery",
    source: "domains/domains/engineering/web/skills/web-delivery"
  });
  writeJson(syntheticManifestFile, syntheticManifest);
  refreshBundleManifest(syntheticBundle);
  writeJson(path.join(item.project, ".harness", "domains.json"), {
    schema_version: "1.0",
    domains: [{
      id: "engineering.web", version: "1.0.0", enabled: true, local_owner: "product-team",
      additional_signals: [], constraints: [], disabled_capabilities: [], mappings: []
    }]
  });
  const task = path.join(item.temp, "task.json");
  writeJson(task, {
    schema_version: "1.0", task_id: "feature", intent: "Build feature", task_type: "feature",
    deliverables: ["result"], constraints: [], repository_signals: ["node"],
    required_evidence: ["tests"], risk_hints: []
  });
  install({ env: item.env, bundleRoot: syntheticBundle });
  const plan = route({ project: item.project, taskFile: task, env: item.env });
  assert.equal(plan.status, "routed");
  assert.deepEqual(plan.selections[0].capability_ids, ["delivery"]);
  assert.ok(fs.lstatSync(path.join(item.env.HARNESS_CODEX_SKILL_ROOT, "web-delivery")).isSymbolicLink());
});

test("duplicate project Domain entries fail closed", (t) => {
  const item = fixture(t);
  install({ env: item.env, bundleRoot });
  const entry = {
    id: "engineering.web", version: "1.0.0", enabled: true, local_owner: "team",
    additional_signals: [], constraints: [], disabled_capabilities: [], mappings: []
  };
  writeJson(path.join(item.project, ".harness", "domains.json"), {
    schema_version: "1.0", domains: [entry, entry]
  });
  assert.throws(() => context({ project: item.project, env: item.env }), /must be unique/);
});

test("install refuses an unmanaged Skill collision", (t) => {
  const item = fixture(t);
  const bundle = JSON.parse(fs.readFileSync(path.join(bundleRoot, "bundle-manifest.json"), "utf8"));
  assert.ok(bundle.skills.length);
  write(path.join(item.env.HARNESS_AGENTS_SKILL_ROOT, bundle.skills[0].name, "SKILL.md"), "user owned\n");
  assert.throws(() => install({ env: item.env, bundleRoot }), /unmanaged Skill/);
  assert.equal(fs.existsSync(path.join(item.env.HARNESS_HOME, "manifest.json")), false);
});

test("install rejects a tampered Bundle without changing user state", (t) => {
  const item = fixture(t);
  const tamperedBundle = copyBundle(item);
  write(path.join(tamperedBundle, "kernel", "AGENTS.md"), "# tampered\n");
  assert.throws(() => install({ env: item.env, bundleRoot: tamperedBundle }), /checksum mismatch/);
  assert.equal(fs.existsSync(path.join(item.env.HARNESS_HOME, "runtime")), false);
});

test("install rejects malformed existing managed guidance", (t) => {
  const item = fixture(t);
  const guidance = path.join(item.env.CODEX_HOME, "AGENTS.md");
  write(guidance, `# User rules\n${GUIDANCE_START}\nbroken\n`);
  assert.throws(() => install({ env: item.env, bundleRoot }), /managed guidance block is malformed/);
  assert.equal(fs.readFileSync(guidance, "utf8"), `# User rules\n${GUIDANCE_START}\nbroken\n`);
  assert.equal(fs.existsSync(path.join(item.env.HARNESS_HOME, "manifest.json")), false);
});

test("failed reinstall restores the previously installed Runtime", (t) => {
  const item = fixture(t);
  const first = install({ env: item.env, bundleRoot });
  const runtimeAgent = path.join(item.env.HARNESS_HOME, "runtime", "kernel", "AGENTS.md");
  const originalRuntime = fs.readFileSync(runtimeAgent, "utf8");
  const guidance = path.join(item.env.CODEX_HOME, "AGENTS.md");
  write(guidance, `# User rules\n${GUIDANCE_START}\nbroken\n`);
  assert.throws(() => install({ env: item.env, bundleRoot }), /managed guidance block is malformed/);
  assert.equal(fs.readFileSync(runtimeAgent, "utf8"), originalRuntime);
  assert.equal(JSON.parse(fs.readFileSync(path.join(item.env.HARNESS_HOME, "manifest.json"), "utf8")).bundle_version, first.bundle_version);
});

test("uninstall removes only managed artifacts and supports reinstall", (t) => {
  const item = fixture(t);
  const guidance = path.join(item.env.CODEX_HOME, "AGENTS.md");
  write(guidance, "# User rules\n");
  install({ env: item.env, bundleRoot });
  const result = uninstall({ env: item.env });
  assert.equal(result.runtime_removed, true);
  assert.equal(fs.readFileSync(guidance, "utf8"), "# User rules\n");
  assert.equal(fs.existsSync(path.join(item.env.HARNESS_HOME, "runtime")), false);
  assert.equal(fs.existsSync(path.join(item.env.HARNESS_HOME, "manifest.json")), false);
  install({ env: item.env, bundleRoot });
  assert.equal(doctor({ project: item.project, env: item.env }).passed, true);
});

test("uninstall fails closed when ownership record is missing", (t) => {
  const item = fixture(t);
  install({ env: item.env, bundleRoot });
  fs.rmSync(path.join(item.env.HARNESS_HOME, "state", "install-record.json"));
  assert.throws(() => uninstall({ env: item.env }), /Cannot safely uninstall/);
  assert.ok(fs.existsSync(path.join(item.env.HARNESS_HOME, "runtime")));
});

test("doctor detects Runtime drift and uninstall preserves all managed state", (t) => {
  const item = fixture(t);
  install({ env: item.env, bundleRoot });
  const runtimeFile = path.join(item.env.HARNESS_HOME, "runtime", "kernel", "AGENTS.md");
  fs.appendFileSync(runtimeFile, "\nmodified\n");
  assert.equal(doctor({ project: item.project, env: item.env }).passed, false);
  assert.throws(() => uninstall({ env: item.env }), /modified Runtime file/);
  assert.ok(fs.existsSync(path.join(item.env.HARNESS_HOME, "manifest.json")));
  assert.ok(fs.existsSync(path.join(item.env.HARNESS_AGENTS_SKILL_ROOT, "harness-audit")));
  assert.match(fs.readFileSync(path.join(item.env.CODEX_HOME, "AGENTS.md"), "utf8"), /harness:managed:start/);
});
