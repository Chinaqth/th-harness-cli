import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
if (!process.env.HARNESS_KERNEL_SOURCE || !process.env.HARNESS_DOMAIN_SOURCE) {
  throw new Error("Set HARNESS_KERNEL_SOURCE and HARNESS_DOMAIN_SOURCE to authoritative checkouts");
}
const kernel = path.resolve(process.env.HARNESS_KERNEL_SOURCE);
const domains = path.resolve(process.env.HARNESS_DOMAIN_SOURCE);
const output = path.join(root, "bundle");
const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
function assertCleanCheckout(checkout, label) {
  const changes = execFileSync("git", ["-C", checkout, "status", "--porcelain"], { encoding: "utf8" }).trim();
  if (changes) {
    throw new Error(`${label} source checkout is dirty; commit or discard changes before building an immutable bundle`);
  }
}
assertCleanCheckout(kernel, "Kernel");
assertCleanCheckout(domains, "Domain Packs");
const kernelRevision = execFileSync("git", ["-C", kernel, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
const domainRevision = execFileSync("git", ["-C", domains, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
const source = JSON.parse(fs.readFileSync(path.join(kernel, "config", "domain-pack-sources.json"), "utf8")).sources?.[0];
if (!source || source.ref !== domainRevision) throw new Error("Kernel Domain pin does not match Domain Packs HEAD");
execFileSync("bash", [path.join(kernel, "scripts", "harness-check.sh")], { cwd: kernel, stdio: "inherit" });
execFileSync("bash", [path.join(domains, "scripts", "domain-check.sh")], { cwd: domains, stdio: "inherit" });

const kernelEntries = ["AGENTS.md", "config", "docs", "rules", "schemas", "workflows", "skills"];
const domainEntries = ["AGENTS.md", ".agents/skills", "docs", "registry", "schemas", "domains"];
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
for (const entry of kernelEntries) {
  const sourcePath = path.join(kernel, entry);
  if (fs.existsSync(sourcePath)) fs.cpSync(sourcePath, path.join(output, "kernel", entry), { recursive: true, filter: clean });
}
for (const entry of domainEntries) {
  const sourcePath = path.join(domains, entry);
  if (fs.existsSync(sourcePath)) fs.cpSync(sourcePath, path.join(output, "domains", entry), { recursive: true, filter: clean });
}
function clean(sourcePath) {
  const name = path.basename(sourcePath);
  return ![".git", ".DS_Store", "__pycache__"].includes(name) && !name.endsWith(".pyc");
}
function files(directory, prefix = "") {
  return fs.readdirSync(path.join(directory, prefix)).sort().flatMap((name) => {
    const relative = path.join(prefix, name);
    return fs.statSync(path.join(directory, relative)).isDirectory() ? files(directory, relative) : [relative];
  });
}
function hash(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}
function skillEntries(directory, relativeRoot) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory).sort().filter((name) =>
    fs.existsSync(path.join(directory, name, "SKILL.md"))
  ).map((name) => ({ name, source: path.join(relativeRoot, name) }));
}
const skills = [
  ...skillEntries(path.join(output, "kernel", "skills"), "kernel/skills"),
  ...skillEntries(path.join(output, "domains", ".agents", "skills"), "domains/.agents/skills")
];
const registry = JSON.parse(fs.readFileSync(path.join(output, "domains", source.registry), "utf8"));
for (const domain of registry.domains || []) {
  if (domain.status !== "active") continue;
  skills.push(...skillEntries(
    path.join(output, "domains", domain.path, "skills"),
    path.join("domains", domain.path, "skills")
  ));
}
if (new Set(skills.map((item) => item.name)).size !== skills.length) throw new Error("Duplicate published Skill name");
const manifest = {
  schema_version: "1.0",
  bundle_version: `${pkg.version}+${kernelRevision.slice(0, 7)}.${domainRevision.slice(0, 7)}`,
  cli_version: pkg.version,
  kernel_revision: kernelRevision,
  domain_revision: domainRevision,
  domain_source: { id: source.id, repository: source.repository, registry: source.registry },
  skills,
  files: files(output).map((relative) => ({ path: relative, sha256: hash(path.join(output, relative)) }))
};
fs.writeFileSync(path.join(output, "bundle-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
