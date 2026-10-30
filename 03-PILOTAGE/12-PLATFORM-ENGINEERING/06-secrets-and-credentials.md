---
stability: perissable
acte: sécuriser
freshness_registry_id: PATH:03-PILOTAGE/12-PLATFORM-ENGINEERING/06-secrets-and-credentials.md
freshness_audit_date: 2026-10-30
freshness_status: a_verifier_date_absente
review_due: 2027-01-28
review_status: a_verifier_date_absente
---
# Secrets et credentials : protéger les identités des automatisations

## 1. Définition

Un **secret** est une donnée qui permet d'obtenir un accès ou de signer une opération : mot de passe, clé API, clé privée, jeton, certificat ou chaîne de connexion confidentielle. Un **credential** est un élément utilisé pour prouver une identité ou obtenir une autorisation. Cette leçon traite les secrets comme des actifs à cycle de vie, pas comme de simples variables d'environnement.

## 2. Pourquoi

Un secret peut être copié dans Git, un log, une image de conteneur, un ticket ou un poste développeur. Une fois exposé, le risque ne disparaît pas en effaçant le fichier : il faut considérer l'historique, les copies, les caches et les systèmes qui l'ont reçu.

## 3. Cycle de vie

```text
[Créer identité / secret]
          |
          v
[Stocker dans coffre protégé]
          |
          v
[Distribuer à l'identité autorisée]
          |
          v
[Utiliser avec privilèges minimaux]
          |
          v
[Journaliser accès / détecter anomalie]
          |
          +---- rotation périodique ou déclenchée
          |
          v
[Révoquer / expirer / vérifier la suppression]
```

La rotation remplace une valeur par une nouvelle et révoque l'ancienne selon un ordre qui évite de couper un service : créer la nouvelle, la déployer, vérifier son utilisation, révoquer l'ancienne, confirmer qu'aucun consommateur ne dépend encore de celle-ci.

## 4. Règles opérationnelles

- Préférer les identités de workload à des clés statiques de longue durée lorsque le système le permet.
- Limiter portée, durée, environnement et permissions.
- Séparer identités CI, déploiement et runtime.
- Ne jamais imprimer de secrets dans les logs ou messages d'erreur.
- Masquer les valeurs sensibles dans les interfaces et traces.
- Auditer les lectures et mutations du coffre.
- Prévoir révocation d'urgence et rotation testée.
- Scanner dépôts et artefacts, sans croire qu'un scanner remplace la prévention.
- Si une valeur est exposée : la révoquer/faire tourner d'abord, analyser propagation et accès, puis nettoyer les copies et l'historique.

## 5. Exemple fil rouge

La CI publie `orders-api`. Elle reçoit une identité dédiée autorisée à pousser une image dans un seul registre. Le service en production reçoit une autre identité autorisée à lire uniquement le secret de connexion de son environnement. Un développeur n'a pas besoin de télécharger le secret de production pour tester en local : un secret de développement différent est fourni.

Une clé CI est publiée accidentellement dans un log. Réponse : désactiver/révoquer la clé, créer et déployer une nouvelle identité, vérifier les journaux d'utilisation de l'ancienne, examiner les artefacts/logs, informer les propriétaires concernés et documenter l'incident. Supprimer la ligne du log sans révocation n'est pas une réponse suffisante.

## 6. Pièges

- Secret encodé en Base64 présenté comme chiffré : l'encodage ne protège pas la confidentialité.
- Secret dans une image : le retirer dans une couche supérieure ne retire pas forcément la valeur des couches précédentes.
- Secret partagé entre CI et runtime : une compromission élargit l'impact.
- Rotation non testée : expiration simultanée et panne.
- Log « masqué » seulement dans l'interface : la valeur peut rester dans le stockage brut.

## 7. Exercice et vérification

Faire l'inventaire des identités d'un déploiement : propriétaire, ressources accessibles, durée, stockage, rotation, audit et révocation. Simuler un secret divulgué.

**Critères :** réponse immédiate par révocation, périmètre d'impact identifié, nouvelle identité à privilèges minimaux, historique et logs traités, absence de secret en clair, plan de validation et preuve d'audit.

## 8. Références et preuve

Consulter les guides officiels du fournisseur de coffre et du cloud utilisés par le projet ; vérifier les versions et politiques avant application en production. Cette leçon est évolutive et marquée `a_verifier` : elle ne prétend pas certifier une configuration spécifique.

**Preuve attendue :** diagramme de flux d'identité, matrice de permissions, procédure de rotation/révocation et rapport de simulation d'exposition.

## Exercice production : rotation d'un secret sans interruption

**Situation.** Un token de déploiement est suspecté d'avoir été exposé dans un log. Le service a deux réplicas ; l'ancien token est encore utilisé par un job planifié.

**Travail demandé.** Décris le confinement immédiat, l'identification des consommateurs, la création du nouveau secret, le déploiement/lecture, la révocation de l'ancien, la vérification et la purge des traces accessibles. Sépare rotation planifiée et incident de fuite. Précise qui peut lire, écrire, administrer et auditer le secret.

**Vérification.** La procédure doit éviter une période où aucun réplica ne peut s'authentifier, mais ne doit pas prolonger l'ancien secret après exposition. Les journaux ne contiennent ni valeur ni préfixe exploitable ; l'accès est audité ; le rollback ne réactive jamais le secret compromis. Joins un runbook horodaté et un test de révocation.

**Transfert.** Les mêmes règles s'appliquent aux tokens d'agent, credentials CI, certificats, clés de signature et secrets d'applications clientes, avec stockage adapté à chaque environnement.
