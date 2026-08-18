// B2 — Definition unique du rythme « deux modules, un Boss ».
// Lue par generer_boss.mjs (ecriture) et controle_livraison.mjs (refus).
import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { PALIERS, modulesDe } from "./generer_carte.mjs";

export const PIECES = [
  "01-PROJET-REEL.md",
  "02-CONTRAINTE.md",
  "03-DEFENSE.md",
  "04-VERDICT.md",
];

/** La retro de palier, quand elle existe : c'est le dernier Boss du palier. */
export function retroDe(racine, palier) {
  const base = join(racine, palier);
  const f = readdirSync(base).find((e) => /^RETRO-BLOC-\d/.test(e));
  return f ? `${palier}/${f}` : null;
}

/**
 * Decoupe un palier en groupes de deux modules. Le dernier groupe est porte par
 * la retro du palier quand elle existe, sinon par un dossier Boss ordinaire.
 */
export function groupesDe(racine, palier) {
  const modules = modulesDe(racine, palier);
  const groupes = [];
  for (let i = 0; i < modules.length; i += 2) groupes.push(modules.slice(i, i + 2));
  const retro = retroDe(racine, palier);
  return groupes.map((modules, i) => {
    const dernier = i === groupes.length - 1;
    return {
      palier,
      rang: i + 1,
      modules,
      dernier,
      porteur: dernier && retro ? retro : `${palier}/BOSS-${i + 1}`,
      estRetro: Boolean(dernier && retro),
    };
  });
}

export function tousLesGroupes(racine) {
  return PALIERS.flatMap((p) => groupesDe(racine, p.dossier));
}

/** Le boss-fight deja ecrit d'un des deux modules : on l'absorbe, on ne le recopie pas. */
export function bossFightExistant(racine, palier, module) {
  const rel = `${palier}/${module}/boss-fight.md`;
  return existsSync(join(racine, rel)) && statSync(join(racine, rel)).isFile() ? rel : null;
}
