## perishability_id: PER-0101

stability: perissable
last_reviewed: 2026-08
depends_on_vendor: true
acte: appliquer
review_due: 2027-12-31

---

> **CrazyDevs : briefing de mission :** ce concept doit survivre au moment où quelqu’un te demande « pourquoi ? » en plein chaos. Garde l’explication technique exacte, puis donne-lui une image qu’on peut raconter demain.

# MODÈLE S7 : PORTAGE.md : exemplaire de référence, anonymisé

Temps de lecture ~4 min

Même projet fictif que les six autres modèles : **Lumen**, plateforme de réservation de
créneaux pour ateliers associatifs. Service porté : `disponibilites`, l'API de lecture des
créneaux libres (le service le plus lu, le moins couplé, donc le bon candidat).

- Origine : Node.js 22 / Fastify / Postgres managé, fournisseur A, région europe-ouest.
- Cible : Go 1.23 / net-http / Postgres managé, fournisseur B, région europe-ouest.
- Portage réalisé le 2026-08-12, mesures relevées sur 7 jours de trafic miroir.

## 1. Transféré tel quel

Ce qui a traversé sans être repensé, et pourquoi c'était possible :

| Élément                                                                   | Pourquoi il passe sans discussion                                           |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Le contrat d'API (OpenAPI, mêmes codes, mêmes champs)                     | Il était déjà écrit hors du code : le contrat n'appartenait pas au langage. |
| Le modèle de données et ses index                                         | SQL standard, aucune extension propriétaire utilisée.                       |
| Les 34 cas de test de contrat                                             | Écrits en HTTP contre l'API, pas contre les fonctions internes.             |
| Les invariants métier (pas de double réservation, créneau jamais négatif) | Formulés en français dans l'ADR, donc réimplémentables.                     |
| Le SLO (99,9 %, p99 < 300 ms)                                             | Une promesse à l'utilisateur ne dépend pas de la technologie qui la tient.  |

Enseignement, formulé en une phrase défendable : ce qui a traversé, c'est exactement ce qui
avait été écrit **en dehors** du code. La transférabilité n'est pas une qualité du développeur,
c'est une propriété des documents qu'il a produits avant de coder.

## 2. Dû être repensé

| Élément              | Ce qui bloquait                                                                                                                                                         | Décision prise                                                                                                       |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Concurrence          | Le modèle événementiel mono-thread devient un modèle à goroutines : les hypothèses « une seule chose à la fois » du code d'origine étaient implicites et fausses en Go. | Rendre les invariants explicites par une transaction et un verrou de ligne, et non par le hasard du runtime.         |
| Gestion d'erreur     | Exceptions remontantes → valeurs d'erreur retournées à chaque appel.                                                                                                    | Un type d'erreur métier unique, converti en code HTTP à la frontière, comme dans l'original.                         |
| Secrets et identités | Le service managé d'identité du fournisseur A n'existe pas chez B sous la même forme.                                                                                   | Variables d'environnement injectées par le gestionnaire de secrets de B, et un ADR qui note la dépendance restante.  |
| File d'événements    | Service propriétaire chez A, équivalent non compatible chez B.                                                                                                          | Adaptateur derrière une interface : c'est le seul endroit où le portage a coûté du code supplémentaire (140 lignes). |
| Journalisation       | Format propriétaire chez A.                                                                                                                                             | Sortie JSON standard, corrélation par identifiant de requête : portable des deux côtés.                              |

Enseignement : le coût du portage se concentre sur les points où le code avait été écrit
**contre un produit**, pas contre une interface. Il se mesure en nombre d'adaptateurs, et ce
nombre se décide avant, pas après.

## 3. Écart de coût mensuel constaté

Base de comparaison : charge identique, trafic miroir, 30 jours, 2 vCPU, base managée 100 Go,
250 Go de stockage objet, 400 Go d'egress. Prix relevés le 2026-08-12, chacun avec son URL dans
le relevé de l'apprenant
([03-PILOTAGE/07-CLOUD-FOUNDATIONS/05-releve_tarifaire_reel.md](../../03-PILOTAGE/07-CLOUD-FOUNDATIONS/05-releve_tarifaire_reel.md)).

| Ligne                          | Fournisseur A | Fournisseur B | Écart          |
| ------------------------------ | ------------- | ------------- | -------------- |
| Calcul (2 vCPU, 8 Go)          | à relever     | à relever     | à calculer     |
| Base managée (100 Go, HA zone) | à relever     | à relever     | à calculer     |
| Stockage objet (250 Go)        | à relever     | à relever     | à calculer     |
| Egress (400 Go)                | à relever     | à relever     | à calculer     |
| **Total mensuel**              | **à relever** | **à relever** | **à calculer** |

> Ce tableau est volontairement livré vide : un modèle qui contiendrait des prix inventés
> détruirait ce que S-04 a construit. Les cases se remplissent avec TON relevé, daté, sourcé.

Trois phrases exigées sous le tableau, dans ta version :

1. La ligne qui explique le plus gros de l'écart, et pourquoi (souvent l'egress ou la base HA).
2. Ce que l'écart ne dit pas : coût de migration ponctuel, coût d'apprentissage de l'équipe,
   remises contractuelles non publiques.
3. Ta conclusion assumée : rester, partir, ou garder la capacité de partir sans l'exercer.

## 4. Ce qu'un jury vérifie en trois minutes

- Le service porté tourne réellement chez le second fournisseur (URL ou capture datée).
- Les mêmes tests de contrat passent des deux côtés, sans être réécrits pour arranger la cible.
- L'écart de coût est calculé à partir de prix relevés, avec URL et date, jamais de mémoire.
- La section 2 nomme au moins une chose qui a **coûté** : un portage sans coût est un portage
  raconté, pas fait.

## Gate de réalité

Un portage sans exécution cible est un plan, pas une preuve. Dans le dépôt apprenant, joindre les URL, logs ou captures datées qui montrent le service réellement déployé chez le second fournisseur. Le modèle reste volontairement sans prix inventés.

## Où ce modèle est repris

- Livrable exigé au palier [04-EPREUVE](../../04-EPREUVE/README.md), à produire avant le capstone.
- Septième entrée de [PREUVES-STAFF-ENGINEER.md](../../PREUVES-STAFF-ENGINEER.md).
- Sources pédagogiques : les 38 fichiers de portage mental (`99-PORTAGE-MENTAL.md`) des modules (portage
  multi-langage) et
  [03-PILOTAGE/07-CLOUD-FOUNDATIONS/99-PORTAGE-MENTAL.md](../../03-PILOTAGE/07-CLOUD-FOUNDATIONS/99-PORTAGE-MENTAL.md)
  (portage multi-fournisseur).
