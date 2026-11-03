---

stability: "evolutif"
last_reviewed: 2026-07
depends_on_vendor: false
acte: évaluer
cognitive_level: L4
perturbation_modes: [fausse_piste, changement_contexte]
anti_recipe_key: fausse_piste+changement_contexte
transfer_distance: low
assessment_role: diagnostic_mastery
source_verified_on: null
freshness_status: "not_verified"
source_url: null
source_type: "internal"
canonical_resource: "05-MAITRISE/07-TOOLS/01-00-why-tools.md"
source_scope: "Notion et parcours internes reliés à 05-MAITRISE/07-TOOLS/01-00-why-tools.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

> **OUTILLAGE ÉVOLUTIF :** les interfaces, versions et intégrations changent. Ce module distingue les gestes transférables (build, format, lint, package) des commandes concrètes à revérifier dans la documentation officielle avant usage.

# 00 : Prereq check : Tools

Temps de lecture ~5 min

> Ce diagnostic est facultatif et non noté. Le module Tools est un atelier transversal : il peut être consulté au moment où tu en as besoin, dès que tu as commencé à écrire et exécuter du code. Il ne suppose pas que tu aies terminé Edge Cases.

## Questions

1. Sais-tu lancer un fichier JavaScript avec Node.js depuis un terminal ?
2. Peux-tu lire une fonction simple, lui transmettre un argument et observer son résultat ?
3. As-tu déjà rencontré `try/catch` pour traiter une erreur sans la masquer silencieusement ?
4. Sais-tu retrouver le dossier courant d’un projet et identifier le fichier que tu veux lancer ?

## Verdict

- **3+ réponses solides** → explore directement les outils et construis les petits scripts proposés.
- **2 ou moins** → révise à la demande les fonctions (`00-SOCLE/04-FUNDAMENTALS/03_functions/`), les modules et le runtime (`02-CONSTRUCTION/13-RUNTIME-ENV/`). Tu peux quand même commencer par observer les démonstrations ; reviens à ces bases lorsque tu en as besoin.

> Ce module enseigne le rôle des outils, la construction d’un logger, d’un benchmark kit, d’un debug toolkit et d’un scaffolder. Les commandes et interfaces évolutives doivent être revérifiées dans la documentation officielle avant réutilisation. Aucune notion d’Edge Cases n’est un prérequis à son démarrage.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.
