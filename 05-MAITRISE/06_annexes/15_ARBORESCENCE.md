---
stability: intemporel
duree_de_vie_estimee: 10+ ans
raison: Vue d'ensemble stable du curriculum, écrite à la main.
acte: appliquer
---

# ARBORESCENCE : vue d'ensemble du curriculum

Temps de lecture ~5 min

> Carte à haut niveau, écrite à la main, pas générée. Utilise-la comme boussole, pas comme lecture.

```
MyFunnyJS/
├── README.md                        # Point d'entrée, 60 lignes exprès
├── START_HERE.md                    # Par où commencer selon ton niveau
├── COMMUNAUTE.md                    # Comment contribuer sans casser la ligne éditoriale
├── UNIVERS_AUTORISES.md             # Naruto, DBZ, Prison Break… liste fermée
├── LICENSE                          # Ce que tu peux faire avec ce contenu
│
├── 00-SOCLE/01_getting_started/              # Installer Node, ouvrir un projet, lire une doc
├── 00-SOCLE/03_referentiel/                  # Les 6 pierres : la posture d'ingénieur
│
├── 00-SOCLE/04_fundamentals/                 # Variables, portée, types, fonctions, modules
├── 00-SOCLE/05_problem_solving/              # Modéliser avant de coder, décomposer un problème
├── 01-CADRAGE/02_async/                        # Callbacks, promises, async/await, event loop
├── 01-CADRAGE/03_debugging/                    # Méthode scientifique de chasse aux bugs
├── 01-CADRAGE/04_error_handling/               # Prévoir l'échec, lever loud, wrapper juste
├── 02-CONSTRUCTION/03_testing/                      # AAA, fixtures, mocks, mutation testing
├── 02-CONSTRUCTION/04_math_basics/                  # IEEE 754, modulo, bits, hash, proba
├── 02-CONSTRUCTION/05_memory_performance/           # GC, complexité, profilage, Core Web Vitals
├── 02-CONSTRUCTION/06_data_structures/              # Array, Map, Set, Tree, Trie
├── 02-CONSTRUCTION/07_algorithms/                   # Tri, recherche, graphes, DP, récursion
├── 02-CONSTRUCTION/09_functional_js/                # Pure functions, immutabilité, composition
├── 02-CONSTRUCTION/10_design_patterns/              # GoF revisités JS-first
├── 02-CONSTRUCTION/11_refactoring/                  # Fowler à petits pas testés
├── 02-CONSTRUCTION/12_typescript/                   # Typage graduel, tooling, types avancés
├── 02-CONSTRUCTION/13_runtime_env/                  # Node, Bun, Deno, browser : différences réelles
├── 02-CONSTRUCTION/14_architecture_patterns/        # Hexagonal, CQRS, event-driven
├── 02-CONSTRUCTION/18_web_concepts/                 # HTTP, CORS, cookies, HTTPS, HTTP/3
├── 02-CONSTRUCTION/17_oop_js/                       # Classes, prototypes, polymorphisme
├── 03-PILOTAGE/02_web_inclusive/                # a11y + i18n : deux angles d'inclusion
├── 04-EPREUVE/03_realtime/                     # WebSocket, SSE, WebRTC
├── 02-CONSTRUCTION/19_api_craft/                    # REST, GraphQL, tRPC, contrats, versioning
├── 03-PILOTAGE/04_security/                     # OWASP, auth, XSS, CSRF, secrets
├── 04-EPREUVE/04_ai_native_dev/                # Coder avec IA sans se faire avoir
├── 05-MAITRISE/01_databases/                    # SQL, index, transactions, ORM sains
├── 05-MAITRISE/02_scalability/                  # Vertical, horizontal, cache, queue
├── 03-PILOTAGE/05_observability/                # Logs, metrics, traces, SLI/SLO
├── 03-PILOTAGE/10_team_craft/                   # Revue, PR, mentorat, RFC, ADR
├── 05-MAITRISE/03_edge_cases/                   # Encoding, timezone, floating point, Unicode
├── 05-MAITRISE/04_ai_agents_and_autonomy/       # Déléguer à un agent sans perdre le contrôle
│
├── 02-CONSTRUCTION/02_mini_projects/                # 18 projets : de Rasengan Engine à Polyglot Forge
│   ├── 01_rasengan_engine/
│   ├── 02_garo_no_kronika/
│   ├── ...
│   └── 18_human_vs_ai_smell/        # Nouveau v20 : même bug, deux styles
│
├── 05-MAITRISE/06_annexes/                      # Ce qui ne rentre pas dans un module
│   ├── PONTS_INTER_MODULES.md       # Table des transitions ponctuées
│   ├── ARBORESCENCE.md              # Ce fichier
│   ├── PERISSABILITE.md             # Qui périme quand
│   ├── templates/                   # HYPOTHESES.md, POSTMORTEM.md, PUBLICATION_CHECKLIST.md
│   ├── reading/                     # Cartographie 15 min d'une codebase inconnue
│   ├── soft_skills/                 # Demander de l'aide, désaccord technique
│   ├── versioning/                  # MIGRATION_LEARNER.md
│   ├── career/                      # Portfolio, pitch, interview arena
│   ├── interview/                   # Grilles et exos de préparation
│   └── recall/                      # Spaced repetition, fiches de rappel
│
├── 05-MAITRISE/07_tools/                        # Git, terminal, IDE, éditeur, CI
│
└── assets/                        # Images du repo (title.svg, etc.)
```

## RÈGLES DE LECTURE

- **`00_*` avant `01_*`** : les préludes ne sont pas optionnels si tu es débutant absolu.
- **Un module = un `00_why_*.md`** : lis-le en premier, il te dit pourquoi tu es ici.
- **`99_PONT_*.md`** : ferme le module courant, respire, puis ouvre le suivant.
