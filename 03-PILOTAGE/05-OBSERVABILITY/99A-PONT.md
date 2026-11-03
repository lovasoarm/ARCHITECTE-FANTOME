---
perishability_id: PER-0057

stability: "perissable"
acte: comprendre
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_url: "https://opentelemetry.io/docs/concepts/context-propagation/"
source_type: "primary"
review_interval: "6 mois"
review_due: "2027-05-03"
source_scope: "Documentation officielle ou source primaire consultée en rapport avec « PONT : de observer un système à collaborer avec des humains à l'artisanat en équipe ». La référence soutient le concept/version explicitement indiqué dans cette ressource ; ce statut ne certifie pas chaque phrase, chaque snippet ni l'exécution locale. Les affirmations empiriques et les API versionnées restent limitées au scope ci-dessous."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "OFFICIAL_SOURCE_IDENTITY_AND_CONCEPT_SCOPE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

> **SCÈNE CRAZYDEVS : finale au stade :** 99,9 % de disponibilité sur un slide ne sauve personne à 03:17 quand le service hurle. La vraie compétence commence quand il faut transformer la métrique en décision.

# PONT : de observer un système à collaborer avec des humains à l'artisanat en équipe

<!-- AF-DIAGRAM:observability -->

```text
                         System
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
           Logs         Metrics        Traces
             │             │             │
        events/text     trends/SLO    causality/path
```

Logs, métriques et traces donnent trois angles complémentaires pour reconstruire le comportement d’un système.

Temps de lecture ~2 min

-> ~10 min

> **ARRÊTE-TOI ICI.** Ce fichier est un point de passage obligé entre `03-PILOTAGE/05-OBSERVABILITY` et `03-PILOTAGE/10-TEAM-CRAFT`. Ne l'ouvre pas comme "encore un chapitre" : c'est un palier de respiration avant un saut de nature.

## POURQUOI CE PONT EXISTE

L'observabilité rend visible le comportement du code. `03-PILOTAGE/10-TEAM-CRAFT/` rend visible le comportement de l'équipe : revue de code, mentorat, désaccord technique, PR bloquante. Le principe est le même : ce qui n'est pas mesurable ne s'améliore pas.

## CE QUE TU MAÎTRISES DÉJÀ

- Instrumenter un service avec logs, metrics, traces.
- Repérer un SLI utile d'un vanity metric.
- Écrire un postmortem qui apprend, pas qui blâme.

## VOCABULAIRE NOUVEAU QUI ARRIVE

- **Revue de code** : un rituel de qualité, pas un tribunal.
- **RFC / ADR** : décision technique tracée par écrit.
- **Blameless postmortem** : chercher la cause, pas le coupable.
- **Bus factor** : combien de personnes doivent partir avant que le projet meure.

## LE PIÈGE MENTAL TYPIQUE DU SAUT

Traiter une PR comme un examen : "c'est bien ou c'est mal ?". Une revue utile pose des questions et propose des trade-offs, pas des verdicts.

## EXERCICE-CHARNIÈRE (5 min chrono)

Écris un commentaire de revue sur un code que tu n'aurais pas écrit comme ça. Deux versions : (a) verdictale ("c'est faux, refais"), (b) dialoguée ("j'aurais tenté X pour telle raison, qu'est-ce qui t'a fait choisir Y ?"). Compare les effets. `../10-TEAM-CRAFT/02-code_review.md`.

## SI TU BLOQUES

Relis le module précédent avant de continuer. Ce pont existe précisément parce que sauter cette marche brise beaucoup d'apprenants. Aucune honte à revenir.

<!-- AF-TRANSFER-FIELD-1.1 -->

## Transfert terrain : Kintana

**Pourquoi ce transfert compte :** une notion que tu sais réciter mais que tu ne sais pas replacer dans un système est encore fragile.

**Quand la réutiliser :** quand une contrainte du produit change (rôle, réseau, volume, concurrence, panne ou coût) et que tu dois déterminer ce qui reste invariant.

**Limite :** ne transpose pas une syntaxe ou une solution sans vérifier ses hypothèses ; le même mécanisme peut avoir des garanties différentes selon le runtime et le stockage.

**Mission courte :** applique le principe de cette page à un incrément de [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md) : Dans Kintana, rédige une RFC courte qui affecte au moins deux domaines (API, données, exploitation), sollicite une critique et transforme chaque objection en condition d’acceptation. Produis un petit test ou scénario de panne et note l'invariant conservé, l'hypothèse qui change et la limite observée. Cette mission complète le transfert ; elle ne remplace pas le projet évalué du module.

## Références officielles utiles

> **Référence principale vérifiée le 2 novembre 2026 :** la première ressource de ce panneau, également enregistrée dans `source_url`, a été consultée pour le mécanisme versionné traité ici. Les autres liens sont des compléments officiels utiles ; ils ne constituent pas chacun une attestation indépendante de l’exemple du curriculum. Aucune référence ne prouve que l’exemple a été exécuté. Vérifie la version cible et teste dans ton environnement avant un usage réel.

- [OpenTelemetry : Context propagation](https://opentelemetry.io/docs/concepts/context-propagation/)
- [W3C : Trace Context](https://www.w3.org/TR/trace-context/)
