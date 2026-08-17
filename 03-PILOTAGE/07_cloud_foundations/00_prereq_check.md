---
stability: intemporel
acte: évaluer
---

# 00 : Prereq check : Fondations cloud
Temps de lecture ~5 min

> Tu ne dois **pas** entrer dans ce module si tu ne peux pas répondre à ces questions
> **sans regarder**. Ce n'est pas un test noté, c'est un filtre anti-illusion.
> Ces questions portent sur `03-PILOTAGE/06_fiabilite_slo`, le module que tu viens de finir.

## Questions

1. Différence entre un SLI, un SLO et un SLA, en une phrase chacun ?
2. Pourquoi un retry sans disjoncteur (circuit breaker) aggrave une panne au lieu de la contenir ?
3. Qu'est-ce qu'un budget d'erreur, et à quoi sert-il concrètement dans une réunion de priorisation ?
4. Cite RPO et RTO, et donne un exemple chiffré de chacun.

## Calibration obligatoire : raisonner en unités facturées (10 min)

Ce module ne demande pas de connaître des offres, il demande de traduire un système en unités facturables. Sans cette bascule, le budget produit sera une addition de suppositions.

Chiffre les trois lignes suivantes, à la louche mais en unités, sans ouvrir la moindre grille tarifaire :

1. Un service qui tourne en permanence sur 1 vCPU : combien de vCPU-heures par mois ?
2. 10 000 utilisateurs qui téléchargent chacun 3 pages de 2 Mo par mois : combien de Go sortants ?
3. Une application qui écrit 50 lignes de journal par requête, à 20 requêtes par seconde, ligne de 300 octets : combien de Go de journaux par mois ?

### Corrigé

1. 730 vCPU-heures, parce qu'un mois compte environ 730 heures. Le chiffre à retenir à vie.
2. 60 Go sortants, soit le poste que la plupart des budgets d'école oublient.
3. Environ 780 Go par mois, ce qui est presque toujours une surprise, et souvent la première ligne à optimiser.

### Seuil de passage

Trois ordres de grandeur justes à un facteur deux près : tu entres. Sinon, reprends [../05_observability/01_structured_logging.md](../05_observability/01_structured_logging.md) et refais cette calibration : un budget se construit sur des unités, jamais sur des noms d'offres.

## Verdict

- **3+ réponses solides** → tu peux entrer.
- **2 ou moins** → retour à `03-PILOTAGE/06_fiabilite_slo/`, ou à sa synthèse `grimoire.md`.

> Se sentir "prêt" ≠ être prêt. Les questions ci-dessus tranchent.

> **Note pour ce module précis** : les catégories de service cloud, le modèle de coût
> (calcul, stockage, opérations, egress, disponibilité), l'identité et les frontières
> de droits, et comment choisir un fournisseur sont le contenu que ce module va
> t'enseigner (notamment `01_categories_service.md` et `02_modeles_cout.md`) : normal
> de ne pas encore les maîtriser. Ta compréhension est testée en fin de module, dans
> `grimoire.md` et dans `boss-fight.md`, et se conclut par un livrable
> chiffré : `BUDGET-CLOUD.md`.
