// render-source-pack.mjs - the NotebookLM hand-off, rendered FROM the authority map.
//
// WHAT THIS REPLACED, AND WHY THAT MATTERS MORE THAN WHAT IT DOES.
// The first attempt at this deliverable was `render-podcast.mjs`, which WROTE the debate: two named
// voices, scripted turns, ~30 minutes of dialogue. It was deleted. The ask was "just hand a few
// authority sources, notebook LM will generate debate podcast" - so the deliverable is NotebookLM's
// INPUT, not its output. Writing the debate does not save NotebookLM a step; it replaces the one
// thing NotebookLM is for, using a narrator who never read the sources.
//
// The second failure was in the sources themselves (CF-026): four authorities cited from recall, and
// 0 of 18 bank questions carrying a source field at all. So this module renders from a map that has
// passed advisor-builder's `authority_map.py --check`, where every row carries a `verified` block
// naming when it was read and quoting what was on the page. If a source was not opened, it has no
// verified block, and the pack says so in the reader's face rather than in a footnote.
//
// WHY RENDERED AND NOT WRITTEN. A hand-written pack and a map that no longer agrees with it are
// indistinguishable on disk. `--check` byte-compares, so drift is an exit code.

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
export const MAP = join(HERE, 'packets/agent-harness-l1-l2/notebooklm/authority-map.json');
export const OUT = join(HERE, 'packets/agent-harness-l1-l2/notebooklm/NOTEBOOKLM-PACK.md');

// WHERE A TOPIC PACK LANDS. One file per brief, because a reader setting up NotebookLM for ONE
// topic should not have to work out which half of a combined pack is theirs.
export const outFor = (topic) => topic
  ? join(HERE, `packets/agent-harness-l1-l2/notebooklm/NOTEBOOKLM-PACK-${topic}.md`)
  : OUT;

// THE BRIEF IS DATA NOW, and it was not before. It lived as ~46 `P('...')` calls in this file, which
// made the module's own instruction - "edit the map and re-render" - half a lie: the SOURCES were
// data and the AIM was code, so a second topic could not get a second brief without a code change.
// That is the shape a reader cannot see from the pack, and it is why the L2-runtime topic went
// months with a brief that pressed termination and never once pressed how the cap is sized.
export const briefFor = (m, topic) => {
  const b = (m.briefs ?? {})[topic ?? 'default'];
  if (!b) throw new Error(`no brief '${topic}' in the map - have: ${Object.keys(m.briefs ?? {}).join(', ')}`);
  return b;
};

// Sources a brief is scoped to, in the map's own order. `competencies: null` means the whole map.
export const scopedSources = (m, brief) => {
  if (!brief.competencies) return sourceRows(m);
  const want = new Set((m.competencies ?? [])
    .filter((c) => brief.competencies.includes(c.id))
    .flatMap((c) => (c.sources ?? []).map((s) => s.source)));
  return sourceRows(m).filter(([k]) => want.has(k));
};

export const loadMap = (p = MAP) => JSON.parse(readFileSync(p, 'utf8'));

// A `$`-prefixed key is commentary, not a source. The convention is advisor-builder's, and
// authority_map.source_defs applies the same skip; reading `$note` as a definition is what made that
// module die once already.
export const sourceRows = (m) =>
  Object.entries(m.sources ?? {}).filter(([k]) => !k.startsWith('$'));

/** Sources with no `verified` block. NOT an error here - a finding, printed where a reader sees it. */
export const unverified = (m) => sourceRows(m).filter(([, s]) => !s.verified).map(([k]) => k);

/** Only what a reader can actually fetch. A source with no URL is theirs to bring. */
export const fetchable = (m, rows = sourceRows(m)) => rows.filter(([, s]) => s.url);
export const bringYourOwn = (m, rows = sourceRows(m)) => rows.filter(([, s]) => !s.url);

const bullets = (xs) => xs.map((x) => `- ${x}`).join('\n');

export function render(m = loadMap(), topic = null) {
  const L = [];
  const P = (s = '') => L.push(s);
  const brief = briefFor(m, topic);
  const rows = scopedSources(m, brief);

  P(`# NotebookLM source pack — ${brief.title}`);
  P();
  P('**You are holding the INPUT to a podcast, not a podcast.** Nothing here is a script. These are');
  P('the sources; NotebookLM generates the debate from them. The brief at the bottom is what to paste');
  P('in to aim it.');
  P();
  P(`Rendered from \`authority-map.json\`, which passes advisor-builder's \`authority_map.py --check\`.`);
  P('Do not hand-edit this file — edit the map and re-render, or `--check` will fail.');
  P();

  const unver = rows.filter(([, s]) => !s.verified).map(([k]) => k);
  P('## Provenance, stated up front');
  P();
  P(`- Sources: **${rows.length}**, of which **${rows.length - unver.length}** were opened and read on a named date.`);
  if (unver.length) P(`- **UNVERIFIED — cited but not opened: ${unver.join(', ')}.** Treat as a lead, not a source.`);
  else P('- **Every source below was opened and read.** None is cited from memory.');
  P(`- Ratified by the operator: **${m.ratified_by_operator ? 'yes' : 'NOT YET'}**.`);
  P();
  P('> Why this section exists: the first version of this packet cited four authorities from recall and');
  P('> attached a source field to none of its 18 questions. A citation you did not open is a guess wearing');
  P('> a proper noun, and the cost lands on whoever repeats it in a review.');
  P();

  P('## What to load into NotebookLM');
  P();
  P('Add these as sources. NotebookLM fetches URLs directly.');
  P();
  for (const [id, s] of fetchable(m, rows)) {
    P(`### ${s.title}`);
    P();
    P(`- **Who** — ${s.author ?? 'unattributed'}${s.published ? ` · published ${s.published}` : ''}`);
    P(`- **Load** — ${s.url}`);
    for (const u of s.also ?? []) P(`  - also: ${u}`);
    P(`- **Why this one** — ${s.ranking_criterion}`);
    P(`- **Who it is for** — ${s.audience}`);
    if (s.verified?.numbers) P(`- **Numbers on the page** — ${s.verified.numbers}`);
    if (s.caveat) P(`- **⚠ Read with this in mind** — ${s.caveat}`);
    if (s.verified?.quotes?.length) {
      P(`- **Verified on the page (${s.verified.at})**:`);
      for (const q of s.verified.quotes) P(`  - "${q}"`);
    }
    P();
  }

  const byo = bringYourOwn(m, rows);
  if (byo.length) {
    P('## Bring your own copy');
    P();
    P('Not linkable — either copyrighted or local. Load your own copy if you have one; the packet');
    P('travels with the citation, never the text.');
    P();
    for (const [id, s] of byo) {
      P(`### ${s.title}`);
      P();
      P(`- **Who** — ${s.author ?? 'unattributed'}`);
      P(`- **Why this one** — ${s.ranking_criterion}`);
      P(`- **Who it is for** — ${s.audience}`);
      if (s.verified?.numbers) P(`- **Where to look** — ${s.verified.numbers}`);
      if (s.caveat) P(`- **⚠** — ${s.caveat}`);
      P();
    }
  }

  P('## The brief — paste this into NotebookLM');
  P();
  P('```');
  for (const line of brief.lines) P(line);
  P('```');
  P();

  P('## Then, to check it worked');
  P();
  P(bullets([
    'Play it and see whether the two speakers actually disagree, or whether they agreed by minute six. If they agreed, the brief was too soft — sharpen fault line 1 and regenerate.',
    'Listen for whether "who terminates the loop" gets FOUR answers or one. Four means the sources came through. One means it flattened them.',
    `Then run \`learn ${topic ?? 'agent-harness-l1-l2'}\` in this repo, and see whether the podcast made the recall questions easier. That is the only test of it that matters.`,
  ]));
  P();

  return L.join('\n') + '\n';
}

function main(argv) {
  const check = argv.includes('--check');
  const i = argv.indexOf('--topic');
  const only = i >= 0 ? argv[i + 1] : null;
  const m = loadMap();
  /* EVERY BRIEF, NOT JUST THE ONE NAMED. `--check` with no `--topic` used to check the single pack,
     which is exactly how a second pack drifts unnoticed: nothing looked at it. */
  const topics = only ? [only] : [null, ...Object.keys(m.briefs ?? {}).filter((k) => k !== 'default')];

  let bad = 0;
  for (const t of topics) {
    const text = render(m, t);
    const out = outFor(t);
    const rows = scopedSources(m, briefFor(m, t));
    if (!check) {
      writeFileSync(out, text);
      console.log(`  wrote ${out}`);
      console.log(`  ${rows.length} sources · ${rows.filter(([, s]) => !s.verified).length} unverified`);
      continue;
    }
    let onDisk;
    try { onDisk = readFileSync(out, 'utf8'); }
    catch { console.error(`  REFUSED: ${out} absent. Run without --check to render it.`); bad++; continue; }
    if (onDisk === text) { console.log(`  pack matches the map: ${out}`); continue; }
    console.error(`  REFUSED: the pack on disk is not what the map renders: ${out}`);
    console.error('  Someone hand-edited the pack, or the map moved under it. Re-render.');
    bad++;
  }
  return bad ? 1 : 0;
}

if (import.meta.url === `file://${process.argv[1]}`) process.exit(main(process.argv.slice(2)));
