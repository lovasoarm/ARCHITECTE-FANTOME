---
stability: stable
acte: verification
assessment_role: instructional_checkpoint
---

**SCÈNE CRAZYDEVS : atelier de Konoha :** observe les contraintes avant de choisir une technique.

# EXO 12 : copie superficielle et référence imbriquée

Temps indicatif : 12 min.

```js
const original = { name: "Mika", profile: { rank: "genin" } };
const copy = { ...original };
copy.profile.rank = "chunin";
console.log(original.profile.rank);
```

**Questions**

1. Prédis la sortie sans exécuter le code.
2. Explique pourquoi la copie de premier niveau ne duplique pas l’objet `profile`.
3. Propose une copie adaptée à cet objet précis : `{ ...original, profile: { ...original.profile } }`.
4. Explique pourquoi cette technique ne constitue pas une copie profonde générale si des niveaux supplémentaires ou des types particuliers existent.

**Preuve** : un test doit démontrer que la modification de `copy.profile` ne change plus `original.profile` après correction.

## CORRIGÉ DE RÉFÉRENCE : APRÈS TENTATIVE

La sortie de la version initiale est `"chunin"`. L'opérateur spread crée un nouvel objet de premier niveau, mais copie la référence de `profile` : `original.profile` et `copy.profile` désignent donc le même objet.

```js
import assert from "node:assert/strict";
const original = { name: "Mika", profile: { rank: "genin" } };
const copy = { ...original, profile: { ...original.profile } };
copy.profile.rank = "chunin";
assert.equal(copy.profile.rank, "chunin");
assert.equal(original.profile.rank, "genin");
assert.notEqual(copy.profile, original.profile);
```

Cette copie explicite suffit pour la structure montrée, car `profile` ne contient ici qu'une valeur primitive. Elle ne copie pas récursivement tous les niveaux. Pour des structures compatibles, `structuredClone(original)` réalise une copie profonde selon l'algorithme de clonage structuré ; ce n'est pas une solution universelle pour les fonctions, les nœuds DOM ou des instances de classes dont on voudrait préserver le prototype.
