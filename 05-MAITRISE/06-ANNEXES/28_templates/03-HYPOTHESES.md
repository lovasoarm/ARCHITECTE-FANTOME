---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [defaut_cache, preuve_partielle]
anti_recipe_key: defaut_cache+preuve_partielle
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# HYPOTHESES_TEMPLATE.md

Temps de lecture ~2 min

Modèle obligatoire pour tout exercice de debugging. Aucune correction sans hypothèse écrite, testée, réfutée ou confirmée.

## 1. Hypothèses envisagées

Liste toutes les causes possibles au moment T. Ordonne de la plus probable à la moins probable.

- Hypothèse A : ...
- Hypothèse B : ...
- Hypothèse C : ...

## 2. Preuves d'écartement

Pour chaque hypothèse écartée, note l'observation ou le test qui la disqualifie.

- Hypothèse A écartée car : ...
- Hypothèse B écartée car : ...

## 3. Hypothèse retenue

Une seule. Formulée en une phrase falsifiable.

- Hypothèse retenue : ...

## 4. Preuve de confirmation

L'expérience minimale qui prouve que l'hypothèse est vraie. Résultat attendu vs observé.

- Expérience : ...
- Résultat attendu : ...
- Résultat observé : ...
- Verdict : confirmée / infirmée (si infirmée, retour étape 1).

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

### Exemple travaillé : cas métier

**Exemple résolu (fictif).** Hypothèse : « Ajouter un index sur `created_at` réduira le temps de la requête de liste. » Prédiction : sur un jeu de données et un filtre définis, le plan doit utiliser l'index et le p95 doit diminuer sans dégrader fortement l'écriture. Test : mesurer avant/après avec la même charge et conserver le plan. Décision : garder l'index seulement si le gain est reproductible et si le coût d'écriture reste acceptable. Une seule mesure isolée ne suffit pas.

**À toi :** Tu rejoins une organisation qui possède plusieurs services, une documentation incomplète et un incident ouvert ; il faut comprendre avant de proposer. Construis un cas minimal qui illustre « HYPOTHESES_TEMPLATE.md » avec des données concrètes. Décris l’état initial, une seule opération, l’état final attendu et la raison pour laquelle ce résultat est correct.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:reference -->

## Repère visuel utile : Référentiel de compétences par preuves

```text
compétence -> tâche observable -> artefact
     ^                         |
     |                         v
révision datée <- verdict <- critère explicite
     |
     +-> remédiation ou nouvelle preuve
```

<!-- AF-LESSON-PROFILE: reference -->

## Repères de décision

- **Pourquoi :** Un référentiel sert à rendre les compétences observables et à éviter de confondre familiarité, autonomie et maîtrise.
- **Quand l’utiliser / quand l’éviter :** Utilise-le pour établir un point de départ, prioriser une révision ou préparer une revue de portfolio. Ne l'utilise pas comme classement de valeur personnelle.
- **Limites :** Une auto-évaluation est biaisée. Le niveau doit être confirmé par une tâche inconnue, un artefact reproductible et, aux paliers avancés, une revue externe.

## Mécanisme : la version sans magie

Associe une compétence à une tâche, un critère, une preuve, une date et un statut. Réévalue quand le contexte ou la technologie change.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **HYPOTHESES_TEMPLATE.md** se rattache à ce cas concret : Pour Kintana, une compétence comme l'idempotence n'est acquise que si tu sais l'expliquer, l'implémenter et vérifier le rejeu et les conflits.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Référentiel de compétences par preuves

> **Arc DBZ / Capsule Corp. :** Bulma ne dit pas « je suis forte » parce qu'elle a lu le manuel. Elle vérifie ce que l'outil permet réellement.

**Mission liée à « HYPOTHESES_TEMPLATE.md » :** Établis ton état initial sur une tranche Kintana : sélectionne trois compétences, réalise une tâche de chacune sans suivre un corrigé, garde les tests et note ce que tu n'as pas pu démontrer.

**Livrable :** un registre de compétences avec preuves liées, statut honnête, date de révision et prochain test de transfert.

**Critères d’acceptation :** chaque statut pointe vers un artefact ; une compétence non testée reste `NON ÉVALUÉE` ; aucune preuve déclarative ne vaut une exécution ; les lacunes ont une action de remédiation.

**Transfert obligatoire :** Reprends une compétence dans un langage ou un composant différent et vérifie si le principe se transfère réellement.
