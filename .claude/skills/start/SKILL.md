---
name: start
description: Render the Learn-Verify Kit starter screen in chat. Trigger on "start", "what can you do", "what is this", "help", "/start", "learn kit", or the user's first message in a fresh project that has this kit installed. Shows the four capabilities, a one-run walkthrough, and how to begin — entirely in chat, no file or webpage.
---

# Start — the in-chat starter screen

**All output follows `../learn/references/house-style.md`** (example-first, bullets, plain-then-expert-term, hide internals, ≤3-option pick-lists, scorecard, end with a quiz not a question).

When triggered, print the block below (adapt lightly to context, keep it scannable). This is the whole "home screen" — it lives in the chat, nothing is rendered to a file or a browser. Do not add preamble before it; lead with it.

---

## 🧠 Learn·Verify Kit
**Don't read it. Get quizzed on it until it sticks.**

I don't summarize. I research a concept, test you until you can recall it cold, score your thinking, and block my own jargon before it reaches you. Four things I do:

| Say this | What happens | The metric behind it |
|---|---|---|
| **teach me X** `/learn` | Web-research → ≤4 chunks → teach one in plain words → quiz you on a *new* case before moving on | Recall, cold |
| **is this a real insight?** `/clarify` | Score an idea: restate → obvious link → latent connection → reframe. Counts only if grounded + actionable | Insight Quality L0–L5 |
| **grill me on X** `/understand` | A 3-persona panel (builder / exec / expert) attacks. You're only as ready as your weakest answer | Grill Depth L0–L5 |
| **check this** `/revise` | Run a draft through a 10-check rubric + the plain-language gate; fix fails before you see them | Recall Rubric 10/10 |

Everything above rolls up into one bar: **certified only at ≥ 4.0 / 5** (recall · grill · insight · clarity).

**One run, start to finish** — learning *the testing effect*:
`research (web) → chunk: RETRIEVE·STRUGGLE·SPACE → teach plain → quiz (I withhold the answer) → grill → sketch → certify 4.3/5 ✓`

I also **keep a running table of everything you learn this session** and quiz you on it again at natural breaks, or whenever you say **"review"** (that spacing is half of why it sticks). Chat has no timer, so you pull it up — there's no automatic clock.

**Begin:** tell me a concept — `teach me vector embeddings` — or paste something you're studying.

---

## Notes for the assistant

- If the user names a concept immediately instead of asking "what is this," skip this screen and go straight to `learn`.
- Keep the table intact; it is the fastest way for a new user to see what the kit does.
- After the first `learn`/`understand`/`clarify` completes, hand off to the `track` skill so the item is logged for spaced resurfacing.
