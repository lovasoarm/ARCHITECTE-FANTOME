// B4 — Contrat de validation unique : construire, expliquer, justifier, defendre.
// Lu par appliquer_contrat_validation.mjs (ecriture) et controle_livraison.mjs (refus).
import { readFileSync } from "node:fs";
import { join, dirname, relative, posix } from "node:path";
import { packs } from "./lib_gate_securite.mjs";

export { packs };
export const TITRE_CONTRAT = "## Contrat de validation (B4, bloquant)";
export const AXES = ["CONSTRUCTION", "EXPLICATION", "JUSTIFICATION", "DEFENSE"];
// Une case a cocher qui se valide en lisant. La prose qui *parle* de lecture reste permise :
// seul le critere coche-moi-j-ai-lu est refuse.
export const LECTURE_INTERDITE = /(?:^|\n)\s*(?:[-*]|\|)\s*\[ \]\s*(?:j'ai |j’ai )?(?:lu|lue|lues|tout lu|lecture)(?:\s+(?:et compris|le module|la section|le chapitre|le fichier))?\s*[.:]?\s*(?=\n|$)/i

/** Chemin relatif d'un pack vers une cible du depot, en posix. */
export function vers(relPack, cible) {
  const d = dirname(relPack);
  return relative(d, cible).split("\\").join("/") || cible;
}

export function bloc(relPack) {
  const contradicteur = vers(relPack, "06-ANNEXES-TRANSVERSES/07-CONTRADICTEUR.md");
  const releve = vers(relPack, "03-PILOTAGE/07_cloud_foundations/RELEVE-REFERENCE-2026.md");
  return `${TITRE_CONTRAT}

Ces quatre criteres precedent les drills et valent pour toute grande section. Ils sont dans cet
ordre, sans variante, et aucun ne se valide en lisant.

| # | Axe | Critere binaire | Verdict si absent |
| --- | --- | --- | --- |
| 1 | CONSTRUCTION | un artefact existe dans le depot du fil rouge : code, schema, budget, SLO ou ADR | **non valide** |
| 2 | EXPLICATION | le meme artefact explique a trois publics : un enfant, un pair, une direction non technique | **non valide** |
| 3 | JUSTIFICATION | pourquoi ce choix plutot qu'un autre, avec au moins un nombre date et source ([releve de reference](${releve})) | **non valide** |
| 4 | DEFENSE | trois objections, trois reponses, une concession ecrite ([contradicteur](${contradicteur})) | **non valide** |

Aucune case de simple lecture n'existe dans ce depot : lire ne valide rien, jamais.

`;
}

export function porteLeContrat(racine, relPack) {
  const t = readFileSync(join(racine, relPack), "utf8");
  return AXES.every((a) => t.includes(a)) && t.includes(TITRE_CONTRAT);
}

export const joindre = posix.join;
