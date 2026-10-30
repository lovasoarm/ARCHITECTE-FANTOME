---
stability: intemporel
acte: pilotage
noyau: oui
route: complete
paper_audit_status: STRUCTURE_COMPLETE_EXPERT_REVIEW_PENDING
expert_review: pending
paper_audit_date: 2026-10-30
terrain_validation: NON_CERTIFIEE_DANS_CET_ENVIRONNEMENT
---

# 08 : PRODUIT, COÛT, ROI : DÉCIDER AVEC TROIS NOMBRES

> **État pédagogique : 30 octobre 2026 : preuves documentaires complétées.** Les ajouts ciblés couvrent les exemples, pratiques, vérifications et transferts requis pour ce module. Une revue technique indépendante et une validation terrain restent distinctes ; voir [48 : External Review Gate](../../06-ANNEXES-TRANSVERSES/48-EXTERNAL-REVIEW-GATE.md) et [49 : Terrain Maturity Gate](../../06-ANNEXES-TRANSVERSES/49-TERRAIN-MATURITY-GATE.md).

<!-- AF-DIAGRAM:roi -->

```text
Decision
  │
  ├──► Value / impact
  ├──► Cost
  ├──► Risk
  └──► Opportunity cost
            │
            ▼
        trade-off
```

Une décision produit compare valeur, coût, risque et valeur sacrifiée ailleurs plutôt qu’un seul chiffre.

> Palier 3 : Pilotage. Durée estimée : 8 h 45.
> Frontière : `07-CLOUD-FOUNDATIONS` donne le coût d'infrastructure. Ce module donne le **coût
> complet d'une décision** (temps, risque, valeur), et la façon de la défendre devant qui paie.

## Ce que tu sauras faire

1. Remplir une grille coût / risque / valeur en 20 minutes, avec des sources.
2. Calculer le point mort d'un refactoring et savoir l'abandonner s'il n'en a pas.
3. Déclarer une dette technique comme un engagement daté, pas comme une plainte.
4. Encaisser un refus chiffré d'une direction financière sans perdre le sujet.

## Parcours

| Fichier                                    | Objet                               | Durée  |
| ------------------------------------------ | ----------------------------------- | ------ |
| `01-00-why-produit-cout-roi.md`            | pourquoi                            | 45 min |
| `02-grille_cout_risque_valeur.md`          | la grille                           | 45 min |
| `03-roi_refactoring_point_mort.md`         | point mort                          | 45 min |
| `04-dette_technique_declaree.md`           | dette déclarée                      | 45 min |
| `05-refus_chiffre_direction_financiere.md` | exercice de refus                   | 45 min |
| `90-grimoire.md`                           | lignes à retenir                    | 30 min |
| `95-challenge.md`                          | **produit `DECISION-ARBITRAGE.md`** | 1 h 30 |
| `96-boss-fight.md`                         | épreuve de passage                  | 3 h    |

## Terrain supplémentaire : CMS Architecture Lab

Le [lab CMS](06-CMS-ARCHITECTURE-LAB/README.md) ne sert pas à apprendre un produit. Il sert à décider si un CMS, un headless ou du custom paie son coût organisationnel, de sécurité, de migration et de maintenance.

> **SCÈNE CRAZYDEVS : Prison Break :** choisir un CMS avant de savoir comment en sortir, c’est construire la serrure après avoir fermé la porte.

## Livrable

`DECISION-ARBITRAGE.md` : famille S4 de [PREUVES-STAFF-ENGINEER.md](../../PREUVES-STAFF-ENGINEER.md).

<!-- PIECES-MODULE:debut -->

## Les pièces de ce module

- [`00-PREREQUIS.md`](00-PREREQUIS.md) : Auto-test d'entrée : à passer avant d'ouvrir le module
- [`95-challenge.md`](95-challenge.md) : Challenge : l'épreuve du module
- [`90-grimoire.md`](90-grimoire.md) : Grimoire : ce que tu dois pouvoir restituer
- [`96-boss-fight.md`](96-boss-fight.md) : Boss : l'épreuve du palier, une seule fois

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Prereq check : produit / coût / ROI](00-PREREQUIS.md)
- [Pourquoi ce module mérite ton temps : produit, coût, ROI](01-00-why-produit-cout-roi.md)
- [La grille coût / risque / valeur](02-grille_cout_risque_valeur.md)
- [ROI d'un refactoring et point mort](03-roi_refactoring_point_mort.md)
- [La dette technique déclarée](04-dette_technique_declaree.md)
- [Exercice : le refus chiffré d'une direction financière](05-refus_chiffre_direction_financiere.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [BOSS FIGHT : MODULE 08 : L'ARBITRAGE DEVANT CELUI QUI PAIE](96-boss-fight.md)
- [95-challenge.md](95-challenge.md)
- [Grimoire : produit, coût, ROI](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

## Préparer l'environnement

Lire [`SETUP.md`](SETUP.md) avant toute commande ou installation. Les prérequis locaux de l'activité priment sur les indications générales.

## Standard de complétude et audit

## Navigation complète des ressources

Les liens ci-dessous donnent accès aux ressources documentaires du module, y compris les sous-dossiers. Le sommaire conserve l’ordre pédagogique recommandé ; cet index n’ajoute pas d’étape obligatoire.

- [`00-PREREQUIS.md`](00-PREREQUIS.md)
- [`01-00-why-produit-cout-roi.md`](01-00-why-produit-cout-roi.md)
- [`02-grille_cout_risque_valeur.md`](02-grille_cout_risque_valeur.md)
- [`03-roi_refactoring_point_mort.md`](03-roi_refactoring_point_mort.md)
- [`04-dette_technique_declaree.md`](04-dette_technique_declaree.md)
- [`05-refus_chiffre_direction_financiere.md`](05-refus_chiffre_direction_financiere.md)
- [`06-CMS-ARCHITECTURE-LAB/00-PREREQUIS.md`](06-CMS-ARCHITECTURE-LAB/00-PREREQUIS.md)
- [`06-CMS-ARCHITECTURE-LAB/01-00-why-cms-architecture.md`](06-CMS-ARCHITECTURE-LAB/01-00-why-cms-architecture.md)
- [`06-CMS-ARCHITECTURE-LAB/02-headless-vs-coupled.md`](06-CMS-ARCHITECTURE-LAB/02-headless-vs-coupled.md)
- [`06-CMS-ARCHITECTURE-LAB/03-cost-security-migration.md`](06-CMS-ARCHITECTURE-LAB/03-cost-security-migration.md)
- [`06-CMS-ARCHITECTURE-LAB/90-grimoire.md`](06-CMS-ARCHITECTURE-LAB/90-grimoire.md)
- [`06-CMS-ARCHITECTURE-LAB/95-challenge.md`](06-CMS-ARCHITECTURE-LAB/95-challenge.md)
- [`06-CMS-ARCHITECTURE-LAB/96-boss-fight.md`](06-CMS-ARCHITECTURE-LAB/96-boss-fight.md)
- [`06-CMS-ARCHITECTURE-LAB/99A-PONT.md`](06-CMS-ARCHITECTURE-LAB/99A-PONT.md)
- [`06-CMS-ARCHITECTURE-LAB/README.md`](06-CMS-ARCHITECTURE-LAB/README.md)
- [`06-CMS-ARCHITECTURE-LAB/SETUP.md`](06-CMS-ARCHITECTURE-LAB/SETUP.md)
- [`90-grimoire.md`](90-grimoire.md)
- [`95-challenge.md`](95-challenge.md)
- [`96-boss-fight.md`](96-boss-fight.md)
- [`99-PORTAGE-MENTAL.md`](99-PORTAGE-MENTAL.md)
- [`SETUP.md`](SETUP.md)
