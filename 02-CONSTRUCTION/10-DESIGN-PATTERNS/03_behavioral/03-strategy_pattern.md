---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [constraints_injectees, changement_echelle]
anti_recipe_key: constraints_injectees+changement_echelle
transfer_distance: high
assessment_role: instructional_checkpoint
---

**SCÈNE CRAZYDEVS : Attack on Titan :** une formation militaire n’est pas un uniforme. Un pattern n’est pas une décoration. Il n’a de valeur que lorsqu’il résout la contrainte pour laquelle il existe.

> **CrazyDevs : briefing de mission :** ce concept doit survivre au moment où quelqu’un te demande « pourquoi ? » en plein chaos. Garde l’explication technique exacte, puis donne-lui une image qu’on peut raconter demain.

# Strategy pattern

Temps de lecture ~8 min

Tu code un perso qui attaque. Aujourd'hui c'est un coup de poing. Demain un coup de pied. Après-demain un kamehameha.

Si tu gères ça avec des `if/else` partout : chaque nouvelle attaque te fait toucher le code existant.

Strategy règle ça : chaque algo devient une fonction interchangeable, et le contexte choisit laquelle utiliser à l'exécution.

Avantage : ajouter une stratégie = ajouter une fonction, zéro modif du code existant.
Inconvénient : si t'as 2 stratégies à vie, c'est overkill : un `if/else` suffit largement.

---

## 1) LE PROBLÈME : LE IF/ELSE QUI GONFLE

```js
// Goku attaque. Quelle attaque ? ça dépend du mode.
function attack(power, mode) {
  if (mode === "kamehameha") {
    return power * 1.5;
  } else if (mode === "kaioken") {
    return power * 2;
  } else if (mode === "spirit_bomb") {
    return power * 3;
  }
  // chaque nouvelle technique = une nouvelle branche ici
  throw new Error("technique inconnue");
}
```

Ça marche pour 3 techniques. Maintenant Vegeta arrive avec son Final Flash, Piccolo avec son Makankosappo, et Gohan avec sa Masenko.

```text
mode "kamehameha" --> branche 1
mode "kaioken"   --> branche 2
mode "spirit_bomb" --> branche 3
nouveau perso   --> nouvelle vague de branches
```

Le `if/else` devient une god-function : tout le monde y touche, personne ne veut la lire, et un jour quelqu'un casse `kamehameha` en ajoutant `final_flash`.

---

## 2) LA SOLUTION : CHAQUE TECHNIQUE EST UNE FONCTION INDÉPENDANTE

```js
// chaque stratégie respecte la même signature : (power) => degats
// même contrat, comportement différent
const strategies = {
  kamehameha: (power) => power * 1.5,
  kaioken: (power) => power * 2,
  spirit_bomb: (power) => power * 3,
};

// attack ne connaît AUCUNE technique : il sait juste exécuter une stratégie
function attack(power, strategyKey) {
  const strategy = strategies[strategyKey];

  if (!strategy) {
    throw new Error(`technique inconnue : ${strategyKey}`);
  }

  return strategy(power);
}

console.log(attack(100, "kamehameha")); // 150
console.log(attack(100, "kaioken")); // 200
```

Ajouter le Final Flash de Vegeta :

```js
strategies.final_flash = (power) => power * 2.8;
// attack() n'a pas bougé d'une ligne
```

```text
contexte (attack) --> délègue --> stratégie (kamehameha, kaioken, final_flash...)
```

Le contexte ne sait pas COMMENT chaque technique calcule ses dégâts. Il sait juste QUI appeler. La logique de calcul est isolée, testable seule, remplaçable sans toucher au reste.

**Risque réel** : si une stratégie ne respecte pas le contrat (genre elle retourne un objet au lieu d'un number, ou elle a besoin d'un paramètre en plus que les autres n'ont pas), tout le système qui appelle `attack()` plante sans prévenir. Le contrat implicite (même signature, même type de retour) doit être respecté par TOUTES les stratégies, sinon Strategy devient un piège à bugs silencieux.

---

## 3) STRATEGY AVEC DU CONTEXTE : QUAND L'ALGO A BESOIN DE PLUS QU'UN NOMBRE

Dans la vraie vie, une stratégie a souvent besoin de connaître l'état complet du combat, pas juste un `power`.

```js
// chaque stratégie reçoit l'état complet du combattant et de la cible
const combatStrategies = {
  kamehameha: (attacker, defender) => {
    const baseDamage = attacker.power * 1.5;
    // si la cible a moins de chakra que l'attaquant, bonus de 20%
    const bonus = defender.chakra < attacker.chakra ? 1.2 : 1;
    return Math.round(baseDamage * bonus);
  },

  // version défensive : protège plus mais frappe moins
  defensive_stance: (attacker, defender) => {
    return Math.round(attacker.power * 0.6);
  },
};

function executeAttack(attacker, defender, strategyKey) {
  const strategy = combatStrategies[strategyKey];
  if (!strategy) throw new Error("technique inconnue");

  const damage = strategy(attacker, defender);
  return { ...defender, hp: defender.hp - damage };
}
```

```text
Goku (attacker) --> executeAttack --> strategy(attacker, defender) --> damage --> nouveau Vegeta (defender)
```

Toujours zéro mutation : `executeAttack` retourne un NOUVEAU `defender`, jamais modifié sur place. Strategy + immutabilité = combo qui revient tout au long de `02-CONSTRUCTION/10-DESIGN-PATTERNS`.

---

## 4) STRATEGY VS SIMPLE FONCTION PASSÉE EN PARAMÈTRE

Question légitime : `array.sort((a, b) => a - b)` c'est déjà du Strategy non ?

Oui. Littéralement. `sort` est le contexte, la fonction de comparaison est la stratégie.

```js
const players = [
  { name: "Messi", goals: 35 },
  { name: "Mbappé", goals: 44 },
];

// stratégie 1 : trier par buts décroissants
players.sort((a, b) => b.goals - a.goals);

// stratégie 2 : trier par nom alphabétique
players.sort((a, b) => a.name.localeCompare(b.name));
```

Le pattern Strategy "officiel" avec un objet `strategies = {...}` devient utile quand :

- tu as PLUSIEURS stratégies nommées qu'on choisit dynamiquement (par config, par input shinobi)
- tu veux pouvoir LISTER les stratégies disponibles (`Object.keys(strategies)`)
- les stratégies doivent être stockées, sérialisées, ou injectées depuis l'extérieur

Si c'est juste "une fonction qu'on passe une fois" : une callback suffit, pas besoin de sortir le nom "Strategy Pattern" en réunion.

---

## EXERCICES

## EXO 1 : le sélecteur de jutsu de Naruto

Naruto a 4 jutsus : `rasengan`, `kage_bunshin`, `rasenshuriken`, `sage_mode`.

Construis un objet `jutsus` où chaque clé est une fonction `(chakra) => degats`. Chaque jutsu a un multiplicateur différent (à toi de choisir, mais `rasenshuriken` doit être le plus violent et `kage_bunshin` le plus faible).

Écris une fonction `useJutsu(chakra, jutsuName)` qui :

- lance l'attaque correspondante
- si `jutsuName` n'existe pas dans `jutsus`, lève une erreur `"jutsu inconnu"`

(indice : ne fais AUCUN `if` sur le nom du jutsu dans `useJutsu`, seulement la vérification d'existence)

---

## EXO 2 : changer de stratégie pendant le match

Un attaquant de foot a 3 styles de tir : `puissance`, `precision`, `lob`.

Crée un objet `tireurs` avec ces 3 stratégies, chacune retournant une probabilité de but entre 0 et 1 selon la distance du but (`distance` en mètres, passé en paramètre).

Règle métier :

- `puissance` est meilleure de près (moins de 10m)
- `precision` est stable peu importe la distance
- `lob` est meilleure de loin (plus de 20m), nulle de près

Écris `tirer(distance, style)` qui retourne la probabilité, puis simule 3 tirs avec 3 styles différents sur la même distance et affiche lequel a le plus de chances de marquer.

---

## EXO 3 : le piège du contrat cassé

Voici un code fourni :

```js
const strategies = {
  rapide: (power) => power * 1.2,
  lente: (power, bonus) => power * 1.5 + bonus, // <-- bug caché ici
};

function attack(power, key) {
  return strategies[key](power);
}

console.log(attack(100, "rapide")); // ok
console.log(attack(100, "lente")); // ???
```

Sans exécuter le code : explique pourquoi `attack(100, "lente")` ne plante PAS (aucune erreur JS) mais retourne un résultat FAUX. Quelle est la valeur exacte retournée, et pourquoi ?

Ensuite, corrige `strategies.lente` pour qu'elle respecte le même contrat que les autres (une seule entrée : `power`).

---

## RÉSUMÉ

Strategy, c'est déléguer le "comment" à une fonction interchangeable, et garder le "qui appelle" complètement ignorant des détails. Le vrai gain c'est l'ajout sans modification : une nouvelle technique, un nouveau tri, un nouveau calcul, ça rentre sans toucher au code qui orchestre. Le vrai danger c'est le contrat silencieux : si une stratégie ne respecte pas la même signature que les autres, tout pète en douceur, sans erreur visible.

## CHECKPOINT DE PROFONDEUR : variation D : transfert négatif

<!-- AF-DIAGRAM:patterns -->

## Repère visuel utile : Évaluer un pattern sur un besoin réel

```text
besoin stable
    |
    v
une variante ? ---- non ---> solution simple
    | oui
    v
contrat commun
    |
 +--+--+
 v     v
impl A impl B
  \    /
   tests communs
```

## Transfert production : stratégie et arbitrage d'algorithme

**Scénario.** Le calcul de frais de livraison dépend du pays, du poids et du type de service. Une stratégie permet de remplacer le calcul, mais le choix ne doit pas permettre d'appliquer une stratégie non autorisée.

**Exercice.** Crée trois stratégies de tarification derrière un contrat commun ; sélectionne-les à partir d'une configuration validée et conserve la stratégie utilisée dans la trace de décision.

**Vérification.** Chaque stratégie possède la même suite de contrat, valeurs limites et erreur explicite. Ajoute un test où une stratégie est absente et un test de changement de configuration.

**Transfert.** Le pattern s'applique aux algorithmes interchangeables ; si la sélection ne varie jamais, une fonction simple suffit.

<!-- AF-LESSON-PROFILE: patterns -->

## Repères de décision

- **Pourquoi :** Un pattern donne un vocabulaire et une structure à un problème récurrent ; mal choisi, il ajoute indirection et coût de maintenance.
- **Quand l’utiliser / quand l’éviter :** Utilise un pattern quand le problème se répète et qu'il clarifie les variations. Préfère la solution directe tant que tu n'as pas deux comportements réellement différents.
- **Limites :** Un pattern ne garantit ni extensibilité ni qualité. Un mauvais niveau d'abstraction peut rendre le flux plus difficile à comprendre que le code initial.

## Mécanisme : la version sans magie

Identifie la variation, les responsabilités et les dépendances ; compare une solution simple à une solution structurée ; mesure l'effet sur test et changement.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Strategy pattern** se rattache à ce cas concret : Kintana peut avoir plusieurs canaux de notification ou politiques de dispatch. Le pattern ne doit apparaître que si ces variantes existent vraiment.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Évaluer un pattern sur un besoin réel

> **Arc Capsule Corp. / DBZ :** un design pattern est un outil, pas une transformation magique. S'il ajoute plus de pièces qu'il ne résout de problèmes, laisse-le dans le coffre.

**Mission liée à « Strategy pattern » :** Applique la notion à une variation Kintana : canal de notification, stratégie d'affectation ou fournisseur. Écris d'abord une version simple, puis une alternative avec le pattern ; compare lisibilité, testabilité et coût d'ajout d'une seconde variante.

**Livrable :** deux implémentations ou un ADR argumenté, tests de comportement commun et note de suppression si le pattern n'apporte rien.

**Critères d’acceptation :** la variation est démontrée ; l'interface n'expose que le contrat utile ; les tests vérifient les comportements et non les classes internes ; le coût de complexité est déclaré.

**Transfert obligatoire :** Supprime la deuxième variante. Décide si le pattern doit rester ou être retiré, et explique pourquoi.
