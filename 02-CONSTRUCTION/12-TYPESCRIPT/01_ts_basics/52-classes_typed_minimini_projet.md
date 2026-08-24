---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [solution_concurrente, defaut_cache]
anti_recipe_key: solution_concurrente+defaut_cache
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Garo :** la règle est simple jusqu'au jour où un état caché traverse une frontière. À partir de là, le “petit raccourci” devient le Horror qui te poursuit pendant trois heures.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Le portfolio est fonctionnel, mais deux classes restent légitimes : les erreurs métier et l'`ErrorBoundary`. Il faut savoir les typer.

## OBJECTIF

Tes erreurs sont typées et discriminées.

## APPLICATION

- Type proprement la classe d'erreur `ProjectNotFoundError` créée en `01-CADRAGE/04-ERROR-HANDLING` (propriété `slug`, `name`).
- Écris un garde de type `isProjectNotFound(e: unknown)`.
- Utilise-le dans ton `catch` au lieu d'un `any`.

## Critère de réussite

- [ ] Type proprement la classe d'erreur `ProjectNotFoundError` créée en `01-CADRAGE/04-ERROR-HANDLING` (propriété `slug`, `name`).
- [ ] Écris un garde de type `isProjectNotFound(e: unknown)`.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi le paramètre d'un `catch` est-il `unknown` et pas `Error` ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tes erreurs sont typées et discriminées.

Ton `catch` distingue enfin les cas au lieu de tout traiter pareil. Commit.

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
