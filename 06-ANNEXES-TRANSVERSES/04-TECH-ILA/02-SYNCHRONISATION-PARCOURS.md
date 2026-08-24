---
stability: evolutif
acte: comprendre
companion: ce parcours
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# TECH-ILA : synchronisation avec le fil principal

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

<!-- AF-DIAGRAM:offline_sync -->

```text
text
        Local changes
Client ───────────────► Local store
  ▲                        │
  │ sync                   │ reconnect
  └────────────── Server ◄─┘
                    │
                    ▼
                conflicts
```

Un système offline conserve des changements locaux puis négocie leur synchronisation et leurs conflits au retour du réseau.

TECH-ILA n'est **pas** un examen final à faire après avoir fini JavaScript, TypeScript et Staff.
Il accompagne le fil principal au moment où un mécanisme devient utile dans un écosystème réel.

## La règle

```text
mécanisme JS/TS
   ↓
pratique sur le fil principal
   ↓
TECH-ILA : voir le même mécanisme dans une vraie stack
   ↓
mini-projet
   ↓
transfert / architecture
   ↓
Staff : décider quand l'outil vaut la complexité
```

Jamais :

```text
apprendre 300 outils
→ espérer comprendre pourquoi ils existent
```

## Synchronisation par phase

| Phase AF       | Fil principal                       | TECH-ILA à ouvrir   | Preuve de synchronisation                              |
| -------------- | ----------------------------------- | ------------------- | ------------------------------------------------------ |
| Socle          | JS/TS, shell, Git, runtime          | Niveau 0 + Niveau 1 | une commande / un geste reproduit dans un mini-projet  |
| Cadrage        | async, debugging, erreurs           | Niveau 1 → 2        | même bug raisonné dans JS puis dans l'outil            |
| Construction   | TS, tests, API, architecture        | Niveau 2 → 3        | choisir l'outil après avoir écrit le mécanisme minimum |
| Pilotage       | sécurité, observabilité, cloud, SLO | Niveau 3 → 4        | décision outillage + coût + preuve                     |
| Épreuve        | système réel, lecture legacy, IA    | Niveau 4 + 6        | auditer une stack inconnue et justifier les outils     |
| Maîtrise Staff | transfert, arbitrage, architecture  | Niveau 5 + 6        | refaire une décision dans un autre écosystème          |

## Test anti-collection

À chaque fiche TECH-ILA, le candidat doit répondre :

1. Quel mécanisme du fil principal se cache derrière cet outil ?
2. Qu'est-ce que l'outil masque ?
3. Dans quel contexte je refuserais cet outil ?
4. Comment prouver que je le maîtrise dans un mini-projet ?

Si la réponse se limite au nom d'un framework, TECH-ILA est raté.

## Le vrai fil d'apprentissage

JavaScript / TypeScript reste le **terrain d'expérimentation** du début du parcours.
TECH-ILA élargit progressivement le terrain sans abandonner les fondations.

Au niveau Staff, le candidat ne doit plus demander :

> « Quel framework dois-je apprendre ? »

mais :

> « Quel mécanisme est en jeu, quelles contraintes changent avec cette stack, et quel outil
> réduit réellement le coût sans me faire perdre le modèle mental ? »
