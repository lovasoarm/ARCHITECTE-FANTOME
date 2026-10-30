---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [regression, transmission]
anti_recipe_key: regression+transmission
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Boolean logic : la logique qui pilote tout

Temps de lecture ~9 min

Chaque `if`, chaque `while`, chaque condition que tu écris repose sur un calcul booléen. Ce n'est pas de la philosophie : c'est de l'électronique. Un transistor soit passe du courant, soit pas. `true` ou `false`. C'est sur cette binarité que tourne ton code.

Comprendre la logique booléenne, c'est comprendre pourquoi certaines conditions marchent et d'autres te pètent silencieusement à la figure.

---

## 1) LES QUATRE OPÉRATEURS DE BASE

### AND (`&&`) : les deux doivent être vrais

```js
// Naruto peut attaquer seulement s'il a de l'énergie ET qu'il est transformé
const peutAttaquer = aDeEnergie && estTransforme;

// si le premier est false : JS ne regarde même pas le second
// c'est le short-circuit:il stoppe dès que c'est perdu
false && quelqueChoseDeCoûteux(); // quelqueChoseDeCoûteux() n'est jamais appelé
```

**Table de vérité AND :**

```text
true && true => true
true && false => false
false && true => false  // stoppe ici, ne va pas plus loin
false && false => false
```

### OR (`||`) : au moins un doit être vrai

```js
// le joueur marque si c'est un tir cadré OU une déviation malheureuse
const butValide = tirCadre || deviationAdverse;

// short-circuit inverse : stoppe dès que c'est gagné
true || quelqueChoseDeCoûteux(); // idem, jamais évalué
```

**Table de vérité OR :**

```text
true || true => true  // stoppe ici
true || false => true  // stoppe ici
false || true => true
false || false => false
```

### NOT (`!`) : inverse la valeur

```js
const estConnecte = true;
const estDeconnecte = !estConnecte; // false

// double négation : utile pour forcer un booléen
const valeurDouteuse = "Naruto";
!!valeurDouteuse; // true:convertit en vrai booléen
```

### XOR : l'un ou l'autre, mais pas les deux

JS n'a pas d'opérateur XOR logique natif, mais le bitwise `^` existe. Pour les booléens :

```js
// XOR maison : exactement un des deux doit être vrai
const xor = (a, b) => (a || b) && !(a && b);

xor(true, false); // true:un seul est vrai
xor(true, true); // false:les deux sont vrais, c'est trop
xor(false, false); // false:aucun n'est vrai

// cas d'usage réel : un interrupteur qui toggle
// on veut que la lumière soit allumée si UN seul interrupteur est ON
const lumiere = xor(interrupteur1, interrupteur2);
```

---

## 2) LE SHORT-CIRCUIT : PAS QUE DE L'OPTIMISATION

Le short-circuit est utilisé partout comme raccourci d'écriture. C'est pratique. C'est aussi une source de bugs si tu ne sais pas ce qui se passe.

```js
// valeur par défaut avec ||
const pseudo = joueur.pseudo || "Anonyme";
// si joueur.pseudo est falsy (null, undefined, "", 0, false) => "Anonyme"

// PIÈGE : 0 est falsy
const score = joueur.score || 100;
// si score vaut 0 (joueur n'a pas encore marqué), il devient 100
// c'est faux:le joueur a un score, il vaut juste 0
```

**La solution : nullish coalescing `??`**

```js
// ?? ne remplace que null et undefined, pas les autres falsy
const score = joueur.score ?? 100;
// 0 reste 0:only null et undefined déclenchent le fallback
```

**Optional chaining `?.` + short-circuit**

```js
// accéder à une propriété qui peut ne pas exister
const ville = joueur?.profil?.adresse?.ville;
// si n'importe quel maillon est null/undefined => undefined, pas d'erreur

// combiné avec ??
const ville = joueur?.profil?.adresse?.ville ?? "Inconnue";
```

---

## 3) LES VALEURS FALSY ET TRUTHY : LE VRAI PIÈGE

JS ne travaille pas qu'avec des vrais booléens. N'importe quelle valeur peut être évaluée comme vraie ou fausse.

**Falsy : ces 7 valeurs sont considérées comme false**

```js
false;
0;
-0;
0n; // BigInt zéro
(""); // chaîne vide
null;
undefined;
NaN;
```

**Tout le reste est truthy**, y compris :

```js
[]; // tableau vide : truthy
({}); // objet vide : truthy
("0"); // chaîne non vide : truthy
1; // nombre non nul : truthy
```

```js
// le piège classique
if ([]) {
  console.log("tableau vide = truthy"); // s'exécute
}

if ([] == false) {
  console.log("mais == false aussi"); // s'exécute aussi
}
// JS fait de la coercition avec ==
// avec === ça ne passerait pas:utilise toujours ===
```

---

## 4) DE MORGAN : SIMPLIFIER LES CONDITIONS COMPLEXES

Deux règles qui permettent de réécrire n'importe quelle condition négative :

```text
!(A && B) <=> !A || !B
!(A || B) <=> !A && !B
```

```js
// version illisible
if (!(estAdmin && estActif)) {
  refuserAcces();
}

// version De Morgan:même logique, plus lisible
if (!estAdmin || !estActif) {
  refuserAcces();
}

// autre exemple : bloquer si pas ninja ET pas Hokage
if (!(estNinja || estHokage)) {
  bloquerEntree();
}
// devient :
if (!estNinja && !estHokage) {
  bloquerEntree();
}
```

C'est utile en code review. Si quelqu'un écrit `!(a && b)`, tu proposes `!a || !b`. Plus clair pour tout le monde.

---

## 5) PRIORITÉ DES OPÉRATEURS

```text
!       (NOT) : priorité supérieure
&&      (AND)
||      (OR)
??      (coalescence nullish) : même niveau de priorité que ||
```

`??` et `||` n'ont pas la même sémantique : `||` remplace toute valeur falsy, alors que `??` ne remplace que `null` et `undefined`. JavaScript interdit de mélanger `??` directement avec `&&` ou `||` sans parenthèses ; écris le groupement voulu.

```js
// && est évalué avant ||
const premier = true || (false && false); // true || false => true

// les parenthèses changent volontairement le groupement
const second = (true || false) && false; // true && false => false

const quota = 0;
const avecOr = quota || 10; // 10 : 0 est falsy
const avecNullish = quota ?? 10; // 0 : quota n'est ni null ni undefined

// exemple de mélange autorisé grâce aux parenthèses
const acces = (estAdmin || estSuperviseur) && compteActif;

// règle : lorsque tu combines plusieurs opérateurs logiques,
// parenthèse le groupement métier et teste les cas limites.
```

---

## EXERCICES

## EXO 1 : Le système d'accès de Fox River

La prison Fox River a un système d'accès électronique. Un garde peut ouvrir une porte si :

- il a un badge valide ET son shift est actif
- OU s'il est superviseur (bypass total)
- MAIS jamais si une alerte de sécurité est active (override de tout)

Implémenter la fonction `peutOuvrirPorte(garde)` qui retourne `true` ou `false`.

```js
const garde1 = {
  badge: true,
  shiftActif: true,
  superviseur: false,
  alerteActive: false,
};
const garde2 = {
  badge: false,
  shiftActif: true,
  superviseur: true,
  alerteActive: false,
};
const garde3 = {
  badge: true,
  shiftActif: true,
  superviseur: true,
  alerteActive: true,
};
// garde1 => true, garde2 => true, garde3 => false
```

(indice : commence par l'alerte : si elle est active, tout s'arrête là)

---

## EXO 2 : Détecteur de valeurs suspectes

Walter White reçoit des données de ses distributeurs. Certaines valeurs sont invalides et doivent être rejetées. Une valeur est rejetée si elle est falsy OU si c'est un tableau vide OU si c'est un objet sans clés.

Écrire `estValide(valeur)` sans utiliser de library externe.

```js
estValide(0); // false:falsy
estValide(""); // false:falsy
estValide([]); // false:tableau vide
estValide({}); // false:objet vide
estValide([1, 2]); // true
estValide({ q: 5 }); // true
estValide("heisenberg"); // true
```

---

## EXO 3 : Toggle de features

Trapsoul Radio a un système de feature flags. Chaque feature est active si son flag est `true` ET que la région du shinobi est supportée. Sauf si le shinobi est premium (bypass des restrictions région). Mais les features dépréciées sont toujours désactivées.

Écrire `featureActive(feature, user)` en utilisant De Morgan là où c'est applicable.

---

## RÉSUMÉ

`&&`, `||`, `!`, et `??` : c'est avec ça que chaque condition de ton code est calculée. Le short-circuit n'est pas qu'une optimisation, c'est un comportement que tu dois anticiper. Les valeurs falsy sont un piège classique, surtout `0`, `[]`, et `{}` qui se comportent différemment selon le contexte. De Morgan te donne un outil pour rendre les conditions négatives lisibles. Ajoute des parenthèses dès que tu mixes `&&` et `||`.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.

## Vérification autonome : logique et court-circuit

Place ce bloc dans `verify-boolean.mjs`, puis exécute `node verify-boolean.mjs`. Il vérifie les invariants qui se perdent souvent dans une condition de production : valeurs falsy, De Morgan et absence d'effet lorsque le court-circuit s'applique.

```js
import assert from "node:assert/strict";

assert.equal(true && true, true);
assert.equal(true && false, false);
assert.equal(false || true, true);
assert.equal(!0, true);
assert.equal(Boolean("0"), true);
assert.equal(Boolean(""), false);
assert.equal(!(true && false), !true || !false);

let calls = 0;
const disabled = false;
disabled && (calls += 1);
assert.equal(calls, 0, "le côté droit ne doit pas être évalué");

console.log("OK boolean logic");
```

**Acceptation :** sortie `OK boolean logic`, code de sortie 0 ; expliquer pourquoi `'0'` est truthy et pourquoi la ligne avec `disabled` ne modifie pas `calls`. Si l'apprenant ne peut pas exécuter Node, il doit dérouler chaque assertion manuellement et marquer la preuve comme simulation papier.

**Lien et transfert :** ces règles alimentent les guards TypeScript/JavaScript, les permissions et les branches de gestion d'erreurs ; une condition vraie ne garantit pas à elle seule l'autorisation métier.

## Vérification de la règle d'accès : cas métier

La condition de l'exercice Fox River doit appliquer l'alerte comme refus prioritaire, puis le badge + shift ou le statut superviseur. Une formulation de référence est :

```js
const peutOuvrirPorte = (garde) =>
  !garde.alerteActive &&
  (garde.superviseur || (garde.badge && garde.shiftActif));
```

**Table de décision minimale :** badge valide + shift actif + pas d'alerte → autorisé ; superviseur + pas d'alerte → autorisé ; alerte active → refus même pour le superviseur ; badge seul sans shift → refus. Le bypass superviseur ne doit jamais contourner l'alerte prioritaire.

**Vérification :** exécute la fonction avec les trois objets de l'exercice, puis ajoute les cas `superviseur=true, alerteActive=true` et `badge=true, shiftActif=false`. Attendu : `true, true, false, false, false`. Cette table de décision est aussi la preuve de revue métier.
