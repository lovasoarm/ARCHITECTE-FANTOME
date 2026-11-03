---
stability: intemporel
acte: reference
assessment_role: instructional_support
---

# Corrigé différé : 08-MAITRISE-STAFF-ENGINEER

**Ne lire qu'après l'atelier.** Ce document est un guide de correction et non une sortie d'exécution certifiée.

## Raisonnement attendu

1. Identifier dans `03-trois_tensions.md` la précondition déterminante pour `trois tensions`.
2. Produire une prédiction spécifique et falsifiable ; relever les entrées, l'environnement et la commande exacte.
3. Comparer la sortie observée à la prédiction. Ne pas modifier plusieurs facteurs en même temps.
4. Expliquer causalement la divergence : précondition, transformation, puis effet. Une simple copie de réponse échoue au critère d'autonomie.
5. Répéter le cas positif et le cas volontairement faux ; mesurer ou décrire le changement.

## Exemples résolus : Trois tensions entre preuves

Les exemples ci-dessous sont des **fixtures pédagogiques** : les résultats sont déduits des entrées affichées ou des hypothèses explicitement données. Ils ne prétendent pas qu’une commande, un service ou une infrastructure a été exécuté dans cette release.

### Exemple A : S1 × S3 : promesse de service finançable

Scénario entièrement pédagogique : une option de base redondante coûte 58 €/mois de plus. Sans cette option, le RTO d’un exercice est de 41 minutes ; avec elle, il est de 6 minutes. Si le besoin métier tolère 45 minutes, la dépense supplémentaire n’est pas encore justifiée ; si le RTO contractuel devient 10 minutes, l’option devient nécessaire. L’arbitrage documente le coût (S1), la promesse et le RTO (S3), le risque accepté et le seuil de réexamen. Ces valeurs ne sont pas des mesures AF réelles.

### Exemple B : S4 × S2 et S5 × S6 : économie contre autonomie

Scénario pédagogique : six microservices ajoutent 5 jours de mise en place et 4 flux d’exploitation à maintenir ; une application modulaire tient le besoin actuel. S4/S2 conduisent à différer l’extraction jusqu’à ce qu’une équipe ou une mesure de charge justifie l’autonomie. Autre tension : un agent clôture 80 % des demandes en moins d’une minute, mais la promesse humaine est qu’un demandeur peut contester une clôture et obtenir une revue sous un jour ouvré. S5/S6 imposent une escalade et une trace de décision ; le taux automatisé ne doit pas devenir une clôture définitive sans recours.

## Barème / 10

Prédiction précise (2), preuve reproductible (2), cas négatif observé (2), diagnostic et correctif (2), transfert contextualisé (2). **Un cas inventé ou sans trace obtient zéro sur le critère de preuve.**

**Limite :** les sorties qui dépendent d’une exécution n’ont pas été calculées ici : exécute l’exercice dans l’environnement prévu par la leçon, compare le résultat à ces critères et conserve ta preuve. Ne présente jamais un résultat attendu comme une exécution réellement observée. Ce corrigé guide le raisonnement ; il ne prétend pas fournir une implémentation complète.
