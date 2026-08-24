---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [regression, fausse_piste]
anti_recipe_key: regression+fausse_piste
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## TYPE

Mini-projet

## Niveau

[OK] Avancé

## CONTEXTE

Le portfolio va changer : un septième projet, une refonte de rangées. Concevoir pour le changement, c'est isoler ce qui bouge.

## OBJECTIF

Ajouter un projet coûte une seule ligne.

## APPLICATION

- Ajoute un septième projet fictif à `projects.js` et chronomètre ce que ça demande.
- Note chaque fichier que tu as dû toucher.
- Si tu en as touché plus de deux, refactore pour que l'ajout ne coûte qu'une entrée de données.
- Supprime ensuite le projet fictif.

## Critère de réussite

- [ ] Ajoute un septième projet fictif à `projects.js` et chronomètre ce que ça demande.
- [ ] Note chaque fichier que tu as dû toucher.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quels fichiers doivent rester intouchés lors de l'ajout d'un projet, et pourquoi ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ajouter un projet coûte une seule ligne.

Ton catalogue est extensible pour de vrai, testé par l'expérience. Commit le refactor.

## CHECKPOINT DE PROFONDEUR : variation D : transfert négatif

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

Prends le mécanisme de cette page et transpose-le dans un contexte où il risque de devenir une mauvaise pratique. Explique **quelle hypothèse cesse d'être vraie**, quelle conséquence apparaît, et quelle stratégie tu utiliserais à la place.
