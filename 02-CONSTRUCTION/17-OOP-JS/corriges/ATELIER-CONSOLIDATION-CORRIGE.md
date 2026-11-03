---
stability: intemporel
acte: reference
assessment_role: instructional_support
---

# Corrigé différé : 17-OOP-JS

**Ne lire qu'après l'atelier.** Ce document est un guide de correction et non une sortie d'exécution certifiée.

## Raisonnement attendu

1. Identifier dans `03-constructor_functions.md` la précondition déterminante pour `constructor functions`.
2. Produire une prédiction spécifique et falsifiable ; relever les entrées, l'environnement et la commande exacte.
3. Comparer la sortie observée à la prédiction. Ne pas modifier plusieurs facteurs en même temps.
4. Expliquer causalement la divergence : précondition, transformation, puis effet. Une simple copie de réponse échoue au critère d'autonomie.
5. Répéter le cas positif et le cas volontairement faux ; mesurer ou décrire le changement.

## Exemples résolus : Fonctions constructeurs

Les exemples ci-dessous sont des **fixtures pédagogiques** : les résultats sont déduits des entrées affichées ou des hypothèses explicitement données. Ils ne prétendent pas qu’une commande, un service ou une infrastructure a été exécuté dans cette release.

### Exemple A : Une méthode partagée sur le prototype

```js
function Reservation(id) {
  this.id = id;
}
Reservation.prototype.describe = function () {
  return `Reservation ${this.id}`;
};
const a = new Reservation("R-1");
const b = new Reservation("R-2");
console.log(a.describe()); // 'Reservation R-1'
console.log(a.describe === b.describe); // true
```

Les deux objets possèdent leurs propres `id`, mais partagent la même fonction `describe` via le prototype.

### Exemple B : L’appel sans `new` viole le contrat

En mode strict, `Reservation('R-3')` ne crée pas l’objet attendu et l’affectation à `this` échoue car `this` vaut `undefined`. Appeler une fonction constructeur sans `new` est donc une erreur de contrat. Si ce style ancien est imposé, protège-le avec `new.target` ou un contrôle explicite ; dans du nouveau code, une classe peut rendre l’intention plus lisible.

## Barème / 10

Prédiction précise (2), preuve reproductible (2), cas négatif observé (2), diagnostic et correctif (2), transfert contextualisé (2). **Un cas inventé ou sans trace obtient zéro sur le critère de preuve.**

**Limite :** les sorties qui dépendent d’une exécution n’ont pas été calculées ici : exécute l’exercice dans l’environnement prévu par la leçon, compare le résultat à ces critères et conserve ta preuve. Ne présente jamais un résultat attendu comme une exécution réellement observée. Ce corrigé guide le raisonnement ; il ne prétend pas fournir une implémentation complète.
