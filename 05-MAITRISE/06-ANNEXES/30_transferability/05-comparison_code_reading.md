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

## CHECKPOINT DE PROFONDEUR : variation D : transfert négatif

<!-- AF-DIAGRAM:transfer -->

```text
text
Principe appris
      │
      ▼
Nouveau contexte
      │
      ├── invariant ──► conserver
      │
      └── hypothèse cassée ─► adapter
                                │
                                ▼
                             nouvelle décision
```

Le transfert teste ce qui survit du principe et ce qui doit être révisé dans un contexte nouveau.

Prends le mécanisme de cette page et transpose-le dans un contexte où il risque de devenir une mauvaise pratique. Explique **quelle hypothèse cesse d'être vraie**, quelle conséquence apparaît, et quelle stratégie tu utiliserais à la place.
