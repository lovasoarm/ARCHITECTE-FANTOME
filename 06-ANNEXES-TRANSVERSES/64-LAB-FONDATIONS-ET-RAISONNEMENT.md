---
stability: evolutif
acte: pratiquer
noyau: renfort
route: formation-complete
prerequis:
  - 00-SOCLE/04-FUNDAMENTALS/README.md
  - 00-SOCLE/05-PROBLEM-SOLVING/README.md
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "06-ANNEXES-TRANSVERSES/01-COMMENT-UTILISER-LE-PARCOURS.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 06-ANNEXES-TRANSVERSES/01-COMMENT-UTILISER-LE-PARCOURS.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# 64 : Laboratoire de fondations : du mécanisme à la preuve

> Ce laboratoire rend les fondations observables. Il ne remplace pas les cours détaillés du socle : il vérifie que l'apprenant sait prédire, expliquer, tester, corriger et transférer ce qu'il a appris.

## Contrat pédagogique

À faire après les leçons concernées du socle. Pour chaque activité, conserve : prédiction datée, essai reproductible, résultat réel, explication causale, contre-exemple, correction et transfert. Une réponse qui copie le corrigé sans pouvoir prédire une nouvelle variante ne valide pas le gate.

**Environnement :** JavaScript moderne, avec Node.js pour les exemples exécutables. Les activités de raisonnement peuvent d'abord être réalisées sur papier ; l'exécution sert ensuite à réfuter ou confirmer la prédiction. Aucune installation additionnelle ni service distant n'est requis pour ces exemples.

**Compétences visées :** sémantique des valeurs et références, état et portée, ordonnancement asynchrone, choix de structures de données, conception de tests et raisonnement sur les erreurs.

## Activité 1 : Valeur, référence et mutation

### Problème

Une fonction modifie un objet reçu en argument. Le développeur croit avoir créé une copie de sauvegarde, mais la copie et l'original partagent parfois une référence interne.

### Exemple travaillé

```js
const original = { profile: { name: "Ada" }, score: 10 };
const shallow = { ...original };
const independentProfile = {
  ...original,
  profile: { ...original.profile },
};

shallow.profile.name = "Grace";
independentProfile.profile.name = "Lin";

console.log(original.profile.name); // Grace
console.log(shallow.profile.name); // Grace
console.log(independentProfile.profile.name); // Lin
```

### Explication attendue

L'opérateur de propagation crée ici un nouvel objet de premier niveau ; il ne clone pas récursivement les objets imbriqués. `original.profile` et `shallow.profile` désignent le même objet. La troisième structure crée aussi un objet `profile` distinct pour cette forme de données. Ce n'est pas une preuve qu'une copie superficielle ou manuelle convient à tout graphe d'objets : références cycliques, dates, maps, sets, prototypes et objets spécialisés demandent une décision explicite.

### Exercice indépendant

Ajoute `preferences: { theme: 'light' }`. Crée deux copies : l'une doit partager `preferences`, l'autre doit l'isoler. Écris des assertions qui échouent si les deux objets partagent encore la préférence. Ne teste pas uniquement l'égalité des valeurs initiales : teste l'identité et l'effet d'une mutation.

**Correction de référence :** une assertion d'identité telle que `assert.notStrictEqual(copy.preferences, original.preferences)` prouve que les références diffèrent. Ensuite, modifier `copy.preferences.theme` doit laisser `original.preferences.theme` à `'light'`. La stratégie de copie doit être adaptée à la profondeur et aux types réellement admis par le contrat.

**Erreur éliminatoire :** conclure que `{ ...x }` réalise toujours une copie profonde.

**Transfert :** applique le raisonnement à un état Redux-like, à un cache de réponse et à un objet de configuration partagé entre tests. Pour chacun, dis quelle mutation serait observable par les autres consommateurs.

## Activité 2 : Portée, fermeture et état isolé

### Exemple travaillé

```js
function makeCounter(start = 0) {
  let value = start;
  return {
    increment() {
      value += 1;
      return value;
    },
    read() {
      return value;
    },
  };
}

const a = makeCounter(0);
const b = makeCounter(10);
console.log(a.increment(), a.increment(), b.read()); // 1 2 10
```

Chaque appel de `makeCounter` crée un environnement lexical distinct. Les méthodes de `a` gardent accès à la variable `value` de l'appel qui les a créées ; elles ne partagent pas celle de `b`.

### Exercice indépendant

Ajoute une méthode `reset(nextValue)`. Définis explicitement le contrat sur les valeurs invalides, notamment `NaN`, `Infinity`, les chaînes et les nombres négatifs. Implémente-le et écris des tests positifs et négatifs. Puis écris une variante où deux consommateurs partagent volontairement un compteur unique : indique quel changement d'architecture a permis le partage.

**Correction de référence :** le contrat doit choisir, par exemple, un entier fini et non négatif. Une vérification explicite avant l'affectation évite de laisser un état partiellement modifié. Le partage ne vient pas du mot « closure » ; il vient du partage de la même instance ou d'un stockage externe commun.

**Erreur éliminatoire :** affirmer que toutes les fermetures partagent un environnement global, ou que deux appels à la factory partagent nécessairement le même état.

**Transfert :** explique comment un handler HTTP fabriqué une fois puis réutilisé diffère d'un handler créé par requête.

## Activité 3 : Asynchrone : séparer ordre, concurrence et achèvement

### Exemple travaillé

```js
console.log("sync:start");

Promise.resolve().then(() => console.log("microtask"));
setTimeout(() => console.log("timer"), 0);

console.log("sync:end");
```

Dans une exécution ordinaire de script Node.js, les deux logs synchrones apparaissent avant le callback de promesse et le callback du timer ; la microtask est traitée avant le timer dans ce cas simple. Cette observation ne signifie pas que tous les timers sont précis, que le réseau est ordonné, ni qu'un délai nul garantit une exécution immédiate. Le contexte d'exécution et les mécanismes propres au runtime peuvent modifier des détails d'ordonnancement.

### Exercice indépendant

Écris une fonction qui lance deux tâches indépendantes et renvoie leurs résultats. Construis une première version séquentielle puis une version concurrente avec `Promise.all`. Injecte un délai variable dans chaque tâche. Mesure le temps total, puis fais échouer une tâche. Explique ce que `Promise.all` garantit et ce qu'il ne garantit pas concernant l'annulation des autres opérations.

**Correction de référence :** lorsque les tâches sont indépendantes, la concurrence peut rapprocher la durée totale de la durée de la plus lente, alors que l'exécution séquentielle additionne leurs durées. Cette conclusion dépend du travail réel, du coût de concurrence et des ressources partagées. `Promise.all` rejette dès qu'une promesse rejetée est observée, mais ne stoppe pas automatiquement les opérations déjà lancées. Une annulation requiert un protocole explicite, par exemple un `AbortSignal` accepté par les tâches.

**Erreur éliminatoire :** déduire qu'un timeout signifie que l'opération distante n'a pas été exécutée, ou appeler une suite de promesses « parallèle » sans examiner leurs dépendances.

**Transfert :** compare le même problème avec un appel HTTP lent, une lecture disque et une opération CPU intensive.

## Activité 4 : Structure de données et invariant

### Problème

Un programme doit vérifier si un identifiant existe dans un ensemble qui est consulté très souvent et mis à jour occasionnellement.

### Exemple travaillé

```js
const ids = ["u-01", "u-02", "u-03"];
const idSet = new Set(ids);

console.log(ids.includes("u-03")); // true
console.log(idSet.has("u-03")); // true
```

La liste est utile si l'ordre et les doublons comptent. `Set` exprime un ensemble de valeurs uniques et offre généralement une recherche moyenne sublinéaire, souvent décrite comme O(1) moyen, sans promettre une constante universelle indépendante de l'implémentation ou de la charge. La bonne structure dépend des opérations dominantes et des invariants, pas d'un slogan de complexité isolé.

### Exercice indépendant

Compare trois options pour un catalogue : liste de produits, dictionnaire indexé par identifiant, et `Map` indexée par identifiant. Évalue lookup, insertion, suppression, ordre, doublons et coût de maintien de l'index. Construis un jeu de données reproductible, mesure plusieurs tailles et vérifie l'équivalence fonctionnelle.

**Correction de référence :** un dictionnaire/une `Map` par identifiant est souvent adapté à une recherche fréquente par clé ; une liste reste naturelle pour un parcours séquentiel ou un ordre métier explicite. Si la liste est la source de vérité et l'index un dérivé, l'ajout/suppression doit mettre les deux à jour de façon cohérente. Mesure la forme de la charge et ne présente pas un petit benchmark local comme une garantie de production.

**Erreur éliminatoire :** annoncer qu'un algorithme est toujours plus rapide sans décrire l'entrée, l'implémentation et le coût mémoire.

**Transfert :** propose la structure adaptée pour un inventaire de millions d'éléments lorsque les mises à jour concurrentes viennent de plusieurs processus.

## Activité 5 : Un test utile doit distinguer le correct du défectueux

### Exemple travaillé

La fonction suivante accepte par erreur une quantité infinie :

```js
function canWithdraw(balance, amount) {
  return amount > 0 && amount <= balance;
}
```

Une bonne suite couvre les cas valides et invalides, mais aussi les limites de représentation : `NaN`, `Infinity`, zéro, valeur négative, type non numérique et montant supérieur au solde.

```js
import assert from "node:assert/strict";

assert.equal(canWithdraw(100, 40), true);
assert.equal(canWithdraw(100, 101), false);
assert.equal(canWithdraw(100, 0), false);
assert.equal(canWithdraw(100, "40"), false); // échoue avec la version initiale
```

### Travail

1. Exécute les tests et conserve l'échec initial.
2. Corrige la fonction en explicitant son domaine d'entrée.
3. Ajoute des tests pour `NaN`, une chaîne, un solde invalide et des montants fractionnaires si le métier les autorise ou les interdit.
4. Modifie volontairement le code pour réintroduire le défaut et vérifie que la suite échoue de nouveau.

**Correction de référence :** si le domaine autorise seulement des nombres finis non négatifs, vérifie les deux arguments avec `Number.isFinite`, puis les contraintes métier :

```js
function canWithdraw(balance, amount) {
  return (
    Number.isFinite(balance) &&
    Number.isFinite(amount) &&
    balance >= 0 &&
    amount > 0 &&
    amount <= balance
  );
}
```

Si la monnaie est modélisée en unités mineures entières, définis cette représentation et ses limites plutôt que d'utiliser des nombres flottants sans règle. La solution dépend du contrat financier ou métier réellement retenu.

**Erreur éliminatoire :** corriger la fonction sans pouvoir montrer un test qui échoue avant correction et réussit après.

**Transfert :** applique cette méthode à un délai, une limite de taille de requête ou un compteur monotone.

## Évaluation du laboratoire

Note chaque dimension de 0 à 4, avec un artefact comme preuve :

| Dimension     | 0                      | 2                                 | 4                                                                 |
| ------------- | ---------------------- | --------------------------------- | ----------------------------------------------------------------- |
| Modèle causal | Devine le résultat     | Explique une partie du mécanisme  | Prédit et explique les limites                                    |
| Tests         | Aucun cas discriminant | Cas nominal + quelques limites    | Cas discriminants, avant/après, assertions explicites             |
| Autonomie     | Recopie                | Résout avec indices               | Résout une variante nouvelle sans recette                         |
| Transfert     | Répète l'exemple       | Change un paramètre               | Adapte le principe à deux dimensions différentes                  |
| Défense       | Répète une formule     | Donne une justification partielle | Défend la preuve et nomme ce qui pourrait invalider la conclusion |

**Gate de sortie :** aucune dimension critique en dessous de 3/4 et aucune erreur éliminatoire. Si le mécanisme n'est pas expliqué, retourne à la leçon ciblée plutôt que de relire tout le socle. Reprends un rappel sans notes après quelques jours, puis un transfert plus tard ; le calendrier est ajustable, mais le délai et le résultat doivent être consignés.

## Fiche de preuve à conserver

- compétence et leçon source ;
- prédiction datée ;
- code/test ou calcul reproductible ;
- résultat réel et écart avec la prédiction ;
- correction de référence comparée à ta solution ;
- contre-exemple ou hypothèse cassée ;
- transfert avec au moins deux contraintes modifiées ;
- date et résultat du rappel différé ;
- limite non démontrée.

Voir aussi [62 : Fiche apprentissage / preuve](62-FICHE-APPRENTISSAGE-PREUVE.md), [63 : Laboratoire de tests](63-LAB-TESTING-ENGINEERING.md) et [61 : Exercices systèmes](61-PACK-EXERCICES-SYSTEMES-ET-ARBITRAGES.md).
