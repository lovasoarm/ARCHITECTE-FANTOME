---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [decision_organisationnelle, preuve_partielle]
anti_recipe_key: decision_organisationnelle+preuve_partielle
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## TYPE

Mini-projet

## Niveau

[OK] Fondamental

## CONTEXTE

`this` dépend de l'appel, pas de la déclaration. En React fonctionnel tu l'évites presque partout : sauf dans une classe `ErrorBoundary`, que le portfolio aura pour ne jamais afficher un écran blanc.

## OBJECTIF

Tu maîtrises le piège du this détaché.

## APPLICATION

- Écris un objet avec une méthode classique et une méthode fléchée qui lisent toutes deux `this`.
- Extrais chaque méthode dans une variable, appelle-la, compare le résultat.
- Déduis-en pourquoi une classe React lie ses handlers avec des propriétés fléchées.

## Critère de réussite

- [ ] Écris un objet avec une méthode classique et une méthode fléchée qui lisent toutes deux `this`.
- [ ] Extrais chaque méthode dans une variable, appelle-la, compare le résultat.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quelle règle détermine la valeur de `this` lors d'un appel de fonction classique ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tu maîtrises le piège du this détaché.

Tu es prêt à écrire une `ErrorBoundary` correcte au module 5 sans copier un exemple sans le comprendre.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.
