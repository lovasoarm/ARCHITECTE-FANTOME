---
stability: evolutif
acte: parcours
noyau: oui
route: complete
---

# MODULE 14 ARCHITECTURE PATTERNS

<!-- AF-DIAGRAM:event_driven -->

```text
text
┌────────────┐      event      ┌────────────┐
│ Producer   │────────────────►│ Event Bus  │
└────────────┘                 └────┬───────┘
                                   ├────► Consumer A
                                   ├────► Consumer B
                                   └────► Consumer C
```

Un événement découple le producteur des consommateurs tout en faisant circuler un fait observable.

> Palier `02-CONSTRUCTION`. Duree estimee : **8 h 15** (12 fichiers de travail).
> **Frontiere de palier.** Ce module donne **les formes** (couches, ports, hexagone). `15-ARCHI-LAB` les **assemble** sur un cas complet, `16-DDD-CONTRATS` travaille **le langage et les contrats**. Trois objets differents : forme, assemblage, langage.

## Sommaire du module

| Fichier                                                                    | Objet                                                             | Duree  |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------ |
| [`00-PREREQUIS.md`](00-PREREQUIS.md)                                       | 00 : Prereq check : Architecture Patterns                         | 15 min |
| [`01-00-why-architecture-patterns.md`](01-00-why-architecture-patterns.md) | POURQUOI CE MODULE MÉRITE TON TEMPS : ARCHITECTURE PATTERNS       | 45 min |
| [`02-module_pattern.md`](02-module_pattern.md)                             | MODULE PATTERN : ENCAPSULER, EXPOSER, CACHER                      | 45 min |
| [`03-solid_principles.md`](03-solid_principles.md)                         | SOLID PRINCIPLES                                                  | 45 min |
| [`04-mvc_pattern.md`](04-mvc_pattern.md)                                   | MVC : MODEL, VIEW, CONTROLLER                                     | 45 min |
| [`05-clean_architecture.md`](05-clean_architecture.md)                     | CLEAN ARCHITECTURE : LE DOMAINE AU CENTRE                         | 45 min |
| [`06-event_driven.md`](06-event_driven.md)                                 | EVENT-DRIVEN ARCHITECTURE : RÉAGIR, PAS ANTICIPER                 | 45 min |
| [`07-microservices_intro.md`](07-microservices_intro.md)                   | MICROSERVICES : DÉCOUPER OU SOUFFRIR : MAIS PAS N'IMPORTE COMMENT | 45 min |
| [`90-grimoire.md`](90-grimoire.md)                                         | Page verrouillée                                                  | 30 min |
| [`08-EXO_LECTURE.md`](08-EXO_LECTURE.md)                                   | EXO LECTURE : 15-25 minutes (Architecture Patterns)               | 45 min |
| [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md)                         | EXO [JEUNE IA] : 02-CONSTRUCTION/14-ARCHITECTURE-PATTERNS         | 45 min |
| [`99-PORTAGE-MENTAL.md`](99-PORTAGE-MENTAL.md)                             | 99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust           | 45 min |

Total : **8 h 15**. Le Total reprend exactement la somme du tableau. Le challenge (1 h 30) et le boss (3 h) sont des évaluations séparées et ne sont pas ajoutés au Total sauf s’ils apparaissent comme lignes du tableau.

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

- [00 : Prereq check : Architecture Patterns](00-PREREQUIS.md)
- [Pourquoi ce module mérite ton temps : architecture patterns](01-00-why-architecture-patterns.md)
- [Module pattern : encapsuler, exposer, cacher](02-module_pattern.md)
- [Solid principles](03-solid_principles.md)
- [Mvc : model, view, controller](04-mvc_pattern.md)
- [Clean architecture : le domaine au centre](05-clean_architecture.md)
- [Event-driven architecture : réagir, pas anticiper](06-event_driven.md)
- [Microservices : découper ou souffrir : mais pas n'importe comment](07-microservices_intro.md)
- [Page verrouillée](90-grimoire.md)
- [EXO LECTURE : 15-25 minutes (Architecture Patterns)](08-EXO_LECTURE.md)
- [EXO [jeune IA] : 02-construction/14-architecture-patterns](97-EXO-VERIFICATION.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [Challenge : `14-ARCHITECTURE-PATTERNS`](95-challenge.md)
- [Grimoire : `14-ARCHITECTURE-PATTERNS`](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->
