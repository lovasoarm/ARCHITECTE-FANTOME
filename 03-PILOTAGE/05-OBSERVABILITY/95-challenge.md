---
stability: intemporel
acte: pratiquer
route: survie
cognitive_level: L4
perturbation_modes: [changement_echelle, preuve_partielle]
anti_recipe_key: changement_echelle+preuve_partielle
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : QG de Konoha :** six équipes, trois régions, une mission critique. Si tu ne sais pas relier signal, seuil, coût et action, ton tableau de bord ressemble à une tour de contrôle qui clignote sans dire quel avion tombe.

# Challenge : `05-OBSERVABILITY`

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

Temps de lecture ~2 min

Acte attendu : pratiquer. Ce fichier ne contient pas de nouvel énoncé : il **promeut** les
épreuves déjà écrites dans ce module et fixe ce qui les valide.

## Les épreuves de ce module, dans l'ordre

- [50-structured_logging_minimini_projet.md](50-structured_logging_minimini_projet.md)
- [03 : Distributed tracing (papier d'abord)](04-tracing_paper_drill.md)
- [LIRE UNE STACK TRACE DE PROD QUAND LE CODE SOURCE N'EXISTE PLUS](08-prod_stack_trace_drill.md)
- [08 : On-call drill : il est 3h du matin](09-oncall_drill.md)
- [09 : Instrumenter TON projet (OpenTelemetry local, zéro compte externe)](10-instrumenter_ton_projet.md)
- [EXO LECTURE : 15-25 minutes (Observabilite)](11-EXO_LECTURE.md)
- [EXO [JEUNE IA] : 03-PILOTAGE/05-OBSERVABILITY](12-EXO-VERIFICATION.md)

## Ce qui valide le challenge (les quatre actes, aucun ne se saute)

- [ ] **Construire** : le livrable demandé existe dans ton dépôt de projet fil rouge, il tourne.
- [ ] **Expliquer** : tu décris en cinq lignes ce que tu as construit, sans jargon.
- [ ] **Justifier** : tu écris pourquoi cette solution et pas l'autre, avec le critère qui a tranché.
- [ ] **Défendre** : un contradicteur attaque le point faible, tu réponds par écrit.

Rien ne se coche sur une lecture. Reporte le résultat dans
[PROGRESSION.md](../../PROGRESSION.md).

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.
