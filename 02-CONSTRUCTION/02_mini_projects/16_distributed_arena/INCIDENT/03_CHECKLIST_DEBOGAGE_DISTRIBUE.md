---
stability: intemporel
acte: appliquer
---

# CHECKLIST : DÉBOGAGE DISTRIBUÉ, SYMPTÔME VS CAUSE RACINE À L'ÉCHELLE D'UN CLUSTER

Temps de lecture ~5 min

Cette checklist n'existe nulle part ailleurs dans ce dépôt. Elle prolonge
`01-CADRAGE/03_debugging/02_debug_methodology.md` (reproduire, isoler, corriger, vérifier) pour
le cas où le bug n'est pas dans un programme mais dans la conversation entre plusieurs
programmes. Le process en quatre étapes ne change pas. Ce qui change, c'est ce qu'"isoler"
veut dire quand la reproduction dépend de l'ordre d'arrivée des messages entre machines.

## Pourquoi la méthode mono-programme ne suffit pas

```
mono-programme : le bug est dans UNE pile d'appels, un seul historique d'exécution.
                  reproduire = rejouer la même entrée.

cluster        : le bug est dans l'ENTRELACEMENT de plusieurs piles d'appels.
                  reproduire = rejouer la même entrée ET le même ordre d'arrivée
                  ET la même latence relative entre les noeuds.
```

Un stack trace unique ne raconte jamais l'histoire complète : il montre où UN noeud a cassé,
jamais ce que les autres noeuds pensaient de l'état du système à ce moment-là.

## LE PROCESS EN QUATRE ÉTAPES, VERSION CLUSTER

```
ÉTAPE 1 : REPRODUIRE
 Fixe le seed, fixe l'ordre d'arrivée des messages, fixe le noeud qui tombe et le tick où
 il tombe. Sans horloge logique déterministe (tick, pas Date.now()), tu ne rejoueras
 jamais deux fois le même incident.

ÉTAPE 2 : ISOLER PAR CORRÉLATION
 Rassemble toutes les lignes de log qui partagent le même trace-id, sur tous les noeuds,
 triées par tick logique. Ignore tout le reste. Un incident distribué se lit sur la
 diagonale trace-id x tick, jamais sur un seul fichier de log.

ÉTAPE 3 : CORRIGER UNE HYPOTHÈSE À LA FOIS
 Une hypothèse porte sur UN mécanisme (idempotence, ordre, timeout, quorum), jamais sur
 "le réseau" en général. "Le réseau a un problème" n'est pas réfutable, donc pas une
 hypothèse valide au sens de `01-CADRAGE/03_debugging/05_hypothesis_driven_debug.md`.

ÉTAPE 4 : VÉRIFIER SUR PLUSIEURS REJEUX
 Un fix distribué qui passe une fois n'est pas vérifié. Rejoue le scénario 10 fois avec
 le même seed puis avec des seeds voisins qui déplacent le tick de panne d'une unité :
 si le fix ne tient que sur le tick exact observé, ce n'est pas un fix, c'est un pansement.
```

## TABLEAU SYMPTÔME VS CAUSE RACINE

| Symptôme observé au niveau cluster | Cause racine probable | Où regarder en premier |
| --- | --- | --- |
| Le total final est plus grand que prévu | Retry sans clé d'idempotence stable, ou clé recalculée à chaque tentative (`Date.now()`) | Logs du worker autour du dernier ACK manquant, comparer `opKey` entre tentative 1 et 2 |
| Le total final est plus petit que prévu | Message perdu sans retry, ou retry abandonné après un nombre fixe de tentatives trop bas | Logs du coordinateur : cherche un `trace-id` présent côté worker mais absent côté coordinateur |
| Deux noeuds ont deux valeurs différentes du même total | Partition réseau non détectée : chaque côté a continué à écrire seul (split-brain) | Fenêtre temporelle où les deux noeuds cessent de s'échanger des messages ; vérifie le mécanisme de quorum |
| Un worker semble "bloqué" alors que le coordinateur l'a bien reçu | Le worker attend un ACK qui est bien parti mais que lui n'a jamais lu (timeout mal calibré) | Compare le tick d'émission de l'ACK côté coordinateur au tick de timeout côté worker |
| Le bug disparaît quand on ajoute des logs ou qu'on ralentit l'exécution | Race condition sensible au timing réel, pas à la logique : symptôme d'heisenbug distribué | Rejoue avec horloge logique fixe (tick), jamais avec `Date.now()`, pour retirer le timing réel de l'équation |
| Le même trace-id apparaît deux fois côté coordinateur avec deux valeurs différentes | Deux workers ont généré la même clé d'idempotence par collision (ex. `Date.now()` en ms) | Vérifie la stratégie de génération de clé, pas la logique d'application |
| Tout est vert en local, l'incident n'apparaît qu'en environnement à N réels noeuds | Le test local exécute tout dans le même process, donc dans un seul ordre total ; la vraie distribution introduit des entrelacements que le local ne peut pas produire | N'utilise jamais un test mono-process comme preuve de correction d'un système distribué |

## RÈGLE DE CLÔTURE

Tu n'as le droit de fermer un incident distribué que si tu peux répondre aux trois questions
suivantes avec un tick précis, pas une impression :

1. Quel est le premier tick où l'état a divergé de ce qui était attendu ?
2. Quel trace-id relie ce tick à sa cause, sur quel(s) noeud(s) ?
3. Quel test rejoué à seed fixe prouve que ce tick ne diverge plus ?

Si tu ne peux répondre à aucune des trois, tu n'as pas trouvé la cause racine : tu as trouvé un
endroit où le symptôme est devenu visible.
