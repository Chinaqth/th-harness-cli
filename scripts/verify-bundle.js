import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const bundle = path.join(root, "bundle");
const manifestFile = path.join(bundle, "bundle-manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestFile, "utf8"));
if (manifest.schema_version !== "1.0") throw new Error("Unsupported Bundle schema");
const walk = (directory, prefix = "") => fs.readdirSync(path.join(directory, prefix)).sort().flatMap((name) => {
  if ([".git", ".DS_Store", "__pycache__"].includes(name) || name.endsWith(".pyc")) {
    throw new Error(`Forbidden Bundle artifact: ${path.join(prefix, name)}`);
  }
  const relative = path.join(prefix, name);
  return fs.statSync(path.join(directory, relative)).isDirectory() ? walk(directory, relative) : [relative];
});
const actual = walk(bundle).filter((file) => file !== "bundle-manifest.json");
const expected = manifest.files.map((item) => item.path).sort();
if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error("Bundle file list drift");
for (const item of manifest.files) {
  const digest = crypto.createHash("sha256").update(fs.readFileSync(path.join(bundle, item.path))).digest("hex");
  if (digest !== item.sha256) throw new Error(`Bundle checksum drift: ${item.path}`);
}
const source = JSON.parse(fs.readFileSync(path.join(bundle, "kernel", "config", "domain-pack-sources.json"), "utf8")).sources?.[0];
if (!source || source.ref !== manifest.domain_revision) throw new Error("Kernel and Domain revisions are incompatible");
process.stdout.write(`Verified ${manifest.files.length} Runtime files\n`);
