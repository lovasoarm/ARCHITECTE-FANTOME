## perishability_id: PER-0057

stability: perissable
acte: comprendre
review_due: 2027-12-31

---

> **SCÈNE CRAZYDEVS : finale au stade :** 99,9 % de disponibilité sur un slide ne sauve personne à 03:17 quand le service hurle. La vraie compétence commence quand il faut transformer la métrique en décision.

# PONT : de observer un système à collaborer avec des humains à l'artisanat en équipe

<!-- AF-DIAGRAM:observability -->

```text
text
                         System
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
           Logs         Metrics        Traces
             │             │             │
        events/text     trends/SLO    causality/path
```

Logs, métriques et traces donnent trois angles complémentaires pour reconstruire le comportement d’un système.

Temps de lecture ~2 min

-> ~10 min

> **ARRÊTE-TOI ICI.** Ce fichier est un point de passage obligé entre `03-PILOTAGE/05-OBSERVABILITY` et `03-PILOTAGE/10-TEAM-CRAFT`. Ne l'ouvre pas comme "encore un chapitre" : c'est un palier de respiration avant un saut de nature.

## POURQUOI CE PONT EXISTE

L'observabilité rend visible le comportement du code. `03-PILOTAGE/10-TEAM-CRAFT/` rend visible le comportement de l'équipe : revue de code, mentorat, désaccord technique, PR bloquante. Le principe est le même : ce qui n'est pas mesurable ne s'améliore pas.

## CE QUE TU MAÎTRISES DÉJÀ

- Instrumenter un service avec logs, metrics, traces.
- Repérer un SLI utile d'un vanity metric.
- Écrire un postmortem qui apprend, pas qui blâme.

## VOCABULAIRE NOUVEAU QUI ARRIVE

- **Revue de code** : un rituel de qualité, pas un tribunal.
- **RFC / ADR** : décision technique tracée par écrit.
- **Blameless postmortem** : chercher la cause, pas le coupable.
- **Bus factor** : combien de personnes doivent partir avant que le projet meure.

## LE PIÈGE MENTAL TYPIQUE DU SAUT

Traiter une PR comme un examen : "c'est bien ou c'est mal ?". Une revue utile pose des questions et propose des trade-offs, pas des verdicts.

## EXERCICE-CHARNIÈRE (5 min chrono)

Écris un commentaire de revue sur un code que tu n'aurais pas écrit comme ça. Deux versions : (a) verdictale ("c'est faux, refais"), (b) dialoguée ("j'aurais tenté X pour telle raison, qu'est-ce qui t'a fait choisir Y ?"). Compare les effets. `../10-TEAM-CRAFT/02-code_review.md`.

## SI TU BLOQUES

Relis le module précédent avant de continuer. Ce pont existe précisément parce que sauter cette marche brise beaucoup d'apprenants. Aucune honte à revenir.
