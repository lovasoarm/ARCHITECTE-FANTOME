---
stability: intemporel
acte: reference
assessment_role: instructional_support
---

# Corrigé différé : 07-ALGORITHMS

**Ne lire qu'après l'atelier.** Ce document est un guide de correction et non une sortie d'exécution certifiée.

## Raisonnement attendu

1. Identifier dans `02_searching/02-linear_binary.md` la précondition déterminante pour `linear binary`.
2. Produire une prédiction spécifique et falsifiable ; relever les entrées, l'environnement et la commande exacte.
3. Comparer la sortie observée à la prédiction. Ne pas modifier plusieurs facteurs en même temps.
4. Expliquer causalement la divergence : précondition, transformation, puis effet. Une simple copie de réponse échoue au critère d'autonomie.
5. Répéter le cas positif et le cas volontairement faux ; mesurer ou décrire le changement.

## Exemples résolus : Recherche linéaire et recherche binaire

Les exemples ci-dessous sont des **fixtures pédagogiques** : les résultats sont déduits des entrées affichées ou des hypothèses explicitement données. Ils ne prétendent pas qu’une commande, un service ou une infrastructure a été exécuté dans cette release.

### Exemple A : Recherche binaire dans une liste triée

Pour `values = [3, 8, 12, 19, 27, 31, 44]`, chercher `27`. On examine l’élément du milieu `19` ; comme `27 > 19`, on conserve la moitié droite `[27, 31, 44]`. Le milieu de cette tranche est `31` ; comme `27 < 31`, il reste `27`, trouvé. Le nombre d’intervalles est divisé par deux à chaque étape : O(log n) comparaisons après tri.

### Exemple B : La précondition manquante

Sur `values = [19, 3, 44, 8, 31, 12, 27]`, le même algorithme peut éliminer la tranche qui contient `27`, car l’ordre ne porte aucune information. Pour une seule recherche dans une petite liste non triée, la recherche linéaire O(n) est correcte et souvent plus simple. Si de nombreuses recherches sont prévues, le coût initial du tri peut être amorti ; il faut comparer le coût total, pas seulement O(log n).

## Barème / 10

Prédiction précise (2), preuve reproductible (2), cas négatif observé (2), diagnostic et correctif (2), transfert contextualisé (2). **Un cas inventé ou sans trace obtient zéro sur le critère de preuve.**

**Limite :** les sorties qui dépendent d’une exécution n’ont pas été calculées ici : exécute l’exercice dans l’environnement prévu par la leçon, compare le résultat à ces critères et conserve ta preuve. Ne présente jamais un résultat attendu comme une exécution réellement observée. Ce corrigé guide le raisonnement ; il ne prétend pas fournir une implémentation complète.
