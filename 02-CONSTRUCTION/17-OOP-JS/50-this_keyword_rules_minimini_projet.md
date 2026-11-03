---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [fausse_piste, solution_concurrente]
anti_recipe_key: fausse_piste+solution_concurrente
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : This keyword rules : this selon le call-site

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

## Livraison produit obligatoire : Kintana : Règle métier et état

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 50-this_keyword_rules_minimini_projet » :** Dans un contrôleur Kintana, compare une méthode appelée via son objet, extraite comme callback puis liée explicitement. Corrige la perte de contexte et documente la forme d’appel qui garantit le contrat.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
