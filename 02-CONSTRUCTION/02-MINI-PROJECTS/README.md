---
stability: stable
route: survie
acte: comprendre
---

# 02-CONSTRUCTION/02-MINI-PROJECTS : 19 mini-projets appliqués

<a id="ordre-pédagogique"></a>

Temps de lecture ~3 min

Ce bloc rassemble les mini-projets qui obligent à assembler ce que les
modules `00-SOCLE/04-FUNDAMENTALS` a `05-MAITRISE/03-EDGE-CASES` t'ont appris. Chaque mini-projet a un README propre, un
POSTMORTEM à remplir, un TDD_JOURNAL, et au moins un ADR.

## Ordre pédagogique et prérequis

Les projets sont numérotés dans un ordre d'ambition croissante, mais **les numéros ne créent pas à eux seuls une séquence obligatoire**. L'ancien gate global qui imposait les modules « 6, 14, 22, 29 » et des livrables avant l'entrée a été supprimé : il ne correspondait pas à la structure canonique du curriculum.

Le contrôle d'entrée est désormais **spécifique à chaque projet**. Commence par [`00-PREREQUIS.md`](00-PREREQUIS.md) : tu y trouveras le socle commun, les leçons exactes à étudier pour chacun des 19 projets, une preuve minimale d'entrée et la règle `READY / NOT READY`. Il n'est pas nécessaire de terminer tous les modules d'un palier lorsqu'une poignée de leçons suffit à maîtriser le mécanisme utilisé.

Quelques dépendances d'ordre sont réellement bloquantes et restent explicites : `15` demande d'avoir réalisé `01` ; `17` demande `15` ; `18` demande `10` ; `19` demande d'avoir terminé `01` à `18` ainsi que ses leçons de leadership et de gouvernance IA. Les autres projets peuvent être commencés dès que leur propre gate est validé.

Les vagues `01–05`, `06–10` et `11–17` restent un **ordre conseillé** pour réduire les sauts de difficulté, pas une règle qui oblige à finir tous les projets d'une vague avant d'en ouvrir un autre. Les extensions Cloud, Docker, broker ou API réelle ne sont requises que lorsque la fiche du projet les rend explicitement obligatoires.

## Liste

| #   | Projet                               | Cible pédagogique dominante                                                          |
| --- | ------------------------------------ | ------------------------------------------------------------------------------------ |
| 01  | `01_rasengan_engine`                 | Fondamentaux + composition                                                           |
| 02  | `02_garo_no_kronika`                 | Manipulation d'état, timers                                                          |
| 03  | `03_walking_dead_protocol`           | Async + résilience                                                                   |
| 04  | `04_breaking_cache`                  | Cache, expiration, invalidation                                                      |
| 05  | `05_prison_break_api`                | API, auth, boundaries                                                                |
| 06  | `06_ultras_dashboard`                | UI, données live                                                                     |
| 07  | `07_ballon_dor_cli`                  | CLI, ergonomie terminal                                                              |
| 08  | `08_trapsoul_radio`                  | Streaming, backpressure                                                              |
| 09  | `09_oracle_glitch`                   | Debug avancé                                                                         |
| 10  | `10_legacy_dungeon`                  | Lecture de code hérité                                                               |
| 11  | `11_scheduler`                       | Concurrence, pMap, backpressure                                                      |
| 12  | `12_legacy_takeover`                 | Reprise de repo, TDD sur legacy                                                      |
| 13  | `13_memory_hunter`                   | Fuites mémoire, heap snapshots                                                       |
| 14  | `14_system_design_lab`               | System design pratique, brokers                                                      |
| 15  | `15_porte_rasengan_engine_multilang` | Transfert de compétence (Go)                                                         |
| 16  | `16_distributed_arena`               | Systèmes distribués, idempotence                                                     |
| 17  | `17_polyglot_forge`                  | Bonus : intégration multi-langages                                                   |
| 18  | `18_human_vs_ai_smell`               | Deux implémentations, un contrat : revue comparative fondée sur les preuves          |
| 19  | `19_supervise_the_ai`                | Architecte-superviseur : zero code applicatif, ADR + consigne + reviews + POSTMORTEM |

Les projets `18` et `19` forment une paire de discernement terminal : `18` apprend à comparer deux implémentations sur un contrat commun et à démontrer leurs défauts par des preuves ; `19` demande ensuite de déléguer sans déléguer le jugement. Ils renforcent la lecture critique des sorties assistées et le contrôle transversal G8, ainsi que la maturation Staff ; ils ne remplacent pas S6 (livraison & exploitation) et ne constituent pas un second cursus.

## Contrat d’exécution

Les mini-projets sont des scaffolds pédagogiques, pas des solutions pré-construites. La distinction entre **commande cible** et **commande réellement exécutable dans la release AF** est gouvernée par [`07A-EXECUTION-CONTRACT.md`](07A-EXECUTION-CONTRACT.md). Cela évite de confondre un exemple de protocole avec une preuve d’exécution.

## Livrables communs à chaque projet

- `README.md` : contexte + comment lancer.
- `08-POSTMORTEM.md` : rempli à la fin.
- `02-TDD-JOURNAL.md` : le journal des cycles rouge → vert → refactor.
- `ADR/ADR-001_*.md` : au moins un ADR par projet, souvent plusieurs.
- `04-SECURITY-GATE.md` : gate bloquante. **Rejouer avant POSTMORTEM**
  à chaque livraison de mini-projet.
- `SECURITY.md` : gabarit de preuve de sécurité appartenant au projet apprenant.
  Il ne certifie rien dans le dépôt AF : le gate ne s'ouvre que lorsque les
  commandes, observations, écarts et décisions réelles sont reportés dans le
  dépôt apprenant et recroisés avec `08-POSTMORTEM.md`.

Les synthèses transverses sont dans
`05-MAITRISE/06-ANNEXES/27_synthese_mini_projects/` (à lire après un bloc
complet de projets).

## Protocole CORE anti-illusion

La route 16 semaines ne demande pas de terminer les 19 projets. Consulte [25-CORE-MINI-PROJECT-MAP.md](../../06-ANNEXES-TRANSVERSES/25-CORE-MINI-PROJECT-MAP.md) pour le slice de chaque projet.

Pour tout projet CORE, le même projet est traversé quatre fois :

1. **tentative à l’aveugle** : aucune lecture du corrigé ou de l’architecture suggérée ;
2. **perturbation** : une contrainte nouvelle arrive après la première décision ;
3. **transfert** : le mécanisme revient dans un contexte différent ;
4. **rappel à froid** : une semaine plus tard, l’apprenant reconstruit la décision sans ses notes.

Le protocole complet est dans [21-RECALL-ENGINE-CORE.md](../../06-ANNEXES-TRANSVERSES/21-RECALL-ENGINE-CORE.md), [20-ENGINE-AMBIGUITE.md](../../06-ANNEXES-TRANSVERSES/20-ENGINE-AMBIGUITE.md) et [23-TRANSFER-NEGATIF.md](../../06-ANNEXES-TRANSVERSES/23-TRANSFER-NEGATIF.md).

Un livrable n’est pas « acquis » parce que la suite de tests passe : l’apprenant doit être capable d’expliquer la décision, le coût, le signal qui la ferait réviser et le contexte où la même solution devient mauvaise.

## Changement de niveau de guidage à partir du projet 11

Les mini-projets 1 à 10 donnent un cadre plus explicite : contexte, contraintes, points d'entrée et garde-fous. Ils ne donnent pas la décision d'architecture à recopier, et leurs ADR restent à produire par l'apprenant. À partir du projet 11, le cahier des charges retire encore davantage de structure pour augmenter l'autonomie. Cette progression réduit le guidage sans transformer les premiers projets en corrigés.

## Drill hors serie : "IA en panne"

`05-MAITRISE/06-ANNEXES/16_career/05_ai_famine_drill.md` n'est pas dans la sequence numerotee 01-19. C'est un
drill de survie technologique : reconstruire un module deja etudie, sur une
machine vierge, sans IA, sans internet, sans autocompletion. A rejouer une
fois par trimestre. Voir `05-MAITRISE/06-ANNEXES/16_career/05_ai_famine_drill.md`.

## Gate securite (OWASP) : bloquant pour cloturer un projet

Chaque POSTMORTEM de mini-projet doit contenir la checklist OWASP Top 10
(voir `97-templates/09-POSTMORTEM.md`, section "GATE SECURITE").
Tant qu'une ligne reste en ``, le projet **n'est pas livre**, meme si
les tests passent. La checklist est obligatoire pour les **19 projets
numerotes** (le drill hors serie "IA en panne" a son propre POSTMORTEM, sans
gate reseau si le drill est fait hors-ligne).

## Objection storm par ADR : bloquant pour signer un ADR

Chaque ADR d'un mini-projet declenche **un objection storm chronometre**
(voir `05-MAITRISE/06-ANNEXES/19_interview/04-objection_storm.md`). Pas de storm =
ADR non defendu = projet non livre.

<!-- PIECES-MODULE:debut -->

## Les pièces de ce module

- [`00-PREREQUIS.md`](00-PREREQUIS.md) : Auto-test d'entrée : à passer avant d'ouvrir le module
- [`95-challenge.md`](95-challenge.md) : Challenge : l'épreuve du module
- [`90-grimoire.md`](90-grimoire.md) : Grimoire : ce que tu dois pouvoir restituer

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [00 : Prereq check : Mini Projects](00-PREREQUIS.md)
- [Pourquoi des projets : la différence entre savoir et pouvoir](01A-00-why-mini-projects.md)
- [`01_rasengan_engine/`](01_rasengan_engine/README.md)
- [`02_garo_no_kronika/`](02_garo_no_kronika/README.md)
- [`03_walking_dead_protocol/`](03_walking_dead_protocol/README.md)
- [`04_breaking_cache/`](04_breaking_cache/README.md)
- [`05_prison_break_api/`](05_prison_break_api/README.md)
- [`06_ultras_dashboard/`](06_ultras_dashboard/README.md)
- [`07_ballon_dor_cli/`](07_ballon_dor_cli/README.md)
- [`08_trapsoul_radio/`](08_trapsoul_radio/README.md)
- [`09_oracle_glitch/`](09_oracle_glitch/README.md)
- [`10_legacy_dungeon/`](10_legacy_dungeon/README.md)
- [`11_scheduler/`](11_scheduler/README.md)
- [`12_legacy_takeover/`](12_legacy_takeover/README.md)
- [`13_memory_hunter/`](13_memory_hunter/README.md)
- [`14_system_design_lab/`](14_system_design_lab/README.md)
- [`15_porte_rasengan_engine_multilang/`](15_porte_rasengan_engine_multilang/README.md)
- [`16_distributed_arena/`](16_distributed_arena/README.md)
- [`17_polyglot_forge/`](17_polyglot_forge/README.md)
- [`18_human_vs_ai_smell/`](18_human_vs_ai_smell/README.md)
- [`19_supervise_the_ai/`](19_supervise_the_ai/README.md)
- [EXO LECTURE : ~20 minutes : questions et auto-évaluation (02-CONSTRUCTION/02-MINI-PROJECTS)](02A-EXO_LECTURE.md)
- [EXO [jeune IA] : 02-construction/02-mini-projects](97A-EXO-VERIFICATION.md)
- [`97-templates/`](97-templates/README.md)
- [Challenge : `02-MINI-PROJECTS`](95-challenge.md)
- [Grimoire : `02-MINI-PROJECTS`](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

<!-- AF-PROJECT-REAL-WORLD-GATE-1.1 -->

## Règle commune : la kata entraîne, le produit prouve

Les univers Naruto, Garo, Breaking Bad, Prison Break et les autres scénarios servent de crochets de mémoire pour isoler des mécanismes. Ils restent dans le parcours, mais **ne valent pas automatiquement une preuve de projet professionnel**. Les projets `01_rasengan_engine`, `02_garo_no_kronika`, `04_breaking_cache`, `05_prison_break_api`, `07_ballon_dor_cli` et `18_human_vs_ai_smell` ont maintenant une mission produit obligatoire reliée à Kintana ; leurs cahiers précisent les gates et livrables.

Le cas d’étude pédagogique commun [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md) fournit un contexte partagé pour relier les notions. Il ne remplace pas le fil rouge personnel, choisi et qualifié par l’apprenant après le Cadrage. Les mini-projets conservent leur domaine lorsqu’il apporte une preuve utile (streaming, dashboard, migration legacy, OSS, memory leak, architecture distribuée, polyglotte) ; ne les force pas tous dans Kintana.

**Règle qualité :** pas de mesure inventée, pas de test affaibli, pas de technologie ajoutée pour décorer. Chaque livraison mentionne environnement, commande, résultat, limite et statut (`LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION`).

## Ressources pratiques associées

- [Préparer l'activité (`SETUP.md`)](SETUP.md) : environnement, prérequis et commandes.

## Cartes et vérification transversales

- [Carte de réexposition](01-REEXPOSURE-MAP.md) : retrouver où chaque mécanisme est repris et transféré.
