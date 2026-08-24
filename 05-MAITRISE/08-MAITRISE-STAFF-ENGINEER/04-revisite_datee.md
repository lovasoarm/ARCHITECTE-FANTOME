---
stability: intemporel
acte: maitrise
noyau: oui
cognitive_level: L9
perturbation_modes: [constraints_injectees, regression]
anti_recipe_key: constraints_injectees+regression
transfer_distance: high
assessment_role: staff_mastery
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# La revisite datée : ce qui sépare un dossier d'une photo

Temps de lecture ~2 min

Durée : 45 min à écrire, 3 h à jouer plus tard.

## Le principe

Un dossier décrit un système à un instant. Un ingénieur se juge sur ce qu'il fait quand la réalité a
bougé. Tu fixes donc, aujourd'hui, la date à laquelle tu rouvriras ton propre dossier.

## Les trois dates à écrire maintenant

| Échéance | Ce que tu rejoues                                 | Critère de réussite                                    |
| -------- | ------------------------------------------------- | ------------------------------------------------------ |
| J+30     | relevé tarifaire refait, budget recalculé         | écart au budget < 20 %, sinon explication              |
| J+90     | restauration réelle rechronométrée, SLO recalculé | RTO tenu, budget d'erreur documenté                    |
| J+180    | les trois tensions réexaminées                    | au moins une a changé de camp, ou le seuil est atteint |

## Le protocole de revisite

1. Relis le dossier **sans** rien corriger, et note en marge chaque phrase devenue fausse.
2. Pour chaque phrase fausse : est-ce le monde qui a changé, ou l'affirmation qui était fausse dès le
   départ ? La deuxième catégorie est la seule qui t'apprend quelque chose.
3. Écris `REVISITE-<date>.md` : ce qui a tenu, ce qui a cassé, ce que tu ne referais pas.
4. Mets à jour les chiffres, jamais l'historique. On n'efface pas une prévision ratée : on l'annote.

## Le critère qui compte

Un dossier revisité une fois vaut trois dossiers neufs. La compétence prouvée n'est pas d'avoir eu
raison : c'est d'avoir su à quel moment tu avais eu tort, et de l'avoir écrit.

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.
