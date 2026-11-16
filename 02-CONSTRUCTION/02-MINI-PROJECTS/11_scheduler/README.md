---
stability: intemporel
acte: comprendre
---

[PORTFOLIO]

# 11 : SCHEDULER : approfondissement async

<!-- AF-DIAGRAM:scheduler -->

```text
┌─────────────┐
│ tâches      │
└──────┬──────┘
       ▼
┌─────────────┐
│ files       │
└──────┬──────┘
       ▼
┌─────────────┐
│ exécution   │
└──────┬──────┘
       ▼
┌─────────────┐
│ résultats   │
└─────────────┘
```

Le mini-projet relie deux mécanismes : l'ordre des tâches dans une boucle d'événements simplifiée et l'exécution d'un tableau de travaux avec une concurrence bornée.

## Prérequis pédagogiques : gate d'entrée

Ce projet est un approfondissement, pas une première découverte de l'asynchrone. Avant de commencer l'implémentation, vérifie que tu maîtrises les points suivants :

| Compétence attendue                                             | Leçons à avoir terminées                                                                                                                   | Vérification d'entrée                                                                                                           |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| Fonctions, tableaux, modules ES et imports/exports JavaScript   | [Fonctions](../../../00-SOCLE/04-FUNDAMENTALS/03_functions/README.md) et [Modules](../../../00-SOCLE/04-FUNDAMENTALS/06_modules/README.md) | Tu peux découper une fonction, parcourir un tableau et importer/exporter une fonction sans recopier un exemple.                 |
| Promises, callbacks, `async`/`await` et propagation des erreurs | [Noyau Async obligatoire](../../../01-CADRAGE/02-ASYNC/README.md)                                                                          | Tu peux expliquer les états d'une Promise, attendre plusieurs opérations et décrire ce qui se passe lorsqu'une Promise rejette. |
| Ordre d'exécution : pile, microtasks et tasks                   | [Sous-module Event Loop](../../../01-CADRAGE/02-ASYNC/04_event_loop/README.md)                                                             | Tu peux prédire et justifier l'ordre d'un exemple qui mélange code synchrone, `queueMicrotask` et tâche différée.               |
| Annulation coopérative avec `AbortController` / `AbortSignal`   | [Leçon AbortController](../../../01-CADRAGE/02-ASYNC/03_async_await/05-c_abort_controller.md)                                              | Tu sais qu'un signal demande l'annulation aux opérations qui l'écoutent ; il ne peut pas tuer de force un mapper qui l'ignore.  |
| Assertions et lecture de tests                                  | [Module Testing](../../../02-CONSTRUCTION/03-TESTING/README.md)                                                                            | Tu sais lire une assertion, comprendre un échec et lancer `node:test`.                                                          |

**Décision d'entrée :** si un seul de ces points est flou, retourne à la leçon indiquée et refais son exercice avant d'ouvrir `src/`. Tu n'as pas besoin d'avoir déjà construit une boucle ou un `pMap` : ce sont précisément les compétences que ce projet te fera travailler.

La route Async obligatoire précède ce projet. Les approfondissements Async marqués « différés » ne sont pas des prérequis supplémentaires, sauf s'ils sont explicitement cités dans la table ci-dessus.

## Ordre de lecture

Lis ce dossier dans cet ordre : `README.md` → `00-CAHIER-DES-CHARGES.md` → `01-RULES.md` → `02-TDD-JOURNAL.md` → `03-SECURITY.md` → `04-SECURITY-GATE.md` → `05-SPEC-DRIFT-TRIGGERS.md` → `06-SPEC-DRIFT-DRILL.md` → travail dans `src/` et `tests/` → `08-POSTMORTEM.md` → ADR réellement produits. Les dossiers `ADR/`, `src/` et `tests/` sont des espaces de production, pas des lectures préalables. `03-SECURITY.md` est le modèle AF : après lecture, copie-le vers `SECURITY.md` dans le dépôt apprenant et complète uniquement ce dernier.

> **Route CORE 16 semaines :** ce projet conserve son contenu complet. Pour le sprint intensif, consulte [la carte CORE](../../../06-ANNEXES-TRANSVERSES/25-CORE-MINI-PROJECT-MAP.md) pour le slice recommandé. Le passage CORE ajoute une perturbation, un transfert et un rappel à froid ; voir [Engine d'ambiguïté](../../../06-ANNEXES-TRANSVERSES/20-ENGINE-AMBIGUITE.md).

Temps de lecture : environ 5 minutes.

## Objectif

Construis une boucle d'événements pédagogique et une fonction `pMap`. Le but est d'expliciter les files, l'ordre d'exécution, la borne de concurrence et les limites réelles de l'annulation coopérative. Ce modèle miniature ne remplace pas l'event loop du moteur JavaScript.

## Livrables et contrat d'interface

Les chemins et noms d'API ci-dessous sont ceux utilisés par les tests fournis. Ne les renomme pas sans modifier simultanément le contrat, les tests et la justification correspondante.

### 1. `src/loop.js`

Le module exporte une classe nommée `Loop` :

```js
import { Loop } from "./src/loop.js";

const loop = new Loop();
loop.queueMacro(() => console.log("macro"));
loop.queueMicro(() => console.log("micro"));
await loop.drain();
```

Contrat :

- `queueMicro(fn)` ajoute une fonction à la file micro, en FIFO.
- `queueMacro(fn)` ajoute une fonction à la file macro, en FIFO.
- `drain()` exécute une macro, puis vide complètement la file micro avant de passer à la macro suivante.
- Les microtasks ajoutées pendant le drainage de cette file sont également exécutées avant la macro suivante.
- Si aucune macro ne reste mais que des microtasks attendent, elles sont drainées avant la résolution de `drain()`.
- Les callbacks doivent être des fonctions. Une erreur de callback est propagée ; elle ne doit pas être silencieusement ignorée. Les tâches non exécutées restent en file et pourront être reprises lors d’un nouvel appel à `drain()`.

Ce modèle rend visible la règle « une macro, puis drainage des microtasks ». Il ne simule ni le rendu navigateur, ni les phases internes complètes de Node.js.

### 2. `src/pmap.js`

Le module exporte une fonction nommée `pMap` :

```js
import { pMap } from "./src/pmap.js";

const results = await pMap(items, mapper, {
  concurrency: 5,
  signal: controller.signal,
});
```

Contrat :

- `items` est un tableau ; `mapper` est une fonction appelée avec `(item, index, signal)`.
- `concurrency` est un entier entre `1` et `100` inclus ; sa valeur par défaut est `5`.
- Au plus `concurrency` mappers peuvent être actifs simultanément.
- Le tableau résultat conserve l'ordre des entrées, même si les mappers terminent dans un autre ordre.
- Un tableau vide produit `[]`.
- Une erreur de mapper est propagée et aucun nouvel élément n'est lancé après cette erreur. Les mappers déjà actifs ne peuvent pas être arrêtés de force.
- Si le signal est déjà annulé, aucun mapper ne démarre. S'il est annulé pendant l'exécution, aucun nouveau mapper ne démarre et `pMap` rejette avec une erreur d'annulation.
- Le signal est aussi transmis au mapper : un mapper peut l'écouter pour arrêter son propre travail. `AbortSignal` ne tue pas un callback qui l'ignore.

### 3. Tests

Les tests de contrat sont dans `tests/loop.test.js` et `tests/pmap.test.js`. Ils vérifient notamment l'ordre, le drainage des microtasks, la concurrence maximale, l'ordre des résultats, les entrées invalides, les erreurs et les deux moments d'annulation.

## Ressources et limites

- N'utilise pas `setTimeout(fn, 0)` pour faire passer une task pour une microtask dans ton modèle. Les deux files de `Loop` sont des files explicites que tu dois gérer.
- Justifie le défaut `concurrency = 5` et le plafond `100` par les propriétés du problème et des mesures reproductibles. Ne présente pas une comparaison pédagogique comme une mesure d'empreinte carbone.
- Le test de timing ne constitue pas une preuve universelle de performance : documente le scénario, les répétitions et les limites si tu mesures un débit.

## État des tests à réception

`src/` ne contient volontairement pas `loop.js` ni `pmap.js` : ce sont les livrables de l'apprenant. Les tests qui les importent sont donc **rouges à l'état vierge par conception**. Ce n'est pas un test de release vert. Une fois les deux modules implémentés, lance :

```bash
npm test
```

Le manifeste `package.json` du projet active explicitement les modules ES et ne déclare aucune dépendance externe. Runtime cible : Node.js `22.23.4` (voir le `.nvmrc` à la racine du dépôt). Si cette version n'est pas disponible, note la version réellement utilisée et ne prétends pas avoir validé le runtime cible.

## Critères d'acceptation

- [ ] Toutes les assertions fournies passent sans être supprimées ni affaiblies.
- [ ] Les cas limites explicitement listés dans le cahier des charges sont ajoutés et testés.
- [ ] La borne de concurrence est respectée, y compris lorsque les tâches échouent ou sont annulées.
- [ ] La sémantique de l'annulation et les limites des tâches déjà actives sont documentées.
- [ ] Le gate de sécurité contextuel est rempli avec des preuves réelles.
- [ ] Trois ADR distincts sont produits à partir de décisions réellement prises.
- [ ] Le journal TDD et le postmortem décrivent les événements observés, pas des résultats imaginés.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [06-SPEC-DRIFT-DRILL.md : changements de spécification en cours de projet](06-SPEC-DRIFT-DRILL.md)
- [`ADR/`](ADR/README.md)
- [Postmortem : scheduler](08-POSTMORTEM.md)
- [RULES : 11_scheduler](01-RULES.md)
- [Modèle de préparation sécurité (à copier vers SECURITY.md)](03-SECURITY.md)
- [Security Gate : 11_scheduler](04-SECURITY-GATE.md)
- [SPEC DRIFT TRIGGERS : 11_scheduler](05-SPEC-DRIFT-TRIGGERS.md)
- [TDD journal : scheduler](02-TDD-JOURNAL.md)
- [Cahier des charges : scheduler](00-CAHIER-DES-CHARGES.md)
- [`src/`](src/README.md)
- [`tests/`](tests/README.md)
- [Laboratoire complémentaire de validation des entrées](reference/README.md)

<!-- CONTENU-DOSSIER:fin -->
