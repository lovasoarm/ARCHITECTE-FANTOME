---
stability: intemporel
acte: reference
assessment_role: instructional_support
---

# Corrigé différé : 16-DDD-CONTRATS

**Ne lire qu'après l'atelier.** Ce document est un guide de correction et non une sortie d'exécution certifiée.

## Raisonnement attendu

1. Identifier dans `06-exercice_architecture_trop_belle.md` la précondition déterminante pour `exercice architecture trop belle`.
2. Produire une prédiction spécifique et falsifiable ; relever les entrées, l'environnement et la commande exacte.
3. Comparer la sortie observée à la prédiction. Ne pas modifier plusieurs facteurs en même temps.
4. Expliquer causalement la divergence : précondition, transformation, puis effet. Une simple copie de réponse échoue au critère d'autonomie.
5. Répéter le cas positif et le cas volontairement faux ; mesurer ou décrire le changement.

## Exemples résolus : Refuser une architecture trop belle

Les exemples ci-dessous sont des **fixtures pédagogiques** : les résultats sont déduits des entrées affichées ou des hypothèses explicitement données. Ils ne prétendent pas qu’une commande, un service ou une infrastructure a été exécuté dans cette release.

### Exemple A : Refuser six services pour un petit flux

Contexte pédagogique : une équipe de 2 développeurs doit livrer une réservation avec une règle métier encore instable, 100 utilisateurs actifs et une base relationnelle unique. Six services, un bus et six bases introduiraient plusieurs déploiements, contrats, surveillances et pannes partielles. Une application modulaire avec une transaction locale couvre le besoin cette semaine. L’ADR accepte la solution simple et fixe un seuil de réexamen, par exemple quand deux équipes doivent déployer indépendamment ou qu’une mesure démontre une isolation de charge nécessaire. Les nombres sont des hypothèses du cas, pas des mesures terrain.

### Exemple B : Le refus doit être réversible

Si deux équipes indépendantes ont désormais des rythmes de livraison incompatibles et qu’un contexte subit une charge qui perturbe les autres, la frontière devient utile. On mesure incidents, contention, temps de livraison et coût de duplication ; on extrait d’abord le contexte qui possède une règle stable, avec contrat versionné et plan de retour. Le contre-exemple montre que « monolithe toujours » serait aussi dogmatique que « microservices partout ».

## Barème / 10

Prédiction précise (2), preuve reproductible (2), cas négatif observé (2), diagnostic et correctif (2), transfert contextualisé (2). **Un cas inventé ou sans trace obtient zéro sur le critère de preuve.**

**Limite :** les sorties qui dépendent d’une exécution n’ont pas été calculées ici : exécute l’exercice dans l’environnement prévu par la leçon, compare le résultat à ces critères et conserve ta preuve. Ne présente jamais un résultat attendu comme une exécution réellement observée. Ce corrigé guide le raisonnement ; il ne prétend pas fournir une implémentation complète.
