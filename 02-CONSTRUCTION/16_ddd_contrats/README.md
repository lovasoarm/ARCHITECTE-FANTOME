---
stability: intemporel
acte: construction
noyau: oui
---

# 16 — DDD ET CONTRATS : LE LANGAGE AVANT LE CODE

> Palier 2bis — Construction. Durée estimée : 9 h 45 (10 leçons numérotées, 1 boss fight, 1 défense orale).
> Frontière de palier : `14_architecture_patterns` t'apprend **les formes** (couches, ports, hexagone).
> `15-ARCHI-LAB` te fait **assembler** ces formes sur un cas. Ce module-ci travaille **le langage et les
> contrats** : ce que les mots veulent dire, et ce que tu promets à l'extérieur. Trois modules, trois
> objets différents : forme, assemblage, langage. Ne les confonds pas.

## Ce que tu sauras faire en sortant

1. Découper un domaine en contextes bornés à partir du vocabulaire réel des gens du métier.
2. Écrire un contrat d'API versionné, avec sa date d'extinction annoncée.
3. Séparer lecture et écriture (CQRS) sans inventer une infrastructure que personne ne demande.
4. Refuser une architecture trop belle, par écrit, avec un chiffre.

## Prérequis

Voir `00_prereq_check.md`. Si un seul point tombe, retourne le voir : ce module ne réexplique rien.

## Parcours du module

| Fichier | Objet | Durée |
| --- | --- | --- |
| `00_why_ddd_contrats.md` | pourquoi ce module mérite ton temps | 45 min |
| `00_prereq_check.md` | contrôle d'entrée | 15 min |
| `01_langage_contextes_bornes.md` | langage ubiquitaire, contextes bornés, carte de contextes | 45 min |
| `02_cqrs_coherence_terme.md` | lecture / écriture, cohérence à terme, coût réel | 45 min |
| `03_contrats_migration.md` | versionner, déprécier, éteindre | 45 min |
| `04_exercice_architecture_trop_belle.md` | exercice : refuser par écrit | 45 min |
| `05_expliquer_cqrs_a_3_publics.md` | junior, pair, direction | 45 min |
| `06_EXO_JEUNE_IA.md` | corriger la sortie d'un agent | 45 min |
| `grimoire.md` | les lignes à retenir | 30 min |
| `challenge.md` | mise en pratique bornée | 1 h 30 |
| `boss-fight.md` | épreuve de passage | 3 h |
| `defense-orale.md` | soutenance de 12 minutes | 45 min |

## Livrables produits

- `ADR/` : un ADR de découpage en contextes bornés, un ADR de rupture de contrat daté.
- `contrats/` : le contrat d'API du fil rouge en v1 et v2, avec la période de double service.
- Ces pièces alimentent la famille S2 de [PREUVES-STAFF-ENGINEER.md](../../PREUVES-STAFF-ENGINEER.md).

## Vérification

`verification_pack/criteres.md` fixe les critères de passage. Le boss fight ne se coche pas sans eux.
