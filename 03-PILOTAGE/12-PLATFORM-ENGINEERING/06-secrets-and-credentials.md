---
stability: "perissable"
perishability_id: PER-0116
review_interval: "3 mois"
acte: sécuriser
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_url: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html"
source_type: "primary"
review_due: "2027-02-03"
source_scope: "Documentation officielle ou source primaire consultée en rapport avec « Secrets et credentials : protéger les identités des automatisations ». La référence soutient le concept/version explicitement indiqué dans cette ressource ; ce statut ne certifie pas chaque phrase, chaque snippet ni l'exécution locale. Les affirmations empiriques et les API versionnées restent limitées au scope ci-dessous."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "OFFICIAL_SOURCE_IDENTITY_AND_CONCEPT_SCOPE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

# Secrets et credentials : protéger les identités des automatisations

> **Périmètre suivi :** les recommandations opérationnelles de gestion des secrets, les fonctions des coffres et les mécanismes d’identité/rotation. Les détails propres à un fournisseur doivent être vérifiés dans sa documentation officielle avant déploiement.

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

<!-- AF-LESSON-PROFILE: runtime -->

## Repères de décision

- **Pourquoi :** Le runtime détermine les APIs disponibles, le cycle de vie, la configuration et les ressources. Confondre Node, navigateur et processus peut créer des bugs impossibles à reproduire.
- **Quand l’utiliser / quand l’éviter :** Choisis l'environnement selon les capacités requises. Déclare configuration, arrêt et signaux de santé ; ne suppose pas que toutes les APIs ou variables existent partout.
- **Limites :** Le même code ne se comporte pas toujours pareil selon version, OS, runtime et permissions. Une variable d'environnement ne remplace pas un gestionnaire de secrets.

## Mécanisme : la version sans magie

Déclare les prérequis, lit la configuration à un point contrôlé, valide au démarrage, expose un état de santé et ferme proprement les ressources.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Secrets et credentials : protéger les identités des automatisations** se rattache à ce cas concret : Le service Kintana doit démarrer avec une configuration explicite et s'arrêter sans perdre les traitements déjà acceptés.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Service Kintana reproductible et arrêtable

> **Arc Walking Dead :** le code ne vit pas dans le vide. Runtime, processus, fichiers et variables d'environnement sont le camp autour de lui.

**Mission liée à « Secrets et credentials : protéger les identités des automatisations » :** Ajoute un contrôle de configuration et un arrêt propre au composant Kintana concerné. Sépare les variables obligatoires/optionnelles, valide leur format et vérifie le comportement sous SIGTERM si le runtime le permet.

**Livrable :** module de configuration, validation au démarrage, health/readiness si service, smoke test et note des différences runtime.

**Critères d’acceptation :** les erreurs de configuration échouent tôt ; aucun secret n'est journalisé ; l'arrêt ferme les ressources ; les APIs Node et navigateur ne sont pas confondues.

**Transfert obligatoire :** Exécute dans un conteneur ou un environnement qui ne possède pas les mêmes variables et permissions. Documente le diagnostic exact.

## Références officielles utiles

> **Référence principale vérifiée le 2 novembre 2026 :** la première ressource de ce panneau, également enregistrée dans `source_url`, a été consultée pour le mécanisme versionné traité ici. Les autres liens sont des compléments officiels utiles ; ils ne constituent pas chacun une attestation indépendante de l’exemple du curriculum. Aucune référence ne prouve que l’exemple a été exécuté. Vérifie la version cible et teste dans ton environnement avant un usage réel.

- [OWASP : Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [Docker Compose : Manage secrets securely](https://docs.docker.com/compose/how-tos/use-secrets/)
- [GitHub : Secure use reference](https://docs.github.com/en/actions/reference/security/secure-use)
