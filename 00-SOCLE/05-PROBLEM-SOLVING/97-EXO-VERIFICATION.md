---
stability: stable
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# EXO IA MENTEUSE : module 02_problem_solving

Temps : ~10 min. Format court, seul ou en binôme.

## Snippet IA plausible

L'assistant te propose ce code, l'air confiant :

```js
const uniques = (arr) => [...new Set(arr)].sort(); // 'trie et déduplique'
```

Il ajoute : _"C'est propre, testé, prod-ready."_

## Ta question unique

**Où est la faille ?**

Prends 5 minutes. Écris ta réponse **sans** relancer l'IA. Nomme :

1. Le comportement observable qui trompe (pourquoi ça a l'air correct).
2. Le vrai problème (technique, sécurité, complexité, ou sémantique).
3. La correction minimale que **toi** tu apporterais.

## Piste de correction (à ne lire qu'après)

> `Set` conserve l'ordre d'insertion. Le piège est ailleurs : sans comparateur, `sort()` compare les valeurs comme des chaînes. Par exemple, `[3, 20, 100].sort()` donne `[100, 20, 3]`, et non l'ordre numérique attendu. Pour un tableau de nombres, un comparateur comme `(a, b) => a - b` exprime le tri numérique ; pour des données mélangées, il faut d'abord définir une règle de comparaison explicite.

## Pourquoi cet exo

Une IA peut générer du code **plausible** plus vite qu'elle ne le vérifie.
Le métier n'est pas seulement d'écrire : c'est aussi de **repérer la faille** dans une
suggestion qui a l'air correcte. Ce drill facultatif de 10 min entraîne ce réflexe ;
il ne certifie pas ta maîtrise et ne conditionne pas la progression.
