---
perishability_id: PER-0076

stability: "perissable"
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [changement_contexte, decision_organisationnelle]
anti_recipe_key: changement_contexte+decision_organisationnelle
transfer_distance: medium
assessment_role: instructional_checkpoint
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_url: "https://nodejs.org/docs/v22.23.4/api/perf_hooks.html"
source_type: "primary"
review_interval: "3 mois"
review_due: "2027-02-03"
source_scope: 'Documentation officielle ou source primaire consultée en rapport avec « Benchmark kit : savoir si ton code est rapide, pas juste "pas lent en apparence" ». La référence soutient le concept/version explicitement indiqué dans cette ressource ; ce statut ne certifie pas chaque phrase, chaque snippet ni l''exécution locale. Les affirmations empiriques et les API versionnées restent limitées au scope ci-dessous.'
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "OFFICIAL_SOURCE_IDENTITY_AND_CONCEPT_SCOPE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

> (attention) **OUTIL PÉRISSABLE** : le tooling JS bouge chaque année. Traite ce module comme une REVUE, pas une bible. `Principes durables` en bas.

> **Périssable : valable 2026.** L'outil change vite ; le principe (build, format, lint, package) est **intemporel**.

# Benchmark kit : savoir si ton code est rapide, pas juste "pas lent en apparence"

Temps de lecture ~8 min

"Je pense que cette version est plus rapide" c'est une opinion. Un benchmark (mesure de performance comparative) c'est un fait. La différence entre les deux, c'est souvent la différence entre optimiser ce qui compte vraiment et perdre du temps sur un détail qui change rien.

---

## 1) POURQUOI "ÇA A L'AIR RAPIDE" NE SUFFIT PAS

```js
// Deux façons de filtrer un tableau, laquelle est la plus rapide ?
function filtrerAvecFilter(tableau) {
  return tableau.filter((x) => x > 10);
}

function filtrerAvecBoucle(tableau) {
  const resultat = [];
  for (let i = 0; i < tableau.length; i++) {
    if (tableau[i] > 10) resultat.push(tableau[i]);
  }
  return resultat;
}
```

Sans mesure, t'as que des intuitions. Et les intuitions sur la perf JS sont souvent fausses : le moteur JS optimise (JIT : compilation à la volée) des patterns différemment selon le contexte, la taille des données, le navigateur ou la version de Node.

**Risque réel :** passer 2 heures à "optimiser" une fonction qui représente 0.01% du temps d'exécution total, pendant qu'une vraie lenteur ailleurs (une requête réseau, une boucle imbriquée sur de grosses données) reste invisible parce que jamais mesurée. C'est l'erreur de Vegeta contre Cell : il s'entraîne sur les mauvaises choses pendant que la vraie menace grossit en silence. Mesure d'abord, optimise ensuite.

---

## 2) LA BASE : PERFORMANCE.NOW()

```js
// performance.now() retourne un timestamp en millisecondes,
// avec une précision bien plus fine que Date.now()
const debut = performance.now();

// ... du code à mesurer ...

const fin = performance.now();
console.log(`Durée : ${fin - debut} ms`);
```

**Technique :** `performance.now()` est conçu spécifiquement pour mesurer des durées, pas pour donner une heure absolue. Sa précision (généralement sub-milliseconde) le rend plus fiable que `Date.now()` pour comparer deux exécutions rapprochées.

Ce mécanisme de base existe déjà ailleurs dans le curriculum (module performance). Ici, on l'emballe dans un outil réutilisable, pour pas réécrire ce chrono à chaque fois.

---

## 3) CONSTRUIRE LE BENCHMARK KIT

```js
// benchmark.js

function mesurer(nom, fn, iterations = 1000) {
  // on "chauffe" le moteur JS avant de mesurer pour de vrai
  // (le JIT optimise le code après quelques exécutions, sans warmup
  // tu mesures aussi le coût de cette optimisation, ce qui fausse le résultat)
  for (let i = 0; i < 10; i++) fn();

  const debut = performance.now();

  for (let i = 0; i < iterations; i++) {
    fn();
  }

  const fin = performance.now();
  const dureeTotale = fin - debut;
  const dureeMoyenne = dureeTotale / iterations;

  return {
    nom,
    iterations,
    dureeTotale_ms: Number(dureeTotale.toFixed(3)),
    dureeMoyenne_ms: Number(dureeMoyenne.toFixed(6)),
  };
}

function comparer(candidats, iterations = 1000) {
  // candidats : [{ nom: "...", fn: () => {...} }, ...]
  const resultats = candidats.map((c) => mesurer(c.nom, c.fn, iterations));

  // trie du plus rapide au plus lent
  resultats.sort((a, b) => a.dureeMoyenne_ms - b.dureeMoyenne_ms);

  const plusRapide = resultats[0];

  return resultats.map((r) => ({
    ...r,
    facteurVsPlusRapide: Number(
      (r.dureeMoyenne_ms / plusRapide.dureeMoyenne_ms).toFixed(2),
    ),
  }));
}

module.exports = { mesurer, comparer };
```

```js
// Utilisation : comparer les deux fonctions de filtrage vues plus haut
const { comparer } = require("./benchmark");

const tableauTest = Array.from({ length: 10000 }, (_, i) => i);

const resultats = comparer(
  [
    { nom: "filter natif", fn: () => filtrerAvecFilter(tableauTest) },
    { nom: "boucle manuelle", fn: () => filtrerAvecBoucle(tableauTest) },
  ],
  5000,
);

console.table(resultats);
// console.table affiche un tableau lisible directement dans le terminal
```

**Pourquoi le warmup compte :** un moteur JS moderne recompile (JIT) ton code en code machine optimisé après l'avoir vu s'exécuter plusieurs fois. Sans warmup, ta mesure inclut le coût de cette compilation initiale, ce qui peut totalement fausser la comparaison entre deux fonctions.

**Pourquoi le facteur comparatif compte :** "fonction A : 0.002ms, fonction B : 0.0035ms" c'est difficile à interpréter d'un coup d'oeil. "fonction B est 1.75x plus lente que fonction A" se comprend immédiatement.

---

## 4) LE PIÈGE DE LA MESURE UNIQUE

```js
// MAUVAIS : une seule mesure, peu fiable
const debut = performance.now();
maFonction();
const fin = performance.now();
console.log(fin - debut); // peut varier énormément d'une exécution à l'autre
```

```text
UNE SEULE EXÉCUTION --> sensible au bruit système (autres process, garbage collector qui se déclenche, etc.)
PLUSIEURS ITÉRATIONS MOYENNÉES --> lisse ce bruit, donne une mesure représentative
```

**Qui casse une conclusion de benchmark :** mesurer une seule fois, tomber sur un moment où le garbage collector (nettoyeur de mémoire) se déclenche pile pendant la mesure, et conclure à tort qu'une fonction est lente alors que c'était un produit ponctuel. Le kit ci-dessus moyenne sur des centaines ou milliers d'itérations pour éviter ce piège.

---

## 5) CE QUE LE BENCHMARK NE TE DIT PAS

```text
le benchmark te dit --> QUELLE version est plus rapide, ET DE COMBIEN
le benchmark te dit PAS --> SI cette différence compte vraiment dans ton contexte réel
```

```js
// fonction A : 0.001 ms
// fonction B : 0.002 ms
// B est "2x plus lente" en facteur, mais la différence ABSOLUE est de 0.001 ms
// Sur un appel UNIQUE dans ton app, cette différence est invisible pour l'utilisateur

// Le vrai réflexe : mesurer le facteur ET se demander
// "cette fonction tourne combien de fois dans mon vrai usage ?"
```

**Risque réel :** optimiser une fonction "2x plus rapide" qui ne représente que 0.001ms sur un total de 2000ms de traitement. Le gain réel est invisible, mais le temps passé à l'optimiser, lui, est bien réel.

---

## EXERCICES

EXO 1 : Le duel chronométré :
Implémente le kit ci-dessus, puis compare deux façons de construire une chaîne de caractères à partir d'un tableau de 10 000 éléments : concaténation avec `+=` dans une boucle, vs `array.join("")`. Note le facteur de différence.

EXO 2 : Le piège du warmup :
Modifie temporairement ton kit pour désactiver le warmup (les 10 exécutions avant la vraie mesure). Compare les résultats avec et sans warmup sur la même fonction. Explique en une phrase ce qui a changé et pourquoi.

EXO 3 : Le gain qui compte pas :
Trouve ou invente deux implémentations où l'une est mesurée "3x plus rapide" que l'autre, mais où la différence absolue est inférieure à 0.01ms. Calcule combien de fois il faudrait appeler cette fonction dans une vraie app pour que la différence devienne perceptible (au-delà d'1ms cumulé, par exemple).

---

## RÉSUMÉ

Un benchmark transforme une intuition ("ça a l'air rapide") en mesure vérifiable. `performance.now()` donne la précision nécessaire, mais une seule mesure reste peu fiable : il faut moyenner sur plusieurs itérations et chauffer le moteur JS avant de mesurer pour de vrai. Le facteur comparatif rend les résultats lisibles d'un coup d'oeil, mais un facteur élevé sur une différence absolue minuscule ne veut souvent rien dire en pratique. Mesurer avant d'optimiser, toujours, sinon tu optimises à l'aveugle ce qui te semble lent au lieu de ce qui l'est vraiment. Dans Breaking Bad, Walter White ne touche jamais à une formule sans en valider les paramètres. Il mesure, compare, ajuste. Toi pareil avec ton code.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.

## Transfert production : benchmark qui ne ment pas

**Exercice.** Compare deux implémentations de la même fonction sur jeux petits, moyens et grands. Fixe runtime/matériel, seed, warm-up, nombre de répétitions et métrique (médiane, dispersion, p95 si la distribution le justifie). Mesure aussi allocation et mémoire si elles changent la décision.

**Vérification.** La fonction est identique, le résultat est contrôlé par un test d'équivalence, les mesures sont répétées et les données/hardware sont consignés. Une différence inférieure au bruit ou mesurée sur un seul run n'autorise pas une conclusion de performance.

**Transfert.** Utiliser avant/après pour un refactoring ou une optimisation ; le profiling local identifie un coût, la production détermine si ce coût affecte réellement les utilisateurs.

<!-- AF-LESSON-PROFILE: performance -->

## Repères de décision

- **Pourquoi :** La performance influence l'expérience utilisateur et le coût d'exploitation. Il faut repérer le goulot réel avant de changer l'algorithme, le cache ou la mémoire.
- **Quand l’utiliser / quand l’éviter :** Mesure avant toute optimisation. Utilise profiling et benchmark sur une charge représentative ; évite un micro-benchmark qui n'observe pas le chemin de production.
- **Limites :** Un benchmark local ne prédit pas exactement la production. Les caches chauds, le GC, le matériel, la concurrence et la distribution des données peuvent changer le résultat.

## Mécanisme : la version sans magie

Établis une baseline, profile, identifie le coût dominant, change une seule variable, relance plusieurs fois et compare quantiles et mémoire.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Benchmark kit : savoir si ton code est rapide, pas juste "pas lent en apparence"** se rattache à ce cas concret : Sur Kintana, la liste des demandes ou l'agrégation des créneaux peut devenir lente à mesure que le nombre de demandes augmente.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Construire un benchmark reproductible

**Mission liée à « Benchmark kit : savoir si ton code est rapide, pas juste "pas lent en apparence" » :** Choisis une opération Kintana, définis l’entrée, l’échauffement, le nombre de répétitions, la mesure et les conditions d’arrêt. Compare une baseline et une variante dans le même environnement.

**Livrable :** Script/protocole, données de mesure, dispersion et conclusion prudente.

**Critères d’acceptation :** Les conditions sont identiques ; médiane et dispersion sont rapportées ; les résultats ne sont pas extrapolés au-delà du contexte testé.

**Transfert obligatoire :** La différence est inférieure au bruit mesuré : conclus que le benchmark ne permet pas de trancher.

## Références officielles utiles

> **Référence principale vérifiée le 2 novembre 2026 :** la première ressource de ce panneau, également enregistrée dans `source_url`, a été consultée pour le mécanisme versionné traité ici. Les autres liens sont des compléments officiels utiles ; ils ne constituent pas chacun une attestation indépendante de l’exemple du curriculum. Aucune référence ne prouve que l’exemple a été exécuté. Vérifie la version cible et teste dans ton environnement avant un usage réel.

- [Node.js : perf_hooks](https://nodejs.org/docs/v22.23.4/api/perf_hooks.html)
- [MDN : Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance)
