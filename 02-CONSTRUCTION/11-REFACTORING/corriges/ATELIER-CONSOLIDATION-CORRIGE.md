---
stability: intemporel
acte: reference
assessment_role: instructional_support
---

# Corrigé différé : 11-REFACTORING

**Ne lire qu'après l'atelier.** Ce document est un guide de correction et non une sortie d'exécution certifiée.

## Raisonnement attendu

1. Identifier dans `04-solid_principles.md` la précondition déterminante pour `solid principles`.
2. Produire une prédiction spécifique et falsifiable ; relever les entrées, l'environnement et la commande exacte.
3. Comparer la sortie observée à la prédiction. Ne pas modifier plusieurs facteurs en même temps.
4. Expliquer causalement la divergence : précondition, transformation, puis effet. Une simple copie de réponse échoue au critère d'autonomie.
5. Répéter le cas positif et le cas volontairement faux ; mesurer ou décrire le changement.

## Exemples résolus : Les principes SOLID sans sur-abstraction

Les exemples ci-dessous sont des **fixtures pédagogiques** : les résultats sont déduits des entrées affichées ou des hypothèses explicitement données. Ils ne prétendent pas qu’une commande, un service ou une infrastructure a été exécuté dans cette release.

### Exemple A : Responsabilité séparée

Un `InvoiceService` calcule le total, enregistre la facture et envoie aussi un email SMTP. Une évolution du format email oblige à toucher le calcul métier. Séparer le calcul (`InvoiceCalculator`) de l’envoi (`InvoiceNotifier`) réduit les raisons de changement. Le service d’orchestration coordonne les deux ; les tests du calcul n’ont pas besoin d’un serveur email.

### Exemple B : Dépendre d’un contrat sans fabriquer une cathédrale

Le service de facturation a besoin d’une opération `send(invoice)`, pas de connaître SMTP, un fournisseur ou un SDK. Injecter un petit contrat `InvoiceNotifier` permet de tester le service avec un faux notifier. Si une seule implémentation existera durablement et qu’aucun changement indépendant n’est attendu, une abstraction supplémentaire peut coûter plus qu’elle ne rapporte. SOLID sert à réduire le couplage réellement observé.

## Barème / 10

Prédiction précise (2), preuve reproductible (2), cas négatif observé (2), diagnostic et correctif (2), transfert contextualisé (2). **Un cas inventé ou sans trace obtient zéro sur le critère de preuve.**

**Limite :** les sorties qui dépendent d’une exécution n’ont pas été calculées ici : exécute l’exercice dans l’environnement prévu par la leçon, compare le résultat à ces critères et conserve ta preuve. Ne présente jamais un résultat attendu comme une exécution réellement observée. Ce corrigé guide le raisonnement ; il ne prétend pas fournir une implémentation complète.
