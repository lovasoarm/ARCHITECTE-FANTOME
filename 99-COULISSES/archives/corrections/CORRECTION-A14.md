# Correction A14 — Annexes transverses ordonnees et rattachees

Date : 2026-08-18 — reference d'audit 0.12

## Le defaut

Les annexes transverses etaient un sac : ordre alphabetique, aucune trace du module qui les
appelle, aucun moment de lecture. Trois d'entre elles n'etaient appelees par aucun module du fil
et restaient pourtant devant l'apprenant.

## Ce qui a ete fait

1. **Numerotation par ordre d'appel** : 13 entrees renommees `NN-nom`, de `01-support.md` a
   `13-ANNEXE-et-apres.md`, l'ordre etant celui du premier module du fil qui les ouvre.
   `TECH-ILA/` devient `03-TECH-ILA/`.
2. **Module declencheur explicite** : six annexes n'avaient aucun lien entrant reel. Une section
   « Annexe declenchee ici » a ete ajoutee dans le module qui doit les ouvrir
   (`00-SOCLE/01_getting_started/README.md`, `00-SOCLE/02-PROLOGUE/04-rules-of-the-game.md`,
   `03-PILOTAGE/07_cloud_foundations/README.md`, `05-MAITRISE/06_annexes/13_portfolio_publication.md`,
   `05-MAITRISE/06_annexes/20_PERISSABILITE.md`, `05-MAITRISE/RETRO-BLOC-5-MAITRISE.md`).
3. **Descente en coulisses** : `README-source-myfunnyjs.md`, `README-source-projectfunny.md` et
   `START_HERE-myfunnyjs.md` n'avaient pas de module declencheur possible (documents de fusion) :
   ils vivent desormais en `99-COULISSES/archives/sources/`.
4. **Index en tableau** dans `06-ANNEXES-TRANSVERSES/README.md` : numero, fichier, chemin exact du
   module declencheur, moment d'ouverture, ce que l'annexe debloque.
5. **Regle de lint** : `99-COULISSES/outillage/verifier_annexes.mjs` (nouveau) refuse toute entree
   non numerotee ou sans lien entrant depuis `00-SOCLE` a `05-MAITRISE`. Branche en regle 14 du
   controle de livraison.
6. **Reecriture des liens entrants** : migration outillee
   (`99-COULISSES/outillage/migrations/A14_annexes_ordonnees.mjs` + `_deplacer.mjs`), 62 fichiers
   de liens reecrits, rapport regenere, 0 lien casse sur 4 290 liens.

Au passage, les 11 rapports `CORRECTION-A*.md` qui trainaient a la racine (violation de la liste
blanche posee en A4) sont descendus dans ce dossier.

## Test de morsure

`mv 06-ANNEXES-TRANSVERSES/01-support.md 06-ANNEXES-TRANSVERSES/support.md` puis
`node 99-COULISSES/outillage/controle_livraison.mjs . --strict` : refus `ANNEXES`, sortie 1.
