---

stability: stable
depends_on_vendor: true
acte: appliquer
---
> **CrazyDevs : briefing de mission :** ce concept doit survivre au moment où quelqu’un te demande « pourquoi ? » en plein chaos. Garde l’explication technique exacte, puis donne-lui une image qu’on peut raconter demain.

# MODÈLE S7 : PORTAGE.md : exemplaire de référence, anonymisé

Temps de lecture ~4 min

> **Scénario fictif de portage.** Les versions, nombres de tests, dates, volumes et conclusions ci-dessous illustrent un dossier cohérent ; ils ne prouvent pas qu'un déploiement, un portage ou une mesure a été réellement exécuté. Dans ton propre dossier, annonce dès le début le niveau `PORTAGE_CONÇU` ou `PORTAGE_EXÉCUTÉ`.

Même projet fictif que les six autres modèles : **Lumen**, plateforme de réservation de
créneaux pour ateliers associatifs. Service porté : `disponibilites`, l'API de lecture des
créneaux libres (le service le plus lu, le moins couplé, donc le bon candidat).

Dans ton dossier réel, commence par ce repère :

```yaml
mode: PORTAGE_CONÇU # ou PORTAGE_EXÉCUTÉ
second_language: "langage réellement utilisé"
provider_target: "fournisseur cible"
provider_target_status: DESIGN # EXECUTED uniquement avec preuve datée
contract_tests: EXECUTED_LOCAL # préciser séparément chaque cible
```

Ce bloc est un repère de statut, pas une preuve en soi. Les pièces jointes et les résultats
réels déterminent le niveau recevable.

- Origine : Node.js 22 / Fastify / Postgres managé, fournisseur A, région europe-ouest.
- Cible : Go 1.23 / net-http / Postgres managé, fournisseur B, région europe-ouest.
- Dans le scénario, le portage est daté du 2026-08-12 et les résultats sont supposés issus de 7 jours de trafic miroir ; aucune exécution réelle n'est attestée par ce modèle.

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

## 3. Écart de coût mensuel estimé ou constaté selon le mode

Base de comparaison : charge identique, trafic miroir, 30 jours, 2 vCPU, base managée 100 Go,
250 Go de stockage objet, 400 Go d'egress. En `PORTAGE_CONÇU`, ce tableau est une estimation
modélisée à partir des prix publics relevés le 2026-08-12 ; en `PORTAGE_EXÉCUTÉ`, il peut
présenter les coûts réellement constatés, avec leur période et leur preuve. Chaque prix doit
avoir son URL dans le relevé de l'apprenant
([03-PILOTAGE/07-CLOUD-FOUNDATIONS/05-releve_tarifaire_reel.md](../../03-PILOTAGE/07-CLOUD-FOUNDATIONS/05-releve_tarifaire_reel.md)).

| Ligne                          | Fournisseur A | Fournisseur B | Écart          |
| ------------------------------ | ------------- | ------------- | -------------- |
| Calcul (2 vCPU, 8 Go)          | à relever     | à relever     | à calculer     |
| Base managée (100 Go, HA zone) | à relever     | à relever     | à calculer     |
| Stockage objet (250 Go)        | à relever     | à relever     | à calculer     |
| Egress (400 Go)                | à relever     | à relever     | à calculer     |
| **Total mensuel**              | **à relever** | **à relever** | **à calculer** |

> Ce tableau est volontairement livré vide : un modèle qui contiendrait des prix inventés
> détruirait ce que S-04 a construit. En `PORTAGE_CONÇU`, remplis-le comme une estimation
> datée et sourcée, avec hypothèses explicites ; en `PORTAGE_EXÉCUTÉ`, distingue l'estimation
> initiale des coûts réellement constatés. Aucun déploiement ni aucune facture ne doivent être
> simulés ou présentés comme une observation.

Trois phrases exigées sous le tableau, dans ta version :

1. La ligne qui explique le plus gros de l'écart, et pourquoi (souvent l'egress ou la base HA).
2. Ce que l'écart ne dit pas : coût de migration ponctuel, coût d'apprentissage de l'équipe,
   remises contractuelles non publiques.
3. Ta conclusion assumée : rester, partir, ou garder la capacité de partir sans l'exercer.

## 4. Ce qu'un jury vérifie en trois minutes

Le jury vérifie d'abord le niveau annoncé dans l'en-tête de ton dossier :

- **`PORTAGE_CONÇU` (voie sans coût cloud) :** le service de second langage fonctionne localement ; les mêmes tests de contrat passent sur les deux implémentations ; le fournisseur cible, les équivalences de services, le plan, le rollback et les prix publics datés sont décrits. Aucune ressource payante n'a besoin d'être créée. Cette preuve ouvre le Capstone, mais ne valide pas S7.
- **`PORTAGE_EXÉCUTÉ` (S7) :** le service tourne réellement chez le second fournisseur ; les tests comparables passent sur les deux cibles ; des URLs, logs ou captures datés et des mesures côté cible sont joints. Un plan ou une capture de console sans service exécuté ne suffit pas.

Dans les deux modes, le coût est calculé à partir de prix relevés, avec URL, région, unité et date, jamais de mémoire. En `PORTAGE_CONÇU`, il s'agit d'une estimation fondée sur des hypothèses visibles ; en `PORTAGE_EXÉCUTÉ`, distingue cette estimation du coût réellement observé. La section 2 nomme au moins une adaptation et son coût, sans inventer une mesure absente. Les SLO/RTO cible restent `DESIGN` / `NOT RUN` en mode conçu ; seules des mesures datées issues d'un déploiement réel peuvent être présentées comme mesurées.

## Gate de réalité

Un portage sans exécution chez le fournisseur cible est un plan, pas une preuve S7. Il peut néanmoins être un `PORTAGE_CONÇU` valable pour ouvrir le Capstone si les deux implémentations locales et leurs tests comparables sont réellement exécutés. Joins les URL, logs ou captures de ce qui a été effectivement fait et marque le reste `DESIGN`, `SIMULATION` ou `NOT RUN`.

## Où ce modèle est repris

- Livrable `PORTAGE.md` du palier [04-EPREUVE](../../04-EPREUVE/README.md) : le niveau `PORTAGE_CONÇU` suffit pour entrer au Capstone ; `PORTAGE_EXÉCUTÉ` est requis pour fermer S7.
- Septième entrée de [PREUVES-STAFF-ENGINEER.md](../../PREUVES-STAFF-ENGINEER.md).
- Sources pédagogiques : les 38 fichiers de portage mental (`99-PORTAGE-MENTAL.md`) des modules (portage
  multi-langage) et
  [03-PILOTAGE/07-CLOUD-FOUNDATIONS/99-PORTAGE-MENTAL.md](../../03-PILOTAGE/07-CLOUD-FOUNDATIONS/99-PORTAGE-MENTAL.md)
  (portage multi-fournisseur).
