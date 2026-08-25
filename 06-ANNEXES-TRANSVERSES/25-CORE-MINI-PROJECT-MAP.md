---
stability: stable
acte: navigation
noyau: oui
---

# 25 : CARTE CORE DES 19 MINI-PROJETS

> Aucun projet n'est supprimé. Cette carte distingue le **slice CORE** de la profondeur complète.

## Légende

- **CORE** : passage recommandé et évalué pendant les 16 semaines.
- **DEPTH** : à faire en approfondissement si le besoin ou la faiblesse observée le justifie.
- **TRANSFER** : exercice à sortir du sentier lorsqu'une compétence doit survivre à un changement de stack.
- **VAULT** : référence/variante à consulter sans obligation de terminer pendant le sprint.

## Carte

| #   | Projet                               | Mode 16 semaines       | Slice CORE | Preuve principale             |
| --- | ------------------------------------ | ---------------------- | ---------: | ----------------------------- |
| 01  | `01_rasengan_engine`                 | CORE                   |        8 h | état, composition, invariants |
| 02  | `02_garo_no_kronika`                 | DEPTH                  |          : | async concurrent              |
| 03  | `03_walking_dead_protocol`           | CORE                   |        8 h | legacy + tests + workers      |
| 04  | `04_breaking_cache`                  | DEPTH                  |          : | algorithmes + profilage       |
| 05  | `05_prison_break_api`                | CORE                   |        8 h | API + auth + sécurité         |
| 06  | `06_ultras_dashboard`                | CORE                   |        8 h | live + observabilité + charge |
| 07  | `07_ballon_dor_cli`                  | DEPTH                  |          : | runtime/CLI/concurrence       |
| 08  | `08_trapsoul_radio`                  | DEPTH                  |          : | streaming/backpressure        |
| 09  | `09_oracle_glitch`                   | DEPTH                  |          : | debugging adversarial         |
| 10  | `10_legacy_dungeon`                  | CORE                   |        8 h | legacy incomplet              |
| 11  | `11_scheduler`                       | DEPTH                  |          : | concurrence/backpressure      |
| 12  | `12_legacy_takeover`                 | CORE                   |        9 h | ownership + refonte mesurée   |
| 13  | `13_memory_hunter`                   | DEPTH                  |          : | heap + leaks                  |
| 14  | `14_system_design_lab`               | CORE                   |        9 h | design distribué + chaos      |
| 15  | `15_porte_rasengan_engine_multilang` | TRANSFER               |        6 h | portage de mécanisme          |
| 16  | `16_distributed_arena`               | CORE                   |        7 h | partitions + idempotence      |
| 17  | `17_polyglot_forge`                  | TRANSFER               |        4 h | invariants cross-language     |
| 18  | `18_human_vs_ai_smell`               | DEPTH + review aveugle |        4 h | qualité provenance-blind      |
| 19  | `19_supervise_the_ai`                | CORE                   |        5 h | délégation + gouvernance IA   |

Les slices CORE sont des timeboxes de la route intensive ; les contenus complets des projets restent inchangés en DEPTH/VAULT. La somme des slices actifs de cette carte est **70 h** ; le capstone utilise séparément les **10 h** restantes de l’enveloppe pratique CORE.

## Pourquoi seulement 9 projets CORE ?

Les 9 slices de mini-projets représentent exactement **70 h de pratique / production active**. Le capstone consomme les **10 h restantes** de l’enveloppe de production CORE, soit **80 h au total**. Les 112 h restantes du sprint sont réservées à la compréhension active, l’ambiguïté/transfert, le rappel, le journal de décision et la simulation cross-team.

Le but du sprint n'est pas de « finir 19 projets ». Les 9 CORE fournissent les expériences les plus complémentaires :

```text
construction
→ async/fiabilité
→ API/sécurité
→ temps réel/observabilité
→ legacy
→ reprise d'un système
→ architecture distribuée
→ chaos/partition
→ supervision IA
```

Les autres projets restent disponibles pour traiter une faiblesse diagnostiquée ou approfondir une spécialité.

## Règle de non-appauvrissement

Un slice CORE ne modifie pas le projet source. Il définit seulement :

- les livrables indispensables ;
- le timebox ;
- le transfert ;
- la perturbation ;
- la preuve de sortie.

Le projet complet demeure la version DEPTH et peut être effectué ultérieurement.
