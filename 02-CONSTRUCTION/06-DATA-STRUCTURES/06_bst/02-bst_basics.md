---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L4
perturbation_modes: [regression, temps_limite]
anti_recipe_key: regression+temps_limite
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : coupe du monde :** un bon algorithme ne gagne pas parce qu'il connaît un mouvement célèbre ; il gagne parce qu'il réduit le nombre d'actions nécessaires quand le terrain explose.

# BST : L'ARBRE QUI CHERCHE EN O(log n)

Temps de lecture ~9 min

Un tableau peut être trié ou non. Une table de hachage offre généralement une recherche moyenne proche de `O(1)`, sans ordre de tri. Un BST maintient les clés ordonnées : recherche, insertion et suppression sont en `O(log n)` si l’arbre reste équilibré ; sinon, elles peuvent dégénérer en `O(n)`.

Condition : l'arbre doit rester équilibré. Sinon O(log n) dégénère en O(n). C'est le piège principal de cette structure.

---

## 1) LA RÈGLE DU BST

Pour chaque noeud N :

- tout ce qui est à gauche est **strictement inférieur** à N
- tout ce qui est à droite est **strictement supérieur** à N

C'est ça et rien d'autre. Cette règle unique suffit à garantir la recherche dichotomique.

```text
Arbre valide :

     8
    /  \
    3   10
   / \   \
   1  6   14
    / \  /
    4  7 13

Pour le noeud 8 :
 gauche (3, 1, 6, 4, 7) --> tous < 8 : OK
 droite (10, 14, 13)  --> tous > 8 : OK

Pour le noeud 3 :
 gauche (1)   --> 1 < 3 : OK
 droite (6, 4, 7) --> tous > 3 : OK
```

---

## 2) NOEUD ET CLASSE BST

```js
class Node {
  constructor(value) {
    this.value = value;
    this.left = null; // sous-arbre gauche : valeurs < this.value
    this.right = null; // sous-arbre droit : valeurs > this.value
  }
}

class BST {
  constructor() {
    this.root = null;
  }
}
```

---

## 3) INSERT : O(log n)

On descend l'arbre en comparant à chaque noeud. Gauche si inférieur, droite si supérieur. On s'arrête sur un null : c'est là qu'on insère.

```js
insert(value) {
 const newNode = new Node(value)

 // arbre vide : le premier noeud devient la racine
 if (!this.root) {
  this.root = newNode
  return this
 }

 let current = this.root

 while (true) {
  // doublon : on ignore (convention classique du BST)
  if (value === current.value) return this

  if (value < current.value) {
   // aller à gauche
   if (!current.left) {
    current.left = newNode
    return this
   }
   current = current.left
  } else {
   // aller à droite
   if (!current.right) {
    current.right = newNode
    return this
   }
   current = current.right
  }
 }
}
```

Trace d'une insertion sur l'arbre du score de Messi (Ballon d'Or) :

```text
Insertion de [8, 3, 10, 1, 6] dans l'ordre :

insert(8) --> 8 devient racine
insert(3) --> 3 < 8 : gauche de 8
insert(10) --> 10 > 8 : droite de 8
insert(1) --> 1 < 8 : gauche | 1 < 3 : gauche de 3
insert(6) --> 6 < 8 : gauche | 6 > 3 : droite de 3

Résultat :
  8
  / \
 3  10
 / \
1  6
```

---

## 4) SEARCH : O(log n)

Même logique : on descend, on compare, on va à gauche ou à droite.

```js
search(value) {
 let current = this.root

 while (current) {
  if (value === current.value) return current // trouvé
  if (value < current.value) {
   current = current.left  // cherche à gauche
  } else {
   current = current.right // cherche à droite
  }
 }

 return null // pas trouvé
}
```

Chaque comparaison élimine la moitié restante de l'arbre. C'est la recherche binaire appliquée à une structure de données.

```text
Chercher 6 dans l'arbre :

   8   --> 6 < 8 : on part à gauche
  / \
  3  10  --> 6 > 3 : on part à droite
 / \
 1  6   --> 6 === 6 : trouvé en 3 comparaisons
```

---

## 5) DELETE : O(log n) : le cas qui pique

Supprimer un noeud dans un BST a trois cas distincts.

```text
Cas 1 : le noeud est une feuille (pas d'enfants)
 --> on l'efface simplement

Cas 2 : le noeud a un seul enfant
 --> on remplace le noeud par son enfant

Cas 3 : le noeud a deux enfants
 --> on remplace la valeur du noeud par son successeur in-order
   (le plus petit du sous-arbre droit)
 --> puis on supprime ce successeur
```

```js
delete(value) {
 this.root = this._deleteNode(this.root, value)
}

_deleteNode(node, value) {
 if (!node) return null

 if (value < node.value) {
  // le noeud à supprimer est dans le sous-arbre gauche
  node.left = this._deleteNode(node.left, value)
 } else if (value > node.value) {
  // le noeud à supprimer est dans le sous-arbre droit
  node.right = this._deleteNode(node.right, value)
 } else {
  // on a trouvé le noeud à supprimer

  // Cas 1 : feuille
  if (!node.left && !node.right) return null

  // Cas 2a : seulement un enfant droit
  if (!node.left) return node.right

  // Cas 2b : seulement un enfant gauche
  if (!node.right) return node.left

  // Cas 3 : deux enfants
  // trouver le successeur in-order (minimum du sous-arbre droit)
  const successor = this._findMin(node.right)
  node.value = successor.value
  // supprimer le successeur de sa position originale
  node.right = this._deleteNode(node.right, successor.value)
 }

 return node
}

_findMin(node) {
 // le minimum d'un BST est toujours le plus à gauche
 while (node.left) node = node.left
 return node
}
```

Trace sur le cas 3 : supprimer le noeud 3 :

```text
Avant :       Après :
  8          8
  / \         / \
 3  10    -->  4  10
 / \         / \
1  6        1  6
  / \          \
 4  7          7

Successeur de 3 = min du sous-arbre droit de 3 = 4
On remplace 3 par 4, puis on supprime 4 de sa position originale
```

---

## 6) LE PIÈGE : L'ARBRE DÉGÉNÉRÉ

Si tu insères des valeurs déjà triées dans un BST, l'arbre devient une liste chaînée.

```text
Insertion de [1, 2, 3, 4, 5] dans l'ordre :

1
 \
 2
  \
  3
   \
   4
    \
    5

Hauteur : O(n)
Recherche : O(n), pas O(log n)
```

Walter White qui insère ses distributeurs par ordre alphabétique : son BST devient une file droite. Dijkstra pleure.

Correction : utiliser un arbre équilibré (AVL, Red-Black Tree). Ce n'est pas couvert dans ce module : voir `02-CONSTRUCTION/07-ALGORITHMS` pour les arbres AVL. Pour l'instant, retiens que le BST de base ne se rééquilibre pas.

---

## EXERCICES

## EXO 1 : les joueurs du Ballon d'Or

_~15 min_

Tu as les scores de candidats au Ballon d'Or (nombre de buts + assists) :

```js
const scores = [89, 72, 95, 60, 81, 100, 55, 77];
```

Insère-les dans un BST. Ensuite :

1. Cherche si le score 81 existe
2. Cherche si le score 99 existe
3. Supprime le score 72
4. Vérifie que la structure BST reste valide après la suppression

---

## EXO 2 : le répertoire de personnages de Breaking Bad

_~12 min_

Tu construis un annuaire de personnages trié par nom :

```js
const characters = ["Walter", "Jesse", "Skyler", "Hank", "Mike", "Saul", "Gus"];
```

BST alphabétique (compare les strings). Implémente `search(name)` qui retourne `true/false`. Démontre que l'ordre d'insertion change la forme de l'arbre mais pas les résultats de recherche.

(Contrainte : écris les deux insertions : ordre alphabétique vs ordre de la liste : et montre la différence de hauteur d'arbre)

---

## EXO 3 : le classement live d'un match

_~20 min_

Pendant un match, les joueurs accumulent des points de performance (passes, tacles, tirs). Chaque update insère ou met à jour un joueur dans le BST.

Implémente :

- `insertOrUpdate(playerName, score)` : insère si absent, met à jour si présent
- `findTopK(k)` : retourne les k meilleurs scores (sans convertir en tableau via traversal d'abord)

(Indice pour findTopK : pense au parcours in-order : il donne les valeurs dans l'ordre croissant)

---

## RÉSUMÉ

Le BST stocke les données de façon ordonnée et permet insert, search, delete en O(log n) : si l'arbre reste équilibré. La règle : gauche < noeud < droite, appliquée à chaque noeud. Le delete a trois cas, le troisième (deux enfants) utilise le successeur in-order. Le piège principal : des insertions triées produisent un arbre dégénéré en O(n). En prod, on utilise des variantes auto-équilibrées (AVL, Red-Black).

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.

### Vérification observable : critères de réussite

Après insertions et suppressions, vérifie l’invariant de l’arbre pour chaque nœud, y compris avec valeurs égales et arbre dégénéré.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: structures -->

## Repères de décision

- **Pourquoi :** La structure choisie détermine le coût des opérations dominantes et la façon dont l'état évolue.
- **Quand l’utiliser / quand l’éviter :** Choisis à partir des opérations fréquentes, du volume et des contraintes d'ordre. N'utilise pas une structure sophistiquée si un tableau ou une Map répond au besoin mesuré.
- **Limites :** La complexité moyenne ne garantit pas les performances réelles. Mémoire, distribution des clés, ordre, synchronisation et sérialisation peuvent changer le coût.

## Mécanisme : la version sans magie

Liste les opérations, leur fréquence et les garanties attendues ; compare complexité, mémoire et comportement aux cas limites.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **BST : L'ARBRE QUI CHERCHE EN O(log n)** se rattache à ce cas concret : Kintana doit retrouver une demande, dédupliquer les événements ou ordonner des notifications sans parcourir toute l'historique à chaque action.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Choisir la structure selon le trafic métier

> **Arc One Piece / Grand Line :** choisir une structure de données, c'est choisir comment la cargaison circule. Une mauvaise structure transforme chaque recherche en traversée de l'océan.

**Mission liée à « BST : L'ARBRE QUI CHERCHE EN O(log n) » :** Prends une opération de Kintana (lookup par ID, file de notification, regroupement par tenant ou historique ordonné). Compare deux structures avec un coût théorique et un test reproductible sur données synthétiques.

**Livrable :** une implémentation courte, tests d'invariants, tableau coût/avantages et mesure locale si elle est pertinente.

**Critères d’acceptation :** les opérations dominantes sont identifiées ; l'ordre et les doublons sont traités explicitement ; la complexité est expliquée ; le choix n'est pas justifié par la mode.

**Transfert obligatoire :** Multiplie par dix le volume et change la distribution des clés. Réévalue le choix et indique si un index persistant devient nécessaire.
