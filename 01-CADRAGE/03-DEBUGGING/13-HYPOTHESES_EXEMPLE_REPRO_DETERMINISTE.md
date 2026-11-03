---
stability: intemporel
cognitive_level: L3
perturbation_modes: [decision_inversee, changement_contexte]
anti_recipe_key: decision_inversee+changement_contexte
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : mur de siège :** le bug n'est pas “où ça a explosé ?”, mais “où la première fissure est-elle apparue ?”. Ici, chaque log, test et reproduction est une empreinte dans le mur.

# HYPOTHESES.md : exemple rempli

Temps de lecture ~3 min

## Contexte : exercice `09-exo_repro_deterministe.md`, fixture `11A-flaky.js`

> Livrable de référence à ouvrir APRÈS avoir tenté l'exercice. Il montre
> comment formuler des hypothèses, fournir une preuve falsifiable et
> séparer une déduction du code d'une observation réellement exécutée.

## 1. Hypothèses envisagées

Symptôme : `computeTotal([1, 2, 3])` renvoie normalement `6`, mais une branche rare peut renvoyer `NaN`.

Hypothèses initiales :

- A : Le tableau contient parfois une valeur non numérique.
- B : Le résultat change à cause de l'ordonnancement de Promises.
- C : La branche rare affecte `undefined` au bonus, puis l'addition propage `NaN`.
- D : Le contrat du test est faux : un bonus absent devrait-il vraiment valoir zéro ?

## 2. Preuves et réfutations

La fixture valide que les éléments du tableau sont des nombres finis ; cette validation ne soutient donc pas A pour l'entrée `[1, 2, 3]`.

Le code ne contient aucune opération asynchrone ; B ne décrit pas le mécanisme montré.

L'appel contrôlé `computeTotal([1, 2, 3], () => 0.5)` suit la branche normale et retourne `6`. L'appel `computeTotal([1, 2, 3], () => 0)` force la branche rare : `bonus` vaut `undefined`, et `6 + undefined` donne `NaN`. Cette conclusion découle du code et du comportement défini de l'addition JavaScript ; elle ne prétend pas être une mesure de fréquence en production.

D doit être tranchée par la règle métier. Dans cette fixture, l'énoncé définit l'absence de bonus comme « aucun ajout » : la valeur neutre attendue est donc `0`.

## 3. Hypothèse retenue

La cause est la branche rare qui renvoie `undefined` pour une quantité additive. Le défaut est déterministe dès que cette branche est forcée ; son apparence intermittente vient de la source aléatoire qui ne la sélectionne que rarement.

## 4. Reproduction falsifiable

Le test à écrire attend `6` lorsque la source injectée retourne `0` :

```js
const test = require("node:test");
const assert = require("node:assert/strict");
const { computeTotal } = require("./11A-flaky.js");

test("un bonus absent ne change pas le total", () => {
  assert.equal(
    computeTotal([1, 2, 3], () => 0),
    6,
  );
});
```

Avant le correctif, le test échoue puisque la valeur obtenue est `NaN`. Après le correctif, il doit passer. Ce document donne le résultat déduit de la fixture ; ajoute tes propres commandes, environnement et sorties lorsque tu as réellement exécuté le test. Ne recopie pas une fréquence ou un « 10/10 » non mesuré.

## 5. Correction et vérification

- Remplacer le ternaire fautif par `const bonus = 0;` : les deux branches représentent ici un bonus absent.
- Garder le test qui injecte `() => 0` pour protéger la branche rare.
- Conserver un cas normal qui injecte `() => 0.5` et attend également `6`.
- Après exécution, documenter séparément le test rouge avant le patch et le test vert après le patch.

## 6. Ce que j'ai appris

Un défaut rare n'est pas forcément une race condition. Une source aléatoire injectable permet de choisir une branche déterminée et de rendre le défaut reproductible. La fixture est volontairement simple : dans un système réel, la règle métier du bonus doit être confirmée avant de fixer la valeur par défaut.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.
