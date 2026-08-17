// Controles d'accentuation (bloc B1).
// 20 : aucun fichier .md de plus de 200 mots sans le moindre accent francais.
// 21 : aucun fichier dont le ratio accents/mots est anormalement bas face a la
//      mediane du depot (seuil : 35 % de la mediane).
// Les fichiers listes dans outils/accents_baseline.txt sont des ecarts connus,
// deja inventories : ils ne bloquent pas la livraison mais toute NOUVELLE
// violation, elle, la refuse.
// Usage direct : node outils/controle_accents.mjs   (depuis la racine du repo)
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ACC = /[\u00e0\u00e2\u00e4\u00e7\u00e9\u00e8\u00ea\u00eb\u00ee\u00ef\u00f4\u00f6\u00f9\u00fb\u00fc\u00ff\u0153\u00e6\u00c0\u00c2\u00c4\u00c7\u00c9\u00c8\u00ca\u00cb\u00ce\u00cf\u00d4\u00d6\u00d9\u00db\u00dc\u0178\u0152\u00c6]/g;
const SEUIL_MOTS = 200;
const FACTEUR = 0.35;
export const BASELINE = "outils/accents_baseline.txt";

function listerMd(root) {
  const out = [];
  (function walk(d) {
    for (const e of readdirSync(d)) {
      if (e === ".git" || e === "node_modules") continue;
      const p = join(d, e);
      statSync(p).isDirectory() ? walk(p) : p.endsWith(".md") && out.push(p);
    }
  })(root);
  return out;
}

export function mesurer(root = process.cwd()) {
  const stats = [];
  for (const f of listerMd(root)) {
    const txt = readFileSync(f, "utf8");
    const mots = (txt.match(/[A-Za-z\u00c0-\u00ff]{2,}/g) || []).length;
    if (!mots) continue;
    const accents = (txt.match(ACC) || []).length;
    stats.push({ fichier: relative(root, f).split(sep).join("/"), mots, accents, ratio: accents / mots });
  }
  const gros = stats.filter((s) => s.mots > SEUIL_MOTS);
  const tri = gros.map((s) => s.ratio).sort((a, b) => a - b);
  const mediane = tri.length ? tri[Math.floor(tri.length / 2)] : 0;
  const seuil = mediane * FACTEUR;
  return {
    stats, gros, mediane, seuil,
    zero: gros.filter((s) => s.accents === 0),
    bas: gros.filter((s) => s.accents > 0 && s.ratio < seuil),
  };
}

export function connus(root = process.cwd()) {
  const p = join(root, BASELINE);
  if (!existsSync(p)) return new Set();
  return new Set(
    readFileSync(p, "utf8").split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#")),
  );
}

export function violations(root = process.cwd()) {
  const m = mesurer(root);
  const base = connus(root);
  const errs = [];
  for (const s of m.zero)
    if (!base.has(s.fichier)) errs.push(`${s.fichier}:1 : ${s.mots} mots, zero accent (controle 20)`);
  for (const s of m.bas)
    if (!base.has(s.fichier))
      errs.push(`${s.fichier}:1 : ratio accents/mots ${s.ratio.toFixed(4)} sous le seuil ${m.seuil.toFixed(4)} (controle 21)`);
  return errs;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const root = process.argv[2] || process.cwd();
  const m = mesurer(root);
  console.log(`Fichiers .md mesures : ${m.stats.length} (dont ${m.gros.length} de plus de ${SEUIL_MOTS} mots)`);
  console.log(`Mediane ratio accents/mots : ${m.mediane.toFixed(4)} | seuil bas : ${m.seuil.toFixed(4)}`);
  console.log(`Ecarts inventories dans ${BASELINE} : ${connus(root).size}`);
  const errs = violations(root);
  if (errs.length) {
    console.error(`CONTROLE ACCENTS : ECHEC (${errs.length})`);
    for (const e of errs) console.error(" - " + e);
    process.exit(1);
  }
  console.log("CONTROLE ACCENTS : OK (aucune nouvelle violation).");
}
