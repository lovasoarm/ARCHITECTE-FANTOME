---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [decision_inversee, fausse_piste]
anti_recipe_key: decision_inversee+fausse_piste
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# \_recall_05.md : modules `00-SOCLE/04-FUNDAMENTALS` a `01-CADRAGE/04-ERROR-HANDLING`

<!-- AF-DIAGRAM:recall -->

```text
J+1 ──► J+3 ──► J+7 ──► J+14 ──► J+28
 │        │        │         │         │
free    explain  diagnose   transfer  defend inverse
```

Le rappel distribué réactive la compétence sous des formes différentes au fil du temps.

Temps de lecture ~5 min

> Rappel espacé. Réponds **sans revoir les fichiers**. Note ton score.
> Refais ce fichier **une semaine plus tard**. C'est là que la mémoire tient.

Périmètre : fundamentals, problem solving, async, error handling, debugging.

## 10 questions

1. `let`, `const`, `var` : donne la vraie différence (scope + hoisting + TDZ) en 3 phrases.
2. `==` vs `===` : cite un cas concret où `==` te trompe silencieusement.
3. Décompose un problème "flou" en 4 étapes de problem-solving (avant d'écrire une ligne).
4. Dessine l'ordre : `sync` → `Promise.resolve().then` → `setTimeout(0)`.
5. `async/await` c'est du sucre sur quoi ? Que se passe-t-il si tu oublies un `await` ?
6. Différence entre une erreur _attendue_ (validation) et une erreur _inattendue_ (bug) : traitement ?
7. Un bug non déterministe apparaît en prod : quelle est **la première** action ?
8. Lis une stack trace : par où tu commences, du haut ou du bas, pourquoi ?
9. Cite 2 signaux qu'un `try/catch` masque un bug au lieu de le traiter.
10. Reproduction déterministe : donne les 3 conditions minimales pour qu'un bug soit "repro".

## Scoring

- 8+/10 → tu peux avancer.
- 5-7 → relis les modules faibles avant de continuer.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.

### Pratique autonome : production attendue

À partir de « \_recall_05.md : modules `00-SOCLE/04-FUNDAMENTALS` a `01-CADRAGE/04-ERROR-HANDLING` », produis une variante indépendante du cas suivant : Tu rejoins une organisation qui possède plusieurs services, une documentation incomplète et un incident ouvert ; il faut comprendre avant de proposer. Travaille sans recopier la solution de la leçon ; conserve l’entrée, les hypothèses, la sortie attendue et un artefact vérifiable (code, requête, schéma, trace ou décision).

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: learning -->

## Repères de décision

- **Pourquoi :** Un parcours long ne produit pas de maîtrise par simple lecture. Il faut transformer chaque notion en rappel, application, correction et preuve conservée.
- **Quand l’utiliser / quand l’éviter :** Utilise cette méthode pour planifier, réviser ou sortir d'un plateau. Évite de transformer le suivi en usine à cases cochées : le signal est la capacité à résoudre un problème nouveau.
- **Limites :** Le journal et le calendrier ne prouvent pas la compétence. Seule une tâche refaite sans copier, puis transférée à un autre contexte, apporte une preuve utile.

## Mécanisme : la version sans magie

Prédis, rappelle sans support, pratique, compare à un critère, corrige, puis reviens après un délai et transfère vers un cas différent.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **\_recall_05.md : modules `00-SOCLE/04-FUNDAMENTALS` a `01-CADRAGE/04-ERROR-HANDLING`** se rattache à ce cas concret : Le cas d’étude Kintana donne un contexte stable ; tu peux vérifier si une notion apprise sur le client réapparaît correctement dans l'API, les données ou l'exploitation.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Rappel actif et transfert

> **Arc Équipe 7 / Naruto :** le scroll ne te rend pas meilleur. Ce qui compte, c'est ce que tu peux rappeler, expliquer et réutiliser sans regarder la solution.

**Mission liée à « \_recall_05.md : modules `00-SOCLE/04-FUNDAMENTALS` a `01-CADRAGE/04-ERROR-HANDLING` » :** Choisis une capacité Kintana déjà étudiée. Sans rouvrir la leçon, reconstruis le mécanisme, applique-le à une évolution imprévue, puis compare ton résultat aux critères de la leçon et consigne l'écart.

**Livrable :** une fiche de rappel à froid, un commit ou artefact produit, les tests exécutés et une note de correction datée.

**Critères d’acceptation :** la tentative initiale est conservée ; l'écart est expliqué ; le transfert change au moins une contrainte ; le niveau de preuve est étiqueté LAB, PILOT ou PRODUCTION sans confusion.

**Transfert obligatoire :** Refais la tâche une semaine plus tard sans relire la fiche. Si tu ne peux pas expliquer les limites, classe la compétence en cours plutôt que maîtrisée.
