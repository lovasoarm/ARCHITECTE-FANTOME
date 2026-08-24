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
