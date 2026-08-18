# Correction A6 — S5 ne depend plus d'un tiers

Date : 2026-08-18 — reference d'audit 21.5

## Le defaut

La preuve S5 exigeait une revue postee sur une PR publique et, implicitement, une reponse : un
apprenant seul pouvait faire tout le travail et rester non valide parce qu'un inconnu n'avait pas
repondu. Une preuve dont la validation appartient a quelqu'un d'autre n'est pas une preuve.

## Ce qui a ete fait

1. `03-PILOTAGE/11_leadership_mentorat/02_revue_de_code_trois_niveaux.md` : la preuve devient
   solo et verifiable — depot open source public nomme, **URL permanente du commit audite (SHA
   complet)**, revue a trois niveaux publiee (commentaire PR/issue ou `REVUE-CODE.md` de son
   propre depot public, au choix). Critere binaire : sans lien de commit, non recevable.
2. Reponse du mainteneur requalifiee en **bonus date**, jamais condition. Plus de delai d'attente,
   plus de mention « en attente de reponse ».
3. `06-ANNEXES-TRANSVERSES/07-CONTRADICTEUR.md` : nouvelle **passe de contradiction S5** en 4
   etapes chronometrees, ou l'apprenant plaide contre son propre bloquant. Regle de sortie : un
   bloquant qui ne survit pas doit etre requalifie en suggestion dans la revue publiee.
4. `PREUVES-STAFF-ENGINEER.md` : la reserve « S5 ne peut pas etre prouvee en solitaire » est
   supprimee et remplacee par l'inverse, ecrit noir sur blanc. S5 passe COUVERT.
