---
stability: intemporel
last_reviewed: 2026-10-31
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [transmission, constraints_injectees]
anti_recipe_key: transmission+constraints_injectees
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **Repère :** affecter un objet à une autre variable copie la valeur de référence, pas l’objet lui-même.

# Le chaos des références

Temps de lecture ~5 min

> T'as compris la théorie. Maintenant on va voir pourquoi ça explose en prod.

---

## 1. Ce qui se passe vraiment en mémoire

Quand tu fais :

```js
let arr1 = [1, 2, 3];
let arr2 = arr1;
```

L'affectation ne crée pas un deuxième tableau. JavaScript copie la **valeur de référence** qui désigne le tableau. Les deux bindings désignent donc le même objet. Cette référence est un modèle du langage, pas une adresse physique que ton code peut lire.

```text
arr1 ──► [référence R1] ──┐
                          ├──► [ 1, 2, 3 ] (un seul tableau)
arr2 ──► [référence R1] ──┘
```

Donc :

```js
arr2.push(4);
console.log(arr1); // [1, 2, 3, 4] --> arr1 aussi
```

Même valeur de référence = même tableau = même chaos.

---

## 2. Le piège du "backup"

```js
let records = [{ id: "REQ-101", status: "open" }];
let backupRecords = records; // copie la valeur de référence : même tableau

backupRecords[0].status = "done";
console.log(records[0].status); // "done" -> le prétendu backup a modifié l'original
```

`backupTeam` n'est pas un backup. C'est un **alias**.

---

## 3. Comment copier vraiment : Shallow Copy

Pour créer un **nouveau** tableau ou objet :

```js
let newArr = [...arr1]; // spread operator
let newObj = { ...obj1 }; // idem pour les objets
```

Maintenant `newArr` et `arr1` sont deux tableaux distincts.

```text
arr1  ──► [ 1, 2, 3 ] (tableau original)
newArr ──► [ 1, 2, 3 ] (nouveau tableau distinct)
```

**Mais attention** : c'est une copie **superficielle**. Si le tableau contient des objets, leurs références internes restent partagées. On appelle ça le **shallow copy**. Le niveau suivant ? `08-mutation_madness.md`.

---

## MISSION : Deux variables, un même tableau

### Objectif

Voir concrètement que deux variables peuvent désigner le même tableau.

### Instructions

1. Crée un tableau `records` avec trois demandes `{ id, status }`.
2. Crée `backupRecords` qui pointe sur **le même tableau** (pas de copie).
3. Passe le statut de la première demande à `done` via `backupRecords`.
4. Passe le statut de la deuxième demande à `cancelled` via `records`.
5. Affiche `records` et `backupRecords`.

### Code de départ

```js
let records = [
  { id: "REQ-101", status: "open" },
  { id: "REQ-102", status: "open" },
  { id: "REQ-103", status: "open" },
];
// Ton code ici
```

### Résultat attendu

```text
records[0].status   --> "done"      // modifié via backupRecords
records[1].status   --> "cancelled" // modifié via records
backupRecords[0].status --> "done"      // même référence : même résultat
backupRecords[1].status --> "cancelled" // idem

records === backupRecords --> true
```

> `backupRecords` et `records` sont le **même tableau**. Le backup n'en est pas un.

---

## RÉSUMÉ

Deux variables qui pointent vers le même objet, c'est un seul objet avec deux noms. Modifier l'un modifie l'autre. Un spread ou un `slice()` copie la surface, pas les objets imbriqués.

La règle à graver : JavaScript copie toujours la valeur lors d'une affectation. Pour un objet ou un tableau, cette valeur est une référence ; l'affectation d'un binding à un autre partage donc le même objet. Pour obtenir un nouvel objet, crée explicitement une copie (en sachant qu'un spread ne copie que le premier niveau).

> **Statut : approfondissement facultatif.** Termine d’abord la mission de base et vérifie que tu comprends l’exemple principal. Ce checkpoint n’est pas une gate et ne conditionne pas le passage au sous-module suivant. S’il utilise une notion que tu n’as pas encore étudiée, saute-le pour la première passe et reviens-y plus tard.

## Approfondissement facultatif : variation D : transfert négatif

<!-- AF-DIAGRAM:transfer -->

```text
Principe appris
      │
      ▼
Nouveau contexte
      │
      ├── invariant ──► conserver
      │
      └── hypothèse cassée ─► adapter
                                │
                                ▼
                             nouvelle décision
```

Le transfert teste ce qui survit du principe et ce qui doit être révisé dans un contexte nouveau.

Prends le mécanisme de cette page et transpose-le dans un contexte où il risque de devenir une mauvaise pratique. Explique **quelle hypothèse cesse d'être vraie**, quelle conséquence apparaît, et quelle stratégie tu utiliserais à la place.
