---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [fausse_piste, preuve_partielle]
anti_recipe_key: fausse_piste+preuve_partielle
transfer_distance: low
assessment_role: instructional_checkpoint
---

**SCÈNE CRAZYDEVS : Prison Break :** le plan semble simple jusqu’à ce qu’une porte soit fermée, qu’un garde change de ronde et qu’une information manque. C’est exactement là que le cadrage commence.

> **CrazyDevs : briefing de mission :** ce concept doit survivre au moment où quelqu’un te demande « pourquoi ? » en plein chaos. Garde l’explication technique exacte, puis donne-lui une image qu’on peut raconter demain.

# Try/catch : ce qu'il attrape et ce qu'il laisse filer

Temps de lecture ~6 min

Le code casse. Toujours. La question c'est : est-ce que toi tu le vois avant l'opérateur ?

`try/catch` c'est ton filet de sécurité. Mais il a des trous. Et si tu sais pas où ils sont, les bugs tombent en silence : en prod, la nuit, pendant un match décisif.

Ce fichier : comprendre exactement ce que `try/catch` intercepte, ce qu'il loupe, et pourquoi.

---

## 1) ANATOMIE DU TRY/CATCH

La structure de base :

```js
try {
  // le code qui peut exploser
  const result = riskyOperation();
  console.log(result);
} catch (error) {
  // ce qui se passe quand ça explose
  console.error("ça a pété :", error.message);
} finally {
  // ce qui tourne TOUJOURS:succès ou explosion
  console.log("nettoyage garanti");
}
```

Trois blocs. Trois rôles précis :

- `try` : la zone de danger : ce qui peut lever une erreur
- `catch` : le plan B : ce qu'on fait quand ça casse
- `finally` : le plan de nettoyage : il tourne quoi qu'il arrive

Le `finally` est optionnel. Mais quand tu as des ressources à libérer (connexion DB, fichier ouvert), c'est là que ça va.

---

## 2) CE QUE TRY/CATCH ATTRAPE

Tout ce qui lève une exception synchrone :

```js
try {
  null.property; // TypeError : t'essaies d'accéder à une prop de null
} catch (e) {
  console.log(e.name); // "TypeError"
  console.log(e.message); // "Cannot read properties of null"
}
```

```js
try {
  undeclaredVariable; // ReferenceError : variable inexistante
} catch (e) {
  console.log(e.name); // "ReferenceError"
}
```

```js
try {
  throw new Error("Sasuke a abandonné Konoha"); // erreur manuelle
} catch (e) {
  console.log(e.message); // "Sasuke a abandonné Konoha"
}
```

Règle simple : si JS lève une exception synchrone dans le bloc `try`, le `catch` l'attrape.

---

## 3) CE QUE TRY/CATCH LOUPE

Voilà où les gens se font avoir.

### 3.1) Les erreurs asynchrones avec callbacks

```js
try {
  setTimeout(() => {
    throw new Error("Alerte Akatsuki");
    // cette erreur est levée APRÈS que le try/catch a fini de tourner
    // le catch ne la voit jamais
  }, 1000);
} catch (e) {
  console.log("jamais exécuté");
}

// l'erreur tombe dans le vide:uncaught exception
```

Pourquoi ? Le `try/catch` tourne, puis rend la main à l'event loop. Quand le timeout s'exécute 1 seconde plus tard, le `try/catch` n'existe plus.

```text
event loop :
 1. try/catch s'exécute --> pas d'erreur --> catch ignoré
 2. ... 1000ms plus tard ...
 3. callback du setTimeout --> throw --> personne pour attraper --> crash
```

### 3.2) Les Promises non catchées

```js
try {
  fetch("https://api.inexistante.io/joueurs");
  // fetch retourne une Promise
  // une Promise rejetée n'est pas une exception synchrone
  // le try/catch ne la voit pas
} catch (e) {
  console.log("jamais exécuté");
}
```

La Promise rejette plus tard. Le `try/catch` est déjà parti.

Solution : `.catch()` sur la Promise, ou `async/await` avec `try/catch`.

### 3.3) Les erreurs dans les event listeners

```js
try {
  document.querySelector("#btn").addEventListener("click", () => {
    throw new Error("clic qui explose");
    // cette erreur sort du try/catch
  });
} catch (e) {
  console.log("jamais exécuté");
}
```

Même logique : le callback s'exécute plus tard, hors du contexte du `try/catch`.

---

## 4) L'OBJET ERROR

Quand tu `catch(e)`, `e` c'est un objet. Ses propriétés utiles :

```js
try {
  undefined.length;
} catch (e) {
  console.log(e.name); // "TypeError"
  console.log(e.message); // "Cannot read properties of undefined"
  console.log(e.stack); // la stack trace complète:l'or en debug
}
```

La `stack` c'est ton meilleur ami. Elle te dit exactement où dans le code l'erreur a éclaté, et par quelles fonctions elle est passée.

```text
Error: Cannot read properties of undefined
  at getPlayerStats (stats.js:42:15)
  at processMatch (match.js:18:5)
  at main (index.js:3:1)
```

Tu lis de bas en haut : `main` a appelé `processMatch`, qui a appelé `getPlayerStats`, qui a pété ligne 42.

---

## 5) THROW : LEVER UNE ERREUR MANUELLEMENT

Tu peux lever une erreur toi-même, avec n'importe quoi :

```js
throw new Error("message"); // la façon propre
throw "une string"; // techniquement valide, évite-le
throw 42; // pareil, évite
throw { message: "custom" }; // ça marche mais sans stack trace
```

Toujours utiliser `new Error()` ou une sous-classe. Pourquoi ? Stack trace. Sans objet Error, tu perds la trace d'exécution.

```js
function calculerXG(tirs) {
  if (!Array.isArray(tirs)) {
    throw new Error("tirs doit être un tableau, reçu : " + typeof tirs);
    // message explicite = debug rapide
  }
  return tirs.reduce((sum, tir) => sum + tir.probabilite, 0);
}

try {
  calculerXG("Messi");
} catch (e) {
  console.log(e.message);
  // "tirs doit être un tableau, reçu : string"
}
```

---

## 6) FINALLY : LE BLOC QUI TOURNE TOUJOURS

```js
const { open } = require("node:fs/promises");

async function lireFichier(path) {
  // open() acquiert la ressource avant le try ; s'il échoue, aucun handle n'existe à fermer.
  const handle = await open(path, "r");

  try {
    return await handle.readFile({ encoding: "utf8" });
  } finally {
    // readFile() est terminé avant le nettoyage ; close() est lui-même asynchrone.
    await handle.close();
  }
}
```

Cet exemple utilise le module natif `node:fs/promises` de Node.js. Il suppose que le
chemin désigne un fichier accessible. Le `finally` attend la fermeture du handle aussi
bien après une lecture réussie qu'après un rejet. Dans une application réelle, définis
également comment traiter une éventuelle erreur de fermeture sans masquer la cause
initiale ; les abstractions de ressources et les bibliothèques peuvent proposer leur
propre contrat de nettoyage.

Le `finally` s'exécute même si le `try` a un `return`. C'est garanti.

Attention à ça :

```js
function piege() {
  try {
    return "valeur du try";
  } finally {
    return "valeur du finally";
    // le finally écrase le return du try
    // résultat : "valeur du finally"
  }
}

console.log(piege()); // "valeur du finally"
```

Évite les `return` dans `finally`. Ça surprend tout le monde.

---

## 7) CATCH SÉLECTIF : GÉRER DIFFÉRENTES ERREURS

JS n'a pas de multi-catch natif comme Java. Tu gères avec `instanceof` ou en lisant `e.name` :

```js
function traiterJoueur(id) {
  try {
    const joueur = trouverJoueur(id);
    const stats = chargerStats(joueur);
    return stats;
  } catch (e) {
    if (e instanceof TypeError) {
      // données malformées
      console.error("données invalides :", e.message);
      return null;
    }
    if (e.name === "NotFoundError") {
      // joueur inexistant
      console.error("joueur introuvable :", id);
      return null;
    }
    // erreur non gérée ici : on la propage
    throw e;
  }
}
```

Le `throw e` à la fin : si l'erreur n'est pas de ton ressort, tu la relances. Ne jamais avaler une erreur que tu ne sais pas gérer.

---

## EXERCICES

## EXO 1 : L'ANALYSTE QUI TIENT SON PIPELINE

Écris une fonction `analyserMatch(data)` qui :

- vérifie que `data` est un objet non-null
- vérifie que `data.tirs` est un tableau non vide
- calcule la moyenne de `data.tirs` (somme / longueur)
- lève une erreur explicite si une condition n'est pas remplie
- retourne `{ xG: moyenne, statut: "ok" }` en cas de succès

Entoure l'appel dans un `try/catch` et log le bon message selon l'erreur.

Test avec : `null`, `{}`, `{ tirs: [] }`, `{ tirs: [0.3, 0.7, 0.5] }`

---

## EXO 2 : LE PIÈGE ASYNC

Explique pourquoi ce code ne catch pas l'erreur, puis corrige-le :

```js
try {
  setTimeout(() => {
    throw new Error("Gear 5 activé trop tôt");
  }, 500);
} catch (e) {
  console.log("attrapé :", e.message);
}
```

(Indice : `setTimeout` et `try/catch` ne jouent pas dans le même temps)

---

## EXO 3 : LE FINALLY QUI NETTOIE

Simule l'ouverture d'une "connexion" (un objet avec `{ ouverte: true }`), exécute une opération qui peut échouer, et assure-toi que la connexion est toujours fermée (`ouverte: false`) : succès ou échec.

Teste avec une opération qui réussit et une qui explose.

---

## RÉSUMÉ

`try/catch` attrape les erreurs synchrones dans son bloc. Pas les callbacks, pas les Promises, pas les event listeners qui s'exécutent plus tard.

L'objet `error` a trois propriétés essentielles : `name`, `message`, `stack`. La `stack` c'est ton GPS de debug.

`finally` tourne toujours : c'est là que vont les nettoyages garantis.

Si une erreur n'est pas de ton ressort : `throw e`. Ne jamais avaler silencieusement ce qu'on ne comprend pas.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.

<!-- AF-LESSON-PROFILE: errors -->

## Repères de décision

- **Pourquoi :** Une politique d'erreur explicite empêche un échec temporaire de devenir une boucle infinie et évite de cacher un défaut métier derrière un message vague.
- **Quand l’utiliser / quand l’éviter :** Classe l'erreur selon sa cause et sa récupérabilité. Retry uniquement les erreurs transitoires et les opérations idempotentes ; remonte les violations métier et sécurité sans boucle automatique.
- **Limites :** Un `catch` trop large masque la cause. Un retry peut amplifier une panne et doubler un effet ; une erreur personnalisée ne rend pas un message sûr à exposer au client.

## Mécanisme : la version sans magie

Capture au niveau qui peut décider, enrichis avec le contexte utile, transforme en contrat stable et préserve la cause originale pour le diagnostic.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Try/catch : ce qu'il attrape et ce qu'il laisse filer** se rattache à ce cas concret : La création de demande Kintana doit distinguer validation, refus d'accès, conflit d'idempotence, timeout fournisseur et panne de base.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Contrat d'erreur stable pour l'API Kintana

> **Arc Walking Dead :** une erreur n'est pas toujours un zombie à abattre. Certaines se récupèrent ; d'autres doivent arrêter la mission immédiatement.

**Mission liée à « Try/catch : ce qu'il attrape et ce qu'il laisse filer » :** Définis les erreurs du parcours de création de demande. Ajoute une conversion stable vers les réponses API, une politique retry par classe et des tests qui vérifient qu'un secret ou une pile interne ne fuit pas.

**Livrable :** un catalogue d'erreurs, un mapper HTTP, des tests de contrat et une table de décision retry/no-retry.

**Critères d’acceptation :** les erreurs métier, techniques et de sécurité sont séparées ; les causes sont conservées côté serveur ; aucun retry n'est fait sur opération non idempotente sans clé ; les réponses client restent stables.

**Transfert obligatoire :** Ajoute une panne fournisseur qui récupère après deux tentatives et compare le comportement avec une validation refusée.
