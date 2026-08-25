---
stability: evolutif
acte: parcours
noyau: oui
route: survie
---

# MODULE 04 ERROR HANDLING

> Palier `01-CADRAGE`. Duree estimee : **12 h** (17 fichiers de travail).

## Sommaire du module

| Fichier                                                                              | Objet                                                   | Duree  |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------- | ------ |
| [`00-PREREQUIS.md`](00-PREREQUIS.md)                                                 | 00 : Prereq check : Error Handling                      | 15 min |
| [`01-00-why-error-handling.md`](01-00-why-error-handling.md)                         | POURQUOI CE MODULE MÉRITE TON TEMPS : ERROR HANDLING    | 45 min |
| [`02-try_catch_basics.md`](02-try_catch_basics.md)                                   | TRY/CATCH : CE QU'IL ATTRAPE ET CE QU'IL LAISSE FILER   | 45 min |
| [`50-try_catch_basics_minimini_projet.md`](50-try_catch_basics_minimini_projet.md)   | 01 try catch basics minimini projet                     | 45 min |
| [`03-custom_errors.md`](03-custom_errors.md)                                         | CUSTOM ERRORS : LES ERREURS QUI RACONTENT UNE HISTOIRE  | 45 min |
| [`51-custom_errors_minimini_projet.md`](51-custom_errors_minimini_projet.md)         | 02 custom errors minimini projet                        | 45 min |
| [`04-error_propagation.md`](04-error_propagation.md)                                 | PROPAGATION D'ERREURS : QUI CATCH QUOI ET À QUEL NIVEAU | 45 min |
| [`52-error_propagation_minimini_projet.md`](52-error_propagation_minimini_projet.md) | 03 error propagation minimini projet                    | 45 min |
| [`05-async_error_traps.md`](05-async_error_traps.md)                                 | ASYNC ERROR TRAPS : LES ERREURS QUI TOMBENT EN SILENCE  | 45 min |
| [`53-async_error_traps_minimini_projet.md`](53-async_error_traps_minimini_projet.md) | 04 async error traps minimini projet                    | 45 min |
| [`06-error_strategy.md`](06-error_strategy.md)                                       | ERROR STRATEGY : FAIL-FAST, FALLBACK, RETRY             | 45 min |
| [`54-error_strategy_minimini_projet.md`](54-error_strategy_minimini_projet.md)       | 05 error strategy minimini projet                       | 45 min |
| [`90-grimoire.md`](90-grimoire.md)                                                   | Page verrouillée                                        | 30 min |
| [`07-EXO_LECTURE.md`](07-EXO_LECTURE.md)                                             | EXO LECTURE : 15-25 minutes (Error Handling)            | 45 min |
| [`98-EXO-VERIFICATION.md`](98-EXO-VERIFICATION.md)                                   | EXO [JEUNE IA] : 01-CADRAGE/04-ERROR-HANDLING           | 45 min |
| [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md)                                   | EXO IA MENTEUSE : module 01-CADRAGE/04-ERROR-HANDLING   | 45 min |
| [`99A-PONT.md`](99A-PONT.md)                                                         | PONT : de prévoir l'échec à le prouver à les tests      | 45 min |

Total : **12 h**. Le Total reprend exactement la somme du tableau. Le challenge (1 h 30) et le boss (3 h) sont des évaluations séparées et ne sont pas ajoutés au Total sauf s’ils apparaissent comme lignes du tableau.

## Comment travailler ce module

1. Ouvre d abord le fichier `00_why_*` s il existe : il dit pourquoi le module merite ton temps.
2. Passe le controle de prerequis. Un prerequis manquant se repare en amont, jamais ici.
3. Fais les lecons dans l ordre des numeros. Chaque lecon a un exercice borne : il se rend, il se date.
4. Le grimoire se lit **apres** la pratique, jamais avant : c est une fiche de rappel, pas un cours.
5. Le challenge, puis le boss fight, cochent le module. Sans eux, le module est lu, pas acquis.

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

- [00 : Prereq check : Error Handling](00-PREREQUIS.md)
- [Pourquoi ce module mérite ton temps : error handling](01-00-why-error-handling.md)
- [Try/catch : ce qu'il attrape et ce qu'il laisse filer](02-try_catch_basics.md)
- [50-try_catch_basics_minimini_projet.md](50-try_catch_basics_minimini_projet.md)
- [Custom errors : les erreurs qui racontent une histoire](03-custom_errors.md)
- [51-custom_errors_minimini_projet.md](51-custom_errors_minimini_projet.md)
- [Propagation d'erreurs : qui catch quoi et à quel niveau](04-error_propagation.md)
- [52-error_propagation_minimini_projet.md](52-error_propagation_minimini_projet.md)
- [Async error traps : les erreurs qui tombent en silence](05-async_error_traps.md)
- [53-async_error_traps_minimini_projet.md](53-async_error_traps_minimini_projet.md)
- [Error strategy : fail-fast, fallback, retry](06-error_strategy.md)
- [54-error_strategy_minimini_projet.md](54-error_strategy_minimini_projet.md)
- [Page verrouillée](90-grimoire.md)
- [EXO LECTURE : 15-25 minutes (Error Handling)](07-EXO_LECTURE.md)
- [EXO [jeune IA] : 01-cadrage/04-error-handling](98-EXO-VERIFICATION.md)
- [EXO IA MENTEUSE : module 01-CADRAGE/04-ERROR-HANDLING](97-EXO-VERIFICATION.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [PONT : de prévoir l'échec à le prouver à les tests](99A-PONT.md)
- [Challenge : `04-ERROR-HANDLING`](95-challenge.md)
- [Grimoire : `04-ERROR-HANDLING`](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->
