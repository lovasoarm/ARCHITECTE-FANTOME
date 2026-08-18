---
stability: intemporel
last_reviewed: 2026-08
acte: appliquer
---
# PEREMPTION-2027 : ce qu'il faudra rouvrir, et avec quelle source

Ce depot enseigne a dater ses decisions
([05-MAITRISE/08_maitrise_staff_engineer/05_revisite_datee.md](../05-MAITRISE/08_maitrise_staff_engineer/05_revisite_datee.md)).
Il se l'applique ici.

- Contenu releve le **2026-08-14**.
- Objectif assume : ne plus toucher ARCHITECTE-FANTOME jusqu'en 2028. Tenable a une condition :
  que la liste de ce qui perime soit ecrite d'avance, pas decouverte a l'usage.
- 175 fichiers portent `stability: perissable_*`. Ils sont listes ci-dessous, groupes par nature,
  avec la question exacte a reposer et la source a reverifier.

## Comment se sert de cette liste, en 2027

1. Nature par nature, repose la question. Ne relis pas le fichier d'abord : la question suffit.
2. Reponse identique aux chiffres du fichier : mets a jour `last_reviewed`, rien d'autre.
3. Reponse differente : corrige le chiffre **et** sa date, jamais le chiffre seul.
4. La source a disparu : supprime le passage. Un chiffre sans source verifiable ne se rafraichit
   pas, il se retire.
5. Un fichier entier devenu faux se remplace ; le module qui l'appelle, lui, ne bouge pas. C'est
   exactement pourquoi les cartes perissables vivent en annexes.

## Ce qui n'est PAS dans cette liste

Les mecanismes : boucle d'evenements, coherence, invariants, arbitrages, methode de mesure. Ils ne
perissent pas et ne se re-sourcent pas. Si un fichier de mecanisme apparait ici, c'est que du fait
date s'y est glisse : c'est ce fait qu'il faut en sortir.

## Prix cloud et chiffrages (12 fichiers)

**Question a reposer** : Les prix affiches tiennent-ils encore, a la meme region et au meme engagement ?

**Source a reverifier** : Page tarifaire publique de chaque fournisseur cite, relevee le meme jour, URL et date notees ligne par ligne.

| Fichier | Marqueur |
| --- | --- |
| [03-PILOTAGE/07_cloud_foundations/00_why_cloud_foundations.md](../03-PILOTAGE/07_cloud_foundations/00_why_cloud_foundations.md) | `perissable_2027` |
| [03-PILOTAGE/07_cloud_foundations/02_modeles_cout.md](../03-PILOTAGE/07_cloud_foundations/02_modeles_cout.md) | `perissable_2027` |
| [03-PILOTAGE/07_cloud_foundations/04_rayon_impact_zones.md](../03-PILOTAGE/07_cloud_foundations/04_rayon_impact_zones.md) | `perissable_2027` |
| [03-PILOTAGE/07_cloud_foundations/05_choisir_fournisseur.md](../03-PILOTAGE/07_cloud_foundations/05_choisir_fournisseur.md) | `perissable_2027` |
| [03-PILOTAGE/07_cloud_foundations/06_portage_multicloud.md](../03-PILOTAGE/07_cloud_foundations/06_portage_multicloud.md) | `perissable_2027` |
| [03-PILOTAGE/07_cloud_foundations/07_releve_tarifaire_reel.md](../03-PILOTAGE/07_cloud_foundations/07_releve_tarifaire_reel.md) | `perissable_2027` |
| [03-PILOTAGE/07_cloud_foundations/BUDGET-CLOUD.md](../03-PILOTAGE/07_cloud_foundations/BUDGET-CLOUD.md) | `perissable_2027` |
| [03-PILOTAGE/07_cloud_foundations/README.md](../03-PILOTAGE/07_cloud_foundations/README.md) | `perissable_2027` |
| [03-PILOTAGE/07_cloud_foundations/boss-fight.md](../03-PILOTAGE/07_cloud_foundations/boss-fight.md) | `perissable_2027` |
| [03-PILOTAGE/07_cloud_foundations/challenge.md](../03-PILOTAGE/07_cloud_foundations/challenge.md) | `perissable_2027` |
| [PREUVES-MODELES/S1-BUDGET-CLOUD.md](../PREUVES-MODELES/S1-BUDGET-CLOUD.md) | `perissable_2027` |
| [PREUVES-MODELES/S7-PORTAGE.md](../PREUVES-MODELES/S7-PORTAGE.md) | `perissable_2027` |

## Cartes TECH-ILA (noms d'outils du marche) (9 fichiers)

**Question a reposer** : Ces outils sont-ils encore ceux qu'une equipe choisirait aujourd'hui, et lesquels ont disparu ou fusionne ?

**Source a reverifier** : Offres d'emploi reelles du trimestre et depots officiels des outils cites : un outil sans release depuis 12 mois sort de la carte.

| Fichier | Marqueur |
| --- | --- |
| [06-ANNEXES-TRANSVERSES/TECH-ILA/00_why_tech_ila.md](./03-TECH-ILA/00_why_tech_ila.md) | `perissable_2028` |
| [06-ANNEXES-TRANSVERSES/TECH-ILA/tech-ila/01-niveau-1-socle.md](./03-TECH-ILA/tech-ila/01-niveau-1-socle.md) | `perissable_2027` |
| [06-ANNEXES-TRANSVERSES/TECH-ILA/tech-ila/02-niveau-2-frontend.md](./03-TECH-ILA/tech-ila/02-niveau-2-frontend.md) | `perissable_2027` |
| [06-ANNEXES-TRANSVERSES/TECH-ILA/tech-ila/03-niveau-3-backend.md](./03-TECH-ILA/tech-ila/03-niveau-3-backend.md) | `perissable_2027` |
| [06-ANNEXES-TRANSVERSES/TECH-ILA/tech-ila/04-niveau-4-systemes.md](./03-TECH-ILA/tech-ila/04-niveau-4-systemes.md) | `perissable_2027` |
| [06-ANNEXES-TRANSVERSES/TECH-ILA/tech-ila/05-niveau-5-transfert.md](./03-TECH-ILA/tech-ila/05-niveau-5-transfert.md) | `perissable_2027` |
| [06-ANNEXES-TRANSVERSES/TECH-ILA/tech-ila/06-niveau-6-ia.md](./03-TECH-ILA/tech-ila/06-niveau-6-ia.md) | `perissable_2027` |
| [06-ANNEXES-TRANSVERSES/TECH-ILA/tech-ila/08-ia-exercices-marche-audit.md](./03-TECH-ILA/tech-ila/08-ia-exercices-marche-audit.md) | `perissable_2027` |
| [06-ANNEXES-TRANSVERSES/TECH-ILA/tech-ila/09-mode-urgence.md](./03-TECH-ILA/tech-ila/09-mode-urgence.md) | `perissable_2027` |

## Versions de runtime, d'outillage et de dependances (21 fichiers)

**Question a reposer** : Les versions citees sont-elles encore supportees, et la commande d'installation fonctionne-t-elle telle quelle ?

**Source a reverifier** : Calendrier de support officiel du runtime et de l'outillage ; rejouer l'installation sur une machine neuve.

| Fichier | Marqueur |
| --- | --- |
| [02-CONSTRUCTION/03_testing/08_e2e_playwright_beast.md](../02-CONSTRUCTION/03_testing/08_e2e_playwright_beast.md) | `perissable_2028` |
| [02-CONSTRUCTION/12_typescript/00_prereq_check.md](../02-CONSTRUCTION/12_typescript/00_prereq_check.md) | `perissable_2027` |
| [02-CONSTRUCTION/12_typescript/01_ts_basics/01_types_and_interfaces.md](../02-CONSTRUCTION/12_typescript/01_ts_basics/01_types_and_interfaces.md) | `perissable_2027` |
| [02-CONSTRUCTION/12_typescript/01_ts_basics/02_functions_typed.md](../02-CONSTRUCTION/12_typescript/01_ts_basics/02_functions_typed.md) | `perissable_2027` |
| [02-CONSTRUCTION/12_typescript/01_ts_basics/03_classes_typed.md](../02-CONSTRUCTION/12_typescript/01_ts_basics/03_classes_typed.md) | `perissable_2027` |
| [02-CONSTRUCTION/12_typescript/02_ts_intermediate/01_generics.md](../02-CONSTRUCTION/12_typescript/02_ts_intermediate/01_generics.md) | `perissable_2027` |
| [02-CONSTRUCTION/12_typescript/02_ts_intermediate/02_utility_types.md](../02-CONSTRUCTION/12_typescript/02_ts_intermediate/02_utility_types.md) | `perissable_2027` |
| [02-CONSTRUCTION/12_typescript/02_ts_intermediate/03_union_intersection.md](../02-CONSTRUCTION/12_typescript/02_ts_intermediate/03_union_intersection.md) | `perissable_2027` |
| [02-CONSTRUCTION/12_typescript/02_ts_intermediate/04_type_guards.md](../02-CONSTRUCTION/12_typescript/02_ts_intermediate/04_type_guards.md) | `perissable_2027` |
| [02-CONSTRUCTION/12_typescript/03_ts_advanced/01_conditional_types.md](../02-CONSTRUCTION/12_typescript/03_ts_advanced/01_conditional_types.md) | `perissable_2027` |
| [02-CONSTRUCTION/12_typescript/03_ts_advanced/02_mapped_types.md](../02-CONSTRUCTION/12_typescript/03_ts_advanced/02_mapped_types.md) | `perissable_2027` |
| [02-CONSTRUCTION/12_typescript/03_ts_advanced/03_ts_in_real_project.md](../02-CONSTRUCTION/12_typescript/03_ts_advanced/03_ts_in_real_project.md) | `perissable_2027` |
| [02-CONSTRUCTION/12_typescript/04_typescript_grimoire.md](../02-CONSTRUCTION/12_typescript/04_typescript_grimoire.md) | `perissable_2027` |
| [02-CONSTRUCTION/12_typescript/04_typescript_tooling/01_declaration_files.md](../02-CONSTRUCTION/12_typescript/04_typescript_tooling/01_declaration_files.md) | `perissable_2027` |
| [02-CONSTRUCTION/12_typescript/04_typescript_tooling/02_ts_compiler_config.md](../02-CONSTRUCTION/12_typescript/04_typescript_tooling/02_ts_compiler_config.md) | `perissable_2027` |
| [02-CONSTRUCTION/12_typescript/04_typescript_tooling/03_ts_migration_guide.md](../02-CONSTRUCTION/12_typescript/04_typescript_tooling/03_ts_migration_guide.md) | `perissable_2027` |
| [02-CONSTRUCTION/12_typescript/04_typescript_tooling/04_ts_advanced_grimoire.md](../02-CONSTRUCTION/12_typescript/04_typescript_tooling/04_ts_advanced_grimoire.md) | `perissable_2027` |
| [02-CONSTRUCTION/12_typescript/05_EXO_LECTURE.md](../02-CONSTRUCTION/12_typescript/05_EXO_LECTURE.md) | `perissable_2027` |
| [02-CONSTRUCTION/12_typescript/99_PONT_avant_02-CONSTRUCTION-13_runtime_env.md](../02-CONSTRUCTION/12_typescript/99_PONT_avant_02-CONSTRUCTION-13_runtime_env.md) | `perissable_2027` |
| [02-CONSTRUCTION/13_runtime_env/06_node_cli_scripts/04_cli_tool_builder.md](../02-CONSTRUCTION/13_runtime_env/06_node_cli_scripts/04_cli_tool_builder.md) | `perissable_2027` |
| [99-COULISSES/outillage/README.md](../99-COULISSES/outillage/README.md) | `perissable_2028` |

## Briques IA, modeles et couts associes (36 fichiers)

**Question a reposer** : Les modeles, passerelles et ordres de grandeur de cout cites existent-ils encore sous ce nom et a ce prix ?

**Source a reverifier** : Pages de tarification et de cycle de vie des modeles des fournisseurs cites.

| Fichier | Marqueur |
| --- | --- |
| [02-CONSTRUCTION/02_mini_projects/18_human_vs_ai_smell/README.md](../02-CONSTRUCTION/02_mini_projects/18_human_vs_ai_smell/README.md) | `perissable_2027` |
| [02-CONSTRUCTION/02_mini_projects/18_human_vs_ai_smell/cahierdescharges.md](../02-CONSTRUCTION/02_mini_projects/18_human_vs_ai_smell/cahierdescharges.md) | `perissable_2027` |
| [04-EPREUVE/04_ai_native_dev/00_prereq_check.md](../04-EPREUVE/04_ai_native_dev/00_prereq_check.md) | `perissable_2028` |
| [04-EPREUVE/04_ai_native_dev/00_why_ai_native_dev.md](../04-EPREUVE/04_ai_native_dev/00_why_ai_native_dev.md) | `perissable_2028` |
| [04-EPREUVE/04_ai_native_dev/01_ai_workflow.md](../04-EPREUVE/04_ai_native_dev/01_ai_workflow.md) | `perissable_2028` |
| [04-EPREUVE/04_ai_native_dev/02_prompt_engineering.md](../04-EPREUVE/04_ai_native_dev/02_prompt_engineering.md) | `perissable_2028` |
| [04-EPREUVE/04_ai_native_dev/03_validate_ai_output.md](../04-EPREUVE/04_ai_native_dev/03_validate_ai_output.md) | `perissable_2028` |
| [04-EPREUVE/04_ai_native_dev/04_ai_refactor_partner.md](../04-EPREUVE/04_ai_native_dev/04_ai_refactor_partner.md) | `perissable_2028` |
| [04-EPREUVE/04_ai_native_dev/05_ai_test_generator.md](../04-EPREUVE/04_ai_native_dev/05_ai_test_generator.md) | `perissable_2028` |
| [04-EPREUVE/04_ai_native_dev/06_partition_drill.md](../04-EPREUVE/04_ai_native_dev/06_partition_drill.md) | `perissable_2028` |
| [04-EPREUVE/04_ai_native_dev/07_faux_positifs_ia.md](../04-EPREUVE/04_ai_native_dev/07_faux_positifs_ia.md) | `perissable_2028` |
| [04-EPREUVE/04_ai_native_dev/07b_solo_vs_copilot_drill.md](../04-EPREUVE/04_ai_native_dev/07b_solo_vs_copilot_drill.md) | `perissable_2028` |
| [04-EPREUVE/04_ai_native_dev/08_ai_code_review_arena.md](../04-EPREUVE/04_ai_native_dev/08_ai_code_review_arena.md) | `perissable_2028` |
| [04-EPREUVE/04_ai_native_dev/08_prompt_safety.md](../04-EPREUVE/04_ai_native_dev/08_prompt_safety.md) | `perissable_2028` |
| [04-EPREUVE/04_ai_native_dev/09_ai_hallucination_gym.md](../04-EPREUVE/04_ai_native_dev/09_ai_hallucination_gym.md) | `perissable_2028` |
| [04-EPREUVE/04_ai_native_dev/10_ambiguous_ai_response.md](../04-EPREUVE/04_ai_native_dev/10_ambiguous_ai_response.md) | `perissable_2028` |
| [04-EPREUVE/04_ai_native_dev/11_lire_humain_vs_lire_ia.md](../04-EPREUVE/04_ai_native_dev/11_lire_humain_vs_lire_ia.md) | `perissable_2028` |
| [04-EPREUVE/04_ai_native_dev/12_ai_grimoire.md](../04-EPREUVE/04_ai_native_dev/12_ai_grimoire.md) | `perissable_2028` |
| [04-EPREUVE/04_ai_native_dev/13_EXO_LECTURE.md](../04-EPREUVE/04_ai_native_dev/13_EXO_LECTURE.md) | `perissable_2028` |
| [04-EPREUVE/04_ai_native_dev/90_ia_dans_le_livrable_staff.md](../04-EPREUVE/04_ai_native_dev/90_ia_dans_le_livrable_staff.md) | `perissable_2027` |
| [05-MAITRISE/04_ai_agents_and_autonomy/00_bridge_exo.md](../05-MAITRISE/04_ai_agents_and_autonomy/00_bridge_exo.md) | `perissable_2028` |
| [05-MAITRISE/04_ai_agents_and_autonomy/00_prereq_check.md](../05-MAITRISE/04_ai_agents_and_autonomy/00_prereq_check.md) | `perissable_2028` |
| [05-MAITRISE/04_ai_agents_and_autonomy/00_why_ai_agents.md](../05-MAITRISE/04_ai_agents_and_autonomy/00_why_ai_agents.md) | `perissable_2028` |
| [05-MAITRISE/04_ai_agents_and_autonomy/01_agents_vs_copilots.md](../05-MAITRISE/04_ai_agents_and_autonomy/01_agents_vs_copilots.md) | `perissable_2028` |
| [05-MAITRISE/04_ai_agents_and_autonomy/02_verifiable_specifications.md](../05-MAITRISE/04_ai_agents_and_autonomy/02_verifiable_specifications.md) | `perissable_2028` |
| [05-MAITRISE/04_ai_agents_and_autonomy/03_reading_agent_traces.md](../05-MAITRISE/04_ai_agents_and_autonomy/03_reading_agent_traces.md) | `perissable_2028` |
| [05-MAITRISE/04_ai_agents_and_autonomy/04_refusing_a_trace.md](../05-MAITRISE/04_ai_agents_and_autonomy/04_refusing_a_trace.md) | `perissable_2028` |
| [05-MAITRISE/04_ai_agents_and_autonomy/05_agent_sandbox_hygiene.md](../05-MAITRISE/04_ai_agents_and_autonomy/05_agent_sandbox_hygiene.md) | `perissable_2028` |
| [05-MAITRISE/04_ai_agents_and_autonomy/06_agents_grimoire.md](../05-MAITRISE/04_ai_agents_and_autonomy/06_agents_grimoire.md) | `perissable_2028` |
| [05-MAITRISE/04_ai_agents_and_autonomy/07_agent_hallucination_gym.md](../05-MAITRISE/04_ai_agents_and_autonomy/07_agent_hallucination_gym.md) | `perissable_2028` |
| [05-MAITRISE/04_ai_agents_and_autonomy/08_traces_pool/00_trace_A.md](../05-MAITRISE/04_ai_agents_and_autonomy/08_traces_pool/00_trace_A.md) | `perissable_2028` |
| [05-MAITRISE/04_ai_agents_and_autonomy/08_traces_pool/01_trace_B.md](../05-MAITRISE/04_ai_agents_and_autonomy/08_traces_pool/01_trace_B.md) | `perissable_2028` |
| [05-MAITRISE/04_ai_agents_and_autonomy/08_traces_pool/02_trace_C.md](../05-MAITRISE/04_ai_agents_and_autonomy/08_traces_pool/02_trace_C.md) | `perissable_2028` |
| [05-MAITRISE/04_ai_agents_and_autonomy/09_EXO_LECTURE.md](../05-MAITRISE/04_ai_agents_and_autonomy/09_EXO_LECTURE.md) | `perissable_2028` |
| [05-MAITRISE/04_ai_agents_and_autonomy/11_EXO_PARTITION_HUMAIN_IA.md](../05-MAITRISE/04_ai_agents_and_autonomy/11_EXO_PARTITION_HUMAIN_IA.md) | `perissable_2028` |
| [PREUVES-MODELES/S6-IA-EN-PROD.md](../PREUVES-MODELES/S6-IA-EN-PROD.md) | `perissable_2027` |

## Autres elements perissables (97 fichiers)

**Question a reposer** : Qu'est-ce qui, dans ce fichier, depend d'un fait exterieur date plutot que d'un mecanisme ?

**Source a reverifier** : La source citee dans le fichier lui-meme ; si aucune source n'est citee, le passage est a supprimer, pas a rafraichir.

| Fichier | Marqueur |
| --- | --- |
| [00-SOCLE/04_fundamentals/04_types/03_type_transformers.md](../00-SOCLE/04_fundamentals/04_types/03_type_transformers.md) | `perissable_2027` |
| [00-SOCLE/04_fundamentals/07_regex/02_regex_combat.md](../00-SOCLE/04_fundamentals/07_regex/02_regex_combat.md) | `perissable_2027` |
| [00-SOCLE/04_fundamentals/07_regex/03_regex_extractor.md](../00-SOCLE/04_fundamentals/07_regex/03_regex_extractor.md) | `perissable_2027` |
| [00-SOCLE/04_fundamentals/07_regex/04_regex_grimoire.md](../00-SOCLE/04_fundamentals/07_regex/04_regex_grimoire.md) | `perissable_2027` |
| [00-SOCLE/06-MINDSET/02-thinking-in-systems.md](../00-SOCLE/06-MINDSET/02-thinking-in-systems.md) | `perissable_2027` |
| [00-SOCLE/06-MINDSET/03-cost-of-decisions.md](../00-SOCLE/06-MINDSET/03-cost-of-decisions.md) | `perissable_2027` |
| [00-SOCLE/06-MINDSET/grimoire.md](../00-SOCLE/06-MINDSET/grimoire.md) | `perissable_2027` |
| [01-CADRAGE/01-PROBLEM-HUNT/02-find-the-real-need.md](../01-CADRAGE/01-PROBLEM-HUNT/02-find-the-real-need.md) | `perissable_2027` |
| [01-CADRAGE/03_debugging/01_read_stack_trace.md](../01-CADRAGE/03_debugging/01_read_stack_trace.md) | `perissable_2027` |
| [01-CADRAGE/03_debugging/03_devtools_debugger.md](../01-CADRAGE/03_debugging/03_devtools_debugger.md) | `perissable_2027` |
| [02-CONSTRUCTION/02_mini_projects/03_walking_dead_protocol/README.md](../02-CONSTRUCTION/02_mini_projects/03_walking_dead_protocol/README.md) | `perissable_2027` |
| [02-CONSTRUCTION/02_mini_projects/03_walking_dead_protocol/cahierdescharges.md](../02-CONSTRUCTION/02_mini_projects/03_walking_dead_protocol/cahierdescharges.md) | `perissable_2027` |
| [02-CONSTRUCTION/02_mini_projects/05_prison_break_api/TDD_JOURNAL.md](../02-CONSTRUCTION/02_mini_projects/05_prison_break_api/TDD_JOURNAL.md) | `perissable_2027` |
| [02-CONSTRUCTION/02_mini_projects/05_prison_break_api/cahierdescharges.md](../02-CONSTRUCTION/02_mini_projects/05_prison_break_api/cahierdescharges.md) | `perissable_2027` |
| [02-CONSTRUCTION/02_mini_projects/06_ultras_dashboard/cahierdescharges.md](../02-CONSTRUCTION/02_mini_projects/06_ultras_dashboard/cahierdescharges.md) | `perissable_2027` |
| [02-CONSTRUCTION/02_mini_projects/08_trapsoul_radio/README.md](../02-CONSTRUCTION/02_mini_projects/08_trapsoul_radio/README.md) | `perissable_2027` |
| [02-CONSTRUCTION/04_math_basics/03_bit_manipulation.md](../02-CONSTRUCTION/04_math_basics/03_bit_manipulation.md) | `perissable_2027` |
| [02-CONSTRUCTION/04_math_basics/04_hashing_basics.md](../02-CONSTRUCTION/04_math_basics/04_hashing_basics.md) | `perissable_2027` |
| [02-CONSTRUCTION/05_memory_performance/01_gc/05_heap_snapshot_hands_on.md](../02-CONSTRUCTION/05_memory_performance/01_gc/05_heap_snapshot_hands_on.md) | `perissable_2027` |
| [02-CONSTRUCTION/05_memory_performance/01_gc/08_fixtures/README.md](../02-CONSTRUCTION/05_memory_performance/01_gc/08_fixtures/README.md) | `perissable_2027` |
| [02-CONSTRUCTION/05_memory_performance/04_profiling/04_node_cpu_profiling.md](../02-CONSTRUCTION/05_memory_performance/04_profiling/04_node_cpu_profiling.md) | `perissable_2027` |
| [02-CONSTRUCTION/05_memory_performance/09_expliquer_a_3_publics_gc.md](../02-CONSTRUCTION/05_memory_performance/09_expliquer_a_3_publics_gc.md) | `perissable_2027` |
| [02-CONSTRUCTION/07_algorithms/03_dynamic_programming/02_dp_classics.md](../02-CONSTRUCTION/07_algorithms/03_dynamic_programming/02_dp_classics.md) | `perissable_2027` |
| [02-CONSTRUCTION/08-DATA-SPELLS/01-why-this-level.md](../02-CONSTRUCTION/08-DATA-SPELLS/01-why-this-level.md) | `perissable_2027` |
| [02-CONSTRUCTION/14_architecture_patterns/07_architecture_grimoire.md](../02-CONSTRUCTION/14_architecture_patterns/07_architecture_grimoire.md) | `perissable_2027` |
| [02-CONSTRUCTION/15-ARCHI-LAB/01-why-this-level.md](../02-CONSTRUCTION/15-ARCHI-LAB/01-why-this-level.md) | `perissable_2027` |
| [02-CONSTRUCTION/18_web_concepts/08_web_concepts_grimoire.md](../02-CONSTRUCTION/18_web_concepts/08_web_concepts_grimoire.md) | `perissable_2027` |
| [02-CONSTRUCTION/19_api_craft/04_auth_jwt.md](../02-CONSTRUCTION/19_api_craft/04_auth_jwt.md) | `perissable_2027` |
| [02-CONSTRUCTION/19_api_craft/07_openapi_swagger.md](../02-CONSTRUCTION/19_api_craft/07_openapi_swagger.md) | `perissable_2027` |
| [02-CONSTRUCTION/19_api_craft/08_api_grimoire.md](../02-CONSTRUCTION/19_api_craft/08_api_grimoire.md) | `perissable_2027` |
| [02-CONSTRUCTION/20-API-DOJO/grimoire.md](../02-CONSTRUCTION/20-API-DOJO/grimoire.md) | `perissable_2027` |
| [03-PILOTAGE/02_web_inclusive/08_i18n/03_number_formats.md](../03-PILOTAGE/02_web_inclusive/08_i18n/03_number_formats.md) | `perissable_2027` |
| [03-PILOTAGE/03-QUALITY-SHIELD/03-observability.md](../03-PILOTAGE/03-QUALITY-SHIELD/03-observability.md) | `perissable_2027` |
| [03-PILOTAGE/03-QUALITY-SHIELD/05-incidents-and-postmortem.md](../03-PILOTAGE/03-QUALITY-SHIELD/05-incidents-and-postmortem.md) | `perissable_2027` |
| [03-PILOTAGE/03-QUALITY-SHIELD/grimoire.md](../03-PILOTAGE/03-QUALITY-SHIELD/grimoire.md) | `perissable_2027` |
| [03-PILOTAGE/04_security/02_csrf_cors.md](../03-PILOTAGE/04_security/02_csrf_cors.md) | `perissable_2027` |
| [03-PILOTAGE/04_security/05_hashing_bcrypt.md](../03-PILOTAGE/04_security/05_hashing_bcrypt.md) | `perissable_2027` |
| [03-PILOTAGE/04_security/06_owasp_checklist.md](../03-PILOTAGE/04_security/06_owasp_checklist.md) | `perissable_2027` |
| [03-PILOTAGE/05_observability/00_prereq_check.md](../03-PILOTAGE/05_observability/00_prereq_check.md) | `perissable_2027` |
| [03-PILOTAGE/05_observability/01_structured_logging.md](../03-PILOTAGE/05_observability/01_structured_logging.md) | `perissable_2027` |
| [03-PILOTAGE/05_observability/02_distributed_tracing.md](../03-PILOTAGE/05_observability/02_distributed_tracing.md) | `perissable_2027` |
| [03-PILOTAGE/05_observability/03_tracing_paper_drill.md](../03-PILOTAGE/05_observability/03_tracing_paper_drill.md) | `perissable_2027` |
| [03-PILOTAGE/05_observability/04_metrics_alerting.md](../03-PILOTAGE/05_observability/04_metrics_alerting.md) | `perissable_2027` |
| [03-PILOTAGE/05_observability/05_sentry_in_prod.md](../03-PILOTAGE/05_observability/05_sentry_in_prod.md) | `perissable_2027` |
| [03-PILOTAGE/05_observability/06_debug_in_prod.md](../03-PILOTAGE/05_observability/06_debug_in_prod.md) | `perissable_2027` |
| [03-PILOTAGE/05_observability/07_prod_stack_trace_drill.md](../03-PILOTAGE/05_observability/07_prod_stack_trace_drill.md) | `perissable_2027` |
| [03-PILOTAGE/05_observability/08_oncall_drill.md](../03-PILOTAGE/05_observability/08_oncall_drill.md) | `perissable_2027` |
| [03-PILOTAGE/05_observability/09_instrumenter_ton_projet.md](../03-PILOTAGE/05_observability/09_instrumenter_ton_projet.md) | `perissable_2027` |
| [03-PILOTAGE/05_observability/09b_observability_grimoire.md](../03-PILOTAGE/05_observability/09b_observability_grimoire.md) | `perissable_2027` |
| [03-PILOTAGE/05_observability/10_EXO_LECTURE.md](../03-PILOTAGE/05_observability/10_EXO_LECTURE.md) | `perissable_2027` |
| [03-PILOTAGE/05_observability/99_PONT_avant_03-PILOTAGE-10_team_craft.md](../03-PILOTAGE/05_observability/99_PONT_avant_03-PILOTAGE-10_team_craft.md) | `perissable_2027` |
| [03-PILOTAGE/08_produit_cout_roi/02_grille_cout_risque_valeur.md](../03-PILOTAGE/08_produit_cout_roi/02_grille_cout_risque_valeur.md) | `perissable_2027` |
| [03-PILOTAGE/08_produit_cout_roi/03_roi_refactoring_point_mort.md](../03-PILOTAGE/08_produit_cout_roi/03_roi_refactoring_point_mort.md) | `perissable_2027` |
| [03-PILOTAGE/08_produit_cout_roi/04_dette_technique_declaree.md](../03-PILOTAGE/08_produit_cout_roi/04_dette_technique_declaree.md) | `perissable_2027` |
| [03-PILOTAGE/08_produit_cout_roi/06_refus_chiffre_direction_financiere.md](../03-PILOTAGE/08_produit_cout_roi/06_refus_chiffre_direction_financiere.md) | `perissable_2027` |
| [03-PILOTAGE/08_produit_cout_roi/boss-fight.md](../03-PILOTAGE/08_produit_cout_roi/boss-fight.md) | `perissable_2027` |
| [03-PILOTAGE/08_produit_cout_roi/grimoire.md](../03-PILOTAGE/08_produit_cout_roi/grimoire.md) | `perissable_2027` |
| [03-PILOTAGE/09-TEAM-QUEST/03-git-and-flow.md](../03-PILOTAGE/09-TEAM-QUEST/03-git-and-flow.md) | `perissable_2027` |
| [03-PILOTAGE/10_team_craft/03_technical_writing.md](../03-PILOTAGE/10_team_craft/03_technical_writing.md) | `perissable_2027` |
| [03-PILOTAGE/11_leadership_mentorat/05_expliquer_trois_publics.md](../03-PILOTAGE/11_leadership_mentorat/05_expliquer_trois_publics.md) | `perissable_2027` |
| [03-PILOTAGE/11_leadership_mentorat/07_standards_pour_agents.md](../03-PILOTAGE/11_leadership_mentorat/07_standards_pour_agents.md) | `perissable_2028` |
| [04-EPREUVE/02-TOOL-CAVE/01-why-this-level.md](../04-EPREUVE/02-TOOL-CAVE/01-why-this-level.md) | `perissable_2027` |
| [04-EPREUVE/02-TOOL-CAVE/02-editor-and-shell.md](../04-EPREUVE/02-TOOL-CAVE/02-editor-and-shell.md) | `perissable_2027` |
| [04-EPREUVE/02-TOOL-CAVE/03-debugging-toolkit.md](../04-EPREUVE/02-TOOL-CAVE/03-debugging-toolkit.md) | `perissable_2027` |
| [04-EPREUVE/02-TOOL-CAVE/boss-fight.md](../04-EPREUVE/02-TOOL-CAVE/boss-fight.md) | `perissable_2027` |
| [04-EPREUVE/02-TOOL-CAVE/grimoire.md](../04-EPREUVE/02-TOOL-CAVE/grimoire.md) | `perissable_2027` |
| [04-EPREUVE/03_realtime/03_webrtc/01_webrtc_concepts.md](../04-EPREUVE/03_realtime/03_webrtc/01_webrtc_concepts.md) | `perissable_2027` |
| [04-EPREUVE/06-CAPSTONE-ARENA/06-addendum-staff-engineer.md](../04-EPREUVE/06-CAPSTONE-ARENA/06-addendum-staff-engineer.md) | `perissable_2027` |
| [05-MAITRISE/01_databases/02_nosql_basics.md](../05-MAITRISE/01_databases/02_nosql_basics.md) | `perissable_2027` |
| [05-MAITRISE/02_scalability/04_load_balancing.md](../05-MAITRISE/02_scalability/04_load_balancing.md) | `perissable_2027` |
| [05-MAITRISE/03_edge_cases/02_floating_point.md](../05-MAITRISE/03_edge_cases/02_floating_point.md) | `perissable_2027` |
| [05-MAITRISE/05-DAY-TO-LEGEND/01-why-this-level.md](../05-MAITRISE/05-DAY-TO-LEGEND/01-why-this-level.md) | `perissable_2027` |
| [05-MAITRISE/06_annexes/06_dev_health.md](../05-MAITRISE/06_annexes/06_dev_health.md) | `perissable_2027` |
| [05-MAITRISE/06_annexes/16_career/00_guide.md](../05-MAITRISE/06_annexes/16_career/00_guide.md) | `perissable_2027` |
| [05-MAITRISE/06_annexes/19_interview/05_SIMULATION_SOLO.md](../05-MAITRISE/06_annexes/19_interview/05_SIMULATION_SOLO.md) | `perissable_2027` |
| [05-MAITRISE/06_annexes/24_recall/05_recall_30.md](../05-MAITRISE/06_annexes/24_recall/05_recall_30.md) | `perissable_2027` |
| [05-MAITRISE/06_annexes/29_toolchain/00_why_toolchain.md](../05-MAITRISE/06_annexes/29_toolchain/00_why_toolchain.md) | `perissable_2027` |
| [05-MAITRISE/06_annexes/29_toolchain/02_vscode_setup.md](../05-MAITRISE/06_annexes/29_toolchain/02_vscode_setup.md) | `perissable_2027` |
| [05-MAITRISE/06_annexes/29_toolchain/03_package_managers.md](../05-MAITRISE/06_annexes/29_toolchain/03_package_managers.md) | `perissable_2027` |
| [05-MAITRISE/06_annexes/29_toolchain/07_toolchain_grimoire.md](../05-MAITRISE/06_annexes/29_toolchain/07_toolchain_grimoire.md) | `perissable_2027` |
| [05-MAITRISE/06_annexes/29_toolchain/08_NODE_VERSIONS.md](../05-MAITRISE/06_annexes/29_toolchain/08_NODE_VERSIONS.md) | `perissable_2027` |
| [05-MAITRISE/07_tools/00_prereq_check.md](../05-MAITRISE/07_tools/00_prereq_check.md) | `perissable_2028` |
| [05-MAITRISE/07_tools/00_why_tools.md](../05-MAITRISE/07_tools/00_why_tools.md) | `perissable_2028` |
| [05-MAITRISE/07_tools/01_logger_structure.md](../05-MAITRISE/07_tools/01_logger_structure.md) | `perissable_2028` |
| [05-MAITRISE/07_tools/02_benchmark_kit.md](../05-MAITRISE/07_tools/02_benchmark_kit.md) | `perissable_2028` |
| [05-MAITRISE/07_tools/03_debug_toolkit.md](../05-MAITRISE/07_tools/03_debug_toolkit.md) | `perissable_2028` |
| [05-MAITRISE/07_tools/04_cli_scaffolder.md](../05-MAITRISE/07_tools/04_cli_scaffolder.md) | `perissable_2028` |
| [05-MAITRISE/07_tools/05_tools_grimoire.md](../05-MAITRISE/07_tools/05_tools_grimoire.md) | `perissable_2028` |
| [05-MAITRISE/07_tools/06_EXO_LECTURE.md](../05-MAITRISE/07_tools/06_EXO_LECTURE.md) | `perissable_2028` |
| [05-MAITRISE/08_maitrise_staff_engineer/03_trois_tensions.md](../05-MAITRISE/08_maitrise_staff_engineer/03_trois_tensions.md) | `perissable_2027` |
| [06-ANNEXES-TRANSVERSES/COMMUNAUTE.md](./10-COMMUNAUTE.md) | `perissable_2027` |
| [06-ANNEXES-TRANSVERSES/support.md](./01-support.md) | `perissable_2027` |
| [PREUVES-MODELES/S2-ADR-PRINCIPAL.md](../PREUVES-MODELES/S2-ADR-PRINCIPAL.md) | `perissable_2027` |
| [PREUVES-MODELES/S3-SLO.md](../PREUVES-MODELES/S3-SLO.md) | `perissable_2027` |
| [PREUVES-MODELES/S4-DECISION-ARBITRAGE.md](../PREUVES-MODELES/S4-DECISION-ARBITRAGE.md) | `perissable_2027` |
| [PREUVES-MODELES/S5-NOTE-DIRECTION-ET-REVUE.md](../PREUVES-MODELES/S5-NOTE-DIRECTION-ET-REVUE.md) | `perissable_2027` |
| [README.md](../README.md) | `perissable_2027` |

## Relevé de référence cloud (ajouté en A5)

| Quoi | Qui | Quand | Preuve exigée |
| --- | --- | --- | --- |
| [03-PILOTAGE/07_cloud_foundations/RELEVE-REFERENCE-2026.md](../03-PILOTAGE/07_cloud_foundations/RELEVE-REFERENCE-2026.md), 12 lignes | mainteneur du bloc 03-PILOTAGE | chaque année avant le 18 août | les 12 URL répondent encore, les 12 prix sont réécrits avec la nouvelle date, l'en-tête `stability` passe à l'année suivante |

Si le relevé n'est pas refait à la date dite, la règle est le retrait : on supprime les 12 lignes
et on laisse l'exercice de relevé réel seul. Un prix périmé qui reste affiché est pire qu'une absence de prix.
