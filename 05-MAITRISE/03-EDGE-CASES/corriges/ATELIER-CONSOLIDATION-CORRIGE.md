---
stability: intemporel
acte: reference
assessment_role: instructional_support
---

# Corrigé différé : 03-EDGE-CASES

**Ne lire qu'après l'atelier.** Ce document est un guide de correction et non une sortie d'exécution certifiée.

## Raisonnement attendu

1. Identifier dans `02-nan_undefined_null.md` la précondition déterminante pour `nan undefined null`.
2. Produire une prédiction spécifique et falsifiable ; relever les entrées, l'environnement et la commande exacte.
3. Comparer la sortie observée à la prédiction. Ne pas modifier plusieurs facteurs en même temps.
4. Expliquer causalement la divergence : précondition, transformation, puis effet. Une simple copie de réponse échoue au critère d'autonomie.
5. Répéter le cas positif et le cas volontairement faux ; mesurer ou décrire le changement.

## Exemples résolus : NaN, undefined et null

Les exemples ci-dessous sont des **fixtures pédagogiques** : les résultats sont déduits des entrées affichées ou des hypothèses explicitement données. Ils ne prétendent pas qu’une commande, un service ou une infrastructure a été exécuté dans cette release.

### Exemple A : Distinguer les trois états

```js
const absent = {}.missing; // undefined
const explicit = { value: null }.value; // null
const invalid = Number("abc"); // NaN
console.log(absent === undefined); // true
console.log(explicit === null); // true
console.log(Number.isNaN(invalid)); // true
```

Les tests utilisent l’opérateur et la fonction adaptés à chaque valeur ; `NaN === NaN` est faux.

### Exemple B : `??` ne traite pas `0` comme absent

```js
const limit = 0;
const effective = limit ?? 20;
console.log(effective); // 0
```

Le coalescent nul (`??`) utilise le défaut uniquement pour `null` ou `undefined`. L’expression `limit || 20` donnerait 20 parce que zéro est falsy. Si zéro est une valeur métier valide, `||` détruit l’information.

## Barème / 10

Prédiction précise (2), preuve reproductible (2), cas négatif observé (2), diagnostic et correctif (2), transfert contextualisé (2). **Un cas inventé ou sans trace obtient zéro sur le critère de preuve.**

**Limite :** les sorties qui dépendent d’une exécution n’ont pas été calculées ici : exécute l’exercice dans l’environnement prévu par la leçon, compare le résultat à ces critères et conserve ta preuve. Ne présente jamais un résultat attendu comme une exécution réellement observée. Ce corrigé guide le raisonnement ; il ne prétend pas fournir une implémentation complète.
