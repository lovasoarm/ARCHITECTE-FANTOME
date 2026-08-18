// Outil de migration : deplace un fichier .md et repare tous les liens
// (ceux qu'il porte, et ceux qui pointent vers lui).
// usage : node _deplacer.mjs <racine> <ancien> <nouveau> [<ancien> <nouveau> ...]
import { readFileSync, writeFileSync, mkdirSync, renameSync, existsSync } from "node:fs";
import { dirname, join, relative, posix } from "node:path";
import { listerFichiers } from "../lib_depot.mjs";

export function deplacer(racine, paires) {
  const map = new Map(paires);
  // 1. deplacement physique
  for (const [avant, apres] of paires) {
    const src = join(racine, avant);
    const dst = join(racine, apres);
    if (!existsSync(src)) throw new Error(`introuvable : ${avant}`);
    mkdirSync(dirname(dst), { recursive: true });
    renameSync(src, dst);
  }
  // 2. reecriture des liens dans tout le depot
  const inverse = new Map(paires.map(([a, b]) => [b, a]));
  const fichiers = listerFichiers(racine, (rel) => rel.endsWith(".md"));
  let touches = 0;
  for (const rel of fichiers) {
    const abs = join(racine, rel);
    const texte = readFileSync(abs, "utf8");
    // Un fichier deplace resout ses propres liens depuis son ancien dossier.
    const base = posix.dirname(inverse.get(rel) ?? rel);
    const dossier = posix.dirname(rel);
    const remplace = texte.replace(/\]\(([^)\s#]+)([^)]*)\)/g, (tout, chemin, suite) => {
      if (/^[a-z]+:/i.test(chemin) || chemin.startsWith("/")) return tout;
      const cible = posix.normalize(posix.join(base === "." ? "" : base, chemin));
      const nouveau = map.get(cible) ?? (base !== dossier ? cible : null);
      if (!nouveau) return tout;
      let r = posix.relative(dossier === "." ? "" : dossier, nouveau);
      if (!r.startsWith(".")) r = "./" + r;
      return `](${r}${suite})`;
    });
    if (remplace !== texte) {
      writeFileSync(abs, remplace);
      touches++;
    }
  }
  return touches;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [racine, ...reste] = process.argv.slice(2);
  const paires = [];
  for (let i = 0; i < reste.length; i += 2) paires.push([reste[i], reste[i + 1]]);
  const n = deplacer(racine, paires);
  console.log(`${paires.length} fichiers deplaces, ${n} fichiers de liens reecrits.`);
}
