---
stability: intemporel
last_reviewed: 2026-10-31
depends_on_vendor: false
acte: comprendre
cognitive_level: L4
perturbation_modes: [changement_echelle, preuve_partielle]
anti_recipe_key: changement_echelle+preuve_partielle
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Kamehameha à charge :** la puissance n'arrive pas “quand tu as appelé la fonction”, elle arrive quand le runtime décide que la file peut avancer. Ici, le vrai boss est le timing, pas la syntaxe.

Temps de lecture ~8 min

Ce fichier sort de la numérotation standard. Il couvre un concept connexe à ce chapitre, non bloquant pour la suite. Lis-le si tu veux aller plus loin sur ce point avant de passer au module suivant.

---

# Abortcontroller : annuler ce qui ne doit plus se terminer

<!-- AF-DIAGRAM:abort-controller -->

```text
AbortController créé
        │
        ├── signal passé à fetch
        │       │
        │       ├── réponse avant annulation ──► traiter si utile
        │       └── abort() avant la fin ──────► rejet de la requête
        │
        └── la même intention d’annulation peut être partagée
            entre plusieurs opérations qui prennent ce signal
```

`abort()` n’annule pas rétroactivement un travail déjà terminé. Seules les opérations qui observent le signal peuvent réagir à l’annulation ; pour une API maison, il faut transmettre le signal et définir son comportement d’arrêt.

Temps de lecture ~3 min

Tu lances un fetch. L'utilisateur navigue ailleurs. La requête peut continuer à consommer des ressources et une réponse devenue obsolète peut encore tenter de mettre à jour l'interface. C'est un travail inutile et un risque de résultat périmé ; ce n'est pas automatiquement une fuite mémoire. `AbortController` permet au client d'interrompre les opérations qui écoutent son signal.

---

## 1) LE PROBLÈME : LE FETCH QUI NE S'ARRÊTE JAMAIS

```js
// le scénario classique : l'utilisateur cherche un joueur
async function rechercherJoueur(nom) {
  const résultat = await fetch(`/api/joueurs?q=${nom}`);
  const data = await résultat.json();
  afficherRésultats(data); // si la vue a changé : résultat obsolète ou mise à jour hors contexte
}

// l'utilisateur tape vite
rechercherJoueur("Na"); // fetch 1 : en cours
rechercherJoueur("Nar"); // fetch 2 : en cours
rechercherJoueur("Naru"); // fetch 3 : en cours
// les 3 fetches tournent en parallèle, arrivent dans un ordre imprévisible
// le fetch 2 peut arriver après le fetch 3 et écraser les bons résultats
```

Sans annulation : les requêtes obsolètes arrivent, s'exécutent, et peuvent corrompre l'état.

---

## 2) ABORTCONTROLLER : LA MÉCANIQUE

```text
AbortController
  |
  +-- .signal  --> AbortSignal : passé aux opérations à contrôler
  |
  +-- .abort()  --> déclenche l'annulation sur toutes les opérations qui écoutent ce signal
```

```js
const controller = new AbortController();
const signal = controller.signal; // l'objet qu'on passe aux opérations

// passer le signal à fetch : fetch l'écoute nativement
const réponse = await fetch("/api/joueurs", { signal });

// annuler depuis n'importe où :
controller.abort(); // Fetch rejette côté client avec une erreur AbortError
```

`signal` est l'AbortSignal (signal d'abandon). `fetch` le connaît nativement : quand
`.abort()` intervient pendant que l'opération est encore annulable, Fetch interrompt son
travail côté client et rejette la Promise avec `AbortError`. Cela ne prouve pas que le
serveur n'a pas déjà reçu ou exécuté la requête.

---

## 3) PATTERN COMPLET : ANNULER ET IGNORER LES RÉSULTATS OBSOLÈTES

Ce pattern annule la requête précédente quand une nouvelle recherche démarre. Ce n'est
pas un debounce : un debounce attend une courte période sans nouvelle frappe avant de
lancer la requête. Ici, chaque appel démarre immédiatement une requête.

```js
let controller = null;
let derniereRecherche = 0;

async function rechercherJoueur(nom) {
  const rechercheId = ++derniereRecherche;
  controller?.abort(); // demande l'arrêt côté client de l'ancienne requête
  const monController = new AbortController();
  controller = monController;

  try {
    const url = `/api/joueurs?q=${encodeURIComponent(nom)}`;
    const réponse = await fetch(url, { signal: monController.signal });
    if (!réponse.ok) throw new Error(`HTTP ${réponse.status}`);
    const data = await réponse.json();

    // Une ancienne réponse peut déjà être arrivée ou une API peut ignorer le signal.
    // Ne publie les résultats que si cette recherche est encore la plus récente.
    if (rechercheId === derniereRecherche) afficherRésultats(data);
  } catch (err) {
    if (err.name === "AbortError") return null; // annulation attendue
    throw err; // autre erreur : la propager
  } finally {
    if (controller === monController) controller = null;
  }
}

// Si l'utilisateur tape vite, chaque appel annule le précédent.
void rechercherJoueur("Na").catch((error) =>
  console.error("Recherche impossible", error),
);
void rechercherJoueur("Nar").catch((error) =>
  console.error("Recherche impossible", error),
);
void rechercherJoueur("Naru").catch((error) =>
  console.error("Recherche impossible", error),
);
```

L'identifiant de recherche protège l'interface même si l'ancienne réponse s'est déjà
terminée ou si une API maison ne respecte pas le signal. L'annulation réduit le travail
côté client ; le contrôle de génération empêche une réponse périmée de remplacer la plus
récente. La distinction `err.name === "AbortError"` évite de traiter une annulation
volontaire comme une panne réseau. Dans un handler d'interface réel, traite aussi les
erreurs non liées à l'annulation au niveau adapté.

---

## 4) TIMEOUT AVEC ABORTCONTROLLER

`AbortController` remplace le pattern manuel de timeout sur fetch :

```js
// avant : simuler un timeout à la main
async function fetchAvecTimeout(url, ms) {
  const promesseFetch = fetch(url);
  let timeoutId;
  const promesseTimeout = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error("timeout")), ms);
  });
  try {
    return await Promise.race([promesseFetch, promesseTimeout]);
  } finally {
    clearTimeout(timeoutId); // évite de conserver le timer si fetch gagne
  }
  // Limite : si le timeout gagne, Promise.race ne stoppe pas le fetch.
}

// avec AbortController : annulation côté client
async function fetchAvecTimeout(url, ms) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ms);

  try {
    const réponse = await fetch(url, { signal: controller.signal });
    // Le délai reste actif pendant la lecture du corps, pas seulement jusqu'aux headers.
    return await réponse.json();
  } catch (err) {
    if (err.name === "AbortError") {
      const timeoutError = new Error(
        `Timeout : opération interrompue côté client après ${ms}ms`,
      );
      timeoutError.name = "TimeoutError";
      throw timeoutError;
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}
```

`AbortController` demande au client Fetch d'interrompre l'opération locale et de libérer les
ressources qu'il contrôle. Il ne garantit pas que le serveur n'a pas déjà reçu ou traité la
requête. Pour une écriture (POST, paiement, commande), un timeout ou un abort ne justifie pas
à lui seul un nouvel envoi : utilise une clé d'idempotence, vérifie le statut de l'opération
ou rapproche les résultats. Un abort volontaire doit aussi être distingué d'un timeout
lorsqu'un même `AbortSignal` sert à plusieurs causes d'annulation.

---

## 5) SIGNAL.ABORTED ET SIGNAL SUR D'AUTRES OPÉRATIONS

```js
const controller = new AbortController();

// vérifier si le signal est déjà aborted (annulé)
console.log(controller.signal.aborted); // false

controller.abort();

console.log(controller.signal.aborted); // true

// écouter l'événement d'annulation manuellement
controller.signal.addEventListener("abort", () => {
  console.log("annulé, raison :", controller.signal.reason);
});
controller.abort("utilisateur a navigué ailleurs");
// affiche : "annulé, raison : utilisateur a navigué ailleurs"

// abort() avec raison (ES2022)
controller.abort(new Error("timeout dépassé")); // la raison peut être une Error
```

`signal.aborted` est utile pour vérifier l'état avant une longue opération : si le signal est déjà aborted, inutile de la démarrer.

---

## 6) L'EXEMPLE QUI CASSE : RÉUTILISER UN CONTROLLER APRÈS ABORT

```js
const controller = new AbortController();

controller.abort(); // annulé

// ERREUR : tenter de réutiliser le même controller pour une nouvelle requête
const réponse = await fetch("/api/data", { signal: controller.signal });
// le signal est déjà aborted : le fetch est annulé IMMÉDIATEMENT, avant même de commencer

// CORRECT : créer un nouveau controller pour chaque requête
const controller2 = new AbortController();
const réponse2 = await fetch("/api/data", { signal: controller2.signal });
```

Un `AbortController` est à usage unique. Une fois `.abort()` appelé, son signal reste `aborted: true` pour toujours. Pour une nouvelle requête, il faut un nouveau controller.

---

## EXERCICES

## EXO 1 : la recherche live sans spam

Le moteur de recherche du dashboard Champions League envoie une requête à chaque frappe de clavier. Sans annulation et contrôle de fraîcheur : si l'utilisateur tape "Mbappé" en 300ms, plusieurs requêtes peuvent partir et revenir dans un ordre différent de celui des frappes. Une réponse ancienne ne doit pas remplacer le résultat de la recherche la plus récente.

Implémente une fonction `rechercheJoueur(nom)` qui :

- Annule côté client la requête précédente avant d'en lancer une nouvelle.
- Ignore les `AbortError` attendus sans masquer les autres erreurs.
- Vérifie `response.ok` et encode le terme de recherche dans l'URL.
- Protège l'interface contre une réponse ancienne qui arriverait malgré l'annulation.
- Retourne `null` si la requête courante est annulée avant de se terminer.

Décris aussi le cas où la première réponse est arrivée juste avant le second appel : l'annulation
ne peut pas la retirer rétroactivement. Le garde de génération doit empêcher toute publication
ultérieure d'un résultat qui n'est plus courant.

---

## EXO 2 : le fetch avec deadline de Michael Scofield

Michael a 5 secondes pour récupérer le plan de la section C avant que le gardien ne revienne. Si la réponse ne revient pas dans les 5 secondes : annuler, ne pas attendre, passer au plan B.

Implémente `fetchAvecDeadline(url, secondes)` :

- Utilise `AbortController` pour un timeout propre (pas `Promise.race` seul).
- Si le timeout s'écoule : throw une `DeadlineError` avec le message `"délai dépassé : ${secondes}s"`.
- Si la requête réussit avant le timeout : retourner les données et s'assurer que le timer est bien annulé (pas de fuite).
- Si la requête échoue pour une vraie erreur réseau : propager cette erreur, pas une DeadlineError.

---

## RÉSUMÉ

`AbortController` permet de demander l'annulation côté client d'un fetch ou de toute opération qui observe un `AbortSignal`.
Un `AbortController` est à usage unique : une fois `.abort()` appelé, son signal reste aborted. Créer un nouveau controller par requête.
Toujours distinguer `AbortError` (annulation demandée) des vraies erreurs réseau et des timeouts.
`signal.aborted` permet de vérifier l'état avant de démarrer une opération longue.
`setTimeout + controller.abort()` arrête le travail client qui écoute le signal ; `Promise.race` seul ne fait que choisir le premier résultat. Aucun des deux ne garantit qu'un serveur n'a pas déjà traité une écriture distante.

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.

<!-- AF-LESSON-PROFILE: async -->

## Repères de décision

- **Pourquoi :** L'asynchronisme permet au système de continuer pendant l'attente, mais introduit ordre, concurrence, annulation et erreurs différées.
- **Quand l’utiliser / quand l’éviter :** Utilise-le pour I/O, tâches longues, notifications ou flux continus. Évite les traitements concurrents sans limite ; impose timeout, annulation et backpressure quand le producteur peut dépasser le consommateur.
- **Limites :** `Promise.race` ne tue pas l'opération perdante ; `Promise.all` rejette au premier échec observable ; `allSettled` collecte les résultats mais ne fournit pas de stratégie de reprise. La mémoire partagée exige une synchronisation explicite.

## Mécanisme : la version sans magie

Sépare tâche, attente et consommation. Fixe un délai, une politique d'annulation, une limite de concurrence et une règle de rejeu/idempotence selon les effets.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Abortcontroller : annuler ce qui ne doit plus se terminer** se rattache à ce cas concret : Le service de notification Kintana traite plusieurs demandes. Un fournisseur lent ne doit pas bloquer toute la file ni provoquer des doublons au retry.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Worker de notifications asynchrones fiable

> **Arc One Piece / Grand Line :** un message peut arriver tard, deux fois ou pas du tout. Le navigateur ne promet pas que tout le monde rame à la même vitesse.

**Mission liée à « Abortcontroller : annuler ce qui ne doit plus se terminer » :** Implémente un worker pour les notifications Kintana avec concurrence bornée, timeout, annulation quand elle est supportée, backoff avec jitter et clé de déduplication. Instrumente le nombre en attente et l'âge du plus vieux message.

**Livrable :** un worker, une horloge contrôlée dans les tests, un test de timeout, un test de rejeu et un scénario de saturation.

**Critères d’acceptation :** la concurrence ne dépasse jamais la limite ; le message échoué est classé ; un replay ne double pas l'effet ; l'annulation est distinguée d'un timeout ; le backlog est observable.

**Transfert obligatoire :** Augmente le débit producteur jusqu'à dépasser le débit consommateur. Explique quand appliquer backpressure, rejeter ou stocker temporairement.
