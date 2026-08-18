---
stability: intemporel
acte: appliquer
---

# PROTOCOLE DE LA DONNÉE SOURCÉE

Acte attendu : appliquer.

Ce protocole existe parce qu'un comité ne conteste presque jamais un raisonnement : il conteste un chiffre, avec une seule question, toujours la même, "d'où sort ce chiffre ?". Un ingénieur qui ne sait pas répondre perd l'arbitrage, même quand il a raison. Le repo enseigne donc le relevé, pas le prix.

## 1. La règle

Tout tableau du repo qui contient un montant en euros porte, juste au-dessus, une ligne unique de la forme :

```text
> Relevé le AAAA-MM-DD, chez <fournisseur>, unité <unité de facturation>, URL <adresse de la page tarifaire>, à revérifier avant <année>.
```

Et tout tableau de prix porte les quatre colonnes de traçabilité : **Relevé le**, **Chez**, **Unité**, **URL**.

## 2. Ce que cela change dans la lecture

Un montant du repo n'est jamais une vérité : c'est un exemple daté. Il vaut comme démonstration de méthode, jamais comme référence à recopier dans un budget réel. Le jour où la grille bouge, c'est le relevé qui est refait, pas la leçon.

## 3. Ce que cela change dans la production de l'apprenant

Un livrable chiffré sans colonne URL et sans date est refusé, quelle que soit la qualité du raisonnement. Le [challenge du module cloud](../../03-PILOTAGE/07_cloud_foundations/challenge.md) impose un relevé personnel de trois prix unitaires chez deux fournisseurs, et une réponse écrite à l'objection "vos prix datent de quand ?".

## 4. Le verrou

Le contrôle de livraison ([../outillage/controle_livraison.mjs](../outillage/controle_livraison.mjs)) refuse tout tableau contenant un montant en euros qui ne porte pas sa ligne de relevé datée et sourcée. Ce n'est pas une consigne d'écriture : c'est un refus mécanique.

## 5. Où le protocole s'applique en premier

- [03-PILOTAGE/07_cloud_foundations/05_choisir_fournisseur.md](../../03-PILOTAGE/07_cloud_foundations/05_choisir_fournisseur.md) : la grille comparative.
- [03-PILOTAGE/07_cloud_foundations/BUDGET-CLOUD.md](../../03-PILOTAGE/07_cloud_foundations/BUDGET-CLOUD.md) : le gabarit du livrable S1.
- [PREUVES-MODELES/S1-BUDGET-CLOUD.md](../../PREUVES-MODELES/S1-BUDGET-CLOUD.md) : l'exemplaire de référence.
- [03-PILOTAGE/07_cloud_foundations/06_portage_multicloud.md](../../03-PILOTAGE/07_cloud_foundations/06_portage_multicloud.md) : le portage chez un second fournisseur.

## RÉSUMÉ

Un chiffre sans date, sans fournisseur, sans unité et sans URL n'est pas une donnée : c'est une opinion en costume. Le protocole rend le relevé obligatoire et vérifiable mécaniquement, ce qui protège l'apprenant sur la seule question qu'un comité pose toujours.
