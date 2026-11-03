---
stability: intemporel
last_reviewed: 2026-10-31
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [transmission, temps_limite]
anti_recipe_key: transmission+temps_limite
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# 05 : Race Condition Hunter

<!-- AF-DIAGRAM:race -->

```text
Temps ───────────────────────────────────►

Opération A ── lit 0 ── await ── écrit 1
Opération B ── lit 0 ── await ── écrit 1
                         ▲
                         └─ la seconde écriture écrase la première
```

Une race condition existe lorsque plusieurs opérations peuvent accéder à un état partagé et que leur ordre d'exécution peut violer un invariant. Elle peut apparaître dans des threads, entre tâches asynchrones autour d'un point de suspension, ou dans plusieurs processus/services. Il faut préciser le périmètre partagé.

Temps de lecture ~5 min

## Reproduction autonome (JavaScript, un seul agent)

```js
async function reproduirePerteDeDegats() {
  const horror = { damage: 0 };

  async function hit(target, damage) {
    const damageLu = target.damage;
    await Promise.resolve(); // les deux opérations peuvent lire avant d'écrire
    target.damage = damageLu + damage;
  }

  await Promise.all([hit(horror, 10), hit(horror, 10)]);
  console.log(horror.damage); // 10 ; l'invariant métier attendait 20
}

reproduirePerteDeDegats();
```

La reproduction est déterministe : les deux appels lisent `0`, suspendent leur continuation, puis chacun écrit `10`. Les instructions synchrones ne sont pas interrompues au milieu ; l'entrelacement se produit au point `await`. Ce scénario ne simule pas deux threads CPU exécutant simultanément une même instruction.

## Protocole d'investigation

1. Énonce l'invariant : deux coups validés de 10 doivent produire 20 dégâts.
2. Repère la section critique : lecture de l'état, calcul, écriture.
3. Construis une reproduction contrôlée ; conserve les entrées, l'ordre imposé et le résultat réellement observé.
4. Choisis une coordination adaptée au périmètre :
   - même processus : file séquentielle ou mutex local ;
   - plusieurs processus sur une base commune : `UPDATE ... SET damage = damage + $1 WHERE id = $2 RETURNING damage`, transaction ou verrou/version optimiste ;
   - services distincts : invariant et déduplication persistés dans un composant partagé, avec contrat explicite.
5. Écris un ADR : hypothèses, choix, alternatives, coût de contention, mode de panne et preuve disponible.

Un mutex mémoire dans une instance ne protège pas les autres instances. Pour une base de données, utilise un mécanisme atomique / transactionnel dans la base, et vérifie la contrainte ou le niveau d'isolation réellement nécessaire.

## Mesure et instrumentation

- Ajoute un identifiant de corrélation par opération ; masque les données sensibles.
- `performance.now()` est une horloge monotone utile pour mesurer une durée dans un même contexte ; ne compare pas ses valeurs entre machines.
- `Date.now()` est une horloge civile susceptible d'être ajustée ; évite-la pour mesurer de très courtes durées.
- Les logs et traces peuvent perturber le timing selon le runtime et le transport ; un buffer peut réduire la perturbation, sans la supprimer universellement.
- Ne déduis pas un taux « 1/100 » sans protocole, environnement et résultats mesurés. Zéro échec sur N essais ne prouve pas l'absence universelle de course.

## Livrable

- `HYPOTHESES.md` + reproduction autonome ou éléments d'incident si elle n'est pas possible.
- Correctif et test qui détecte le défaut initial.
- ADR (1 page) : portée de la garantie et limite restante.

## (attention) Piège

Un `console.log` peut modifier l'ordonnancement observé, mais ne le fait pas systématiquement de façon identique dans tous les environnements. Ne te contente pas de supprimer les logs : corrige l'invariant.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.

### Transfert : changer de contexte

Applique le mécanisme de « 05 : Race Condition Hunter » à une autre ressource partagée (places disponibles, stock, compteur de paiement ou réservation). Explique quel invariant doit rester vrai, où se situe la coordination et quelle preuve permet de confirmer que tu n'as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l'artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: errors -->

## Repères de décision

- **Pourquoi :** Une mise à jour perdue peut violer un invariant métier même si chaque instruction prise isolément semble correcte. Nommer l'invariant et la frontière de partage évite de corriger le mauvais niveau.
- **Quand l’utiliser / quand l’éviter :** Utilise une file séquentielle ou un mutex pour un état détenu par un seul processus ; une transaction, une contrainte ou une mise à jour conditionnelle atomique pour un état partagé entre instances. Ne choisis pas un mutex local pour protéger une base commune à plusieurs processus.
- **Limites :** Une reproduction déterministe démontre le défaut du scénario construit, pas l'occurrence ni la fréquence du même défaut en production. Un test sans échec ne prouve pas l'absence de toute course.

## Mécanisme : la version sans magie

Décris l'invariant, repère la lecture-modification-écriture, établis le périmètre de l'état partagé, puis place la coordination au même niveau que cet état. Vérifie le correctif avec le même scénario et les hypothèses annoncées.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Race Condition Hunter** se rattache à ce cas concret : deux demandes de réservation peuvent viser le même dernier créneau. Le système doit empêcher que deux confirmations consomment une seule capacité disponible.

**À observer :** invariant de capacité, état lu, décision d'acceptation, écriture persistée, identifiant de requête et résultat de concurrence. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : protéger le dernier créneau

> **Arc Walking Dead :** deux survivants ne peuvent pas recevoir le même dernier lit. Le fait que deux demandes aient chacune vu une place libre ne prouve pas qu'il en restait deux.

**Mission liée à « Race Condition Hunter » :** construis deux demandes concurrentes pour une capacité de un. Définis l'invariant, reproduis la mise à jour perdue, puis choisis une coordination qui protège l'état autoritaire. Explique pourquoi un verrou mémoire local ne suffit pas avec plusieurs instances.

**Livrable :** une reproduction contrôlée, une proposition de correction transactionnelle ou atomique, un test de régression et un ADR court qui précise la frontière de garantie.

**Critères d’acceptation :** une seule demande au maximum est acceptée pour une capacité de un ; le scénario initial échoue avant le correctif ; le correctif protège l'état partagé au bon niveau ; les hypothèses et limites sont explicites.

**Transfert obligatoire :** remplace le dernier créneau par un stock, un quota ou un compteur de paiement. Identifie l'invariant, le périmètre de partage et la garantie requise sans recopier simplement la solution du cas initial.
