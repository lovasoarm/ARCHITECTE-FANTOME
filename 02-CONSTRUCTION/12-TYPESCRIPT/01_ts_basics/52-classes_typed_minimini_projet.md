---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [solution_concurrente, defaut_cache]
anti_recipe_key: solution_concurrente+defaut_cache
transfer_distance: high
assessment_role: instructional_checkpoint
---

# Mise en pratique : Classes typescript : l'armure avant le combat

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

## Livraison produit obligatoire : Kintana : Règle métier et état

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 52-classes_typed_minimini_projet » :** Modélise une demande Kintana avec une classe TypeScript uniquement si elle protège un invariant utile. Encapsule l’état mutable et refuse les transitions interdites ; compare avec un objet simple typé.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
