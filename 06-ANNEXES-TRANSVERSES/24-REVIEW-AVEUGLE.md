---
stability: intemporel
acte: pratique
noyau: oui
route_family: core
---

# 24 : REVIEW AVEUGLE DE PROVENANCE

## But

L'apprenant doit apprendre à évaluer un système sans être influencé par son origine présumée.

Le fichier historique `18_human_vs_ai_smell` reste disponible. Ce protocole ajoute une version plus durable : la provenance est cachée jusqu'à la fin.

## Procédure

Le reviewer reçoit deux implémentations du même problème :

- origine inconnue ;
- même contrat ;
- mêmes fixtures ;
- mêmes critères.

Il doit noter uniquement :

- correction ;
- sécurité ;
- observabilité ;
- complexité ;
- performance ;
- testabilité ;
- maintenabilité ;
- cohérence avec les contraintes.

## Révélation

La provenance est révélée seulement après la décision.

L'apprenant répond ensuite :

> « Qu'est-ce qui, dans mon jugement, aurait changé si l'origine avait été annoncée avant ? »

## Gate

Une différence de style n'est jamais une preuve de qualité ou de médiocrité.

L'objectif est de développer une compétence de revue **provenance-blind**, durable même quand les outils de génération évoluent.
