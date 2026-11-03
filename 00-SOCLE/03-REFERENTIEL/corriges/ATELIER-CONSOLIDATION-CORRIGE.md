---
stability: intemporel
acte: reference
assessment_role: instructional_support
---

# Corrigé différé : 03-REFERENTIEL

**Ne lire qu'après l'atelier.** Ce document est un guide de correction et non une sortie d'exécution certifiée.

## Raisonnement attendu

1. Identifier dans `07-intemporel_vs_perissable.md` la précondition déterminante pour `intemporel vs perissable`.
2. Produire une prédiction spécifique et falsifiable ; relever les entrées, l'environnement et la commande exacte.
3. Comparer la sortie observée à la prédiction. Ne pas modifier plusieurs facteurs en même temps.
4. Expliquer causalement la divergence : précondition, transformation, puis effet. Une simple copie de réponse échoue au critère d'autonomie.
5. Répéter le cas positif et le cas volontairement faux ; mesurer ou décrire le changement.

## Exemples résolus : Intemporel et périssable

Les exemples ci-dessous sont des **fixtures pédagogiques** : les résultats sont déduits des entrées affichées ou des hypothèses explicitement données. Ils ne prétendent pas qu’une commande, un service ou une infrastructure a été exécuté dans cette release.

### Exemple A : Contrat stable, tarif périssable

La règle « une autorisation doit être vérifiée à chaque frontière de confiance » est un principe durable. Le prix de stockage objet à 0,02 €/Go-mois dans le relevé daté du 18 août 2026 est, lui, une donnée périssable : il dépend du fournisseur, de la région, du SKU et de la date. On conserve la règle dans une leçon stable ; on conserve le prix avec sa source, sa date et une échéance de revue. Le statut `not_verified` signifie qu’AF n’affirme pas que le prix est encore valable.

### Exemple B : Un principe reste stable, sa mise en œuvre évolue

Le besoin « ne pas exposer un secret dans le dépôt » reste stable. La commande exacte ou le mécanisme recommandé pour gérer les secrets peut changer avec le runtime et l’outillage. On garde le principe dans le noyau stable, mais on place commandes, versions et liens dans une ressource périssable avec date de vérification. Une mise à jour de version ne rend pas le principe faux ; elle peut rendre une procédure obsolète.

## Barème / 10

Prédiction précise (2), preuve reproductible (2), cas négatif observé (2), diagnostic et correctif (2), transfert contextualisé (2). **Un cas inventé ou sans trace obtient zéro sur le critère de preuve.**

**Limite :** les sorties qui dépendent d’une exécution n’ont pas été calculées ici : exécute l’exercice dans l’environnement prévu par la leçon, compare le résultat à ces critères et conserve ta preuve. Ne présente jamais un résultat attendu comme une exécution réellement observée. Ce corrigé guide le raisonnement ; il ne prétend pas fournir une implémentation complète.
