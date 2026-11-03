---
perishability_id: PER-0067

stability: "perissable"
acte: comprendre
cognitive_level: L4
perturbation_modes: [constraints_injectees, decision_inversee]
anti_recipe_key: constraints_injectees+decision_inversee
transfer_distance: high
assessment_role: diagnostic_mastery
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_url: "https://git-scm.com/docs/git-bisect"
source_type: "primary"
review_interval: "3 mois"
review_due: "2027-02-03"
source_scope: "Documentation officielle ou source primaire consultée en rapport avec « Méthode de debug : bissection, hypothèses, profilers, logs ». La référence soutient le concept/version explicitement indiqué dans cette ressource ; ce statut ne certifie pas chaque phrase, chaque snippet ni l'exécution locale. Les affirmations empiriques et les API versionnées restent limitées au scope ci-dessous."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "OFFICIAL_SOURCE_IDENTITY_AND_CONCEPT_SCOPE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

> **SCÈNE CRAZYDEVS : mur de siège :** le bug n'est pas “où ça a explosé ?”, mais “où la première fissure est-elle apparue ?”. Ici, chaque log, test et reproduction est une empreinte dans le mur.

# Méthode de debug : bissection, hypothèses, profilers, logs

Temps de lecture ~7 min

## Le piège

La bibliothèque d'un club d'escalade gère le prêt de baudriers et de cordes avec un système
maison. Un vendredi, le rapport de disponibilité affiche parfois deux baudriers de plus que
le stock réel : mais pas toujours, et jamais de manière reproductible en local. Tu ouvres le
code, tu regardes la fonction de calcul de stock, elle te semble correcte. Tu ajoutes un
`console.log`, tu ne vois rien d'anormal sur ton poste. Tu conclus "ça doit être un problème
de cache côté client" et tu passes à autre chose. Trois semaines plus tard, le même bug
revient, plus grave. Tu n'as jamais eu de méthode : tu as eu une intuition non vérifiée que
tu as prise pour une conclusion.

## Ce qui se passe vraiment

Déboguer sans méthode, c'est chercher une aiguille dans une botte de foin en retournant le
foin au hasard. Déboguer avec méthode, c'est diviser la botte en deux, vérifier dans quelle
moitié se trouve l'aiguille, et répéter : une recherche qui réduit méthodiquement l’espace des révisions,
quelle que soit la taille du foin.

```text
Recherche au hasard (sans méthode)
------------------------------------
Complexité pire cas : O(n)  : proportionnelle à la taille du code suspect
Complexité moyenne  : imprévisible, dépend de la chance et de l'intuition

Bissection (avec méthode)
------------------------------------
Complexité pire cas : O(log n) : pour 1000 commits suspects, ~10 étapes suffisent
Complexité : environ O(log n) étapes dans un historique linéaire, si les bornes good/bad sont connues, si les commits peuvent être testés et si le critère de classement est fiable. Ce n’est pas une garantie pour tout dépôt ou tout défaut.
```

### Étape 1 : reproduire avant de chercher

Un défaut intermittent reste un défaut possible : l'absence de reproduction immédiate ne prouve pas son absence. Avant de modifier le code, consigne le contexte, la fréquence observée, les versions, les entrées et les signaux disponibles. Construis ensuite un scénario minimal et répétable lorsque c'est possible. Une reproduction fiable facilite la comparaison des hypothèses et la vérification d'un correctif, mais aucun facteur universel ne permet d'annoncer à l'avance un gain de temps précis.

### Étape 2 : bissection systématique

L'idée de diviser un espace de recherche peut inspirer une enquête, mais elle ne s'applique que si tu sais former deux sous-ensembles utiles et si un test fiable peut dire lequel contient le défaut. `git bisect` a un cadre plus précis : des révisions ordonnées dans un historique et un comportement que l'on peut classer comme bon ou mauvais.

```bash
# Bissection sur l'historique Git : trouver le commit qui a introduit une régression
git bisect start
git bisect bad                  # le commit actuel (HEAD) est buggé
git bisect good v1.4.0          # cette version-là était saine
# Git choisit un commit au milieu, tu le testes, tu réponds :
git bisect good   # ou
git bisect bad
# Répète jusqu'à localiser la première révision mauvaise ; le nombre d'étapes
# est de l'ordre de log2(n) si les hypothèses de bissection tiennent.
git bisect reset
```

Cette procédure suppose un historique ordonné, une révision connue comme saine et une révision connue comme défectueuse. Chaque révision intermédiaire doit pouvoir être évaluée avec un critère suffisamment fiable. Si le défaut est intermittent, si plusieurs changements indépendants ont eu lieu, si une révision ne se construit pas ou si le comportement n'est pas monotone dans l'historique, marque les cas non testables (`git bisect skip` lorsque pertinent) et rapporte l'incertitude. La bissection aide à localiser une régression ; elle ne prouve pas à elle seule la cause racine ni la correction.

La même logique s'applique sans Git : si le bug apparaît dans une fonction de 200 lignes,
isole la moitié, vérifie si le symptôme persiste, répète sur la moitié suspecte. Chaque étape
réduit approximativement de moitié l’intervalle de révisions candidates à chaque étape lorsque les hypothèses de bissection tiennent ; elle ne garantit pas une
convergence rapide sur du code inconnu.

### Étape 3 : hypothèses falsifiables, pas des intuitions

Une hypothèse utile prédit un résultat observable différent selon qu'elle est vraie ou
fausse. "Ça doit être un problème de cache" n'est pas falsifiable tant que tu n'as pas dit
comment le vérifier. "Désactiver le cache dans les DevTools doit faire disparaître le
symptôme immédiatement" l'est : le test tranche.

```text
Hypothèse non falsifiable          Hypothèse falsifiable
--------------------------         -------------------------------------
"Ça doit venir de la base"    -->    "Si ça vient de la base, la requête SQL
                                     isolée doit reproduire le doublon
                                     directement dans un client SQL, hors
                                     application"
```

### Étape 4 : logs ciblés, pas logs partout

Un log ajouté au hasard pollue le signal. Un log utile répond à une question posée avant de
l'écrire : "à cet instant précis, quelle valeur doit valoir X si mon hypothèse est vraie ?"

```typescript
// Mauvais : log générique, aucune hypothèse derrière
console.log("stock", stock);

// Utile : log qui teste une hypothèse précise (race condition sur requêtes concurrentes)
console.log(
  `[stock-check] req=${requestId} avant_lecture=${Date.now()} valeur_lue=${stock}`,
);
// --> si deux req logguent la même valeur_lue avant qu'aucune n'ait écrit, c'est une race
//   condition confirmée, pas une supposition.
```

### Étape 5 : profilers, mesurer avant d'optimiser, et savoir ce qu'ils cachent

Un profiler te dit où le temps est passé, mais seulement dans les conditions où tu l'as
lancé. Trois pièges de mesure reviennent sans cesse :

```text
Piège 1 : environnement non représentatif
  Profiler en local avec une base vide ne révèle jamais les problèmes de volume qui
  n'apparaissent qu'à 100 000 lignes.

Piège 2 : échantillonnage qui masque les événements rares
  Un profiler statistique (sampling) peut manquer un appel lent qui se produit une fois
  sur mille : exactement le genre de bug qu'on cherche à isoler.

Piège 3 : optimiser la fonction la plus visible plutôt que la plus coûteuse
  Le profiler montre du temps passé dans une fonction utilitaire appelée partout ; ce
  n'est pas forcément elle le goulot : regarde le temps cumulé, pas le nombre d'appels.
```

## Compromis

| Option                                          | Coût                                               | Bénéfice                                                                                            | Quand choisir                                                                    |
| ----------------------------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Tâtonnement intuitif                            | Rapide sur les bugs triviaux                       | Ne scale pas, aucune garantie de convergence                                                        | Bug évident, une ligne, contexte que tu connais déjà bien                        |
| Bissection systématique                         | Discipline, quelques étapes incompressibles        | Réduction systématique de l’intervalle si les bornes good/bad et les résultats de test sont fiables | Bug non local, régression apparue entre deux versions                            |
| Logs ciblés par hypothèse                       | Temps de réflexion avant d'écrire le log           | Signal exploitable immédiatement, pas de bruit                                                      | Bug intermittent, race condition, comportement dépendant du contexte d'exécution |
| Profiler en environnement de prod représentatif | Coût d'infrastructure, accès aux données réalistes | Seule mesure qui ne ment pas sur les vrais goulots                                                  | Avant toute optimisation de performance, jamais après                            |

## Pièges classiques

- **Corriger sans avoir reproduit.** Symptôme : le correctif "semble" marcher en local, le
  bug revient en production trois semaines plus tard identique.
- **Changer plusieurs choses à la fois pendant une bissection.** Symptôme : le bug disparaît
  mais tu ne sais pas lequel des trois changements l'a réellement corrigé.
- **Logs laissés en production après le debug.** Symptôme : les logs de debug polluent les
  vrais logs applicatifs pendant des mois, jusqu'à ce que quelqu'un les retrouve par hasard.
- **Optimiser sur la base d'une intuition sans profiler.** Symptôme : le code "optimisé" est
  plus complexe, plus dur à maintenir, et le profiler montre après coup que le vrai goulot
  était ailleurs.

## Analogie

Analogie : déboguer, c'est le diagnostic différentiel des urgences, et la recherche d'une voie d'eau à bord.
Où l'analogie casse : à bord l'eau se voit monter, un bug silencieux corrompt des données pendant des semaines sans signal.

## Ce que tu dois savoir défendre

- Explique dans quelles conditions `git bisect` réduit le nombre de révisions en O(log n), et donne deux cas où cette méthode ne permet pas de conclure proprement (commits impossibles à tester, comportement intermittent ou changement non monotone).
- Donne un exemple d'hypothèse non falsifiable que tu as toi-même formulée un jour, et
  reformule-la en hypothèse falsifiable.
- Cite les trois pièges de mesure d'un profiler et pour chacun un exemple où il t'aurait
  fait tirer une conclusion fausse.

## Atelier : le bug qui n'arrive qu'une fois sur cinquante

### La scène

Un club d'escalade gère ses créneaux de mur avec un service Node qui accepte les
réservations. Chaque créneau a une capacité fixe, huit places. Un test précis,
`reserve.concurrent.test.ts`, échoue environ une fois sur cinquante en CI. L'équipe relance
la CI quand ça arrive. Un vendredi, neuf personnes se retrouvent sur un créneau à huit
places, un adhérent fait un scandale à l'accueil, et personne ne sait pourquoi le compteur
a menti.

### Le code fourni

```typescript
// Node 22 LTS (verifie le 2026-08-03)
// reservation.ts : service de réservation de créneaux du mur d'escalade

type Creneau = { id: string; capacite: number; placesReservees: number };
const creneaux = new Map<string, Creneau>();
creneaux.set("mardi-19h", { id: "mardi-19h", capacite: 8, placesReservees: 7 });

// Simule un accès base de données avec une latence réseau variable, comme en production.
function latenceReseau(): Promise<void> {
  const ms = Math.random() * 5; // 0 à 5ms, variation réaliste d'un pool de connexions
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function reserverPlace(creneauId: string): Promise<boolean> {
  const creneau = creneaux.get(creneauId);
  if (!creneau) return false;

  await latenceReseau(); // lecture du compteur, comme un SELECT
  const placesActuelles = creneau.placesReservees;
  if (placesActuelles >= creneau.capacite) return false; // complet, refus

  // Entre la lecture ci-dessus et l'écriture ci-dessous, une autre requête concurrente
  // a le temps de lire la même valeur non encore mise à jour.
  await latenceReseau(); // écriture du compteur, comme un UPDATE
  creneau.placesReservees = placesActuelles + 1;
  return true;
}

export function getCreneau(creneauId: string): Creneau | undefined {
  return creneaux.get(creneauId);
}
```

Le test qui échoue environ une fois sur cinquante :

```typescript
// reserve.concurrent.test.ts
import { test, expect } from "vitest";
import { reserverPlace, getCreneau } from "./reservation";

test("le compteur ne dépasse jamais la capacité sous accès concurrent", async () => {
  const creneau = getCreneau("mardi-19h")!;
  creneau.placesReservees = creneau.capacite - 1; // une seule place restante

  const [r1, r2] = await Promise.all([
    reserverPlace("mardi-19h"),
    reserverPlace("mardi-19h"),
  ]);

  expect([r1, r2].filter(Boolean).length).toBe(1); // échoue ~1 fois sur 50
  expect(getCreneau("mardi-19h")!.placesReservees).toBe(creneau.capacite);
});
```

### Étape 1 : rendre le bug déterministe avant toute correction

Règle absolue : **tu n'as pas le droit de toucher au correctif tant que tu ne peux pas
déclencher le bug à volonté.** Un bug corrigé "à l'instinct" sans avoir été rendu
reproductible n'est pas corrigé, il est masqué : la preuve, ce club l'a déjà vécu trois
semaines plus tôt sous une autre forme.

Techniques pour transformer un bug d'une fois sur cinquante en un bug d'une fois sur une :

- **Seed fixe sur l'aléatoire** : remplace `Math.random()` par un générateur seedé le temps
  de l'enquête, pour que chaque exécution produise la même séquence de latences.
- **Injection d'ordonnancement** : force l'entrelacement le plus dangereux (les deux appels
  doivent lire avant qu'aucun n'écrive) via un `await` contrôlé par un paramètre de test.
- **Sleep contrôlé, jamais au hasard** : rends `latenceReseau(ms)` paramétrable dans le
  test. Une requête à 10ms et l'autre à 0ms reproduit l'entrelacement dangereux à coup sûr.
- **Harnais de répétition** : fais tourner le test en boucle et compte les échecs réels
  avant de croire à la fréquence "une fois sur cinquante" annoncée de mémoire :

```bash
for i in $(seq 1 200); do
  npx vitest run reserve.concurrent.test.ts --reporter=dot >> /tmp/run-$i.log 2>&1 \
    || echo "ECHEC run $i" >> /tmp/echecs.log
done
wc -l /tmp/echecs.log
```

Sans ce travail, tu ne peux pas savoir si un futur correctif marche : tu ne peux que
constater, encore une fois, que "ça semble aller mieux".

### Étape 2 : le format HYPOTHESES.md imposé

Chaque hypothèse suit exactement six champs, dans cet ordre, jamais résumés ni fusionnés :

```text
Symptôme observable    : ...
Hypothèse               : ...
Prédiction falsifiable  : ...
Expérience               : ...
Résultat                 : ...
Conclusion               : ...
```

Exemple rempli sur le bug de cet atelier (une hypothèse réfutée, une confirmée) :

```text
Symptôme observable    : le test de concurrence échoue environ une fois sur cinquante,
                          avec un compteur qui dépasse la capacité de un.

Hypothèse 1             : la Map JavaScript n'est pas thread-safe sous accès concurrent.
Prédiction falsifiable  : lire placesReservees juste après l'écriture, sans await entre
                          les deux, doit parfois renvoyer une valeur incohérente.
Expérience               : log juste après l'écriture, 200 exécutions, comparaison
                          valeur écrite / valeur relue.
Résultat                 : la valeur relue correspond toujours à la valeur écrite.
Conclusion               : réfutée. Node est mono-thread : la Map ne se corrompt pas seule.

Hypothèse 2             : deux appels concurrents lisent l'ancienne valeur avant que l'un
                          des deux n'écrive sa mise à jour (lecture-écriture non atomique).
Prédiction falsifiable  : forcer l'entrelacement lecture A, lecture B, écriture A,
                          écriture B doit produire un dépassement à 100% des exécutions.
Expérience               : sleep contrôlé imposant cet ordre exact, 200 exécutions.
Résultat                 : les 200 exécutions dépassent la capacité de un, à chaque fois.
Conclusion               : confirmée. Race condition classique de type
                          lecture-modification-écriture, sans verrou ni contrainte.
```

### Étape 3 : la correction et sa preuve

Le correctif retire toute décision côté application sur une valeur lue séparément, et
déplace la vérification de capacité dans une seule opération atomique en base :

```sql
-- La réservation devient un UPDATE conditionnel unique, plus de lecture séparée.
UPDATE creneaux
SET places_reservees = places_reservees + 1
WHERE id = $1 AND places_reservees < capacite;
-- Si la ligne modifiée est 0, la place n'a pas pu être prise : le créneau était complet
-- au moment exact de l'écriture, pas au moment d'une lecture périmée de quelques ms.
```

La preuve de correction n'est pas "le test passe une fois" : c'est le même harnais de
répétition qui échouait avant, relancé 200 fois de suite sans aucun échec ("200/200",
pas "ça a l'air bon").

### Arbre de décision d'enquête

```text
Un test échoue de facon intermittente
|
+-- Peux-tu le reproduire a volonte (>90% des essais) ?
|     +-- NON --> ne touche pas au code de production. Applique seed fixe, sleep
|     |           controle, injection d'ordonnancement, harnais de repetition.
|     \-- OUI --> continue.
|
+-- As-tu au moins 3 hypotheses falsifiables ecrites dans HYPOTHESES.md ?
|     +-- NON --> ecris-les avant d'ouvrir le code source suspect.
|     \-- OUI --> teste chaque hypothese par une experience separee.
|
+-- Une hypothese est-elle confirmee par une experience qui la rend impossible a nier ?
|     +-- NON --> formule de nouvelles hypotheses, ne corrige rien au hasard.
|     \-- OUI --> ecris le correctif cible sur la cause confirmee.
|
\-- Le test qui echouait passe-t-il 200 fois de suite apres correctif ?
      +-- NON --> le correctif ne traite pas la vraie cause, retour a HYPOTHESES.md.
      \-- OUI --> correction prouvee, documente-la, retire les logs de debug temporaires.
```

Analogie : traquer un bug intermittent, c'est la garde aux urgences qui refuse de traiter
un malaise sans en avoir observé une crise en conditions contrôlées, et la cordée qui refuse
de retenter un passage tant qu'elle n'a pas identifié la prise qui a lâché. Où l'analogie
casse : aux urgences et en cordée, provoquer une crise ou une chute pour l'observer a une
limite éthique. En informatique, provoquer le bug à volonté en test est obligatoire.

<!-- AF-DIAGRAM:tooling -->

## Repère visuel utile : Outil reproductible pour l'équipe Kintana

```text
problème répétitif
       |
       v
solution native ?
   | oui       | non
   v           v
simple     outil évalué
               |
               v
version + tests + docs
               |
               v
usage reproductible
```

<!-- AF-LESSON-PROFILE: tooling -->

## Repères de décision

- **Pourquoi :** La toolchain et les outils de diagnostic réduisent les tâches répétitives et rendent le comportement du système visible.
- **Quand l’utiliser / quand l’éviter :** Choisis un outil quand il résout un problème fréquent et mesurable. Vérifie sa licence, sa maintenance, ses versions, ses permissions et son coût avant de l'ajouter.
- **Limites :** Un outil n'est pas une politique de qualité. Un benchmark, logger ou générateur peut donner une fausse confiance si son protocole et ses limites ne sont pas écrits.

## Mécanisme : la version sans magie

Décris le problème, compare l'outil à une commande native ou à une alternative plus simple, épingle sa version et vérifie le résultat qu'il produit.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Méthode de debug : bissection, hypothèses, profilers, logs** se rattache à ce cas concret : L'équipe Kintana doit pouvoir diagnostiquer une panne et refaire un build sans dépendre d'une configuration cachée sur le poste d'une seule personne.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Outil reproductible pour l'équipe Kintana

> **Arc Capsule Corp. / DBZ :** le bon outil accélère le diagnostic ; dix outils mal choisis ne font que déplacer le bazar.

**Mission liée à « Méthode de debug : bissection, hypothèses, profilers, logs » :** Automatise une opération récurrente du cycle Kintana (analyse, benchmark, log, build ou debug). Ajoute un mode dry-run si l'action est destructive et une vérification qui empêche l'outil de masquer une erreur.

**Livrable :** outil/script, README d'usage, tests sur succès/échec, version épinglée et comparaison au processus manuel.

**Critères d’acceptation :** les arguments sont validés ; les erreurs ont un code de sortie ; aucune donnée sensible n'est imprimée ; la même commande donne une sortie compréhensible et reproductible.

**Transfert obligatoire :** Exécute l'outil sur une autre machine ou avec une version différente. Documente les prérequis et le mode dégradé.

## Références officielles utiles

> **Référence principale vérifiée le 2 novembre 2026 :** la première ressource de ce panneau, également enregistrée dans `source_url`, a été consultée pour le mécanisme versionné traité ici. Les autres liens sont des compléments officiels utiles ; ils ne constituent pas chacun une attestation indépendante de l’exemple du curriculum. Aucune référence ne prouve que l’exemple a été exécuté. Vérifie la version cible et teste dans ton environnement avant un usage réel.

- [Git : git bisect](https://git-scm.com/docs/git-bisect)
- [Node.js : Debugging](https://nodejs.org/en/learn/getting-started/debugging)
