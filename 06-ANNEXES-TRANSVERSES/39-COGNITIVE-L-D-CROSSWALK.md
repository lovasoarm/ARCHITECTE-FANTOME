---
stability: stable
route: core
acte: référencer
---

# Correspondance gouvernée L ↔ D

`L1…L9` et `D1…D8` ne désignent pas la même chose et ne doivent pas être fusionnés.

- **L0–L6** : opérations cognitives distinctes, dans l'ordre officiel : Recall, Explain, Apply, Diagnose, Discriminate, Decide, Defend. Chaque valeur décrit l'opération effectivement demandée, pas une difficulté générale.
- **L7 : Revise** : réviser une hypothèse ou une décision à partir d'une observation contradictoire. Ce niveau ne se réduit pas à un transfert vers un autre contexte.
- **L8 : Transfer** : transporter un invariant vers un contexte différent, puis identifier ce qui doit être adapté. Il ne signifie pas « révision ».
- **L9 : Govern** : gouverner une décision ou un système sous contraintes, avec responsabilité, arbitrage, suivi et possibilité de révision. Ce n'est pas un niveau de difficulté locale.
- **D2 et D6** sont des marqueurs de transition utilisés uniquement pour le crosswalk ; ils ne constituent ni des niveaux de certification autonomes ni des gates de sortie. Les fermetures de preuve restent gouvernées par les matrices D1, D3, D4, D5, D7 et D8.
- **L9** : niveau de difficulté locale réservé aux situations de maîtrise Staff. Il peut **contribuer** à une preuve D7 ou D8, mais ne valide jamais D7/D8 à lui seul.

## Règle de clôture

| Niveau L | Contribution possible | Preuve nécessaire                                                                                       |
| -------- | --------------------- | ------------------------------------------------------------------------------------------------------- |
| L0       | D1 candidat           | rappel exact, sans inférence de maîtrise                                                                |
| L1       | D1–D2                 | explication ou restitution selon la preuve                                                              |
| L2       | D2                    | application                                                                                             |
| L3       | D2–D3                 | application + diagnostic                                                                                |
| L4       | D3–D4                 | diagnostic + arbitrage                                                                                  |
| L5       | D3–D5                 | pratique ouverte + justification                                                                        |
| L6       | D4–D5                 | décision + perturbation                                                                                 |
| L7       | D5–D7 candidat        | preuve initiale, contradiction et révision justifiée                                                    |
| L8       | D5–D7 candidat        | invariant transféré à un contexte différent et adapté                                                   |
| L9       | D7–D8 candidat        | gouvernance, responsabilité, arbitrage et suivi ; les preuves D7/D8 restent évaluées par leurs matrices |

**D7 est fermé uniquement par la chaîne** : hypothèse initiale → observation contradictoire → révision → décision → justification → transfert.

**D8 est fermé uniquement par** : nouveau contexte → contraintes nouvelles → modèle reconstruit → défense de l’inverse → limites explicites.

Ainsi, `cognitive_level: L9` ne devient jamais automatiquement `D8`. Les épreuves `34-D7-D8-PROOF-MATRIX.md` et `29-EPREUVE-D8-RECONSTRUCTION.md` restent les autorités de preuve.
