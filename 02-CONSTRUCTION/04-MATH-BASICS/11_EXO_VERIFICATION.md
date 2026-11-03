---
stability: stable
acte: verification
assessment_role: instructional_checkpoint
---

**SCÈNE CRAZYDEVS : atelier de Konoha :** observe les contraintes avant de choisir une technique.

# EXO : nombres flottants : égalité et tolérance

Temps indicatif : 12 min.

Une IA propose :

```js
const total = 0.1 + 0.2;
if (total === 0.3) {
  console.log("OK");
} else {
  console.log("ÉCHEC");
}
```

Elle affirme que JavaScript calcule mal l’addition.

**Mission**

1. Prédis le résultat et explique la représentation binaire approchée des nombres décimaux.
2. Remplace le test par une comparaison avec une tolérance adaptée au domaine.
3. Explique pourquoi il n’existe pas une tolérance universelle : unités, échelle et erreur acceptable comptent.
4. Donne un exemple où arrondir trop tôt serait dangereux.

**Critère** : ne présente pas les nombres flottants comme « faux » ; explique qu’ils représentent une approximation finie et que le code doit choisir une stratégie de comparaison adaptée.
