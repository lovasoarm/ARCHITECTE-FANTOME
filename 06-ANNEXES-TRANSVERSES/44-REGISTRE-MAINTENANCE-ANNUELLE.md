---
stability: evolutif
acte: gouvernance
route: maintenance
---

# 44 : REGISTRE DE MAINTENANCE ANNUELLE

Ce registre rend exploitable la distinction `intemporel / évolutif / périssable` déjà présente dans AF. Il ne remplace pas les `perishability_id` : il les centralise pour permettre une revue ciblée.

## 1. Statut de vérité

`last_verified` ci-dessous signifie **inventaire du métadonné et du chemin vérifiés le 2026-08-28**, pas validation du contenu auprès de sa source. Une entrée doit devenir `verified` seulement après contrôle de fond par le mainteneur responsable.

Statuts autorisés : `verified`, `stale`, `blocked`, `deprecated`, `needs-source`, `inventory-checked`.

## 2. Priorités

| Priorité | À revoir | Pourquoi |
|---|---|---|
| **P0** | IA/LLM/agents, sécurité, changements critiques de cloud, tarifs/quotas, fournisseurs, vulnérabilités et standards critiques | une erreur peut produire un conseil dangereux, faux ou coûteux |
| **P1** | platform engineering, orchestration quand enseignée, workflows IA, observabilité/test, attentes des rôles avancés | forte évolution des pratiques ; impact architectural important |
| **P2** | runtimes, frameworks, CI/CD, conventions, commandes et outillage | volatilité élevée mais impact pédagogique généralement local |

## 3. Boucle annuelle

```text
repérer par perishability_id
        ↓
revenir à la source primaire
        ↓
comparer le contenu au contexte actuel
        ↓
verified / stale / blocked / deprecated
        ↓
mettre à jour uniquement la page concernée
        ↓
rejouer les liens et preuves de la zone
        ↓
publier l'état de la revue
```

Aucune page intemporelle n'a à être réécrite simplement parce que l'année change. Ce registre sert justement à éviter une réécriture annuelle du corpus entier.

## 4. Gouvernance minimale

- **P0** : revue annuelle au minimum, et immédiatement après une évolution de sécurité ou de service à fort impact.
- **P1** : revue annuelle.
- **P2** : revue annuelle groupée ou lors d'un changement de génération de runtime/framework.
- Une date `review_due` antérieure à la date du jour rend l'élément `stale` jusqu'à revue.
- Une source primaire introuvable rend l'élément `blocked`.
- Un contenu remplacé par un nouveau mécanisme devient `deprecated` et doit pointer vers son successeur interne.

## 5. Registre des 107 éléments

| ID | Fichier | Priorité | Dernière vérification | Prochaine revue | Responsable | Statut initial V15 | Source / action |
|---|---|---:|---|---|---|---|---|
| PER-0001 | `00-SOCLE/01-GETTING-STARTED/02-install.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | inventory-checked | Source officielle déjà référencée ; vérifier le contenu avant `verified`. |
| PER-0002 | `00-SOCLE/01-GETTING-STARTED/03-day_one.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0003 | `00-SOCLE/01-GETTING-STARTED/08-PACKAGE_JSON_README.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0004 | `00-SOCLE/01-GETTING-STARTED/README.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0005 | `00-SOCLE/03-REFERENTIEL/00-PREREQUIS.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0006 | `01-CADRAGE/03-DEBUGGING/02-read_stack_trace.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0007 | `01-CADRAGE/03-DEBUGGING/12-HYPOTHESES_EXEMPLE.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0008 | `01-CADRAGE/04-ERROR-HANDLING/05-async_error_traps.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0009 | `01-CADRAGE/04-ERROR-HANDLING/90-grimoire.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0010 | `02-CONSTRUCTION/02-MINI-PROJECTS/18_human_vs_ai_smell/00-CAHIER-DES-CHARGES.md` | P0 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur IA | needs-source | https://www.nist.gov/itl/ai-risk-management-framework ; https://genai.owasp.org/ ; contrôler immédiatement les changements critiques et dater la vérification. |
| PER-0011 | `02-CONSTRUCTION/02-MINI-PROJECTS/18_human_vs_ai_smell/README.md` | P0 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur IA | needs-source | https://www.nist.gov/itl/ai-risk-management-framework ; https://genai.owasp.org/ ; contrôler immédiatement les changements critiques et dater la vérification. |
| PER-0012 | `02-CONSTRUCTION/03-TESTING/00-PREREQUIS.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0013 | `02-CONSTRUCTION/03-TESTING/09-e2e_playwright_beast.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | inventory-checked | https://playwright.dev/docs/intro |
| PER-0014 | `02-CONSTRUCTION/04-MATH-BASICS/05-hashing_basics.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0015 | `02-CONSTRUCTION/05-MEMORY-PERFORMANCE/01_gc/06-heap_snapshot_hands_on.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0016 | `02-CONSTRUCTION/05-MEMORY-PERFORMANCE/02_copy_vs_ref/02-shallow_vs_deep.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0017 | `02-CONSTRUCTION/07-ALGORITHMS/01_sorting/03-merge_sort.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0018 | `02-CONSTRUCTION/07-ALGORITHMS/01_sorting/05-sorting_race.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0019 | `02-CONSTRUCTION/09-FUNCTIONAL-JS/03-immutability.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | inventory-checked | Source officielle déjà référencée ; vérifier le contenu avant `verified`. |
| PER-0020 | `02-CONSTRUCTION/12-TYPESCRIPT/00-PREREQUIS.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur runtime/outillage | needs-source | https://www.typescriptlang.org/docs/ |
| PER-0021 | `02-CONSTRUCTION/12-TYPESCRIPT/01_ts_basics/02-types_and_interfaces.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur runtime/outillage | needs-source | https://www.typescriptlang.org/docs/ |
| PER-0022 | `02-CONSTRUCTION/12-TYPESCRIPT/01_ts_basics/03-functions_typed.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur runtime/outillage | needs-source | https://www.typescriptlang.org/docs/ |
| PER-0023 | `02-CONSTRUCTION/12-TYPESCRIPT/01_ts_basics/04-classes_typed.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur runtime/outillage | needs-source | https://www.typescriptlang.org/docs/ |
| PER-0024 | `02-CONSTRUCTION/12-TYPESCRIPT/02A-EXO_LECTURE.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur runtime/outillage | needs-source | https://www.typescriptlang.org/docs/ |
| PER-0025 | `02-CONSTRUCTION/12-TYPESCRIPT/02_ts_intermediate/02-generics.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur runtime/outillage | needs-source | https://www.typescriptlang.org/docs/ |
| PER-0026 | `02-CONSTRUCTION/12-TYPESCRIPT/02_ts_intermediate/03-utility_types.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur runtime/outillage | inventory-checked | https://www.typescriptlang.org/docs/ |
| PER-0027 | `02-CONSTRUCTION/12-TYPESCRIPT/02_ts_intermediate/04-union_intersection.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur runtime/outillage | needs-source | https://www.typescriptlang.org/docs/ |
| PER-0028 | `02-CONSTRUCTION/12-TYPESCRIPT/02_ts_intermediate/05-type_guards.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur runtime/outillage | needs-source | https://www.typescriptlang.org/docs/ |
| PER-0029 | `02-CONSTRUCTION/12-TYPESCRIPT/03_ts_advanced/02-conditional_types.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur runtime/outillage | needs-source | https://www.typescriptlang.org/docs/ |
| PER-0030 | `02-CONSTRUCTION/12-TYPESCRIPT/03_ts_advanced/03-mapped_types.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur runtime/outillage | needs-source | https://www.typescriptlang.org/docs/ |
| PER-0031 | `02-CONSTRUCTION/12-TYPESCRIPT/03_ts_advanced/04-ts_in_real_project.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur runtime/outillage | needs-source | https://www.typescriptlang.org/docs/ |
| PER-0032 | `02-CONSTRUCTION/12-TYPESCRIPT/04_typescript_tooling/02-declaration_files.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur runtime/outillage | needs-source | https://www.typescriptlang.org/docs/ |
| PER-0033 | `02-CONSTRUCTION/12-TYPESCRIPT/04_typescript_tooling/03-ts_compiler_config.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur runtime/outillage | needs-source | https://www.typescriptlang.org/docs/ |
| PER-0034 | `02-CONSTRUCTION/12-TYPESCRIPT/04_typescript_tooling/04-ts_migration_guide.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur runtime/outillage | needs-source | https://www.typescriptlang.org/docs/ |
| PER-0035 | `02-CONSTRUCTION/12-TYPESCRIPT/04_typescript_tooling/90-grimoire.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur runtime/outillage | needs-source | https://www.typescriptlang.org/docs/ |
| PER-0036 | `02-CONSTRUCTION/12-TYPESCRIPT/90-grimoire.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur runtime/outillage | needs-source | https://www.typescriptlang.org/docs/ |
| PER-0037 | `02-CONSTRUCTION/12-TYPESCRIPT/99A-PONT.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur runtime/outillage | needs-source | https://www.typescriptlang.org/docs/ |
| PER-0038 | `02-CONSTRUCTION/13-RUNTIME-ENV/02-node_vs_browser.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | inventory-checked | Source officielle déjà référencée ; vérifier le contenu avant `verified`. |
| PER-0039 | `02-CONSTRUCTION/19-API-CRAFT/05-auth_jwt.md` | P0 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur sécurité | needs-source | https://owasp.org/www-project-top-ten/ ; https://csrc.nist.gov/ ; contrôler immédiatement les changements critiques et dater la vérification. |
| PER-0040 | `03-PILOTAGE/03-QUALITY-SHIELD/90-grimoire.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | inventory-checked | Source officielle déjà référencée ; vérifier le contenu avant `verified`. |
| PER-0041 | `03-PILOTAGE/04-SECURITY/04-prototype_pollution.md` | P0 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur sécurité | needs-source | https://owasp.org/www-project-top-ten/ ; https://csrc.nist.gov/ ; contrôler immédiatement les changements critiques et dater la vérification. |
| PER-0042 | `03-PILOTAGE/04-SECURITY/06-hashing_bcrypt.md` | P0 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur sécurité | needs-source | https://owasp.org/www-project-top-ten/ ; https://csrc.nist.gov/ ; contrôler immédiatement les changements critiques et dater la vérification. |
| PER-0043 | `03-PILOTAGE/04-SECURITY/07-privacy_and_data_regulation.md` | P0 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-23 | Mainteneur sécurité | inventory-checked | https://owasp.org/www-project-top-ten/ ; https://csrc.nist.gov/ ; contrôler immédiatement les changements critiques et dater la vérification. |
| PER-0044 | `03-PILOTAGE/04-SECURITY/14-owasp_checklist.md` | P0 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur sécurité | inventory-checked | https://owasp.org/www-project-top-ten/ ; https://csrc.nist.gov/ ; contrôler immédiatement les changements critiques et dater la vérification. |
| PER-0045 | `03-PILOTAGE/05-OBSERVABILITY/00-PREREQUIS.md` | P1 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur cloud/platform | needs-source | Source officielle déjà référencée ou à confirmer dans la page. |
| PER-0046 | `03-PILOTAGE/05-OBSERVABILITY/02-structured_logging.md` | P1 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur cloud/platform | needs-source | Source officielle déjà référencée ou à confirmer dans la page. |
| PER-0047 | `03-PILOTAGE/05-OBSERVABILITY/03-distributed_tracing.md` | P1 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur cloud/platform | inventory-checked | Source officielle déjà référencée ou à confirmer dans la page. |
| PER-0048 | `03-PILOTAGE/05-OBSERVABILITY/04-tracing_paper_drill.md` | P1 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur cloud/platform | needs-source | Source officielle déjà référencée ou à confirmer dans la page. |
| PER-0049 | `03-PILOTAGE/05-OBSERVABILITY/05-metrics_alerting.md` | P1 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur cloud/platform | needs-source | Source officielle déjà référencée ou à confirmer dans la page. |
| PER-0050 | `03-PILOTAGE/05-OBSERVABILITY/06-sentry_in_prod.md` | P1 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur cloud/platform | needs-source | Source officielle déjà référencée ou à confirmer dans la page. |
| PER-0051 | `03-PILOTAGE/05-OBSERVABILITY/07-debug_in_prod.md` | P1 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur cloud/platform | needs-source | Source officielle déjà référencée ou à confirmer dans la page. |
| PER-0052 | `03-PILOTAGE/05-OBSERVABILITY/08-prod_stack_trace_drill.md` | P1 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur cloud/platform | needs-source | Source officielle déjà référencée ou à confirmer dans la page. |
| PER-0053 | `03-PILOTAGE/05-OBSERVABILITY/09-oncall_drill.md` | P1 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur cloud/platform | needs-source | Source officielle déjà référencée ou à confirmer dans la page. |
| PER-0054 | `03-PILOTAGE/05-OBSERVABILITY/10-instrumenter_ton_projet.md` | P1 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur cloud/platform | inventory-checked | Source officielle déjà référencée ou à confirmer dans la page. |
| PER-0055 | `03-PILOTAGE/05-OBSERVABILITY/11-EXO_LECTURE.md` | P1 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur cloud/platform | needs-source | Source officielle déjà référencée ou à confirmer dans la page. |
| PER-0056 | `03-PILOTAGE/05-OBSERVABILITY/90-grimoire.md` | P1 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur cloud/platform | needs-source | Source officielle déjà référencée ou à confirmer dans la page. |
| PER-0057 | `03-PILOTAGE/05-OBSERVABILITY/99A-PONT.md` | P1 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur cloud/platform | needs-source | Source officielle déjà référencée ou à confirmer dans la page. |
| PER-0058 | `03-PILOTAGE/07-CLOUD-FOUNDATIONS/03-rayon_impact_zones.md` | P1 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur cloud/platform | needs-source | Source officielle déjà référencée ou à confirmer dans la page. |
| PER-0059 | `03-PILOTAGE/07-CLOUD-FOUNDATIONS/05-releve_tarifaire_reel.md` | P0 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur cloud/platform | inventory-checked | https://aws.amazon.com/pricing/ ; https://cloud.google.com/pricing/list ; https://azure.microsoft.com/pricing/ ; contrôler immédiatement les changements critiques et dater la vérification. |
| PER-0060 | `03-PILOTAGE/07-CLOUD-FOUNDATIONS/06-reference-portability/README.md` | P1 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur cloud/platform | needs-source | Source officielle déjà référencée ou à confirmer dans la page. |
| PER-0061 | `03-PILOTAGE/07-CLOUD-FOUNDATIONS/06A-BUDGET-CLOUD.md` | P0 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur cloud/platform | needs-source | https://aws.amazon.com/pricing/ ; https://cloud.google.com/pricing/list ; https://azure.microsoft.com/pricing/ ; contrôler immédiatement les changements critiques et dater la vérification. |
| PER-0062 | `03-PILOTAGE/07-CLOUD-FOUNDATIONS/07-RELEVE-REFERENCE-2026.md` | P0 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur cloud/platform | inventory-checked | https://aws.amazon.com/pricing/ ; https://cloud.google.com/pricing/list ; https://azure.microsoft.com/pricing/ ; contrôler immédiatement les changements critiques et dater la vérification. |
| PER-0063 | `03-PILOTAGE/07-CLOUD-FOUNDATIONS/99-PORTAGE-MENTAL.md` | P1 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur cloud/platform | needs-source | Source officielle déjà référencée ou à confirmer dans la page. |
| PER-0064 | `03-PILOTAGE/08-PRODUIT-COUT-ROI/95-challenge.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0065 | `03-PILOTAGE/10-TEAM-CRAFT/04-technical_writing.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | inventory-checked | Source officielle déjà référencée ; vérifier le contenu avant `verified`. |
| PER-0066 | `04-EPREUVE/01-BONUS-VAULT/01-01-why-this-level.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0067 | `04-EPREUVE/02-TOOL-CAVE/03-debugging-toolkit.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0068 | `04-EPREUVE/05-CAPSTONE-ARENA/06-addendum-staff-engineer.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0069 | `04-EPREUVE/05-CAPSTONE-ARENA/07-semaine-double-derive.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0070 | `04-EPREUVE/05-CAPSTONE-ARENA/09-SECURITY-GATE-FIL-ROUGE.md` | P0 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur sécurité | needs-source | https://owasp.org/www-project-top-ten/ ; https://csrc.nist.gov/ ; contrôler immédiatement les changements critiques et dater la vérification. |
| PER-0071 | `05-MAITRISE/06-ANNEXES/29_toolchain/01-00-why-toolchain.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur runtime/outillage | needs-source | https://nodejs.org/docs/latest-v22.x/api/ |
| PER-0072 | `05-MAITRISE/06-ANNEXES/29_toolchain/08-NODE_VERSIONS.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur runtime/outillage | needs-source | https://nodejs.org/docs/latest-v22.x/api/ |
| PER-0073 | `05-MAITRISE/07-TOOLS/00-PREREQUIS.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0074 | `05-MAITRISE/07-TOOLS/01-00-why-tools.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0075 | `05-MAITRISE/07-TOOLS/02-logger_structure.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0076 | `05-MAITRISE/07-TOOLS/03-benchmark_kit.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0077 | `05-MAITRISE/07-TOOLS/04-debug_toolkit.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0078 | `05-MAITRISE/07-TOOLS/05-cli_scaffolder.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0079 | `05-MAITRISE/07-TOOLS/06-EXO_LECTURE.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0080 | `05-MAITRISE/07-TOOLS/90-grimoire.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0081 | `05-MAITRISE/08-MAITRISE-STAFF-ENGINEER/05A-transfert_hors_ecosysteme.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0082 | `05-MAITRISE/08-MAITRISE-STAFF-ENGINEER/06-IA-GOVERNANCE-SECURITY.md` | P0 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur sécurité | inventory-checked | https://owasp.org/www-project-top-ten/ ; https://csrc.nist.gov/ ; contrôler immédiatement les changements critiques et dater la vérification. |
| PER-0083 | `05-MAITRISE/08-MAITRISE-STAFF-ENGINEER/95-challenge.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0084 | `05-MAITRISE/08-MAITRISE-STAFF-ENGINEER/96-boss-fight.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0085 | `06-ANNEXES-TRANSVERSES/03-NODE_VERSION.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur runtime/outillage | needs-source | https://nodejs.org/docs/latest-v22.x/api/ |
| PER-0086 | `06-ANNEXES-TRANSVERSES/04-TECH-ILA/tech-ila/02-orientation.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0087 | `06-ANNEXES-TRANSVERSES/04-TECH-ILA/tech-ila/03-niveau-1-socle.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0088 | `06-ANNEXES-TRANSVERSES/04-TECH-ILA/tech-ila/04-niveau-2-frontend.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0089 | `06-ANNEXES-TRANSVERSES/04-TECH-ILA/tech-ila/05-niveau-3-backend.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0090 | `06-ANNEXES-TRANSVERSES/04-TECH-ILA/tech-ila/06-niveau-4-systemes.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0091 | `06-ANNEXES-TRANSVERSES/04-TECH-ILA/tech-ila/07-niveau-5-transfert.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0092 | `06-ANNEXES-TRANSVERSES/04-TECH-ILA/tech-ila/08-cartes-parcours-technologies.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0093 | `06-ANNEXES-TRANSVERSES/04-TECH-ILA/tech-ila/09-mode-urgence.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0094 | `06-ANNEXES-TRANSVERSES/09-CONTRADICTEUR.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0095 | `06-ANNEXES-TRANSVERSES/16-SUPPORT.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0096 | `06-ANNEXES-TRANSVERSES/17-PREUVES-MODELES/02-S1-BUDGET-CLOUD.md` | P0 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur cloud/platform | needs-source | https://aws.amazon.com/pricing/ ; https://cloud.google.com/pricing/list ; https://azure.microsoft.com/pricing/ ; contrôler immédiatement les changements critiques et dater la vérification. |
| PER-0097 | `06-ANNEXES-TRANSVERSES/17-PREUVES-MODELES/03-S2-ADR-PRINCIPAL.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0098 | `06-ANNEXES-TRANSVERSES/17-PREUVES-MODELES/04-S3-SLO.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0099 | `06-ANNEXES-TRANSVERSES/17-PREUVES-MODELES/05-S4-DECISION-ARBITRAGE.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0100 | `06-ANNEXES-TRANSVERSES/17-PREUVES-MODELES/06-S5-NOTE-DIRECTION-ET-REVUE.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0101 | `06-ANNEXES-TRANSVERSES/17-PREUVES-MODELES/99-PORTAGE-MENTAL.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | needs-source | Qualifier une source officielle adaptée au sujet avant la prochaine publication. |
| PER-0102 | `06-ANNEXES-TRANSVERSES/19-PRODUIT-IA-REFERENCE/README.md` | P0 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur IA | needs-source | https://www.nist.gov/itl/ai-risk-management-framework ; https://genai.owasp.org/ ; contrôler immédiatement les changements critiques et dater la vérification. |
| PER-0103 | `06-ANNEXES-TRANSVERSES/28-REFERENTIEL-EXTERNE-STAFF-2026.md` | P1 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur cloud/platform | inventory-checked | Source officielle déjà référencée ou à confirmer dans la page. |
| PER-0104 | `06-ANNEXES-TRANSVERSES/36-RIGUEUR-SOURCES.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-08-28 | Mainteneur curriculum | inventory-checked | Source officielle déjà référencée ; vérifier le contenu avant `verified`. |
| PER-0105 | `02-CONSTRUCTION/12-TYPESCRIPT/98-EXO-VERIFICATION.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-12-31 | Mainteneur runtime/outillage | needs-source | Qualifier la documentation TypeScript officielle et vérifier le protocole d'exercice. |
| PER-0106 | `05-MAITRISE/07-TOOLS/97-EXO-VERIFICATION.md` | P2 | 2026-08-28 (inventaire; pas une validation de fond) | 2028-12-31 | Mainteneur runtime/outillage | needs-source | Qualifier la source officielle de l'outil ou du concept concerné avant la prochaine publication. |
| PER-0107 | `03-PILOTAGE/05-OBSERVABILITY/97-EXO-VERIFICATION.md` | P1 | 2026-08-28 (inventaire; pas une validation de fond) | 2027-12-31 | Mainteneur cloud/platform | needs-source | Qualifier une source officielle de l'observabilité et vérifier le drill avant la prochaine publication. |

## 6. Règle de publication

Avant une release, les P0 non `verified` doivent être signalés explicitement dans la checklist de validation. Un statut `inventory-checked` ne constitue jamais un feu vert de fond.

La maintenance du curriculum n'est pas une charge CORE d'apprentissage : **temps CORE ajouté = 0 h**.
