---
stability: evolutif
acte: appliquer
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "03-PILOTAGE/12-PLATFORM-ENGINEERING/01-00-why-platform-engineering.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 03-PILOTAGE/12-PLATFORM-ENGINEERING/01-00-why-platform-engineering.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

> **SCÈNE CRAZYDEVS : Prison Break :** Scofield ne demande pas à chaque détenu de comprendre toute la plomberie. Il cache la complexité derrière quelques chemins fiables. Une IDP fait la même chose pour les équipes.

# Internal Developer Platform : rendre le chemin sûr accessible en self-service

## 1. Définition

Une **Internal Developer Platform (IDP, plateforme interne pour les développeurs)** est un ensemble cohérent de services, d'API, de modèles, d'automatisations et de garde-fous qui permet aux équipes produit de réaliser des tâches techniques courantes sans connaître chaque détail de l'infrastructure sous-jacente.

Une IDP n'est ni un simple portail web, ni un catalogue de liens, ni une équipe qui valide manuellement chaque demande. Le portail peut être une interface ; la plateforme est le système de capacités qui exécute les demandes et applique les règles.

## 2. Pourquoi elle existe

À mesure que plusieurs équipes livrent des services, elles répètent les mêmes tâches : créer un dépôt, configurer CI, provisionner une base, gérer une identité, créer des dashboards, déclarer des alertes et déployer. Chaque équipe qui réinvente ces procédures augmente les coûts de maintenance et les écarts de sécurité.

L'IDP réduit cette répétition tout en gardant des responsabilités claires. Elle ne supprime pas la responsabilité des équipes produit : elle leur fournit un chemin utilisable et des limites explicites.

## 3. Architecture et responsabilités

```text
[Développeur / équipe produit]
             |
             v
[Portail ou CLI de self-service]
             |
             v
[Catalogue + templates + workflows]
             |
       paramètres validés
             v
[API de plateforme / orchestrateur]
       |             |             |
       v             v             v
[CI/CD]       [Identité/secrets] [Provisioning]
       |             |             |
       +-------------+-------------+
                     v
        [Environnements / services]
                     |
          métriques, logs, traces
                     v
      [Observabilité + gouvernance]
                     |
             feedback / évolution
                     +------> équipe plateforme
```

- **Équipe produit** : responsable du code métier, des tests, des données et de l'exploitation du service dans les limites convenues.
- **Équipe plateforme** : responsable des capacités partagées, de leur disponibilité, sécurité, documentation et évolution.
- **Sécurité/SRE/FinOps** : définit les politiques, accompagne les risques et fournit des contrôles automatisables.
- **Portail/CLI** : expose les opérations, mais ne doit pas être l'unique manière de comprendre ou de déboguer le système.
- **Orchestrateur** : valide les entrées, applique les workflows, journalise les opérations et gère les erreurs/reprises.

## 4. Concevoir le self-service

Un workflow de création de service devrait :

1. demander un nom, une équipe propriétaire, une criticité, un environnement et un contact d'astreinte ;
2. valider le format et les règles de nommage ;
3. générer un dépôt depuis un template versionné ;
4. appliquer les permissions minimales ;
5. créer une pipeline et des contrôles qualité ;
6. enregistrer les secrets dans leur coffre, sans les afficher ;
7. provisionner uniquement les ressources autorisées ;
8. créer dashboards et alertes de départ ;
9. fournir une documentation opératoire et un identifiant de demande.

Les opérations longues doivent être idempotentes (les relancer ne doit pas créer des ressources en double), observables et reprenables après échec. Une demande doit permettre d'identifier qui a demandé quoi, à quel moment, avec quels paramètres et quel résultat.

## 5. Garde-fous et gouvernance

Un bon self-service ne donne pas un accès administrateur à tous. Il encode des limites : quotas, tailles autorisées, région, chiffrement, politique de réseau, propriétaires, rétention, budget, identité et durée de vie. Les exceptions doivent être possibles mais explicites, motivées, expirables et auditées.

Distinguer **standardisation** et **uniformité forcée** : imposer un socle sécurisé est pertinent ; interdire toute différence sans raison peut empêcher un cas légitime. Fournir une voie d'exception documentée avec propriétaire et date de réexamen.

## 6. Exemple fil rouge

L'équipe `Checkout` veut créer `orders-api`. Depuis le portail, elle sélectionne un template backend, choisit un niveau de criticité, une base managée et une région autorisée. Le workflow crée dépôt, pipeline, identité de runtime, coffre de secrets, environnement de test et dashboard. La plateforme refuse une taille de base non autorisée, explique la politique concernée et propose l'option approuvée la plus proche.

À l'échec du provisioning, la demande passe à `FAILED_WITH_COMPENSATION` : les ressources créées sont listées, les actions sûres sont compensées, et l'utilisateur reçoit l'étape qui nécessite une intervention. Le système ne relance pas aveuglément toutes les créations.

## 7. Pièges

- Construire un portail avant d'avoir compris les tâches répétitives des équipes.
- Mesurer le nombre de clics du portail plutôt que le temps et les erreurs évités.
- Créer un catalogue de templates obsolètes sans propriétaire.
- Confondre self-service et accès illimité.
- Cacher les détails techniques : le développeur doit pouvoir voir les logs et comprendre l'état.
- Créer une dépendance à une personne centrale pour les opérations de routine.

## 8. Exercice et vérification

Dessiner l'architecture d'un workflow « créer un service HTTP ». Définir acteurs, entrées, validations, API, ressources créées, permissions, journaux, reprises et compensations. Simuler un échec après création du dépôt mais avant provisionnement de la base.

**Critères :** aucune ressource dupliquée au retry ; permissions minimales ; état de demande observable ; propriétaire identifié ; coût et quotas contrôlés ; procédure de compensation ; documentation de sortie exploitable.

## 9. Lien et preuve de maîtrise

Prérequis : GitOps, CI/CD, sécurité des identités, cloud et observabilité. Suite : Golden Paths, Platform as a Product et SLO.

**Preuve attendue :** une architecture de plateforme avec frontières de responsabilité, workflow self-service, garde-fous, stratégie d'échec/reprise et métriques qui démontrent un gain réel pour les équipes.

## Question de conception conservée

Identifie ce qui mérite une abstraction commune (workflow réellement répété, politique de sécurité, observabilité) et ce qui doit rester libre au niveau de l'équipe (logique métier, choix de domaine). Toute abstraction doit avoir un utilisateur, un propriétaire, un coût de maintenance et une voie de sortie.

<!-- AF-LESSON-PROFILE: runtime -->

## Repères de décision

- **Pourquoi :** Le runtime détermine les APIs disponibles, le cycle de vie, la configuration et les ressources. Confondre Node, navigateur et processus peut créer des bugs impossibles à reproduire.
- **Quand l’utiliser / quand l’éviter :** Choisis l'environnement selon les capacités requises. Déclare configuration, arrêt et signaux de santé ; ne suppose pas que toutes les APIs ou variables existent partout.
- **Limites :** Le même code ne se comporte pas toujours pareil selon version, OS, runtime et permissions. Une variable d'environnement ne remplace pas un gestionnaire de secrets.

## Mécanisme : la version sans magie

Déclare les prérequis, lit la configuration à un point contrôlé, valide au démarrage, expose un état de santé et ferme proprement les ressources.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Internal Developer Platform : rendre le chemin sûr accessible en self-service** se rattache à ce cas concret : Le service Kintana doit démarrer avec une configuration explicite et s'arrêter sans perdre les traitements déjà acceptés.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Service Kintana reproductible et arrêtable

> **Arc Walking Dead :** le code ne vit pas dans le vide. Runtime, processus, fichiers et variables d'environnement sont le camp autour de lui.

**Mission liée à « Internal Developer Platform : rendre le chemin sûr accessible en self-service » :** Ajoute un contrôle de configuration et un arrêt propre au composant Kintana concerné. Sépare les variables obligatoires/optionnelles, valide leur format et vérifie le comportement sous SIGTERM si le runtime le permet.

**Livrable :** module de configuration, validation au démarrage, health/readiness si service, smoke test et note des différences runtime.

**Critères d’acceptation :** les erreurs de configuration échouent tôt ; aucun secret n'est journalisé ; l'arrêt ferme les ressources ; les APIs Node et navigateur ne sont pas confondues.

**Transfert obligatoire :** Exécute dans un conteneur ou un environnement qui ne possède pas les mêmes variables et permissions. Documente le diagnostic exact.
