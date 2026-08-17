#!/usr/bin/env node
// Verrou final : refuse la livraison si une regle de charte est violee.
// node outils/controle_livraison.mjs --strict [racine]
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { listerMd, lireFichier, liensRelatifs, resoudre, titreH1, sansCode } from "./lib_depot.mjs";

const args = process.argv.slice(2);
const strict = args.includes("--strict");
const racine = args.find((a) => !a.startsWith("--")) ?? ".";

const refus = [];
const avertissements = [];
const refuser = (regle, detail) => refus.push(`${regle} : ${detail}`);
const avertir = (regle, detail) => avertissements.push(`${regle} : ${detail}`);

const md = listerMd(racine);

// 1. En-tete stability: / acte: -> avertissement : les fichiers herites de
// ProjectFunny n'en portent pas, et les ajouter en masse n'est pas une correction
// d'audit mais une reecriture. Le manque est signale, pas bloquant.
for (const rel of md) {
  const { entete } = lireFichier(racine, rel);
  if (!entete.stability) avertir("EN-TETE", `${rel} n'a pas d'en-tete stability:`);
  if (!entete.acte) avertir("EN-TETE", `${rel} n'a pas d'en-tete acte:`);
}

// 2. Aucun lien relatif casse.
for (const rel of md) {
  const { corps } = lireFichier(racine, rel);
  for (const lien of liensRelatifs(corps)) {
    const { existe, horsDepot, relCible } = resoudre(racine, rel, lien.chemin);
    if (!existe || horsDepot) refuser("LIEN", `${rel} pointe ${lien.brut} (${relCible}) qui n'existe pas`);
  }
}

// 3. Deux fichiers du meme dossier ne peuvent pas porter le meme titre de niveau 1.
const h1 = new Map();
for (const rel of md) {
  const { corps } = lireFichier(racine, rel);
  const t = titreH1(corps);
  if (!t) continue;
  const dossier = rel.split("/").slice(0, -1).join("/") || ".";
  const cle = `${dossier}::${t.toLowerCase()}`;
  if (h1.has(cle)) refuser("TITRE-DOUBLE", `${dossier} : "${t}" porte par ${h1.get(cle)} et ${rel}`);
  else h1.set(cle, rel);
}

// 4. Un module a exactement un NN_EXO_JEUNE_IA.md, jamais de version non numerotee.
const exos = new Map();
for (const rel of md) {
  if (!rel.endsWith("EXO_JEUNE_IA.md")) continue;
  const nom = rel.split("/").pop();
  const dossier = rel.split("/").slice(0, -1).join("/");
  if (!/^\d{2}_EXO_JEUNE_IA\.md$/.test(nom)) refuser("EXO-JEUNE-IA", `${rel} n'est pas numerote`);
  exos.set(dossier, (exos.get(dossier) ?? 0) + 1);
}
for (const [dossier, n] of exos) if (n > 1) refuser("EXO-JEUNE-IA", `${dossier} porte ${n} exercices de jeune IA`);

// 5. Aucun fichier genere ne survit sans son generateur.
const GENERES = [
  ["VERIFICATION_LIENS.md", "outils/verifier_liens.mjs"],
  ["05-MAITRISE/06_annexes/21_PERISSABILITE_INDEX.md", "outils/generer_perissabilite.mjs"],
];
for (const [genere, generateur] of GENERES) {
  const aGenere = existsSync(join(racine, genere));
  const aGenerateur = existsSync(join(racine, generateur));
  if (aGenere && !aGenerateur) refuser("GENERE-SANS-GENERATEUR", `${genere} est livre sans ${generateur}`);
  if (aGenerateur && !aGenere) refuser("GENERATEUR-SANS-SORTIE", `${generateur} est livre sans ${genere}`);
}
for (const rel of md) {
  const brut = readFileSync(join(racine, rel), "utf8");
  if (!brut.includes("CONTENU-DOSSIER:debut")) continue;
  if (!existsSync(join(racine, "outils/generer_index_dossiers.mjs")))
    refuser("GENERE-SANS-GENERATEUR", `${rel} porte un index genere sans outils/generer_index_dossiers.mjs`);
}

// 6. Protocole de la donnee sourcee : un montant en euros exige une date et une URL.
const MONTANT = /(\d[\d\s.,]*)\s?(€|EUR\b)/;
for (const rel of md) {
  const { corps } = lireFichier(racine, rel);
  const texte = sansCode(corps);
  for (const ligne of texte.split("\n")) {
    if (!ligne.trim().startsWith("|")) continue;
    if (!MONTANT.test(ligne)) continue;
    const date = /\d{4}-\d{2}-\d{2}/.test(ligne) || /relev[eé]/i.test(texte.slice(0, texte.indexOf(ligne)));
    if (!date) refuser("DONNEE-SOURCEE", `${rel} : un montant sans releve date -> ${ligne.trim().slice(0, 80)}`);
    break;
  }
}

// 7. Le gate securite des modules cloud, SLO et DDD doit rester opposable.
const GATES = [
  "03-PILOTAGE/07_cloud_foundations/verification_pack/criteres.md",
  "03-PILOTAGE/06_fiabilite_slo/verification_pack/criteres.md",
  "02-CONSTRUCTION/16_ddd_contrats/verification_pack/criteres.md",
];
for (const g of GATES) {
  const p = join(racine, g);
  if (!existsSync(p)) continue;
  if (!/secret/i.test(readFileSync(p, "utf8")))
    refuser("GATE-SECURITE", `${g} n'a pas de critere binaire de refus securite`);
}

console.log(`Controle de livraison : ${md.length} fichiers .md examines, ${refus.length} refus, ${avertissements.length} avertissements.`);
if (avertissements.length) console.log(`  info  ${avertissements.length} en-tetes incomplets (herites, non bloquants).`);
for (const r of refus.slice(0, 200)) console.log(`  REFUS ${r}`);
if (refus.length > 200) console.log(`  ... et ${refus.length - 200} autres refus.`);
process.exit(strict && refus.length > 0 ? 1 : 0);
