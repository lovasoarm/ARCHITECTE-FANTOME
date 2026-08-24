---
stability: intemporel
acte: boss
noyau: oui
type: boss
---

# 20b-BOSS-9 : L'API QUE QUELQU'UN D'AUTRE CONSOMME

> Boss de palier `02-CONSTRUCTION`. Duree : 3 h, chronometre lance. Un essai par semaine.
> Un boss ne se lit pas : il se joue une fois, et il se rate. Le rater et recommencer fait partie du
> dispositif ; le contourner ne coche rien.

## Modules couverts

- [`18-WEB-CONCEPTS`](../18-WEB-CONCEPTS/README.md)
- [`19-API-CRAFT`](../19-API-CRAFT/README.md)
- [`20-API-DOJO`](../20-API-DOJO/README.md)

Si un de ces modules n'est pas fini, le boss est premature : tu perdras la seance a apprendre au lieu
de prouver.

## Scenario

Un consommateur externe (agent, script, camarade) doit integrer ton API en 30 minutes avec la seule documentation.

## Deroule impose

| Temps       | Manche                                                                                    |
| ----------- | ----------------------------------------------------------------------------------------- |
| 0-30 min    | Cadrage : ecris ce que tu vas prouver, et la mesure qui tranchera.                        |
| 30-120 min  | Execution, sans lire de cours. Ce que tu ne sais pas, tu le notes, tu ne le cherches pas. |
| 120-150 min | Preuve : la mesure, rejouee devant temoin ou enregistree.                                 |
| 150-180 min | Contradiction : un contradicteur attaque le point le plus faible, tu reponds par ecrit.   |

## Conditions de passage (toutes)

- [ ] Codes d'erreur normalises et documentes, y compris les cas metier invalides.
- [ ] Idempotence prouvee sur l'ecriture critique (meme requete deux fois, un seul effet).
- [ ] Un integrateur reel reussit en 30 minutes, chronometre, sans te poser de question.
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
