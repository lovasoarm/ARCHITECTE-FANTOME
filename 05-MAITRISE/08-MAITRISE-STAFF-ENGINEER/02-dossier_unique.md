---
stability: intemporel
acte: maitrise
noyau: oui
cognitive_level: L9
perturbation_modes: [regression, fausse_piste]
anti_recipe_key: regression+fausse_piste
transfer_distance: high
assessment_role: staff_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Le dossier unique : la pièce qui tient tout

Temps de lecture ~2 min

Durée : 6 h de rédaction, étalées. C'est le livrable terminal du parcours.

Un dossier de 10 à 14 pages, écrit sur **ton** fil rouge, qu'un jury ouvre sans toi et comprend seul.

## Les dix sections imposées

| #   | Section                         | Contenu                                                                                                                                | Source                                                |
| --- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| 1   | Le problème                     | qui souffre, de quoi, combien ça coûte                                                                                                 | 01-CADRAGE                                            |
| 2   | Le découpage                    | carte de contextes, frontières justifiées                                                                                              | S2, module `02-CONSTRUCTION/14-ARCHITECTURE-PATTERNS` |
| 3   | Le coût                         | facture aux trois paliers, relevé daté                                                                                                 | S1, module `02-CONSTRUCTION/04-MATH-BASICS`           |
| 4   | La promesse                     | SLI/SLO, budget d'erreur, RPO/RTO mesurés                                                                                              | S3, module `02-CONSTRUCTION/03-TESTING`               |
| 5   | L'arbitrage                     | grille coût/risque/valeur, point mort, dette déclarée                                                                                  | S4, module `02-CONSTRUCTION/05-MEMORY-PERFORMANCE`    |
| 6   | La note direction               | une page, zéro jargon, un chiffre, une contrepartie                                                                                    | S5, module `02-CONSTRUCTION/09-FUNCTIONAL-JS`         |
| 7   | L'IA en production              | coût par utilisateur, plafond, dégradé, jeu d'évaluation                                                                               | S6                                                    |
| 8   | Les trois tensions              | trois contradictions chiffrées **entre** familles                                                                                      | `03-trois_tensions.md`                                |
| 9   | Le transfert                    | portage hors langage et hors fournisseur                                                                                               | S7, `05A-transfert_hors_ecosysteme.md`                |
| 10  | La transformation décisionnelle | croyance initiale, confiance, preuve contradictoire, changement d’avis, biais, junior-was-right, pression et mécanisme de compensation | `05-PSYCHOLOGIE-DECISION/README.md`                   |

## Les règles de rédaction

- **Un chiffre par section, minimum, avec sa date de relevé et sa méthode.**
- Chaque affirmation renvoie à un fichier de ton dépôt par un chemin relatif qui existe.
- Aucune section ne dépasse une page et demie. Le jury lit 40 minutes, pas trois heures.
- Le dossier cite au moins un échec : un chantier abandonné, une hypothèse fausse, un coût sous-estimé.
  Un dossier sans échec est un dossier non vécu, et cela se voit en quinze secondes.

## Conditions de recevabilité (toutes)

- [ ] Les dix sections existent.
- [ ] Les sept pièces de [PREUVES-STAFF-ENGINEER.md](../../PREUVES-STAFF-ENGINEER.md) sont liées.
- [ ] `STANDARDS-AGENTS.md` est présent (sinon S5 non couvert, dossier refusé).
- [ ] La section 8 contient trois tensions **chiffrées des deux côtés**.
- [ ] La section 9 contient un dossier `transfert/` réellement exécutable.
- [ ] Une date de revisite est fixée (`04-revisite_datee.md`).
- [ ] La section 10 contient une comparaison avant / pendant / après avec au moins une mesure chiffrée.
- [ ] `04-BELIEF-CHANGE-LOG.md`, `05-BIAS-LOG.md` et au moins deux épreuves de `05-PSYCHOLOGIE-DECISION/` sont annexés.

## Défense

La soutenance dure 30 minutes : 12 de présentation, 18 de contradiction. Le jury attaque la section 8 puis la section 10 : d’abord la qualité des arbitrages, puis la capacité du candidat à réviser son propre modèle sous contradiction.

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.
