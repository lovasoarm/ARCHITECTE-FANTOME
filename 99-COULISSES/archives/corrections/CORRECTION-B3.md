# Correction B3 — Six niveaux au premier ecran, pas 1927 fichiers

Date : 2026-08-18 — reference d'audit : critere 10

## Le defaut

Le depot se presentait par son volume. Un arrivant voyait une arborescence, pas une echelle :
rien ne lui disait en dix secondes ou il en etait ni combien de marches restaient. Et les
chiffres qui existaient etaient saisis a la main, donc faux des la premiere reorganisation.

## Ce qui a ete fait

1. L'echelle a six barreaux est **generee depuis le disque** par `generer_carte.mjs`, dans un
   bloc balise `ECHELLE:debut/fin` du README racine et en tete de `03-the-map.md`. Aucun
   chiffre n'est ecrit a la main : modules **et** nombre de Boss (B2) sont comptes.
2. Trois colonnes par niveau, pas une de plus : ce que tu sais faire, ce que tu as produit,
   ce qui te reste.
3. La route survie est positionnee **sur la meme echelle** (arret visuel au Niveau 1 et demi),
   sans creer une seconde carte.
4. Aucun dossier de palier n'a ete renomme : la vue est une lecture, pas une refonte.

## Test de morsure (joue)

Suppression de la mention « Route survie » dans le bloc genere du README →
`REFUS ECHELLE : README.md : la route survie n'est pas positionnee sur l'echelle` (regle 19).
La regle 19 refuse aussi un niveau manquant, l'echelle repoussee sous « La promesse », et tout
nombre de modules ecrit a la main avant le bloc genere. Bloc regenere, controle a 0 refus.

## Critere de fin

Premier ecran du README = six niveaux + position de la route survie, zero chiffre manuel.
