---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [constraints_injectees, preuve_partielle]
anti_recipe_key: constraints_injectees+preuve_partielle
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : traqueur de jutsu :** Naruto voit l'explosion finale et accuse le dernier fichier touché. Mauvais réflexe. Ton enquête doit remonter le flux, figer les hypothèses et retrouver la première trace qui ne colle plus.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

`try/catch` protège une frontière, pas tout le code. Sur le portfolio, les frontières sont : appels réseau, lecture de stockage, parsing JSON.

## OBJECTIF

Tes frontières risquées sont couvertes.

## APPLICATION

- Recense les trois frontières ci-dessus dans ton code.
- Protège chacune avec un `try/catch` qui renvoie une valeur de repli utilisable.
- Vérifie qu'aucun `catch` ne reste vide ou ne se contente d'un `console.log`.

## Critère de réussite

- [ ] Recense les trois frontières ci-dessus dans ton code.
- [ ] Protège chacune avec un `try/catch` qui renvoie une valeur de repli utilisable.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi un `catch` vide est-il pire que pas de `catch` du tout ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tes frontières risquées sont couvertes.

Trois points de rupture réels du portfolio sont sécurisés. Commit.

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
