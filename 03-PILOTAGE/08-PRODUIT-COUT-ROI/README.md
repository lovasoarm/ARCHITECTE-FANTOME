---
stability: intemporel
acte: pilotage
noyau: oui
route: complete
---

# 08 : PRODUIT, COÛT, ROI : DÉCIDER AVEC TROIS NOMBRES

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

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Le module utilise le cas d’étude pédagogique commun [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md) uniquement comme contexte partagé. Pour ce sous-module, applique la mission précise de sa ligne dans la section **Missions ciblées par sous-module** de cette carte ; le challenge local reste la consigne et le critère de validation. Cette référence ne crée ni prérequis ni gate supplémentaire.

## Ressources pratiques associées

- [Atelier de consolidation](ATELIER-CONSOLIDATION.md) : réutiliser les notions du module dans un cas intégré.
- [Corrigé de référence de l'atelier](corriges/ATELIER-CONSOLIDATION-CORRIGE.md) : à consulter après une tentative autonome.
