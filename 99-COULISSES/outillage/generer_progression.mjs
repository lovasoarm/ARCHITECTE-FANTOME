#!/usr/bin/env node
// B5 — Regenere le SEUL bloc calcule de PROGRESSION.md : la grille de checkpoints
// (six niveaux B3 x Boss B2). Tout le reste du fichier est un modele que l'apprenant remplit
// a la main : ce depot ne genere pas l'etat d'un humain, il genere la grille qu'il coche.
// node 99-COULISSES/outillage/generer_progression.mjs [racine]
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { PALIERS, modulesDe } from "./generer_carte.mjs";
import { groupesDe } from "./lib_boss.mjs";
import { ROUTE as ROUTE_SURVIE, BOSS_SORTIE } from "./lib_route_survie.mjs";

export const DEBUT = "<!-- CHECKPOINTS:debut (genere par 99-COULISSES/outillage/generer_progression.mjs) -->";
export const FIN = "<!-- CHECKPOINTS:fin -->";
export const FICHIER = "PROGRESSION.md";

export function blocCheckpoints(racine) {
  const lignes = [];
  for (const p of PALIERS) {
    const groupes = groupesDe(racine, p.dossier);
    const survie = modulesDe(racine, p.dossier).filter((m) => ROUTE_SURVIE.includes(`${p.dossier}/${m}`)).length;
    lignes.push("");
    lignes.push(`### Niveau ${p.niveau} — ${p.identite} (\`${p.dossier}\`)`);
    lignes.push("");
    lignes.push(`Capacite visee : ${p.capacite}. Livrable : ${p.livrable}.`);
    lignes.push(survie ? `Etapes de la route survie dans ce palier : ${survie}.` : "Aucune etape de route survie ici : palier de la route complete.");
    lignes.push("");
    lignes.push("| Coche | Boss | Modules couverts | Verdict ecrit le |");
    lignes.push("| --- | --- | --- | --- |");
    for (const g of groupes) {
      const nom = g.estRetro ? `${g.porteur.split("/").pop()} (Boss de palier)` : g.porteur.split("/").pop();
      const marque = g.porteur === BOSS_SORTIE ? " **(sortie route survie)**" : "";
      lignes.push(`| [ ] | \`${nom}\`${marque} | ${g.modules.map((m) => `\`${m}\``).join(", ")} | |`);
    }
    lignes.push("");
    lignes.push(`- [ ] **Niveau ${p.niveau} franchi** : tous les Boss ci-dessus sont passes, verdict ecrit et date.`);
  }
  return [DEBUT, ...lignes, "", FIN].join("\n");
}

const lanceDirectement = process.argv[1] && process.argv[1].endsWith("generer_progression.mjs");
if (lanceDirectement) {
  const racine = process.argv[2] ?? ".";
  const p = join(racine, FICHIER);
  const src = readFileSync(p, "utf8");
  const re = new RegExp(`${DEBUT.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${FIN}`);
  if (!re.test(src)) {
    console.error(`${FICHIER} ne porte pas les marqueurs CHECKPOINTS : bloc non regenere.`);
    process.exit(1);
  }
  writeFileSync(p, src.replace(re, blocCheckpoints(racine)));
  console.log(`${FICHIER} : grille de checkpoints regeneree (6 niveaux).`);
}
