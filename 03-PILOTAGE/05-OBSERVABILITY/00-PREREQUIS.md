## perishability_id: PER-0045

stability: perissable
acte: évaluer
cognitive_level: L3
perturbation_modes: [decision_inversee, changement_echelle]
anti_recipe_key: decision_inversee+changement_echelle
transfer_distance: medium
assessment_role: instructional_checkpoint
review_due: 2027-12-31

---

> **SCÈNE CRAZYDEVS : finale au stade :** 99,9 % de disponibilité sur un slide ne sauve personne à 03:17 quand le service hurle. La vraie compétence commence quand il faut transformer la métrique en décision.

# 00 : Prereq check : Observability

<!-- AF-DIAGRAM:slo -->

```text
text
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
text
Request ─► Span A ─────► Span B ─────► Span C
             │             │              │
          service A     service B      service C
             └──────── trace-id ──────────┘
```

Une trace relie plusieurs spans pour reconstruire le chemin d’une requête à travers les services.

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

Temps de lecture ~5 min

> Tu ne dois **pas** entrer dans ce module si tu ne peux pas répondre à ces questions
> **sans regarder**. Ce n'est pas un test noté, c'est un filtre anti-illusion.
> Ces questions portent sur `03-PILOTAGE/04-SECURITY`, le module que tu viens de finir.

## Questions

1. XSS vs CSRF : qui exécute quoi, et quelle défense pour chacun ?
2. Pourquoi bcrypt est-il volontairement lent, et à quoi sert le salt ?
3. JWT : ce que la signature garantit, et ce que le payload ne protège pas.
4. Cite deux entrées de la checklist OWASP que tu vérifies avant une mise en production.

## Verdict

- **3+ réponses solides** → tu peux entrer.
- **2 ou moins** → retour à `03-PILOTAGE/04-SECURITY/`, ou à sa synthèse `90-grimoire.md`.

> Se sentir "prêt" ≠ être prêt. Les questions ci-dessus tranchent.

> **Note pour ce module précis** : la différence logs/metrics/traces, ce
> que fait un correlation ID, et la différence SLI/SLO sont le contenu que
> ce module va t'enseigner (notamment `02-structured_logging.md` et
> `03-distributed_tracing.md`) : normal de ne pas encore les maîtriser. Ta
> compréhension est testée en fin de module.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?
