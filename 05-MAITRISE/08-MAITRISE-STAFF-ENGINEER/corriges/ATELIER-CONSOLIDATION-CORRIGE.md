---
stability: intemporel
acte: reference
assessment_role: instructional_support
---

# Corrigé différé : 08-MAITRISE-STAFF-ENGINEER

**Ne lire qu'après l'atelier.** Ce document est un guide de correction et non une sortie d'exécution certifiée.

## Raisonnement attendu

1. Délimiter le système et identifier les axes inter-familles qui s'appliquent réellement.
2. Séparer les faits observés, les estimations, les hypothèses et les opinions.
3. Vérifier la comparabilité des sources, périodes, populations, unités et périmètres.
4. Décrire l'arbitrage, le coût accepté, le propriétaire du risque et la condition de révision.
5. Présenter une contre-épreuve crédible ; marquer explicitement ce qui reste non démontré.

## Exemples résolus : arbitrages entre familles de preuves

Les exemples ci-dessous sont des **fixtures pédagogiques** : les résultats sont déduits des entrées affichées ou des hypothèses explicitement données. Ils ne prétendent pas qu’une commande, un service ou une infrastructure a été exécuté dans cette release.

### Exemple A : S1 × S3 : promesse de service finançable

Scénario entièrement pédagogique : une option de base redondante coûte 58 €/mois de plus. Sans cette option, le RTO d’un exercice est de 41 minutes ; avec elle, il est de 6 minutes. Si le besoin métier tolère 45 minutes, la dépense supplémentaire n’est pas encore justifiée ; si le RTO contractuel devient 10 minutes, l’option devient nécessaire. L’arbitrage documente le coût (S1), la promesse et le RTO (S3), le risque accepté et le seuil de réexamen. Ces valeurs ne sont pas des mesures AF réelles.

### Exemple B : S4 × S2 et S5 × S6 : économie contre autonomie

Scénario pédagogique : six microservices ajoutent 5 jours de mise en place et 4 flux d’exploitation à maintenir ; une application modulaire tient le besoin actuel. S4/S2 conduisent à différer l’extraction jusqu’à ce qu’une équipe ou une mesure de charge justifie l’autonomie. Autre exemple, uniquement si un agent autonome existe dans le périmètre : un agent propose ou exécute une clôture, tandis que l'engagement de service prévoit une possibilité réelle de contestation et une revue humaine dans un délai documenté. S5/S6 conduisent alors à expliciter permissions, escalade, trace, arrêt et recours. Si le système n'utilise aucun agent autonome, cet exemple ne s'applique pas : analyse à la place les automatismes réellement présents et les décisions qui restent humaines. Ne transpose pas les chiffres de cette fixture à un projet réel.

## Barème / 10

Délimitation du contexte et des familles (2), qualité des faits et sources (2), comparabilité des éléments (2), arbitrage et contre-épreuve (2), transfert contextualisé et limites déclarées (2). **Un cas inventé ou sans trace obtient zéro sur le critère de preuve.**

**Limite :** les sorties qui dépendent d’une exécution n’ont pas été calculées ici : exécute l’exercice dans l’environnement prévu par la leçon, compare le résultat à ces critères et conserve ta preuve. Ne présente jamais un résultat attendu comme une exécution réellement observée. Ce corrigé guide le raisonnement ; il ne prétend pas fournir une implémentation complète.
