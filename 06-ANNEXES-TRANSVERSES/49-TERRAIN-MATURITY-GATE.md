---
stability: stable
type: gate
---

# 49 - TERRAIN MATURITY GATE

## Niveaux

```text
T0 - SIMULATION
le système et ses conséquences sont contrôlés

T1 - PROJET VIVANT
le système fonctionne réellement, mais la dépendance externe est faible

T2 - UTILISATEURS EXTERNES
des personnes hors du projet l'utilisent

T3 - OPEN SOURCE / MISSION / CLIENT
un tiers peut accepter, refuser, demander ou prioriser

T4 - PRODUCTION SUIVIE
le système reste en usage avec maintenance et conséquences réelles
```

## Ce que chaque niveau prouve

```text
T0 -> capacité de simulation
T1 -> capacité d'exécution
T2 -> capacité d'écoute et d'adaptation
T3 -> capacité de travailler sous contrainte externe
T4 -> capacité d'ownership (responsabilité durable d'un système)
```

## Règle de langage

```text
T0/T1 : préparation
T2     : preuve externe utile
T3     : preuve terrain crédible
T4     : expérience de système vivant
```

Ne jamais appeler T0/T1 "expérience professionnelle".

## Minimum recommandé pour les preuves de haut niveau

```text
BOSS / CAPSTONE
      |
      v
T2 OU T3
      |
      v
T4 quand le contexte le permet
```
