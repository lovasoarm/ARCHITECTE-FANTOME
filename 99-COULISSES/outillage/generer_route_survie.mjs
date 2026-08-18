#!/usr/bin/env node
// B1 — Genere 00-SOCLE/01_getting_started/ROUTE-SURVIE.md depuis le disque.
// node 99-COULISSES/outillage/generer_route_survie.mjs [racine]
// Le fichier n'est jamais ecrit a la main : la route est un filtre calcule sur le fil unique.
import { writeFileSync, existsSync, readFileSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { PALIERS } from "./generer_carte.mjs";
import {
  ROUTE, BOSS_SORTIE, FICHIER_ROUTE, tousLesModules, surLaRoute,
  routeDeclaree, groupeDeSortie, sortieCoherente,
} from "./lib_route_survie.mjs";
import { titreH1 } from "./lib_depot.mjs";

const racine = process.argv[2] ?? ".";
const vers = (cible) => relative(dirname(FICHIER_ROUTE), cible).split("\\").join("/");

const modules = tousLesModules(racine);
const inconnus = ROUTE.filter((m) => !modules.includes(m));
if (inconnus.length) {
  console.error(`Route survie incoherente : ${inconnus.join(", ")} n'existe pas sur le disque.`);
  process.exit(1);
}
const sortie = sortieCoherente(racine);
if (!sortie.ok) {
  console.error(`Route survie incoherente : ${sortie.motif}.`);
  process.exit(1);
}

function titre(module) {
  const p = join(racine, module, "README.md");
  if (!existsSync(p)) return module;
  return titreH1(readFileSync(p, "utf8")) ?? module;
}

const parPalier = PALIERS.map((p) => ({
  ...p,
  surRoute: ROUTE.filter((m) => m.startsWith(`${p.dossier}/`)),
  total: modules.filter((m) => m.startsWith(`${p.dossier}/`)).length,
}));

const etapes = ROUTE.map((m, i) => `| ${i + 1} | [\`${m}\`](${vers(m)}) | ${titre(m)} | \`route: ${routeDeclaree(racine, m) ?? "?"}\` |`).join("\n");

const tableauPaliers = parPalier
  .map((p) => `| ${p.dossier} | ${p.surRoute.length} / ${p.total} | ${p.surRoute.length === 0 ? "aucune etape : ce palier appartient a la route complete" : p.capacite} |`)
  .join("\n");

const g = groupeDeSortie(racine);
const horsRoute = modules.filter((m) => !surLaRoute(m));

const texte = `---
stability: stable
acte: pratiquer
route: survie
---

# La route survie : le raccourci employabilite, dit sans mentir

<!-- FICHIER GENERE par 99-COULISSES/outillage/generer_route_survie.mjs — ne pas editer a la main.
     La route est un FILTRE sur le fil unique (cle YAML \`route: survie\` dans l'en-tete de chaque
     module). Aucun contenu n'est duplique ici : chaque etape est un lien vers le module reel. -->

## La scene

Tu n'as pas deux ans devant toi. Tu veux etre **employable** le plus vite possible, sans
te raconter d'histoire sur ce que tu vaux. Cette page est ce chemin : les etapes du fil
unique strictement necessaires, dans l'ordre, et rien d'autre.

Ce n'est pas un second parcours. C'est le **meme fil**, filtre. Les etapes ci-dessous sont
les modules qui portent \`route: survie\` dans leur en-tete ; tous les autres portent
\`route: complete\` et t'attendent apres.

## Les etapes, dans l'ordre de traversee

| # | Module | Titre | En-tete |
| --- | --- | --- | --- |
${etapes}

## Ce que la route prend, palier par palier

| Palier | Etapes retenues | Pourquoi |
| --- | --- | --- |
${tableauPaliers}

## La sortie : un Boss, pas une lecture

La route ne se termine pas quand tu as fini de lire : elle se termine quand tu as passe le
**Boss de sortie** [\`${BOSS_SORTIE}\`](${vers(BOSS_SORTIE)}), qui couvre ${g.modules.map((m) => `\`${m}\``).join(" et ")}.

| Piece du Boss de sortie | Ce que tu produis |
| --- | --- |
| [01-PROJET-REEL.md](${vers(`${BOSS_SORTIE}/01-PROJET-REEL.md`)}) | un livrable qui tourne, pas une maquette |
| [02-CONTRAINTE.md](${vers(`${BOSS_SORTIE}/02-CONTRAINTE.md`)}) | l'auto-audit du livrable sous contrainte |
| [03-DEFENSE.md](${vers(`${BOSS_SORTIE}/03-DEFENSE.md`)}) | la **soutenance** : tu defends tes choix a voix haute |
| [04-VERDICT.md](${vers(`${BOSS_SORTIE}/04-VERDICT.md`)}) | le verdict binaire, ecrit et date |

Tant que la soutenance n'est pas jouee, la route n'est pas finie. Il n'existe aucune autre
facon de la terminer.

## Ce que tu **n'es pas** a la sortie de cette route

Dire l'inverse serait te vendre un titre que personne ne te reconnaitra en entretien.

- Tu **n'es pas Staff Engineer**. Tu n'as ni budget cloud chiffre et source, ni SLO tenable
  demontre, ni dossier soutenu sous contradiction.
- Tu **n'es pas architecte**. Tu n'as pas encore d'ADR chiffres, pas de DDD ni de contrats,
  pas de raisonnement d'echelle.
- Tu **n'as pas prouve les six familles Staff** ([PREUVES-STAFF-ENGINEER.md](${vers("PREUVES-STAFF-ENGINEER.md")})) :
  au mieux, deux d'entre elles sont partielles.
- Ce que tu es : quelqu'un qui **construit, teste, expose une API, la securise a minima,
  l'observe, et defend son livrable**. C'est exactement ce qu'un premier poste demande.

## Ce qu'il te manque, nomme

${horsRoute.length} modules du fil unique restent devant toi, dont l'architecture, le DDD, le cout et le ROI,
la fiabilite avancee, le leadership et le mentorat, l'epreuve sous derive, et la maitrise.
La liste exacte est la carte : [00-SOCLE/02-PROLOGUE/03-the-map.md](${vers("00-SOCLE/02-PROLOGUE/03-the-map.md")}).

## Reprendre la route complete sans repartir de zero

Tu ne recommences rien. La reprise est mecanique :

1. Ouvre [PROGRESSION.md](${vers("PROGRESSION.md")}) : tes checkpoints franchis y sont deja coches.
2. Reprends le fil **au premier module \`route: complete\` que tu as saute**, dans l'ordre de
   la carte : le premier est [\`${horsRoute[0]}\`](${vers(horsRoute[0])}).
3. Les modules deja franchis en route survie ne se refont pas : ils comptent, et leurs Boss
   sont deja coches sur l'echelle du [README racine](${vers("README.md")}).
4. Rien n'est duplique : le contenu que tu retrouveras est le meme fil, la suite du meme
   ordre, avec les Boss qui restent.

## Test de traversee

Le critere de fin de cette route est verifie par la machine, pas par une opinion :
\`node 99-COULISSES/outillage/controle_livraison.mjs\` refuse la livraison si une etape
manque, si un module de la route appelle un prerequis hors route, ou si le Boss de sortie
n'est pas entierement couvert.
`;

writeFileSync(join(racine, FICHIER_ROUTE), texte);
console.log(`Route survie generee : ${ROUTE.length} etapes, Boss de sortie ${BOSS_SORTIE}.`);
