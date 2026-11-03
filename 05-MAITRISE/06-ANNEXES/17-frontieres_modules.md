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

### Vérification observable : critères de réussite

Prépare trois vérifications : cas nominal, cas limite et cas invalide. Écris avant l’exécution l’assertion attendue pour « Frontieres entre 12 (Design Patterns), 13 (Refactoring), 16 (Architecture) et 18 (OOP JS) », puis conserve le résultat et explique tout écart.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:architecture -->

## Repère visuel utile : Défendre une frontière de domaine Kintana

```text
client -> API / application
               |
               v
        domaine Kintana
        /      |      \
       v       v       v
 demandes  réservations  rôles
       \       |       /
        v      v      v
        persistance + outbox
                |
                v
          worker notification
```

<!-- AF-LESSON-PROFILE: architecture -->

## Repères de décision

- **Pourquoi :** Les frontières réduisent le coût de changement et clarifient les responsabilités. Elles doivent répondre aux contraintes de l'équipe, des données et de l'exploitation.
- **Quand l’utiliser / quand l’éviter :** Découpe un système quand une frontière protège une règle ou un rythme de changement. Ne crée pas de microservice tant que l'autonomie, la charge ou la gouvernance ne justifient pas le coût distribué.
- **Limites :** Chaque frontière ajoute contrats, réseau, déploiement, observabilité et coordination. Un diagramme propre ne prouve ni la faisabilité ni la performance.

## Mécanisme : la version sans magie

Part des cas d'usage, repère invariants et propriétaires de données, définis les contrats, compare les options et mesure les conséquences du changement.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Frontieres entre 12 (Design Patterns), 13 (Refactoring), 16 (Architecture) et 18 (OOP JS)** se rattache à ce cas concret : Kintana commence comme monolithe modulaire. Les demandes, réservations et notifications doivent avoir des frontières explicites sans fragmenter trop tôt le déploiement.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Défendre une frontière de domaine Kintana

> **Arc Capsule Corp. / DBZ :** une architecture est le plan du vaisseau et les coûts qu'il impose. Si chaque pièce doit connaître toutes les autres, le vaisseau ne décolle jamais.

**Mission liée à « Frontieres entre 12 (Design Patterns), 13 (Refactoring), 16 (Architecture) et 18 (OOP JS) » :** Dessine le flux réel d'une création de demande. Identifie les invariants, propriétaires de données et dépendances ; compare monolithe modulaire et service séparé dans un ADR. Simule une évolution et mesure le nombre de composants touchés.

**Livrable :** diagramme de composants/flux, ADR avec deux options, contrat de frontière et test de changement.

**Critères d’acceptation :** la frontière possède une responsabilité claire ; les données ont un propriétaire ; le coût d'exploitation est explicite ; le microservice n'est pas choisi par prestige ; une condition de révision est écrite.

**Transfert obligatoire :** Le nombre d'équipes ou le volume double. Indique quel signal justifierait de séparer un composant et quel coût tu acceptes.
