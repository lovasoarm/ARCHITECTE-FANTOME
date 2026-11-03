---
stability: intemporel
cognitive_level: L3
perturbation_modes: [preuve_partielle, constraints_injectees]
anti_recipe_key: preuve_partielle+constraints_injectees
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : traqueur de jutsu :** Naruto voit l'explosion finale et accuse le dernier fichier touché. Mauvais réflexe. Ton enquête doit remonter le flux, figer les hypothèses et retrouver la première trace qui ne colle plus.

# 07 : Flaky bugs (les tests non déterministes)

Temps de lecture ~5 min

Un test est _flaky_ lorsqu'il peut réussir ou échouer sans changement intentionnel du code ou des données. C'est un symptôme à investiguer, pas une raison de relancer indéfiniment jusqu'à obtenir PASS. Les causes possibles incluent les courses, l'horloge, le réseau, l'isolation, les données partagées ou un test lui-même incorrect.

## Mission : repérer une mise à jour perdue

```js
async function reproduireMiseAJourPerdue() {
  let count = 0;

  async function bump() {
    const v = count; // lecture
    await Promise.resolve(); // point de suspension
    count = v + 1; // écriture depuis la valeur lue
  }

  await Promise.all(Array.from({ length: 1000 }, bump));
  console.log(count); // 1, pas 1000 : ce scénario est déterministe sur un agent JS
}

reproduireMiseAJourPerdue();
```

Ce laboratoire ne dépend pas d'un tirage aléatoire : les 1 000 fonctions lisent `0` avant que les continuations après `await` écrivent `1`. C'est une **mise à jour perdue déterministe**, pas un exemple de test flaky ni une preuve de concurrence entre instructions synchrones.

Tâches :

1. Explique l'ordre des lectures et des écritures, sans inventer de hasard.
2. Corrige avec une mise à jour séquentielle ou une file/mutex adapté au contexte.
3. Explique pourquoi `Atomics` ne protège pas un simple nombre JavaScript ordinaire : il s'applique aux vues typées sur mémoire partagée (`SharedArrayBuffer`) échangée entre Workers.
4. Pour un compteur partagé entre processus ou instances serveur, propose une mise à jour atomique ou une transaction côté stockage partagé.
5. Distingue une preuve de correction structurelle d'un test empirique répété.

## Contrôler le hasard dans un test

`Math.random()` ne possède pas d'API standard de seed. Pour rendre une branche déterministe, injecte une source aléatoire : `computeTotal([10, 20], () => 0)` force ici la branche rare et expose le bug pédagogique (`NaN`) ; `computeTotal([10, 20], () => 0.5)` suit la branche normale et retourne `30`. La branche rare est volontairement fautive : le test doit d'abord la révéler, puis tu corriges la règle métier (ici, un bonus absent doit être représenté par `0`, pas `undefined`). Voir [`11A-flaky.js`](./11A-flaky.js).

## Livrable

- `WRITE_UP.md` : hypothèse → ordre observé → invariant → correctif → limite.
- Un test qui échoue avec le comportement fautif et passe après correction.
- Une justification du choix de synchronisation selon le périmètre : fonction, processus, base partagée ou plusieurs services.

## Transférable

Le même raisonnement se retrouve dans Python (`asyncio`), Go (goroutines et race detector) et Rust (outils de test d'entrelacements). Les règles de mémoire et d'ordonnancement diffèrent selon le langage : ne transpose pas mécaniquement le modèle JavaScript.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?
