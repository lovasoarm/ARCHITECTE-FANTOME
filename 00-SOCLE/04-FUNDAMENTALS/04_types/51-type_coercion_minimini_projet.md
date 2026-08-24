---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [changement_contexte, temps_limite]
anti_recipe_key: changement_contexte+temps_limite
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

## TYPE

Micro-drill

## Niveau

[OK] Fondamental

## CONTEXTE

JavaScript convertit silencieusement. Une note « 9.1 » venue d'une chaîne, un `progress` à 0 traité comme faux : deux bugs d'affichage classiques sur un portfolio.

## APPLICATION

- Dans un composant, affiche conditionnellement une barre de progression avec `{progress && <Bar/>}` alors que `progress` vaut `0`.
- Constate ce qui s'affiche à l'écran.
- Corrige avec un test explicite sur `null`.
- Note en commentaire les valeurs falsy qui t'ont piégé.

## Critère de réussite

- [ ] Dans un composant, affiche conditionnellement une barre de progression avec `{progress && <Bar/>}` alors que `progress` vaut `0`.
- [ ] Constate ce qui s'affiche à l'écran.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi `{0 && <Bar/>}` affiche-t-il `0` à l'écran en React ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ta barre de progression ne ment plus.

Tu viens de corriger un bug d'affichage réel qui touche exactement Safe-driving (48 %) et ce parcours (62 %). Commit le composant.

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.
