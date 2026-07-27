import fs from "node:fs";
import path from "node:path";
import { check, context, doctor, route } from "./runtime.js";
import { install, uninstall } from "./install.js";

const HELP = `Harness Engineering CLI

Usage:
  harness install [--json]
  harness doctor [--project <path>] [--json]
  harness context [--project <path>] [--json]
  harness check [--project <path>] [--json]
  harness route --task <file> [--project <path>] [--output <file>]
  harness uninstall [--json]
  harness version

New product projects require no initialization. Add .harness/domains.json only when
the project needs to enable and specialize registered Domain Packs.
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

function printDoctor(result) {
  for (const item of result.checks) {
    process.stdout.write(`${item.passed ? "PASS" : "FAIL"} ${item.name}${item.detail ? `: ${item.detail}` : ""}\n`);
  }
}

function printCheck(result) {
  for (const gate of result.gates) {
    process.stdout.write(`${gate.passed ? "PASS" : "FAIL"} ${gate.label}\n`);
    if (!gate.passed && gate.output) {
      process.stdout.write(`${gate.output}\n`);
    }
  }
  process.stdout.write(
    `PASS project overlay: ${result.overlay_present ? "validated" : "not present; empty overlay applies"}\n`
  );
}

export async function main(argv) {
  const { command, options } = parse(argv);
  if (command === "help" || command === "--help" || command === "-h") {
    process.stdout.write(HELP);
    return;
  }
  if (command === "version" || command === "--version" || command === "-v") {
    const packageFile = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "package.json");
    const pkg = JSON.parse(fs.readFileSync(packageFile, "utf8"));
    process.stdout.write(`${pkg.version}\n`);
    return;
  }

  const project = options.project || process.cwd();
  if (command === "install") {
    const result = install();
    if (options.json) {
      printJson(result);
    } else {
      process.stdout.write(`Installed Harness Kernel ${result.kernel.revision.slice(0, 7)}\n`);
      process.stdout.write(`Installed Domain Packs ${result.domain_source.revision.slice(0, 7)}\n`);
      process.stdout.write(`Published ${result.managed_skills.length} global Skill projection(s)\n`);
    }
    return;
  }
  if (command === "uninstall") {
    const result = uninstall({});
    if (options.json) {
      printJson(result);
    } else {
      process.stdout.write(`Removed ${result.removed.length} managed Skill projection(s)\n`);
      process.stdout.write("Removed the managed Runtime and Codex adapter\n");
    }
    return;
  }
  if (command === "doctor") {
    const result = doctor({ project });
    options.json ? printJson(result) : printDoctor(result);
    if (!result.passed) {
      process.exitCode = 1;
    }
    return;
  }
  if (command === "context") {
    const result = context({ project });
    printJson(result);
    return;
  }
  if (command === "check") {
    const result = check({ project });
    options.json ? printJson(result) : printCheck(result);
    if (!result.passed) {
      process.exitCode = 1;
    }
    return;
  }
  if (command === "route") {
    if (!options.task) {
      throw new Error("route requires --task");
    }
    printJson(route({ project, taskFile: options.task, output: options.output }));
    return;
  }
  throw new Error(`Unknown command: ${command}\n\n${HELP}`);
}
