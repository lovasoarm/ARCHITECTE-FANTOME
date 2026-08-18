---
stability: intemporel
acte: boss
noyau: oui
type: boss
---

# BOSS-1 — LE TEMPS REEL SOUS CHARGE

> Boss de palier `04-EPREUVE`. Duree : 3 h, chronometre lance. Un essai par semaine.
> Un boss ne se lit pas : il se joue une fois, et il se rate. Le rater et recommencer fait partie du
> dispositif ; le contourner ne coche rien.

## Modules couverts

- [`03_realtime`](../03_realtime/README.md)
- [`02-TOOL-CAVE`](../02-TOOL-CAVE/README.md)

Si un de ces modules n'est pas fini, le boss est premature : tu perdras la seance a apprendre au lieu
de prouver.

## Scenario

Cinquante connexions simultanees, une coupure reseau au milieu, aucun message perdu ni duplique visible par l'utilisateur.

## Deroule impose

| Temps | Manche |
| --- | --- |
| 0-30 min | Cadrage : ecris ce que tu vas prouver, et la mesure qui tranchera. |
| 30-120 min | Execution, sans lire de cours. Ce que tu ne sais pas, tu le notes, tu ne le cherches pas. |
| 120-150 min | Preuve : la mesure, rejouee devant temoin ou enregistree. |
| 150-180 min | Contradiction : un contradicteur attaque le point le plus faible, tu reponds par ecrit. |

## Conditions de passage (toutes)

- [ ] Reconnexion automatique avec reprise, prouvee par un scenario rejouable.
- [ ] Ordre et unicite des messages garantis ou explicitement non garantis, ecrit dans le contrat.
- [ ] Mesure de latence au 95e centile sous charge.
- [ ] Gate securite : aucune donnee sensible exposee par le livrable ; ecris la ligne de verification.
- [ ] Un fichier `BOSS-<date>.md` dans ton depot : ce qui a marche, ce qui a rate, ce que tu refais.

## Echec automatique

Modifier le critere de reussite pendant la partie. Rendre une mesure non rejouable. Depasser 3 h et
compter quand meme la seance.

## Apres

Reporte le resultat dans [PROGRESSION.md](../../PROGRESSION.md) et dans la retrospective du palier.
