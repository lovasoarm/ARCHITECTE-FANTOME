---
stability: evolutif
acte: apprendre
noyau: non
route: depth
freshness_status: "verified_reference"
source_verified_on: "2026-11-03"
source_type: "primary"
canonical_resource: "05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/10-graphrag-code-graph.md"
source_url: "https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/"
source_scope: "L’annonce officielle Microsoft publiée le 20 octobre 2026 confirme la publication de TypeScript 7.1 en Beta et énumère les six points d’entrée API cités dans le paragraphe de compatibilité : typescript/sync, typescript/async, typescript/fs, typescript/ast, typescript/ast/is et typescript/ast/factory. Il s’agit d’un état annoncé à cette date ; la référence ne valide ni le snippet Compiler API 6.x, ni la résolution des imports, ni l’architecture GraphRAG, ni les performances annoncées."
source_registry_id: "PER-0121"
provenance_note: "Annonce officielle Microsoft consultée le 2026-11-03. La vérification couvre uniquement l’existence de l’annonce Beta et les six points d’entrée cités ; elle ne constitue ni un test du snippet Compiler API ni une revue complète de la leçon."
source_access_status: "OFFICIAL_MICROSOFT_TYPESCRIPT_7_1_BETA_ANNOUNCEMENT_RETRIEVED_2026-11-03"
claim_alignment_status: "TYPESCRIPT_7_1_BETA_ANNOUNCEMENT_AND_SIX_API_ENTRY_POINTS_CONFIRMED_2026-11-03"
claim_reviewed_on: "2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
---

# Leçon-pont 10 : GraphRAG et graphe de connaissance d'un dépôt logiciel

> **Arc Naruto :** lire un dépôt, ce n'est pas juste retrouver un fichier par mot-clé. Il faut comprendre qui appelle qui, quel test protège quelle règle et quelle décision a remplacé l'ancienne.

<!-- AF-DIAGRAM:graphrag -->

## Repère visuel utile : Indexation d’un dépôt

```text
repo@commit -> parser -> symboles + imports + tests + ADR
                              |
                         graphe versionné
                              |
question -> recherche ciblée + traversal
                              |
                sources (SHA, chemin, lignes)
                              |
                      réponse / inconnu
```

<!-- AF-LESSON-PROFILE: graphrag -->

## Résultat attendu

Construire un index traçable d'un dépôt, créer des relations utiles entre fichiers, symboles, tests, services et décisions, puis combiner navigation structurée et recherche documentaire. Savoir quand un simple RAG suffit.

## Pourquoi un graphe ?

La recherche vectorielle retrouve des passages similaires. Elle ne sait pas toujours répondre à « quels services dépendent de ce contrat ? » ou « quel test couvre cette décision ? ». Un graphe encode ces relations explicitement.

```text
Repo @ commit SHA
   |
   +--> fichiers --> symboles --> imports/appels
   |                    |
   +--> tests --------- couvre ----> exigences
   |
   +--> ADR --------- remplace ----> ADR précédent
   |
   +--> services ---- dépend de ---> services

Question -> recherche lexicale/vectorielle + traversée ciblée
        -> sources exactes (commit, chemin, lignes)
        -> réponse / incertitude / contradiction
```

## Notions à apprendre

- **Index immuable par commit** : chaque résultat est lié à un SHA. Si HEAD change, le système signale que l'index est en retard.
- **Parsing** : lire d'abord la structure disponible (imports, déclarations, routes, tests, manifests). Un AST (arbre syntaxique abstrait) représente le code selon sa grammaire ; les regex seules sont fragiles pour analyser un langage.
- **Nœuds et relations** : fichier, symbole, test, exigence, ADR, service ; `imports`, `calls`, `tests`, `implements`, `depends_on`, `supersedes`. Chaque relation a une provenance et un degré de confiance.
- **Recherche hybride** : combiner exact, lexical, vectoriel et graphe selon la question. Toutes les questions ne nécessitent pas une traversée.
- **GraphRAG** : le graphe aide à sélectionner/organiser le contexte ; il ne remplace ni les sources ni l'évaluation.
- **Citations** : chemin, commit et lignes/sections exactes. Une arête inférée doit être marquée comme telle.
- **Contrôle d'accès** : permissions appliquées avant indexation/retrieval et testées sur caches, snippets et résumés.

## Mini-leçon : lire un AST et en extraire des relations

Un AST (arbre syntaxique abstrait) est la représentation structurée d'un fichier après analyse grammaticale. Il n'est pas encore ton graphe de connaissances : tu parcours l'arbre, extrais des faits, puis construis tes propres nœuds et arêtes.

Pour un premier MVP, limite-toi à TypeScript/JavaScript et aux imports statiques. Consulte la [Compiler API de TypeScript](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API). Pour ajouter d'autres langages plus tard, [Tree-sitter](https://tree-sitter.github.io/tree-sitter/) est une option, pas une dépendance obligatoire.

```ts
import * as ts from "typescript";

const source = `import { save } from "./store";\nsave("booking");`;
const file = ts.createSourceFile(
  "sample.ts",
  source,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TS,
);

function visit(node: ts.Node): void {
  if (ts.isImportDeclaration(node)) {
    console.log("IMPORT", node.moduleSpecifier.getText(file));
  }
  if (ts.isCallExpression(node)) {
    console.log("CALL", node.expression.getText(file));
  }
  ts.forEachChild(node, visit);
}
visit(file);
```

Ce bout de code montre le principe, pas un analyseur complet : il ne résout pas les chemins, les alias, les appels dynamiques ni la sémantique de surcharge. Ajoute une résolution déterministe des imports, des tests sur fixtures et la provenance `commit + chemin + lignes`. Si le graphe ne peut pas prouver un appel, classe la relation comme inconnue ou inférée, jamais comme certaine.

**Compatibilité de version : important :** cet exemple utilise l’ancienne Compiler API de TypeScript. Pour le reproduire tel quel, épingle `typescript@6.0.x` dans le `package-lock.json` et conserve cette version dans les preuves. La documentation Compiler API liée décrit TypeScript 6.0 et antérieurs. L’équipe TypeScript a annoncé **TypeScript 7.1 Beta le 20 octobre 2026**. L’annonce décrit six points d’entrée : `typescript/sync` (client compilateur synchrone), `typescript/async` (équivalent fondé sur les Promises), `typescript/fs` (systèmes de fichiers complets et en couches, contextualisés à la requête), `typescript/ast` (types et enums de l’AST), `typescript/ast/is` (gardes de types de nœuds) et `typescript/ast/factory` (fonctions de création et de mise à jour immuable). Au contrôle du 2 novembre 2026, cette annonce bêta est la référence vérifiée ici ; ne traite pas une bêta comme une version stable et ne copie pas le snippet 6.x dans un projet 7.1 en supposant qu’il fonctionne. La migration n’est pas un prérequis de ce projet : avant de changer de version, relis les notes officielles applicables, adapte l’adaptateur AST et rejoue toutes les fixtures. Voir [l’annonce officielle TypeScript 7.1 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/) et [l’annonce TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/).

**Exercice de préparation :** indexe trois fichiers TypeScript, extrais les imports et appels statiques, relie chaque symbole à son fichier, puis vérifie les arêtes contre une revue manuelle. Change un import et prouve que le graphe est recalculé.

## Quand l'utiliser / quand l'éviter

Utilise un graphe si les questions portent sur des relations et des dépendances qui sont difficiles à retrouver par simple similarité. Si le corpus est petit et les questions simples, un moteur de recherche lexical ou un RAG classique est moins coûteux. N'ajoute pas Neo4j ou une base graphe par prestige : un graphe stocké en mémoire ou SQLite peut suffire au prototype.

## Limites

Le parsing dépend du langage et peut être incomplet. Les appels dynamiques, réflexion, génération de code et dépendances externes compliquent l'analyse. Une relation `calls` peut être estimée et non prouvée. Un graphe périmé produit une confiance fausse. Les citations doivent ramener à des sources réelles.

## Leçons AF à faire

- [Lecture d'une codebase](../../../03-PILOTAGE/10-TEAM-CRAFT/05-navigate_codebase.md), [Architecture boundaries](../../../02-CONSTRUCTION/15-ARCHI-LAB/02-boundaries-and-coupling.md) et [dependencies](../../../02-CONSTRUCTION/15-ARCHI-LAB/03-layers-and-flow.md).
- [Data Structures : Graphs](../../../02-CONSTRUCTION/06-DATA-STRUCTURES/08_graphs/02-graph_basics.md).
- [RAG/recherche hybride](01-rag-recherche-hybride.md), [évaluation IA](02-evaluation-et-llm-judge.md) et [RAG Blindé](../03-rag-blinde.md).
- [ADR writing](../../../03-PILOTAGE/10-TEAM-CRAFT/03-adr_writing.md) et [design reviews](../../../03-PILOTAGE/10-TEAM-CRAFT/README.md).

## Mécanisme : le modèle mental à retenir

La maîtrise se vérifie quand tu peux construire une petite tranche, expliquer chaque frontière, observer les erreurs, puis modifier le système sans casser ses invariants.

## Ancrage produit / terrain : Kintana

Utilise un dépôt et des données de laboratoire associés à Kintana. Étiquette les résultats `LAB` ou `SIMULATION` tant qu'aucun système réel n'est exploité. Garde les commandes, les versions, les entrées, les sorties et les limites dans le dossier de preuve.

## Mission utile : Staff Engineer de Poche

Indexe un dépôt réel que tu as le droit d'analyser. Au départ, couvre Markdown, TypeScript/JavaScript et tests avec imports explicites. Versionne le graphe par commit, produis 3 relations prouvées et marque les relations incertaines. Réponds à des questions de dépendance et de couverture.

**Livrable :** schéma du graphe, pipeline d'indexation, mapping commit/fichier/lignes, dataset de questions, rapport de citations et comparaison avec un RAG sans graphe.

**Critère de sortie :** chaque affirmation importante mène à une source vérifiable ; l'assistant indique « inconnu » quand l'analyse statique ne peut pas prouver la relation ; il détecte un index obsolète et ne traverse pas des fichiers non autorisés.

## Transfert obligatoire

Un refactoring déplace un symbole et modifie une API publique. Prouve comment le graphe est invalidé/recalculé et comment l'assistant évite de citer l'ancienne ligne.

## Références de projet

[10 : Staff Engineer de Poche](../10-staff-engineer-de-poche.md) · [Graph basics](../../../02-CONSTRUCTION/06-DATA-STRUCTURES/08_graphs/02-graph_basics.md).
