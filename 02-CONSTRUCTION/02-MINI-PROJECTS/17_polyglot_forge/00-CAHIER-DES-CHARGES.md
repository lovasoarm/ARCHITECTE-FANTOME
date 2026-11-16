---
stability: intemporel
acte: comprendre
route_family: transfer
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Cahier des charges : Polyglot Forge


<!-- AF-ADR-CONTRACT -->

**Contrat ADR de ce projet : 1 décision(s) réellement indépendante(s).** Détails et périmètre exact dans [`01-RULES.md`](01-RULES.md). La quantité ne justifie jamais de fractionner artificiellement une même décision. Les ADR fournis sont des contextes de départ, pas une revue humaine ni une preuve d'adoption.

Temps de lecture ~2 min

Approfondissement DEPTH : reprendre le modèle mental de l’event loop de `01-CADRAGE/02-ASYNC/04_event_loop/` et comparer une trace JavaScript avec une implémentation dans un langage cible déjà maîtrisé (de préférence celui choisi au projet 15). Ce projet approfondit la sémantique d’exécution ; il ne demande pas une troisième langue et ne constitue pas un prérequis de validation fondamentale.

## Objectif verrouillé

Modéliser un event loop simplifié (macrotask queue + microtask queue + tick) dans **2 langages**. Prouver que pour la même séquence d'entrée, les deux implémentations produisent la **même trace de sortie**, ligne pour ligne.

## Critère de succès (binaire, mesurable)

```bash
bash tests/run_all.sh
# doit sortir "POLYGLOT PARITY OK" et code 0
```

Le script compare `output_js.txt` et `output_pyOrRust.txt` avec `diff`. Zéro divergence = OK.

## Contraintes

- Aucune dépendance externe hors stdlib du langage cible.
- Chaque implémentation doit tenir en < 200 lignes.
- Le fichier `tests/scenario.json` est la seule source d'entrée : les deux runtimes le lisent.
- Zéro comportement dépendant du wall-clock (utilise des tokens de temps logiques `t=0, t=1, ...`).

## Livrables

- `src/loop.js`
- `src/loop.py` (ou `src/loop.rs` avec un `Cargo.toml` minimal)
- `tests/scenario.json`
- `tests/expected.txt`
- `tests/run_all.sh`
- `ADR/ADR-001_decision.md`
- `02-TDD-JOURNAL.md`
- `08-POSTMORTEM.md`

## Grille de correction (scorée sur 10)

| Critère                                                      | Points |
| ------------------------------------------------------------ | ------ |
| `run_all.sh` sort "POLYGLOT PARITY OK"                       | 3      |
| ADR justifie le choix Python vs Rust en < 20 lignes          | 1      |
| Aucune dépendance externe hors stdlib                        | 1      |
| Les deux impls < 200 lignes chacune                          | 1      |
| Trace de sortie déterministe sur 3 scénarios différents      | 2      |
| POSTMORTEM cite au moins 1 divergence rencontrée et sa cause | 2      |

Seuil de réussite : 8/10. En dessous, `EXO_VERIFICATION.md` du module concerné et re-tenter.

## RÔLE DES DOSSIERS (ne skippe pas)

- `src/` : **tu remplis toi-même**. Le dossier est vide exprès : c'est ton livrable. Aucun code fourni.
- `tests/` : **TDD strict : tu écris le test AVANT le code de `src/`**. Rouge → vert → refactor. Si `tests/` est vide en fin de projet, ce projet ne compte pas dans ton portfolio.
- `ADR/` : **1 décision** sur la représentation du modèle d’exécution et les différences de sémantique observées. Format : contexte, alternatives, décision, conséquences et signal de révision.
- `08-POSTMORTEM.md` : **rédigé à la fin, honnête**. Ce qui a foiré, combien de temps t'a coûté chaque blocage, ce que tu referais autrement.
- `02-TDD-JOURNAL.md` : trace vivante du cycle rouge/vert/refactor.

**Un CTO qui feuillette ton portfolio regarde `src/` ET `tests/` ET `ADR/`. Un `src/` vide sans `tests/` associé = projet non fini, quelle que soit la qualité du reste.**
