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

### Vérification observable : critères de réussite

Prépare trois vérifications : cas nominal, cas limite et cas invalide. Écris avant l’exécution l’assertion attendue pour « 03 : Node : flamegraph avec clinic / 0x », puis conserve le résultat et explique tout écart.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:performance -->

## Repère visuel utile : Interpréter un flamegraph Node

```text
échauffement du service
       |
       v
collecte d’échantillons CPU
       |
       v
largeur des piles = temps échantillonné
       |
       v
distinguer temps propre et inclusif
       |
       v
profiler à nouveau après changement
```

<!-- AF-LESSON-PROFILE: performance -->

## Repères de décision

- **Pourquoi :** La performance influence l'expérience utilisateur et le coût d'exploitation. Il faut repérer le goulot réel avant de changer l'algorithme, le cache ou la mémoire.
- **Quand l’utiliser / quand l’éviter :** Mesure avant toute optimisation. Utilise profiling et benchmark sur une charge représentative ; évite un micro-benchmark qui n'observe pas le chemin de production.
- **Limites :** Un benchmark local ne prédit pas exactement la production. Les caches chauds, le GC, le matériel, la concurrence et la distribution des données peuvent changer le résultat.

## Mécanisme : la version sans magie

Établis une baseline, profile, identifie le coût dominant, change une seule variable, relance plusieurs fois et compare quantiles et mémoire.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **03 : Node : flamegraph avec clinic / 0x** se rattache à ce cas concret : Sur Kintana, la liste des demandes ou l'agrégation des créneaux peut devenir lente à mesure que le nombre de demandes augmente.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Profiler un processus Node sans mesurer le démarrage

**Mission liée à « 03 : Node : flamegraph avec clinic / 0x » :** Définis un scénario Kintana qui échauffe le service, collecte un profil CPU et examine les piles dominantes pendant la charge utile. Sépare démarrage, échauffement et régime établi.

**Livrable :** Commandes documentées, profil CPU et interprétation des piles.

**Critères d’acceptation :** La version Node et la charge sont consignées ; la phase mesurée est explicite ; la capture n’est pas présentée comme un résultat de production.

**Transfert obligatoire :** Le profil change après échauffement : explique les effets de compilation et de spécialisation possibles sans prétendre connaître le détail interne.
