---
stability: intemporel
acte: comprendre
---

[PORTFOLIO]

# 11 : SCHEDULER (obligatoire, pas optionnel)

<!-- AF-DIAGRAM:scheduler -->

```text
┌─────────────┐
│ tâches      │
└──────┬──────┘
       ▼
┌─────────────┐
│ queue       │
└──────┬──────┘
       ▼
┌──────┴──────┐
│ worker pool │
└──────┬──────┘
       ▼
┌─────────────┐
│ résultats   │
└─────────────┘
```

Le scheduler transforme un flux de tâches en travail ordonnancé par une capacité d’exécution limitée.

## Prérequis pédagogiques : gate d’entrée

Ce projet est un approfondissement, pas une première découverte de l’asynchrone. Avant de commencer l’implémentation, vérifie que tu maîtrises les points suivants :

| Compétence attendue                                             | Leçons à avoir terminées                                                                                                                   | Vérification d’entrée                                                                                                                    |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Fonctions, tableaux, modules ES et imports/exports JavaScript   | [Fonctions](../../../00-SOCLE/04-FUNDAMENTALS/03_functions/README.md) et [Modules](../../../00-SOCLE/04-FUNDAMENTALS/06_modules/README.md) | Tu peux découper une fonction, parcourir un tableau et importer/exporter une fonction sans recopier un exemple.                          |
| Promises, callbacks, `async`/`await` et propagation des erreurs | [Noyau Async obligatoire](../../../01-CADRAGE/02-ASYNC/README.md)                                                                          | Tu peux expliquer les états d’une Promise, attendre plusieurs opérations et décrire ce qui se passe lorsqu’une Promise rejette.          |
| Ordre d’exécution : pile, microtasks et tasks                   | [Sous-module Event Loop](../../../01-CADRAGE/02-ASYNC/04_event_loop/README.md)                                                             | Tu peux prédire et justifier l’ordre d’un exemple qui mélange code synchrone, `queueMicrotask` et tâche différée.                        |
| Annulation coopérative avec `AbortController` / `AbortSignal`   | [Leçon AbortController](../../../01-CADRAGE/02-ASYNC/03_async_await/05-c_abort_controller.md)                                              | Tu sais qu’un signal demande l’annulation aux opérations qui l’écoutent ; il ne peut pas tuer de force un mapper qui l’ignore.           |
| Assertions et lecture de tests                                  | [Module Testing](../../../02-CONSTRUCTION/03-TESTING/README.md)                                                                            | Tu sais lire une assertion, comprendre un échec et lancer une commande de test. Le projet utilise le runner natif `node:test`, pas Jest. |

**Décision d’entrée :** si un seul de ces points est flou, retourne à la leçon indiquée et refais son exercice avant d’ouvrir `src/`. Tu n’as pas besoin d’avoir déjà construit un scheduler ou de maîtriser la concurrence avancée : ce sont précisément les compétences que ce projet te fera travailler.

Le parcours Async de la Route 58 précède ce projet. Les approfondissements Async marqués « différés » ne sont pas des prérequis supplémentaires, sauf s’ils sont explicitement cités dans la table ci-dessus.

## Ordre de lecture

Lis ce dossier dans cet ordre : `README.md` → `00-CAHIER-DES-CHARGES.md` → `01-RULES.md` → `02-TDD-JOURNAL.md` → `03-SECURITY.md` → `04-SECURITY-GATE.md` → `05-SPEC-DRIFT-TRIGGERS.md` → `06-SPEC-DRIFT-DRILL.md` → travail dans `src/` et `tests/` → `08-POSTMORTEM.md` → ADRs réellement produits. Les dossiers `ADR/`, `src/` et `tests/` sont des espaces de production, pas des lectures préalables.

> **Route CORE 16 semaines :** ce projet conserve son contenu complet. Pour le sprint intensif, consulte [la carte CORE](../../../06-ANNEXES-TRANSVERSES/25-CORE-MINI-PROJECT-MAP.md) pour le slice recommandé. Le passage CORE ajoute une perturbation, un transfert et un rappel à froid ; voir [Engine d’ambiguïté](../../../06-ANNEXES-TRANSVERSES/20-ENGINE-AMBIGUITE.md).

-> ~5 min

Implémente ton propre event loop miniature, puis un `pMap` avec limite de concurrence et annulation.

## Pitch 3 lignes

Ce projet prouve que je comprends la différence microtask/macrotask, que je sais borner la concurrence, et que je gère l'AbortController comme un adulte. Base pour toute discussion async en entretien.

## Livrables

### 1. `mini-loop.js`

- File de microtasks, file de macrotasks.
- Priorité : tout drainer la microtask queue avant chaque macrotask.
- API : `enqueueMicro(fn)`, `enqueueMacro(fn)`, `run()`.

### 2. `pMap.js`

```text
pMap(items, mapper, { concurrency: 5, signal: AbortController.signal })
```

- Lance max N mappers en parallèle.
- Si `signal.aborted` → rejette immédiatement, annule les in-flight (si possible).
- Ordre de sortie préservé.

### 3. Tests

- Ordre d'exécution micro/macro conforme au spec.
- `pMap` avec `concurrency=1` = série stricte.
- Annulation propre : pas de fuite de timer.

## Critères d'acceptation

- Aucun `setTimeout(fn, 0)` pour "hack" une microtask. Utilise `queueMicrotask`.
- `pMap` mesure ≤ (N / concurrency) \* temps_unitaire à ±10 %.
- Empreinte carbone : justifie ton choix de concurrence par défaut (10 vs 100).

## Piège

Rejeter tôt sans annuler les in-flight = fuite. Pense au cleanup.

## THÈME NEUTRE (optionnel)

Si les références Naruto/DBZ ne te parlent pas, remplace mentalement par un domaine que tu connais (foot, cuisine, musique). Le concept technique reste identique.

---

## REPRODUCTIBILITÉ

Le dépôt pédagogique ne fournit ni `node_modules/` ni lockfile de ton futur dépôt apprenant. Si le projet utilise des dépendances npm, ton dépôt apprenant doit versionner `package.json` et `package-lock.json`, puis utiliser `npm ci` en CI pour installer exactement cet arbre. Si le projet est sans dépendances, consigne simplement la version de runtime et la commande de test réellement utilisée. La preuve de reproductibilité est la commande et la version relevées dans ton propre dépôt, pas une valeur inventée dans le curriculum.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [06-SPEC-DRIFT-DRILL.md : spec drift **en cours de projet** (mouvant)](06-SPEC-DRIFT-DRILL.md)
- [`ADR/`](ADR/README.md)
- [Postmortem : scheduler](08-POSTMORTEM.md)
- [RULES : 11_scheduler](01-RULES.md)
- [SECURITY : 11_scheduler](03-SECURITY.md)
- [Security Gate : 11_scheduler](04-SECURITY-GATE.md)
- [SPEC DRIFT TRIGGERS : 11_scheduler](05-SPEC-DRIFT-TRIGGERS.md)
- [TDD journal : scheduler](02-TDD-JOURNAL.md)
- [Cahier des charges : scheduler](00-CAHIER-DES-CHARGES.md)
- [`src/`](src/README.md)
- [`tests/`](tests/README.md)

<!-- CONTENU-DOSSIER:fin -->

---

## État des tests et point de départ (référence AF)

Consulte aussi le [standard commun des mini-projets](../00A-FIELD-PRACTICE-STANDARD.md). Les catégories ci-dessous décrivent **l'état réel de ce ZIP**, pas un résultat de tests supposé.

### État initial, tests et validation

- **Code métier fourni :** aucun. `src/` ne contient qu'un README ; `src/pmap.js` et `src/loop.js` sont à créer.
- **Tests de référence verts :** aucun.
- **Échec initial attendu :** `tests/pmap.test.js` et `tests/loop.test.js` importent ces modules absents. L'échec initial sur import manquant est volontaire ; la suite n'est pas verte à réception.
- **Prérequis :** Node.js 22.x ; les tests utilisent `node:test` et les modules ES. Dans le dépôt de travail, crée un `package.json` avec `"type": "module"` ou documente une configuration équivalente réellement validée.
- **Tests à créer/compléter :** concurrence 0/1/>N, ordre des résultats, rejet et erreur d'un worker, annulation avant lancement et en cours, nettoyage, famine éventuelle, files micro/macro, starvation et risque de boucle infinie de microtasks. Ajoute les cas limites du cahier des charges.
- **Ordre de construction :** définir les contrats et invariants de `pMap` et `Loop`, écrire les tests, créer `src/pmap.js` et `src/loop.js`, puis documenter les limites d'annulation et d'ordonnancement.
- **Validation finale :** après création du manifeste et des modules, exécuter `node --test tests/*.test.js` depuis le dossier du projet et consigner la version de Node.
- **Preuve attendue :** invariants écrits, traces d'ordonnancement reproductibles, mesure de la concurrence maximale et comportement d'annulation explicitement limité. Un `AbortSignal` ne peut pas arrêter de force une tâche qui ignore le signal.

## Ressources pratiques associées

- [Préparer l'activité (`SETUP.md`)](SETUP.md) : environnement, prérequis et commandes.
- [Référence technique différée](reference/README.md) : à consulter après la tentative, sans recopier dans le livrable.
