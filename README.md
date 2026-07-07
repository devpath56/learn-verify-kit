# Learn-Verify Kit

A drop-in skill bundle that turns Claude into a **quizzing tutor**, not a summarizer. It researches a concept, teaches it until you can recall it cold, scores your brainstorms, stress-tests your understanding, self-checks its own answers for plain language, and keeps a running log of what you learn so you can quiz yourself on it later.

**The whole experience runs in chat** — claude.ai or Cowork. Nothing to install, no hooks, no config, nothing renders to a webpage. You talk, it teaches and tests.

It is fully self-contained. Nothing here references any private files, stories, or company context. Drop it in and use it.

---

## What you get

Four verbs, each backed by a real, evidence-based metric:

| Say this | Skill | The metric behind it | What it does |
|---|---|---|---|
| "teach me X" / "help me learn X" | `learn` | Retrieval + spacing loop (web-researched) | Moves a concept from "read it" to "can recall and explain it cold" |
| "clarify this idea" / "is this a real insight?" | `clarify` | Insight Quality, L0–L5 | Scores whether an idea is a restate or a genuine, grounded, actionable insight |
| "grill me on X" / "stress-test my understanding" | `understand` | Grill Depth, L0–L5 | Adversarial panel questions you until your understanding survives, or finds where it breaks |
| "revise this" / "check this explanation" | `revise` | Recall Rubric (10 checks), self-check | Forces plain-language-first, retrieval-cued output; catches jargon-dumps and slop |

Two more skills wrap the experience:

- **`start`** — the in-chat starter screen. Say "start" / "what can you do" and it prints the whole menu + a one-run walkthrough, right in the chat.
- **`track`** — keeps a tabulated log of everything learned this session and **resurfaces it as a quiz** at natural breaks or whenever you say "review" (spacing is half the method). Chat has no timer, so you or a lull triggers review — not a clock.

Plus a **certification gate**: a concept is "ready" only when it scores **≥ 4.0 / 5.0 weighted** across the four dimensions (recall, grill depth, insight, clarity). See `.claude/skills/revise/references/certification-gate.md`.

**Verification is self-check, not a hard block.** In chat, nothing external inspects the output, so the skills police themselves: each teaching answer runs the `revise` pass on itself before sending — plain language first, then the rubric. The discipline is the model's own; there's no safety net catching a bad answer after the fact.

### Web research

When a concept is unfamiliar or possibly stale, `learn` searches the web first, reconciles the sources, and cites them inline as `[Source: Title — URL — date]` before teaching. It feeds the teaching; it never dumps raw search results. Needs web tools in the environment; without them it teaches from known ground and flags uncertainty.

---

## Quickstart

**Full step-by-step per surface (Cowork, Claude Code, claude.ai) is in [INSTALL.md](INSTALL.md).** The short version:

1. Put the `.claude/skills/` folder where your Claude reads skills (a Cowork workspace root, a Claude Code project, or uploaded on claude.ai).
2. Say `start` to see the menu, or jump straight in: `teach me [anything]`, `/learn`, `/clarify`, `/understand`, `/revise`, `review`.
3. Smoke test: `teach me idempotency` → you should get a 3-bullet roadmap, a plain example, then a quiz.

That's the whole setup. No install, no `uv`, no hooks, no config. If web tools are available, `learn` uses them to research; if not, it teaches from known ground and flags uncertainty.

---

## The science (why it is built this way)

The most-cited review of study techniques rates only **two** methods "high utility": **retrieval practice** (recalling from memory) and **distributed / spaced practice**. Rereading, highlighting, summarizing, and concept-mapping are low utility. Retrieval even beats concept-mapping when the final test is drawing a concept map. So this kit is a testing engine, not an explaining engine.

- Dunlosky et al., "Improving Students' Learning With Effective Learning Techniques," 2013 — https://journals.sagepub.com/doi/abs/10.1177/1529100612453266
- Roediger & Karpicke, test-enhanced learning (80% vs 34% retention at one week), 2006
- Karpicke & Blunt, "Retrieval Practice Produces More Learning than Elaborative Studying with Concept Mapping," Science, 2011
- Mayer, Principles of Multimedia Learning (used by the concept-sketch rubric)
- Miller / Cognitive Load Theory (the ≤4-chunk limit)

---

## Where it runs

Built for **claude.ai chat and Cowork** — anywhere Claude reads skills. No hooks, so nothing depends on VS Code or the CLI. The trade-off is honest: verification and spacing are **self-driven**, not machine-enforced. The model checks its own output and offers review at breaks; it can't hard-block a bad answer or fire a timer, because chat runs no hooks. If you later want a hard gate or an automatic review timer, that needs Claude Code (VS Code / CLI) — deliberately out of scope here.

---

## For maintainers

Everything needed to evolve this kit lives in this repo — no external context.

- **`CLAUDE.md`** — how Claude should maintain the repo (architecture, the "one rule, one home" principle, guardrails).
- **`MAINTAINING.md`** — structure, how to run the regression suite, and *why each rule exists* (provenance).
- **`tests/regression-cases.md`** — 18 guardrail tests, one per real error.
- Licensed under MIT — see `LICENSE`.

## Files

```
.claude/
  skills/
    start/SKILL.md          # in-chat starter screen
    learn/SKILL.md          # teach + web research
    clarify/SKILL.md        # Insight Quality L0–L5
    understand/SKILL.md     # Grill Depth L0–L5
    revise/SKILL.md         # Recall Rubric + self-check
    revise/references/certification-gate.md
    track/SKILL.md          # session log + review-on-cue
    concept-sketch/SKILL.md
    concept-sketch/references/recall-rubric.md
README.md
```
