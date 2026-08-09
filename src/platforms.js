import fs from "node:fs";

const definitions = [
  {
    id: "codex",
    envHome: "CODEX_HOME",
    homeKey: "codexHome",
    skillRootKey: "codexSkillRoot",
    guidanceKey: "guidancePath"
  },
  {
    id: "hermes",
    envHome: "HERMES_HOME",
    homeKey: "hermesHome",
    skillRootKey: "hermesSkillRoot"
  },
  {
    id: "kimi",
    envHome: "KIMI_CODE_HOME",
    homeKey: "kimiHome",
    skillRootKey: "kimiSkillRoot",
    guidanceKey: "kimiGuidancePath"
  }
];

function requestedPlatforms(env) {
  if (!env.HARNESS_PLATFORMS) return null;
  const ids = env.HARNESS_PLATFORMS.split(",").map((item) => item.trim()).filter(Boolean);
  const unknown = ids.filter((id) => !definitions.some((item) => item.id === id));
  if (unknown.length) throw new Error(`Unsupported platform(s): ${unknown.join(", ")}`);
  return new Set(ids);
}

export function detectPlatforms(paths, env = process.env) {
  const requested = requestedPlatforms(env);
  return definitions.flatMap((definition) => {
    const home = paths[definition.homeKey];
    const explicitlyConfigured = Object.prototype.hasOwnProperty.call(env, definition.envHome);
    const detected = requested ? requested.has(definition.id) : explicitlyConfigured || fs.existsSync(home);
    if (!detected) return [];
    return [{
      id: definition.id,
      home,
      evidence: requested
        ? `HARNESS_PLATFORMS includes ${definition.id}`
        : explicitlyConfigured ? `${definition.envHome} is configured` : `${home} exists`,
      skill_root: paths[definition.skillRootKey],
      ...(definition.guidanceKey ? { guidance_path: paths[definition.guidanceKey] } : {})
    }];
  });
}

export function deploymentTargets(paths, env = process.env) {
  const platforms = detectPlatforms(paths, env);
  return {
    platforms,
    skillRoots: [
      { platform: "shared", root: paths.sharedSkillRoot },
      ...platforms.map((platform) => ({ platform: platform.id, root: platform.skill_root }))
    ],
    guidance: platforms
      .filter((platform) => platform.guidance_path)
      .map((platform) => ({ platform: platform.id, path: platform.guidance_path }))
  };
}
