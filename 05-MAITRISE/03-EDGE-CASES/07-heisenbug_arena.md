---
stability: intemporel
last_reviewed: 2026-10-31
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [preuve_partielle, temps_limite]
anti_recipe_key: preuve_partielle+temps_limite
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# HEISENBUG ARENA : LE BUG QUI CHANGE SOUS OBSERVATION

Temps de lecture ~17 min

Un **heisenbug** est un défaut dont le comportement ou la reproduction change lorsque l'on modifie l'environnement d'observation : logs, debugger, charge, ordonnancement, machine ou timing. Le nom est une analogie avec le principe d'incertitude de Heisenberg ; ce n'est pas une application littérale de la physique.

Les courses asynchrones peuvent produire des heisenbugs, mais elles n'en sont pas la seule cause. Un test flaky est un symptôme : il faut aussi examiner les horloges, le réseau, les données partagées, les dépendances externes, l'isolation des tests et les hypothèses du test lui-même.

> Ne promets pas « 1 fois sur 10 » ou « 1 fois sur 100 » sans protocole, environnement et résultats mesurés. Les exemples de cette page sont des modèles de raisonnement, pas des statistiques de production.

---

## 1) POURQUOI L'OBSERVATION PEUT CHANGER LE COMPORTEMENT

JavaScript exécute le code synchrone d'un agent jusqu'au prochain point de suspension. En revanche, deux opérations asynchrones peuvent reprendre dans un ordre qui dépend de leurs résolutions effectives. Des logs, pauses ou charges supplémentaires peuvent modifier les timings observés, sans que `console.log` soit nécessairement synchrone dans tous les environnements.

```text
opération A : démarre ─────────────── reprend ─── écrit
opération B : démarre ───── reprend ──────────── écrit
                         ▲
                         l'ordre peut changer selon les événements
```

Une course existe si plusieurs opérations peuvent lire ou modifier un état partagé sans coordination et si un entrelacement admissible viole un invariant. Le simple fait d'utiliser `Promise.all` ne suffit pas à prouver une race : inspecte les points de suspension et les mutations réelles.

---

## 2) CINQ CAS À DIAGNOSTIQUER

### CAS 1 : Deux sources de score arrivent dans un ordre variable

```js
let scoreJournalistes = null;
let scoreFans = null;
let scoreFinal = null;

function calculerScoreFinal() {
  // Défaut : le calcul part même si une source n'est pas encore arrivée.
  scoreFinal = (scoreJournalistes + scoreFans) / 2;
  console.log("Score provisoire ou final :", scoreFinal);
}

function chargerScoreJournalistes() {
  setTimeout(() => {
    scoreJournalistes = 85;
    calculerScoreFinal();
  }, 20);
}

function chargerScoreFans() {
  setTimeout(() => {
    scoreFans = 72;
    calculerScoreFinal();
  }, 5);
}

chargerScoreJournalistes();
chargerScoreFans();
```

`null + 72` donne `72` par coercition numérique, donc le premier affichage donne 36 alors qu'il manque une source. Le second calcul donne 78,5. Ici, les délais fixes (5 ms puis 20 ms) imposent volontairement l'ordre des callbacks pour rendre le défaut lisible. En changeant les délais ou l'environnement, l'ordre peut s'inverser ; cet exemple ne prétend pas mesurer une fréquence d'échec.

Correction : ne calculer que lorsque chaque source attendue est présente. Dans une version robuste, stocke les résultats par identifiant de source et ignore les doublons : un simple compteur pourrait compter deux fois la même source.

```js
const scores = new Map();
function recevoirScore(source, valeur) {
  if (scores.has(source)) return; // dédoublonne une livraison répétée
  scores.set(source, valeur);
  if (!scores.has("journalistes") || !scores.has("fans")) return;
  const scoreFinal = (scores.get("journalistes") + scores.get("fans")) / 2;
  console.log("Score final :", scoreFinal);
}
```

### CAS 2 : Mise à jour perdue après un `await`

```js
async function reproduireMiseAJourPerdue() {
  let totalVotes = 0;
  let lecteurs = 0;
  let liberer;
  const barriere = new Promise((resolve) => {
    liberer = resolve;
  });

  async function enregistrerVote() {
    const ancienTotal = totalVotes; // les deux appels lisent 0
    lecteurs++;
    if (lecteurs === 2) liberer();
    await barriere; // les deux reprennent après les deux lectures
    totalVotes = ancienTotal + 1; // les deux écrivent 1
  }

  await Promise.all([enregistrerVote(), enregistrerVote()]);
  console.log(totalVotes); // 1 ; invariant attendu : 2
}

reproduireMiseAJourPerdue();
```

Cette reproduction est déterministe sur un agent JavaScript : la barrière impose l'entrelacement. La cause est la lecture suivie plus tard d'une écriture basée sur une valeur périmée, pas une interruption au milieu d'une instruction synchrone.

### CAS 3 : Une deadline et une opération proche de sa limite

Une minuterie ne garantit pas que le callback s'exécute exactement à l'instant demandé : il devient éligible après le délai, puis attend que l'hôte puisse le traiter. Pour une règle métier de deadline, compare une heure monotone à une échéance et définis explicitement la politique aux frontières. Ne déduis aucun pourcentage d'échec d'un snippet sans mesure répétable et contexte documenté.

```js
const { performance } = require("node:perf_hooks");

async function executerPuisVerifierLaDuree(operation, dureeMaxMs) {
  const debut = performance.now(); // Node.js récent ou navigateur moderne
  const resultat = await operation();
  const ecoule = performance.now() - debut;
  if (ecoule > dureeMaxMs)
    throw new Error("Durée maximale dépassée après exécution");
  return resultat;
}
```

Cette fonction mesure puis vérifie la durée **après** le retour de l'opération ; elle ne respecte donc pas une deadline stricte et ne l'annule pas. Pour cesser d'attendre, utilise une API d'annulation compatible (`AbortSignal`, par exemple) et traite séparément le fait que le serveur distant peut avoir déjà exécuté l'effet. `performance.now()` est adapté à une durée dans un même contexte, pas à la comparaison d'horloges entre machines.

### CAS 4 : Supprimer une entrée de `Map` pendant l'itération

```js
const sessions = new Map([
  ["a", { expire: 1 }],
  ["b", { expire: 99 }],
  ["c", { expire: 1 }],
]);

for (const [id, session] of sessions) {
  if (session.expire < 10) sessions.delete(id);
}
console.log([...sessions.keys()]); // ["b"]
```

Ce cas n'est **pas** un heisenbug : JavaScript définit le comportement de l'itération `Map` quand des entrées sont supprimées. Il sert de contrôle : ne qualifie pas un code de race simplement parce qu'il modifie une collection pendant une boucle. Une course peut apparaître si plusieurs traitements asynchrones manipulent le même état, mais il faut alors montrer l'entrelacement fautif.

### CAS 5 : `Promise.race` et le résultat non prédéterminé

```js
function reponse(nom, delai) {
  return new Promise((resolve) => setTimeout(() => resolve(nom), delai));
}

const gagnant = await Promise.race([reponse("Kouga", 20), reponse("Rian", 10)]);
console.log(gagnant); // "Rian" pour ces délais
```

`Promise.race` renvoie la première promesse qui se règle (fulfilled ou rejected). C'est son contrat, pas un défaut. Si les délais changent, le gagnant peut changer. Aucun partage équitable, priorité ou garantie de fairness n'est promis ; l'ordre des éléments d'entrée ne suffit pas à déduire une distribution statistique générale.

---

## 3) MÉTHODE D'INVESTIGATION

1. **Décrire le symptôme sans conclure.** Note entrée, résultat attendu/réel, version, hôte, charge et horodatage utile.
2. **Isoler les hypothèses.** Recherche les points de suspension, états partagés, dépendances, horloges et données communes.
3. **Créer une reproduction contrôlée quand c'est possible.** Injecte délais, sources aléatoires ou réponses mockées ; n'invente pas une fréquence.
4. **Instrumenter avec prudence.** Corrélation et traces ciblées ; masque les secrets. La journalisation peut modifier les timings, mais son effet dépend du runtime et du transport.
5. **Corriger l'invariant.** Mutex local, transaction / opération atomique partagée, déduplication, ordre par clé ou état explicite : le remède dépend du périmètre.
6. **Séparer observations et garanties.** « 0 échec sur N essais » est une observation pour ces conditions, pas une preuve universelle d'absence de course.

Ne remplace jamais une synchronisation par un `setTimeout` arbitraire. Un délai déplace l'ordonnancement ; il n'établit pas l'invariant.

---

## 4) EXERCICES

**EXO 1 : Données incomplètes** : modifie le cas 1 pour ne calculer qu'après réception des deux sources. Que se passe-t-il si la même source est livrée deux fois ? Prouve que ton code l'ignore.

**EXO 2 : Mise à jour perdue** : reproduis le cas 2, puis corrige-le avec une file séquentielle ou un mutex local. Explique pourquoi ce mutex ne protège pas deux processus distincts.

**EXO 3 : `Promise.race`** : injecte des délais déterministes et vérifie le gagnant attendu. Distingue la non-détermination voulue d'un bug.

**EXO 4 : Deadline** : écris un test avec horloge/dépendance injectable. N'utilise pas une attente réelle courte comme seule preuve ; note les limites du fake timer choisi.

**EXO 5 : Preuve** : rédige une condition de falsification, les essais réalisés, l'environnement et ce que ces essais ne démontrent pas. Ne présente aucun chiffre comme mesuré s'il ne l'a pas été.

## RÉSUMÉ

Un heisenbug est un défaut dont le comportement ou la reproductibilité varie sous l'effet de l'observation ou de l'environnement. Les courses asynchrones en sont une cause possible, pas l'unique cause. Une écriture issue d'une lecture ancienne peut perdre une mise à jour ; `Promise.all` ne transforme pas automatiquement des mutations synchrones en opérations interrompables. Un résultat empirique répété renforce un diagnostic mais ne remplace pas l'analyse des garanties et des frontières de coordination.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : symptôme → hypothèses → reproduction → invariant → décision → limites. Compare ensuite ta reconstruction avec la source et note ce qui manquait.

### Transfert : changer de contexte

Applique le mécanisme de « HEISENBUG ARENA » à une panne qui varie selon l'horloge, le réseau ou l'instrumentation. Explique ce qui reste invariant, ce qui doit changer et quelle preuve permet de confirmer que tu n'as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l'artefact produit, le résultat réellement observé, les hypothèses et une limite non démontrée.
