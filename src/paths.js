import os from "node:os";
import path from "node:path";

export function resolveUserPaths(env = process.env) {
  const userHome = env.HARNESS_USER_HOME || os.homedir();
  const codexHome = env.CODEX_HOME || path.join(userHome, ".codex");
  const harnessHome = env.HARNESS_HOME || path.join(userHome, ".harness");

  return {
    userHome,
    codexHome,
    harnessHome,
    manifestPath: path.join(harnessHome, "manifest.json"),
    installRecordPath: path.join(harnessHome, "state", "install-record.json"),
    runtimeRoot: path.join(harnessHome, "runtime"),
    guidancePath: path.join(codexHome, "AGENTS.md"),
    skillRoots: [
      env.HARNESS_AGENTS_SKILL_ROOT || path.join(userHome, ".agents", "skills"),
      env.HARNESS_CODEX_SKILL_ROOT || path.join(codexHome, "skills")
    ]
  };
}

export function resolveProject(project = process.cwd()) {
  return path.resolve(project);
}
