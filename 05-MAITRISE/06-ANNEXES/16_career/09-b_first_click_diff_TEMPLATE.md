---
stability: intemporel
acte: comprendre
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# 04b : first_click_diff.md (template d'itération)

Temps de lecture ~2 min

> Rempli **après** avoir consolidé les `first_click_log.md` des trois sujets.
> Objectif : traduire les hésitations réelles en modifications ciblées
> de `01-START_HERE.md` (et **rien d'autre** : le curriculum reste intact).

## Sujets analysés

- Sujet 1 : `<pseudo>` : hésitations > 5 s : `<n>`
- Sujet 2 : `<pseudo>` : hésitations > 5 s : `<n>`
- Sujet 3 : `<pseudo>` : hésitations > 5 s : `<n>`

## Points de friction récurrents (au moins 2 sujets sur 3)

| #   | Passage de `01-START_HERE.md` | Symptôme observé                       | Cause probable                      |
| --- | ----------------------------- | -------------------------------------- | ----------------------------------- |
| F1  | `<citation>`                  | `<hésitation, mauvais clic, question>` | `<ambiguïté, terme inconnu, ordre>` |
| F2  |                               |                                        |                                     |

## Diff proposé (bloc par bloc)

Pour chaque point de friction, un patch minimal :

```text
--- 01-START_HERE.md (avant)
+++ 01-START_HERE.md (après)
@@
- <ligne originale>
+ <ligne réécrite>
```

## Contrainte de non-régression

- [ ] Aucune modification hors de `01-START_HERE.md`.
- [ ] Le nouveau texte a été relu à voix haute (les hésitations résiduelles < 5 s).
- [ ] Re-tournage avec **un 4e sujet vierge** : `<0-2 hésitations > 5 s ? oui/non>`.

Tant que la case "re-tournage" n'est pas cochée, la modification n'est **pas**
mergée.
