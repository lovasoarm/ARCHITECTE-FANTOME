---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [changement_contexte, temps_limite]
anti_recipe_key: changement_contexte+temps_limite
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : MICROTASK MADNESS

> **SCÈNE CRAZYDEVS : Kamehameha à charge :** la puissance n'arrive pas “quand tu as appelé la fonction”, elle arrive quand le runtime décide que la file peut avancer. Ici, le vrai boss est le timing, pas la syntaxe.

## TYPE

<!-- AF-DIAGRAM:event_loop -->

```text
┌──────────────┐
│ Call Stack   │
└──────┬───────┘
       │ libère
       ▼
┌──────────────┐
│ Microtasks   │
└──────┬───────┘
       │ vide
       ▼
┌──────────────┐
│ Tasks/Timers │
└──────┬───────┘
       │
       └──────────────► Call Stack
```

L’Event Loop reprend le travail lorsque la pile est libérée, en drainant d’abord les microtasks avant les tâches suivantes.

<!-- AF-DIAGRAM:microtasks -->

```text
        ┌──────────────┐
        │ Call Stack   │
        └──────┬───────┘
               ▼
        ┌──────────────┐
        │ Microtasks   │◄──── Promise.then / queueMicrotask
        └──────┬───────┘
               ▼
        ┌──────────────┐
        │ Task Queue   │◄──── timers / IO
        └──────────────┘
```

Les microtasks sont traitées avant de passer à la prochaine task.

Micro-drill

## Niveau

[OK] Avancé

## CONTEXTE

Microtâches avant macrotâches : c'est ce qui explique l'ordre exact des mises à jour et certains scintillements d'interface.

## APPLICATION

- Écris dans un handler de clic un `console.log` synchrone, un `Promise.resolve().then(...)` et un `setTimeout(..., 0)`.
- Prédis l'ordre AVANT d'exécuter, puis compare.
- Note l'écart éventuel entre ta prédiction et la réalité.

## Critère de réussite

- [ ] Écris dans un handler de clic un `console.log` synchrone, un `Promise.resolve().then(...)` et un `setTimeout(..., 0)`.
- [ ] Prédis l'ordre AVANT d'exécuter, puis compare.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi un `setTimeout(fn, 0)` s'exécute-t-il après une promesse déjà résolue ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tu prédis l'ordre d'exécution.

Tu peux maintenant raisonner sur les timings d'animation du splash sans deviner.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.

## Livraison produit obligatoire : Kintana : Notification fiable

> **Fil narratif : Équipe 7 / Naruto :** Kakashi ne lance pas l’équipe dans le brouillard sans objectif ni plan de sortie. Ici, la mission commence par une hypothèse vérifiable, pas par un clavier en surchauffe.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 50-microtask_madness_minimini_projet » :** Intègre cette notion au traitement asynchrone des notifications Kintana. Simule au moins un timeout, un retry et un événement reçu deux fois ; conserve une clé stable pour empêcher un double effet.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Le système ne perd pas silencieusement l’événement ; il ne double pas l’effet ; le délai et le nombre de tentatives sont observables. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
