---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [regression, fausse_piste]
anti_recipe_key: regression+fausse_piste
transfer_distance: low
assessment_role: instructional_checkpoint
---

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

Micro-drill

## Niveau

[OK] Avancé

## Prérequis

- Connaître `useEffect`

## CONTEXTE

Les timers et les callbacks d'animation sont planifiés par le navigateur selon des mécanismes différents. Comprendre leur cycle d'exécution aide à éviter les animations et timers mal nettoyés. Le défilement automatique des rangées et le splash « ta-dum » en dépendent : et fuient si on oublie le nettoyage.

## APPLICATION

- Ajoute un défilement automatique de rangée avec un `setInterval` dans un `useEffect`.
- Retourne la fonction de nettoyage qui l'arrête.
- Navigue vers une autre page et reviens plusieurs fois : vérifie dans les logs qu'il n'y a qu'un seul intervalle actif.
- Remplace le timer d'animation par `requestAnimationFrame` et compare la fluidité.

## Critère de réussite

- [ ] Ajoute un défilement automatique de rangée avec un `setInterval` dans un `useEffect`.
- [ ] Retourne la fonction de nettoyage qui l'arrête.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Que se passe-t-il concrètement si tu oublies le nettoyage du `useEffect` ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton auto-scroll libère son timer au démontage dans ce scénario.

Une animation signature qui ne dégrade pas le site au fil de la navigation. Commit.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.
