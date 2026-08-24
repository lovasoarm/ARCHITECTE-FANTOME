---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [transmission, changement_contexte]
anti_recipe_key: transmission+changement_contexte
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## TYPE

Micro-drill

## Niveau

[OK] Avancé

## Prérequis

- Connaître la frontière Server / Client de l'App Router Next.js

## CONTEXTE

Les props traversant la frontière Server Component → Client Component doivent respecter les valeurs que le mécanisme de sérialisation de React/Next.js autorise. Teste notamment une fonction et une `Map` pour observer les limites.

## APPLICATION

- Essaie de passer une `Map` ou une fonction en prop d'un composant `"use client"` : lis l'erreur.
- Corrige en passant des données simples et en gardant la logique côté serveur.
- Note la règle de frontière en commentaire.

## Critère de réussite

- [ ] Essaie de passer une `Map` ou une fonction en prop d'un composant `"use client"`.
- [ ] Corrige en passant des données simples et en gardant la logique côté serveur.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quelles valeurs peuvent franchir la frontière serveur → client, et pourquoi cette limite existe-t-elle ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ta frontière de sérialisation est comprise.

Tu sais identifier quelles valeurs franchissent la frontière serveur → client et lesquelles doivent rester côté serveur. Commit.

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
