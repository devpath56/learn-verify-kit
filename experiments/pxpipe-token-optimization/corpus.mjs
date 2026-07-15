// corpus.mjs — representative Claude Code request bodies across a density/size gradient.
//
// WHAT PXPIPE ACTUALLY IMAGES (v0.9.0, empirically confirmed via harness):
// the STATIC PREFIX — the system prompt + tool docs — once it clears a
// ~2000-char floor. That prefix is the largest, most cache-stable chunk of a
// real Claude Code request, so it is the correct independent variable. Closed
// history can also be imaged but only past a closed-prefix boundary that a
// single synthetic request rarely crosses; it is out of scope for the offline
// bench and covered by the live --verify-api path instead.
//
// The live final user turn is ALWAYS left as text (pxpipe never images the
// turn the model must answer), so every scenario carries one.

const MODEL = "claude-fable-5";

// ---- content generators at controlled density ------------------------------

// Low density (natural prose): ~4 chars per text-token.
function prose(reps) {
  return (
    "You are a careful engineering assistant. Prefer plain language and " +
    "concrete examples over jargon. Explain the trade-off before the answer. "
  ).repeat(reps);
}

// High density (JSON tool output): short tokens, many chars per text-token.
function jsonSlab(rows) {
  return Array.from({ length: rows }, (_, i) =>
    JSON.stringify({
      id: i, path: `src/pkg_${i}/handler.ts`, status: "ok",
      lines: 40 + i, note: "processed file and emitted 3 diagnostics",
    })
  ).join("\n");
}

// Realistic Claude-Code-style tool documentation.
function toolDocs(n) {
  const kinds = ["reading", "writing", "searching", "editing"];
  return Array.from({ length: n }, (_, i) => ({
    name: `tool_${i}`,
    description:
      `Performs operation ${i} on the target. Accepts a path and options and ` +
      `returns a structured result with status, bytes, and diagnostics. ` +
      `Use for ${kinds[i % 4]} within the project tree.`,
    input_schema: {
      type: "object",
      properties: { path: { type: "string" }, opts: { type: "object" } },
      required: ["path"],
    },
  }));
}

// Byte-exact payload: hashes / IDs / exact numbers — the content pxpipe warns
// is LOSSY when imaged. Drives the fidelity probe.
function secretsSlab(rows) {
  return Array.from({ length: rows }, (_, i) =>
    `record ${i}: sha=${(i * 2654435761 >>> 0).toString(16).padStart(8, "0")} ` +
    `id=USR-${String(100000 + i)} amount=$${(i * 37.13).toFixed(2)} ` +
    `token=${(i * 40503 >>> 0).toString(36)}`
  ).join("\n");
}

function body({ system = "", tools = [], messages = null, model = MODEL }) {
  return {
    model, max_tokens: 256, system, tools,
    messages: messages || [
      { role: "user", content: [{ type: "text", text: "Given the above, what should I do next?" }] },
    ],
  };
}

// ---- scenarios: independent variable = static-slab size × density ----------
// `expect` is a qualitative prior; the harness reports the measured outcome.

export const SCENARIOS = [
  {
    id: "tiny_slab",
    label: "System below the ~2k-char floor (control)",
    expect: "declined — stays text",
    make: () => body({ system: "You are a concise assistant. Answer plainly." }),
  },
  {
    id: "prose_slab_8k",
    label: "Large low-density prose system (~8k chars)",
    expect: "imaged, moderate–high savings",
    make: () => body({ system: prose(100) }),
  },
  {
    id: "json_slab_12k",
    label: "High-density JSON context (~12k chars)",
    expect: "imaged, high savings",
    make: () => body({ system: jsonSlab(180) }),
  },
  {
    id: "system_plus_tooldocs",
    label: "Dense system + 15 tool docs (realistic slab)",
    expect: "imaged, high savings",
    make: () => body({ system: prose(30), tools: toolDocs(15) }),
  },
  {
    id: "secrets_ids_slab",
    label: "Slab dense with hashes / IDs / exact $ amounts",
    expect: "imaged, HIGH fidelity-loss risk",
    fidelity: true,
    make: () => body({ system: secretsSlab(120) }),
  },
];

export { MODEL, prose, jsonSlab, toolDocs, secretsSlab, body };
