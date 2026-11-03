---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L4
perturbation_modes: [preuve_partielle, fausse_piste]
anti_recipe_key: preuve_partielle+fausse_piste
transfer_distance: low
assessment_role: diagnostic_mastery
---

**SCÈNE CRAZYDEVS : Naruto :** avant de lancer le jutsu, tu vérifies ton chakra, ton terrain et ce que tu crois savoir. Ici, le piège est de coder avant d’avoir compris.

> **CrazyDevs : briefing de mission :** ce concept doit survivre au moment où quelqu’un te demande « pourquoi ? » en plein chaos. Garde l’explication technique exacte, puis donne-lui une image qu’on peut raconter demain.

# SCOPE GLOSSARY : Les Mots Que Tu Dois Maîtriser

Temps de lecture ~7 min

> Si tu ne comprends pas ces mots, tu ne comprends pas vraiment comment JavaScript exécute ton code.

Le scope détermine **qui** peut accéder à une variable et **où** elle existe dans le programme.

---

| Terme                        | Définition                                                                                                      | Code                                                                                                                                       | Analogies                                                                                                                                                              |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Scope**                    | Zone dans laquelle une variable est accessible                                                                  | `let x = 10;` `function fn() { console.log(x); }` `fn(); // 10`                                                                            | Une maison avec des pièces : une variable dans une pièce n'existe pas dans une autre / Un badge d'accès : tu entres seulement là où ton badge fonctionne               |
| **Global Scope**             | Environnement principal : variables accessibles partout dans le programme                                       | `let hero = "Naruto";` `function show() { console.log(hero); }` `show(); // Naruto`                                                        | Le couloir principal de l'immeuble : tout le monde y passe / La salle commune d'une auberge : accessible à tous                                                        |
| **Local Scope**              | Scope limité à une fonction : la variable meurt à la fin de la fonction                                         | `function fn() { let secret = "hidden"; }` `console.log(secret); // ReferenceError`                                                        | Ta chambre d'hôtel : personne d'autre n'y entre / Le bureau d'un employé : ses affaires restent dans son bureau                                                        |
| **Block Scope**              | Scope créé par un bloc `{}` avec `let` ou `const` : `var` l'ignore                                              | `if (true) { let potion = "Health"; }` `console.log(potion); // ReferenceError`                                                            | Un casier de vestiaire : ce qui est dedans reste dedans / Une salle de réunion réservée : ce qui s'y dit ne sort pas                                                   |
| **Lexical Scope**            | Le scope dépend de l'endroit où la fonction est **écrite**, pas où elle est **appelée**                         | `function outer() { let x = "O"; function inner() { console.log(x); } inner(); }` `outer(); // "O"`                                        | Un enfant garde l'accent de la ville où il a grandi, peu importe où il vit maintenant / Un document garde le tampon du bureau où il a été signé                        |
| **Closure**                  | Fonction qui se souvient des variables de son environnement extérieur même après la mort de la fonction parente | `function makeCounter() { let count = 0; return function() { count++; return count; }; }` `const c = makeCounter(); c(); // 1`             | Un cuisinier qui quitte un restaurant mais garde toutes ses recettes / Un enfant qui part de chez ses parents mais garde les habitudes de la maison                    |
| **Scope Chain**              | Chaîne de scopes remontée par JS pour trouver une variable : actuel --> parent --> global                       | `let g = "G"; function outer() { let o = "O"; function inner() { console.log(g, o); } inner(); }` `outer(); // G O`                        | Un employé qui cherche un document : bureau perso --> bureau du manager --> archives / Un enfant qui demande à sa mère, qui demande à la grand-mère                    |
| **Variable Shadowing**       | Variable locale qui masque une variable du scope parent avec le même nom                                        | `let name = "Global"; function fn() { let name = "Local"; console.log(name); }` `fn(); // Local` `console.log(name); // Global`            | Un homonyme dans la même entreprise : le local prend le dessus / Un panneau de rue local qui recouvre l'ancienne indication                                            |
| **Hoisting**                 | Déclarations de variables et fonctions déplacées en haut du scope avant exécution                               | `console.log(x); // undefined` `var x = 5;` `sayHi(); // fonctionne` `function sayHi() { console.log("Hi"); }`                             | Un maître d'hôtel qui prépare ta table avant que tu arrives / Un réalisateur qui installe les décors avant le tournage                                                 |
| **Temporal Dead Zone (TDZ)** | Zone où `let` ou `const` existe mais ne peut pas être utilisée avant sa déclaration                             | `console.log(x); // ReferenceError` `let x = 10;` `console.log(x); // 10`                                                                  | Une chambre d'hôtel réservée mais pas encore prête : elle existe, tu ne peux pas entrer / Un colis expédié mais pas encore livré                                       |
| **IIFE**                     | Fonction exécutée immédiatement après sa création pour créer un scope isolé                                     | `(function() { let secret = "isolé"; console.log(secret); })();` `console.log(secret); // ReferenceError`                                  | Un feu d'artifice allumé et explosé aussitôt : vit et meurt sur place / Un post-it écrit, lu et jeté dans la seconde                                                   |
| **Execution Context**        | Environnement créé à chaque exécution de fonction : contient les variables, `this` et la scope chain            | `function fn() { let x = 1; }` `fn(); // nouveau contexte` `fn(); // nouveau contexte recréé`                                              | Une scène de théâtre qui se reconstruit à chaque acte / Un nouveau chantier ouvert avec ses propres ouvriers à chaque fois                                             |
| **Callback Scope**           | Fonction passée dans une autre qui garde accès à son scope d'origine                                            | `function outer() { let msg = "Hello"; setTimeout(function() { console.log(msg); }, 100); }` `outer(); // Hello`                           | Un ambassadeur envoyé à l'étranger qui garde ses lois nationales / Un étudiant en échange qui garde les règles de son université                                       |
| **Closure Memory Trap**      | Une closure garde des variables en mémoire et peut bloquer le garbage collector                                 | `function trap() { let big = new Array(1000000); return function() { return big.length; }; }` `const fn = trap(); // big reste en mémoire` | Un entrepôt qui stocke des caisses dont personne ne veut mais que personne n'ose jeter / Un ex qui garde toutes tes affaires : la place est occupée, rien n'est libéré |

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.

<!-- AF-DIAGRAM:scope -->

## Repère visuel utile : Contexte sûr des handlers Kintana

```text
création de la fonction
      | capture l'environnement lexical
      v
closure(handler) -----> requestId / role
      |
      v
dispatcher appelle plus tard
      |
      +--> paramètres explicites
      +--> closure conservée
      +--> `this` dépend du call-site
```

<!-- AF-LESSON-PROFILE: scope -->

## Repères de décision

- **Pourquoi :** La portée et les closures contrôlent quelles données une fonction peut lire et combien de temps elles restent accessibles. Cela évite les états cachés et les callbacks qui perdent leur contexte.
- **Quand l’utiliser / quand l’éviter :** Utilise une fermeture pour encapsuler un état privé ou garder un contexte stable dans un callback. Préfère un paramètre explicite quand la dépendance doit être visible ou remplacée en test.
- **Limites :** Une closure peut prolonger la durée de vie d'objets et créer une fuite mémoire. `this` dépend du mode d'appel pour les fonctions classiques ; une flèche capture le `this` lexical et ne peut pas être rebondie avec `call`/`bind`.

## Mécanisme : la version sans magie

Une fonction lit les bindings de son environnement lexical. Pour `this`, regarde le call-site ; pour une closure, regarde l'endroit où la fonction est créée et les valeurs qu'elle retient.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **SCOPE GLOSSARY : Les Mots Que Tu Dois Maîtriser** se rattache à ce cas concret : Un handler Kintana doit garder l'identité de la demande et le rôle attendu sans lire un global modifiable ni perdre le contexte quand il est passé à une file de callbacks.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Contexte sûr des handlers Kintana

> **Statut Kintana : prolongement intégré différé, facultatif et sans gate supplémentaire.** Les blocs Kintana de Scope réutilisent le même handler de notification : il s'agit d'un seul artefact à faire évoluer, pas d'un exercice complet à recommencer dans chaque leçon. Termine d'abord la pratique locale de la leçon et les étapes canoniques Scope puis Function factories. Reprends le test de passage de callback après le module [Testing](../../../02-CONSTRUCTION/03-TESTING/README.md) ; le déplacement vers un worker n'est qu'une variante ultérieure, après le module Runtime concerné. Aucun worker, module supplémentaire ou test automatisé n'est requis pour valider la première passe Scope.

> **Arc Naruto / Konoha :** chaque équipe connaît son périmètre. Une variable globale qui circule partout, c'est le rouleau secret posé au milieu de la place.

**Mission liée à « SCOPE GLOSSARY : Les Mots Que Tu Dois Maîtriser » :** Construis un handler de notification qui conserve `requestId` et le rôle autorisé. Compare une closure, un paramètre explicite et `bind` selon le besoin. Ajoute un test qui passe le handler à un dispatcher sans changer le résultat ni exposer d'état global.

**Livrable :** un handler isolé, un test de passage de callback, un test de contexte `this` si la leçon le traite et une courte décision sur la portée choisie.

**Critères d’acceptation :** le handler garde le bon identifiant ; le comportement ne dépend pas d'un appel accidentel à travers un objet ; l'état privé n'est pas accessible de l'extérieur ; la durée de vie des références est expliquée.

**Transfert facultatif, à la reprise :** lorsque tu étudieras les modules puis le runtime des workers, compare le contexte disponible dans un module et dans un worker. Pour la première passe, explique simplement avec tes mots pourquoi un worker ne partage pas automatiquement le même contexte JavaScript.
