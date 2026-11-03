---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [changement_contexte, temps_limite]
anti_recipe_key: changement_contexte+temps_limite
transfer_distance: low
assessment_role: diagnostic_mastery
---

# Mise en pratique : Type coercion : conversion implicite / explicite

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

## TYPE

Micro-drill : première passe JavaScript natif

## Niveau

[OK] Fondamental

## CONTEXTE

JavaScript convertit certaines valeurs en booléen lorsqu'une condition est évaluée. Une progression à `0` peut ainsi être confondue avec une valeur absente si tu écris un test trop large.

## APPLICATION : SANS REACT NI JSX

Travaille dans un simple fichier `coercion.js` exécuté avec Node.js ou dans la console du navigateur.

1. Déclare `const progress = 0`.
2. Affiche le résultat de `Boolean(progress)` puis celui de `progress && "Afficher la progression"`.
3. Teste la fonction avec `25`, puis avec `null` ; ne réaffecte pas la constante `progress`.
4. Écris une fonction `describeProgress(value)` qui distingue explicitement `null` / `undefined` de `0` et d'un nombre positif.
5. Explique pourquoi `0` est falsy, mais reste une valeur valide dans une progression.

Exemple de départ :

```js
const progress = 0;
console.log(Boolean(progress)); // false
console.log(progress && "Afficher la progression"); // 0

function describeProgress(value) {
  if (value === null || value === undefined) {
    return "Aucune progression renseignée";
  }
  return `Progression : ${value}%`;
}

console.log(describeProgress(progress)); // Progression : 0%
```

## Critère de réussite

- [ ] Le fichier fonctionne en JavaScript natif, sans dépendance de framework.
- [ ] Tu observes que `0 && "texte"` renvoie `0`.
- [ ] `describeProgress(0)` ne traite pas zéro comme une absence.
- [ ] Tu peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi `if (progress)` ne permet-il pas à lui seul de distinguer une progression à zéro d'une progression absente ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ta barre de progression ne ment plus.

Tu viens de distinguer une valeur valide mais falsy d'une valeur absente. Aucun composant ni commit n'est nécessaire pour cette première passe.

> **Statut :** cette micro-pratique est requise dans la première passe Fundamentals. Seuls le checkpoint de profondeur et l’approfondissement produit Kintana ci-dessous sont différés.

> **Statut : approfondissement facultatif.**

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.

## Approfondissement différé : livraison produit Kintana : règle métier et état

> **Statut : différé, facultatif pour la première passe.** Termine d’abord la pratique de base de cette page. Reviens à cette intégration après avoir étudié les notions préalables et lorsque le dépôt Kintana et son environnement sont réellement disponibles. Cette tâche ne constitue pas une gate de progression Fundamentals. Si l’environnement manque, reporte-la ; une simulation ne vaut pas une livraison intégrée.

> **Contexte de pratique :** relie le principe de cette leçon à une règle métier de Kintana, sans supposer que le projet est déjà installé.

Le micro-exercice de cette page constitue la pratique de première passe. La livraison Kintana ci-dessous est un approfondissement produit différé : elle réutilise le principe dans un contexte plus large, mais ne conditionne pas la validation de cette notion ni la progression dans Fundamentals. Elle améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 51-type_coercion_minimini_projet » :** Dans Kintana, isole la valeur ou la transformation concernée dans une fonction métier ; vérifie l’état avant/après, les entrées invalides et l’absence de mutation involontaire.

Dans `domain/requests/`, normalise une quantité reçue sous forme de chaîne. Compare conversion explicite, entrée vide, chaîne invalide et valeur déjà numérique ; aucune conversion ne doit changer silencieusement le sens métier.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate de cette livraison différée (pas gate de progression Fundamentals) :** un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
