---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [defaut_cache, regression]
anti_recipe_key: defaut_cache+regression
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : clan des ninjas :** une abstraction peut être une technique secrète… ou une montagne de parchemins pour un problème de trois lignes. Ton défi est de savoir laquelle des deux tu construis.

## TYPE

Projet fil rouge

## Niveau

[OK] Intermédiaire

## CONTEXTE

Typer les entrées/sorties des fonctions de `lib/` transforme la doc en garantie. Un mauvais argument devient impossible à écrire.

## OBJECTIF

Ta couche lib est entièrement typée.

## APPLICATION

- Type toutes les signatures de `lib/projects.ts` et `lib/format.ts`.
- Type explicitement les valeurs de retour, sans t'appuyer sur l'inférence.
- Type les props de `ProjectCard` et supprime tout `any` restant.

## Critère de réussite

- [ ] Type toutes les signatures de `lib/projects.ts` et `lib/format.ts`.
- [ ] Type explicitement les valeurs de retour, sans t'appuyer sur l'inférence.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi expliciter le type de retour d'une fonction exportée alors que TypeScript sait l'inférer ?

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

Dans ce scénario, tu as vérifié que : ta couche lib est entièrement typée.

L'autocomplétion travaille pour toi dans tout le projet. Commit.

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
