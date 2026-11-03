---
stability: stable
---

> **SCÈNE CRAZYDEVS : tournoi de Konoha :** si tu tries 10 000 combattants comme si tu cherchais un seul nom dans une liste de 12, l'arène devient un gag. Ici, la complexité est le nombre de combats que ton algorithme impose.

# EXO IA MENTEUSE : module 10_algorithms

Temps : ~10 min. Format court, seul ou en binôme.

## Snippet IA plausible

L'assistant te propose ce code, l'air confiant :

```js
function fib(n) {
  if (n < 2) return n;
  return fib(n - 1) + fib(n - 2);
} // 'assez rapide'
```

Il ajoute : _"C'est propre, testé, prod-ready."_

## Ta question unique

**Où est la faille ?**

Prends 5 minutes. Écris ta réponse **sans** relancer l'IA. Nomme :

1. Le comportement observable qui trompe (pourquoi ça a l'air correct).
2. Le vrai problème (technique, sécurité, complexité, ou sémantique).
3. La correction minimale que **toi** tu apporterais.

## Piste de correction (à ne lire qu'après)

> Pour cette implémentation avec `F(0) = 0` et `F(1) = 1`, le nombre d'appels récursifs vérifie `T(n) = 2 × F(n + 1) − 1`. Pour `n = 50`, cela représente **40 730 022 147 appels** : ce n'est pas mathématiquement impossible, mais le coût rend cette approche inadaptée à un usage courant. La complexité est `Θ(φ^n)` ; `O(2^n)` est une borne supérieure correcte mais moins précise, pas une estimation serrée.

### Vérification complémentaire

```js
function fibIterative(n) {
  if (!Number.isSafeInteger(n) || n < 0) {
    throw new RangeError("n doit être un entier sûr positif ou nul");
  }
  let a = 0n;
  let b = 1n;
  for (let i = 0; i < n; i += 1) {
    [a, b] = [b, a + b];
  }
  return a;
}

console.log(fibIterative(10)); // 55n
```

Cette implémentation renvoie un `BigInt`, car la suite dépasse rapidement la précision entière exacte des `number`. Elle effectue `n` itérations ; le coût de chaque addition `BigInt` dépend toutefois de la taille des valeurs manipulées.

## Pourquoi cet exo

En 2026, l'IA génère du code **plausible** plus vite qu'elle ne le vérifie.
Le métier n'est plus d'écrire ; c'est de **repérer la faille** dans une
suggestion qui a l'air correcte. Ce drill de 10 min, une fois par module,
te transforme de consommateur en pilote.
