---
stability: intemporel
cognitive_level: L3
perturbation_modes: [decision_inversee, fausse_piste]
anti_recipe_key: decision_inversee+fausse_piste
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : traqueur de jutsu :** Naruto voit l'explosion finale et accuse le dernier fichier touché. Mauvais réflexe. Ton enquête doit remonter le flux, figer les hypothèses et retrouver la première trace qui ne colle plus.

# ERROR STRATEGY : FAIL-FAST, FALLBACK, RETRY

<!-- AF-DIAGRAM:retry -->

```text
┌────────┐   fail   ┌─────────┐   wait   ┌────────┐
│ call 1 │─────────►│ backoff │────────►│ call 2 │
└────────┘          └─────────┘          └────┬───┘
                                              │ fail
                                              ▼
                                        wait plus long
```

Un retry sain combine décision de retry, délai de backoff et limite d’essais pour éviter d’amplifier la panne.

Temps de lecture ~7 min

Catcher une erreur c'est la partie facile. Décider quoi faire ensuite : c'est là que tu montres si t'es un dev ou juste quelqu'un qui code.

Trois stratégies. Trois contextes. Choisir la mauvaise : l'app plante quand elle devrait survivre, ou continue de tourner quand elle devrait s'arrêter.

---

## 1) FAIL-FAST : ARRÊTER IMMÉDIATEMENT

Stratégie : dès qu'une erreur arrive, on stoppe tout. Pas de tentative. Pas de récupération.

Quand : état corrompu, données critiques invalides, conditions impossibles à compenser.

```js
function initialisationApp(config) {
  if (!config.dbUrl) {
    // pas de DB = pas d'app
    // continuer serait pire : on démarrerait un serveur inutilisable
    throw new Error("config.dbUrl manquant : démarrage impossible");
  }
  if (!config.jwtSecret) {
    throw new Error(
      "config.jwtSecret manquant : auth impossible, démarrage bloqué",
    );
  }
  // tout est là : on continue
  return demarrerServeur(config);
}

try {
  initialisationApp(process.env);
} catch (e) {
  console.error("FATAL :", e.message);
  process.exit(1); // crash propre et volontaire
}
```

Exemple Naruto : Naruto tente d'activer le mode Kurama avec des chakra points à 0. Fail-fast : on lève une erreur immédiatement. Continuer sans chakra produirait des dégâts incohérents dans tout le système de combat.

```js
function activerModeKurama(ninja) {
  if (ninja.chakra < ninja.chakraMax * 0.5) {
    throw new ChakraInsuffisantError(
      ninja.nom,
      "Mode Kurama",
      ninja.chakra,
      ninja.chakraMax * 0.5,
    );
  }
  return { ...ninja, mode: "kurama", puissance: ninja.puissance * 10 };
}
```

**Fail-fast = préférer un crash explicite à une exécution silencieusement cassée.**

---

## 2) FALLBACK : CONTINUER AVEC UNE VALEUR DE SECOURS

Stratégie : si A échoue, utilise B. L'opération principale échoue, mais le système survit avec une dégradation acceptable.

Quand : la valeur principale est désirable mais pas critique. Une alternative moins bonne vaut mieux que rien.

```js
// Exemple de classification : le client HTTP doit normaliser ses erreurs.
// Les codes ci-dessous illustrent des pannes possiblement transitoires ; adapte-les
// à la documentation du fournisseur. Une erreur inconnue n'est PAS transitoire par défaut.
function estErreurTransitoire(e) {
  return e?.code === "ETIMEDOUT" || e?.code === "ECONNRESET" ||
    [429, 502, 503, 504].includes(e?.status);
}

async function getStatsJoueur(joueurId) {
  try {
    return await fetchStatsLive(joueurId);
  } catch (e) {
    if (!estErreurTransitoire(e)) throw e; // validation, auth, not-found, erreur inconnue
    console.warn(`Stats live temporairement indisponibles pour ${joueurId}, fallback sur cache`);
    const cached = await cache.get(`stats:${joueurId}`);
    if (cached) return { ...cached, source: "cache", potentiellementObsolete: true };
    return { joueurId, buts: null, passes: null, statut: "données_indisponibles" };
  }
}
```

```
API live --> ok --> stats temps réel
     --> fail --> cache Redis
          --> fail --> données vides structurées
```

Exemple Breaking Bad : Walter ne peut pas vérifier la disponibilité de la methylamine chez le fournisseur habituel. Fallback : consulter un autre fournisseur. Cette illustration porte sur une **lecture de disponibilité**, pas sur l'envoi de commandes. Une commande qui a expiré côté client peut avoir été acceptée côté fournisseur : ne la rejoue pas auprès d'un autre fournisseur sans clé d'idempotence, vérification du statut et procédure de rapprochement.

```js
async function obtenirDisponibilite(ingredient) {
  const fournisseurs = ["gus_fring", "combo", "saul_contact"];

  for (const fournisseur of fournisseurs) {
    try {
      const stock = await consulterDisponibilite(fournisseur, ingredient);
      console.log(`Disponibilité obtenue via ${fournisseur}`);
      return stock;
    } catch (e) {
      if (!estErreurTransitoire(e)) throw e;
      console.warn(`${fournisseur} temporairement indisponible : ${e.message}, fournisseur suivant`);
    }
  }

  throw new Error(`Disponibilité impossible à vérifier pour ${ingredient}`);
}
```

**Fallback = définir explicitement la dégradation acceptable. Si pas de fallback acceptable : fail-fast.**

---

## 3) RETRY : RÉESSAYER AVEC STRATÉGIE

Stratégie : l'erreur est transitoire. Attendre et réessayer a une chance de réussir.

Quand : erreurs réseau, API temporairement surchargée, rate limiting.

Quand PAS : erreurs de validation (réessayer avec les mêmes données invalides : ça échouera à chaque fois), erreurs d'auth (réessayer sans corriger le token : pareil).

```js
async function retryAsync(fn, options = {}) {
  if (typeof fn !== "function") throw new TypeError("fn doit être une fonction");
  const {
    maxTentatives = 3, // nombre total d'appels, première tentative comprise
    delai = 1000,
    backoff = 2,
    shouldRetry = () => false, // aucun retry sans décision explicite
  } = options;

  if (!Number.isInteger(maxTentatives) || maxTentatives < 1) {
    throw new RangeError("maxTentatives doit être un entier >= 1");
  }
  if (!Number.isFinite(delai) || delai < 0 || !Number.isFinite(backoff) || backoff < 1) {
    throw new RangeError("delai doit être >= 0 et backoff doit être >= 1");
  }
  if (typeof shouldRetry !== "function") {
    throw new TypeError("shouldRetry doit être une fonction");
  }

  let delaiCourant = delai;
  for (let tentative = 1; tentative <= maxTentatives; tentative++) {
    try {
      return await fn();
    } catch (e) {
      if (tentative === maxTentatives) throw e;
      const decision = shouldRetry(e);
      if (typeof decision !== "boolean") {
        throw new TypeError("shouldRetry doit retourner un booléen de façon synchrone");
      }
      if (!decision) throw e;
      const plafond = Math.min(30_000, delaiCourant); // plafonne aussi la première attente
      const attente = Math.random() * plafond; // full jitter : délai tiré dans [0, plafond]
      console.warn(`Tentative ${tentative}/${maxTentatives} échouée : ${e.message}`);
      await sleep(attente);
      delaiCourant = Math.min(30_000, delaiCourant * backoff);
    }
  }
  throw new Error("État inaccessible : la boucle doit toujours retourner ou lever");
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
```

Utilisation :

```js
const stats = await retryAsync(() => fetchStatsLive(joueurId), {
  maxTentatives: 3,
  delai: 500,
  backoff: 2,
  shouldRetry: estErreurTransitoire,
  // Politique illustrative : adapte les codes au client HTTP et au contrat du fournisseur.
  // ValidationError, erreurs d'authentification et NotFoundError ne sont pas réessayées.
  // Cette lecture est rejouable ; n'applique pas ce retry à un effet métier non idempotent
  // sans clé d'idempotence ou protocole de déduplication.
});
```

```
tentative 1 --> fail --> attendre un délai tiré dans [0, 500ms]
tentative 2 --> fail --> attendre un délai tiré dans [0, 1000ms]
tentative 3 --> fail --> throw (propagé à l'appelant)
```

**Backoff exponentiel** : ne pas bombarder une API déjà surchargée. Espacer les tentatives.

---

## 4) COMBINER LES STRATÉGIES

En prod, les stratégies se combinent. Retry d'abord, fallback si retry épuisé, fail-fast sur les erreurs non récupérables.

```js
async function chargerDonneesMatch(matchId) {
  // fail-fast sur entrée invalide
  if (!Number.isInteger(matchId) || matchId <= 0) {
    throw new ValidationError(
      "matchId",
      matchId,
      "doit être un entier positif",
    );
  }

  let donneesLive;

  // retry sur l'API live (erreurs réseau transitoires)
  try {
    donneesLive = await retryAsync(() => fetchMatchLive(matchId), {
      maxTentatives: 3,
      delai: 1000,
      shouldRetry: estErreurTransitoire,
    });
    return donneesLive;
  } catch (e) {
    if (!estErreurTransitoire(e)) throw e; // seules les pannes transitoires ouvrent le fallback
    console.warn(`API live temporairement indisponible après retry, fallback cache`);
  }

  // fallback sur le cache
  const cached = await cache.get(`match:${matchId}`);
  if (cached) {
    return { ...cached, source: "cache", potentiellementObsolete: true };
  }

  // plus de fallback possible
  throw new ServiceError(`Match ${matchId} complètement indisponible`, null);
}
```

```
input invalide    --> fail-fast immédiat
API ok        --> données live
API fail (réseau)   --> retry x3
retry épuisé     --> fallback cache
cache vide      --> throw (propagé)
NotFoundError     --> fail-fast (pas de retry, pas de fallback)
```

---

## 5) CIRCUIT BREAKER : NE PAS FRAPPER UN MORT

<!-- AF-DIAGRAM:circuit_breaker -->

```text
           seuil d’échecs consécutifs atteint
[ CLOSED ] ─────────────────► [ OPEN ]
     ▲                            │
     │ succès test                │ timeout
     │                            ▼
     └────────────── [ HALF-OPEN ]
```

Le circuit breaker protège une dépendance en passant de trafic normal à ouvert, puis en testant prudemment la récupération.

Pattern avancé : si un service externe échoue trop souvent, arrête de l'appeler. Donne-lui le temps de se rétablir. Cette démonstration compte des échecs consécutifs, autorise une seule sonde en état semi-ouvert et ignore les résultats d'appels devenus anciens après un changement d'état. Elle ne fournit pas une fenêtre glissante, des métriques distribuées, ni un état partagé entre plusieurs instances : ces garanties demandent une conception et des tests propres au système.

```js
const { performance } = require("node:perf_hooks"); // horloge monotone pour mesurer le délai local

class CircuitBreaker {
  constructor(options = {}) {
    this.seuil = options.seuil ?? 5; // nombre d'échecs consécutifs observés
    this.timeout = options.timeout ?? 30_000; // délai avant une sonde, en ms
    if (!Number.isInteger(this.seuil) || this.seuil < 1) {
      throw new RangeError("seuil doit être un entier >= 1");
    }
    if (!Number.isFinite(this.timeout) || this.timeout < 0) {
      throw new RangeError("timeout doit être un nombre fini >= 0");
    }
    this.echecs = 0;
    this.etat = "FERMÉ"; // FERMÉ = normal, OUVERT = bloqué, SEMI-OUVERT = sonde
    this.prochainTest = null;
    this.sondeEnCours = false;
    this.generation = 0; // ignore le résultat tardif d'un appel lancé avant un changement d'état
  }

  async executer(fn) {
    if (typeof fn !== "function") throw new TypeError("fn doit être une fonction");

    if (this.etat === "OUVERT") {
      if (performance.now() < this.prochainTest) {
        throw new Error("Circuit ouvert : service indisponible, pas de tentative");
      }
      this.etat = "SEMI-OUVERT";
      this.generation++;
    }

    let estSonde = false;
    if (this.etat === "SEMI-OUVERT") {
      // Une seule sonde concurrente : les autres appels sont court-circuités.
      if (this.sondeEnCours) {
        throw new Error("Circuit semi-ouvert : une sonde est déjà en cours");
      }
      this.sondeEnCours = true;
      estSonde = true;
    }

    const generationAuDepart = this.generation;
    try {
      const resultat = await fn();
      this.onSucces(generationAuDepart);
      return resultat;
    } catch (e) {
      this.onEchec(generationAuDepart);
      throw e;
    } finally {
      if (estSonde) this.sondeEnCours = false;
    }
  }

  onSucces(generationAuDepart) {
    if (generationAuDepart !== this.generation) return; // résultat devenu ancien
    this.echecs = 0;
    if (this.etat !== "FERMÉ") {
      this.etat = "FERMÉ";
      this.prochainTest = null;
      this.generation++;
    }
  }

  onEchec(generationAuDepart) {
    if (generationAuDepart !== this.generation) return; // ne rouvre pas sur un résultat périmé
    this.echecs++;
    if (this.etat === "SEMI-OUVERT" || this.echecs >= this.seuil) {
      this.etat = "OUVERT";
      this.prochainTest = performance.now() + this.timeout;
      this.generation++;
      console.error(
        `Circuit OUVERT après ${this.echecs} échecs : pause de ${this.timeout}ms`,
      );
    }
  }
}

const breaker = new CircuitBreaker({ seuil: 3, timeout: 15000 });

async function getStats(matchId) {
  return breaker.executer(() => fetchStatsLive(matchId));
}
```

```
FERMÉ : normal, les appels passent
 --> 3 échecs consécutifs --> OUVERT
OUVERT : bloqué, on throw immédiatement sans appeler
 --> après 15s --> SEMI-OUVERT
SEMI-OUVERT : une tentative test
 --> succès --> FERMÉ
 --> échec --> OUVERT (reset timer)
```

Exemple Walking Dead : le camp a un système radio pour communiquer avec les autres survivants. Si la radio tombe 3 fois de suite, on arrête d'essayer et on économise les piles (ressource critique). Dans la configuration du code (15 secondes), une seule sonde est autorisée après ce délai ; en production, le délai dépend du service et de sa politique de reprise.

---

## 6) CHOISIR LA BONNE STRATÉGIE

```
Type d'erreur              Stratégie recommandée
--------------------------------------------------------------
Données d'entrée invalides        fail-fast
Config manquante au démarrage      fail-fast
État incohérent (bug)          fail-fast
Erreur réseau transitoire        retry avec backoff
Rate limiting API            retry avec backoff exponentiel
Service external temporairement KO   retry + circuit breaker
Fonctionnalité secondaire indisponible  fallback
Données fraîches indisponibles      fallback sur cache
```

---

## EXERCICES

## EXO 1 : LE PIPELINE DE GARO

Le Conseil de Surveillance de Garo doit récupérer les données d'un Chevalier avant de l'envoyer en mission.

Implémente `getProfil(chevalierId)` avec :

- fail-fast si `chevalierId` n'est pas un entier positif
- retry x3 avec 500ms de délai sur les erreurs réseau
- fallback sur un profil de base `{ id, statut: "données_limitées" }` si l'API est KO

---

## EXO 2 : LE RETRY INTELLIGENT

Modifie `retryAsync` pour accepter un paramètre `onRetry(tentative, erreur, prochainDelai)` : un callback appelé avant chaque nouvelle tentative.

Utilise-le pour logger proprement chaque retry avec le contexte.

---

## EXO 3 : LE CIRCUIT BREAKER DU CAMP

Rick Grimes a un système de communication radio. Implémente un `CircuitBreaker` simplifié :

- seuil : 3 échecs
- timeout : 10 secondes

Simule 5 appels qui échouent, puis attends le timeout, puis réessaie. Affiche l'état du circuit à chaque étape.

---

## RÉSUMÉ

Fail-fast : préférer un crash explicite à une exécution silencieusement cassée. Sur les erreurs irrécupérables et les états invalides.

Fallback : définir la dégradation acceptable. Si la valeur principale est indisponible, quelle valeur secondaire est acceptable ?

Retry : uniquement sur les erreurs transitoires. Toujours avec backoff exponentiel. Jamais sur les erreurs de validation ou d'auth.

Circuit breaker : arrêter de frapper un service mort. Le laisser respirer. Retenter quand c'est raisonnable.

Ces stratégies ne s'excluent pas : elles se combinent selon le type d'erreur et le contexte.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.
