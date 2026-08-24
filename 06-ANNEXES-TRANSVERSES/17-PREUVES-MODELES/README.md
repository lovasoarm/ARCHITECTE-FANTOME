---
stability: intemporel
acte: comprendre
---

# 14-PREUVES-MODELES : à quoi ressemble une preuve remplie

Ce dossier n'enseigne rien. Il montre, pour chacune des six familles de
[PREUVES-STAFF-ENGINEER.md](../../PREUVES-STAFF-ENGINEER.md), un exemplaire rempli et anonymisé,
sur un même projet fictif : **Lumen**, plateforme de réservation de créneaux pour ateliers
associatifs. Un seul projet pour les six, volontairement : c'est la cohérence entre les pièces
qui se juge, pas leur beauté séparée.

## Les six modèles, et la septième pièce

| Famille | Fichier modèle | Ce que tu dois produire dans TON dépôt |
| --- | --- | --- |
| S1 : systèmes et cloud | [02-S1-BUDGET-CLOUD.md](02-S1-BUDGET-CLOUD.md) | `PREUVES/06A-BUDGET-CLOUD.md` |
| S2 : architecture | [03-S2-ADR-PRINCIPAL.md](03-S2-ADR-PRINCIPAL.md) | `PREUVES/ADR-PRINCIPAL.md` (plus le dossier `ADR/`) |
| S3 : sécurité et fiabilité | [04-S3-SLO.md](04-S3-SLO.md) | `PREUVES/SLO.md` |
| S4 : produit et business | [05-S4-DECISION-ARBITRAGE.md](05-S4-DECISION-ARBITRAGE.md) | `PREUVES/DECISION-ARBITRAGE.md` |
| S5 : leadership et pédagogie | [06-S5-NOTE-DIRECTION-ET-REVUE.md](06-S5-NOTE-DIRECTION-ET-REVUE.md) | `PREUVES/REVUE-DE-CODE.md` et `PREUVES/NOTE-DIRECTION.md` |
| S6 : IA et automatisation | [07-S6-LIVRAISON-EXPLOITATION.md](07-S6-LIVRAISON-EXPLOITATION.md) | `PREUVES/IA-EN-PROD.md` |
| S7 : pensée transférable | [99-PORTAGE-MENTAL.md](99-PORTAGE-MENTAL.md) | `PREUVES/PORTAGE.md` |

Le gabarit vivant de S1 est maintenu dans le module qui l'enseigne :
[03-PILOTAGE/07-CLOUD-FOUNDATIONS/06A-BUDGET-CLOUD.md](../../03-PILOTAGE/07-CLOUD-FOUNDATIONS/06A-BUDGET-CLOUD.md).

## Comment s'en servir, et comment ne pas s'en servir

- **À faire** : écrire ta propre version d'abord, ouvrir le modèle ensuite, et chercher ce que
  le modèle chiffre et que tu as laissé vague.
- **À ne pas faire** : recopier la structure avec tes noms de projet. Un jury reconnaît en
  trente secondes un document rempli sans mesure derrière, parce que les chiffres n'y portent
  ni source ni date.

## Le test de cohérence entre les six

Les six pièces de Lumen se contredisent volontairement à trois endroits, et ces contradictions
sont écrites plutôt que masquées : le SLO à 99,5% qui interdit l'option d'export la moins chère
(S3 contre S4), le multi-zone non financé (S1 contre S3), et la bascule de modèle IA suspendue
pour une régression de sécurité (S6 contre S4). Si tes six pièces à toi ne se contredisent nulle
part, l'une d'elles n'a pas été chiffrée sérieusement : c'est exactement ce que la section 8 du
[dossier unique](../../05-MAITRISE/08-MAITRISE-STAFF-ENGINEER/02-dossier_unique.md) va te demander.

<!-- CONTENU-DOSSIER:debut -->

- [MODÈLE S1 : 06A-BUDGET-CLOUD.md : exemplaire de référence, anonymisé](02-S1-BUDGET-CLOUD.md)
- [MODÈLE S2 : ADR-PRINCIPAL.md : exemplaire de référence, anonymisé](03-S2-ADR-PRINCIPAL.md)
- [MODÈLE S3 : SLO.md : exemplaire de référence, anonymisé](04-S3-SLO.md)
- [MODÈLE S4 : DECISION-ARBITRAGE.md : exemplaire de référence, anonymisé](05-S4-DECISION-ARBITRAGE.md)
- [MODÈLE S5 : la revue de code et la note direction : exemplaires de référence](06-S5-NOTE-DIRECTION-ET-REVUE.md)
- [MODÈLE S6 : IA-EN-PROD.md : exemplaire de référence, anonymisé](07-S6-LIVRAISON-EXPLOITATION.md)
- [MODÈLE S7 : PORTAGE.md : exemplaire de référence, anonymisé](99-PORTAGE-MENTAL.md)

<!-- CONTENU-DOSSIER:fin -->
