---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [defaut_cache, regression]
anti_recipe_key: defaut_cache+regression
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Garo :** la règle est simple jusqu'au jour où un état caché traverse une frontière. À partir de là, le “petit raccourci” devient le Horror qui te poursuit pendant trois heures.

# 00 : Smell detection

Temps de lecture ~5 min

> **Principe universel** : refactorer sans détecter les smells = déplacer la poussière.

## Catalogue (extrait)

| Smell                     | Signe                                                | Refacto canonique      |
| ------------------------- | ---------------------------------------------------- | ---------------------- |
| **Long function**         | > 40 lignes, plusieurs verbes dans le nom            | Extract function       |
| **Feature envy**          | Méthode qui utilise + les données d'une autre classe | Move method            |
| **Primitive obsession**   | `string` partout pour un `Email`, `UserId`           | Value object           |
| **Data clumps**           | Mêmes 3-4 params dans plusieurs fonctions            | Parameter object       |
| **Shotgun surgery**       | Un petit changement touche 10 fichiers               | Consolidate            |
| **Divergent change**      | 1 classe modifiée pour N raisons différentes         | Split responsibilities |
| **Comments as deodorant** | Long commentaire pour "expliquer" du code obscur     | Renomme, extrait       |
| **Boolean flag param**    | `send(true)` → devinette                             | Split en 2 fonctions   |

## Exercice : repérage guidé

Ouvre `00-SOCLE/04-FUNDAMENTALS/03_functions/` (ou n'importe quel module dense).

- Trouve **3 smells** dans le code d'exercices/solutions.
- Pour chacun : nomme le smell, propose le refacto, écris pourquoi.

Livrable : `SMELLS.md`.

## (attention) Piège

Refacto par plaisir esthétique. Non. **Un smell + un test qui protège + un refacto ciblé**.

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.
