---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [decision_organisationnelle, regression]
anti_recipe_key: decision_organisationnelle+regression
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Function factory : usine à fonctions

Temps de lecture ~5 min

On va créer des fonctions **qui fabriquent d'autres fonctions**. C'est comme une usine à clones : mais version JS, sans les implications éthiques.

---

## 1) QU'EST-CE QU'UNE FUNCTION FACTORY ?

Une function factory est une **fonction qui retourne une autre fonction**. Elle permet de créer plein de fonctions similaires sans réécrire le même code à la main.

```javascript
function makePlayer(name, hp) {
  return function attack() {
    console.log(`${name} attaque avec ${hp} hp!`);
  };
}

let bobyAttack = makePlayer("Boby", 100);
let elonAttack = makePlayer("Elon", 200);

bobyAttack(); // Boby attaque avec 100 hp!
elonAttack(); // Elon attaque avec 200 hp!
```

Chaque appel à `makePlayer` crée une **nouvelle fonction indépendante**, avec ses propres valeurs de `name` et `hp` verrouillées dedans.

---

## 2) POURQUOI C'EST PUISSANT ?

- Chaque fonction garde **sa propre mémoire** grâce à la closure
- Tu fabriques des fonctions **sur mesure** sans copier-coller
- Ton scope global reste propre : pas de dizaines de fonctions redondantes qui traînent
- Pattern utilisé partout : factories, builders, event listeners, middleware...

> C'est la différence entre faire 10 sandwichs à la main et avoir une machine qui les fait pour toi : à la demande, avec les ingrédients que tu choisis.

---

## 3) TERMES TECHNIQUES

**Closure** : une fonction qui se souvient des variables de son environnement parent, même après que celui-ci ait terminé son exécution.

**Factory** : une fonction qui produit d'autres fonctions (ou objets) à la demande, selon les paramètres qu'on lui passe.

```text
makePlayer("Boby", 100) → nouvelle fonction avec "Boby" et 100 verrouillés
makePlayer("Elon", 200) → nouvelle fonction avec "Elon" et 200 verrouillés
```

Ces deux fonctions **ne se connaissent pas**. Modifier l'une ne touche pas l'autre.

---

## MISSION FACTORY

## La Team Factory

1. Crée une fonction `makeWeapon(name, damage)` qui retourne une fonction `useWeapon()` affichant :

```text
"NomDeLArme attaque avec X points de dégâts"
```

2. Crée 2 armes avec `makeWeapon` et teste leurs attaques

3. Fais tourner l'usine : crée un tableau de données d'armes et utilise `map` pour générer un tableau de fonctions

```javascript
let weaponData = [
  { name: "Épée", damage: 50 },
  { name: "Arc", damage: 30 },
  { name: "Hache", damage: 70 },
];

// Utilise map pour créer un tableau de fonctions useWeapon
```

4. Teste toutes les armes en boucle et observe comment chaque fonction garde son propre `name` et `damage`

```javascript
// Ton code ici
```

> Chaque fonction créée est un **clone indépendant**. Même mémoire parente, univers séparés. La factory a fait son travail : maintenant les clones vivent leur vie.

---

## RÉSUMÉ

Une factory (usine) est une fonction qui retourne une autre fonction. Chaque appel à la factory crée une closure indépendante : son propre environnement mémoire, ses propres valeurs capturées.

C'est la base des currying, des middlewares, des configurations dynamiques. Une factory + une closure = un comportement paramétrable sans objet ni classe.

Si tu veux des fonctions avec des comportements différents basés sur le même template : utilise une factory.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.

<!-- AF-LESSON-PROFILE: functions -->

## Repères de décision

- **Pourquoi :** Des fonctions avec un contrat clair rendent les règles testables et réutilisables sans coupler le domaine à l'interface, au réseau ou au stockage.
- **Quand l’utiliser / quand l’éviter :** Isole une transformation ou une décision métier dans une fonction. Utilise composition ou application partielle quand plusieurs étapes sont réellement réutilisées ; évite d'empiler des abstractions pour une seule ligne.
- **Limites :** Une fonction pure ne supprime pas les problèmes de concurrence, d'entrée invalide ou d'effet externe. Une pipeline trop découpée peut devenir plus difficile à suivre qu'un bloc simple.

## Mécanisme : la version sans magie

Définis les entrées, la sortie et les effets. Garde la décision pure autant que possible et place réseau, temps et persistance derrière des adaptateurs.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Function factory : usine à fonctions** se rattache à ce cas concret : Les règles de statut et d'éligibilité Kintana doivent donner le même résultat pour les mêmes entrées, quel que soit l'écran ou le canal qui les appelle.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Règle métier réutilisable dans Kintana

> **Statut Kintana : prolongement facultatif, à construire progressivement.** Les missions des leçons Function basics, `map`/`filter` et Function factory réutilisent la même règle métier ; ne crée pas trois projets. Termine d'abord la pratique locale de la leçon. Tu peux noter les entrées et sorties attendues à la main ; les tests unitaires automatisés et les deux parcours complets seront repris après le module [Testing](../../../02-CONSTRUCTION/03-TESTING/README.md). La mission Kintana ne constitue pas une gate de Fundamentals.

> **Arc Capsule Corp. / DBZ :** une fonction est un petit moteur. Tu veux qu'elle fasse une chose clairement, pas qu'elle déclenche une transformation surprise.

**Mission liée à « Function factory : usine à fonctions » :** Isole une règle Kintana liée à la leçon (normalisation, filtrage, calcul ou création de handler). Appelle-la depuis deux parcours distincts et vérifie que le résultat ne dépend ni du DOM ni de l'ordre d'appel caché.

**Livrable :** une fonction métier documentée, des tests unitaires de contrat et deux points d'appel qui réutilisent la même règle.

**Critères d’acceptation :** mêmes entrées et même état initial donnent le même résultat ; les effets sont injectés ou isolés ; les entrées invalides sont explicites ; le nom reflète le contrat.

**Transfert facultatif, à la reprise :** ajoute une règle métier qui nécessite une dépendance variable (date, taux ou service). Choisis entre paramètre, factory et composition, puis justifie après avoir étudié Function factory. Tu peux d'abord comparer les options sur papier ; aucune intégration ni gate supplémentaire n'est requise.
