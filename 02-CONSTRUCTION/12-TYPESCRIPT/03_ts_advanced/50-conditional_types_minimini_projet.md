---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [changement_contexte, decision_inversee]
anti_recipe_key: changement_contexte+decision_inversee
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Garo :** la règle est simple jusqu'au jour où un état caché traverse une frontière. À partir de là, le “petit raccourci” devient le Horror qui te poursuit pendant trois heures.

## TYPE

Mini-projet

## Niveau

[OK] Avancé

## CONTEXTE

Les types conditionnels adaptent un type selon un autre. Utile pour une carte dont les props varient selon la variante d'affichage.

## OBJECTIF

Tes variantes de carte sont contraintes par le type.

## APPLICATION

- Définis une variante `"hero" | "row"` pour la carte.
- Fais qu'en variante `hero`, le champ `description` soit requis, et interdit en variante `row`.
- Vérifie que l'erreur apparaît bien à l'usage.

## Critère de réussite

- [ ] Définis une variante `"hero" | "row"` pour la carte.
- [ ] Fais qu'en variante `hero`, le champ `description` soit requis, et interdit en variante `row`.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Ce type conditionnel améliore-t-il vraiment ton code, ou complique-t-il la lecture ? Tranche.

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tes variantes de carte sont contraintes par le type.

Impossible d'utiliser la mauvaise variante par erreur. Commit si tu gardes, documente si tu simplifies.

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
