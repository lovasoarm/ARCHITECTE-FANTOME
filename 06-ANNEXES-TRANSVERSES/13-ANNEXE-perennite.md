---
stability: intemporel
acte: annexe
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# ANNEXE : pérennité : pourquoi ce curriculum ne périme pas

Temps de lecture ~2 min

Les outils changent tous les trois ans. Les modes d'échec des projets, non. Ce curriculum est
construit sur les seconds.

## Ce qui périme et ce qui reste

```text
PERIME VITE                          RESTE 20 ANS
-------------------------------      ---------------------------------
la syntaxe d'un framework            le couplage et la cohésion
l'ORM du moment                      le coût d'un changement de schéma
le format de config du CI            l'idée de garde-fou automatique
le fournisseur de cloud              la latence, la panne partielle, le coût
la mode micro-services               le critère de découpage d'un système
l'outil de ticket                    le fait qu'un travail non visible n'est pas suivi
```

Chaque leçon est écrite pour que l'exemple soit remplaçable et le mécanisme, non.

## Pérennité par familles de modules

Les exemples ci-dessous utilisent les chemins canoniques de l'arborescence actuelle. Ils illustrent
les mécanismes durables et les éléments à revalider ; ils ne prétendent pas remplacer le registre de
fraîcheur ni l'inventaire des sources périssables. Les six blocs physiques `00` à `05` ne sont pas
les paliers de capacité `A` à `H`.

| Ressource canonique | Principe durable | Élément à revalider |
|---|---|---|
| `00-SOCLE/02-PROLOGUE` | contrat d'apprentissage, preuves et progression | cohérence de la route et des prérequis |
| `00-SOCLE/04-FUNDAMENTALS` | fonctions, portée, types et contrôle | syntaxe et comportement des versions de langage/runtime illustrées |
| `00-SOCLE/05-PROBLEM-SOLVING` | décomposition, hypothèses, invariants et choix d'approche | exemples métier, sans changer la méthode de raisonnement |
| `00-SOCLE/06-MINDSET` | coût des décisions, incertitude et raisonnement explicite | ordres de grandeur financiers et exemples économiques |
| `01-CADRAGE/01-PROBLEM-HUNT` et `05-MVP-SPLIT` | besoin, hypothèses, non-objectifs et découpage par valeur | exemples de secteurs, pratiques produit et contraintes réglementaires |
| `01-CADRAGE/02-ASYNC` à `04-ERROR-HANDLING` | temps, concurrence, reproduction et propagation d'échec | détails runtime, API, commandes et versions citées |
| `02-CONSTRUCTION/08-DATA-SPELLS` | invariants, modélisation et migrations | versions de bases, moteurs et fonctionnalités SQL |
| `02-CONSTRUCTION/19-API-CRAFT` et `20-API-DOJO` | contrats, idempotence, évolution et compatibilité | versions HTTP, OpenAPI, GraphQL et générateurs |
| `02-CONSTRUCTION/13-RUNTIME-ENV` | responsabilités du runtime | versions et différences Node, Bun, Deno et navigateurs |
| `03-PILOTAGE/04-SECURITY` | menaces, identité, autorisation et réduction du risque | avis de sécurité, CVE, référentiels et lois |
| `03-PILOTAGE/05-OBSERVABILITY` et `06-FIABILITE-SLO` | signaux, objectifs, budgets d'erreur et décisions opérationnelles | formats, fournisseurs, seuils et pratiques SRE propres au système |
| `03-PILOTAGE/07-CLOUD-FOUNDATIONS` et `08-PRODUIT-COUT-ROI` | unités facturées, coûts marginaux, capacité et valeur | tarifs, régions, taxes, taux de change et hypothèses de charge |
| `04-EPREUVE/04-BIG-APP-SNOOP` | cartographie d'une base inconnue et stratégie de changement | dépôts réels étudiés, tailles et structures internes |
| `05-MAITRISE/08-MAITRISE-STAFF-ENGINEER` | jugement, arbitrage, transmission et preuve d'impact | attentes organisationnelles et exemples de gouvernance |

Pour les sources précises, dates de vérification et prochaines revues, le registre `36-RIGUEUR-SOURCES.md`
et les métadonnées de chaque ressource font foi. Ne déduis pas une date de fraîcheur à partir de cette
carte synthétique.

## Discipline de pérennité

Les contenus périssables sont revus à partir de leur identifiant `perishability_id` et de leur principe source. Le lecteur doit distinguer ce qui est stable du contenu technique qui peut évoluer. Une page n'est jamais considérée durable uniquement parce qu'elle est pratique ou récente.
