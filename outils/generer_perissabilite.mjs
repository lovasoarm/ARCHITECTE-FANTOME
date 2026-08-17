#!/usr/bin/env node
// Genere 05-MAITRISE/06_annexes/21_PERISSABILITE_INDEX.md a partir des en-tetes
// stability: de tous les .md du repo. Le fichier ne peut donc jamais diverger
// du contenu : le controle de livraison rejoue cette generation et compare.
// Usage : node outils/generer_perissabilite.mjs [--verifier]
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const RACINE = process.cwd();
export const CIBLE = "05-MAITRISE/06_annexes/21_PERISSABILITE_INDEX.md";

const RANG = { mouvant: 0, perissable_2027: 1, perissable_2028: 2, perissable_2029: 3, perissable: 4, intemporel: 9 };
const DUREE = {
  mouvant: "quelques mois",
  perissable: "~3 ans",
  intemporel: "5 ans et +",
};
const duree = (s) => DUREE[s] ?? (/^perissable_(\d{4})$/.test(s) ? `jusqu'à ${s.split("_")[1]}` : "inconnue");
const rang = (s) => RANG[s] ?? 5;

function* fichiers(dir) {
  for (const e of readdirSync(dir).sort()) {
    if (e === ".git" || e === "node_modules") continue;
    const p = join(dir, e);
    if (statSync(p).isDirectory()) yield* fichiers(p);
    else if (p.endsWith(".md")) yield p;
  }
}

function raison(rel, stab, corps) {
  if (/\d[\d\s .,]*(?:€|EUR\b)/.test(corps)) return "porte des montants datés, à re-relever selon le protocole de la donnée sourcée";
  if (stab === "intemporel") return "principe stable, indépendant des outils et des offres du moment";
  if (stab === "mouvant") return "suit une pratique qui bouge en continu, à relire à chaque passage";
  return "cite des outils, des versions ou des offres qui vieillissent";
}

export function construire() {
  const lignes = [];
  for (const f of fichiers(RACINE)) {
    const rel = relative(RACINE, f).split(sep).join("/");
    const brut = readFileSync(f, "utf8");
    const fm = brut.match(/^---\n([\s\S]*?)\n---/);
    if (!fm) continue;
    const m = fm[1].match(/^stability:\s*(\S+)\s*$/m);
    if (!m) continue;
    lignes.push({ rel, stab: m[1], raison: raison(rel, m[1], brut.slice(fm[0].length)) });
  }
  lignes.sort((a, b) => rang(a.stab) - rang(b.stab) || a.rel.localeCompare(b.rel, "fr"));

  const compte = {};
  for (const l of lignes) compte[l.stab] = (compte[l.stab] ?? 0) + 1;

  const out = [];
  out.push("---", "stability: intemporel", "acte: \u00e9valuer", "---", "");
  out.push("# INDEX DE PÉRISSABILITÉ (généré)");
  out.push("");
  out.push("Acte attendu : restituer.");
  out.push("");
  out.push("> Ce fichier est produit par `node outils/generer_perissabilite.mjs` à partir des en-têtes `stability:` du dépôt. Ne le modifie jamais à la main : change l'en-tête du fichier concerné, puis rejoue la commande. Le contrôle de livraison refuse la livraison si l'index commité diffère de l'index régénéré.");
  out.push("");
  out.push("## Comment lire cet index");
  out.push("");
  out.push("- **mouvant** : suit une pratique qui bouge en continu, à relire à chaque passage.");
  out.push("- **perissable_AAAA** : à rouvrir avant l'année indiquée, en commençant par la plus proche.");
  out.push("- **perissable** : concepts qui vieillissent en trois ans environ.");
  out.push("- **intemporel** : noyau dur, durable au-delà de cinq ans.");
  out.push("");
  out.push("Le tri place en haut ce qui va vieillir en premier. Un fichier qui porte des montants relève en plus du protocole de la donnée sourcée ([../../06-ANNEXES-TRANSVERSES/meta/PROTOCOLE-DONNEE-SOURCEE.md](../../06-ANNEXES-TRANSVERSES/meta/PROTOCOLE-DONNEE-SOURCEE.md)).");
  out.push("");
  out.push("## Compte par catégorie");
  out.push("");
  out.push("| Catégorie | Fichiers | Durée de vie attendue |");
  out.push("| --- | --- | --- |");
  for (const s of Object.keys(compte).sort((a, b) => rang(a) - rang(b) || a.localeCompare(b))) {
    out.push(`| ${s} | ${compte[s]} | ${duree(s)} |`);
  }
  out.push("");
  out.push(`Total des fichiers portant un en-tête \`stability:\` : ${lignes.length}.`);
  out.push("");
  out.push("## Index détaillé");
  out.push("");
  out.push("| Fichier | Stabilité | Durée de vie | Raison |");
  out.push("| --- | --- | --- | --- |");
  for (const l of lignes) out.push(`| \`${l.rel}\` | ${l.stab} | ${duree(l.stab)} | ${l.raison} |`);
  out.push("");
  return out.join("\n");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const contenu = construire();
  if (process.argv.includes("--verifier")) {
    const actuel = readFileSync(join(RACINE, CIBLE), "utf8");
    if (actuel !== contenu) { console.error("INDEX DE PERISSABILITE PERIME : rejoue node outils/generer_perissabilite.mjs"); process.exit(1); }
    console.log("Index de perissabilite : a jour.");
  } else {
    writeFileSync(join(RACINE, CIBLE), contenu);
    console.log(`Index de perissabilite regenere : ${CIBLE}`);
  }
}
