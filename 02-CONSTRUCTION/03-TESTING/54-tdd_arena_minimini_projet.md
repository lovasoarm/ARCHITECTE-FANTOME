---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [changement_echelle, changement_contexte]
anti_recipe_key: changement_echelle+changement_contexte
transfer_distance: high
assessment_role: instructional_checkpoint
---

# Mise en pratique : TDD arena : le test en premier, toujours

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

## Livraison produit obligatoire : Kintana : Contrat métier sous filet

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 54-tdd_arena_minimini_projet » :** Dans Kintana, protège un invariant métier par tests nominaux, limites, droits et panne. Injecte une régression volontaire pour vérifier que la suite l’attrape.

Construis une suite de tests autour d’un invariant Kintana lié à cette notion. Ajoute un test nominal, un cas limite, un cas d’accès refusé ou de panne selon le sujet, puis injecte volontairement une régression.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Les assertions testent le comportement public ; la régression est détectée ; les tests restent déterministes et reproductibles. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
