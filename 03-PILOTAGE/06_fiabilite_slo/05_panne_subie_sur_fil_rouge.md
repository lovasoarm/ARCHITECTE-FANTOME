---
stability: intemporel
gate: bloquante
acte: appliquer
---

# 05 : LA PANNE SUBIE, PAS LA PANNE RACONTÉE

Temps de réalisation : une demi-journée. Prérequis : [01_sli_slo_budget_erreur.md](01_sli_slo_budget_erreur.md), [03_reprise_rpo_rto.md](03_reprise_rpo_rto.md) et [04_degradation_disjoncteur.md](04_degradation_disjoncteur.md) lus, ton SLO déjà écrit, ton projet fil rouge qui tourne en local ou déployé.

> **Gate bloquante.** Le [challenge](challenge.md) de ce module, qui produit `SLO.md`, n'est pas considéré publié tant que cette épreuve n'a pas été rejouée et que son `POSTMORTEM.md` n'est pas signé. Un SLO jamais testé contre une vraie panne est une opinion, pas un engagement, exactement la même logique que `SECURITY_GATE.md` pour la sécurité dans [02-CONSTRUCTION/02_mini_projects](../../02-CONSTRUCTION/02_mini_projects/README.md).

L'exercice 3 de [04_degradation_disjoncteur.md](04_degradation_disjoncteur.md) t'a fait couper une dépendance et regarder ce qui se passe, 30 minutes, sans plus de formalité. Cette épreuve reprend ce geste et le pousse jusqu'au bout : un vrai chiffre de charge, une coupure sans préavis annoncé à l'avance, un chronomètre, un postmortem signé.

## Temps 1 : le test de charge, mesuré

Avant la panne, tu as besoin d'un état normal auquel comparer. Choisis un endpoint réel de ton fil rouge, celui que ton SLO couvre.

- Envoie une charge simple mais réelle (`autocannon`, `k6`, ou un script maison qui boucle des requêtes concurrentes suffit, l'outil n'est pas le point).
- Note trois chiffres avant toute panne : la latence p95, le taux d'erreur à froid, le débit maximal avant dégradation visible.
- Ces trois chiffres sont ta ligne de base. Sans eux, tu ne sauras jamais si ce qui suit est réellement une panne ou juste ton impression du moment.

## Temps 2 : la coupure, sans préavis

Choisis à l'avance, seul, une dépendance de ton fil rouge à couper : une base de données, un appel externe simulé, un service dont ton code dépend. Écris ton choix sur un papier ou dans un fichier que tu ne rouvres pas avant l'étape suivante, pour empêcher que la mémoire de ce que tu as prévu adoucisse ta propre surprise.

Puis, à un moment que tu ne planifies pas à la minute près (le lendemain, ou après une pause, pas immédiatement après avoir écrit le choix) : coupe-la. Lance le chronomètre à cet instant précis.

- Observe ce que voit un utilisateur réel : page blanche, erreur 500 brute, ou repli écrit qui tient comme promis en [04_degradation_disjoncteur.md](04_degradation_disjoncteur.md) ?
- Note l'instant où tu détectes toi-même la panne (pas l'instant où tu l'as provoquée : l'écart entre les deux est ton vrai temps de détection s'il n'y a pas d'alerte automatique).
- Restaure la dépendance. Arrête le chronomètre à la première requête utilisateur qui répond correctement, exactement le protocole de [03_reprise_rpo_rto.md](03_reprise_rpo_rto.md) section 2, pas au moment où tu penses avoir fini.

## Temps 3 : le postmortem, signé

Copie [05-MAITRISE/06_annexes/28_templates/POSTMORTEM.md](../../05-MAITRISE/06_annexes/28_templates/POSTMORTEM.md) dans ce dossier sous le nom `POSTMORTEM.md`, et remplis-le pour de vrai, sur cet incident que tu viens de vivre. Trois exigences au-delà du gabarit standard :

- La section Timeline cite les horaires réels du chronomètre, pas des horaires arrondis a posteriori.
- La section Impact compare le RTO mesuré au RTO que tu avais écrit dans `SLO.md` avant cette épreuve. Un écart n'est pas un échec : ne pas l'écrire en est un.
- La section Actions correctives contient au moins une action que tu peux réellement dater et tenir, pas un vœu générique du type "améliorer le monitoring".

## Verdict

- Ligne de base chiffrée avant la coupure, chronomètre déclenché au bon instant, écart RTO annoncé contre RTO mesuré nommé sans le maquiller, POSTMORTEM signé : gate franchie.
- Tu mesures le RTO depuis l'instant où tu as coupé la dépendance plutôt que depuis l'instant où tu l'as détectée : tu mesures ta rapidité à réparer ta propre panne planifiée, pas ta capacité réelle à détecter un incident inconnu. Refais la mesure en notant les deux instants séparément.
- Ton POSTMORTEM conclut que tout s'est bien passé sans écart à discuter : soit ton SLO était déjà trop prudent pour être un vrai engagement, soit tu n'as pas cherché l'écart. Un des deux mérite d'être écrit.
- Tu sautes le Temps 1 et compares ta panne à une impression au lieu d'un chiffre : refais le test de charge, cinq minutes suffisent, l'exercice entier perd sa valeur sans lui.

## ET APRÈS

Le [grimoire](grimoire.md) fige le vocabulaire, puis le [challenge](challenge.md) te fait produire `SLO.md`, désormais adossé à une panne réellement vécue plutôt qu'à un objectif jamais éprouvé.
