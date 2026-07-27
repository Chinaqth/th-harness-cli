import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { atomicWrite, pathExists, readJson, unique, writeJson } from "./io.js";
import { resolveUserPaths } from "./paths.js";

export const GUIDANCE_START = "<!-- harness:managed:start -->";
export const GUIDANCE_END = "<!-- harness:managed:end -->";
const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function hashFile(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function listFiles(root, prefix = "") {
  const output = [];
  for (const name of fs.readdirSync(path.join(root, prefix)).sort()) {
    const relative = path.join(prefix, name);
    const stat = fs.lstatSync(path.join(root, relative));
    if (stat.isDirectory()) output.push(...listFiles(root, relative));
    else if (stat.isFile()) output.push(relative);
  }
  return output;
}

function loadBundle(bundleRoot) {
  const root = path.resolve(bundleRoot || path.join(packageRoot, "bundle"));
  const manifestPath = path.join(root, "bundle-manifest.json");
  if (!fs.existsSync(manifestPath)) throw new Error(`Runtime Bundle is missing: ${manifestPath}`);
  const manifest = readJson(manifestPath);
  if (manifest.schema_version !== "1.0") throw new Error("Unsupported Runtime Bundle manifest");
  const actual = listFiles(root).filter((file) => file !== "bundle-manifest.json");
  const expected = (manifest.files || []).map((item) => item.path).sort();
  if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error("Runtime Bundle file list does not match its manifest");
  for (const item of manifest.files) {
    if (hashFile(path.join(root, item.path)) !== item.sha256) {
      throw new Error(`Runtime Bundle checksum mismatch: ${item.path}`);
    }
  }
  const source = readJson(path.join(root, "kernel", "config", "domain-pack-sources.json")).sources?.[0];
  if (!source || source.ref !== manifest.domain_revision) {
    throw new Error("Runtime Bundle Kernel and Domain revisions are incompatible");
  }
  return { root, manifest };
}

function guidanceBlock() {
  return `${GUIDANCE_START}
Harness Engineering is installed.

Load and follow:
~/.harness/runtime/kernel/AGENTS.md

Resolve Domain capabilities through the installed Harness runtime.
Project constraints may be stricter but cannot weaken Kernel requirements.
${GUIDANCE_END}`;
}

function replaceManagedBlock(existing) {
  const startCount = existing.split(GUIDANCE_START).length - 1;
  const endCount = existing.split(GUIDANCE_END).length - 1;
  if (startCount !== endCount || startCount > 1) throw new Error("Existing Harness managed guidance block is malformed");
  const pattern = new RegExp(`\\n?${GUIDANCE_START}[\\s\\S]*?${GUIDANCE_END}\\n?`, "g");
  const preserved = existing.replace(pattern, "\n").trimEnd();
  return `${preserved ? `${preserved}\n\n` : ""}${guidanceBlock()}\n`;
}

function discoverSkills(runtimeRoot, bundleManifest) {
  return (bundleManifest.skills || []).map((item) => ({
    name: item.name,
    source: path.join(runtimeRoot, item.source)
  }));
}

function assertTargetsAvailable(projections, previous) {
  const owned = new Map((previous?.managed_skills || []).map((item) => [item.link, item.source]));
  for (const item of projections) {
    if (!pathExists(item.link)) continue;
    const stat = fs.lstatSync(item.link);
    const target = stat.isSymbolicLink() ? path.resolve(path.dirname(item.link), fs.readlinkSync(item.link)) : null;
    if (target !== item.source || owned.get(item.link) !== item.source) {
      throw new Error(`Refusing to overwrite unmanaged Skill path: ${item.link}`);
    }
  }
}

export function install({ env = process.env, bundleRoot } = {}) {
  const paths = resolveUserPaths(env);
  const bundle = loadBundle(bundleRoot);
  const previous = fs.existsSync(paths.manifestPath) ? readJson(paths.manifestPath) : null;
  const skillSources = discoverSkills(paths.runtimeRoot, bundle.manifest);
  const projections = unique(paths.skillRoots).flatMap((root) =>
    skillSources.map((item) => ({ ...item, link: path.join(root, item.name) }))
  );
  assertTargetsAvailable(projections, previous);

  const priorGuidance = fs.existsSync(paths.guidancePath) ? fs.readFileSync(paths.guidancePath, "utf8") : null;
  fs.mkdirSync(path.dirname(paths.harnessHome), { recursive: true });
  const stage = fs.mkdtempSync(path.join(path.dirname(paths.harnessHome), ".harness-stage-"));
  const stagedRuntime = path.join(stage, "runtime");
  fs.cpSync(path.join(bundle.root, "kernel"), path.join(stagedRuntime, "kernel"), { recursive: true });
  fs.cpSync(path.join(bundle.root, "domains"), path.join(stagedRuntime, "domains"), { recursive: true });
  const backupRuntime = `${paths.runtimeRoot}.previous`;
  const createdLinks = [];
  try {
    fs.mkdirSync(paths.harnessHome, { recursive: true });
    if (fs.existsSync(backupRuntime)) fs.rmSync(backupRuntime, { recursive: true, force: true });
    if (fs.existsSync(paths.runtimeRoot)) fs.renameSync(paths.runtimeRoot, backupRuntime);
    fs.renameSync(stagedRuntime, paths.runtimeRoot);
    atomicWrite(paths.guidancePath, replaceManagedBlock(priorGuidance || ""));
    for (const item of projections) {
      fs.mkdirSync(path.dirname(item.link), { recursive: true });
      if (!pathExists(item.link)) {
        fs.symlinkSync(item.source, item.link, "dir");
        createdLinks.push(item.link);
      }
    }
    const installedFiles = listFiles(paths.runtimeRoot).map((relative) => ({
      path: relative,
      sha256: hashFile(path.join(paths.runtimeRoot, relative))
    }));
    const manifest = {
      schema_version: "2.0",
      cli_version: bundle.manifest.cli_version,
      bundle_version: bundle.manifest.bundle_version,
      kernel: { path: path.join(paths.runtimeRoot, "kernel"), revision: bundle.manifest.kernel_revision },
      domain_source: {
        id: bundle.manifest.domain_source.id,
        path: path.join(paths.runtimeRoot, "domains"),
        revision: bundle.manifest.domain_revision,
        repository: bundle.manifest.domain_source.repository,
        registry: bundle.manifest.domain_source.registry
      },
      runtime: { root: paths.runtimeRoot, project_overlay: ".harness/domains.json", global_guidance: paths.guidancePath },
      installed_at: new Date().toISOString(),
      installed_files: installedFiles,
      managed_skills: projections
    };
    writeJson(paths.manifestPath, manifest);
    writeJson(paths.installRecordPath, manifest);
    if (fs.existsSync(backupRuntime)) fs.rmSync(backupRuntime, { recursive: true, force: true });
    return manifest;
  } catch (error) {
    for (const link of createdLinks.reverse()) fs.rmSync(link, { force: true });
    if (fs.existsSync(paths.runtimeRoot)) fs.rmSync(paths.runtimeRoot, { recursive: true, force: true });
    if (fs.existsSync(backupRuntime)) fs.renameSync(backupRuntime, paths.runtimeRoot);
    if (priorGuidance === null) fs.rmSync(paths.guidancePath, { force: true });
    else atomicWrite(paths.guidancePath, priorGuidance);
    throw error;
  } finally {
    fs.rmSync(stage, { recursive: true, force: true });
  }
}

export function uninstall({ env = process.env } = {}) {
  const paths = resolveUserPaths(env);
  if (!fs.existsSync(paths.manifestPath) || !fs.existsSync(paths.installRecordPath)) {
    throw new Error("Cannot safely uninstall: installation manifest or record is missing");
  }
  const manifest = readJson(paths.manifestPath);
  const removed = [];
  for (const item of manifest.managed_skills || []) {
    if (!pathExists(item.link)) continue;
    if (!fs.lstatSync(item.link).isSymbolicLink()) {
      throw new Error(`Cannot safely remove modified Skill projection: ${item.link}`);
    }
    const target = path.resolve(path.dirname(item.link), fs.readlinkSync(item.link));
    if (target !== item.source) throw new Error(`Cannot safely remove modified Skill projection: ${item.link}`);
  }
  for (const item of manifest.installed_files || []) {
    const file = path.join(paths.runtimeRoot, item.path);
    if (!fs.existsSync(file) || hashFile(file) !== item.sha256) {
      throw new Error(`Cannot safely remove missing or modified Runtime file: ${item.path}`);
    }
  }
  for (const item of manifest.managed_skills || []) {
    if (!pathExists(item.link) || !fs.lstatSync(item.link).isSymbolicLink()) continue;
    const target = path.resolve(path.dirname(item.link), fs.readlinkSync(item.link));
    fs.unlinkSync(item.link);
    removed.push(item.link);
  }
  if (fs.existsSync(paths.guidancePath)) {
    const existing = fs.readFileSync(paths.guidancePath, "utf8");
    const pattern = new RegExp(`\\n?${GUIDANCE_START}[\\s\\S]*?${GUIDANCE_END}\\n?`, "g");
    const next = existing.replace(pattern, "\n").trim();
    if (next) atomicWrite(paths.guidancePath, `${next}\n`);
    else fs.rmSync(paths.guidancePath, { force: true });
  }
  fs.rmSync(paths.runtimeRoot, { recursive: true, force: true });
  fs.rmSync(paths.manifestPath, { force: true });
  fs.rmSync(paths.installRecordPath, { force: true });
  return { removed, runtime_removed: true };
}
