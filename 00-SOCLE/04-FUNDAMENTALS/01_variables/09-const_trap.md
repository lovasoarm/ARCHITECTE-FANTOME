---
stability: intemporel
last_reviewed: 2026-10-31
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [defaut_cache, constraints_injectees]
anti_recipe_key: defaut_cache+constraints_injectees
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **Repère :** `const` interdit de réaffecter le binding ; il ne gèle pas automatiquement l’objet désigné.

# The const trap : const ne veut pas dire immuable

Temps de lecture ~6 min

> Tu crois que `const` protège ton objet. Il protège juste la clé, pas la maison.

---

## 1) CE QUE CONST FAIT VRAIMENT

`const` bloque la **réassignation** de la variable. Pas la modification du contenu.

```js
const tasks = [{ id: "TASK-101", status: "open" }];

tasks[0].status = "done"; // autorisé : on modifie le contenu
tasks.push({ id: "TASK-102", status: "open" }); // autorisé : on modifie le tableau
tasks = []; // TypeError (erreur de type : opération incompatible avec le type de donnée) : on réassigne la variable
```

---

## 2) LE SCHÉMA MENTAL

```text
binding `tasks` --> [valeur de référence]
                 |
                 v
          [ { id, status }, ... ] <-- le contenu reste mutable
```

`const` dit : **ce binding ne pourra pas recevoir une autre valeur**.
Il ne dit pas : **l'objet désigné est immuable**. Le moteur n'a pas à exposer une adresse physique.

---

## 3) COMPARAISON LET VS CONST AVEC OBJETS

```js
let arr1 = [1, 2, 3];
arr1 = [4, 5, 6]; // let autorise la réassignation

const arr2 = [1, 2, 3];
arr2 = [4, 5, 6]; // TypeError
arr2.push(4); // autorisé : l'objet tableau est modifié, le binding arr2 n'est pas réassigné.
```

---

## 4) BLOQUER LES MODIFICATIONS DIRECTES AVEC FREEZE

Pour bloquer les changements de propriétés directes d'un objet, utilise `Object.freeze()` (gel superficiel : les propriétés propres ne peuvent plus être ajoutées, supprimées ou réaffectées) :

```js
const config = Object.freeze({ env: "production", debug: false });
config.debug = true; // en mode strict : TypeError ; hors mode strict : l'écriture échoue sans exception
// Même règle pour l'ajout de config.newProp.
console.log(config.debug); // false : la propriété reste inchangée
```

> Attention : `Object.freeze` est shallow. Les objets imbriqués restent mutables.

### `Object.freeze` : "Il Gèle Pas Tout, Menteur"

Tu crois avoir tout freezé. T'as juste mis une vitre sur la surface.

```js
const config = Object.freeze({
  env: "production",
  database: { host: "localhost", port: 5432 },
});

config.env = "dev"; // mode strict : TypeError ; hors mode strict : écriture ignorée
config.database.port = 9999; // passe à travers : objet imbriqué vivant
```

#### Ce que freeze voit vraiment :

```text
config
 |-- env   --> "production"  <-- gelé, intouchable
 |-- database --> [valeur de référence]  <-- le binding de propriété est gelé... pas l'objet imbriqué
```

Il protège la **clé**, pas la **maison derrière la clé**. Même arnaque que le shallow copy.

> Pour figer aussi les objets imbriqués, il faut parcourir récursivement la structure et appliquer `Object.freeze()` à chaque objet atteint. Il faut définir le traitement des cycles et des types spéciaux : un simple appel ne suffit pas.

---

## Résumé

| Action                                               | `const` | `let` |
| ---------------------------------------------------- | ------- | ----- |
| Réassigner la variable                               | non     | ok    |
| Modifier le contenu                                  | ok      | ok    |
| Bloquer les changements directs avec `Object.freeze` | oui     | oui   |

> `const` = la clé est soudée à ta main. Mais la maison, tu peux toujours la repeindre.

---

## RÉSUMÉ

`const` interdit la réassignation de la variable : tu ne peux pas pointer vers un autre objet. Mais il n'empêche pas de modifier le contenu de l'objet déjà pointé.

`Object.freeze()` bloque les changements directs des propriétés propres, mais ne fige pas récursivement les objets imbriqués. Il ne rend donc pas automatiquement toute une structure profondément immuable.

La règle : `const` = binding non réassignable. `Object.freeze()` = gel superficiel des propriétés propres. Aucun des deux ne garantit à lui seul une immutabilité profonde.

> **Statut : approfondissement facultatif.** Termine d’abord la mission de base et vérifie que tu comprends l’exemple principal. Ce checkpoint n’est pas une gate et ne conditionne pas le passage au sous-module suivant. S’il utilise une notion que tu n’as pas encore étudiée, saute-le pour la première passe et reviens-y plus tard.

## Approfondissement facultatif : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

<!-- AF-LESSON-PROFILE: variables -->

## Repères de décision

- **Pourquoi :** `const` rend le binding non réassignable ; `Object.freeze()` bloque les changements des propriétés directes d'un objet. Ce sont deux protections différentes.
- **Quand l’utiliser / quand l’éviter :** Utilise `const` pour un nom qui ne doit pas être réaffecté. Utilise `Object.freeze()` si tu as réellement besoin de protéger la surface d'un objet, en sachant que le gel est superficiel.
- **Limites :** Ni `const` ni un appel simple à `Object.freeze()` ne rendent automatiquement tout un graphe d'objets profondément immuable.

## Mécanisme : la version sans magie

`const` interdit de remplacer la valeur associée au binding. Il n'interdit pas de modifier l'objet désigné. `Object.freeze()` bloque l'ajout, la suppression et la réaffectation des propriétés directes ; les objets imbriqués restent modifiables tant qu'ils ne sont pas gelés eux aussi.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), une configuration peut être référencée par un binding `const`. Cela empêche de remplacer ce binding, mais ne protège pas automatiquement les propriétés de la configuration ni ses objets imbriqués.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : distinguer binding constant et objet gelé

> **Arc Capsule Corp. :** verrouiller l'étiquette ne verrouille pas automatiquement tout ce qu'elle désigne. Il faut savoir quelle frontière est réellement protégée.

**Mission liée à « The const trap : const ne veut pas dire immuable » :** Prédis les opérations autorisées sur une configuration déclarée avec `const`, puis sur un objet passé à `Object.freeze()`. Distingue la réaffectation du binding, la mutation d'une propriété et la mutation d'un objet imbriqué.

```js
"use strict";
const config = Object.freeze({
  mode: "test",
  database: { host: "localhost" },
});

config.database.host = "db.internal"; // autorisé : l'objet imbriqué n'est pas gelé
// config.mode = "production"; // TypeError en mode strict : propriété directe gelée
// config = {}; // TypeError : binding const non réassignable
```

**Livrable :** un tableau `opération / autorisée ou refusée / raison` pour les trois lignes.

**Critères d’acceptation :** les deux erreurs sont expliquées séparément ; l'apprenant sait que `Object.freeze()` est superficiel ; il sait que `const` empêche la réaffectation du binding, pas toute mutation de l'objet.

**Transfert obligatoire :** explique quelles propriétés seraient encore modifiables si `database` contenait à son tour un objet `credentials`.
