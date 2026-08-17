---
stability: intemporel
acte: appliquer
---

# PONTS INTER-MODULES : la carte

Temps de lecture ~3 min

> Note de structure. Rien à apprendre ici. Table de référence des ponts qui existent entre modules et de la raison de chacun.

## POLITIQUE ÉDITORIALE (v20)

Un pont existe entre deux modules quand **le saut change la nature du travail** : paradigme, échelle de temps, type de responsabilité, ou densité de vocabulaire. Chaque pont tient en 60-100 lignes et suit toujours le même gabarit : ce que tu maîtrises déjà, le vocabulaire qui arrive, le piège mental typique, un exercice-charnière de 5 min.

Les transitions "évidentes" (le sujet évolue mais la posture reste) n'ont pas de pont : chaque module ouvre par son `00_why_*.md` qui te resitue. Si un enchaînement te semble abrupt et qu'il n'a pas de pont, ouvre une issue.

## TABLE DES PONTS

| De | Vers | Fichier | Nature du saut |
|----|------|---------|----------------|
| 00-SOCLE/04_fundamentals | 01-CADRAGE/02_async | `00-SOCLE/04_fundamentals/99_PONT_avant_01-CADRAGE-02_async.md` | Syntaxe séquentielle -> concurrence |
| 00-SOCLE/05_problem_solving | 01-CADRAGE/02_async | `00-SOCLE/05_problem_solving/99_PONT_avant_01-CADRAGE-02_async.md` | Modèle statique -> modèle temporel |
| 01-CADRAGE/02_async | 02-CONSTRUCTION/05_memory_performance | `01-CADRAGE/02_async/99_PONT_avant_02-CONSTRUCTION-05_memory_performance.md` | Opérations -> ressources |
| 01-CADRAGE/03_debugging | 01-CADRAGE/04_error_handling | `01-CADRAGE/03_debugging/99_PONT_avant_01-CADRAGE-04_error_handling.md` | Réagir -> prévoir |
| 01-CADRAGE/04_error_handling | 02-CONSTRUCTION/03_testing | `01-CADRAGE/04_error_handling/99_PONT_avant_02-CONSTRUCTION-03_testing.md` | Prévoir l'échec -> le prouver |
| 02-CONSTRUCTION/03_testing | 02-CONSTRUCTION/04_math_basics | `02-CONSTRUCTION/03_testing/99_PONT_avant_02-CONSTRUCTION-04_math_basics.md` | Prouver -> raisonner sur les nombres |
| 02-CONSTRUCTION/04_math_basics | 02-CONSTRUCTION/05_memory_performance | `02-CONSTRUCTION/04_math_basics/99_PONT_avant_02-CONSTRUCTION-05_memory_performance.md` | Nombres -> ressources |
| 02-CONSTRUCTION/05_memory_performance | 02-CONSTRUCTION/06_data_structures | `02-CONSTRUCTION/05_memory_performance/99_PONT_avant_02-CONSTRUCTION-06_data_structures.md` | Mesure -> choix de structure |
| 02-CONSTRUCTION/06_data_structures | 02-CONSTRUCTION/07_algorithms | `02-CONSTRUCTION/06_data_structures/99_PONT_avant_02-CONSTRUCTION-07_algorithms.md` | Stocker -> traiter |
| 02-CONSTRUCTION/09_functional_js | 02-CONSTRUCTION/10_design_patterns | `02-CONSTRUCTION/09_functional_js/99_PONT_avant_02-CONSTRUCTION-10_design_patterns.md` | Fonctions -> structures d'objets |
| 02-CONSTRUCTION/10_design_patterns | 02-CONSTRUCTION/11_refactoring | `02-CONSTRUCTION/10_design_patterns/99_PONT_avant_02-CONSTRUCTION-11_refactoring.md` | Reconnaître -> réécrire |
| 02-CONSTRUCTION/11_refactoring | 02-CONSTRUCTION/12_typescript | `02-CONSTRUCTION/11_refactoring/99_PONT_avant_02-CONSTRUCTION-12_typescript.md` | Refactor JS -> refactor typé |
| 02-CONSTRUCTION/12_typescript | 02-CONSTRUCTION/13_runtime_env | `02-CONSTRUCTION/12_typescript/99_PONT_avant_02-CONSTRUCTION-13_runtime_env.md` | Types -> runtime |
| 03-PILOTAGE/04_security | 04-EPREUVE/04_ai_native_dev | `03-PILOTAGE/04_security/99_PONT_avant_04-EPREUVE-04_ai_native_dev.md` | Code humain -> code IA |
| 03-PILOTAGE/05_observability | 03-PILOTAGE/10_team_craft | `03-PILOTAGE/05_observability/99_PONT_avant_03-PILOTAGE-10_team_craft.md` | Observer machines -> observer humains |
| 05-MAITRISE/03_edge_cases | 05-MAITRISE/04_ai_agents_and_autonomy | `05-MAITRISE/03_edge_cases/99_PONT_avant_05-MAITRISE-04_ai_agents_and_autonomy.md` | Ingénierie humaine -> délégation |

## LES TRANSITIONS SANS PONT

Toutes les autres transitions du curriculum. Elles ne posent pas de saut de nature : le sujet évolue, la posture reste. Ouvre simplement le `00_why_*.md` du module suivant.

## RÈGLE POUR L'AVENIR

Un nouveau pont s'ajoute **seulement si** la transition change la nature du travail. Pas si elle change juste le sujet. Ça évite la dérive vers 31 ponts creux.
