#!/usr/bin/env node
// Bloc B4 : dans tout dossier de module (celui qui porte un 00_why_*.md), la
// suite des prefixes numeriques doit demarrer a 00 et etre continue, sans trou.
// Plusieurs fichiers peuvent partager un meme numero (ex : 00_why_x.md et
// 00_prereq_check.md). Les numeros reserves 90 a 99 (annexes de fin de module)
// sont hors perimetre.
// Usage : node outils/controle_numerotation_continue.mjs [racine]
import { readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const IGNORE = new Set([".git", "node_modules"]);
const PREFIXE = /^(\d{2})[_-]/;

function dossiers(dir, acc = []) {
  acc.push(dir);
  for (const e of readdirSync(dir).sort()) {
    if (IGNORE.has(e)) continue;
    const p = join(dir, e);
    if (statSync(p).isDirectory()) dossiers(p, acc);
  }
  return acc;
}

export function violations(racine) {
  const out = [];
  for (const d of dossiers(racine)) {
    const rel = relative(racine, d).split(sep).join("/") || ".";
    const estModule = readdirSync(d).some((e) => /^00_why_.*\.md$/.test(e));
    if (!estModule) continue;
    const nums = [
      ...new Set(
        readdirSync(d)
          .filter((e) => e.endsWith(".md") || statSync(join(d, e)).isDirectory())
          .map((e) => PREFIXE.exec(e)?.[1])
          .filter(Boolean)
          .map(Number)
          .filter((n) => n < 90),
      ),
    ].sort((a, b) => a - b);
    if (nums.length === 0) continue;
    if (nums[0] !== 0) out.push(`${rel} : la numerotation demarre a ${String(nums[0]).padStart(2, "0")} au lieu de 00`);
    for (let i = 1; i < nums.length; i++) {
      if (nums[i] !== nums[i - 1] + 1) {
        out.push(`${rel} : trou de numerotation entre ${String(nums[i - 1]).padStart(2, "0")} et ${String(nums[i]).padStart(2, "0")}`);
      }
    }
  }
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const racine = process.argv[2] ?? ".";
  const v = violations(racine);
  for (const x of v) console.log(x);
  if (v.length) {
    console.error(`\nECHEC : ${v.length} dossier(s) a numerotation non continue.`);
    process.exit(1);
  }
  console.log("OK : prefixes numeriques continus a partir de 00 dans tous les dossiers.");
}
