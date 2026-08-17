#!/usr/bin/env node
// Garantit qu'aucun .md du depot n'est orphelin : chaque dossier contenant des
// .md recoit (ou voit completer) un README.md avec une section « Contenu du
// dossier » generee, qui cite tous ses fichiers et tous ses sous-dossiers.
// Usage : node outils/generer_index_dossiers.mjs [--verifier]
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join, relative, sep, basename } from "node:path";

const RACINE = process.cwd();
const DEBUT = "<!-- CONTENU-DOSSIER:debut (genere par outils/generer_index_dossiers.mjs) -->";
const FIN = "<!-- CONTENU-DOSSIER:fin -->";
const IGNORE = new Set([".git", "node_modules"]);

function dossiers(dir, acc = []) {
  const entrees = readdirSync(dir).filter((e) => !IGNORE.has(e)).sort();
  const avant = acc.length;
  for (const e of entrees) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) dossiers(p, acc);
  }
  if (entrees.some((e) => e.endsWith(".md")) || acc.length > avant) acc.push(dir);
  return acc;
}

function sousDossiersAvecMd(dir) {
  return readdirSync(dir)
    .filter((e) => !IGNORE.has(e))
    .filter((e) => statSync(join(dir, e)).isDirectory())
    .filter((e) => dossiers(join(dir, e)).length > 0)
    .sort();
}

export function sectionAttendue(dir) {
  const rel = relative(RACINE, dir).split(sep).join("/") || ".";
  const md = readdirSync(dir).filter((e) => e.endsWith(".md") && e !== "README.md").sort();
  const sous = sousDossiersAvecMd(dir);
  const l = [DEBUT, "", "## Contenu du dossier", "", `Liste generee : tout fichier de \`${rel}\` est joignable depuis ici, aucun document n'est laisse sans porte d'entree.`, ""];
  for (const f of md) l.push(`- [${f}](${f})`);
  for (const d of sous) {
    const cible = existsSync(join(dir, d, "README.md")) ? `${d}/README.md` : `${d}/${readdirSync(join(dir, d)).filter((e) => e.endsWith(".md")).sort()[0] ?? ""}`;
    if (cible.endsWith(".md")) l.push(`- [${d}/](${cible})`);
  }
  l.push("", FIN);
  return l.join("\n");
}

function appliquer(dir, verifier) {
  const chemin = join(dir, "README.md");
  const section = sectionAttendue(dir);
  const titre = relative(RACINE, dir).split(sep).join("/") || "racine";
  let texte;
  if (!existsSync(chemin)) {
    texte = ["---", "stability: intemporel", "acte: restituer", "---", "", `# ${titre}`, "", "Porte d'entree du dossier. Le contenu detaille vit dans les fichiers listes ci-dessous.", "", section, ""].join("\n");
  } else {
    const brut = readFileSync(chemin, "utf8");
    const i = brut.indexOf(DEBUT);
    const j = brut.indexOf(FIN);
    texte = i >= 0 && j > i ? brut.slice(0, i) + section + brut.slice(j + FIN.length) : brut.replace(/\s*$/, "") + "\n\n" + section + "\n";
  }
  const actuel = existsSync(chemin) ? readFileSync(chemin, "utf8") : null;
  if (actuel === texte) return false;
  if (!verifier) writeFileSync(chemin, texte);
  return true;
}

if (process.argv[1] && process.argv[1].endsWith("generer_index_dossiers.mjs")) {
const verifier = process.argv.includes("--verifier");
  const cibles = dossiers(RACINE);
  let n = 0;
  for (const d of cibles) if (appliquer(d, verifier)) n++;
  if (verifier) {
    if (n) {
      console.error(`Index de dossiers perime sur ${n} dossier(s) : rejoue node outils/generer_index_dossiers.mjs`);
      process.exit(1);
    }
    console.log("Index de dossiers a jour.");
  } else {
    console.log(`Index de dossiers ecrit : ${n} README mis a jour sur ${cibles.length} dossiers.`);
  }
  
}
