---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [fausse_piste, decision_organisationnelle]
anti_recipe_key: fausse_piste+decision_organisationnelle
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Quand ranger en tables fait plus de mal que de bien

Temps de lecture ~10 min

`01_sql_basics` t'a montré le modèle relationnel : tables, contraintes, relations et transactions. Le schéma SQL n'est pas « figé pour toujours » : on le fait évoluer avec des migrations, et certains moteurs proposent aussi des colonnes JSON. NoSQL regroupe plusieurs autres modèles de stockage, avec des compromis différents.

Pourquoi ça compte : imagine un dossier de demande Kintana qui contient un snapshot de pièces jointes et de préférences propres à un parcours. Un document peut être pratique si ces données sont lues et écrites comme un agrégat. Mais une table SQL avec des colonnes `NULL` n'est pas automatiquement un défaut : les attributs variables peuvent aussi être normalisés dans des tables liées. Ne choisis pas un document uniquement pour éviter des `NULL`.

Avantages possibles : modèle adapté à certains agrégats ou accès, distribution horizontale prise en charge par certains moteurs et schéma plus flexible.
Coûts possibles : cohérence à organiser, duplication à maintenir, contraintes d'intégrité parfois déplacées dans l'application, et requêtes/ops propres au moteur. Ce n'est pas vrai de tous les produits NoSQL au même degré.

---

## 1) LES QUATRE FAMILLES : PAS UNE SEULE "NOSQL"

Erreur de débutant : penser que "NoSQL" = MongoDB. NoSQL est une catégorie, pas une techno. Quatre familles principales :

```text
DOCUMENT   --> MongoDB, Firestore : des objets JSON-like, schéma flexible
CLÉ-VALEUR  --> Redis, DynamoDB : une clé pointe vers une valeur, ultra rapide
COLONNE LARGE --> Cassandra, ScyllaDB : optimisé pour écrire/lire des colonnes massives
GRAPHE    --> Neo4j : optimisé pour les RELATIONS entre données (réseau social, recommandations)
```

Chaque famille résout un problème précis. Aucune n'est "la meilleure" : c'est la question qui est mal posée.

---

## 2) DOCUMENT : DES OBJETS, PAS DES LIGNES

```js
// Un document MongoDB : ressemble à un objet JS, parce que c'est littéralement du BSON
// (binary JSON : JSON encodé en binaire pour la perf)
{
 _id: "65f3a2...",
 ninja_name: "Kakashi",
 village: "Konoha",
 abilities: {
  sharingan: true,
  chakra_nature: ["lightning", "earth", "water"]
 },
 missions_completed: 1141
}
```

Le pourquoi : pas besoin de `JOIN` pour récupérer les capacités d'un ninja, elles sont DANS le document. Tu lis un document, t'as tout ce qui concerne ce ninja d'un coup.

```text
SQL : ninjas (table) + abilities (table) --> JOIN pour tout récupérer
DOCUMENT : ninjas (collection) avec abilities imbriqué --> 1 lecture, tout est là
```

Le risque réel : tu dupliques de la donnée partout (dénormalisation : vue dans `03_data_modeling`) pour éviter les jointures. Si le `village` d'un clan change de nom, et que ce nom est dupliqué dans 10 000 documents `missions` (pour éviter une jointure), tu dois mettre à jour 10 000 documents. En SQL, tu changes 1 ligne dans `villages`, et le `JOIN` répercute automatiquement.

```js
// Exemple qui casse : duplication oubliée
// On a stocké le village dans chaque mission pour aller plus vite
{ missionId: 1, village: "Konoha", objective: "Escorte" }
{ missionId: 2, village: "Konoha", objective: "Infiltration" }

// Le village change de nom suite à une réorganisation narrative
// Si tu oublies de mettre à jour TOUTES les missions existantes :
{ missionId: 1, village: "Konoha", objective: "Escorte" }  // donnée périmée (stale data)
{ missionId: 2, village: "Feuille", objective: "Infiltration" } // mise à jour, incohérent avec missionId 1
```

---

## 3) CLÉ-VALEUR : LA VITESSE BRUTE

```text
clé           --> valeur
"session:abc123"    --> { ninjaId: 42, rank: "Jonin" }
"cache:mission:99"   --> { objective: "...", danger_level: 5 }
"ratelimit:ip:1.2.3.4" --> 12
```

Le pourquoi : pas de requête complexe, pas de `WHERE`, pas de `JOIN`. Tu connais la clé, tu demandes la valeur. Redis travaille souvent en mémoire, mais la latence observée dépend aussi du réseau, de la sérialisation, de la charge, de la persistance et du déploiement. Ne compare pas une mesure Redis locale à une requête SQL distante comme si seule la technologie expliquait l'écart.

```js
// Lire/écrire une session : ultra simple, ultra rapide
await redis.set("session:abc123", JSON.stringify({ ninjaId: 42 }), "EX", 3600);
const session = JSON.parse(await redis.get("session:abc123"));
```

Le quand : cache (vu en détail dans `04_redis_caching`), sessions, rate limiting, compteurs en temps réel, queues simples. Pas pour des données qui ont besoin de requêtes complexes ("tous les ninjas actifs ce mois avec plus de 5 missions" : impossible nativement en clé-valeur pur).

---

## 4) COLONNE LARGE : ÉCRIRE BEAUCOUP, VITE, PARTOUT

Pensé pour des volumes massifs (logs, IoT, séries temporelles) répartis sur plusieurs machines (distributed : distribué).

```text
TABLE SQL classique : une ligne = toutes ses colonnes ensemble, sur une machine

COLONNE LARGE : optimisé pour écrire des colonnes en masse,
réparties sur plusieurs noeuds (nodes) du cluster
```

Le pourquoi : quand t'as 50 000 capteurs de surveillance du village qui écrivent une métrique par seconde, une DB relationnelle classique sature vite en écriture sur une seule machine. Une DB colonne large comme Cassandra est faite pour distribuer cette charge d'écriture sur plusieurs machines sans single point of failure (point unique de panne).

Le risque réel : ces DB sacrifient souvent la cohérence forte (vu dans `05-MAITRISE/02-SCALABILITY`) pour la disponibilité et la vitesse. Tu peux lire une donnée légèrement périmée juste après une écriture (eventual consistency : cohérence éventuelle). Si ton métier ne tolère pas ça (transaction financière), c'est disqualifiant.

---

## 5) GRAPHE : QUAND LA RELATION EST LA DONNÉE

```text
SQL : pour « alliés des alliés qui partagent le même Sensei »
--> plusieurs jointures explicites ; le moteur peut les optimiser selon les statistiques et les index

GRAPHE : Ninja --[TRAINED_BY]--> Sensei --[TRAINED]--> Ninja
--> la relation est représentée directement dans le modèle graphe

Le modèle graphe peut rendre la requête plus naturelle. Il n'est pas automatiquement plus rapide : compare le plan, la cardinalité, les index et une charge représentative.
```

Le pourquoi : dans un réseau de clans ou un moteur de recommandation, la question peut être « qu'est-ce qui est connecté à quoi, et par quel chemin ? ». Une base graphe traite les relations comme des éléments centraux du modèle, ce qui peut simplifier certaines traversées. La vitesse réelle dépend toutefois de la cardinalité, des index, du motif de requête, de la taille du graphe, du moteur et de la distribution.

```text
SQL pour « alliés de mes alliés » : plusieurs jointures explicites, que le moteur peut optimiser selon les statistiques et les index.

GRAPHE : MATCH (me)-[:ALLY]->()-[:ALLY]->(indirect) RETURN indirect
--> motif de traversal exprimé directement dans le modèle graphe.

Aucune des deux approches n'est automatiquement plus rapide : compare un plan de requête et une charge représentative avant de conclure.
```

Le quand : réseaux de clans, recommandations de missions par affinité, détection de trahisons (réseaux de ninjas liés à l'ennemi). Le risque : c'est une techno de niche, l'équipe doit apprendre un nouveau langage de requête (Cypher pour Neo4j), et c'est rarement justifié pour un jutsu simple.

---

## 6) CHOISIR : LA VRAIE QUESTION

```text
Pose-toi ces questions, dans cet ordre :

1. Mes données ont-elles un schéma stable et des relations fortes ?
  --> OUI : SQL (relationnel) est probablement le bon choix par défaut

2. Mes données forment-elles un agrégat imbriqué, généralement lu/écrit ensemble, et dont les accès sont plus naturels sous forme de document ?
  --> OUI : un document peut convenir, si ses règles de cohérence et d'évolution sont maîtrisées. Un schéma variable ou des colonnes NULL ne suffisent pas à justifier ce choix.

3. J'ai besoin de lire/écrire UNE valeur identifiée par UNE clé, ultra vite ?
  --> OUI : CLÉ-VALEUR (Redis)

4. J'ai une charge distribuée à fort débit, des motifs d'accès prévisibles et un besoin de partitionnement horizontal ?
  --> COLONNE LARGE (Cassandra/ScyllaDB) peut convenir ; vérifie le modèle de requêtes, les clés de partition et les compromis de cohérence.

5. Ma question métier principale porte-t-elle sur des traversées de relations (chemins, voisinage, recommandations) ?
  --> OUI : GRAPHE (Neo4j) peut simplifier le modèle ; mesure les requêtes et l'exploitation avant de retenir ce choix.
```

Le piège classique : choisir NoSQL parce que "c'est plus moderne" ou parce qu'une grosse boîte l'utilise. Pose plutôt ces questions : quels accès doivent être rapides ? Quelles contraintes doivent rester atomiques ? Quelle cohérence est requise ? Qui opère les sauvegardes, migrations et reprises ? L'équipe sait-elle diagnostiquer ce moteur ? Michael Scofield ne choisit pas un outil d'évasion parce qu'il est populaire : il vérifie d'abord la contrainte réelle. Même logique pour une base.

---

## TIPS D'ÉVOLUTION TECHNIQUE

L'histoire du mouvement NoSQL rappelle surtout qu'aucun modèle ne remplace les autres partout. Une application qui choisit un document store peut devoir gérer explicitement certaines contraintes inter-documents ou transactions ; un système relationnel peut, lui aussi, rencontrer des limites de partitionnement ou de modèle d'accès. Aujourd'hui, un bon point de départ pour Kintana reste PostgreSQL pour les demandes, rendez-vous et invariants transactionnels. Ajoute un stockage spécialisé seulement quand un accès mesuré ou une contrainte clairement formulée le justifie, puis documente le coût opérationnel ajouté.

---

## EXERCICES : échauffement, puis vraie décision produit

**Échauffement 1 : reconnaître la forme d'accès (10 min).** Pour les quatre scénarios d'origine : cache de profils, dossier de jutsu variable, recommandation par relations et journal d'événements massif : choisis un modèle possible et écris surtout les hypothèses qui rendent ton choix valable. N'affirme pas qu'un moteur est rapide sans protocole de mesure.

**Échauffement 2 : coût de la duplication (10 min).** Prends un dossier Kintana qui embarque le nom du centre dans plusieurs documents. Liste trois changements métier qui rendraient ces copies incohérentes et propose une stratégie de mise à jour ou de lecture.

**Mission évaluée : décider du stockage du dossier de demande Kintana.** Le dossier contient l'identité du demandeur, le centre, les pièces jointes, les changements de statut, un rendez-vous et une piste d'audit. Les réservations de créneau doivent rester cohérentes sous concurrence ; le réseau mobile peut couper pendant l'envoi ; une demande peut être rejouée.

1. Écris les requêtes et invariants avant de choisir un moteur : création idempotente, réservation du dernier créneau, historique, lecture du dossier, recherche par statut et audit.
2. Propose un modèle PostgreSQL comme base de référence. Identifie séparément si un stockage documentaire ou objet apporte un avantage pour les pièces jointes ou snapshots.
3. Implémente un prototype limité de l'accès le plus risqué dans le moteur choisi. Si tu proposes un second moteur, justifie la donnée qu'il possède, les synchronisations et le mode de panne.
4. Crée un jeu synthétique reproductible (au moins 5 000 demandes et 20 000 événements), un protocole de test et des requêtes représentatives. Enregistre `EXPLAIN`/plans, temps mesurés, hardware et limites ; les résultats restent des mesures LAB.
5. Simule un rejeu de commande, deux réservations concurrentes, un échec réseau et une migration de schéma. Écris la procédure de reprise.

**Livrables :** ADR de stockage, schéma et migrations, modèle d'accès, fixtures synthétiques, tests d'invariants/concurrence, protocole et résultats LAB, plan de sauvegarde/reprise, coûts opérationnels et justification de ce que tu ne stockes PAS dans NoSQL.

**Critères d'acceptation :** aucune réservation ne dépasse la capacité ; le rejeu ne crée pas de doublon ; l'historique reste traçable ; chaque base a un propriétaire de donnée défini ; les synchronisations et pannes sont documentées ; aucun chiffre de performance n'est présenté comme mesure de production.

**Transfert :** une nouvelle contrainte arrive : le client doit fonctionner hors ligne pendant plusieurs minutes. Explique si tu changes le modèle de persistance, le protocole de synchronisation ou seulement le cache. Justifie la décision et les limites.

---

## RÉSUMÉ

NoSQL regroupe des familles de modèles différentes. Un document peut convenir à un agrégat lu/écrit ensemble ; clé-valeur à un accès principalement par clé ; colonne large à des charges distribuées structurées autour de motifs d'accès connus ; graphe à des traversées de relations. SQL reste un excellent choix par défaut quand transactions, contraintes et relations métier dominent. Le bon réflexe : partir des accès, invariants, cohérence, volumétrie et capacité d'exploitation, puis mesurer sur une charge représentative.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.

### Vérification observable : critères de réussite

Écris une assertion sur l’invariant de « Quand ranger en tables fait plus de mal que de bien », puis teste cas normal, concurrence/duplicat, interruption et reprise. Fournis la requête ou la trace et explique ce que le test ne démontre pas.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: nosql -->

## Repères de décision

- **Pourquoi :** Les modèles NoSQL répondent à certains besoins d'accès, de volume ou de distribution. Ils imposent aussi des contraintes de cohérence, d'indexation et d'évolution.
- **Quand l’utiliser / quand l’éviter :** Étudie un moteur NoSQL quand les patterns d'accès, la distribution ou la forme des agrégats justifient ses compromis. Reste sur PostgreSQL si relations, transactions et contraintes relationnelles dominent.
- **Limites :** Un schéma flexible ne signifie pas absence de schéma. La duplication, les mises à jour multi-documents, les index et la cohérence éventuelle doivent être traités explicitement.

## Mécanisme : la version sans magie

Part des requêtes concrètes, modèle la donnée pour ces accès, explicite les invariants et compare transaction, réplication, index et coût opérationnel avec une base relationnelle.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Quand ranger en tables fait plus de mal que de bien** se rattache à ce cas concret : Les demandes et créneaux Kintana sont fortement relationnels ; un stockage documentaire peut être pertinent pour certains documents ou snapshots, mais ne remplace pas automatiquement le cœur transactionnel.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Décider où NoSQL a réellement sa place

> **Arc One Piece / Grand Line :** ne change pas de navire parce que le bois est différent. Choisis le stockage selon la cargaison, les accès et les garanties nécessaires.

**Mission liée à « Quand ranger en tables fait plus de mal que de bien » :** Prends un cas Kintana précis (documents de FAQ, projections de lecture ou événements). Décris cinq requêtes réelles, propose un modèle relationnel et un modèle NoSQL, compare les garanties et implémente seulement le choix justifié dans un laboratoire isolé.

**Livrable :** matrice requêtes/modèles, ADR, schéma d'accès, tests de lecture/écriture et mesure locale documentée.

**Critères d’acceptation :** le choix est fondé sur les accès ; cohérence et transaction sont explicites ; duplication et réconciliation sont documentées ; aucune migration n'est décidée sur le seul argument « schéma flexible ».

**Transfert obligatoire :** Une requête impose une transaction atomique entre réservation et paiement. Réévalue si le modèle NoSQL choisi tient toujours.
