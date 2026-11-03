---
stability: intemporel
acte: reference
assessment_role: instructional_support
---

# Corrigé différé : 10-TEAM-CRAFT

**Ne lire qu'après l'atelier.** Ce document est un guide de correction et non une sortie d'exécution certifiée.

## Raisonnement attendu

1. Identifier dans `02-code_review.md` la précondition déterminante pour `code review`.
2. Produire une prédiction spécifique et falsifiable ; relever les entrées, l'environnement et la commande exacte.
3. Comparer la sortie observée à la prédiction. Ne pas modifier plusieurs facteurs en même temps.
4. Expliquer causalement la divergence : précondition, transformation, puis effet. Une simple copie de réponse échoue au critère d'autonomie.
5. Répéter le cas positif et le cas volontairement faux ; mesurer ou décrire le changement.

## Exemples résolus : Code review utile

Les exemples ci-dessous sont des **fixtures pédagogiques** : les résultats sont déduits des entrées affichées ou des hypothèses explicitement données. Ils ne prétendent pas qu’une commande, un service ou une infrastructure a été exécuté dans cette release.

### Exemple A : Commentaire concret et actionnable

Diff proposé : `if (!limit) limit = 20;`. Commentaire : « `limit=0` est-il une valeur valide pour demander zéro résultat ? Avec ce test, `0` et `undefined` suivent le même chemin. Peux-tu préciser le contrat et utiliser `limit ?? 20` si seul `null/undefined` déclenche le défaut, puis ajouter un test pour 0 ? » Le commentaire nomme l’entrée, le comportement et la preuve demandée sans attaquer l’auteur.

### Exemple B : Ne pas bloquer sur une préférence

Le reviewer préfère les accolades sur une ligne séparée, mais le dépôt ne définit aucun standard et la forme ne change ni comportement ni maintenance. Ce n’est pas un bloqueur technique : propose une convention dans le linter ou laisse passer. En revanche, si le changement retire le contrôle d’autorisation d’une ressource, la revue doit bloquer jusqu’à un test négatif. La gravité découle du risque, pas du goût du reviewer.

## Barème / 10

Prédiction précise (2), preuve reproductible (2), cas négatif observé (2), diagnostic et correctif (2), transfert contextualisé (2). **Un cas inventé ou sans trace obtient zéro sur le critère de preuve.**

**Limite :** les sorties qui dépendent d’une exécution n’ont pas été calculées ici : exécute l’exercice dans l’environnement prévu par la leçon, compare le résultat à ces critères et conserve ta preuve. Ne présente jamais un résultat attendu comme une exécution réellement observée. Ce corrigé guide le raisonnement ; il ne prétend pas fournir une implémentation complète.
