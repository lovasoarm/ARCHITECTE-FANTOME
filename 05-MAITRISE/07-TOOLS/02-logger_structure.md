---
perishability_id: PER-0075

stability: "perissable"
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [regression, fausse_piste]
anti_recipe_key: regression+fausse_piste
transfer_distance: medium
assessment_role: instructional_checkpoint
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_url: "https://opentelemetry.io/docs/concepts/signals/logs/"
source_type: "primary"
review_interval: "3 mois"
review_due: "2027-02-03"
source_scope: "Documentation officielle ou source primaire consultée en rapport avec « Logger structuré : savoir ce qui s'est passé, dans quel ordre, avec quel contexte ». La référence soutient le concept/version explicitement indiqué dans cette ressource ; ce statut ne certifie pas chaque phrase, chaque snippet ni l'exécution locale. Les affirmations empiriques et les API versionnées restent limitées au scope ci-dessous."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "OFFICIAL_SOURCE_IDENTITY_AND_CONCEPT_SCOPE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

> (attention) **OUTIL PÉRISSABLE** : le tooling JS bouge chaque année. Traite ce module comme une REVUE, pas une bible. `Principes durables` en bas.

> **Périssable : valable 2026.** L'outil change vite ; le principe (build, format, lint, package) est **intemporel**.

# Logger structuré : savoir ce qui s'est passé, dans quel ordre, avec quel contexte

Temps de lecture ~8 min

`console.log("ici")` te dit que t'es passé "ici". Il te dit pas quand, il te dit pas dans quel contexte, il te dit pas si c'est grave ou normal. Un logger structuré répond à ces trois questions à chaque appel, sans que t'aies à y repenser à chaque fois.

---

## 1) LE PROBLÈME QUE CONSOLE.LOG NE RÉSOUT PAS

```js
// Du code typique sans logger structuré
console.log("démarrage du camp");
console.log("inventaire chargé");
console.log("erreur");
console.log(survivant);
```

```text
problèmes concrets :
- aucun horodatage : QUAND chaque event s'est produit
- aucun niveau : c'est une info normale ou une vraie erreur ?
- format incohérent : parfois une string, parfois un objet brut
- impossible à filtrer : tu peux pas dire "montre-moi que les erreurs"
- impossible à chercher : si t'as 10 000 lignes, bonne chance pour trouver ce qui compte
```

**Pourquoi ça casse en prod :** un crash arrive à 3h du matin. Tu ouvres les logs. Tu as 50 000 lignes de `console.log` sans horodatage clair ni niveau de gravité. Tu sais pas par où chercher. Le logger structuré existe pour que ce moment-là dure 2 minutes au lieu de 2 heures. C'est le Sharingan de Kakashi appliqué aux logs : tu vois tout, dans le bon ordre, avec le contexte exact : au lieu de tâtonner à l'aveugle.

---

## 2) LA STRUCTURE MINIMALE D'UN LOG UTILE

Un bon log répond toujours à quatre questions :

```text
QUAND  --> timestamp (horodatage)
QUOI  --> niveau de gravité (info, warn, error)
QUOI PRÉCISÉMENT --> le message lui-même
DANS QUEL CONTEXTE --> des données additionnelles (qui, où, avec quel état)
```

```js
// La forme qu'on vise, en JSON, facilement lisible par une machine ET un humain
{
 "timestamp": "2026-06-21T14:32:10.452Z",
 "level": "error",
 "message": "echec connexion radio",
 "context": { "frequence": 145.5, "tentative": 3 }
}
```

**Technique :** le format JSON n'est pas un choix esthétique. Un log en JSON peut être parsé (analysé automatiquement) par un outil, filtré par niveau, recherché par champ. Un log en texte libre, c'est lisible par un humain mais quasi impossible à exploiter automatiquement à grande échelle.

---

## 3) CONSTRUIRE LE LOGGER, ÉTAPE PAR ÉTAPE

```js
// logger.js

// Les niveaux de gravité, du moins grave au plus grave
const NIVEAUX = {
  debug: 0, // détails techniques, utile en dev seulement
  info: 1, // événement normal, ça se passe comme prévu
  warn: 2, // quelque chose d'anormal mais pas bloquant
  error: 3, // quelque chose a vraiment cassé
};

function creerLogger(niveauMinimum = "info") {
  const seuil = NIVEAUX[niveauMinimum];

  function log(niveau, message, context = {}) {
    // si le niveau du log est en dessous du seuil configuré, on l'ignore
    // (ex: en prod, on ignore souvent "debug" pour pas noyer les vrais events)
    if (NIVEAUX[niveau] < seuil) return;

    const entree = {
      timestamp: new Date().toISOString(),
      level: niveau,
      message,
      context,
    };

    // JSON.stringify transforme l'objet en une seule ligne de texte
    // une ligne par log = facile à parser ensuite, fichier par fichier
    console.log(JSON.stringify(entree));
  }

  return {
    debug: (message, context) => log("debug", message, context),
    info: (message, context) => log("info", message, context),
    warn: (message, context) => log("warn", message, context),
    error: (message, context) => log("error", message, context),
  };
}

module.exports = { creerLogger };
```

```js
// Utilisation, n'importe où dans un projet
const { creerLogger } = require("./logger");
const logger = creerLogger("info"); // ignore les logs "debug"

logger.info("camp démarré", { survivants: 12 });
logger.warn("stock de rations bas", { joursRestants: 2 });
logger.error("clôture compromise", { secteur: "nord", gravite: "critique" });

// Sortie, une ligne JSON par appel :
// {"timestamp":"2026-06-21T14:32:10.452Z","level":"info","message":"camp démarré","context":{"survivants":12}}
```

**Pourquoi cette forme :** la fonction `creerLogger` retourne un objet avec 4 méthodes, chacune pré-configurée avec son niveau. C'est une factory (fabrique) toute simple, qui te donne une API claire (`logger.error(...)`) au lieu d'avoir à répéter le niveau à chaque appel.

---

## 4) LE NIVEAU MINIMUM : FILTRER LE BRUIT

```js
// En dev, tu veux TOUT voir
const loggerDev = creerLogger("debug");
loggerDev.debug("variable x =", { x: 42 }); // s'affiche

// En "prod" simulée, tu veux ignorer le bruit de debug
const loggerProd = creerLogger("warn");
loggerProd.info("event normal"); // IGNORÉ, sous le seuil "warn"
loggerProd.warn("anomalie détectée"); // s'affiche
```

```text
NIVEAUX[niveau] < seuil --> ignoré
NIVEAUX[niveau] >= seuil --> affiché

debug(0) info(1) warn(2) error(3)
       ^
     seuil="info" : ignore debug, affiche le reste
```

**Risque réel :** oublier de remonter le seuil avant un déploiement. Un projet qui log tout en `debug` en prod génère un volume de logs énorme, ralentit l'app, et noie les vraies erreurs sous des milliers de lignes inutiles.

---

## 5) LE CONTEXTE : CE QUI TRANSFORME UN LOG EN INDICE UTILE

```js
// MAUVAIS : un message sans contexte
logger.error("erreur de connexion");
// Quelle connexion ? Vers quoi ? Avec quel état ? Aucune idée.

// BON : le contexte raconte l'histoire complète
logger.error("erreur de connexion radio", {
  frequence: 145.5,
  tentative: 3,
  dernierMessageEnvoye: "RAS secteur nord",
  dureeAvantEchec_ms: 4200,
});
```

**Technique :** le contexte, c'est l'objet JS passé en deuxième argument. Il transforme un log d'une phrase vague en un instantané complet de la situation. Un bon réflexe : à chaque `logger.error`, demande-toi "si je lis CE log dans 6 mois sans aucun autre contexte, je comprends ce qui s'est passé ?". Michael Scofield dans Prison Break ne note pas "problème dans le couloir". Il note le numéro du couloir, l'heure, le garde en poste, et l'alternative disponible. Toi pareil dans tes logs.

---

## EXERCICES

EXO 1 : L'établi de base :
Implémente le logger ci-dessus, teste les 4 niveaux, et vérifie qu'un seuil à `"warn"` ignore bien `debug` et `info`.

EXO 2 : Le contexte qui sauve la nuit :
Prends une fonction qui peut échouer pour plusieurs raisons différentes (genre une fonction qui valide un stock de munitions et peut échouer si stock négatif, si type invalide, ou si quantité non numérique). Logge chaque échec avec un contexte assez riche pour que, SANS regarder le code, tu puisses comprendre exactement quel cas a déclenché l'erreur.

EXO 3 : Le filtre qui muet le bruit :
Crée un scénario avec 20 logs mélangeant les 4 niveaux. Configure le logger avec un seuil `"error"` et vérifie qu'un seul type de ligne sort. Explique en une phrase pourquoi ce filtrage est précieux sur un vrai projet avec des milliers de logs par jour.

---

## RÉSUMÉ

Un logger structuré répond toujours à quand, quoi, à quel niveau, et dans quel contexte, contrairement à un `console.log` brut qui répond à rien de tout ça de façon fiable. Le format JSON rend chaque ligne exploitable automatiquement, pas juste lisible à l'oeil. Le niveau minimum filtre le bruit selon l'environnement (tout en dev, l'essentiel en prod). Le contexte transforme un message vague en indice complet, suffisant pour comprendre un incident sans avoir à relire le code source.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.

## Transfert production : logs utiles sans fuite

**Exercice.** Définis un événement de journal pour un échec de paiement avec `timestamp`, `level`, `service`, `requestId`, `tenantId` pseudonymisé, `operation`, `errorCode` et durée. Interdis token, mot de passe, numéro de carte et payload personnel brut.

**Vérification.** Teste la sérialisation, la présence des champs obligatoires, l'absence de secrets avec fixtures canari et le comportement si le backend de logs est indisponible. Le log doit aider au diagnostic sans devenir une deuxième base de données métier.

**Transfert.** Même schéma pour API, workers et scripts batch ; relie `requestId`/trace context à l'observabilité, en séparant corrélation et identité utilisateur.

<!-- AF-LESSON-PROFILE: performance -->

## Repères de décision

- **Pourquoi :** La performance influence l'expérience utilisateur et le coût d'exploitation. Il faut repérer le goulot réel avant de changer l'algorithme, le cache ou la mémoire.
- **Quand l’utiliser / quand l’éviter :** Mesure avant toute optimisation. Utilise profiling et benchmark sur une charge représentative ; évite un micro-benchmark qui n'observe pas le chemin de production.
- **Limites :** Un benchmark local ne prédit pas exactement la production. Les caches chauds, le GC, le matériel, la concurrence et la distribution des données peuvent changer le résultat.

## Mécanisme : la version sans magie

Établis une baseline, profile, identifie le coût dominant, change une seule variable, relance plusieurs fois et compare quantiles et mémoire.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Logger structuré : savoir ce qui s'est passé, dans quel ordre, avec quel contexte** se rattache à ce cas concret : Sur Kintana, la liste des demandes ou l'agrégation des créneaux peut devenir lente à mesure que le nombre de demandes augmente.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Concevoir des logs structurés réellement exploitables

**Mission liée à « Logger structuré : savoir ce qui s'est passé, dans quel ordre, avec quel contexte » :** Définis pour un flux Kintana les événements utiles, champs stables, correlation_id, niveau, redaction des secrets et politique de cardinalité. Vérifie qu’une requête peut être suivie sans journaliser le payload privé.

**Livrable :** Schéma d’événement, exemples anonymisés et requêtes de diagnostic.

**Critères d’acceptation :** Les champs sont cohérents ; secrets et données personnelles sont exclus ; les identifiants corrèlent sans identifier inutilement ; la cardinalité reste bornée.

**Transfert obligatoire :** Un incident ne peut pas être expliqué avec les champs retenus : ajoute un signal ciblé plutôt que de logger tout le payload.

## Références officielles utiles

> **Référence principale vérifiée le 2 novembre 2026 :** la première ressource de ce panneau, également enregistrée dans `source_url`, a été consultée pour le mécanisme versionné traité ici. Les autres liens sont des compléments officiels utiles ; ils ne constituent pas chacun une attestation indépendante de l’exemple du curriculum. Aucune référence ne prouve que l’exemple a été exécuté. Vérifie la version cible et teste dans ton environnement avant un usage réel.

- [OpenTelemetry : Logs](https://opentelemetry.io/docs/concepts/signals/logs/)
- [OWASP : Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
