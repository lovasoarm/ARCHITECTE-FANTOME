---
stability: intemporel
acte: reference
assessment_role: instructional_support
---

# Corrigé différé  : 09-FUNCTIONAL-JS

**Ne lire qu'après l'atelier.** Ce document est un guide de correction et non une sortie d'exécution certifiée.

## Raisonnement attendu

1. Identifier dans `03-immutability.md` la précondition déterminante pour `immutability`.
2. Produire une prédiction spécifique et falsifiable ; relever les entrées, l'environnement et la commande exacte.
3. Comparer la sortie observée à la prédiction. Ne pas modifier plusieurs facteurs en même temps.
4. Expliquer causalement la divergence : précondition, transformation, puis effet. Une simple copie de réponse échoue au critère d'autonomie.
5. Répéter le cas positif et le cas volontairement faux ; mesurer ou décrire le changement.

## Exemples résolus  : Immutabilité d’un état

Les exemples ci-dessous sont des **fixtures pédagogiques** : les résultats sont déduits des entrées affichées ou des hypothèses explicitement données. Ils ne prétendent pas qu’une commande, un service ou une infrastructure a été exécuté dans cette release.

### Exemple A  : Modifier un seul élément sans muter l’ancien état

```js
const before = [
  { id: 1, done: false },
  { id: 2, done: false }
];
const after = before.map(task =>
  task.id === 2 ? { ...task, done: true } : task
);
console.log(before[1].done); // false
console.log(after[1].done);  // true
console.log(before === after); // false
```
Le tableau extérieur et l’objet modifié sont nouveaux ; l’objet inchangé peut être partagé. La fonction ne modifie pas `before`.

### Exemple B  : Le piège de la mutation cachée

```js
const state = { user: { name: 'Mina' } };
const next = { ...state };
next.user.name = 'Lina';
console.log(state.user.name); // 'Lina'
```
Le spread n’a copié que le premier niveau. Pour respecter le contrat, crée également un nouvel objet `user` : `const next = { ...state, user: { ...state.user, name: 'Lina' } };`. La copie doit suivre les chemins modifiés, pas nécessairement tout le graphe.

## Barème / 10

Prédiction précise (2), preuve reproductible (2), cas négatif observé (2), diagnostic et correctif (2), transfert contextualisé (2). **Un cas inventé ou sans trace obtient zéro sur le critère de preuve.**

**Limite :** les sorties qui dépendent d’une exécution n’ont pas été calculées ici : exécute l’exercice dans l’environnement prévu par la leçon, compare le résultat à ces critères et conserve ta preuve. Ne présente jamais un résultat attendu comme une exécution réellement observée. Ce corrigé guide le raisonnement ; il ne prétend pas fournir une implémentation complète.
