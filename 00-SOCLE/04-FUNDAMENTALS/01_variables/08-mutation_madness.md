---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [preuve_partielle, changement_contexte]
anti_recipe_key: preuve_partielle+changement_contexte
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Mutation madness : shallow vs deep copy

Temps de lecture ~6 min

> Tu croyais avoir copié. T'as juste dupliqué le chaos.

> Ce fichier introduit la mutation et la copie superficielle.
> Le mécanisme complet (Stack vs Heap, deep clone, structuredClone) est traité en profondeur dans `02-CONSTRUCTION/05-MEMORY-PERFORMANCE/02_copy_vs_ref/02-shallow_vs_deep.md`.
> Ici on pose le problème. Là-bas on va au fond.

---

## 1) LE PROBLÈME DU SHALLOW COPY (COPIE SUPERFICIELLE) AVEC DES OBJETS IMBRIQUÉS

```js
let monsters = [
  { name: "Goblin", hp: 100, attack: { dmg: 20, type: "slash" } },
  { name: "Orc", hp: 150, attack: { dmg: 30, type: "smash" } },
];

let shallowMonsters = [...monsters];
```

Le tableau est nouveau. Mais les objets à l'intérieur ? **Même référence.**

```text
monsters    --> [ obj1, obj2 ]
shallowMonsters --> [ obj1, obj2 ] <-- mêmes objets, pas des copies
```

Donc :

```js
shallowMonsters[0].attack.dmg += 10;
console.log(monsters[0].attack.dmg); // 30 -> modifié aussi
```

---

## 2) SHALLOW VS DEEP : LE TABLEAU DE VÉRITÉ

| Type         | Tableau | Objets internes | Objets imbriqués |
| ------------ | ------- | --------------- | ---------------- |
| Shallow copy | nouveau | partagés        | partagés         |
| Deep copy    | nouveau | nouveaux        | nouveaux         |

---

## 3) COMMENT FAIRE UNE VRAIE DEEP COPY (COPIE EN PROFONDEUR)

**Manuelle avec `map` + spread** : quand t'as un niveau d'imbrication :

```js
let deepMonsters = monsters.map((monster) => ({
  ...monster,
  attack: { ...monster.attack }, // on recopie aussi l'objet imbriqué
}));
```

**`structuredClone`** : la méthode moderne, pour tout le reste :

```js
let deepMonsters = structuredClone(monsters);
```

Un seul appel. Tous les niveaux copiés. Fini le chaos.

> Limite de `structuredClone` : ne fonctionne pas avec les `Function` et les classes complexes. Pour du JSON classique, c'est parfait.

---

## MISSION : La Team Chaotique

### Objectif

Comprendre la différence entre shallow et deep copy sur des objets imbriqués.

### Instructions

**Partie 1 : Le chaos**

1. Crée `monsters` avec 3 monstres `{ name, hp, attack: { dmg, type } }`.
2. Crée `shallowMonsters` avec le spread operator `[...]`.
3. Modifie le `dmg` du premier monstre via `shallowMonsters`.
4. Affiche `monsters` et `shallowMonsters` : observe que **les deux ont changé**.

**Partie 2 : Le contrôle**

5. Crée `deepMonsters` avec `map` + spread imbriqué.
6. Modifie le `dmg` du deuxième monstre via `deepMonsters`.
7. Affiche `monsters` et `deepMonsters` , `monsters` **doit rester intact**.

**Bonus : structuredClone**

8. Refais la partie 2 en une ligne avec `structuredClone`.
9. Même résultat, zéro effort.

### Code de départ

```js
let monsters = [
  { name: "Goblin", hp: 100, attack: { dmg: 20, type: "slash" } },
  { name: "Orc", hp: 150, attack: { dmg: 30, type: "smash" } },
  { name: "Troll", hp: 200, attack: { dmg: 40, type: "crush" } },
];
// Ton code ici
```

### Résultat attendu

```text
// Après partie 1
monsters[0].attack.dmg   --> 30  // modifié : shallow copy piégé
shallowMonsters[0].attack.dmg --> 30 // idem : même référence

// Après partie 2
monsters[1].attack.dmg   --> 30  // intact : deep copy protège l'original
deepMonsters[1].attack.dmg --> 10  // modifié uniquement ici
```

> Comprends. Ne regarde pas juste le résultat. Réfléchis à la mémoire.

---

## RÉSUMÉ

Shallow copy (copie superficielle) : la structure de premier niveau est copiée, mais les objets imbriqués restent partagés. Modifier `copy.stats.hp` modifie l'original aussi.

Deep copy (copie profonde) : tout l'arbre est dupliqué. `structuredClone()` est la solution native en 2026. `JSON.parse(JSON.stringify(...))` fonctionne mais tue les `undefined`, les fonctions, et les `Date`.

Le bon réflexe : avant de muter un objet reçu en paramètre, demande-toi si tu travailles sur l'original ou sur une copie.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.
