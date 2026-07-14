#!/usr/bin/env bash
# Install Trident as a PERSONAL Claude Code skill so it is invokable in
# EVERY Claude Code session (VS Code, CLI, web) on this machine.
#
#   bash install.sh              # installs to ~/.claude/skills/trident
#   bash install.sh /custom/dir  # installs to a custom skills dir
#
# Re-run any time to update. The install is a plain folder you fully own and
# can edit in place — no plugin, no permissions indirection.
set -euo pipefail
SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST="${1:-$HOME/.claude/skills/trident}"
mkdir -p "$(dirname "$DEST")"
rm -rf "$DEST"
cp -R "$SRC" "$DEST"
echo "✓ Trident installed -> $DEST"
echo "  Open any Claude Code session and type:  trident"
