---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [decision_organisationnelle, changement_contexte]
anti_recipe_key: decision_organisationnelle+changement_contexte
transfer_distance: low
assessment_role: diagnostic_mastery
---

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

Code plus court, rendus plus stables. Commit.

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.
