---
stability: evolutif
acte: parcours
noyau: oui
route: complete
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "05-MAITRISE/03-EDGE-CASES/01-00-why-edge-cases.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 05-MAITRISE/03-EDGE-CASES/01-00-why-edge-cases.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# MODULE 03 EDGE CASES

> Palier `05-MAITRISE`. Duree estimee : **12 h 05** (17 fichiers de travail).

## Sommaire du module

| Fichier                                                                              | Objet                                                          | Duree  |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------- | ------ |
| [`00-PREREQUIS.md`](00-PREREQUIS.md)                                                 | 00 : Prereq check : Edge Cases                                 | 15 min |
| [`01-00-why-edge-cases.md`](01-00-why-edge-cases.md)                                 | POURQUOI EDGE CASES MÉRITE TON TEMPS                           | 45 min |
| [`02-nan_undefined_null.md`](02-nan_undefined_null.md)                               | NaN, UNDEFINED, NULL : TROIS FAÇONS DIFFÉRENTES DE DIRE "RIEN" | 45 min |
| [`03-floating_point.md`](03-floating_point.md)                                       | ARITHMÉTIQUE FLOTTANTE : POURQUOI 0.1 + 0.2 N'EST PAS 0.3      | 45 min |
| [`04-weird_coercions.md`](04-weird_coercions.md)                                     | LES COERCIONS QUI FONT RIRE ET QUI FONT MAL                    | 45 min |
| [`05-prototype_chain_dark.md`](05-prototype_chain_dark.md)                           | LA CHAÎNE PROTOTYPE DANS SES ZONES SOMBRES                     | 45 min |
| [`06-race_condition_hunter.md`](06-race_condition_hunter.md)                         | 05 : Race Condition Hunter                                     | 45 min |
| [`07-heisenbug_arena.md`](07-heisenbug_arena.md)                                     | HEISENBUG ARENA : LE BUG QUI DISPARAÎT QUAND TU LE REGARDES    | 45 min |
| [`90-grimoire.md`](90-grimoire.md)                                                   | Page verrouillée                                               | 30 min |
| [`08-b_race_condition_hunt.md`](08-b_race_condition_hunt.md)                         | 07b : Race Condition Hunt (bouclier senior)                    | 45 min |
| [`09-EXO_LECTURE.md`](09-EXO_LECTURE.md)                                             | EXO LECTURE : ~50 minutes : 3 cycles de 15 min (Edge Cases)    | 50 min |
| [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md)                                   | EXO [JEUNE IA] : 05-MAITRISE/03-EDGE-CASES                     | 45 min |
| [`10-SPEC_DRIFT_DRILL.md`](10-SPEC_DRIFT_DRILL.md)                                   | SPEC_DRIFT_DRILL : 45 min                                      | 45 min |
| [`11-SPEC_FLOU_DRIFT_COMBO_DRILL.md`](11-SPEC_FLOU_DRIFT_COMBO_DRILL.md)             | Drill : spec floue + spec qui dérive (combo)                   | 45 min |
| [`12-specifications-verifiables-agents.md`](12-specifications-verifiables-agents.md) | Spécifications vérifiables pour un changement délégué          | 45 min |
| [`99-PORTAGE-MENTAL.md`](99-PORTAGE-MENTAL.md)                                       | 99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust        | 45 min |
| `99A-PONT.md`                                                                        | PONT 28 -> 29 : edge cases -> agents autonomes                 | 45 min |

Total : **12 h 05**. Le Total reprend exactement la somme du tableau. Le challenge (1 h 30) est une évaluation séparée et n'est pas ajouté au Total sauf s'il apparaît comme ligne du tableau. Aucun `96-boss-fight.md` distinct n'est fourni dans ce module ; ses checkpoints, gates ou autres critères de sortie déclarés font foi.

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

- [00 : Prereq check : Edge Cases](00-PREREQUIS.md)
- [Pourquoi edge cases mérite ton temps](01-00-why-edge-cases.md)
- [NaN, UNDEFINED, NULL : TROIS FAÇONS DIFFÉRENTES DE DIRE "RIEN"](02-nan_undefined_null.md)
- [Arithmétique flottante : pourquoi 0.1 + 0.2 n'est pas 0.3](03-floating_point.md)
- [Les coercions qui font rire et qui font mal](04-weird_coercions.md)
- [La chaîne prototype dans ses zones sombres](05-prototype_chain_dark.md)
- [05 : Race Condition Hunter](06-race_condition_hunter.md)
- [Heisenbug arena : le bug qui disparaît quand tu le regardes](07-heisenbug_arena.md)
- [Page verrouillée](90-grimoire.md)
- [07b : Race Condition Hunt (bouclier senior)](08-b_race_condition_hunt.md)
- [EXO LECTURE : ~50 minutes : 3 cycles de 15 min (Edge Cases)](09-EXO_LECTURE.md)
- [EXO [jeune IA] : 05-maitrise/03-edge-cases](97-EXO-VERIFICATION.md)
- [SPEC_DRIFT_DRILL : 45 min](10-SPEC_DRIFT_DRILL.md)
- [Drill : spec floue + spec qui dérive (combo)](11-SPEC_FLOU_DRIFT_COMBO_DRILL.md)
- [Spécification vérifiable pour un changement délégué](12-specifications-verifiables-agents.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- PONT 28 -> 29 : edge cases -> agents autonomes
- [Challenge : `03-EDGE-CASES`](95-challenge.md)
- [Grimoire : `03-EDGE-CASES`](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

## Navigation complète des ressources

Le sommaire ci-dessus reste le parcours recommandé. Les index ci-dessous rendent accessibles les ressources d'appui et les sous-parcours qui ne sont pas des étapes linéaires supplémentaires.

### Ressources d'appui et vérification

- [PONT : des edge cases au travail durable](99A-PONT.md)

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Le module utilise le cas d’étude pédagogique commun [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). Pour ce bloc, la mission centrale est **incident de demande dupliquée** : Reproduis un incident où un demandeur envoie deux fois la même commande après une réponse lente. Écris les hypothèses, ajoute le signal nécessaire, isole la cause et corrige sans supprimer la preuve du défaut. Le module est validé par une preuve reproductible, un cas limite et une explication du compromis : Le défaut est démontré avant correction ; un test de non-régression échoue avant et passe après ; le postmortem distingue cause et symptôme.

## Ressources pratiques associées

- [Atelier de consolidation](ATELIER-CONSOLIDATION.md) : réutiliser les notions du module dans un cas intégré.
- [Corrigé de référence de l'atelier](corriges/ATELIER-CONSOLIDATION-CORRIGE.md) : à consulter après une tentative autonome.
