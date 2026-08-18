---
stability: stable
acte: pratiquer
route: survie
---

# La route survie : le raccourci employabilite, dit sans mentir

<!-- FICHIER GENERE par 99-COULISSES/outillage/generer_route_survie.mjs — ne pas editer a la main.
     La route est un FILTRE sur le fil unique (cle YAML `route: survie` dans l'en-tete de chaque
     module). Aucun contenu n'est duplique ici : chaque etape est un lien vers le module reel. -->

## La scene

Tu n'as pas deux ans devant toi. Tu veux etre **employable** le plus vite possible, sans
te raconter d'histoire sur ce que tu vaux. Cette page est ce chemin : les etapes du fil
unique strictement necessaires, dans l'ordre, et rien d'autre.

Ce n'est pas un second parcours. C'est le **meme fil**, filtre. Les etapes ci-dessous sont
les modules qui portent `route: survie` dans leur en-tete ; tous les autres portent
`route: complete` et t'attendent apres.

## Les etapes, dans l'ordre de traversee

| # | Module | Titre | En-tete |
| --- | --- | --- | --- |
| 1 | [`00-SOCLE/01_getting_started`]() | Lis-moi avant de coder | `route: survie` |
| 2 | [`00-SOCLE/04_fundamentals`](../04_fundamentals) | 00-SOCLE/04_fundamentals | `route: survie` |
| 3 | [`00-SOCLE/05_problem_solving`](../05_problem_solving) | 00-SOCLE/05_problem_solving | `route: survie` |
| 4 | [`01-CADRAGE/01-PROBLEM-HUNT`](../../01-CADRAGE/01-PROBLEM-HUNT) | Niveau 02 : Problem Hunt | `route: survie` |
| 5 | [`01-CADRAGE/02_async`](../../01-CADRAGE/02_async) | 01-CADRAGE/02_async | `route: survie` |
| 6 | [`01-CADRAGE/03_debugging`](../../01-CADRAGE/03_debugging) | 01-CADRAGE/03_debugging | `route: survie` |
| 7 | [`01-CADRAGE/04_error_handling`](../../01-CADRAGE/04_error_handling) | 01-CADRAGE/04_error_handling | `route: survie` |
| 8 | [`01-CADRAGE/05-MVP-SPLIT`](../../01-CADRAGE/05-MVP-SPLIT) | Niveau 03 : MVP Split | `route: survie` |
| 9 | [`02-CONSTRUCTION/02_mini_projects`](../../02-CONSTRUCTION/02_mini_projects) | 02-CONSTRUCTION/02_mini_projects : 19 mini-projets appliqués | `route: survie` |
| 10 | [`02-CONSTRUCTION/03_testing`](../../02-CONSTRUCTION/03_testing) | 02-CONSTRUCTION/03_testing | `route: survie` |
| 11 | [`02-CONSTRUCTION/19_api_craft`](../../02-CONSTRUCTION/19_api_craft) | 02-CONSTRUCTION/19_api_craft | `route: survie` |
| 12 | [`03-PILOTAGE/04_security`](../../03-PILOTAGE/04_security) | 03-PILOTAGE/04_security | `route: survie` |
| 13 | [`03-PILOTAGE/05_observability`](../../03-PILOTAGE/05_observability) | 03-PILOTAGE/05_observability | `route: survie` |
| 14 | [`03-PILOTAGE/06_fiabilite_slo`](../../03-PILOTAGE/06_fiabilite_slo) | 03-PILOTAGE/06_fiabilite_slo : fiabilité, SLO et reprise | `route: survie` |

## Ce que la route prend, palier par palier

| Palier | Etapes retenues | Pourquoi |
| --- | --- | --- |
| 00-SOCLE | 3 / 6 | a la fin de ce palier, tu sais ecrire, lire et raisonner sur du code sans t'y perdre |
| 01-CADRAGE | 5 / 5 | a la fin de ce palier, tu sais choisir quoi construire et refuser par ecrit le reste |
| 02-CONSTRUCTION | 3 / 20 | a la fin de ce palier, tu sais construire un systeme dont les frontieres resistent au changement |
| 03-PILOTAGE | 3 / 11 | a la fin de ce palier, tu sais tenir un systeme en production et le chiffrer |
| 04-EPREUVE | 0 / 6 | aucune etape : ce palier appartient a la route complete |
| 05-MAITRISE | 0 / 8 | aucune etape : ce palier appartient a la route complete |

## La sortie : un Boss, pas une lecture

La route ne se termine pas quand tu as fini de lire : elle se termine quand tu as passe le
**Boss de sortie** [`03-PILOTAGE/BOSS-3`](../../03-PILOTAGE/BOSS-3), qui couvre `05_observability` et `06_fiabilite_slo`.

| Piece du Boss de sortie | Ce que tu produis |
| --- | --- |
| [01-PROJET-REEL.md](../../03-PILOTAGE/BOSS-3/01-PROJET-REEL.md) | un livrable qui tourne, pas une maquette |
| [02-CONTRAINTE.md](../../03-PILOTAGE/BOSS-3/02-CONTRAINTE.md) | l'auto-audit du livrable sous contrainte |
| [03-DEFENSE.md](../../03-PILOTAGE/BOSS-3/03-DEFENSE.md) | la **soutenance** : tu defends tes choix a voix haute |
| [04-VERDICT.md](../../03-PILOTAGE/BOSS-3/04-VERDICT.md) | le verdict binaire, ecrit et date |

Tant que la soutenance n'est pas jouee, la route n'est pas finie. Il n'existe aucune autre
facon de la terminer.

## Ce que tu **n'es pas** a la sortie de cette route

Dire l'inverse serait te vendre un titre que personne ne te reconnaitra en entretien.

- Tu **n'es pas Staff Engineer**. Tu n'as ni budget cloud chiffre et source, ni SLO tenable
  demontre, ni dossier soutenu sous contradiction.
- Tu **n'es pas architecte**. Tu n'as pas encore d'ADR chiffres, pas de DDD ni de contrats,
  pas de raisonnement d'echelle.
- Tu **n'as pas prouve les six familles Staff** ([PREUVES-STAFF-ENGINEER.md](../../PREUVES-STAFF-ENGINEER.md)) :
  au mieux, deux d'entre elles sont partielles.
- Ce que tu es : quelqu'un qui **construit, teste, expose une API, la securise a minima,
  l'observe, et defend son livrable**. C'est exactement ce qu'un premier poste demande.

## Ce qu'il te manque, nomme

42 modules du fil unique restent devant toi, dont l'architecture, le DDD, le cout et le ROI,
la fiabilite avancee, le leadership et le mentorat, l'epreuve sous derive, et la maitrise.
La liste exacte est la carte : [00-SOCLE/02-PROLOGUE/03-the-map.md](../02-PROLOGUE/03-the-map.md).

## Reprendre la route complete sans repartir de zero

Tu ne recommences rien. La reprise est mecanique :

1. Ouvre [PROGRESSION.md](../../PROGRESSION.md) : tes checkpoints franchis y sont deja coches.
2. Reprends le fil **au premier module `route: complete` que tu as saute**, dans l'ordre de
   la carte : le premier est [`00-SOCLE/02-PROLOGUE`](../02-PROLOGUE).
3. Les modules deja franchis en route survie ne se refont pas : ils comptent, et leurs Boss
   sont deja coches sur l'echelle du [README racine](../../README.md).
4. Rien n'est duplique : le contenu que tu retrouveras est le meme fil, la suite du meme
   ordre, avec les Boss qui restent.

## Test de traversee

Le critere de fin de cette route est verifie par la machine, pas par une opinion :
`node 99-COULISSES/outillage/controle_livraison.mjs` refuse la livraison si une etape
manque, si un module de la route appelle un prerequis hors route, ou si le Boss de sortie
n'est pas entierement couvert.
