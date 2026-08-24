---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [defaut_cache, changement_echelle]
anti_recipe_key: defaut_cache+changement_echelle
transfer_distance: high
assessment_role: diagnostic_mastery
---

**SCÈNE CRAZYDEVS : mission ouverte :** les contraintes viennent d’augmenter, l’information est incomplète et plusieurs solutions restent plausibles. Ne cherche pas encore la réponse : trouve d’abord ce qui pourrait casser.

> **CrazyDevs : apprenti ninja IA :** l’outil te présente un plan magnifique en 30 secondes. Très bien. Maintenant prouve qu’il n’est ni surdimensionné, ni dangereux, ni coûteux.

# portfolio.md : la sortie unique du curriculum

Temps de lecture ~2 min

> Le CV technique de l'apprenant. Une seule page qui agrège les preuves
> éparpillées dans les 19 mini-projets : pierres travaillées, ADR clés,
> postmortems marquants, auto-évaluation. C'est ce que tu montres à un
> recruteur pressé en 3 minutes.

## Comment le remplir

Après chaque mini-projet terminé, remplis sa ligne : coche la/les pierre(s),
lie l'ADR décisif et le postmortem le plus instructif, note-toi de 0 à 5
(0 = pas fait, 5 = je peux le défendre 6 mois après). Génère la version
finale avec `05-MAITRISE/06-ANNEXES/15-generate_portfolio_report.md`.

## Les six pierres (rappel)

P1 Runtime · P2 Mémoire · P3 Asynchrone · P4 Architecture · P5 Debugging ·
P6 Pensée transférable.

## Tableau de preuves

| #   | Mini-projet                     | Pierres  | ADR clé                                   | Postmortem clé                                                                                  | Auto-éval /5 |
| --- | ------------------------------- | -------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------ |
| 01  | rasengan_engine                 | P1 P4    | `01_rasengan_engine/ADR/`                 | `../../../02-CONSTRUCTION/02-MINI-PROJECTS/01_rasengan_engine/08-POSTMORTEM.md`                 | \_           |
| 02  | garo_no_kronika                 | P3 P5    | `02_garo_no_kronika/ADR/`                 | `../../../02-CONSTRUCTION/02-MINI-PROJECTS/02_garo_no_kronika/08-POSTMORTEM.md`                 | \_           |
| 03  | walking_dead_protocol           | P4 P5    | `03_walking_dead_protocol/ADR/`           | `../../../02-CONSTRUCTION/02-MINI-PROJECTS/03_walking_dead_protocol/08-POSTMORTEM.md`           | \_           |
| 04  | breaking_cache                  | P2 P1    | `04_breaking_cache/ADR/`                  | `../../../02-CONSTRUCTION/02-MINI-PROJECTS/04_breaking_cache/08-POSTMORTEM.md`                  | \_           |
| 05  | prison_break_api                | P4 P3    | `05_prison_break_api/ADR/`                | `../../../02-CONSTRUCTION/02-MINI-PROJECTS/05_prison_break_api/08-POSTMORTEM.md`                | \_           |
| 06  | ultras_dashboard                | P1 P4    | `06_ultras_dashboard/ADR/`                | `../../../02-CONSTRUCTION/02-MINI-PROJECTS/06_ultras_dashboard/08-POSTMORTEM.md`                | \_           |
| 07  | ballon_dor_cli                  | P6 P1    | `07_ballon_dor_cli/ADR/`                  | `../../../02-CONSTRUCTION/02-MINI-PROJECTS/07_ballon_dor_cli/08-POSTMORTEM.md`                  | \_           |
| 08  | trapsoul_radio                  | P3 P2    | `08_trapsoul_radio/ADR/`                  | `../../../02-CONSTRUCTION/02-MINI-PROJECTS/08_trapsoul_radio/08-POSTMORTEM.md`                  | \_           |
| 09  | oracle_glitch                   | P5 P4    | `09_oracle_glitch/ADR/`                   | `../../../02-CONSTRUCTION/02-MINI-PROJECTS/09_oracle_glitch/08-POSTMORTEM.md`                   | \_           |
| 10  | legacy_dungeon                  | P5 P6    | `10_legacy_dungeon/ADR/`                  | `../../../02-CONSTRUCTION/02-MINI-PROJECTS/10_legacy_dungeon/08-POSTMORTEM.md`                  | \_           |
| 11  | scheduler                       | P3 P1    | `11_scheduler/ADR/`                       | `../../../02-CONSTRUCTION/02-MINI-PROJECTS/11_scheduler/08-POSTMORTEM.md`                       | \_           |
| 12  | legacy_takeover                 | P5 P6    | `12_legacy_takeover/ADR/`                 | `../../../02-CONSTRUCTION/02-MINI-PROJECTS/12_legacy_takeover/08-POSTMORTEM.md`                 | \_           |
| 13  | memory_hunter                   | P2 P5    | `13_memory_hunter/ADR/`                   | `../../../02-CONSTRUCTION/02-MINI-PROJECTS/13_memory_hunter/08-POSTMORTEM.md`                   | \_           |
| 14  | system_design_lab               | P4 P3    | `14_system_design_lab/ADR/`               | `../../../02-CONSTRUCTION/02-MINI-PROJECTS/14_system_design_lab/08-POSTMORTEM.md`               | \_           |
| 15  | porte_rasengan_engine_multilang | P6 P4    | `15_porte_rasengan_engine_multilang/ADR/` | `../../../02-CONSTRUCTION/02-MINI-PROJECTS/15_porte_rasengan_engine_multilang/08-POSTMORTEM.md` | \_           |
| 16  | distributed_arena               | P3 P4    | `16_distributed_arena/ADR/`               | `../../../02-CONSTRUCTION/02-MINI-PROJECTS/16_distributed_arena/08-POSTMORTEM.md`               | \_           |
| 17  | polyglot_forge                  | P6 P4    | `17_polyglot_forge/ADR/`                  | `../../../02-CONSTRUCTION/02-MINI-PROJECTS/17_polyglot_forge/08-POSTMORTEM.md`                  | \_           |
| 18  | human_vs_ai_smell               | P5 P6    | `18_human_vs_ai_smell/ADR/`               | `../../../02-CONSTRUCTION/02-MINI-PROJECTS/18_human_vs_ai_smell/08-POSTMORTEM.md`               | \_           |
| 19  | supervise_the_ai                | P4 P5 P6 | `19_supervise_the_ai/ADR/`                | `../../../02-CONSTRUCTION/02-MINI-PROJECTS/19_supervise_the_ai/08-POSTMORTEM.md`                | \_           |

## Les trois preuves non-remplaçables (à savoir raconter par cœur)

1. **Diagnostic causal en prod dégradée** : quel bug, quelle décision-racine,
   comment tu l'as prouvé (voir `01-CADRAGE/03-DEBUGGING/` + `13_memory_hunter/`).
2. **Arbitrage architectural sous contraintes contradictoires** : quel ADR,
   quels trade-offs (voir `14_system_design_lab/` + `05-MAITRISE/06-ANNEXES/13-trade_off_arena.md`).
3. **Portage cross-langage d'un concept** : JS -> Python/Go (voir
   `15_porte_rasengan_engine_multilang/` + `05-MAITRISE/06-ANNEXES/30_transferability/`).

## Score global

Somme des auto-évals / 95. En dessous de 67/95 (70 %), tu n'es pas encore
prêt à publier ce portfolio : cible d'abord les lignes à 0-2.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.
