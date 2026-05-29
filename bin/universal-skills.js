#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { execSync, spawnSync } = require("child_process");

const PKG_DIR = path.resolve(__dirname, "..");
const SKILLS_DIR = path.join(PKG_DIR, "skills");
const COLOR = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  red: "\x1b[31m",
};

const TOOL_CONFIGS = {
  opencode: {
    label: "opencode",
    dir: path.join(os().homedir, ".config", "opencode", "skills"),
    pluginDir: path.join(os().homedir, ".opencode", "plugins"),
    detect: () => !!process.env.OPENCODE_CONFIG || fs.existsSync(path.join(os().homedir, ".config", "opencode")),
  },
  "claude-code": {
    label: "Claude Code",
    dir: path.join(os().homedir, ".claude", "skills"),
    detect: () => fs.existsSync(path.join(os().homedir, ".claude")),
  },
  cursor: {
    label: "Cursor",
    dir: path.join(os().homedir, ".cursor", "skills"),
    detect: () => fs.existsSync(path.join(os().homedir, ".cursor")),
  },
  windsurf: {
    label: "Windsurf",
    dir: path.join(os().homedir, ".windsurf", "skills"),
    detect: () => fs.existsSync(path.join(os().homedir, ".windsurf")),
  },
};

function os() {
  const os = require("os");
  return os;
}

function log(color, msg) {
  console.log(color + msg + COLOR.reset);
}

function progress(label, fn) {
  process.stdout.write(COLOR.dim + "  → " + label + "..." + COLOR.reset);
  try {
    fn();
    process.stdout.write(COLOR.green + " OK" + COLOR.reset + "\n");
  } catch (e) {
    process.stdout.write(COLOR.red + " FAILED" + COLOR.reset + "\n");
    console.error(COLOR.red + "    " + e.message + COLOR.reset);
    process.exit(1);
  }
}

function copySkills(targetDir) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  const entries = fs.readdirSync(SKILLS_DIR, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const src = path.join(SKILLS_DIR, entry.name);
      const dst = path.join(targetDir, entry.name);
      if (fs.existsSync(dst)) {
        // Only update if skill file changed
        const srcSkill = path.join(src, "SKILL.md");
        const dstSkill = path.join(dst, "SKILL.md");
        if (fs.existsSync(srcSkill) && fs.existsSync(dstSkill)) {
          const srcMtime = fs.statSync(srcSkill).mtimeMs;
          const dstMtime = fs.statSync(dstSkill).mtimeMs;
          if (srcMtime <= dstMtime) continue;
        }
      }
      cpRecursive(src, dst);
    }
  }
}

function cpRecursive(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) cpRecursive(s, d);
    else fs.copyFileSync(s, d);
  }
}

function installPlugin(targetDir) {
  const srcPlugin = path.join(PKG_DIR, "plugins", "opencode", "skill-router.ts");
  if (!fs.existsSync(srcPlugin)) return;
  const dstPlugin = path.join(targetDir, "skill-router.ts");
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
  fs.copyFileSync(srcPlugin, dstPlugin);
}

function getSkillCount() {
  let count = 0;
  function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) walk(path.join(dir, e.name));
      else if (e.name === "SKILL.md") count++;
    }
  }
  walk(SKILLS_DIR);
  return count;
}

function listSkills(categoryFilter) {
  const cats = fs.readdirSync(SKILLS_DIR, { withFileTypes: true }).filter(d => d.isDirectory());
  const all = [];
  let total = 0;
  for (const cat of cats) {
    if (categoryFilter && cat.name !== categoryFilter) continue;
    console.log(COLOR.cyan + "\n" + cat.name.toUpperCase() + COLOR.reset);
    const skills = fs.readdirSync(path.join(SKILLS_DIR, cat.name), { withFileTypes: true }).filter(d => d.isDirectory());
    for (const s of skills) {
      const skillPath = path.join(SKILLS_DIR, cat.name, s.name, "SKILL.md");
      if (!fs.existsSync(skillPath)) continue;
      const content = fs.readFileSync(skillPath, "utf-8");
      const desc = (content.match(/^description: (.+)/m) || [])[1] || "No description";
      const used = content.includes("## Checklist") ? "✓" : " ";
      console.log(`  [${used}] ${COLOR.bold}${s.name}${COLOR.reset}`);
      console.log(`       ${COLOR.dim}${desc}${COLOR.reset}`);
      all.push({ category: cat.name, name: s.name, description: desc });
      total++;
    }
  }
  console.log(COLOR.green + `\n  ${total} skills total` + COLOR.reset);
  return all;
}

function addSkill(skillName) {
  const cats = fs.readdirSync(SKILLS_DIR, { withFileTypes: true }).filter(d => d.isDirectory());
  for (const cat of cats) {
    const skillPath = path.join(SKILLS_DIR, cat.name, skillName, "SKILL.md");
    if (fs.existsSync(skillPath)) {
      const targetDir = path.join(TOOL_CONFIGS.opencode.dir, cat.name, skillName);
      fs.mkdirSync(path.dirname(targetDir), { recursive: true });
      cpRecursive(path.join(SKILLS_DIR, cat.name, skillName), targetDir);
      log(COLOR.green, "  ✓ Installed " + skillName);
      return true;
    }
  }
  log(COLOR.red, "  ✗ Skill '" + skillName + "' not found");
  return false;
}

function showVersion() {
  const pkg = JSON.parse(fs.readFileSync(path.join(PKG_DIR, "package.json"), "utf-8"));
  console.log("universal-skills v" + pkg.version);
}

function printUsage() {
  console.log(COLOR.bold + "universal-skills" + COLOR.reset + " — Install AI skills everywhere");
  console.log("");
  console.log("  " + COLOR.cyan + "install" + COLOR.reset + "        Install skills to all detected CLI tools");
  console.log("  " + COLOR.cyan + "install --tool=x" + COLOR.reset + "  Install for a specific tool (opencode|claude-code|cursor|windsurf|all)");
  console.log("  " + COLOR.cyan + "list" + COLOR.reset + "           List all available skills");
  console.log("  " + COLOR.cyan + "list <category>" + COLOR.reset + " List skills in a category");
  console.log("  " + COLOR.cyan + "add <skill>" + COLOR.reset + "     Install a single skill by name");
  console.log("  " + COLOR.cyan + "version" + COLOR.reset + "        Show version");
}

const cmd = process.argv[2];

switch (cmd) {
  case "install": {
    const toolFlag = process.argv.find(a => a.startsWith("--tool="));
    const tool = toolFlag ? toolFlag.split("=")[1] : null;

    log(COLOR.magenta, "\n ╔══════════════════════════════════════╗");
    log(COLOR.magenta, " ║   Universal Skills Installer        ║");
    log(COLOR.magenta, " ╚══════════════════════════════════════╝\n");

    const skillCount = getSkillCount();
    log(COLOR.cyan, "  📦 " + skillCount + " skills to install\n");

    const targets = tool === "all"
      ? Object.entries(TOOL_CONFIGS)
      : tool
        ? [[tool, TOOL_CONFIGS[tool]]]
        : Object.entries(TOOL_CONFIGS).filter(([, cfg]) => cfg.detect());

    if (targets.length === 0) {
      log(COLOR.yellow, "  No supported CLI tools detected.");
      log(COLOR.yellow, "  Install manually:\n    npx universal-skills install --tool=all\n");
      process.exit(0);
    }

    for (const [key, cfg] of targets) {
      if (!cfg) { log(COLOR.red, "  ✗ Unknown tool: " + tool); continue; }
      log(COLOR.blue, "  ── " + cfg.label + " ──");
      progress("Copy skills to " + cfg.dir, () => copySkills(cfg.dir));
      if (key === "opencode") {
        progress("Install opencode plugin", () => installPlugin(cfg.pluginDir));
      }
    }

    log(COLOR.green, "\n  ✓ Installation complete!");
    log(COLOR.dim, "\n  Restart your CLI tool for skills to take effect.\n");
    break;
  }

  case "list":
    listSkills(process.argv[3]);
    break;

  case "add":
    if (!process.argv[3]) { log(COLOR.red, "Usage: npx universal-skills add <skill-name>"); process.exit(1); }
    addSkill(process.argv[3]);
    break;

  case "version":
    showVersion();
    break;

  default:
    printUsage();
    break;
}
