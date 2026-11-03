---
perishability_id: PER-0048

stability: "perissable"
acte: pratiquer
cognitive_level: L3
perturbation_modes: [transmission, decision_inversee]
anti_recipe_key: transmission+decision_inversee
transfer_distance: low
assessment_role: instructional_checkpoint
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_url: "https://opentelemetry.io/docs/concepts/context-propagation/"
source_type: "primary"
review_interval: "6 mois"
review_due: "2027-05-03"
source_scope: "Documentation officielle ou source primaire consultée en rapport avec « 03 : Distributed tracing (papier d'abord) ». La référence soutient le concept/version explicitement indiqué dans cette ressource ; ce statut ne certifie pas chaque phrase, chaque snippet ni l'exécution locale. Les affirmations empiriques et les API versionnées restent limitées au scope ci-dessous."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "OFFICIAL_SOURCE_IDENTITY_AND_CONCEPT_SCOPE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

> **SCÈNE CRAZYDEVS : finale au stade :** 99,9 % de disponibilité sur un slide ne sauve personne à 03:17 quand le service hurle. La vraie compétence commence quand il faut transformer la métrique en décision.

# 03 : Distributed tracing (papier d'abord)

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

<!-- AF-DIAGRAM:tracing -->

```text
Request ─► Span A ─────► Span B ─────► Span C
             │             │              │
          service A     service B      service C
             └──────── trace-id ──────────┘
```

Une trace relie plusieurs spans pour reconstruire le chemin d’une requête à travers les services.

Temps de lecture ~5 min

> **Principe de diagnostic :** une trace distribuée repose sur un contexte de trace propagé selon les conventions retenues. Un identifiant applicatif (`request_id`, `order_id`) peut compléter les logs et aider à retrouver un dossier métier ; il n'est ni obligatoire dans chaque système ni interchangeable avec `trace-id`. Certaines frontières de service ou bibliothèques peuvent ne pas propager le contexte : signale ces ruptures au lieu d'inventer une causalité.

## Vocabulaire

- **Trace** : le voyage complet d'une requête à travers N services.
- **Span** : une étape (une fonction, un appel réseau).
- **Correlation ID applicatif** : identifiant métier ou de requête choisi par l’application (par exemple `request_id`). Il peut être ajouté aux logs et propagé dans des en-têtes applicatifs, mais ce n’est pas automatiquement un identifiant de trace.
- **Contexte de trace** : contexte standardisé qui porte notamment le `trace-id` et le `parent-id` dans l’en-tête W3C `traceparent`. OpenTelemetry peut le propager entre services. Les deux identifiants peuvent coexister et être associés dans les logs ; ne les confonds pas.

## Exercice papier

On te fournit ces logs bruts :

```json
[svc-A] 12:00:00.100 req=abc GET /patrol/42 -> 12:00:00.230 200
[svc-B] 12:00:00.130 req=abc SELECT patrols -> 12:00:00.180
[svc-B] 12:00:00.185 req=abc SELECT scouts -> 12:00:00.220
[svc-C] 12:00:00.140 req=abc radio.check -> 12:00:00.215
```

1. Dessine la trace en cascade (Gantt).
2. Où est le **chemin critique** ?
3. Une optimisation potentielle : laquelle, et quel gain ?
4. Sans le `request_id` applicatif `abc`, quelles informations métier deviennent plus difficiles à retrouver dans ces logs ? La trace distribuée peut-elle néanmoins être reconstruite si le contexte W3C `traceparent` est propagé ?

## (attention) Ce que l'outil cache

Une trace n'explique pas **pourquoi** un span est lent. Elle te dit **où** chercher.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.

## Références officielles utiles

> **Référence principale vérifiée le 2 novembre 2026 :** la première ressource de ce panneau, également enregistrée dans `source_url`, a été consultée pour le mécanisme versionné traité ici. Les autres liens sont des compléments officiels utiles ; ils ne constituent pas chacun une attestation indépendante de l’exemple du curriculum. Aucune référence ne prouve que l’exemple a été exécuté. Vérifie la version cible et teste dans ton environnement avant un usage réel.

- [OpenTelemetry : Context propagation](https://opentelemetry.io/docs/concepts/context-propagation/)
- [W3C : Trace Context](https://www.w3.org/TR/trace-context/)
