---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [changement_echelle, solution_concurrente]
anti_recipe_key: changement_echelle+solution_concurrente
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : mur de siège :** le bug n'est pas “où ça a explosé ?”, mais “où la première fissure est-elle apparue ?”. Ici, chaque log, test et reproduction est une empreinte dans le mur.

# Propagation d'erreurs : qui catch quoi et à quel niveau

Temps de lecture ~7 min

Une erreur levée quelque part dans ton code ne disparaît pas. Elle remonte la call stack jusqu'à ce que quelqu'un la catch. Si personne ne la catch : le programme crash.

Le vrai problème c'est pas "est-ce que je catch" : c'est "est-ce que je catch au bon niveau, avec la bonne réaction".

---

## 1) COMMENT UNE ERREUR REMONTE

Visualisation directe :

```text
main()
 └─> processerMatch()
    └─> chargerJoueurs()
       └─> queryDB()
          └─> ERREUR LEVÉE ICI

si queryDB ne catch pas --> l'erreur remonte à chargerJoueurs
si chargerJoueurs ne catch pas --> remonte à processerMatch
si processerMatch ne catch pas --> remonte à main
si main ne catch pas --> crash
```

```js
class DatabaseError extends Error {
  constructor(operation, message) {
    super(message);
    this.name = "DatabaseError";
    this.operation = operation;
  }
}

async function queryDB(sql, params) {
  // Stub pédagogique : il représente un driver qui rejette la Promise.
  // sql et params montrent la forme de l'appel ; aucune base n'est appelée ici.
  void sql;
  void params;
  throw new DatabaseError("SELECT", "timeout après 5000ms");
}

async function chargerJoueurs(matchId) {
  // PostgreSQL : les valeurs passent séparément du texte SQL.
  // Pas de try/catch ici : la Promise rejetée traverse et remonte.
  return queryDB("SELECT * FROM joueurs WHERE match_id = $1", [matchId]);
}

async function processerMatch(matchId) {
  try {
    const joueurs = await chargerJoueurs(matchId);
    return analyserJoueurs(joueurs);
  } catch (e) {
    // c'est ici que DatabaseError arrive
    if (e instanceof DatabaseError) {
      console.error("DB indisponible pendant le traitement du match", matchId);
      return { statut: "echec", raison: "db_timeout" };
    }
    throw e; // le reste remonte encore
  }
}
```

`chargerJoueurs` ne catch pas : c'est correct. Ce n'est pas son niveau de responsabilité.

---

## 2) LE PRINCIPE : CATCH AU BON NIVEAU

Règle : tu catches une erreur uniquement si tu peux faire quelque chose d'utile avec elle.

```text
niveau bas (queryDB)   : lever l'erreur, ne pas la catcher
niveau métier (service) : catcher et transformer en erreur métier
niveau API (controller) : catcher et transformer en réponse HTTP
niveau app (main)    : catcher et logger sans crash
```

Mauvais pattern : catch sans action :

```js
async function chargerJoueurs(matchId) {
  try {
    return await queryDB("SELECT * FROM joueurs WHERE match_id = $1", [
      matchId,
    ]);
  } catch (e) {
    console.log("erreur");
    // on retourne undefined silencieusement
    // l'appelant ne sait pas que ça a foiré
  }
}
```

`chargerJoueurs` a avalé l'erreur. L'appelant reçoit `undefined` et continue comme si de rien n'était. Le bug apparaît plus loin, sans contexte. Impossible à debugger.

Bon pattern : laisser remonter ou transformer :

```js
async function chargerJoueurs(matchId) {
  // pas de try/catch : la Promise rejetée remonte, c'est voulu
  return queryDB("SELECT * FROM joueurs WHERE match_id = $1", [matchId]);
}

// ou transformer si tu as de la valeur à ajouter
async function chargerJoueurs(matchId) {
  try {
    return await queryDB("SELECT * FROM joueurs WHERE match_id = $1", [
      matchId,
    ]);
  } catch (e) {
    // transformer avec du contexte supplémentaire
    throw new DatabaseError(
      "chargerJoueurs",
      `match ${matchId} : ${e.message}`,
    );
  }
}
```

---

## 3) RETHROWING : ATTRAPER PUIS RELANCER

Pattern courant : tu catches pour inspecter, tu relances ce qui n'est pas de ton ressort.

```js
function processerDonnees(data) {
  try {
    valider(data);
    transformer(data);
    sauvegarder(data);
  } catch (e) {
    if (e instanceof ValidationError) {
      // ça, je sais gérer
      logWarning("données invalides ignorées", { data, erreur: e.message });
      return null;
    }
    // DatabaseError, TypeError, etc. : pas mon rôle
    // je relance sans toucher
    throw e;
  }
}
```

`throw e` : relance l'erreur originale avec sa stack trace intacte.

Ne jamais faire ça :

```js
catch (e) {
 throw new Error(e.message)
 // tu perds la stack trace originale
 // tu perds le type de l'erreur
 // tu perds toutes les propriétés custom
}
```

---

## 4) WRAPPING : ENRICHIR AVANT DE RELANCER

Parfois tu veux ajouter du contexte sans perdre l'original.

```js
class ServiceError extends Error {
  constructor(message, cause) {
    super(message, { cause }); // option standard Error cause depuis ES2022
    this.name = "ServiceError";
  }
}

async function serviceJoueurs(matchId) {
  try {
    return await chargerJoueurs(matchId);
  } catch (e) {
    // wrapping : contexte métier + cause originale préservée
    throw new ServiceError(
      `Impossible de charger les joueurs pour le match ${matchId}`,
      e,
    );
  }
}

async function exempleService() {
  try {
    await serviceJoueurs(42);
  } catch (e) {
    console.log(e.message); // contexte métier ajouté
    console.log(e.cause.message); // cause initiale conservée
    console.log(e.cause.name); // "DatabaseError"
  }
}

exempleService();
```

`e.cause` c'est un standard ES2022. Il préserve toute la chaîne de causalité.

---

## 5) ARCHITECTURE DE PROPAGATION EN COUCHES

Exemple complet : une API de stats de foot avec propagation bien structurée.

```text
Request HTTP
  └─> Controller     : catch tout, répond en JSON
     └─> Service    : catch erreurs métier, transforme
        └─> Repository : lève des DatabaseError
           └─> DB : connexion, queries
```

```js
// couche basse:soulève sans catcher
class MatchRepository {
  async trouver(id) {
    // Exemple PostgreSQL : $1 est un paramètre, pas une concaténation SQL.
    const result = await this.db.query("SELECT * FROM matchs WHERE id = $1", [
      id,
    ]);
    if (!result.rows.length) {
      throw new NotFoundError("Match", id);
    }
    return result.rows[0];
  }
}

// couche service:transforme ou enrichit
class MatchService {
  async getStatsMatch(id) {
    try {
      const match = await this.repo.trouver(id);
      return calculerStats(match);
    } catch (e) {
      if (e instanceof NotFoundError) {
        throw e; // relance directement:le controller sait quoi faire
      }
      // erreur inattendue : enrichir avec le contexte métier
      throw new ServiceError(`Stats indisponibles pour match ${id}`, e);
    }
  }
}

// couche controller:transforme en réponse HTTP
class MatchController {
  async handleGetStats(req, res) {
    try {
      const stats = await this.service.getStatsMatch(req.params.id);
      res.json({ success: true, data: stats });
    } catch (e) {
      if (e instanceof NotFoundError) {
        return res.status(404).json({ error: e.message });
      }
      if (e instanceof ServiceError) {
        // log complet pour le monitoring, message générique pour l'opérateur
        logError(e);
        return res.status(500).json({ error: "erreur interne" });
      }
      // vraiment inattendu
      logError(e);
      res.status(500).json({ error: "erreur interne" });
    }
  }
}
```

Chaque couche a un rôle clair. Personne n'avale silencieusement.

---

## 6) LE HANDLER GLOBAL : DERNIER FILET

En Node.js, tu peux avoir un handler global pour les erreurs non catchées. C'est le dernier recours, pas la solution.

```js
// pour les Promises non catchées
process.on("unhandledRejection", (reason, promise) => {
  console.error("Promise non catchée :", reason);
  // log, alerte Sentry, puis on décide si on crash ou pas
  process.exit(1); // en prod : vaut mieux crash proprement que continuer en état indéfini
});

// pour les exceptions synchrones non catchées
process.on("uncaughtException", (error) => {
  console.error("Exception non catchée :", error);
  process.exit(1);
});
```

Ce handler global ne remplace pas une bonne architecture. Il attrape ce qui a raté les filets du bas. Si tu t'y retrouves souvent, tu as un problème de propagation quelque part.

---

## 7) ANTI-PATTERNS À ÉVITER

### Catch vide

```js
try {
  opération();
} catch (e) {
  // rien
}
// l'erreur disparaît. tu sais plus si ça marche ou pas.
```

### Catch qui log et retourne undefined

```js
try {
  return opération();
} catch (e) {
  console.log(e);
  // retourne undefined implicitement
  // l'appelant pense avoir un résultat valide
}
```

### Catch trop large qui écrase l'info

```js
try {
  opération();
} catch (e) {
  throw new Error("quelque chose s'est mal passé");
  // tu viens de perdre tout le contexte de l'erreur originale
}
```

---

## EXERCICES

## EXO 1 : LA CHAÎNE GARO

Implémente trois fonctions en cascade : `detecterHorror()`, `alerterChevalier()`, `engagerCombat()`.

Chaque fonction peut lancer une erreur différente. Mets le catch uniquement dans `main()`, et fais remonter correctement pour que `main` sache exactement ce qui a foiré et à quel niveau.

---

## EXO 2 : LE WRAPPING

Reprends l'exemple Garo. Modifie `alerterChevalier` pour qu'elle wrappe les erreurs de `detecterHorror` dans une `AlertError` en préservant `cause`.

Dans le catch final, affiche à la fois le message wrapper et le message de la cause.

---

## EXO 3 : ARCHITECTURE EN COUCHES

Crée une mini-architecture Repository / Service / Controller pour un système de joueurs :

- `JoueurRepository.find(id)` lève `NotFoundError` si le joueur n'existe pas
- `JoueurService.getProfile(id)` relance `NotFoundError`, wrappe le reste
- `JoueurController.handle(id)` traduit en statut et message JSON

Teste avec un id valide et un id inexistant.

---

## RÉSUMÉ

Une erreur remonte jusqu'à ce que quelqu'un la catch. Si personne ne la catch, le programme crash.

Tu catches seulement si tu peux agir. Sinon tu relances avec `throw e` : ou tu enrichis avec `cause` avant de relancer.

Ne jamais avaler silencieusement. Un catch vide est pire qu'un crash : tu sais même plus que ça a cassé.

L'architecture en couches donne à chaque niveau un rôle clair : lever, transformer, ou répondre.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.

<!-- AF-LESSON-PROFILE: errors -->

## Repères de décision

- **Pourquoi :** Une politique d'erreur explicite empêche un échec temporaire de devenir une boucle infinie et évite de cacher un défaut métier derrière un message vague.
- **Quand l’utiliser / quand l’éviter :** Classe l'erreur selon sa cause et sa récupérabilité. Retry uniquement les erreurs transitoires et les opérations idempotentes ; remonte les violations métier et sécurité sans boucle automatique.
- **Limites :** Un `catch` trop large masque la cause. Un retry peut amplifier une panne et doubler un effet ; une erreur personnalisée ne rend pas un message sûr à exposer au client.

## Mécanisme : la version sans magie

Capture au niveau qui peut décider, enrichis avec le contexte utile, transforme en contrat stable et préserve la cause originale pour le diagnostic.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Propagation d'erreurs : qui catch quoi et à quel niveau** se rattache à ce cas concret : La création de demande Kintana doit distinguer validation, refus d'accès, conflit d'idempotence, timeout fournisseur et panne de base.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Contrat d'erreur stable pour l'API Kintana

> **Arc Walking Dead :** une erreur n'est pas toujours un zombie à abattre. Certaines se récupèrent ; d'autres doivent arrêter la mission immédiatement.

**Mission liée à « Propagation d'erreurs : qui catch quoi et à quel niveau » :** Définis les erreurs du parcours de création de demande. Ajoute une conversion stable vers les réponses API, une politique retry par classe et des tests qui vérifient qu'un secret ou une pile interne ne fuit pas.

**Livrable :** un catalogue d'erreurs, un mapper HTTP, des tests de contrat et une table de décision retry/no-retry.

**Critères d’acceptation :** les erreurs métier, techniques et de sécurité sont séparées ; les causes sont conservées côté serveur ; aucun retry n'est fait sur opération non idempotente sans clé ; les réponses client restent stables.

**Transfert obligatoire :** Ajoute une panne fournisseur qui récupère après deux tentatives et compare le comportement avec une validation refusée.
