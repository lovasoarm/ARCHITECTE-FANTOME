---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [constraints_injectees, changement_contexte]
anti_recipe_key: constraints_injectees+changement_contexte
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# 01b : var / let / const : trois portes, trois pièges

Temps de lecture ~5 min

Trois mots-clés. Un seul survit en 2026 sur du code neuf : `const`. Les deux autres, faut les connaître pour lire le code des autres.

## Le tableau qui tue

| Mot-clé | Scope     | Réassignable | Hoisting                  | Verdict        |
| ------- | --------- | ------------ | ------------------------- | -------------- |
| `var`   | fonction  | oui          | hoisted, init `undefined` | legacy, évite  |
| `let`   | bloc `{}` | oui          | hoisted, TDZ              | quand ça bouge |
| `const` | bloc `{}` | non          | hoisted, TDZ              | par défaut     |

TDZ = Temporal Dead Zone. Lire avant la déclaration → `ReferenceError`. C'est voulu.

## Piège classique

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Affiche 3, 3, 3
```

Avec `let`, tu obtiens 0, 1, 2. Pourquoi ? Chaque itération crée un nouveau binding.

## Ce que l'analogie cache

On dit souvent "const = valeur figée". Faux. `const` fige le **binding**, pas la valeur. `const arr = []; arr.push(1)` marche. Le tableau n'est pas gelé, seul le nom l'est.

## Mission

Retape la boucle `setTimeout` avec `var` puis avec `let`. Prédis avant de lancer.

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
