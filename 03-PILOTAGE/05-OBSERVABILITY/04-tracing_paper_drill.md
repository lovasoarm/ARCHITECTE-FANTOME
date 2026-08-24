## perishability_id: PER-0048

stability: perissable
acte: pratiquer
cognitive_level: L3
perturbation_modes: [transmission, decision_inversee]
anti_recipe_key: transmission+decision_inversee
transfer_distance: low
assessment_role: instructional_checkpoint
review_due: 2027-12-31

---

> **SCÈNE CRAZYDEVS : finale au stade :** 99,9 % de disponibilité sur un slide ne sauve personne à 03:17 quand le service hurle. La vraie compétence commence quand il faut transformer la métrique en décision.

# 03 : Distributed tracing (papier d'abord)

<!-- AF-DIAGRAM:observability -->

```text
text
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
text
Request ─► Span A ─────► Span B ─────► Span C
             │             │              │
          service A     service B      service C
             └──────── trace-id ──────────┘
```

Une trace relie plusieurs spans pour reconstruire le chemin d’une requête à travers les services.

Temps de lecture ~5 min

> **Principe universel** : dans un système distribué, un ID de corrélation qui traverse **tous** les services est ce qui te rend capable de raisonner.

## Vocabulaire

- **Trace** : le voyage complet d'une requête à travers N services.
- **Span** : une étape (une fonction, un appel réseau).
- **Correlation ID** : l'identifiant unique attaché à la trace, propagé via headers (`traceparent` W3C).

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
4. Sans le corrélation ID `abc`, qu'est-ce qui devient impossible ?

## (attention) Ce que l'outil cache

Une trace n'explique pas **pourquoi** un span est lent. Elle te dit **où** chercher.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.
