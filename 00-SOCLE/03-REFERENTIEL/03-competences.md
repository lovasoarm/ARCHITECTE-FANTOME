---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [decision_organisationnelle, defaut_cache]
anti_recipe_key: decision_organisationnelle+defaut_cache
transfer_distance: high
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Référentiel de compétences transversales

Temps de lecture ~2 min

Chaque compétence est reliée au module qui la forge. Ce référentiel sert de boussole : si une compétence te manque en entretien, tu sais où retourner.

| Compétence transversale                            | Module associé                                           |
| -------------------------------------------------- | -------------------------------------------------------- |
| Raisonner avant de coder (hypothèses réfutables)   | `00-SOCLE/05-PROBLEM-SOLVING`, `01-CADRAGE/03-DEBUGGING` |
| Reproduire et isoler un bug de façon déterministe  | `01-CADRAGE/03-DEBUGGING`                                |
| Comprendre l'exécution asynchrone (event loop)     | `01-CADRAGE/02-ASYNC`                                    |
| Gérer les erreurs sans masquer la cause            | `01-CADRAGE/04-ERROR-HANDLING`                           |
| Tester une compétence, pas une syntaxe             | `02-CONSTRUCTION/03-TESTING`                             |
| Raisonner sur la mémoire et la performance         | `02-CONSTRUCTION/05-MEMORY-PERFORMANCE`                  |
| Choisir la bonne structure de données              | `02-CONSTRUCTION/06-DATA-STRUCTURES`                     |
| Concevoir et comparer des algorithmes              | `02-CONSTRUCTION/07-ALGORITHMS`                          |
| Penser objets, prototypes et composition           | `02-CONSTRUCTION/17-OOP-JS`                              |
| Refactorer du code existant (SOLID)                | `02-CONSTRUCTION/11-REFACTORING`                         |
| Concevoir une architecture système                 | `02-CONSTRUCTION/14-ARCHITECTURE-PATTERNS`               |
| Sécuriser une application (OWASP)                  | `03-PILOTAGE/04-SECURITY`                                |
| Collaborer avec l'IA sans lui déléguer le jugement | `04-EPREUVE/04-BIG-APP-SNOOP`                            |
| Transférer sa pensée hors de JS                    | `05-MAITRISE/06-ANNEXES/30_transferability`              |
| Défendre ses choix à l'oral                        | `05-MAITRISE/06-ANNEXES/19_interview`                    |

Note : le debugging est traité dans son module dédié, `01-CADRAGE/03-DEBUGGING`.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.
