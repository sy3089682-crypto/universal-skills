#!/usr/bin/env bash
# Universal Skills Installer — POSIX-compliant, macOS/Linux/Windows(WSL)
set -euo pipefail

VERSION="1.0.0"
REPO_URL="https://github.com/sy3089682-crypto/universal-skills"
REPO_RAW="https://raw.githubusercontent.com/sy3089682-crypto/universal-skills/main"

# ─── Colors ──────────────────────────────────────────────
R="\033[31m"; G="\033[32m"; Y="\033[33m"; B="\033[34m"
M="\033[35m"; C="\033[36m"; N="\033[0m"; K="\033[1m"

# ─── Helpers ─────────────────────────────────────────────
log()  { printf "$1$2${N}\n"; }
step() { printf "  ${C}→${N} $1 ..."; }
ok()   { printf " ${G}OK${N}\n"; }
fail() { printf " ${R}FAILED${N}\n"; echo "$1"; exit 1; }
title(){ printf "\n${M}╔══════════════════════════════════════╗${N}\n"; }
title2(){ printf "${M}║   Universal Skills v%-24s║${N}\n" "$VERSION"; }
title3(){ printf "${M}╚══════════════════════════════════════╝${N}\n\n"; }

detect_os() {
  case "$(uname -s)" in
    Darwin*) echo "macos" ;;
    Linux*)  echo "linux" ;;
    CYGWIN*|MINGW*|MSYS*) echo "windows" ;;
    *)       echo "unknown" ;;
  esac
}

detect_shell_config() {
  case "${SHELL:-}" in
    *zsh) echo "$HOME/.zshrc" ;;
    *bash) [ "$detect_os" = "macos" ] && echo "$HOME/.bash_profile" || echo "$HOME/.bashrc" ;;
    *fish) echo "$HOME/.config/fish/config.fish" ;;
    *) echo "$HOME/.profile" ;;
  esac
}

copy_skills() {
  local src="$1" dst="$2"
  mkdir -p "$dst"
  local count=0
  for cat_dir in "$src"/*/; do
    [ -d "$cat_dir" ] || continue
    local cat_name="$(basename "$cat_dir")"
    for skill_dir in "$cat_dir"*/; do
      [ -d "$skill_dir" ] || continue
      [ -f "$skill_dir/SKILL.md" ] || continue
      mkdir -p "$dst/$cat_name/$(basename "$skill_dir")"
      cp "$skill_dir/SKILL.md" "$dst/$cat_name/$(basename "$skill_dir")/"
      count=$((count + 1))
    done
  done
  echo "$count"
}

spinner() {
  local pid=$1 label="$2"
  local spin='⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏'
  local i=0
  while kill -0 "$pid" 2>/dev/null; do
    printf "\r  ${C}%s${N} %s ..." "${spin:$i:1}" "$label"
    i=$(( (i+1) % ${#spin} ))
    sleep 0.1
  done
  printf "\r  ${G}✓${N} %s ... done\n" "$label"
}

# ─── Main ────────────────────────────────────────────────
OS=$(detect_os)
MODE="${1:-auto}"
SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SKILLS_SRC="$SCRIPT_DIR/skills"

title; title2; title3

case "$MODE" in
  auto|all|opencode|claude-code|cursor|windsurf) ;;
  *) log "$Y" "Usage: $0 [auto|all|opencode|claude-code|cursor|windsurf]"
     exit 1 ;;
esac

if [ "$OS" = "windows" ]; then
  log "$Y" "Windows detected. Consider using PowerShell:"
  log "$Y" "  powershell -ExecutionPolicy Bypass -File scripts/install.ps1"
  echo ""
fi

# Gather targets
declare -a TARGETS=()
if [ "$MODE" = "auto" ]; then
  [ -d "$HOME/.config/opencode" ] && TARGETS+=("opencode")
  [ -d "$HOME/.claude" ] && TARGETS+=("claude-code")
  [ -d "$HOME/.cursor" ] && TARGETS+=("cursor")
  [ -d "$HOME/.windsurf" ] && TARGETS+=("windsurf")
  [ "${#TARGETS[@]}" -eq 0 ] && TARGETS=("opencode" "claude-code")
elif [ "$MODE" = "all" ]; then
  TARGETS=("opencode" "claude-code" "cursor" "windsurf")
else
  TARGETS=("$MODE")
fi

log "$K" "  Detected OS: $OS"
log "$K" "  Installing for: ${TARGETS[*]}\n"

total=0
for target in "${TARGETS[@]}"; do
  case "$target" in
    opencode)
      DEST="$HOME/.config/opencode/skills"
      PLUGIN_DEST="$HOME/.opencode/plugins"
      step "opencode"
      count=$(copy_skills "$SKILLS_SRC" "$DEST")
      mkdir -p "$PLUGIN_DEST"
      [ -f "$SCRIPT_DIR/plugins/opencode/skill-router.ts" ] && \
        cp "$SCRIPT_DIR/plugins/opencode/skill-router.ts" "$PLUGIN_DEST/"
      ok
      log "  ${K}${G}  ✓${N} ${K}$count${N} skills → ${K}$DEST${N}"
      log "  ${K}${G}  ✓${N} plugin → ${K}$PLUGIN_DEST${N}"
      total=$((total + count))
      ;;
    claude-code)
      DEST="$HOME/.claude/skills"
      step "Claude Code"
      count=$(copy_skills "$SKILLS_SRC" "$DEST")
      ok
      log "  ${K}${G}  ✓${N} ${K}$count${N} skills → ${K}$DEST${N}"
      total=$((total + count))
      ;;
    cursor)
      DEST="$HOME/.cursor/skills"
      step "Cursor"
      count=$(copy_skills "$SKILLS_SRC" "$DEST")
      ok
      log "  ${K}${G}  ✓${N} ${K}$count${N} skills → ${K}$DEST${N}"
      total=$((total + count))
      ;;
    windsurf)
      DEST="$HOME/.windsurf/skills"
      step "Windsurf"
      count=$(copy_skills "$SKILLS_SRC" "$DEST")
      ok
      log "  ${K}${G}  ✓${N} ${K}$count${N} skills → ${K}$DEST${N}"
      total=$((total + count))
      ;;
  esac
done

echo ""
log "$G" "  ──────────────────────────────────────"
log "$K" "  ${K}${G}✓${N} ${K}$total${N} skills deployed across ${#TARGETS[@]} tool(s)"
log "$G" "  ──────────────────────────────────────"
echo ""
log "$C" "  ${K}➜${N} Restart your CLI tool — skills load automatically"
log "$C" "  ${K}➜${N} Run ${K}npx universal-skills list${N} to browse"
echo ""
