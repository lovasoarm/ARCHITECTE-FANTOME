---
stability: stable
---

> **SCÈNE CRAZYDEVS : jauge de chakra :** optimiser sans mesurer, c'est demander à Naruto de vider son chakra sans regarder la jauge. D'abord la mesure, ensuite le coup de génie ; sinon tu optimises peut-être le mauvais ralentissement.

# EXO IA MENTEUSE : module 08_memory_performance

Temps : ~10 min. Format court, seul ou en binôme.

## Snippet IA plausible

L'assistant te propose ce code, l'air confiant :

```js
const cache = {};
function get(k) {
  if (!cache[k]) cache[k] = fetch(k);
  return cache[k];
}
```

Il ajoute : _"C'est propre, testé, prod-ready."_

## Ta question unique

**Où est la faille ?**

Prends 5 minutes. Écris ta réponse **sans** relancer l'IA. Nomme :

1. Le comportement observable qui trompe (pourquoi ça a l'air correct).
2. Le vrai problème (technique, sécurité, complexité, ou sémantique).
3. La correction minimale que **toi** tu apporterais.

## Piste de correction (à ne lire qu'après)

> Stocker la Promise peut être intentionnel : cela mutualise les requêtes simultanées pour une même clé. Le défaut est que cet exemple ne définit ni contrat de cache, ni nettoyage des rejets, ni durée de conservation, ni limite de cardinalité. Une croissance mémoire illimitée est un risque si les clés sont nombreuses et gardées longtemps, pas une fuite garantie dans tous les contextes.

### Une correction possible : déduplication des appels en cours

```js
const pending = new Map();
async function get(k) {
  if (pending.has(k)) return pending.get(k);
  const promise = fetch(k);
  pending.set(k, promise);
  try {
    return await promise;
  } finally {
    if (pending.get(k) === promise) pending.delete(k);
  }
}
```

Cette variante ne conserve pas les résultats après la fin : elle mutualise uniquement les appels simultanés. Un cache de résultats est une autre politique et doit définir explicitement TTL, éviction, erreurs et clé.

## Pourquoi cet exo

En 2026, l'IA génère du code **plausible** plus vite qu'elle ne le vérifie.
Le métier n'est plus d'écrire ; c'est de **repérer la faille** dans une
suggestion qui a l'air correcte. Ce drill de 10 min, une fois par module,
te transforme de consommateur en pilote.
