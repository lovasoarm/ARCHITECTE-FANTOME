---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [solution_concurrente, changement_contexte]
anti_recipe_key: solution_concurrente+changement_contexte
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Frontieres entre 12 (Design Patterns), 13 (Refactoring), 16 (Architecture) et 18 (OOP JS)

Temps de lecture ~4 min

-> ~5 min

Trois modules qui parlent d'organisation du code. Ils ne se recouvrent pas.
Ce fichier fige les frontieres pour empecher la sensation "je relis la
meme chose sous trois titres".

## Table de contrat

| Question posee          | 12 Design Patterns                            | 13 Refactoring                                          | 16 Architecture Patterns                              |
| ----------------------- | --------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------- |
| Echelle                 | 1 a 3 classes / fonctions                     | 1 fichier a 1 module                                    | 1 module a tout le systeme                            |
| Point de depart         | "j'ai une intention recurrente a exprimer"    | "j'ai du code deja ecrit qui pue"                       | "j'ai un systeme a decouper en briques"               |
| Livrable                | un code plus intentionnel                     | le meme comportement, code plus sain                    | un diagramme de dependances + regles de communication |
| Reference culte         | Gang of Four                                  | Fowler, Refactoring                                     | Evans (DDD), Fowler (PoEAA), Hohpe (EIP)              |
| Exemple typique         | Strategy, Observer, Factory                   | Extract Function, Replace Conditional with Polymorphism | Hexagonal, CQRS, Event-driven                         |
| Ne fait PAS             | reorganiser un module entier                  | inventer de nouvelles primitives                        | choisir le nom d'une variable                         |
| Signal "mauvais module" | tu decris des flux entre services -> va en 16 | tu inventes un pattern reutilisable -> va en 12         | tu discutes du nommage d'une fonction -> va en 13     |

## Regle de tri en 10 secondes

1. Est-ce que tu changes le **comportement** ? Non -> 13. Oui -> 12 ou 16.
2. Est-ce que le probleme rentre dans **une classe / fonction / paire de
   fonctions** ? Oui -> 12. Non -> 16.
3. Est-ce que tu discutes de la **topologie du systeme** (qui parle a qui,
   avec quel protocole, ou vivent les donnees) ? -> 16.

## Zones grises assumees

- Extract Class (13 selon Fowler) peut aboutir a l'application d'un pattern
  du 12. C'est normal : le refactoring est le pont vers le pattern, pas
  le pattern lui-meme.
- Le pattern Repository (12) est aussi une brique d'architecture
  hexagonale (16). Le 12 en donne la mecanique, le 16 en donne le role
  dans le systeme.

## Ou l'analogie casse

On parle de "frontieres". Elles sont poreuses en pratique. Ce tableau
sert d'aide a la decision quand tu **commences** une lecon, pas de
verite absolue.

## Et 18 (OOP JS) dans tout ca ?

`02-CONSTRUCTION/17-OOP-JS` traite du **mecanisme JS de l'orientation objet** (prototype chain,
`class`, `this`, heritage, mixins). C'est de la mecanique de langage, pas
une strategie d'organisation :

| Question posee          | 18 OOP JS                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------- |
| Echelle                 | 1 objet / 1 prototype                                                                       |
| Point de depart         | "comment JS implemente l'heritage"                                                          |
| Livrable                | code JS qui exploite proprement le prototype chain                                          |
| Reference culte         | You Don't Know JS: Objects & Classes (Simpson)                                              |
| Exemple typique         | prototype pollution, `Object.create`, `class` sugar                                         |
| Ne fait PAS             | choisir un pattern GoF ; refactorer un module                                               |
| Signal "mauvais module" | tu discutes de Strategy vs Factory -> va en 12 ; tu discutes de qui parle a qui -> va en 16 |

Regle : **18 = COMMENT ca marche en JS. 12 = QUELLE intention j'exprime. 13 = COMMENT je re-arrange sans casser. 16 = COMMENT le systeme entier est cable.**

## Reference

- `../../02-CONSTRUCTION/10-DESIGN-PATTERNS/01A-00-why-design-patterns.md`
- `../../02-CONSTRUCTION/11-REFACTORING/01-00-why-refactoring.md`
- `02-CONSTRUCTION/14-ARCHITECTURE-PATTERNS/01-00-why-architecture-patterns.md`

---

| Passer d'un callback à une promise | 02-CONSTRUCTION/11-REFACTORING |
| Choisir Observer vs polling | 02-CONSTRUCTION/10-DESIGN-PATTERNS |
| Séparer read model et write model (CQRS) | 02-CONSTRUCTION/14-ARCHITECTURE-PATTERNS |
| Extraire une fonction pure d'un gros bloc | 02-CONSTRUCTION/11-REFACTORING |

Règle mnémonique :

- **Pattern** = outil tactique nommé.
- **Refactoring** = transformation locale à comportement identique.
- **Architecture** = décision structurelle qui engage plusieurs modules.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?
