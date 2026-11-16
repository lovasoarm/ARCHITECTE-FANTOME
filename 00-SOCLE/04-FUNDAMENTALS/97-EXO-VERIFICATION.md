---
stability: stable
---

**SCÈNE CRAZYDEVS : Naruto :** avant de lancer le jutsu, tu vérifies ton chakra, ton terrain et ce que tu crois savoir. Ici, le piège est de coder avant d’avoir compris.

# EXO : Le code propre qui ment

Tu reçois un petit morceau de code qui semble propre, nomme bien ses variables et passe les cas heureux.

## Mission

Le code ci-dessous paraît propre. Il mémorise pourtant mal certains résultats :

```js
const cache = new Map();

function memoiser(cle, calculer) {
  const resultatEnCache = cache.get(cle);
  if (resultatEnCache) return resultatEnCache;

  const resultat = calculer();
  cache.set(cle, resultat);
  return resultat;
}
```

Trouve l’hypothèse cachée qui n’est pas garantie par le contrat.

1. Donne une valeur mise en cache qui casse le comportement.
2. Explique pourquoi le code semblait crédible.
3. Propose le plus petit correctif.
4. Ajoute un test qui empêcherait le retour du bug.

Le but n’est pas de trouver une faute de syntaxe. Le but est de montrer qu’une solution élégante peut reposer sur une hypothèse fausse.

## CORRIGÉ DE RÉFÉRENCE : APRÈS TENTATIVE

L’hypothèse cachée est : « toute valeur déjà présente dans le cache est truthy ». Or `Map.get()` retourne aussi `0`, `false`, `""` ou `undefined` si ces valeurs ont été enregistrées. Le test `if (resultatEnCache)` confond une entrée absente avec une entrée présente dont la valeur est fausse au sens booléen.

Le plus petit correctif consiste à tester la présence de la clé avec `Map.has()` :

```js
const cache = new Map();

function memoiser(cle, calculer) {
  if (cache.has(cle)) return cache.get(cle);
  const resultat = calculer();
  cache.set(cle, resultat);
  return resultat;
}
```

Test de non-régression :

```js
import assert from "node:assert/strict";
const cache = new Map();
function memoiser(cle, calculer) {
  if (cache.has(cle)) return cache.get(cle);
  const resultat = calculer();
  cache.set(cle, resultat);
  return resultat;
}
let appels = 0;
assert.equal(
  memoiser("zero", () => {
    appels++;
    return 0;
  }),
  0,
);
assert.equal(
  memoiser("zero", () => {
    appels++;
    return 42;
  }),
  0,
);
assert.equal(appels, 1);
assert.equal(
  memoiser("faux", () => false),
  false,
);
assert.equal(
  memoiser("vide", () => ""),
  "",
);
```

Le cache peut stocker des valeurs falsy sans recalcul. Le contrat reste limité à une clé : si le calcul dépend d'autres paramètres, ils doivent faire partie de la clé ou du contexte explicitement documenté.
