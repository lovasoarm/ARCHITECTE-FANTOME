---
perishability_id: PER-0058

stability: "perissable"
acte: appliquer
cognitive_level: L3
perturbation_modes: [fausse_piste, defaut_cache]
anti_recipe_key: fausse_piste+defaut_cache
transfer_distance: medium
assessment_role: instructional_checkpoint
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_url: "https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/availability.html"
source_type: "primary"
review_interval: "3 mois"
review_due: "2027-02-03"
source_scope: "Pilier Reliability de l’AWS Well-Architected Framework : repère officiel sur disponibilité, résilience et fiabilité. Les principes sont une aide de conception, pas une garantie de disponibilité ni une validation de la topologie locale."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "AWS_RELIABILITY_PILLAR_REFERENCE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

> **SCÈNE CRAZYDEVS : QG de Konoha :** six équipes, trois régions, une mission critique. Si tu ne sais pas relier signal, seuil, coût et action, ton tableau de bord ressemble à une tour de contrôle qui clignote sans dire quel avion tombe.

# 04 : Rayon d'impact, zones et le prix d'une neuvième

Temps de lecture ~11 min

Choisir une topologie, c'est acheter une promesse de disponibilité. Cette leçon relie directement le SLO écrit au module [06-FIABILITE-SLO](../06-FIABILITE-SLO/02-sli_slo_budget_erreur.md) à une ligne de facture, dans les deux sens.

## 1. LES TROIS TOPOLOGIES, ET CE QU'ELLES ACHÈTENT

| Topologie    | Risque principalement traité                             | Postes de coût à examiner                                                                          | Complexité à prévoir                                                                    |
| ------------ | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Mono-zone    | panne d'une zone ou d'un site selon le service           | capacité, stockage, sauvegardes, transfert                                                         | dépendance à une seule zone de déploiement                                              |
| Multi-zone   | indisponibilité d'une zone                               | capacité de secours, réplication, équilibrage, trafic inter-zone, stockage et sauvegardes          | bascule, cohérence, tests de panne et capacité restante                                 |
| Multi-région | indisponibilité d'une région ou contraintes de proximité | duplication éventuelle des ressources, réplication inter-région, transfert, opérations et licences | cohérence, latence, bascule, résidence des données et exploitation de plusieurs régions |

Il n'existe pas de pourcentage universel de surcoût ni de seuil SLO qui rende une topologie automatiquement obligatoire. Le coût dépend du service managé, de sa tarification, du niveau de réplication, de la capacité de secours, du trafic et des options activées. Le choix part du SLO, du RTO, du RPO, des dépendances et du coût mesuré ; il doit être justifié pour la charge et le fournisseur étudiés.

## 2. LA CARTE DU RAYON D'IMPACT

Pour chaque composant, trois colonnes, et la carte se remplit en une heure :

```text
composant --> ce qui tombe avec lui --> ce que l'utilisateur voit --> temps de retour
```

| Composant               | Rayon d'impact                  | Vu par l'utilisateur               | Retour estimé          |
| ----------------------- | ------------------------------- | ---------------------------------- | ---------------------- |
| Base principale         | écriture et lecture             | plus rien ne fonctionne            | RTO base               |
| Cache                   | lectures plus lentes            | lenteur, service maintenu          | quelques minutes       |
| File d'événements       | synchronisation entre contextes | données périmées, affichage décalé | rattrapage automatique |
| Fournisseur de paiement | encaissement                    | échec au moment du paiement        | dépend du tiers        |

La colonne "vu par l'utilisateur" est celle qu'on présente à un non-technicien. Les deux autres servent à décider.

## 2 BIS. LA TOPOLOGIE, DESSINEE

Ce schema est le diagramme exige au volet « diagrammes » du dossier final. Le meme
dessin sert de reference dans [06-ANNEXES-TRANSVERSES/17-PREUVES-MODELES/03-S2-ADR-PRINCIPAL.md](../../06-ANNEXES-TRANSVERSES/17-PREUVES-MODELES/03-S2-ADR-PRINCIPAL.md).

```text
                        REGION A (europe-ouest)
  +-------------------------------------------------------------+
  |   ZONE a1                        ZONE a2                     |
  |  +---------------+   réplication  +---------------+          |
  |  | app active    |  selon le     | capacité de   |          |
  |  | base primaire |  service et   | secours ou    |          |
  |  | cache         |  le contrat   | réplique      |          |
  |  +---------------+  facture zone  +---------------+          |
  |          \                              /                    |
  |           \____ repartiteur de charge _/                     |
  |                        |                                     |
  +------------------------|-------------------------------------+
                           |  bascule à concevoir, configurer et tester
                           |  RTO et RPO à mesurer ; aucune garantie implicite
                           |
       trafic inter-région |  facturation à vérifier
       prix et sens du trafic à relever dans le tarif officiel
                           v
                        REGION B (amerique-nord)
  +-------------------------------------------------------------+
  |   ZONE b1                                                    |
  |  +---------------+   replication asynchrone                  |
  |  | capacité de   |   retard de réplication éventuel           |
  |  | secours       |   et RPO à mesurer                         |
  |  +---------------+                                           |
  +-------------------------------------------------------------+

  Le diagramme est un schéma pédagogique, pas une architecture fournisseur prête à déployer.
  Les coûts, délais de réplication, garanties de cohérence et possibilités de bascule
  dépendent du service choisi et de sa configuration. Une bascule n'est pas automatique
  par principe : elle se conçoit, se teste et se mesure. Le RPO peut être non nul.
```

Ce schéma sert à rendre visibles les flux possibles entre zones et régions. Il ne permet pas, à lui seul, de conclure qu'un transfert est facturé, gratuit ou synchronisé : ces points dépendent du fournisseur, du service, de la région et du contrat. Dans ton relevé, note chaque poste réellement tarifé et distingue coût monétaire, latence, capacité consommée et risque de perte. Le RPO et le comportement de bascule sont des propriétés à confirmer dans la documentation du service et par un test adapté.

## 3. LE PRIX D'UNE NEUVIÈME, CALCULÉ ET NON RESSENTI

```text
coût de la neuvième = facture(topologie cible) - facture(topologie actuelle)
gain = minutes d'indisponibilité évitées * coût d'une minute d'arrêt
```

Le coût d'une minute d'arrêt s'estime avec le métier : revenu horaire perdu, coût de traitement des réclamations, pénalité contractuelle éventuelle. Un ordre de grandeur assumé et daté vaut mieux que l'absence de chiffre.

Intuition : une assurance ne s'achète pas au sentiment, mais en comparant la prime au sinistre probable. Une neuvième supplémentaire est exactement une prime d'assurance.

## 3 BIS : LE CALCUL CHIFFRÉ DE LA SECONDE ZONE

Le calcul ci-dessous est un **modèle simplifié**, pas une règle de facturation commune aux fournisseurs. Il suppose que les postes nommés sont effectivement doublés ou ajoutés dans le scénario choisi. Vérifie pour chaque service son mode de facturation, sa capacité de secours, son stockage, ses sauvegardes, ses requêtes et son trafic dans la [fiche tarifaire](05-releve_tarifaire_reel.md). Une réplication peut être incluse, facturée ou tarifée différemment selon le service.

```text
Ce que la seconde zone duplique          Ce qu'elle ne duplique pas
- calcul (les instances de secours)      - stockage objet (déjà multi-zone chez la
- base managée (réplique synchrone)        plupart des fournisseurs : à vérifier, pas
- adresses IP / équilibreur                à supposer)
                                         - egress Internet (même volume sortant)
Ce qu'elle AJOUTE
- trafic inter-zones, facturé au Go dans un sens, parfois dans les deux
```

Le calcul, avec les quatre lignes du relevé :

```text
mono_zone   = calcul + base + stockage + egress
multi_zone  = (calcul x 2) + (base x 2) + stockage + egress + inter_zones
inter_zones = Go répliqués par mois x prix au Go du trafic inter-zones

cout_seconde_zone = multi_zone - mono_zone
                  = calcul + base + inter_zones
```

Exemple entièrement fictif, structure à recopier, chiffres à remplacer par les tiens :

```text
calcul       : 1 vCPU / 2 Go            -> A EUR / mois   (relevé, section 1)
base managée : petite instance, 20 Go   -> B EUR / mois   (relevé, section 1)
réplication  : 30 Go/mois entre zones   -> 30 x C EUR/Go  (relevé, ligne à ajouter)

cout_seconde_zone = A + B + 30 x C  EUR / mois
```

Puis, et seulement alors, la comparaison qui décide :

```text
minutes d'arrêt théoriques correspondant à une disponibilité SLO = (1 - SLO_decimal) x 525 600
minutes évitées estimées = (SLO_cible_decimal - SLO_actuel_decimal) x 525 600
gain annuel estimé = minutes évitées x coût métier estimé d'une minute d'arrêt

Convertis les pourcentages en décimales avant le calcul (par exemple 99,9 % = 0,999). Ce calcul compare des objectifs théoriques ; il ne mesure pas une amélioration réellement obtenue.
verdict     = gain annuel  vs  cout_seconde_zone x 12
```

Trois obligations pour que ce calcul soit opposable : chaque prix porte son URL et sa date, le volume répliqué est une mesure ou une hypothèse écrite (jamais un blanc), et le coût d'une minute d'arrêt est justifié en une phrase par un élément métier. Un calcul de neuvième sans ces trois attributs se démonte en une question, et c'est exactement la question que pose la **tension n°1 imposée du capstone**.

## 4. LES DÉPENDANCES QUI ANNULENT TA REDONDANCE

Trois cas classiques où l'on paie du multi-zone sans l'obtenir :

1. Une **dépendance mono-zone** dans la chaîne : un service tiers, un cache, un montage de fichiers. Le maillon faible fixe la disponibilité réelle.
2. Une **bascule jamais testée** : la réplique existe, personne n'a jamais vérifié que le basculement fonctionne, ni combien de temps il prend.
3. Un **plan de contrôle partagé** : DNS, gestionnaire de secrets, chaîne de déploiement. S'ils tombent, la redondance des données ne sert à rien.

Risque à examiner : payer une topologie redondante sans avoir testé ses dépendances et son basculement. Le coût est certain dès qu'il apparaît sur la facture ; le bénéfice de disponibilité reste une hypothèse tant que le scénario de panne n'a pas été testé et observé.

## 5. EXERCICES

**Exercice 1 : la carte d'impact (25 min).** Remplis le tableau de la section 2 pour ton fil rouge, tous composants inclus, tiers compris.

**Exercice 2 : le prix de la neuvième (20 min).** Prends ton SLO actuel. Applique le calcul de la section 3 bis avec les prix de ton [relevé tarifaire](05-releve_tarifaire_reel.md), inter-zones compris, et écris la phrase que tu dirais au commanditaire : "cette neuvième coûte X par mois, et voici ce qu'elle évite". Une phrase sans les trois attributs (URL, date, volume) n'est pas recevable.

**Exercice 3 : le maillon faible (15 min).** Cherche dans ta carte la dépendance qui plafonne ta disponibilité réelle. Écris ce que tu ferais si le budget augmentait de 20%, et ce que tu ferais s'il n'augmentait pas.

## RÉSUMÉ

Trois topologies exposent des compromis différents : aucune ne se justifie automatiquement par le fait qu'un utilisateur paie. Le rayon d'impact se cartographie composant par composant, avec la colonne « ce que voit l'utilisateur ». Une neuvième supplémentaire se compare au coût métier d'une interruption, avec des hypothèses datées. Une redondance dépendante d'un maillon non redondé doit apparaître comme un risque dans l'ADR, plutôt que comme une disponibilité garantie.

## ET APRÈS

Reste à choisir un fournisseur sans se laisser enfermer : [04-choisir_fournisseur.md](04-choisir_fournisseur.md).

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.

### Transfert : changer de contexte

Applique le mécanisme de « 04 : Rayon d'impact, zones et le prix d'une neuvième » à une autre région et un fournisseur aux primitives différentes. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: cloud -->

## Repères de décision

- **Pourquoi :** L'infrastructure détermine la disponibilité, la sécurité, le coût et les possibilités de reprise du système.
- **Quand l’utiliser / quand l’éviter :** Choisis un service managé ou une infrastructure quand il réduit un risque ou un coût total. Ne déploie pas Kubernetes ou plusieurs services pour un système qui tourne proprement plus simplement.
- **Limites :** Un déploiement local ne valide pas le réseau, les IAM, les quotas, les sauvegardes ni la facture du fournisseur. Les prix changent ; toute estimation doit dater et indiquer son hypothèse.

## Mécanisme : la version sans magie

Décris ressources, identité, réseau, secrets, stockage, health, scaling, backup et rollback ; automatise seulement ce que tu peux tester et exploiter.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **04 : Rayon d'impact, zones et le prix d'une neuvième** se rattache à ce cas concret : Kintana doit supporter un réseau instable côté client et une exploitation prévisible côté service, sans exposer de secret ni exploser les coûts.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Plan de déploiement et d'exploitation Kintana

> **Arc Capsule Corp. / DBZ :** le Cloud n'est pas une baguette magique : tu loues des machines, du réseau et des services, avec une facture et des limites.

**Mission liée à « 04 : Rayon d'impact, zones et le prix d'une neuvième » :** Établis une architecture de déploiement minimale pour une tranche Kintana : ressources, IAM, réseau, secrets, stockage, health/readiness, sauvegarde et rollback. Exécute les éléments locaux disponibles ; étiquette le reste `NOT RUN`.

**Livrable :** diagramme d'infrastructure, estimation de coût datée, manifeste/IaC ou plan exécutable, runbook et preuve de test local.

**Critères d’acceptation :** aucune ressource fictive n'est marquée déployée ; permissions minimales ; coût et limites écrits ; procédure de rollback/restauration vérifiée seulement si elle a été exécutée.

**Transfert obligatoire :** Le trafic est multiplié par cinq et le fournisseur devient indisponible. Identifie le premier goulot et les coûts qui augmentent.

## Références officielles utiles

> **Référence principale vérifiée le 2 novembre 2026 :** la première ressource de ce panneau, également enregistrée dans `source_url`, a été consultée pour le mécanisme versionné traité ici. Les autres liens sont des compléments officiels utiles ; ils ne constituent pas chacun une attestation indépendante de l’exemple du curriculum. Aucune référence ne prouve que l’exemple a été exécuté. Vérifie la version cible et teste dans ton environnement avant un usage réel.

- [AWS Well-Architected : Availability](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/availability.html)
- [Azure Well-Architected : Availability zones and regions](https://learn.microsoft.com/en-us/azure/well-architected/design-guides/regions-availability-zones)
- [Google Cloud : Architecture Framework: Reliability](https://cloud.google.com/architecture/framework/reliability)
