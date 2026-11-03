---
stability: stable
last_reviewed: 2026-10-31
acte: comprendre
cognitive_level: L2
perturbation_modes: [outil_inconnu, faux_prerequis]
anti_recipe_key: outil_inconnu+faux_prerequis
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS —** tu apprends d'abord à sauvegarder ton travail proprement. Les manœuvres avancées viennent quand tu sais déjà lire un historique et travailler sur une branche.

# Git Core : apprendre au moment utile

Temps de lecture indicatif : 4 à 6 min.

## Statut dans la route

**Cette page est une ressource complémentaire, pas une gate de Fundamentals.** Tu peux terminer Fundamentals et commencer Problem Solving sans connaître Git. Le premier exercice JavaScript se fait dans un dossier local ordinaire.

Ouvre Git lorsque la route ou un projet demande de versionner, cloner, comparer ou partager du code :

1. Commence par [Git 101](../01-GETTING-STARTED/05-git_101.md), qui présente le vocabulaire et les premières commandes.
2. Réalise ensuite le [drill Git local](50-git_core_minimini_projet.md) dans un dossier d'essai, sans GitHub ni projet personnel.
3. Reviens à l'atelier avancé [Git Survival](../../05-MAITRISE/06-ANNEXES/29_toolchain/02-git_survival.md) après avoir compris les commits, les branches et les fusions, et lorsqu'une activité le demande.

## Ce qu'il faut savoir au premier besoin Git

- `git status` : voir l'état du dossier suivi par Git.
- `git init` : créer un dépôt local dans le dossier choisi.
- `git add` : préparer les fichiers à inclure dans le prochain commit.
- `git commit` : enregistrer un snapshot dans l'historique local.
- `git log --oneline` : lire les commits précédents.
- `git diff` : examiner les changements non préparés.

Un dépôt Git local suffit pour ces premières opérations. Un compte GitHub, un dépôt distant, une branche complexe ou un déploiement ne sont pas nécessaires pour les apprendre.

## Ce qui vient plus tard

`rebase -i`, `bisect`, la résolution de conflits complexes et `reflog` sont des outils utiles, mais **pas des prérequis de débutant**. Ces gestes avancés sont différés : ils s'apprennent après le cycle de base et les premières branches. Aucun de ces gestes ne conditionne la validation de Fundamentals ou l'accès à Problem Solving.

## Pourquoi / quand / limites

- **Pourquoi :** Git garde une trace locale des changements et permet de revenir à un état connu ; en équipe, il rend la collaboration vérifiable.
- **Quand :** apprends les commandes de base juste avant la première activité qui demande Git, puis approfondis selon les problèmes rencontrés.
- **Limites :** un commit local n'est ni une sauvegarde externe ni une revue de code. N'ajoute jamais de secret dans un dépôt ; un `.gitignore` ne retire pas un secret déjà suivi.

## Mécanisme : la version sans magie

Git compare le dossier de travail, la zone de préparation (_staging_) et le dernier commit. `add` choisit ce qui entrera dans le prochain snapshot ; `commit` l'enregistre dans l'historique local.

## Ancrage produit / terrain : Kintana

Kintana est un cas d'étude pédagogique, pas un dépôt à cloner pour apprendre les premières commandes. Les intégrations Git avec Kintana arrivent lorsque la route dispose des prérequis et que le dépôt de travail est réellement fourni.

**À observer :** le résultat de `status`, le contenu préparé, le message de commit et l'historique obtenu. Une commande lue n'est pas une commande exécutée.

## Mission utile : première trace locale

Réalise le [drill Git local](50-git_core_minimini_projet.md). Arrête-toi après un commit et une fusion locale vérifiés. Ne pousse rien vers Internet.

**Preuve :** les commandes réellement lancées, leurs sorties utiles et une phrase expliquant ce que Git a enregistré.

> **Règle de progression :** cette activité prépare à la première tâche Git ; elle n'est pas une condition de sortie de Fundamentals.

## Transfert : changer de contexte

Reprends le même cycle dans un second dossier d'essai : prédis quels fichiers seront préparés, vérifie `git status`, puis explique ce qui est resté local et ce qui aurait été nécessaire pour partager le dépôt. Ne configure pas de remote pour ce transfert.

<!-- AF-DIAGRAM:setup -->

```text
premier fichier JavaScript
        |
        v
exercices locaux sans Git
        |
        v
première activité qui demande Git
        |
        v
Git 101 + dépôt d'essai local
        |
        v
branches et diagnostic avancés, au besoin
```

<!-- AF-LESSON-PROFILE: setup -->
