---
stability: intemporel
last_reviewed: 2026-10-31
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [preuve_partielle, changement_contexte]
anti_recipe_key: preuve_partielle+changement_contexte
transfer_distance: low
assessment_role: instructional_checkpoint
---

**SCÈNE CRAZYDEVS : Naruto :** choisir une structure de données, c’est choisir comment les ninjas entrent, sortent et se retrouvent dans le village. La mauvaise structure devient un goulot d’étranglement déguisé.

> **CrazyDevs : tournoi de Konoha :** le problème n’est pas de gagner un duel, mais de ne pas faire combattre inutilement 10 000 adversaires quand une seule bonne stratégie suffit.

# Array basics : ce que chaque opération coûte vraiment

Temps de lecture ~8 min

Un tableau JS, t'en utilises tous les jours. Mais est-ce que tu sais ce qui se passe en mémoire quand tu fais `splice(0, 1)` ? Ou pourquoi accéder à `arr[999]` est aussi rapide qu'accéder à `arr[0]` ?

Un `Array` JavaScript est un objet indexé avec une propriété `length` et des propriétés d’index. Les moteurs optimisent souvent les tableaux denses pour rendre l’accès par index très rapide, mais le langage ne garantit ni un bloc physique contigu ni une formule de coût précise pour chaque représentation. Les trous, les types d’éléments et les changements de forme peuvent modifier les optimisations.

On apprend donc le coût algorithmique attendu des opérations, sans transformer une représentation courante du moteur en promesse du langage.

---

## 1) LA MÉMOIRE DERRIÈRE LE TABLEAU

Conceptuellement, un tableau expose une suite d’indices. Le moteur peut choisir différentes représentations internes ; le modèle JavaScript ne promet pas que les valeurs occupent des emplacements physiques contigus.

```text
index :   0        1        2        3
      ┌────────┬────────┬────────┬────────┐
valeur: │ Naruto │ Sasuke │ Sakura │Kakashi │
      └────────┴────────┴────────┴────────┘
      représentation logique, pas plan d’adresses mémoire
```

Accéder à `arr[2]` signifie lire la propriété d’index `2`. Dans les implémentations courantes, cet accès est généralement très rapide pour les tableaux ordinaires. Mais JavaScript ne prescrit pas une adresse de base ni une taille de slot : ne déduis pas le calcul machine exact du code source.

```js
const crew = ["Naruto", "Sasuke", "Sakura", "Kakashi"];

// O(1) attendu dans les implémentations courantes : accès indexé direct, sans garantie de complexité imposée par la spécification
console.log(crew[0]); // "Naruto"
console.log(crew[3]); // "Kakashi"
```

---

## 2) INDEXING, SLICING, SPREADING : LES COÛTS

<!-- AF-DIAGRAM:array-indexing-cost -->

```text
Tableau logique : [ A | B | C | D ]
Index :             0   1   2   3

lecture arr[2]  -> C
slice(1, 3)     -> [ B | C ] (nouveau tableau)
```

Ce dessin montre les index et la portion copiée par `slice`. Il ne représente pas l’agencement physique de la mémoire du moteur.

### Indexing : accès généralement rapide en pratique

```js
const scores = [88, 95, 72, 61, 99];

// lecture par index : accès généralement très rapide
const best = scores[4]; // 99

// modifier la propriété d’index
scores[2] = 80; // remplace la valeur associée à l’index 2
```

### Slicing : O(k) où k = taille du slice

`slice` ne modifie pas le tableau original : il crée une **copie** de la portion.

```js
const squad = ["Naruto", "Sakura", "Sasuke", "Kakashi", "Tsunade", "Hokage"];

// copie des éléments 1 à 3 (sans inclure 4)
const recon = squad.slice(1, 4);
// recon = ["Sakura", "Sasuke", "Kakashi"]
// squad est intact

// O(k) : proportionnel au nombre d'éléments copiés
```

### Spreading : O(n)

Le spread `[...arr]` crée une shallow copy complète. Tout le tableau est parcouru.

```js
const original = ["Gai", "Jiraiya", "Tsunade"];

// shallow copy : O(n), recopie chaque référence
const copy = [...original];

copy.push("Orochimaru");
// original n'est pas touché : ["Gai", "Jiraiya", "Tsunade"]
// copy : ["Gai", "Jiraiya", "Tsunade", "Orochimaru"]
```

---

## 3) INSERTION ET SUPPRESSION : L'ENDROIT COMPTE TOUT

C'est là que ça devient intéressant. Insérer à la fin coûte presque rien. Insérer au début coûte cher.

```text
Avant :  [ A | B | C | D ]
            ↑
          push("E")
Après :  [ A | B | C | D | E ]  // coût généralement amorti O(1)
```

```text
Avant :  [ A | B | C | D ]
     ↑
    unshift("Z")
Après :  [ Z | A | B | C | D ]
     // O(n) attendu : les indices suivants sont décalés ou réindexés
```

```js
const jugadores = ["Messi", "Neymar", "Mbappé"];

// ajout en fin : généralement O(1) amorti sur les implémentations usuelles
jugadores.push("Benzema");
// ["Messi", "Neymar", "Mbappé", "Benzema"]

// début du tableau : O(n):tout décale
jugadores.unshift("Ronaldo");
// ["Ronaldo", "Messi", "Neymar", "Mbappé", "Benzema"]

// milieu du tableau : O(n):splice recale tout ce qui suit
jugadores.splice(2, 0, "De Bruyne");
// ["Ronaldo", "Messi", "De Bruyne", "Neymar", "Mbappé", "Benzema"]
```

### Le tableau des coûts

```text
Opération      Position   Coût
─────────────────────────────────────────
Lecture / écriture par index   O(1) usuel *
push / pop en fin               O(1) amorti usuel *
unshift / shift   début    O(n)
splice insert    milieu    O(n)
splice delete    milieu    O(n)
indexOf / find    partout   O(n)
slice        n'importe  O(k)

* O(1) amorti : modèle de coût habituel pour les tableaux dynamiques ; la stratégie de capacité/allocation dépend du moteur et n’est pas prescrite par ECMAScript.
```

---

## 4) LE PIÈGE : TABLEAU ÉPARS (SPARSE ARRAY)

JS te laisse faire ça. Il devrait pas.

```js
const sparse = [];
sparse[100] = "Walter White";

console.log(sparse.length); // 101
console.log(sparse[0]); // undefined

// length vaut 101. Les indices absents sont des trous, pas des valeurs `undefined` explicitement stockées.
// forEach, map, filter : ces indices absents sont ignorés.
// Leur représentation mémoire dépend du moteur : ne suppose pas 100 slots physiques alloués.

sparse.forEach((x) => console.log(x)); // affiche seulement "Walter White"
```

Un tableau épars c'est un bug qui dort. Ne jamais assigner par index sur un tableau vide.

---

## 5) RECHERCHE DANS UN TABLEAU NON TRIÉ : O(n)

Pas de magie. Si le tableau n'est pas trié, la seule option c'est de regarder chaque élément.

```js
const tracks = ["Codeine Dreaming", "Location", "Frozen", "2 Cups"];

// indexOf : cherche depuis le début, O(n) dans le pire cas
const idx = tracks.indexOf("Frozen"); // 2

// find : pareil, mais avec une condition plus riche
const trap = tracks.find((t) => t.includes("Cup")); // "2 Cups"

// includes : O(n), retourne un booléen
const exists = tracks.includes("Location"); // true
```

Si tu fais ça sur 100k éléments en boucle, c'est O(n²). C'est là que ça tombe.

---

## EXERCICES

## EXO 1 : Roster de l'équipe nationale

_~10 min_

Tu as un tableau de 22 joueurs (formation 4-4-2). Extrais les 11 titulaires sans modifier le tableau d'origine. Puis crée une copie du squad avec un remplaçant en moins à l'index 15. Vérifie que l'original est intact.

Contrainte : utilise `slice` et le spread. Pas de `splice` sur l'original.

## EXO 2 : Le camp de Rick Grimes

_~8 min_

Le camp a une liste de survivants. Un zombie attaque depuis la gauche (index 0). Un nouveau survivant arrive toujours à la fin. Mesure avec `performance.now()` la différence entre 10 000 `unshift` et 10 000 `push` sur un tableau de 1000 éléments. Explique le résultat en une phrase.

(indice : regarde le tableau des coûts ci-dessus : la réponse y est)

## EXO 3 : Le tableau qui ment

_~12 min_

Ce code a un bug silencieux. Trouve-le avant de l'exécuter, explique ce qui se passe, et corrige-le.

```js
function buildDropTable(size) {
  const drops = [];
  drops[size - 1] = "Legendary Sword";
  drops[0] = "Common Stone";
  return drops;
}

const loot = buildDropTable(5);
const rareItems = loot.filter((item) => item !== undefined);
console.log(rareItems.length); // qu'est-ce qui s'affiche ?
```

---

## RÉSUMÉ

Un `Array` JavaScript expose des indices et une propriété `length` ; sa représentation physique dépend du moteur et peut varier selon la densité et les types d’éléments. L’accès par index est généralement modélisé en O(1) dans les implémentations courantes, sans garantie de complexité ni d’adresse imposée par le langage. Les opérations qui insèrent ou retirent au début/milieu déplacent ou réindexent typiquement de nombreux éléments et se modélisent en O(n). `slice()` crée un nouveau tableau de premier niveau ; les objets imbriqués restent partagés. Les tableaux épars sont autorisés : plusieurs méthodes d’itération sautent les indices absents, ce qui doit être pris en compte. Ces ordres de grandeur servent à raisonner, pas à remplacer une mesure sur les données réelles.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

### Vérification observable : critères de réussite

Compare ton résultat à une méthode naïve sur de petites entrées. Vérifie entrée vide, un élément, doublons et cas limite. Pour « Array basics : ce que chaque opération coûte vraiment », justifie aussi le coût théorique et une mesure reproductible.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: structures -->

## Repères de décision

- **Pourquoi :** La structure choisie détermine le coût des opérations dominantes et la façon dont l'état évolue.
- **Quand l’utiliser / quand l’éviter :** Choisis à partir des opérations fréquentes, du volume et des contraintes d'ordre. N'utilise pas une structure sophistiquée si un tableau ou une Map répond au besoin mesuré.
- **Limites :** La complexité moyenne ne garantit pas les performances réelles. Mémoire, distribution des clés, ordre, synchronisation et sérialisation peuvent changer le coût.

## Mécanisme : la version sans magie

Liste les opérations, leur fréquence et les garanties attendues ; compare complexité, mémoire et comportement aux cas limites.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Array basics : ce que chaque opération coûte vraiment** se rattache à ce cas concret : Kintana doit retrouver une demande, dédupliquer les événements ou ordonner des notifications sans parcourir toute l'historique à chaque action.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Choisir la structure selon le trafic métier

> **Arc One Piece / Grand Line :** choisir une structure de données, c'est choisir comment la cargaison circule. Une mauvaise structure transforme chaque recherche en traversée de l'océan.

**Mission liée à « Array basics : ce que chaque opération coûte vraiment » :** Prends une opération de Kintana (lookup par ID, file de notification, regroupement par tenant ou historique ordonné). Compare deux structures avec un coût théorique et un test reproductible sur données synthétiques.

**Livrable :** une implémentation courte, tests d'invariants, tableau coût/avantages et mesure locale si elle est pertinente.

**Critères d’acceptation :** les opérations dominantes sont identifiées ; l'ordre et les doublons sont traités explicitement ; la complexité est expliquée ; le choix n'est pas justifié par la mode.

**Transfert obligatoire :** Multiplie par dix le volume et change la distribution des clés. Réévalue le choix et indique si un index persistant devient nécessaire.

## Références techniques

- [MDN : Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) : modèle objet indexé, propriétés et trous.
