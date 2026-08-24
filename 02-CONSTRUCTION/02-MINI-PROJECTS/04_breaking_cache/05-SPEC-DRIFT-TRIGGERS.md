---
stability: intemporel
acte: comprendre
cognitive_level: L6
perturbation_modes: [changement_contexte, decision_inversee]
anti_recipe_key: changement_contexte+decision_inversee
transfer_distance: medium
assessment_role: project_mastery
---

> ### SCÈNE CRAZYDEVS : Breaking Bad
>
> Le système est maintenant ton labo : le mécanisme semble tranquille jusqu'au moment où une petite incohérence fait toute la différence. Ton job n'est pas de réciter la règle : **trouve l'ouverture, mesure ce qui casse, puis ferme-la sans tricher**.
>
> **Règle de scène :** l'analogie sert le mécanisme ; dès qu'elle simplifie trop, reviens au modèle technique exact.

# SPEC DRIFT TRIGGERS : 04_breaking_cache

<!-- AF-DIAGRAM:cache -->

```text
text
Request
  │
  ▼
┌──────────┐
│  Cache   │
└─┬────┬───┘
  │hit │miss
  ▼    ▼
Value  ┌──────────┐
       │ Database │
       └────┬─────┘
            ▼
         populate
```

Le cache court-circuite la source de vérité en cas de hit et la recharge en cas de miss.

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

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.
