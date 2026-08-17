#!/usr/bin/env node
// Bloc B2 : verrou typographique. Trois regles gelees, sortie fichier:ligne.
//   1. zero emoji
//   2. zero selecteur de variation (U+FE0E, U+FE0F)
//   3. zero tiret cadratin (em-dash U+2014) ni demi-cadratin (en-dash U+2013)
// Usage : node outils/controle_typographie.mjs [racine]
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const IGNORE = new Set([".git", "node_modules"]);
const EMOJI = /[\u{1F300}-\u{1FAFF}\u{1F000}-\u{1F2FF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{FE0E}]/u;
const VARIATION = /[\u{FE0E}\u{FE0F}]/u;
const CADRATIN = /[\u2014\u2013]/;

export function fichiers(dir, acc = []) {
  for (const e of readdirSync(dir).sort()) {
    if (IGNORE.has(e)) continue;
    const p = join(dir, e);
    if (statSync(p).isDirectory()) fichiers(p, acc);
    else if (/\.(md|mjs|js|json|txt|yml|yaml)$/.test(e)) acc.push(p);
  }
  return acc;
}

export function violations(racine) {
  const out = [];
  for (const f of fichiers(racine)) {
    const rel = relative(racine, f).split(sep).join("/");
    // Ce fichier decrit les caracteres interdits : il est exclu de son propre controle.
    if (rel === "outils/controle_typographie.mjs") continue;
    const lignes = readFileSync(f, "utf8").split("\n");
    lignes.forEach((l, i) => {
      const pos = `${rel}:${i + 1}`;
      if (VARIATION.test(l)) out.push(`${pos} : selecteur de variation present`);
      else if (EMOJI.test(l)) out.push(`${pos} : emoji present`);
      if (CADRATIN.test(l)) out.push(`${pos} : tiret cadratin ou demi-cadratin present, utilise un trait d'union ou deux-points`);
    });
  }
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const racine = process.argv[2] ?? ".";
  const v = violations(racine);
  for (const x of v) console.log(x);
  if (v.length) {
    console.error(`\nECHEC : ${v.length} violation(s) typographique(s).`);
    process.exit(1);
  }
  console.log("OK : 0 emoji, 0 selecteur de variation, 0 em-dash.");
}
