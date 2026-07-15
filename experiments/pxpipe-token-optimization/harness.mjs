#!/usr/bin/env node
// harness.mjs — measure pxpipe's token optimization on representative context.
//
// Primary metric is OFFLINE and deterministic: pxpipe's own gate evaluator
// reports, per imaged block, the text-token cost it avoided (`textTokens`) and
// the image-token cost it paid (`imageTokens`). Savings = 1 - image/text.
// Nothing is sent to any model and this session is never rerouted.
//
// The run also prints (a) a render-determinism check — proving the imaged prefix
// is byte-stable and therefore cacheable — and (b) a whole-request model showing
// how the block savings translate to the bill under cache-cold vs cache-warm
// conditions. Those two sections are the "so what" of the block numbers.
//
//   node harness.mjs                 # offline gate measurement (default)
//   node harness.mjs --verify-api    # cross-check vs real /v1/messages/count_tokens
//                                    #   (needs ANTHROPIC_API_KEY; optional)
//
// The --fidelity probe (accuracy loss) is documented in EXPERIMENT.md and left
// as an explicit, opt-in live step because it costs model calls; a scaffold is
// provided in fidelity.mjs.

import {
  transformAnthropicMessages, buildCountTokensBodies,
  renderTextToImages, CACHE_READ_RATE, CACHE_CREATE_RATE,
} from "pxpipe-proxy";
import { SCENARIOS, MODEL, prose } from "./corpus.mjs";
import { createHash } from "node:crypto";

const args = new Set(process.argv.slice(2));
const VERIFY_API = args.has("--verify-api");

const pct = (x) => (x * 100).toFixed(1) + "%";
const pad = (s, n) => String(s).padEnd(n);
const padL = (s, n) => String(s).padStart(n);

async function measureOffline(scenario) {
  const reqBody = scenario.make();
  const bytes = Buffer.from(JSON.stringify(reqBody));
  const t = await transformAnthropicMessages({ body: bytes, model: MODEL });
  const info = t.info || {};
  const g = info.gateEval || {};
  const textTokens = g.textTokens ?? 0;
  const imageTokens = g.imageTokens ?? 0;
  const savings = textTokens > 0 ? 1 - imageTokens / textTokens : 0;
  return {
    id: scenario.id,
    label: scenario.label,
    expect: scenario.expect,
    applied: !!t.applied,
    reason: t.reason || info.reason || "",
    imageCount: info.imageCount ?? 0,
    origChars: info.origChars ?? 0,
    textTokens,
    imageTokens,
    savings,
    profitable: g.profitable ?? false,
  };
}

// Optional live cross-check: ask the real API to count tokens for the baseline
// body vs the pxpipe-transformed body and compare input_tokens. Verifies the
// offline gate estimate against ground truth.
async function verifyApi(scenario) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return { skipped: "no ANTHROPIC_API_KEY" };
  const bytes = Buffer.from(JSON.stringify(scenario.make()));
  let bodies;
  try {
    bodies = await buildCountTokensBodies({ body: bytes, model: MODEL });
  } catch (e) {
    return { skipped: "buildCountTokensBodies: " + e.message.split("\n")[0] };
  }
  if (!bodies || !bodies.fullBody) return { skipped: "no count-tokens bodies (block below gate)" };

  const t = await transformAnthropicMessages({ body: bytes, model: MODEL });
  const transformed = typeof t.body === "string" ? t.body : Buffer.from(t.body).toString("utf8");

  const count = async (payload) => {
    const res = await fetch((process.env.ANTHROPIC_BASE_URL || "https://api.anthropic.com") + "/v1/messages/count_tokens", {
      method: "POST",
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: payload,
    });
    if (!res.ok) throw new Error(`count_tokens ${res.status}: ${(await res.text()).slice(0, 120)}`);
    return (await res.json()).input_tokens;
  };

  try {
    const baseline = await count(Buffer.from(scenario.make() && JSON.stringify(scenario.make())));
    const actual = await count(transformed);
    return { baseline, actual, savings: baseline > 0 ? 1 - actual / baseline : 0 };
  } catch (e) {
    return { skipped: e.message };
  }
}

async function main() {
  console.log(`\npxpipe token-optimization benchmark — model=${MODEL}`);
  console.log("=".repeat(96));
  console.log(
    pad("scenario", 26) + pad("applied", 9) + padL("text tok", 9) +
    padL("img tok", 9) + padL("savings", 10) + "  prior"
  );
  console.log("-".repeat(96));

  const rows = [];
  for (const s of SCENARIOS) {
    const r = await measureOffline(s);
    rows.push(r);
    const savingsCell = r.applied ? pct(r.savings) : "—";
    console.log(
      pad(r.id, 26) + pad(r.applied ? "yes" : "no", 9) +
      padL(r.applied ? r.textTokens : "—", 9) + padL(r.applied ? r.imageTokens : "—", 9) +
      padL(savingsCell, 10) + "  " + r.expect
    );
    if (!r.applied) console.log(pad("", 26) + "↳ declined: " + r.reason);
  }

  // Aggregate only over blocks the estimator actually imaged.
  const applied = rows.filter((r) => r.applied && r.textTokens > 0);
  const totText = applied.reduce((a, r) => a + r.textTokens, 0);
  const totImg = applied.reduce((a, r) => a + r.imageTokens, 0);
  console.log("-".repeat(96));
  if (totText > 0) {
    console.log(
      `AGGREGATE over ${applied.length} imaged block(s): ` +
      `${totText} text tok → ${totImg} image tok  |  weighted savings ${pct(1 - totImg / totText)}`
    );
  }
  console.log(
    `NOTE: ${rows.length - applied.length} block(s) left as text by the estimator ` +
    `(sparse / below floor) — that is the intended "don't image everything" behavior.`
  );

  // --- render determinism: is the imaged prefix itself cacheable? ---
  const hash = async () =>
    createHash("sha256").update(Buffer.from((await renderTextToImages(prose(100))).pages[0].png)).digest("hex");
  const [h1, h2] = [await hash(), await hash()];
  console.log(
    `\nRENDER DETERMINISM: same text → ${h1 === h2 ? "IDENTICAL" : "DIFFERENT"} PNG bytes ` +
    `(${h1.slice(0, 12)}). ${h1 === h2 ? "Imaged prefix is byte-stable, so it caches like text — no re-render churn." : "WARNING: churn would defeat prompt caching."}`
  );

  // --- block savings are regime-invariant; whole-request savings are not ---
  // Model a request as [ imaged static slab T ] + [ dynamic tail D, always text ].
  // cache-cold: everything full price. cache-warm: the stable prefix is a cache
  // read (CACHE_READ_RATE); the dynamic tail stays full price either way.
  if (totText > 0) {
    const T = Math.round(totText), I = Math.round(totImg);
    console.log("\nWHOLE-REQUEST MODEL (slab T=%d text tok → I=%d image tok, + dynamic tail D of full-price text):", T, I);
    console.log(
      "  dynamic tail D".padEnd(20) +
      "cold: whole-req savings".padStart(26) + "warm: whole-req savings".padStart(26)
    );
    for (const frac of [0.25, 1, 3]) {
      const D = Math.round(T * frac);
      const cold = 1 - (I + D) / (T + D);
      const warm = 1 - (I * CACHE_READ_RATE + D) / (T * CACHE_READ_RATE + D);
      console.log(
        `  D=${D} (${frac}× slab)`.padEnd(20) +
        pct(cold).padStart(26) + pct(warm).padStart(26)
      );
    }
    console.log(
      `  (rates: cache-read ${CACHE_READ_RATE}×, cache-create ${CACHE_CREATE_RATE}×.) ` +
      `Warm savings shrink because caching already discounts the slab pxpipe targets.`
    );
  }

  if (VERIFY_API) {
    console.log("\n--- live count_tokens cross-check ---");
    for (const s of SCENARIOS) {
      const v = await verifyApi(s);
      if (v.skipped) { console.log(pad(s.id, 26) + "skipped: " + v.skipped); continue; }
      console.log(
        pad(s.id, 26) + `baseline ${padL(v.baseline, 7)} → actual ${padL(v.actual, 7)}` +
        `  measured savings ${pct(v.savings)}`
      );
    }
  }
  console.log("");
}

main().catch((e) => { console.error(e); process.exit(1); });
