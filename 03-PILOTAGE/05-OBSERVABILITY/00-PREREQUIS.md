---

stability: "intemporel"
acte: évaluer
cognitive_level: L3
perturbation_modes: [decision_inversee, changement_echelle]
anti_recipe_key: decision_inversee+changement_echelle
transfer_distance: medium
assessment_role: instructional_checkpoint
source_verified_on: null
freshness_status: "not_verified"
source_url: null
source_type: "internal"
canonical_resource: "03-PILOTAGE/05-OBSERVABILITY/README.md"
source_scope: "Référence interne du module Observability pour le contrôle des prérequis SLI/SLO/error budget."
provenance_note: "Référence interne explicitement reliée au sujet ; elle ancre le parcours mais ne constitue pas une preuve externe. Aucun contenu n’est déclaré revérifié par cette mise à jour."
---
> **SCÈNE CRAZYDEVS : finale au stade :** 99,9 % de disponibilité sur un slide ne sauve personne à 03:17 quand le service hurle. La vraie compétence commence quand il faut transformer la métrique en décision.

# 00 : Prereq check : Observability

<!-- AF-DIAGRAM:slo -->

```text
SLO
 │
 ├──► SLI mesuré ───► conformité
 │
 └──► Error Budget ─► capacité à prendre du risque
                         │
                         ▼
                  freeze / release / invest
```

Le SLO définit la cible, le SLI mesure le service et l’error budget relie fiabilité et cadence de changement.

<!-- AF-DIAGRAM:tracing -->

```text
Request ─► Span A ─────► Span B ─────► Span C
             │             │              │
          service A     service B      service C
             └──────── trace-id ──────────┘
```

Une trace relie plusieurs spans pour reconstruire le chemin d’une requête à travers les services.

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

Temps de lecture ~5 min

> Avant de commencer ce module, essaie de répondre à ces questions **sans regarder**.
> Ce diagnostic n’est pas noté : il sert à repérer les bases déjà acquises et les notions à revoir, pas à te fermer l’accès.
> Ces questions vérifient les notions nécessaires pour observer un système. Le module précédent sur la sécurité est utile, mais connaître bcrypt ou JWT n’est pas une condition pour apprendre les logs, métriques et traces.

## Questions

1. Dans une réponse HTTP, comment distinguer un succès d’une erreur à partir du statut ?
2. Quelle différence fais-tu entre un événement (un fait ponctuel) et une mesure répétée dans le temps ?
3. Pourquoi associer un identifiant de corrélation à plusieurs logs d’une même requête ?
4. Qu’est-ce que la latence d’une requête, et dans quelle unité peux-tu la mesurer ?

**Repères à revoir :** [bases du Web](../../00-SOCLE/04-FUNDAMENTALS/05_web_basics/README.md), [gestion des erreurs](../../01-CADRAGE/04-ERROR-HANDLING/) et [bases des métriques](./05-metrics_alerting.md). La différence logs/métriques/traces et SLI/SLO sera enseignée dans ce module : elle n’est pas un prérequis.

## Verdict

- **3+ réponses solides** → commence le module et garde les points hésitants comme objectifs de révision.
- **2 ou moins** → retour aux seuls sujets à revoir indiqués juste au-dessus : bases du Web, gestion des erreurs ou bases des métriques (selon la question). La sécurité applicative n’est pas un prérequis de cette porte d’entrée.

> Le but n’est pas de te bloquer : ce diagnostic t’aide à choisir une révision utile.

> **Note pour ce module précis** : la différence logs/metrics/traces, ce
> que fait un correlation ID, et la différence SLI/SLO sont le contenu que
> ce module va t'enseigner (notamment `02-structured_logging.md` et
> `03-distributed_tracing.md`) : normal de ne pas encore les maîtriser. Ta
> compréhension est testée en fin de module.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?
