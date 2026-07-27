import assert from "node:assert/strict";
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

test("install refuses an unmanaged Skill collision", (t) => {
  const item = fixture(t);
  const bundle = JSON.parse(fs.readFileSync(path.join(bundleRoot, "bundle-manifest.json"), "utf8"));
  assert.ok(bundle.skills.length);
  write(path.join(item.env.HARNESS_AGENTS_SKILL_ROOT, bundle.skills[0].name, "SKILL.md"), "user owned\n");
  assert.throws(() => install({ env: item.env, bundleRoot }), /unmanaged Skill/);
  assert.equal(fs.existsSync(path.join(item.env.HARNESS_HOME, "manifest.json")), false);
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
