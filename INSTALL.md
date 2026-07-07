# Install — Learn·Verify Kit

One rule: this kit is just **skills** — a folder of `SKILL.md` files. No hooks, no `uv`, no config, no API keys. You put the `.claude/skills/` folder where your Claude reads skills, and say `start`.

Pick your surface below.

---

## Cowork (recommended)
1. Unzip this package.
2. Drop the `.claude/skills/` folder into your **workspace's mounted root** (next to your other files).
3. Start a session and say **`start`**.

All 7 skills live under one `.claude/skills/` tree, so the shared `learn/references/house-style.md` resolves. Nothing else to do.

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

**Caveat — read this.** claude.ai keeps uploaded skills isolated from each other. Each skill points to a shared file at `../learn/references/house-style.md`; if that path doesn't resolve, the formatting/teaching rules may silently not load. So on claude.ai the output can drift. **Cowork and Claude Code keep every skill in one folder, so the shared style always resolves — those are the clean installs.** Prefer them if you can.

---

## Smoke test (any surface)
Type: **`teach me idempotency`**

You should get:
1. a 3-bullet roadmap of the chunks,
2. chunk 1 opening with a plain everyday example (not a definition),
3. a quiz question before it moves on.

If you get that, it's wired correctly. If it dumps a definition or all chunks at once, the skills didn't load — recheck the folder location.

---

## What's in the box
```
.claude/skills/
  start/         starter screen (say "start")
  learn/         teach a concept  (+ references/house-style.md = the shared rules)
  clarify/       score an idea (Insight Quality)
  understand/    grill your understanding (Grill Depth)
  revise/        self-check an explanation (Recall Rubric)
  concept-sketch/ dual-coded sketch + decision card
  track/         session log + spaced review
tests/           regression-cases.md (18 guardrail tests)
README.md        what it is + the science
INSTALL.md       this file
```
