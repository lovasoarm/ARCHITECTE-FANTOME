---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [transmission, temps_limite]
anti_recipe_key: transmission+temps_limite
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# 05 : Race Condition Hunter

<!-- AF-DIAGRAM:race -->

```text
Temps ───────────────────────────────────►

Worker A ───── read ───── write A ───────

Worker B ─────────── read ───── write B ─
                       ▲
                       └─ résultat dépend de l’ordre
```

Une race condition apparaît lorsque plusieurs chemins concurrents peuvent produire des états différents selon leur ordre d’arrivée.

Temps de lecture ~5 min

> **Principe universel** : deux acteurs, une ressource, aucun ordre garanti = danger. Vrai en JS async, en threads, en microservices.

## Bug fourni

`race-damage.js` : deux Chevaliers Garo frappent le même Horror et incrémentent un compteur de dégâts partagé, via deux requêtes concurrentes `POST /hit`. Environ **1 fois sur 100**, le total de dégâts est faux (un coup disparaît).

## Protocole

1. Reproduis (voir `../../01-CADRAGE/03-DEBUGGING/05-repro_before_fix.md`). Boucle : `for i in $(seq 10000); do ...`.
2. Instrumente : logs avec `performance.now()` haute résolution + correlation ID par requête.
3. Identifie la **section critique** (les 2 lignes qui doivent être atomiques).
4. Choisis un remède : mutex applicatif, opération atomique DB (`UPDATE ... SET n = n + 1`), file d'attente, versionning optimiste.
5. Écris un ADR : pourquoi CE remède et pas les autres.

## Livrable

- `HYPOTHESES.md` + trace annotée.
- Fix + test qui casse **sans** le fix.
- ADR (1 page).

## (attention) Piège

Un `console.log` change le timing → le bug disparaît. Utilise un **buffer** logué à la fin, pas des logs synchrones.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.

<!-- AF-P0-2026-10-30: missing_transfer -->

### Transfert : changer de contexte

Applique le mécanisme de « 05 : Race Condition Hunter » à un autre fuseau horaire, une autre unité ou une horloge incohérente. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.
