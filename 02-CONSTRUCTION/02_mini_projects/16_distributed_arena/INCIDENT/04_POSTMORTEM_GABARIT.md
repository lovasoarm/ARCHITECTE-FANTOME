---
stability: intemporel
acte: appliquer
---

# GABARIT POSTMORTEM : INCIDENT DISTRIBUÉ (À REMPLIR)

Temps de lecture ~2 min

Ce gabarit est spécifique à l'incident simulé dans `01_scenario_panne.js`. Une fois rempli, il
part dans ton dossier de preuves à côté de `02-CONSTRUCTION/02_mini_projects/16_distributed_arena/POSTMORTEM.md`
(le postmortem générique du projet). Les deux sont complémentaires : celui-ci documente l'incident,
l'autre documente le projet dans son ensemble.

## Identification

- Seed rejoué :
- Trace-id(s) impliqué(s) :
- Tick(s) où l'état a divergé (voir checklist, règle de clôture) :

## Chronologie factuelle (une ligne par événement de log pertinent)

```
tick | noeud | événement
```

## Cause racine (pas le symptôme)

- Symptôme observé en premier :
- Mécanisme réel en cause (idempotence, ordre, timeout, quorum, autre) :
- Pourquoi le symptôme et la cause ne sont pas au même endroit :

## Ce que la checklist symptôme vs cause racine a permis de trouver plus vite

(à remplir) : quelle ligne du tableau t'a mis sur la piste, et en combien de temps.

## Correctif et preuve de non-régression

- Correctif appliqué :
- Rejeu à seed fixe qui prouve la correction :
- Rejeu à seeds voisins (tick de panne décalé) pour prouver que ce n'est pas un pansement :

## Ce que ça aurait coûté en vrai cluster

(à remplir) : si ce total était de l'argent, des commandes, ou des messages utilisateur, quel
aurait été l'impact au tick où la divergence s'est produite.
