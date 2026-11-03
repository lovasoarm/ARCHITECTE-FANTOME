---
stability: intemporel
acte: reference
assessment_role: instructional_support
---

# Corrigé différé : 02-SCALABILITY

**Ne lire qu'après l'atelier.** Ce document est un guide de correction et non une sortie d'exécution certifiée.

## Raisonnement attendu

1. Identifier dans `03-distributed_primitives.md` la précondition déterminante pour `distributed primitives`.
2. Produire une prédiction spécifique et falsifiable ; relever les entrées, l'environnement et la commande exacte.
3. Comparer la sortie observée à la prédiction. Ne pas modifier plusieurs facteurs en même temps.
4. Expliquer causalement la divergence : précondition, transformation, puis effet. Une simple copie de réponse échoue au critère d'autonomie.
5. Répéter le cas positif et le cas volontairement faux ; mesurer ou décrire le changement.

## Exemples résolus : Primitives distribuées

Les exemples ci-dessous sont des **fixtures pédagogiques** : les résultats sont déduits des entrées affichées ou des hypothèses explicitement données. Ils ne prétendent pas qu’une commande, un service ou une infrastructure a été exécuté dans cette release.

### Exemple A : Retry d’une commande avec clé d’idempotence

Un client envoie `POST /reservations` avec la clé `K-123`. Le serveur crée `R-900`, mais la réponse se perd. Le client réessaie avec la même clé ; le serveur retrouve le résultat associé à `K-123` et renvoie `R-900` sans créer une deuxième réservation. La garantie est liée à la persistance et à la portée de la clé, pas au simple fait de renvoyer la même requête.

### Exemple B : La clé ne doit pas être réutilisée pour une autre commande

Si `K-123` est réutilisée avec un payload différent (par exemple un autre créneau), le serveur ne doit pas silencieusement retourner le résultat de la première commande ou exécuter la seconde. Il compare une empreinte stable de la requête et renvoie un conflit explicite si la même clé désigne un contenu différent. Cela évite que l’idempotence masque une erreur de client.

## Barème / 10

Prédiction précise (2), preuve reproductible (2), cas négatif observé (2), diagnostic et correctif (2), transfert contextualisé (2). **Un cas inventé ou sans trace obtient zéro sur le critère de preuve.**

**Limite :** les sorties qui dépendent d’une exécution n’ont pas été calculées ici : exécute l’exercice dans l’environnement prévu par la leçon, compare le résultat à ces critères et conserve ta preuve. Ne présente jamais un résultat attendu comme une exécution réellement observée. Ce corrigé guide le raisonnement ; il ne prétend pas fournir une implémentation complète.
