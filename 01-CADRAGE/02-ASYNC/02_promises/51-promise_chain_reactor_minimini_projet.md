---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [solution_concurrente, temps_limite]
anti_recipe_key: solution_concurrente+temps_limite
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mission Konoha :** trois clones partent en même temps, mais un seul doit avoir le dernier mot. Si tu ne distingues pas file d'attente, concurrence et ordre d'exécution, les clones vont te livrer leurs résultats dans un ordre qui te fera accuser le mauvais ninja.

## TYPE

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

<!-- AF-DIAGRAM:promise -->

```text
        ┌──────────┐
        │ pending  │
        └────┬─────┘
             │ résultat
       ┌─────┴─────┐
       ▼           ▼
┌────────────┐ ┌────────────┐
│ fulfilled  │ │ rejected   │
└─────┬──────┘ └─────┬──────┘
      │              │
      └──────┬───────┘
             ▼
       ┌───────────┐
       │ handlers  │
       └───────────┘
```

Une Promise évolue d’un état en attente vers un résultat résolu ou rejeté, puis déclenche ses handlers.

Micro-drill

## Niveau

[OK] Intermédiaire

## CONTEXTE

Enchaîner des promesses, c'est décider ce qui dépend de quoi. Deux appels indépendants doivent partir en parallèle, pas l'un après l'autre.

## APPLICATION

- Ajoute un second appel réseau (par ex. les derniers commits) à côté du premier.
- Écris-les d'abord en séquence, mesure le temps.
- Réécris avec `Promise.all`, mesure à nouveau.
- Gère le cas où l'un des deux échoue sans faire tomber l'autre.

## Critère de réussite

- [ ] Ajoute un second appel réseau (par ex. les derniers commits) à côté du premier.
- [ ] Écris-les d'abord en séquence, mesure le temps.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quand `Promise.all` est-il le mauvais choix, et par quoi le remplaces-tu ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tes appels réseau partent en parallèle.

Tu as réduit le temps de rendu serveur de ta page d'accueil, mesuré. Commit.

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.
