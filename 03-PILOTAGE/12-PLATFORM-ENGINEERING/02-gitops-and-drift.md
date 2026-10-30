---
stability: evolutif
acte: appliquer
---

> **SCÈNE CRAZYDEVS : Garo :** si la prod et Git racontent deux histoires différentes, tu n’as pas deux vérités : tu as une prochaine panne qui cherche son heure.

# GitOps : déclarer l'état désiré et réconcilier l'état réel

## 1. Définition et problème résolu

**GitOps** est une manière d'exploiter une application ou une infrastructure dans laquelle un dépôt versionné contient la déclaration de l'état souhaité. Un contrôleur observe cet état et l'environnement, compare les deux, puis tente de réduire leur différence. Git devient une source d'intention et d'audit ; il n'est pas, à lui seul, le moteur qui exécute le déploiement.

Le problème résolu est la dérive entre ce que l'équipe croit avoir déployé et ce qui tourne réellement. Un changement manuel non enregistré, une intervention d'urgence ou une automatisation concurrente peut rendre l'environnement différent du dépôt.

## 2. Modèle mental

- **État désiré** : configuration versionnée que l'équipe a approuvée (version d'image, nombre de réplicas, configuration, politiques).
- **État réel** : objets et processus observés dans le cluster ou l'infrastructure.
- **Contrôleur** : boucle logicielle qui observe, compare et agit.
- **Drift (dérive)** : différence non prévue entre l'état désiré et l'état réel.
- **Convergence** : rapprochement de l'état réel vers l'état désiré.

```text
[Changement proposé]
        |
        v
[Revue + merge Git] ---> [Pipeline : lint, tests, policy, build]
        |                                  |
        v                                  v
[État désiré versionné] <----------- [Artefact immuable]
        |
        v
[Contrôleur GitOps] <--- observe --- [Cluster / infrastructure]
        |                                  |
        | compare                          v
        +-------------------------- [État réel observé]
        |                                  |
        +---- écart détecté <--------------+
        |
        v
[Réconcilier selon politique] ---> [Nouvel état réel]
```

La flèche de retour signifie que le contrôleur observe de nouveau l'environnement après son action. Le pipeline prépare et vérifie les artefacts ; le contrôleur de réconciliation applique l'état déclaré. Les deux responsabilités ne doivent pas être confondues.

## 3. Fonctionnement étape par étape

1. Un développeur modifie une déclaration (par exemple le tag d'une image) dans une branche.
2. La CI valide la syntaxe, exécute les tests, vérifie les politiques, construit l'artefact et publie une image identifiée par digest ou version immuable.
3. Une revue approuve la modification. Le merge constitue l'autorisation de changer l'état désiré selon les règles du dépôt.
4. Le contrôleur lit le commit approuvé et calcule les objets à appliquer.
5. Il observe le cluster, compare les ressources réelles aux déclarations et identifie les écarts.
6. Selon sa politique, il crée, met à jour ou supprime des ressources pour converger.
7. Des contrôles de santé et des métriques confirment ou invalident le déploiement. L'état et le commit sont traçables.

**Important :** GitOps ne signifie pas « tout changement manuel est immédiatement écrasé ». Une plateforme doit définir les ressources surveillées, le délai de réconciliation, les exceptions et les procédures d'urgence. Le comportement varie selon les contrôleurs et les configurations.

## 4. Fil rouge : déployer `orders-api`

L'équipe de commande maintient `orders-api`. Le dépôt `platform-config` déclare trois réplicas, l'image `orders-api@sha256:...`, des limites CPU/mémoire, un compte de service à privilèges minimaux et les règles réseau. La CI construit l'image une fois, exécute les tests et publie son digest. Une Pull Request met à jour le digest dans la configuration. Après approbation, le contrôleur applique la version.

Un opérateur modifie ensuite manuellement le nombre de réplicas de trois à un pendant un incident. Le contrôleur détecte la divergence. L'équipe doit décider : la déclaration Git est-elle encore correcte ? Si oui, rétablir trois réplicas ; si non, corriger Git d'abord. Réconcilier aveuglément un état Git faux pourrait aggraver l'incident.

## 5. Rollback, promotion et réversibilité

Un rollback GitOps consiste généralement à rétablir dans Git une déclaration précédente, puis à laisser le contrôleur converger. Ce n'est pas toujours un retour arrière applicatif sûr : une migration de base de données destructive ou un format de données incompatible peut rendre l'ancienne version inutilisable.

Avant une promotion, contrôler : compatibilité de schéma, compatibilité API, health checks, disponibilité des artefacts précédents, stratégie progressive (canary/blue-green si appropriée), et condition d'arrêt. Les migrations doivent être conçues pour permettre une période de compatibilité entre versions lorsque le rollback est nécessaire.

## 6. Secrets et sécurité

Ne jamais placer un secret en clair dans Git, même dans un dépôt privé : l'historique conserve souvent la valeur. Utiliser un gestionnaire de secrets ou un mécanisme de chiffrement avec clés protégées hors du dépôt. Limiter les droits du contrôleur, isoler les namespaces/environnements, signer ou vérifier les artefacts lorsque la chaîne d'approvisionnement le permet, auditer les changements et faire tourner les secrets compromis.

La configuration GitOps doit elle-même être protégée : approbations obligatoires pour les chemins sensibles, CODEOWNERS, contrôle des branches, séparation des identités CI et runtime, et interdiction d'un compte global omnipotent.

## 7. Pièges et conséquences

- **Tag mutable (`latest`)** : l'identité de ce qui est déployé devient ambiguë. Préférer une version immuable ou un digest.
- **Deux contrôleurs concurrents** : ils peuvent se battre sur la même ressource. Définir un propriétaire par ressource.
- **Réconciliation trop agressive** : une action d'urgence peut être annulée avant diagnostic. Prévoir une procédure d'exception journalisée.
- **Déclaration Git obsolète** : le contrôleur rétablit un état techniquement conforme mais fonctionnellement dangereux. Corriger l'intention avant de réconcilier.
- **Secrets committés** : supprimer le fichier ne suffit pas ; révoquer et faire tourner le secret, puis traiter l'historique.
- **Rollback supposé universel** : les données et migrations peuvent ne pas être réversibles.

## 8. Exercice progressif

1. Déclarer deux réplicas d'un service de démonstration.
2. Décrire séparément état désiré et état observé dans un tableau.
3. Introduire un changement manuel dans l'état réel (ou simuler le diff si aucun cluster n'est disponible).
4. Identifier le drift et proposer deux réponses : réconcilier vers Git ou modifier Git après validation.
5. Rédiger une procédure de rollback en incluant le cas d'une migration non rétrocompatible.

**Vérification :** remettre le diff avant/après, le commit qui porte l'intention, les contrôles, la décision et les risques. La réponse échoue si elle ne distingue pas rollback de configuration et rollback de données.

## 9. Lien dans le parcours et preuve de maîtrise

Prérequis : Git, CI/CD, conteneurs, réseau et configuration vus dans les modules précédents. Suite : IDP, Golden Paths, fiabilité/SLO et cloud foundations.

**Preuve attendue :** l'apprenant sait expliquer la boucle d'observation/réconciliation, diagnostiquer un drift, choisir une stratégie de correction et défendre un rollback en tenant compte des données, des secrets et des responsabilités.

## Drill conservé : décider quelle vérité doit converger

Introduis une différence manuelle dans l'environnement (ou simule le diff si tu n'as pas de cluster). Détecte la dérive, attribue la cause et décide si tu dois restaurer Git ou si l'état Git était faux. Justifie la décision avec le propriétaire de la ressource, la chronologie et le risque d'une réconciliation immédiate.
