---
stability: intemporel
acte: pratiquer
route: survie
cognitive_level: L4
perturbation_modes: [changement_echelle, decision_inversee]
anti_recipe_key: changement_echelle+decision_inversee
transfer_distance: medium
assessment_role: diagnostic_mastery
---

# Challenge : `04-FUNDAMENTALS`

Ce challenge se réalise **après les douze étapes de la route canonique**. Il rassemble les preuves déjà prévues ; il n'ajoute ni nouveau cours, ni projet d'application obligatoire.

Tu ne dois pas encore avoir choisi ton fil rouge personnel : sa qualification définitive intervient pendant le Cadrage. Pour ce challenge, travaille dans un dossier d'exercices local, par exemple `scratch/fundamentals/`, ou dans les fichiers de pratique indiqués. **Un dépôt Git, un projet personnel, Kintana, React, Next.js ou un service externe ne sont pas nécessaires. Les six pratiques Web Basics de première passe utilisent JavaScript natif ; les intégrations React/Next.js 50–55 restent différées.**

## 1. Pratiques de première passe : dans l'ordre de la route

Fais chaque pratique après sa leçon. Ne commence pas une ligne avant d'avoir étudié les notions qu'elle utilise.

### Étape 1 : Variables, Passage A

1. [Introduction aux variables : pratique](01_variables/50-intro_variables_minimini_projet.md)
2. [Binding : pratique](01_variables/51-a_binding_minimini_projet.md)
3. [`var`, `let`, `const` : pratique](01_variables/52-b_var_let_const_minimini_projet.md)

### Étape 2 : Contrôle de flux

4. [Conditions et boucles : pratique](FOUNDATIONS/01_CONTROL_FLOW/50-control-flow-minimini.md)

### Étape 3 : Data Basics

5. [Tableaux et objets élémentaires : pratique](FOUNDATIONS/02_DATA_BASICS/50-data-basics-minimini.md)

### Étape 4 : Function essentials

6. [Déclarer, appeler et utiliser `return` : pratique](03_functions/50-function_essentials_minimini_projet.md)

### Étape 5 : Types

7. [Types primitifs : pratique](04_types/50-primitives_minimini_projet.md)
8. [Conversions de types : pratique](04_types/51-type_coercion_minimini_projet.md)
9. [Transformations de types : pratique](04_types/52-type_transformers_minimini_projet.md)

### Étape 6 : Fonctions avancées : valeurs et callbacks

Lis [Functions as objects](03_functions/02-function_basics.md), puis [Higher-order functions](03_functions/03-hof_map_filter.md). Réalise la mission locale de chaque leçon. Ces missions sont la pratique de cette étape ; les projets React/Next.js listés plus bas ne les remplacent pas.

### Étape 7 : Scope

10. [Scope : pratique](02_scope/50-scope_basics_minimini_projet.md)
11. [Scope lexical : pratique](02_scope/51-b_lexical_scope_visualized_minimini_projet.md)
12. [Closures : pratique](02_scope/52-closure_trap_minimini_projet.md)
13. [`this` : pratique](02_scope/53-this_context_minimini_projet.md)

### Étape 8 : Variables, Passage B

Reviens aux références et à la mémoire seulement maintenant.

14. [Stack et Heap : pratique](01_variables/53-c_stack_heap_minimini_projet.md)
15. [Références : pratique](01_variables/54-reference_chaos_minimini_projet.md)
16. [Mutations : pratique](01_variables/55-mutation_madness_minimini_projet.md)
17. [`const` et objets : pratique](01_variables/56-const_trap_minimini_projet.md)

### Étape 9 : Function factories

Après Scope, lis [Function factory](03_functions/04-function_factory.md) et réalise sa mission locale. Le projet Portfolio associé reste différé ; il n'est pas nécessaire pour comprendre la notion.

### Étape 10 : Web Basics

18. [DOM natif : pratique](05_web_basics/40-dom-natif-premiere-passe.md)
19. [Fetch local : pratique](05_web_basics/41-fetch-local-premiere-passe.md)
20. [Storage : préférence locale : pratique](05_web_basics/42-storage-preference-premiere-passe.md)
21. [Templates natifs : pratique](05_web_basics/43-template-natif-premiere-passe.md)
22. [Web Helpers natifs : pratique](05_web_basics/44-web-helpers-natif-premiere-passe.md)
23. [Scope isolé natif : pratique](05_web_basics/45-scope-isole-natif-premiere-passe.md)

Consulte le `SETUP.md` local avant une activité qui nécessite un navigateur, un serveur ou un autre outil. Si une dépendance ou un accès externe manque, consigne le blocage et utilise uniquement l'alternative documentée ; ne prétends pas avoir exécuté ce qui ne l'a pas été.

### Étape 11 : Modules

24. [Import / export : pratique](06_modules/50-import_export_minimini_projet.md)
25. [Patterns de modules : pratique](06_modules/51-module_patterns_minimini_projet.md)

### Étape 12 : Regex

26. [Regex de base : pratique](07_regex/50-regex_basics_minimini_projet.md)
27. [Regex et validation : pratique](07_regex/51-regex_combat_minimini_projet.md)
28. [Regex et extraction : pratique](07_regex/52-regex_extractor_minimini_projet.md)

## 2. Ressources différées ou complémentaires : non bloquantes

Ces ressources ne font pas partie de la première gate. Ouvre-les seulement après leurs prérequis :

- [Git Core](02A-git_core.md) et [sa pratique](50-git_core_minimini_projet.md) : lorsque la route demande Git ; Git n'est pas un prérequis pour apprendre les variables ou les fonctions.
- Les extensions React/Next.js Web Basics [50 à 55](05_web_basics/README.md) : après étude de React/Next.js et de leurs prérequis ; elles ne remplacent aucune des six pratiques natives obligatoires ci-dessus.
- [ProjectCard React/JSX](03_functions/50-function_basics_minimini_projet.md) et [catalogue React/Next.js](03_functions/51-hof_map_filter_minimini_projet.md) : projets Portfolio différés ; ils supposent des prérequis d'interface et d'environnement qui ne sont pas enseignés dans cette première passe.
- [Pratique Portfolio Function factory](03_functions/52-function_factory_minimini_projet.md) : après Scope, les closures et les prérequis du Portfolio.
- [Expliquer les closures à trois publics](03A-expliquer_a_3_publics_closures.md) : approfondissement après Scope.
- [Exercice de lecture](04A-EXO_LECTURE.md), [vérifications complémentaires](11_EXO_VERIFICATION.md), [vérification 12](12_EXO_VERIFICATION.md), [vérification 97](97-EXO-VERIFICATION.md) et [vérification 98](98-EXO-VERIFICATION.md) : utilise-les après les notions correspondantes. Les activités faisant intervenir une IA restent facultatives.
- [Portage mental](99-PORTAGE-MENTAL.md) et [pont vers la résolution de problèmes](99A-PONT.md) : ressources de transfert après les notions concernées.

Les approfondissements différés liés à Kintana, le cas d'étude pédagogique commun, ne créent aucune gate supplémentaire. Kintana ne devient pas automatiquement ton fil rouge personnel.

## 3. Ce qui valide le challenge : les quatre actes

À la fin des douze étapes :

- [ ] Les 28 pratiques de première passe ci-dessus sont réalisées ; si une pratique dépend d'un outil indisponible, son blocage précis et l'alternative documentée sont consignés sans déclarer la pratique exécutée.
- [ ] Les missions locales des leçons « Functions as objects », « Higher-order functions » et « Function factory » sont réalisées après leurs prérequis.
- [ ] **Construire :** tu reprends une pratique locale, tu la réalises ou la modifies et tu observes son résultat. Le livrable reste dans `scratch/fundamentals/` ou ton journal ; aucun dépôt de fil rouge personnel n'est requis.
- [ ] **Expliquer :** tu décris en cinq lignes ce que le programme fait, avec des mots simples.
- [ ] **Justifier :** tu expliques pourquoi tu as retenu cette solution plutôt qu'une autre et quel critère a fait la différence.
- [ ] **Défendre :** un contradicteur examine son point faible et tu réponds par écrit. Si aucun pair n'est disponible, formule toi-même une objection précise à partir d'un cas limite, puis réponds-y ; cette solution de repli ne prétend pas être une revue indépendante.
- [ ] Tu modifies une entrée ou une condition, prédis le résultat avant l'exécution, puis compares ta prédiction au résultat observé.
- [ ] Tu conserves une preuve datée et une prochaine action dans [PROGRESSION.md](../../PROGRESSION.md).

Pour garder une preuve exploitable, choisis **une seule pratique élémentaire** parmi celles du début du parcours et consigne : l'objectif, ce que tu as écrit ou modifié, le résultat attendu et observé, le cas limite, la décision retenue et l'objection à laquelle tu as répondu. La preuve peut rester un fichier texte dans ton dossier de pratique ou dans ton journal.

Aucun déploiement, dépôt de projet personnel, contradicteur externe obligatoire, calcul de coût ou portage multi-langage n'est demandé ici. L'exercice est une validation de fondamentaux, pas un mini-projet de production.

> **Statut pour la première passe : différé.** Le checkpoint suivant est un approfondissement ; il n'est pas une gate et ne bloque jamais la route canonique.

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.

---

**Règle de progression :** une lecture ne valide pas une pratique ; une pratique non exécutée n'est pas déclarée exécutée ; un blocage documenté n'est pas un échec personnel, mais il reste une preuve manquante à reprendre lorsque l'environnement sera disponible.
