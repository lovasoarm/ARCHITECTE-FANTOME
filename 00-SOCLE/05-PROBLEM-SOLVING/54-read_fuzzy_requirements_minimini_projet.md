---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [changement_contexte, fausse_piste]
anti_recipe_key: changement_contexte+fausse_piste
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : Transformer "ça marche pas" en problème précis

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## Support de l’exercice

Utilise le [portfolio fictif de Noa](EXERCICE-PORTFOLIO-FICTIF.md). Le cas est indépendant de ton projet personnel ; travaille dans un fichier local, sur papier ou dans `scratch/problem-solving/`. Aucun dépôt Git ni site réel n’est requis.

## TYPE

Micro-drill

## Niveau

[OK] Intermédiaire

## CONTEXTE

Les demandes fictives de Noa contiennent des expressions floues. Les repérer tôt évite de construire une fonction qui ne répond pas au besoin.

## APPLICATION

- Relis les demandes de Noa dans le cas d’exercice et repère trois expressions qui peuvent être comprises de plusieurs façons : « trouver un projet », « claire sur petit écran » et « moderne ».
- Pour chacune, écris une question de clarification puis un critère observable. Exemple : « trouver un projet » peut devenir « le visiteur peut repérer un projet par son nom sans ouvrir chaque fiche ».
- Note tes questions et critères dans `05-criteres.md` sous ton dossier local de preuves. Tu proposes des critères ; tu ne prétends pas qu’ils ont été validés par de vrais utilisateurs.

## Critère de réussite

- [ ] Trois formulations ambiguës du cas de Noa sont identifiées.
- [ ] Chaque formulation possède une question de clarification et un critère observable.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quelle observation permettrait de vérifier que les visiteurs trouvent bien un projet sans devoir parcourir toutes les fiches ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : les demandes floues du cas fictif sont devenues plus précises et vérifiables.

Tu as maintenant une définition de « terminé » pour le portfolio fictif. Conserve `05-criteres.md` dans ton dossier local de preuves. Aucun commit Git n'est demandé.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.

## Pont Kintana différé : rendre une exigence vérifiable

**Statut : différé et non bloquant pour le Socle.** Après le Cadrage, tu pourras transformer « une demande ne doit pas être créée deux fois » en scénarios d'acceptation et en tests. Pour le challenge actuel, transforme les demandes vagues du portfolio fictif de Noa en critères observables. Ne prétends pas avoir validé un système Kintana.
