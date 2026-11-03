---
stability: intemporel
acte: reference
assessment_role: instructional_support
---

# Corrigé différé : 08-PRODUIT-COUT-ROI

**Ne lire qu'après l'atelier.** Ce document est un guide de correction et non une sortie d'exécution certifiée.

## Raisonnement attendu

1. Identifier dans `04-dette_technique_declaree.md` la précondition déterminante pour `dette technique declaree`.
2. Produire une prédiction spécifique et falsifiable ; relever les entrées, l'environnement et la commande exacte.
3. Comparer la sortie observée à la prédiction. Ne pas modifier plusieurs facteurs en même temps.
4. Expliquer causalement la divergence : précondition, transformation, puis effet. Une simple copie de réponse échoue au critère d'autonomie.
5. Répéter le cas positif et le cas volontairement faux ; mesurer ou décrire le changement.

## Exemples résolus : Dette technique déclarée

Les exemples ci-dessous sont des **fixtures pédagogiques** : les résultats sont déduits des entrées affichées ou des hypothèses explicitement données. Ils ne prétendent pas qu’une commande, un service ou une infrastructure a été exécuté dans cette release.

### Exemple A : Dette choisie et bornée

Pour la première version, l’équipe décide de ne pas ajouter de cache. La charge prévue reste sous 500 utilisateurs actifs et la lecture en base tient le budget de latence. La dette est inscrite avec propriétaire, symptôme surveillé, risque de hausse de latence, seuil de déclenchement (p95 > 300 ms pendant 15 minutes sous charge représentative) et date de revue. La décision est défendable parce qu’elle est explicite et réversible.

### Exemple B : Dette subie et non gouvernée

Le code copie la même règle de calcul dans quatre services pour livrer vite, mais personne ne l’inscrit. Après une évolution, trois services appliquent le nouveau taux et le quatrième conserve l’ancien : les résultats divergent. Ce n’est pas une dette « stratégique » documentée ; c’est un risque caché. Le correctif consiste à enregistrer la duplication, son impact, le propriétaire, la solution cible et un déclencheur mesurable de consolidation.

## Barème / 10

Prédiction précise (2), preuve reproductible (2), cas négatif observé (2), diagnostic et correctif (2), transfert contextualisé (2). **Un cas inventé ou sans trace obtient zéro sur le critère de preuve.**

**Limite :** les sorties qui dépendent d’une exécution n’ont pas été calculées ici : exécute l’exercice dans l’environnement prévu par la leçon, compare le résultat à ces critères et conserve ta preuve. Ne présente jamais un résultat attendu comme une exécution réellement observée. Ce corrigé guide le raisonnement ; il ne prétend pas fournir une implémentation complète.
