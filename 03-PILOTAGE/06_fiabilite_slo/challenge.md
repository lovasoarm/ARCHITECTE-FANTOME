# CHALLENGE : LE SLO.md DE TON PROJET, TENABLE ET CHIFFRÉ

Ce challenge produit une pièce de preuve réelle, la famille S3 de [PREUVES-STAFF-ENGINEER.md](../../PREUVES-STAFF-ENGINEER.md). Compte 45 minutes, chrono lancé, sans IA. Le modèle de référence rempli est [PREUVES-MODELES/S3-SLO.md](../../PREUVES-MODELES/S3-SLO.md) : ouvre-le seulement après avoir écrit ta première version, sinon tu recopieras ses chiffres au lieu de trouver les tiens.

## Le contexte narratif

Ton projet fil rouge passe en production lundi. Le commanditaire te demande une phrase : "qu'est-ce que vous promettez, exactement ?" Il n'acceptera ni "on fera au mieux", ni "99,99%".

## Ce que tu produis

Un fichier `SLO.md` dans ton dépôt, avec exactement ces cinq sections :

1. **La phrase d'objectif**, au format imposé de [01_sli_slo_budget_erreur.md](01_sli_slo_budget_erreur.md) : action, résultat mesurable, pourcentage, fenêtre.
2. **Le budget d'erreur** converti en requêtes ratées par semaine, avec l'hypothèse de volume et sa source.
3. **Le RTO mesuré** au chronomètre, avec la date du test et l'écart entre l'annoncé et le mesuré ([03_reprise_rpo_rto.md](03_reprise_rpo_rto.md)).
4. **Les alertes qui réveillent quelqu'un** : tableau seuil / destinataire / canal, trois lignes maximum ([02_alerting_astreinte.md](02_alerting_astreinte.md)).
5. **La tenabilité avec le budget cloud** : une phrase qui dit ce que coûterait la neuvième suivante, croisée avec [07_cloud_foundations](../07_cloud_foundations/00_why_cloud_foundations.md).

## Barème honnête

- Les cinq sections sont remplies, le RTO est daté et mesuré, la section 5 nomme un montant, et le `POSTMORTEM.md` de [05_panne_subie_sur_fil_rouge.md](05_panne_subie_sur_fil_rouge.md) est signé : la preuve S3 est acquise.
- Le RTO est annoncé sans test, ou sans le `POSTMORTEM.md` signé qui le prouve : la section 3 ne vaut rien, et c'est la première chose qu'un jury vérifie. Rejoue [05_panne_subie_sur_fil_rouge.md](05_panne_subie_sur_fil_rouge.md) avant de continuer, ce fichier n'est pas publiable sans elle.
- Plus de trois alertes qui réveillent, ou une alerte sans document d'astreinte : ton astreinte ne tiendra pas un trimestre. Retri obligatoire.
- Aucun chiffre en section 5 : ton SLO et ton budget vivent dans deux mondes séparés, ce que le dossier final de [05-MAITRISE/08_maitrise_staff_engineer](../../05-MAITRISE/08_maitrise_staff_engineer/01_dossier_unique.md) refusera.

## Où ça ressort

`SLO.md` est un livrable obligatoire du capstone : [04-EPREUVE/06-CAPSTONE-ARENA/03-deliverables.md](../../04-EPREUVE/06-CAPSTONE-ARENA/03-deliverables.md). Il est réouvert en section 4 du dossier unique, où la contrainte imposée t'obligera à dire ce que tu as dégradé.

## ET APRÈS

Le [boss fight](boss-fight.md) : ton budget d'erreur part en fumée un vendredi, et trois personnes veulent des choses incompatibles.
