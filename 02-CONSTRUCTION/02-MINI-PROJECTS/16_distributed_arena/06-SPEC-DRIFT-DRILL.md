---
stability: intemporel
acte: comprendre
cognitive_level: L5
perturbation_modes: [solution_concurrente, preuve_partielle]
anti_recipe_key: solution_concurrente+preuve_partielle
transfer_distance: medium
assessment_role: project_mastery
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# SPEC DRIFT : la specification change en cours de projet

Temps de lecture ~2 min

-> ~30 min sur ce fichier + relance du mini-projet

## Le principe

Sur un systeme distribue, une spec qui bouge **au milieu** est le cas
nominal, pas l'exception. Ce fichier reproduit cette experience
volontairement, pour t'entrainer a **encaisser un pivot de protocole
sans reperdre les invariants d'idempotence**.

Voir aussi : `../03_walking_dead_protocol/06-SPEC-DRIFT-DRILL.md` pour la version
originelle du drift mouvant.

## Le pivot impose

Tu as lance l'arena avec ces hypotheses initiales :

- N processus Node communiquent par HTTP local ;
- retry non idempotent bloque par un token uuid genere cote client ;
- une seule race condition deterministe a couvrir.

Nouvelle contrainte, imposee au milieu (ex : sprint J+2, apres que
2 noeuds tournent deja en boucle stable) :

- passage force a une communication **par append-only log partage** au
  lieu d'HTTP direct entre pairs ;
- l'ordre des messages **n'est plus garanti** entre pairs (mais l'est
  au sein d'un meme pair) ;
- N nouveaux modes de panne apparaissent : message dupliquer, message
  livre en desordre, message livre apres un `kill -9` puis restart.

## Ce qu'on attend de toi

1. **Ne jette pas ton protocole HTTP**. Isole-le derriere une
   interface `Transport` : c'est ta protection contre le pivot.
2. **Ecris une ADR** dans `ADR/` : "impact du drift, ce que je garde de
   l'abstraction reseau, ce que je jette, pourquoi".
3. **Ecris une hypothese** dans `HYPOTHESES.md` local :
   - "je pense que passer au log casse mon token d'idempotence
     seulement dans le cas restart-apres-kill" ;
   - falsifie en < 2h par un test de repro qui envoie 2 messages
     identiques encadrant un `kill -9`.
4. **Journalise** dans `02-TDD-JOURNAL.md` chaque etape du pivot avec
   horodatage et cout mental (echelle 1-5).
5. **POSTMORTEM** en fin de sprint : ce que le pivot t'a appris sur le
   couplage cache entre transport et idempotence.

## Rappel gate securite

Avant de rediger le POSTMORTEM, **rejoue** la checklist
`04-SECURITY-GATE.md` : un changement de transport reseau ouvre presque
toujours une nouvelle surface (deserialisation, replay, poisoning du
log).

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?
