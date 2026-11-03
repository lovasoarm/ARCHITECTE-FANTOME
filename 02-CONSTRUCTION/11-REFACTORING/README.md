---
stability: evolutif
acte: parcours
noyau: oui
route: complete
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "02-CONSTRUCTION/11-REFACTORING/01-00-why-refactoring.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 02-CONSTRUCTION/11-REFACTORING/01-00-why-refactoring.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# MODULE 11 REFACTORING

> Palier `02-CONSTRUCTION`. Duree estimee : **14 h 05** (21 fichiers de travail).

## Sommaire du module

| Fichier                                                                              | Objet                                                           | Duree  |
| ------------------------------------------------------------------------------------ | --------------------------------------------------------------- | ------ |
| [`00-PREREQUIS.md`](00-PREREQUIS.md)                                                 | 00 : Prereq check : Refactoring                                 | 15 min |
| [`02-smell_detection.md`](02-smell_detection.md)                                     | 00 : Smell detection                                            | 45 min |
| [`01-00-why-refactoring.md`](01-00-why-refactoring.md)                               | POURQUOI CE MODULE MÉRITE TON TEMPS : REFACTORING               | 45 min |
| [`03-clean_code_basics.md`](03-clean_code_basics.md)                                 | CLEAN CODE BASICS                                               | 45 min |
| [`50-clean_code_basics_minimini_projet.md`](50-clean_code_basics_minimini_projet.md) | 01 clean code basics minimini projet                            | 45 min |
| [`04-solid_principles.md`](04-solid_principles.md)                                   | Renvoi vers la leçon SOLID canonique (pas une séance)           | 5 min  |
| [`51-solid_principles_minimini_projet.md`](51-solid_principles_minimini_projet.md)   | 02 solid principles minimini projet                             | 45 min |
| [`05-code_smells.md`](05-code_smells.md)                                             | CODE SMELLS                                                     | 45 min |
| [`52-code_smells_minimini_projet.md`](52-code_smells_minimini_projet.md)             | 03 code smells minimini projet                                  | 45 min |
| [`06-refacto_in_action.md`](06-refacto_in_action.md)                                 | REFACTO IN ACTION                                               | 45 min |
| [`53-refacto_in_action_minimini_projet.md`](53-refacto_in_action_minimini_projet.md) | 04 refacto in action minimini projet                            | 45 min |
| [`95-challenge.md`](95-challenge.md)                                                 | REFACTO CHALLENGE                                               | 90 min |
| [`07-do_not_touch_before_explain.md`](07-do_not_touch_before_explain.md)             | NE TOUCHE À RIEN AVANT DE POUVOIR L'EXPLIQUER                   | 45 min |
| [`08-smell_hunter.md`](08-smell_hunter.md)                                           | 08 : Smell hunter : chasser le code mort et puant               | 45 min |
| [`90-grimoire.md`](90-grimoire.md)                                                   | Page verrouillée                                                | 30 min |
| [`09-EXO_LECTURE.md`](09-EXO_LECTURE.md)                                             | EXO LECTURE : ~20 minutes : un cycle (Refactoring)              | 20 min |
| [`98-EXO-VERIFICATION.md`](98-EXO-VERIFICATION.md)                                   | EXO [JEUNE IA] : 02-CONSTRUCTION/11-REFACTORING                 | 45 min |
| [`10-EXO_CHASSE_AU_CODE_MORT.md`](10-EXO_CHASSE_AU_CODE_MORT.md)                     | EXO : chasse au code mort (15.4)                                | 45 min |
| [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md)                                   | EXO IA MENTEUSE : module 02-CONSTRUCTION/11-REFACTORING         | 10 min |
| [`99-PORTAGE-MENTAL.md`](99-PORTAGE-MENTAL.md)                                       | 99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust         | 45 min |
| [`99A-PONT.md`](99A-PONT.md)                                                         | PONT : de refactorer en JS pur à ajouter des types à TypeScript | 45 min |

Total : **14 h 05**. Le Total reprend exactement la somme du tableau. Le challenge (1 h 30) est une évaluation séparée et n'est pas ajouté au Total sauf s'il apparaît comme ligne du tableau. Aucun `96-boss-fight.md` distinct n'est fourni dans ce module ; ses checkpoints, gates ou autres critères de sortie déclarés font foi.

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

- [00 : Prereq check : Refactoring](00-PREREQUIS.md)
- [00 : Smell detection](02-smell_detection.md)
- [Pourquoi ce module mérite ton temps : refactoring](01-00-why-refactoring.md)
- [Clean code basics](03-clean_code_basics.md)
- [50-clean_code_basics_minimini_projet.md](50-clean_code_basics_minimini_projet.md)
- [Renvoi vers SOLID canonique](04-solid_principles.md) : la leçon est enseignée dans [Architecture Patterns](../14-ARCHITECTURE-PATTERNS/03-solid_principles.md)
- [51-solid_principles_minimini_projet.md](51-solid_principles_minimini_projet.md)
- [Code smells](05-code_smells.md)
- [52-code_smells_minimini_projet.md](52-code_smells_minimini_projet.md)
- [Refacto in action](06-refacto_in_action.md)
- [53-refacto_in_action_minimini_projet.md](53-refacto_in_action_minimini_projet.md)
- [Refacto challenge](95-challenge.md)
- [Ne touche à rien avant de pouvoir l'expliquer](07-do_not_touch_before_explain.md)
- [08 : Smell hunter : chasser le code mort et puant](08-smell_hunter.md)
- [Page verrouillée](90-grimoire.md)
- [EXO LECTURE : ~20 minutes : un cycle (Refactoring)](09-EXO_LECTURE.md)
- [EXO [jeune IA] : 02-construction/11-refactoring](98-EXO-VERIFICATION.md)
- [EXO : chasse au code mort (15.4)](10-EXO_CHASSE_AU_CODE_MORT.md)
- [EXO IA MENTEUSE : module 02-CONSTRUCTION/11-REFACTORING](97-EXO-VERIFICATION.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [PONT : de refactorer en JS pur à ajouter des types à TypeScript](99A-PONT.md)
- [Challenge : `11-REFACTORING`](95-challenge.md)
- [Grimoire : `11-REFACTORING`](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

## Navigation complète des ressources

Les liens ci-dessous donnent accès aux ressources documentaires du module, y compris les sous-dossiers. Le sommaire conserve l’ordre pédagogique recommandé ; cet index n’ajoute pas d’étape obligatoire.

- [`00-PREREQUIS.md`](00-PREREQUIS.md)
- [`01-00-why-refactoring.md`](01-00-why-refactoring.md)
- [`02-smell_detection.md`](02-smell_detection.md)
- [`03-clean_code_basics.md`](03-clean_code_basics.md)
- [`04-solid_principles.md`](04-solid_principles.md)
- [`05-code_smells.md`](05-code_smells.md)
- [`06-refacto_in_action.md`](06-refacto_in_action.md)
- [`07-do_not_touch_before_explain.md`](07-do_not_touch_before_explain.md)
- [`08-smell_hunter.md`](08-smell_hunter.md)
- [`09-EXO_LECTURE.md`](09-EXO_LECTURE.md)
- [`10-EXO_CHASSE_AU_CODE_MORT.md`](10-EXO_CHASSE_AU_CODE_MORT.md)
- [`50-clean_code_basics_minimini_projet.md`](50-clean_code_basics_minimini_projet.md)
- [`51-solid_principles_minimini_projet.md`](51-solid_principles_minimini_projet.md)
- [`52-code_smells_minimini_projet.md`](52-code_smells_minimini_projet.md)
- [`53-refacto_in_action_minimini_projet.md`](53-refacto_in_action_minimini_projet.md)
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

Le module utilise le cas d’étude pédagogique commun [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md) uniquement comme contexte partagé. Pour ce sous-module, applique la mission précise de sa ligne dans la section **Missions ciblées par sous-module** de cette carte ; le challenge local reste la consigne et le critère de validation. Cette référence ne crée ni prérequis ni gate supplémentaire.

## Ressources pratiques associées

- [Atelier de consolidation](ATELIER-CONSOLIDATION.md) : réutiliser les notions du module dans un cas intégré.
- [Corrigé de référence de l'atelier](corriges/ATELIER-CONSOLIDATION-CORRIGE.md) : à consulter après une tentative autonome.
