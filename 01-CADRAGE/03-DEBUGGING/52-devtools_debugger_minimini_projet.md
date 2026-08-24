---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [transmission, preuve_partielle]
anti_recipe_key: transmission+preuve_partielle
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : mur de siège :** le bug n'est pas “où ça a explosé ?”, mais “où la première fissure est-elle apparue ?”. Ici, chaque log, test et reproduction est une empreinte dans le mur.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Les breakpoints battent les `console.log` : on inspecte l'état réel, on avance pas à pas. Les React DevTools montrent en plus props et state.

## OBJECTIF

Tu inspectes ton état en direct.

## APPLICATION

- Pose un breakpoint dans ton filtre de rangée via les DevTools.
- Inspecte le tableau reçu et la valeur du filtre au moment de l'appel.
- Avec React DevTools, vérifie les props réellement reçues par une `ProjectCard`.

## Critère de réussite

- [ ] Pose un breakpoint dans ton filtre de rangée via les DevTools.
- [ ] Inspecte le tableau reçu et la valeur du filtre au moment de l'appel.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Qu'as-tu vu au breakpoint que trois `console.log` ne t'auraient pas montré ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tu inspectes ton état en direct.

Ton outillage de debug est en place pour tout le reste du projet.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?
