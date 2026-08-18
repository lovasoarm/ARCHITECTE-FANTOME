// Briques communes aux quatre verrous. Aucune dependance externe : Node >= 18 suffit.
import { readFileSync, readdirSync, statSync } from "node:fs";
import * as nodeCrypto from "node:crypto";
import { join, relative, resolve, dirname, posix } from "node:path";

export const IGNORE = new Set([".git", "node_modules", ".DS_Store"]);

/** Tous les fichiers du depot, chemins relatifs en style posix. */
export function listerFichiers(racine, filtre = () => true) {
  const sortie = [];
  (function marcher(dir) {
    for (const entree of readdirSync(dir, { withFileTypes: true })) {
      if (IGNORE.has(entree.name)) continue;
      const p = join(dir, entree.name);
      if (entree.isDirectory()) marcher(p);
      else {
        const rel = relative(racine, p).split(/[\\/]/).join("/");
        if (filtre(rel)) sortie.push(rel);
      }
    }
  })(racine);
  return sortie.sort();
}

export const listerMd = (racine) => listerFichiers(racine, (r) => r.endsWith(".md"));

/** Le corps du fichier sans son en-tete YAML, plus l'en-tete parse. */
export function lireFichier(racine, rel) {
  const brut = readFileSync(join(racine, rel), "utf8");
  const entete = {};
  let corps = brut;
  const m = brut.match(/^---\n([\s\S]*?)\n---\n?/);
  if (m) {
    corps = brut.slice(m[0].length);
    for (const ligne of m[1].split("\n")) {
      const kv = ligne.match(/^([A-Za-z_]+):\s*(.*)$/);
      if (kv) entete[kv[1]] = kv[2].trim();
    }
  }
  return { brut, corps, entete };
}

/** Retire les blocs de code : un lien cite en exemple n'est pas un lien du depot. */
export function sansCode(texte) {
  return texte.replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]*`/g, "");
}

const LIEN = /\[[^\]\n]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;

/** Les liens relatifs d'un fichier .md, cible nettoyee de son ancre. */
export function liensRelatifs(corps) {
  const out = [];
  for (const m of sansCode(corps).matchAll(LIEN)) {
    const cible = m[1].trim();
    if (/^(https?:|mailto:|tel:|#|data:)/.test(cible)) continue;
    const sansAncre = cible.split("#")[0];
    if (!sansAncre) continue;
    out.push({ brut: cible, chemin: decodeURIComponent(sansAncre) });
  }
  return out;
}

/** Resout un lien relatif et dit s'il existe sur disque. */
export function resoudre(racine, relSource, chemin) {
  const cible = resolve(join(racine, dirname(relSource)), chemin);
  const relCible = relative(racine, cible).split(/[\\/]/).join("/");
  let existe = false;
  try {
    const s = statSync(cible);
    existe = s.isFile() || s.isDirectory();
  } catch {
    existe = false;
  }
  return { relCible, existe, horsDepot: relCible.startsWith("..") };
}

/** Titre de niveau 1 d'un fichier .md, ou null. */
export function titreH1(corps) {
  const m = sansCode(corps).match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : null;
}

export const joindre = posix.join;

/** Empreinte du contenu pedagogique : sha256 de la liste (chemin + sha256) de tous les .md
 *  hors rapports generes. Un .md modifie sans regeneration du rapport change l'empreinte. */
export function empreinteDepot(racine) {
  const { createHash } = nodeCrypto;
  const global = createHash("sha256");
  for (const rel of listerMd(racine)) {
    if (rel === "99-COULISSES/outillage/VERIFICATION_LIENS.md") continue;
    const h = createHash("sha256").update(readFileSync(join(racine, rel))).digest("hex");
    global.update(`${rel}:${h}\n`);
  }
  return global.digest("hex").slice(0, 16);
}

/** Hash court du commit courant, ou "hors-git" si le depot n'est pas un clone git. */
export function commitCourant(racine) {
  try {
    const head = readFileSync(join(racine, ".git/HEAD"), "utf8").trim();
    const ref = head.startsWith("ref: ") ? head.slice(5) : null;
    const sha = ref ? readFileSync(join(racine, ".git", ref), "utf8").trim() : head;
    return sha.slice(0, 7);
  } catch {
    return "hors-git";
  }
}
