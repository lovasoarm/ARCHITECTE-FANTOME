---
stability: intemporel
acte: reference
assessment_role: instructional_support
---

# Corrigé différé : 06-ANNEXES

**Ne lire qu'après l'atelier.** Ce document est un guide de correction et non une sortie d'exécution certifiée.

## Raisonnement attendu

1. Identifier dans `05-when_not_to_code.md` la précondition déterminante pour `when not to code`.
2. Produire une prédiction spécifique et falsifiable ; relever les entrées, l'environnement et la commande exacte.
3. Comparer la sortie observée à la prédiction. Ne pas modifier plusieurs facteurs en même temps.
4. Expliquer causalement la divergence : précondition, transformation, puis effet. Une simple copie de réponse échoue au critère d'autonomie.
5. Répéter le cas positif et le cas volontairement faux ; mesurer ou décrire le changement.

## Exemples résolus : Décider de ne pas coder

Les exemples ci-dessous sont des **fixtures pédagogiques** : les résultats sont déduits des entrées affichées ou des hypothèses explicitement données. Ils ne prétendent pas qu’une commande, un service ou une infrastructure a été exécuté dans cette release.

### Exemple A : Configurer un outil existant

Une équipe veut envoyer chaque vendredi le nombre de demandes en attente. Son outil de gestion possède déjà un filtre sauvegardé et un export planifié. Configurer ce filtre répond au besoin sans créer une application, un compte supplémentaire ni une base de données à maintenir. La preuve est un test du filtre avec quelques cas connus et la validation par son utilisateur.

### Exemple B : Le seuil où une solution dédiée devient justifiée

Si l’export manuel provoque des omissions chaque semaine, si plusieurs rôles ont des droits différents et si une piste d’audit est requise, la configuration existante peut ne plus suffire. On mesure le taux d’erreur, le temps de traitement et les exigences de traçabilité avant de coder. Le bon critère n’est pas « le logiciel serait plus moderne », mais un écart de besoin observable que l’outil actuel ne sait pas couvrir.

## Barème / 10

Prédiction précise (2), preuve reproductible (2), cas négatif observé (2), diagnostic et correctif (2), transfert contextualisé (2). **Un cas inventé ou sans trace obtient zéro sur le critère de preuve.**

**Limite :** les sorties qui dépendent d’une exécution n’ont pas été calculées ici : exécute l’exercice dans l’environnement prévu par la leçon, compare le résultat à ces critères et conserve ta preuve. Ne présente jamais un résultat attendu comme une exécution réellement observée. Ce corrigé guide le raisonnement ; il ne prétend pas fournir une implémentation complète.
