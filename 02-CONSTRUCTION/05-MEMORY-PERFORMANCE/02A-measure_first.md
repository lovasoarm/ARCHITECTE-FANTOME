---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [constraints_injectees, preuve_partielle]
anti_recipe_key: constraints_injectees+preuve_partielle
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : jauge de chakra :** optimiser sans mesurer, c'est demander à Naruto de vider son chakra sans regarder la jauge. D'abord la mesure, ensuite le coup de génie ; sinon tu optimises peut-être le mauvais ralentissement.

# 00 : Mesure avant d'optimiser (règle non négociable)

Temps de lecture ~5 min

> **Mesure avant d'optimiser.** Sans mesure, ce n'est pas de l'optimisation,
> c'est de la superstition.

## La règle

Aucune "optimisation" n'entre dans le code sans **3 chiffres** :

1. La valeur **avant**.
2. La valeur **après**.
3. La **charge** exacte utilisée pour mesurer (taille des données, nombre
   d'itérations, hardware).

Si tu ne peux pas produire ces 3 chiffres, tu n'optimises pas : tu
compliques le code au hasard.

## Benchmark minimal

```js
function bench(label, fn, iters = 1e6) {
  const t0 = performance.now();
  for (let i = 0; i < iters; i++) fn(i);
  const dt = performance.now() - t0;
  console.log(
    `${label}: ${dt.toFixed(2)}ms (${((iters / dt) * 1000) | 0} op/s)`,
  );
}
```

Exercice : compare `Array.push` vs `Array[i] = x` pour construire un tableau
de 1M d'entiers. Publie les 3 chiffres.

## Pièges classiques

- **JIT warmup** : les 1 000 premières itérations ne sont pas représentatives.
  Fais un "warmup" muet avant la mesure.
- **Dead code elimination** : si le résultat n'est jamais utilisé, le moteur
  peut supprimer l'appel. Utilise un accumulateur (`let acc = 0; acc += fn(i);`)
  et log-le une fois à la fin.
- **Variance** : lance 5 fois, garde la médiane, pas la moyenne.

## Encart à copier dans tout PR "perf"

```text
### Bench
- Avant : ___ ms (charge : ___)
- Après : ___ ms
- Δ   : ___%
- Machine : ___
```

## (attention) Ce que l'analogie "plus rapide = mieux" cache

Une version 20% plus rapide mais 3× plus complexe à maintenir est une
**régression** business. La lisibilité est aussi une perf : la perf du
prochain humain qui lit le code.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

<!-- AF-DIAGRAM:performance -->

## Repère visuel utile : Mesurer avant toute optimisation

```text
question mesurable
      |
      v
baseline reproductible
      |
      v
charge + répétitions contrôlées
      |
      v
métriques pertinentes
      |
      v
comparaison et décision
```

<!-- AF-LESSON-PROFILE: performance -->

## Repères de décision

- **Pourquoi :** La performance influence l'expérience utilisateur et le coût d'exploitation. Il faut repérer le goulot réel avant de changer l'algorithme, le cache ou la mémoire.
- **Quand l’utiliser / quand l’éviter :** Mesure avant toute optimisation. Utilise profiling et benchmark sur une charge représentative ; évite un micro-benchmark qui n'observe pas le chemin de production.
- **Limites :** Un benchmark local ne prédit pas exactement la production. Les caches chauds, le GC, le matériel, la concurrence et la distribution des données peuvent changer le résultat.

## Mécanisme : la version sans magie

Établis une baseline, profile, identifie le coût dominant, change une seule variable, relance plusieurs fois et compare quantiles et mémoire.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **00 : Mesure avant d'optimiser (règle non négociable)** se rattache à ce cas concret : Sur Kintana, la liste des demandes ou l'agrégation des créneaux peut devenir lente à mesure que le nombre de demandes augmente.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Décider à partir d’une mesure reproductible

**Mission liée à « 00 : Mesure avant d'optimiser (règle non négociable) » :** Écris une hypothèse de performance Kintana et définis avant l’essai la charge, l’environnement, les répétitions, la métrique et le seuil d’action. N’optimise que si les données le justifient.

**Livrable :** Fiche d’expérience préenregistrée et baseline avec dispersion.

**Critères d’acceptation :** Le protocole précède le résultat ; les versions et conditions sont identiques ; les écarts et valeurs aberrantes sont expliqués.

**Transfert obligatoire :** La baseline ne confirme pas l’hypothèse : documente la conclusion négative et arrête l’optimisation.
