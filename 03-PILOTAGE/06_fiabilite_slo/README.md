---
stability: intemporel
acte: restituer
---

# 03-PILOTAGE/06_fiabilite_slo : fiabilité, SLO et reprise

> Mode de vérification des exercices de ce module : défense orale enregistrée contre grille ([../../05-MAITRISE/08_maitrise_staff_engineer/challenge.md](../../05-MAITRISE/08_maitrise_staff_engineer/challenge.md)).

Temps de lecture ~4 min

## Ce que c'est

Le passage de "je vois ce qui se passe en production" à "j'ai promis quelque chose et je sais si je le tiens". Ce module fait écrire une promesse de service calculable, la traduit en budget d'erreur dépensable, la protège par des alertes qui réveillent vraiment quelqu'un, et la met à l'épreuve d'une restauration chronométrée.

## Structure du module

- [00_prereq_check.md](00_prereq_check.md) : filtre anti-illusion avant d'entrer.
- [00_why_fiabilite_slo.md](00_why_fiabilite_slo.md) : pourquoi ce module mérite ton temps.
- [01_sli_slo_budget_erreur.md](01_sli_slo_budget_erreur.md) : écrire un SLI, un SLO et un budget d'erreur qui tiennent.
- [02_alerting_astreinte.md](02_alerting_astreinte.md) : alerter sur le symptôme, et le document d'astreinte d'une page.
- [03_reprise_rpo_rto.md](03_reprise_rpo_rto.md) : RPO, RTO et la restauration mesurée au chronomètre.
- [04_degradation_disjoncteur.md](04_degradation_disjoncteur.md) : dégrader plutôt que tomber (timeout, retry, disjoncteur, repli).
- [05_panne_subie_sur_fil_rouge.md](05_panne_subie_sur_fil_rouge.md) : gate bloquante, une vraie panne provoquée sur ton fil rouge, chronométrée, postmortem signé.
- [EXO_JEUNE_IA.md](EXO_JEUNE_IA.md) : decider seul, IA coupee, puis mesurer l'ecart avec l'IA.
- [verification_pack/criteres.md](verification_pack/criteres.md) : les trois drills et leurs criteres binaires.
- [grimoire.md](grimoire.md) : mémo dense, à ouvrir seulement après avoir fini le reste.
- [challenge.md](challenge.md) : challenge, produire le `SLO.md` de ton projet.
- [boss-fight.md](boss-fight.md) : boss fight, budget brûlé un vendredi à 16 h.

## Comment lire ce module

Dans l'ordre. Le grimoire ne se lit qu'après les leçons et les exercices : le lire avant donne l'illusion de savoir. Le challenge produit une vraie pièce de preuve, il ne se saute pas.

## RENVOI CROISÉ : ASYNC (01-CADRAGE/02_async)

Les concepts de SLI/SLO, budget d'erreur et reprise s'appuient sur les
mécanismes async posés dans `01-CADRAGE/02_async` (timeouts, retry,
backpressure, event loop) : un retry non idempotent ou un timeout mal réglé
consomme directement le budget d'erreur défini ici. Le mini-projet
`02-CONSTRUCTION/02_mini_projects/16_distributed_arena` (dossier `INCIDENT/`
obligatoire) illustre concrètement ce pont entre async et fiabilité.

## Signal que tu es prêt pour le module suivant

Ton `SLO.md` existe, son RTO est daté et mesuré, ton budget d'erreur est exprimé en requêtes ratées par semaine, tu as une politique écrite qui dit ce que tu arrêtes quand il fond, et le `POSTMORTEM.md` de [05_panne_subie_sur_fil_rouge.md](05_panne_subie_sur_fil_rouge.md) est signé : ce RTO a été mesuré sur une vraie panne, pas seulement écrit. Le boss fight passé sans basculer de fournisseur avant d'avoir corrigé le retry en est la preuve.

<!-- CONTENU-DOSSIER:debut (genere par outils/generer_index_dossiers.mjs) -->

## Contenu du dossier

Liste generee : tout fichier de `03-PILOTAGE/06_fiabilite_slo` est joignable depuis ici, aucun document n'est laisse sans porte d'entree.

- [00_prereq_check.md](00_prereq_check.md)
- [00_why_fiabilite_slo.md](00_why_fiabilite_slo.md)
- [01_sli_slo_budget_erreur.md](01_sli_slo_budget_erreur.md)
- [02_alerting_astreinte.md](02_alerting_astreinte.md)
- [03_reprise_rpo_rto.md](03_reprise_rpo_rto.md)
- [04_degradation_disjoncteur.md](04_degradation_disjoncteur.md)
- [05_panne_subie_sur_fil_rouge.md](05_panne_subie_sur_fil_rouge.md)
- [EXO_JEUNE_IA.md](EXO_JEUNE_IA.md)
- [boss-fight.md](boss-fight.md)
- [challenge.md](challenge.md)
- [grimoire.md](grimoire.md)
- [verification_pack/](verification_pack/README.md)

<!-- CONTENU-DOSSIER:fin -->
