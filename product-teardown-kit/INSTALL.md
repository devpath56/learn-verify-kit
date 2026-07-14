# Install — Product Teardown Kit

One rule: this kit is just **skills** — a folder of `SKILL.md` files. No hooks, no `uv`, no config, no API keys. You put the `.claude/skills/` folder where your Claude reads skills, and say `start`.

Pick your surface below.

---

## Cowork (recommended)
1. Unzip this package.
2. Drop the `.claude/skills/` folder into your **workspace's mounted root** (next to your other files).
3. Start a session and say **`start`**.

All 7 skills live under one `.claude/skills/` tree, so the shared `teardown/references/house-style.md` and `lens-rubric.md` resolve. Nothing else to do.

---

## Claude Code (VS Code panel or CLI)
1. Put the `.claude/skills/` folder in any **project root** (or in `~/.claude/skills/` to have it in every project).
2. Open that folder in the Claude Code panel / CLI.
3. Say **`start`**.

---

## claude.ai chat (web / desktop)
1. **Settings → Capabilities → Skills → Upload** (available on Pro / Max / Team; admins can add them org-wide).
2. Upload the skill folders from `.claude/skills/`.
3. Open a new chat and say **`start`**.

**Caveat — read this.** claude.ai keeps uploaded skills isolated from each other. Each skill points to shared files at `../teardown/references/…`; if that path doesn't resolve, the formatting/depth rules may silently not load, and output can drift shallow. **Cowork and Claude Code keep every skill in one folder, so the shared law always resolves — those are the clean installs.** Prefer them if you can.

---

## Smoke test (any surface)
Type: **`tear down Cursor`**

You should get:
1. a 3–4 bullet preview of the lenses it'll cover,
2. lens 1 opening with a plain take (not a definition, not marketing),
3. findings that name a **choice and the alternative the team rejected** (not a feature list),
4. a quiz question about a *different* tool before it moves on.

If you get that, it's wired correctly. If it lists features or dumps all lenses at once, the skills didn't load — recheck the folder location.

---

## What's in the box
```
.claude/skills/
  start/          starter screen (say "start")
  teardown/       the four-lens teardown loop  (+ references/house-style.md + references/lens-rubric.md = the shared law)
  scorecard/      fast L0–L5 read per lens
  compare/        head-to-head: find the fork
  extract-patterns/  🧰 steal-this cards
  revise/         depth + plain-language self-check
  track/          session log + spaced review
tests/            regression-cases.md (guardrail tests)
README.md         what it is + the idea
INSTALL.md        this file
```
