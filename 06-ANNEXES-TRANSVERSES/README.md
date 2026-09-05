---
stability: intemporel
acte: restituer
---

# 06-ANNEXES-TRANSVERSES

Porte d'entrée du dossier. Une annexe n'est pas un chapitre : c'est une pièce appelée par un module précis du fil, à un moment précis.

L'index ci-dessous est la **carte canonique d'utilisation des annexes**. La colonne **Appel** indique quand ouvrir une annexe ; la colonne **Fichier** indique le chemin canonique. Il ne constitue pas une progression parallèle et ne remplace pas `PROGRESSION.md`.

## Index par ordre d'appel

| Appel | Fichier canonique                                                        | Module déclencheur                                                 | Moment d'ouverture                         | Ce que ça débloque                                              |
| ----: | ------------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------ | --------------------------------------------------------------- |
|    00 | [00-GUIDE.md](00-GUIDE.md)                                               | Accueil du dépôt                                                   | Avant le parcours, si besoin               | Orientation, métiers, marché, trajectoire et 2035+              |
|    01 | [01-COMMENT-UTILISER-LE-PARCOURS.md](01-COMMENT-UTILISER-LE-PARCOURS.md) | Après `00-GUIDE.md`                                                | Avant `START HERE`                         | Comment naviguer dans le dépôt sans créer un parcours parallèle |
|    02 | [02-OU-CHERCHER-DE-L-AIDE.md](02-OU-CHERCHER-DE-L-AIDE.md)               | `00-SOCLE/01-GETTING-STARTED/README.md`                            | Premier blocage de plus de trente minutes  | Où chercher de l'aide, dans quel ordre, avant d'appeler une IA  |
|    03 | [03-NODE_VERSION.md](03-NODE_VERSION.md)                                 | `00-SOCLE/01-GETTING-STARTED/README.md`                            | Jour de l'installation                     | La version de Node supposée par tout le dépôt                   |
|    04 | [`04-TECH-ILA/`](04-TECH-ILA/README.md)                                  | Jalons indiqués par TECH-ILA et les modules concernés              | Compagnon intégré, selon le jalon          | Relier les mécanismes aux technologies réelles                  |
|    05 | [05-UNIVERS_AUTORISES.md](05-UNIVERS_AUTORISES.md)                       | `00-SOCLE/02-PROLOGUE/04-rules-of-the-game.md`                     | Avant le premier exemple                   | La liste blanche des univers narratifs                          |
|    06 | [06-DEV_JOURNAL_HEBDO.md](06-DEV_JOURNAL_HEBDO.md)                       | `00-SOCLE/03-REFERENTIEL/README.md`                                | Fin de la première semaine                 | Le rituel de journal de progression                             |
|    07 | [08-ROADMAP-rythmes.md](08-ROADMAP-rythmes.md)                           | `01-CADRAGE/02A-RETRO-BLOC-1-CADRAGE.md`                           | Première rétro de bloc                     | Les rythmes de parcours et leur changement                      |
|    08 | [09-CONTRADICTEUR.md](09-CONTRADICTEUR.md)                               | `02-CONSTRUCTION/16-DDD-CONTRATS/07-expliquer_cqrs_a_3_publics.md` | Première défense d'une décision            | Le protocole d'objection réutilisable                           |
|    09 | [10-SIMULATION-ENTREPRISE.md](10-SIMULATION-ENTREPRISE.md)               | `02-CONSTRUCTION/16-DDD-CONTRATS/README.md`                        | Premier contexte supposant une équipe      | Les simulations d'architecture, finance et astreinte            |
|    10 | [11-PEREMPTION-2027.md](11-PEREMPTION-2027.md)                           | `03-PILOTAGE/07-CLOUD-FOUNDATIONS/README.md`                       | Ouverture du module le plus périssable     | Ce qui doit être re-vérifié et quand                            |
|    11 | [12-COMMUNAUTE.md](12-COMMUNAUTE.md)                                     | `05-MAITRISE/06-ANNEXES/14-portfolio_publication.md`               | Au moment de publier                       | Publication et contradiction publique                           |
|    12 | [13-ANNEXE-perennite.md](13-ANNEXE-perennite.md)                         | `05-MAITRISE/06-ANNEXES/18-PERISSABILITE.md`                       | Après la grille intemporel/périssable      | La doctrine de pérennité                                        |
|    13 | [14-EPILOGUE.md](14-EPILOGUE.md)                                         | `05-MAITRISE/02A-RETRO-BLOC-5-MAITRISE.md`                         | Rétro finale                               | La sortie du fil                                                |
|    14 | [15-ANNEXE-et-apres.md](15-ANNEXE-et-apres.md)                           | `05-MAITRISE/02A-RETRO-BLOC-5-MAITRISE.md`                         | Après l'épilogue                           | La suite du parcours après le dépôt                             |
|    15 | [`17-PREUVES-MODELES/`](17-PREUVES-MODELES/README.md)                    | `04-EPREUVE/05-CAPSTONE-ARENA/00-PREREQUIS.md` et modules Staff    | Avant la première preuve Staff             | Modèles et critères de refus des livrables                      |
|    16 | [17A-PROTOCOLE-DONNEE-SOURCEE.md](17A-PROTOCOLE-DONNEE-SOURCEE.md)       | `03-PILOTAGE/07-CLOUD-FOUNDATIONS/06A-BUDGET-CLOUD.md`             | Premier livrable chiffré                   | Relevé daté et sourcé                                           |
|    17 | [`19-PRODUIT-IA-REFERENCE/`](19-PRODUIT-IA-REFERENCE/README.md)          | `04-EPREUVE/05-CAPSTONE-ARENA/06-addendum-staff-engineer.md`       | Quand une preuve S6 de référence est utile | Laboratoire IA de référence, évaluable sans clé LLM             |

## Hors ordre d'appel

Le `README.md` courant, `LICENSE`, `99-ASSETS-NON-LECTURE/` et [04A-CARTE-DU-PARCOURS.md](04A-CARTE-DU-PARCOURS.md) sont des infrastructures de navigation ou de licence. Ils ne sont pas des annexes déclenchées par une étape et ne reçoivent donc pas d'identifiant d'appel.

La carte `04A-CARTE-DU-PARCOURS.md` reste volontairement distincte de l'index d'annexes : elle décrit le parcours global, tandis que cet index explique **quand ouvrir une annexe**.

## Audit de numérotation

Le trou apparent `04-` dans `05-MAITRISE` est **intentionnel** : aucun module `04-*` n'est
référencé par le palier, son README, ni les références du dépôt. Le renuméroter casserait la
traçabilité historique pour un bénéfice nul.

Les séquences internes comme `00, 01, 02, 03, 04, 05, 06, 08` dans les mini-projets sont
également intentionnelles : `07` correspond à une étape réservée à des preuves ou à une étape
non matérialisée en fichier, tandis que `08-POSTMORTEM` clôt le cycle.

Le seul trou de navigation réellement incohérent de cette famille était le `01` absent dans
`06-ANNEXES-TRANSVERSES`. Il est maintenant comblé par un document de navigation réel.

## Gouvernance du parcours vivant

Ces trois pièces ne créent pas une progression parallèle. Elles prolongent les mécanismes existants :

- [42-MESURE-IMPACT-PARCOURS.md](42-MESURE-IMPACT-PARCOURS.md) : mesurer la valeur du parcours sans promettre de causalité ou d'employabilité.
- [43-PONT-PREUVE-TERRAIN.md](43-PONT-PREUVE-TERRAIN.md) : convertir progressivement les simulations et preuves AF en preuves terrain.
- [44-REGISTRE-MAINTENANCE-ANNUELLE.md](44-REGISTRE-MAINTENANCE-ANNUELLE.md) : maintenir les 104 contenus périssables sans réauditer tout le corpus chaque année.

Elles sont des supports de gouvernance et de maturation, pas des créneaux obligatoires supplémentaires du CORE.

## Gouvernance V16 : nouveaux gates

- [46-MARKET-EVIDENCE-REGISTER.md](46-MARKET-EVIDENCE-REGISTER.md) : benchmark du marché et des postings.
- [47-AI-RESILIENCE-BENCHMARK.md](47-AI-RESILIENCE-BENCHMARK.md) : mesure humain / IA / agent.
- [48-EXTERNAL-REVIEW-GATE.md](48-EXTERNAL-REVIEW-GATE.md) : revue indépendante et à l'aveugle.
- [49-TERRAIN-MATURITY-GATE.md](49-TERRAIN-MATURITY-GATE.md) : distinction T0→T4 entre simulation et expérience.
- [50-INCIDENT-COMMANDER-GATE.md](50-INCIDENT-COMMANDER-GATE.md) : épreuve intégratrice incident + sécurité + coût + produit + leadership.

Ces gates n'ajoutent pas une nouvelle spécialisation. Ils renforcent la **preuve**, la **traçabilité** et la **gouvernance** du curriculum existant.

## Orientation

[00-GUIDE.md](00-GUIDE.md) est une pièce d'orientation placée avant le parcours. Elle ne crée pas
une progression parallèle et ne compte pas comme une étape CORE. Elle sert à donner le contexte
nécessaire avant le premier passage dans `00-SOCLE/02-PROLOGUE`.

## Standards terrain V16 final

- `46-MARKET-EVIDENCE-REGISTER.md` - evidence marché
- `47-AI-RESILIENCE-BENCHMARK.md` - benchmark humain / IA / agent
- `48-EXTERNAL-REVIEW-GATE.md` - revue externe
- `49-TERRAIN-MATURITY-GATE.md` - niveau de preuve terrain
- `50-INCIDENT-COMMANDER-GATE.md` - incident sous pression
- `51-TERRAIN-STARTER-PACK.md` - sortie concrète vers l'extérieur
