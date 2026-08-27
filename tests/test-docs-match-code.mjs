#!/usr/bin/env node
/**
 * test-docs-match-code — the numbers in the prose must be the numbers in the code.
 *
 * WHY IT EXISTS, and what it caught. MEASURED 2026-08-27, by reading the README top to bottom and
 * running every command in it: `README.md` advertised "6 laws" against a `lint-bank` holding
 * SIXTEEN, "18 questions" against a registered bank of TWENTY, and "32 guardrail tests" against
 * THIRTY-SEVEN cases. `MAINTAINING.md` claimed 252 questions against 254. Step 6 told the reader to
 * record against `agent-harness-l1-l2.p1q1`, a question id that exists in no bank in this repo.
 *
 * NONE OF THAT BROKE A TEST, because nothing had ever compared the two. That is change
 * amplification with no alarm on it: adding one question meant editing the bank, then remembering
 * two prose counts in two files, and the second half is the half that does not happen. A reader who
 * runs the commands and sees different numbers stops trusting the parts they cannot check — which
 * in a kit whose whole pitch is "check the machinery before trusting anything it says" is the
 * expensive failure, not a typo.
 *
 * SO THE PROSE IS THE ASSERTION and the code is the truth. A count in a document is now a claim
 * with a test behind it.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LAWS, BANK } from './lint-bank.mjs';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');

let pass = 0; const fails = [];
const ok = (name, cond, detail = '') => (cond ? (pass++, console.log(`  ok    ${name}`))
  : (fails.push(name), console.log(`  FAIL  ${name}${detail ? '  -> ' + detail : ''}`)));

const bank = JSON.parse(fs.readFileSync(BANK, 'utf8'));
const competencies = bank.competencies ?? [];
const questions = competencies.flatMap((c) => c.questions ?? []);
const ids = new Set(questions.map((q) => q.id));
const wired = competencies.find((c) => c.id === 'agent-harness-l1-l2');
const cases = new Set((read('tests/regression-cases.md').match(/R-\d+/g) ?? []));

const readme = read('README.md');
const maintaining = read('MAINTAINING.md');
const claude = read('CLAUDE.md');

/* ---- 1. EVERY COUNT PRINTED IN PROSE ---- */
ok(`README states ${LAWS.length} laws, matching lint-bank`,
   new RegExp(`# ${LAWS.length} laws over the question bank`).test(readme));
ok(`README states ${wired.questions.length} questions for the wired competency`,
   new RegExp(`\\b${wired.questions.length} questions`).test(readme), 'README says a different number');
ok(`README states ${cases.size} regression cases`,
   new RegExp(`${cases.size} guardrail tests`).test(readme));
ok(`CLAUDE.md states ${cases.size} regression cases`,
   new RegExp(`${cases.size} behavioral guardrail tests`).test(claude));
ok(`MAINTAINING states ${cases.size} regression cases`,
   new RegExp(`${cases.size} guardrail tests`).test(maintaining));
ok(`MAINTAINING states ${competencies.length} competencies and ${questions.length} questions`,
   new RegExp(`${competencies.length} competencies, ${questions.length} questions, ${LAWS.length} laws`).test(maintaining),
   'the live-bank line in MAINTAINING has drifted');

/* ---- 2. EVERY QUESTION ID THE README TELLS YOU TO TYPE ----
   `p1q1` shipped in a copy-pasteable command for as long as this file did not exist. A command in a
   README is not an illustration; a reader runs it. */
for (const m of readme.matchAll(/--question (\S+)/g))
  ok(`README's --question ${m[1]} exists in the bank`, ids.has(m[1]), 'no such question id');

/* ---- 3. EVERY SKILL ON DISK IS LISTED ----
   `drill` shipped, and the README's file tree did not mention it — so the one skill a reader needs
   for step 4 was the one the map omitted. */
const onDisk = fs.readdirSync(path.join(ROOT, '.claude', 'skills'), { withFileTypes: true })
  .filter((d) => d.isDirectory()).map((d) => d.name).sort();
for (const s of onDisk)
  ok(`README's file tree lists the ${s} skill`, new RegExp(`\\b${s}/SKILL\\.md`).test(readme));
ok(`CLAUDE.md's skill count matches the ${onDisk.length} on disk`,
   new RegExp(`^Eight skills`, 'm').test(claude) && onDisk.length === 8,
   `${onDisk.length} skills on disk: ${onDisk.join(', ')}`);

console.log(`\n${pass} passed · ${fails.length} failed`);
if (fails.length) { console.log(`  failing: ${fails.join(', ')}`); process.exit(1); }
process.exit(0);
