---
stability: stable
last_reviewed: 2026-10-31
acte: pratiquer
cognitive_level: L2
perturbation_modes: [premier_depot, changement_local]
anti_recipe_key: premier_depot+changement_local
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : Git Core : apprendre au moment utile

> **SCÈNE CRAZYDEVS —** avant de confier ton travail à une équipe, apprends à conserver quelques états propres dans un espace d'essai que tu contrôles.

## TYPE

Pratique locale guidée

## Niveau

**Première pratique Git.** Elle se fait après Git 101, seulement lorsqu'une activité de la route demande Git. Elle ne bloque ni le premier exercice JavaScript, ni la sortie de Fundamentals.

## Prérequis

- Savoir créer un dossier et un fichier texte.
- Avoir installé Git parce qu'une activité le demande.
- Avoir lu [Git 101](../01-GETTING-STARTED/05-git_101.md).

Aucun compte GitHub, dépôt distant, projet Next.js, compte Vercel ou projet personnel n'est requis.

## CONTEXTE

Tu vas créer un dépôt jetable dans `scratch/git-drill/`. Il sert uniquement à comprendre les premières étapes de Git. Ne lance pas `git init` à la racine d'AF ni dans un dossier qui contient déjà un dépôt important.

## OBJECTIF

Créer deux commits locaux, travailler sur une branche et fusionner cette branche sans perdre le travail.

## Mission utile : un historique local compréhensible

## APPLICATION

1. Crée `scratch/git-drill/` et ouvre un terminal dans ce dossier.
2. Lance `git init`, puis `git status`.
3. Déclare une identité **locale à ce dépôt d'essai** afin que le premier commit ne bloque pas si Git n'a pas encore été configuré :

   ```bash
   git config user.name "Apprenant AF"
   git config user.email "apprenant@example.invalid"
   ```

   Ces valeurs servent uniquement à l'historique de ce dossier jetable ; ne configure pas ton identité globale pour cet exercice.

4. Crée `notes.txt` avec une première ligne ; prépare uniquement ce fichier avec `git add notes.txt` et crée un commit avec un message qui décrit le changement.
5. Lis le nom de la branche initiale avec `git branch --show-current` et garde ce nom pour l'étape de fusion. Crée ensuite `feature/notes` avec `git switch -c feature/notes` (ou `git checkout -b feature/notes` si ta version Git ne connaît pas `switch`).
6. Ajoute une deuxième ligne, prépare le fichier et crée un deuxième commit.
7. Reviens sur le nom de branche initial noté à l'étape 5 avec `git switch <branche-initiale>`, puis fusionne `feature/notes` avec `git merge feature/notes`.
8. Termine par `git status` et `git log --oneline --graph --all`.

Si Git affiche un avertissement sur le nom initial de branche, lis-le ; ne change pas de configuration globale pour cet exercice. Utilise le nom réellement affiché par `git branch --show-current`.

## Ancrage terrain : dépôt local, pas livraison

Cette pratique se déroule dans un dossier d'essai sur ta machine. Elle ne simule pas une revue indépendante, une sauvegarde distante ou un déploiement. Tu peux expliquer le résultat sans publier le dépôt.

## Critères de réussite

- [ ] Le dépôt se trouve uniquement dans `scratch/git-drill/`.
- [ ] Deux commits locaux apparaissent dans l'historique.
- [ ] La branche `feature/notes` apparaît dans le graphe et sa fusion est visible.
- [ ] `git status` indique un dossier de travail propre après la fusion.
- [ ] Tu peux expliquer la différence entre dossier de travail, zone de préparation et commit.

## Vérification

Avant de lancer `git commit`, prédis quels fichiers seront enregistrés. Compare ta prédiction au résultat de `git status` et de `git show --stat --oneline HEAD`.

**Pourquoi :** le cycle `add` puis `commit` rend explicite ce qui entre dans l'historique, au lieu de traiter chaque modification comme une sauvegarde automatique.

**Quand :** réalise ce drill lorsque la première activité qui suit demande un dépôt Git ou une trace de changements ; il ne fait pas partie de la première séquence de code JavaScript.

**Limites :** le drill confirme seulement les opérations locales observées. Il ne prouve ni une collaboration réelle, ni une sauvegarde indépendante, ni la qualité d'une Pull Request.

## Mécanisme : du fichier au commit

Le dossier de travail contient les fichiers édités. `git add` place les changements sélectionnés dans la zone de préparation (_staging_). `git commit` enregistre cette sélection comme un snapshot local. Une branche est un nom mobile qui pointe vers un commit ; `merge` réunit les historiques des deux branches.

## Preuve à conserver

Note la version de Git, les commandes réellement exécutées, les deux messages de commit et la sortie finale de `git status`. N'inclus pas de captures qui exposent un chemin personnel ou des secrets.

## Limites et sécurité

- Cette pratique reste locale : aucun `push`, aucun compte distant, aucune publication.
- Ne mets jamais de mot de passe, token ou clé privée dans le dossier d'essai.
- Ne lance pas `git clean`, `git reset --hard` ou `git push --force` pour réussir cet exercice.
- Un dépôt local n'est pas une sauvegarde indépendante : il reste sur le même disque.

> **Statut :** pratique complémentaire à réaliser avant la première activité qui exige le cycle Git. Ce n'est pas une gate Fundamentals.

## Transfert : rejouer le même cycle

Crée un second dossier d'essai indépendant et répète le cycle avec deux fichiers différents. Avant chaque commit, annonce le fichier que tu t'attends à voir dans `git status`, puis compare cette prédiction à la sortie réelle.

## Pont Kintana différé : appliquer le cycle à un produit

> **Statut : différé et non bloquant.** Cette mission n'est pas un prérequis de Fundamentals et ne doit être commencée que lorsque le dépôt Kintana et ses consignes d'accès sont réellement fournis.

**Mission liée :** conserve une modification Kintana dans une branche séparée, écris un commit explicite et fais examiner le diff avant une éventuelle fusion. Ne publie aucun secret et n'invente pas une exécution du dépôt si celui-ci n'est pas disponible.

**Livrable :** une trace des commits, un diff et une courte note expliquant le changement.

**Gate de la livraison différée :** le diff contient uniquement le changement annoncé ; les fichiers sensibles ne sont pas suivis ; une autre personne peut retrouver l'historique. Cette gate appartient à la pratique produit différée, pas au parcours Fundamentals.

## Approfondissement différé : livraison produit Kintana : règle métier et état

> **Statut : différé, facultatif pour la première passe.** Cette mission n'est pas une pas gate de progression Fundamentals ; elle attend l'accès réel au dépôt Kintana et un brief produit.

**Mission liée :** quand le dépôt est fourni, propose une branche pour une modification Kintana, produis un commit lisible et demande une revue du diff. Ne pousse rien vers un dépôt distant sans autorisation.

**Gate :** le changement est limité au besoin annoncé, le diff est compréhensible et aucun secret n'est versionné. Cette gate appartient à l'activité produit différée, pas à Fundamentals.

## Approfondissement différé

> **Statut : différé.** Ces techniques ne conditionnent pas la première passe ni la progression Fundamentals.

Après avoir compris les commits, branches et fusions, tu pourras étudier les conflits, le rebase interactif, `bisect` et `reflog` dans [Git Survival](../../05-MAITRISE/06-ANNEXES/29_toolchain/02-git_survival.md). Ces gestes ne sont pas nécessaires ici.

> **Statut : différé et non bloquant pour la première passe.**

## CHECKPOINT DE PROFONDEUR : comprendre avant d'agir

Imagine que `git status` affiche un fichier modifié non préparé. Explique ce que `git commit` enregistrera si tu ne l'ajoutes pas, puis indique la commande qui te permet de vérifier la différence.

<!-- AF-DIAGRAM:setup -->

```text
dossier d'essai
    |
    v
init -> add -> commit
              |
              v
        branche locale
              |
              v
       second commit
              |
              v
          merge
              |
              v
       status propre
```

<!-- AF-LESSON-PROFILE: tooling -->
