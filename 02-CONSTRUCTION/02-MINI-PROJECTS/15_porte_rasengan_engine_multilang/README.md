---
stability: intemporel
acte: comprendre
---

Temps de lecture ~2 min

[PORTFOLIO]

# 15 : PORTAGE RASENGAN ENGINE (JS → Python OU Go)

## Ordre de lecture

Lis ce dossier dans cet ordre : `README.md` → `00-CAHIER-DES-CHARGES.md` → `01-RULES.md` → `02-TDD-JOURNAL.md` → `03-SECURITY.md` → `04-SECURITY-GATE.md` → `05-SPEC-DRIFT-TRIGGERS.md` → `06-SPEC-DRIFT-DRILL.md` → travail dans `src/` et `tests/` → `08-POSTMORTEM.md` → ADRs réellement produits. Les dossiers `ADR/`, `src/` et `tests/` sont des espaces de production, pas des lectures préalables.


> **Route CORE 16 semaines :** ce projet conserve son contenu complet. Pour le sprint intensif, consulte [la carte CORE](../../../06-ANNEXES-TRANSVERSES/25-CORE-MINI-PROJECT-MAP.md) pour le slice recommandé. Le passage CORE ajoute une perturbation, un transfert et un rappel à froid ; voir [Engine d’ambiguïté](../../../06-ANNEXES-TRANSVERSES/20-ENGINE-AMBIGUITE.md).


-> ~20 h

## PITCH 3 LIGNES

Tu prends ton propre `01_rasengan_engine`, tu le portes dans un autre langage, et tu écris l'ADR qui compare les deux versions. Si t'as vraiment compris le JS, tu prouves ici que la compétence n'est pas la syntaxe : c'est la pensée.

> **Différence avec `01_rasengan_engine` et `17_polyglot_forge`** : 01 crée le
> moteur en JS (conception). 15 **transfère la même conception** vers un autre
> langage et compare les deux écosystèmes dans un ADR. 17 ne transfère pas une
> fonctionnalité mais un **modèle mental** (l'event loop), et se juge sur une
> parité de trace stricte, pas sur un verdict argumenté.

## MISSION

1. Choisis Python OU Go (pas les deux au premier jet).
2. Reproduis 100% des fonctionnalités du Rasengan Engine original.
3. Reproduis 100% des tests (adapte le framework, garde les cas).
4. Écris `ADR-COMPARAISON.md` : concurrency model, gestion d'erreurs, écosystème de dépendances, dev experience. Verdict argumenté, pas juste des "j'aime bien".

## LIVRABLES

- Code source dans le langage choisi.
- Tests qui passent (`pytest` ou `go test`).
- `ADR-COMPARAISON.md` (2 pages max).
- `08-POSTMORTEM.md` : ce qui a été plus DUR qu'en JS, ce qui a été plus SIMPLE.
- Dépôt public + lien dans le `09-DEPENDENCY_LEDGER.md`.

## CE QUE LE DÉFI CACHE

Tu vas croire que "traduire ligne à ligne" suffit. Tu vas te planter. Les idiomes changent : un `for..of` JS n'est pas un `for range` Go. Un `async/await` JS n'est pas un `asyncio` Python. Refactor pour l'idiome, pas la traduction littérale.

## AUTO-ÉVAL

- [ ] Toutes les features portées
- [ ] Tous les tests verts dans le nouveau langage
- [ ] ADR lue et validée par un pair
- [ ] Publié GitHub

## THÈME NEUTRE (optionnel)

Si les références Naruto/DBZ ne te parlent pas, remplace mentalement par un domaine que tu connais (foot, cuisine, musique). Le concept technique reste identique.

---

## REPRODUCTIBILITÉ

Le dépôt pédagogique ne fournit ni `node_modules/` ni lockfile de ton futur dépôt apprenant. Si le projet utilise des dépendances npm, ton dépôt apprenant doit versionner `package.json` et `package-lock.json`, puis utiliser `npm ci` en CI pour installer exactement cet arbre. Si le projet est sans dépendances, consigne simplement la version de runtime et la commande de test réellement utilisée. La preuve de reproductibilité est la commande et la version relevées dans ton propre dépôt, pas une valeur inventée dans le curriculum.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [06-SPEC-DRIFT-DRILL.md : spec drift **en cours de projet** (mouvant)](06-SPEC-DRIFT-DRILL.md)
- [`ADR/`](ADR/README.md)
- [Postmortem : portage rasengan engine](08-POSTMORTEM.md)
- [RULES : 15_porte_rasengan_engine_multilang](01-RULES.md)
- [SECURITY : 15_porte_rasengan_engine_multilang](03-SECURITY.md)
- [Security Gate : 15_porte_rasengan_engine_multilang](04-SECURITY-GATE.md)
- [SPEC DRIFT TRIGGERS : 15_porte_rasengan_engine_multilang](05-SPEC-DRIFT-TRIGGERS.md)
- [TDD journal : portage rasengan engine](02-TDD-JOURNAL.md)
- [Cahier des charges : portage rasengan engine](00-CAHIER-DES-CHARGES.md)
- [`src/`](src/README.md)
- [`tests/`](tests/README.md)

<!-- CONTENU-DOSSIER:fin -->
