---
stability: stable
last_reviewed: 2026-10-31
depends_on_vendor: false
acte: comprendre
cognitive_level: L1
perturbation_modes: [consigne_simple, cas_limite]
anti_recipe_key: consigne_simple+cas_limite
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **Repère :** un programme exécute des instructions dans un ordre. Le contrôle de flux lui permet de choisir une branche ou de répéter un bloc.

# Contrôle de flux : décider et répéter

Temps de lecture indicatif : 8 à 10 min.

## 1. Le programme suit d'abord un ordre

Sans condition ni boucle, JavaScript exécute les lignes dans l'ordre, de haut en bas.

```js
const price = 12000;
const quantity = 2;
const total = price * quantity;
console.log(total); // 24000
```

## 2. Une condition choisit une branche

Une condition est une expression évaluée à `true` ou `false` (vrai ou faux). Les comparaisons produisent ces valeurs.

```js
const age = 19;
console.log(age >= 18); // true
```

`if` exécute son bloc lorsque la condition est vraie. `else` fournit l'autre branche.

```js
const age = 16;

if (age >= 18) {
  console.log("Accès autorisé");
} else {
  console.log("Accès refusé");
}
```

Pour plusieurs cas, `else if` teste les conditions dans l'ordre. La première branche vraie est exécutée ; les suivantes sont ignorées.

```js
const score = 72;

if (score >= 80) {
  console.log("Très bien");
} else if (score >= 50) {
  console.log("Validé");
} else {
  console.log("À retravailler");
}
```

### Opérateurs utiles au début

| Opérateur  | Sens                                    | Exemple                  |
| ---------- | --------------------------------------- | ------------------------ | -------------------------------------- | -------- | --- | -------- |
| `===`      | égalité stricte                         | `age === 18`             |
| `!==`      | différence stricte                      | `status !== "paid"`      |
| `>` / `>=` | supérieur / supérieur ou égal           | `score >= 50`            |
| `<` / `<=` | inférieur / inférieur ou égal           | `quantity < 10`          |
| `&&`       | les deux conditions doivent être vraies | `age >= 18 && hasTicket` |
| `          |                                         | `                        | au moins une condition doit être vraie | `isAdmin |     | isOwner` |
| `!`        | inverse vrai/faux                       | `!isBlocked`             |

Privilégie `===` et `!==` au début : ils évitent les conversions implicites de `==` et `!=`.

## 3. Une boucle répète un bloc

Une boucle est utile lorsqu'une action doit être répétée. La boucle `for` convient lorsqu'un compteur permet de contrôler les répétitions.

```js
for (let attempt = 1; attempt <= 3; attempt++) {
  console.log("Tentative", attempt);
}
```

Lis les trois parties de l'en-tête :

1. `let attempt = 1` : valeur de départ ;
2. `attempt <= 3` : condition pour continuer ;
3. `attempt++` : progression du compteur après chaque tour. C’est une écriture courte de `attempt = attempt + 1` : on ajoute 1 à la valeur actuelle.

La boucle `while` continue tant que sa condition reste vraie. Il faut donc prévoir ce qui fera changer cette condition. Dans l’exemple, `remaining--` est une écriture courte de `remaining = remaining - 1` : on retire 1 à chaque tour.

```js
let remaining = 3;

while (remaining > 0) {
  console.log("Places restantes :", remaining);
  remaining--;
}
```

## 4. Arrêter ou sauter un tour

- `break` sort immédiatement de la boucle la plus proche.
- `continue` saute le reste du tour courant et passe au suivant.

Ces instructions sont utiles, mais ne les ajoute pas par réflexe : une condition claire dans l'en-tête suffit souvent.

```js
for (let number = 1; number <= 5; number++) {
  if (number === 3) continue;
  console.log(number); // 1, 2, 4, 5
}
```

## Repère visuel utile : le chemin d'exécution

<!-- AF-DIAGRAM:control-flow -->

```text
instruction
    |
    v
condition ? ---- non ----> branche alternative
    |                         |
   oui                        |
    v                         |
branche principale <----------+
    |
    v
instruction suivante

boucle : condition vraie -> bloc -> progression -> condition à nouveau
```

## Pourquoi ce mécanisme compte

Une règle métier devient une décision (`if / else`). Une opération répétée sur plusieurs éléments devient une boucle. C'est la base des validations, des compteurs, des traitements de fichiers et de nombreuses règles applicatives.

## Repères de décision

- **Pourquoi :** Le contrôle de flux transforme une suite d'instructions fixe en comportement qui réagit à une condition et traite plusieurs cas.
- **Quand l'utiliser / quand l'éviter :** Utilise `if / else` pour choisir et une boucle pour répéter. N'utilise pas une boucle lorsqu'une seule instruction suffit ; évite les conditions imbriquées difficiles à lire.
- **Limites :** Une condition incorrecte peut choisir la mauvaise branche. Une boucle dont l'état ne progresse pas peut ne jamais s'arrêter. `break` et `continue` peuvent rendre le chemin plus difficile à suivre s'ils sont trop nombreux.

## Mécanisme : la version sans magie

JavaScript évalue la condition. Pour `if`, il choisit le bloc associé à la première condition vraie. Pour une boucle, il réévalue la condition de continuation à chaque tour et recommence tant qu'elle est vraie. Le compteur ou l'état modifié dans le bloc permet normalement d'atteindre l'arrêt.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), une demande peut être acceptée ou refusée selon son statut et une règle de capacité. Une boucle peut ensuite examiner plusieurs demandes ; cette leçon ne demande encore ni base de données ni service déployé.

**À observer :** pour chaque cas, la valeur des variables avant la condition, la branche choisie et la sortie produite. Une exécution locale est une preuve `LAB`, pas une preuve de production.

## Mission utile : appliquer une règle de décision

**Mission liée à « Contrôle de flux : décider et répéter » :** écris un programme qui reçoit `age` et affiche une décision d'accès. Ensuite, utilise une boucle pour afficher les trois numéros de tentative. Prédit les sorties avant de lire le résultat.

**Livrable :** un fichier JavaScript court, trois prédictions, les sorties observées et une phrase expliquant quand chaque boucle s'arrête.

**Critères d'acceptation :** les cas 16 et 19 ans conduisent aux bonnes branches ; la boucle affiche exactement trois tentatives ; aucune condition d'arrêt n'est laissée implicite.

**Transfert obligatoire :** remplace le seuil 18 par 21, puis explique quelles lignes changent et lesquelles restent identiques.
