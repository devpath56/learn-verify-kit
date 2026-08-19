#!/usr/bin/env node
// lint-teaching — enforces house-style.md "Specificity" on a teaching artifact.
// Usage: node tests/lint-teaching.mjs <file.md> [...]   exit 0 clean, 1 violations, 2 usage error.
// node: builtins only, no dependencies.
import { readFileSync } from 'node:fs';

const EARS_OPENERS = [/^The\s+\S+.*\bshall\b/i, /^When\b/i, /^While\b/i, /^If\b/i, /^Where\b/i];
const PLACEHOLDERS = [
  /\bfoo\b/i, /\bbar\b/i, /\bbaz\b/i, /\bTODO\b/, /\bTBD\b/,
  /\bsome value\b/i, /\bsome task\b/i, /\bsomething\b/i,
  /\[Person\]/i, /\[X\]/i, /\[N\]/i, /<placeholder>/i,
];

// A cell or line that states a requirement: contains "shall".
const isRequirement = (t) => /\bshall\b/i.test(t);

function cells(line) {
  if (!line.trim().startsWith('|')) return [line];
  return line.split('|').slice(1, -1).map((c) => c.trim());
}

function stripMarkup(t) {
  return t.replace(/\*\*/g, '').replace(/`[^`]*`/g, (m) => m.slice(1, -1)).replace(/^\s+/, '');
}

// A token inside backticks is being MENTIONED (a rule naming a banned word), not USED.
// Placeholder detection therefore reads the line with inline code removed entirely.
function stripInlineCode(t) {
  return t.replace(/`[^`]*`/g, ' ').replace(/\*\*/g, '');
}

export function lint(text) {
  const lines = text.split('\n');
  const findings = [];
  let sawRequirement = false;
  let sawViolationColumn = false;
  let inFence = false;

  lines.forEach((line, i) => {
    const n = i + 1;
    if (/^\s*```/.test(line)) { inFence = !inFence; return; }
    if (inFence) return;

    if (/violat/i.test(line)) sawViolationColumn = true;

    for (const raw of cells(line)) {
      const t = stripMarkup(raw);
      if (!t) continue;

      if (isRequirement(t)) {
        sawRequirement = true;
        if (!EARS_OPENERS.some((re) => re.test(t))) {
          findings.push({ rule: 'R1-EARS-SHAPE', line: n,
            msg: `requirement does not open with an EARS pattern (The/When/While/If/Where): "${t.slice(0, 70)}"` });
        }
      }

      const mentionFree = stripInlineCode(raw);
      for (const p of PLACEHOLDERS) {
        if (p.test(mentionFree)) {
          findings.push({ rule: 'R3-PLACEHOLDER', line: n,
            msg: `placeholder ${p} in a teaching example: "${mentionFree.trim().slice(0, 70)}"` });
          break;
        }
      }
    }
  });

  if (sawRequirement && !sawViolationColumn) {
    findings.push({ rule: 'R2-NO-VIOLATING-ROW', line: 0,
      msg: 'document states EARS requirements but contains no row marked as violating one' });
  }
  return findings;
}

const files = process.argv.slice(2);
if (!files.length) { console.error('usage: node tests/lint-teaching.mjs <file.md> [...]'); process.exit(2); }

let total = 0;
for (const f of files) {
  const findings = lint(readFileSync(f, 'utf8'));
  total += findings.length;
  if (!findings.length) { console.log(`OK   ${f}`); continue; }
  console.log(`FAIL ${f} — ${findings.length} finding(s)`);
  for (const v of findings) console.log(`  ${f}:${v.line}  ${v.rule}  ${v.msg}`);
}
process.exit(total ? 1 : 0);
