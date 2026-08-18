#!/usr/bin/env node
// Verrou final : refuse la livraison si une regle de charte est violee.
// node 99-COULISSES/outillage/controle_livraison.mjs --strict [racine]
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { tousLesGroupes, PIECES as PIECES_BOSS } from "./lib_boss.mjs";
import { packs as tousLesPacks, porteLeContrat, LECTURE_INTERDITE } from "./lib_contrat_validation.mjs";
import { packsSousGate, porteLeGate } from "./lib_gate_securite.mjs";
import { blocCheckpoints, DEBUT as CHK_DEBUT, FIN as CHK_FIN, FICHIER as FICHIER_PROGRESSION } from "./generer_progression.mjs";
import { ROUTE as ROUTE_SURVIE, BOSS_SORTIE, FICHIER_ROUTE, VALEURS as ROUTES_VALIDES, tousLesModules, routeDeclaree, sortieCoherente } from "./lib_route_survie.mjs";
import { listerMd, lireFichier, liensRelatifs, resoudre, titreH1, sansCode, empreinteDepot } from "./lib_depot.mjs";

const args = process.argv.slice(2);
const strict = args.includes("--strict");
const racine = args.find((a) => !a.startsWith("--")) ?? ".";

const refus = [];
const avertissements = [];
const refuser = (regle, detail) => refus.push(`${regle} : ${detail}`);
const avertir = (regle, detail) => avertissements.push(`${regle} : ${detail}`);

const md = listerMd(racine);

// 0. Frontiere apprenant / fabrique : la racine ne porte que la liste blanche.
const RACINE_BLANCHE = new Set([
  "README.md", "LICENSE", ".gitignore", "PROGRESSION.md", "PREUVES-STAFF-ENGINEER.md",
  "PREUVES-MODELES", "00-SOCLE", "01-CADRAGE", "02-CONSTRUCTION", "03-PILOTAGE",
  "04-EPREUVE", "05-MAITRISE", "06-ANNEXES-TRANSVERSES", "99-COULISSES",
]);
const IGNORE_RACINE = new Set([".git", "node_modules", ".DS_Store"]);
for (const entree of readdirSync(racine)) {
  if (IGNORE_RACINE.has(entree)) continue;
  if (!RACINE_BLANCHE.has(entree))
    refuser("RACINE", `${entree} est a la racine sans etre dans la liste blanche (voir 99-COULISSES/README.md)`);
}


// 1. En-tete stability: / acte: -> avertissement : les fichiers herites de
// ProjectFunny n'en portent pas, et les ajouter en masse n'est pas une correction
// d'audit mais une reecriture. Le manque est signale, pas bloquant.
// Depuis le LOT 5, le manque est PLAFONNE : la dette est declaree, datee, et ne peut plus croitre.
let manquesEntete = 0;
for (const rel of md) {
  const { entete } = lireFichier(racine, rel);
  if (!entete.stability) { avertir("EN-TETE", `${rel} n'a pas d'en-tete stability:`); manquesEntete += 1; }
  if (!entete.acte) { avertir("EN-TETE", `${rel} n'a pas d'en-tete acte:`); manquesEntete += 1; }
}
{
  const DECISION = "99-COULISSES/archives/DECISION-DETTE-ENTETES-HERITES.md";
  const p = join(racine, DECISION);
  if (!existsSync(p))
    refuser("EN-TETE-DETTE", `${DECISION} manque : les en-tetes herites incomplets ne sont ni resorbes ni declares`);
  else {
    const m = readFileSync(p, "utf8").match(/<!-- PLAFOND-ENTETES:\s*(\d+)\s*-->/);
    if (!m) refuser("EN-TETE-DETTE", `${DECISION} ne declare pas de plafond (<!-- PLAFOND-ENTETES: n -->)`);
    else if (manquesEntete > Number(m[1]))
      refuser("EN-TETE-DETTE", `${manquesEntete} en-tetes incomplets pour un plafond declare a ${m[1]} : complete l'en-tete du fichier ajoute`);
  }
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
  ["99-COULISSES/outillage/VERIFICATION_LIENS.md", "99-COULISSES/outillage/verifier_liens.mjs"],
  ["05-MAITRISE/06_annexes/21_PERISSABILITE_INDEX.md", "99-COULISSES/outillage/generer_perissabilite.mjs"],
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
  if (!existsSync(join(racine, "99-COULISSES/outillage/generer_index_dossiers.mjs")))
    refuser("GENERE-SANS-GENERATEUR", `${rel} porte un index genere sans 99-COULISSES/outillage/generer_index_dossiers.mjs`);
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

// 7. Gate securite (A17) : tout module a livrable d'architecture le porte, sans exception.
{
  for (const pack of packsSousGate(racine)) {
    if (!porteLeGate(racine, pack))
      refuser("GATE-SECURITE", `${pack} porte un livrable d'architecture sans gate securite (secret en clair + rayon d'impact)`);
  }
}


// 8. Ossature des mini-projets : aucun dossier attendu ne doit s'evaporer au clone.
const MINI = "02-CONSTRUCTION/02_mini_projects";
if (existsSync(join(racine, MINI))) {
  for (const projet of readdirSync(join(racine, MINI))) {
    if (!/^\d{2}_/.test(projet)) continue;
    const base = join(racine, MINI, projet);
    if (!statSync(base).isDirectory()) continue;
    for (const sous of ["src", "tests"]) {
      const d = join(base, sous);
      if (!existsSync(d)) continue;
      if (!existsSync(join(d, ".gitkeep")))
        refuser("DOSSIER-VIDE", `${MINI}/${projet}/${sous} n'a pas de .gitkeep : il disparait au clone`);
    }
  }
}


// 9. Le rapport de liens n'est pas falsifiable : son empreinte doit correspondre au disque.
const RAPPORT = "99-COULISSES/outillage/VERIFICATION_LIENS.md";
if (existsSync(join(racine, RAPPORT))) {
  const texte = readFileSync(join(racine, RAPPORT), "utf8");
  const m = texte.match(/empreinte de contenu `([0-9a-f]+)`/);
  const attendue = empreinteDepot(racine);
  if (!m) refuser("RAPPORT-PERIME", `${RAPPORT} ne porte pas son empreinte de contenu`);
  else if (m[1] !== attendue)
    refuser("RAPPORT-PERIME", `${RAPPORT} porte l'empreinte ${m[1]} alors que le disque vaut ${attendue} : regenere-le`);
  if (!/Liens cassés \| 0/.test(texte) && !/\| Liens cassés \| 0 \|/.test(texte))
    avertir("RAPPORT", `${RAPPORT} n'annonce pas 0 lien casse`);
}


// 10. Un seul comptage structurel : tout chiffre de modules/niveaux vient du generateur.
{
  const COMPTE = /\b(\d{1,3})\s+(modules|niveaux)\b/i;
  const VRAI = new Set([String(md.filter((r) => /^0[0-5]-/.test(r)).length)]);
  for (const rel of md) {
    if (rel.startsWith("99-COULISSES/")) continue;
    const brut = readFileSync(join(racine, rel), "utf8");
    if (/Document historique/i.test(brut) || /comptage historique/i.test(brut)) continue;
    if (rel === "00-SOCLE/02-PROLOGUE/03-the-map.md" || rel === "README.md" || rel === FICHIER_ROUTE) continue;
    const m = sansCode(brut).match(COMPTE);
    if (m && /16|32/.test(m[1]))
      refuser("COMPTAGE", `${rel} cite "${m[0]}" hors carte generee et sans estampille historique`);
  }
}


// 11. Aucun prerequis "anticipe" : un module ne peut pas exiger un module ulterieur.
for (const rel of md) {
  if (rel.startsWith("99-COULISSES/")) continue;
  const brut = readFileSync(join(racine, rel), "utf8");
  if (/ anticip(e|\u00e9)\)/.test(sansCode(brut)))
    refuser("PREREQUIS-ANTICIPE", `${rel} presente un module ulterieur comme prerequis`);
}


// 12. Univers narratifs : le lint lit la meme liste blanche que l'apprenant.
{
  const { status } = spawnSync(process.execPath, [join(racine, "99-COULISSES/outillage/verifier_univers.mjs"), racine], { encoding: "utf8" });
  if (status !== 0) refuser("UNIVERS", "verifier_univers.mjs refuse : un univers hors liste blanche est cite");
}


// 13. Gabarit grimoire : cinq colonnes exactes (decision DECISION-GRIMOIRE-5-COLONNES.md).
{
  const CANON = "| Terme | Définition | Code | Analogies | Limite |";
  for (const rel of md) {
    if (rel.startsWith("99-COULISSES/") || !/grimoire[^/]*\.md$/.test(rel)) continue;
    const lignes = readFileSync(join(racine, rel), "utf8").split("\n");
    const entetes = lignes.filter((l) => /^\|\s*Termes?\s*\|/.test(l));
    if (entetes.length === 0) refuser("GRIMOIRE", `${rel} : aucun tableau de grimoire`);
    for (const e of entetes)
      if (e.trim() !== CANON)
        refuser("GRIMOIRE", `${rel} : en-tete "${e.trim()}" au lieu de "${CANON}"`);
  }
}


// 14. Annexes transverses : numerotees par ordre d'appel et rattachees a un module (A14).
{
  const { status } = spawnSync(process.execPath, [join(racine, "99-COULISSES/outillage/verifier_annexes.mjs"), racine], { encoding: "utf8" });
  if (status !== 0) refuser("ANNEXES", "verifier_annexes.mjs refuse : une annexe n'est pas numerotee ou n'a pas de module declencheur");
}



// 15. Jalons TECH-ILA : les six modules declencheurs portent le critere binaire (A13).
{
  const JALONS = [
    "00-SOCLE/01_getting_started",
    "02-CONSTRUCTION/18_web_concepts",
    "02-CONSTRUCTION/19_api_craft",
    "03-PILOTAGE/07_cloud_foundations",
    "05-MAITRISE/02_scalability",
    "04-EPREUVE/04_ai_native_dev",
  ];
  for (const m of JALONS) {
    const p = join(racine, m, "verification_pack/criteres.md");
    if (!existsSync(p)) { refuser("TECH-ILA", `${m} n'a pas de verification_pack/criteres.md pour porter son jalon`); continue; }
    const t = readFileSync(p, "utf8");
    if (!/Jalon TECH-ILA/.test(t) || !/non valide/.test(t))
      refuser("TECH-ILA", `${m}/verification_pack/criteres.md ne porte pas de jalon TECH-ILA bloquant`);
  }
}


// 16. Capstone (A18) : une semaine a double derive, une seule decision rendue.
{
  const DD = "04-EPREUVE/06-CAPSTONE-ARENA/07-semaine-double-derive.md";
  const LIV = "04-EPREUVE/06-CAPSTONE-ARENA/03-deliverables.md";
  if (!existsSync(join(racine, DD))) refuser("DOUBLE-DERIVE", `${DD} manque : le capstone n'a pas de semaine a double derive`);
  else {
    const t = readFileSync(join(racine, DD), "utf8");
    if (!/DECISION-DOUBLE-DERIVE\.md/.test(t) || !/une seule decision/i.test(t))
      refuser("DOUBLE-DERIVE", `${DD} n'exige pas une decision unique absorbant les deux derives`);
  }
  if (existsSync(join(racine, LIV)) && !/DOUBLE DERIVE/.test(readFileSync(join(racine, LIV), "utf8")))
    refuser("DOUBLE-DERIVE", `${LIV} : le calendrier du capstone ne porte pas la semaine a double derive`);
}


// 17. Retro finale (A15) : elle relit le dossier unique, sur artefact, jamais sur lecture.
{
  const R = "05-MAITRISE/RETRO-BLOC-5-MAITRISE.md";
  if (existsSync(join(racine, R))) {
    const t = readFileSync(join(racine, R), "utf8");
    if (!/Relecture du dossier unique/.test(t))
      refuser("RETRO-DOSSIER", `${R} ne relit pas le dossier unique (A15)`);
    for (const attendu of ["trois tensions", "SLO", "ADR", "STANDARDS-AGENTS.md"])
      if (!t.includes(attendu)) refuser("RETRO-DOSSIER", `${R} : critere manquant "${attendu}"`);
    if (/as-tu lu|avez-vous lu/i.test(t)) refuser("RETRO-DOSSIER", `${R} contient un item de lecture ("as-tu lu")`);
  }
}


// 18. Rythme (B2) : deux modules, un Boss. Porteur present, quatre pieces, zero contenu duplique.
{
  const empreintes = new Map();
  for (const g of tousLesGroupes(racine)) {
    if (g.estRetro) {
      const t = existsSync(join(racine, g.porteur)) ? readFileSync(join(racine, g.porteur), "utf8") : "";
      if (!/Boss de palier/.test(t))
        refuser("RYTHME-BOSS", `${g.porteur} ferme un palier sans se declarer Boss de palier`);
      continue;
    }
    for (const piece of PIECES_BOSS) {
      const rel = `${g.porteur}/${piece}`;
      if (!existsSync(join(racine, rel))) { refuser("RYTHME-BOSS", `${rel} manque : ${g.modules.join(" et ")} n'ont pas de Boss`); continue; }
      const corps = readFileSync(join(racine, rel), "utf8").trim();
      const clef = createHash("sha1").update(corps).digest("hex");
      if (empreintes.has(clef)) refuser("RYTHME-BOSS", `${rel} duplique mot pour mot ${empreintes.get(clef)}`);
      else empreintes.set(clef, rel);
    }
  }
}


// 19. Echelle (B3) : six niveaux au premier ecran, chiffres generes, jamais saisis.
{
  const src = readFileSync(join(racine, "README.md"), "utf8");
  const iEchelle = src.indexOf("<!-- ECHELLE:debut");
  if (iEchelle === -1) refuser("ECHELLE", "README.md ne porte plus le bloc ECHELLE genere");
  else {
    const bloc = src.slice(iEchelle, src.indexOf("<!-- ECHELLE:fin -->"));
    for (let n = 0; n <= 5; n += 1)
      if (!bloc.includes(`Niveau ${n} —`)) refuser("ECHELLE", `README.md : le niveau ${n} manque au premier ecran`);
    if (!/Route survie/.test(bloc)) refuser("ECHELLE", "README.md : la route survie n'est pas positionnee sur l'echelle");
    if (src.indexOf("## La promesse") !== -1 && src.indexOf("## La promesse") < iEchelle)
      refuser("ECHELLE", "README.md : l'echelle n'est plus au premier ecran");
    const avant = src.slice(0, iEchelle);
    if (/\b\d+\s+modules\b/.test(avant)) refuser("ECHELLE", "README.md : un nombre de modules est ecrit a la main avant l'echelle generee");
  }
}


// 20. Contrat de validation (B4) : construire, expliquer, justifier, defendre. Zero case « j'ai lu ».
{
  for (const pack of tousLesPacks(racine)) {
    if (!porteLeContrat(racine, pack))
      refuser("CONTRAT-VALIDATION", `${pack} ne porte pas les quatre criteres (construire, expliquer, justifier, defendre)`);
  }
  for (const rel of md) {
    if (LECTURE_INTERDITE.test(readFileSync(join(racine, rel), "utf8")))
      refuser("CONTRAT-VALIDATION", `${rel} propose une validation par lecture (« j'ai lu ») : une lecture ne valide rien`);
  }
}


// 21. Route survie (B1) : un filtre declare sur le fil unique, fini par une soutenance, zero duplication.
{
  const cheminRoute = join(racine, FICHIER_ROUTE);
  if (!existsSync(cheminRoute)) refuser("ROUTE-SURVIE", `${FICHIER_ROUTE} manque : la route survie n'est pas ecrite`);
  else {
    const t = readFileSync(cheminRoute, "utf8");
    if (!/FICHIER GENERE par 99-COULISSES\/outillage\/generer_route_survie\.mjs/.test(t))
      refuser("ROUTE-SURVIE", `${FICHIER_ROUTE} n'est pas estampille comme genere : une route ecrite a la main derive`);
    if (!t.includes(BOSS_SORTIE) || !/soutenance/i.test(t))
      refuser("ROUTE-SURVIE", `${FICHIER_ROUTE} ne se termine pas par un Boss de sortie et une soutenance`);
    for (const attendu of ["n'es pas Staff", "pas architecte", "sans repartir de zero"])
      if (!t.includes(attendu)) refuser("ROUTE-SURVIE", `${FICHIER_ROUTE} : mention manquante "${attendu}"`);
    // Zero duplication : la route ne cite les modules que par lien, jamais en recopiant leur contenu.
    const empreintesModules = new Map();
    for (const m of ROUTE_SURVIE) {
      const p = join(racine, m, "README.md");
      if (existsSync(p)) empreintesModules.set(createHash("sha1").update(readFileSync(p, "utf8").trim()).digest("hex"), m);
    }
    if (empreintesModules.has(createHash("sha1").update(t.trim()).digest("hex")))
      refuser("ROUTE-SURVIE", `${FICHIER_ROUTE} recopie un module au lieu de le filtrer`);
  }
  // Chaque module du fil declare sa route, et seulement une valeur autorisee.
  for (const module of tousLesModules(racine)) {
    const valeur = routeDeclaree(racine, module);
    if (!valeur) { refuser("ROUTE-SURVIE", `${module}/README.md ne declare pas route: survie | complete`); continue; }
    if (!ROUTES_VALIDES.includes(valeur)) refuser("ROUTE-SURVIE", `${module}/README.md declare route: ${valeur}, hors ${ROUTES_VALIDES.join(" | ")}`);
    const attendue = ROUTE_SURVIE.includes(module) ? "survie" : "complete";
    if (valeur !== attendue) refuser("ROUTE-SURVIE", `${module}/README.md declare route: ${valeur} alors que le filtre dit ${attendue}`);
  }
  const coherence = sortieCoherente(racine);
  if (!coherence.ok) refuser("ROUTE-SURVIE", `Boss de sortie incoherent : ${coherence.motif}`);
}


// 22. Progression (B5) : une seule surface de suivi, alimentee par des artefacts, grille a jour.
{
  const p = join(racine, FICHIER_PROGRESSION);
  if (!existsSync(p)) refuser("PROGRESSION", `${FICHIER_PROGRESSION} manque : le depot n'a plus de surface de suivi`);
  else {
    const t = readFileSync(p, "utf8");
    if (t.length < 1500) refuser("PROGRESSION", `${FICHIER_PROGRESSION} est encore un stub : les cinq blocs ne sont pas ecrits`);
    for (const bloc of ["## 1. CHECKPOINTS", "## 2. BILANS", "## 3. BADGES", "## 4. PREUVES VISIBLES", "## 5. RECAPITULATIF DES ACQUIS"])
      if (!t.includes(bloc)) refuser("PROGRESSION", `${FICHIER_PROGRESSION} : bloc manquant "${bloc}"`);
    // La grille de checkpoints doit correspondre au disque (six niveaux B3 x Boss B2).
    const i = t.indexOf(CHK_DEBUT);
    const j = t.indexOf(CHK_FIN);
    if (i === -1 || j === -1) refuser("PROGRESSION", `${FICHIER_PROGRESSION} ne porte pas la grille generee (marqueurs CHECKPOINTS)`);
    else if (t.slice(i, j + CHK_FIN.length).trim() !== blocCheckpoints(racine).trim())
      refuser("PROGRESSION", `${FICHIER_PROGRESSION} : grille de checkpoints perimee, relance generer_progression.mjs`);
    // Un badge ne se coche que sur artefact : les trois etats sont les seuls admis.
    for (const famille of ["S1", "S2", "S3", "S4", "S5", "S6", "S7"])
      if (!t.includes(`| ${famille} —`)) refuser("PROGRESSION", `${FICHIER_PROGRESSION} : famille ${famille} absente du bloc BADGES`);
    if (!/PREUVES-STAFF-ENGINEER\.md/.test(t))
      refuser("PROGRESSION", `${FICHIER_PROGRESSION} : les badges n'adossent pas leurs criteres a PREUVES-STAFF-ENGINEER.md`);
    if (/(?:VIDE|PARTIEL|COUVERT)\s*\|\s*\|?\s*$/m.test("") ) { /* place tenue : etats libres cote apprenant */ }
    const etatsHorsListe = [...t.matchAll(/\| (VIDE|PARTIEL|COUVERT|ACQUIS|EN COURS|TERMINE) \|/g)].map((m) => m[1]).filter((e) => !["VIDE", "PARTIEL", "COUVERT"].includes(e));
    if (etatsHorsListe.length) refuser("PROGRESSION", `${FICHIER_PROGRESSION} : etat de badge hors VIDE | PARTIEL | COUVERT (${etatsHorsListe[0]})`);
  }
  // Surface unique : aucun autre fichier ne tient un tableau d'avancement personnel.
  for (const rel of md) {
    if (rel === FICHIER_PROGRESSION || rel.startsWith("99-COULISSES/")) continue;
    const t = readFileSync(join(racine, rel), "utf8");
    if (/\bmon (?:tableau|plateau) d'avancement\b/i.test(t) || /\bsuivi personnel de progression\b/i.test(t))
      refuser("PROGRESSION", `${rel} ouvre une seconde surface de suivi : PROGRESSION.md est la seule`);
  }
}


console.log(`Controle de livraison : ${md.length} fichiers .md examines, ${refus.length} refus, ${avertissements.length} avertissements.`);
if (avertissements.length) console.log(`  info  ${avertissements.length} en-tetes incomplets (herites, non bloquants).`);
for (const r of refus.slice(0, 200)) console.log(`  REFUS ${r}`);
if (refus.length > 200) console.log(`  ... et ${refus.length - 200} autres refus.`);
process.exit(strict && refus.length > 0 ? 1 : 0);
