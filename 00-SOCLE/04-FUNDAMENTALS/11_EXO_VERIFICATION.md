---
stability: stable
acte: verification
assessment_role: instructional_checkpoint
---

**SCÈNE CRAZYDEVS : atelier de Konoha :** observe les contraintes avant de choisir une technique.

# EXO 11 : const : liaison fixe, objet modifiable

Temps indicatif : 10 min.

```js
const ninja = { name: "Mika", chakra: 100 };
ninja.chakra -= 20;
console.log(ninja.chakra);
```

**Questions**

1. La dernière ligne est-elle autorisée ? Prédis la sortie.
2. Pourquoi `const` n’empêche-t-il pas de modifier `chakra` ?
3. Quelle opération serait interdite : réaffecter `ninja` ou modifier une propriété ?
4. Que changerait `Object.freeze(ninja)` dans cet exemple ? Précise que ce gel est superficiel.

**Preuve** : écris la prédiction avant exécution, puis ajoute un test qui distingue réaffectation et mutation.

**Critère** : explique la différence entre l’immuabilité de la liaison et celle de l’objet sans dire que `const` rend l’objet entièrement immuable.

## CORRIGÉ DE RÉFÉRENCE : APRÈS TENTATIVE

1. La mutation `ninja.chakra -= 20` est autorisée et la sortie est `80`.
2. `const` interdit de réaffecter la variable `ninja`. Il ne rend pas automatiquement immuables les propriétés de l'objet référencé.
3. `ninja = { name: "Mika", chakra: 50 }` est interdit dans le même scope : c'est une réaffectation de liaison. Changer `ninja.chakra` modifie l'objet sans changer la liaison.
4. `Object.freeze(ninja)` empêche les modifications directes des propriétés propres de premier niveau (ajout, suppression, réécriture). Le gel est superficiel : un objet imbriqué reste modifiable tant qu'il n'est pas gelé séparément.

```js
import assert from "node:assert/strict";
const ninja = { name: "Mika", chakra: 100 };
ninja.chakra -= 20;
assert.equal(ninja.chakra, 80);
assert.throws(() => {
  (function reassign() {
    "use strict";
    ninja = {};
  })();
}, TypeError);
Object.freeze(ninja);
assert.throws(() => {
  (function mutateFrozen() {
    "use strict";
    ninja.chakra = 5;
  })();
}, TypeError);
```

Le test encapsule les écritures interdites dans des fonctions strictes pour vérifier un rejet explicite plutôt qu'un échec dépendant du mode d'exécution.
