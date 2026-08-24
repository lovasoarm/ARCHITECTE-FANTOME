---
stability: intemporel
acte: comprendre
cognitive_level: L6
perturbation_modes: [solution_concurrente, regression]
anti_recipe_key: solution_concurrente+regression
transfer_distance: medium
assessment_role: project_mastery
---

> **SCÈNE CRAZYDEVS : prolongation au stade :** deux solutions ont l'air équivalentes jusqu'à ce que l'une épuise l'équipe au bout de 90 minutes. La mémoire et la performance se voient souvent dans la durée, pas dans la première démo.

# SPEC DRIFT TRIGGERS : 13_memory_hunter

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

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.
