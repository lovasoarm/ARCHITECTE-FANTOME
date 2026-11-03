---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
---

> **SCÈNE CRAZYDEVS : clan des ninjas :** une abstraction peut être une technique secrète… ou une montagne de parchemins pour un problème de trois lignes. Ton défi est de savoir laquelle des deux tu construis.

# PONT : de la pensée fonctionnelle aux design patterns

Temps de lecture ~2 min

-> ~10 min

> **ARRÊTE-TOI ICI.** Ce fichier est un point de passage obligé entre `02-CONSTRUCTION/09-FUNCTIONAL-JS` et `02-CONSTRUCTION/10-DESIGN-PATTERNS`. Ne l'ouvre pas comme "encore un chapitre" : c'est un palier de respiration avant un saut de complexité réel.

## POURQUOI CE PONT EXISTE

Tu viens de raisonner en pures transformations : `map`, `filter`, `reduce`, composition, immutabilité. Le module `02-CONSTRUCTION/10-DESIGN-PATTERNS` va te vendre des "patterns OO" (Strategy, Observer, Factory) qui, à première lecture, ressemblent à un retour en arrière vers l'état mutable. Ce n'est pas un retour en arrière : c'est un autre vocabulaire pour exprimer des intentions récurrentes. Sans ce palier, tu vas rejeter le module `02-CONSTRUCTION/10-DESIGN-PATTERNS` par pur biais fonctionnel.

## DRILL DE VÉRIFICATION (3 questions)

1. Un `Observer` implémenté en pur FP, à quoi ressemble-t-il (indice : liste de callbacks) ?
2. Une `Strategy` : en quoi est-ce différent de passer une fonction en paramètre ?
3. Un `Factory` : pourquoi ce n'est pas "juste une fonction qui retourne un objet" ?

Si les 3 réponses te semblent triviales, tant mieux : tu abordes le module `02-CONSTRUCTION/10-DESIGN-PATTERNS` avec la bonne posture.

## SI TU BLOQUES

Relis le module précédent avant de continuer. Ce pont existe précisément parce que sauter cette marche brise 80% des apprenants sur le module suivant. Aucune honte à revenir.

<!-- AF-TRANSFER-FIELD-1.1 -->

## Transfert terrain : Kintana

**Pourquoi ce transfert compte :** une notion que tu sais réciter mais que tu ne sais pas replacer dans un système est encore fragile.

**Quand la réutiliser :** quand une contrainte du produit change (rôle, réseau, volume, concurrence, panne ou coût) et que tu dois déterminer ce qui reste invariant.

**Limite :** ne transpose pas une syntaxe ou une solution sans vérifier ses hypothèses ; le même mécanisme peut avoir des garanties différentes selon le runtime et le stockage.

**Mission courte :** applique le principe de cette page à un incrément de [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md) : À partir d’une règle fonctionnelle Kintana, compare composition, encapsulation et objet collaborateur. Choisis un seul modèle pour un besoin concret et justifie les dépendances qu’il rend visibles. Produis un petit test ou scénario de panne et note l'invariant conservé, l'hypothèse qui change et la limite observée. Cette mission complète le transfert ; elle ne remplace pas le projet évalué du module.
