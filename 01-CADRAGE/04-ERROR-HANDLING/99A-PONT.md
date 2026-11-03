---
stability: intemporel
acte: comprendre
---

> **SCÈNE CRAZYDEVS : traqueur de jutsu :** Naruto voit l'explosion finale et accuse le dernier fichier touché. Mauvais réflexe. Ton enquête doit remonter le flux, figer les hypothèses et retrouver la première trace qui ne colle plus.

# PONT : de prévoir l'échec à le prouver à les tests

Temps de lecture ~2 min

-> ~10 min

> **ARRÊTE-TOI ICI.** Ce fichier est un point de passage obligé entre `01-CADRAGE/04-ERROR-HANDLING` et `02-CONSTRUCTION/03-TESTING`. Ne l'ouvre pas comme "encore un chapitre" : c'est un palier de respiration avant un saut de nature.

## POURQUOI CE PONT EXISTE

Tu sais désormais quoi lever et quand. Reste à démontrer que ton code s'y tient sans avoir à le vérifier à la main à chaque changement. Les tests transforment tes intentions d'erreur en garde-fous exécutables.

## CE QUE TU MAÎTRISES DÉJÀ

- Distinguer erreur attendue et bug.
- Écrire un `throw` qui porte du sens.
- Choisir entre relancer, wrapper, ou traiter.

## VOCABULAIRE NOUVEAU QUI ARRIVE

- **AAA (Arrange, Act, Assert)** : structure d'un test lisible.
- **Fixture** : donnée figée qu'on rejoue à chaque run.
- **Coverage** : pourcentage de lignes touchées : indicatif, pas objectif.
- **Mutation testing** : on casse volontairement le code pour voir si un test attrape.

## LE PIÈGE MENTAL TYPIQUE DU SAUT

Écrire des tests qui répètent l'implémentation. Un test qui casse à chaque refacto propre ne teste rien : il photographie le code.

## EXERCICE-CHARNIÈRE (5 min chrono)

Prends une fonction qui `throw` deux erreurs distinctes. Écris trois tests : chemin heureux, erreur A, erreur B. Sans ouvrir la doc du runner. Si tu ne peux pas nommer les 3 étapes AAA de chaque test, ouvre `../../02-CONSTRUCTION/03-TESTING/03-jest_crash_course.md` d'abord.

## SI TU BLOQUES

Relis le module précédent avant de continuer. Ce pont existe précisément parce que sauter cette marche brise beaucoup d'apprenants. Aucune honte à revenir.

<!-- AF-TRANSFER-FIELD-1.1 -->

## Transfert terrain : Kintana

**Pourquoi ce transfert compte :** une notion que tu sais réciter mais que tu ne sais pas replacer dans un système est encore fragile.

**Quand la réutiliser :** quand une contrainte du produit change (rôle, réseau, volume, concurrence, panne ou coût) et que tu dois déterminer ce qui reste invariant.

**Limite :** ne transpose pas une syntaxe ou une solution sans vérifier ses hypothèses ; le même mécanisme peut avoir des garanties différentes selon le runtime et le stockage.

**Mission courte :** applique le principe de cette page à un incrément de [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md) : Reproduis un incident où un demandeur envoie deux fois la même commande après une réponse lente. Écris les hypothèses, ajoute le signal nécessaire, isole la cause et corrige sans supprimer la preuve du défaut. Produis un petit test ou scénario de panne et note l'invariant conservé, l'hypothèse qui change et la limite observée. Cette mission complète le transfert ; elle ne remplace pas le projet évalué du module.
