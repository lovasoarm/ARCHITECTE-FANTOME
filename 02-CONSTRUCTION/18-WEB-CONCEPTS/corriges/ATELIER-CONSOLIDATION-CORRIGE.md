---
stability: intemporel
acte: reference
assessment_role: instructional_support
---

# Corrigé différé : 18-WEB-CONCEPTS

**Ne lire qu'après l'atelier.** Ce document est un guide de correction et non une sortie d'exécution certifiée.

## Raisonnement attendu

1. Identifier dans `06-auth_authz.md` la précondition déterminante pour `auth authz`.
2. Produire une prédiction spécifique et falsifiable ; relever les entrées, l'environnement et la commande exacte.
3. Comparer la sortie observée à la prédiction. Ne pas modifier plusieurs facteurs en même temps.
4. Expliquer causalement la divergence : précondition, transformation, puis effet. Une simple copie de réponse échoue au critère d'autonomie.
5. Répéter le cas positif et le cas volontairement faux ; mesurer ou décrire le changement.

## Exemples résolus : Authentification et autorisation

Les exemples ci-dessous sont des **fixtures pédagogiques** : les résultats sont déduits des entrées affichées ou des hypothèses explicitement données. Ils ne prétendent pas qu’une commande, un service ou une infrastructure a été exécuté dans cette release.

### Exemple A : Session valide, ressource interdite

Un agent `userId=42` présente une session valide : l’authentification réussit. Il demande ensuite `GET /requests/900`, dont le propriétaire est `userId=73`. Le serveur compare l’identité vérifiée au propriétaire et au rôle autorisé ; comme l’agent 42 n’a ni propriété ni permission de supervision, la réponse est `403 Forbidden` (ou `404` si la politique masque l’existence). Le contrôle se fait côté serveur sur chaque ressource, pas seulement dans l’interface.

### Exemple B : Ne pas confondre rôle et propriété

Un demandeur connecté peut lire sa propre demande et pas celle d’un autre demandeur. Ajouter un bouton caché dans le front ne sécurise rien : un client peut appeler directement l’API. Le contre-test change seulement l’identifiant de ressource ; le serveur doit refuser. Pour un superviseur, la permission doit être explicite et bornée à son périmètre, pas accordée à tout compte authentifié.

## Barème / 10

Prédiction précise (2), preuve reproductible (2), cas négatif observé (2), diagnostic et correctif (2), transfert contextualisé (2). **Un cas inventé ou sans trace obtient zéro sur le critère de preuve.**

**Limite :** les sorties qui dépendent d’une exécution n’ont pas été calculées ici : exécute l’exercice dans l’environnement prévu par la leçon, compare le résultat à ces critères et conserve ta preuve. Ne présente jamais un résultat attendu comme une exécution réellement observée. Ce corrigé guide le raisonnement ; il ne prétend pas fournir une implémentation complète.
