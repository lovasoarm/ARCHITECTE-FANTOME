---
stability: stable
acte: verification
assessment_role: instructional_checkpoint
---

**SCÈNE CRAZYDEVS : atelier de Konoha :** observe les contraintes avant de choisir une technique.

# EXO : un test qui tue une mutation

Temps indicatif : 20 min.

Fonction de départ :

```js
function isAdult(age) {
  return age >= 18;
}
```

Test initial trop faible :

```js
expect(isAdult(20)).toBe(true);
```

**Mission**

1. Explique pourquoi le test passe encore si `>=` est remplacé par `>` (mutation).
2. Ajoute les cas `17`, `18` et `19`, avec les résultats attendus.
3. Invente une mutation différente (par exemple seuil `21`) et vérifie si tes tests la détectent.
4. Distingue couverture de lignes et capacité à détecter un comportement incorrect.

**Critère** : au moins une mutation plausible doit faire échouer la suite. N’affirme pas qu’un score de mutation garantit l’absence de bugs.
