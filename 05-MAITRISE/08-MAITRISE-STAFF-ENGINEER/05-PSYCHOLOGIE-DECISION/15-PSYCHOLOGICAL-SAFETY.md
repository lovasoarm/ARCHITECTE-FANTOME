---
stability: intemporel
acte: maitrise
noyau: oui
cognitive_level: L9
perturbation_modes: [decision_inversee, fausse_piste]
anti_recipe_key: decision_inversee+fausse_piste
transfer_distance: high
assessment_role: staff_mastery
---

> **SCÈNE CRAZYDEVS : conseil de Konoha :** cinq ingénieurs, cinq idées, une personne qui ne parle plus depuis dix minutes. Ton rôle n'est pas seulement de gagner l'argument : c'est de récupérer l'information que le silence est en train de faire disparaître.

# PSYCHOLOGICAL-SAFETY : préserver le signal quand le pouvoir n'est pas symétrique

Le but n'est pas de « gérer les émotions » des autres. Le but est de vérifier qu'une information utile peut remonter même lorsqu'elle vient d'une personne moins visible ou moins puissante.

## Scénario

Un junior signale un risque. La salle veut aller vite. Personne ne demande d'exemple.

Le bon réflexe n'est pas forcément de mieux argumenter. Tu peux modifier la structure :

1. reformuler le signal sans l'attribuer à l'autorité du senior ;
2. demander quelle observation réfuterait le risque ;
3. créer un espace court pour les objections ;
4. rendre la réponse traçable dans l'ADR ;
5. vérifier ensuite que le signal a réellement été traité.

## Preuve

Conserve :

- signal initial ;
- structure de conversation choisie ;
- décision ;
- ce qui aurait été perdu sans cette intervention ;
- mécanisme de répétition pour les décisions futures.

## Anti-jeu

Une déclaration « notre équipe est psychologiquement sûre » n'est pas une preuve. La preuve est une information utile qui a effectivement survécu à une asymétrie de pouvoir.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.

### Transfert : changer de contexte

Applique le mécanisme de « PSYCHOLOGICAL-SAFETY : préserver le signal quand le pouvoir n'est pas symétrique » à une décision qui touche plusieurs équipes pendant plusieurs trimestres. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:leadership -->

## Repère visuel utile : Préserver le signal dans une relation asymétrique

```text
signal faible exprimé
       |
       v
écoute sans sanction
       |
       v
faits examinés
       |
       v
réponse et responsabilité
       |
       v
retour au contributeur
```

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **PSYCHOLOGICAL-SAFETY : préserver le signal quand le pouvoir n'est pas symétrique** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Préserver le signal dans une discussion asymétrique

**Mission liée à « PSYCHOLOGICAL-SAFETY : préserver le signal quand le pouvoir n'est pas symétrique » :** Conçois une revue post-incident Kintana où un contributeur moins senior peut signaler un risque. Définis les règles de prise de parole, la capture des objections et la réponse aux désaccords.

**Livrable :** Protocole de revue, questions de facilitation et registre de décisions/actions.

**Critères d’acceptation :** Pas de recherche de coupable ; les objections sont tracées ; les informations personnelles restent hors du compte rendu.

**Transfert obligatoire :** Une objection est minoritaire mais plausible : indique comment la vérifier avant de la clore.
