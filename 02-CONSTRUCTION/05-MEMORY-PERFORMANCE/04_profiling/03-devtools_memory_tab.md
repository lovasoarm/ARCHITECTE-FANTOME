---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [decision_organisationnelle, defaut_cache]
anti_recipe_key: decision_organisationnelle+defaut_cache
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : prolongation au stade :** deux solutions ont l'air équivalentes jusqu'à ce que l'une épuise l'équipe au bout de 90 minutes. La mémoire et la performance se voient souvent dans la durée, pas dans la première démo.

# 02 : DevTools Memory tab : le guide de terrain

Temps de lecture ~5 min

Trois outils dans l'onglet Memory. Chacun répond à une question différente.

## 1. Heap snapshot : "qui vit maintenant ?"

- Snapshot avant l'action suspecte.
- Snapshot après.
- Comparaison (dropdown "Comparison").
- Tri par "Delta". Les objets qui grossissent, c'est là.

Colonnes qui comptent : **Shallow size** (l'objet seul), **Retained size** (l'objet + ce qu'il empêche de collecter).

## 2. Allocation instrumentation on timeline : "qui alloue trop ?"

Enregistre. Fais l'action. Stop. Les barres bleues persistantes = alloué et jamais libéré = suspect.

## 3. Allocation sampling : "où alloue mon code chaud ?"

Léger. Bon pour prod-like. Te dit **quelle fonction** alloue le plus.

## Workflow anti-fuite

1. Baseline : snapshot A à froid.
2. Fais l'action 3 fois (chauffe caches).
3. Snapshot B.
4. Fais l'action 10 fois.
5. Snapshot C.
6. Compare B→C. Si delta > 0 régulier → fuite.

## Piège

DevTools force un GC avant snapshot, mais **pas** entre allocations. Ne panique pas sur un pic si le suivant est plat.

## Mission

Sur n'importe quelle SPA (la tienne, un mini-projet), trouve une fuite en < 20 min avec ce workflow. Note-la dans un fichier `LEAK_REPORT.md`.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.

### Transfert : changer de contexte

Applique le mécanisme de « 02 : DevTools Memory tab : le guide de terrain » à un service long-vivant plutôt qu’un script ponctuel. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:performance -->

## Repère visuel utile : Choisir la vue mémoire adaptée

```text
timeline d’allocations
         |
         v
instantané du heap
         |
         v
comparaison entre états
         |
         v
collecte puis objets retenus
         |
         v
identifier la référence survivante
```

<!-- AF-LESSON-PROFILE: performance -->

## Repères de décision

- **Pourquoi :** La performance influence l'expérience utilisateur et le coût d'exploitation. Il faut repérer le goulot réel avant de changer l'algorithme, le cache ou la mémoire.
- **Quand l’utiliser / quand l’éviter :** Mesure avant toute optimisation. Utilise profiling et benchmark sur une charge représentative ; évite un micro-benchmark qui n'observe pas le chemin de production.
- **Limites :** Un benchmark local ne prédit pas exactement la production. Les caches chauds, le GC, le matériel, la concurrence et la distribution des données peuvent changer le résultat.

## Mécanisme : la version sans magie

Établis une baseline, profile, identifie le coût dominant, change une seule variable, relance plusieurs fois et compare quantiles et mémoire.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **02 : DevTools Memory tab : le guide de terrain** se rattache à ce cas concret : Sur Kintana, la liste des demandes ou l'agrégation des créneaux peut devenir lente à mesure que le nombre de demandes augmente.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Comparer allocations et rétention dans DevTools

**Mission liée à « 02 : DevTools Memory tab : le guide de terrain » :** Sur un scénario Kintana, observe les allocations, prends un instantané et recherche ce qui reste retenu après la fin du parcours. Note les actions qui rendent la capture comparable.

**Livrable :** Capture annotée, chemin de rétention et conclusion avec niveau de confiance.

**Critères d’acceptation :** Le parcours de capture est reproductible ; les objets transitoires sont distingués des objets durablement retenus ; les captures ne contiennent pas de données sensibles.

**Transfert obligatoire :** Les snapshots sont trop différents : fixe une séquence d’actions et recommence la comparaison.
