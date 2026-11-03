---
stability: intemporel
last_reviewed: 2026-10
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [decision_inversee, preuve_partielle]
anti_recipe_key: decision_inversee+preuve_partielle
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Kamehameha à charge :** la puissance n'arrive pas “quand tu as appelé la fonction”, elle arrive quand le runtime décide que la file peut avancer. Ici, le vrai boss est le timing, pas la syntaxe.

# Chaîner des opérations async sans perdre les erreurs en route

<!-- AF-DIAGRAM:promise-chain -->

```text
Promise initiale
      │
      ▼
 .then(étape A) ── valeur retournée ──► .then(étape B) ──► étape C
      │                                      │
      └── throw / rejet ─────────────────────┴──────────────┐
                                                            ▼
                                                    .catch(handler)
                                                     │           │
                                           retourne fallback   throw err
                                                     │           │
                                                     ▼           ▼
                                               chaîne reprise  rejet propagé
```

Une chaîne de Promises transmet la valeur retournée d'une étape à la suivante. Une exception ou une Promise rejetée saute les handlers de réussite jusqu'au prochain handler de rejet. Un `catch` peut récupérer l'erreur en retournant une valeur, ou la propager en lançant une nouvelle erreur.

Temps de lecture ~8 min

Un `.then()` retourne une Promise.
Ça veut dire que tu peux en chaîner un autre dessus. Et encore un autre.
C'est le chain reactor : chaque étape reçoit le résultat de la précédente, le transforme, et passe.

Le problème classique : une erreur qui arrive au maillon 3 et que personne ne voit.
Elle tombe dans le vide. Silencieuse. En prod, ça donne un bug impossible à tracer.

Ce module : construire des chaînes solides. Pas juste belles, solides.

---

## 1) LA CHAÎNE DE BASE

Michael Scofield prépare son évasion. Chaque étape dépend de la précédente.
Pas de tunnel sans plan. Pas de plan sans contact. Pas de contact sans argent.

```js
obtenirFinancement()
  .then((argent) => contacterComplice(argent)) // reçoit le résultat de l'étape précédente
  .then((complice) => dessinerPlan(complice)) // reçoit ce que contacterComplice a résolu
  .then((plan) => creuser(plan)) // et ainsi de suite
  .then((tunnel) => console.log("sortie trouvée :", tunnel))
  .catch((err) => console.log("plan compromis :", err.message));
```

Un seul `.catch()` à la fin attrape n'importe quelle erreur dans toute la chaîne.
C'est la force du chain reactor : une seule sortie d'urgence pour tout le pipeline.

---

## 2) RETOURNER UNE VALEUR VS RETOURNER UNE PROMISE

<!-- AF-DIAGRAM:promise -->

```text
        ┌──────────┐
        │ pending  │
        └────┬─────┘
             │ résultat
       ┌─────┴─────┐
       ▼           ▼
┌────────────┐ ┌────────────┐
│ fulfilled  │ │ rejected   │
└─────┬──────┘ └─────┬──────┘
      │              │
      └──────┬───────┘
             ▼
       ┌───────────┐
       │ handlers  │
       └───────────┘
```

Une Promise a trois états observables : `pending`, `fulfilled` ou `rejected`. Une Promise en attente finit par être fulfilled avec une valeur ou rejected avec une raison. Le terme « résolue » est souvent employé à l’oral, mais une Promise résolue peut adopter l’état d’une autre Promise : ce n’est pas un quatrième état observable.

La règle : ce que tu `return` dans un `.then()` devient la valeur du `.then()` suivant.

Si tu retournes une valeur brute : elle est wrappée automatiquement dans une Promise résolue.
Si tu retournes une Promise : la chaîne attend qu'elle se résout avant de continuer.

```js
Promise.resolve(100)
  .then((n) => n * 2) // retourne 200 (valeur brute => wrappée)
  .then((n) => n + 50) // reçoit 200, retourne 250
  .then((n) => {
    return fetchBonus(n); // retourne une Promise => la chaîne attend
  })
  .then((resultat) => {
    // ici on a le résultat résolu de fetchBonus
    console.log(resultat);
  });
```

Erreur classique : oublier le `return`.

```js
.then(n => {
 fetchBonus(n)        // oublié le return => la chaîne passe à `undefined`
})
.then(resultat => {
 console.log(resultat)    // undefined. fetchBonus a tourné mais personne l'a attendu.
})
```

---

## 3) GÉRER LES ERREURS AU BON NIVEAU

Un `.catch()` à la fin attrape tout. Mais parfois tu veux récupérer une erreur
à un maillon précis, et continuer la chaîne quand même.

Exemple : T-Bag bloque l'accès aux fournitures. Mais Michael a un plan B.

```js
obtenirFinancement()
  .then((argent) => obtenirFournitures(argent))
  .catch((err) => {
    // T-Bag a volé les fournitures. Plan B : improviser avec ce qu'on a.
    console.log("fournitures bloquées, on improvise");
    return { outils: ["cuillère", "corde"], improvise: true };
    // si on retourne ici, la chaîne CONTINUE avec ce fallback
  })
  .then((fournitures) => dessinerPlan(fournitures)) // reçoit le fallback ou les vraies fournitures
  .then((plan) => creuser(plan))
  .catch((err) => {
    // ce catch ne voit que les erreurs après le premier catch
    console.log("évasion impossible :", err.message);
  });
```

Ce que `.catch()` fait quand son handler retourne une valeur : il transforme le rejet en réussite et la chaîne reprend avec cette valeur.

**Attention : ne rien retourner ne propage pas l'erreur.** Un handler qui termine sans `return` renvoie implicitement `undefined` : la chaîne reprend donc avec `undefined`. Pour propager le rejet après l'avoir journalisé, fais un `throw` explicite :

```js
.catch((err) => {
  console.error("logged :", err.message);
  throw err; // le prochain handler de rejet reçoit encore l'erreur
});
```

Pour récupérer volontairement l'erreur, retourne un fallback explicite et assure-toi que ce fallback respecte le contrat attendu par l'étape suivante.

---

## 4) FINALLY : CE QUI TOURNE TOUJOURS

Walter White nettoie le labo. Peu importe si la cuisson s'est bien passée ou pas.

```js
preparerLot()
  .then((lot) => livrerLot(lot))
  .catch((err) => {
    console.log("lot perdu :", err.message);
    throw err; // journaliser n'est pas récupérer : l'échec reste visible
  })
  .finally(() => {
    // Si le premier appel lève une exception, le second ne sera pas appelé.
    nettoyerLaboratoire();
    fermerConnexionDB();
  });
```

Cet exemple suppose des fonctions de nettoyage synchrones et sans erreur. Une vraie orchestration doit aussi définir le comportement si un nettoyage échoue.

`finally` :

- ne reçoit ni la valeur réussie ni la raison du rejet ;
- s'exécute lorsque la chaîne atteint ce point, après réussite comme après rejet ;
- préserve normalement le résultat précédent si son callback se termine correctement ;
- peut toutefois remplacer le résultat final si son callback lance une exception ou retourne une Promise rejetée.

Le callback de nettoyage doit lui-même être fiable. Si la première fonction de nettoyage lève une exception dans l'exemple ci-dessus, la seconde ne sera pas appelée ; lorsque les deux nettoyages sont impératifs, protège chacun d'eux avec `try/finally` ou une stratégie explicite de collecte d'erreurs.

---

## 5) ANTI-PATTERN : LE CALLBACK HELL AVEC DES PROMISES

Des Promises imbriquées. Le pire des deux mondes.

```js
// MAUVAIS : pyramid of doom avec des .then() imbriqués
obtenirFinancement().then((argent) => {
  contacterComplice(argent).then((complice) => {
    dessinerPlan(complice).then((plan) => {
      creuser(plan).then((tunnel) => {
        console.log(tunnel);
      });
    });
  });
});

// BON : chaîne plate, chaque étape retourne sa Promise
obtenirFinancement()
  .then((argent) => contacterComplice(argent))
  .then((complice) => dessinerPlan(complice))
  .then((plan) => creuser(plan))
  .then((tunnel) => console.log(tunnel))
  .catch((err) => console.log(err.message));
```

Dans cette version, les Promises internes ne sont ni retournées ni chaînées à la Promise extérieure. Le `.catch()` final de la chaîne extérieure ne récupère donc pas automatiquement un rejet provenant de ces appels internes. Les erreurs peuvent devenir des rejets non gérés et le résultat final peut arriver trop tôt. Retourner chaque Promise relie les étapes et rétablit la propagation attendue.

---

## 6) CHAÎNE AVEC TRANSFORMATION DE DONNÉES

Le cas le plus courant en prod : fetch → parse → filtrer → afficher.

```js
fetch("https://api.paradis.sc/personnages")
  .then((response) => {
    if (!response.ok) {
      // on transforme une réponse HTTP d'erreur en rejection de Promise
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json(); // retourne une Promise
  })
  .then((personnages) =>
    personnages.filter((p) => p.regiment === "Exploration"),
  )
  .then((soldats) => soldats.map((s) => ({ nom: s.nom, rang: s.rang })))
  .then((data) => afficher(data))
  .catch((err) => {
    // attrape : erreur réseau, HTTP error, erreur de parse JSON, erreur dans filter ou map
    console.log("impossible de charger les personnages :", err.message);
  });
```

Chaque `.then()` fait une seule chose. La chaîne est lisible ligne par ligne.
L'erreur HTTP est convertie manuellement en rejection parce que `fetch` ne rejette pas sur les 4xx/5xx.

---

## EXERCICES

## EXO 1 : le pipeline de vote du Ballon d'Or

La cérémonie approche. Le pipeline doit :

1. `fetchVotes()` : récupère la liste brute des votes (Promise qui résout un tableau)
2. filtrer : garder uniquement les votes valides (champ `joueur` non vide, `points` entre 1 et 10)
3. agréger : calculer le total de points par joueur
4. trier : du plus au moins de points
5. `afficherClassement(classement)` : affiche le top 10

Implémente le pipeline complet avec `.then()`.
Gère les erreurs : si `fetchVotes()` rejette, log l'erreur et retourne un tableau vide (la cérémonie continue avec 0 votes).

---

## EXO 2 : le labo de Walter : nettoyage garanti

Walter prépare un lot. Le processus :

1. `initialiserEquipement()` : peut échouer si le matériel est défectueux
2. `preparerIngredients()` : peut échouer si un ingrédient manque
3. `cuire()` : 45 minutes de cuisson
4. `conditionner()` : mettre en sachets

Peu importe où ça échoue : `nettoyerLabo()` et `fermerGaz()` doivent toujours être appelées.
Si ça échoue à l'étape 1 ou 2, log l'étape précise qui a craqué.

---

## EXO 3 : le rapport de mission : avec récupération partielle

Tu fetches des données depuis trois endpoints différents :

- `/mission/objectif`
- `/mission/equipe`
- `/mission/equipement`

Si `/equipement` échoue, continue avec `{ armes: [], armures: [] }` comme fallback.
Si n'importe quel autre endpoint échoue, la mission est abandonnée.

Construis la chaîne complète avec la récupération partielle sur le troisième endpoint.

---

## RÉSUMÉ

Chaque `.then()` peut transformer la valeur ou relier une opération asynchrone à la chaîne.
Chaque `.catch()` peut récupérer le rejet avec un fallback, ou le propager avec `throw`.
`.finally()` permet de lancer le nettoyage, mais ce nettoyage peut lui-même échouer et changer le résultat final.

Erreur fréquente : oublier de `return` une Promise dans un `.then()`. La chaîne extérieure continue alors avec `undefined` sans attendre l'opération interne ; ses rejets ne sont pas automatiquement transmis au `.catch()` extérieur.

Règle pratique : si l'étape suivante dépend du résultat d'un appel asynchrone, retourne sa Promise. Si l'appel est volontairement indépendant, traite explicitement ses erreurs et explique pourquoi il n'appartient pas à la chaîne.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.

## CORRIGÉS INDICATIFS : À LIRE APRÈS UNE PREMIÈRE TENTATIVE

Ces corrigés illustrent la propagation des valeurs et des erreurs ; adapte-les aux signatures réelles des fonctions de ton exercice. Ils ne remplacent pas les tests de cas limites.

### Exercice 1 : pipeline de votes

```js
function construireClassement() {
  return fetchVotes()
    .catch((err) => {
      console.error("Votes indisponibles :", err.message);
      return []; // récupération limitée à l'échec de fetchVotes
    })
    .then((votes) => {
      const totals = new Map();
      for (const vote of votes) {
        if (
          vote &&
          typeof vote.joueur === "string" &&
          vote.joueur.trim() !== "" &&
          Number.isFinite(vote.points) &&
          vote.points >= 1 &&
          vote.points <= 10
        ) {
          const joueur = vote.joueur.trim();
          totals.set(joueur, (totals.get(joueur) ?? 0) + vote.points);
        }
      }
      return [...totals.entries()]
        .map(([joueur, points]) => ({ joueur, points }))
        .sort(
          (a, b) =>
            b.points - a.points || a.joueur.localeCompare(b.joueur, "fr"),
        )
        .slice(0, 10);
    })
    .then((classement) => afficherClassement(classement));
}
```

Le `catch` est placé avant l'agrégation : il récupère la panne de chargement sans masquer une erreur de calcul ou d'affichage. Si `afficherClassement` retourne une Promise, son résultat et son éventuel rejet restent reliés à la chaîne.

### Exercice 2 : étapes explicites et nettoyage

```js
const avecEtape = (nom, action) =>
  Promise.resolve()
    .then(action)
    .catch((cause) => {
      throw new Error(`Échec de l'étape « ${nom} »`, { cause });
    });

function preparerLot() {
  let erreurOperation;
  return avecEtape("initialiserEquipement", initialiserEquipement)
    .then(() => avecEtape("preparerIngredients", preparerIngredients))
    .then(() => avecEtape("cuire", cuire))
    .then(() => avecEtape("conditionner", conditionner))
    .catch((err) => {
      erreurOperation = err;
      console.error(err.message);
      throw err;
    })
    .finally(() => {
      const erreursNettoyage = [];
      for (const [nom, action] of [
        ["nettoyerLabo", nettoyerLabo],
        ["fermerGaz", fermerGaz],
      ]) {
        try {
          action();
        } catch (cause) {
          erreursNettoyage.push(new Error(`Échec de ${nom}`, { cause }));
        }
      }
      if (erreursNettoyage.length) {
        throw new AggregateError(
          [...(erreurOperation ? [erreurOperation] : []), ...erreursNettoyage],
          "L'opération ou son nettoyage a échoué",
        );
      }
    });
}
```

Ce corrigé suppose que les fonctions de nettoyage sont synchrones. Si elles retournent des Promises, il faut les attendre explicitement, par exemple avec `Promise.allSettled`, et décider quoi faire si l'une ou plusieurs échouent. Le code essaie chaque nettoyage même si le précédent lance une exception ; un échec de nettoyage est signalé plutôt que caché.

### Exercice 3 : deux dépendances obligatoires, une facultative

```js
function construireMission() {
  const equipementAvecFallback = charger("/mission/equipement").catch((err) => {
    console.warn(
      "Équipement indisponible ; utilisation du fallback :",
      err.message,
    );
    return { armes: [], armures: [] };
  });

  return Promise.all([
    charger("/mission/objectif"),
    charger("/mission/equipe"),
    equipementAvecFallback,
  ]).then(([objectif, equipe, equipement]) => {
    return afficherMission({ objectif, equipe, equipement });
  });
}
```

Le fallback est attaché uniquement à l'appel facultatif. Un rejet de `objectif` ou de `equipe` fait échouer `Promise.all`. `charger` et `afficherMission` sont des fonctions de l'exercice : leur implémentation doit elle aussi respecter leurs contrats.

### Critères d'auto-correction

- Une Promise dont dépend l'étape suivante est retournée ou attendue.
- Le `catch` de récupération est placé au plus près de la panne que l'on accepte de compenser.
- Les erreurs non récupérées restent des rejets ; aucun `catch` ne les transforme accidentellement en succès `undefined`.
- Les tests couvrent une réussite, un rejet à chaque frontière importante, un fallback et un éventuel échec de nettoyage.
- L'apprenant peut expliquer quelle Promise est attendue à chaque étape et quelle erreur chaque `catch` peut réellement observer.

<!-- AF-LESSON-PROFILE: async -->

## Repères de décision

- **Pourquoi :** L'asynchronisme permet au système de continuer pendant l'attente, mais introduit ordre, concurrence, annulation et erreurs différées.
- **Quand l’utiliser / quand l’éviter :** Utilise-le pour I/O, tâches longues, notifications ou flux continus. Évite les traitements concurrents sans limite ; impose timeout, annulation et backpressure quand le producteur peut dépasser le consommateur.
- **Limites :** `Promise.race` ne tue pas l'opération perdante ; `Promise.all` rejette au premier échec observable ; `allSettled` collecte les résultats mais ne fournit pas de stratégie de reprise. La mémoire partagée exige une synchronisation explicite.

## Mécanisme : la version sans magie

Sépare tâche, attente et consommation. Fixe un délai, une politique d'annulation, une limite de concurrence et une règle de rejeu/idempotence selon les effets.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Chaîner des opérations async sans perdre les erreurs en route** se rattache à ce cas concret : Le service de notification Kintana traite plusieurs demandes. Un fournisseur lent ne doit pas bloquer toute la file ni provoquer des doublons au retry.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Worker de notifications asynchrones fiable

> **Arc One Piece / Grand Line :** un message peut arriver tard, deux fois ou pas du tout. Le navigateur ne promet pas que tout le monde rame à la même vitesse.

**Mission liée à « Chaîner des opérations async sans perdre les erreurs en route » :** Implémente un worker pour les notifications Kintana avec concurrence bornée, timeout, annulation quand elle est supportée, backoff avec jitter et clé de déduplication. Instrumente le nombre en attente et l'âge du plus vieux message.

**Livrable :** un worker, une horloge contrôlée dans les tests, un test de timeout, un test de rejeu et un scénario de saturation.

**Critères d’acceptation :** la concurrence ne dépasse jamais la limite ; le message échoué est classé ; un replay ne double pas l'effet ; l'annulation est distinguée d'un timeout ; le backlog est observable.

**Transfert obligatoire :** Augmente le débit producteur jusqu'à dépasser le débit consommateur. Explique quand appliquer backpressure, rejeter ou stocker temporairement.
