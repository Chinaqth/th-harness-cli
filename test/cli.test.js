import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { install, uninstall, update, GUIDANCE_START } from "../src/install.js";
import { detectPlatforms } from "../src/platforms.js";
import { resolveUserPaths } from "../src/paths.js";

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
    HARNESS_CODEX_SKILL_ROOT: path.join(temp, "user", ".codex", "skills"),
    HARNESS_KIMI_SKILL_ROOT: path.join(temp, "user", ".kimi-code", "skills")
  };
  for (const leaked of ["HERMES_HOME", "HARNESS_HERMES_SKILL_ROOT", "KIMI_CODE_HOME", "HARNESS_PLATFORMS"]) {
    delete env[leaked];
  }
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
  assert.match(text, /project-root \.harness\.json/);
  assert.ok(text.indexOf("contract_code") < text.indexOf("enabled"));
  assert.match(text, /Only when the bridge activates Harness/);
  assert.ok(fs.existsSync(path.join(item.env.HARNESS_HOME, "runtime", "kernel", "AGENTS.md")));
  assert.ok(fs.existsSync(path.join(item.env.HARNESS_HOME, "manifest.json")));
  assert.ok(fs.existsSync(path.join(item.env.HARNESS_HOME, "state", "install-record.json")));
});

test("platform discovery is read-only and deploys Hermes only when detected", (t) => {
  const item = fixture(t);
  const hermesHome = path.join(item.env.HARNESS_USER_HOME, ".hermes");
  const paths = resolveUserPaths(item.env);
  assert.deepEqual(detectPlatforms(paths, item.env).map((platform) => platform.id), ["codex"]);
  assert.equal(fs.existsSync(hermesHome), false);

  fs.mkdirSync(hermesHome, { recursive: true });
  assert.deepEqual(detectPlatforms(paths, item.env).map((platform) => platform.id), ["codex", "hermes"]);
  const result = install({ env: item.env, bundleRoot });
  const hermesSkills = result.managed_skills.filter((skill) => skill.platform === "hermes");
  assert.ok(hermesSkills.length > 0);
  assert.ok(hermesSkills.some((skill) => skill.name === "harness-runtime"));
  assert.ok(hermesSkills.every((skill) => fs.lstatSync(skill.link).isSymbolicLink()));
  const adapter = fs.readFileSync(path.join(hermesHome, "skills", "harness-runtime", "SKILL.md"), "utf8");
  assert.match(adapter, /project-root \.harness\.json/);
  assert.ok(adapter.indexOf("contract_code") < adapter.indexOf("enabled"));
  assert.match(adapter, /Kernel's installed workflows, schemas, and routing mechanism as authoritative/);
  assert.doesNotMatch(adapter, /harness route/);
  assert.equal(fs.existsSync(path.join(hermesHome, "SOUL.md")), false);

  uninstall({ env: item.env });
  assert.ok(fs.existsSync(hermesHome));
  assert.ok(hermesSkills.every((skill) => !fs.existsSync(skill.link)));
});

test("HARNESS_PLATFORMS supports explicit isolated Hermes deployment", (t) => {
  const item = fixture(t);
  const env = {
    ...item.env,
    HARNESS_PLATFORMS: "hermes",
    HERMES_HOME: path.join(item.temp, "custom-hermes"),
    HARNESS_HERMES_SKILL_ROOT: path.join(item.temp, "custom-hermes", "skills")
  };
  const result = install({ env, bundleRoot });
  assert.deepEqual(result.platforms.map((platform) => platform.id), ["hermes"]);
  assert.equal(result.managed_guidance.length, 0);
  assert.ok(result.managed_skills.some((skill) => skill.platform === "hermes"));
  assert.ok(result.managed_skills.some((skill) => skill.name === "harness-runtime"));
  assert.ok(result.managed_skills.some((skill) => skill.platform === "shared"));
  assert.ok(result.managed_skills.every((skill) => skill.platform !== "codex"));
});

test("Kimi Code discovery is read-only and deploys Skills plus bounded global guidance", (t) => {
  const item = fixture(t);
  const kimiHome = path.join(item.env.HARNESS_USER_HOME, ".kimi-code");
  const paths = resolveUserPaths(item.env);
  assert.deepEqual(detectPlatforms(paths, item.env).map((platform) => platform.id), ["codex"]);
  assert.equal(fs.existsSync(kimiHome), false);

  fs.mkdirSync(kimiHome, { recursive: true });
  const guidance = path.join(kimiHome, "AGENTS.md");
  write(guidance, "# Kimi user rules\n");
  assert.deepEqual(detectPlatforms(paths, item.env).map((platform) => platform.id), ["codex", "kimi"]);

  const result = install({ env: item.env, bundleRoot });
  const kimiSkills = result.managed_skills.filter((skill) => skill.platform === "kimi");
  assert.ok(kimiSkills.length > 0);
  assert.ok(kimiSkills.every((skill) => fs.lstatSync(skill.link).isSymbolicLink()));
  assert.equal(kimiSkills.some((skill) => skill.name === "harness-runtime"), false);
  assert.match(fs.readFileSync(guidance, "utf8"), /Kimi user rules/);
  assert.match(fs.readFileSync(guidance, "utf8"), /harness:managed:start/);

  uninstall({ env: item.env });
  assert.equal(fs.readFileSync(guidance, "utf8"), "# Kimi user rules\n");
  assert.ok(kimiSkills.every((skill) => !fs.existsSync(skill.link)));
});

test("HARNESS_PLATFORMS supports explicit isolated Kimi Code deployment", (t) => {
  const item = fixture(t);
  const kimiHome = path.join(item.temp, "custom-kimi-code");
  const env = {
    ...item.env,
    HARNESS_PLATFORMS: "kimi",
    KIMI_CODE_HOME: kimiHome,
    HARNESS_KIMI_SKILL_ROOT: path.join(kimiHome, "skills")
  };
  const result = install({ env, bundleRoot });
  assert.deepEqual(result.platforms.map((platform) => platform.id), ["kimi"]);
  assert.deepEqual(result.managed_guidance, [{ platform: "kimi", path: path.join(kimiHome, "AGENTS.md") }]);
  assert.ok(result.managed_skills.some((skill) => skill.platform === "kimi"));
  assert.ok(result.managed_skills.some((skill) => skill.platform === "shared"));
  assert.ok(result.managed_skills.every((skill) => skill.platform !== "codex" && skill.platform !== "hermes"));
  assert.ok(fs.existsSync(path.join(kimiHome, "AGENTS.md")));
});

test("Hermes adapter is not projected to Codex or the shared Skill root", (t) => {
  const item = fixture(t);
  const result = install({ env: item.env, bundleRoot });
  assert.equal(result.platforms.some((platform) => platform.id === "hermes"), false);
  assert.equal(result.managed_skills.some((skill) => skill.name === "harness-runtime"), false);
  assert.equal(fs.existsSync(path.join(item.env.HARNESS_CODEX_SKILL_ROOT, "harness-runtime")), false);
  assert.equal(fs.existsSync(path.join(item.env.HARNESS_AGENTS_SKILL_ROOT, "harness-runtime")), false);
});

test("update requires an existing managed installation", (t) => {
  const item = fixture(t);
  assert.throws(() => update({ env: item.env, bundleRoot }), /run harness install first/);
});

test("update replaces the Runtime and removes obsolete managed Skill projections", (t) => {
  const item = fixture(t);
  const initial = install({ env: item.env, bundleRoot });
  const obsolete = initial.managed_skills.find((skill) => skill.platform === "shared");
  assert.ok(obsolete);

  const nextBundle = copyBundle(item);
  const manifestFile = path.join(nextBundle, "bundle-manifest.json");
  const manifest = JSON.parse(fs.readFileSync(manifestFile, "utf8"));
  manifest.bundle_version = `${manifest.bundle_version}.update-test`;
  manifest.skills = manifest.skills.filter((skill) => skill.name !== obsolete.name);
  writeJson(manifestFile, manifest);
  refreshBundleManifest(nextBundle);

  const result = update({ env: item.env, bundleRoot: nextBundle });
  assert.equal(result.bundle_version.endsWith(".update-test"), true);
  assert.equal(fs.existsSync(obsolete.link), false);
  assert.equal(result.managed_skills.some((skill) => skill.link === obsolete.link), false);
});

test("version reports CLI and installed Runtime versions", (t) => {
  const item = fixture(t);
  const bin = path.join(root, "bin", "harness.js");
  const before = JSON.parse(execFileSync(process.execPath, [bin, "version", "--json"], {
    env: item.env, encoding: "utf8"
  }));
  assert.equal(before.cli_version, "0.2.3");
  assert.equal(before.runtime, null);

  const installed = install({ env: item.env, bundleRoot });
  const after = JSON.parse(execFileSync(process.execPath, [bin, "version", "--json"], {
    env: item.env, encoding: "utf8"
  }));
  assert.equal(after.runtime.bundle_version, installed.bundle_version);
  assert.equal(after.runtime.kernel_revision, installed.kernel.revision);
  assert.equal(after.runtime.domain_revision, installed.domain_source.revision);
});

test("public CLI surface is limited to lifecycle and version commands", () => {
  const bin = path.join(root, "bin", "harness.js");
  const help = execFileSync(process.execPath, [bin, "--help"], { encoding: "utf8" });
  for (const command of ["install", "update", "uninstall", "version"]) {
    assert.match(help, new RegExp(`harness ${command}`));
  }
  for (const removed of ["route", "doctor", "check", "context", "platforms"]) {
    assert.doesNotMatch(help, new RegExp(`harness ${removed}`));
  }
  assert.throws(
    () => execFileSync(process.execPath, [bin, "route"], { encoding: "utf8", stdio: "pipe" }),
    /Unknown command: route/
  );
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
  assert.throws(() => update({ env: item.env, bundleRoot }), /managed guidance block is malformed/);
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
  assert.ok(fs.existsSync(path.join(item.env.HARNESS_HOME, "runtime", "kernel", "AGENTS.md")));
});

test("uninstall fails closed when ownership record is missing", (t) => {
  const item = fixture(t);
  install({ env: item.env, bundleRoot });
  fs.rmSync(path.join(item.env.HARNESS_HOME, "state", "install-record.json"));
  assert.throws(() => uninstall({ env: item.env }), /Cannot safely uninstall/);
  assert.ok(fs.existsSync(path.join(item.env.HARNESS_HOME, "runtime")));
});

test("uninstall detects Runtime drift and preserves all managed state", (t) => {
  const item = fixture(t);
  install({ env: item.env, bundleRoot });
  const runtimeFile = path.join(item.env.HARNESS_HOME, "runtime", "kernel", "AGENTS.md");
  fs.appendFileSync(runtimeFile, "\nmodified\n");
  assert.throws(() => uninstall({ env: item.env }), /modified Runtime file/);
  assert.ok(fs.existsSync(path.join(item.env.HARNESS_HOME, "manifest.json")));
  assert.ok(fs.existsSync(path.join(item.env.HARNESS_AGENTS_SKILL_ROOT, "harness-audit")));
  assert.match(fs.readFileSync(path.join(item.env.CODEX_HOME, "AGENTS.md"), "utf8"), /harness:managed:start/);
});
