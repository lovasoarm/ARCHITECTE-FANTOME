---
stability: perissable
acte: pilotage
noyau: renfort
---

# RELEVÉ DE RÉFÉRENCE — ORDRES DE GRANDEUR 2026

> **À ne jamais recopier dans ton livrable.** Ce fichier existe pour que tu saches si ton propre
> relevé est vraisemblable. Un `BUDGET-CLOUD.md` qui reprend ces chiffres est refusé au boss fight
> (AF-017) : la compétence auditée est le **relevé personnel daté**, pas la lecture d'un tableau.

## Ordres de grandeur, tous fournisseurs confondus, hors remises

| Poste | Ordre de grandeur mensuel | Remarque |
| --- | --- | --- |
| Stockage objet | ~0,02 €/Go-mois | + coût par 1 000 requêtes, souvent dominant |
| Egress internet | ~0,08 €/Go | premier poste surprise ; ~0 en entrée |
| Calcul sans serveur | ~0,20 € / million d'invocations + secondes-Go | plancher très bas, pente forte |
| Petite base managée | ~15 à 60 €/mois | double avec la haute disponibilité |
| Journalisation | ~0,50 €/Go ingéré | la rétention multiplie |
| CDN | ~0,01 à 0,05 €/Go | remplace l'egress, presque toujours gagnant |

## Comment lire ce tableau

Deux fournisseurs peuvent différer d'un facteur 3 sur un poste et d'un facteur 1 sur le total.
Compare des **factures complètes**, jamais des lignes isolées.

## Règle de fraîcheur

Ce relevé est daté du 2026-08-18. Au-delà de 12 mois, il est périmé : refais le tien
(`07_releve_tarifaire_reel.md`) et remplace la date dans ton `BUDGET-CLOUD.md`.
