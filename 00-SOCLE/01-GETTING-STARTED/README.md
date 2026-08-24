## perishability_id: PER-0004

stability: perissable
route: survie
acte: comprendre
review_due: 2027-12-31

---

# Lis-moi avant de coder

Temps de lecture ~2 min

Ce dossier est un **module de mise en route**, pas une lecon de code.
Le premier clic est **`01-START_HERE.md`**. Le document `01A-00-why-getting-started.md` vient juste après pour expliquer la logique de ce palier.

Raisons :

- Tu n'es pas encore prêt à te demander "pourquoi ce module" : tu n'as même pas Node d'installé.
- La vraie question ici est mécanique : **installer, ouvrir un shell, lancer un fichier `.js`**.
- Le "pourquoi" arrive au module `00-SOCLE/04-FUNDAMENTALS` : c'est là que ton cerveau prend le contrôle.

## Ordre de lecture

1. `01-START_HERE.md` : porte d'entrée et ordre du premier passage.
2. `01A-00-why-getting-started.md` : pourquoi cette mise en route et ce qu'elle prépare.
3. `02-install.md` : Node 22 LTS, Git, éditeur. La release référence Node 22.23.2 ; la compatibilité déclarée du sandbox reste Node 22.x.
4. `03-day_one.md` : contexte du métier, poste de travail, premières lignes de JS.
5. `04-shell_survival.md` : 12 commandes pour survivre.
6. `05-git_101.md` : clone, add, commit, push, revert.
7. `06-package_managers.md` : npm vs pnpm vs bun, en 15 min.
8. `07-devsec_perso.md` : ne pas fuiter tes secrets dès le jour 1.

## Sortie du module

Tu dois être capable de :

- ouvrir un terminal, `cd`, `ls`, `node -v` retourne `v22.x`,
- créer un dépôt local, faire un commit, l'annuler,
- installer un paquet, le supprimer, comprendre `package.json`.

Ensuite, direction `00-SOCLE/04-FUNDAMENTALS/`.

## Ce module reutilise

Rien (c'est le point d'entrée).

<!-- PIECES-MODULE:debut -->

## Les pièces de ce module

- [`00-PREREQUIS.md`](00-PREREQUIS.md) : Auto-test d'entrée : à passer avant d'ouvrir le module
- [`95-challenge.md`](95-challenge.md) : Challenge : l'épreuve du module
- [`90-grimoire.md`](90-grimoire.md) : Grimoire : ce que tu dois pouvoir restituer

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Auto-test d'entrée : `01-GETTING-STARTED`](00-PREREQUIS.md)
- [Pourquoi ce dossier "getting started" ?](01A-00-why-getting-started.md)
- [01 : Installation pas-à-pas (Windows / macOS / Linux)](02-install.md)
- [02 : DAY ONE (contexte, environnement, premier code)](03-day_one.md)
- [02 : Shell : survie en territoire hostile](04-shell_survival.md)
- [03 : Git : 12 commandes pour ne pas perdre ton code](05-git_101.md)
- [04 : npm / pnpm : ne bloque pas au premier `install`](06-package_managers.md)
- [05 : Devsec perso : protège ton chakra avant d'affronter les ninjas renégats du net](07-devsec_perso.md)
- [`package.json` : mode d'emploi (2 min)](08-PACKAGE_JSON_README.md)
- [Mode Survie : parcours court employable](09-ROUTE-SURVIE.md)
- [Start here](01-START_HERE.md)
- [Challenge : `01-GETTING-STARTED`](95-challenge.md)
- [Grimoire : `01-GETTING-STARTED`](90-grimoire.md)
- [`97-CHECKPOINT-PACK/`](97-CHECKPOINT-PACK/README.md)

<!-- CONTENU-DOSSIER:fin -->
