---
stability: intemporel
last_reviewed: 2026-10-31
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [decision_organisationnelle, decision_inversee]
anti_recipe_key: decision_organisationnelle+decision_inversee
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Fetch : quand ton code parle à internet

## Avant de commencer : API locale, sans dépendance Internet

La première passe utilise une petite API locale fournie dans `fixtures/fetch-local-server.mjs`. Elle sert la page de travail et les réponses HTTP sur la même origine : le navigateur peut pratiquer `fetch` sans dépendre d'un service public ni rencontrer un problème CORS artificiel. La première passe ne nécessite aucun accès Internet ; seule la machine locale doit pouvoir lancer Node.js et ouvrir le navigateur.

Depuis la racine du dépôt, ouvre un terminal et lance :

```bash
node 00-SOCLE/04-FUNDAMENTALS/05_web_basics/fixtures/fetch-local-server.mjs
```

Sous Windows PowerShell, la même commande fonctionne avec les séparateurs `/` ; tu peux aussi utiliser `node .\00-SOCLE\04-FUNDAMENTALS\05_web_basics\fixtures\fetch-local-server.mjs`. Garde le terminal ouvert et visite `http://127.0.0.1:4173/`. Ouvre la console développeur du navigateur pour effectuer les exercices. Arrête le serveur avec `Ctrl+C`. Il écoute uniquement sur `127.0.0.1` et n'est pas exposé au réseau local. Si le port `4173` est déjà occupé, arrête le serveur qui l'utilise ou change `PORT` dans la fixture et reporte le même numéro dans l'URL du navigateur.

Si le serveur local est arrêté, les requêtes échouent avec une erreur de connexion : ce comportement est distinct d'une réponse HTTP 404.

Temps de lecture ~8 min

Les vrais programmes ne vivent pas en isolation. Ils parlent à des serveurs, récupèrent des données en direct, envoient des résultats ailleurs. C'est ce que fait `fetch` : ton code envoie une requête HTTP (le protocole de communication du web) vers un serveur, et le serveur répond.

Pourquoi ça compte dès maintenant : sans requête réseau, ton application ne lit que les données déjà disponibles dans son environnement. Avec `fetch`, elle peut demander une ressource exposée par un serveur et accessible dans ce contexte. L'accès peut dépendre de l'URL, de l'authentification, des permissions et des règles CORS du navigateur : `fetch` ne donne pas accès à toutes les données du monde. Une erreur CORS signifie que le navigateur n'autorise pas ton script à lire la réponse ; elle ne prouve pas toujours que le serveur n'a reçu aucune requête ni qu'aucun effet n'a eu lieu.

---

> **Note importante** : cette leçon utilise `async/await` et les Promises. Ces concepts sont introduits ici de façon minimale pour que tu puisses faire quelque chose d'utile maintenant. Le fonctionnement complet (event loop, microtasks, Promise.all, gestion fine des erreurs async) est traité en profondeur dans `01-CADRAGE/02-ASYNC`. Si quelque chose semble mystérieux ici : c'est normal, et prévu.

---

## 1) CE QUE FETCH FAIT

```js
fetch("/api/users");
```

Cette ligne envoie une requête GET (GET = demander des données) au serveur. Mais `fetch` ne retourne pas directement les données : il retourne une **Promise** (promesse que la valeur arrivera bientôt).

Pourquoi ? Le réseau prend du temps. Pendant que la réponse voyage, JS continue à exécuter autre chose. Quand la réponse arrive, il reprend. C'est le coeur de l'asynchronicité de JS, vu en détail dans `01-CADRAGE/02-ASYNC`.

---

## 2) LIRE LA RÉPONSE : DEUX ÉTAPES

```js
fetch("/api/users")
  .then((response) => response.json()) // étape 1 : décoder la réponse en objet JS
  .then((data) => {
    console.log(data); // étape 2 : utiliser les données
  });
```

`.then()` = "quand la réponse est prête, fais ça". Cet endpoint renvoie du JSON ; `response.json()` lit le corps et le décode en valeur JavaScript. Cette lecture peut elle-même échouer si le corps n'est pas un JSON valide ou ne peut pas être lu.

---

## 3) ASYNC / AWAIT : LA VERSION LISIBLE

`async/await` est du sucre syntaxique (syntactic sugar : syntaxe plus lisible qui fait la même chose) au-dessus des Promises. Tu n'as pas besoin de tout comprendre maintenant, mais tu vas le voir partout :

```js
async function chargerJoueurs() {
  // async = cette fonction peut attendre
  const response = await fetch(
    // await = attendre que fetch réponde
    "/api/users",
  );
  const data = await response.json(); // await encore : décoder le JSON prend aussi du temps
  console.log(data);
}

chargerJoueurs();
```

`await` suspend la suite de **cette fonction `async`** jusqu'à ce que la Promise se règle. Il ne bloque pas à lui seul le thread JavaScript : d'autres tâches peuvent être traitées pendant l'attente. La fonction appelante, elle, reprend après le résultat.

---

## 4) VÉRIFIER QUE ÇA S'EST BIEN PASSÉ

Une réponse HTTP `404` ou `500` ne fait pas automatiquement rejeter la Promise de `fetch` : tu reçois un objet `Response` et dois vérifier `response.ok`. Une erreur de connexion, une requête bloquée par le navigateur ou un échec de lecture/décodage peut en revanche rejeter une Promise. L'objet `Response` expose notamment :

```js
async function chargerJoueurs() {
  const response = await fetch("/api/users");

  if (!response.ok) {
    // ok = true si code HTTP entre 200 et 299
    console.log("Erreur serveur :", response.status); // 404, 500, etc.
    return;
  }

  const joueurs = await response.json();
  console.log(joueurs);
}
```

```text
response.ok   --> true si le statut HTTP est dans la plage 200-299, false sinon
response.status --> le code HTTP exact : 200, 201, 404, 500...
response.json() --> lit le corps et tente de le décoder comme JSON ; peut échouer
```

---

## 5) QUAND QUELQUE CHOSE PLANTE : TRY / CATCH

Le réseau peut échouer (pas de connexion, serveur injoignable), le navigateur peut bloquer l'accès à la réponse, ou le décodage du corps peut échouer. `try/catch` permet de traiter ces rejets. Si tu lances toi-même une erreur quand `response.ok` vaut `false`, le `catch` peut aussi traiter ce statut HTTP :

```js
async function chargerAvecProtection() {
  try {
    const response = await fetch("/api/users");

    if (!response.ok) {
      throw new Error("Serveur en galère : " + response.status);
      //        ^ crée une erreur et la lance vers le catch
    }

    const data = await response.json();
    console.log("Données :", data.length, "entrées");
  } catch (erreur) {
    console.log("Requête impossible ou réponse inutilisable :", erreur.message);
  } finally {
    // finally s'exécute après la fin du traitement : utile pour rétablir l'interface.
    // Exemple : masquer l'indicateur de chargement et réactiver le bouton.
  }
}
```

```text
try   --> ce qui peut planter
catch  --> si ça plante : on arrive ici avec l'erreur
finally --> s'exécute dans tous les cas, erreur ou pas
throw  --> lance une erreur manuellement vers le catch
```

---

## 6) ENVOYER DES DONNÉES : POST

`fetch` peut aussi envoyer, pas seulement recevoir :

```js
async function signalerMenace(data) {
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // on dit au serveur ce qu'on envoie
    },
    body: JSON.stringify(data), // objet JS -> texte JSON pour le transport
  });

  if (!response.ok) {
    throw new Error(`Réponse HTTP ${response.status}`);
  }

  const resultat = await response.json();
  console.log("Réponse de démonstration (création simulée) :", resultat);
}

signalerMenace({
  menace: "Akatsuki",
  niveau: "CRITIQUE",
  secteur: "Frontière Sud",
});
```

`JSON.stringify` = transformer un objet JS en texte JSON. L'inverse du décodage réalisé par `response.json()`.

**Important pour cet exercice :** le serveur local AF est une fixture de démonstration. Son `POST` renvoie une réponse `201` qui ressemble à une ressource créée, mais la ressource n'est pas enregistrée sur disque ni conservée après le redémarrage du serveur. Le champ `persisted` vaut `false`. La réponse ne prouve donc pas une sauvegarde durable ; elle sert à pratiquer la forme d'une requête et le traitement de sa réponse.

---

## 7) LA CARTE MENTALE

```text
FETCH :\

1) envoyer requête --> fetch(url, options)
2) attendre réponse --> await ou .then()
3) vérifier status --> response.ok
4) décoder JSON   --> await response.json()
5) utiliser données --> le reste de ta fonction
6) gérer les pannes --> try/catch autour de tout ça
```

---

## MISSIONS

### MISSION 1 : LE RADAR DE RECONNAISSANCE

Endpoint local disponible : `/api/users`

L'équipe de reconnaissance a besoin d'un rapport. Récupère les données, affiche les noms de chaque entrée, et indique le total en fin de rapport.

---

### MISSION 2 : FILTRAGE D'ALERTE

Même endpoint local `/api/users`. Certaines cibles ont un `id > 1` : elles sont prioritaires. Filtre-les avec `filter()` et affiche seulement leurs noms. Les autres n'existent pas pour toi.

---

### MISSION 3 : TRANSFORMATION DE DOSSIER

Transforme chaque entrée en dossier structuré avec `map` :

```js
{
 codenom: name,   // le nom devient le nom de code
 zone: address.city // la ville devient la zone d'opération
}
```

Affiche le tableau transformé.

---

### MISSION 4 : RAPPORT D'INCIDENT

Envoie un POST sur `/api/posts` avec ce payload. Observe la réponse simulée et son champ `persisted: false` : ne conclus pas que l'incident est réellement stocké.

```js
{ incident: "Infiltration Akatsuki à Konoha", niveau: 9000, secteur: "Nord" }
```

Affiche la réponse de démonstration et indique dans ton compte rendu que la création n'est pas persistée.

---

### MISSION 5 : TEST DE RÉSISTANCE

Lance `fetch` sur une URL intentionnellement cassée :

```js
fetch("/api/missing");
```

Observe `response.ok` et `response.status`. Écris le code qui détecte l'échec et affiche un message d'erreur clair, sans faire planter le programme.

---

## RÉSUMÉ

`fetch` permet à ton code de demander des ressources à un serveur accessible. Tu envoies une requête, tu attends une réponse, tu vérifies son statut, tu décodes son corps et tu traites les erreurs possibles. Une réponse HTTP non-2xx n'est pas automatiquement une exception. Les exercices principaux utilisent une API locale sans accès Internet ; une API publique telle que JSONPlaceholder reste une extension facultative. `async/await` rend le flux plus lisible ; les détails de l'asynchronicité sont étudiés dans `01-CADRAGE/02-ASYNC`.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.

<!-- AF-LESSON-PROFILE: browser -->

## Repères de décision

- **Pourquoi :** Le navigateur est un environnement distinct du serveur : DOM, réseau, stockage local et cycle de vie utilisateur imposent des états et des erreurs spécifiques.
- **Quand l’utiliser / quand l’éviter :** Utilise ces mécanismes pour rendre le parcours web compréhensible, résilient et accessible. Ne stocke rien de sensible dans le navigateur et ne suppose jamais que le réseau est disponible.
- **Limites :** Le client ne fait pas autorité pour les droits, les montants ou l'état métier. Le stockage local peut être effacé, altéré ou partagé sur un appareil ; la synchronisation peut produire des conflits.

## Mécanisme : la version sans magie

Modélise les états visibles, annule les requêtes devenues inutiles, traite les réponses réseau comme non fiables et synchronise les brouillons avec un identifiant stable.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Fetch : quand ton code parle à internet** se rattache à ce cas concret : Le demandeur Kintana utilise parfois un téléphone modeste avec une connexion qui coupe. Le formulaire doit préserver son brouillon et empêcher un double envoi au retour du réseau.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : première passe : appeler une API locale

**Mission de première passe :** avec le serveur local démarré, ouvre la console développeur de la page servie, récupère `/api/users`, affiche les noms et le nombre d'entrées, puis traite séparément une réponse `/api/missing` et l'arrêt du serveur. Note les commandes saisies et les résultats observés ; la page d'accueil est un point d'entrée, pas une application déjà construite.

**Livrable :** un script ou une page de travail qui affiche un résultat et un message d'erreur explicite.

**Critères d’acceptation :** la réponse est vérifiée avec `response.ok` ; le JSON est décodé ; le 404 est distingué d'un échec de connexion ; la mission n'exige ni stockage persistant ni clé d'idempotence.

## Transfert produit différé : Kintana : parcours web résilient

Ce transfert est **différé et non bloquant** : il ne constitue **pas une gate de la première passe Fetch**. Réalise-la seulement après DOM, Fetch, Storage, les bases d'async, la validation des formulaires et les notions d'accessibilité nécessaires. Si l'un de ces prérequis n'a pas encore été étudié, consigne-le et reporte ce transfert sans bloquer la progression.

Construis alors une tranche du formulaire Kintana : états chargement/succès/vide/erreur/offline, brouillon non sensible, clé d'idempotence côté serveur et synchronisation en attente. Le traitement d'une réponse tardive après fermeture d'écran nécessite également les notions d'annulation et de cycle de vie asynchrone.

**Livrable avancé :** parcours UI, test navigateur ou test de composant, scénario de coupure/reprise réseau et preuve d'accessibilité clavier.

**Critères d'acceptation avancés :** aucune action n'est affichée comme validée avant confirmation ; le brouillon survit au rafraîchissement dans les limites annoncées ; le second envoi n'a pas de double effet ; le stockage indisponible et la réponse tardive sont traités.

**Statut : différé, non bloquant pour la progression Fundamentals.**

## Sources de référence

- [MDN : Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) : promesses, statuts HTTP, lecture du corps et erreurs.
- [MDN : CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) : restrictions d'accès aux ressources cross-origin depuis un navigateur.
- [MDN : Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) : référence pour les requêtes, réponses et erreurs. L’API locale AF suffit à réaliser les exercices sans service externe.

**Règle de preuve :** un statut HTTP réussi ou une réponse JSON de démonstration ne prouve pas à lui seul qu'un effet métier a été durablement enregistré.
