---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [changement_echelle, changement_contexte]
anti_recipe_key: changement_echelle+changement_contexte
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Écrire le test d'abord force à définir le comportement attendu. Parfait pour la recherche du catalogue, dont les règles sont floues.

## OBJECTIF

La recherche est née d'une spécification exécutable.

## APPLICATION

- Écris d'abord les tests de `searchProjects(query)` : insensible à la casse, aux accents, recherche dans titre et stack, requête vide.
- Fais-les échouer.
- Implémente le minimum pour les faire passer, puis refactore.

## Critère de réussite

- [ ] Écris d'abord les tests de `searchProjects(query)`.
- [ ] Fais-les échouer.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Qu'est-ce que l'écriture des tests t'a fait décider que tu n'avais pas encore décidé ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : la recherche est née d'une spécification exécutable.

`searchProjects` est une vraie fonctionnalité du site, écrite et prouvée. Commit.

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
