---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [defaut_cache, changement_echelle]
anti_recipe_key: defaut_cache+changement_echelle
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mission Konoha :** trois clones partent en même temps, mais un seul doit avoir le dernier mot. Si tu ne distingues pas file d'attente, concurrence et ordre d'exécution, les clones vont te livrer leurs résultats dans un ordre qui te fera accuser le mauvais ninja.

# MOCK INTERVIEW : DEBUG ASYNC EN DIRECT (solo)

Temps de lecture ~3 min

Objectif : simuler seul un entretien technique où on te lâche un bug async et où on te regarde le résoudre à voix haute. En vrai, le recruteur juge ta MÉTHODE, pas la vitesse. Ce drill t'entraîne à penser fort, sous pression, sans IA.

## PROTOCOLE (25 min chrono)

1. Prépare un enregistreur (téléphone, OBS, n'importe quoi). Tu vas te filmer ou t'enregistrer en audio. Non négociable : sans enregistrement, tu ne verras pas tes tics.
2. Lance un chrono de 20 min.
3. Ouvre le bug ci-dessous. Lis-le à voix haute. Puis résous-le EN PARLANT : chaque hypothèse, chaque test, chaque doute, dit à voix haute comme si un CTO t'écoutait.
4. À 5 min de la fin, arrête-toi et récapitule ta solution en 3 phrases, comme un vrai débrief d'entretien.

## LE BUG À RÉSOUDRE

Un worker Node traite des jobs. Le code est censé traiter 100 jobs en parallèle borné à 5, puis logguer "TERMINÉ". En prod, il logue "TERMINÉ" avant que les jobs soient finis, et parfois un job silencieusement perdu.

```js
async function runAll(jobs) {
  const results = [];
  jobs.forEach(async (job) => {
    const r = await process(job);
    results.push(r);
  });
  console.log("TERMINÉ", results.length);
  return results;
}
```

Tu dois : (a) expliquer POURQUOI "TERMINÉ" s'affiche trop tôt, (b) pourquoi des résultats manquent, (c) proposer un fix avec concurrence bornée à 5.

## LES 5 RELANCES-PIÈGES (le recruteur te pousse)

Après ta première réponse, réponds à voix haute à chacune. Elles sont conçues pour te faire douter ou sur-corriger.

1. "Pourquoi `forEach` avec un callback async ne fait pas ce que tu crois ?" (piège : beaucoup répondent "il attend", c'est faux, `forEach` ignore la promesse retournée.)
2. "Si je remplace par `Promise.all(jobs.map(...))`, tu as fini ?" (piège : ça règle l'attente mais PAS la borne de concurrence à 5 ni un job qui throw.)
3. "Que se passe-t-il si UN job rejette ?" (piège : `Promise.all` rejette tout au premier échec ; veux-tu vraiment ça ? `allSettled` ?)
4. "Comment tu limites à 5 en parallèle SANS librairie ?" (piège : on veut te voir raisonner sur un pool/sémaphore, pas citer p-limit.)
5. "Prouve-moi que ton fix marche. Comment tu le testes ?" (piège : si tu n'as pas de test déterministe, ta correction est une croyance.)

## GRILLE D'AUTO-ÉVALUATION (note-toi honnêtement)

- [ ] J'ai reproduit/expliqué le bug AVANT de coder un fix. (2 pts)
- [ ] J'ai nommé la vraie cause : `forEach` ignore les promesses async. (2 pts)
- [ ] J'ai distingué "attendre" (Promise.all) de "borner" (pool). (2 pts)
- [ ] J'ai géré le cas d'un job qui rejette (allSettled ou try/catch par job). (2 pts)
- [ ] J'ai proposé un test déterministe (mock de `process`, compteur d'appels concurrents max). (2 pts)
- [ ] J'ai parlé clairement, sans "euh" toutes les 5 secondes, en verbalisant mes hypothèses. (bonus)

Score < 6/10 : rejoue le module `01-CADRAGE/02-ASYNC` puis recommence ce mock.

## (attention) CE QUE LE DRILL RÉVÈLE

Si tu as foncé coder sans parler, tu échoueras en entretien même avec le bon code. Le recruteur achète ta pensée visible, pas ton silence suivi d'une solution. Comme un capitaine qui organise sa défense à voix haute pendant le match : ce n'est pas qu'il parle pour parler, c'est qu'il aligne l'équipe en temps réel.

## APRÈS

Regarde ton enregistrement. Note : où tu as paniqué, où tu as menti (dit "je pense que" en étant sûr, ou l'inverse), où tu as sauté la reproduction. Refais le drill dans 3 jours avec un autre bug de ton cru.

<!-- AF-DIAGRAM:leadership -->

## Repère visuel utile : Raisonner sur une trace asynchrone

```text
trace d’événements
       |
       v
prédire l’ordre d’exécution
       |
       v
repérer attente et blocage
       |
       v
expliquer l’ordonnancement
       |
       v
tester un contre-exemple
```

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **MOCK INTERVIEW : DEBUG ASYNC EN DIRECT (solo)** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Diagnostiquer un scénario asynchrone à l’oral

**Mission liée à « MOCK INTERVIEW : DEBUG ASYNC EN DIRECT (solo) » :** À partir d’une trace asynchrone Kintana, formule des hypothèses ordonnées, prédis l’ordre des événements, propose une reproduction minimale et justifie la correction.

**Livrable :** Chronologie annotée, hypothèses falsifiables et réponse orale chronométrée.

**Critères d’acceptation :** Chaque hypothèse a un test discriminant ; l’ordre prédit est distingué de l’ordre observé ; les effets de bord sont mentionnés.

**Transfert obligatoire :** La trace change légèrement : explique quelle hypothèse tombe et laquelle reste valide.
