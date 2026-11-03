---
stability: stable
acte: verification
assessment_role: instructional_checkpoint
---

**SCÈNE CRAZYDEVS : atelier de Konoha :** observe les contraintes avant de choisir une technique.

# EXO : limiter la concurrence sans séquentialiser tout le travail

Temps indicatif : 20 min.

Tu dois traiter 100 missions asynchrones. `Promise.all(items.map(work))` lance toutes les tâches presque simultanément ; une boucle `for...of` avec `await` les lance une par une. Les deux stratégies ont des compromis.

**Mission**

1. Décris le risque d’un lancement simultané non limité (pression sur API, sockets, mémoire, quota).
2. Définis une limite de concurrence de 5 tâches.
3. Propose un pseudo-code ou une implémentation avec une file de travailleurs qui ne dépasse jamais 5 tâches actives.
4. Explique comment propager les erreurs et décider si les tâches restantes doivent continuer ou s’arrêter.
5. Distingue l’ordre de fin du travail de l’ordre des résultats ; conserve les résultats à l’index d’origine si nécessaire.

**Critère** : démontre par compteur que `maxActive <= 5` pour tout le traitement. Ne promets pas un ordre de fin déterministe si les durées varient.
