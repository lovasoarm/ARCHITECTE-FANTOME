---
stability: perissable_2027
acte: appliquer
---

# GABARIT VIVANT : BUDGET-CLOUD.md

> Relevé le 2026-08-14, chez les fournisseurs cités dans ce fichier, unité indiquée par ligne, URL : pages tarifaires publiques, à revérifier avant 2027. Tout montant de ce fichier est un ordre de grandeur daté, jamais une vérité intemporelle. Protocole imposé : [../../06-ANNEXES-TRANSVERSES/meta/PROTOCOLE-DONNEE-SOURCEE.md](../../06-ANNEXES-TRANSVERSES/meta/PROTOCOLE-DONNEE-SOURCEE.md).

Format imposé du livrable de la famille S1. Copie ce fichier dans `PREUVES/BUDGET-CLOUD.md` de ton dépôt et remplis-le. L'exemplaire rempli de référence est [PREUVES-MODELES/S1-BUDGET-CLOUD.md](../../PREUVES-MODELES/S1-BUDGET-CLOUD.md).

## 1. Hypothèses de trafic

| Palier | Utilisateurs actifs/mois | Requêtes/s en pointe | Volume stocké | Source de l'hypothèse |
| --- | --- | --- | --- | --- |
| 100 | | | | |
| 10 000 | | | | |
| 1 000 000 | | | | |

## 2, 3, 4. Facture par palier

Un tableau par palier, une ligne par catégorie, **egress obligatoire même à zéro** :

| Catégorie | Service | Unité | Coût mensuel | Chez | Relevé le | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Calcul | | | | | | |
| Base de données | | | | | | |
| Stockage objet | | | | | | |
| Egress | | | | | | |
| Observabilité | | | | | | |
| **Total** | | | | | | |

## 5. Coût par utilisateur actif

Un nombre par palier, et une phrase disant pourquoi il monte, descend ou reste stable.

## 6. Ce que ce budget révèle

La ligne qui explose en premier, et à quel palier elle devient dominante.

## 6bis. Portage chez un second fournisseur

Le même tableau, chez l'autre fournisseur relevé, suivi de la liste "ce qui change de nature, pas seulement de prix" et de la phrase de réversibilité. Consigne complète : [06_portage_multicloud.md](06_portage_multicloud.md).

## 7. Recroisements obligatoires

- Tenabilité avec `PREUVES/SLO.md` : ce que coûterait la neuvième suivante.
- Reprise dans la section 3 du dossier unique et dans les tensions du capstone.

## Règles de validité

- Chaque chiffre porte ses quatre colonnes de traçabilité : Relevé le, Chez, Unité, URL. Un chiffre sans URL est une opinion datée.
- Aucun montant n'est repris du cours : les montants du repo sont des exemples de forme, pas des sources.
- La ligne egress ne se supprime jamais, même quand elle vaut 0,18 €.
- Une grille tarifaire citée porte une date de péremption, comme dans [05_choisir_fournisseur.md](05_choisir_fournisseur.md).
