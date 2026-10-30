---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L4
perturbation_modes: [fausse_piste, transmission]
anti_recipe_key: fausse_piste+transmission
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Bit manipulation : manipuler les données à l'os

Temps de lecture ~9 min

La plupart des devs n'ont jamais écrit une seule ligne de manipulation de bits. Puis un jour ils tombent sur un bug de permissions, un système de flags, ou un algo de compression : et ils réalisent qu'ils ne comprennent pas ce qui se passe sous leur code.

Les bits interviennent dans des permissions compactes, des masques réseau, des flags d'état, des formats d'image et certains algorithmes. En JavaScript, attention : les opérateurs bitwise convertissent les nombres en entiers signés sur 32 bits avant le calcul. Pour une donnée qui dépasse cette représentation, il faut choisir explicitement `BigInt` ou une autre représentation au lieu de compter sur une conversion implicite.

---

## 1) LES BASES : CE QU'EST UN BIT

Un nombre entier en mémoire est une séquence de bits. En JS, les opérations bitwise travaillent sur des entiers 32 bits.

```text
13 en binaire : 0000 0000 0000 0000 0000 0000 0000 1101
                         ^ ^ ^
                         8 4 1 = 13
```

**Convertir :**

```js
(13).toString(2); // "1101":décimal vers binaire
parseInt("1101", 2); // 13  :binaire vers décimal
```

---

## 2) LES 6 OPÉRATEURS BITWISE

### AND `&` : les deux bits doivent être 1

```js
// 1101 (13)
// 1010 (10)
// ----
// 1000 (8)

13 & 10; // 8

// Usage classique : masquage:garder seulement certains bits
const MASK_ROUGE = 0xff0000; // 1111 1111 0000 0000 0000 0000
const couleur = 0xff6b35; // RGB #FF6B35 sur 24 bits
const rouge = (couleur & MASK_ROUGE) >> 16; // extraire le canal rouge
```

### OR `|` : au moins un bit est 1

```js
// 1010 (10)
// 0101 (5)
// ----
// 1111 (15)

10 | 5; // 15

// Usage : activer un flag
let permissions = 0b0000; // aucune permission
const LIRE = 0b0001;
const ECRIRE = 0b0010;

permissions = permissions | LIRE; // 0b0001:peut lire
permissions = permissions | ECRIRE; // 0b0011:peut lire et écrire
```

### XOR `^` : exactement un bit est 1

```js
// 1010 (10)
// 1100 (12)
// ----
// 0110 (6)

10 ^ 12; // 6

// XOR avec lui-même = 0:utilisé pour annuler
5 ^ 5; // 0

// XOR pour toggle : si le bit est 1, il passe à 0 et vice versa
let flag = 0b0101;
flag = flag ^ 0b0100; // toggle le bit 2 : 0b0101 ^ 0b0100 = 0b0001
```

### NOT `~` : inverse tous les bits

```js
~5; // -6 en JS (complément à deux)
~0; // -1

// usage courant : ~indexOf retourne 0 si non trouvé (falsy)
const liste = ["Rick", "le sniper", "Michonne"];
if (~liste.indexOf("le sniper")) {
  console.log("le sniper est dans le groupe");
}
// mais en pratique : utilise .includes():c'est plus lisible
```

### Left Shift `<<` : décale les bits vers la gauche

Chaque décalage d'un bit = multiplication par 2.

```js
1 << 0; // 1  = 1
1 << 1; // 2  = 1 * 2
1 << 2; // 4  = 1 * 4
1 << 3; // 8  = 1 * 8
1 << 10; // 1024 = 1 * 1024

// utile pour définir des flags proprement
const PERMISSIONS = {
  LIRE: 1 << 0, // 0001
  ECRIRE: 1 << 1, // 0010
  EXECUTER: 1 << 2, // 0100
  ADMIN: 1 << 3, // 1000
};
```

### Right Shift `>>` : décale vers la droite

Chaque décalage = division entière par 2.

```js
8 >> 1; // 4
8 >> 2; // 2
8 >> 3; // 1
```

---

## 3) SYSTÈME DE PERMISSIONS AVEC DES FLAGS

C'est l'usage le plus courant en prod. Un seul nombre entier encode plusieurs états indépendants.

```js
// chaque permission = un bit différent
const PERM = {
  LIRE: 0b0001, // 1
  ECRIRE: 0b0010, // 2
  SUPPRIMER: 0b0100, // 4
  ADMIN: 0b1000, // 8
};

// Activer une permission
const activer = (permissions, flag) => permissions | flag;

// Désactiver une permission
const desactiver = (permissions, flag) => permissions & ~flag;

// Vérifier si une permission est active
const aPermission = (permissions, flag) => (permissions & flag) !== 0;

// Toggle
const toggle = (permissions, flag) => permissions ^ flag;

// --- En action ---
let user = 0; // aucune permission

user = activer(user, PERM.LIRE); // 0001
user = activer(user, PERM.ECRIRE); // 0011

aPermission(user, PERM.LIRE); // true
aPermission(user, PERM.SUPPRIMER); // false:pas de permission suppression

user = desactiver(user, PERM.ECRIRE); // 0001:revient à lire seulement
```

Ce pattern est partout :

- permissions Unix (rwx = 3 bits)
- masques de configuration applicatifs, lorsque plusieurs options indépendantes doivent être compactées. Ce n'est pas une syntaxe CSS : `font-weight`, `font-style` et `text-decoration` sont des propriétés différentes.
- états de composants React
- options de configuration

---

## 4) PACKING RGB ET DISTINCTION AVEC RGBA

Une notation CSS `#RRGGBB` décrit trois canaux de 8 bits (24 bits au total). Un programme peut les empaqueter dans un entier pour faciliter certaines opérations ; cela ne signifie pas que le navigateur stocke toujours la couleur sous cette forme. RGBA ajoute un canal alpha (opacité) de 8 bits, donc 32 bits. Ici, le premier exemple traite uniquement RGB.

```js
// couleur #FF6B35 = rouge:255, vert:107, bleu:53
const rgb = (r, g, b) => (r << 16) | (g << 8) | b;

const orange = rgb(255, 107, 53); // 0xFF6B35 = 16 739 125 en décimal
// 255 << 16 = FF0000
// 107 << 8 = 006B00
// 53     = 000035
// OR ensemble => FF6B35

// Extraire les composantes
const rouge = (couleur) => (couleur >> 16) & 0xff;
const vert = (couleur) => (couleur >> 8) & 0xff;
const bleu = (couleur) => couleur & 0xff;

rouge(orange); // 255
vert(orange); // 107
bleu(orange); // 53
```

---

## 5) TRICKS D'ALGO AVEC LES BITS

### Vérifier si un nombre est une puissance de 2

`n & (n - 1)` retire le bit à 1 le plus faible. Pour une puissance de 2 strictement positive dans le domaine couvert, le résultat vaut zéro. La fonction ci-dessous borne explicitement l'entrée au domaine positif représentable sans perte par ce raisonnement sur les entiers signés 32 bits.

```js
const estPuissanceDe2 = (n) => {
  if (!Number.isInteger(n) || n < 1 || n > 0x80000000) return false;
  return (n & (n - 1)) === 0;
};

estPuissanceDe2(4); // true : 0100 & 0011 = 0
estPuissanceDe2(8); // true : 1000 & 0111 = 0
estPuissanceDe2(6); // false : 0110 & 0101 = 0100
estPuissanceDe2(2 ** 32); // false : hors domaine déclaré
```

### Compter les bits à 1 (popcount)

L'opérateur `>>>` est un décalage à droite avec remplissage par zéro. Ici, il permet de parcourir une valeur non signée sur 32 bits. La validation empêche qu'un nombre négatif ou fractionnaire soit silencieusement converti.

```js
const compterBits = (n) => {
  if (!Number.isInteger(n) || n < 0 || n > 0xffffffff) {
    throw new RangeError('n doit être un entier non signé sur 32 bits');
  }
  let value = n >>> 0;
  let count = 0;
  while (value !== 0) {
    count += value & 1;
    value >>>= 1;
  }
  return count;
};

compterBits(7); // 3 : 0111 => 3 bits à 1
compterBits(13); // 3 : 1101 => 3 bits à 1
compterBits(0xffffffff); // 32
```

### Swap sans variable temporaire : propriété pédagogique, pas recommandation de production

```js
// XOR swap démontre les propriétés algébriques de XOR.
let a = 5;
let b = 9;
a = a ^ b;
b = a ^ b;
a = a ^ b;
// résultat : a=9, b=5 (sur des entiers 32 bits)

// En code applicatif, la forme lisible est préférable :
[a, b] = [b, a];
```

**Piège terrain :** les opérations XOR convertissent leurs opérandes en entiers signés sur 32 bits. Elles ne préservent pas les fractions, les grands entiers ou les valeurs arbitraires. Utilise l'échange par destructuration pour des nombres généraux ; garde XOR swap comme exercice de compréhension, pas comme optimisation par défaut.

---

## EXERCICES

## EXO 1 : Le système de jutsu de Naruto

Chaque ninja a des capacités encodées dans un seul entier :

```js
const CAPACITES = {
  NINJUTSU: 1 << 0,
  TAIJUTSU: 1 << 1,
  GENJUTSU: 1 << 2,
  SENJUTSU: 1 << 3,
  KURAMA: 1 << 4,
};
```

Implémenter :

- `creerNinja(capacites)` : prend un tableau de flags, retourne l'entier encodé
- `peutUtiliser(ninja, capacite)` : retourne `true/false`
- `apprendreCapacite(ninja, capacite)` : retourne le nouveau ninja
- `perdCapacite(ninja, capacite)` : retourne le ninja sans cette capacité

---

## EXO 2 : Parser une couleur hex

Écrire `parseHex(hex)` qui prend une couleur au format `"#FF6B35"` et retourne `{ r, g, b }`. Écrire `toHex(r, g, b)` qui fait l'inverse. Utiliser uniquement des opérations bitwise.

---

## EXO 3 : Détecteur de configuration réseau

Un masque réseau est un entier 32 bits. Écrire `compterBitsReseau(masque)` qui compte le nombre de bits à 1 dans le masque (ex: `255.255.255.0` = 24 bits réseau).

---

## RÉSUMÉ

Les bits permettent d'encoder plusieurs états dans un seul entier. Le pattern flags + masques (`|` pour activer, `&` pour vérifier, `^` pour toggle, `& ~flag` pour désactiver) se retrouve dans les permissions, les couleurs, les options de config. Le shift `<<` construit des flags propres. Et XOR a des propriétés uniques : `a ^ a = 0`, `a ^ 0 = a` : ce sont les bases des algos de swap et de toggle. C'est du bas niveau, mais c'est du bas niveau qui s'utilise en prod.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.


## Vérification autonome : flags de permissions

Le test suivant confirme les invariants essentiels d'un masque binaire : ajouter un droit ne retire pas les autres, retirer un droit n'affecte pas les autres, et le test d'un flag reste indépendant. Place-le dans `verify-flags.mjs` et lance `node verify-flags.mjs`.

```js
import assert from 'node:assert/strict';

const READ = 1 << 0;
const WRITE = 1 << 1;
const ADMIN = 1 << 2;
let permissions = READ | WRITE;

assert.equal((permissions & READ) !== 0, true);
assert.equal((permissions & ADMIN) !== 0, false);
permissions |= ADMIN;
assert.equal(permissions, READ | WRITE | ADMIN);
permissions &= ~WRITE;
assert.equal((permissions & WRITE) !== 0, false);
assert.equal((permissions & READ) !== 0, true);
assert.equal((permissions & ADMIN) !== 0, true);

console.log('OK permission flags');
```

**Acceptation :** code de sortie 0 et `OK permission flags`. Expliquer la différence entre `|=` (ajout) et `&= ~` (retrait). Les opérateurs bitwise JavaScript convertissent les nombres en entiers signés 32 bits : ne pas utiliser ce modèle sans contrôle pour des masques qui dépassent cette représentation ; préférer `BigInt` si le besoin le justifie.

**Lien et transfert :** les flags peuvent simplifier un protocole compact ou une permission interne, mais ils ne remplacent pas un modèle d'autorisation serveur vérifié et audité.


## Vérification autonome : domaine 32 bits et erreurs de bord

Copie le code de `estPuissanceDe2` et `compterBits` dans `verify-bit-operations.mjs`, puis ajoute les assertions ci-dessous. Lance `node verify-bit-operations.mjs`.

```js
import assert from 'node:assert/strict';

assert.equal(estPuissanceDe2(1), true);
assert.equal(estPuissanceDe2(1024), true);
assert.equal(estPuissanceDe2(0), false);
assert.equal(estPuissanceDe2(6), false);
assert.equal(estPuissanceDe2(2 ** 32), false);
assert.equal(compterBits(0), 0);
assert.equal(compterBits(7), 3);
assert.equal(compterBits(0xffffffff), 32);
assert.throws(() => compterBits(-1), RangeError);
assert.throws(() => compterBits(1.5), RangeError);
console.log('OK bit operations');
```

**Acceptation :** le processus retourne le code 0 et affiche `OK bit operations`. Une solution qui retourne 0 pour `0xffffffff`, ou qui accepte silencieusement `-1`, ne passe pas.

**Limite de sécurité :** un masque de bits peut représenter des permissions internes, mais il ne doit jamais remplacer la vérification d'autorisation côté serveur, l'identité du sujet, le tenant et la politique d'accès.
