---
stability: intemporel
acte: reference
assessment_role: instructional_support
---

# Corrigé différé : 06-DATA-STRUCTURES

**Ne lire qu'après l'atelier.** Ce document est un guide de correction et non une sortie d'exécution certifiée.

## Raisonnement attendu

1. Identifier dans `07_hash_table/03-hash_table_arena.md` la précondition déterminante pour `hash table arena`.
2. Produire une prédiction spécifique et falsifiable ; relever les entrées, l'environnement et la commande exacte.
3. Comparer la sortie observée à la prédiction. Ne pas modifier plusieurs facteurs en même temps.
4. Expliquer causalement la divergence : précondition, transformation, puis effet. Une simple copie de réponse échoue au critère d'autonomie.
5. Répéter le cas positif et le cas volontairement faux ; mesurer ou décrire le changement.

## Exemples résolus : Table de hachage et collisions

Les exemples ci-dessous sont des **fixtures pédagogiques** : les résultats sont déduits des entrées affichées ou des hypothèses explicitement données. Ils ne prétendent pas qu’une commande, un service ou une infrastructure a été exécuté dans cette release.

### Exemple A : Compter des fréquences en un passage

```js
const words = ["chat", "chien", "chat"];
const counts = new Map();
for (const word of words) {
  counts.set(word, (counts.get(word) ?? 0) + 1);
}
console.log(counts.get("chat")); // 2
console.log(counts.get("chien")); // 1
```

On réalise un parcours et des accès moyens proches de O(1) par opération, soit O(n) attendu pour n éléments. Ce n’est pas une garantie absolue pour toutes les implémentations et toutes les distributions de clés.

### Exemple B : Une collision n’est pas une égalité

Supposons que deux chaînes différentes produisent le même indice de bucket. La structure doit conserver les deux paires clé/valeur et comparer la clé demandée pour retourner la bonne valeur. Si l’implémentation traite « même hash » comme « même clé », la seconde insertion écrase ou masque incorrectement la première. La correction est de résoudre les collisions (chaînage ou adressage ouvert selon la structure) et de comparer les clés, pas de supposer les collisions impossibles.

## Barème / 10

Prédiction précise (2), preuve reproductible (2), cas négatif observé (2), diagnostic et correctif (2), transfert contextualisé (2). **Un cas inventé ou sans trace obtient zéro sur le critère de preuve.**

**Limite :** les sorties qui dépendent d’une exécution n’ont pas été calculées ici : exécute l’exercice dans l’environnement prévu par la leçon, compare le résultat à ces critères et conserve ta preuve. Ne présente jamais un résultat attendu comme une exécution réellement observée. Ce corrigé guide le raisonnement ; il ne prétend pas fournir une implémentation complète.
