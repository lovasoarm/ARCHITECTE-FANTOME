---
stability: intemporel
acte: reference
assessment_role: instructional_support
---

# Corrigé différé : 05-MEMORY-PERFORMANCE

**Ne lire qu'après l'atelier.** Ce document est un guide de correction et non une sortie d'exécution certifiée.

## Raisonnement attendu

1. Identifier dans `02_copy_vs_ref/02-shallow_vs_deep.md` la précondition déterminante pour `shallow vs deep`.
2. Produire une prédiction spécifique et falsifiable ; relever les entrées, l'environnement et la commande exacte.
3. Comparer la sortie observée à la prédiction. Ne pas modifier plusieurs facteurs en même temps.
4. Expliquer causalement la divergence : précondition, transformation, puis effet. Une simple copie de réponse échoue au critère d'autonomie.
5. Répéter le cas positif et le cas volontairement faux ; mesurer ou décrire le changement.

## Exemples résolus : Copie superficielle et copie profonde

Les exemples ci-dessous sont des **fixtures pédagogiques** : les résultats sont déduits des entrées affichées ou des hypothèses explicitement données. Ils ne prétendent pas qu’une commande, un service ou une infrastructure a été exécuté dans cette release.

### Exemple A : Modifier une copie superficielle

```js
const original = { id: 7, profile: { city: "Antananarivo" } };
const copy = { ...original };
copy.profile.city = "Toamasina";
console.log(original.profile.city); // 'Toamasina'
```

`...original` a créé un nouvel objet extérieur, mais `original.profile` et `copy.profile` référencent le même objet. Le changement imbriqué est donc visible des deux côtés.

### Exemple B : Copie profonde ciblée

```js
const original = { id: 7, profile: { city: "Antananarivo" } };
const copy = structuredClone(original);
copy.profile.city = "Toamasina";
console.log(original.profile.city); // 'Antananarivo'
```

`structuredClone` sépare ici l’objet imbriqué. Il ne faut pas en faire une règle aveugle : les fonctions ne sont pas clonables par `structuredClone`, et copier profondément tout un graphe peut coûter cher. Choisis la profondeur selon le contrat de partage réellement voulu.

## Barème / 10

Prédiction précise (2), preuve reproductible (2), cas négatif observé (2), diagnostic et correctif (2), transfert contextualisé (2). **Un cas inventé ou sans trace obtient zéro sur le critère de preuve.**

**Limite :** les sorties qui dépendent d’une exécution n’ont pas été calculées ici : exécute l’exercice dans l’environnement prévu par la leçon, compare le résultat à ces critères et conserve ta preuve. Ne présente jamais un résultat attendu comme une exécution réellement observée. Ce corrigé guide le raisonnement ; il ne prétend pas fournir une implémentation complète.
