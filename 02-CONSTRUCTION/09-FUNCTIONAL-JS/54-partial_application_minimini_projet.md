---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [decision_organisationnelle, changement_contexte]
anti_recipe_key: decision_organisationnelle+changement_contexte
transfer_distance: low
assessment_role: diagnostic_mastery
---

# Mise en pratique : Application partielle : fixer maintenant, passer le reste plus tard

> **SCÈNE CRAZYDEVS : Garo :** la règle est simple jusqu'au jour où un état caché traverse une frontière. À partir de là, le “petit raccourci” devient le Horror qui te poursuit pendant trois heures.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

L'application partielle fige certains arguments. Elle simplifie les handlers React : un `onSelect` déjà lié au projet de la carte.

## OBJECTIF

Tes handlers sont préconfigurés.

## APPLICATION

- Dans ta rangée, crée les handlers de sélection par application partielle plutôt qu'avec une fonction fléchée en ligne recréée à chaque rendu.
- Mémorise-les avec `useCallback` là où c'est pertinent.
- Vérifie que le comportement est identique.

## Critère de réussite

- [ ] Dans ta rangée, crée les handlers de sélection par application partielle plutôt qu'avec une fonction fléchée en ligne recréée à chaque rendu.
- [ ] Mémorise-les avec `useCallback` là où c'est pertinent.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quand la mémorisation d'un handler apporte-t-elle réellement quelque chose ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tes handlers sont préconfigurés.

L’application partielle peut rendre le handler plus lisible en fixant explicitement certains arguments. Elle ne garantit pas, à elle seule, une référence de fonction stable entre les rendus : si tu recrées le handler à chaque rendu, sa référence peut changer. `useCallback` peut renvoyer la référence mémorisée lorsque ses dépendances n’ont pas changé ; cela n’est utile que lorsqu’un consommateur dépend réellement de cette stabilité, par exemple un composant mémorisé ou un autre hook. Le hook ne supprime pas la création de la fonction passée pendant le rendu. Voir la [documentation React](https://react.dev/reference/react/useCallback).

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.

## Livraison produit obligatoire : Kintana : Règle métier et état

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 54-partial_application_minimini_projet » :** Prépare par application partielle une fonction de calcul Kintana avec un taux ou une catégorie déjà fixé, puis réutilise-la sur plusieurs demandes. Compare-la à une fonction qui reçoit tous les paramètres à chaque appel.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
