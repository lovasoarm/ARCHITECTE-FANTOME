---
stability: intemporel
acte: comprendre
cognitive_level: L2
perturbation_modes: [consigne_simple, navigation]
anti_recipe_key: consigne_simple+navigation
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE : retrouver son chemin :** tu arrives dans un atelier avec plusieurs pièces. Avant de chercher un outil, tu dois savoir dans quelle pièce tu te trouves et ce qu'elle contient.

# Shell Survival : se repérer sans se perdre

Temps de lecture indicatif : 4 à 5 min.

Ton premier objectif n'est pas de mémoriser un catalogue de commandes. C'est de savoir **où tu te trouves, ce qu'il y a dans le dossier et comment entrer dans un autre dossier**. Ces gestes suffisent pour préparer le premier exercice JavaScript.

## Terminal et shell : deux choses différentes

- Le **terminal** est l'application dans laquelle tu écris des commandes (par exemple Windows Terminal ou Terminal sur macOS).
- Le **shell** est le programme qui lit et interprète ces commandes (par exemple PowerShell, Bash ou zsh).

Windows Terminal peut ouvrir PowerShell. L'application Terminal de macOS ouvre généralement zsh. Bash et zsh sont des shells ; ce ne sont pas des applications de terminal.

## Les commandes du premier passage

Choisis la colonne correspondant au shell déjà ouvert. Les deux colonnes font les mêmes opérations ; ne mélange pas leurs syntaxes.

| Action                          | Bash / zsh        | PowerShell                                 |
| ------------------------------- | ----------------- | ------------------------------------------ |
| Voir le dossier courant         | `pwd`             | `Get-Location`                             |
| Lister les fichiers et dossiers | `ls`              | `Get-ChildItem`                            |
| Entrer dans un dossier          | `cd dossier`      | `Set-Location dossier`                     |
| Revenir au dossier parent       | `cd ..`           | `Set-Location ..`                          |
| Créer un dossier                | `mkdir essai`     | `New-Item -ItemType Directory -Name essai` |
| Afficher le texte d'un fichier  | `cat fichier.txt` | `Get-Content fichier.txt`                  |

## Pratique sûre en deux minutes

1. Affiche le dossier courant avec `pwd` ou `Get-Location`.
2. Liste son contenu avec `ls` ou `Get-ChildItem`.
3. Crée un dossier nommé `essai` avec la commande de ta colonne.
4. Entre dans ce dossier, puis reviens au dossier parent.

Tu peux répéter ces étapes sans toucher aux fichiers du curriculum. Si le dossier `essai` existe déjà, choisis un autre nom.

## À retenir avant d'aller plus loin

- Une commande s'exécute dans le dossier courant, sauf indication contraire.
- Les chemins et les options ne s'écrivent pas toujours de la même façon dans Bash/zsh et PowerShell.
- **Aucune commande de suppression n'est nécessaire pour ce premier passage.** N'expérimente pas avec une suppression récursive ou un chemin que tu n'as pas vérifié.
- La recherche récursive, les pipes, les redirections, la copie et le déplacement seront repris dans les activités où ils sont réellement utiles.

## Approfondissement différé : recherche dans les fichiers

Après avoir appris les commandes de base et ouvert le `SETUP.md` de l'activité concernée, tu pourras utiliser `grep` sous Bash/zsh ou `Select-String` sous PowerShell pour chercher un texte dans des fichiers. Ne commence pas par une commande récursive complexe : vérifie d'abord le dossier dans lequel tu te trouves.

## Sortie de cette étape

Tu peux poursuivre lorsque tu sais afficher ton dossier courant, lister son contenu, entrer dans un dossier et revenir au parent. Tu n'as pas à connaître Git, npm, les pipes ou les commandes de suppression pour faire le premier exercice JavaScript.

<!-- AF-DIAGRAM:setup -->

## Repère visuel : retrouver son chemin

```text
Ouvrir une application de terminal
              |
              v
       Le shell est prêt
              |
              v
       Voir le dossier courant
              |
              v
          Lister le contenu
              |
              v
        Entrer / revenir
```

<!-- AF-LESSON-PROFILE: setup -->

## Repères de décision

- **Pourquoi :** connaître le dossier courant évite de créer ou de lancer un fichier au mauvais endroit.
- **Quand l'utiliser / quand l'éviter :** utilise ces commandes pour naviguer et vérifier où tu travailles. Apprends les commandes plus avancées au moment où une activité les demande.
- **Limites :** les exemples de Bash/zsh ne sont pas des commandes PowerShell. Une commande de navigation ne prouve pas qu'un projet fonctionne.

## Mécanisme : la version sans magie

Le terminal transmet ce que tu écris au shell. Le shell interprète la commande et agit dans le contexte du dossier courant. La sortie ou le message d'erreur apparaît dans le terminal.

## Ancrage produit / terrain : Kintana

Kintana est un cas d'étude pédagogique commun, pas un projet à cloner pour apprendre les commandes de base. Le travail de configuration d'un dépôt, des dépendances et de l'environnement est différé jusqu'à l'activité qui en a besoin.

**À observer :** la commande choisie, le dossier courant avant/après et le résultat réellement affiché. Ne présente pas une commande lue comme une commande exécutée.

## Mission utile : Kintana : préparer une reprise d'environnement (différée)

Cette mission ne fait pas partie du premier passage et ne bloque pas Day One. Elle devient pertinente lorsque la Route 58 conduit à reprendre un projet qui possède son propre `SETUP.md`.

**Mission liée à Shell Survival :** ouvre alors le `SETUP.md` de Kintana, identifie les commandes de navigation utilisées et distingue celles qui relèvent du shell de celles qui installent ou démarrent le projet. Ne clone pas et n'installe rien pour valider la présente leçon.

**Livrable différé :** une courte note qui nomme l'application terminal, le shell utilisé, le dossier courant et les commandes réellement exécutées.

**Critères d'acceptation :** la note distingue correctement terminal et shell ; les commandes sont copiées depuis la documentation du projet ; aucune commande non exécutée n'est présentée comme une preuve.

## Transfert : changer de shell sans mélanger les syntaxes

Observe la même opération dans les deux colonnes du tableau. Explique ce qui reste identique (l'action recherchée) et ce qui change (la commande et sa syntaxe). Tu n'as pas besoin d'installer un deuxième shell pour réaliser cette comparaison.

> **Règle de progression :** savoir se repérer suffit pour continuer. Les commandes avancées sont apprises lorsqu'un exercice les demande, avec leur contexte et leurs risques.
