---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [constraints_injectees, preuve_partielle]
anti_recipe_key: constraints_injectees+preuve_partielle
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# GIT SURVIVAL : placé dans le noyau, pas dans l'annexe

Temps de lecture ~5 min

> (attention) Ce fichier vit toujours dans `../../05-MAITRISE/06-ANNEXES/29_toolchain/02-git_survival.md`, mais il
> est promu **noyau** : tu ne peux pas finir `00-SOCLE/04-FUNDAMENTALS` sans savoir faire ces
> 6 gestes. Un pair review, un legacy, un onboarding sans git = tu es un touriste.

## LES 6 GESTES OBLIGATOIRES

1. `git status` / `git log --oneline -n 20` : savoir où tu es.
2. `git checkout -b <branche>` / `git switch -c <branche>` : travailler sans détruire.
3. `git rebase -i HEAD~N` : nettoyer avant PR.
4. `git bisect start` / `bad` / `good` : trouver le commit qui a introduit un bug.
5. Résoudre un conflit à 3 fichiers sans paniquer (`git mergetool` optionnel).
6. `git reflog` : récupérer une branche "perdue" après un mauvais reset.

## VALIDATION

Va dans `../../05-MAITRISE/06-ANNEXES/29_toolchain/02-git_survival.md` faire l'atelier complet. Sans les
6 gestes acquis, tu ne passes pas à `00-SOCLE/05-PROBLEM-SOLVING`. Ce n'est pas un souhait,
c'est un prérequis d'employabilité.

## POURQUOI C'EST PROMU NOYAU

Jour 1 en boîte : tu ouvres une PR, tu résous un conflit, tu bisect un bug. Aucun
de ces gestes ne s'apprend en 5 min sous pression. On les apprend à froid, ici.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?
