---
stability: intemporel
acte: boss
noyau: oui
type: boss
---

# 07b-BOSS-3 : LE PROGRAMME QUI RALENTIT

> Boss de palier `02-CONSTRUCTION`. Duree : 3 h, chronometre lance. Un essai par semaine.
> Un boss ne se lit pas : il se joue une fois, et il se rate. Le rater et recommencer fait partie du
> dispositif ; le contourner ne coche rien.

## Modules couverts

- [`05-MEMORY-PERFORMANCE`](../05-MEMORY-PERFORMANCE/README.md)
- [`06-DATA-STRUCTURES`](../06-DATA-STRUCTURES/README.md)
- [`07-ALGORITHMS`](../07-ALGORITHMS/README.md)

Si un de ces modules n'est pas fini, le boss est premature : tu perdras la seance a apprendre au lieu
de prouver.

## Scenario

On te donne un traitement qui met 40 secondes sur 100 000 elements. Tu dois passer sous 2 secondes sans changer le resultat.

## Deroule impose

| Temps       | Manche                                                                                    |
| ----------- | ----------------------------------------------------------------------------------------- |
| 0-30 min    | Cadrage : ecris ce que tu vas prouver, et la mesure qui tranchera.                        |
| 30-120 min  | Execution, sans lire de cours. Ce que tu ne sais pas, tu le notes, tu ne le cherches pas. |
| 120-150 min | Preuve : la mesure, rejouee devant temoin ou enregistree.                                 |
| 150-180 min | Contradiction : un contradicteur attaque le point le plus faible, tu reponds par ecrit.   |

## Conditions de passage (toutes)

- [ ] Mesure avant, mesure apres, meme jeu de donnees, meme machine.
- [ ] La structure de donnees choisie est justifiee par un cout asymptotique ET par la mesure.
- [ ] Aucune sortie ne change : un test de non-regression le prouve.
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

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Kintana est un cas d’étude pédagogique commun, pas un projet personnel imposé. Pour ce module, applique **la notion réellement enseignée ici** à la mission correspondante dans la [carte des missions Kintana par domaine](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). N’utilise pas automatiquement la FAQ IA : elle est réservée aux activités IA/RAG. Le challenge local de ce module reste la source de la consigne et de ses critères ; cette mise en pratique ne crée ni prérequis, ni gate supplémentaire.
