#!/usr/bin/env node
// A14 — Annexes transverses ordonnees (audit 0.12).
// 1. Chaque annexe recoit un module declencheur explicite (lien entrant reel).
// 2. Les entrees sont numerotees par ordre d'appel dans le fil.
// 3. Une annexe sans module declencheur descend en 99-COULISSES/archives/.
// 4. Le README du dossier porte l'index en tableau.
// Idempotent : relance sans effet si la migration est deja passee.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { deplacer } from "./_deplacer.mjs";

const racine = process.argv[2] ?? ".";
const A = "06-ANNEXES-TRANSVERSES";

// --- 1. Liens declencheurs manquants ---------------------------------------
const DECLENCHEURS = [
  {
    module: "00-SOCLE/01_getting_started/README.md",
    bloc: `
## Annexes declenchees ici

- [01-support.md](../../06-ANNEXES-TRANSVERSES/01-support.md) : ou aller quand tu es bloque plus de trente minutes, avant d'abandonner ou de demander a une IA.
- [02-NODE_VERSION.md](../../06-ANNEXES-TRANSVERSES/02-NODE_VERSION.md) : la version de Node supposee par tout le depot, a fixer le jour de l'installation.
`,
  },
  {
    module: "00-SOCLE/02-PROLOGUE/04-rules-of-the-game.md",
    bloc: `
## Annexe declenchee ici

- [04-UNIVERS_AUTORISES.md](../../06-ANNEXES-TRANSVERSES/04-UNIVERS_AUTORISES.md) : la liste blanche des univers narratifs utilisables dans tes exemples. Ouvre-la avant d'ecrire ton premier exercice ; le lint refuse tout univers hors liste.
`,
  },
  {
    module: "03-PILOTAGE/07_cloud_foundations/README.md",
    bloc: `
## Annexe declenchee ici

- [09-PEREMPTION-2027.md](../../06-ANNEXES-TRANSVERSES/09-PEREMPTION-2027.md) : ce module est le plus perissable du depot. L'annexe dit quand reposer la question, a quelle source, et qui la repose.
`,
  },
  {
    module: "05-MAITRISE/06_annexes/13_portfolio_publication.md",
    bloc: `
## Annexe declenchee ici

- [10-COMMUNAUTE.md](../../06-ANNEXES-TRANSVERSES/10-COMMUNAUTE.md) : ou publier, a qui montrer, et comment recevoir une contradiction publique sans la transformer en debat d'opinion.
`,
  },
  {
    module: "05-MAITRISE/06_annexes/20_PERISSABILITE.md",
    bloc: `
## Annexe declenchee ici

- [11-ANNEXE-perennite.md](../../06-ANNEXES-TRANSVERSES/11-ANNEXE-perennite.md) : la doctrine de perennite du depot, a lire une fois la grille intemporel/perissable comprise.
`,
  },
  {
    module: "05-MAITRISE/RETRO-BLOC-5-MAITRISE.md",
    bloc: `
## Annexe declenchee ici

- [13-ANNEXE-et-apres.md](../06-ANNEXES-TRANSVERSES/13-ANNEXE-et-apres.md) : a ouvrir apres l'epilogue, une fois la retro de ce bloc ecrite et signee.
`,
  },
];

for (const { module: mod, bloc } of DECLENCHEURS) {
  const p = join(racine, mod);
  if (!existsSync(p)) throw new Error(`module declencheur introuvable : ${mod}`);
  const texte = readFileSync(p, "utf8");
  if (texte.includes("Annexe declenchee ici") || texte.includes("Annexes declenchees ici")) continue;
  writeFileSync(p, texte.trimEnd() + "\n" + bloc);
}

// --- 2. Numerotation par ordre d'appel --------------------------------------
const RENOMMAGES = [
  ["support.md", "01-support.md"],
  ["NODE_VERSION.md", "02-NODE_VERSION.md"],
  ["UNIVERS_AUTORISES.md", "04-UNIVERS_AUTORISES.md"],
  ["DEV_JOURNAL_HEBDO.md", "05-DEV_JOURNAL_HEBDO.md"],
  ["ROADMAP-rythmes.md", "06-ROADMAP-rythmes.md"],
  ["CONTRADICTEUR.md", "07-CONTRADICTEUR.md"],
  ["SIMULATION-ENTREPRISE.md", "08-SIMULATION-ENTREPRISE.md"],
  ["PEREMPTION-2027.md", "09-PEREMPTION-2027.md"],
  ["COMMUNAUTE.md", "10-COMMUNAUTE.md"],
  ["ANNEXE-perennite.md", "11-ANNEXE-perennite.md"],
  ["EPILOGUE.md", "12-EPILOGUE.md"],
  ["ANNEXE-et-apres.md", "13-ANNEXE-et-apres.md"],
];

// --- 3. Annexes sans module declencheur : elles descendent en coulisses ------
const DEMOTIONS = [
  ["README-source-myfunnyjs.md", "99-COULISSES/archives/sources/README-source-myfunnyjs.md"],
  ["README-source-projectfunny.md", "99-COULISSES/archives/sources/README-source-projectfunny.md"],
  ["START_HERE-myfunnyjs.md", "99-COULISSES/archives/sources/START_HERE-myfunnyjs.md"],
];

const paires = [];
for (const [avant, apres] of RENOMMAGES) {
  if (existsSync(join(racine, A, avant))) paires.push([`${A}/${avant}`, `${A}/${apres}`]);
}
for (const [avant, apres] of DEMOTIONS) {
  if (existsSync(join(racine, A, avant))) paires.push([`${A}/${avant}`, apres]);
}
if (existsSync(join(racine, A, "TECH-ILA")) && !existsSync(join(racine, A, "03-TECH-ILA"))) {
  // Le dossier TECH-ILA est renomme d'un bloc : tous ses fichiers suivent.
  const { listerFichiers } = await import("../lib_depot.mjs");
  for (const rel of listerFichiers(racine, (r) => r.startsWith(`${A}/TECH-ILA/`)))
    paires.push([rel, rel.replace(`${A}/TECH-ILA/`, `${A}/03-TECH-ILA/`)]);
}

const touches = paires.length ? deplacer(racine, paires) : 0;
console.log(`A14 : ${paires.length} fichiers renommes ou descendus, ${touches} fichiers de liens reecrits.`);
