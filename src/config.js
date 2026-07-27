import fs from "node:fs";
import path from "node:path";
import { readJson } from "./io.js";
import { resolveUserPaths } from "./paths.js";

export function loadConfig(env = process.env) {
  const paths = resolveUserPaths(env);
  if (!fs.existsSync(paths.manifestPath)) {
    throw new Error(`Harness is not installed. Run harness install first. Missing ${paths.manifestPath}`);
  }
  const config = readJson(paths.manifestPath);
  if (config.schema_version !== "2.0") {
    throw new Error(`${paths.manifestPath}: unsupported schema_version`);
  }
  for (const key of ["kernel", "domain_source", "runtime"]) {
    if (!config[key] || typeof config[key] !== "object") {
      throw new Error(`${paths.manifestPath}: missing ${key}`);
    }
  }
  config.kernel.path = path.resolve(config.kernel.path);
  config.domain_source.path = path.resolve(config.domain_source.path);
  return { config, paths };
}
