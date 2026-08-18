# Correction B5 — PROGRESSION.md : une seule surface de suivi, alimentee par des artefacts

Date : 2026-08-18 — reference d'audit : critere 12

## Le defaut

`PROGRESSION.md` etait un stub d'une ligne. Le parcours est long : sans surface de suivi
unique, l'apprenant fabrique la sienne (fichier perso, notes, tableur), et le depot recree
exactement la divergence de comptage corrigee en A1. Pire : la tentation etait de coller des
badges decoratifs qui se cochent en lisant, ce qui remplace « j'ai lu » par une case plus
jolie et vide le diplome de sa valeur.

## Ce qui a ete fait

1. `PROGRESSION.md` ecrit entierement, en cinq blocs, **sans nouvelle taxonomie** :
   - **CHECKPOINTS** : grille des six niveaux (B3) croisee avec les Boss (B2), une ligne par
     Boss, colonne « verdict ecrit le » ;
   - **BILANS** : bloc de cinq lignes a recopier apres chaque Boss, dont la ligne 4 impose le
     chemin de l'artefact produit ;
   - **BADGES** : S1 a S7, trois etats seulement (VIDE / PARTIEL / COUVERT), criteres non
     recopies mais renvoyes a `PREUVES-STAFF-ENGINEER.md`, COUVERT exigeant le recroisement ;
   - **PREUVES VISIBLES** : tableau des artefacts (`BUDGET-CLOUD.md`, `SLO.md`, ADR,
     `DECISION-ARBITRAGE.md`, `DECISION-DOUBLE-DERIVE.md`, `STANDARDS-AGENTS.md`,
     `IA-EN-PROD.md`, `PORTAGE.md`, dossier unique) avec le module qui les fait produire ;
   - **RECAPITULATIF DES ACQUIS** : par niveau franchi, « je peux concevoir X, chiffrer Y,
     defendre Z », plus la sortie de route survie.
2. `99-COULISSES/outillage/generer_progression.mjs` : seul le bloc CHECKPOINTS est calcule
   depuis le disque (niveaux, Boss, Boss de palier, Boss de sortie de la route survie). Le
   reste est un **modele que l'apprenant remplit** : le depot ne genere pas l'etat d'un humain.
3. `controle_livraison.mjs` regle 22 : les cinq blocs sont obligatoires, la grille doit
   correspondre au disque, les etats de badge hors VIDE / PARTIEL / COUVERT sont refuses, les
   sept familles doivent etre presentes et adossees a `PREUVES-STAFF-ENGINEER.md`, et tout
   autre fichier qui ouvrirait une seconde surface de suivi est refuse.

## Test de morsure (joue)

- `| S4 —` renomme en `| S4bis —` → `REFUS PROGRESSION : famille S4 absente du bloc BADGES`.
- Un etat de badge passe a `ACQUIS` → `REFUS PROGRESSION : etat de badge hors VIDE | PARTIEL
  | COUVERT (ACQUIS)`.
- Grille modifiee a la main sans regeneration → `REFUS PROGRESSION : grille de checkpoints
  perimee`. Fichier restaure, controle a 0 refus.

## Critere de fin

A mi-parcours, un seul fichier ouvert suffit a dire ou on en est : niveaux franchis, Boss
passes, bilans, badges par famille, artefacts avec leur chemin. Aucun autre compteur n'existe
dans le depot, et la regle 22 refuse l'apparition d'un second.
