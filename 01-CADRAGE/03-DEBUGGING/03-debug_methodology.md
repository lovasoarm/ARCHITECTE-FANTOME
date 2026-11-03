---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [changement_contexte, solution_concurrente]
anti_recipe_key: changement_contexte+solution_concurrente
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : traqueur de jutsu :** Naruto voit l'explosion finale et accuse le dernier fichier touché. Mauvais réflexe. Ton enquête doit remonter le flux, figer les hypothèses et retrouver la première trace qui ne colle plus.

# Debug methodology : quatre étapes, zéro hasard

Temps de lecture ~8 min

Tu as un bug. Tu ne sais pas où. Tu ne sais pas pourquoi.
Premier réflexe : changer des trucs au hasard et voir si ça passe.
Mauvais réflexe. Tu vas en créer trois autres.

Debugger sans méthode, c'est chercher un Horror dans Vaemélia à minuit sans carte.
Tu avances. Tu ne sais pas vers quoi.

Ce fichier te donne la carte.

---

## 1) LE PROCESS EN QUATRE ÉTAPES

```text
ÉTAPE 1 : ÉTABLIR LE SIGNAL
 Reproduire de façon contrôlée si possible.
 Sinon, préserver les éléments fiables de l'incident et ses limites.

ÉTAPE 2 : ISOLER
 Réduire le problème au minimum.
 Supprimer tout ce qui n'est pas lié au bug jusqu'à avoir le cas minimal.

ÉTAPE 3 : CORRIGER
 Changer une seule chose à la fois.
 Tester après chaque changement.

ÉTAPE 4 : VÉRIFIER
 S'assurer que le fix ne casse rien d'autre.
 Rejouer le scénario de reproduction pour confirmer.
```

Ces responsabilités restent nécessaires, mais l'ordre peut s'adapter à l'urgence.
En production, une atténuation sûre peut précéder la reproduction locale ; consigne
les preuves et ne présente pas une simulation comme la reproduction originale.

---

## 2) ÉTAPE 1 : ÉTABLIR LE SIGNAL ET REPRODUIRE

Une reproduction minimale aide à isoler la cause et à vérifier le correctif.
Si le défaut ne se reproduit pas localement, collecte les éléments disponibles :
trace, identifiant de corrélation, version, données non sensibles, environnement,
chronologie et hypothèses. Une reproduction réduite peut venir ensuite.

Questions à se poser pour reproduire :

```text
- Quand est-ce que ça arrive ? À chaque fois ou parfois ?
- Avec quelles données d'entrée ?
- Dans quel ordre ?
- En prod mais pas en dev ? Suspect : variable d'environnement, données réelles, timing.
- Seulement chez certains utilisateurs ? Suspect : état persistant, rôle, locale, navigateur.
```

Exemple : le camp de Rick Grimes distribue des munitions à partir d'un stock partagé. Le journal montre que deux demandes ont été acceptées alors qu'une seule aurait dû l'être. Le problème n'est pas « deux lignes JavaScript se sont exécutées exactement au même instant » : c'est une lecture suivie d'une écriture séparée par des attentes asynchrones.

```js
// simulation déterministe d'un stockage partagé (ex. service/DB distant)
let stockCamp = 100;

async function lireStock() {
  await Promise.resolve(); // point de suspension : plusieurs lectures peuvent partir
  return stockCamp;
}

async function enregistrerStock(nouveauStock) {
  await Promise.resolve(); // autre point de suspension avant l'écriture
  stockCamp = nouveauStock;
}

async function consommerMunitions(quantite) {
  const stockLu = await lireStock();
  if (stockLu < quantite) return false;
  await enregistrerStock(stockLu - quantite); // écrit à partir d'une valeur potentiellement périmée
  return true;
}

async function reproduire() {
  stockCamp = 100;
  const resultats = await Promise.all([
    consommerMunitions(70),
    consommerMunitions(70),
  ]);
  console.log({
    resultats, // [true, true] : les deux demandes ont été acceptées
    stockRestant: stockCamp, // 30 : la seconde écriture a écrasé la première
    quantiteAccordee: resultats.filter(Boolean).length * 70, // 140 pour un stock initial de 100
  });
}

reproduire();
```

Le résultat est déterministe dans cette simulation : les deux appels lisent 100 avant que l'une des écritures soit enregistrée. Le stockage affiche ensuite 30, mais 140 unités ont été autorisées. C'est une **mise à jour perdue** (lost update), issue d'une lecture-modification-écriture non atomique. Le code représente deux opérations asynchrones visant un état partagé ; il ne prétend pas que deux instructions synchrones du même agent JavaScript s'exécutent en parallèle.

Dans le code initial du camp, `forEach(async ...)` posait aussi un problème distinct : `forEach` n'attend pas les Promises et la fonction appelante pouvait terminer trop tôt. Cela ne prouvait pas, à lui seul, une race sur les mutations synchrones. Pour attendre les simulations :

```js
async function rondeNocturne(camp, gardes, simulerTir) {
  // Les simulations sont asynchrones ; on attend toutes leurs valeurs.
  const tirs = await Promise.all(gardes.map((garde) => simulerTir(garde)));

  // La vérification et la décrémentation sont ensuite séquentielles sur cet agent.
  for (const quantite of tirs) {
    if (camp.stock.munitions >= quantite) {
      camp.stock.munitions -= quantite;
    }
  }
  return camp.stock.munitions;
}
```

Sur un seul agent JavaScript, sans `await` entre la vérification et la décrémentation, ces deux instructions s'exécutent dans le même tour de code. Pour un stock partagé entre processus/instances, la protection doit se faire dans le stockage autoritaire (transaction ou mise à jour conditionnelle atomique), pas avec `Promise.all` seul.

---

## 3) ÉTAPE 2 : ISOLER

Réduire, pas chercher. L'objectif est d'arriver au plus petit code possible qui produit encore le bug.

Règle : enlève des choses jusqu'à ce que le bug disparaisse. La dernière chose que tu as enlevée avant qu'il disparaisse : c'est là que le bug vit.

```text
Ton code a 300 lignes et plante sur la ligne 247.
Tu commentes la moitié basse (150 lignes) : le bug disparaît ?
 OUI --> le bug est dans les 150 lignes commentées.
 NON --> le bug est dans les 150 lignes restantes.
Bisect mental : divise par deux à chaque fois.
```

Ce pattern s'appelle une réduction par bisect (division binaire du problème). `git bisect` fait ça automatiquement pour trouver le commit qui a introduit un bug.

Exemple isolé : la lecture et l'écriture sont les deux seules opérations nécessaires pour reproduire la mise à jour perdue.

```js
let stock = 100;

async function lire() {
  await Promise.resolve();
  return stock;
}

async function ecrire(valeur) {
  await Promise.resolve();
  stock = valeur;
}

async function retirer(quantite) {
  const valeurLue = await lire();
  if (valeurLue < quantite) return false;
  await ecrire(valeurLue - quantite);
  return true;
}

async function reproduireLeCasMinimal() {
  const autorisations = await Promise.all([retirer(70), retirer(70)]);
  console.log(autorisations, stock); // [true, true] et 30 : une mise à jour a été perdue
}

reproduireLeCasMinimal();
```

Le cas minimal conserve le mécanisme : deux opérations lisent le même état, vérifient séparément, puis écrivent toutes deux un résultat calculé à partir de cet état ancien.

---

## 4) ÉTAPE 3 : CORRIGER

Une seule chose à la fois. Toujours.

Une copie immuable ne suffit pas à synchroniser deux opérations concurrentes. Elle est utile pour rendre les transitions explicites, à condition que les transitions soient appliquées séquentiellement :

```js
function consommer(stock, quantite) {
  if (stock.munitions < quantite) {
    return { ok: false, prochainStock: stock };
  }
  return {
    ok: true,
    prochainStock: { ...stock, munitions: stock.munitions - quantite },
  };
}

let stock = { munitions: 100 };
for (const quantite of [70, 70]) {
  const resultat = consommer(stock, quantite);
  if (resultat.ok) stock = resultat.prochainStock;
}
console.log(stock.munitions); // 30 : une demande acceptée, la seconde refusée
```

Cette boucle séquentielle convient à un état détenu par un seul agent. Pour plusieurs processus ou instances qui modifient une base PostgreSQL, déplace la vérification et le retrait dans une seule instruction atomique :

```sql
UPDATE camp_stock
SET munitions = munitions - $1
WHERE camp_id = $2 AND $1 > 0 AND munitions >= $1
RETURNING munitions;
```

Valide aussi `quantite > 0` côté service et conserve une contrainte de données qui interdit un stock négatif. Les paramètres du driver (`$1`, `$2`) évitent la concaténation SQL. Si aucune ligne n'est retournée, la demande n'a pas été acceptée (quantité invalide, stock insuffisant ou camp absent : le contrat applicatif peut distinguer ces cas). Une copie d'objet, un mutex local ou `Promise.all` ne remplacent pas une garantie transactionnelle partagée.

Teste la correction sur le même scénario reproductible de l'étape 1, puis vérifie les cas limites et les autres consommateurs du stock.

---

## 5) ÉTAPE 4 : VÉRIFIER

La correction a résolu le bug. Elle n'a pas créé d'autres problèmes ?

Vérifications :

```text
- Rejouer le scénario de reproduction : le bug est bien parti.
- Tester les cas aux limites (limite inférieure, supérieure, valeur nulle).
- Vérifier que les autres fonctions qui utilisaient le même code fonctionnent encore.
- Si des tests automatiques existent : les lancer.
- Si des tests automatiques n'existent pas : écrire au moins un test sur ce cas.
```

Règle d'or : quand tu corriges un bug, tu écris un test qui aurait détecté ce bug plus tôt. Sinon, le bug reviendra et tu ne le verras pas venir.

---

## 6) `console.log` VS LE DEBUGGER

Les deux servent. Ils ne servent pas au même moment.

```text
console.log  --> rapide, jetable, bon pour trouver OU ça casse
debugger   --> puissant, lent à démarrer, bon pour comprendre POURQUOI ça casse
```

### Utiliser `console.log` intelligemment

Ne pas logger une variable : logger un label + une variable.

```js
function consommerAvecDiagnostic(stock, quantite) {
  // Mauvais réflexe : loguer seulement l'objet sans contexte.
  console.log(stock);

  // Meilleur diagnostic : contexte + valeurs réellement utilisées.
  console.log("[consommer] stock avant:", { munitions: stock.munitions });
  console.log("[consommer] quantité demandée:", quantite);

  if (quantite <= 0 || stock.munitions < quantite) return false;
  stock.munitions -= quantite;
  console.log("[consommer] stock après:", { munitions: stock.munitions });
  return true;
}

consommerAvecDiagnostic({ munitions: 100 }, 30);
```

Certains outils d'inspection, notamment les DevTools du navigateur, peuvent afficher
les propriétés d'un objet référencé au moment où tu le développes plutôt qu'au moment
de l'appel à `console.log`. Le comportement dépend de l'outil et du runtime : ne
présume pas que tous les environnements loguent de la même façon.

Pour conserver un instantané, préfère un objet neuf contenant les champs utiles.
`structuredClone(obj)` clone de nombreuses données structurées prises en charge, mais
échoue notamment sur les fonctions et certaines références non clonables.
`JSON.parse(JSON.stringify(obj))` n'est pas une copie profonde universelle : les
propriétés `undefined` d'un objet sont omises, les `Date` deviennent des chaînes,
les `Map`/`Set` ne sont pas préservées comme telles, les cycles et `BigInt` échouent.
Réserve cette sérialisation aux données simples compatibles JSON.

```js
const obj = { count: 0 };
const snapshot = structuredClone({ count: obj.count });
console.log(snapshot); // cet instantané ne change pas avec obj.count
```

Nettoyer les logs après : un `console.log('[DEBUG]')` qui reste en prod, ça pue.

### Utiliser le debugger

Voir `04-devtools_debugger.md` pour le détail complet.
Utilise le debugger quand :

```text
- tu veux voir l'état de plusieurs variables simultanément
- tu veux avancer instruction par instruction
- tu veux comprendre le flux d'exécution sans polluer le code de logs
- tu dois inspecter des objets complexes ou des closures
```

---

## 7) LE CAS QUI CASSE

Scénario classique : tu corriges sans reproduire. Le bug "disparaît". Deux heures plus tard, il est revenu dans un autre composant.

```js
// Bug rapporté : le score d'un match Ballon d'Or s'affiche en négatif
// Diagnostic rapide (mauvais) : "ah, c'est sûrement parseInt qui manque"
function afficherScore(joueur) {
  joueur.score = parseInt(joueur.score); // ajout rapide sans comprendre la source
  return joueur.score;
}

// Résultat : le score s'affiche correctement.
// Mais le vrai bug est ailleurs : quelqu'un passe un score en string depuis l'API.
// Ce parseInt patch le symptôme, pas la cause.
// Deux jours plus tard : le même bug dans les stats de saison, où il n'y a pas de parseInt.
```

Reproduire force à comprendre la vraie cause. Sans ça, tu patches des symptômes indéfiniment.

---

## EXERCICES

EXO 1 : Reproduire avant tout (~10 min)

Le camp possède 200 rations. Deux demandes concurrentes réclament chacune 150 rations.
Le service doit en accepter au plus une. Le code ci-dessous simule une lecture puis une
écriture asynchrones séparées : c'est cette frontière qui permet aux deux demandes de
lire le même ancien stock.

```js
let stockNourriture = 200;

async function lireStock() {
  await Promise.resolve();
  return stockNourriture;
}

async function enregistrerStock(nouveauStock) {
  await Promise.resolve();
  stockNourriture = nouveauStock;
}

async function distribuerRation(survivant, besoin) {
  const stockLu = await lireStock();
  if (stockLu < besoin) return { survivant, recu: 0 };
  await enregistrerStock(stockLu - besoin);
  return { survivant, recu: besoin };
}

async function reproduire() {
  stockNourriture = 200;
  const resultats = await Promise.all([
    distribuerRation("Rick", 150),
    distribuerRation("Michonne", 150),
  ]);
  console.log(resultats); // deux demandes accordées
  console.log(stockNourriture); // 50, alors que 300 rations ont été accordées
}

reproduire();
```

Étapes :

1. Reproduis le résultat avec les deux demandes ci-dessus.
2. Isole les deux opérations qui lisent la même valeur puis écrivent depuis cette valeur périmée.
3. Explique pourquoi le test `stockLu < besoin` ne suffit pas quand lecture et écriture sont séparées par `await`.
4. Propose une correction séquentielle pour un état détenu par un seul agent JavaScript, puis explique pourquoi un état partagé entre plusieurs processus exige une transaction ou une mise à jour atomique dans le stockage autoritaire.

Attention : `forEach(async ...)` ne patiente pas sur les Promises, mais cela ne prouve pas à lui seul une race sur deux mutations synchrones. Distingue toujours le défaut d'attente du défaut d'atomicité.

EXO 2 : Bisect sur un pipeline async (~15 min)

Ce pipeline de scoring Ballon d'Or retourne parfois `NaN` comme score final. Pas toujours.

```js
async function calculerScoreFinal(joueur) {
  const votesPresse = await getVotesPresse(joueur.id); // retourne [] si aucun vote
  const votesCoaches = await getVotesCoaches(joueur.id);
  const votesCapitaine = await getVotesCapitaine(joueur.id);

  const scorePresse = votesPresse.reduce((acc, v) => acc + v.points, 0);
  const scoreCoaches = votesCoaches.reduce((acc, v) => acc + v.points, 0);
  const scoreCapitaine = votesCapitaine.reduce((acc, v) => acc + v.points, 0);

  const total = scorePresse + scoreCoaches + scoreCapitaine;
  return total / 3; // moyenne
}
```

Exercice :

1. Identifie toutes les causes possibles d'un `NaN` dans ce pipeline
2. Construis un cas de test minimal pour chaque cause
3. Propose une correction pour chacune

---

## RÉSUMÉ

Tu sais maintenant debugger sans jouer à la loterie.
Reproduis d'abord : si tu ne peux pas déclencher le bug à volonté, tu ne peux pas le corriger.
Isole ensuite : le plus petit code possible qui produit encore le bug.
Corrige une chose à la fois. Vérifie que rien d'autre ne casse.
`console.log` pour localiser, debugger pour comprendre. Les deux ont leur moment.
Un bug corrigé sans test : un bug qui reviendra sans prévenir.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

<!-- AF-LESSON-PROFILE: debug -->

## Repères de décision

- **Pourquoi :** Sans reproduction, un correctif peut masquer le symptôme tout en laissant la cause active. Un diagnostic solide réduit le risque de régression et le temps perdu en production.
- **Quand l’utiliser / quand l’éviter :** Utilise cette méthode dès qu'un défaut est observable mais sa cause incertaine. Évite de modifier plusieurs variables à la fois ou d'ajouter des logs qui exposent des données sensibles.
- **Limites :** Un bug intermittent peut disparaître sous instrumentation. Une reproduction locale peut ne pas contenir la charge, le réseau ou les données du terrain ; conserve les limites de ton diagnostic.

## Mécanisme : la version sans magie

Énonce une hypothèse falsifiable, fixe les entrées, reproduis, collecte un signal ciblé, élimine les hypothèses, corrige puis garde un test de non-régression.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Debug methodology : quatre étapes, zéro hasard** se rattache à ce cas concret : Kintana reçoit un signalement de double demande après un délai réseau. Il faut déterminer s'il s'agit d'un double clic, d'un retry, d'un worker rejoué ou d'une transaction non atomique.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Reproduction et correction d'un incident Kintana

> **Arc Walking Dead :** quand l'alerte sonne, courir dans tous les sens ne sauve personne. Reproduis, isole, mesure, puis répare.

**Mission liée à « Debug methodology : quatre étapes, zéro hasard » :** Reproduis un scénario de double création ou de notification manquante. Écris trois hypothèses classées, collecte un identifiant de corrélation, isole une cause puis ajoute un test qui échoue avant le correctif.

**Livrable :** un rapport d'incident court, les étapes de reproduction, le patch minimal, le test de régression et les limites non reproduites.

**Critères d’acceptation :** la cause est étayée par un signal ; une seule variable principale change à la fois ; le test détecte l'ancien défaut ; les données sensibles sont masquées dans les traces.

**Transfert obligatoire :** Change l'ordre des événements ou ajoute une latence variable. Vérifie si la même hypothèse tient toujours.
