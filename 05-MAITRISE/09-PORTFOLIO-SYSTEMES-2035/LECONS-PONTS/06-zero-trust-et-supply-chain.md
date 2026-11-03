---
stability: evolutif
acte: apprendre
noyau: non
route: depth
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/06-zero-trust-et-supply-chain.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/06-zero-trust-et-supply-chain.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# Leçon-pont 06 : Zero Trust et sécurité de la chaîne logicielle

> **Arc Naruto :** être dans le village ne donne pas accès à tous les rouleaux. Chaque ninja doit prouver son identité, recevoir le droit précis et utiliser un artefact dont l'origine est vérifiable.

<!-- AF-DIAGRAM:security -->

## Repère visuel utile : Identité et provenance

```text
Identité -> authentification -> autorisation par ressource
                  |
                mTLS
                  |
               service

Code -> build -> SBOM + provenance -> signature -> vérification
```

<!-- AF-LESSON-PROFILE: security -->

## Résultat attendu

Définir identité, autorisation, chiffrement entre services, secrets, SBOM et provenance de build. Tester les refus, la rotation et la détection d'un artefact altéré.

## Pourquoi cette sécurité doit être pensée comme une chaîne

Un service n’est pas sûr parce qu’il se trouve « à l’intérieur » du réseau. Il reçoit des requêtes, appelle d’autres services, charge des dépendances et déploie des artefacts. Il faut donc vérifier séparément l’identité, le droit sur la ressource et la provenance de ce qui est exécuté. Une SBOM, un certificat ou une signature ne remplace pas les autres contrôles.

## Modèle visuel

```text
Utilisateur/service
       |
 identité vérifiée (authn)
       |
       v
Politique identité × action × ressource (authz)
       |
       v
Service autorisé -- mTLS --> Service cible
       |
       +--> audit sans secrets

Code -> dépendances -> build isolé -> SBOM/provenance -> signature
                                                        |
                                                        v
                                               vérification à la release
```

## Notions à apprendre

1. **Authentification** prouve qui est le demandeur ; **autorisation** décide ce qu'il peut faire sur une ressource donnée.
2. **TLS** protège le transport et authentifie généralement le serveur ; **mTLS** authentifie aussi le client avec un certificat. Cela ne remplace pas les règles métier par ressource.
3. **Identité de service** : chaque workload doit avoir une identité distincte, des permissions courtes et une stratégie de rotation/révocation.
4. **Secrets** : ne pas les commiter, copier dans les images ou écrire dans les logs. Définir stockage, accès, rotation, révocation et réponse à une fuite.
5. **Policy as code** : exprimer les actions autorisées et refuser par défaut. Tester le refus comme un résultat positif attendu.
6. **SBOM** : inventaire des composants logiciels ; utile pour savoir ce qui est embarqué, pas une certification de sécurité.
7. **Signature et provenance** : vérifier qui a construit quoi, depuis quel code et avec quelles étapes. Une signature seule ne prouve pas que le build était sain.
8. **SLSA / assurance supply chain** : décrire le niveau réellement atteint et ses critères ; ne jamais déclarer un niveau sans les preuves exigées.

## Quand l'utiliser / quand l'éviter

Applique le minimum d'identité, autorisation, gestion de secrets et dépendances à tout service. Utilise mTLS lorsque l'authentification mutuelle des services répond à une menace ou à une exigence claire. Ne déploie pas une usine à certificats sans modèle d'identité, rotation et exploitation. Zero Trust n'est pas un produit à installer.

## Limites

mTLS ne protège pas une API d'une autorisation IDOR mal conçue. Une SBOM peut être incomplète. Un scanner produit des alertes à trier. Une signature ne prouve pas l'absence de vulnérabilité. Le risque résiduel doit rester écrit.

## Mécanisme : le modèle mental à retenir

Le système est fiable quand chaque étape possède un contrat, un état observable, une règle d'échec et une preuve indépendante. Sépare les mécanismes ; ne laisse pas une démo réussie masquer une étape non vérifiée.

## Leçons AF à faire

- [Auth flows](../../../03-PILOTAGE/04-SECURITY/05-auth_flows.md), [RBAC/ABAC/IDOR](../../../03-PILOTAGE/04-SECURITY/13-autorisation_rbac.md), [secrets et rotation](../../../03-PILOTAGE/04-SECURITY/11-secrets_et_rotation.md).
- [TLS/chiffrement](../../../03-PILOTAGE/04-SECURITY/12-chiffrement_repos_transit.md), [SBOM](../../../03-PILOTAGE/04-SECURITY/08-supply_chain_sbom.md), [audit supply chain](../../../03-PILOTAGE/04-SECURITY/09-audit_your_supply_chain.md).
- [Quality Shield / CI](../../../03-PILOTAGE/03-QUALITY-SHIELD/04-review-and-ci.md) et [Lab 66 : sécurité et architecture](../../../06-ANNEXES-TRANSVERSES/66-LAB-SECURITE-ET-ARCHITECTURE.md).

## Ancrage produit / terrain : Kintana

Dans Kintana, le scénario d'étude utilise des données synthétiques et un environnement local. L'objectif est de prouver le mécanisme et ses limites ; il ne s'agit pas d'une mesure de production. Garde une trace de l'entrée, du résultat, du cas d'échec et du niveau de preuve (`CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION`).

## Mission utile : coffre des artefacts Kintana

Crée deux services de laboratoire, deux identités et trois opérations (lecture, écriture, administration). Active mTLS, écris les politiques, place un secret canari, génère une SBOM et signe un artefact. Puis révoque un certificat, retire une permission et altère l'artefact.

**Livrable :** threat model, matrice identité/action/ressource, configuration mTLS, runbook rotation/révocation, SBOM, signature/provenance et tests négatifs.

**Critère de sortie :** identité absente ou révoquée refusée ; action interdite refusée côté serveur ; artefact altéré rejeté ; aucun secret canari dans repository/logs/traces.

## Transfert obligatoire

Un token de CI fuit et un paquet dépendant compromis est publié. Décris l'isolement, la rotation, la reconstruction, la provenance et les preuves nécessaires avant de relivrer.

## Références

[07 : Coffre Imprenable](../07-coffre-imprenable.md) · [NIST SSDF](https://csrc.nist.gov/pubs/sp/800/218/final) · [SLSA](https://slsa.dev/spec/v1.2/build-track-basics).
