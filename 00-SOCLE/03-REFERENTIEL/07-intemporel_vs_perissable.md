---
stability: intemporel
acte: comprendre
cognitive_level: L1
perturbation_modes: [solution_concurrente, preuve_partielle]
anti_recipe_key: solution_concurrente+preuve_partielle
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

> **Référence différée :** ne cherche pas à apprendre ce tableau pendant la première passe. Reviens-y après Fundamentals, lorsqu'une leçon te demande de distinguer un principe durable d'un détail d'outil ou de version. Il est normal de ne pas connaître les technologies citées.

# INTEMPOREL vs PERISSABLE (tableau de re-audit)

Temps de lecture ~3 min

Rendre explicite ce que le front-matter `stability:` implique deja : quels
modules restent vrais dans 10 ans, lesquels doivent etre rejoues tous les
2 ans. Tu sais alors quoi rouvrir en 2029.

| Module                                   | Durée de validité estimée | Signal de péremption                                             |
| ---------------------------------------- | ------------------------- | ---------------------------------------------------------------- |
| 00-SOCLE/01-GETTING-STARTED              | 2 ans                     | Node LTS bascule ; nouvel outil de package (bun stable, etc.)    |
| 00-SOCLE/03-REFERENTIEL                  | intemporel                | Nouvelle "pierre" ajoutée au métier                              |
| 00-SOCLE/04-FUNDAMENTALS                 | intemporel                | Changement majeur de la spec ECMAScript                          |
| 00-SOCLE/05-PROBLEM-SOLVING              | intemporel                | :                                                                |
| 01-CADRAGE/02-ASYNC                      | intemporel                | Nouveau primitif de concurrence (au-delà de async/await)         |
| 01-CADRAGE/03-DEBUGGING                  | 5 ans                     | Nouveau DevTools majeur ; nouvel outil de trace                  |
| 01-CADRAGE/04-ERROR-HANDLING             | intemporel                | :                                                                |
| 02-CONSTRUCTION/03-TESTING               | 5 ans                     | Runner par défaut change (Jest -> Vitest -> ?)                   |
| 02-CONSTRUCTION/04-MATH-BASICS           | intemporel                | :                                                                |
| 02-CONSTRUCTION/05-MEMORY-PERFORMANCE    | 5 ans                     | Nouveau GC ; nouveau format de heap snapshot                     |
| 02-CONSTRUCTION/06-DATA-STRUCTURES       | intemporel                | :                                                                |
| 02-CONSTRUCTION/07-ALGORITHMS            | intemporel                | :                                                                |
| 02-CONSTRUCTION/09-FUNCTIONAL-JS         | intemporel                | Nouvelle proposition TC39 (pipeline, records) stabilisée         |
| 02-CONSTRUCTION/10-DESIGN-PATTERNS       | intemporel                | :                                                                |
| 02-CONSTRUCTION/11-REFACTORING           | intemporel                | :                                                                |
| 02-CONSTRUCTION/12-TYPESCRIPT            | 2 ans                     | Bascule majeure TS (strict flags, decorators v2, effect systems) |
| 02-CONSTRUCTION/13-RUNTIME-ENV           | 2 ans                     | Bun/Deno atteint parité Node ; workerd change ; edge dominant    |
| 02-CONSTRUCTION/14-ARCHITECTURE-PATTERNS | 5 ans                     | Nouveau paradigme (au-delà micro-services / event-driven)        |
| 02-CONSTRUCTION/18-WEB-CONCEPTS          | 5 ans                     | HTTP/4 ; nouvelle spec navigateur majeure                        |
| 02-CONSTRUCTION/17-OOP-JS                | intemporel                | :                                                                |
| 03-PILOTAGE/02-WEB-INCLUSIVE             | 5 ans                     | Nouvelle version WCAG ; nouveau standard i18n                    |
| 04-EPREUVE/03-REALTIME                   | 5 ans                     | WebTransport remplace WebSocket dominant                         |
| 02-CONSTRUCTION/19-API-CRAFT             | 5 ans                     | REST remplacé par gRPC / GraphQL / autre en majorité             |
| 03-PILOTAGE/04-SECURITY                  | 2 ans                     | Nouvelle famille d'attaques ; nouvelle version OWASP Top 10      |
| 04-EPREUVE/04-BIG-APP-SNOOP              | 2 ans                     | Nouveau paradigme d'assistance (au-delà du chat + suggestions)   |
| 05-MAITRISE/01-DATABASES                 | 5 ans                     | Nouveau modèle (vectoriel dominant ; SQL sur objets, etc.)       |
| 05-MAITRISE/02-SCALABILITY               | 5 ans                     | Nouveau modèle de déploiement (edge partout ; serverless v2)     |
| 03-PILOTAGE/05-OBSERVABILITY             | 5 ans                     | OpenTelemetry remplacé ; nouveau standard de trace               |
| 03-PILOTAGE/10-TEAM-CRAFT                | intemporel                | :                                                                |
| 05-MAITRISE/03-EDGE-CASES                | intemporel                | :                                                                |
| 05-MAITRISE/03-EDGE-CASES                | 2 ans                     | Nouveau protocole d'agent (MCP successor, etc.)                  |
| 02-CONSTRUCTION/02-MINI-PROJECTS         | 5 ans                     | Stack de référence obsolète ; sujet plus représentatif du métier |
| 05-MAITRISE/06-ANNEXES                   | intemporel                | :                                                                |
| 05-MAITRISE/07-TOOLS                     | 2 ans                     | Outillage dominant remplacé (bundler, linter, formatter)         |

## Comment se servir de ce tableau

- **Chaque 2 ans** : re-audit des lignes "2 ans". Priorité absolue.
- **Chaque 5 ans** : re-audit des lignes "5 ans".
- **Intemporel** : ne veut pas dire "à ne jamais toucher" ; veut dire "aucun signal externe n'impose de re-auditer". Tu re-auditeras si un signal apparaît.

Ce tableau est lui-même à ré-auditer tous les 2 ans.

## CHECKPOINT DE PROFONDEUR : différé après Fundamentals et Problem Solving

### Variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

### Exemple travaillé : cas métier

**Exemple résolu (fictif).** Une équipe connaît déjà le principe durable « une requête HTTP possède une méthode, une cible et un statut ». Elle consulte une documentation fournisseur où la commande `vendor deploy --region=...` et le nom de l'option `apiVersion` ont changé entre deux versions. Elle conserve le principe HTTP dans sa base de connaissances, mais inscrit la commande et le nom d'option avec la version exacte, la date de vérification et la page officielle consultée. **Décision :** ne pas revalider le principe HTTP à chaque mise à jour d'outil ; revalider la commande et l'option avant le prochain déploiement. **Pourquoi :** la sémantique du protocole est durable, l'interface du fournisseur peut évoluer.

**À toi :** Une documentation d’API change : sépare les concepts durables (HTTP, contrats, invariants) des détails périssables (version, commande, option fournisseur). Construis un cas minimal qui illustre « INTEMPOREL vs PERISSABLE (tableau de re-audit) » avec des données concrètes. Décris l’état initial, une seule opération, l’état final attendu et la raison pour laquelle ce résultat est correct.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:reference -->

## Repère visuel utile : Référentiel de compétences par preuves

```text
compétence -> tâche observable -> artefact
     ^                         |
     |                         v
révision datée <- verdict <- critère explicite
     |
     +-> remédiation ou nouvelle preuve
```

<!-- AF-LESSON-PROFILE: reference -->

## Repères de décision

- **Pourquoi :** Un référentiel sert à rendre les compétences observables et à éviter de confondre familiarité, autonomie et maîtrise.
- **Quand l’utiliser / quand l’éviter :** Utilise-le pour établir un point de départ, prioriser une révision ou préparer une revue de portfolio. Ne l'utilise pas comme classement de valeur personnelle.
- **Limites :** Une auto-évaluation est biaisée. Le niveau doit être confirmé par une tâche inconnue, un artefact reproductible et, aux paliers avancés, une revue externe.

## Mécanisme : la version sans magie

Associe une compétence à une tâche, un critère, une preuve, une date et un statut. Réévalue quand le contexte ou la technologie change.

## Ancrage produit / terrain : Kintana

Kintana pourra servir plus tard à distinguer des principes de conception et des choix d'outils. Aucune analyse de son API, de sa persistance ou de ses versions n'est demandée à ce stade.

## Mission utile : exemple accessible

Dans Getting Started, la commande `node index.js` est un détail pratique de l'environnement utilisé. L'idée plus durable est qu'un programme doit être exécuté par un environnement capable de le comprendre. Note ces deux éléments dans deux colonnes : « détail à vérifier » et « idée générale ». Il n'est pas nécessaire de connaître d'autres runtimes.

### Transfert : après l'apprentissage

Lorsque tu étudieras un autre environnement d'exécution, tu pourras comparer ce qui change et ce qui reste identique. Cette comparaison est différée.
