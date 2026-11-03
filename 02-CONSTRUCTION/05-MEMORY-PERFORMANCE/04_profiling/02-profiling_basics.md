---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [constraints_injectees, decision_organisationnelle]
anti_recipe_key: constraints_injectees+decision_organisationnelle
transfer_distance: low
assessment_role: instructional_checkpoint
---

**SCÈNE CRAZYDEVS : Prison Break :** le tunnel fuit lentement. Personne ne voit la panne au premier tour. Puis la cellule se remplit. Une fuite mémoire est souvent exactement aussi discrète.

> **CrazyDevs : jauge de chakra :** si tu optimises sans mesurer, tu dépenses ton chakra sur le mauvais ennemi. Mesure d’abord, attaque ensuite.

# Profiling basics : mesurer avant de toucher

Temps de lecture ~8 min

Tu as un code lent. Ton instinct te dit que c'est la boucle au milieu.
Ton instinct a tort. Il a presque toujours tort.

Le profiling, c'est remplacer l'instinct par des données.
Avant de changer une ligne, tu mesures. Après avoir changé, tu remesures. C'est tout.

---

## 1) L'OUTIL DE BASE : `performance.now()`

`Date.now()` donne les millisecondes depuis 1970. C'est pour les timestamps.
`performance.now()` donne les microsecondes depuis le lancement de la page. C'est pour mesurer.

```js
// mauvais : précision en ms, pas assez fin
const start = Date.now();
doSomething();
console.log(Date.now() - start); // "3ms":et si c'est 0.7ms ? tu verras 0

// correct : précision sub-milliseconde
const start = performance.now();
doSomething();
const duration = performance.now() - start;
console.log(`${duration.toFixed(3)}ms`); // "0.712ms":là tu vois quelque chose
```

La différence compte dès que t'as des fonctions rapides.
Si t'utilises `Date.now()`, tout ce qui prend moins d'1ms est invisible.

---

## 2) `console.time()` : LE RACCOURCI

Même principe, syntaxe plus simple. Utile pour des mesures rapides pendant le dev.

```js
// Naruto veut savoir combien de temps ça prend de passer en mode Sage
console.time("transformation");

for (let i = 0; i < 100_000; i++) {
  transformerEnMode(i);
}

console.timeEnd("transformation");
// "transformation: 47.231ms"
```

Avantage : minimal, pas de variable start/end.
Limite : tu ne récupères pas la valeur pour la comparer ou la logger.

```js
// version avancée : console.timeLog pour mesurer des étapes intermédiaires
console.time("mission-naruto");

chargerChakra();
console.timeLog("mission-naruto", "chakra chargé"); // "mission-naruto: 12ms chakra chargé"

invoquerRasengan();
console.timeLog("mission-naruto", "rasengan prêt"); // "mission-naruto: 38ms rasengan prêt"

frapper();
console.timeEnd("mission-naruto"); // "mission-naruto: 41ms"
```

Là tu vois que `chargerChakra` prend 12ms et `invoquerRasengan` prend 26ms.
Le problème est dans le rasengan. Pas dans le chargement.

---

## 3) BENCHMARK PROPRE : PLUSIEURS RUNS

Un seul run, c'est du bruit. Le GC, le JIT, un autre onglet Chrome : tout peut fausser.
Tu mesures minimum 10 fois. Tu prends la médiane, pas la moyenne.

```js
// Walter White benchmark ses recettes avant de les scaler
function benchmark(label, fn, runs = 10) {
  const times = [];

  // warm-up : le JIT a besoin de quelques runs pour optimiser
  for (let i = 0; i < 3; i++) fn();

  // mesures réelles
  for (let i = 0; i < runs; i++) {
    const start = performance.now();
    fn();
    times.push(performance.now() - start);
  }

  times.sort((a, b) => a - b);
  const median = times[Math.floor(runs / 2)];
  const min = times[0];
  const max = times[runs - 1];

  console.log(
    `[${label}] median: ${median.toFixed(3)}ms | min: ${min.toFixed(3)}ms | max: ${max.toFixed(3)}ms`,
  );
}

// comparer deux implémentations
const data = Array.from({ length: 10_000 }, (_, i) => i);

benchmark("for loop", () => {
  let sum = 0;
  for (let i = 0; i < data.length; i++) sum += data[i];
});

benchmark("reduce", () => {
  data.reduce((acc, n) => acc + n, 0);
});

// résultat possible :
// [for loop] median: 0.041ms | min: 0.038ms | max: 0.112ms
// [reduce]  median: 0.089ms | min: 0.081ms | max: 0.241ms
```

Le `for` classique gagne ici. Pas parce que `reduce` est mauvais : parce que sur des petits tableaux, l'overhead de créer une closure à chaque step coûte quelque chose.
Sur 1M d'éléments, la différence s'efface. Voilà pourquoi on mesure.

---

## 4) LE PIÈGE DU JIT

Le moteur JS optimise le code au fur et à mesure de son exécution.
Les premiers appels d'une fonction sont plus lents que les suivants.

```js
function calculerDegats(attaque, defense) {
  return Math.max(0, attaque - defense) * 1.5;
}

// premier appel : le moteur interprète
console.time("run 1");
calculerDegats(100, 40);
console.timeEnd("run 1"); // "run 1: 0.089ms"

// après 1000 appels : le moteur a compilé et optimisé
for (let i = 0; i < 1000; i++) calculerDegats(100, 40);

console.time("run 1001");
calculerDegats(100, 40);
console.timeEnd("run 1001"); // "run 1001: 0.003ms"
```

C'est pour ça que le benchmark ci-dessus fait un warm-up de 3 runs avant de mesurer.
Sans ça, tes chiffres sont faussés par l'optimisation JIT en cours.

---

## 5) MESURER EN PRODUCTION : `performance.mark` et `performance.measure`

En prod, tu ne mets pas de `console.time` partout. Tu utilises l'API de marqueurs.

```js
// Rick Grimes mesure combien de temps ça prend pour sécuriser le camp
performance.mark("securisation-debut");

await verifierPerimetre();
performance.mark("perimetre-ok");

await compterSurvivants();
performance.mark("survivants-ok");

performance.measure("temps-perimetre", "securisation-debut", "perimetre-ok");
performance.measure("temps-survivants", "perimetre-ok", "survivants-ok");
performance.measure(
  "securisation-totale",
  "securisation-debut",
  "survivants-ok",
);

const mesures = performance.getEntriesByType("measure");
mesures.forEach((m) => {
  console.log(`${m.name}: ${m.duration.toFixed(2)}ms`);
});

// "temps-perimetre: 234.12ms"
// "temps-survivants: 89.44ms"
// "securisation-totale: 323.56ms"
```

Ces marqueurs apparaissent aussi dans le DevTools Performance tab.
C'est comme laisser des repères sur la carte avant de partir en mission.

---

## EXERCICES

## EXO 1 : LA SUPPLY CHAIN DE WALTER

Walter White a trois fonctions dans sa supply chain : `preparerIngredients`, `cuire`, `conditionner`.
Il veut savoir laquelle est le goulot d'étranglement.

```js
function preparerIngredients(quantite) {
  let total = 0;
  for (let i = 0; i < quantite * 1000; i++) total += Math.sqrt(i);
  return total;
}

function cuire(lot) {
  let resultat = lot;
  for (let i = 0; i < 500_000; i++) resultat = resultat * 0.9999 + 0.0001;
  return resultat;
}

function conditionner(jutsu) {
  return JSON.parse(
    JSON.stringify({ jutsu, timestamp: Date.now(), batch: Math.random() }),
  );
}
```

Mesure les trois avec au moins 5 runs chacune.
Identifie laquelle est la plus lente.
Propose une hypothèse sur pourquoi.

---

## EXO 2 : DEUX FAÇONS DE CHERCHER

Tu as une liste de 50 000 joueurs. Tu dois trouver un joueur par son nom.

```js
const joueurs = Array.from({ length: 50_000 }, (_, i) => ({
  id: i,
  nom: `Joueur_${i}`,
  score: Math.floor(Math.random() * 100),
}));

// version A : chercher dans un tableau
function chercherDansTableau(joueurs, nom) {
  return joueurs.find((j) => j.nom === nom);
}

// version B : chercher dans une Map (à toi de la construire)
const joueurMap = new Map(joueurs.map((j) => [j.nom, j]));

function chercherDansMap(map, nom) {
  return map.get(nom);
}
```

Benchmark les deux sur 100 recherches de `"Joueur_49999"`.
Explique la différence de performance avec les concepts de complexité.

(indice : O(n) vs O(1))

---

## EXO 3 : LE WARM-UP QUI CHANGE TOUT

Prends la fonction suivante :

```js
function analyserMatchNaruto(techniques) {
  return techniques
    .filter((t) => t.chakra > 50)
    .map((t) => ({ ...t, degats: t.chakra * t.multiplicateur }))
    .reduce((acc, t) => acc + t.degats, 0);
}

const techniques = Array.from({ length: 1000 }, (_, i) => ({
  nom: `Technique_${i}`,
  chakra: Math.random() * 100,
  multiplicateur: Math.random() * 3,
}));
```

Mesure cette fonction sans warm-up, puis avec 100 appels de warm-up avant.
Note la différence. Est-ce significative ? Pourquoi ?

---

## RÉSUMÉ

`performance.now()` donne la précision sub-milliseconde que `Date.now()` n'a pas.
Un seul run ne veut rien dire : mesure 10 fois minimum, prends la médiane.
Le JIT optimise pendant l'exécution : sans warm-up, tes premiers runs sont trop lents.
`performance.mark` et `performance.measure` fonctionnent en prod et dans DevTools.
Le profiling remplace l'instinct. L'instinct t'envoie toujours au mauvais endroit.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.

### Vérification observable : critères de réussite

Prépare trois vérifications : cas nominal, cas limite et cas invalide. Écris avant l’exécution l’assertion attendue pour « Profiling basics : mesurer avant de toucher », puis conserve le résultat et explique tout écart.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:performance -->

## Repère visuel utile : Lire un profil CPU

```text
charge représentative
       |
       v
profil collecté
       |
       v
temps total vs temps propre
       |
       v
fonction dominante
       |
       v
une hypothèse d’optimisation
       |
       v
mesure de confirmation
```

<!-- AF-LESSON-PROFILE: performance -->

## Repères de décision

- **Pourquoi :** La performance influence l'expérience utilisateur et le coût d'exploitation. Il faut repérer le goulot réel avant de changer l'algorithme, le cache ou la mémoire.
- **Quand l’utiliser / quand l’éviter :** Mesure avant toute optimisation. Utilise profiling et benchmark sur une charge représentative ; évite un micro-benchmark qui n'observe pas le chemin de production.
- **Limites :** Un benchmark local ne prédit pas exactement la production. Les caches chauds, le GC, le matériel, la concurrence et la distribution des données peuvent changer le résultat.

## Mécanisme : la version sans magie

Établis une baseline, profile, identifie le coût dominant, change une seule variable, relance plusieurs fois et compare quantiles et mémoire.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Profiling basics : mesurer avant de toucher** se rattache à ce cas concret : Sur Kintana, la liste des demandes ou l'agrégation des créneaux peut devenir lente à mesure que le nombre de demandes augmente.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Trouver le coût dominant avec un profil

**Mission liée à « Profiling basics : mesurer avant de toucher » :** Exécute un parcours Kintana reproductible, capture un profil et distingue temps total, temps propre et attente. Choisis une seule piste d’optimisation étayée par le profil.

**Livrable :** Profil annoté, hypothèse principale et expérience de confirmation.

**Critères d’acceptation :** Le parcours est stable ; le profil est interprété avec ses limites ; la correction cible une zone dominante et conserve le comportement.

**Transfert obligatoire :** Le point le plus visible n’est pas causal : formule une expérience qui peut réfuter ton hypothèse.
