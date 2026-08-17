---
stability: perissable_2027
acte: appliquer
---

# MODÈLE S2 : ADR-PRINCIPAL.md : exemplaire de référence, anonymisé

Projet fictif : **Lumen**, plateforme de réservation de créneaux pour ateliers associatifs.
La famille S2 exige au minimum trois ADR (découpage en contextes bornés, choix de
persistance, rupture de contrat datée). Ce fichier illustre le premier en entier, au format
imposé, et résume les deux autres pour montrer où placer le chiffrage.

## ADR-001 : découper "Réservation" et "Planification" en deux contextes bornés

**Statut :** acceptée : 12/03
**Contexte.** Le mot "créneau" désigne deux réalités différentes selon l'équipe : pour la
réservation, un créneau est une place à occuper ou libérer ; pour la planification, un
créneau est une plage horaire à publier ou annuler avant même qu'un utilisateur ne le voie.
Les deux équipes ont modifié la même table `creneaux` trois fois ce trimestre en se
marchant dessus, dont un incident de production le 04/03 où une annulation de planification
a supprimé une réservation confirmée.

**Options considérées.**

> Relevé le 2026-08-14, source : pages tarifaires publiques des fournisseurs citées dans le module, à revérifier avant 2027.

| Option | Description | Coût de mise en œuvre | Effet sur la disponibilité | Effet mensuel sur le budget cloud |
| --- | --- | --- | --- | --- |
| A. Ne rien changer | garder une seule table, ajouter des vérifications applicatives | 2 jours | aucun effet direct, mais le risque de récidive reste entier | 0 € |
| B. Séparer en deux contextes bornés avec un événement de synchronisation | `Planification` publie, `Réservation` s'abonne | 9 jours | ajoute une latence de propagation mesurée à 150 ms en moyenne (voir `02-CONSTRUCTION/16_ddd_contrats/02_cqrs_coherence_terme.md`) | +18 €/mois (file d'événements managée, palier de base) |
| C. Séparer en deux services avec base de données propre à chacun | isolation complète, pas de table partagée | 21 jours | supprime le risque de verrou croisé, mais complexifie la cohérence transactionnelle | +65 €/mois (deuxième instance de base de données) |

**Décision.** Option B. Le coût de 9 jours et 18 €/mois est justifié par l'incident du
04/03, dont le correctif d'urgence a coûté à lui seul 1,5 jour à l'équipe. L'option C est
écartée : son coût est trois fois supérieur pour un gain de disponibilité non demandé au
SLO actuel (`PREUVES/SLO.md` de ce projet fictif fixe la cible à 99,5 %, atteignable avec B).

**Conséquences.** Le modèle de lecture de `Réservation` peut afficher une place comme
disponible jusqu'à 150 ms après sa publication réelle par `Planification`. Cette latence est
documentée dans `PREUVES/SLO.md` pour qu'elle ne soit jamais découverte en production.

**Date de revue.** 12/09 : vérifier si le volume d'événements justifie encore le palier de
base de la file, ou si le coût mensuel a dérivé.

## ADR-002 : choix de persistance pour le contexte Réservation (résumé)

**Statut :** acceptée : 02/04
**Décision.** Base relationnelle managée avec réplique de lecture, plutôt qu'un magasin
clé-valeur : les requêtes de disponibilité croisent trois critères (créneau, atelier,
capacité restante), ce qu'une base relationnelle indexe nativement. Coût chiffré dans
`PREUVES/BUDGET-CLOUD.md`, ligne "base de données", palier 10 000 utilisateurs : +195 €/mois
par rapport au palier 100 utilisateurs, pour l'ajout de la réplique de lecture.

## ADR-003 : rupture de contrat sur l'API publique de disponibilité (résumé)

**Statut :** acceptée : 30/05, extinction de l'ancien contrat le 30/08 (délai de 90 jours)
**Décision.** Le champ `places_libres` (entier) est remplacé par `disponibilite`
(énumération : `libre`, `limitee`, `complet`), pour ne plus exposer un chiffre exact
exploitable par des scripts tiers de réservation automatisée, un abus constaté sur la
version précédente. Les deux champs coexistent 90 jours, avec un en-tête de dépréciation
sur l'ancien. Date d'extinction fixée et communiquée aux trois consommateurs connus de
l'API avant l'écriture de cet ADR, pas après.

## Diagramme de reference (volet « diagrammes » du dossier final)

Un ADR de topologie sans dessin n'est pas defendable au tableau. Le diagramme
ci-dessous est celui attendu : il montre les deux zones, la region secondaire, la nature
de chaque replication et l'endroit exact ou l'argent sort. Il est repris a l'identique de
[03-PILOTAGE/07_cloud_foundations/04_rayon_impact_zones.md](../03-PILOTAGE/07_cloud_foundations/04_rayon_impact_zones.md).

```text
                        REGION A (europe-ouest)
  +-------------------------------------------------------------+
  |   ZONE a1                        ZONE a2                     |
  |  +---------------+   replication  +---------------+          |
  |  | app  x2       |  synchrone     | app  x2       |          |
  |  | base PRIMAIRE |==============> | base REPLIQUE |          |
  |  | cache         |  < 5 ms, meme  | cache         |          |
  |  +---------------+  facture zone  +---------------+          |
  |          \                              /                    |
  |           \____ repartiteur de charge _/                     |
  |                        |                                     |
  +------------------------|-------------------------------------+
                           |  bascule automatique si une zone tombe
                           |  perte attendue : 0 donnee, ~60 s de service
                           |
       egress inter-region |  FACTURE AU Go SORTANT
                           v
                        REGION B (amerique-nord)
  +-------------------------------------------------------------+
  |   ZONE b1 : app x1, base SECONDE, replication asynchrone     |
  |   retard 1 a 15 s = donnees perdues en cas de bascule region |
  +-------------------------------------------------------------+
```

Regle de reprise : dans TON ADR, remplace les prix et les latences par ceux de ton
releve ([07_releve_tarifaire_reel.md](../03-PILOTAGE/07_cloud_foundations/07_releve_tarifaire_reel.md)),
date le dessin, et annote la fleche d'egress avec le volume mensuel que tu attends. Un
diagramme sans volume annote ne permet pas de discuter le cout.

## Où ce modèle est repris

Chaque ADR chiffre au moins une conséquence en coût (famille S1) ou en disponibilité
(famille S3), conformément à l'exigence de `PREUVES-STAFF-ENGINEER.md`. Le dossier ADR
complet de ton propre projet reste un dossier `ADR/` à plusieurs fichiers si tu le préfères ;
seul le fichier `PREUVES/ADR-PRINCIPAL.md` de ton dépôt, imposé par
`PREUVES-MODELES/README.md`, sert de point d'entrée unique et doit au minimum résumer les
trois ADR comme ci-dessus, avec un lien vers le dossier complet s'il existe.
