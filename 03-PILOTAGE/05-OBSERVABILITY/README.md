---
stability: evolutif
acte: parcours
noyau: oui
route: survie
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "03-PILOTAGE/05-OBSERVABILITY/01-00-why-observability.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 03-PILOTAGE/05-OBSERVABILITY/01-00-why-observability.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# MODULE 05 OBSERVABILITY

<!-- AF-DIAGRAM:tracing -->

```text
Request ─► Span A ─────► Span B ─────► Span C
             │             │              │
          service A     service B      service C
             └──────── trace-id ──────────┘
```

Une trace relie plusieurs spans pour reconstruire le chemin d’une requête à travers les services.

<!-- AF-DIAGRAM:observability -->

```text
                         System
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
           Logs         Metrics        Traces
             │             │             │
        events/text     trends/SLO    causality/path
```

Logs, métriques et traces donnent trois angles complémentaires pour reconstruire le comportement d’un système.

> Palier `03-PILOTAGE`. Duree estimee : **11 h 35** (19 fichiers de travail).

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
| [`11-EXO_LECTURE.md`](11-EXO_LECTURE.md)                                               | EXO LECTURE : ~20 minutes : un cycle (Observabilite)                                | 20 min |
| [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md)                                     | EXO [JEUNE IA] : 03-PILOTAGE/05-OBSERVABILITY                                       | 45 min |
| [`99-PORTAGE-MENTAL.md`](99-PORTAGE-MENTAL.md)                                         | 99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust                             | 45 min |
| [`99A-PONT.md`](99A-PONT.md)                                                           | PONT : de observer un système à collaborer avec des humains à l'artisanat en équipe | 45 min |

Total : **11 h 35**. Le Total reprend exactement la somme du tableau. Le challenge (1 h 30) est une évaluation séparée et n'est pas ajouté au Total sauf s'il apparaît comme ligne du tableau. Aucun `96-boss-fight.md` distinct n'est fourni dans ce module ; ses checkpoints, gates ou autres critères de sortie déclarés font foi.

## Comment travailler ce module

1. Ouvre d abord le fichier `00_why_*` s il existe : il dit pourquoi le module merite ton temps.
2. Passe le controle de prerequis. Un prerequis manquant se repare en amont, jamais ici.
3. Fais les lecons dans l ordre des numeros. Chaque lecon a un exercice borne : il se rend, il se date.
4. Le grimoire se lit **apres** la pratique, jamais avant : c est une fiche de rappel, pas un cours.
5. Termine le challenge et les critères de sortie déclarés. Un boss-fight séparé n'est obligatoire que si le README local le fournit et l'annonce ; à défaut, les checkpoints et preuves de sortie indiqués ici font foi.

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
- [91-90-grimoire.md](91-90-grimoire.md) : pont de compatibilité conservé pour la restitution

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
- [EXO LECTURE : ~20 minutes : un cycle (Observabilite)](11-EXO_LECTURE.md)
- [Exercice : relier logs, métriques et traces (25 min)](12-EXO-VERIFICATION.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [PONT : de observer un système à collaborer avec des humains à l'artisanat en équipe](99A-PONT.md)
- [Challenge : `05-OBSERVABILITY`](95-challenge.md)
- [Grimoire : `05-OBSERVABILITY`](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Kintana est un cas d’étude pédagogique commun, pas un projet personnel imposé. Pour ce module, applique **la notion réellement enseignée ici** à la mission correspondante dans la [carte des missions Kintana par domaine](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). N’utilise pas automatiquement la FAQ IA : elle est réservée aux activités IA/RAG. Le challenge local de ce module reste la source de la consigne et de ses critères ; cette mise en pratique ne crée ni prérequis, ni gate supplémentaire.

## Ressources pratiques associées

- [Préparer l'activité (`SETUP.md`)](SETUP.md) : environnement, prérequis et commandes.
