---
stability: intemporel
acte: évaluer
---

# 00 : Prereq check : Fiabilité, SLO, reprise
Temps de lecture ~5 min

> Tu ne dois **pas** entrer dans ce module si tu ne peux pas répondre à ces questions
> **sans regarder**. Ce n'est pas un test noté, c'est un filtre anti-illusion.
> Ces questions portent sur `03-PILOTAGE/05_observability`, le module que tu viens de finir.

## Questions

1. Différence entre un log, une métrique et une trace, en une phrase chacun ?
2. Pourquoi une alerte qui se déclenche cinquante fois par semaine finit par ne plus réveiller personne ?
3. Cite les trois piliers de l'observabilité et donne un exemple concret de chacun sur ton propre projet.
4. Qu'est-ce qu'une astreinte silencieuse, et pourquoi est-ce pire qu'aucune astreinte ?

## Calibration obligatoire : passer du flou au chiffre (10 min)

Les quatre questions ci-dessus vérifient des connaissances. Elles ne vérifient pas la seule chose qui compte pour entrer ici : savoir transformer une intention en promesse mesurable. C'est un saut de nature, pas de degré, et on peut cocher tout un prereq_check en restant incapable d'écrire la première ligne d'un `SLO.md`.

Transforme les trois phrases suivantes en promesses mesurables. Une promesse mesurable contient quatre choses : ce qui est mesuré, où c'est mesuré, le seuil chiffré, et la fenêtre de temps.

1. "Le site doit être rapide."
2. "On ne veut plus de coupures le week-end."
3. "La recherche doit rester utilisable même en pointe."

### Corrigé

1. "95 pour cent des chargements de la page de consultation, mesurés côté client, sous 1,5 seconde, sur 28 jours glissants."
2. "99,5 pour cent de disponibilité du parcours critique, mesurée par la sonde externe, sur les créneaux du samedi et du dimanche, sur 28 jours glissants."
3. "99 pour cent des recherches répondent sous 800 ms au 95e centile, mesurées côté serveur, y compris pendant les deux heures de pointe quotidiennes, sur 28 jours glissants."

### Seuil de passage

Trois phrases sur trois contenant les quatre éléments : tu entres. Deux sur trois ou moins : relis [../05_observability](../05_observability) et refais cette calibration demain. Une promesse sans fenêtre de temps ne compte pas, même si elle porte un chiffre : sans fenêtre, aucun budget d'erreur n'est calculable.

## Verdict

- **3+ réponses solides** → tu peux entrer.
- **2 ou moins** → retour à `03-PILOTAGE/05_observability/`, ou à sa synthèse `09b_observability_grimoire.md`.

> Se sentir "prêt" ≠ être prêt. Les questions ci-dessus tranchent.

> **Note pour ce module précis** : la différence entre SLI, SLO et SLA, le calcul d'un
> budget d'erreur, et pourquoi un retry sans disjoncteur transforme une panne partielle
> en panne totale sont le contenu que ce module va t'enseigner (notamment
> `01_sli_slo_sla_budget_erreur.md` et `02_resilience_timeout_retry_disjoncteur.md`) :
> normal de ne pas encore les maîtriser. Ta compréhension est testée en fin de module,
> dans `grimoire.md` et dans `06_boss_fight_fiabilite.md`.
