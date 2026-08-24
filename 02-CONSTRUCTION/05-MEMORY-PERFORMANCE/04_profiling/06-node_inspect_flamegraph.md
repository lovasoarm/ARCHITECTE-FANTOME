---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L4
perturbation_modes: [temps_limite, fausse_piste]
anti_recipe_key: temps_limite+fausse_piste
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : prolongation au stade :** deux solutions ont l'air équivalentes jusqu'à ce que l'une épuise l'équipe au bout de 90 minutes. La mémoire et la performance se voient souvent dans la durée, pas dans la première démo.

# 03 : Node : flamegraph avec clinic / 0x

Temps de lecture ~5 min

Un flamegraph, c'est une carte thermique du temps CPU. Colonnes larges = fonctions qui bouffent. Tours hautes = piles d'appels profondes.

## Setup rapide

```bash
npm i -g clinic
clinic flame -- node server.js
# fais tourner ton bench (autocannon, k6, ab)
# Ctrl+C -> ouvre le HTML
```

Alternative : `0x`, plus léger. `npx 0x server.js`.

## Lire un flame

- Axe X : temps cumulé (**pas** temps réel).
- Axe Y : profondeur de call stack.
- Une **large plaque plate en haut** = fonction feuille qui bouffe → cible n°1.
- Beaucoup de tours étroites = ok.
- Grosse plaque `GC` ou `Zone` → tu alloues trop.

## Cas typiques

- `JSON.parse` large : passe au streaming.
- `Regex` catastrophique : ReDoS, refais le pattern.
- `crypto.pbkdf2Sync` sur route hot : passe en async, ou déplace.

## Ce que l'analogie cache

Le flame ne dit **pas** ce qui est bloquant vs concurrent. Combine avec `--inspect` et le profiler CPU si tu doutes de l'async.

## Mission

Prends `02-CONSTRUCTION/02-MINI-PROJECTS/11_scheduler` (ou n'importe quel script Node). Génère un flame. Identifie la fonction la plus chaude. Optimise-la. Remesure.

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.
