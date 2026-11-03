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

### Vérification observable : critères de réussite

Prépare trois vérifications : cas nominal, cas limite et cas invalide. Écris avant l’exécution l’assertion attendue pour « 04 : WeakRef & FinalizationRegistry : quand tu veux "peut-être garder" », puis conserve le résultat et explique tout écart.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:performance -->

## Repère visuel utile : Ne pas confondre WeakRef et garantie de durée de vie

```text
état métier : référence forte
              |
              v
cache secondaire : référence faible
              |
              v
objet éventuellement collecté
              |
              v
repli si la valeur est absente
              |
              v
aucune logique métier ne dépend du GC
```

<!-- AF-LESSON-PROFILE: performance -->

## Repères de décision

- **Pourquoi :** La performance influence l'expérience utilisateur et le coût d'exploitation. Il faut repérer le goulot réel avant de changer l'algorithme, le cache ou la mémoire.
- **Quand l’utiliser / quand l’éviter :** Mesure avant toute optimisation. Utilise profiling et benchmark sur une charge représentative ; évite un micro-benchmark qui n'observe pas le chemin de production.
- **Limites :** Un benchmark local ne prédit pas exactement la production. Les caches chauds, le GC, le matériel, la concurrence et la distribution des données peuvent changer le résultat.

## Mécanisme : la version sans magie

Établis une baseline, profile, identifie le coût dominant, change une seule variable, relance plusieurs fois et compare quantiles et mémoire.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **04 : WeakRef & FinalizationRegistry : quand tu veux "peut-être garder"** se rattache à ce cas concret : Sur Kintana, la liste des demandes ou l'agrégation des créneaux peut devenir lente à mesure que le nombre de demandes augmente.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Utiliser WeakRef sans en faire une garantie métier

**Mission liée à « 04 : WeakRef & FinalizationRegistry : quand tu veux "peut-être garder" » :** Évalue si un cache secondaire Kintana peut tolérer la disparition d’une référence faible. Garde les données nécessaires au fonctionnement dans des références fortes et traite la finalisation comme opportuniste.

**Livrable :** ADR de cache, comportement lorsque la référence a disparu et tests du chemin de repli.

**Critères d’acceptation :** Aucune logique essentielle ne dépend de FinalizationRegistry ; l’absence de collecte immédiate n’est pas un échec ; le cache reste correct si l’entrée disparaît.

**Transfert obligatoire :** Le cache est vidé à un moment imprévisible : démontre que la réponse métier reste correcte.
