---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [changement_contexte, transmission]
anti_recipe_key: changement_contexte+transmission
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : clan des ninjas :** une abstraction peut être une technique secrète… ou une montagne de parchemins pour un problème de trois lignes. Ton défi est de savoir laquelle des deux tu construis.

# Currying : une fonction, un argument, toujours

Temps de lecture ~8 min

Une fonction qui prend 3 arguments d'un coup ne peut pas s'insérer dans un `pipe`.
Le currying transforme ça : au lieu de `f(a, b, c)`, tu obtiens `f(a)(b)(c)`.
Une fonction qui retourne une fonction qui retourne une fonction.

L'avantage concret : tu peux "pré-remplir" les premiers arguments et obtenir une fonction spécialisée, prête à être composée.

---

## 1) LA MÉCANIQUE

```js
// fonction normale : 2 arguments
function multiplier(facteur, valeur) {
  return facteur * valeur;
}

multiplier(2, 50); // 100
multiplier(3, 50); // 150

// version curryfiée : une fonction qui retourne une fonction
function multiplier(facteur) {
  return function (valeur) {
    return facteur * valeur;
  };
}

// ou en arrow
const multiplier = (facteur) => (valeur) => facteur * valeur;

multiplier(2)(50); // 100
multiplier(3)(50); // 150

// mais surtout : tu peux créer des versions spécialisées
const doubler = multiplier(2); // facteur fixé à 2
const tripler = multiplier(3); // facteur fixé à 3

doubler(50); // 100
tripler(50); // 150
doubler(80); // 160
```

---

## 2) POURQUOI C'EST UTILE : LA SPÉCIALISATION

Le vrai pouvoir : créer des fonctions spécialisées à partir d'une fonction générale.

```js
// fonction générale de filtrage
const filtrerParSeuil = (seuil) => (joueurs) =>
  joueurs.filter((j) => j.buts >= seuil);

// spécialisations
const filtrerMeilleursButteurs = filtrerParSeuil(50);
const filtrerButteursRaisonnables = filtrerParSeuil(30);
const filtrerTout = filtrerParSeuil(0);

// chaque spécialisation est une fonction unaire : se compose directement
pipe(filtrerMeilleursButteurs, calculerScore, trierParScore)(joueurs);
```

```js
// pattern fréquent : currying + composition pour construire des pipelines flexibles
const ajouterChamp = (nomChamp, calculer) => (objet) => ({
  ...objet,
  [nomChamp]: calculer(objet),
});

const ajouterScore = ajouterChamp(
  "score",
  (j) => j.buts * 0.5 + j.passes * 0.3,
);
const ajouterNiveau = ajouterChamp("niveau", (j) =>
  j.score > 50 ? "elite" : "standard",
);

pipe(ajouterScore, ajouterNiveau)(joueur);
```

---

## 3) `curry` AUTOMATIQUE : CURRYIFIER N'IMPORTE QUELLE FONCTION

Transformer manuellement chaque fonction c'est pénible. On peut automatiser.

```js
// curry générique : transforme f(a,b,c) en f(a)(b)(c)
function curry(fn) {
  return function curryé(...args) {
    if (args.length >= fn.length) {
      // on a tous les arguments : on exécute
      return fn(...args);
    }
    // il manque des arguments : on retourne une fonction qui attend la suite
    return (...autresArgs) => curryé(...args, ...autresArgs);
  };
}

// une fonction normale
function calculerDegats(force, defense, multiplicateur) {
  return Math.max(0, (force - defense) * multiplicateur);
}

const calculerDegatsC = curry(calculerDegats);

// appel classique
calculerDegatsC(80, 30, 1.5); // 75

// appel curryifié
calculerDegatsC(80)(30)(1.5); // 75

// spécialisation partielle
const attaquantForce80 = calculerDegatsC(80);
const vs30Defense = attaquantForce80(30);

vs30Defense(1.0); // 50
vs30Defense(1.5); // 75
vs30Defense(2.0); // 100
```

---

## 4) CURRYING EN PRATIQUE : CONFIG D'API

Le currying brille sur les fonctions de config, de requête, de transformation.

```js
// construction de requêtes pour la Prison Break API
const creerRequete = (methode) => (endpoint) => (corps) => ({
  method: methode,
  url: `https://api.foxriver.prison${endpoint}`,
  body: corps ? JSON.stringify(corps) : undefined,
  headers: { "Content-Type": "application/json" },
});

const GET = creerRequete("GET");
const POST = creerRequete("POST");
const DELETE = creerRequete("DELETE");

// endpoints spécialisés
const getPrisonniers = GET("/prisonniers");
const getSection = GET("/sections");
const ajouterPrisonnier = POST("/prisonniers");

// utilisation
const requêteListePrisonniers = getPrisonniers(null);
const requêteAjoutMichael = ajouterPrisonnier({
  nom: "Scofield",
  cellule: "A08",
});
```

```js
// logger curryifié
const log = (niveau) => (contexte) => (message) => ({
  niveau,
  contexte,
  message,
  timestamp: new Date().toISOString(),
});

const error = log("ERROR");
const warn = log("WARN");
const info = log("INFO");

const errorAuth = error("AUTH");
const infoDispatch = info("DISPATCH");

errorAuth("Token expiré"); // { niveau: "ERROR", contexte: "AUTH", ... }
infoDispatch("Mission reçue"); // { niveau: "INFO", contexte: "DISPATCH", ... }
```

---

## 5) LE CAS QUI CASSE : `fn.length` ET LES ARGUMENTS PAR DÉFAUT

La fonction `curry` automatique se base sur `fn.length` pour savoir combien d'arguments la fonction attend. Les arguments avec valeur par défaut ne comptent pas.

```js
function maFonction(a, b, c = 10) {
  return a + b + c;
}

maFonction.length; // 2:JS ne compte pas c car il a une valeur par défaut

const curryée = curry(maFonction);
curryée(1)(2); // exécuté avec c = 10 (défaut), résultat 13
curryée(1)(2)(5); // aussi 13:curry pense que c'est 2 args, le 3e est ignoré
```

Fix : évite les valeurs par défaut dans les fonctions que tu curries. Passe toujours les valeurs explicitement.

---

## 6) CURRY VS PARTIAL APPLICATION

Nuance importante, couverte en détail dans `06-partial_application.md`.

```text
curry :       f(a, b, c) => f(a)(b)(c)
           transforme la signature

partial application : f(a, b, c) avec a fixé => g(b, c)
           pré-remplit des arguments
```

```js
// curry : chaque argument est séparé
const additionner = (a) => (b) => a + b;
additionner(10)(5); // 15

// partial application : on fixe certains args, le reste ensemble
const additionnerA10 = additionner.bind(null, 10);
additionnerA10(5); // 15

// en FP, curry est plus composable car chaque appel retourne une fonction unaire
```

---

## EXERCICES

## EXO 1 : curryifier à la main

Transforme ces fonctions en versions curryfiées manuellement (sans `curry` générique).

```js
// 1. filtrerParZone(chevaliers, zone) -> les chevaliers de cette zone
// 2. calculerBonusCL(aCL, score) -> score + 30 si aCL, sinon score
// 3. formaterNom(titre, prenom, nom) -> "Titre Prénom NOM"

// Exemples attendus après currying :
// const chevaliersDuNord = filtrerParZone(chevaliers, "nord") -> devient filtrerParZone("nord")(chevaliers)
// const avecBonusCL = calculerBonusCL(true) -> avecBonusCL(85) === 115
// const formatGuerrier = formaterNom("Guerrier")("Leon") -> formatGuerrier("García") === "Guerrier Leon GARCÍA"
```

---

## EXO 2 : la curry générique

Implémente ta propre version de `curry(fn)`.
Vérifie qu'elle fonctionne sur :

- une fonction à 2 args
- une fonction à 3 args
- l'appel partiel (ex: `curryée(1)(2)` et `curryée(1, 2)` donnent le même résultat)

---

## EXO 3 : le pipeline Ballon d'Or curryifié

```js
const candidats = [
  { nom: "Messi", buts: 45, passes: 20, aCL: true, equipe: "Inter Miami" },
  { nom: "Mbappé", buts: 52, passes: 15, aCL: false, equipe: "Real Madrid" },
  { nom: "Haaland", buts: 60, passes: 8, aCL: true, equipe: "Man City" },
];

// Construis un pipeline avec des fonctions curryfiées :
// filtrerParEquipe(equipe)(joueurs)
// ajouterScoreBonus(bonusButs, bonusPasses)(joueurs)  <- par joueur dans le map
// prendreTop(n)(joueurs)

// Puis compose-les avec pipe pour obtenir le top 2 des joueurs pas du Real Madrid
// avec bonusButs=0.6 et bonusPasses=0.4
```

---

## EXO 4 : le dispatcher Garo curryifié

```js
// Construis une fonction dispatcherMission curryfiée qui :
// prend : chevalier -> niveau_horreur -> zone -> retourne un objet mission complet

// La version spécialisée pour Leon doit s'appeler missionLeon
// missionLeon(4)("nord") doit retourner :
// { chevalier: "Leon", niveauHorreur: 4, zone: "nord", urgence: "critique" }
// (urgence : "critique" si niveauHorreur >= 4, "standard" sinon)
```

---

## RÉSUMÉ

Le currying transforme `f(a, b, c)` en `f(a)(b)(c)` : une fonction, un argument à la fois.
L'avantage concret : créer des fonctions spécialisées en fixant certains arguments, prêtes à être composées.
`curry()` automatique généralise ça sur n'importe quelle fonction, en se basant sur `fn.length`.
Limite : les arguments avec valeur par défaut cassent `fn.length` : évite-les dans les fonctions curryfiées.
Curry + pipe : le duo de base du FP en JS.

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.

### Transfert : changer de contexte

Applique le mécanisme de « Currying : une fonction, un argument, toujours » à un traitement de journaux d’audit plutôt que des événements de mesure. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:functional -->

## Repère visuel utile : Règle pure pour les transitions de demande

```text
état + rôle + action
        |
        v
  fonction pure
        |
  +-----+-----+
  v           v
nouvel état  erreur métier
  |
  v
adaptateur DB / événement
```

<!-- AF-LESSON-PROFILE: functional -->

## Repères de décision

- **Pourquoi :** La programmation fonctionnelle aide à isoler des transformations déterministes et à réduire les effets de bord qui rendent les bugs difficiles à reproduire.
- **Quand l’utiliser / quand l’éviter :** Utilise fonctions pures et immutabilité pour les règles partagées ou testées souvent. N'impose pas un style fonctionnel complexe quand une boucle lisible est plus claire.
- **Limites :** Créer une copie profonde peut coûter cher ; une fonction pure peut toujours être lente ou incorrecte ; composition excessive et currying gratuit rendent le code illisible.

## Mécanisme : la version sans magie

Sépare calcul et effet, rends les dépendances explicites, transforme les données sans mutation partagée et compose des fonctions au contrat clair.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Currying : une fonction, un argument, toujours** se rattache à ce cas concret : Les transitions de demande Kintana doivent être calculées de façon déterministe avant écriture en base ou notification.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Règle pure pour les transitions de demande

> **Arc DBZ / Capsule Corp. :** une règle métier doit être testable sans brancher tout le vaisseau. Garde les effets derrière une frontière.

**Mission liée à « Currying : une fonction, un argument, toujours » :** Isole une transition Kintana en fonction pure : entrée (état, rôle, action), sortie (nouvel état ou erreur). Appelle l'adaptateur de persistance seulement après validation de la transition.

**Livrable :** une fonction pure, tests table-driven, test de non-mutation et un adaptateur qui applique le résultat.

**Critères d’acceptation :** le calcul n'accède ni à l'horloge ni au réseau ; les entrées invalides sont explicites ; l'état d'origine reste intact ; le code d'effet n'est pas mélangé à la règle.

**Transfert obligatoire :** Ajoute une règle qui dépend de l'heure courante. Rends cette dépendance explicite et teste les limites de fuseau et de date.
