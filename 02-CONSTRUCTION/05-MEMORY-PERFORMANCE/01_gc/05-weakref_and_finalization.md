---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L4
perturbation_modes: [fausse_piste, changement_contexte]
anti_recipe_key: fausse_piste+changement_contexte
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : prolongation au stade :** deux solutions ont l'air équivalentes jusqu'à ce que l'une épuise l'équipe au bout de 90 minutes. La mémoire et la performance se voient souvent dans la durée, pas dans la première démo.

# 04 : WeakRef & FinalizationRegistry : quand tu veux "peut-être garder"

Temps de lecture ~5 min

Une référence normale garde en vie. Une `WeakRef` dit : "si personne d'autre ne le tient, tu peux le jeter".

## WeakRef

```js
let shinobi = { id: 1, name: "Naruto" };
const ref = new WeakRef(shinobi);

shinobi = null; // plus de référence forte
// à un moment, le GC collecte
ref.deref(); // undefined (peut-être)
```

**Peut-être** : le moment du GC n'est pas garanti. Ne base **jamais** ta logique métier là-dessus.

## Cas d'usage réel

Cache d'objets lourds indexés par ID, où tu acceptes de recharger si le GC est passé :

```js
const cache = new Map(); // id -> WeakRef
function getShinobi(id) {
  const ref = cache.get(id);
  const s = ref?.deref();
  if (s) return s;
  const fresh = loadShinobi(id);
  cache.set(id, new WeakRef(fresh));
  return fresh;
}
```

Piège : `Map` garde ses **clés** en vie. Utilise `WeakMap` si les clés sont des objets.

## FinalizationRegistry

Callback quand un objet est GC'd :

```js
const reg = new FinalizationRegistry((token) => {
  console.log("collected", token);
});
reg.register(shinobi, "shinobi-1");
```

Utilité rare : libérer une ressource externe (handle fichier, socket) liée à un objet JS.

## Ce que l'analogie cache

Le callback n'est **jamais** garanti d'être appelé (fin de process, GC skippé, etc.). C'est un signal opportuniste, pas un destructor.

## Mission

Écris un cache WeakRef pour des `Image`, mesure le taux de miss après pression mémoire (crée et jette 10000 objets pour forcer le GC).

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.
