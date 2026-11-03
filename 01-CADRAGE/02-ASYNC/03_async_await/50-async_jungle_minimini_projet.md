---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [changement_contexte, transmission]
anti_recipe_key: changement_contexte+transmission
transfer_distance: low
assessment_role: diagnostic_mastery
---

# Mise en pratique : ASYNC/AWAIT : LA JUNGLE

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

## Livraison produit obligatoire : Kintana : Notification fiable

> **Fil narratif : Équipe 7 / Naruto :** Kakashi ne lance pas l’équipe dans le brouillard sans objectif ni plan de sortie. Ici, la mission commence par une hypothèse vérifiable, pas par un clavier en surchauffe.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 50-async_jungle_minimini_projet » :** Dans Kintana, traite une notification ou un événement soumis à délai, doublon et panne. Définis la politique de reprise et prouve qu’un rejeu ne double pas l’effet.

Intègre cette notion au traitement asynchrone des notifications Kintana. Simule au moins un timeout, un retry et un événement reçu deux fois ; conserve une clé stable pour empêcher un double effet.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Le système ne perd pas silencieusement l’événement ; il ne double pas l’effet ; le délai et le nombre de tentatives sont observables. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
