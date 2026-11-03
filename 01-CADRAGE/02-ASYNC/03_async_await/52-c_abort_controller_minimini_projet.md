---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [transmission, constraints_injectees]
anti_recipe_key: transmission+constraints_injectees
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : Abortcontroller : annuler ce qui ne doit plus se terminer

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

## Livraison produit obligatoire : Kintana : Notification fiable

> **Fil narratif : Équipe 7 / Naruto :** Kakashi ne lance pas l’équipe dans le brouillard sans objectif ni plan de sortie. Ici, la mission commence par une hypothèse vérifiable, pas par un clavier en surchauffe.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 52-c_abort_controller_minimini_projet » :** Intègre cette notion au traitement asynchrone des notifications Kintana. Simule au moins un timeout, un retry et un événement reçu deux fois ; conserve une clé stable pour empêcher un double effet.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Le système ne perd pas silencieusement l’événement ; il ne double pas l’effet ; le délai et le nombre de tentatives sont observables. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
