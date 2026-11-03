---
stability: stable
acte: parcours
noyau: oui
route: formation-complete
last_reviewed: 2026-11-03
---

# KINTANA : le cas d’étude pédagogique commun d’AF

> **Le principe :** tu ne fabriques pas 100 petits bouts de code qui finissent dans un tiroir. Tu fais grandir un même produit, étape par étape, et tu vois pourquoi chaque notion compte quand de vrais utilisateurs, des données imparfaites et des pannes entrent dans l'histoire.

Kintana est le **cas d’étude fictif commun** créé pour les exercices d’AF. Ce n’est pas le fil rouge personnel de chaque apprenant, un service déployé, une entreprise réelle ni une preuve de production. Chaque apprenant choisit et qualifie son propre fil rouge pendant le Cadrage ; Kintana sert de terrain partagé pour expliquer les mécanismes et comparer les raisonnements. Il représente une plateforme de gestion de demandes et de rendez-vous pour plusieurs centres de services locaux.

Le contexte de travail suppose des appareils modestes, une connexion parfois lente ou coupée, des utilisateurs avec des rôles différents et une équipe qui doit pouvoir comprendre et réparer le service.

**Données :** utilise uniquement les fixtures synthétiques du projet ou des données inventées. N'importe pas de données personnelles réelles dans le dépôt pédagogique.

## Règle de lecture pour un débutant absolu

Kintana est un scénario d'étude fictif et partagé, pas un projet personnel ni une expérience de production. Dans le Socle, la pratique locale de chaque leçon reste la première passe. Les missions Kintana indiquées comme différées ou facultatives se reprennent uniquement après les prérequis écrits dans leur encadré ; elles ne créent aucune gate supplémentaire. Dans le module Web Concepts, les huit missions sont des incréments distincts d’un même artefact cumulatif : conserve les livrables précédents au lieu de recommencer un projet à chaque leçon. Une fixture, une simulation ou un calcul d'exemple ne devient pas une observation de terrain.

## 1. Le problème métier

Une personne doit envoyer une demande, choisir un créneau, suivre son état et recevoir une confirmation. Un agent traite les demandes. Un superviseur répartit la charge. Un administrateur gère les accès et les paramètres.

Le produit doit empêcher les doublons, préserver les droits, expliquer les changements et rester utilisable quand le réseau disparaît puis revient.

### Les acteurs

| Acteur         | Besoin principal                     | Risque à éviter                                             |
| -------------- | ------------------------------------ | ----------------------------------------------------------- |
| Demandeur      | Créer, modifier et suivre sa demande | Double envoi, perte de brouillon, exposition de ses données |
| Agent          | Traiter les demandes attribuées      | Accès à un dossier hors périmètre, action perdue            |
| Superviseur    | Répartir et suivre la charge         | Affectation incohérente, absence de trace                   |
| Administrateur | Gérer les comptes et les règles      | Privilèges excessifs, modification non auditée              |

## 2. Périmètre fonctionnel

### Noyau obligatoire

1. Authentifier un utilisateur et contrôler son rôle à chaque action sensible.
2. Créer une demande avec un identifiant d'idempotence (une répétition ne crée pas deux demandes).
3. Consulter les créneaux disponibles et réserver un créneau dans une transaction cohérente.
4. Faire évoluer une demande par des transitions d'état autorisées : `draft → submitted → assigned → in_progress → completed`, avec des transitions de refus/annulation documentées.
5. Affecter une demande à un agent et conserver l'historique.
6. Envoyer une notification de manière asynchrone, avec reprise et déduplication.
7. Garder un brouillon local sur le client et synchroniser proprement au retour du réseau.
8. Fournir un historique d'audit compréhensible par un opérateur autorisé.

### Extensions avancées

- Importer les événements dans un pipeline Data avec validation, quarantaine, réconciliation et rejeu.
- Fournir une recherche documentaire/FAQ assistée par IA, en lecture seule. L'IA ne réserve, n'annule ni ne modifie jamais une demande.
- Déployer le service, surveiller ses signaux, restaurer une sauvegarde et prouver le rollback.
- Préparer une évolution d'architecture sans imposer des microservices avant qu'un besoin mesuré le justifie.

## 3. Carte du système

```text
[Client web/mobile] -- demande + clé idempotence --> [API]
       |                                           |
       +-- brouillon local / outbox                v
                                              [Domaine Kintana]
                                                |          |
                                                v          v
                                           [PostgreSQL] [Audit]
                                                |
                                                v
                                          [Outbox événements]
                                                |
                                                v
                                           [Worker queue]
                                                |
                                                v
                                           [Notifications]

[Console agent/superviseur] ------------------> [API]
[FAQ IA en lecture seule] --------------------> [Documents approuvés]
```

Le dessin montre des responsabilités, pas un choix obligatoire de déploiement. Au départ, un monolithe modulaire peut être le meilleur choix. Tu ne sépares un service que si une contrainte mesurée le justifie.

## 4. Invariants métier à protéger

- Un demandeur ne lit et ne modifie que les demandes qui lui appartiennent.
- Un agent n'agit que dans son périmètre d'affectation.
- Un superviseur ne peut pas contourner les règles d'audit.
- Une même clé d'idempotence et le même contenu logique ne produisent qu'un seul effet métier.
- Deux réservations concurrentes ne peuvent pas prendre le même créneau si la capacité est épuisée.
- Une transition d'état non autorisée est rejetée et journalisée sans exposer de données sensibles.
- Un événement rejoué ne déclenche pas deux notifications ni deux effets métier.
- Une donnée invalide est rejetée ou mise en quarantaine ; elle n'est pas corrigée silencieusement.
- Une synchronisation offline ne remplace pas aveuglément une modification plus récente.
- Une réponse IA non sourcée ou incertaine ne devient jamais une action métier.

## 5. Ce que tu mesures

Tu définis d'abord une baseline (mesure de départ), puis une cible et une méthode de mesure. Ne copie pas un objectif chiffré sans expliquer le contexte.

| Domaine     | Signal minimal                                               | Question à poser                                    |
| ----------- | ------------------------------------------------------------ | --------------------------------------------------- |
| Produit     | Taux de demandes terminées sans assistance                   | L'utilisateur arrive-t-il au bout du parcours ?     |
| Fiabilité   | Taux d'erreur, disponibilité, durée de restauration          | Le service tient-il et sait-on le remettre debout ? |
| Performance | p50/p95/p99, taille des payloads                             | Où part le temps et pour qui ?                      |
| Données     | doublons, rejets, quarantaine, retard de traitement          | Les chiffres sont-ils réconciliables ?              |
| Offline     | délai de synchronisation, conflits, pertes évitées           | Que devient l'action quand le réseau coupe ?        |
| Sécurité    | refus d'accès, privilèges, événements d'audit                | Qui peut faire quoi, et peut-on le prouver ?        |
| Coût        | coût par demande terminée                                    | L'amélioration vaut-elle son coût ?                 |
| IA          | précision de récupération, réponses sans source, abstentions | Le système sait-il dire « je ne sais pas » ?        |

Un résultat de laboratoire reste une preuve de laboratoire. Une mesure de production n'existe que si tu as réellement déployé, observé, autorisé la collecte et conservé le contexte.

## 6. Les arcs narratifs récurrents

La fiction sert à retenir le problème ; elle ne remplace jamais le mécanisme technique.

- **Naruto / Konoha : cadrer et protéger :** rôles, frontières, contrats et missions. Une équipe qui ne sait pas qui possède une action finit par se marcher dessus.
- **DBZ / Capsule Corp. : mesurer avant de monter en puissance :** performance, capacité, mémoire, coût et limites. Se transformer en Super Saiyan ne supprime pas le goulot d'étranglement.
- **One Piece / Grand Line : transporter sans perdre :** événements, données, files, reprise et contrats. Un message est une cargaison : il peut arriver tard, deux fois ou pas du tout.
- **Walking Dead : tenir pendant l'incident :** sécurité, observabilité, dégradation, sauvegarde et postmortem. Le vrai niveau se voit quand la prod part en fumée.
- **Arène Staff : faire avancer plusieurs équipes :** arbitrage, RFC, adoption, migration et impact. Le boss final n'est pas un diagramme, c'est une décision que d'autres peuvent reprendre.

## 7. Missions Kintana par domaine : ne pas imposer la FAQ partout

Kintana est commun, mais la mission doit changer avec le mécanisme enseigné. La FAQ IA n’est pertinente que dans les modules consacrés à l’IA/RAG et à son évaluation.

| Domaine enseigné             | Mission Kintana cohérente                                                         | Preuve attendue                                                   |
| ---------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Socle / programmation        | Valider une demande, normaliser une entrée et appliquer une règle pure            | Cas nominal, valeur invalide, test et explication                 |
| Problem solving / cadrage    | Décrire la friction d’un demandeur et les hypothèses à vérifier                   | Acteur, tâche, observation, non-objectif et critère d’acceptation |
| Structures / algorithmes     | Rechercher un créneau ou trier des demandes avec une contrainte de volume         | Invariant, complexité et cas limite                               |
| Mémoire / runtime            | Suivre la durée de vie d’un brouillon ou d’une réponse mise en cache              | Références, invalidation, mesure ou trace                         |
| Async / API / contrats       | Éviter qu’un retry crée une deuxième demande ou notification                      | Clé d’idempotence, ordre d’événements et test négatif             |
| Base / DDD / architecture    | Empêcher deux demandeurs de réserver la dernière place                            | Transaction, invariant métier, ADR et migration                   |
| Sécurité                     | Empêcher un demandeur ou agent de lire une demande hors périmètre                 | Matrice rôle/action/ressource et test d’accès refusé              |
| Web inclusif / client        | Compléter une demande au clavier et conserver un brouillon en réseau instable     | Parcours clavier, état offline et test de reprise                 |
| Cloud / coût / fiabilité     | Estimer le coût par demande et définir la promesse du endpoint de disponibilité   | Profil de charge, budget reproductible, SLI/SLO et limites        |
| Observabilité / exploitation | Détecter un retard de notification et restaurer le service                        | Signal, seuil, runbook, incident et récupération                  |
| Data Engineering             | Réconcilier les événements de demande, les doublons et les données tardives       | Contrat, quarantaine, rejeu et lineage                            |
| Machine Learning             | Prédire un risque défini à partir de données synthétiques, contre une baseline    | Split sans fuite, métriques, seuil et analyse d’erreurs           |
| IA / RAG                     | Répondre à une question documentaire en lecture seule, avec sources et abstention | Jeu d’évaluation, ACL, injection, citations et coût               |
| Team craft / leadership      | Faire adopter une règle commune de migration ou d’exploitation                    | RFC, objections, décision et adoption réellement corroborée       |

La table indique des terrains candidats, pas des missions obligatoires dans chaque leçon. Si le module possède déjà un challenge spécifique, utilise-le ; n’ajoute pas une couche Kintana artificielle.

## 7A. Missions ciblées par sous-module

La carte par grand domaine ci-dessus sert à s’orienter. Pour les sous-modules listés ici, la mission est volontairement plus précise afin d’éviter de recopier une tâche générique dans des sujets différents. Le README et le challenge du sous-module restent le contrat local ; cette table ne crée aucun prérequis ni gate supplémentaire.

| Sous-module                                                | Mission Kintana ciblée                                                                                     | Preuve attendue                                                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `00-SOCLE/04-FUNDAMENTALS/03_functions`                    | Écrire une fonction pure qui calcule l’éligibilité d’une demande à partir de données explicites            | Entrées, sortie, cas invalides et absence d’effet caché                                        |
| `00-SOCLE/04-FUNDAMENTALS/04_types`                        | Représenter les états de demande par des types distincts et refuser une transition invalide                | États autorisés, transition refusée et explication de l’invariant                              |
| `00-SOCLE/04-FUNDAMENTALS/06_modules`                      | Séparer validation, règle métier et affichage en modules aux responsabilités nommées                       | Dépendances orientées dans le bon sens et point d’entrée explicite                             |
| `00-SOCLE/04-FUNDAMENTALS/07_regex`                        | Valider un identifiant de demande avec une règle lisible et des cas limites                                | Exemples acceptés/refusés ; la regex n’est pas utilisée comme validation métier complète       |
| `02-CONSTRUCTION/05-MEMORY-PERFORMANCE/03_complexity`      | Comparer le coût d’une opération de recherche sur trois tailles de demandes, puis extrapoler avec prudence | Cas de mesure, courbe ou tableau, hypothèse de complexité et limite de l’extrapolation         |
| `02-CONSTRUCTION/05-MEMORY-PERFORMANCE/05_core_web_vitals` | Améliorer le chargement d’un écran mobile de suivi de demande sans supprimer une information utile         | Mesure avant/après, appareil/réseau de test et effet utilisateur                               |
| `02-CONSTRUCTION/05-MEMORY-PERFORMANCE/06_jit`             | Comparer une exécution froide et une exécution échauffée d’une fonction de transformation                  | Méthode stable, échauffement séparé, distribution des mesures et limite microbenchmark         |
| `02-CONSTRUCTION/06-DATA-STRUCTURES/01_array`              | Parcourir et filtrer une liste de créneaux avec une règle de disponibilité                                 | Ordre, cas vide, cas limite et coût des opérations                                             |
| `02-CONSTRUCTION/06-DATA-STRUCTURES/02_linked_list`        | Insérer ou retirer une demande dans une séquence de traitement sans perdre le lien suivant                 | État avant/après, cas tête/queue et coût réel de recherche                                     |
| `02-CONSTRUCTION/06-DATA-STRUCTURES/03_stack`              | Annuler la dernière modification d’un brouillon avec une pile d’historique                                 | Ordre LIFO, état restauré et limite de profondeur                                              |
| `02-CONSTRUCTION/06-DATA-STRUCTURES/06_bst`                | Indexer des créneaux par heure et comparer arbre équilibré et arbre dégénéré                               | Invariant d’ordre, recherche et cas défavorable                                                |
| `02-CONSTRUCTION/06-DATA-STRUCTURES/08_graphs`             | Représenter les dépendances entre demande, créneau, centre et agent                                        | Nœuds/arêtes, parcours et composant inaccessible                                               |
| `02-CONSTRUCTION/07-ALGORITHMS/02_searching`               | Trouver un créneau par identifiant ou heure et expliciter la précondition de tri                           | Recherche linéaire vs binaire, entrée ordonnée/non ordonnée et résultat                        |
| `02-CONSTRUCTION/07-ALGORITHMS/03_dynamic_programming`     | Choisir un ensemble de créneaux maximisant une valeur sous une contrainte simple de capacité               | État, transition, cas de base et comparaison avec une petite recherche exhaustive              |
| `02-CONSTRUCTION/05-MEMORY-PERFORMANCE/02_copy_vs_ref`     | Modifier une copie de brouillon sans altérer l’état précédent                                              | Deux états comparés, mutation accidentelle démontrée puis évitée                               |
| `02-CONSTRUCTION/06-DATA-STRUCTURES/04_queue`              | Traiter les notifications en FIFO avec une reprise bornée                                                  | Ordre, retry, doublon et comportement après épuisement                                         |
| `02-CONSTRUCTION/06-DATA-STRUCTURES/05_heap`               | Prioriser les demandes selon urgence et échéance sans perdre l’ordre attendu                               | Règle de priorité, égalités et coût des opérations                                             |
| `02-CONSTRUCTION/06-DATA-STRUCTURES/07_hash_table`         | Détecter rapidement une clé d’idempotence déjà utilisée                                                    | Collision traitée correctement, doublon rejeté et limite de mémoire                            |
| `02-CONSTRUCTION/06-DATA-STRUCTURES/09_advanced_bonus`     | Choisir une structure seulement après avoir écrit les accès et contraintes                                 | Comparaison argumentée, opérations dominantes et coût de maintenance                           |
| `02-CONSTRUCTION/07-ALGORITHMS/01_sorting`                 | Trier les demandes par échéance tout en conservant un ordre stable pour les égalités                       | Jeu avant/après, stabilité et complexité justifiée                                             |
| `02-CONSTRUCTION/07-ALGORITHMS/04_greedy`                  | Affecter des créneaux avec une règle gloutonne explicite puis montrer un cas où elle échoue                | Décision étape par étape, contre-exemple et limite de l’heuristique                            |
| `02-CONSTRUCTION/07-ALGORITHMS/05_backtracking`            | Chercher une affectation compatible lorsque plusieurs contraintes se croisent                              | Arbre de recherche, état restauré après retour arrière et arrêt défini                         |
| `02-CONSTRUCTION/07-ALGORITHMS/06_graph_algorithms`        | Calculer un chemin entre un centre de service et un demandeur dans un graphe simplifié                     | Graphe, poids/hypothèses, chemin obtenu et cas inaccessible                                    |
| `02-CONSTRUCTION/09-FUNCTIONAL-JS`                         | Transformer une demande en résultat métier par composition de fonctions pures                              | Sortie déterministe, immutabilité et cas d’erreur explicite                                    |
| `02-CONSTRUCTION/10-DESIGN-PATTERNS/01_creational`         | Construire une demande valide par une fabrique qui centralise les invariants                               | Objet valide ou erreur explicite ; pas de constructeur magique inutile                         |
| `02-CONSTRUCTION/10-DESIGN-PATTERNS/02_structural`         | Adapter une source de créneaux externe derrière une interface stable                                       | Interface cible, adaptation et test sans dépendance au fournisseur                             |
| `02-CONSTRUCTION/10-DESIGN-PATTERNS/03_behavioral`         | Remplacer une politique de notification sans modifier le flux appelant                                     | Variantes interchangeables, comportement contractuel et limites                                |
| `02-CONSTRUCTION/11-REFACTORING`                           | Refactorer une règle de calcul de disponibilité en conservant le contrat public                            | Tests avant/après, diff lisible, compatibilité et justification                                |
| `02-CONSTRUCTION/12-TYPESCRIPT/01_ts_basics`               | Typer une demande, un résultat et une erreur sans masquer les états possibles                              | Types explicites, compilation attendue et cas impossible refusé                                |
| `02-CONSTRUCTION/12-TYPESCRIPT/03_ts_advanced`             | Modéliser un résultat générique ou une transition discriminée sans assertion forcée                        | Type inféré, cas exhaustifs et exemple d’erreur détectée                                       |
| `02-CONSTRUCTION/12-TYPESCRIPT/04_typescript_tooling`      | Faire échouer le contrôle statique lorsqu’un contrat TypeScript est cassé                                  | Commande de typecheck, problème volontaire et résultat attendu                                 |
| `02-CONSTRUCTION/13-RUNTIME-ENV/06_node_cli_scripts`       | Importer un lot de demandes depuis un fichier, valider puis produire un rapport de rejets                  | Entrée synthétique, sortie, code retour et reprise sans doublon                                |
| `02-CONSTRUCTION/03-TESTING`                               | Définir les cas nominal, limite et négatif d’une réservation concurrente                                   | Test qui échoue avant la correction et passe après ; invariant testé                           |
| `03-PILOTAGE/03-QUALITY-SHIELD`                            | Bloquer une livraison si un test de régression critique échoue                                             | Gate explicite, résultat de contrôle et procédure de correction                                |
| `02-CONSTRUCTION/08-DATA-SPELLS`                           | Ingestérer des événements, mettre les invalides en quarantaine puis réconcilier les doublons               | Contrat, idempotence, quarantaine et compte de réconciliation                                  |
| `02-CONSTRUCTION/21-CLIENT-SYSTEMS-FLUTTER`                | Conserver un brouillon local et résoudre un conflit au retour du réseau                                    | État local, reprise, règle de conflit et preuve de non-duplication                             |
| `03-PILOTAGE/08-PRODUIT-COUT-ROI`                          | Calculer le coût par demande terminée et décider si une amélioration se justifie                           | Hypothèses, coût complet, bénéfice mesurable et seuil de décision                              |
| `03-PILOTAGE/02-WEB-INCLUSIVE/08_i18n`                     | Afficher date, heure, devise et pluriels selon une locale sans changer la valeur métier                    | Locale de test, format rendu et stockage indépendant du format                                 |
| `04-EPREUVE/03-REALTIME/03_webrtc`                         | Définir l’état d’une session temps réel et ses sorties en cas de coupure                                   | Machine d’état, fin de session et limites du transport ; Kintana reste un scénario illustratif |
| `05-MAITRISE/06-ANNEXES/19_interview`                      | Expliquer un choix technique à partir d’un incident ou d’un besoin Kintana sans réciter une réponse        | Réponse structurée, compromis, contre-question et limite reconnue                              |
| `05-MAITRISE/06-ANNEXES/23_reading`                        | Relier une source technique externe à un problème Kintana sans confondre recommandation et preuve          | Source primaire, date, affirmation vérifiable et limite de transfert                           |
| `05-MAITRISE/06-ANNEXES/25_soft_skills`                    | Faire clarifier un désaccord entre demandeur, agent et exploitation                                        | Reformulation, intérêts distincts, accord explicite et point non résolu                        |
| `03-PILOTAGE/11-LEADERSHIP-MENTORAT`                       | Préparer une décision et recueillir une adoption réelle seulement lorsqu’un collectif existe               | RFC/ADR, objections, décision ; adoption corroborée séparément de la simulation                |
| `03-PILOTAGE/10-TEAM-CRAFT`                                | Faire une revue utile d’un changement touchant un contrat partagé                                          | Commentaire contextualisé, risque, action et décision documentée                               |
| `03-PILOTAGE/09-TEAM-QUEST`                                | Débloquer une dépendance entre deux rôles ayant des objectifs différents                                   | Carte de responsabilité, accord, risque restant et suivi                                       |

| `02-CONSTRUCTION/02b-BOSS-1` | Suivre une demande de sa validation jusqu’à sa réponse, provoquer une rupture contrôlée puis la diagnostiquer | Parcours, cas négatif, cause, correction et test de non-régression |
| `02-CONSTRUCTION/18-WEB-CONCEPTS/97-CHECKPOINT-PACK` | Décrire un échange navigateur/API avec ses statuts et ses frontières | Requête, réponse, statut, origine et comportement du navigateur |
| `05-MAITRISE/02-SCALABILITY` | Simuler une hausse de charge sur les accès dominants et identifier le premier goulot | Profil, hypothèse de saturation, mesure et compromis de capacité |
| `05-MAITRISE/06-ANNEXES/README` | Choisir une ressource de transfert adaptée à une lacune identifiée, sans refaire tout le parcours | Lacune, ressource ciblée, exercice différent et résultat de rappel |
| `00-SOCLE/01-GETTING-STARTED` | Exécuter un premier cycle écrire → exécuter → observer → corriger sur une donnée non sensible | Commande, entrée, sortie, erreur contrôlée et trace de correction |
| `00-SOCLE/01-GETTING-STARTED/97-CHECKPOINT-PACK` | Expliquer le cycle écrire → exécuter → observer → corriger avec une petite entrée | Entrée, sortie attendue, erreur contrôlée et trace de correction |

Si le sous-module n’est pas listé, utilise la mission de son grand domaine et surtout son challenge propre. Une mission Kintana est facultative lorsqu’elle rend l’exercice artificiel : dans ce cas, conserve le problème abstrait du module et indique pourquoi le cas commun ne s’y applique pas.

### Progression cumulative du module Web Concepts : un seul artefact, huit incréments

Les huit missions ci-dessous prolongent le même dossier Kintana. Elles ne demandent pas de recommencer un projet à chaque leçon et ne créent aucune gate supplémentaire : chaque étape ajoute une preuve ciblée au livrable précédent. La pratique locale de la leçon reste prioritaire ; l’incrément Kintana est un transfert guidé.

| Étape | Leçon                                                                                                  | Incrément ajouté au même artefact                                                                                                                   | Preuve attendue                                                                                           |
| ----: | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
|   1/8 | [Pourquoi ce module mérite ton temps](../../02-CONSTRUCTION/18-WEB-CONCEPTS/01-00-why-web-concepts.md) | Cadrer le parcours demandeur et tracer les frontières navigateur, API et source de vérité.                                                          | Carte du parcours, hypothèses, non-objectifs et trois scénarios d’échec.                                  |
|   2/8 | [HTTP et REST](../../02-CONSTRUCTION/18-WEB-CONCEPTS/02-http_rest_basics.md)                           | Définir le contrat de création et de consultation d’une demande : méthode, chemin, headers, payload, réponses et erreurs.                           | Exemples de requêtes/réponses et comportement explicite des retries/idempotency key.                      |
|   3/8 | [Browser render pipeline](../../02-CONSTRUCTION/18-WEB-CONCEPTS/03-browser_render_pipeline.md)         | Concevoir une page publique de centre de service et diagnostiquer son chemin HTML/CSS/JS jusqu’au rendu.                                            | Schéma du pipeline, mesure ou scénario de profilage, problème de rendu identifié et correction justifiée. |
|   4/8 | [State et dataflow](../../02-CONSTRUCTION/18-WEB-CONCEPTS/04-state_and_dataflow.md)                    | Modéliser l’état du brouillon, de la requête, de la synchronisation et de la demande confirmée.                                                     | Machine d’états, propriétaires de données, transitions et cas de réponse tardive.                         |
|   5/8 | [Caching strategies](../../02-CONSTRUCTION/18-WEB-CONCEPTS/05-caching_strategies.md)                   | Définir ce qui peut être mis en cache, sa durée de fraîcheur et son invalidation, sans faire passer une disponibilité périmée pour une réservation. | Matrice donnée/cache/TTL/invalidation/fallback et cas de conflit de créneau.                              |
|   6/8 | [Authentification et autorisation](../../02-CONSTRUCTION/18-WEB-CONCEPTS/06-auth_authz.md)             | Définir les droits du demandeur, de l’agent, du superviseur et de l’administrateur côté serveur.                                                    | Matrice rôle/action/ressource et tests positifs/négatifs d’accès.                                         |
|   7/8 | [Sérialisation](../../02-CONSTRUCTION/18-WEB-CONCEPTS/07-serialization.md)                             | Stabiliser les DTO JSON de création et de consultation d’une demande, avec validation et erreurs explicites.                                        | Fixtures JSON synthétiques, règles de validation et test des champs absents/invalides.                    |
|   8/8 | [SEO et rendering](../../02-CONSTRUCTION/18-WEB-CONCEPTS/08-seo_and_rendering.md)                      | Choisir le mode de rendu des pages publiques et séparer strictement ces pages des espaces privés.                                                   | Matrice route/rendu/fraîcheur/indexation et preuve qu’aucune donnée privée ne fuit dans le HTML public.   |

À chaque étape, conserve les preuves précédentes et n’étiquette jamais une simulation comme une observation de production. Si une leçon ou une technologie n’est pas encore acquise, reporte seulement l’implémentation qui en dépend ; la carte de conception peut être préparée sans fabriquer une validation.

## 8. Comment AF fait grandir le produit

| Étape AF          | Tranche Kintana                                      | Preuve attendue                                                |
| ----------------- | ---------------------------------------------------- | -------------------------------------------------------------- |
| 00 : Socle        | Modèle de demande, règles pures, données validées    | Code simple, tests et explication des états                    |
| 01 : Cadrage      | Parcours utilisateur, cas ambigus, erreurs et délais | Besoin, non-objectifs, hypothèses et scénarios                 |
| 02 : Construction | API, persistance, contrats, client, tests            | Code exécutable, migrations et suite de tests                  |
| 03 : Pilotage     | Sécurité, observabilité, CI/CD, SLO, coûts           | Runbook, mesures, rollback et postmortem                       |
| 04 : Épreuve      | Intégration, changement de spec, incident injecté    | Capstone reproductible et arbitrages défendus                  |
| 05 : Maîtrise     | Évolution de plusieurs composants et gouvernance     | RFC/ADR, revue externe et preuve d'adoption lorsqu'elle existe |
| Annexes           | Data, ML, AI, Platform et leadership                 | Labs spécialisés et limites explicites                         |

## 9. Définition de « terminé »

Une tranche est terminée si elle possède :

1. un comportement utile lié au besoin métier ;
2. un test du cas normal et des cas de panne/limite ;
3. une preuve reproductible (commande, sortie, version, jeu de données) ;
4. une décision ou une explication de conception ;
5. une limite reconnue et une condition de révision.

Pour revendiquer un résultat terrain, ajoute la date, l'environnement, la population réellement concernée, la mesure initiale, la mesure finale, les biais et la revue indépendante disponible. Sans cela, étiquette le résultat `LAB` ou `SIMULATION`.

## 10. Règle de scope

Kintana est un cas d’étude pédagogique partagé, pas une excuse pour construire une usine à gaz. Commence par un monolithe modulaire, une base relationnelle et des processus simples. Ajoute queue, cache, service séparé, Kubernetes ou IA seulement quand une leçon ou une mesure montre le besoin. Chaque technologie doit acheter une capacité précise et avoir un coût assumé.

## Documents de référence Kintana

- [Architecture et règles](01-ARCHITECTURE-ET-REGLES.md) : modèle et invariants du cas fil rouge.
- [Gates et preuves](02-GATES-ET-PREUVES.md) : conditions de validation du fil rouge.
