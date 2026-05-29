#!/usr/bin/env bash
set -euo pipefail

REPO_RAW="https://raw.githubusercontent.com/universal-skills/universal-skills/main"
REPO_URL="https://github.com/universal-skills/universal-skills.git"
SKILLS_DIR="$(dirname "$(dirname "$(realpath "$0")")")"
MODE="${1:-auto}"

red()   { echo -e "\033[31m$1\033[0m"; }
green() { echo -e "\033[32m$1\033[0m"; }
blue()  { echo -e "\033[34m$1\033[0m"; }
bold()  { echo -e "\033[1m$1\033[0m"; }

echo ""
bold "╔══════════════════════════════════════════════╗"
bold "║   Universal Skills — Cross-CLI Skill System  ║"
bold "╚══════════════════════════════════════════════╝"
echo ""

detect_clis() {
  local clis=()
  if command -v opencode &>/dev/null; then clis+=("opencode"); fi
  if command -v claude &>/dev/null; then clis+=("claude-code"); fi
  if [ -d "$HOME/.opencode" ]; then clis+=("opencode"); fi
  if [ -d "$HOME/.claude" ]; then clis+=("claude-code"); fi
  echo "${clis[@]}"
}

install_for_opencode() {
  local target="$HOME/.config/opencode/skills"
  mkdir -p "$target"
  echo "  → Installing to opencode: $target"
  cp -r "$SKILLS_DIR/skills/"* "$target/"
  cp -r "$SKILLS_DIR/plugins/opencode/"* "$HOME/.opencode/plugins/" 2>/dev/null || true
  green "  ✓ opencode skills installed"
}

install_for_claude_code() {
  local target="$HOME/.claude/skills"
  mkdir -p "$target"
  echo "  → Installing to Claude Code: $target"
  cp -r "$SKILLS_DIR/skills/"* "$target/"
  green "  ✓ Claude Code skills installed"
}

install_for_agents() {
  local target="$HOME/.agents/skills"
  mkdir -p "$target"
  echo "  → Installing to .agents: $target"
  cp -r "$SKILLS_DIR/skills/"* "$target/"
  green "  ✓ .agents skills installed"
}

case "$MODE" in
  auto)
    blue "Detecting installed CLI tools..."
    CLIS=($(detect_clis))
    if [ ${#CLIS[@]} -eq 0 ]; then
      yellow "No supported CLI detected. Installing to all known locations."
      install_for_opencode
      install_for_claude_code
      install_for_agents
    else
      for cli in "${CLIS[@]}"; do
        case "$cli" in
          opencode) install_for_opencode ;;
          claude-code) install_for_claude_code ;;
        esac
      done
    fi
    ;;
  opencode)
    install_for_opencode
    ;;
  claude)
    install_for_claude_code
    ;;
  all)
    install_for_opencode
    install_for_claude_code
    install_for_agents
    ;;
  *)
    echo "Usage: $0 [auto|opencode|claude|all]"
    exit 1
    ;;
esac

echo ""
bold "Installation complete!"
echo "Restart your CLI tool for skills to take effect."
echo ""
echo "Next steps:"
echo "  - Run 'opencode run' or 'claude' and ask a domain-specific question"
echo "  - Skills will auto-load based on your task"
echo "  - Or run: /list-skills (opencode) to see all installed skills"
echo ""
