#!/usr/bin/env node
// Regenere 05-MAITRISE/06_annexes/21_PERISSABILITE_INDEX.md a partir des en-tetes stability:.
// node 99-COULISSES/outillage/generer_perissabilite.mjs [racine]
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { listerMd, lireFichier } from "./lib_depot.mjs";

const racine = process.argv[2] ?? ".";
const CIBLE = "05-MAITRISE/06_annexes/21_PERISSABILITE_INDEX.md";

const DUREE = (s) =>
  s === "mouvant" ? "quelques mois" : s === "intemporel" ? "5 ans et +" : `jusqu'à ${s.split("_")[1] ?? "3 ans"}`;

const RAISON = (s, corps) => {
  if (s === "mouvant") return "suit une pratique qui bouge en continu, à relire à chaque passage";
  if (s === "intemporel") return "noyau dur, durable au-delà de cinq ans";
  if (/[0-9]\s?(€|EUR)|€\s?[0-9]/.test(corps))
    return "porte des montants datés, à re-relever selon le protocole de la donnée sourcée";
  return "cite des outils, des versions ou des offres qui vieillissent";
};

const rangs = { mouvant: 0, perissable: 1 };
const rang = (s) => (s === "mouvant" ? 0 : s === "intemporel" ? 9 : 1 + (Number(s.split("_")[1]) || 0) / 10000);

const lignes = [];
const compte = new Map();
for (const rel of listerMd(racine)) {
  if (rel === CIBLE) continue;
  const { entete, corps } = lireFichier(racine, rel);
  const s = entete.stability;
  if (!s) continue;
  compte.set(s, (compte.get(s) ?? 0) + 1);
  lignes.push({ rel, s, raison: RAISON(s, corps) });
}
lignes.sort((a, b) => rang(a.s) - rang(b.s) || a.rel.localeCompare(b.rel));

const categories = [...compte].sort((a, b) => rang(a[0]) - rang(b[0]));
const total = lignes.length;

const doc = `---
stability: intemporel
acte: évaluer
---

# INDEX DE PÉRISSABILITÉ (généré)

Acte attendu : restituer.

> Ce fichier est produit par \`node 99-COULISSES/outillage/generer_perissabilite.mjs\` à partir des en-têtes \`stability:\` du dépôt. Ne le modifie jamais à la main : change l'en-tête du fichier concerné, puis rejoue la commande. Le contrôle de livraison refuse la livraison si l'index commité diffère de l'index régénéré.

## Comment lire cet index

- **mouvant** : suit une pratique qui bouge en continu, à relire à chaque passage.
- **perissable_AAAA** : à rouvrir avant l'année indiquée, en commençant par la plus proche.
- **perissable** : concepts qui vieillissent en trois ans environ.
- **intemporel** : noyau dur, durable au-delà de cinq ans.

Le tri place en haut ce qui va vieillir en premier. Un fichier qui porte des montants relève en plus du protocole de la donnée sourcée ([../../03-PILOTAGE/07_cloud_foundations/RELEVE-REFERENCE-2026.md](../../03-PILOTAGE/07_cloud_foundations/RELEVE-REFERENCE-2026.md)).

## Compte par catégorie

| Catégorie | Fichiers | Durée de vie attendue |
| --- | --- | --- |
${categories.map(([s, n]) => `| ${s} | ${n} | ${DUREE(s)} |`).join("\n")}

Total des fichiers portant un en-tête \`stability:\` : ${total}.

## Index détaillé

| Fichier | Stabilité | Durée de vie | Raison |
| --- | --- | --- | --- |
${lignes.map((l) => `| \`${l.rel}\` | ${l.s} | ${DUREE(l.s)} | ${l.raison} |`).join("\n")}
`;

writeFileSync(join(racine, CIBLE), doc);
console.log(`${CIBLE} régénéré : ${total} fichiers, ${categories.length} catégories.`);
void rangs;
