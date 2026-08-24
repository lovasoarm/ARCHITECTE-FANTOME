---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [constraints_injectees, changement_echelle]
anti_recipe_key: constraints_injectees+changement_echelle
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : mur de siège :** le bug n'est pas “où ça a explosé ?”, mais “où la première fissure est-elle apparue ?”. Ici, chaque log, test et reproduction est une empreinte dans le mur.

## TYPE

Projet fil rouge

## Niveau

[OK] Intermédiaire

## CONTEXTE

Décider où l'erreur s'arrête : la couche données la remonte, la couche UI la traduit. Mélanger les deux produit des messages incompréhensibles.

## OBJECTIF

Tes erreurs remontent proprement.

## APPLICATION

- Trace le chemin d'une erreur de fetch depuis `lib/` jusqu'au composant.
- Fais en sorte que `lib/` ne rende jamais de JSX et que le composant n'affiche jamais un message technique brut.
- Écris le message destiné au visiteur.

## Critère de réussite

- [ ] Trace le chemin d'une erreur de fetch depuis `lib/` jusqu'au composant.
- [ ] Fais en sorte que `lib/` ne rende jamais de JSX et que le composant n'affiche jamais un message technique brut.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quelle couche connaît la cause, et quelle couche connaît le bon message ?

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

Dans ce scénario, tu as vérifié que : tes erreurs remontent proprement.

Le visiteur lit une phrase humaine, toi tu gardes la cause technique dans les logs. Commit.

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
