---
stability: intemporel
acte: comprendre
cognitive_level: L8
perturbation_modes: [decision_inversee, defaut_cache]
anti_recipe_key: decision_inversee+defaut_cache
transfer_distance: high
assessment_role: transfer_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# LIRE DU CODE HUMAIN vs LIRE DU code IA

Temps de lecture ~2 min

Deux styles, deux pièges, deux stratégies de lecture.

## Le code humain legacy

```js
// écrit en 2019, jamais retouché, prod critique
function processOrder(o) {
  var t = 0;
  for (var i = 0; i < o.items.length; i++) {
    t += o.items[i].p * o.items[i].q; // p=prix, q=quantite
    if (o.items[i].t) t += o.items[i].t; // taxe fixe si presente
  }
  return o.d ? t * (1 - o.d) : t; // d = discount 0..1
}
```

Piège : noms cryptiques, historique invisible, mais **cohérent avec lui-même**. Il y a une logique
implicite qu'un humain fatigué en 2019 a "casée" ici. Cherche cette logique avant de refactorer.

## Le code IA plausible mais faux

```js
// généré, "propre", ne compile pas dans ton runtime
async function processOrder(order) {
  const total = order.items.reduce(
    (acc, item) => acc + item.price * item.qty + (item.tax ?? 0),
    0,
  );
  return order.discount ? total * (1 - order.discount) : total;
}
```

Piège : lisible, moderne, **mais** peut avoir inventé `item.tax` alors que le schema réel a `item.vat`.
l'IA optimise la vraisemblance, pas la vérité de ton schema.

## Stratégie de lecture

- Code humain : cherche l'intention derrière les raccourcis. Ne renomme pas avant d'avoir compris.
- code IA : vérifie chaque nom de champ contre le schéma réel. Doute des defaults inventés.
- Dans les deux cas : `git blame` et tests > relecture seule.

<!-- AF-DIAGRAM:transferability -->

## Repère visuel utile : Transférer un invariant entre écosystèmes

```text
principe abstrait / invariant
          |
     +----+----+
     v         v
 runtime A   runtime B
     |         |
 implémenter implémenter
     |         |
     +----+----+
          v
    mêmes fixtures
          |
          v
 comparer traces + limites
```

<!-- AF-LESSON-PROFILE: transfer -->

## Repères de décision

- **Pourquoi :** Le transfert vérifie que tu as compris un principe et pas seulement mémorisé une syntaxe ou une recette liée à un outil.
- **Quand l’utiliser / quand l’éviter :** Utilise-le quand tu changes de langage, de runtime, de framework ou de contexte métier. Évite de transposer mot à mot une abstraction qui n'existe pas dans l'écosystème cible.
- **Limites :** Les sémantiques de mémoire, concurrence, erreurs et bibliothèques diffèrent. Une analogie entre langages ne prouve pas l'équivalence de leur comportement.

## Mécanisme : la version sans magie

Identifie l'invariant, lis le modèle du langage cible, implémente une version minimale, puis compare les traces et les cas limites.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **LIRE DU CODE HUMAIN vs LIRE DU code IA** se rattache à ce cas concret : Kintana peut être implémenté ou instrumenté dans plusieurs technologies. Les garanties d'idempotence et d'ordre doivent rester les mêmes même si la syntaxe change.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Transférer un invariant entre écosystèmes

> **Arc One Piece / Grand Line :** si tu changes de navire, le principe doit encore naviguer. Le but n'est pas de réciter JavaScript dans un autre langage, mais de reconnaître le même mécanisme.

**Mission liée à « LIRE DU CODE HUMAIN vs LIRE DU code IA » :** Prends le mécanisme de la leçon et reconstruis-le dans un langage ou runtime différent. Utilise une fixture commune, compare les traces et note ce qui ne se transpose pas directement.

**Livrable :** deux implémentations ou une implémentation et un modèle de référence, tests partagés, tableau de sémantique et note de divergence.

**Critères d’acceptation :** les mêmes entrées sont utilisées ; les divergences sont expliquées ; aucune équivalence n'est revendiquée sans test ; les différences du runtime sont explicites.

**Transfert obligatoire :** Change l'hypothèse de concurrence ou d'erreur du second environnement. Révise ton modèle plutôt que de forcer la première solution.
