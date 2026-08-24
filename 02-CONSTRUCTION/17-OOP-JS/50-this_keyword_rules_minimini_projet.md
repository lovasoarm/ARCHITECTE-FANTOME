---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [fausse_piste, solution_concurrente]
anti_recipe_key: fausse_piste+solution_concurrente
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Garo :** la règle est simple jusqu'au jour où un état caché traverse une frontière. À partir de là, le “petit raccourci” devient le Horror qui te poursuit pendant trois heures.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Les règles de `this` (appel simple, méthode, `bind`, fléchée) importent au seul endroit du portfolio où une classe reste obligatoire : l'`ErrorBoundary` React.

## OBJECTIF

Une erreur de carte ne tue plus la page.

## APPLICATION

- Écris une classe `ErrorBoundary` avec `getDerivedStateFromError` et `componentDidCatch`.
- Utilise `this.state` et `this.props` correctement, sans handler perdant son contexte.
- Enveloppe une rangée avec, puis provoque une erreur dans une carte : le reste de la page doit rester debout.

## Critère de réussite

- [ ] Écris une classe `ErrorBoundary` avec `getDerivedStateFromError` et `componentDidCatch`.
- [ ] Utilise `this.state` et `this.props` correctement, sans handler perdant son contexte.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi `getDerivedStateFromError` est-elle statique alors que `componentDidCatch` ne l'est pas ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : une erreur de carte ne tue plus la page.

Ton portfolio dégrade proprement au lieu d'afficher un écran blanc. Commit ce composant.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.
