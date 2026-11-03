---
stability: stable
acte: verification
assessment_role: instructional_checkpoint
---

**SCÈNE CRAZYDEVS : atelier de Konoha :** observe les contraintes avant de choisir une technique.

# EXO : relier logs, métriques et traces à une décision

Temps indicatif : 25 min.

Une API affiche un taux de succès de 99,8 %, mais son p95 de latence atteint 1,2 seconde alors que l’objectif de service (SLO) est 500 ms. Une trace illustrative montre : authentification 40 ms, requête SQL 900 ms, sérialisation et réponse 260 ms. Ces nombres sont un scénario fictif.

**Mission**

1. Quelle métrique signale le dépassement du SLO ? Écris une alerte qui évite de déclencher sur une seule requête isolée.
2. Quel événement utile un log structuré devrait-il contenir pour aider à diagnostiquer un échec sans exposer de secret ?
3. Quel apport la trace fournit-elle que la métrique agrégée ne donne pas ?
4. Quelle étape investiguer en premier dans cette trace, et quelle hypothèse faut-il encore vérifier avant de conclure ?
5. Propose une action opérationnelle et un signal qui permettra de vérifier l’amélioration.

**Critère** : distingue clairement mesure agrégée (métrique), événement contextualisé (log) et chemin/corrélation d’une requête (trace). N’infère pas une cause générale à partir d’un seul échantillon fictif.
