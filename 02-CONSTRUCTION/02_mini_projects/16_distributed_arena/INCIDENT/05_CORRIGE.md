---
stability: intemporel
acte: appliquer
---

# CORRIGÉ : LECTURE DE L'INCIDENT `01_scenario_panne.js`

Temps de lecture ~4 min

Ce corrigé montre comment appliquer la checklist (`03_CHECKLIST_DEBOGAGE_DISTRIBUE.md`) sur les
logs fournis (`02_logs_correles.md`), pour vérifier ta propre lecture avant de rédiger ton
postmortem.

## Étape 1 : reproduire

```
node 02-CONSTRUCTION/02_mini_projects/16_distributed_arena/INCIDENT/01_scenario_panne.js
```

Seed `20260416`, aucune source d'aléa réelle (pas de `Math.random()` non seedé, pas de
`Date.now()` dans la logique). Deux exécutions consécutives produisent des logs identiques à
l'octet près. Vérifie-le toi-même : lance le script deux fois et diff la sortie.

## Étape 2 : isoler par corrélation

Le seul trace-id qui porte un événement à surveiller est `w2-op5`. Les trois lignes qui le
concernent, triées par tick :

```
w2-op5 | t=17 | coordinator | ACK opKey=2:5 total=17
w2-op5 | t=18 | worker-2   | ACK perdu (réseau), retry avec opKey identique=2:5
w2-op5 | t=19 | coordinator | DUP rejetée opKey=2:5 (déjà appliquée)
```

## Étape 3 : hypothèse

Hypothèse réfutable : "le total final sera correct (36) parce que le retry du worker 2 réutilise
la même `opKey` que sa première tentative, et le coordinateur déduplique sur cette clé."

Expérience qui réfute ou confirme : lire la valeur de `total` à la dernière ligne. Elle affiche
`36`. Hypothèse confirmée.

## Étape 4 : vérifier sur plusieurs rejeux

Modifie `KILL_AT_TICK` ou retire la ligne `coordinatorReceive` du retry pour casser
volontairement la dédup, relance : le total observé passe à `37`, alors que `expected` reste
`36`. C'est la preuve, par contraste, que la dédup est bien ce qui protège le total, et non un
hasard d'exécution.

## Application de la checklist

| Ligne de la checklist utilisée | Constat |
| --- | --- |
| "Le total final est plus grand que prévu -> retry sans clé stable" | Ne s'applique pas ici : la clé est stable, le total est correct. Sert de garde-fou négatif. |
| Règle de clôture, question 1 | Aucun tick ne diverge : `total` suit exactement `expected` à chaque étape observable. |
| Règle de clôture, question 2 | `w2-op5` est le seul trace-id à activité multiple ; il ne relie à aucune divergence, seulement à une résilience démontrée. |
| Règle de clôture, question 3 | Le rejeu à seed fixe (`20260416`) plus le rejeu avec dédup désactivée (contre-preuve) suffisent à clore. |

## Conclusion pédagogique

Cet incident n'est pas un bug caché à trouver : c'est un exemple de panne partielle correctement
absorbée par le design (idempotence par clé). Le vrai exercice est de savoir lire les logs
corrélés pour ne PAS crier au bug là où le système a fait ce qu'on lui a demandé, et de savoir
reconnaître, en modifiant une ligne, à quoi ressemblerait le même incident si la protection
n'existait pas. C'est cette différence, visible en un diff de log, qui distingue un dev qui
panique d'un dev qui diagnostique.
