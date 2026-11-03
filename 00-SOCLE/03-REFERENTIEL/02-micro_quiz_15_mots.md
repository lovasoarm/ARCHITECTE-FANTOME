---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [constraints_injectees, changement_contexte]
anti_recipe_key: constraints_injectees+changement_contexte
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Micro-quiz : les 15 mots

> **Ressource différée : pas un test d'entrée.** Ce quiz rassemble des termes introduits dans plusieurs parties du curriculum. Ne le passe pas avant d'avoir étudié les notions correspondantes ; tu peux sauter une question dont le sujet n'a pas encore été enseigné.

Temps de réponse indicatif : ~10 min, après les leçons concernées.

## Préparer le quiz

| Groupe                        | Notions                                                          | Ressources à étudier avant le quiz                                                                                                                                                                                                                                                                                                                                  |
| ----------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A : Runtime et exécution      | JIT, runtime, microtasks, event loop, stack trace                | [`01-CADRAGE/02-ASYNC`](../../01-CADRAGE/02-ASYNC/README.md), [`02-CONSTRUCTION/13-RUNTIME-ENV`](../../02-CONSTRUCTION/13-RUNTIME-ENV/README.md), [`01-CADRAGE/03-DEBUGGING`](../../01-CADRAGE/03-DEBUGGING/README.md)                                                                                                                                              |
| B : Types, mémoire, structure | GC, closures, prototypes, immutabilité, hash                     | [`04-FUNDAMENTALS/02_scope`](../04-FUNDAMENTALS/02_scope/README.md), [`05-MEMORY-PERFORMANCE`](../../02-CONSTRUCTION/05-MEMORY-PERFORMANCE/README.md), [`06-DATA-STRUCTURES`](../../02-CONSTRUCTION/06-DATA-STRUCTURES/README.md), [`09-FUNCTIONAL-JS`](../../02-CONSTRUCTION/09-FUNCTIONAL-JS/README.md), [`17-OOP-JS`](../../02-CONSTRUCTION/17-OOP-JS/README.md) |
| C : Discipline et hygiène     | reproduction déterministe, hypothèse testable, flaky, a11y, i18n | [`03-DEBUGGING`](../../01-CADRAGE/03-DEBUGGING/README.md), [`03-TESTING`](../../02-CONSTRUCTION/03-TESTING/README.md), [`WEB-INCLUSIVE`](../../03-PILOTAGE/02-WEB-INCLUSIVE/README.md)                                                                                                                                                                              |

Les nombres de blocs d'anciennes versions ont été retirés : ils ne correspondaient pas à une séquence unique, vérifiable par l'apprenant. Le bon repère est la liste des notions et des ressources ci-dessus.

## Groupe A : Runtime et execution

1. **JIT** signifie :
   a) Just-In-Time compilation
   b) Java Interface Toolkit
   c) JSON Iteration Template
   -> reponse en fin de fichier.
2. Le **runtime** JavaScript, c'est :
   a) le langage plus la spec
   b) le langage plus l'environnement qui l'execute (V8, event loop, API host)
   c) la vitesse d'execution
3. Un **microtask** :
   a) une tache OS courte
   b) une tache de la microtask queue exécutée avant le prochain macrotask
   c) un web worker leger
4. L'**event loop** :
   a) une boucle infinie qui polle les evenements DOM
   b) le coordinateur qui prend les taches de la call stack, macrotask queue,
   microtask queue selon des regles precises
   c) un pattern reactif de type RxJS
5. Le **stack trace** :
   a) la trace reseau
   b) la pile d'appels reconstituee au moment d'une erreur
   c) le log des exceptions non gerees

## Groupe B : Types, memoire, structure

6. **GC** (garbage collector) :
   a) supprime les fichiers inutiles du disque
   b) libere la memoire des objets JS plus atteignables depuis les racines
   c) compresse les JSON
7. Une **closure** :
   a) une fonction anonyme
   b) une fonction qui capture les variables de sa portee de definition
   c) une IIFE
8. **Prototype** :
   a) une maquette de design
   b) le lien qu'un objet a vers un autre objet pour heriter de proprietes
   c) un synonyme de classe
9. **Immutabilite** :
   a) une valeur qu'on peut modifier une seule fois
   b) une valeur qu'on ne modifie pas apres creation, les operations
   renvoient une nouvelle valeur
   c) une constante `const`
10. Un **hash** (contexte structures de donnees) :
    a) un tag sur les reseaux sociaux
    b) une empreinte deterministe d'une entree, taille fixe, utilisee
    comme index rapide
    c) un mot de passe chiffre

## Groupe C : Discipline et hygiene (reperes transversaux)

11. **Repro deterministe** :
    a) un test qui passe une fois sur deux
    b) un scenario minimal qui declenche le bug **a chaque execution**
    c) un mocking parfait
12. **Hypothese testable** :
    a) une intuition que tu ecris
    b) une affirmation falsifiable dont on peut prouver la faussete par
    une experience precise
    c) une opinion argumentee
13. **Flaky** :
    a) un dev fatigue
    b) un test dont le resultat depend de conditions non maitrisees
    (timing, ordre, reseau)
    c) un pattern GoF
14. **a11y** signifie :
    a) accessibility (a + 11 lettres + y)
    b) allocation
    c) version 11 alpha
15. **i18n** signifie :
    a) internationalisation (i + 18 lettres + n)
    b) une norme IEEE
    c) un middleware Express

## Reponses

1.a 2.b 3.b 4.b 5.b 6.b 7.b 8.b 9.b 10.b 11.b 12.b 13.b 14.a 15.a

## Verdict

- 13-15 : tu restitues correctement les termes testés. Continue la route prévue ; ce résultat ne dispense pas des exercices.
- 10-12 : repère les questions ratées et retourne uniquement aux leçons liées dans le tableau de préparation.
- < 10 : note les notions inconnues et reprends-les une par une. Ne relis pas tout le curriculum et ne considère pas ce score comme un échec d'entrée.

Ce quiz ne donne pas l'autorisation d'entrer dans un bloc et ne bloque aucune progression. Il mesure seulement le rappel de notions déjà étudiées.

## CHECKPOINT DE PROFONDEUR : facultatif après étude des notions testées

### Variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.

### Approfondissement facultatif : à faire plus tard

La pratique ci-dessous est volontairement plus exigeante que le quiz. Elle n'est pas attendue pendant la première passe du Référentiel et ne conditionne aucune progression.

### Pratique autonome : rappel ciblé facultatif

Choisis une question dont la notion a déjà été étudiée. Réponds sans regarder le corrigé, puis vérifie dans la leçon d'origine. Note le mot ou l'explication à revoir. Ne travaille pas les questions qui concernent des modules non encore étudiés.

**Preuve à conserver :** une réponse personnelle et le nom de la leçon utilisée pour vérifier.

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

Kintana est un cas fictif ; ce quiz sert uniquement à réviser des mots déjà enseignés. Il ne demande aucune mission technique Kintana.

## Mission utile : rappel ciblé, jamais test d'entrée

**Livrable et critères d’acceptation :** une réponse à une seule question portant sur une notion déjà étudiée, avec le lien vers sa leçon d’origine. Les questions non étudiées sont ignorées sans pénalité ; le quiz n’est pas requis pour entrer dans Fundamentals.

Choisis seulement les questions dont tu as déjà étudié les notions dans leur module d'origine. Ignore les autres sans pénalité. Si tu n'as pas encore étudié les termes d'une question, ne tente pas de deviner.

### Transfert : plus tard

L'application de ces notions dans un autre service ou langage sera traitée après l'enseignement des prérequis correspondants.
