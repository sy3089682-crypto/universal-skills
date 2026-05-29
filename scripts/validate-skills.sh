#!/usr/bin/env bash
set -euo pipefail

ROOT="$(dirname "$(dirname "$(realpath "$0")")")"
ERRORS=0
SKILL_COUNT=0

red() { echo -e "\033[31m$1\033[0m"; }
green() { echo -e "\033[32m$1\033[0m"; }
yellow() { echo -e "\033[33m$1\033[0m"; }

echo "=== Universal Skills Validation ==="
echo ""

while IFS= read -r f; do
  ((SKILL_COUNT++))
  name="$(basename "$(dirname "$f")")"
  
  if ! grep -q '^name: ' "$f"; then
    red "  ✗ $name: missing 'name:' frontmatter"; ((ERRORS++))
  fi
  if ! grep -q '^description: ' "$f"; then
    red "  ✗ $name: missing 'description:' frontmatter"; ((ERRORS++))
  fi
  if ! grep -q '^license: ' "$f"; then
    yellow "  ~ $name: missing 'license:' (recommended)"
  fi
done < <(find "$ROOT/skills" -name "SKILL.md")

echo "Skills: $SKILL_COUNT | Errors: $ERRORS"
if [ "$ERRORS" -gt 0 ]; then
  red "Some checks failed."
  exit 1
fi
green "All checks passed!"
