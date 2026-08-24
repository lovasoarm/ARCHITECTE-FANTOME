---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [changement_contexte, transmission]
anti_recipe_key: changement_contexte+transmission
transfer_distance: low
assessment_role: diagnostic_mastery
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

Mini-projet

## Niveau

[OK] Intermédiaire

## Prérequis

- Connaître la frontière Server / Client de l'App Router Next.js

## CONTEXTE

`async/await` est la forme lisible des promesses, et l'App Router l'autorise directement dans un Server Component.

## OBJECTIF

Ta page a un vrai état de chargement.

## APPLICATION

- Convertis tes fetchs en `async/await` dans un Server Component asynchrone.
- Ajoute un `loading.tsx` sur la route concernée.
- Vérifie visuellement l'état de chargement en throttlant le réseau.

## Critère de réussite

- [ ] Convertis tes fetchs en `async/await` dans un Server Component asynchrone.
- [ ] Ajoute un `loading.tsx` sur la route concernée.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Que fait Next.js pendant que ton composant asynchrone attend ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ta page a un vrai état de chargement.

Le portfolio ne montre plus jamais un écran vide pendant l'attente. Commit `loading.tsx`.

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.
