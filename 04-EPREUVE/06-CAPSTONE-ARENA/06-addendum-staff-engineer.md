---
stability: perissable_2027
acte: appliquer
---

# ADDENDUM STAFF ENGINEER : LE CAPSTONE NE SE VALIDE PLUS SANS CES QUATRE PIÈCES

Ce fichier ne remplace rien du briefing d'origine : il ajoute la condition de sortie du fil ARCHITECTE-FANTOME. Le capstone reste le même projet, avec les mêmes jalons datés. Ce qui change, c'est qu'un livrable qui prouve une seule famille de compétences ne suffit plus.

## La règle : quatre familles, un seul livrable

Un apprenant qui montre six exercices séparés a six exercices. Un Staff Engineer montre un système et sait dire comment ses contraintes se sont contredites entre elles. Ton capstone doit donc porter, sur le MÊME projet fil rouge :

1. **S2, architecture** : un ADR par décision structurante, dont au moins un qui documente ton découpage en contextes bornés, produit au module [02-CONSTRUCTION/16_ddd_contrats](../../02-CONSTRUCTION/16_ddd_contrats/00_why_ddd_contrats.md).
2. **S1, systèmes et cloud** : un budget cloud chiffré à trois échelles, produit au module [03-PILOTAGE/07_cloud_foundations](../../03-PILOTAGE/07_cloud_foundations/00_why_cloud_foundations.md).
3. **S3, fiabilité et sécurité** : un SLO écrit par toi, avec son budget d'erreur et son RTO mesuré, produit au module [03-PILOTAGE/06_fiabilite_slo](../../03-PILOTAGE/06_fiabilite_slo/00_why_fiabilite_slo.md), plus la revue de sécurité de [04-EPREUVE/01-BONUS-VAULT/05-security-cost-privacy.md](../01-BONUS-VAULT/05-security-cost-privacy.md).
4. **Au moins une famille parmi S4, S5, S6**, selon ton projet :
   - S4 produit et business : la note d'arbitrage du changement de spec, avec les trois nombres de la grille du module [03-PILOTAGE/08_produit_cout_roi](../../03-PILOTAGE/08_produit_cout_roi/00_why_produit_cout_roi.md).
   - S5 leadership : la soutenance préparée en quatre traductions, module [03-PILOTAGE/11_leadership_mentorat](../../03-PILOTAGE/11_leadership_mentorat/00_why_leadership_mentorat.md).
   - S6 IA : l'intégration IA documentée et bornée, fichier [04-EPREUVE/04_ai_native_dev/90_ia_dans_le_livrable_staff.md](../04_ai_native_dev/90_ia_dans_le_livrable_staff.md).

## La preuve du croisement, pas de la juxtaposition

Le jury de ton propre parcours, c'est toi, et la question est unique : dans quelle page ces pièces se contredisent-elles.

Écris une section **"Les trois tensions"** dans ton dossier de capstone. Chaque tension oppose deux familles sur ton projet précis. Exemples de forme attendue, à remplir avec tes chiffres :

```
tension 1 : SLO 99,9% (S3) --> multi-zone --> +X par mois (S1)
            arbitrage retenu : ... parce que ...
tension 2 : contexte borné supplémentaire (S2) --> +1 déploiement,
            +Y heures d'exploitation par mois (S1/S3)
            arbitrage retenu : ... parce que ...
tension 3 : fonctionnalité IA (S6) --> coût par requête variable (S1)
            et donnée sortante à journaliser (S3)
            arbitrage retenu : ... parce que ...
```

Un dossier sans tension écrite n'a pas croisé les familles : il les a rangées côte à côte.

## Où ça finit

Les chemins exacts de ces quatre pièces se recopient dans [PREUVES-STAFF-ENGINEER.md](../../PREUVES-STAFF-ENGINEER.md), à la racine du repo. C'est ce fichier qu'un recruteur ouvre en premier, pas ton code.
