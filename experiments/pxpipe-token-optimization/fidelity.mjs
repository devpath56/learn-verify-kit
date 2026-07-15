#!/usr/bin/env node
// fidelity.mjs — the LIVE, opt-in half: does the model read imaged context as
// accurately as text? Savings are worthless if the model misreads the block.
//
// It renders a byte-exact slab (hashes / IDs / exact $ amounts) two ways —
// plain text vs a pxpipe PNG — asks the SAME extraction questions against each,
// and scores exact-match accuracy. Run it per model to reproduce pxpipe's own
// warning that Fable 5 handles imaged context well while Opus 4.8 misreads ~7%.
//
//   ANTHROPIC_API_KEY=... node fidelity.mjs                     # model=claude-fable-5
//   ANTHROPIC_API_KEY=... node fidelity.mjs claude-opus-4-8     # compare a model
//
// COST: this makes real model calls (2 per probe). It is deliberately NOT part
// of `npm run bench`. Without a key it prints the plan and exits.

import { renderTextToImages } from "pxpipe-proxy";
import { secretsSlab } from "./corpus.mjs";

const MODEL = process.argv[2] || "claude-fable-5";
const KEY = process.env.ANTHROPIC_API_KEY;
const BASE = process.env.ANTHROPIC_BASE_URL || "https://api.anthropic.com";

// Build a slab and a fixed probe set with KNOWN answers (byte-exact targets).
const ROWS = 60;
const slab = secretsSlab(ROWS);
const lines = slab.split("\n");
const field = (line, key) => (line.match(new RegExp(`${key}=(\\S+)`)) || [])[1];
const PROBES = [3, 17, 29, 41, 58].map((i) => ({
  q: `In the records above, what is the exact sha value on the line beginning "record ${i}:"? Reply with only the value.`,
  answer: field(lines[i], "sha"),
}));

async function ask(contentBlocks) {
  const res = await fetch(BASE + "/v1/messages", {
    method: "POST",
    headers: { "x-api-key": KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({ model: MODEL, max_tokens: 40, messages: [{ role: "user", content: contentBlocks }] }),
  });
  if (!res.ok) throw new Error(`messages ${res.status}: ${(await res.text()).slice(0, 160)}`);
  const j = await res.json();
  return (j.content?.[0]?.text || "").trim();
}

function scoreOf(got, want) {
  return got.toLowerCase().includes(String(want).toLowerCase()) ? 1 : 0;
}

async function main() {
  console.log(`\nfidelity probe — model=${MODEL}, ${PROBES.length} byte-exact questions`);
  if (!KEY) {
    console.log("No ANTHROPIC_API_KEY — dry run. Plan:");
    console.log(` • render a ${slab.length}-char secrets slab to a PNG via pxpipe`);
    console.log(` • ask ${PROBES.length} exact-sha questions against TEXT and against IMAGE`);
    console.log(" • score exact-match accuracy for each condition and print the gap");
    PROBES.forEach((p, i) => console.log(`   probe ${i}: expect sha=${p.answer}`));
    return;
  }

  const { pages } = await renderTextToImages(slab);
  const png = Buffer.from(pages[0].png).toString("base64");
  const imageBlock = { type: "image", source: { type: "base64", media_type: "image/png", data: png } };

  let textHits = 0, imgHits = 0;
  for (const p of PROBES) {
    const t = await ask([{ type: "text", text: slab }, { type: "text", text: p.q }]);
    const im = await ask([imageBlock, { type: "text", text: p.q }]);
    const ts = scoreOf(t, p.answer), is = scoreOf(im, p.answer);
    textHits += ts; imgHits += is;
    console.log(`  want ${p.answer}  | text ${ts ? "✓" : "✗"} (${t.slice(0, 12)})  | image ${is ? "✓" : "✗"} (${im.slice(0, 12)})`);
  }
  const n = PROBES.length;
  console.log("-".repeat(60));
  console.log(`TEXT accuracy:  ${textHits}/${n} (${((textHits / n) * 100).toFixed(0)}%)`);
  console.log(`IMAGE accuracy: ${imgHits}/${n} (${((imgHits / n) * 100).toFixed(0)}%)`);
  console.log(`Fidelity gap on byte-exact content: ${(((textHits - imgHits) / n) * 100).toFixed(0)} pts`);
  console.log("→ If the image gap is nonzero, byte-exact blocks must stay text regardless of savings.\n");
}

main().catch((e) => { console.error(e); process.exit(1); });
