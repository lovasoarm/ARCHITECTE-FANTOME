---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [transmission, constraints_injectees]
anti_recipe_key: transmission+constraints_injectees
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mission Konoha :** trois clones partent en même temps, mais un seul doit avoir le dernier mot. Si tu ne distingues pas file d'attente, concurrence et ordre d'exécution, les clones vont te livrer leurs résultats dans un ordre qui te fera accuser le mauvais ninja.

## TYPE

<!-- AF-DIAGRAM:async_await -->

```text
┌──────────────┐
│ fonction     │
│ async        │
└──────┬───────┘
       │ await
       ▼
┌──────────────┐
│ suspend      │
│ la reprise   │
└──────┬───────┘
       │ Promise prête
       ▼
┌──────────────┐
│ reprend      │
│ le contexte  │
└──────────────┘
```

await suspend la reprise de la fonction async, pas l’ensemble du runtime.

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

Mini-projet

## Niveau

[OK] Intermédiaire

## Prérequis

- Connaître `useEffect`

## CONTEXTE

Annuler une requête devenue inutile évite les réponses en retard qui écrasent l'affichage : typique d'une recherche de projets qui filtre à la frappe.

## OBJECTIF

Ta recherche affiche toujours le bon résultat.

## APPLICATION

- Implémente la recherche du catalogue avec un appel asynchrone (même simulé).
- Tape vite plusieurs lettres et observe les réponses arriver dans le désordre.
- Ajoute un `AbortController` annulé au nettoyage du `useEffect`.

## Critère de réussite

- [ ] Implémente la recherche du catalogue avec un appel asynchrone (même simulé).
- [ ] Tape vite plusieurs lettres et observe les réponses arriver dans le désordre.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi une réponse arrivée en retard est-elle un bug d'affichage et pas seulement du gaspillage ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ta recherche affiche toujours le bon résultat.

La barre de recherche du portfolio est fiable même en frappe rapide. Commit ce composant.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.
