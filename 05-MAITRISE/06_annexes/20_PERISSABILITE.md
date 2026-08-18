---
stability: intemporel
acte: appliquer
---

# PÉRISSABILITÉ : vue consolidée

-> ~5 min

Chaque fichier `.md` du repo porte un tag `stability:` en front-matter. Ce fichier agrège les 795 tags en une carte de risque unique, pour que tu (ou un mainteneur en 2028) sache **où le contenu vieillit vite** sans ouvrir 790 fichiers.

## SYNTHÈSE

- **intemporel** : 638 fichiers (concepts qui ne bougent pas : event loop, big-O, closures, SOLID)
- **stable** : 106 fichiers (API/pratiques stables sur 5+ ans : Node LTS, HTTP, SQL)
- **périssable** : 51 fichiers (tooling, IA, écosystème en mouvement rapide)

## MODULES À RISQUE (contenu périssable)

| Module                      | # fichiers périssables | Cause principale                     |
| --------------------------- | ---------------------- | ------------------------------------ |
| `02-CONSTRUCTION/12_typescript`             | 18                     | évolutions TS, strictness options    |
| `04-EPREUVE/04_ai_native_dev`          | 13                     | outils IA, prompts, modèles          |
| `05-MAITRISE/04_ai_agents_and_autonomy` | 11                     | agents IA, frameworks                |
| `05-MAITRISE/07_tools`                  | 7                      | chaîne d'outils dev (bundlers, LSPs) |
| `03-PILOTAGE/05_observability`          | 1                      | outillage OTLP en mouvement          |
| `05-MAITRISE/06_annexes`                | 1                      | écosystème mouvant                   |

## MODULES 100% INTEMPORELS (aucune ligne périssable détectée)

- `00-SOCLE/01_getting_started`
- `00-SOCLE/03_referentiel`
- `00-SOCLE/04_fundamentals`
- `00-SOCLE/05_problem_solving`
- `01-CADRAGE/02_async`
- `01-CADRAGE/03_debugging`
- `01-CADRAGE/04_error_handling`
- `02-CONSTRUCTION/03_testing`
- `02-CONSTRUCTION/04_math_basics`
- `02-CONSTRUCTION/05_memory_performance`
- `02-CONSTRUCTION/06_data_structures`
- `02-CONSTRUCTION/07_algorithms`
- `02-CONSTRUCTION/09_functional_js`
- `02-CONSTRUCTION/10_design_patterns`
- `02-CONSTRUCTION/11_refactoring`
- `02-CONSTRUCTION/13_runtime_env`
- `02-CONSTRUCTION/14_architecture_patterns`
- `02-CONSTRUCTION/18_web_concepts`
- `02-CONSTRUCTION/17_oop_js`
- `03-PILOTAGE/02_web_inclusive`
- `04-EPREUVE/03_realtime`
- `02-CONSTRUCTION/19_api_craft`
- `03-PILOTAGE/04_security`
- `05-MAITRISE/01_databases`
- `05-MAITRISE/02_scalability`
- `03-PILOTAGE/10_team_craft`
- `05-MAITRISE/03_edge_cases`
- `02-CONSTRUCTION/02_mini_projects`

## DERNIER CHECK

Cette vue est générée depuis les tags `stability:` déjà présents dans chaque fichier. Pour la régénérer : `grep -rl '^stability: X' --include='*.md' .` par valeur, en excluant `node solution.js` (critere binaire ecrit par toi) (scripts internes, hors périmètre pédagogique). Aucune campagne de re-tagging nécessaire, seule une régénération de comptage.

## COMMENT L'UTILISER

- Avant de lancer une refonte, ouvre ce fichier : commence par les modules du tableau ci-dessus.
- Un fichier `perissable` de plus de 24 mois sans revue = candidat urgent à relecture.
- Un fichier `intemporel` n'a besoin d'être touché que si le mécanisme sous-jacent change (rare).
- Seules trois valeurs de tag sont valides : `intemporel`, `stable`, `perissable`. Toute autre valeur (variante, typo) casse ce comptage silencieusement : vérifie avec `grep -rh "^stability:" --include="*.md" . | sort -u` que seules ces trois valeurs apparaissent avant de faire confiance à ce fichier.

## Annexe declenchee ici

- [11-ANNEXE-perennite.md](../../06-ANNEXES-TRANSVERSES/11-ANNEXE-perennite.md) : la doctrine de perennite du depot, a lire une fois la grille intemporel/perissable comprise.
