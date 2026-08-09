import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { install, uninstall, update } from "./install.js";
import { resolveUserPaths } from "./paths.js";

const HELP = `Harness Engineering CLI

Usage:
  harness install [--json]
  harness update [--json]
  harness uninstall [--json]
  harness version [--json]
`;

function parse(argv) {
  const [command = "help", ...rest] = argv;
  const options = {};
  for (let index = 0; index < rest.length; index += 1) {
    const token = rest[index];
    if (!token.startsWith("--")) {
      throw new Error(`Unexpected argument: ${token}`);
    }
    const key = token.slice(2).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    if (key === "json") {
      options.json = true;
      continue;
    }
    const value = rest[index + 1];
    if (!value || value.startsWith("--")) {
      throw new Error(`Missing value for ${token}`);
    }
    options[key] = value;
    index += 1;
  }
  return { command, options };
}

function printJson(value) {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
}

function packageVersion() {
  const packageFile = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "package.json");
  return JSON.parse(fs.readFileSync(packageFile, "utf8")).version;
}

function versionInfo(env = process.env) {
  const manifestFile = resolveUserPaths(env).manifestPath;
  const installed = fs.existsSync(manifestFile) ? JSON.parse(fs.readFileSync(manifestFile, "utf8")) : null;
  return {
    cli_version: packageVersion(),
    runtime: installed ? {
      bundle_version: installed.bundle_version,
      kernel_revision: installed.kernel?.revision,
      domain_revision: installed.domain_source?.revision
    } : null
  };
}

function printDeployment(verb, result) {
  process.stdout.write(`${verb} Harness Kernel ${result.kernel.revision.slice(0, 7)}\n`);
  process.stdout.write(`${verb} Domain Packs ${result.domain_source.revision.slice(0, 7)}\n`);
  process.stdout.write(`Published ${result.managed_skills.length} managed Skill projection(s)\n`);
  process.stdout.write(`Deployed to: ${result.platforms.map((item) => item.id).join(", ") || "shared Skills only"}\n`);
}

export async function main(argv) {
  const { command, options } = parse(argv);
  if (command === "help" || command === "--help" || command === "-h") {
    process.stdout.write(HELP);
    return;
  }
  if (command === "version" || command === "--version" || command === "-v") {
    const info = versionInfo();
    if (options.json) printJson(info);
    else {
      process.stdout.write(`Harness CLI ${info.cli_version}\n`);
      if (info.runtime) {
        process.stdout.write(`Runtime Bundle ${info.runtime.bundle_version}\n`);
        process.stdout.write(`Kernel ${info.runtime.kernel_revision}\n`);
        process.stdout.write(`Domains ${info.runtime.domain_revision}\n`);
      } else process.stdout.write("Runtime: not installed\n");
    }
    return;
  }
  if (command === "install") {
    const result = install();
    options.json ? printJson(result) : printDeployment("Installed", result);
    return;
  }
  if (command === "update") {
    const result = update();
    options.json ? printJson(result) : printDeployment("Updated", result);
    return;
  }
  if (command === "uninstall") {
    const result = uninstall({});
    if (options.json) {
      printJson(result);
    } else {
      process.stdout.write(`Removed ${result.removed.length} managed Skill projection(s)\n`);
      process.stdout.write("Removed the managed Runtime and platform adapter(s)\n");
    }
    return;
  }
  throw new Error(`Unknown command: ${command}\n\n${HELP}`);
}
