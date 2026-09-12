---
stability: intemporel
acte: restituer
---

# 06-ANNEXES-TRANSVERSES

Porte d'entrée du dossier. Une annexe n'est pas un chapitre : c'est une pièce appelée par un module précis du fil, à un moment précis.

L'index ci-dessous est la **carte canonique d'utilisation des annexes**. La colonne **Repère** correspond au préfixe canonique du fichier ; la colonne **Fichier** indique le chemin canonique. Elle sert à retrouver rapidement la pièce appelée au fil du parcours. Il ne constitue pas une progression parallèle et ne remplace pas `PROGRESSION.md`.

## Index par repère canonique

| Repère | Fichier canonique                                                        | Module déclencheur                                                 | Moment d'ouverture                         | Ce que ça débloque                                              |
| ----: | ------------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------ | --------------------------------------------------------------- |
|    00 | [00-GUIDE.md](00-GUIDE.md)                                               | Accueil du dépôt                                                   | Avant le parcours, si besoin               | Orientation, métiers, marché, trajectoire et 2035+              |
|    01 | [01-COMMENT-UTILISER-LE-PARCOURS.md](01-COMMENT-UTILISER-LE-PARCOURS.md) | Après `00-GUIDE.md`                                                | Avant `START HERE`                         | Comment naviguer dans le dépôt sans créer un parcours parallèle |
|    02 | [02-OU-CHERCHER-DE-L-AIDE.md](02-OU-CHERCHER-DE-L-AIDE.md)               | `00-SOCLE/01-GETTING-STARTED/README.md`                            | Premier blocage de plus de trente minutes  | Où chercher de l'aide, dans quel ordre, avant d'appeler une IA  |
|    03 | [03-NODE_VERSION.md](03-NODE_VERSION.md)                                 | `00-SOCLE/01-GETTING-STARTED/README.md`                            | Jour de l'installation                     | La version de Node supposée par tout le dépôt                   |
|    04 | [`04-TECH-ILA/`](04-TECH-ILA/README.md)                                  | Jalons indiqués par TECH-ILA et les modules concernés              | Compagnon intégré, selon le jalon          | Relier les mécanismes aux technologies réelles                  |
|    05 | [05-UNIVERS_AUTORISES.md](05-UNIVERS_AUTORISES.md)                       | `00-SOCLE/02-PROLOGUE/04-rules-of-the-game.md`                     | Avant le premier exemple                   | La liste blanche des univers narratifs                          |
|    06 | [06-DEV_JOURNAL_HEBDO.md](06-DEV_JOURNAL_HEBDO.md)                       | `00-SOCLE/03-REFERENTIEL/README.md`                                | Fin de la première semaine                 | Le rituel de journal de progression                             |
|    08 | [08-ROADMAP-rythmes.md](08-ROADMAP-rythmes.md)                           | `01-CADRAGE/02A-RETRO-BLOC-1-CADRAGE.md`                           | Première rétro de bloc                     | Les rythmes de parcours et leur changement                      |
|    09 | [09-CONTRADICTEUR.md](09-CONTRADICTEUR.md)                               | `02-CONSTRUCTION/16-DDD-CONTRATS/07-expliquer_cqrs_a_3_publics.md` | Première défense d'une décision            | Le protocole d'objection réutilisable                           |
|    10 | [10-SIMULATION-ENTREPRISE.md](10-SIMULATION-ENTREPRISE.md)               | `02-CONSTRUCTION/16-DDD-CONTRATS/README.md`                        | Premier contexte supposant une équipe      | Les simulations d'architecture, finance et astreinte            |
|    11 | [11-PEREMPTION-2027.md](11-PEREMPTION-2027.md)                           | `03-PILOTAGE/07-CLOUD-FOUNDATIONS/README.md`                       | Ouverture du module le plus périssable     | Ce qui doit être re-vérifié et quand                            |
|    12 | [12-COMMUNAUTE.md](12-COMMUNAUTE.md)                                     | `05-MAITRISE/06-ANNEXES/14-portfolio_publication.md`               | Au moment de publier                       | Publication et contradiction publique                           |
|    13 | [13-ANNEXE-perennite.md](13-ANNEXE-perennite.md)                         | `05-MAITRISE/06-ANNEXES/18-PERISSABILITE.md`                       | Après la grille intemporel/périssable      | La doctrine de pérennité                                        |
|    14 | [14-EPILOGUE.md](14-EPILOGUE.md)                                         | `05-MAITRISE/02A-RETRO-BLOC-5-MAITRISE.md`                         | Rétro finale                               | La sortie du fil                                                |
|    15 | [15-ANNEXE-et-apres.md](15-ANNEXE-et-apres.md)                           | `05-MAITRISE/02A-RETRO-BLOC-5-MAITRISE.md`                         | Après l'épilogue                           | La suite du parcours après le dépôt                             |
|    17 | [`17-PREUVES-MODELES/`](17-PREUVES-MODELES/README.md)                    | `04-EPREUVE/05-CAPSTONE-ARENA/00-PREREQUIS.md` et modules Staff    | Avant la première preuve Staff             | Modèles et critères de refus des livrables                      |
|   17A | [17A-PROTOCOLE-DONNEE-SOURCEE.md](17A-PROTOCOLE-DONNEE-SOURCEE.md)       | `03-PILOTAGE/07-CLOUD-FOUNDATIONS/06A-BUDGET-CLOUD.md`             | Premier livrable chiffré                   | Relevé daté et sourcé                                           |
|    19 | [`19-PRODUIT-IA-REFERENCE/`](19-PRODUIT-IA-REFERENCE/README.md)          | `04-EPREUVE/05-CAPSTONE-ARENA/06-addendum-staff-engineer.md`       | Quand une preuve S6 de référence est utile | Laboratoire IA de référence, évaluable sans clé LLM             |

## Hors ordre d'appel

Le `README.md` courant, `LICENSE`, `99-ASSETS-NON-LECTURE/` et [04A-CARTE-DU-PARCOURS.md](04A-CARTE-DU-PARCOURS.md) sont des infrastructures de navigation ou de licence. Ils ne sont pas des annexes déclenchées par une étape et ne reçoivent donc pas d'identifiant d'appel.

La carte `04A-CARTE-DU-PARCOURS.md` reste volontairement distincte de l'index d'annexes : elle décrit le parcours global, tandis que cet index explique **quand ouvrir une annexe**.

## Supports transverses

Ces pièces ne créent pas une progression parallèle. Elles prolongent les mécanismes existants :

- [43-PONT-PREUVE-TERRAIN.md](43-PONT-PREUVE-TERRAIN.md) : convertir progressivement les simulations et preuves AF en preuves terrain.
- [48-EXTERNAL-REVIEW-GATE.md](48-EXTERNAL-REVIEW-GATE.md) : obtenir une contradiction indépendante et à l'aveugle.
- [49-TERRAIN-MATURITY-GATE.md](49-TERRAIN-MATURITY-GATE.md) : distinguer T0→T4 entre simulation et expérience.
- [50-INCIDENT-COMMANDER-GATE.md](50-INCIDENT-COMMANDER-GATE.md) : épreuve intégratrice incident + sécurité + coût + produit + leadership.
- [51-TERRAIN-STARTER-PACK.md](51-TERRAIN-STARTER-PACK.md) : préparer une sortie concrète vers l'extérieur.

Ces pièces renforcent la **preuve**, la **contradiction** et le **passage au terrain** ; elles ne créent pas une spécialisation supplémentaire.
## Orientation

[00-GUIDE.md](00-GUIDE.md) est une pièce d'orientation placée avant le parcours. Elle ne crée pas
une progression parallèle et ne compte pas comme une étape CORE. Elle sert à donner le contexte
nécessaire avant le premier passage dans `00-SOCLE/02-PROLOGUE`.

## Renforcement du terminal Staff

Le terminal Staff articule quatre contrôles complémentaires : spécification vérifiable, raisonnement organisationnel, ownership/migration et gouvernance de systèmes autonomes.

### Supports terrain

- `48-EXTERNAL-REVIEW-GATE.md` - revue externe
- `49-TERRAIN-MATURITY-GATE.md` - niveau de preuve terrain
- `50-INCIDENT-COMMANDER-GATE.md` - incident sous pression
- `51-TERRAIN-STARTER-PACK.md` - sortie concrète vers l'extérieur
