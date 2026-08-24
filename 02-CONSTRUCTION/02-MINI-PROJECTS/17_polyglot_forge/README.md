---
stability: intemporel
acte: comprendre
---

# 17_polyglot_forge

## Ordre de lecture

Lis ce dossier dans cet ordre : `README.md` → `00-CAHIER-DES-CHARGES.md` → `01-RULES.md` → `02-TDD-JOURNAL.md` → `03-SECURITY.md` → `04-SECURITY-GATE.md` → `05-SPEC-DRIFT-TRIGGERS.md` → `06-SPEC-DRIFT-DRILL.md` → travail dans `src/` et `tests/` → `08-POSTMORTEM.md` → ADRs réellement produits. Les dossiers `ADR/`, `src/` et `tests/` sont des espaces de production, pas des lectures préalables.

> **Route CORE 16 semaines :** ce projet conserve son contenu complet. Pour le sprint intensif, consulte [la carte CORE](../../../06-ANNEXES-TRANSVERSES/25-CORE-MINI-PROJECT-MAP.md) pour le slice recommandé. Le passage CORE ajoute une perturbation, un transfert et un rappel à froid ; voir [Engine d’ambiguïté](../../../06-ANNEXES-TRANSVERSES/20-ENGINE-AMBIGUITE.md).

Temps de lecture ~2 min

Deuxième mini-projet cross-language de ce parcours. Prouve que ta modélisation de l'event loop **transfère** d'un langage à l'autre en produisant strictement la même trace pour la même entrée.

> **Différence avec `15_porte_rasengan_engine_multilang`** : en 15, tu portais
> des **fonctionnalités** que tu avais écrites, et la preuve était un ADR
> comparatif. Ici tu portes un **modèle d'exécution** que tu n'as pas écrit, et
> la preuve est mécanique : même entrée, même trace, sinon échec. Argumentation
> en 15, vérification binaire en 17.

- Lis `00-CAHIER-DES-CHARGES.md` pour l'objectif verrouillé et la grille scorée.
- Lis `ADR/ADR-001_decision.md` avant de coder.
- Remplis `02-TDD-JOURNAL.md` au fil de l'eau.
- Rédige `08-POSTMORTEM.md` à la fin, même si tu as réussi.

Lance :

```bash
bash tests/run_all.sh
```

Attendu : `POLYGLOT PARITY OK`.

## REPRODUCTIBILITÉ

Le dépôt pédagogique ne fournit ni `node_modules/` ni lockfile de ton futur dépôt apprenant. Si le projet utilise des dépendances npm, ton dépôt apprenant doit versionner `package.json` et `package-lock.json`, puis utiliser `npm ci` en CI pour installer exactement cet arbre. Si le projet est sans dépendances, consigne simplement la version de runtime et la commande de test réellement utilisée. La preuve de reproductibilité est la commande et la version relevées dans ton propre dépôt, pas une valeur inventée dans le curriculum.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [06-SPEC-DRIFT-DRILL.md : spec drift **en cours de projet** (mouvant)](06-SPEC-DRIFT-DRILL.md)
- [`ADR/`](ADR/README.md)
- [Postmortem](08-POSTMORTEM.md)
- [RULES : 17_polyglot_forge](01-RULES.md)
- [SECURITY : 17_polyglot_forge](03-SECURITY.md)
- [Security Gate : 17_polyglot_forge](04-SECURITY-GATE.md)
- [SPEC DRIFT TRIGGERS : 17_polyglot_forge](05-SPEC-DRIFT-TRIGGERS.md)
- [Tdd_journal](02-TDD-JOURNAL.md)
- [Cahier des charges : Polyglot Forge](00-CAHIER-DES-CHARGES.md)
- [`src/`](src/README.md)
- [`tests/`](tests/README.md)

<!-- CONTENU-DOSSIER:fin -->
