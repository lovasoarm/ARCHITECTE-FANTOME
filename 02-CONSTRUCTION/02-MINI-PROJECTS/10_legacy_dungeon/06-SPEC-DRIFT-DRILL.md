---
stability: intemporel
acte: comprendre
cognitive_level: L5
perturbation_modes: [fausse_piste, transmission]
anti_recipe_key: fausse_piste+transmission
transfer_distance: medium
assessment_role: project_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# SPEC DRIFT : la specification change en cours de projet

Temps de lecture ~2 min

-> ~30 min sur ce fichier + relance du mini-projet

## Le principe

En vrai, la spec ne bouge jamais "avant" que tu commences. Elle bouge
**au milieu**, apres que tu as deja pris des decisions, cartographie du
code herite, ecrit ton premier ADR. Ce fichier reproduit cette
experience volontairement pour ce mini-projet, pour t'entrainer a
**encaisser un pivot sans jeter ta cartographie**.

Voir aussi : `../03_walking_dead_protocol/06-SPEC-DRIFT-DRILL.md` pour la version
originelle du drift mouvant.

## Le pivot impose

Tu as clone le dungeon avec ces hypotheses initiales :

- tu cartographies la codebase existante (MAP.md) ;
- tu corriges **un** bug isole reproduit par un test unitaire ;
- tu documentes **une** decision d'architecture deduite apres coup.

Nouvelle contrainte, imposee au milieu (ex : sprint J+2, apres que
MAP.md est stable) :

- le bug initial n'est **pas** le vrai bug : c'est un symptome d'une
  regression de perf sur un chemin chaud (10x plus lent depuis 3 mois) ;
- tu dois livrer un **patch minimal** qui restaure la perf **sans**
  refactor global ;
- tu dois documenter **deux** decisions d'architecture : celle deduite
  du code initial, et celle que ce pivot t'oblige a prendre.

## Ce qu'on attend de toi

1. **Ne jette pas ta MAP.md**. Annote-la : quels noeuds du graphe le
   pivot rend obsoletes, lesquels restent valables.
2. **Ecris une ADR** dans `ADR/` : "impact du drift, ce que je garde de
   la cartographie, ce que je jette, pourquoi".
3. **Ecris une hypothese** dans `HYPOTHESES.md` local :
   - "je pense que la regression vient de X, falsifiable par un
     benchmark simple avant/apres commit Y" ;
   - falsifie en < 2h par un test de repro.
4. **Journalise** dans `02-TDD-JOURNAL.md` chaque etape du pivot avec
   horodatage et cout mental (echelle 1-5).
5. **POSTMORTEM** en fin de sprint : ce que le pivot t'a appris sur la
   difference entre "lire du code" et "diagnostiquer du code".

## Rappel gate securite

Avant de rediger le POSTMORTEM, **rejoue** la checklist
`04-SECURITY-GATE.md` : un pivot en cours de route peut avoir introduit une
surface d'exposition qui n'existait pas au premier passage.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.
