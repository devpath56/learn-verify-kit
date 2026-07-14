# Product Teardown Kit

A drop-in skill bundle that turns Claude into a **product-teardown analyst**, not a summarizer. It researches a software product or agentic system, reverse-engineers the *choices* its team made across four lenses, scores how deeply it's designed, compares it head-to-head against rivals, distills what you can steal for your own build, and keeps a running log of what you've torn down so you can quiz yourself on it later.

Built for people who fall in love with software engineering and agentic workflows by taking things apart — and want to remember what they found.

**The whole experience runs in chat** — claude.ai or Cowork. Nothing to install, no hooks, no config, nothing renders to a webpage. You name a product, it takes it apart and tests you.

It is fully self-contained. Nothing here references any private files or company context. Drop it in and use it.

---

## What you get

Four verbs, each holding a real bar (no brochure restates):

| Say this | Skill | The bar it holds | What it does |
|---|---|---|---|
| "tear down X" / "how is X built" | `teardown` | Depth ≥ L3 (rationale) | Moves a product from "I've used it" to "I understand the choices its team made and could rebuild it" |
| "score X" / "how well designed is X" | `scorecard` | L0–L5 per lens | A fast, honest read on where a product is strong and where it's just early |
| "compare X and Y" / "X vs Y under the hood" | `compare` | The fork, not two summaries | Finds where two teams solved the same job in opposite ways, and the bet behind each |
| "what can I steal from X" | `extract-patterns` | Transferable + bounded | Distills the teardown into 🧰 steal-this cards you can apply to your own build |

Two more skills wrap the experience:

- **`start`** — the in-chat starter screen. Say "start" / "what can you do" and it prints the whole menu + a one-run walkthrough, right in the chat.
- **`track`** — keeps a tabulated log of every product torn down this session (and your steal-this deck) and **resurfaces it as a quiz** at natural breaks or whenever you say "review" (spacing is half the retention). Chat has no timer, so you or a lull triggers review — not a clock.

Plus a **self-check gate** (`revise`): before any teardown reaches you, it's run against the depth rubric and the plain-language-first rule — catching brochure-restates and jargon-dumps before you see them.

### The four lenses

Every teardown draws from up to four lenses (it picks the ones that matter for the product — a plain CLI won't get a forced GTM lens):

- 🤖 **Agentic-workflow design** — how it drives the model: tool design, the plan→act→observe loop, context & memory, verification, human-in-the-loop.
- 🛠️ **Engineering craft & DX** — why it's a joy (or a pain): time-to-first-win, API/CLI ergonomics, error messages, escape hatches, the delight details.
- 📈 **Product & GTM** — who it wins first, the adoption loop, pricing, moat vs head-start, retention.
- 🏗️ **Technical architecture** — the components, the key tradeoff (latency vs cost vs quality), build vs buy, the scaling wall.

### The depth scale (why it's not a summarizer)

Every finding is rated L0–L5. The kit refuses to stay at the top two:

| L0 Brochure | L1 Mechanic | L2 Tradeoff | L3 Rationale | L4 Pattern | L5 Bet |
|---|---|---|---|---|---|
| restates marketing | names a mechanism | choice + rejected alternative | *why* — the constraint | transferable pattern | the bet + where it breaks |

A teardown is "certified" only when its lenses average **≥ L3**. Below that, it's a summary, not a teardown.

### Web research

When a product is unfamiliar or possibly stale, `teardown` searches the web first — docs, engineering blogs, changelogs, talks — reconciles the sources, and cites them inline as `[Source: Title — URL — date]`. Verified facts get a source; reasoned guesses are marked **(inferred)**. It needs web tools in the environment; without them it works from known ground and flags uncertainty loudly.

---

## Quickstart

**Full step-by-step per surface (Cowork, Claude Code, claude.ai) is in [INSTALL.md](INSTALL.md).** The short version:

1. Put the `.claude/skills/` folder where your Claude reads skills (a Cowork workspace root, a Claude Code project, or uploaded on claude.ai).
2. Say `start` to see the menu, or jump straight in: `tear down [any product]`, `/scorecard`, `/compare`, `/extract-patterns`, `review`.
3. Smoke test: `tear down Cursor` → you should get a lens preview, a plain take, then choices-with-rejected-alternatives, then a quiz on a *different* tool.

That's the whole setup. No install, no `uv`, no hooks, no config.

---

## The idea behind it (why it's built this way)

You remember a product by rebuilding its reasoning, not by reading its landing page. Two things make that stick, and the kit is built around both:

- **Every feature has a cost.** For each thing a product does, the kit asks what the team *gave up* to get it. The choice and its rejected alternative are where the real understanding — and the delight of good engineering — live.
- **You only own a pattern you can transfer.** So every teardown ends with retrieval on a *different* product, and `track` resurfaces it later. A pattern you can only recognize in one place isn't yours yet.

This borrows its content discipline from the [Learn·Verify Kit](https://github.com/devpath56/learn-verify-kit): plain-language-first, name+define+example+boundary, a single `house-style.md` law every skill obeys, retrieval to make it stick, and a regression suite that only grows from real errors.

---

## Where it runs

Built for **claude.ai chat and Cowork** — anywhere Claude reads skills. No hooks, so nothing depends on VS Code or the CLI. The trade-off is honest: verification and spacing are **self-driven**, not machine-enforced. The model checks its own output (`revise`) and offers review at breaks; it can't hard-block a shallow teardown or fire a timer, because chat runs no hooks. A hard gate or an automatic review timer would need Claude Code — deliberately out of scope here.

---

## For maintainers

Everything needed to evolve this kit lives in this repo — no external context.

- **`CLAUDE.md`** — how Claude should maintain the repo (the "one law, one home" principle, guardrails).
- **`MAINTAINING.md`** — structure, how to run the regression suite, and why each rule exists.
- **`tests/regression-cases.md`** — guardrail tests (Tier A inherited-real, Tier B seed).
- Licensed under MIT — see `LICENSE`.

## Files

```
.claude/
  skills/
    start/SKILL.md              # in-chat starter screen
    teardown/SKILL.md           # the four-lens teardown loop + web research
    teardown/references/house-style.md   # HOW output reads — the shared law
    teardown/references/lens-rubric.md   # WHAT it examines + the L0–L5 depth scale
    scorecard/SKILL.md          # fast L0–L5 read per lens
    compare/SKILL.md            # head-to-head: find the fork
    extract-patterns/SKILL.md   # 🧰 steal-this cards
    revise/SKILL.md             # depth + plain-language self-check
    track/SKILL.md              # session log + spaced review
tests/regression-cases.md
CLAUDE.md · README.md · INSTALL.md · MAINTAINING.md · LICENSE
```
