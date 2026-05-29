#!/usr/bin/env bash
set -euo pipefail

# Sync skills from this repo to all known locations
# Run this after pulling updates to refresh your local install

REPO_DIR="$(dirname "$(dirname "$(realpath "$0")")")"

sync_target() {
  local src="$REPO_DIR/skills"
  local dst="$1"
  echo "→ Syncing to $dst"
  mkdir -p "$dst"
  cp -r "$src/"* "$dst/"
  echo "  ✓ Done"
}

sync_target "$HOME/.config/opencode/skills"
sync_target "$HOME/.claude/skills"
sync_target "$HOME/.agents/skills"

echo ""
echo "All skill locations synced. Restart your CLI to reload."
