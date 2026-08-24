---
stability: evolutif
acte: parcours
noyau: oui
route: survie
---

# MODULE 05 OBSERVABILITY

<!-- AF-DIAGRAM:tracing -->

```text
text
Request ─► Span A ─────► Span B ─────► Span C
             │             │              │
          service A     service B      service C
             └──────── trace-id ──────────┘
```

Une trace relie plusieurs spans pour reconstruire le chemin d’une requête à travers les services.

<!-- AF-DIAGRAM:observability -->

```text
text
                         System
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
           Logs         Metrics        Traces
             │             │             │
        events/text     trends/SLO    causality/path
```

Logs, métriques et traces donnent trois angles complémentaires pour reconstruire le comportement d’un système.

> Palier `03-PILOTAGE`. Duree estimee : **12 h 00** (19 fichiers de travail).

## Sommaire du module

| Fichier                                                                                | Objet                                                                               | Duree  |
| -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------ |
| [`00-PREREQUIS.md`](00-PREREQUIS.md)                                                   | 00 : Prereq check : Observability                                                   | 15 min |
| [`01-00-why-observability.md`](01-00-why-observability.md)                             | POURQUOI CE MODULE MÉRITE TON TEMPS : OBSERVABILITY                                 | 45 min |
| [`02-structured_logging.md`](02-structured_logging.md)                                 | Arrête d'écrire des logs que personne ne peut chercher                              | 45 min |
| [`50-structured_logging_minimini_projet.md`](50-structured_logging_minimini_projet.md) | 01 structured logging minimini projet                                               | 45 min |
| [`03-distributed_tracing.md`](03-distributed_tracing.md)                               | Suivre un Rasengan qui traverse 6 couches de chakra sans perdre le fil              | 45 min |
| [`04-tracing_paper_drill.md`](04-tracing_paper_drill.md)                               | 03 : Distributed tracing (papier d'abord)                                           | 45 min |
| [`05-metrics_alerting.md`](05-metrics_alerting.md)                                     | Les chiffres qui te préviennent avant que tout brûle                                | 45 min |
| [`06-sentry_in_prod.md`](06-sentry_in_prod.md)                                         | Capturer l'erreur avant qu'un shinobi te l'envoie par email                         | 45 min |
| [`07-debug_in_prod.md`](07-debug_in_prod.md)                                           | Quand tu ne peux pas juste mettre un breakpoint                                     | 45 min |
| [`08-prod_stack_trace_drill.md`](08-prod_stack_trace_drill.md)                         | LIRE UNE STACK TRACE DE PROD QUAND LE CODE SOURCE N'EXISTE PLUS                     | 45 min |
| [`09-oncall_drill.md`](09-oncall_drill.md)                                             | 08 : On-call drill : il est 3h du matin                                             | 45 min |
| [`10-instrumenter_ton_projet.md`](10-instrumenter_ton_projet.md)                       | 09 : Instrumenter TON projet (OpenTelemetry local, zéro compte externe)             | 45 min |
| [`90-grimoire.md`](90-grimoire.md)                                                     | Page verrouillée                                                                    | 30 min |
| [`11-EXO_LECTURE.md`](11-EXO_LECTURE.md)                                               | EXO LECTURE : 15-25 minutes (Observabilite)                                         | 45 min |
| [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md)                                     | EXO [JEUNE IA] : 03-PILOTAGE/05-OBSERVABILITY                                       | 45 min |
| [`99-PORTAGE-MENTAL.md`](99-PORTAGE-MENTAL.md)                                         | 99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust                             | 45 min |
| [`99A-PONT.md`](99A-PONT.md)                                                           | PONT : de observer un système à collaborer avec des humains à l'artisanat en équipe | 45 min |

Total : **12 h**. Le Total reprend exactement la somme du tableau. Le challenge (1 h 30) et le boss (3 h) sont des évaluations séparées et ne sont pas ajoutés au Total sauf s’ils apparaissent comme lignes du tableau.

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

- [00 : Prereq check : Observability](00-PREREQUIS.md)
- [Pourquoi ce module mérite ton temps : observability](01-00-why-observability.md)
- [Arrête d'écrire des logs que personne ne peut chercher](02-structured_logging.md)
- [50-structured_logging_minimini_projet.md](50-structured_logging_minimini_projet.md)
- [Suivre un Rasengan qui traverse 6 couches de chakra sans perdre le fil](03-distributed_tracing.md)
- [03 : Distributed tracing (papier d'abord)](04-tracing_paper_drill.md)
- [Les chiffres qui te préviennent avant que tout brûle](05-metrics_alerting.md)
- [Capturer l'erreur avant qu'un shinobi te l'envoie par email](06-sentry_in_prod.md)
- [Quand tu ne peux pas juste mettre un breakpoint](07-debug_in_prod.md)
- [Lire une stack trace de prod quand le code source n'existe plus](08-prod_stack_trace_drill.md)
- [08 : On-call drill : il est 3h du matin](09-oncall_drill.md)
- [09 : Instrumenter TON projet (OpenTelemetry local, zéro compte externe)](10-instrumenter_ton_projet.md)
- [Page verrouillée](90-grimoire.md)
- [EXO LECTURE : 15-25 minutes (Observabilite)](11-EXO_LECTURE.md)
- [EXO [jeune IA] : 03-pilotage/05-observability](12-EXO-VERIFICATION.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [PONT : de observer un système à collaborer avec des humains à l'artisanat en équipe](99A-PONT.md)
- [Challenge : `05-OBSERVABILITY`](95-challenge.md)
- [Grimoire : `05-OBSERVABILITY`](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->
