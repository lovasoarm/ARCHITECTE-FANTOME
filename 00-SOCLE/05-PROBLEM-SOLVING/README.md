---
stability: evolutif
acte: parcours
noyau: oui
route: survie
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "00-SOCLE/05-PROBLEM-SOLVING/01-00-why-problem-solving.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 00-SOCLE/05-PROBLEM-SOLVING/01-00-why-problem-solving.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# MODULE 05 PROBLEM SOLVING

> Bloc `00-SOCLE`. Durée estimée de la **première passe obligatoire : 11 h 15** (16 ressources chronométrées). Deux exercices complémentaires sont facultatifs : un exercice autonome de pratique et de vérification (45 min), puis un exercice de détection d’une suggestion IA trompeuse (10 min), soit **55 min** supplémentaires au total. Le travail actif atteint donc **12 h 10** si tu choisis aussi de les faire. Le pont différé reste hors de ces totaux. Ces estimations décrivent le travail du module, pas une séance unique ni une échéance.

**Règle de première passe :** avance une leçon et sa pratique locale à la fois, dans l'ordre. Les six exercices du cas fictif de Noa constituent les pratiques de base. Les ponts Kintana, défis de profondeur, deux vérifications IA marquées « facultatif » et références différées ne sont pas exigés dans cette première passe. Aucun de ces compléments ne conditionne sa validation. Répartis le travail sur plusieurs séances et conserve une preuve par exercice ; ne cherche pas à tout terminer d'une traite.

## Sommaire du module

| Fichier                                                                                          | Objet                                                         | Durée               | Statut                            |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- | ------------------- | --------------------------------- |
| [`00-PREREQUIS.md`](00-PREREQUIS.md)                                                             | 00 : Prereq check : Problem Solving                           | 15 min              | Première passe                    |
| [`01-00-why-problem-solving.md`](01-00-why-problem-solving.md)                                   | POURQUOI CE MODULE MÉRITE TON TEMPS : PROBLEM SOLVING         | 45 min              | Première passe                    |
| [`02-polya_method.md`](02-polya_method.md)                                                       | 01 : La méthode Polya (avant de toucher au clavier)           | 45 min              | Première passe                    |
| [`50-polya_method_minimini_projet.md`](50-polya_method_minimini_projet.md)                       | 01 polya method minimini projet                               | 45 min              | Première passe                    |
| [`03-decompose.md`](03-decompose.md)                                                             | DÉCOMPOSER UN SYSTÈME COMPLEXE                                | 45 min              | Première passe                    |
| [`51-decompose_minimini_projet.md`](51-decompose_minimini_projet.md)                             | 02 decompose minimini projet                                  | 45 min              | Première passe                    |
| [`04-model_before_code.md`](04-model_before_code.md)                                             | MODÉLISER AVANT DE CODER                                      | 45 min              | Première passe                    |
| [`52-model_before_code_minimini_projet.md`](52-model_before_code_minimini_projet.md)             | 03 model before code minimini projet                          | 45 min              | Première passe                    |
| [`05-choose_an_approach.md`](05-choose_an_approach.md)                                           | CHOISIR UNE APPROCHE AVANT DE CODER                           | 45 min              | Première passe                    |
| [`53-choose_an_approach_minimini_projet.md`](53-choose_an_approach_minimini_projet.md)           | 04 choose an approach minimini projet                         | 45 min              | Première passe                    |
| [`06-read_fuzzy_requirements.md`](06-read_fuzzy_requirements.md)                                 | TRANSFORMER "ÇA MARCHE PAS" EN PROBLÈME PRÉCIS                | 45 min              | Première passe                    |
| [`54-read_fuzzy_requirements_minimini_projet.md`](54-read_fuzzy_requirements_minimini_projet.md) | 05 read fuzzy requirements minimini projet                    | 45 min              | Première passe                    |
| [`07-design_for_change.md`](07-design_for_change.md)                                             | CONCEVOIR POUR CE QUI VA CHANGER                              | 45 min              | Première passe                    |
| [`55-design_for_change_minimini_projet.md`](55-design_for_change_minimini_projet.md)             | 06 design for change minimini projet                          | 45 min              | Première passe                    |
| [`90-grimoire.md`](90-grimoire.md)                                                               | Page verrouillée                                              | 30 min              | Première passe, après la pratique |
| [`08-EXO_LECTURE.md`](08-EXO_LECTURE.md)                                                         | EXO DE LECTURE : trois cycles de 15 minutes (45 min au total) | 45 min              | Première passe                    |
| [`98-EXO-VERIFICATION.md`](98-EXO-VERIFICATION.md)                                               | Exercice autonome : implémenter et vérifier un concept        | 45 min              | Facultatif : hors première passe  |
| [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md)                                               | EXO IA MENTEUSE : détecter une suggestion trompeuse           | 10 min              | Facultatif : hors première passe  |
| [`99A-PONT.md`](99A-PONT.md)                                                                     | PONT DIFFÉRÉ : à consulter à l'étape Async, après Mindset     | ~10 min, hors total | Différé : étape Async             |

Total obligatoire de la première passe : **11 h 15**, somme des 16 lignes marquées « Première passe ». Les deux exercices complémentaires facultatifs représentent **55 min** supplémentaires (45 min + 10 min) ; si tu les réalises aussi, le travail actif total est de **12 h 10**. Le pont `99A-PONT.md` est différé et exclu de ces totaux (environ 10 min à l'étape Async). Le challenge (1 h 30) est une évaluation séparée, décrite dans `95-challenge.md`, et n'est pas ajouté aux durées de la première passe. Aucun `96-boss-fight.md` distinct n'est fourni dans ce module ; ses checkpoints et critères de sortie déclarés font foi.

## Comment travailler ce module

1. Ouvre d’abord le fichier `01-00-why-problem-solving.md` : il explique pourquoi ce module mérite ton temps.
2. Passe le contrôle de prérequis. Un prérequis manquant se répare en amont, jamais ici.
3. Fais les leçons dans l’ordre des numéros. Chaque leçon a un exercice borné : il se rend et se date.
4. Le grimoire se lit **après** la pratique, jamais avant : c’est une fiche de rappel, pas un cours.
5. Termine le challenge et les critères de sortie déclarés. Un boss-fight séparé n'est obligatoire que si le README local le fournit et l'annonce ; à défaut, les checkpoints et preuves de sortie indiqués ici font foi.

## Support et preuve : sans projet personnel obligatoire

Les exercices 50 à 55 utilisent le [portfolio fictif de Noa](EXERCICE-PORTFOLIO-FICTIF.md). Il s'agit d'un cas d'entraînement, pas du fil rouge personnel de l'apprenant. Aucun portfolio réel, client, dépôt Git ou service en ligne n'est requis.

Conserve les réponses dans un dossier local, par exemple `PREUVES/00-SOCLE/05-PROBLEM-SOLVING/`. Une note sur papier ou un fichier texte suffit lorsqu'une consigne le permet. Pour l'exercice qui demande un petit tableau de projets, utilise un fichier jetable sous `scratch/problem-solving/` ; ne modifie pas un projet existant.

Les insertions Kintana dans les mini-pratiques sont des **ponts différés**, détaillés dans chaque leçon. Elles ne sont pas des livraisons obligatoires du Socle et ne doivent pas être exécutées avant les prérequis techniques correspondants.

## Vérification

- [ ] Tous les fichiers marqués « Première passe » dans le tableau sont ouverts et leurs exercices rendus. Les deux vérifications IA sont facultatives et ne conditionnent pas la fin de cette première passe.
- [ ] Les productions locales sont citées dans ton journal de progression (`PROGRESSION.md`).

<!-- PIECES-MODULE:debut -->

## Les pièces de ce module

- [`00-PREREQUIS.md`](00-PREREQUIS.md) : Auto-test d'entrée : à passer avant d'ouvrir le module
- [`95-challenge.md`](95-challenge.md) : Challenge : l'épreuve du module
- [`90-grimoire.md`](90-grimoire.md) : Grimoire : ce que tu dois pouvoir restituer
- [91-90-grimoire.md](91-90-grimoire.md) : pont de compatibilité conservé pour la restitution

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Cas d’exercice : portfolio fictif de Noa](EXERCICE-PORTFOLIO-FICTIF.md)
- [00 : Prereq check : Problem Solving](00-PREREQUIS.md)
- [Pourquoi ce module mérite ton temps : problem solving](01-00-why-problem-solving.md)
- [01 : La méthode Polya (avant de toucher au clavier)](02-polya_method.md)
- [50-polya_method_minimini_projet.md](50-polya_method_minimini_projet.md)
- [Décomposer un système complexe](03-decompose.md)
- [51-decompose_minimini_projet.md](51-decompose_minimini_projet.md)
- [Modéliser avant de coder](04-model_before_code.md)
- [52-model_before_code_minimini_projet.md](52-model_before_code_minimini_projet.md)
- [Choisir une approche avant de coder](05-choose_an_approach.md)
- [53-choose_an_approach_minimini_projet.md](53-choose_an_approach_minimini_projet.md)
- [Transformer "ça marche pas" en problème précis](06-read_fuzzy_requirements.md)
- [54-read_fuzzy_requirements_minimini_projet.md](54-read_fuzzy_requirements_minimini_projet.md)
- [Concevoir pour ce qui va changer](07-design_for_change.md)
- [55-design_for_change_minimini_projet.md](55-design_for_change_minimini_projet.md)
- [Page verrouillée](90-grimoire.md)
- [EXO DE LECTURE : trois cycles de 15 minutes (45 min au total)](08-EXO_LECTURE.md)
- [Exercice autonome : implémenter et vérifier un concept : facultatif, hors première passe](98-EXO-VERIFICATION.md)
- [EXO IA MENTEUSE : module 00-SOCLE/05-PROBLEM-SOLVING : complément facultatif, hors première passe](97-EXO-VERIFICATION.md)
- [PONT DIFFÉRÉ : consulter à l'étape Async](99A-PONT.md)
- [Challenge : `05-PROBLEM-SOLVING`](95-challenge.md)
- [Grimoire : `05-PROBLEM-SOLVING`](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

<!-- AF-KINTANA-MODULE -->

## Pont Kintana différé : après les prérequis techniques

Kintana est un cas d’étude pédagogique commun, pas un projet personnel imposé. Dans la première passe de ce module, les six exercices obligatoires utilisent uniquement le portfolio fictif de Noa et les pratiques locales de chaque leçon. Les missions Kintana indiquées dans la [carte des missions](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md) sont des prolongements différés : l'incident attend les notions d'API, de persistance, de concurrence, de logs et de tests ; l'audit accessibilité attend Web Basics, les formulaires/accessibility concernés et Testing. Elles sont facultatives, peuvent être conservées comme une seule simulation par thème et ne créent aucune gate supplémentaire pour terminer Problem Solving. Aucun projet personnel ni incident réel n'est nécessaire. La FAQ IA reste réservée aux activités IA/RAG.

## Ressources pratiques associées

- [Préparer l'activité (`SETUP.md`)](SETUP.md) : environnement, prérequis et commandes.
