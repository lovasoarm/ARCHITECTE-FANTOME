---
stability: evolutif
acte: parcours
noyau: oui
route: survie
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "01-CADRAGE/02-ASYNC/01A-00-why-async.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 01-CADRAGE/02-ASYNC/01A-00-why-async.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# MODULE 02 ASYNC

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

> Palier `01-CADRAGE`. Le tableau ci-dessous contient **10 ressources de référence** dont les durées repères totalisent **6 h 05** (7 × 45 min + 20 min + 2 × 15 min). Ce total ne représente pas la durée globale du module : les quatre sous-parcours pratiques obligatoires et leurs mini-projets n'ont pas tous une durée estimée. Aucune durée totale fictive n'est annoncée.

## Ressources de référence à la racine

| Ressource                                                                        | Durée repère |
| -------------------------------------------------------------------------------- | -----------: |
| [`02A-mental_model_js.md`](02A-mental_model_js.md)                               |       45 min |
| [`50-mental_model_js_minimini_projet.md`](50-mental_model_js_minimini_projet.md) |       45 min |
| [`00-PREREQUIS.md`](00-PREREQUIS.md)                                             |       15 min |
| [`01A-00-why-async.md`](01A-00-why-async.md)                                     |       45 min |
| [`06-event_loop_drill_5ans.md`](06-event_loop_drill_5ans.md)                     |       45 min |
| [EXO LECTURE : ~20 minutes : un cycle (Asynchrone)](07-EXO_LECTURE.md)           |       20 min |
| [`98-EXO-VERIFICATION.md`](98-EXO-VERIFICATION.md)                               |       45 min |
| [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md)                               |       15 min |
| [`08-EXO_MICROTASK_A_LA_MAIN.md`](08-EXO_MICROTASK_A_LA_MAIN.md)                 |       45 min |
| [`99A-PONT.md`](99A-PONT.md)                                                     |       45 min |

Les 6 h 05 sont le total arithmétique des dix durées affichées dans ce tableau seulement. Elles ne comprennent pas le travail des sous-parcours ci-dessous ni l'évaluation globale de 1 h 30.

## Parcours obligatoire : à suivre dans cet ordre

| Ordre | Ressource                                                                                                                                                                                                                                                                        | Travail attendu                                                             |
| ----: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
|     1 | [`00-PREREQUIS.md`](00-PREREQUIS.md)                                                                                                                                                                                                                                             | Vérifier Problem Solving. L'asynchrone lui-même n'est pas exigé à l'entrée. |
|     2 | [`01A-00-why-async.md`](01A-00-why-async.md)                                                                                                                                                                                                                                     | Comprendre le problème que résout l'asynchrone.                             |
|     3 | [`02A-mental_model_js.md`](02A-mental_model_js.md), puis [`50-mental_model_js_minimini_projet.md`](50-mental_model_js_minimini_projet.md)                                                                                                                                        | Construire le premier modèle mental et produire l'artefact guidé.           |
|     4 | [`01_callbacks/`](01_callbacks/README.md)                                                                                                                                                                                                                                        | Callback, ordre d'exécution, erreurs et mini-projet.                        |
|     5 | [`02_promises/`](02_promises/README.md)                                                                                                                                                                                                                                          | États, chaînage et combinaison des Promises.                                |
|     6 | [`03_async_await/`](03_async_await/README.md)                                                                                                                                                                                                                                    | `async`, `await`, propagation et annulation de base.                        |
|     7 | [`04_event_loop/`](04_event_loop/README.md)                                                                                                                                                                                                                                      | Call stack, microtasks, tasks et ordre observable.                          |
|     8 | [`06-event_loop_drill_5ans.md`](06-event_loop_drill_5ans.md), [`07-EXO_LECTURE.md`](07-EXO_LECTURE.md), [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md), [`98-EXO-VERIFICATION.md`](98-EXO-VERIFICATION.md), [`08-EXO_MICROTASK_A_LA_MAIN.md`](08-EXO_MICROTASK_A_LA_MAIN.md) | Consolider, prédire, comparer et expliquer.                                 |
|     9 | [`95-challenge.md`](95-challenge.md), puis [`99A-PONT.md`](99A-PONT.md)                                                                                                                                                                                                          | Valider le module puis passer à Debugging.                                  |

Les quatre sous-parcours `01_callbacks`, `02_promises`, `03_async_await` et `04_event_loop` sont **obligatoires** : leurs leçons, mini-projets et challenges locaux sont réutilisés dans le challenge global. Leurs README portent donc `noyau: oui`. Ne saute pas ces dossiers sous prétexte qu'ils sont rangés en sous-modules.

## Approfondissements différés

Après validation du noyau, les ressources suivantes sont des approfondissements :

- [`03A-advanced_patterns.md`](03A-advanced_patterns.md) : AbortController, backpressure et mini-scheduler ;
- [`04A-backpressure.md`](04A-backpressure.md) : approfondissement des flux ;
- [`05-shared_memory_concurrency.md`](05-shared_memory_concurrency.md) : Workers, SharedArrayBuffer et Atomics ;
- [`99-PORTAGE-MENTAL.md`](99-PORTAGE-MENTAL.md) : transfert vers d'autres langages.

Ils ne bloquent pas la première progression d'un débutant absolu, sauf si une route ou un projet les cite explicitement comme prérequis. Le schéma Event Loop est un modèle d'apprentissage : pour prédire un ordre exact, tiens compte de l'hôte (navigateur ou Node.js).

## Comment travailler ce module

1. Lis la motivation et le modèle mental avant les API.
2. Passe le contrôle d'entrée : il vérifie Problem Solving, pas la maîtrise préalable de l'asynchrone.
3. Suis les quatre sous-parcours obligatoires dans l'ordre ; réalise leurs leçons, mini-projets et challenges locaux.
4. Fais les drills et exercices de consolidation.
5. Lis le grimoire **après** la pratique : c'est une fiche de rappel, pas un cours de remplacement.
6. Termine le challenge global et le pont vers Debugging.

## Ce que ce module produit dans ton depot fil rouge

Au moins un artefact date et verifiable. Si tu ne peux pas montrer de fichier a la sortie, le module
n est pas fait : relis la liste ci-dessus et rends l exercice manquant.

## Verification

- [ ] Tous les fichiers du tableau sont ouverts et leurs exercices rendus.
- [ ] L artefact produit est cite dans ton journal de progression (`PROGRESSION.md`).

<!-- PIECES-MODULE:debut -->

## Les pièces de ce module

- [`00-PREREQUIS.md`](00-PREREQUIS.md) : Auto-test d'entrée : à passer avant d'ouvrir le module
- [`95-challenge.md`](95-challenge.md) : Challenge : l'épreuve du module
- [`90-grimoire.md`](90-grimoire.md) : Grimoire : ce que tu dois pouvoir restituer

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- **Noyau obligatoire** : [modèle mental](02A-mental_model_js.md), [mini-projet modèle mental](50-mental_model_js_minimini_projet.md), [Callbacks](01_callbacks/README.md), [Promises](02_promises/README.md), [Async/Await](03_async_await/README.md), [Event Loop](04_event_loop/README.md).
- **Consolidation obligatoire** : [drill Event Loop](06-event_loop_drill_5ans.md), [lecture de code](07-EXO_LECTURE.md), [IA séduisante](98-EXO-VERIFICATION.md), [IA menteuse](97-EXO-VERIFICATION.md), [file de microtasks](08-EXO_MICROTASK_A_LA_MAIN.md), [challenge global](95-challenge.md), [pont vers Debugging](99A-PONT.md).
- **Approfondissements différés** : [patterns avancés](03A-advanced_patterns.md), [backpressure](04A-backpressure.md), [concurrence mémoire](05-shared_memory_concurrency.md), [portage vers d'autres langages](99-PORTAGE-MENTAL.md).
- **Référence après pratique** : [grimoire `02-ASYNC`](90-grimoire.md).

<!-- CONTENU-DOSSIER:fin -->

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Kintana est un cas d’étude pédagogique commun, pas un projet personnel imposé. Pour ce module, applique **la notion réellement enseignée ici** à la mission correspondante dans la [carte des missions Kintana par domaine](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). N’utilise pas automatiquement la FAQ IA : elle est réservée aux activités IA/RAG. Le challenge local de ce module reste la source de la consigne et de ses critères ; cette mise en pratique ne crée ni prérequis, ni gate supplémentaire.

## Ressources pratiques associées

- [Préparer l'activité (`SETUP.md`)](SETUP.md) : environnement, prérequis et commandes.

## Exercice de vérification

- [11 : Vérification Async](11_EXO_VERIFICATION.md) : contrôler les mécanismes async du module.
