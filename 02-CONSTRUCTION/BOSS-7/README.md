---
stability: intemporel
acte: boss
noyau: oui
type: boss
---

# BOSS-7 — BOSS DE CHARNIERE : DU RUNTIME A L'ARCHITECTURE

> Boss de palier `02-CONSTRUCTION`. Duree : 3 h, chronometre lance. Un essai par semaine.
> Un boss ne se lit pas : il se joue une fois, et il se rate. Le rater et recommencer fait partie du
> dispositif ; le contourner ne coche rien.

## Modules couverts

- [`13_runtime_env`](../13_runtime_env/README.md)
- [`14_architecture_patterns`](../14_architecture_patterns/README.md)

Si un de ces modules n'est pas fini, le boss est premature : tu perdras la seance a apprendre au lieu
de prouver.

## Scenario

Le meme service doit tourner en deux formes (processus unique, puis decoupe en deux deployables) sans changer son comportement observable.

## Deroule impose

| Temps | Manche |
| --- | --- |
| 0-30 min | Cadrage : ecris ce que tu vas prouver, et la mesure qui tranchera. |
| 30-120 min | Execution, sans lire de cours. Ce que tu ne sais pas, tu le notes, tu ne le cherches pas. |
| 120-150 min | Preuve : la mesure, rejouee devant temoin ou enregistree. |
| 150-180 min | Contradiction : un contradicteur attaque le point le plus faible, tu reponds par ecrit. |

## Conditions de passage (toutes)

- [ ] Les deux formes passent la meme suite de tests de bout en bout.
- [ ] L'ADR compare les deux formes : latence, cout, modes de panne.
- [ ] La forme retenue est justifiee par un chiffre, pas par une preference.
- [ ] Gate securite : aucune donnee sensible exposee par le livrable ; ecris la ligne de verification.
- [ ] Un fichier `BOSS-<date>.md` dans ton depot : ce qui a marche, ce qui a rate, ce que tu refais.

## Echec automatique

Modifier le critere de reussite pendant la partie. Rendre une mesure non rejouable. Depasser 3 h et
compter quand meme la seance.

## Apres

Reporte le resultat dans [PROGRESSION.md](../../PROGRESSION.md) et dans la retrospective du palier.
