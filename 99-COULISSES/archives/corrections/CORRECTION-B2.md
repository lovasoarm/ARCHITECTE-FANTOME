# Correction B2 — Le rythme « deux modules, un Boss »

Date : 2026-08-18 — reference d'audit : architecture d'experience, lot 4

## Le defaut

Vingt-et-un `boss-fight.md` existaient, poses la ou l'auteur en avait eu envie : certains
paliers en avaient quatre, d'autres aucun sur huit modules. Le parcours n'avait donc pas de
rythme : rien n'obligeait a fermer ce qu'on venait d'ouvrir, et un apprenant pouvait enchainer
six modules lus sans jamais rien livrer.

## Ce qui a ete fait

1. `99-COULISSES/outillage/lib_boss.mjs` : definition **unique** du rythme (deux modules
   consecutifs = un Boss), calculee sur le disque, jamais listee a la main. 29 groupes.
2. `99-COULISSES/outillage/generer_boss.mjs` : generateur des 23 dossiers `BOSS-N`, quatre
   pieces chacun — `01-PROJET-REEL.md` (la commande, sur le depot du fil rouge),
   `02-CONTRAINTE.md` (90 min chrono, une tentative par semaine, zero IA),
   `03-DEFENSE.md` (contradiction en trois axes chiffres), `04-VERDICT.md` (binaire).
3. **Absorption, jamais duplication** : quand un des deux modules portait deja un
   `boss-fight.md`, la piece `01-PROJET-REEL.md` y renvoie au lieu d'en recopier l'enonce.
   Les liens entrants existants vers `boss-fight.md` restent tous valides (0 lien casse).
4. Les six retrospectives de palier deviennent le **dernier Boss** de leur palier et le
   declarent ; aucun dossier Boss redondant n'est cree la ou une retro existe deja.

## Test de morsure (joue)

Suppression de `03-PILOTAGE/BOSS-3/04-VERDICT.md` →
`REFUS RYTHME-BOSS : ... n'ont pas de Boss` (regle 18 du controle). La regle 18 refuse aussi
deux pieces identiques mot pour mot (empreinte SHA-1), ce qui interdit le remplissage par
copie. Fichier remis, controle a 0 refus.

## Critere de fin

Tout groupe de deux modules a un porteur de Boss, avec ses quatre pieces, et aucune piece
n'est le clone d'une autre : verifie par la regle 18 de `controle_livraison.mjs`.
