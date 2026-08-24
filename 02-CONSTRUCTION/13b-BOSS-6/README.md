---
stability: intemporel
acte: boss
noyau: oui
type: boss
---

# 13b-BOSS-6 : TYPER ET FAIRE TOURNER

> Boss de palier `02-CONSTRUCTION`. Duree : 3 h, chronometre lance. Un essai par semaine.
> Un boss ne se lit pas : il se joue une fois, et il se rate. Le rater et recommencer fait partie du
> dispositif ; le contourner ne coche rien.

## Modules couverts

- [`12-TYPESCRIPT`](../12-TYPESCRIPT/README.md)
- [`13-RUNTIME-ENV`](../13-RUNTIME-ENV/README.md)

Si un de ces modules n'est pas fini, le boss est premature : tu perdras la seance a apprendre au lieu
de prouver.

## Scenario

Ton projet passe en TypeScript strict et se lance dans un environnement propre, depuis zero, en une commande.

## Deroule impose

| Temps       | Manche                                                                                    |
| ----------- | ----------------------------------------------------------------------------------------- |
| 0-30 min    | Cadrage : ecris ce que tu vas prouver, et la mesure qui tranchera.                        |
| 30-120 min  | Execution, sans lire de cours. Ce que tu ne sais pas, tu le notes, tu ne le cherches pas. |
| 120-150 min | Preuve : la mesure, rejouee devant temoin ou enregistree.                                 |
| 150-180 min | Contradiction : un contradicteur attaque le point le plus faible, tu reponds par ecrit.   |

## Conditions de passage (toutes)

- [ ] `strict: true`, aucun `any` non justifie par un commentaire.
- [ ] Installation depuis un depot vierge en une commande documentee.
- [ ] Variables d'environnement validees au demarrage, echec clair si absentes.
- [ ] Gate securite : aucune donnee sensible exposee par le livrable ; ecris la ligne de verification.
- [ ] Un fichier `BOSS-<date>.md` dans ton depot : ce qui a marche, ce qui a rate, ce que tu refais.

## Echec automatique

Modifier le critere de reussite pendant la partie. Rendre une mesure non rejouable. Depasser 3 h et
compter quand meme la seance.

## Apres

Reporte le resultat dans [PROGRESSION.md](../../PROGRESSION.md) et dans la retrospective du palier.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

_Rien a lister pour l'instant : depose tes fichiers ici._

<!-- CONTENU-DOSSIER:fin -->
