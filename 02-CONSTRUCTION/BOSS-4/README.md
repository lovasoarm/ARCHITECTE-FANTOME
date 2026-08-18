---
stability: intemporel
acte: boss
noyau: oui
type: boss
---

# BOSS-4 — LA DONNEE ET SA FORME

> Boss de palier `02-CONSTRUCTION`. Duree : 3 h, chronometre lance. Un essai par semaine.
> Un boss ne se lit pas : il se joue une fois, et il se rate. Le rater et recommencer fait partie du
> dispositif ; le contourner ne coche rien.

## Modules couverts

- [`08-DATA-SPELLS`](../08-DATA-SPELLS/README.md)
- [`09_functional_js`](../09_functional_js/README.md)

Si un de ces modules n'est pas fini, le boss est premature : tu perdras la seance a apprendre au lieu
de prouver.

## Scenario

Un flux de donnees sale (doublons, champs manquants, encodages melanges) doit devenir une source exploitable.

## Deroule impose

| Temps | Manche |
| --- | --- |
| 0-30 min | Cadrage : ecris ce que tu vas prouver, et la mesure qui tranchera. |
| 30-120 min | Execution, sans lire de cours. Ce que tu ne sais pas, tu le notes, tu ne le cherches pas. |
| 120-150 min | Preuve : la mesure, rejouee devant temoin ou enregistree. |
| 150-180 min | Contradiction : un contradicteur attaque le point le plus faible, tu reponds par ecrit. |

## Conditions de passage (toutes)

- [ ] Pipeline de transformation compose de fonctions pures, testees une par une.
- [ ] Le rapport de qualite chiffre : lignes rejetees, raisons, taux.
- [ ] Aucune mutation en place non documentee.
- [ ] Gate securite : aucune donnee sensible exposee par le livrable ; ecris la ligne de verification.
- [ ] Un fichier `BOSS-<date>.md` dans ton depot : ce qui a marche, ce qui a rate, ce que tu refais.

## Echec automatique

Modifier le critere de reussite pendant la partie. Rendre une mesure non rejouable. Depasser 3 h et
compter quand meme la seance.

## Apres

Reporte le resultat dans [PROGRESSION.md](../../PROGRESSION.md) et dans la retrospective du palier.
