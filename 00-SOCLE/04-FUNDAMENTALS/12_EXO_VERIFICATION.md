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
