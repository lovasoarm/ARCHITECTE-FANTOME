---
stability: intemporel
acte: décider
preuve: learner
---

# ADR-001 : quelle règle TTL protège réellement la fraîcheur ?

> **Épreuve non résolue :** le cours ne fournit pas la décision. À toi de comparer les options dans le contexte de Kintana.

## Contexte à établir

Un résumé de stock est lu souvent et mis à jour. Le TTL doit réduire les lectures répétées sans présenter une donnée périmée plus longtemps que ce que le produit accepte.

## Options à comparer

- TTL court et invalidation explicite après écriture réussie ;
- TTL plus long et invalidation explicite ;
- absence de cache pour cette donnée ;
- une autre option, si tu la justifies.

Ne choisis pas avant d'avoir identifié le coût des lectures, le risque métier d'une valeur périmée et les garanties réelles de la source.

## Épreuve adverse

Ajoute une lecture lente commencée avant la mise à jour et terminée après l'invalidation. Explique si elle peut réinsérer une ancienne valeur dans ton implémentation. Si oui, nomme l'invariant manquant et propose une stratégie de mitigation.

## À produire

Contexte, hypothèses, options, critères, décision, conséquences positives/négatives, contre-argument le plus fort, signal de révision, tests et lien avec les mesures. Utilise le template ADR commun.

## Rappel à froid et transfert

Une semaine plus tard, reconstruis le raisonnement sans relire le document. Puis adapte ta décision à un cache partagé par plusieurs instances : quel invariant ne peut plus être supposé ?
