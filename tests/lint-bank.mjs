#!/usr/bin/env node
/**
 * lint-bank — the question bank's own laws, bound to an exit code.
 *
 * WHY IT EXISTS. `drill` grades an answer against an ideal FROZEN at registration, and its whole
 * claim is that editing or re-rendering a booklet cannot move the goalposts. Nothing checked that
 * the ideal was there. A question whose `ideal` is missing or empty does not fail loudly — `drill`
 * grades against nothing and reports a verdict, which is worse than refusing, because a verdict
 * nobody can audit reads exactly like one that was earned.
 *
 * The bank was 252 questions across 14 competencies with no validator at all when this was written.
 *
 *   node tests/lint-bank.mjs                      the live bank
 *   node tests/lint-bank.mjs <file.json>          a fixture
 *   EXIT: 0 every law holds · 1 a law is broken · 2 the bank could not be read
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const BANK = path.join(ROOT, 'resources', 'competency-progress.json');
const str = (x) => typeof x === 'string' && x.trim().length > 0;

/** Every law the bank must satisfy. Each returns the rows that BREAK it, never a boolean. */
export const LAWS = [
  { id: 'question-has-ideal',
    why: 'drill grades against a frozen ideal; without one it grades against nothing and still reports a verdict',
    broken: (b) => qs(b).filter((q) => !str(q.ideal)).map((q) => q.id) },
  { id: 'question-has-prompt',
    why: 'a question with no prompt cannot be asked',
    broken: (b) => qs(b).filter((q) => !str(q.prompt)).map((q) => q.id) },
  { id: 'question-id-unique',
    why: 'an id is the address history is filed under; two questions under one id makes both unaddressable',
    broken: (b) => { const seen = new Set(), dup = []; for (const q of qs(b)) { if (seen.has(q.id)) dup.push(q.id); seen.add(q.id); } return dup; } },
  { id: 'question-id-matches-competency',
    why: 'a question filed under another competency is invisible to the drill that should ask it',
    broken: (b) => cs(b).flatMap((c) => (c.questions ?? []).filter((q) => !String(q.id ?? '').startsWith(`${c.id}.`)).map((q) => q.id)) },
  { id: 'rollup-counts-the-questions',
    why: 'a rollup that disagrees with the bank reports progress against a denominator that does not exist',
    broken: (b) => cs(b).filter((c) => {
      const r = c.rollup ?? {};
      const n = (r.untested ?? 0) + (r.shaky ?? 0) + (r.comfortable ?? 0);
      return n !== (c.questions ?? []).length;
    }).map((c) => c.id) },
  { id: 'competency-id-unique',
    why: 'two competencies under one id makes the drill target ambiguous',
    broken: (b) => { const seen = new Set(), dup = []; for (const c of cs(b)) { if (seen.has(c.id)) dup.push(c.id); seen.add(c.id); } return dup; } },
];

const cs = (b) => (Array.isArray(b?.competencies) ? b.competencies : []);
const qs = (b) => cs(b).flatMap((c) => c.questions ?? []);

export function audit(bank) {
  return LAWS.map((l) => ({ id: l.id, why: l.why, broken: l.broken(bank) }));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const file = process.argv[2] ?? BANK;
  let bank;
  try { bank = JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (e) { console.error(`lint-bank: could not read ${file} — ${e.message}`); process.exit(2); }

  const results = audit(bank);
  let failed = 0;
  for (const r of results) {
    if (!r.broken.length) { console.log(`  ok    ${r.id}`); continue; }
    failed++;
    console.log(`  FAIL  ${r.id} — ${r.broken.length} row(s): ${r.broken.slice(0, 4).join(', ')}${r.broken.length > 4 ? ' …' : ''}`);
    console.log(`        ${r.why}`);
  }
  console.log(`\n${cs(bank).length} competenc(ies) · ${qs(bank).length} question(s) · ${LAWS.length - failed}/${LAWS.length} laws hold`);
  process.exit(failed ? 1 : 0);
}
