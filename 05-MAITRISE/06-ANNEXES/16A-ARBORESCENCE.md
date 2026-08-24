---
stability: intemporel
duree_de_vie_estimee: 10+ ans
raison: Vue d'ensemble stable du curriculum, alignée sur les six paliers du dépôt.
acte: comprendre
cognitive_level: L4
perturbation_modes: [constraints_injectees, changement_contexte]
anti_recipe_key: constraints_injectees+changement_contexte
transfer_distance: high
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# ARBORESCENCE : vue d'ensemble du curriculum

Temps de lecture ~5 min

> Carte à haut niveau. Utilise-la comme boussole, pas comme lecture. Elle décrit
> l'état réel du dépôt : six paliers, 54 modules pédagogiques directs. La carte narrative
> du parcours est [00-SOCLE/02-PROLOGUE/03-the-map.md](../../00-SOCLE/02-PROLOGUE/03-the-map.md) ;
> l'ordre de passage fait foi dans
> [06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md).

```text
ce parcours/
├── README.md                         # Point d'entrée du parcours
├── PROGRESSION.md                    # La grille de suivi : le seul endroit où tu coches
├── PREUVES-STAFF-ENGINEER.md         # Les six familles de preuves attendues
├── LICENSE                           # Ce que tu peux faire avec ce contenu
│
├── 00-SOCLE/                         # Palier 0 : Fondations (6 modules, 1 Boss)
│   ├── 01-GETTING-STARTED/           # Installer Node, ouvrir un projet, lire une doc
│   ├── 02-PROLOGUE/                  # La carte, le projet fil rouge, les règles du jeu
│   ├── 03-REFERENTIEL/               # Les pierres : la posture d'ingénieur
│   ├── 04-FUNDAMENTALS/              # Variables, portée, fonctions, types, web, modules, regex
│   ├── 05-PROBLEM-SOLVING/           # Modéliser avant de coder, décomposer un problème
│   └── 06-MINDSET/                   # Systèmes, coûts, hypothèses, écrire pour penser
│
├── 01-CADRAGE/                       # Palier 1 : Développeur (5 modules, 2 Boss + 1 rétro)
│   ├── 01-PROBLEM-HUNT/              # Demande, besoin, contrainte : les séparer
│   ├── 02-ASYNC/                     # Callbacks, promesses, async/await, event loop
│   ├── 03-DEBUGGING/                 # Méthode scientifique de chasse aux bugs
│   ├── 04-ERROR-HANDLING/            # Prévoir l'échec, lever fort, envelopper juste
│   ├── 05-MVP-SPLIT/                 # Découper en tranches verticales livrables
│   └── 02A-RETRO-BLOC-1-CADRAGE.md    # Rétrospective de palier
│
├── 02-CONSTRUCTION/                  # Paliers 2 et 2bis : Confirmé puis Concepteur
│   ├── 01-USER-WIZARD/               # Parcours utilisateur et cas limites
│   ├── 02-MINI-PROJECTS/             # 19 mini-projets + gabarits sans corrigés livrés
│   ├── 03-TESTING/                   # AAA, fixtures, doublures, tests de mutation
│   ├── 04-MATH-BASICS/               # IEEE 754, modulo, bits, hachage, probabilités
│   ├── 05-MEMORY-PERFORMANCE/        # GC, complexité, profilage, Core Web Vitals, JIT
│   ├── 06-DATA-STRUCTURES/           # Array, Map, Set, pile, file, tas, arbres, graphes
│   ├── 07-ALGORITHMS/                # Tri, recherche, programmation dynamique, greedy
│   ├── 08-DATA-SPELLS/               # Modéliser un domaine, migrer un schéma
│   ├── 09-FUNCTIONAL-JS/             # Fonctions pures, immutabilité, composition
│   ├── 10-DESIGN-PATTERNS/           # Patrons GoF revisités JS-first
│   ├── 11-REFACTORING/               # Fowler à petits pas testés
│   ├── 12-TYPESCRIPT/                # Typage graduel, outillage, types avancés
│   ├── 13-RUNTIME-ENV/               # Node, Bun, Deno, navigateur : différences réelles
│   ├── 14-ARCHITECTURE-PATTERNS/     # Hexagonal, CQRS, événementiel
│   ├── 15-ARCHI-LAB/                 # Frontières, carte de contexte, ADR d'architecture
│   ├── 16-DDD-CONTRATS/              # Domaine, contrats, cohérence à terme
│   ├── 17-OOP-JS/                    # Classes, prototypes, polymorphisme
│   ├── 18-WEB-CONCEPTS/              # HTTP, CORS, cookies, HTTPS, HTTP/3
│   ├── 19-API-CRAFT/                 # REST, GraphQL, tRPC, contrats, versioning
│   ├── 20-API-DOJO/                  # Spec d'API, politique d'erreurs et d'authentification
│   ├── 02b-BOSS-1/ … 20b-BOSS-9/     # Les 9 épreuves BOSS du palier, intercalées
│   ├── 02A-c-MI-RETRO-BLOC-2-BUILD.md  # Mi-parcours du palier 2
│   ├── 03A-c-RETRO-BLOC-2-BUILD-CONFIRME.md
│   └── 04A-RETRO-BLOC-2BIS-ARCHI.md
│
├── 03-PILOTAGE/                      # Palier 3 : Senior (11 modules)
│   ├── 01-ROADMAP-RUN/               # Planifier par le risque
│   ├── 02-WEB-INCLUSIVE/             # a11y + i18n : deux angles d'inclusion
│   ├── 03-QUALITY-SHIELD/            # Stratégie de tests, quoi mesurer, quoi alerter
│   ├── 04-SECURITY/                  # OWASP, auth, XSS, CSRF, secrets, vie privée
│   ├── 05-OBSERVABILITY/             # Logs, métriques, traces, SLI
│   ├── 06-FIABILITE-SLO/             # SLO, budget d'erreur, arbitrage de fiabilité
│   ├── 07-CLOUD-FOUNDATIONS/         # Unités facturées, egress, dimensionnement
│   ├── 08-PRODUIT-COUT-ROI/          # Point mort, ROI, registre de dette
│   ├── 09-TEAM-QUEST/                # Working agreement, flux Git documenté
│   ├── 10-TEAM-CRAFT/                # Revue, PR, mentorat, RFC, ADR
│   ├── 11-LEADERSHIP-MENTORAT/       # Direction technique, revue à trois niveaux
│   ├── 12-PLATFORM-ENGINEERING/       # GitOps, IDP, golden paths, plateforme comme produit
│   └── 02A-RETRO-BLOC-3-CONDUITE.md   # Rétrospective de palier
│
├── 04-EPREUVE/                       # Palier 4 : Épreuve (6 modules, 2 Boss)
│   ├── 01-BONUS-VAULT/               # Sécurité, coûts, données personnelles
│   ├── 02-TOOL-CAVE/                 # Éditeur, shell, outillage de débogage
│   ├── 03-REALTIME/                  # WebSocket, SSE, WebRTC
│   ├── 04-BIG-APP-SNOOP/             # Entrer dans un gros code inconnu
│   ├── 05-CAPSTONE-ARENA/            # Le projet complet depuis un brief ambigu
│   ├── 03b-BOSS-1/ , 04b-BOSS-2/     # Les deux épreuves BOSS du palier
│   └── 02A-RETRO-BLOC-4-EPREUVE.md    # Rétrospective de palier
│
├── 05-MAITRISE/                      # Palier 5 : Maîtrise (7 modules pédagogiques + annexes)
│   ├── 01-DATABASES/                 # SQL, index, transactions, ORM sains
│   ├── 02-SCALABILITY/               # Vertical, horizontal, cache, file d'attente
│   ├── 03-EDGE-CASES/                # Encodage, fuseaux, flottants, Unicode
│   ├── 05-DAY-TO-LEGEND/             # Progresser seul, durablement
│   ├── 06-ANNEXES/                   # Ce qui ne rentre dans aucun module (voir ci-dessous)
│   ├── 07-TOOLS/                     # Git, terminal, IDE, CI
│   ├── 08-MAITRISE-STAFF-ENGINEER/   # Dossier unique, tensions, défense de décision
│   └── 02A-RETRO-BLOC-5-MAITRISE.md   # Rétrospective de palier
│
└── 06-ANNEXES-TRANSVERSES/           # Hors palier : appelées par les modules
    ├── 02-OU-CHERCHER-DE-L-AIDE.md   ├── 10-SIMULATION-ENTREPRISE.md
    ├── 03-NODE_VERSION.md            ├── 11-PEREMPTION-2027.md
    ├── 04A-CARTE-DU-PARCOURS.md   ├── 12-COMMUNAUTE.md
    ├── 04-TECH-ILA/                  ├── 13-ANNEXE-perennite.md
    ├── 05-UNIVERS_AUTORISES.md       ├── 15-ANNEXE-et-apres.md
    ├── 06-DEV_JOURNAL_HEBDO.md       ├── 16-SUPPORT.md
    ├── 08-ROADMAP-rythmes.md         ├── 17-PREUVES-MODELES/
    └── 09-CONTRADICTEUR.md           └── 17A-PROTOCOLE-DONNEE-SOURCEE.md
```

## Détail de `05-MAITRISE/06-ANNEXES/`

```text
06-ANNEXES/
├── 16A-ARBORESCENCE.md            # Ce fichier
├── 18-PERISSABILITE.md           # Qui périme quand
├── 99A-PONT.md     # Table des transitions ponctuées (`99A-PONT.md`)
├── 16_career/                    # Portfolio, pitch, pivot, replay du premier clic
├── 19_interview/                 # Grilles, arène d'entretien, tempête d'objections
├── 23_reading/                   # Cartographier une codebase inconnue en 15 min
├── 24_recall/                    # Fiches de rappel
├── 25_soft_skills/               # Demander de l'aide, tenir un désaccord technique
├── 27_synthese_mini_projects/    # Ce que les mini-projets prouvent ensemble
├── 28_templates/                 # 03-HYPOTHESES.md, 02-POSTMORTEM.md, checklists
├── 29_toolchain/                 # Gestionnaires de paquets, outillage
└── 30_transferability/           # Transfert inter-langages, pool de bugs
```

Les autres fichiers de `06-ANNEXES/` sont des annexes transverses d'une page ou des pièces de support ; leur sommaire complet et ordonné est dans [le README des annexes](README.md).

## RÈGLES DE LECTURE

- **`00_*` avant `01_*`** : les préludes ne sont pas optionnels si tu es débutant absolu.
- **Un module = un `00_why_*.md`** : lis-le en premier, il te dit pourquoi tu es ici.
- **`00-PREREQUIS.md`** : il teste le module précédent. S'il te met en échec, tu remontes.
- **`99A-PONT.md`** : ferme le module courant, respire, puis ouvre le suivant.
- **Les `README.md` de dossier font foi** sur l'ordre du contenu, pas le tri alphabétique.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.
