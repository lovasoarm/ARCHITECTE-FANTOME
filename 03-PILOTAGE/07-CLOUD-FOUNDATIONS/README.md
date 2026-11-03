---
stability: evolutif
acte: pilotage
noyau: oui
route: complete
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "03-PILOTAGE/07-CLOUD-FOUNDATIONS/01-00-why-cloud-foundations.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 03-PILOTAGE/07-CLOUD-FOUNDATIONS/01-00-why-cloud-foundations.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# 07 : CLOUD FOUNDATIONS : CHIFFRER AVANT DE CHOISIR

> Palier 3 : Pilotage. Durée estimée : 10 h 20, hors laboratoire de portabilité facultatif.
> Frontière : `06-FIABILITE-SLO` promet un niveau de service. Ce module en **paie la facture**.
> Les exemples du dépôt sont explicitement étiquetés `SIMULATION` ou `DONNÉE RÉELLE`. Une différence entre deux ressources doit être expliquée par ses hypothèses et ses sources ; aucune contradiction cachée n'est présentée comme un exercice.

## Ce que tu sauras faire

1. Chiffrer une facture mensuelle à 100, 10 000 et 1 000 000 d'utilisateurs, ligne par ligne.
2. Nommer les trois postes qui explosent en premier (egress, stockage chaud, appels d'API managés).
3. Choisir un fournisseur sur des critères écrits, dont un critère de sortie.
4. Porter un service chez un second fournisseur et mesurer l'écart réel.

## Parcours

| Fichier                                                                    | Objet                                      | Durée          |
| -------------------------------------------------------------------------- | ------------------------------------------ | -------------- |
| `01-00-why-cloud-foundations.md`                                           | pourquoi                                   | 45 min         |
| `02-modeles_cout.md`                                                       | modèles de coût et unités facturées        | 45 min         |
| `03-rayon_impact_zones.md`                                                 | régions, zones, rayon d'impact             | 45 min         |
| `04-choisir_fournisseur.md`                                                | grille de choix et critère de sortie       | 45 min         |
| `99-PORTAGE-MENTAL.md`                                                     | portage, preuve de transférabilité         | 45 min         |
| [`06-reference-portability/README.md`](06-reference-portability/README.md) | laboratoire de portabilité AWS/GCP         | selon le jalon |
| `05-releve_tarifaire_reel.md`                                              | relevé personnel daté (anti-copie)         | 75 min         |
| `07-RELEVE-REFERENCE-2026.md`                                              | simulation de budget, jamais un tarif réel | 20 min         |
| `90-grimoire.md`                                                           | lignes à retenir                           | 30 min         |
| `95-challenge.md` / `96-boss-fight.md`                                     | mise en pratique et passage                | 4 h 30         |

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
- [Simulation de budget cloud (données fictives)](07-RELEVE-REFERENCE-2026.md)
- [BOSS FIGHT : MODULE 07 : LA FACTURE A TRIPLÉ CE MOIS-CI](96-boss-fight.md)
- [95-challenge.md](95-challenge.md)
- [Grimoire : cloud foundations](90-grimoire.md)
- [`06-reference-portability/`](06-reference-portability/README.md) : laboratoire de portabilité AWS/GCP
- [`97-CHECKPOINT-PACK/`](97-CHECKPOINT-PACK/README.md)

<!-- CONTENU-DOSSIER:fin -->

## Référence d’architecture intégrée

Pour la route spécifique du projet **07 : Coffre Imprenable**, étudie d’abord la [Leçon-pont 12 : Fondations réseau](../../05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/12-fondations-reseau-dns-tcp-tls.md) : elle enseigne IP, ports, DNS, TCP, TLS et HTTP depuis les bases. Ce lien ne crée pas de prérequis Portfolio pour tous les apprenants Cloud.

- `08-ARCHITECTURES-RESEAUX-IDENTITES-REPRISE.md` : réseau, identité, déploiement, coût, RPO/RTO et reprise testée. Cette architecture applique les notions réseau ; elle ne remplace pas leur cours introductif.

## Préparer l'environnement

Lire [`SETUP.md`](SETUP.md) avant toute commande ou installation. Les prérequis locaux de l'activité priment sur les indications générales.

## Navigation complète des ressources

Le sommaire ci-dessus reste le parcours recommandé. Les index ci-dessous rendent accessibles les ressources d'appui et les sous-parcours qui ne sont pas des étapes linéaires supplémentaires.

### Ressources d'appui et vérification

- [Architectures cloud : réseau, identité, déploiement, coût et reprise](08-ARCHITECTURES-RESEAUX-IDENTITES-REPRISE.md)

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Kintana est un cas d’étude pédagogique commun, pas un projet personnel imposé. Pour ce module, applique **la notion réellement enseignée ici** à la mission correspondante dans la [carte des missions Kintana par domaine](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). N’utilise pas automatiquement la FAQ IA : elle est réservée aux activités IA/RAG. Le challenge local de ce module reste la source de la consigne et de ses critères ; cette mise en pratique ne crée ni prérequis, ni gate supplémentaire.

## Ressources pratiques associées

- [Atelier de consolidation](ATELIER-CONSOLIDATION.md) : réutiliser les notions du module dans un cas intégré.
- [Corrigé de référence de l'atelier](corriges/ATELIER-CONSOLIDATION-CORRIGE.md) : à consulter après une tentative autonome.
