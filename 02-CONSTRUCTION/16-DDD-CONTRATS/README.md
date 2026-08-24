---
stability: intemporel
acte: construction
noyau: oui
route: complete
---

# 16 : DDD ET CONTRATS : LE LANGAGE AVANT LE CODE

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

> Palier 2bis : Construction. Durée estimée : 11 h 45.
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
| `01-00-why-ddd-contrats.md`              | pourquoi ce module mérite ton temps                       | 45 min |
| `00-PREREQUIS.md`                        | contrôle d'entrée                                         | 15 min |
| `02-langage_contextes_bornes.md`         | langage ubiquitaire, contextes bornés, carte de contextes | 45 min |
| `03-cqrs_coherence_terme.md`             | lecture / écriture, deux leçons, coût réel                | 45 min |
| `04-b_event_driven_distinct.md`          | event-driven ≠ CQRS (fichier distinct)                    | 30 min |
| `05-contrats_migration.md`               | versionner, déprécier, éteindre                           | 45 min |
| `06-exercice_architecture_trop_belle.md` | exercice : refuser par écrit                              | 45 min |
| `07-expliquer_cqrs_a_3_publics.md`       | junior, pair, direction                                   | 45 min |
| `97A-EXO-VERIFICATION.md`                | corriger la sortie d'un agent                             | 45 min |
| `90-grimoire.md`                         | les lignes à retenir                                      | 30 min |
| `95-challenge.md`                        | mise en pratique bornée                                   | 1 h 30 |
| `96-boss-fight.md`                       | épreuve de passage                                        | 3 h    |
| `08-defense-orale.md`                    | soutenance de 12 minutes                                  | 45 min |

## Livrables produits

- `ADR/` : un ADR de découpage en contextes bornés, un ADR de rupture de contrat daté.
- `contrats/` : le contrat d'API du fil rouge en v1 et v2, avec la période de double service.
- Ces pièces alimentent la famille S2 de [PREUVES-STAFF-ENGINEER.md](../../PREUVES-STAFF-ENGINEER.md).

## Vérification

`97-CHECKPOINT-PACK/criteres.md` fixe les critères de passage. Le boss fight ne se coche pas sans eux.

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
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [BOSS FIGHT : MODULE 16 : LA RUPTURE DE CONTRAT EN DIRECT](96-boss-fight.md)
- [Challenge : la carte, le contrat, le refus](95-challenge.md)
- [Défense orale : module 16](08-defense-orale.md)
- [Grimoire : DDD et contrats](90-grimoire.md)
- [`97-CHECKPOINT-PACK/`](97-CHECKPOINT-PACK/README.md)

<!-- CONTENU-DOSSIER:fin -->
