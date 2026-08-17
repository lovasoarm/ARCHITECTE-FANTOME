# 02 : CQRS ET COHÉRENCE À TERME
Temps de lecture ~11 min

Intuition : dans un stade, le guichet qui vend les places et l'écran qui affiche l'affluence n'ont pas les mêmes contraintes. Le guichet doit être exact à la place près. L'écran peut avoir deux secondes de retard sans que personne ne meure.

CQRS (Command Query Responsibility Segregation : séparer le modèle d'écriture du modèle de lecture) formalise ça.

```js
const commandes = { reserverPlace: (id) => db.insert("places", { id }) };
const lectures  = { affluence: () => cache.get("affluence_stade") };
```

```js
onEvent("PlaceReservee", async (e) => {
  await cache.incr(`affluence_${e.stade}`);
});
```

```js
// qui casse : on branche la lecture directement sur la base d'écriture
const affluence = () => db.query("SELECT count(*) FROM places WHERE ...");
// au match suivant, la requête d'affluence verrouille la table des
// réservations, et plus personne ne peut acheter.
```

Risque réel : CQRS introduit une **cohérence à terme** (eventual consistency : la lecture rattrape l'écriture avec du retard). Si le métier ne l'accepte pas explicitement, tu as créé un bug fonctionnel, pas une optimisation.

## LE FLUX, DESSINE

Tu dois savoir redessiner ce schema au tableau blanc, de memoire, en moins de deux
minutes. C'est la forme exacte sous laquelle CQRS est demande en entretien.

```text
   [ Client ]
       |
       | (1) COMMANDE  reserverPlace(id)      flèche pleine  = appel synchrone
       v                                       (le client attend la reponse)
 +-----------------------+
 | MODELE D'ECRITURE     |   source de verite, normalise, transactionnel
 | places (SQL)          |   contrainte : exactitude a la place pres
 +-----------------------+
       |
       | (2) EVENEMENT  PlaceReservee{id, stade, t0}
       |     flèche pointillee = asynchrone, le client n'attend pas
       v
 . . . . . . . . . . . . .
 . BUS D'EVENEMENTS      .   file durable, ordre par cle, rejouable
 . . . . . . . . . . . . .
       |
       | (3) PROJECTION  worker qui applique l'evenement
       v
 +-----------------------+
 | MODELE DE LECTURE     |   denormalise, jetable, reconstructible
 | affluence (cache)     |   contrainte : rapidite, tolerance au retard
 +-----------------------+
       ^
       | (4) REQUETE  affluence()   flèche pleine = synchrone
       |
   [ Client ]

 |<------------------ FENETRE D'INCOHERENCE ------------------>|
 t0 = commande acceptee                     t1 = lecture a jour
 mesuree au module : 50 ms mini, ~150 ms en moyenne, 245 ms au pire
 pendant cette fenetre, la lecture renvoie l'ancienne valeur ou `undefined`
```

Legende des fleches, a citer quand tu presentes le schema :

| Symbole | Sens | Ce que ca engage |
| --- | --- | --- |
| `-->` trait plein | appel synchrone | le client attend, la latence est dans son temps de reponse |
| `. . >` pointille | propagation asynchrone | le client n'attend pas, mais la donnee est en retard |
| `|<-- -->|` | fenetre d'incoherence | duree pendant laquelle deux utilisateurs voient deux verites |

Les trois erreurs qui font echouer la restitution au tableau : oublier le bus (on
dessine une fleche directe ecriture -> lecture, et il n'y a plus de rejouabilite),
oublier d'annoter la fenetre en millisecondes (le schema redevient une opinion), et
dessiner le modele de lecture comme une base durable (il est jetable : sa seule
propriete interessante est de pouvoir etre reconstruit depuis les evenements).

## EXERCICE 1 : MESURER LE LAG DE PROJECTION (25 min, code exécutable)

Ce script simule une écriture (commande) et une projection de lecture alimentée par un événement, avec une latence réseau réaliste. Il mesure, en millisecondes, le délai réel entre l'écriture et le moment où la lecture reflète cette écriture.

```js
// lag_projection.js : node lag_projection.js
const evenements = [];
const modeleLecture = new Map(); // la "vue" que consultent les utilisateurs

function ecrire(id, valeur) {
  const t0 = process.hrtime.bigint();
  // la commande est acceptée immédiatement : c'est le contrat du modèle d'écriture
  const evt = { id, valeur, t0 };
  // latence de propagation réaliste : bus de messages, réseau, worker occupé
  const latenceMs = 50 + Math.random() * 200;
  setTimeout(() => projeter(evt), latenceMs);
  return t0;
}

function projeter(evt) {
  const t1 = process.hrtime.bigint();
  const lagMs = Number(t1 - evt.t0) / 1_000_000;
  modeleLecture.set(evt.id, evt.valeur);
  evenements.push({ id: evt.id, lagMs });
}

async function lire(id) {
  return modeleLecture.get(id); // peut renvoyer undefined ou une valeur périmée
}

async function main() {
  const N = 20;
  for (let i = 0; i < N; i++) ecrire(`resa-${i}`, "confirmee");

  // un utilisateur lit l'affluence IMMÉDIATEMENT après avoir réservé
  const valeurImmediate = await lire("resa-0");
  console.log("lecture immédiate après écriture :", valeurImmediate); // undefined, presque toujours

  // on attend que toutes les projections soient passées
  await new Promise((resolve) => setTimeout(resolve, 400));

  const lags = evenements.map((e) => e.lagMs);
  const moyenne = lags.reduce((a, b) => a + b, 0) / lags.length;
  const max = Math.max(...lags);
  console.log(`lag moyen mesuré : ${moyenne.toFixed(1)} ms sur ${lags.length} écritures`);
  console.log(`lag maximum mesuré : ${max.toFixed(1)} ms`);
}

main();
```

Résultat typique (variable, dépend de l'aléatoire) : `lecture immédiate après écriture : undefined`, puis `lag moyen mesuré : ~150 ms`, `lag maximum mesuré : ~245 ms`. La lecture juste après l'écriture est presque toujours périmée ou absente : c'est la preuve chiffrée, pas supposée, de la cohérence à terme.

**Consigne** : exécute ce script trois fois, note les trois lags moyens obtenus, et réponds par écrit : ton métier accepte-t-il qu'un utilisateur voie "0 place réservée" pendant 150 ms après avoir validé sa propre réservation ? Si non, quelle mitigation (lecture directe du modèle d'écriture pour l'auteur de l'action, ack optimiste côté UI) proposes-tu, et quel est son coût ?

## EXERCICE 2 : LE BUDGET DE COHÉRENCE

Reprends le lag maximum mesuré ci-dessus. Écris-le dans ton ADR comme un chiffre engageant : "notre modèle de lecture peut afficher une donnée vieille de X ms". Compare ce chiffre au SLO de ton parcours critique (module [03-PILOTAGE/06_fiabilite_slo](../../03-PILOTAGE/06_fiabilite_slo/00_why_fiabilite_slo.md)) : si ton SLO promet une exactitude à la seconde près et que ton lag mesuré dépasse la seconde, l'un des deux documents ment.

## RÉSUMÉ

CQRS sépare ce qui écrit de ce qui lit pour gagner en performance de lecture, au prix d'un lag mesurable, jamais nul. Ce lag se mesure, ne se suppose pas. Suite : [03_contrats_migration.md](03_contrats_migration.md). Defense orale du concept : [05_expliquer_cqrs_a_3_publics.md](05_expliquer_cqrs_a_3_publics.md).
