---
stability: intemporel
acte: comprendre
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# PONT : de prouver du code à raisonner sur les nombres à les bases mathématiques

Temps de lecture ~2 min

-> ~10 min

> **ARRÊTE-TOI ICI.** Ce fichier est un point de passage obligé entre `02-CONSTRUCTION/03-TESTING` et `02-CONSTRUCTION/04-MATH-BASICS`. Ne l'ouvre pas comme "encore un chapitre" : c'est un palier de respiration avant un saut de nature.

## POURQUOI CE PONT EXISTE

Tester `add(2, 3) === 5`, c'est facile. Tester `add(0.1, 0.2)`, tu découvres IEEE 754. `02-CONSTRUCTION/04-MATH-BASICS/` te donne les outils pour ne pas écrire de tests qui mentent sur des flottants, du modulo, ou du bit twiddling.

## CE QUE TU MAÎTRISES DÉJÀ

- Écrire un test AAA lisible.
- Isoler une dépendance avec un fake.
- Nommer un edge case avant de l'implémenter.

## VOCABULAIRE NOUVEAU QUI ARRIVE

- **IEEE 754** : la norme des flottants, source de `0.1 + 0.2 !== 0.3`.
- **Modulo signé** : `(-1) % 3` peut valoir `-1` ou `2` selon le langage.
- **Bit mask** : sélectionner ou toggler des flags.
- **Hash** : une empreinte, jamais un identifiant réversible.

## LE PIÈGE MENTAL TYPIQUE DU SAUT

Croire que `Math.random()` est cryptographiquement sûr. Il ne l'est pas. Un jeton de session généré comme ça est cassable en secondes.

## EXERCICE-CHARNIÈRE (5 min chrono)

Quelle valeur affiche `console.log(0.1 + 0.2 === 0.3)` ? Pourquoi ? Écris un helper `approxEqual(a, b, eps)` en 3 lignes. Bonne réponse en tête ? Passe à `02-CONSTRUCTION/04-MATH-BASICS/`. Sinon, prends 15 min pour comprendre IEEE 754 d'abord.

## SI TU BLOQUES

Relis le module précédent avant de continuer. Ce pont existe précisément parce que sauter cette marche brise beaucoup d'apprenants. Aucune honte à revenir.

<!-- AF-TRANSFER-FIELD-1.1 -->

## Transfert terrain : Kintana

**Pourquoi ce transfert compte :** une notion que tu sais réciter mais que tu ne sais pas replacer dans un système est encore fragile.

**Quand la réutiliser :** quand une contrainte du produit change (rôle, réseau, volume, concurrence, panne ou coût) et que tu dois déterminer ce qui reste invariant.

**Limite :** ne transpose pas une syntaxe ou une solution sans vérifier ses hypothèses ; le même mécanisme peut avoir des garanties différentes selon le runtime et le stockage.

**Mission courte :** applique le principe de cette page à un incrément de [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md) : Construis une suite de tests autour d’un invariant Kintana lié à cette notion. Ajoute un test nominal, un cas limite, un cas d’accès refusé ou de panne selon le sujet, puis injecte volontairement une régression. Produis un petit test ou scénario de panne et note l'invariant conservé, l'hypothèse qui change et la limite observée. Cette mission complète le transfert ; elle ne remplace pas le projet évalué du module.
