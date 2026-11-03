---
perishability_id: PER-0004

stability: perissable
route: survie
acte: comprendre
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_type: primary
source_url: https://nodejs.org/en/download/archive/v22.23.4
review_interval: "6 mois"
review_due: "2027-05-03"
source_scope: "Documentation officielle ou source primaire consultée en rapport avec « Lis-moi avant de coder ». La référence soutient le concept/version explicitement indiqué dans cette ressource ; ce statut ne certifie pas chaque phrase, chaque snippet ni l'exécution locale. Les affirmations empiriques et les API versionnées restent limitées au scope ci-dessous."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "OFFICIAL_SOURCE_IDENTITY_AND_CONCEPT_SCOPE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

# Lis-moi avant de coder

Temps de lecture ~2 min

Ce dossier est un **module de mise en route**, pas une lecon de code.
Le premier clic est **`01-START_HERE.md`**. Le document `01A-00-why-getting-started.md` vient juste après pour expliquer la logique de ce palier.

Raisons :

- Ce dossier commence par une explication courte, puis résout le premier besoin concret : disposer d'un environnement et lancer un fichier `.js`.
- Le premier passage est volontairement limité : **ouvrir un terminal, apprendre à se repérer dans le shell, installer Node.js, créer un fichier et l'exécuter**.
- Les notions de programmation sont enseignées ensuite dans `00-SOCLE/04-FUNDAMENTALS`, dans l'ordre du parcours.

## Premier passage : noyau obligatoire

1. `01-START_HERE.md` : porte d'entrée et ordre du premier passage.
2. `01A-00-why-getting-started.md` : pourquoi cette mise en route et ce qu'elle prépare.
3. `04-shell_survival.md` : ouvrir le terminal, repérer le dossier courant et apprendre les commandes de navigation utiles. Les commandes dangereuses sont à observer, jamais à lancer sur ta machine.
4. `02-install.md` : installer Node.js et ouvrir son éditeur. La référence documentaire AF est Node.js `22.23.4` (également déclarée dans `.nvmrc` et les `engines` du sandbox). Suis la version demandée par l'activité ; cette référence n'est pas une preuve que chaque projet a été exécuté ici.
5. `03-day_one.md` : créer un fichier JavaScript, l'exécuter, observer une erreur de syntaxe et la corriger.

## Références à ouvrir au moment utile

- `05-git_101.md` : cycle local `status` / `add` / `commit` ; les opérations distantes ne sont abordées que si une activité les demande. Cette ressource n'est pas un prérequis du premier exercice JavaScript.
- `06-package_managers.md` : npm, pnpm et bun, avant une activité qui installe des dépendances.
- `07-devsec_perso.md` : secrets et sécurité personnelle, avant de manipuler des clés ou des données sensibles.
- `08-PACKAGE_JSON_README.md` : comprendre `package.json` lorsqu'un projet en utilise un.
- `09-ROUTE-SURVIE.md` : voie facultative d'orientation vers l'employabilité ; elle ne remplace pas la route CORE.

## Sortie du noyau de démarrage

Tu dois être capable de :

- ouvrir un terminal et naviguer vers un dossier ;
- vérifier que Node.js répond avec `node -v` ;
- créer puis exécuter un fichier `.js` ;
- lire une erreur simple, trouver le fichier/la ligne et corriger la syntaxe.

Git et les gestionnaires de paquets se valident séparément, juste avant la première activité qui les exige. Ils ne bloquent pas le premier exercice JavaScript. Aucun projet personnel, dépôt distant ou compte GitHub n’est nécessaire pour terminer le noyau de démarrage.

Ensuite, direction le [Prologue](../02-PROLOGUE/README.md). Il conduit au [Référentiel](../03-REFERENTIEL/README.md), puis à Fundamentals : ne saute pas ces étapes de mise en contexte et de construction des repères.

## Ce module reutilise

Rien (c'est le point d'entrée).

<!-- PIECES-MODULE:debut -->

## Les ressources complémentaires du module

- [`00-PREREQUIS.md`](00-PREREQUIS.md) : auto-test d'entrée ; aucun acquis n'est attendu au départ.
- [`95-challenge.md`](95-challenge.md) : vérification facultative du noyau, à utiliser après le premier passage si tu souhaites une seconde vérification. Elle ne crée pas une gate supplémentaire.
- [`90-grimoire.md`](90-grimoire.md) : référence à consulter au besoin, sans mémorisation préalable.

<!-- PIECES-MODULE:fin -->

> **Périmètre de première passe :** seul le noyau obligatoire décrit plus haut est requis pour continuer vers le Prologue. Le challenge 95 est une auto-vérification facultative ; le grimoire est une référence ; le checkpoint 97 est différé et ne constitue pas un gate caché.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Start here](01-START_HERE.md)
- [Auto-test d'entrée : `01-GETTING-STARTED`](00-PREREQUIS.md)
- [Pourquoi ce dossier "getting started" ?](01A-00-why-getting-started.md)
- [01 : Shell : survie en territoire hostile](04-shell_survival.md)
- [02 : Installation pas-à-pas (Windows / macOS / Linux)](02-install.md)
- [03 : DAY ONE (contexte, environnement, premier code)](03-day_one.md)
- [04 : Git : 12 commandes pour ne pas perdre ton code](05-git_101.md)
- [05 : npm / pnpm : ne bloque pas au premier `install`](06-package_managers.md)
- [06 : Devsec perso : protège ton chakra avant d'affronter les ninjas renégats du net](07-devsec_perso.md)
- [`package.json` : mode d'emploi (2 min)](08-PACKAGE_JSON_README.md)
- [Mode Survie : parcours court employable](09-ROUTE-SURVIE.md)
- [Challenge : `01-GETTING-STARTED`](95-challenge.md)
- [Grimoire : `01-GETTING-STARTED`](90-grimoire.md)
- [`97-CHECKPOINT-PACK/`](97-CHECKPOINT-PACK/README.md) : pack de vérification facultatif et différé ; il ne bloque ni le premier exercice ni la sortie du noyau de démarrage.

<!-- CONTENU-DOSSIER:fin -->

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Le module utilise le cas d’étude pédagogique commun [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md) uniquement comme contexte illustratif. La seule pratique requise est le premier cycle local déjà décrit dans `03-day_one.md` : écrire → exécuter → observer → corriger. Il ne faut ni installer Kintana, ni cloner un dépôt, ni produire un livrable métier, ni ouvrir un compte. Les éventuelles missions Kintana sont des approfondissements séparés, différés et soumis à leurs propres prérequis.

## Sources techniques vérifiées : 1er novembre 2026

- [Node.js : calendrier et statuts des versions](https://nodejs.org/en/about/previous-releases) : statut LTS de la branche 22 et distinction entre versions Current, LTS et Alpha.
- [Archive officielle Node.js 22.23.4](https://nodejs.org/en/download/archive/v22.23.4) : archive de référence utilisée par AF ; vérifier la version demandée par l'activité et ne pas remplacer le pin du dépôt sans décision de maintenance.
- [Publication officielle Node.js 22.23.4](https://nodejs.org/en/blog/release/v22.23.4) : publication de sécurité du 21 octobre 2026.
