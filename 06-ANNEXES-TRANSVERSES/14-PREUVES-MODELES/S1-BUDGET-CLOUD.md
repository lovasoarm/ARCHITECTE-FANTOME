---
stability: perissable_2027
acte: appliquer
---

# MODÈLE S1 : BUDGET-CLOUD.md : exemplaire de référence, anonymisé

> **Ordres de grandeur relevés le 2026-08-14, périmés au 2027-08-14, à remplacer par TON
> relevé.** Ce fichier illustre la **forme** d'un budget cloud ; il ne fait autorité sur aucun
> montant. La vérité chiffrée de ton dossier vient de `RELEVE-TARIFAIRE.md`, produit par
> l'exercice obligatoire
> [03-PILOTAGE/07_cloud_foundations/07_releve_tarifaire_reel.md](../../03-PILOTAGE/07_cloud_foundations/07_releve_tarifaire_reel.md)
> : trois fournisseurs nommés, quatre lignes, URL complète et date pour chaque prix. Un
> montant recopié d'ici dans ton budget est un montant que tu ne peux pas défendre.

> Ceci est un modèle. Le gabarit vivant, à jour, est maintenu dans le module qui enseigne
> le chiffrage cloud : `03-PILOTAGE/07_cloud_foundations/BUDGET-CLOUD.md`. Consulte-le pour
> le format imposé exact ; ce fichier-ci illustre à quoi ressemble une copie remplie.

Projet fictif : **Lumen**, plateforme de réservation de créneaux pour ateliers associatifs.

## 1. Hypothèses de trafic retenues

> Relevé le 2026-08-14, chez fournisseur A (hyperscaler généraliste), unité indiquée par ligne, prix unitaires issus des 12 lignes sourcées (URL complète, date, devise, unité) de [RELEVE-REFERENCE-2026.md](../../03-PILOTAGE/07_cloud_foundations/RELEVE-REFERENCE-2026.md), relevées le 2026-08-18 et à revérifier avant 2027-08-18. Protocole : [../99-COULISSES/meta/PROTOCOLE-DONNEE-SOURCEE.md](../../99-COULISSES/meta/PROTOCOLE-DONNEE-SOURCEE.md).

| Palier | Utilisateurs actifs/mois | Requêtes/s en pointe | Volume stocké |
| --- | --- | --- | --- |
| 100 | 100 | 2 | 500 Mo |
| 10 000 | 10 000 | 40 | 20 Go |
| 1 000 000 | 1 000 000 | 1 200 | 2 To |

## 2. Facture mensuelle par catégorie, à 100 utilisateurs

> Relevé le 2026-08-14, chez fournisseur A (hyperscaler généraliste), unité indiquée par ligne, prix unitaires issus des 12 lignes sourcées (URL complète, date, devise, unité) de [RELEVE-REFERENCE-2026.md](../../03-PILOTAGE/07_cloud_foundations/RELEVE-REFERENCE-2026.md), relevées le 2026-08-18 et à revérifier avant 2027-08-18. Protocole : [../99-COULISSES/meta/PROTOCOLE-DONNEE-SOURCEE.md](../../99-COULISSES/meta/PROTOCOLE-DONNEE-SOURCEE.md).

| Catégorie | Service | Unité | Coût mensuel | Chez | Relevé le | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Calcul | 1 instance conteneur, 0.5 vCPU | mois | 7 € | fournisseur A | 2026-08-14 | prix unitaires sourcés : [RELEVE-REFERENCE-2026.md](../../03-PILOTAGE/07_cloud_foundations/RELEVE-REFERENCE-2026.md) |
| Base de données | instance managée, plus petit palier | mois | 15 € | fournisseur A | 2026-08-14 | prix unitaires sourcés : [RELEVE-REFERENCE-2026.md](../../03-PILOTAGE/07_cloud_foundations/RELEVE-REFERENCE-2026.md) |
| Stockage objet | 500 Mo, requêtes faibles | mois | 1 € | fournisseur A | 2026-08-14 | prix unitaires sourcés : [RELEVE-REFERENCE-2026.md](../../03-PILOTAGE/07_cloud_foundations/RELEVE-REFERENCE-2026.md) |
| Egress | 2 Go sortants | mois | 0,18 € | fournisseur A | 2026-08-14 | prix unitaires sourcés : [RELEVE-REFERENCE-2026.md](../../03-PILOTAGE/07_cloud_foundations/RELEVE-REFERENCE-2026.md) |
| Observabilité | plan gratuit | mois | 0 € | fournisseur A | 2026-08-14 | prix unitaires sourcés : [RELEVE-REFERENCE-2026.md](../../03-PILOTAGE/07_cloud_foundations/RELEVE-REFERENCE-2026.md) |
| **Total** | | mois | **23,18 €** | fournisseur A | 2026-08-14 | somme des lignes ci-dessus |

## 3. Facture mensuelle par catégorie, à 10 000 utilisateurs

> Relevé le 2026-08-14, chez fournisseur A (hyperscaler généraliste), unité indiquée par ligne, prix unitaires issus des 12 lignes sourcées (URL complète, date, devise, unité) de [RELEVE-REFERENCE-2026.md](../../03-PILOTAGE/07_cloud_foundations/RELEVE-REFERENCE-2026.md), relevées le 2026-08-18 et à revérifier avant 2027-08-18. Protocole : [../99-COULISSES/meta/PROTOCOLE-DONNEE-SOURCEE.md](../../99-COULISSES/meta/PROTOCOLE-DONNEE-SOURCEE.md).

| Catégorie | Service | Unité | Coût mensuel | Chez | Relevé le | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Calcul | 3 instances, autoscaling 0.5 à 2 vCPU | mois | 140 € | fournisseur A | 2026-08-14 | prix unitaires sourcés : [RELEVE-REFERENCE-2026.md](../../03-PILOTAGE/07_cloud_foundations/RELEVE-REFERENCE-2026.md) |
| Base de données | instance managée, palier intermédiaire, réplique de lecture | mois | 210 € | fournisseur A | 2026-08-14 | prix unitaires sourcés : [RELEVE-REFERENCE-2026.md](../../03-PILOTAGE/07_cloud_foundations/RELEVE-REFERENCE-2026.md) |
| Stockage objet | 20 Go | mois | 4 € | fournisseur A | 2026-08-14 | prix unitaires sourcés : [RELEVE-REFERENCE-2026.md](../../03-PILOTAGE/07_cloud_foundations/RELEVE-REFERENCE-2026.md) |
| Egress | 180 Go sortants | mois | 16 € | fournisseur A | 2026-08-14 | prix unitaires sourcés : [RELEVE-REFERENCE-2026.md](../../03-PILOTAGE/07_cloud_foundations/RELEVE-REFERENCE-2026.md) |
| Observabilité | plan payant, 10 Go de logs/mois | mois | 25 € | fournisseur A | 2026-08-14 | prix unitaires sourcés : [RELEVE-REFERENCE-2026.md](../../03-PILOTAGE/07_cloud_foundations/RELEVE-REFERENCE-2026.md) |
| **Total** | | mois | **395 €** | fournisseur A | 2026-08-14 | somme des lignes ci-dessus |

## 4. Facture mensuelle par catégorie, à 1 000 000 utilisateurs

> Relevé le 2026-08-14, chez fournisseur A (hyperscaler généraliste), unité indiquée par ligne, prix unitaires issus des 12 lignes sourcées (URL complète, date, devise, unité) de [RELEVE-REFERENCE-2026.md](../../03-PILOTAGE/07_cloud_foundations/RELEVE-REFERENCE-2026.md), relevées le 2026-08-18 et à revérifier avant 2027-08-18. Protocole : [../99-COULISSES/meta/PROTOCOLE-DONNEE-SOURCEE.md](../../99-COULISSES/meta/PROTOCOLE-DONNEE-SOURCEE.md).

| Catégorie | Service | Unité | Coût mensuel | Chez | Relevé le | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Calcul | flotte autoscalée, pic à 40 vCPU cumulés | mois | 4 800 € | fournisseur A | 2026-08-14 | prix unitaires sourcés : [RELEVE-REFERENCE-2026.md](../../03-PILOTAGE/07_cloud_foundations/RELEVE-REFERENCE-2026.md) |
| Base de données | cluster managé, 2 répliques de lecture, sauvegarde continue | mois | 3 100 € | fournisseur A | 2026-08-14 | prix unitaires sourcés : [RELEVE-REFERENCE-2026.md](../../03-PILOTAGE/07_cloud_foundations/RELEVE-REFERENCE-2026.md) |
| Stockage objet | 2 To | mois | 46 € | fournisseur A | 2026-08-14 | prix unitaires sourcés : [RELEVE-REFERENCE-2026.md](../../03-PILOTAGE/07_cloud_foundations/RELEVE-REFERENCE-2026.md) |
| Egress | 18 To sortants (poste dominant à cette échelle) | mois | 1 620 € | fournisseur A | 2026-08-14 | prix unitaires sourcés : [RELEVE-REFERENCE-2026.md](../../03-PILOTAGE/07_cloud_foundations/RELEVE-REFERENCE-2026.md) |
| Observabilité | plan payant, 400 Go de logs/mois | mois | 640 € | fournisseur A | 2026-08-14 | prix unitaires sourcés : [RELEVE-REFERENCE-2026.md](../../03-PILOTAGE/07_cloud_foundations/RELEVE-REFERENCE-2026.md) |
| CDN | mise en cache des assets statiques, non nécessaire aux paliers inférieurs | mois | 210 € | fournisseur A | 2026-08-14 | prix unitaires sourcés : [RELEVE-REFERENCE-2026.md](../../03-PILOTAGE/07_cloud_foundations/RELEVE-REFERENCE-2026.md) |
| **Total** | | mois | **10 416 €** | fournisseur A | 2026-08-14 | somme des lignes ci-dessus |

## 4bis. Portage chez le second fournisseur

> Relevé le 2026-08-14, chez fournisseur B (fournisseur européen), unité indiquée par ligne, prix unitaires issus des 12 lignes sourcées (URL complète, date, devise, unité) de [RELEVE-REFERENCE-2026.md](../../03-PILOTAGE/07_cloud_foundations/RELEVE-REFERENCE-2026.md), relevées le 2026-08-18 et à revérifier avant 2027-08-18.

| Catégorie | Unité | Coût mensuel au palier 10 000 | Chez | Relevé le | Ce qui change de nature |
| --- | --- | --- | --- | --- | --- |
| Calcul | mois | 155 € | fournisseur B | 2026-08-14 | facturé au provisionné, pas à la seconde : l'autoscaling n'économise plus rien la nuit |
| Base de données | mois | 175 € | fournisseur B | 2026-08-14 | sauvegarde continue vendue séparément, donc astreinte partiellement rendue à l'équipe |
| Egress | mois | 9 € | fournisseur B | 2026-08-14 | egress gratuit vers son propre CDN : le poste dominant du palier 1 000 000 change de forme |
| **Total** | mois | **381 €** | fournisseur B | 2026-08-14 | écart de total inférieur à 4 pour cent, écart de mécanisme considérable |

Réversibilité : sortie estimée à 9 jours ouvrés, dont 2 To d'egress de migration facturés une fois. Le total se ressemble, les mécanismes non : c'est la seule conclusion utile de ce portage.

## 5. Ce que ce budget révèle

L'egress passe de 0,18 € à 1 620 € entre le premier et le dernier palier : ce n'est pas une
ligne accessoire, c'est le deuxième poste à un million d'utilisateurs. Un budget qui
l'omettrait masquerait le vrai point de bascule économique du projet.

## 6. Recroisement obligatoire

Ce budget est repris tel quel dans la section 3 du dossier unique
(`05-MAITRISE/08_maitrise_staff_engineer/01_dossier_unique.md`) et dans les tensions du
capstone (`04-EPREUVE/06-CAPSTONE-ARENA/06-addendum-staff-engineer.md`). Le budget d'erreur
du fichier `PREUVES/SLO.md` doit rester tenable avec ces montants : si doubler la
disponibilité doublait la facture sans qu'aucun des deux documents ne le dise, l'un des
deux mentirait par omission.
