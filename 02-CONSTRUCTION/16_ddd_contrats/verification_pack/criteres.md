---
stability: intemporel
acte: construction
noyau: renfort
---

# CRITÈRES DE PASSAGE — MODULE 16

Chaque ligne se coche avec un chemin de fichier de **ton** dépôt en face. Sans chemin, non coché.

| # | Critère | Preuve attendue |
| --- | --- | --- |
| 1 | Carte de contextes justifiée par le langage | `ADR/contextes-bornes.md` |
| 2 | Chaque frontière a un coût écrit | même fichier, section coût |
| 3 | Contrat v2 publié, changements classés | `contrats/v2.md` |
| 4 | Double service effectif | logs des deux versions le même jour |
| 5 | Jeu de cas exécutable ≥ 8 cas dont 3 erreurs | `contrats/cas/` + sortie CI |
| 6 | Extinction datée et annoncée | en-tête `Sunset` + message d'annonce |
| 7 | Refus chiffré avec seuil déclencheur | `ADR/refus-architecture.md` |
| 8 | Gate sécurité passé (diff de schéma, pas de fuite de champ) | diff joint au boss fight |
| 9 | Explication à trois publics rendue | fichier du module 05 rempli |
| 10 | Défense orale enregistrée | lien ou fichier local daté |

Passage : 9 critères sur 10, dont obligatoirement 3, 4, 6 et 8.
