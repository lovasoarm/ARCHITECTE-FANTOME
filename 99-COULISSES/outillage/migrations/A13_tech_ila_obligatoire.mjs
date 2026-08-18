#!/usr/bin/env node
// A13 — TECH-ILA devient un parcours parallele obligatoire a 6 jalons (audit 0.9).
// Le critere binaire quitte la retrospective de bloc et entre dans le verification_pack
// des six modules declencheurs : aucun d'eux n'est validable sans son jalon.
// Idempotent.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, relative, posix } from "node:path";

const racine = process.argv[2] ?? ".";
const MARQUEUR = "## Jalon TECH-ILA (bloquant, ajoute en A13)";

export const JALONS = [
  {
    n: 1,
    module: "00-SOCLE/01_getting_started",
    fichier: "01-niveau-1-socle.md",
    titre: "Niveau 1 : Socle professionnel",
    attendu:
      "terminal, Git, Node, TypeScript, HTTP, SQL, Docker : pour chacun, une commande jouee sur ta machine et sa sortie collee dans ton depot",
  },
  {
    n: 2,
    module: "02-CONSTRUCTION/18_web_concepts",
    fichier: "02-niveau-2-frontend.md",
    titre: "Niveau 2 : Frontend",
    attendu:
      "une page servie par toi, avec la strategie de rendu nommee, un chiffre de performance mesure et un defaut d'accessibilite corrige",
  },
  {
    n: 3,
    module: "02-CONSTRUCTION/19_api_craft",
    fichier: "03-niveau-3-backend.md",
    titre: "Niveau 3 : Backend",
    attendu:
      "une API qui tourne, avec authentification posee, un cache ou une file justifie, et le comportement en erreur decrit",
  },
  {
    n: 4,
    module: "03-PILOTAGE/07_cloud_foundations",
    fichier: "04-niveau-4-systemes.md",
    titre: "Niveau 4 : Systemes professionnels",
    attendu:
      "un pipeline CI qui refuse un commit casse, une trace ou une metrique lue en production simulee, et un incident rejoue",
  },
  {
    n: 5,
    module: "05-MAITRISE/02_scalability",
    fichier: "05-niveau-5-transfert.md",
    titre: "Niveau 5 : Transfert",
    attendu:
      "le meme service ecrit dans un second langage, avec ce qui s'est transfere tel quel et ce qui a du etre repense",
  },
  {
    n: 6,
    module: "04-EPREUVE/04_ai_native_dev",
    fichier: "06-niveau-6-ia.md",
    titre: "Niveau 6 : IA",
    attendu:
      "une sortie de modele refusee par toi, avec la regle de refus ecrite avant de la lire",
  },
];

const A = "06-ANNEXES-TRANSVERSES/03-TECH-ILA";

for (const j of JALONS) {
  const cible = join(racine, j.module, "verification_pack/criteres.md");
  if (!existsSync(cible)) throw new Error(`pack introuvable : ${j.module}`);
  const texte = readFileSync(cible, "utf8");
  if (texte.includes(MARQUEUR)) continue;
  const versAnnexe = posix.relative(`${j.module}/verification_pack`, `${A}/tech-ila/${j.fichier}`);
  const versReadme = posix.relative(`${j.module}/verification_pack`, `${A}/README.md`);
  const bloc = `
${MARQUEUR}

TECH-ILA n'est pas une lecture de confort : c'est le **parcours parallele obligatoire** du depot
([${"README"}](${versReadme})). Ce module porte son jalon ${j.n} sur 6. Le jalon precede les trois drills
et ne se compense pas.

| Verification | Portee | Verdict |
| --- | --- | --- |
| Jalon ${j.n} TECH-ILA franchi | [${j.titre}](${versAnnexe}) | Jalon non franchi = **module non valide**, meme avec trois drills REUSSI |

Niveau attendu, binaire : ${j.attendu}.

Trace exigee : une ligne datee dans ton depot, \`TECH-ILA jalon ${j.n} franchi le <date> : <chemin de l'artefact>\`.
Sans artefact et sans date, le jalon n'a pas eu lieu.
`;
  writeFileSync(cible, texte.trimEnd() + "\n" + bloc);
  console.log(`jalon ${j.n} pose dans ${j.module}/verification_pack/criteres.md`);
}
