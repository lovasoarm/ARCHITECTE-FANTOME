---
stability: intemporel
acte: comprendre
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# PONTS INTER-MODULES : la carte

Temps de lecture ~3 min

> Note de structure. Rien à apprendre ici. Table de référence des ponts qui existent entre modules et de la raison de chacun.

## POLITIQUE ÉDITORIALE

Un pont existe entre deux modules quand **le saut change la nature du travail** : paradigme, échelle de temps, type de responsabilité, ou densité de vocabulaire. Chaque pont tient en 60-100 lignes et suit toujours le même gabarit : ce que tu maîtrises déjà, le vocabulaire qui arrive, le piège mental typique, un exercice-charnière de 5 min.

Les transitions "évidentes" (le sujet évolue mais la posture reste) n'ont pas de pont : chaque module ouvre par son `00_why_*.md` qui te resitue. Si un enchaînement te semble abrupt et qu'il n'a pas de pont, ouvre une issue.

## TABLE DES PONTS

| De                                    | Vers                                  | Fichier                                                                                             | Nature du saut                        |
| ------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------- |
| 00-SOCLE/04-FUNDAMENTALS              | 00-SOCLE/05-PROBLEM-SOLVING           | [99A-PONT.md](../../00-SOCLE/04-FUNDAMENTALS/99A-PONT.md)                                           | Syntaxe -> modélisation               |
| 00-SOCLE/05-PROBLEM-SOLVING           | 01-CADRAGE/02-ASYNC                   | [99A-PONT.md](../../00-SOCLE/05-PROBLEM-SOLVING/99A-PONT.md)                                        | Modèle statique -> modèle temporel    |
| 01-CADRAGE/02-ASYNC                   | 01-CADRAGE/03-DEBUGGING               | [99A-PONT.md](../../01-CADRAGE/02-ASYNC/99A-PONT.md)                                                | Concurrence -> enquête                |
| 01-CADRAGE/03-DEBUGGING               | 01-CADRAGE/04-ERROR-HANDLING          | [99A-PONT.md](../../01-CADRAGE/03-DEBUGGING/99A-PONT.md)                                            | Réagir -> prévoir                     |
| 01-CADRAGE/04-ERROR-HANDLING          | 02-CONSTRUCTION/03-TESTING            | [99A-PONT.md](../../01-CADRAGE/04-ERROR-HANDLING/99A-PONT.md)                                       | Prévoir l'échec -> le prouver         |
| 02-CONSTRUCTION/03-TESTING            | 02-CONSTRUCTION/04-MATH-BASICS        | [99A-PONT.md](../../02-CONSTRUCTION/03-TESTING/99A-PONT.md)                                         | Prouver -> raisonner sur les nombres  |
| 02-CONSTRUCTION/04-MATH-BASICS        | 02-CONSTRUCTION/05-MEMORY-PERFORMANCE | [10-PONT-MEMORY-PERFORMANCE.md](../../02-CONSTRUCTION/04-MATH-BASICS/10-PONT-MEMORY-PERFORMANCE.md) | Nombres -> ressources                 |
| 02-CONSTRUCTION/05-MEMORY-PERFORMANCE | 02-CONSTRUCTION/06-DATA-STRUCTURES    | [99A-PONT.md](../../02-CONSTRUCTION/05-MEMORY-PERFORMANCE/99A-PONT.md)                              | Mesure -> choix de structure          |
| 02-CONSTRUCTION/06-DATA-STRUCTURES    | 02-CONSTRUCTION/07-ALGORITHMS         | [99A-PONT.md](../../02-CONSTRUCTION/06-DATA-STRUCTURES/99A-PONT.md)                                 | Stocker -> traiter                    |
| 02-CONSTRUCTION/09-FUNCTIONAL-JS      | 02-CONSTRUCTION/10-DESIGN-PATTERNS    | [99A-PONT.md](../../02-CONSTRUCTION/09-FUNCTIONAL-JS/99A-PONT.md)                                   | Fonctions -> structures d'objets      |
| 02-CONSTRUCTION/10-DESIGN-PATTERNS    | 02-CONSTRUCTION/11-REFACTORING        | [99A-PONT.md](../../02-CONSTRUCTION/10-DESIGN-PATTERNS/99A-PONT.md)                                 | Reconnaître -> réécrire               |
| 02-CONSTRUCTION/11-REFACTORING        | 02-CONSTRUCTION/12-TYPESCRIPT         | [99A-PONT.md](../../02-CONSTRUCTION/11-REFACTORING/99A-PONT.md)                                     | Refactor JS -> refactor typé          |
| 02-CONSTRUCTION/12-TYPESCRIPT         | 02-CONSTRUCTION/13-RUNTIME-ENV        | [99A-PONT.md](../../02-CONSTRUCTION/12-TYPESCRIPT/99A-PONT.md)                                      | Types -> runtime                      |
| 03-PILOTAGE/04-SECURITY               | 04-EPREUVE/04-BIG-APP-SNOOP           | 99A-PONT.md                                                                                         | Code humain -> code IA                |
| 03-PILOTAGE/05-OBSERVABILITY          | 03-PILOTAGE/10-TEAM-CRAFT             | [99A-PONT.md](../../03-PILOTAGE/05-OBSERVABILITY/99A-PONT.md)                                       | Observer machines -> observer humains |
| 05-MAITRISE/03-EDGE-CASES             | 05-MAITRISE/03-EDGE-CASES             | 99A-PONT.md                                                                                         | Ingénierie humaine -> délégation      |

## LES TRANSITIONS SANS PONT

Toutes les autres transitions du curriculum. Elles ne posent pas de saut de nature : le sujet évolue, la posture reste. Ouvre simplement le `00_why_*.md` du module suivant.

## RÈGLE POUR L'AVENIR

Un nouveau pont s'ajoute **seulement si** la transition change la nature du travail. Pas si elle change juste le sujet. Ça évite la dérive vers 31 ponts creux.
