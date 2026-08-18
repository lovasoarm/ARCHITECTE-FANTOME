---
stability: intemporel
acte: restituer
---


Temps de lecture ~2 min

[PORTFOLIO]

# 15 : PORTAGE RASENGAN ENGINE (JS → Python OU Go)

> Mode de vérification des exercices de ce module : critère binaire du `verification_pack` ([verification_pack/criteres.md](verification_pack/criteres.md)). Aucun exercice de ce module n'est corrigé par une IA.

-> ~20 h

## PITCH 3 LIGNES

Tu prends ton propre `01_rasengan_engine`, tu le portes dans un autre langage, et tu écris l'ADR qui compare les deux versions. Si t'as vraiment compris le JS, tu prouves ici que la compétence n'est pas la syntaxe : c'est la pensée.

## MISSION

1. Choisis Python OU Go (pas les deux au premier jet).
2. Reproduis 100% des fonctionnalités du Rasengan Engine original.
3. Reproduis 100% des tests (adapte le framework, garde les cas).
4. Écris `ADR-COMPARAISON.md` : concurrency model, gestion d'erreurs, écosystème de dépendances, dev experience. Verdict argumenté, pas juste des "j'aime bien".

## LIVRABLES

- Code source dans le langage choisi.
- Tests qui passent (`pytest` ou `go test`).
- `ADR-COMPARAISON.md` (2 pages max).
- `POSTMORTEM.md` : ce qui a été plus DUR qu'en JS, ce qui a été plus SIMPLE.
- Dépôt public + lien dans le `DEPENDENCY_LEDGER.md`.

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

Installation canonique : `npm ci` (pas `npm install`). `npm ci` respecte strictement le `package-lock.json` : deux personnes qui clonent obtiennent exactement les mêmes versions. Committe toujours ton `package-lock.json`. Sans lui, un `npm install` 3 mois plus tard installera d'autres versions et tu debug un fantôme.

<!-- CONTENU-DOSSIER:debut (genere par 99-COULISSES/outillage/generer_index_dossiers.mjs) -->

## Contenu du dossier

Liste generee : tout fichier de `02-CONSTRUCTION/02_mini_projects/15_porte_rasengan_engine_multilang` est joignable depuis ici, aucun document n'est laisse sans porte d'entree.

- [00_SPEC_DRIFT.md](00_SPEC_DRIFT.md)
- [POSTMORTEM.md](POSTMORTEM.md)
- [RULES.md](RULES.md)
- [SECURITY.md](SECURITY.md)
- [SECURITY_GATE.md](SECURITY_GATE.md)
- [SPEC_DRIFT_TRIGGERS.md](SPEC_DRIFT_TRIGGERS.md)
- [TDD_JOURNAL.md](TDD_JOURNAL.md)
- [cahierdescharges.md](cahierdescharges.md)
- [ADR/](ADR/README.md)
- [verification_pack/](verification_pack/README.md)

<!-- CONTENU-DOSSIER:fin -->
