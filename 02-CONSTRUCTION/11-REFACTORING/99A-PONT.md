---
stability: intemporel
acte: comprendre
---

> **SCÈNE CRAZYDEVS : clan des ninjas :** une abstraction peut être une technique secrète… ou une montagne de parchemins pour un problème de trois lignes. Ton défi est de savoir laquelle des deux tu construis.

# PONT : de refactorer en JS pur à ajouter des types à TypeScript

Temps de lecture ~2 min

-> ~10 min

> **ARRÊTE-TOI ICI.** Ce fichier est un point de passage obligé entre `02-CONSTRUCTION/11-REFACTORING` et `02-CONSTRUCTION/12-TYPESCRIPT`. Ne l'ouvre pas comme "encore un chapitre" : c'est un palier de respiration avant un saut de nature.

## POURQUOI CE PONT EXISTE

Le refactoring te dit "change la forme, garde le comportement". TypeScript te dit "le compilateur peut te prouver que tu n'as rien cassé". Le mariage des deux fait passer ton refacto d'artisanal à industriel.

## CE QUE TU MAÎTRISES DÉJÀ

- Extraire une fonction sans casser les callers.
- Renommer une variable dans tout le codebase.
- Lire les tests avant de refactorer.

## VOCABULAIRE NOUVEAU QUI ARRIVE

- **Type inference** : le compilateur devine, tu n'annotes que si nécessaire.
- **Structural typing** : deux types sont compatibles s'ils ont la même forme, pas le même nom.
- **Narrowing** : le compilateur affine un type au fil des `if`.
- **`unknown` vs `any`** : `unknown` t'oblige à checker, `any` te laisse mentir.

## LE PIÈGE MENTAL TYPIQUE DU SAUT

Migrer un projet JS en TS d'un coup en mettant `any` partout pour taire le compilateur. Tu n'as gagné aucune sécurité : tu as juste ajouté du bruit.

## EXERCICE-CHARNIÈRE (5 min chrono)

Prends `function add(a, b) { return a + b }`. Ajoute des types. Sans regarder : que se passe-t-il si tu appelles `add("1", 2)` en JS ? En TS strict ? Réponse : `"12"` en JS, erreur de compilation en TS. `../12-TYPESCRIPT/01_ts_basics/02-types_and_interfaces.md`.

## SI TU BLOQUES

Relis le module précédent avant de continuer. Ce pont existe précisément parce que sauter cette marche brise beaucoup d'apprenants. Aucune honte à revenir.

<!-- AF-TRANSFER-FIELD-1.1 -->

## Transfert terrain : Kintana

**Pourquoi ce transfert compte :** une notion que tu sais réciter mais que tu ne sais pas replacer dans un système est encore fragile.

**Quand la réutiliser :** quand une contrainte du produit change (rôle, réseau, volume, concurrence, panne ou coût) et que tu dois déterminer ce qui reste invariant.

**Limite :** ne transpose pas une syntaxe ou une solution sans vérifier ses hypothèses ; le même mécanisme peut avoir des garanties différentes selon le runtime et le stockage.

**Mission courte :** applique le principe de cette page à un incrément de [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md) : Dans Kintana, isole la valeur ou la transformation concernée dans une fonction métier ; vérifie l’état avant/après, les entrées invalides et l’absence de mutation involontaire. Produis un petit test ou scénario de panne et note l'invariant conservé, l'hypothèse qui change et la limite observée. Cette mission complète le transfert ; elle ne remplace pas le projet évalué du module.
