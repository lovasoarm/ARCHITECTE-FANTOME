## perishability_id: PER-0062

stability: perissable
acte: pilotage
noyau: renfort
date_releve: 2026-08-18
perime_apres: 2028-02-18
cognitive_level: L3
perturbation_modes: [regression, changement_echelle]
anti_recipe_key: regression+changement_echelle
transfer_distance: low
assessment_role: instructional_checkpoint
review_due: 2027-12-31

---

> **SCÈNE CRAZYDEVS : QG de Konoha :** six équipes, trois régions, une mission critique. Si tu ne sais pas relier signal, seuil, coût et action, ton tableau de bord ressemble à une tour de contrôle qui clignote sans dire quel avion tombe.

# Relevé de référence : ordres de grandeur 2026

Temps de lecture ~2 min

> **À ne jamais recopier dans ton livrable.** Un `06A-BUDGET-CLOUD.md` qui reprend ces chiffres
> est refusé au boss fight : la compétence auditée est le **relevé personnel daté**,
> pas la lecture d'un tableau. Ce fichier s'applique la règle qu'il impose à l'apprenant :
> chaque prix a une **URL** et une **date** ; au-delà de **18 mois**, le contrôle
> de livraison **refuse** le dépôt.

Relevé d'exercice du **2026-08-18**. Péremption mécanique : **2028-02-18**
(`date_releve` + 18 mois). Région d'ordre : `eu-west` / Europe, hors engagements
1 an, hors taxes locales.

## Postes, URL, date

| Poste               | Ordre de grandeur                      |       Date | Source (page publique, à reverifier)          |
| ------------------- | -------------------------------------- | ---------: | --------------------------------------------- |
| Stockage objet      | ~0,02 €/Go-mois                        | 2026-08-18 | https://aws.amazon.com/s3/pricing/            |
| Egress internet     | ~0,08 €/Go                             | 2026-08-18 | https://aws.amazon.com/ec2/pricing/on-demand/ |
| Calcul sans serveur | ~0,20 € / million d'invocations + s·Go | 2026-08-18 | https://aws.amazon.com/lambda/pricing/        |
| Petite base managée | ~15 à 60 €/mois                        | 2026-08-18 | https://aws.amazon.com/rds/pricing/           |
| Journalisation      | ~0,50 €/Go ingéré                      | 2026-08-18 | https://aws.amazon.com/cloudwatch/pricing/    |
| CDN                 | ~0,01 à 0,05 €/Go                      | 2026-08-18 | https://aws.amazon.com/cloudfront/pricing/    |

Ces URL sont des **portes d'entrée** tarifaires, pas une autorisation à copier une ligne
dans ton budget. Ton relevé cite **ta** région, **ton** SKU, **ta** capture du jour.

## Comment lire ce tableau

Deux fournisseurs peuvent différer d'un facteur 3 sur un poste et d'un facteur 1 sur le
total. Compare des **factures complètes**, jamais des lignes isolées.

## Règle de fraîcheur (contrôle)

1. L'en-tête `date_releve` doit être parsable (ISO `YYYY-MM-DD`).
2. Si `aujourd'hui > date_releve + 18 mois`, ce relevé est **périmé** et ne doit plus
   être cité comme source (`RELEVE-PERIME`).
3. Ton `06A-BUDGET-CLOUD.md` doit avoir sa propre date **et** des URL **différentes** de
   celles de ce fichier, ou le même URL avec une date **à toi** < 30 jours.

Au-delà de 18 mois : ce tableau n'existe plus comme référence. Tu le remplaces après un
nouveau relevé, ou tu retires les montants. Un chiffre sans source datée se retire, il ne
se « met à peu près ».

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?
