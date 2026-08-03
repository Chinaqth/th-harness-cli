import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { loadConfig } from "./config.js";
import { atomicWrite, readJson, unique } from "./io.js";
import { resolveProject } from "./paths.js";
import { validateInstance } from "./schema.js";
import { GUIDANCE_START } from "./install.js";

function validationError(label, errors) {
  if (errors.length) {
    throw new Error(`${label} failed validation:\n${errors.map((error) => `- ${error}`).join("\n")}`);
  }
}

function loadContext(project, env = process.env) {
  const { config, paths } = loadConfig(env);
  const projectPath = resolveProject(project);
  const kernelHead = config.kernel.revision;
  const domainHead = config.domain_source.revision;
  const sourceConfig = readJson(
    path.join(config.kernel.path, "config", "domain-pack-sources.json")
  );
  const source = sourceConfig.sources?.find((item) => item.id === config.domain_source.id);
  if (!source) {
    throw new Error(`Configured Domain source ${config.domain_source.id} is missing from the Kernel`);
  }
  if (source.ref !== domainHead) {
    throw new Error(
      `Domain source pin mismatch: installed=${config.domain_source.revision}, kernel=${source.ref}, HEAD=${domainHead}`
    );
  }

  const overlayPath = path.join(projectPath, config.runtime.project_overlay);
  const overlay = fs.existsSync(overlayPath)
    ? readJson(overlayPath)
    : { schema_version: "1.0", domains: [] };
  const overlaySchema = readJson(
    path.join(config.kernel.path, "schemas", "project-domain-overlay.schema.json")
  );
  const overlayErrors = validateInstance(overlay, overlaySchema);
  const domainIds = (overlay.domains || [])
    .filter((item) => item && typeof item.id === "string")
    .map((item) => item.id);
  if (new Set(domainIds).size !== domainIds.length) {
    overlayErrors.push("$: project overlay Domain IDs must be unique");
  }
  validationError("Project overlay", overlayErrors);

  const registryPath = path.join(
    config.domain_source.path,
    config.domain_source.registry
  );
  const registry = readJson(registryPath);

  return {
    config,
    paths,
    project: projectPath,
    overlay_path: overlayPath,
    overlay_present: fs.existsSync(overlayPath),
    overlay,
    registry,
    kernel_head: kernelHead,
    domain_head: domainHead,
    source
  };
}

export function context({ project, env = process.env }) {
  const current = loadContext(project, env);
  return {
    schema_version: "1.0",
    project: current.project,
    kernel: {
      path: current.config.kernel.path,
      revision: current.kernel_head
    },
    domain_source: {
      id: current.config.domain_source.id,
      path: current.config.domain_source.path,
      revision: current.domain_head,
      registry: current.config.domain_source.registry,
      registered_domains: current.registry.domains?.length || 0,
      active_domains: (current.registry.domains || []).filter((item) => item.status === "active").length
    },
    project_overlay: {
      path: current.overlay_path,
      present: current.overlay_present,
      enabled_domains: (current.overlay.domains || []).filter((item) => item.enabled).map((item) => item.id)
    }
  };
}

export function check({ project, env = process.env }) {
  const current = loadContext(project, env);
  const gates = [
    { label: "Installed Runtime", passed: doctor({ project, env }).passed, status: 0, output: "" },
    { label: "Kernel/Domain compatibility", passed: current.source.ref === current.domain_head, status: 0, output: "" }
  ];
  return {
    passed: gates.every((gate) => gate.passed),
    project: current.project,
    overlay_present: current.overlay_present,
    gates
  };
}

export function doctor({ project, env = process.env }) {
  const checks = [];
  let current;
  try {
    current = loadContext(project, env);
    checks.push({ name: "configuration", passed: true });
  } catch (error) {
    return {
      passed: false,
      checks: [{ name: "configuration", passed: false, detail: error.message }]
    };
  }

  const managedGuidance = current.config.managed_guidance || (current.config.runtime.global_guidance
    ? [{ platform: "codex", path: current.config.runtime.global_guidance }]
    : []);
  for (const item of managedGuidance) {
    const guidance = fs.existsSync(item.path) ? fs.readFileSync(item.path, "utf8") : "";
    checks.push({
      name: `${item.platform} global guidance`,
      passed: guidance.includes(GUIDANCE_START),
      detail: item.path
    });
  }

  for (const item of current.config.installed_files || []) {
    const file = path.join(current.config.runtime.root, item.path);
    const passed = fs.existsSync(file) &&
      crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex") === item.sha256;
    if (!passed) checks.push({ name: `Runtime file ${item.path}`, passed: false, detail: file });
  }

  const cliCommand = current.config.runtime.cli_command;
  if (cliCommand && path.isAbsolute(cliCommand)) {
    checks.push({
      name: "CLI command",
      passed: fs.existsSync(cliCommand),
      detail: cliCommand
    });
  }

  for (const skill of current.config.managed_skills || []) {
    const passed =
      fs.existsSync(skill.link) &&
      fs.lstatSync(skill.link).isSymbolicLink() &&
      path.resolve(path.dirname(skill.link), fs.readlinkSync(skill.link)) === skill.source;
    checks.push({ name: `Skill ${skill.name}`, passed, detail: skill.link });
  }

  checks.push({
    name: "project overlay",
    passed: true,
    detail: current.overlay_present ? current.overlay_path : "not present; empty overlay applies"
  });

  return { passed: checks.every((item) => item.passed), checks };
}

function loadDomainRecord(current, entry) {
  const root = path.join(current.config.domain_source.path, entry.path);
  return {
    root,
    manifest: readJson(path.join(root, "domain.json")),
    routes: readJson(path.join(root, "routes.json")),
    capabilities: readJson(path.join(root, "capabilities.json"))
  };
}

function intersects(left, right) {
  const rightSet = new Set(right.map((item) => String(item).toLowerCase()));
  return left.some((item) => rightSet.has(String(item).toLowerCase()));
}

function combine(items, key) {
  return unique(items.flatMap((item) => Array.isArray(item[key]) ? item[key] : []));
}

export function route({ project, taskFile, output, env = process.env }) {
  const current = loadContext(project, env);
  const task = readJson(path.resolve(taskFile));
  const taskSchema = readJson(
    path.join(current.config.kernel.path, "schemas", "task-envelope.schema.json")
  );
  validationError("Task Envelope", validateInstance(task, taskSchema));

  const conflicts = [];
  const selections = [];
  for (const overlay of (current.overlay.domains || []).filter((item) => item.enabled)) {
    const entry = (current.registry.domains || []).find((item) => item.id === overlay.id);
    if (!entry) {
      conflicts.push(`Project overlay references unregistered Domain ${overlay.id}.`);
      continue;
    }
    if (entry.status !== "active") {
      conflicts.push(`Domain ${entry.id} is ${entry.status}, not active.`);
      continue;
    }
    if (entry.version !== overlay.version) {
      conflicts.push(
        `Domain ${entry.id} overlay version ${overlay.version} does not match registry version ${entry.version}.`
      );
      continue;
    }

    const record = loadDomainRecord(current, entry);
    const signals = unique([
      ...(task.repository_signals || []),
      ...(overlay.additional_signals || [])
    ]);
    const matchedRoutes = (record.routes.routes || [])
      .filter((candidate) => candidate.task_types.includes(task.task_type))
      .filter((candidate) => intersects(candidate.signals, signals))
      .sort((left, right) => right.priority - left.priority);

    if (!matchedRoutes.length) {
      conflicts.push(`No route in Domain ${entry.id} matches the task type and repository signals.`);
      continue;
    }

    const routeRecord = matchedRoutes[0];
    const disabled = new Set(overlay.disabled_capabilities || []);
    const capabilityIds = routeRecord.capabilities.filter((id) => !disabled.has(id));
    const capabilities = capabilityIds
      .map((id) => (record.capabilities.capabilities || []).find((item) => item.id === id))
      .filter(Boolean)
      .filter((capability) => !capability.task_types.length || capability.task_types.includes(task.task_type));

    if (!capabilities.length || capabilities.length !== capabilityIds.length) {
      conflicts.push(`Domain ${entry.id} route ${routeRecord.id} has unavailable or disabled capabilities.`);
      continue;
    }

    selections.push({
      domain_id: entry.id,
      version: entry.version,
      route_id: routeRecord.id,
      capability_ids: capabilities.map((item) => item.id),
      workflows: combine(capabilities, "workflows"),
      skills: combine(capabilities, "skills"),
      tools: combine(capabilities, "tools"),
      evaluators: combine(capabilities, "evaluators"),
      permissions: combine(capabilities, "permissions"),
      reason: `Matched task type ${task.task_type} and signals for project-enabled Domain ${entry.id}.`
    });
  }

  if (!selections.length && !conflicts.length) {
    const activeCount = (current.registry.domains || []).filter((item) => item.status === "active").length;
    conflicts.push(
      activeCount
        ? "The project overlay does not enable an active Domain Pack."
        : "No active Domain Pack is registered."
    );
  }

  const plan = {
    schema_version: "1.0",
    task_id: task.task_id,
    source: {
      source_id: current.source.id,
      repository: current.source.repository,
      revision: current.domain_head,
      registry: current.source.registry
    },
    status: conflicts.length ? "unroutable" : "routed",
    selections: conflicts.length ? [] : selections,
    approvals: [],
    conflicts,
    missing_inputs: []
  };

  const planSchema = readJson(
    path.join(current.config.kernel.path, "schemas", "routing-plan.schema.json")
  );
  validationError("Routing Plan", validateInstance(plan, planSchema));

  if (output) {
    atomicWrite(path.resolve(output), `${JSON.stringify(plan, null, 2)}\n`);
  }
  return plan;
}
