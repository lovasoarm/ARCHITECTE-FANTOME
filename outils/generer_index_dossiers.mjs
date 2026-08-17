#!/usr/bin/env node
// Regenere les blocs <!-- CONTENU-DOSSIER --> des README.md : toute entree du
// dossier est joignable depuis sa porte d'entree.
// node outils/generer_index_dossiers.mjs [racine]
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { IGNORE, listerFichiers } from "./lib_depot.mjs";

const racine = process.argv[2] ?? ".";
const DEBUT = "<!-- CONTENU-DOSSIER:debut (genere par outils/generer_index_dossiers.mjs) -->";
const FIN = "<!-- CONTENU-DOSSIER:fin -->";
// Coulisses : conserve pour l'audit, hors du champ de vision de l'apprenant.
const HORS_INDEX = new Set(["99-COULISSES"]);

const readmes = listerFichiers(racine, (r) => r.endsWith("README.md"));
let touches = 0;

for (const rel of readmes) {
  const chemin = join(racine, rel);
  const brut = readFileSync(chemin, "utf8");
  const i = brut.indexOf(DEBUT);
  const j = brut.indexOf(FIN);
  if (i === -1 || j === -1) continue;

  const dossierRel = rel.split("/").slice(0, -1).join("/");
  const dossier = dossierRel ? join(racine, dossierRel) : racine;
  const entrees = readdirSync(dossier, { withFileTypes: true })
    .filter((e) => !IGNORE.has(e.name) && e.name !== "README.md")
    .filter((e) => !(dossierRel === "" && HORS_INDEX.has(e.name)))
    .filter((e) => e.name.endsWith(".md") || (e.isDirectory() && existsSync(join(dossier, e.name, "README.md"))));

  const fichiers = entrees.filter((e) => e.isFile()).map((e) => `- [${e.name}](${e.name})`).sort();
  const sousDossiers = entrees
    .filter((e) => e.isDirectory())
    .map((e) => `- [${e.name}/](${e.name}/README.md)`)
    .sort();

  const bloc = [
    DEBUT,
    "",
    "## Contenu du dossier",
    "",
    `Liste generee : tout fichier de \`${dossierRel || "."}\` est joignable depuis ici, aucun document n'est laisse sans porte d'entree.`,
    "",
    ...fichiers,
    ...sousDossiers,
    "",
    FIN,
  ].join("\n");

  const sortie = brut.slice(0, i) + bloc + brut.slice(j + FIN.length);
  if (sortie !== brut) {
    writeFileSync(chemin, sortie);
    touches += 1;
  }
}

console.log(`${readmes.length} README.md examines, ${touches} index regeneres.`);
