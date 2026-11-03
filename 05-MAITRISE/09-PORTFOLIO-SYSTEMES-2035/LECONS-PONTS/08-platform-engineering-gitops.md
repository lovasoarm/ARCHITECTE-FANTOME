---
stability: evolutif
acte: apprendre
noyau: non
route: depth
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/08-platform-engineering-gitops.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/08-platform-engineering-gitops.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# Leçon-pont 08 : Platform Engineering, conteneurs et GitOps

> **Arc One Piece :** Mini-Heroku construit un petit port où les équipes déposent leur service. Mais un port sans contrôle d'accès, sans météo ni canot de sauvetage, c'est juste un naufrage avec un logo.

<!-- AF-DIAGRAM:platform -->

## Repère visuel utile : Chaîne de livraison

```text
commit -> CI -> image immuable -> manifest désiré
                                  |
                                  v
                           déploiement
                                  |
                         health + observabilité
                                  |
                          drift / incident
                                  |
                         rollback vérifié
```

<!-- AF-LESSON-PROFILE: platform -->

## Résultat attendu

Comprendre la chaîne complète commit → build → artefact → déploiement → observation → rollback. Construire d'abord une plateforme locale simple ; ne pas commencer par Kubernetes.

## Modèle mental

```text
Code + tests
    |
    v
CI -> build reproductible -> image immuable + SBOM
                                  |
                                  v
                         registre / artefact
                                  |
                                  v
                 manifest déclaratif (desired state)
                                  |
                                  v
                  deploy -> health -> traffic
                                  |
                   observation / drift / incident
                                  |
                          rollback / recovery
```

## Pourquoi une plateforme devient utile

Quand chaque équipe réinvente le build, le déploiement, les secrets, les alertes et le rollback, les erreurs se répètent et les mises en production deviennent imprévisibles. Une plateforme fournit un chemin standard et des garde-fous. Pour un petit projet solo, une CI simple et un script documenté peuvent toutefois suffire : l’objectif n’est pas de construire une usine à YAML.

## Notions à apprendre

- **Processus et signaux** : PID, exit code, stdout/stderr, arrêt gracieux, timeout et gestion des enfants.
- **Container** : isolation de processus et de filesystem à l'aide de mécanismes du noyau ; ce n'est pas une VM complète ni une frontière magique.
- **Image immuable** : versionner l'image par digest, séparer build et runtime, ne pas embarquer les secrets.
- **Health vs readiness** : « le processus tourne » n'est pas « il peut recevoir du trafic ». Définir les deux selon le service.
- **CI/CD** : tests, build, scan, artefact, promotion entre environnements, approbation et déploiement.
- **Rollout/rollback** : stratégie progressive, compatibilité schéma/app, critères d'arrêt, retour à un artefact connu.
- **GitOps** : l'état souhaité est versionné ; un contrôleur rapproche l'état réel et signale le drift. Le GitOps n'est pas juste un YAML commité.
- **IaC** : décrire les ressources de façon reproductible ; gérer état, secrets, plan, import et destruction. Pour Mini-Heroku, une abstraction simple peut précéder Terraform.
- **FinOps et quotas** : CPU, mémoire, stockage, bande passante et appels externes doivent avoir limites et propriétaires.

## Quand l'utiliser / quand l'éviter

Platform Engineering devient utile lorsque plusieurs services/équipes répètent les mêmes chemins de livraison et ont besoin de garde-fous cohérents. Pour un seul service, un script clair et une CI peuvent suffire. Kubernetes est une option d'orchestration, pas une condition d'entrée.

## Limites

Un conteneur n'est pas une sandbox complète. GitOps ne vérifie pas la qualité de ton état désiré. Un rollback applicatif peut être dangereux si une migration de données est irréversible. Une image reproductible ne garantit pas une application sûre.

## Mécanisme : le modèle mental à retenir

Le système est fiable quand chaque étape possède un contrat, un état observable, une règle d'échec et une preuve indépendante. Sépare les mécanismes ; ne laisse pas une démo réussie masquer une étape non vérifiée.

## Leçons AF à faire

- [Shell Survival](../../../00-SOCLE/01-GETTING-STARTED/04-shell_survival.md), [Git 101](../../../00-SOCLE/01-GETTING-STARTED/05-git_101.md), [runtime/process](../../../02-CONSTRUCTION/13-RUNTIME-ENV/05-process_env_argv.md).
- [Cloud Foundations](../../../03-PILOTAGE/07-CLOUD-FOUNDATIONS/README.md), notamment [architecture réseau/identité/reprise](../../../03-PILOTAGE/07-CLOUD-FOUNDATIONS/08-ARCHITECTURES-RESEAUX-IDENTITES-REPRISE.md).
- [Quality Shield](../../../03-PILOTAGE/03-QUALITY-SHIELD/README.md), [GitOps](../../../03-PILOTAGE/12-PLATFORM-ENGINEERING/02-gitops-and-drift.md), [IDP](../../../03-PILOTAGE/12-PLATFORM-ENGINEERING/03-internal-developer-platform.md), [Platform Ops 75](../../../06-ANNEXES-TRANSVERSES/75-LAB-PLATFORM-OPERATIONS/README.md), [DevOps/SRE 59](../../../06-ANNEXES-TRANSVERSES/59-LAB-DEVOPS-LIFECYCLE.md).
- [Secrets et supply chain](../../../03-PILOTAGE/04-SECURITY/11-secrets_et_rotation.md) et [06 : Zero Trust](06-zero-trust-et-supply-chain.md).

## Ancrage produit / terrain : Kintana

Dans Kintana, le scénario d'étude utilise des données synthétiques et un environnement local. L'objectif est de prouver le mécanisme et ses limites ; il ne s'agit pas d'une mesure de production. Garde une trace de l'entrée, du résultat, du cas d'échec et du niveau de preuve (`CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION`).

## Mission utile : Mini-Heroku local

Construis un runner qui déploie un seul type de service depuis une image immuable. Il lit un manifest (commande, image, ressources, ports, health checks, références de secrets), refuse les valeurs hors budget, vérifie readiness et garde un rollback vers la version précédente.

**Livrable :** manifest versionné, CI, image, runbook, politique de ressources, détection de drift, simulation de panne et preuve de rollback.

**Critère de sortie :** une release échouée ne reçoit pas le trafic ; le rollback restaure le service ; les secrets n'apparaissent pas dans image/logs ; les limites de ressources sont réellement appliquées dans le labo.

## Transfert obligatoire

L'image est saine mais la migration de base a supprimé une colonne dont l'ancienne version a encore besoin. Prouve que ta stratégie de rollout respecte la compatibilité ou explique pourquoi un rollback simple n'est plus sûr.

## Références

[06 : Mini-Heroku](../06-mini-heroku.md) · [59 : DevOps/SRE](../../../06-ANNEXES-TRANSVERSES/59-LAB-DEVOPS-LIFECYCLE.md).
