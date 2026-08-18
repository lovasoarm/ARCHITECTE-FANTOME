# Correction A18 — Double derive dans la meme semaine de capstone

Date : 2026-08-18 — reference d'audit : angle mort A4

## Le defaut

La derive technique (`SPEC_DRIFT_TRIGGERS.md`, `00_SPEC_DRIFT.md`) et le changement de
priorite business (`05-changement-de-spec.md`) existaient tous les deux, mais jamais en meme
temps. Sequencees, elles s'absorbent : l'apprenant repousse la seconde d'une semaine et
n'arbitre jamais. Or c'est l'arbitrage sous contradiction, a budget constant, qui distingue un
Staff Engineer d'un bon developpeur.

## Ce qui a ete fait

1. Nouvelle piece `04-EPREUVE/06-CAPSTONE-ARENA/07-semaine-double-derive.md` : une ligne de
   calendrier (J3, semaine 2, J20-J26) declenche **le meme jour simule, sur le meme livrable**,
   la derive technique (P95 < 100 ms) et la derive business (tarification prioritaire).
2. Budget inchange : 20 h, aucune rallonge negociable.
3. Livrable unique impose : `DECISION-DOUBLE-DERIVE.md`, quatre blocs (contradiction nommee,
   arbitrage chiffre, prix paye chiffre, condition de reouverture chiffree). Deux fichiers
   separes = non valide.
4. Le calendrier de `03-deliverables.md` porte la semaine, et un livrable 6 y renvoie ;
   `05-changement-de-spec.md` annonce que le changement ne tombe pas seul.

## Test de morsure (joue)

Deplacement de `07-semaine-double-derive.md` hors du depot →
`REFUS DOUBLE-DERIVE : ... le capstone n'a pas de semaine a double derive` (regle 16 du
controle). Fichier remis, controle revenu a 0 refus.

## Critere de fin

Le capstone contient une semaine a double derive et son livrable exige une decision unique
arbitrant les deux : verifie par la regle 16 de `controle_livraison.mjs`.
