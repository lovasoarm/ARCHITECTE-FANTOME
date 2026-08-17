#!/usr/bin/env node
// Verifie que tous les liens markdown relatifs du repo resolvent vers un
// fichier ou un dossier reellement present, et produit la preuve d'exhaustivite
// VERIFICATION_LIENS.md avec trois nombres auto-calcules :
// fichiers parcourus / liens trouves / liens resolus.
// Usage : node outils/verifier_liens.mjs [racine] [--ecrire]

import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, normalize, relative, sep } from "node:path";

const args = process.argv.slice(2);
const ECRIRE = args.includes("--ecrire");
const RACINE = args.find((a) => !a.startsWith("--")) ?? ".";
export const CIBLE_PREUVE = "VERIFICATION_LIENS.md";

export function* fichiersMd(dir) {
  for (const e of readdirSync(dir).sort()) {
    if (e === ".git" || e === "node_modules") continue;
    const p = join(dir, e);
    if (statSync(p).isDirectory()) yield* fichiersMd(p);
    else if (p.endsWith(".md")) yield p;
  }
}

export function scanner(racine = ".") {
  let fichiers = 0, liens = 0, resolus = 0;
  const casses = [];
  const couples = new Set();
  for (const f of fichiersMd(racine)) {
    fichiers++;
    let texte = readFileSync(f, "utf8");
    texte = texte.replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, "");
    for (const m of texte.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
      const cible = m[1];
      if (/^(https?:|mailto:|#)/.test(cible)) continue;
      liens++;
      const src = relative(racine, f).split(sep).join("/");
      couples.add(`${src} -> ${cible}`);
      const resolu = normalize(join(dirname(f), cible.split("#")[0]));
      if (existsSync(resolu)) resolus++;
      else casses.push(`${src} -> ${cible}`);
    }
  }
  return { fichiers, liens, resolus, casses, couples: couples.size };
}

export function construirePreuve(racine = ".") {
  const r = scanner(racine);
  const out = [];
  out.push("---", "stability: mouvant", "acte: \u00e9valuer", "---", "");
  out.push("# VERIFICATION DES LIENS RELATIFS (g\u00e9n\u00e9r\u00e9)");
  out.push("");
  out.push("Acte attendu : \u00e9valuer.");
  out.push("");
  out.push("> Ce fichier est produit par `node outils/verifier_liens.mjs . --ecrire`.");
  out.push("> Il ne se modifie jamais \u00e0 la main. Le contr\u00f4le de livraison refuse la livraison");
  out.push("> si le p\u00e9rim\u00e8tre d\u00e9clar\u00e9 ici ne couvre pas 100 % des `.md` du d\u00e9p\u00f4t.");
  out.push("");
  out.push("## Les trois nombres qui font la preuve");
  out.push("");
  out.push("| Mesure | Valeur |");
  out.push("| --- | --- |");
  out.push(`| Fichiers \`.md\` parcourus | ${r.fichiers} |`);
  out.push(`| Liens relatifs trouv\u00e9s | ${r.liens} |`);
  out.push(`| Liens relatifs r\u00e9solus | ${r.resolus} |`);
  out.push(`| Couples source vers cible uniques | ${r.couples} |`);
  out.push(`| Liens cass\u00e9s | ${r.casses.length} |`);
  out.push("");
  out.push("P\u00e9rim\u00e8tre : la totalit\u00e9 des fichiers `.md` du d\u00e9p\u00f4t, sans exception ni \u00e9chantillon.");
  out.push("Les liens externes (`http`, `mailto`) et les ancres pures (`#`) sont hors p\u00e9rim\u00e8tre :");
  out.push("ils ne se v\u00e9rifient pas sur disque.");
  out.push("");
  out.push("## Liens cass\u00e9s");
  out.push("");
  if (r.casses.length === 0) out.push("Aucun.");
  else for (const c of r.casses) out.push(`- ${c}`);
  out.push("");
  return { texte: out.join("\n"), ...r };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const p = construirePreuve(RACINE);
  if (ECRIRE) writeFileSync(join(RACINE, CIBLE_PREUVE), p.texte);
  console.log(`Fichiers parcourus : ${p.fichiers} : liens trouves ${p.liens} : resolus ${p.resolus} : CASSES ${p.casses.length}`);
  for (const c of p.casses) console.log(`  ${c}`);
  if (p.casses.length > 0) process.exit(1);
}
