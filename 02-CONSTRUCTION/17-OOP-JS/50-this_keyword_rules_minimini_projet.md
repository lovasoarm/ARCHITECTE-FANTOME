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

Les règles de `this` (appel simple, méthode, `bind`, fléchée) se vérifient ici dans une classe `ErrorBoundary` React. Cette activité nécessite un petit environnement React/Vite décrit ci-dessous ; Node seul ne sait pas interpréter le JSX.

## OBJECTIF

Une erreur de carte ne tue plus la page.

## SETUP SPÉCIFIQUE : React avec Vite

Le setup global Node.js + éditeur ne suffit pas à exécuter JSX. Dans un dossier de travail dédié, crée une application React/Vite et conserve le `package-lock.json` généré pour figer les versions effectivement installées :

```bash
npm create vite@latest oop-error-boundary -- --template react
cd oop-error-boundary
npm install
npm run dev
```

Cette commande nécessite un accès au registre npm lors de la première installation. Pour une machine hors ligne, prépare à l'avance les dépendances npm et leur cache ; ne prétends pas que le projet est exécutable tant que `npm install` n'a pas réussi.

## APPLICATION

- Écris une classe `ErrorBoundary` avec `getDerivedStateFromError` et `componentDidCatch`.
- Utilise `this.state` et `this.props` correctement, sans handler perdant son contexte.
- Enveloppe uniquement la carte fautive dans le boundary ; conserve un frère indépendant visible pour démontrer que le reste de la page continue.
- Provoque une exception **pendant le rendu** du composant carte (par exemple `if (crash) throw new Error("Erreur pendant render")`). Le déclencheur doit être un état activé depuis un bouton situé hors du boundary.
- N'utilise pas une exception dans un gestionnaire d'événement ni une Promise rejetée comme test principal : un Error Boundary React ne les capture pas comme les erreurs de rendu descendants.

## Critère de réussite

- [ ] Écris une classe `ErrorBoundary` avec `getDerivedStateFromError` et `componentDidCatch`.
- [ ] Utilise `this.state` et `this.props` correctement, sans handler perdant son contexte.
- [ ] Le projet React/Vite démarre avec `npm run dev` après installation documentée.
- [ ] Une erreur levée pendant le rendu d'un descendant affiche le fallback du boundary.
- [ ] Un composant frère situé hors du boundary reste utilisable.
- [ ] Une erreur de gestionnaire d'événement ou de callback asynchrone est distinguée explicitement : elle ne constitue pas le test positif d'un Error Boundary.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi `getDerivedStateFromError` est-elle statique alors que `componentDidCatch` ne l'est pas ? Quelle différence fais-tu entre une exception pendant le rendu d'un descendant et une exception dans son gestionnaire de clic ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié qu'une erreur de rendu dans un descendant couvert déclenche un fallback local. Tu n'as pas démontré que le boundary capture les erreurs des événements, des tâches asynchrones, du rendu serveur ou ses propres erreurs.

Ton portfolio dégrade proprement au lieu d'afficher un écran blanc. Commit ce composant.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.

## Livraison produit obligatoire : Kintana : Règle métier et état

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 50-this_keyword_rules_minimini_projet » :** Dans un contrôleur Kintana, compare une méthode appelée via son objet, extraite comme callback puis liée explicitement. Corrige la perte de contexte et documente la forme d’appel qui garantit le contrat.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
