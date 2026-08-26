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

export const loadMap = (p = MAP) => JSON.parse(readFileSync(p, 'utf8'));

// A `$`-prefixed key is commentary, not a source. The convention is advisor-builder's, and
// authority_map.source_defs applies the same skip; reading `$note` as a definition is what made that
// module die once already.
export const sourceRows = (m) =>
  Object.entries(m.sources ?? {}).filter(([k]) => !k.startsWith('$'));

/** Sources with no `verified` block. NOT an error here - a finding, printed where a reader sees it. */
export const unverified = (m) => sourceRows(m).filter(([, s]) => !s.verified).map(([k]) => k);

/** Only what a reader can actually fetch. A source with no URL is theirs to bring. */
export const fetchable = (m) => sourceRows(m).filter(([, s]) => s.url);
export const bringYourOwn = (m) => sourceRows(m).filter(([, s]) => !s.url);

const bullets = (xs) => xs.map((x) => `- ${x}`).join('\n');

export function render(m = loadMap()) {
  const L = [];
  const P = (s = '') => L.push(s);

  P('# NotebookLM source pack — agent harness, L1 inference and L2 runtime');
  P();
  P('**You are holding the INPUT to a podcast, not a podcast.** Nothing here is a script. These are');
  P('the sources; NotebookLM generates the debate from them. The brief at the bottom is what to paste');
  P('in to aim it.');
  P();
  P(`Rendered from \`authority-map.json\`, which passes advisor-builder's \`authority_map.py --check\`.`);
  P('Do not hand-edit this file — edit the map and re-render, or `--check` will fail.');
  P();

  const unver = unverified(m);
  P('## Provenance, stated up front');
  P();
  P(`- Sources: **${sourceRows(m).length}**, of which **${sourceRows(m).length - unver.length}** were opened and read on a named date.`);
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
  for (const [id, s] of fetchable(m)) {
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

  const byo = bringYourOwn(m);
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
  P('Generate a roughly 30-minute debate between two experienced practitioners who disagree.');
  P('Do not let them converge politely. The sources genuinely conflict; hold the conflict open.');
  P();
  P('THE QUESTION: In an agent that runs a model in a loop, who terminates the loop?');
  P();
  P('THE FAULT LINE, and it is real — these sources point in opposite directions:');
  P();
  P('  * Nygard, writing from production outages, assumes the thing you called will NEVER stop.');
  P('    So the CALLER imposes the ending: a timeout, and a circuit breaker when timeouts repeat.');
  P();
  P('  * Anthropic\'s long-running-agents report finds the OPPOSITE failure. The agent stops too');
  P('    EARLY: it looks around, sees progress was made, and declares the job done. A timeout would');
  P('    not have caught that. Their fix is a completion predicate the agent does not own — a feature');
  P('    list it may only mark passing, never delete from.');
  P();
  P('  * Anthropic\'s earlier post offers the plain fallback: a maximum number of iterations,');
  P('    "to maintain control."');
  P();
  P('  * DeepSeek Harness makes the loop a PLUGIN, swappable in configuration next to models and');
  P('    tools — so termination stops being a property of the model and becomes a thing you choose.');
  P();
  P('  * NVIDIA NOOA names "decides when a task is done" as a harness responsibility outright, and');
  P('    reports that harness design alone swings benchmark results by double digits on the SAME model.');
  P();
  P('PRESS ON THESE, and make the speakers actually disagree:');
  P();
  P('  1. Is a max-iteration cap a stop condition, or an admission that nobody has a completion');
  P('     predicate? Have one speaker defend it as honest engineering and the other call it a fig leaf.');
  P();
  P('  2. Nygard bounds a callee that never stops. Agents stop too eagerly. Does the timeout tradition');
  P('     transfer to agents at all, or is it being cargo-culted onto the wrong failure direction?');
  P();
  P('  3. If the harness owns termination, and NVIDIA says the model can write its own orchestration');
  P('     loop — has the model just taken back the decision the harness was supposed to hold?');
  P();
  P('  4. AGENT = MODEL + HARNESS, says DeepSeek. When a run fails, how would you actually tell which');
  P('     side failed? What experiment separates them? (NOOA holds the model fixed; DeepSeek ships a');
  P('     two-tool Minimal mode. Are those the same experiment?)');
  P();
  P('GROUND RULES:');
  P('  - Cite the sources by name as you go. If something is not in them, say so out loud.');
  P('  - The DeepSeek docs are a v0.1 developer preview with breaking changes expected — argue the');
  P('    architecture, not the API.');
  P('  - The Anthropic 2024 post is stale by its own banner; its definitions stand, its tooling list');
  P('    does not.');
  P('  - The NVIDIA benchmark numbers are self-reported by NVIDIA about NVIDIA. Let one speaker say so.');
  P('```');
  P();

  P('## Then, to check it worked');
  P();
  P(bullets([
    'Play it and see whether the two speakers actually disagree, or whether they agreed by minute six. If they agreed, the brief was too soft — sharpen fault line 1 and regenerate.',
    'Listen for whether "who terminates the loop" gets FOUR answers or one. Four means the sources came through. One means it flattened them.',
    'Then run `learn agent-harness-l1-l2` in this repo, and see whether the podcast made the recall questions easier. That is the only test of it that matters.',
  ]));
  P();

  return L.join('\n') + '\n';
}

function main(argv) {
  const check = argv.includes('--check');
  const text = render();
  if (!check) {
    writeFileSync(OUT, text);
    console.log(`  wrote ${OUT}`);
    console.log(`  ${sourceRows(loadMap()).length} sources · ${unverified(loadMap()).length} unverified`);
    return 0;
  }
  let onDisk;
  try { onDisk = readFileSync(OUT, 'utf8'); }
  catch { console.error('  REFUSED: pack absent. Run without --check to render it.'); return 1; }
  if (onDisk === text) { console.log('  pack matches the map.'); return 0; }
  console.error('  REFUSED: the pack on disk is not what the map renders.');
  console.error('  Someone hand-edited the pack, or the map moved under it. Re-render.');
  return 1;
}

if (import.meta.url === `file://${process.argv[1]}`) process.exit(main(process.argv.slice(2)));
