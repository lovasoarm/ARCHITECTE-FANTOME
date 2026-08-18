#!/usr/bin/env node
// B4 — Insere le contrat de validation unique dans chaque verification_pack.
// node 99-COULISSES/outillage/appliquer_contrat_validation.mjs [racine]
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { packs, bloc, TITRE_CONTRAT } from "./lib_contrat_validation.mjs";

const racine = process.argv[2] ?? ".";
let touches = 0;
for (const rel of packs(racine)) {
  const p = join(racine, rel);
  let t = readFileSync(p, "utf8");
  if (t.includes(TITRE_CONTRAT)) continue;
  const ancre = t.indexOf("## Regle de verdict");
  const b = bloc(rel);
  t = ancre === -1 ? `${t.trimEnd()}\n\n${b}` : `${t.slice(0, ancre)}${b}${t.slice(ancre)}`;
  writeFileSync(p, t);
  touches += 1;
}
console.log(`Contrat de validation : ${touches} verification_pack mis a jour sur ${packs(racine).length}.`);
