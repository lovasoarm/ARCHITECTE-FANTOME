#!/usr/bin/env node
// Verifie la numerotation locale NN_ / NN- de chaque dossier.
// Refus (code 1) : deux fichiers du meme dossier qui se disputent le meme numero.
// Avertissement (code 0) : trou dans la sequence, tolere car un fichier retire
// laisse son numero libre et renumeroter casserait tous les liens entrants.
//
// Conventions du depot, hors perimetre du refus :
//   - `00_` : porte d'entree (00_why_*, 00_prereq_check, 00_bridge_exo) ;
//   - `NN_*_minimini_projet.md` : application immediate du fichier NN ;
//   - `NNb_` : second fichier au meme rang de lecture (convention 11b du depot) ;
//   - `9x_` : annexes de fin de module (PORTAGE_MENTAL, PONT, EXO_IA_MENTEUSE).
//
// node outils/verifier_numerotation.mjs .
import { listerMd } from "./lib_depot.mjs";

const racine = process.argv[2] ?? ".";
const NUM = /^(\d{2})([a-z]?)[_-]/;
const RESERVE = (num, nom) =>
  num === 0 || num >= 90 || /_minimini_projet\.md$/.test(nom) || /_drill_exec\.md$/.test(nom);

const parDossier = new Map();
for (const rel of listerMd(racine)) {
  const parts = rel.split("/");
  const nom = parts.pop();
  const dossier = parts.join("/") || ".";
  const m = nom.match(NUM);
  if (!m) continue;
  if (!parDossier.has(dossier)) parDossier.set(dossier, []);
  parDossier.get(dossier).push({ nom, num: Number(m[1]), lettre: m[2] });
}

const refus = [];
const avertissements = [];

for (const [dossier, entrees] of [...parDossier].sort()) {
  const vus = new Map();
  const rangs = new Map();
  for (const e of entrees.sort((a, b) => a.nom.localeCompare(b.nom))) {
    const cle = `${e.num}${e.lettre}`;
    if (rangs.has(cle)) {
      const detail = `${dossier} : rang ${cle} porte par ${rangs.get(cle)} et ${e.nom}`;
      if (RESERVE(e.num, e.nom) || RESERVE(e.num, rangs.get(cle))) avertissements.push(detail);
      else refus.push(detail);
    } else {
      rangs.set(cle, e.nom);
      if (!vus.has(e.num)) vus.set(e.num, e.nom);
    }
  }
  const nums = [...vus.keys()].filter((n) => n > 0 && n < 90).sort((a, b) => a - b);
  for (let i = 1; i < nums.length; i += 1) {
    if (nums[i] - nums[i - 1] > 1) {
      const manquants = [];
      for (let n = nums[i - 1] + 1; n < nums[i]; n += 1) manquants.push(String(n).padStart(2, "0"));
      avertissements.push(`${dossier} : numero(s) libre(s) ${manquants.join(", ")} entre ${vus.get(nums[i - 1])} et ${vus.get(nums[i])}`);
    }
  }
}

console.log(`${parDossier.size} dossiers numerotes verifies : ${refus.length} refus, ${avertissements.length} avertissements.`);
for (const a of avertissements.slice(0, 20)) console.log(`  info  ${a}`);
if (avertissements.length > 20) console.log(`  info  ... et ${avertissements.length - 20} autres numeros libres.`);
for (const r of refus) console.log(`  FAUTE ${r}`);
process.exit(refus.length === 0 ? 0 : 1);
