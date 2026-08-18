---
stability: intemporel
acte: appliquer
---

# DEPENDENCY_LEDGER (modele de reference)

-> ~3 min de lecture, puis tu copies ce fichier a la racine de ton propre repo.

## POURQUOI CE FICHIER

Une regle non mesuree reste une croyance. "Je n'abuse pas de l'IA" est une croyance. Une entree datee dans un ledger, c'est une preuve. Ce ledger sert a une chose : rendre visible, chaque semaine, la part reelle de ton code que tu n'aurais pas su ecrire seul. Sans ce chiffre, tu ne sais pas si tu progresses ou si tu t'atrophies.

## COMMENT L'UTILISER

Copie ce fichier a la racine de ton propre repo (pas dans MyFunnyJS, dans **ton** projet). Chaque fin de semaine : une entree. Cinq lignes suffisent. Relire trois mois plus tard doit te dire si la courbe monte, descend, ou stagne.

## FORMAT D'UNE ENTREE

```
## Semaine du 2026-08-10

- Temps de code total : 8h
- Temps avec IA active (Copilot on, chat ouvert) : 5h
- Lignes ecrites sans IA : ~120
- Lignes ecrites avec IA (accept sans reflechir) : ~40
- Lignes ecrites avec IA (accept apres relecture ligne a ligne) : ~90
- Ratio dependance : (40 / 250) = 16% de code non-consciemment ecrit
- Temps de LECTURE de code non-ecrit par toi (legacy, deps, PR d'autres) : 5h30
- Temps d'ECRITURE de code (par toi, IA ou pas) : 2h30
- Ratio lecture/ecriture : 5h30 / 2h30 = 2.2x
- Ce que je n'aurais pas su faire seul : "regex de parsing du header HTTP" -> a re-comprendre lundi
- Verdict honnete : je glisse sur les regex, je dois faire un drill sans IA cette semaine
```

## SEUILS D'ALERTE : DEPENDANCE IA

- **< 10 %** de code non-consciemment ecrit : tu tiens le controle. Continue.
- **10-25 %** : zone normale, mais surveille les patterns recurrents (toujours les memes trucs que tu ne comprends pas ?).
- **> 25 %** deux semaines de suite : declenche un `08_EXO_JEUNE_IA.md` du module concerne. Coupure IA obligatoire jusqu'a ce que tu saches refaire seul ce que tu as accepte sans comprendre.

## SEUILS D'ALERTE : RATIO LECTURE / ECRITURE

Regle de metier : un ingenieur senior lit environ **10x plus de code qu'il n'en ecrit**. Sans mesure, cette regle reste un slogan. Ici on la chiffre.

- **Ratio >= 5x** : tu es dans la posture d'ingenieur. Tu comprends avant d'ajouter. Continue.
- **Ratio 2x a 5x** : zone d'apprenti. Normale au debut du parcours (modules 01 a 10). Passe volontairement plus de temps sur `10_legacy_dungeon`, `12_legacy_takeover`, `05-MAITRISE/06_annexes/23_reading/`.
- **Ratio < 2x deux semaines de suite** : tu ecris plus que tu ne lis. Tu construis sur du sable. Impose-toi une semaine « lecture seule » : un module `EXO_LECTURE.md`, un vrai repo open-source ouvert et annote.
- **Ratio < 1x (tu ecris plus que tu ne lis)** : arret. C'est le profil de l'imposteur assiste par IA. Ferme l'editeur, ouvre du code des autres jusqu'a inverser la balance.

Ces seuils ne sont pas dogmatiques : ce sont des declencheurs de reflexion, pas des couperets. Le seul chiffre malhonnete est celui qu'on ne mesure pas.

## PIEGE CLASSIQUE

Tu vas etre tente de tricher a la baisse (sur la dependance IA) ou a la hausse (sur le temps de lecture). Le ledger ne sert pas a faire joli, il sert a t'attraper toi-meme. Un ledger honnete a 30 % de dependance IA et 1.5x de ratio lecture vaut mille fois plus qu'un ledger malhonnete a 5 % et 12x.

## RESUME

Cinq minutes par semaine. Deux chiffres (dependance IA + ratio lecture/ecriture). Une phrase de verdict. C'est tout. La discipline ne se mesure pas dans l'intention, elle se mesure dans la trace ecrite.

## CARTE DE DÉPENDANCES DU PARCOURS (vivante)

Cette carte remplace l'ancien plan d'entrelacement archivé. Elle est générée à partir des bandeaux `CE MODULE RÉUTILISE` réellement présents dans les modules, avec les chemins de palier actuels. Le fil de lecture reste linéaire : 00-SOCLE, 01-CADRAGE, 02-CONSTRUCTION, 03-PILOTAGE, 04-EPREUVE, 05-MAITRISE. Cette carte dit, pour chaque module, ce qu'il suppose déjà acquis.

| Module (chemin réel) | Ce que le module réutilise |
| --- | --- |
| `00-SOCLE/01_getting_started` | aucun prérequis explicite déclaré |
| `00-SOCLE/03_referentiel` | aucun prérequis explicite déclaré |
| `00-SOCLE/04_fundamentals` | aucun prérequis explicite déclaré |
| `00-SOCLE/05_problem_solving` | aucun prérequis explicite déclaré |
| `01-CADRAGE/02_async` | fonctions et scope (00-SOCLE/04_fundamentals), structures de contrôle (00-SOCLE/04_fundamentals), try/catch synchrone (acquis du socle : 00-SOCLE/04_fundamentals/08b_try_catch_basics.md). |
| `01-CADRAGE/03_debugging` | stack trace (00-SOCLE/04_fundamentals), async & event loop (01-CADRAGE/02_async), try/catch synchrone (acquis du socle : 00-SOCLE/04_fundamentals/08b_try_catch_basics.md). Ce module donne juste assez pour lire une stack trace autour d'une erreur catchée, pas pour maîtriser la gestion d'erreur en profondeur : ça vient au module suivant. |
| `01-CADRAGE/04_error_handling` | try/catch basique (acquis du socle : 00-SOCLE/04_fundamentals/08b_try_catch_basics.md), async & promises (01-CADRAGE/02_async) pour ses sections 04-05 (async_error_traps, error_strategy). |
| `02-CONSTRUCTION/02_mini_projects` | aucun prérequis explicite déclaré |
| `02-CONSTRUCTION/03_testing` | fonctions pures (00-SOCLE/04_fundamentals), async (01-CADRAGE/02_async), erreurs (01-CADRAGE/04_error_handling). |
| `02-CONSTRUCTION/04_math_basics` | types primitifs (00-SOCLE/04_fundamentals), opérateurs (00-SOCLE/04_fundamentals). |
| `02-CONSTRUCTION/05_memory_performance` | closures (00-SOCLE/04_fundamentals), async (01-CADRAGE/02_async), bits & représentation (02-CONSTRUCTION/04_math_basics). |
| `02-CONSTRUCTION/06_data_structures` | objets & tableaux (00-SOCLE/04_fundamentals), big-O (02-CONSTRUCTION/07_algorithms — pas un prérequis : ce module en donne le strict nécessaire, le fond est enseigné là-bas plus tard), mémoire (02-CONSTRUCTION/05_memory_performance). |
| `02-CONSTRUCTION/07_algorithms` | structures de données (02-CONSTRUCTION/06_data_structures), récursion (00-SOCLE/04_fundamentals), async (01-CADRAGE/02_async). |
| `02-CONSTRUCTION/09_functional_js` | fonctions higher-order (00-SOCLE/04_fundamentals), immutabilité (00-SOCLE/04_fundamentals). |
| `02-CONSTRUCTION/10_design_patterns` | FP (02-CONSTRUCTION/09_functional_js), fonctions (00-SOCLE/04_fundamentals). |
| `02-CONSTRUCTION/11_refactoring` | patterns (02-CONSTRUCTION/10_design_patterns), tests (02-CONSTRUCTION/03_testing), code smells (00-SOCLE/04_fundamentals). |
| `02-CONSTRUCTION/12_typescript` | types JS (00-SOCLE/04_fundamentals), types dynamiques (02-CONSTRUCTION/09_functional_js), design patterns (02-CONSTRUCTION/10_design_patterns). |
| `02-CONSTRUCTION/12_typescript/04_typescript_tooling` | aucun prérequis explicite déclaré |
| `02-CONSTRUCTION/13_runtime_env` | event loop (01-CADRAGE/02_async), modules (00-SOCLE/04_fundamentals), mémoire (02-CONSTRUCTION/05_memory_performance). |
| `02-CONSTRUCTION/14_architecture_patterns` | patterns (02-CONSTRUCTION/10_design_patterns), async & I/O (01-CADRAGE/02_async), DB (05-MAITRISE/01_databases — pas un prérequis : ce module en donne le strict nécessaire, le fond est enseigné là-bas plus tard), refactoring (02-CONSTRUCTION/11_refactoring). |
| `02-CONSTRUCTION/16_ddd_contrats` | patterns d'architecture (14_architecture_patterns), frontières et couplage (15-ARCHI-LAB), refactoring (11_refactoring), event-driven (14_architecture_patterns/05_event_driven.md). |
| `02-CONSTRUCTION/17_oop_js` | fonctions (00-SOCLE/04_fundamentals), closures (00-SOCLE/04_fundamentals). |
| `02-CONSTRUCTION/18_web_concepts` | HTTP basics (02-CONSTRUCTION/19_api_craft — pas un prérequis : ce module en donne le strict nécessaire, le fond est enseigné là-bas plus tard), async (01-CADRAGE/02_async). Sécurité (03-PILOTAGE/04_security — pas un prérequis : ce module en donne le strict nécessaire, le fond est enseigné là-bas plus tard) : ce module pointe vers la distinction authentication/authorization, creusée en détail plus tard. |
| `02-CONSTRUCTION/19_api_craft` | HTTP (02-CONSTRUCTION/18_web_concepts), erreurs (01-CADRAGE/04_error_handling). Sécurité (03-PILOTAGE/04_security — pas un prérequis : ce module en donne le strict nécessaire, le fond est enseigné là-bas plus tard) : ce module touche à l'auth et aux headers de base, la profondeur (XSS, CSRF, injection) est vue plus tard. |
| `03-PILOTAGE/02_web_inclusive` | aucun prérequis explicite déclaré |
| `03-PILOTAGE/02_web_inclusive/08_i18n` | aucun prérequis explicite déclaré |
| `03-PILOTAGE/04_security` | input validation (01-CADRAGE/04_error_handling), HTTP (02-CONSTRUCTION/18_web_concepts). |
| `03-PILOTAGE/05_observability` | debugging (01-CADRAGE/03_debugging), erreurs (01-CADRAGE/04_error_handling). |
| `03-PILOTAGE/06_fiabilite_slo` | observabilité (05_observability), sécurité (04_security), gestion d'erreurs (01-CADRAGE/04_error_handling), tests (02-CONSTRUCTION/03_testing). |
| `03-PILOTAGE/07_cloud_foundations` | fiabilité et SLO (06_fiabilite_slo), observabilité (05_observability), sécurité (04_security), runtime (02-CONSTRUCTION/13_runtime_env), architecture (02-CONSTRUCTION/14_architecture_patterns). |
| `03-PILOTAGE/08_produit_cout_roi` | coût des décisions (00-SOCLE/06-MINDSET), découpage de valeur (01-CADRAGE/05-MVP-SPLIT), planification par le risque (01-ROADMAP-RUN), budget cloud (07_cloud_foundations), budget d'erreur (06_fiabilite_slo). |
| `03-PILOTAGE/10_team_craft` | revue de code et lecture de diff (01-CADRAGE/03_debugging, 02-CONSTRUCTION/11_refactoring), communication écrite (technical writing vu en amont dans le curriculum). |
| `03-PILOTAGE/11_leadership_mentorat` | travail d'équipe (10_team_craft), collaboration multi-rôles (09-TEAM-QUEST), revue de code et lecture de diff (01-CADRAGE/03_debugging, 02-CONSTRUCTION/11_refactoring), arbitrage coût/valeur (08_produit_cout_roi). |
| `04-EPREUVE/03_realtime` | async (01-CADRAGE/02_async), event loop et backpressure (01-CADRAGE/02_async/06), réseau (02-CONSTRUCTION/18_web_concepts). |
| `04-EPREUVE/04_ai_native_dev` | debugging (01-CADRAGE/03_debugging), tests (02-CONSTRUCTION/03_testing), esprit critique (00-SOCLE/05_problem_solving). Team craft (03-PILOTAGE/10_team_craft — pas un prérequis : ce module en donne le strict nécessaire, le fond est enseigné là-bas plus tard) : la posture de code review complète est enseignée plus tard, ce module n'utilise que la checklist de base pour la pratique. |
| `05-MAITRISE/01_databases` | structures de données (02-CONSTRUCTION/06_data_structures), async (01-CADRAGE/02_async). Scalabilité (05-MAITRISE/02_scalability — pas un prérequis : ce module en donne le strict nécessaire, le fond est enseigné là-bas plus tard) : ce module pose les bases (index, requêtes), la vraie scalabilité de la couche données est vue plus tard. |
| `05-MAITRISE/02_scalability` | mémoire (02-CONSTRUCTION/05_memory_performance), async (01-CADRAGE/02_async), DB (05-MAITRISE/01_databases), architecture (02-CONSTRUCTION/14_architecture_patterns). |
| `05-MAITRISE/03_edge_cases` | tests (02-CONSTRUCTION/03_testing), debugging (01-CADRAGE/03_debugging), erreurs (01-CADRAGE/04_error_handling), math (02-CONSTRUCTION/04_math_basics). |
| `05-MAITRISE/04_ai_agents_and_autonomy` | aucun prérequis explicite déclaré |
| `05-MAITRISE/06_annexes` | aucun prérequis explicite déclaré |
| `05-MAITRISE/06_annexes/29_toolchain` | aucun prérequis explicite déclaré |
| `05-MAITRISE/07_tools` | runtime (02-CONSTRUCTION/13_runtime_env), modules (00-SOCLE/04_fundamentals), et transversalement tout module ayant produit du code à builder/lint/packager. |
| `05-MAITRISE/08_maitrise_staff_engineer` | capstone livré (04-EPREUVE/06-CAPSTONE-ARENA), bases de données (01_databases), scalabilité (02_scalability), cas limites (03_edge_cases), agents IA (04_ai_agents_and_autonomy), routine de maintien (05-DAY-TO-LEGEND), plus les cinq modules Staff greffés en amont : [02-CONSTRUCTION/16_ddd_contrats](../../02-CONSTRUCTION/16_ddd_contrats/00_why_ddd_contrats.md), [03-PILOTAGE/06_fiabilite_slo](../../03-PILOTAGE/06_fiabilite_slo/00_why_fiabilite_slo.md), [03-PILOTAGE/07_cloud_foundations](../../03-PILOTAGE/07_cloud_foundations/00_why_cloud_foundations.md), [03-PILOTAGE/08_produit_cout_roi](../../03-PILOTAGE/08_produit_cout_roi/00_why_produit_cout_roi.md), [03-PILOTAGE/11_leadership_mentorat](../../03-PILOTAGE/11_leadership_mentorat/00_why_leadership_mentorat.md). |

Règle de nommage verrouillée : un module se cite TOUJOURS avec son préfixe de palier (`03-PILOTAGE/04_security`), jamais par son ancien numéro MyFunnyJS seul (`22_security`). Le test `99-COULISSES/outillage/verifier_numerotation.mjs` refuse toute régression.

