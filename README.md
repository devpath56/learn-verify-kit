# Learn-Verify Kit

## Test it end to end in five minutes

The one competency wired end to end today is **`agent-harness-l1-l2`** — inference and runtime,
18 questions. Everything below is a real run, not a demo.

### 1 · Check the machinery, before trusting anything it says

```
node tests/lint-bank.mjs          # 6 laws over the question bank
node tests/test-lint-bank.mjs     # proves each law can actually fail
node tests/test-progress-store.mjs
```

All three exit 0. If `lint-bank` fails, a question has lost its frozen ideal and `drill` would grade
against nothing.

### 2 · Look at the curve before you start

```
node progress-store.mjs
```

Expect **UNEVALUABLE** on both topics: `1 attempt(s) — a slope needs two points`. The two files in
`attempts/` are **declared baselines** transcribed from a handoff, not observations. That is the
honest starting state, and it is what step 5 changes.

### 3 · START a Claude Code session on this directory

**Start one here — do not switch an existing session into it.** Skills load at session start, so a
session that began elsewhere has none of this kit's. `Skill(drill)` returns `Unknown skill` and
nothing tells you why. That is `R-33`.

### 4 · Learn it first, then be quizzed

```
teach me agent-harness-l2-runtime
```

`learn` researches, chunks, teaches each chunk plain-language-first, then asks **two** recall
questions per chunk and scores each before moving on. That is where the competency triplet gets
built: decision situation, heuristic, concept depth.

**`drill` comes after, not before.** It is the checker half — it draws questions verbatim from the
registered bank and cannot invent one, which is exactly why it is useless on material nobody has
delivered. Asking it first verifies a learner on content they were never taught (`R-34`), and
`lint-bank`'s `taught-before-drilled` law now refuses a bank with attempts recorded and no
`taught_at` (`R-35`).

Once taught:

```
quiz me on agent-harness-l1-l2
```

### 5 · Answer one badly on purpose

Give the term without the causality — say *"the cap is too high"* and stop. Grading is against an
ideal frozen when the question was registered, so it should come back partial with a **miss code**,
most likely `mechanism`. That is the miss this packet exists to attack.

### 6 · Record the attempt, then read the curve again

```
node progress-store.mjs --record --topic agent-harness-l2-runtime \
  --question agent-harness-l1-l2.p1q1 --hit 3 --of 8 --miss mechanism,price --by isha

node progress-store.mjs
```

The topic now reads **measured**, with `(1 declared)` beside it — one point observed, one asserted.

### What should refuse you

| Try this | It must say |
|---|---|
| drop `--by` | `assigned_by is required — a grade with no grader cannot be audited` |
| `--by claude` | the point is recorded but does **not** count: `none observed` |
| `--hit 9 --of 8` | `hit exceeds of` |
| raise the score with the same miss codes | `suspect — hit rate rose while mechanism share did not fall` |

The third row is the one that matters. **A number that only ever goes up is a number nobody is
testing**, and `--by claude` is refused because the first version of this metric was graded by the
same process that wrote it.

### What is honestly not done

- No human has answered a bank question yet, so every slope you see is seeded from step 6.
- Only `agent-harness-l1-l2` is wired. The other 13 competencies have banks but no packet rules.

---

A drop-in skill bundle that turns Claude into a **quizzing tutor**, not a summarizer. It researches a concept, teaches it until you can recall it cold, scores your brainstorms, stress-tests your understanding, self-checks its own answers for plain language, and keeps a running log of what you learn so you can quiz yourself on it later.

**The whole experience runs in chat** — claude.ai or Cowork. Nothing to install, no hooks, no config. You talk, it teaches and tests. The one thing rendered as a visual is the **concept sketch**, published as a self-contained inline visual (Artifact / SVG) on surfaces that can show one; its retrieval questions are always delivered as text.

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
- **`tests/regression-cases.md`** — 32 guardrail tests, one per real error.
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
