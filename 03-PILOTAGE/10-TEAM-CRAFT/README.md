---
stability: evolutif
acte: parcours
noyau: oui
route: complete
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "03-PILOTAGE/10-TEAM-CRAFT/01-00-why-team-craft.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 03-PILOTAGE/10-TEAM-CRAFT/01-00-why-team-craft.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# MODULE 10 TEAM CRAFT

> Palier `03-PILOTAGE`. Duree estimee : **14 h 30** (22 fichiers de travail).

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
| [`16-EXO_LECTURE.md`](16-EXO_LECTURE.md)                       | EXO LECTURE : ~50 minutes : 3 cycles de 15 min (Team Craft)         | 50 min |
| [`98-EXO-VERIFICATION.md`](98-EXO-VERIFICATION.md)             | EXO [JEUNE IA] : 03-PILOTAGE/10-TEAM-CRAFT                          | 45 min |
| [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md)             | EXO IA MENTEUSE : module 03-PILOTAGE/10-TEAM-CRAFT                  | 10 min |
| [`99-PORTAGE-MENTAL.md`](99-PORTAGE-MENTAL.md)                 | 99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust             | 45 min |

Total : **14 h 30**. Le Total reprend exactement la somme du tableau. Le challenge (1 h 30) est une évaluation séparée et n'est pas ajouté au Total sauf s'il apparaît comme ligne du tableau. Aucun `96-boss-fight.md` distinct n'est fourni dans ce module ; ses checkpoints, gates ou autres critères de sortie déclarés font foi.

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
- [EXO LECTURE : ~50 minutes : 3 cycles de 15 min (Team Craft)](16-EXO_LECTURE.md)
- [EXO [jeune IA] : 03-pilotage/10-team-craft](98-EXO-VERIFICATION.md)
- [EXO IA MENTEUSE : module 03-PILOTAGE/10-TEAM-CRAFT](97-EXO-VERIFICATION.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [Challenge : `10-TEAM-CRAFT`](95-challenge.md)
- [Grimoire : `10-TEAM-CRAFT`](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

## Frontière avec TEAM-QUEST

TEAM-CRAFT = construire les règles, standards et habitudes qui rendent la collaboration durable.

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

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Le module utilise le cas d’étude pédagogique commun [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). Pour ce bloc, la mission centrale est **décision qui traverse les équipes** : Rédige une RFC/ADR sur une décision Kintana qui affecte API, données et exploitation. Compare au moins deux options, demande une revue contradictoire et transforme les objections en critères d’acceptation. Le module est validé par une preuve reproductible, un cas limite et une explication du compromis : La décision a un propriétaire, un coût, un plan de migration et une condition de révision ; l’adoption réelle reste « non démontrée » tant qu’une équipe ne l’a pas adoptée.

## Ressources pratiques associées

- [Atelier de consolidation](ATELIER-CONSOLIDATION.md) : réutiliser les notions du module dans un cas intégré.
- [Corrigé de référence de l'atelier](corriges/ATELIER-CONSOLIDATION-CORRIGE.md) : à consulter après une tentative autonome.
