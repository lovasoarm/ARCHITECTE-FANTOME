---
stability: intemporel
acte: pilotage
noyau: oui
cognitive_level: L3
perturbation_modes: [defaut_cache, regression]
anti_recipe_key: defaut_cache+regression
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : finale au stade :** 99,9 % de disponibilité sur un slide ne sauve personne à 03:17 quand le service hurle. La vraie compétence commence quand il faut transformer la métrique en décision.

# Reprise : RPO, RTO, et la restauration que tu n'as jamais faite

<!-- AF-DIAGRAM:rto_rpo -->

```text
text
Incident
│<──── RTO : délai maximal de reprise ────>│
│
└─<── RPO : perte maximale de données ──>│
```

RTO mesure le temps acceptable avant reprise ; RPO mesure la quantité de données acceptable à perdre.

Temps de lecture ~8 min

## 1) LES DEUX NOMBRES

- **RPO** : combien de données tu acceptes de perdre, en temps. Sauvegarde horaire → RPO = 1 h.
- **RTO** : en combien de temps le service est revenu. Se mesure au chronomètre, pas sur le papier.

## 2) UNE SAUVEGARDE NON RESTAURÉE N'EXISTE PAS

Le seul exercice qui compte : sur une machine vide, à partir de ta sauvegarde et de ta documentation,
remonter le service. Chronomètre lancé au début, arrêté quand une requête réelle réussit.

Ce que cet exercice révèle systématiquement : un secret absent de la sauvegarde, une migration de
schéma non rejouable, une dépendance externe non documentée, et une commande que tu croyais connaître.

## 3) LES TROIS COPIES

Trois copies, deux supports, une hors site : et une copie **immuable** que ton propre compte
administrateur ne peut pas effacer. Une sauvegarde supprimable par l'incident qu'elle doit couvrir
n'est pas une sauvegarde.

## 4) LE TABLEAU À REMPLIR

| Donnée                  | Volume | RPO visé | RPO réel | RTO visé | RTO mesuré | Date du test |
| ----------------------- | ------ | -------- | -------- | -------- | ---------- | ------------ |
| base principale         |        |          |          |          |            |              |
| fichiers utilisateurs   |        |          |          |          |            |              |
| secrets / configuration |        |          |          |          |            |              |

## Exercice (30 min)

Fais la restauration. Remplis le tableau avec des valeurs **mesurées**. Écris les trois choses qui
t'ont manqué. Rends la section 4 de `SLO.md`.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.
