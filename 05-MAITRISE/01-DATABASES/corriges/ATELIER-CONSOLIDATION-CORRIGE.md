---
stability: intemporel
acte: reference
assessment_role: instructional_support
---

# Corrigé différé : 01-DATABASES

**Ne lire qu'après l'atelier.** Ce document est un guide de correction et non une sortie d'exécution certifiée.

## Raisonnement attendu

1. Identifier dans `02-sql_basics.md` la précondition déterminante pour `sql basics`.
2. Produire une prédiction spécifique et falsifiable ; relever les entrées, l'environnement et la commande exacte.
3. Comparer la sortie observée à la prédiction. Ne pas modifier plusieurs facteurs en même temps.
4. Expliquer causalement la divergence : précondition, transformation, puis effet. Une simple copie de réponse échoue au critère d'autonomie.
5. Répéter le cas positif et le cas volontairement faux ; mesurer ou décrire le changement.

## Exemples résolus : SQL de base

Les exemples ci-dessous sont des **fixtures pédagogiques** : les résultats sont déduits des entrées affichées ou des hypothèses explicitement données. Ils ne prétendent pas qu’une commande, un service ou une infrastructure a été exécuté dans cette release.

### Exemple A : Compter les demandes par statut

Fixture pédagogique : `reservations` contient `('R1','confirmed')`, `('R2','pending')`, `('R3','confirmed')`.

```sql
SELECT status, COUNT(*) AS total
FROM reservations
GROUP BY status
ORDER BY status;
```

Résultat attendu : `confirmed = 2`, `pending = 1`. La requête forme un groupe par statut puis compte ses lignes. Ce résultat vient de la fixture décrite, pas d’une base réellement exécutée.

### Exemple B : Filtrer avant de compter

Pour ne compter que les réservations confirmées, ajoute `WHERE status = 'confirmed'` avant `GROUP BY status`. Si tu mets une condition sur le résultat agrégé (par exemple `COUNT(*) > 1`), elle relève de `HAVING`, après la formation des groupes. Confondre `WHERE` et `HAVING` change le niveau auquel la condition s’applique.

## Barème / 10

Prédiction précise (2), preuve reproductible (2), cas négatif observé (2), diagnostic et correctif (2), transfert contextualisé (2). **Un cas inventé ou sans trace obtient zéro sur le critère de preuve.**

**Limite :** les sorties qui dépendent d’une exécution n’ont pas été calculées ici : exécute l’exercice dans l’environnement prévu par la leçon, compare le résultat à ces critères et conserve ta preuve. Ne présente jamais un résultat attendu comme une exécution réellement observée. Ce corrigé guide le raisonnement ; il ne prétend pas fournir une implémentation complète.
