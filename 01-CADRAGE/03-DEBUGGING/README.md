---
stability: evolutif
acte: parcours
noyau: oui
route: survie
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "01-CADRAGE/03-DEBUGGING/01-00-why-debugging.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 01-CADRAGE/03-DEBUGGING/01-00-why-debugging.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# MODULE 03 DEBUGGING

> Palier `01-CADRAGE`. Duree estimee : **18 h 45** (29 ressources listées : 27 ressources actives et 2 redirections de compatibilité).

## Sommaire du module

| Fichier                                                                                          | Objet                                                                 | Duree  |
| ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- | ------ |
| [`00-PREREQUIS.md`](00-PREREQUIS.md)                                                             | 00 : Prereq check : Debugging                                         | 15 min |
| [`01-00-why-debugging.md`](01-00-why-debugging.md)                                               | 00 : Pourquoi le debugging                                            | 45 min |
| [`02-read_stack_trace.md`](02-read_stack_trace.md)                                               | LIRE UNE STACK TRACE : LA CARTE QUI TE DIT OÙ LE CODE A EXPLOSÉ       | 45 min |
| [`50-read_stack_trace_minimini_projet.md`](50-read_stack_trace_minimini_projet.md)               | 01 read stack trace minimini projet                                   | 45 min |
| [`03-debug_methodology.md`](03-debug_methodology.md)                                             | DEBUG METHODOLOGY : QUATRE ÉTAPES, ZÉRO HASARD                        | 45 min |
| [`51-debug_methodology_minimini_projet.md`](51-debug_methodology_minimini_projet.md)             | 02 debug methodology minimini projet                                  | 45 min |
| [`04-devtools_debugger.md`](04-devtools_debugger.md)                                             | DEVTOOLS DEBUGGER : LIRE LE CODE EN TRAIN DE S'EXÉCUTER               | 45 min |
| [`52-devtools_debugger_minimini_projet.md`](52-devtools_debugger_minimini_projet.md)             | 03 devtools debugger minimini projet                                  | 45 min |
| [`05-repro_before_fix.md`](05-repro_before_fix.md)                                               | 04 : Reproduis avant de corriger                                      | 45 min |
| [`53-repro_before_fix_minimini_projet.md`](53-repro_before_fix_minimini_projet.md)               | 04 repro before fix minimini projet                                   | 45 min |
| [`06-hypothesis_driven_debug.md`](06-hypothesis_driven_debug.md)                                 | 05 : Debug hypothèse-dirigé                                           | 45 min |
| [`54-hypothesis_driven_debug_minimini_projet.md`](54-hypothesis_driven_debug_minimini_projet.md) | 05 hypothesis driven debug minimini projet                            | 45 min |
| [`07-blind_debug.md`](07-blind_debug.md)                                                         | 06 : Blind Debug                                                      | 45 min |
| [`55-blind_debug_minimini_projet.md`](55-blind_debug_minimini_projet.md)                         | 06 blind debug minimini projet                                        | 45 min |
| [`08-flaky_bugs.md`](08-flaky_bugs.md)                                                           | 07 : Flaky bugs (les bugs non déterministes)                          | 45 min |
| [`56-flaky_bugs_minimini_projet.md`](56-flaky_bugs_minimini_projet.md)                           | 07 flaky bugs minimini projet                                         | 45 min |
| [`19-verification_vs_human_bugs.md`](19-verification_vs_human_bugs.md)                           | Redirection vers la revue de patch consolidée                         | 0 min  |
| [`09-exo_repro_deterministe.md`](09-exo_repro_deterministe.md)                                   | EXO : Reproduction déterministe d'un bug flaky                        | 45 min |
| [`10-CONSIGNE_HYPOTHESES_OBLIGATOIRE.md`](10-CONSIGNE_HYPOTHESES_OBLIGATOIRE.md)                 | CONSIGNE : HYPOTHESES.md OBLIGATOIRE                                  | 45 min |
| [`11-heisenbug_arena.md`](11-heisenbug_arena.md)                                                 | Redirection Heisenbug Arena (hors parcours actif)                     | 0 min  |
| [`18-HUMAIN-VS-VERIFICATION-DIFF.md`](18-HUMAIN-VS-VERIFICATION-DIFF.md)                         | Revue de patch : prouver le comportement, pas deviner l'auteur        | 45 min |
| [`12-HYPOTHESES_EXEMPLE.md`](12-HYPOTHESES_EXEMPLE.md)                                           | Exemple guidé : fuite mémoire (scénario simulé)                       | 45 min |
| [`13-HYPOTHESES_EXEMPLE_REPRO_DETERMINISTE.md`](13-HYPOTHESES_EXEMPLE_REPRO_DETERMINISTE.md)     | HYPOTHESES.md : exemple rempli                                        | 45 min |
| [`16-HYPOTHESES_TEMPLATE.md`](16-HYPOTHESES_TEMPLATE.md)                                         | 16 HYPOTHESES TEMPLATE                                                | 45 min |
| [`14-EXO_LECTURE.md`](14-EXO_LECTURE.md)                                                         | EXO LECTURE : ~20 minutes : un cycle (Debugging)                      | 20 min |
| [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md)                                               | EXO [JEUNE IA] : 01-CADRAGE/03-DEBUGGING                              | 45 min |
| [`15-EXO_DEBUG_AVEUGLE.md`](15-EXO_DEBUG_AVEUGLE.md)                                             | EXO : debugging a l'aveugle (Pierre 5, 11.5)                          | 45 min |
| [`17A-EXO_VERIFICATION.md`](17A-EXO_VERIFICATION.md)                                             | EXO IA MENTEUSE : module 01-CADRAGE/03-DEBUGGING                      | 10 min |
| [`99A-PONT.md`](99A-PONT.md)                                                                     | PONT : de chasser un bug à l'organiser en amont à la gestion d'erreur | 45 min |

Total : **18 h 45**. Le total reprend exactement la somme du tableau ; les deux redirections conservées ne créent pas de travail supplémentaire. Le challenge (1 h 30) est une évaluation séparée et n'est pas ajouté au Total sauf s'il apparaît comme ligne du tableau. Aucun `96-boss-fight.md` distinct n'est fourni dans ce module ; ses checkpoints, gates ou autres critères de sortie déclarés font foi.

## Comment travailler ce module

1. Ouvre d abord le fichier `00_why_*` s il existe : il dit pourquoi le module merite ton temps.
2. Passe le controle de prerequis. Un prerequis manquant se repare en amont, jamais ici.
3. Fais les lecons dans l ordre des numeros. Chaque lecon a un exercice borne : il se rend, il se date.
4. Le grimoire se lit **apres** la pratique, jamais avant : c est une fiche de rappel, pas un cours.
5. Termine le challenge et les critères de sortie déclarés. Un boss-fight séparé n'est obligatoire que si le README local le fournit et l'annonce ; à défaut, les checkpoints et preuves de sortie indiqués ici font foi.

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

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [00 : Prereq check : Debugging](00-PREREQUIS.md)
- [00 : Pourquoi le debugging](01-00-why-debugging.md)
- [Lire une stack trace : la carte qui te dit où le code a explosé](02-read_stack_trace.md)
- [50-read_stack_trace_minimini_projet.md](50-read_stack_trace_minimini_projet.md)
- [Debug methodology : quatre étapes, zéro hasard](03-debug_methodology.md)
- [51-debug_methodology_minimini_projet.md](51-debug_methodology_minimini_projet.md)
- [Devtools debugger : lire le code en train de s'exécuter](04-devtools_debugger.md)
- [52-devtools_debugger_minimini_projet.md](52-devtools_debugger_minimini_projet.md)
- [04 : Reproduis avant de corriger](05-repro_before_fix.md)
- [53-repro_before_fix_minimini_projet.md](53-repro_before_fix_minimini_projet.md)
- [05 : Debug hypothèse-dirigé](06-hypothesis_driven_debug.md)
- [54-hypothesis_driven_debug_minimini_projet.md](54-hypothesis_driven_debug_minimini_projet.md)
- [06 : Blind Debug](07-blind_debug.md)
- [55-blind_debug_minimini_projet.md](55-blind_debug_minimini_projet.md)
- [07 : Flaky bugs (les bugs non déterministes)](08-flaky_bugs.md)
- [56-flaky_bugs_minimini_projet.md](56-flaky_bugs_minimini_projet.md)
- [Revue de patch : prouver le comportement, pas deviner l'auteur](18-HUMAIN-VS-VERIFICATION-DIFF.md)
- [EXO : Reproduction déterministe d'un bug flaky](09-exo_repro_deterministe.md)
- [CONSIGNE : HYPOTHESES.md OBLIGATOIRE](10-CONSIGNE_HYPOTHESES_OBLIGATOIRE.md)
- [Redirection Heisenbug Arena : hors parcours actif](11-heisenbug_arena.md)
- [Ancienne page regroupée : redirection vers la revue de patch](19-verification_vs_human_bugs.md)
- [Exemple guidé : fuite mémoire (scénario simulé)](12-HYPOTHESES_EXEMPLE.md)
- [HYPOTHESES.md : exemple rempli](13-HYPOTHESES_EXEMPLE_REPRO_DETERMINISTE.md)
- [16-HYPOTHESES_TEMPLATE.md](16-HYPOTHESES_TEMPLATE.md)
- [`17_scenarios/`](17_scenarios/README.md)
- [EXO LECTURE : ~20 minutes : un cycle (Debugging)](14-EXO_LECTURE.md)
- [Exercice de vérification canonique : debugging](97-EXO-VERIFICATION.md)
- [EXO : debugging a l'aveugle (Pierre 5, 11.5)](15-EXO_DEBUG_AVEUGLE.md)
- [EXO IA MENTEUSE : module 01-CADRAGE/03-DEBUGGING](17A-EXO_VERIFICATION.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [PONT : de chasser un bug à l'organiser en amont à la gestion d'erreur](99A-PONT.md)
- [Challenge : `03-DEBUGGING`](95-challenge.md)
- [Grimoire : `03-DEBUGGING`](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Kintana est un cas d’étude pédagogique commun, pas un projet personnel imposé. Pour ce module, applique **la notion réellement enseignée ici** à la mission correspondante dans la [carte des missions Kintana par domaine](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). N’utilise pas automatiquement la FAQ IA : elle est réservée aux activités IA/RAG. Le challenge local de ce module reste la source de la consigne et de ses critères ; cette mise en pratique ne crée ni prérequis, ni gate supplémentaire.

## Ressources pratiques associées

- [Préparer l'activité (`SETUP.md`)](SETUP.md) : environnement, prérequis et commandes.

## Exercices de vérification complémentaires

- [18 : Revue de patch fondée sur les preuves](18-HUMAIN-VS-VERIFICATION-DIFF.md) : évaluer le contrat et les comportements sans tenter d’identifier l’auteur.
- [19 : Ancienne page regroupée](19-verification_vs_human_bugs.md) : redirection de compatibilité ; aucune activité distincte.
