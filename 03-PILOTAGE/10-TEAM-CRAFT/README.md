---
stability: evolutif
acte: parcours
noyau: oui
route: complete
paper_audit_status: STRUCTURE_COMPLETE_EXPERT_REVIEW_PENDING
expert_review: pending
paper_audit_date: 2026-10-30
terrain_validation: NON_CERTIFIEE_DANS_CET_ENVIRONNEMENT
---

# MODULE 10 TEAM CRAFT

> **État pédagogique : 30 octobre 2026 : preuves documentaires complétées.** Les ajouts ciblés couvrent les exemples, pratiques, vérifications et transferts requis pour ce module. Une revue technique indépendante et une validation terrain restent distinctes ; voir [48 : External Review Gate](../../06-ANNEXES-TRANSVERSES/48-EXTERNAL-REVIEW-GATE.md) et [49 : Terrain Maturity Gate](../../06-ANNEXES-TRANSVERSES/49-TERRAIN-MATURITY-GATE.md).

> Palier `03-PILOTAGE`. Duree estimee : **15 h 00** (22 fichiers de travail).

## Sommaire du module

| Fichier                                                        | Objet                                                               | Duree  |
| -------------------------------------------------------------- | ------------------------------------------------------------------- | ------ |
| [`00-PREREQUIS.md`](00-PREREQUIS.md)                           | 00 : Prereq check : Team Craft                                      | 15 min |
| [`01-00-why-team-craft.md`](01-00-why-team-craft.md)           | POURQUOI TEAM CRAFT MÉRITE TON TEMPS                                | 45 min |
| [`02-code_review.md`](02-code_review.md)                       | CODE REVIEW : REVIEWER SANS ÉCRASER                                 | 45 min |
| [`03-adr_writing.md`](03-adr_writing.md)                       | ADR : DOCUMENTER UNE DÉCISION AVANT QU'ELLE DEVIENNE UN MYSTÈRE     | 45 min |
| [`04-technical_writing.md`](04-technical_writing.md)           | TECHNICAL WRITING : ÉCRIRE POUR DES DEVS                            | 45 min |
| [`05-navigate_codebase.md`](05-navigate_codebase.md)           | NAVIGUER UN CODEBASE INCONNU SANS SE PERDRE                         | 45 min |
| [`06-pair_programming.md`](06-pair_programming.md)             | PAIR PROGRAMMING : DEUX CERVEAUX, UN CLAVIER                        | 45 min |
| [`07-mental_health.md`](07-mental_health.md)                   | 06 : Santé mentale du dev : même les Hokages prennent des jours off | 45 min |
| [`08-sprint_hell.md`](08-sprint_hell.md)                       | SPRINT HELL : QUAND PERSONNE NE SAIT CE QU'IL FAUT VRAIMENT LIVRER  | 45 min |
| [`09-how_to_ask.md`](09-how_to_ask.md)                         | How to ask : template                                               | 45 min |
| [`10-dire_je_ne_sais_pas.md`](10-dire_je_ne_sais_pas.md)       | Dire "je ne sais pas" : un pouvoir                                  | 45 min |
| [`11-rfc_simulation.md`](11-rfc_simulation.md)                 | RFC simulation : soumets une décision technique                     | 45 min |
| [`12-tech_pitch.md`](12-tech_pitch.md)                         | Tech pitch : convaincre un pair                                     | 45 min |
| [`13-three_audiences_intro.md`](13-three_audiences_intro.md)   | 3 publics, 1 concept                                                | 45 min |
| [`14-three_audiences_drill.md`](14-three_audiences_drill.md)   | DRILL 3 AUDIENCES : TU EXPLIQUES OU TU NE COMPRENDS PAS             | 45 min |
| [`15-argumentaire_technique.md`](15-argumentaire_technique.md) | ARGUMENTAIRE TECHNIQUE : CONVAINCRE UN PAIR EN 1 PAGE               | 45 min |
| [`90-grimoire.md`](90-grimoire.md)                             | Page verrouillée                                                    | 30 min |
| [`16-EXO_LECTURE.md`](16-EXO_LECTURE.md)                       | EXO LECTURE : 15-25 minutes (Team Craft)                            | 45 min |
| [`98-EXO-VERIFICATION.md`](98-EXO-VERIFICATION.md)             | EXO [JEUNE IA] : 03-PILOTAGE/10-TEAM-CRAFT                          | 45 min |
| [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md)             | EXO IA MENTEUSE : module 03-PILOTAGE/10-TEAM-CRAFT                  | 45 min |
| [`99-PORTAGE-MENTAL.md`](99-PORTAGE-MENTAL.md)                 | 99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust             | 45 min |

Total : **15 h**. Le Total reprend exactement la somme du tableau. Le challenge (1 h 30) et le boss (3 h) sont des évaluations séparées et ne sont pas ajoutés au Total sauf s’ils apparaissent comme lignes du tableau.

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
- [`90-grimoire.md`](90-grimoire.md) : Grimoire : ce que tu dois pouvoir restituer
- [91-90-grimoire.md](91-90-grimoire.md) : pont de compatibilité conservé pour la restitution

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [00 : Prereq check : Team Craft](00-PREREQUIS.md)
- [Pourquoi team craft mérite ton temps](01-00-why-team-craft.md)
- [Code review : reviewer sans écraser](02-code_review.md)
- [ADR : documenter une décision avant qu'elle devienne un mystère](03-adr_writing.md)
- [Technical writing : écrire pour des devs](04-technical_writing.md)
- [Naviguer un codebase inconnu sans se perdre](05-navigate_codebase.md)
- [Pair programming : deux cerveaux, un clavier](06-pair_programming.md)
- [06 : Santé mentale du dev : même les Hokages prennent des jours off](07-mental_health.md)
- [Sprint hell : quand personne ne sait ce qu'il faut vraiment livrer](08-sprint_hell.md)
- [How to ask : template](09-how_to_ask.md)
- [Dire "je ne sais pas" : un pouvoir](10-dire_je_ne_sais_pas.md)
- [RFC simulation : soumets une décision technique](11-rfc_simulation.md)
- [Tech pitch : convaincre un pair](12-tech_pitch.md)
- [3 publics, 1 concept](13-three_audiences_intro.md)
- [Drill 3 audiences : tu expliques ou tu ne comprends pas](14-three_audiences_drill.md)
- [Argumentaire technique : convaincre un pair en 1 page](15-argumentaire_technique.md)
- [Page verrouillée](90-grimoire.md)
- [EXO LECTURE : 15-25 minutes (Team Craft)](16-EXO_LECTURE.md)
- [EXO [jeune IA] : 03-pilotage/10-team-craft](98-EXO-VERIFICATION.md)
- [EXO IA MENTEUSE : module 03-PILOTAGE/10-TEAM-CRAFT](97-EXO-VERIFICATION.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [Challenge : `10-TEAM-CRAFT`](95-challenge.md)
- [Grimoire : `10-TEAM-CRAFT`](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

## Frontière avec TEAM-QUEST

TEAM-CRAFT = construire les règles, standards et habitudes qui rendent la collaboration durable.

## Standard de complétude et audit

## Navigation complète des ressources

Les liens ci-dessous donnent accès aux ressources documentaires du module, y compris les sous-dossiers. Le sommaire conserve l’ordre pédagogique recommandé ; cet index n’ajoute pas d’étape obligatoire.

- [`00-PREREQUIS.md`](00-PREREQUIS.md)
- [`01-00-why-team-craft.md`](01-00-why-team-craft.md)
- [`02-code_review.md`](02-code_review.md)
- [`03-adr_writing.md`](03-adr_writing.md)
- [`04-technical_writing.md`](04-technical_writing.md)
- [`05-navigate_codebase.md`](05-navigate_codebase.md)
- [`06-pair_programming.md`](06-pair_programming.md)
- [`07-mental_health.md`](07-mental_health.md)
- [`08-sprint_hell.md`](08-sprint_hell.md)
- [`09-how_to_ask.md`](09-how_to_ask.md)
- [`10-dire_je_ne_sais_pas.md`](10-dire_je_ne_sais_pas.md)
- [`11-rfc_simulation.md`](11-rfc_simulation.md)
- [`12-tech_pitch.md`](12-tech_pitch.md)
- [`13-three_audiences_intro.md`](13-three_audiences_intro.md)
- [`14-three_audiences_drill.md`](14-three_audiences_drill.md)
- [`15-argumentaire_technique.md`](15-argumentaire_technique.md)
- [`16-EXO_LECTURE.md`](16-EXO_LECTURE.md)
- [`90-grimoire.md`](90-grimoire.md)
- [`91-90-grimoire.md`](91-90-grimoire.md)
- [`95-challenge.md`](95-challenge.md)
- [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md)
- [`98-EXO-VERIFICATION.md`](98-EXO-VERIFICATION.md)
- [`99-PORTAGE-MENTAL.md`](99-PORTAGE-MENTAL.md)
- [`SETUP.md`](SETUP.md)
