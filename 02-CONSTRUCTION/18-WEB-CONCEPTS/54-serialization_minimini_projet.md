---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [transmission, changement_contexte]
anti_recipe_key: transmission+changement_contexte
transfer_distance: high
assessment_role: instructional_checkpoint
---

# Mise en pratique : Sérialisation : transporter les données sans les perdre

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

## Livraison produit obligatoire : Kintana : Parcours client sous réseau instable

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 54-serialization_minimini_projet » :** Implémente un morceau du parcours mobile/web de création ou suivi de demande. Ajoute états loading/empty/error, accessibilité clavier et conservation du brouillon quand la connexion disparaît.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Une coupure ne détruit pas la saisie ; une reprise ne crée pas de doublon ; l’état reste compréhensible sur petit écran. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
