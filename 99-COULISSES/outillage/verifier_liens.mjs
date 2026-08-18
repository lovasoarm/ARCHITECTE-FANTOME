#!/usr/bin/env node
// Verifie 100 % des liens relatifs des .md du depot.
// node 99-COULISSES/outillage/verifier_liens.mjs .            -> rapport console, code 1 si un lien casse
// node 99-COULISSES/outillage/verifier_liens.mjs . --ecrire   -> regenere 99-COULISSES/outillage/VERIFICATION_LIENS.md
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { listerMd, lireFichier, liensRelatifs, resoudre, empreinteDepot, commitCourant } from "./lib_depot.mjs";

const racine = process.argv[2] && !process.argv[2].startsWith("--") ? process.argv[2] : ".";
const ecrire = process.argv.includes("--ecrire");

const fichiers = listerMd(racine);
let trouves = 0;
let resolus = 0;
const couples = new Set();
const casses = [];

for (const rel of fichiers) {
  const { corps } = lireFichier(racine, rel);
  for (const lien of liensRelatifs(corps)) {
    trouves += 1;
    const { relCible, existe, horsDepot } = resoudre(racine, rel, lien.chemin);
    couples.add(`${rel} -> ${relCible}`);
    if (existe && !horsDepot) resolus += 1;
    else casses.push({ source: rel, cible: lien.brut, resolu: relCible });
  }
}

const horodatage = new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC";
const commit = commitCourant(racine);
const empreinte = empreinteDepot(racine);

const rapport = `---
stability: mouvant
acte: évaluer
---

# VERIFICATION DES LIENS RELATIFS (généré)

Acte attendu : évaluer.

> Genere le ${horodatage} — commit \`${commit}\` — empreinte de contenu \`${empreinte}\`.
> Ce fichier est produit par \`node 99-COULISSES/outillage/verifier_liens.mjs . --ecrire\`.
> Il ne se modifie jamais à la main. Le contrôle de livraison refuse la livraison
> si le périmètre déclaré ici ne couvre pas 100 % des \`.md\` du dépôt.

## Les trois nombres qui font la preuve

| Mesure | Valeur |
| --- | --- |
| Fichiers \`.md\` parcourus | ${fichiers.length} |
| Liens relatifs trouvés | ${trouves} |
| Liens relatifs résolus | ${resolus} |
| Couples source vers cible uniques | ${couples.size} |
| Liens cassés | ${casses.length} |

Périmètre : la totalité des fichiers \`.md\` du dépôt, sans exception ni échantillon.
Les liens externes (\`http\`, \`mailto\`) et les ancres pures (\`#\`) sont hors périmètre :
ils ne se vérifient pas sur disque.

## Liens cassés

${
  casses.length === 0
    ? "Aucun."
    : ["| Fichier source | Lien écrit | Cible résolue |", "| --- | --- | --- |"]
        .concat(casses.map((c) => `| \`${c.source}\` | \`${c.cible}\` | \`${c.resolu}\` |`))
        .join("\n")
}
`;

if (ecrire) {
  writeFileSync(join(racine, "99-COULISSES/outillage/VERIFICATION_LIENS.md"), rapport);
  console.log(`99-COULISSES/outillage/VERIFICATION_LIENS.md régénéré : ${fichiers.length} fichiers, ${trouves} liens, ${casses.length} cassés.`);
} else {
  console.log(`${fichiers.length} fichiers .md, ${trouves} liens relatifs, ${casses.length} cassés.`);
  for (const c of casses) console.log(`  CASSE ${c.source} -> ${c.cible}`);
}

process.exit(casses.length === 0 ? 0 : 1);
