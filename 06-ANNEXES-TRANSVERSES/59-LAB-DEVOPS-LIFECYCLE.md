---
stability: evolutif
acte: apprendre-et-pratiquer
noyau: renfort
route: formation-complete
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "06-ANNEXES-TRANSVERSES/01-COMMENT-UTILISER-LE-PARCOURS.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 06-ANNEXES-TRANSVERSES/01-COMMENT-UTILISER-LE-PARCOURS.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# 59 : Atelier DevOps/SRE : du commit à la reprise après incident

> Le but n'est pas de collectionner des commandes Docker ou cloud. Le but est de comprendre le cycle de vie d'un système et de pouvoir démontrer qu'une livraison est reproductible, observable, réversible et récupérable. Les environnements et installations sont gérés selon le `SETUP.md` local ; ils ne remplacent jamais les expériences ci-dessous.

## Prérequis et ressources

D'abord comprendre les bases de tests et de contrats : [Testing](../02-CONSTRUCTION/03-TESTING/README.md), [API Craft](../02-CONSTRUCTION/19-API-CRAFT/README.md), [Sécurité](../03-PILOTAGE/04-SECURITY/README.md), [Observability](../03-PILOTAGE/05-OBSERVABILITY/README.md), [SLO](../03-PILOTAGE/06-FIABILITE-SLO/README.md), [Cloud Foundations](../03-PILOTAGE/07-CLOUD-FOUNDATIONS/README.md) et [Platform Engineering](../03-PILOTAGE/12-PLATFORM-ENGINEERING/README.md). Ce laboratoire relie les notions en une seule chaîne de preuve.

## Leçon 1 : Un commit n'est pas un release

### Modèle causal

`source + dépendances + configuration + outil de build → artefact → déploiement → comportement observé`.

Le résultat dépend des entrées et de l'outil de build. Si une entrée n'est ni versionnée ni consignée, deux constructions du même commit peuvent différer. Un numéro de version ne prouve pas l'identité des octets ; un hash ne prouve pas que l'artefact est sûr ; un build vert ne prouve pas que le service est sain.

### Exemple travaillé

Deux releases partagent le même code mais téléchargent une dépendance non épinglée. Le build A reçoit un correctif compatible ; le build B reçoit une version qui change une valeur par défaut. La divergence n'est pas mystérieuse : une entrée du build n'était pas reproductible.

**Ce qu'il faut démontrer :** identifier toutes les entrées de build, lier le binaire/image au commit, enregistrer les résultats de test, puis reconstruire après avoir supprimé les artefacts locaux. Si le résultat diffère, expliquer si la différence est attendue (horodatage, environnement, compilateur) ou dangereuse.

### Exercices

1. Dresse l'inventaire des entrées qui peuvent modifier le release : code, lockfile, base image, variables de build, outils, dépendances système, configuration et secrets.
2. Compare deux builds du même commit. Consigne les hashes, diff, versions d'outils et explication des écarts.
3. Introduis une régression de test. Vérifie que le pipeline bloque l'artefact et que la dernière version stable reste disponible.

**Correction attendue :** distinguer reproductibilité, provenance et qualité. Un hash permet de comparer les octets ; il ne prouve pas la sûreté. La bonne solution conserve l'artefact testé et promeut ce même artefact entre environnements plutôt que de rebâtir silencieusement à chaque promotion.

## Leçon 2 : Déployer et migrer sans supposer que tout s'arrête

### Modèle causal

Pendant un déploiement progressif, plusieurs versions peuvent être actives simultanément. Les clients, workers, caches et bases ne changent pas tous au même instant. Une migration incompatible peut donc casser une ancienne version encore en service même si la nouvelle version fonctionne seule.

### Exemple travaillé : migration « expand → migrate → contract »

Supposons qu'une table possède `display_name` et que l'application doive migrer vers `given_name` + `family_name`.

1. **Expand :** ajouter les nouvelles colonnes sans supprimer l'ancienne ; vérifier que les anciennes et nouvelles versions peuvent fonctionner avec le schéma élargi.
2. **Dual-read/write contrôlé :** définir précisément quelle représentation fait autorité pendant la transition ; instrumenter les désaccords plutôt que les masquer.
3. **Backfill :** migrer les lignes par lots, de manière idempotente et reprenable. Consigner le nombre traité, les erreurs et les lignes ambiguës.
4. **Bascule :** lire la nouvelle représentation quand le contrôle de cohérence montre qu'elle est complète ; garder un rollback qui ne perd pas les écritures récentes.
5. **Contract :** supprimer l'ancien champ seulement après avoir prouvé qu'aucun consommateur ne l'utilise et que le rollback n'en dépend plus.

Un rollback applicatif ne restaure pas automatiquement une base déjà migrée. Le plan doit préciser la compatibilité de schéma et l'éventuelle migration inverse.

### Exercices

1. Dessine les combinaisons possibles entre ancienne/nouvelle application et ancien/nouveau schéma ; marque lesquelles sont sûres.
2. Simule un backfill interrompu au milieu et relance-le. Le résultat doit être idempotent.
3. Ajoute un client qui continue à utiliser l'ancien champ. Décide quand il devient sûr de supprimer ce champ.
4. Compare rollback applicatif, roll-forward et restauration de base ; explique les pertes de données possibles.

**Correction attendue :** une stratégie qui n'a testé que « ancien code + ancien schéma » et « nouveau code + nouveau schéma » est insuffisante si le déploiement fait coexister plusieurs versions. Le backfill doit reprendre sans doublon, et le contract attend la preuve de l'absence de consommateurs.

## Leçon 3 : Mesurer le service avant de décider

Un log décrit un événement ; une métrique agrège un comportement ; une trace aide à relier les étapes d'une requête. Aucun signal seul ne donne tout le contexte. Le SLI doit refléter une expérience importante pour l'utilisateur, tandis que le SLO exprime la cible et l'intervalle d'évaluation.

### Petit jeu de données

On observe 10 000 requêtes pendant une fenêtre :

- 9 940 réponses satisfont la définition de succès métier ;
- 60 réponses sont des échecs ;
- la latence p95 est de 420 ms ;
- la latence p99 est de 2,4 s.

Le taux de succès observé est `9 940 / 10 000 = 99,4 %`. Le p95 et le p99 racontent une autre dimension : une minorité peut subir une attente très élevée même si la majorité réussit. Ne transforme pas automatiquement le taux de succès en disponibilité calendaire : la fenêtre, le dénominateur et l'exclusion des requêtes doivent être définis.

### Exercices

1. Écris la définition exacte d'un SLI de succès et d'un SLI de latence. Précise les requêtes exclues et pourquoi.
2. Propose un SLO, son intervalle, sa source de mesure et la conséquence d'un dépassement. Justifie le choix par un besoin utilisateur.
3. Dessine une alerte qui entraîne une action ; supprime une alerte qui n'a aucun propriétaire ni décision associée.
4. Injecte une panne lente, pas uniquement un crash. Compare logs, traces, taux d'erreur et percentiles.

**Correction attendue :** `99,4 %` est le ratio fourni par ce jeu de données. On ne peut pas conclure à une indisponibilité de 0,6 % du temps, car le dénominateur est constitué de requêtes. Le p99 de 2,4 s justifie une investigation même si le p95 semble acceptable, selon le contrat utilisateur.

## Leçon 4 : Récupération : RPO/RTO mesurés, pas promis

- **RPO** : quantité de données que l'on accepte de perdre, exprimée dans une unité de temps ou via un point de restauration daté.
- **RTO** : délai cible pour remettre le service dans un état utilisable.

### Exemple travaillé

Une panne démarre à 10:37. Le dernier point de sauvegarde dont l'intégrité a déjà été contrôlée correspond à 10:30. Le service et les données restaurées sont validés à 11:22.

- Perte de données potentielle : 7 minutes. Un RPO cible de 15 minutes est respecté par ce scénario, sous réserve que le point de sauvegarde contienne réellement les données annoncées.
- Temps de reprise : 45 minutes. Un RTO de 45 minutes est atteint exactement, sans marge.
- La simple présence d'un fichier de backup ne prouve rien tant que la restauration, les contrôles d'intégrité et la validation fonctionnelle ne sont pas passés.

### Exercices

1. Rejoue l'exemple et calcule RPO/RTO ; précise les événements qui marquent le début et la fin de chaque mesure.
2. Le backup se termine avec succès mais le schéma ne correspond plus à l'application. Décide si la restauration est réussie.
3. Recommence la récupération avec une dépendance indisponible. Note le temps passé, les étapes manuelles et la vraie limite.
4. Écris un runbook avec préconditions, commande/action, signal de réussite, abort condition et vérification après récupération.

**Correction attendue :** la mesure de reprise se termine quand l'utilisateur peut réellement utiliser un service intègre, pas lorsque le processus de restauration se termine. Une restauration au RTO sans marge doit conduire à une action d'amélioration si le délai cible doit être robuste aux variations.

## Leçon 5 : Incident et postmortem

Un bon postmortem sépare déclencheur, conditions latentes, détection, amplification, impact et récupération. La question n'est pas « qui a fait une erreur ? », mais « quelles conditions ont rendu cette erreur possible, invisible ou coûteuse ? ».

### Exercice d'incident

Scénario : une nouvelle version passe les tests nominaux, mais sous charge la file de tâches grossit parce que le débit entrant dépasse durablement le débit de traitement. Les timeouts déclenchent des retries ; certains clients réessaient également. Le nombre de requêtes augmente précisément quand le service est le plus saturé.

Produis :

- timeline avec signaux réellement observés et suppositions clairement séparées ;
- impact utilisateur et étendue des données/transactions touchées ;
- hypothèses et mesure qui discrimine chacune ;
- action de confinement, récupération et vérification ;
- facteurs latents (absence de backpressure, retry sans jitter/idempotence, alerte tardive, capacité non mesurée) ;
- actions classées par réduction de risque, propriétaire et preuve de fermeture.

**Correction attendue :** « augmenter les instances » n'est pas une réponse universelle ; si la dépendance aval est saturée, le scaling peut amplifier la pression. Une solution robuste teste backpressure, plafonds de concurrence, délais bornés, idempotence, retry avec jitter et métriques de profondeur/âge de file.

## Projet intégré : Release qui doit survivre à une mauvaise journée

À partir du fil rouge de l'apprenant :

1. construire et identifier un artefact à partir d'une révision précise ;
2. exécuter le jeu de tests avant promotion ;
3. déployer de manière réversible ;
4. provoquer une régression de santé ou de latence contrôlée ;
5. décider stop / rollback à partir de critères écrits avant l'expérience ;
6. restaurer une donnée synthétique ou un état de test ;
7. produire un postmortem et corriger au moins une cause latente ;
8. rejouer la panne et vérifier que la mesure de protection échoue désormais en sécurité.

Le projet peut s'exécuter localement, sur une plateforme d'école ou sur une infrastructure réelle autorisée. Le contexte et le niveau de preuve doivent être indiqués ; ne simule pas des résultats réels qui n'ont pas été mesurés.

## Barème

| Axe              | 0                      | 2                              | 4                                                                  |
| ---------------- | ---------------------- | ------------------------------ | ------------------------------------------------------------------ |
| Reproductibilité | Artefact inconnu       | Entrées principales consignées | Artefact lié à la révision, différences et provenance vérifiées    |
| Release          | Pas de critères        | Rollback décrit                | Seuil écrit avant l'expérience et rollback/recovery joué           |
| Observabilité    | Logs décoratifs        | Signal principal visible       | Signal actionnable lié à l'expérience utilisateur et aux décisions |
| Données          | Backup supposé valable | Une restauration exécutée      | Intégrité fonctionnelle et bornes RPO/RTO vérifiées                |
| Débogage         | Cause supposée         | Hypothèse vérifiée             | Plusieurs hypothèses départagées par mesures discriminantes        |
| Apprentissage    | Compte-rendu narratif  | Causes/solutions notées        | Rejeu post-correction qui prouve la réduction du risque            |

Tout zéro en sûreté des données, secret exposé ou rollback destructif impose la reprise du livrable concerné. La moyenne ne l'efface pas.

## Liens vers la suite

- [Fiabilité/SLO](../03-PILOTAGE/06-FIABILITE-SLO/README.md)
- [Cloud Foundations](../03-PILOTAGE/07-CLOUD-FOUNDATIONS/README.md)
- [Mini-Heroku](../05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/06-mini-heroku.md)
- [La Tour de Contrôle](../05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/01-tour-de-controle.md)

<!-- AF-DIAGRAM:cloud -->

## Repère visuel utile : Plan de déploiement et d'exploitation Kintana

```text
utilisateur -> DNS / edge -> API
                         |
                         v
                   réseau privé
                    /      \
                   v        v
                base      worker
                 |          |
                 v          v
             backup      queue
                 \          /
                  v        v
             logs / métriques / alertes
```

<!-- AF-LESSON-PROFILE: cloud -->

## Repères de décision

- **Pourquoi :** L'infrastructure détermine la disponibilité, la sécurité, le coût et les possibilités de reprise du système.
- **Quand l’utiliser / quand l’éviter :** Choisis un service managé ou une infrastructure quand il réduit un risque ou un coût total. Ne déploie pas Kubernetes ou plusieurs services pour un système qui tourne proprement plus simplement.
- **Limites :** Un déploiement local ne valide pas le réseau, les IAM, les quotas, les sauvegardes ni la facture du fournisseur. Les prix changent ; toute estimation doit dater et indiquer son hypothèse.

## Mécanisme : la version sans magie

Décris ressources, identité, réseau, secrets, stockage, health, scaling, backup et rollback ; automatise seulement ce que tu peux tester et exploiter.

## Ancrage produit / terrain : Kintana

Dans [Kintana](77-FIL-ROUGE-KINTANA/README.md), **59 : Atelier DevOps/SRE : du commit à la reprise après incident** se rattache à ce cas concret : Kintana doit supporter un réseau instable côté client et une exploitation prévisible côté service, sans exposer de secret ni exploser les coûts.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Plan de déploiement et d'exploitation Kintana

> **Arc Capsule Corp. / DBZ :** le Cloud n'est pas une baguette magique : tu loues des machines, du réseau et des services, avec une facture et des limites.

**Mission liée à « 59 : Atelier DevOps/SRE : du commit à la reprise après incident » :** Établis une architecture de déploiement minimale pour une tranche Kintana : ressources, IAM, réseau, secrets, stockage, health/readiness, sauvegarde et rollback. Exécute les éléments locaux disponibles ; étiquette le reste `NOT RUN`.

**Livrable :** diagramme d'infrastructure, estimation de coût datée, manifeste/IaC ou plan exécutable, runbook et preuve de test local.

**Critères d’acceptation :** aucune ressource fictive n'est marquée déployée ; permissions minimales ; coût et limites écrits ; procédure de rollback/restauration vérifiée seulement si elle a été exécutée.

**Transfert obligatoire :** Le trafic est multiplié par cinq et le fournisseur devient indisponible. Identifie le premier goulot et les coûts qui augmentent.
