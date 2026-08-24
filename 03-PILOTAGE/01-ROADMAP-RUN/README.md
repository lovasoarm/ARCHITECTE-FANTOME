---
stability: intemporel
acte: comprendre
route: complete
---

# Module 03-PILOTAGE/01-ROADMAP-RUN : Roadmap Run

[Sommaire](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) | [Niveau précédent](../../02-CONSTRUCTION/20-API-DOJO/README.md) | [Niveau suivant](../03-QUALITY-SHIELD/README.md)

**Ce niveau réutilise :** [03-MVP-SPLIT](../../01-CADRAGE/05-MVP-SPLIT/04-estimating-honestly.md) : l'estimation honnete et l'effet tunnel, réutilises pour batir un planning risk-first.

**Auto-test d'entrée :**

1. Qu'est-ce qui distingue un changement d'API retrocompatible d'un changement qui casse les clients existants ?
2. A quoi sert une cle d'idempotence, et que se passe-t-il sans elle sur un retry ?
3. Quelle est la différence entre authentification et autorisation ?

**Verdict de l'auto-test :** une seule réponse hésitante et tu n'entres pas encore. Relis
[le grimoire du niveau précédent](../../02-CONSTRUCTION/20-API-DOJO/90-grimoire.md) (20 minutes), puis refais son
[challenge](../../02-CONSTRUCTION/20-API-DOJO/95-challenge.md) si deux réponses sur trois manquent. Entrer ici avec un
trou amont, c'est attribuer au module `03-PILOTAGE/01-ROADMAP-RUN` une difficulté qui vient du 20-API-DOJO.

**Durée :** source unique dans [04A-CARTE-DU-PARCOURS.md](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) (règle de calcul détaillée plus haut).

## Ce que c'est

Tu sais découper un problème (Module `01-CADRAGE/01-PROBLEM-HUNT`), construire un MVP (Module `01-CADRAGE/05-MVP-SPLIT`), poser une
architecture (Module `02-CONSTRUCTION/15-ARCHI-LAB`) et exposer une API (Module `02-CONSTRUCTION/20-API-DOJO`). Ce niveau répond à une question
différente : comment on transforme tout ça en un plan qui tient la route sur des semaines,
avec une équipe, un budget, et des inconnues qui ne se révèlent qu'en avançant. Une roadmap
n'est pas une liste de tâches dans l'ordre où elles te viennent à l'esprit : c'est un pari
structuré sur ce qui va casser en premier.

Prérequis : Module `00-SOCLE/02-PROLOGUE` à 03 (découpage de problème, MVP). Module `02-CONSTRUCTION/15-ARCHI-LAB` aide mais n'est pas
bloquant.

## Pourquoi ce niveau existe, en une phrase

Un planning optimiste n'échoue jamais sur le papier : il échoue en semaine 7, quand le risque
qu'on a repoussé par confort explose d'un coup, deux jours avant une démo ou une livraison
contractuelle. Ce niveau apprend à faire exploser ce risque en semaine 1, à moindre coût.

## Ce que tu sais faire à la sortie

- Tu sais découper un projet en phases qui livrent de la valeur ou de la certitude à chaque
  étape, jamais les deux mains vides.
- Tu sais identifier le risque le plus cher d'un projet et le placer en premier dans le plan,
  au lieu de le repousser parce qu'il fait peur.
- Tu sais distinguer un jalon réel (vérifiable, daté, binaire) d'un jalon décoratif ("phase 2
  terminée à 80 %").
- Tu sais repérer les signaux de dérive avant que le retard soit officiel : et tu sais quoi
  faire de ces signaux.
- Tu sais répondre en réunion à "où on en est vraiment ?" sans mentir ni paniquer.
- Tu sais reformuler une date imposée par un sponsor en engagement sur un périmètre, plutôt
  que de la subir en silence en espérant que ça passe.

## Ce qui casse sans ce niveau

Un projet sans planification risk-first découvre ses vrais problèmes au pire moment possible :
juste avant une échéance visible (démo, mise en production, audit), quand il ne reste plus de
marge pour absorber la mauvaise surprise. Le symptôme le plus fréquent : un pourcentage
d'avancement stable pendant plusieurs semaines, suivi d'une annonce de retard soudaine, alors
que le blocage réel durait depuis le début.

## Structure du niveau

- [01-01-why-this-level.md](01-01-why-this-level.md) : pourquoi les plannings optimistes tuent les projets
- [02-phases-and-milestones.md](02-phases-and-milestones.md) : découper en phases livrables, jalons vérifiables
- [03-risk-first-planning.md](03-risk-first-planning.md) : attaquer le risque le plus cher en premier
- [04-tracking-reality.md](04-tracking-reality.md) : avancement réel vs déclaré, signaux de dérive
- [95-challenge.md](95-challenge.md) : construire une roadmap risk-first sur un projet réel
- [96-boss-fight.md](96-boss-fight.md) : un sponsor qui veut une date avant que tu aies un plan
- [90-grimoire.md](90-grimoire.md) : mémo dense

## Comment lire ce niveau

Dans l'ordre. `03-risk-first-planning.md` est le cœur du niveau : tout le reste organise
la manière dont tu appliques ce principe dans le temps et dont tu le communiques.

## Ce qui ne se passe pas ici

Ce niveau ne t'apprend pas un outil (Jira, Linear, Gantt). Les outils ne sauvent jamais un
mauvais plan. Ce niveau t'apprend à construire le plan que l'outil va ensuite afficher.

## Signal que tu es prêt pour le niveau suivant

Tu sais construire, sur un projet réel de ton choix, un plan en tranches verticales dont la
première phase attaque explicitement le risque le plus cher, avec un jalon vérifiable daté.
Tu sais aussi détecter, dans un point d'avancement, au moins un des trois signaux de dérive
présentés dans ce niveau sans qu'on te les rappelle.

<!-- PIECES-MODULE:debut -->

## Les pièces de ce module

- [`00-PREREQUIS.md`](00-PREREQUIS.md) : Auto-test d'entrée : à passer avant d'ouvrir le module
- [`95-challenge.md`](95-challenge.md) : Challenge : l'épreuve du module
- [`90-grimoire.md`](90-grimoire.md) : Grimoire : ce que tu dois pouvoir restituer
- [`96-boss-fight.md`](96-boss-fight.md) : Boss : l'épreuve du palier, une seule fois

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Auto-test d'entrée : `01-ROADMAP-RUN`](00-PREREQUIS.md)
- [Pourquoi ce niveau existe : ROADMAP-RUN](01-01-why-this-level.md)
- [Découper en phases livrables, jalons vérifiables](02-phases-and-milestones.md)
- [Attaquer le risque le plus cher en premier](03-risk-first-planning.md)
- [Avancement réel vs déclaré, signaux de dérive](04-tracking-reality.md)
- [Boss Fight : Un sponsor qui veut une date avant que tu aies un plan](96-boss-fight.md)
- [Challenge : Construire une roadmap risk-first](95-challenge.md)
- [Grimoire : Roadmap Run](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->
