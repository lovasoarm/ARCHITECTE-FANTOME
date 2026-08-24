---
stability: intemporel
acte: décider
preuve: learner
---

# ADR-001 : décision d’architecture : Épreuve de décision non résolue

> **Règle learner :** aucune décision de référence n'est fournie ici. La décision
> doit être produite à partir du contexte du mini-projet, puis défendue et révisée
> après perturbation.

## Mission

Produis un ADR original pour cette situation. Tu dois choisir, pas retrouver une
réponse attendue. Toute alternative raisonnable doit être explicitement considérée.

## Contraintes minimales

- identifier le problème et les hypothèses encore incertaines ;
- proposer au moins deux options plausibles ;
- expliciter les critères de décision ;
- produire une décision provisoire ;
- donner au moins un coût, un risque et une conséquence secondaire ;
- écrire l'argument le plus fort **contre** ta propre décision ;
- préciser quelle observation te ferait changer d'avis ;
- rester indépendant d'un framework ou d'un nom d'architecture tant que le mécanisme n'est pas justifié.

## Épreuve adverse

Après ta première décision, ajoute une perturbation non prévue au départ : charge,
coût, sécurité, disponibilité, besoin produit, dépendance ou contrainte d'équipe.
Réévalue la décision et note explicitement ce qui change et ce qui ne change pas.

## Transfert

<!-- AF-DIAGRAM:transfer -->

```text
text
Principe appris
      │
      ▼
Nouveau contexte
      │
      ├── invariant ──► conserver
      │
      └── hypothèse cassée ─► adapter
                                │
                                ▼
                             nouvelle décision
```

Le transfert teste ce qui survit du principe et ce qui doit être révisé dans un contexte nouveau.

Explique comment la même décision devrait être adaptée dans un contexte différent
(langage, scale, fournisseur, équipe ou contrainte). Donne aussi un cas où ton
conseil initial deviendrait mauvais.

## Rappel à froid

Une semaine plus tard, reconstruis l'ADR sans rouvrir ce fichier puis compare ta
reconstruction à ta version initiale.

## Preuve attendue

La preuve est le raisonnement et les révisions de l'apprenant. La simple production
d'un fichier ADR ne suffit pas.
