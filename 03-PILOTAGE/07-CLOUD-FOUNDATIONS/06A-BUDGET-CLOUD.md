---
stability: "intemporel"
acte: appliquer
cognitive_level: L3
perturbation_modes: [regression, changement_contexte]
anti_recipe_key: regression+changement_contexte
transfer_distance: low
assessment_role: instructional_checkpoint
source_verified_on: null
freshness_status: "not_verified"
source_url: null
source_type: "internal"
canonical_resource: "03-PILOTAGE/07-CLOUD-FOUNDATIONS/README.md"
source_scope: "Référence interne du module Cloud Foundations ; le gabarit ne fournit pas de prix fournisseur."
provenance_note: "Référence interne explicitement reliée au sujet ; elle ancre le parcours mais ne constitue pas une preuve externe. Aucun contenu n’est déclaré revérifié par cette mise à jour."
---

> **SCÈNE CRAZYDEVS : finale au stade :** 99,9 % de disponibilité sur un slide ne sauve personne à 03:17 quand le service hurle. La vraie compétence commence quand il faut transformer la métrique en décision.

# GABARIT VIVANT : 06A-BUDGET-CLOUD.md

Temps de lecture ~2 min

> **Ce gabarit est vide : il ne contient aucun prix de référence.** Chaque montant réel doit être relevé dans une source tarifaire précise à la date de consultation. Les données fictives du modèle S1 servent uniquement à apprendre la méthode. Protocole : [../../06-ANNEXES-TRANSVERSES/17A-PROTOCOLE-DONNEE-SOURCEE.md](../../06-ANNEXES-TRANSVERSES/17A-PROTOCOLE-DONNEE-SOURCEE.md).

Format imposé du livrable de la famille S1. Copie ce fichier dans `PREUVES/06A-BUDGET-CLOUD.md` de ton dépôt et remplis-le. L'exemplaire rempli de référence est [02-S1-BUDGET-CLOUD.md](../../06-ANNEXES-TRANSVERSES/17-PREUVES-MODELES/02-S1-BUDGET-CLOUD.md).

## 1. Hypothèses de trafic

| Palier    | Utilisateurs actifs/mois | Requêtes/s en pointe | Volume stocké | Source de l'hypothèse |
| --------- | ------------------------ | -------------------- | ------------- | --------------------- |
| 100       |                          |                      |               |                       |
| 10 000    |                          |                      |               |                       |
| 1 000 000 |                          |                      |               |                       |

## 2, 3, 4. Facture par palier

Un tableau par palier, une ligne par catégorie, **egress obligatoire même à zéro** :

| Catégorie       | Service / SKU | Région | Quantité et unité facturée | Coût mensuel | Devise | Chez | Relevé le | URL complète | Conditions / exclusions |
| --------------- | ------------- | ------ | -------------------------- | ------------ | ------ | ---- | --------- | ------------ | ----------------------- |
| Calcul          |               |        |                            |              |        |      |
| Base de données |               |        |                            |              |        |      |
| Stockage objet  |               |        |                            |              |        |      |
| Egress          |               |        |                            |              |        |      |
| Observabilité   |               |        |                            |              |        |      |
| **Total**       |               |        |                            |              |        |      |

## 5. Coût par utilisateur actif

Un nombre par palier, et une phrase disant pourquoi il monte, descend ou reste stable.

## 6. Ce que ce budget révèle

La ligne qui explose en premier, et à quel palier elle devient dominante.

## 6bis. Portage chez un second fournisseur

Le même tableau, chez l'autre fournisseur relevé, suivi de la liste "ce qui change de nature, pas seulement de prix" et de la phrase de réversibilité. Consigne complète : [99-PORTAGE-MENTAL.md](99-PORTAGE-MENTAL.md).

## 7. Recroisements obligatoires

- Tenabilité avec `PREUVES/SLO.md` : ce que coûterait la neuvième suivante.
- Reprise dans la section 3 du dossier unique et dans les tensions du capstone.

## Règles de validité

- Chaque montant réel précise le service/SKU, la région, la quantité, l'unité facturée, le prix, la devise, le fournisseur, la date de consultation, l'URL complète et les conditions/exclusions.
- Les montants de simulation du dépôt ne sont jamais recopiés comme prix réels.
- La ligne egress ne se supprime jamais ; si elle vaut zéro, la source et le palier gratuit sont indiqués.
- Chaque relevé porte une date de prochaine vérification, définie selon la volatilité du service et l'échéance de la décision.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.

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

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **GABARIT VIVANT : 06A-BUDGET-CLOUD.md** se rattache à ce cas concret : Kintana doit supporter un réseau instable côté client et une exploitation prévisible côté service, sans exposer de secret ni exploser les coûts.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Plan de déploiement et d'exploitation Kintana

> **Arc Capsule Corp. / DBZ :** le Cloud n'est pas une baguette magique : tu loues des machines, du réseau et des services, avec une facture et des limites.

**Mission liée à « GABARIT VIVANT : 06A-BUDGET-CLOUD.md » :** Établis une architecture de déploiement minimale pour une tranche Kintana : ressources, IAM, réseau, secrets, stockage, health/readiness, sauvegarde et rollback. Exécute les éléments locaux disponibles ; étiquette le reste `NOT RUN`.

**Livrable :** diagramme d'infrastructure, estimation de coût datée, manifeste/IaC ou plan exécutable, runbook et preuve de test local.

**Critères d’acceptation :** aucune ressource fictive n'est marquée déployée ; permissions minimales ; coût et limites écrits ; procédure de rollback/restauration vérifiée seulement si elle a été exécutée.

**Transfert obligatoire :** Le trafic est multiplié par cinq et le fournisseur devient indisponible. Identifie le premier goulot et les coûts qui augmentent.
