#!/usr/bin/env node
// A17 — Ecrit le gate securite dans tout verification_pack a livrable d'architecture.
// node 99-COULISSES/outillage/appliquer_gate_securite.mjs [racine]
import { readFileSync, writeFileSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { packsSousGate, porteLeGate, LIEN_SECURITE } from "./lib_gate_securite.mjs";

const racine = process.argv[2] ?? ".";
let ecrits = 0;

for (const rel of packsSousGate(racine)) {
  if (porteLeGate(racine, rel)) continue;
  const chemin = join(racine, rel);
  const texte = readFileSync(chemin, "utf8");
  const versSecurite = relative(dirname(rel), LIEN_SECURITE).split(/[\\/]/).join("/");
  const bloc = `
## Critere de refus securite (bloquant, ajoute en A17)

Ce module produit un livrable d'architecture (ADR, budget, SLO ou schema). Le gate securite
precede les drills et ne se compense pas.

| Verification | Portee | Verdict |
| --- | --- | --- |
| Aucun secret en clair, rayon d'impact du livrable ecrit | le livrable d'architecture rendu et tout extrait colle dans les drills | Un seul secret en clair, ou aucun rayon d'impact ecrit = **module non valide**, meme avec tous les drills REUSSI |

Rayon d'impact : qui casse si ce livrable est applique tel quel (services, donnees, personnes),
et qui detient les droits d'y toucher. Une ligne suffit, mais elle est nommee et chiffree.

Reference unique du critere : [identite, droits et secrets](${versSecurite}).
`;
  const marqueur = "\n## Regle de verdict";
  const sortie = texte.includes(marqueur)
    ? texte.replace(marqueur, `${bloc}${marqueur}`)
    : `${texte.trimEnd()}\n${bloc}`;
  writeFileSync(chemin, sortie);
  ecrits += 1;
}

console.log(`Gate securite : ${packsSousGate(racine).length} packs sous gate, ${ecrits} completes.`);
