---
stability: intemporel
acte: boss
noyau: oui
type: boss
---

# BOSS-2 — L'IA DANS UN LIVRABLE QU'ON ASSUME

> Boss de palier `04-EPREUVE`. Duree : 3 h, chronometre lance. Un essai par semaine.
> Un boss ne se lit pas : il se joue une fois, et il se rate. Le rater et recommencer fait partie du
> dispositif ; le contourner ne coche rien.

## Modules couverts

- [`04_ai_native_dev`](../04_ai_native_dev/README.md)
- [`05-BIG-APP-SNOOP`](../05-BIG-APP-SNOOP/README.md)

Si un de ces modules n'est pas fini, le boss est premature : tu perdras la seance a apprendre au lieu
de prouver.

## Scenario

Une brique IA passe en production avec un cout plafonne, un mode degrade, et un jeu d'evaluation rejoue.

## Deroule impose

| Temps | Manche |
| --- | --- |
| 0-30 min | Cadrage : ecris ce que tu vas prouver, et la mesure qui tranchera. |
| 30-120 min | Execution, sans lire de cours. Ce que tu ne sais pas, tu le notes, tu ne le cherches pas. |
| 120-150 min | Preuve : la mesure, rejouee devant temoin ou enregistree. |
| 150-180 min | Contradiction : un contradicteur attaque le point le plus faible, tu reponds par ecrit. |

## Conditions de passage (toutes)

- [ ] Cout par utilisateur actif chiffre et plafonne, coherent avec `BUDGET-CLOUD.md`.
- [ ] Timeout et reponse degradee testes en coupant le fournisseur.
- [ ] Vingt cas d'evaluation rejoues a chaque changement de modele, resultats dates.
- [ ] Gate securite : aucune donnee sensible exposee par le livrable ; ecris la ligne de verification.
- [ ] Un fichier `BOSS-<date>.md` dans ton depot : ce qui a marche, ce qui a rate, ce que tu refais.

## Echec automatique

Modifier le critere de reussite pendant la partie. Rendre une mesure non rejouable. Depasser 3 h et
compter quand meme la seance.

## Apres

Reporte le resultat dans [PROGRESSION.md](../../PROGRESSION.md) et dans la retrospective du palier.
