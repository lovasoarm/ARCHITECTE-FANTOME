---
stability: evolutif
acte: arbitrer
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "03-PILOTAGE/07-CLOUD-FOUNDATIONS/01-00-why-cloud-foundations.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 03-PILOTAGE/07-CLOUD-FOUNDATIONS/01-00-why-cloud-foundations.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# Architectures cloud : réseau, identité, déploiement, coût et reprise

> **Route spécifique du Coffre Imprenable :** avant d’utiliser ce diagramme comme preuve de préparation au projet 07, étudie [Leçon-pont 12 : Fondations réseau](../../05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/12-fondations-reseau-dns-tcp-tls.md). Cette page applique les bases IP, ports, DNS, TCP, TLS et HTTP ; elle ne les enseigne pas depuis zéro. Cette note ne crée pas de gate générale pour les autres apprenants Cloud.

## 1. Modèle de responsabilité

Le cloud ne supprime pas la responsabilité opérationnelle ; il la partage entre fournisseur et client selon le service choisi. Pour chaque composant, noter qui gère datacenter/hyperviseur, OS, runtime, réseau, identité, sauvegarde, chiffrement, patchs et données. Une offre managée réduit certaines tâches mais ne rend pas automatiquement l'application sûre ou récupérable.

## 2. Architecture de référence

```text
                 [Utilisateurs]
                       |
                       v
               [DNS / protection edge]
                       |
                       v
              [Load balancer public]
                       |
                 réseau public
                       |
          +------------+-------------+
          |                          |
          v                          v
    [Front / API]              [WAF / règles]
          |
    réseau privé
          |
   +------+-------+
   |              |
   v              v
[App runtime]  [Queue / événements]
   |              |
   v              v
[DB privée]   [Workers privés]
   |
   +----> [Backup chiffré / compte isolé]
```

Ne pas exposer directement la base au réseau public. Définir les flux entrants et sortants nécessaires, les identités qui peuvent les initier et les journaux associés. Une architecture réelle doit ajouter zones/régions, sous-réseaux, routes, NAT/private endpoints, DNS, certificats et frontières de compte/projet selon le fournisseur.

## 3. Identités et permissions

```text
[Développeur] --SSO/MFA--> [Portail d'identité]
                                 |
                           rôle temporaire
                                 |
                                 v
                         [Environnement cloud]

[CI] --identité workload limitée--> [Registre / déploiement]
[Application] --identité runtime--> [Secret / service autorisé]
```

Éviter les clés longues et partagées. Séparer identité humaine, CI et runtime ; donner une permission limitée à une ressource et une durée ; auditer les actions sensibles ; prévoir les comptes d'urgence avec contrôle et revue. Une application doit recevoir seulement les accès dont son rôle a besoin.

## 4. Stratégies de déploiement

- **Rolling** : remplace progressivement les instances ; vérifier compatibilité N/N-1 et capacité pendant la transition.
- **Blue/green** : deux environnements, bascule du trafic ; coût temporaire plus élevé et attention aux bases partagées.
- **Canary** : petite part de trafic vers la nouvelle version ; définir métriques et seuil de promotion/arrêt.
- **GitOps** : déclaration versionnée et réconciliation ; voir le module Platform Engineering.

```text
[Build immuable] -> [Tests + scan + signature]
                          |
                          v
                    [Staging]
                          |
                    vérification
                          v
                    [Canary 5%]
                      /     \
                sain       dégradé
                 |            |
                 v            v
           [Promouvoir]   [Stop / retour]
                 |
                 v
             [100% trafic]
```

Le déploiement applicatif n'est réversible que si les données et contrats le permettent. Prévoir migrations expand/contract, lecture tolérante et compatibilité pendant la transition.

## 5. Coût et arbitrage

Calculer coût fixe et variable : compute, stockage, I/O, réseau sortant, NAT, logs, sauvegardes, licences, support, transfert inter-région et environnements inactifs. Mesurer la charge réelle et distinguer coût par requête, par utilisateur, par tenant et capacité réservée. Les tarifs varient par fournisseur, région, devise, volume et date : toute valeur numérique doit pointer vers le calculateur/tarif officiel avec date et hypothèses.

Ne pas optimiser uniquement la facture : une architecture qui économise 5 % mais augmente fortement le risque de perte de données n'est pas nécessairement préférable.

## 6. Reprise : RPO et RTO

**RPO (Recovery Point Objective, objectif de point de reprise)** décrit la perte de données maximale acceptable en temps/point ; **RTO (Recovery Time Objective, objectif de temps de reprise)** décrit la durée cible pour rétablir le service. Ce sont des objectifs définis par le métier, pas des garanties magiques des sauvegardes.

```text
[Production]
   | réplication / sauvegarde
   v
[Backup isolé + rétention]
   |
   v
[Test de restauration périodique]
   |
   +-- incident --> [Déclarer / isoler]
                         |
                         v
                  [Choisir point de reprise]
                         |
                         v
                  [Restaurer dans environnement isolé]
                         |
                         v
                  [Vérifier intégrité + application]
                         |
                         v
                  [Bascule + mesure RPO/RTO réel]
```

Une sauvegarde n'est utile que si elle peut être restaurée. Tester les clés de chiffrement, dépendances, identités, documentation, cohérence applicative et temps réel de restauration. Isoler les sauvegardes pour limiter la propagation d'une compromission.

## 7. Exercice

Dessiner l'architecture d'une API et d'une base gérées dans un cloud, identifier les flux, permissions, déploiement et reprise. Faire varier la demande (x5 charge) et la région indisponible. Donner un modèle de coût avec sources datées et une procédure de restauration.

**Grille /30 :** réseau (5), identités (5), déploiement (4), coût explicite (4), sécurité (4), RPO/RTO justifiés (4), restauration testée et contrôles (4). Échec si la base est exposée sans justification ou si RPO/RTO sont choisis sans besoin métier.

## 8. Lien et preuve

Prérequis : réseau, Linux, sécurité, CI/CD et modèle de coût. Suite : Platform Engineering, SLO et leadership.

**Preuve attendue :** diagramme cloud, matrice flux/permissions, déploiement choisi, estimation datée, runbook de reprise et résultat d'un exercice de restauration ou d'une simulation explicitement signalée.

<!-- AF-LESSON-PROFILE: cloud -->

## Repères de décision

- **Pourquoi :** L'infrastructure détermine la disponibilité, la sécurité, le coût et les possibilités de reprise du système.
- **Quand l’utiliser / quand l’éviter :** Choisis un service managé ou une infrastructure quand il réduit un risque ou un coût total. Ne déploie pas Kubernetes ou plusieurs services pour un système qui tourne proprement plus simplement.
- **Limites :** Un déploiement local ne valide pas le réseau, les IAM, les quotas, les sauvegardes ni la facture du fournisseur. Les prix changent ; toute estimation doit dater et indiquer son hypothèse.

## Mécanisme : la version sans magie

Décris ressources, identité, réseau, secrets, stockage, health, scaling, backup et rollback ; automatise seulement ce que tu peux tester et exploiter.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Architectures cloud : réseau, identité, déploiement, coût et reprise** se rattache à ce cas concret : Kintana doit supporter un réseau instable côté client et une exploitation prévisible côté service, sans exposer de secret ni exploser les coûts.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Plan de déploiement et d'exploitation Kintana

> **Arc Capsule Corp. / DBZ :** le Cloud n'est pas une baguette magique : tu loues des machines, du réseau et des services, avec une facture et des limites.

**Mission liée à « Architectures cloud : réseau, identité, déploiement, coût et reprise » :** Établis une architecture de déploiement minimale pour une tranche Kintana : ressources, IAM, réseau, secrets, stockage, health/readiness, sauvegarde et rollback. Exécute les éléments locaux disponibles ; étiquette le reste `NOT RUN`.

**Livrable :** diagramme d'infrastructure, estimation de coût datée, manifeste/IaC ou plan exécutable, runbook et preuve de test local.

**Critères d’acceptation :** aucune ressource fictive n'est marquée déployée ; permissions minimales ; coût et limites écrits ; procédure de rollback/restauration vérifiée seulement si elle a été exécutée.

**Transfert obligatoire :** Le trafic est multiplié par cinq et le fournisseur devient indisponible. Identifie le premier goulot et les coûts qui augmentent.
