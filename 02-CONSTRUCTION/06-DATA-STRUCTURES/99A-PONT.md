---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
---

> **SCÈNE CRAZYDEVS : tournoi de Konoha :** si tu tries 10 000 combattants comme si tu cherchais un seul nom dans une liste de 12, l'arène devient un gag. Ici, la complexité est le nombre de combats que ton algorithme impose.

# PONT : de stocker à traiter à les algorithmes

Temps de lecture ~2 min

-> ~10 min

> **ARRÊTE-TOI ICI.** Ce fichier est un point de passage obligé entre `02-CONSTRUCTION/06-DATA-STRUCTURES` et `02-CONSTRUCTION/07-ALGORITHMS`. Ne l'ouvre pas comme "encore un chapitre" : c'est un palier de respiration avant un saut de nature.

## POURQUOI CE PONT EXISTE

Les structures rangent, les algos manipulent. Passer de l'une à l'autre demande de voir un problème comme une transformation d'état, pas comme un tas de données. Tri, recherche, parcours : tu vas raisonner en O() plutôt qu'en "ça marche".

## CE QUE TU MAÎTRISES DÉJÀ

- Choisir Array, Map, Set, Tree selon l'usage.
- Estimer les coûts asymptotiques.
- Repérer un accès O(n²) caché dans une boucle imbriquée.

## VOCABULAIRE NOUVEAU QUI ARRIVE

- **Diviser pour régner** : couper le problème en deux, résoudre chaque moitié.
- **Récursion** : une fonction qui s'appelle elle-même, avec cas de base obligatoire.
- **BFS / DFS** : parcourir un graphe en largeur ou en profondeur.
- **Programmation dynamique** : mémoriser les sous-résultats pour ne pas les recalculer.

## LE PIÈGE MENTAL TYPIQUE DU SAUT

Écrire une récursion sans cas de base clair : stack overflow. Ou l'inverse : rendre tout itératif par peur de la récursion, et perdre la lisibilité sur un problème naturellement arborescent.

## EXERCICE-CHARNIÈRE (5 min chrono)

Écris `factorial(n)` en récursif puis en itératif. Quelle version explose à `n = 100000` ? Pourquoi ? Réponse : la récursive, sans TCO. `../07-ALGORITHMS/03_dynamic_programming/02-dp_basics.md` détaille.

## SI TU BLOQUES

Relis le module précédent avant de continuer. Ce pont existe précisément parce que sauter cette marche brise beaucoup d'apprenants. Aucune honte à revenir.

<!-- AF-TRANSFER-FIELD-1.1 -->

## Transfert terrain : Kintana

**Pourquoi ce transfert compte :** une notion que tu sais réciter mais que tu ne sais pas replacer dans un système est encore fragile.

**Quand la réutiliser :** quand une contrainte du produit change (rôle, réseau, volume, concurrence, panne ou coût) et que tu dois déterminer ce qui reste invariant.

**Limite :** ne transpose pas une syntaxe ou une solution sans vérifier ses hypothèses ; le même mécanisme peut avoir des garanties différentes selon le runtime et le stockage.

**Mission courte :** applique le principe de cette page à un incrément de [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md) : Choisis une opération Kintana liée à cette leçon et crée un benchmark reproductible sur un jeu synthétique d’au moins 10 000 entrées lorsque le sujet le permet. Compare une baseline et une variante. Produis un petit test ou scénario de panne et note l'invariant conservé, l'hypothèse qui change et la limite observée. Cette mission complète le transfert ; elle ne remplace pas le projet évalué du module.
