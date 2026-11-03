---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [decision_inversee, fausse_piste]
anti_recipe_key: decision_inversee+fausse_piste
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : Promise.race, allsettled, any : quand plusieurs opérations s'affrontent

> **SCÈNE CRAZYDEVS : Kamehameha à charge :** la puissance n'arrive pas “quand tu as appelé la fonction”, elle arrive quand le runtime décide que la file peut avancer. Ici, le vrai boss est le timing, pas la syntaxe.

## TYPE

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

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Une requête trop lente peut retarder une partie de l'interface. `Promise.race` permet de définir une limite de temps pour décider quand abandonner l'attente côté application.

## OBJECTIF

Ton application n'attend plus indéfiniment la réponse GitHub.

## APPLICATION

- Écris un helper `withTimeout(promise, ms)` basé sur `Promise.race`.
- Applique-le à ton fetch GitHub avec 2 secondes.
- Vérifie que la page s'affiche même si l'API ne répond pas (simule avec une URL injoignable).

## Critère de réussite

- [ ] Écris un helper `withTimeout(promise, ms)` basé sur `Promise.race`.
- [ ] Applique-le à ton fetch GitHub avec 2 secondes.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Que devient la promesse perdante de la course, et pourquoi est-ce important de le savoir ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton application n'attend plus indéfiniment la réponse GitHub.

Attention : `Promise.race` n'annule pas la requête réseau : la requête perdante continue en arrière-plan. L'annulation réelle viendra avec `AbortController` (voir `02c_abort_controller`) : `Promise.race` → timeout logique → `AbortController` → annulation réelle. Commit `withTimeout`.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.

## Livraison produit obligatoire : Kintana : Notification fiable

> **Fil narratif : Équipe 7 / Naruto :** Kakashi ne lance pas l’équipe dans le brouillard sans objectif ni plan de sortie. Ici, la mission commence par une hypothèse vérifiable, pas par un clavier en surchauffe.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 50-promise_race_minimini_projet » :** Dans Kintana, traite une notification ou un événement soumis à délai, doublon et panne. Définis la politique de reprise et prouve qu’un rejeu ne double pas l’effet.

Intègre cette notion au traitement asynchrone des notifications Kintana. Simule au moins un timeout, un retry et un événement reçu deux fois ; conserve une clé stable pour empêcher un double effet.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Le système ne perd pas silencieusement l’événement ; il ne double pas l’effet ; le délai et le nombre de tentatives sont observables. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
