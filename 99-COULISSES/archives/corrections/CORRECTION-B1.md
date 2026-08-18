# Correction B1 — Route survie : un filtre sur le fil unique, fini par une soutenance

Date : 2026-08-18 — reference d'audit : critere 11

## Le defaut

Le parcours n'offrait aucune sortie honnete avant la fin. Un apprenant presse n'avait que
deux choix : tout faire, ou abandonner en cours de route sans savoir ce qu'il valait. Aucun
document ne disait « voila le chemin le plus court vers un premier poste, et voila ce que tu
n'es pas encore a sa sortie ». Le risque symetrique etait pire : ecrire ce chemin en
recopiant des modules aurait fait reapparaitre la couture de fusion et un second comptage.

## Ce qui a ete fait

1. `99-COULISSES/outillage/lib_route_survie.mjs` : definition **unique** du filtre. 14 etapes
   du fil unique, dans l'ordre de traversee — socle strictement necessaire (mise en route,
   fondamentaux, resolution de probleme), cadrage (`01-PROBLEM-HUNT`, async, debugging,
   erreurs, `05-MVP-SPLIT`), construction (un mini-projet complet, ses tests, une API),
   pilotage (securite de base, observabilite minimale, SLO). Boss de sortie : `03-PILOTAGE/BOSS-3`,
   un Boss deja existant (B2) dont les **deux** modules sont sur la route.
2. `appliquer_route_survie.mjs` : pose la cle YAML `route: survie | complete` sur les **56**
   README de module. La route est donc lisible module par module, pas seulement dans une page.
3. `generer_route_survie.mjs` : produit `00-SOCLE/01_getting_started/ROUTE-SURVIE.md` depuis le
   disque, jamais a la main — etapes, en-tetes reellement lus, pieces du Boss de sortie,
   nombre de modules restants, premier module `route: complete` a reprendre.
4. `generer_carte.mjs` : la carte marque chaque etape « route survie » et l'echelle du README
   racine s'arrete desormais au Boss de sortie du niveau 3, pas a un « niveau et demi » ecrit
   a la main.
5. **Zero duplication** : le fichier de route ne contient aucun contenu pedagogique, seulement
   des liens vers les modules reels. C'est un filtre, pas un second fil.
6. La route se termine par un livrable **et une soutenance** (`03-DEFENSE.md` du Boss de
   sortie), jamais par une lecture. Le fichier dit explicitement ce que l'apprenant n'est pas
   (pas Staff, pas architecte), ce qui lui manque, et la reprise sans repartir de zero.

## Test de morsure (joue)

- `02-CONSTRUCTION/03_testing/README.md` passe a `route: complete` → `REFUS ROUTE-SURVIE :
  ... declare route: complete alors que le filtre dit survie` (regle 21). En-tete retabli.
- `ROUTE-SURVIE.md` retire → `REFUS ROUTE-SURVIE : ... manque` + 2 refus de liens. Fichier
  regenere, controle a 0 refus.
- La regle refuse aussi : une valeur `route:` hors `survie | complete`, un module sans cle,
  un fichier de route non estampille comme genere, l'absence de Boss de sortie ou de
  soutenance, un Boss de sortie incomplet ou couvrant un module hors route, et un fichier de
  route qui recopierait un module (comparaison d'empreintes).

## Critere de fin

Test de traversee joue : les 14 etapes s'enchainent sans ouvrir un module hors route, et le
Boss de sortie ne couvre que des modules de la route — verifie par la regle 21 de
`controle_livraison.mjs`, qui recalcule le filtre depuis le disque a chaque livraison.
