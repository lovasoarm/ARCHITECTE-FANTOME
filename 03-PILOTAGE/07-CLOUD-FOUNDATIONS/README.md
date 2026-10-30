---
stability: evolutif
acte: pilotage
noyau: oui
route: complete
paper_audit_status: STRUCTURE_COMPLETE_EXPERT_REVIEW_PENDING
expert_review: pending
paper_audit_date: 2026-10-30
terrain_validation: NON_CERTIFIEE_DANS_CET_ENVIRONNEMENT
---

# 07 : CLOUD FOUNDATIONS : CHIFFRER AVANT DE CHOISIR

> **État pédagogique : 30 octobre 2026 : preuves documentaires complétées.** Les ajouts ciblés couvrent les exemples, pratiques, vérifications et transferts requis pour ce module. Une revue technique indépendante et une validation terrain restent distinctes ; voir [48 : External Review Gate](../../06-ANNEXES-TRANSVERSES/48-EXTERNAL-REVIEW-GATE.md) et [49 : Terrain Maturity Gate](../../06-ANNEXES-TRANSVERSES/49-TERRAIN-MATURITY-GATE.md).

> Palier 3 : Pilotage. Durée estimée : 9 h 50.
> Frontière : `06-FIABILITE-SLO` promet un niveau de service. Ce module en **paie la facture**.
> Les deux fichiers se contredisent toujours quelque part : c'est voulu.

## Ce que tu sauras faire

1. Chiffrer une facture mensuelle à 100, 10 000 et 1 000 000 d'utilisateurs, ligne par ligne.
2. Nommer les trois postes qui explosent en premier (egress, stockage chaud, appels d'API managés).
3. Choisir un fournisseur sur des critères écrits, dont un critère de sortie.
4. Porter un service chez un second fournisseur et mesurer l'écart réel.

## Parcours

| Fichier                                                                    | Objet                                     | Durée          |
| -------------------------------------------------------------------------- | ----------------------------------------- | -------------- |
| `01-00-why-cloud-foundations.md`                                           | pourquoi                                  | 45 min         |
| `02-modeles_cout.md`                                                       | modèles de coût et unités facturées       | 45 min         |
| `03-rayon_impact_zones.md`                                                 | régions, zones, rayon d'impact            | 45 min         |
| `04-choisir_fournisseur.md`                                                | grille de choix et critère de sortie      | 45 min         |
| `99-PORTAGE-MENTAL.md`                                                     | portage, preuve de transférabilité        | 45 min         |
| [`06-reference-portability/README.md`](06-reference-portability/README.md) | laboratoire de portabilité AWS/GCP        | selon le jalon |
| `05-releve_tarifaire_reel.md`                                              | relevé personnel daté (anti-copie)        | 45 min         |
| `07-RELEVE-REFERENCE-2026.md`                                              | relevé de référence, à ne jamais recopier | 20 min         |
| `90-grimoire.md`                                                           | lignes à retenir                          | 30 min         |
| `95-challenge.md` / `96-boss-fight.md`                                     | mise en pratique et passage               | 4 h 30         |

## Livrable

`06A-BUDGET-CLOUD.md` : famille S1 de [PREUVES-STAFF-ENGINEER.md](../../PREUVES-STAFF-ENGINEER.md).

<!-- PIECES-MODULE:debut -->

## Les pièces de ce module

- [`00-PREREQUIS.md`](00-PREREQUIS.md) : Auto-test d'entrée : à passer avant d'ouvrir le module
- [`95-challenge.md`](95-challenge.md) : Challenge : l'épreuve du module
- [`90-grimoire.md`](90-grimoire.md) : Grimoire : ce que tu dois pouvoir restituer
- [`96-boss-fight.md`](96-boss-fight.md) : Boss : l'épreuve du palier, une seule fois

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Prereq check : cloud foundations](00-PREREQUIS.md)
- [Pourquoi ce module mérite ton temps : cloud foundations](01-00-why-cloud-foundations.md)
- [Modèles de coût : l'unité avant le prix](02-modeles_cout.md)
- [04 : Rayon d'impact, zones et le prix d'une neuvième](03-rayon_impact_zones.md)
- [Choisir un fournisseur : la grille, et la porte de sortie](04-choisir_fournisseur.md)
- [06 : Porter son budget chez un second fournisseur](99-PORTAGE-MENTAL.md)
- [07 : Relevé tarifaire réel, obligatoire et contredisible](05-releve_tarifaire_reel.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [06A-BUDGET-CLOUD.md](06A-BUDGET-CLOUD.md)
- [Relevé de référence : ordres de grandeur 2026](07-RELEVE-REFERENCE-2026.md)
- [BOSS FIGHT : MODULE 07 : LA FACTURE A TRIPLÉ CE MOIS-CI](96-boss-fight.md)
- [95-challenge.md](95-challenge.md)
- [Grimoire : cloud foundations](90-grimoire.md)
- [`06-reference-portability/`](06-reference-portability/README.md) : laboratoire de portabilité AWS/GCP
- [`97-CHECKPOINT-PACK/`](97-CHECKPOINT-PACK/README.md)

<!-- CONTENU-DOSSIER:fin -->

## Référence d’architecture intégrée

- `08-ARCHITECTURES-RESEAUX-IDENTITES-REPRISE.md` : réseau, identité, déploiement, coût, RPO/RTO et reprise testée.

## Préparer l'environnement

Lire [`SETUP.md`](SETUP.md) avant toute commande ou installation. Les prérequis locaux de l'activité priment sur les indications générales.

## Navigation complète des ressources

Le sommaire ci-dessus reste le parcours recommandé. Les index ci-dessous rendent accessibles les ressources d'appui et les sous-parcours qui ne sont pas des étapes linéaires supplémentaires.

### Ressources d'appui et vérification

- [Architectures cloud : réseau, identité, déploiement, coût et reprise](08-ARCHITECTURES-RESEAUX-IDENTITES-REPRISE.md)

## Standard de complétude et audit
