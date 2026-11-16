---
stability: intemporel
acte: construction
noyau: oui
route: complete
---

# 16 : DDD ET CONTRATS : LE LANGAGE AVANT LE CODE

> **Repère de navigation :** `97-CHECKPOINT-PACK/` contient la grille et les preuves de checkpoint ; `97A-EXO-VERIFICATION.md` est un exercice indépendant d’application/vérification. Le premier est un dossier de critères, le second une activité : ce ne sont pas deux leçons successives.

<!-- AF-DIAGRAM:ddd -->

```text
┌────────────────────┐     ┌────────────────────┐
│ Context A           │     │ Context B          │
│ Order / Customer    │◄───►│ Billing / Payment  │
└────────────────────┘     └────────────────────┘
          ▲                          ▲
          └──── contrats explicites ─┘
```

Les bounded contexts isolent des modèles locaux et relient les domaines par des contrats explicites.

> Palier 2bis : Construction. Durée estimée : 12 h 30, cas fil rouge obligatoire inclus.
> Frontière de palier : `14-ARCHITECTURE-PATTERNS` t'apprend **les formes** (couches, ports, hexagone).
> `15-ARCHI-LAB` te fait **assembler** ces formes sur un cas. Ce module-ci travaille **le langage et les
> contrats** : ce que les mots veulent dire, et ce que tu promets à l'extérieur. Trois modules, trois
> objets différents : forme, assemblage, langage. Ne les confonds pas.

## Ce que tu sauras faire en sortant

1. Découper un domaine en contextes bornés à partir du vocabulaire réel des gens du métier.
2. Écrire un contrat d'API versionné, avec sa date d'extinction annoncée.
3. Séparer lecture et écriture (CQRS) sans inventer une infrastructure que personne ne demande.
4. Refuser une architecture trop belle, par écrit, avec un chiffre.

## Prérequis

Voir `00-PREREQUIS.md`. Si un seul point tombe, retourne le voir : ce module ne réexplique rien.

## Parcours du module

| Fichier                                  | Objet                                                     | Durée  |
| ---------------------------------------- | --------------------------------------------------------- | ------ |
| `00-PREREQUIS.md`                        | contrôle d'entrée à réaliser avant toute leçon            | 15 min |
| `01-00-why-ddd-contrats.md`              | pourquoi ce module mérite ton temps                       | 45 min |
| `02-langage_contextes_bornes.md`         | langage ubiquitaire, contextes bornés, carte de contextes | 45 min |
| `03-cqrs_coherence_terme.md`             | lecture / écriture, deux leçons, coût réel                | 45 min |
| `04-b_event_driven_distinct.md`          | event-driven ≠ CQRS (fichier distinct)                    | 30 min |
| `05-contrats_migration.md`               | versionner, déprécier, éteindre                           | 45 min |
| `06-exercice_architecture_trop_belle.md` | exercice : refuser par écrit                              | 45 min |
| `07-expliquer_cqrs_a_3_publics.md`       | junior, pair, direction                                   | 45 min |
| `10-CAS-FIL-ROUGE-COMMANDE-LIVRAISON.md` | cas intégré obligatoire avant challenge et Boss           | 45 min |
| `97A-EXO-VERIFICATION.md`                | corriger la sortie d'un agent                             | 45 min |
| `95-challenge.md`                        | mise en pratique bornée                                   | 1 h 30 |
| `96-boss-fight.md`                       | épreuve de passage                                        | 3 h    |
| `08-defense-orale.md`                    | soutenance de 12 minutes                                  | 45 min |
| `90-grimoire.md`                         | les lignes à retenir, après la pratique                   | 30 min |

## Livrables produits

- `ADR/` : un ADR de découpage en contextes bornés, un ADR de rupture de contrat daté.
- `contrats/` : le contrat d'API du fil rouge en v1 et v2, avec la période de double service.
- Ces pièces alimentent la famille S2 de [PREUVES-STAFF-ENGINEER.md](../../PREUVES-STAFF-ENGINEER.md).

## Vérification

`97-CHECKPOINT-PACK/97-criteres.md` fixe les critères de passage. Consulte la grille avant le challenge, renseigne les preuves au fil du parcours et arrête le verdict après le Boss Fight.

<!-- PIECES-MODULE:debut -->

## Les pièces de ce module

- [`00-PREREQUIS.md`](00-PREREQUIS.md) : Auto-test d'entrée : à passer avant d'ouvrir le module
- [`95-challenge.md`](95-challenge.md) : Challenge : l'épreuve du module
- [`90-grimoire.md`](90-grimoire.md) : Grimoire : ce que tu dois pouvoir restituer
- [`96-boss-fight.md`](96-boss-fight.md) : Boss : l'épreuve du palier, une seule fois

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Contrôle d'entrée : DDD et contrats](00-PREREQUIS.md)
- [Pourquoi ce module mérite ton temps : DDD et contrats](01-00-why-ddd-contrats.md)
- [Langage ubiquitaire et contextes bornés](02-langage_contextes_bornes.md)
- [CQRS et cohérence à terme : deux leçons, un seuil](03-cqrs_coherence_terme.md)
- [Event-driven distinct : réagir n'est pas projeter](04-b_event_driven_distinct.md)
- [Contrats : versionner, déprécier, éteindre](05-contrats_migration.md)
- [Exercice : refuser une architecture trop belle](06-exercice_architecture_trop_belle.md)
- [Expliquer CQRS à trois publics](07-expliquer_cqrs_a_3_publics.md)
- [EXO jeune IA : l'agent qui découpe trop](97A-EXO-VERIFICATION.md)
- [Challenge : la carte, le contrat, le refus](95-challenge.md)
- [BOSS FIGHT : MODULE 16 : LA RUPTURE DE CONTRAT EN DIRECT](96-boss-fight.md)
- [Défense orale : module 16](08-defense-orale.md)
- [Grimoire : DDD et contrats : après la pratique](90-grimoire.md)
- [99-PORTAGE-MENTAL.md : transfert du concept](99-PORTAGE-MENTAL.md)
- [`97-CHECKPOINT-PACK/`](97-CHECKPOINT-PACK/README.md)

<!-- CONTENU-DOSSIER:fin -->

## Usage recommandé

Commencer par `00-PREREQUIS.md`, puis lire `01-00-why-ddd-contrats.md` et les leçons dans l’ordre. Consulter la grille `97-CHECKPOINT-PACK/97-criteres.md` dès le départ, réaliser le cas fil rouge `10-CAS-FIL-ROUGE-COMMANDE-LIVRAISON.md`, puis l’exercice `97A-EXO-VERIFICATION.md`, le challenge `95`, le Boss Fight `96` et la défense orale `08`. Le grimoire `90` se lit après ces tentatives ; le portage `99` est une ressource de transfert de fin de module. La maîtrise exige une carte de contextes et des contrats défendus, pas seulement un diagramme ou la création de microservices.

## Préparer l'environnement

Lire [`SETUP.md`](SETUP.md) avant toute commande ou installation. Les prérequis locaux de l'activité priment sur les indications générales.

## Navigation complète des ressources

Le sommaire ci-dessus reste le parcours recommandé. Les index ci-dessous rendent accessibles les ressources d'appui et les sous-parcours qui ne sont pas des étapes linéaires supplémentaires.

### Ressources d'appui et vérification

- [Cas fil rouge DDD : commande, paiement et livraison sans modèle métier monolithique](10-CAS-FIL-ROUGE-COMMANDE-LIVRAISON.md)

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Kintana est un cas d’étude pédagogique commun, pas un projet personnel imposé. Pour ce module, applique **la notion réellement enseignée ici** à la mission correspondante dans la [carte des missions Kintana par domaine](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). N’utilise pas automatiquement la FAQ IA : elle est réservée aux activités IA/RAG. Le challenge local de ce module reste la source de la consigne et de ses critères ; cette mise en pratique ne crée ni prérequis, ni gate supplémentaire.

## Ressources pratiques associées

- [Atelier de consolidation](ATELIER-CONSOLIDATION.md) : réutiliser les notions du module dans un cas intégré.
- [Corrigé de référence de l'atelier](corriges/ATELIER-CONSOLIDATION-CORRIGE.md) : à consulter après une tentative autonome.
