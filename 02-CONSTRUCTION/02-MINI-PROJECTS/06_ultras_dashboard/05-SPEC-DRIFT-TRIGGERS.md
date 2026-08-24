---
stability: intemporel
acte: comprendre
cognitive_level: L6
perturbation_modes: [constraints_injectees, preuve_partielle]
anti_recipe_key: constraints_injectees+preuve_partielle
transfer_distance: medium
assessment_role: project_mastery
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# SPEC DRIFT TRIGGERS : 06_ultras_dashboard

Temps de lecture ~2 min

Trois déclencheurs à activer si `SPEC_DRIFT_MODE=on`. Chacun simule un changement
de spec en cours de projet : pas au démarrage. Objectif : entraîner à renégocier
sans bricoler.

## J+1 : nouveau champ obligatoire

<!-- AF-DIAGRAM:recall -->

```text
text
J+1 ──► J+3 ──► J+7 ──► J+14 ──► J+28
 │        │        │         │         │
free    explain  diagnose   transfer  defend inverse
```

Le rappel distribué réactive la compétence sous des formes différentes au fil du temps.

Le donneur d'ordre ajoute un champ obligatoire à ton contrat d'entrée (ex. `traceId`
sur chaque événement). Tu dois : (1) refuser proprement les anciens payloads OU
(2) rétro-remplir. Documente le choix dans `08-POSTMORTEM.md`.

## J+3 : changement de format d'entrée

Le format d'entrée passe de JSON à NDJSON (ou CSV -> Parquet, ou GET -> POST body).
Tu ne peux pas tout réécrire. Tu dois isoler l'adaptateur d'entrée derrière une
frontière et faire cohabiter les deux formats pendant une fenêtre de migration.

## J+5 : exigence de perf ajoutée en cours de route

Le donneur d'ordre exige désormais un P95 < 100 ms (ou un throughput × 10, ou
un cold-start < 500 ms). Ta stack actuelle ne le tient pas. Tu dois : mesurer
avant de toucher, choisir un axe (cache / algo / batch / dédup) et documenter
l'ADR correspondant.

## Livrable obligatoire

Section `## Comment j'ai encaissé le drift` dans `08-POSTMORTEM.md`, avec au moins
une ligne par déclencheur activé et le coût réel payé.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.
