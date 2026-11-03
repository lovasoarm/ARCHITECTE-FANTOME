---
stability: stable
acte: parcours
noyau: oui
route: complete
---

# 04-FUNDAMENTALS : Les briques de base

Ce module est le **premier apprentissage technique** du curriculum. Tu peux commencer sans connaître JavaScript. Le test d'entrée (`00-PREREQUIS.md`) sert à repérer ce que tu sais déjà ; ne rien savoir est une réponse normale et n'empêche jamais de commencer.

Chaque thème suit le même principe : **comprendre une notion → voir un exemple → pratiquer → vérifier ce que l'on a compris**. Ne cherche pas à mémoriser toutes les définitions avant d'écrire du code.

## Première passe : obligatoire et différé

- **À faire maintenant :** suis la route canonique ci-dessous, dans l'ordre. Termine la pratique de base associée à chaque notion avant de passer à la suivante.
- **À différer :** les sections intitulées `CHECKPOINT DE PROFONDEUR`, `Défi avancé facultatif` ou `Approfondissement facultatif`, sauf lorsqu'une route les désigne explicitement comme une pratique de base. Elles peuvent demander des notions, outils ou contextes qui ne sont pas encore étudiés ; elles ne sont pas des gates et ne bloquent jamais la première progression.
- **À différer également :** les sections `Approfondissement différé  : livraison produit Kintana`. Elles ne remplacent pas la pratique locale. Cette livraison produit ne conditionne pas la validation du sous-module et ne constitue pas une gate de progression.
- **Extensions techniques :** Next.js, framework, outils externes et intégrations restent facultatifs tant que leurs prérequis n'ont pas été étudiés.

### Lire les métadonnées `noyau` sans se tromper

Le champ `noyau` classe le **rôle du dossier dans l'organisation du dépôt** ; il ne suffit pas à décider si une leçon est obligatoire pour toi :

- `noyau: oui` : dossier repère ou entrée centrale à son niveau ;
- `noyau: non` : sous-dossier ou regroupement de ressources, qui peut néanmoins être requis par la route canonique ;
- `noyau: renfort` : ressource de renforcement, à utiliser selon le besoin ou la consigne.

**La route canonique ci-dessous et les statuts explicites `obligatoire`, `différé` ou `facultatif` font autorité pour l'apprenant.** Ainsi, `05_web_basics/README.md` peut porter `noyau: non` tout en étant une étape obligatoire : le tableau de route pointe explicitement vers ce dossier. Ne saute jamais une étape uniquement à cause de la valeur `noyau: non`, et ne rends jamais une activité obligatoire uniquement parce qu'elle porte `noyau: oui`.

## Route canonique : ordre des prérequis

| Ordre | Étape                                     | Ressource                                                                                                                                                 | Ce que tu dois apprendre                                                                                                                                  |
| ----: | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     1 | Variables : Passage A                     | [`01_variables/02-ORDRE_DE_LECTURE.md`](01_variables/02-ORDRE_DE_LECTURE.md), étapes 1 à 3                                                                | Nommer une valeur, comprendre un binding, choisir `const` ou `let`                                                                                        |
|     2 | Contrôle de flux                          | [`FOUNDATIONS/01_CONTROL_FLOW/`](FOUNDATIONS/01_CONTROL_FLOW/README.md)                                                                                   | Décider avec `if / else` et répéter avec `for / while`                                                                                                    |
|     3 | Data Basics                               | [`FOUNDATIONS/02_DATA_BASICS/`](FOUNDATIONS/02_DATA_BASICS/README.md)                                                                                     | Créer, lire et modifier des tableaux et objets simples                                                                                                    |
|     4 | Function essentials                       | [`03_functions/01-function_essentials.md`](03_functions/01-function_essentials.md)                                                                        | Déclarer, appeler une fonction, utiliser paramètres, arguments et `return`                                                                                |
|     5 | Types                                     | [`04_types/`](04_types/README.md)                                                                                                                         | Comprendre les valeurs, conversions et vérifications de type                                                                                              |
|     6 | Fonctions avancées : valeurs et callbacks | [`03_functions/02-function_basics.md`](03_functions/02-function_basics.md), puis [`03_functions/03-hof_map_filter.md`](03_functions/03-hof_map_filter.md) | Passer une fonction en valeur, comprendre un callback et traiter les tableaux avec `map`, `filter`, `reduce`                                              |
|     7 | Scope                                     | [`02_scope/`](02_scope/README.md)                                                                                                                         | Comprendre portée, environnement lexical, closures et `this`                                                                                              |
|     8 | Variables : Passage B                     | [`01_variables/02-ORDRE_DE_LECTURE.md`](01_variables/02-ORDRE_DE_LECTURE.md), étapes 4 à 7                                                                | Comprendre références, mémoire, copies, mutations et `const` avec objets, après Data Basics, callbacks et Scope ; le spread est enseigné dans cette étape |
|     9 | Function factories                        | [`03_functions/04-function_factory.md`](03_functions/04-function_factory.md)                                                                              | Comprendre une fonction qui retourne une fonction, après Scope et les closures                                                                            |
|    10 | Web Basics                                | [`05_web_basics/`](05_web_basics/README.md)                                                                                                               | Relier JavaScript à une page web, aux événements et aux requêtes ; appliquer la fiche courte d'accessibilité avant la première interface                  |
|    11 | Modules                                   | [`06_modules/`](06_modules/README.md)                                                                                                                     | Séparer le code en fichiers et contrôler ce qu'un fichier expose                                                                                          |
|    12 | Regex                                     | [`07_regex/`](07_regex/README.md)                                                                                                                         | Lire et construire des motifs simples pour reconnaître du texte                                                                                           |

**Important :** le dossier `01_variables/` est volontairement divisé en deux passages. Ne commence pas le Passage B avant les fonctions avancées et Scope : ses leçons utilisent les références, le spread, `map` et les closures. `map`/`filter` n'est pas une première leçon de fonctions : commence par Function essentials puis les fonctions avancées sur les fonctions comme valeurs et les callbacks.

## Rythme pour un débutant absolu

Une étape peut prendre plusieurs séances. Pour chaque leçon, fais d'abord l'exemple et la pratique explicitement placés dans la première passe ; ne cumule pas en plus tous les défis de profondeur, extensions React/Next, exercices IA et transferts multi-langages. Ces ressources se reprennent après leurs prérequis ou lorsqu'une route les demande. Tu peux noter une question et arrêter la séance sans perdre ta progression.

## Comment travailler

1. Ouvre le README local de l'étape et suis son ordre de lecture.
2. Lis une leçon à la fois ; ne saute pas directement au mini-projet avancé.
3. Fais la pratique de base associée juste après la leçon lorsqu'elle existe.
4. Si tu bloques, reviens à l'exemple minimal et explique ce que tu observes avant d'ajouter une difficulté.
5. Passe à l'étape suivante lorsque tu peux expliquer la notion avec tes mots et refaire une variante simple sans copier la correction.
6. Reviens au Passage B de Variables après les étapes 2 à 7. Fais les Function factories à l’étape 9, après Scope.

## Ressources complémentaires : après la notion correspondante

Ces fichiers complètent le parcours, mais ne remplacent pas les étapes ci-dessus et ne constituent pas une liste de prérequis à lire d'un seul coup.

- [`SETUP.md`](SETUP.md) : prérequis et commandes pour les activités qui nécessitent une exécution. Consulte-le avant l'activité concernée, pas comme une étape d'installation exhaustive.
- [`02A-git_core.md`](02A-git_core.md) et [`50-git_core_minimini_projet.md`](50-git_core_minimini_projet.md) : Git, à utiliser lorsque la route demande de versionner ton travail. Git est un outil transversal, pas une notion JavaScript à maîtriser avant les variables.
- [`03A-expliquer_a_3_publics_closures.md`](03A-expliquer_a_3_publics_closures.md) : explication approfondie des closures, après Scope.
- [`04A-EXO_LECTURE.md`](04A-EXO_LECTURE.md) : exercice de lecture à faire après les notions auxquelles il fait appel.
- [`11_EXO_VERIFICATION.md`](11_EXO_VERIFICATION.md), [`12_EXO_VERIFICATION.md`](12_EXO_VERIFICATION.md), [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md) et [`98-EXO-VERIFICATION.md`](98-EXO-VERIFICATION.md) : vérifications complémentaires ; fais uniquement celles dont les notions ont déjà été étudiées. Les exercices faisant intervenir une IA sont facultatifs et ne remplacent pas ton propre raisonnement.
- [`99-PORTAGE-MENTAL.md`](99-PORTAGE-MENTAL.md) : comparer un concept avec d'autres langages, après l'avoir compris en JavaScript.
- [`99A-PONT.md`](99A-PONT.md) : relier les fondamentaux à la résolution de problèmes, après les étapes canoniques.

## Durée

Aucune durée globale n'est annoncée pour ce module : le parcours comprend douze étapes, des leçons et des pratiques de base, avec des approfondissements différés. Additionner seulement les temps de quelques fichiers transversaux donnerait une estimation trompeuse. Avance selon les preuves que tu peux produire, pas selon un chronomètre.

## Sortie

Tu dois pouvoir lire un petit extrait inconnu, expliquer ce qu'il fait, écrire une variante simple et nommer une hypothèse qui pourrait le faire échouer. Tu n'as pas besoin de connaître par cœur tous les mots du curriculum.

## Vérification

- [ ] Les douze étapes ont été parcourues dans l'ordre indiqué, y compris le retour au Passage B.
- [ ] Les pratiques de base associées aux notions travaillées ont été réalisées ou leur blocage est consigné.
- [ ] Une preuve datée et une prochaine action sont notées dans ton journal de progression.

<!-- PIECES-MODULE:debut -->

## Les pièces de ce module

- [`00-PREREQUIS.md`](00-PREREQUIS.md) : auto-calibrage d'entrée, non éliminatoire
- [`95-challenge.md`](95-challenge.md) : challenge du module, après les notions nécessaires
- [`90-grimoire.md`](90-grimoire.md) : mémo à restituer après la pratique

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Auto-calibrage d'entrée](00-PREREQUIS.md)
- [Pourquoi ce module mérite ton temps](01A-00-why-fundamentals.md)
- [`01_variables/`](01_variables/README.md)
- [`FOUNDATIONS/01_CONTROL_FLOW/`](FOUNDATIONS/01_CONTROL_FLOW/README.md)
- [`FOUNDATIONS/02_DATA_BASICS/`](FOUNDATIONS/02_DATA_BASICS/README.md)
- [`03_functions/`](03_functions/README.md)
- [`04_types/`](04_types/README.md)
- [`02_scope/`](02_scope/README.md)
- [`05_web_basics/`](05_web_basics/README.md)
- [`06_modules/`](06_modules/README.md)
- [`07_regex/`](07_regex/README.md)
- [Setup local](SETUP.md)
- [Git Core : ressource complémentaire](02A-git_core.md)
- [Mini-projet Git Core](50-git_core_minimini_projet.md)
- [Expliquer les closures à trois publics](03A-expliquer_a_3_publics_closures.md)
- [Exercice de lecture](04A-EXO_LECTURE.md)
- [Vérification 11](11_EXO_VERIFICATION.md)
- [Vérification 12](12_EXO_VERIFICATION.md)
- [Vérification 97](97-EXO-VERIFICATION.md)
- [Vérification 98](98-EXO-VERIFICATION.md)
- [Portage mental](99-PORTAGE-MENTAL.md)
- [Pont vers la résolution de problème](99A-PONT.md)
- [Challenge : `04-FUNDAMENTALS`](95-challenge.md)
- [Grimoire : `04-FUNDAMENTALS`](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Kintana est un cas d’étude pédagogique commun, pas un projet personnel imposé. Pour la première passe, fais uniquement la pratique locale explicitement associée à la leçon, dans l'ordre de la route canonique. Les intégrations produit sont des prolongements facultatifs, sans gate supplémentaire : Types (parseur API), Scope (handler), Functions/Modules (règle métier partagée) et Regex (importeur) ne doivent pas être exécutés avant les prérequis indiqués dans leur encadré. Les encadrés répétés réutilisent le même artefact ; ils ne demandent pas de recréer plusieurs projets. Si une mission dépasse les notions déjà étudiées, laisse-la de côté et poursuis la route.
