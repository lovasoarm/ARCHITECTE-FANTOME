// A17 — Definition unique de « module a livrable d'architecture » et de son gate securite.
// Lue par appliquer_gate_securite.mjs (ecriture) et par controle_livraison.mjs (refus).
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { listerFichiers } from "./lib_depot.mjs";

/** Un livrable d'architecture est nomme, jamais devine : ADR, budget, SLO ou schema. */
export const MOTIFS_ARCHITECTURE = [
  /\bADR\b/,
  /BUDGET-CLOUD/i,
  /\bSLO\b/,
  /sch[eé]ma d'architecture/i,
];

export const TITRE_GATE = "## Critere de refus securite (bloquant, ajoute en S-11)";
export const LIGNE_GATE = "Aucun secret en clair, rayon d'impact du livrable ecrit";
export const LIEN_SECURITE = "03-PILOTAGE/04_security/README.md";

/** Tous les verification_pack/criteres.md du depot, chemins relatifs posix. */
export function packs(racine) {
  return listerFichiers(racine, (r) => r.endsWith("verification_pack/criteres.md"));
}

/** Le module porteur d'un pack produit-il un livrable d'architecture ? */
export function estModuleArchitecture(racine, relPack) {
  const moduleDir = dirname(dirname(relPack));
  const base = join(racine, moduleDir);
  if (!existsSync(base)) return false;
  for (const entree of readdirSync(base)) {
    const p = join(base, entree);
    if (!entree.endsWith(".md") || !statSync(p).isFile()) continue;
    const texte = readFileSync(p, "utf8");
    if (MOTIFS_ARCHITECTURE.some((m) => m.test(texte))) return true;
  }
  return false;
}

/** Les packs qui doivent porter le gate securite. */
export function packsSousGate(racine) {
  return packs(racine).filter((p) => estModuleArchitecture(racine, p));
}

/** Un pack porte-t-il le gate ? Binaire, pas d'appreciation. */
export function porteLeGate(racine, relPack) {
  const t = readFileSync(join(racine, relPack), "utf8");
  return /secret/i.test(t) && /rayon d'impact/i.test(t);
}
