#!/usr/bin/env node
// Producteur unique de tout chiffre structurel du depot.
// node 99-COULISSES/outillage/generer_carte.mjs [racine]
// Ecrit : 00-SOCLE/02-PROLOGUE/03-the-map.md et le bloc ECHELLE du README racine.
import { readdirSync, statSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
// B1 : la carte marque les etapes de la route survie. Import statique de la seule liste
// (lib_route_survie importe ce module : on ne lit ici qu'une constante, sans cycle d'ecriture).
import { ROUTE as ROUTE_SURVIE } from "./lib_route_survie.mjs";

const racine = process.argv[2] ?? ".";

export const PALIERS = [
  {
    dossier: "00-SOCLE", niveau: 0, identite: "Fondations",
    capacite: "a la fin de ce palier, tu sais ecrire, lire et raisonner sur du code sans t'y perdre",
    livrable: "ton environnement, ton plateau de suivi, tes premieres fonctions testees",
  },
  {
    dossier: "01-CADRAGE", niveau: 1, identite: "Developpeur",
    capacite: "a la fin de ce palier, tu sais choisir quoi construire et refuser par ecrit le reste",
    livrable: "PROBLEM-HUNT, MVP-SPLIT et le projet fil rouge cadre",
  },
  {
    dossier: "02-CONSTRUCTION", niveau: 2, identite: "Developpeur confirme",
    capacite: "a la fin de ce palier, tu sais construire un systeme dont les frontieres resistent au changement",
    livrable: "mini-projets livres, tests, ADR de decoupage, API documentee",
  },
  {
    dossier: "03-PILOTAGE", niveau: 3, identite: "Senior",
    capacite: "a la fin de ce palier, tu sais tenir un systeme en production et le chiffrer",
    livrable: "BUDGET-CLOUD.md, SLO.md, revue de securite, standards d'equipe",
  },
  {
    dossier: "04-EPREUVE", niveau: 4, identite: "Lead",
    capacite: "a la fin de ce palier, tu sais livrer sous contrainte reelle quand la spec et la priorite bougent",
    livrable: "capstone sous derive, decisions d'arbitrage datees",
  },
  {
    dossier: "05-MAITRISE", niveau: 5, identite: "Architecte",
    capacite: "a la fin de ce palier, tu sais concevoir ET defendre un systeme complet",
    livrable: "le dossier unique Staff Engineer, soutenu sous contradiction",
  },
];

const ROUTE_SURVIE_STOP = "Boss de sortie du niveau 3 (employable, pas Staff)";

export function modulesDe(racine, palier) {
  const base = join(racine, palier);
  return readdirSync(base)
    .filter((e) => /^\d{2}[-_]/.test(e) && statSync(join(base, e)).isDirectory())
    .sort();
}

export function compter(racine) {
  const parPalier = PALIERS.map((p) => ({ ...p, modules: modulesDe(racine, p.dossier) }));
  const total = parPalier.reduce((n, p) => n + p.modules.length, 0);
  return { parPalier, total };
}

function echelle(parPalier) {
  const lignes = parPalier.map(
    (p) =>
      `  [ ] Niveau ${p.niveau} — ${p.identite.padEnd(22)}(${p.dossier}, ${p.modules.length} modules, ${Math.ceil(p.modules.length / 2)} Boss)`,
  );
  return [
    "```text",
    ...lignes,
    "",
    `  Route survie (raccourci employabilite) : s'arrete au ${ROUTE_SURVIE_STOP}.`,
    "```",
    "",
    "| Niveau | Ce que tu sais faire a la sortie | Ce que tu as produit | Ce qui te reste |",
    "| --- | --- | --- | --- |",
    ...parPalier.map(
      (p) =>
        `| ${p.niveau} — ${p.identite} | ${p.capacite.replace("a la fin de ce palier, tu sais ", "")} | ${p.livrable} | ${
          p.niveau === 5 ? "rien : tu soutiens" : `les niveaux ${p.niveau + 1} a 5`
        } |`,
    ),
    "",
    "Rythme : deux modules, un Boss (dossiers `BOSS-*`) ; le dernier Boss d'un palier est sa retrospective.",
    "Un niveau se coche quand son **Boss de palier** est passe, jamais quand les fichiers sont lus.",
  ].join("\n");
}

function carte({ parPalier, total }) {
  const tableau = parPalier
    .map((p) => `| ${p.dossier} | ${p.modules.length} | ${p.capacite} | ${p.livrable} |`)
    .join("\n");
  const detail = parPalier
    .map((p) => `### ${p.dossier} — Niveau ${p.niveau} : ${p.identite} (${p.modules.length} modules)\n\n${p.modules.map((m) => `- \`${m}\`${ROUTE_SURVIE.includes(`${p.dossier}/${m}`) ? " — **route survie**" : ""}`).join("\n")}`)
    .join("\n\n");
  return `---
stability: stable
acte: comprendre
---

# La carte : six paliers, ${total} modules, un seul fil

<!-- FICHIER GENERE par 99-COULISSES/outillage/generer_carte.mjs — ne pas editer a la main.
     Tout chiffre structurel du depot vient de ce generateur, jamais d'une saisie manuelle. -->

## La scene

Avant de partir en randonnee sur un itineraire de plusieurs jours, tu regardes la carte
entiere, pas seulement le premier sentier. Ce fichier est cette carte. Tu n'as pas besoin de
la memoriser : tu dois savoir qu'elle existe, et qu'elle dit la verite du disque.

Un seul fil : six paliers, ${total} modules pedagogiques. Il n'y a pas d'autre comptage dans ce depot.
Si un document en cite un autre, il est estampille **document historique d'avant fusion**.

## L'echelle : six niveaux, pas ${total} raisons de fuir

${echelle(parPalier)}

## Les six paliers, palier par palier

| Palier | Modules | Capacite debloquee | Livrable produit |
| --- | --- | --- | --- |
${tableau}

## Le detail, genere depuis le disque

${detail}

## Tracabilite des origines

Les etapes marquees **route survie** forment le raccourci employabilite decrit par
[00-SOCLE/01_getting_started/ROUTE-SURVIE.md](../01_getting_started/ROUTE-SURVIE.md). C'est un filtre
sur ce meme fil, jamais un second parcours.

Origine : **[M]** module venu de MyFunnyJS, **[P]** niveau venu de ProjectFunny, **[N]** module
nouveau, ecrit pour ce parcours fusionne. Le tableau ligne a ligne est porte par le
[README racine](../../README.md), section « Le fil complet, avec sa tracabilite ».

## Combien il m'en reste ?

C'est la seule question qui compte quand le parcours est long. Elle a une reponse unique :
ouvre [PROGRESSION.md](../../PROGRESSION.md). Aucun autre compteur n'existe dans ce depot.
`;
}

// Import pur : ce module est aussi lu comme bibliotheque (lib_boss, controle_livraison).
// Il n'ecrit sur le disque que lorsqu'il est lance directement.
const lanceDirectement = process.argv[1] && process.argv[1].endsWith("generer_carte.mjs");

if (lanceDirectement) {
const compte = compter(racine);
writeFileSync(join(racine, "00-SOCLE/02-PROLOGUE/03-the-map.md"), carte(compte));

// Bloc ECHELLE du README racine
const readmePath = join(racine, "README.md");
if (existsSync(readmePath)) {
  const src = readFileSync(readmePath, "utf8");
  const bloc = `<!-- ECHELLE:debut (genere par 99-COULISSES/outillage/generer_carte.mjs) -->

## Ou tu en es : six niveaux

${echelle(compte.parPalier)}

Carte detaillee : [00-SOCLE/02-PROLOGUE/03-the-map.md](00-SOCLE/02-PROLOGUE/03-the-map.md).
Suivi personnel : [PROGRESSION.md](PROGRESSION.md).

<!-- ECHELLE:fin -->`;
  const re = /<!-- ECHELLE:debut[\s\S]*?<!-- ECHELLE:fin -->/;
  const sortie = re.test(src) ? src.replace(re, bloc) : src.replace(/\n## La promesse/, `\n${bloc}\n\n## La promesse`);
  writeFileSync(readmePath, sortie);
}

console.log(`Carte generee : 6 paliers, ${compte.total} modules.`);
}
