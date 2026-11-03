---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [transmission, decision_organisationnelle]
anti_recipe_key: transmission+decision_organisationnelle
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# 03 OBJECTION STORM : défense orale sous objection dynamique

Temps de lecture ~3 min

Temps ~35 min chrono + 15 min debrief

## POURQUOI CE DRILL EXISTE

`02-desaccord_cto.md` et `03-mock_interview_async.md` entraînent la défense écrite,
au calme, sans coupure. En vrai, l'objection coupe la parole, tourne, mute en attaque
personnelle. Ce drill simule ça.

## OBLIGATION : UN OBJECTION STORM PAR ADR DE MINI-PROJET

**Non negociable** : chaque ADR ecrit dans un mini-projet
(`02-CONSTRUCTION/02-MINI-PROJECTS/*/ADR/ADR-XXX_*.md`) declenche **un objection storm dedie**,
minute par minute, chronometre. Aucun ADR n'est considere comme "signe" tant que
son storm associe n'a pas produit un `REPONSES_ADR-XXX.md` complet et horodate.

- Chaque ADR effectivement produit dans les 19 mini-projets déclenche un objection storm dédié. Le nombre total de storms varie donc avec le nombre d’ADR réellement produits par l’apprenant ; il n’est pas fixé artificiellement à un nombre de storms prédéterminé.
- Le storm se joue seul si necessaire (voir `06-SIMULATION_SOLO.md`), mais
  toujours chronometre, toujours ecrit, jamais reporte.
- Un ADR sans storm associe est un ADR non defendu : il ne compte ni pour la
  progression du mini-projet, ni pour le portfolio (`14-portfolio_publication.md`).

Regle simple : **pas de storm, pas d'ADR valide, pas de projet livre.** L'oral
sous pression est la seule chose que ni le linter ni l'IA ne peuvent simuler
pour toi.

## PROTOCOLE : 5 SALVES × 5 OBJECTIONS

Chronomètre visible, non négociable.

- **60 s max par réponse** (au-delà, la réponse ne compte pas).
- **Écart max 90 s entre deux réponses** (au-delà, la salve est rompue).
- **Réponse minimum 40 mots** pour être valide.
- **Livrable : `REPONSES.md`** avec 25 blocs, chacun préfixé par un timestamp ISO 8601.
  Pour un storm lie a un ADR, nommer le fichier `REPONSES_ADR-XXX.md` et le
  placer a cote de l'ADR concerne.

### Escalade obligatoire (une salve = un ton)

1. **Salve 1 : Poli** : "j'entends, mais est-ce que…"
2. **Salve 2 : Dubitatif** : "tu es sûr ? Ça me paraît fragile."
3. **Salve 3 : Hostile** : "non, ça ne marche pas, tu bricoles."
4. **Salve 4 : Ad hominem technique** : "tu confonds X et Y, c'est un niveau junior."
5. **Salve 5 : Coupure** : "on n'a plus le temps, résume en 20 s ou passe."

Objectif : **ne pas escalader émotionnellement**. Rester factuel salve 5 = drill réussi.

## LIEN AVEC LES ADR (chantier #1)

Chaque ADR d'un projet doit produire **au minimum 2 objections dans son storm dedie**
(cible pratique : 5 objections par ADR pour saturer le format 25 blocs si tu regroupes
plusieurs ADR dans un même storm de projet).

## FORMAT `REPONSES.md`

```text
## Salve 1 / Objection 1
2026-07-09T14:03:22Z
[réponse >= 40 mots]

## Salve 1 / Objection 2
2026-07-09T14:04:11Z
[...]
```

## SCORING

Passage automatique via `node learner-verifier.js` (auto-verif ecrite par toi) :

- 25 timestamps valides ISO 8601 : requis.
- Écart max entre deux timestamps consécutifs : 90 s.
- Chaque réponse : >= 40 mots.
- Score = nombre de réponses valides sur 25.
- **Refus de release si score < 20/25.**
- **Refus de "ADR signe" si aucun `REPONSES_ADR-XXX.md` associe.**

## APRÈS

Debrief 15 min : quelle salve t'a fait décrocher, quelle objection était méritée,
laquelle relevait du théâtre. Note dans `REPONSES.md` un `## Debrief` final.

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.

### Vérification observable : critères de réussite

Prépare trois vérifications : cas nominal, cas limite et cas invalide. Écris avant l’exécution l’assertion attendue pour « 03 OBJECTION STORM : défense orale sous objection dynamique », puis conserve le résultat et explique tout écart.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:leadership -->

## Repère visuel utile : Répondre à une objection par la preuve

```text
proposition
     |
     v
objection la plus forte
     |
     v
preuve et hypothèses
     |
     v
compromis reconnu
     |
     v
réponse ou proposition révisée
```

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **03 OBJECTION STORM : défense orale sous objection dynamique** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Répondre à des objections sans défendre son ego

**Mission liée à « 03 OBJECTION STORM : défense orale sous objection dynamique » :** Prépare une proposition Kintana et liste les objections les plus fortes sur coût, sécurité, exploitation et réversibilité. Réponds avec des preuves ou modifie la proposition.

**Livrable :** Proposition initiale, registre d’objections et version révisée.

**Critères d’acceptation :** Les objections sont formulées loyalement ; les réponses distinguent preuve et hypothèse ; une objection peut faire changer la décision.

**Transfert obligatoire :** Une objection reste sans réponse : transforme-la en condition de blocage ou en action de vérification.
