---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [preuve_partielle, regression]
anti_recipe_key: preuve_partielle+regression
transfer_distance: low
assessment_role: instructional_checkpoint
---


> **SCÈNE CRAZYDEVS : mur de siège :** le bug n'est pas “où ça a explosé ?”, mais “où la première fissure est-elle apparue ?”. Ici, chaque log, test et reproduction est une empreinte dans le mur.

# EXO : Reproduction déterministe d'un bug flaky

Temps de lecture ~2 min

-> ~45 min

## OBJECTIF

Prendre un défaut qui semble intermittent parce qu'une branche rare dépend d'une source aléatoire, puis rendre cette branche reproductible. Le but n'est pas de prétendre que le défaut est une race condition : il faut identifier le mécanisme exact.

## ÉNONCÉ

Utilise le fichier [`11A-flaky.js`](./11A-flaky.js). Sa fonction `computeTotal(items, random)` accepte une source aléatoire injectable. La branche rare renvoie volontairement `undefined` comme bonus ; l'addition produit alors `NaN`.

```js
const { computeTotal } = require("./11A-flaky.js");

console.log(computeTotal([1, 2, 3], () => 0.5)); // 6 : branche normale
console.log(computeTotal([1, 2, 3], () => 0));   // NaN : branche rare fautive
```

La deuxième ligne force la branche rare de façon déterministe. Le défaut est dans la logique métier de la fixture, pas dans l'ordonnancement asynchrone. `Math.random()` ne possède pas d'API standard de seed ; injecter la source évite de dépendre du hasard du test.

## LIVRABLES

1. `HYPOTHESES.md` (utilise `16-HYPOTHESES_TEMPLATE.md`).
2. `repro.test.js` qui attend `6` pour `[1, 2, 3]` avec une source qui force la branche rare. Il doit échouer avec la fixture initiale, car le résultat est `NaN`.
3. Un correctif minimal : un bonus absent vaut `0`, pas `undefined`.
4. Un commit `test:` puis un commit `fix:` et une note qui distingue le défaut initial, le mécanisme et la preuve obtenue.

Exemple de test à compléter dans le cadre de l'exercice :

```js
const test = require("node:test");
const assert = require("node:assert/strict");
const { computeTotal } = require("./11A-flaky.js");

test("un bonus absent ne change pas le total", () => {
  assert.equal(computeTotal([1, 2, 3], () => 0), 6);
});
```

## CRITÈRE DE RÉUSSITE

- Le test ci-dessus échoue avant le correctif parce que le résultat vaut `NaN`.
- Après correction, le même test passe et la branche normale retourne toujours `6`.
- Tu indiques exactement les commandes et répétitions réellement exécutées. Ne prétends pas avoir obtenu `10/10` si tu ne les as pas lancées ; répéter un test déterministe ne prouve pas l'absence de tout autre défaut.
- Aucun `sleep(500)` arbitraire et aucune seed inventée pour `Math.random()`.

## EXEMPLE DE LIVRABLE

Voir [`13-HYPOTHESES_EXEMPLE_REPRO_DETERMINISTE.md`](13-HYPOTHESES_EXEMPLE_REPRO_DETERMINISTE.md) : un `HYPOTHESES.md` rempli sur la même fixture. À ouvrir APRÈS ta propre tentative, pour calibrer.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.
