---
stability: intemporel
last_reviewed: 2026-08
depends_on_vendor: false
acte: comprendre
---

> **SCÈNE CRAZYDEVS : Kamehameha à charge :** la puissance n'arrive pas “quand tu as appelé la fonction”, elle arrive quand le runtime décide que la file peut avancer. Ici, le vrai boss est le timing, pas la syntaxe.

# PONT : de l'async au debugging

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

Temps de lecture ~2 min

-> ~10 min

> **ARRÊTE-TOI ICI.** Ce fichier est un point de passage obligé entre `01-CADRAGE/02-ASYNC` et `01-CADRAGE/03-DEBUGGING`, le module immédiatement suivant dans le fil. Ne l'ouvre pas comme "encore un chapitre" : c'est un palier de respiration avant un saut de nature.

## POURQUOI CE PONT EXISTE

Tu sais maintenant que `await` suspend une fonction sans bloquer le thread. Le module `01-CADRAGE/03-DEBUGGING` va te demander de **retrouver la cause d'un comportement que tu n'as pas vu se produire**. Or la majorité des bugs difficiles sont asynchrones : deux requêtes qui se croisent, un état lu avant d'être écrit, un timer qui tire une fois de trop. Sans ton modèle de l'event loop, tu debuggeras au hasard.

## CE QUE TU MAÎTRISES DÉJÀ

- Ordonner microtâches et macrotâches dans un exemple simple.
- Écrire, chaîner et attendre une `Promise`.
- Distinguer "lent" de "non déterministe".

## VOCABULAIRE NOUVEAU QUI ARRIVE

- **Reproduction** : la suite d'actions qui déclenche le bug à coup sûr.
- **Hypothèse** : une cause candidate, écrite avant d'ouvrir le code.
- **Critère binaire** : l'observation qui tranche vrai/faux, sans discussion.
- **Bug flaky** : un bug non déterministe, donc une hypothèse fausse sur le temps.

## DRILL DE VÉRIFICATION (3 questions)

1. Une requête `POST` part deux fois : cite deux causes asynchrones possibles.
2. Un test échoue 1 fois sur 20 : pourquoi "relancer" est-il une non-réponse ?
3. Écris l'hypothèse et le critère binaire pour "l'affichage montre l'ancienne valeur après sauvegarde".

Si tu ne peux pas répondre aux 3 sans hésiter : relis `01-CADRAGE/02-ASYNC/` avant d'ouvrir `01-CADRAGE/03-DEBUGGING/`.

## SI TU BLOQUES

Relis le module précédent avant de continuer. Ce pont existe précisément parce que sauter cette marche brise 80% des apprenants sur le module suivant. Aucune honte à revenir.
