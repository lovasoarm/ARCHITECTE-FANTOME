---
stability: intemporel
acte: pilotage
noyau: oui
cognitive_level: L4
perturbation_modes: [defaut_cache, solution_concurrente]
anti_recipe_key: defaut_cache+solution_concurrente
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : finale au stade :** 99,9 % de disponibilité sur un slide ne sauve personne à 03:17 quand le service hurle. La vraie compétence commence quand il faut transformer la métrique en décision.

# Injection de panne : la résilience se joue au geste

Temps de lecture ~2 min

La leçon [06-panne_subie_sur_fil_rouge.md](06-panne_subie_sur_fil_rouge.md) tire au sort.
Celle-ci **injecte** : tu casses un composant **volontairement**, tu mesures, tu répares.
Lire un runbook n'est pas cet exercice.

À brancher aussi sur : boss fight IA (quota / latence ×10 / hors format),
[07-semaine-double-derive.md](../../04-EPREUVE/05-CAPSTONE-ARENA/07-semaine-double-derive.md),
simulation astreinte ([10-SIMULATION-ENTREPRISE.md](../../06-ANNEXES-TRANSVERSES/10-SIMULATION-ENTREPRISE.md)).
Si ton fil rouge a plusieurs services qui dépendent l'un de l'autre (pas seulement des
dépendances internes comme la base ou le disque), l'exercice symétrique existe :
[`05-MAITRISE/02-SCALABILITY/10-c_tests_de_resilience.md`](../../05-MAITRISE/02-SCALABILITY/10-c_tests_de_resilience.md)
mesure si la panne d'un service dépendant contamine les autres : angle que celui-ci ne
couvre pas, parce qu'il porte sur un seul système.

## Pré-requis

Fil rouge déployé en local ou prod-like. `SLO.md` déjà rédigé. Chronomètre. Un
`traceId` par requête.

## Les trois injections (dans l'ordre, une à la fois)

|   # | Geste                                                  | Ce que tu casses          | Succès                                                                            |
| --: | ------------------------------------------------------ | ------------------------- | --------------------------------------------------------------------------------- |
|   1 | Couper le listener / la base de lecture                | une dépendance de lecture | l'UI affiche un état dégradé, pas une page blanche ; écritures refusées avec ETA  |
|   2 | Injecter 10× la latence (proxy, sleep, flag)           | le chemin critique        | timeout respecté ; fallback ; SLO produit tenu si le contrat dégradé est conforme |
|   3 | Remplir disque **ou** ouvrir le disjoncteur IA à 100 % | stockage ou budget modèle | **zéro** écriture silencieuse ; alerte ; coût modèle = 0 pendant le disjoncteur   |

Interdit : commenter le code « comme si » la panne avait lieu. Interdit : seulement tuer
le process Node et dire « ça a crashé ».

## Mesures (même tableau à chaque fois)

`heure_inject | symptôme utilisateur | premier signal (log/alerte) | hypothèse | geste | RTO chrono | coût pendant la panne`

RTO = aiguille en main, de l'injection au premier parcours critique **réussi** (y compris
dégradé conforme).

## Rendu

`INJECTION-<date>.md` + extraits de traces. Pièce S3. Sans les trois lignes du tableau,
l'exercice n'a pas eu lieu.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.
