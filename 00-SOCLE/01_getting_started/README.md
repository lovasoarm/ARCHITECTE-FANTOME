---
stability: intemporel
acte: restituer
route: survie
---

# Lis-moi avant de coder

> Mode de vérification des exercices de ce module : défense orale enregistrée contre grille ([../../05-MAITRISE/08_maitrise_staff_engineer/challenge.md](../../05-MAITRISE/08_maitrise_staff_engineer/challenge.md)).

Temps de lecture ~2 min


Ce dossier est un **module de mise en route**, pas une lecon de code.
Il n'a volontairement **pas de `00_why_getting_started.md`**.

Raisons :
- Tu n'es pas encore prêt à te demander "pourquoi ce module" : tu n'as même pas Node d'installé.
- La vraie question ici est mécanique : **installer, ouvrir un shell, lancer un fichier `.js`**.
- Le "pourquoi" arrive au module `00-SOCLE/04_fundamentals` : c'est là que ton cerveau prend le contrôle.

## Ordre de lecture

1. `01_install.md` : Node 20+, Git, éditeur.
2. `02_day_one.md` : contexte du métier, poste de travail, premières lignes de JS.
3. `02b_shell_survival.md` : 12 commandes pour survivre.
4. `03_git_101.md` : clone, add, commit, push, revert.
5. `04_package_managers.md` : npm vs pnpm vs bun, en 15 min.
6. `05_devsec_perso.md` : ne pas fuiter tes secrets dès le jour 1.

## Sortie du module

Tu dois être capable de :
- ouvrir un terminal, `cd`, `ls`, `node -v` retourne `v20.x` ou plus,
- créer un dépôt local, faire un commit, l'annuler,
- installer un paquet, le supprimer, comprendre `package.json`.

Ensuite, direction `00-SOCLE/04_fundamentals/`.

## Ce module reutilise

Rien (c'est le point d'entrée).

## Appel TECH-ILA 1 sur 6 : Niveau 1 Socle

Tu ouvres la carte **maintenant**, dans ce module, pas a la retrospective. Elle apporte ici
les noms d'outils que ta machine vient d'installer (runtime, gestionnaire de paquets, editeur, terminal, git) et ce qu'ils recouvrent dans une equipe reelle.

- Carte : [Niveau 1 Socle](../../06-ANNEXES-TRANSVERSES/03-TECH-ILA/tech-ila/01-niveau-1-socle.md)
- Pourquoi ici : ce module est le premier endroit du parcours ou ces noms d'outils changent une
  decision. Lue plus tard, la carte n'est plus qu'un catalogue.
- Ce que tu produis avec : la fiche d'orientation remplie : quel outil tu utilises, pour quoi, depuis quelle version.
- Regle : la carte est perissable, le module ne l'est pas. Si un nom d'outil a vieilli, on
  remplace la carte en annexes sans toucher a ce module.

<!-- CONTENU-DOSSIER:debut (genere par 99-COULISSES/outillage/generer_index_dossiers.mjs) -->

## Contenu du dossier

Liste generee : tout fichier de `00-SOCLE/01_getting_started` est joignable depuis ici, aucun document n'est laisse sans porte d'entree.

- [00_prereq_check.md](00_prereq_check.md)
- [00_why_getting_started.md](00_why_getting_started.md)
- [01_install.md](01_install.md)
- [02_day_one.md](02_day_one.md)
- [02b_shell_survival.md](02b_shell_survival.md)
- [03_git_101.md](03_git_101.md)
- [04_package_managers.md](04_package_managers.md)
- [05_devsec_perso.md](05_devsec_perso.md)
- [06_EXO_JEUNE_IA.md](06_EXO_JEUNE_IA.md)
- [PACKAGE_JSON_README.md](PACKAGE_JSON_README.md)
- [ROUTE-SURVIE.md](ROUTE-SURVIE.md)
- [verification_pack/](verification_pack/README.md)

<!-- CONTENU-DOSSIER:fin -->

## Annexes declenchees ici

- [01-support.md](../../06-ANNEXES-TRANSVERSES/01-support.md) : ou aller quand tu es bloque plus de trente minutes, avant d'abandonner ou de demander a une IA.
- [02-NODE_VERSION.md](../../06-ANNEXES-TRANSVERSES/02-NODE_VERSION.md) : la version de Node supposee par tout le depot, a fixer le jour de l'installation.
