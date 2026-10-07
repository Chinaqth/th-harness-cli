import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const development = process.argv.includes("--development");
if (!process.env.HARNESS_KERNEL_SOURCE || !process.env.HARNESS_DOMAIN_SOURCE) throw new Error("Set HARNESS_KERNEL_SOURCE and HARNESS_DOMAIN_SOURCE");
const kernel = path.resolve(process.env.HARNESS_KERNEL_SOURCE);
const domains = path.resolve(process.env.HARNESS_DOMAIN_SOURCE);
const python = process.env.HARNESS_PYTHON || "python3";
const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
function revision(checkout, label) {
  if (development) return execFileSync(python, ["-c", "import sys; from pathlib import Path; sys.path.insert(0,sys.argv[1]); from source_tree import tree_digest,DOMAIN_ENTRIES,KERNEL_ENTRIES; print(tree_digest(Path(sys.argv[2]),KERNEL_ENTRIES if sys.argv[3]=='Kernel' else DOMAIN_ENTRIES))", path.join(kernel,"scripts"), checkout, label], {encoding:"utf8", env:{...process.env,PYTHONDONTWRITEBYTECODE:"1"}}).trim();
  if (execFileSync("git", ["-C", checkout, "status", "--porcelain"], {encoding:"utf8"}).trim()) throw new Error(`${label} source checkout is dirty; use explicit --development for a non-release snapshot`);
  return execFileSync("git", ["-C", checkout, "rev-parse", "HEAD"], {encoding:"utf8"}).trim();
}
const kernelRevision = revision(kernel,"Kernel");
const domainRevision = revision(domains,"Domains");
const source = JSON.parse(fs.readFileSync(path.join(kernel,"config/domain-pack-sources.json"),"utf8")).sources[0];
if (source.ref !== domainRevision) throw new Error("Kernel Domain pin does not match source revision/digest");
const checkEnv = {...process.env, HARNESS_DOMAIN_PACKS_CHECKOUT:domains, HARNESS_PYTHON:python, PYTHONDONTWRITEBYTECODE:"1"};
execFileSync("bash", [path.join(kernel,"scripts/harness-check.sh")], {cwd:kernel,stdio:"inherit",env:checkEnv});
execFileSync("bash", [path.join(domains,"scripts/domain-check.sh")], {cwd:domains,stdio:"inherit",env:checkEnv});
const stage = fs.mkdtempSync(path.join(root,".bundle-stage-"));
const output = path.join(root,"bundle");
function clean(sourcePath) { const name=path.basename(sourcePath); return ![".git",".DS_Store","__pycache__"].includes(name) && !name.endsWith(".pyc"); }
function files(directory,prefix="") {
 return fs.readdirSync(path.join(directory,prefix)).sort().flatMap(name=>{
  const relative=path.join(prefix,name), stat=fs.lstatSync(path.join(directory,relative));
  if (stat.isSymbolicLink()) throw new Error(`Source symlink unsupported: ${relative}`);
  return stat.isDirectory()?files(directory,relative):[relative];
 });
}
function skills(directory,prefix) { return fs.existsSync(directory)?fs.readdirSync(directory).sort().filter(name=>fs.existsSync(path.join(directory,name,"SKILL.md"))).map(name=>({name,source:path.join(prefix,name)})):[]; }
try {
 for (const [checkout,subdir,entries] of [
  [kernel,"kernel",["AGENTS.md","config","docs","rules","schemas","workflows","skills","scripts"]],
  [domains,"domains",["AGENTS.md",".agents/skills","docs","registry","schemas","domains"]]
 ]) for (const entry of entries) fs.cpSync(path.join(checkout,entry),path.join(stage,subdir,entry),{recursive:true,filter:clean});
 const domainContentDigest = execFileSync(python,["-c","import sys; from pathlib import Path; sys.path.insert(0,sys.argv[1]); from source_tree import tree_digest; print(tree_digest(Path(sys.argv[2])))",path.join(kernel,"scripts"),path.join(stage,"domains")],{encoding:"utf8",env:{...process.env,PYTHONDONTWRITEBYTECODE:"1"}}).trim();
 fs.writeFileSync(path.join(stage,"domains/source-provenance.json"),JSON.stringify({revision:domainRevision,content_digest:domainContentDigest},null,2)+"\n");
 const published=[...skills(path.join(stage,"kernel/skills"),"kernel/skills"),...skills(path.join(stage,"domains/.agents/skills"),"domains/.agents/skills")];
 const registry=JSON.parse(fs.readFileSync(path.join(stage,"domains",source.registry),"utf8"));
 for (const domain of registry.domains) if (domain.status==="active") published.push(...skills(path.join(stage,"domains",domain.path,"skills"),path.join("domains",domain.path,"skills")));
 if (new Set(published.map(x=>x.name)).size!==published.length) throw new Error("Duplicate Skill name");
 if (kernelRevision!==revision(kernel,"Kernel") || domainRevision!==revision(domains,"Domains")) throw new Error("Sources changed during Bundle build");
 const short=x=>x.replace("sha256:","").slice(0,7);
 const manifest={schema_version:"1.0",build_kind:development?"development":"release",bundle_version:`${pkg.version}${development?"-dev":""}+${short(kernelRevision)}.${short(domainRevision)}`,cli_version:pkg.version,kernel_revision:kernelRevision,domain_revision:domainRevision,domain_source:{id:source.id,repository:source.repository,registry:source.registry},skills:published,files:files(stage).sort().map(relative=>({path:relative,sha256:crypto.createHash("sha256").update(fs.readFileSync(path.join(stage,relative))).digest("hex")}))};
 fs.writeFileSync(path.join(stage,"bundle-manifest.json"),JSON.stringify(manifest,null,2)+"\n");
 const previous=output+".previous";
 if(fs.existsSync(previous)) throw new Error("Inspect leftover Bundle backup before replacing it");
 if(fs.existsSync(output)) fs.renameSync(output,previous);
 try { fs.renameSync(stage,output); } catch(error) {if(fs.existsSync(previous)) fs.renameSync(previous,output);throw error;}
 fs.rmSync(previous,{recursive:true,force:true});
} finally {fs.rmSync(stage,{recursive:true,force:true});}
