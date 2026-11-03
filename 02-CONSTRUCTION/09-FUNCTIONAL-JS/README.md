---
stability: evolutif
acte: parcours
noyau: oui
route: complete
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "02-CONSTRUCTION/09-FUNCTIONAL-JS/01-00-why-functional-js.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 02-CONSTRUCTION/09-FUNCTIONAL-JS/01-00-why-functional-js.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# MODULE 09 FUNCTIONAL JS

> Palier `02-CONSTRUCTION`. Duree estimee : **14 h 45** (21 fichiers de travail).

## Sommaire du module

| Fichier                                                                                  | Objet                                                                 | Duree  |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------ |
| [`00-PREREQUIS.md`](00-PREREQUIS.md)                                                     | 00 : Prereq check : Functional JS                                     | 15 min |
| [`01-00-why-functional-js.md`](01-00-why-functional-js.md)                               | POURQUOI CE MODULE MÉRITE TON TEMPS : FUNCTIONAL JS                   | 45 min |
| [`02-pure_functions.md`](02-pure_functions.md)                                           | FONCTIONS PURES : MÊME INPUT, MÊME OUTPUT, TOUJOURS                   | 45 min |
| [`50-pure_functions_minimini_projet.md`](50-pure_functions_minimini_projet.md)           | 01 pure functions minimini projet                                     | 45 min |
| [`03-immutability.md`](03-immutability.md)                                               | IMMUTABILITÉ : NE PAS MUTER, CRÉER                                    | 45 min |
| [`51-immutability_minimini_projet.md`](51-immutability_minimini_projet.md)               | 02 immutability minimini projet                                       | 45 min |
| [`04-composition.md`](04-composition.md)                                                 | COMPOSITION : ASSEMBLER DES FONCTIONS COMME DES LEGO                  | 45 min |
| [`52-composition_minimini_projet.md`](52-composition_minimini_projet.md)                 | 03 composition minimini projet                                        | 45 min |
| [`05-currying.md`](05-currying.md)                                                       | CURRYING : UNE FONCTION, UN ARGUMENT, TOUJOURS                        | 45 min |
| [`53-currying_minimini_projet.md`](53-currying_minimini_projet.md)                       | 04 currying minimini projet                                           | 45 min |
| [`06-partial_application.md`](06-partial_application.md)                                 | APPLICATION PARTIELLE : FIXER MAINTENANT, PASSER LE RESTE PLUS TARD   | 45 min |
| [`54-partial_application_minimini_projet.md`](54-partial_application_minimini_projet.md) | 05 partial application minimini projet                                | 45 min |
| [`07-iterators_symbol.md`](07-iterators_symbol.md)                                       | ITERATORS ET SYMBOL.ITERATOR : CRÉER DES STRUCTURES QUI SE PARCOURENT | 45 min |
| [`55-iterators_symbol_minimini_projet.md`](55-iterators_symbol_minimini_projet.md)       | 06 iterators symbol minimini projet                                   | 45 min |
| [`95-challenge.md`](95-challenge.md)                                                     | FP CHALLENGE : LE PIPELINE QUI PROUVE QUE C'EST PAS QUE THÉORIQUE     | 90 min |
| [`90-grimoire.md`](90-grimoire.md)                                                       | Page verrouillée                                                      | 30 min |
| [`08-EXO_LECTURE.md`](08-EXO_LECTURE.md)                                                 | EXO LECTURE : ~20 minutes : un cycle (Programmation fonctionnelle)    | 20 min |
| [`98-EXO-VERIFICATION.md`](98-EXO-VERIFICATION.md)                                       | EXO [JEUNE IA] : 02-CONSTRUCTION/09-FUNCTIONAL-JS                     | 45 min |
| [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md)                                       | EXO IA MENTEUSE : module 02-CONSTRUCTION/09-FUNCTIONAL-JS             | 10 min |
| [`99-PORTAGE-MENTAL.md`](99-PORTAGE-MENTAL.md)                                           | 99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust               | 45 min |
| [`99A-PONT.md`](99A-PONT.md)                                                             | PONT : de la pensée fonctionnelle aux design patterns                 | 45 min |

Total : **14 h 45**. Le Total reprend exactement la somme du tableau. Le challenge (1 h 30) est une évaluation séparée et n'est pas ajouté au Total sauf s'il apparaît comme ligne du tableau. Aucun `96-boss-fight.md` distinct n'est fourni dans ce module ; ses checkpoints, gates ou autres critères de sortie déclarés font foi.

## Comment travailler ce module

1. Commence par [`00-PREREQUIS.md`](00-PREREQUIS.md). Si un prérequis échoue, remonte vers la ressource indiquée au lieu de deviner.
2. Lis la leçon « pourquoi ce module » lorsqu'elle figure dans le parcours, puis suis l'ordre du sommaire. Les sous-dossiers ont leur propre README lorsqu'un sous-parcours est nécessaire.
3. Après chaque concept, réalise l'exercice ou le mini-projet explicitement associé. Une leçon peut intégrer sa pratique dans une section `EXERCICES` ; ne suppose pas qu'un fichier séparé existe.
4. Avant toute exécution, lis [`SETUP.md`](SETUP.md) et vérifie la version, le dossier courant, les données de départ et la commande attendue. Lorsqu'un outil externe manque, utilise uniquement le mode papier/simulation décrit par l'activité et marque le résultat comme simulé.
5. Fais le challenge `95-challenge.md`, puis le boss `96-boss-fight.md` **seulement s'il existe dans ce module**. À défaut de boss séparé, le challenge et les checkpoints/critères liés constituent la vérification annoncée : aucun boss non fourni n'est supposé.
6. Le grimoire se lit après la pratique. Consigne la preuve, le résultat des vérifications, les limites non testées et la date dans ton journal de progression.

## Ce que ce module produit dans ton depot fil rouge

Au moins un artefact date et verifiable. Si tu ne peux pas montrer de fichier a la sortie, le module
n est pas fait : relis la liste ci-dessus et rends l exercice manquant.

## Verification

- [ ] Tous les fichiers du tableau sont ouverts et leurs exercices rendus.
- [ ] L artefact produit est cite dans ton journal de progression (`PROGRESSION.md`).

<!-- PIECES-MODULE:debut -->

## Les pièces de ce module

- [`00-PREREQUIS.md`](00-PREREQUIS.md) : Auto-test d'entrée : à passer avant d'ouvrir le module
- [`95-challenge.md`](95-challenge.md) : Challenge : l'épreuve du module
- [94-95-challenge.md](94-95-challenge.md) : pont de compatibilité vers le challenge canonique
- [`90-grimoire.md`](90-grimoire.md) : Grimoire : ce que tu dois pouvoir restituer
- [91-90-grimoire.md](91-90-grimoire.md) : pont de compatibilité conservé pour la restitution

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [00 : Prereq check : Functional JS](00-PREREQUIS.md)
- [Pourquoi ce module mérite ton temps : functional JS](01-00-why-functional-js.md)
- [Fonctions pures : même input, même output, toujours](02-pure_functions.md)
- [50-pure_functions_minimini_projet.md](50-pure_functions_minimini_projet.md)
- [Immutabilité : ne pas muter, créer](03-immutability.md)
- [51-immutability_minimini_projet.md](51-immutability_minimini_projet.md)
- [Composition : assembler des fonctions comme des lego](04-composition.md)
- [52-composition_minimini_projet.md](52-composition_minimini_projet.md)
- [Currying : une fonction, un argument, toujours](05-currying.md)
- [53-currying_minimini_projet.md](53-currying_minimini_projet.md)
- [Application partielle : fixer maintenant, passer le reste plus tard](06-partial_application.md)
- [54-partial_application_minimini_projet.md](54-partial_application_minimini_projet.md)
- [Iterators et symbol.iterator : créer des structures qui se parcourent](07-iterators_symbol.md)
- [55-iterators_symbol_minimini_projet.md](55-iterators_symbol_minimini_projet.md)
- [Fp challenge : le pipeline qui prouve que c'est pas que théorique](95-challenge.md)
- [Page verrouillée](90-grimoire.md)
- [EXO LECTURE : ~20 minutes : un cycle (Programmation fonctionnelle)](08-EXO_LECTURE.md)
- [EXO [jeune IA] : 02-construction/09-functional-js](98-EXO-VERIFICATION.md)
- [EXO IA MENTEUSE : module 02-CONSTRUCTION/09-FUNCTIONAL-JS](97-EXO-VERIFICATION.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [PONT : de la pensée fonctionnelle aux design patterns](99A-PONT.md)
- [Challenge : `09-FUNCTIONAL-JS`](95-challenge.md)
- [Grimoire : `09-FUNCTIONAL-JS`](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

## Navigation complète des ressources

Les liens ci-dessous donnent accès aux ressources documentaires du module, y compris les sous-dossiers. Le sommaire conserve l’ordre pédagogique recommandé ; cet index n’ajoute pas d’étape obligatoire.

- [`00-PREREQUIS.md`](00-PREREQUIS.md)
- [`01-00-why-functional-js.md`](01-00-why-functional-js.md)
- [`02-pure_functions.md`](02-pure_functions.md)
- [`03-immutability.md`](03-immutability.md)
- [`04-composition.md`](04-composition.md)
- [`05-currying.md`](05-currying.md)
- [`06-partial_application.md`](06-partial_application.md)
- [`07-iterators_symbol.md`](07-iterators_symbol.md)
- [`08-EXO_LECTURE.md`](08-EXO_LECTURE.md)
- [`50-pure_functions_minimini_projet.md`](50-pure_functions_minimini_projet.md)
- [`51-immutability_minimini_projet.md`](51-immutability_minimini_projet.md)
- [`52-composition_minimini_projet.md`](52-composition_minimini_projet.md)
- [`53-currying_minimini_projet.md`](53-currying_minimini_projet.md)
- [`54-partial_application_minimini_projet.md`](54-partial_application_minimini_projet.md)
- [`55-iterators_symbol_minimini_projet.md`](55-iterators_symbol_minimini_projet.md)
- [`90-grimoire.md`](90-grimoire.md)
- [`91-90-grimoire.md`](91-90-grimoire.md)
- [`94-95-challenge.md`](94-95-challenge.md)
- [`95-challenge.md`](95-challenge.md)
- [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md)
- [`98-EXO-VERIFICATION.md`](98-EXO-VERIFICATION.md)
- [`99-PORTAGE-MENTAL.md`](99-PORTAGE-MENTAL.md)
- [`99A-PONT.md`](99A-PONT.md)
- [`SETUP.md`](SETUP.md)

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Le module utilise le cas d’étude pédagogique commun [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md) uniquement comme contexte partagé. Pour ce sous-module, applique la mission `02-CONSTRUCTION/09-FUNCTIONAL-JS` de la section **Missions ciblées par sous-module** de cette carte : transformer une demande par composition de fonctions pures, sans mutation ni effet caché. Le challenge local reste la consigne et le critère de validation ; aucune notification asynchrone n’est ajoutée à ce module.

## Ressources pratiques associées

- [Atelier de consolidation](ATELIER-CONSOLIDATION.md) : réutiliser les notions du module dans un cas intégré.
- [Corrigé de référence de l'atelier](corriges/ATELIER-CONSOLIDATION-CORRIGE.md) : à consulter après une tentative autonome.
