#!/usr/bin/env node
// Lint A14 : les annexes transverses sont numerotees et rattachees.
// Regle : toute entree pedagogique de 06-ANNEXES-TRANSVERSES porte un prefixe NN-
// et recoit au moins un lien entrant depuis un module du fil (00-SOCLE a 05-MAITRISE).
// Une annexe sans module declencheur n'a rien a faire ici : elle descend en 99-COULISSES/.
// node 99-COULISSES/outillage/verifier_annexes.mjs [racine]
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, posix } from "node:path";
import { listerMd } from "./lib_depot.mjs";

const racine = process.argv[2] ?? ".";
const A = "06-ANNEXES-TRANSVERSES";
// Infrastructure du dossier : porte d'entree, licence heritee, gabarits, images.
const HORS_NUMEROTATION = new Set(["README.md", "LICENSE-projectfunny", "assets", "meta"]);

const refus = [];
const entrees = readdirSync(join(racine, A)).filter((e) => !HORS_NUMEROTATION.has(e) && !e.startsWith("."));

for (const entree of entrees) {
  if (!/^\d{2}-/.test(entree))
    refus.push(`NUMEROTATION : ${A}/${entree} n'est pas numerote par ordre d'appel`);
}

// Liens entrants depuis le fil.
const entrants = new Map(entrees.map((e) => [e, 0]));
for (const rel of listerMd(racine)) {
  if (!/^0[0-5]-/.test(rel)) continue;
  const dossier = posix.dirname(rel);
  for (const m of readFileSync(join(racine, rel), "utf8").matchAll(/\]\(([^)\s#]+)/g)) {
    const c = m[1];
    if (/^[a-z]+:/i.test(c) || c.startsWith("/")) continue;
    const cible = posix.normalize(posix.join(dossier === "." ? "" : dossier, c));
    if (!cible.startsWith(`${A}/`)) continue;
    const e = cible.split("/")[1];
    if (entrants.has(e)) entrants.set(e, entrants.get(e) + 1);
  }
}
for (const [e, n] of entrants)
  if (n === 0) refus.push(`RATTACHEMENT : ${A}/${e} n'est appele par aucun module du fil`);

console.log(`Annexes : ${entrees.length} entrees examinees, ${refus.length} refus.`);
for (const r of refus) console.log(`  REFUS ${r}`);
process.exit(refus.length ? 1 : 0);
