// B1 — Definition unique de la route survie (raccourci employabilite).
// La route est un FILTRE sur le fil unique : elle ne duplique aucun contenu.
// Lue par appliquer_route_survie.mjs (ecriture des en-tetes), generer_route_survie.mjs
// (ecriture du fichier de route), generer_carte.mjs (marquage) et controle_livraison.mjs (refus).
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { PALIERS, modulesDe } from "./generer_carte.mjs";
import { groupesDe, PIECES } from "./lib_boss.mjs";

/** Le filtre, dans l'ordre de traversee. Un chemin de module = un dossier du fil unique. */
export const ROUTE = [
  // Socle strictement necessaire
  "00-SOCLE/01_getting_started",
  "00-SOCLE/04_fundamentals",
  "00-SOCLE/05_problem_solving",
  // Cadrage : choisir quoi construire, et savoir quand ca casse
  "01-CADRAGE/01-PROBLEM-HUNT",
  "01-CADRAGE/02_async",
  "01-CADRAGE/03_debugging",
  "01-CADRAGE/04_error_handling",
  "01-CADRAGE/05-MVP-SPLIT",
  // Construction : un mini-projet complet, ses tests, une API
  "02-CONSTRUCTION/02_mini_projects",
  "02-CONSTRUCTION/03_testing",
  "02-CONSTRUCTION/19_api_craft",
  // Pilotage : securite de base et observabilite minimale
  "03-PILOTAGE/04_security",
  "03-PILOTAGE/05_observability",
  "03-PILOTAGE/06_fiabilite_slo",
];

/** Le Boss de sortie : un Boss existant (B2), dont les DEUX modules sont sur la route. */
export const BOSS_SORTIE = "03-PILOTAGE/BOSS-3";

export const FICHIER_ROUTE = "00-SOCLE/01_getting_started/ROUTE-SURVIE.md";
export const CLE = "route";
export const VALEURS = ["survie", "complete"];

export const surLaRoute = (module) => ROUTE.includes(module);

/** Tous les modules du fil unique, dans l'ordre du disque. */
export function tousLesModules(racine) {
  return PALIERS.flatMap((p) => modulesDe(racine, p.dossier).map((m) => `${p.dossier}/${m}`));
}

/** L'en-tete YAML d'un README de module porte-t-il route: survie | complete ? */
export function routeDeclaree(racine, module) {
  const p = join(racine, module, "README.md");
  if (!existsSync(p)) return null;
  const m = readFileSync(p, "utf8").match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  const kv = m[1].match(/^route:\s*(\S+)\s*$/m);
  return kv ? kv[1] : null;
}

/** Le groupe Boss porteur du Boss de sortie, tel que le disque le calcule (B2). */
export function groupeDeSortie(racine) {
  const [palier] = BOSS_SORTIE.split("/");
  return groupesDe(racine, palier).find((g) => g.porteur === BOSS_SORTIE) ?? null;
}

/** Le Boss de sortie est-il complet (4 pieces) et entierement couvert par la route ? */
export function sortieCoherente(racine) {
  const g = groupeDeSortie(racine);
  if (!g) return { ok: false, motif: `${BOSS_SORTIE} n'est plus un Boss calcule depuis le disque` };
  const [palier] = BOSS_SORTIE.split("/");
  const horsRoute = g.modules.filter((m) => !surLaRoute(`${palier}/${m}`));
  if (horsRoute.length)
    return { ok: false, motif: `le Boss de sortie couvre ${horsRoute.join(", ")} hors route survie` };
  const manquantes = PIECES.filter((p) => !existsSync(join(racine, BOSS_SORTIE, p)));
  if (manquantes.length)
    return { ok: false, motif: `${BOSS_SORTIE} n'a pas ses quatre pieces (${manquantes.join(", ")})` };
  return { ok: true, motif: "" };
}
