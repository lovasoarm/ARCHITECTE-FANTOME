---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [regression, preuve_partielle]
anti_recipe_key: regression+preuve_partielle
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## TYPE

Projet fil rouge

## Niveau

[OK] Fondamental

## CONTEXTE

Transformer proprement une donnée brute en donnée d'affichage (année en libellé, note en étoiles, statut en badge) est le travail de la couche présentation.

## OBJECTIF

Ta couche de formatage existe.

## APPLICATION

- Crée `lib/format.js`.
- Écris trois petites fonctions : `formatYear`, `formatRating`, `formatStatus`, chacune prenant une valeur brute et renvoyant une chaîne prête à afficher.
- Branche-les dans `ProjectCard` : plus aucune transformation dans le JSX.

## Critère de réussite

- [ ] Crée `lib/format.js`.
- [ ] Branche-les dans `ProjectCard`.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi ces conversions vivent-elles dans `lib/` et non à l'intérieur du composant ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Garde-fou

Avant de modifier le projet fil rouge :

1. Vérifie que le projet fonctionne.
2. Fais une modification minimale.
3. Vérifie le comportement demandé.
4. Lance les tests/build disponibles.
5. Ne supprime pas une fonctionnalité existante pour satisfaire l'exercice.
6. Si l'expérience est volontairement destructive, fais-la dans `scratch/` ou dans une branche dédiée.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ta couche de formatage existe.

`format.js` est une vraie pièce du portfolio, testable en `02-CONSTRUCTION/03-TESTING` sans monter un seul composant. Commit-la.

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
