---
stability: evolutif
acte: parcours
noyau: oui
route: survie
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "02-CONSTRUCTION/03-TESTING/01-00-why-testing.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 02-CONSTRUCTION/03-TESTING/01-00-why-testing.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# MODULE 03 TESTING

> **Chaîne de maîtrise :** spécifier le comportement → tester une unité → vérifier l'intégration → valider le contrat avec les consommateurs → tester le parcours critique → muter volontairement une hypothèse → démontrer que la suite détecte la régression. Le framework importe moins que la qualité du signal produit par les tests.

Pour les exercices cumulatifs, ajoute le [Pack d'exercices systèmes et arbitrages](../../06-ANNEXES-TRANSVERSES/61-PACK-EXERCICES-SYSTEMES-ET-ARBITRAGES.md) après les bases ; il force à utiliser tests, idempotence, migrations et mesures dans des situations nouvelles.

Pour approfondir le pouvoir réel de la suite, enchaîne avec [63 : Laboratoire de tests](../../06-ANNEXES-TRANSVERSES/63-LAB-TESTING-ENGINEERING.md) : contrat, propriété, mutation, doubles et test de transfert avec correction de référence.

> Palier `02-CONSTRUCTION`. Duree estimee : **15 h 30** (23 fichiers de travail).

## Sommaire du module

| Fichier                                                                                                  | Objet                                                                           | Duree  |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------ |
| [`00-PREREQUIS.md`](00-PREREQUIS.md)                                                                     | 00 : Prereq check : Testing                                                     | 15 min |
| [`01-00-why-testing.md`](01-00-why-testing.md)                                                           | POURQUOI CE MODULE MÉRITE TON TEMPS : TESTING                                   | 45 min |
| [`02-unit_sniper.md`](02-unit_sniper.md)                                                                 | UNIT SNIPER : TESTER UNE FONCTION PRÉCISÉMENT                                   | 45 min |
| [`50-unit_sniper_minimini_projet.md`](50-unit_sniper_minimini_projet.md)                                 | 01 unit sniper minimini projet                                                  | 45 min |
| [`03-jest_crash_course.md`](03-jest_crash_course.md)                                                     | JEST CRASH COURSE : DE ZÉRO À OPÉRATIONNEL                                      | 45 min |
| [`51-jest_crash_course_minimini_projet.md`](51-jest_crash_course_minimini_projet.md)                     | 02 jest crash course minimini projet                                            | 45 min |
| [`04-mocking_madness.md`](04-mocking_madness.md)                                                         | MOCKING MADNESS : REMPLACER CE QU'ON NE CONTRÔLE PAS                            | 45 min |
| [`52-mocking_madness_minimini_projet.md`](52-mocking_madness_minimini_projet.md)                         | 03 mocking madness minimini projet                                              | 45 min |
| [`05-integration_reactor.md`](05-integration_reactor.md)                                                 | INTEGRATION REACTOR : QUAND L'ISOLATION NE SUFFIT PLUS                          | 45 min |
| [`53-integration_reactor_minimini_projet.md`](53-integration_reactor_minimini_projet.md)                 | 04 integration reactor minimini projet                                          | 45 min |
| [`06-tdd_arena.md`](06-tdd_arena.md)                                                                     | TDD ARENA : LE TEST EN PREMIER, TOUJOURS                                        | 45 min |
| [`54-tdd_arena_minimini_projet.md`](54-tdd_arena_minimini_projet.md)                                     | 05 tdd arena minimini projet                                                    | 45 min |
| [`07-test_driven_refactor.md`](07-test_driven_refactor.md)                                               | TEST-DRIVEN REFACTOR : CHANGER TOUT SANS RIEN CASSER                            | 45 min |
| [`08-contract_testing_pact.md`](08-contract_testing_pact.md)                                             | CONTRACT TESTING : LA PAIX ENTRE LES ÉQUIPES                                    | 45 min |
| [`09-e2e_playwright_beast.md`](09-e2e_playwright_beast.md)                                               | E2E PLAYWRIGHT BEAST : SIMULER UN VRAI UTILISATEUR                              | 45 min |
| [`55-e2e_playwright_beast_minimini_projet.md`](55-e2e_playwright_beast_minimini_projet.md)               | 08 e2e playwright beast minimini projet                                         | 45 min |
| [`10-test_strategy_not_framework.md`](10-test_strategy_not_framework.md)                                 | 09 : Stratégie de tests (pas framework)                                         | 45 min |
| [`56-test_strategy_not_framework_minimini_projet.md`](56-test_strategy_not_framework_minimini_projet.md) | 09 test strategy not framework minimini projet                                  | 45 min |
| [`90-grimoire.md`](90-grimoire.md)                                                                       | Page verrouillée                                                                | 30 min |
| [`11-EXO_LECTURE.md`](11-EXO_LECTURE.md)                                                                 | EXO LECTURE : ~20 minutes : un cycle (Testing)                                  | 20 min |
| [`98-EXO-VERIFICATION.md`](98-EXO-VERIFICATION.md)                                                       | EXO [JEUNE IA] : 02-CONSTRUCTION/03-TESTING                                     | 45 min |
| [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md)                                                       | EXO IA MENTEUSE : module 02-CONSTRUCTION/03-TESTING                             | 10 min |
| [`99A-PONT.md`](99A-PONT.md)                                                                             | PONT : de prouver du code à raisonner sur les nombres à les bases mathématiques | 45 min |

Total : **15 h 30**. Le Total reprend exactement la somme du tableau. Le challenge (1 h 30) est une évaluation séparée et n'est pas ajouté au Total sauf s'il apparaît comme ligne du tableau. Aucun `96-boss-fight.md` distinct n'est fourni dans ce module ; ses checkpoints, gates ou autres critères de sortie déclarés font foi.

## Comment travailler ce module

1. Ouvre d abord le fichier `00_why_*` s il existe : il dit pourquoi le module merite ton temps.
2. Passe le controle de prerequis. Un prerequis manquant se repare en amont, jamais ici.
3. Fais les lecons dans l ordre des numeros. Chaque lecon a un exercice borne : il se rend, il se date.
4. Le grimoire se lit **apres** la pratique, jamais avant : c est une fiche de rappel, pas un cours.
5. Termine le challenge et les critères de sortie déclarés. Un boss-fight séparé n'est obligatoire que si le README local le fournit et l'annonce ; à défaut, les checkpoints et preuves de sortie indiqués ici font foi.

## Ce que ce module produit dans ton depot fil rouge

Au moins un artefact date et verifiable. Si tu ne peux pas montrer de fichier a la sortie, le module
n est pas fait : relis la liste ci-dessus et rends l exercice manquant.

## Verification

- [ ] Tous les fichiers du tableau sont ouverts et leurs exercices rendus.
- [ ] L artefact produit est cite dans ton journal de progression (`PROGRESSION.md`).

<!-- PIECES-MODULE:debut -->

## Les pièces de ce module

- [`00-PREREQUIS.md`](00-PREREQUIS.md) : Auto-test d'entrée : à passer avant d'ouvrir le module
- [`95-challenge.md`](95-challenge.md) : Challenge : l'épreuve du module
- [`90-grimoire.md`](90-grimoire.md) : Grimoire : ce que tu dois pouvoir restituer
- [91-90-grimoire.md](91-90-grimoire.md) : pont de compatibilité conservé pour la restitution

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [00 : Prereq check : Testing](00-PREREQUIS.md)
- [Pourquoi ce module mérite ton temps : testing](01-00-why-testing.md)
- [Unit sniper : tester une fonction précisément](02-unit_sniper.md)
- [50-unit_sniper_minimini_projet.md](50-unit_sniper_minimini_projet.md)
- [Jest crash course : de zéro à opérationnel](03-jest_crash_course.md)
- [51-jest_crash_course_minimini_projet.md](51-jest_crash_course_minimini_projet.md)
- [Mocking madness : remplacer ce qu'on ne contrôle pas](04-mocking_madness.md)
- [52-mocking_madness_minimini_projet.md](52-mocking_madness_minimini_projet.md)
- [Integration reactor : quand l'isolation ne suffit plus](05-integration_reactor.md)
- [53-integration_reactor_minimini_projet.md](53-integration_reactor_minimini_projet.md)
- [TDD arena : le test en premier, toujours](06-tdd_arena.md)
- [54-tdd_arena_minimini_projet.md](54-tdd_arena_minimini_projet.md)
- [Test-driven refactor : changer tout sans rien casser](07-test_driven_refactor.md)
- [Contract testing : la paix entre les équipes](08-contract_testing_pact.md)
- [E2e playwright beast : simuler un vrai utilisateur](09-e2e_playwright_beast.md)
- [55-e2e_playwright_beast_minimini_projet.md](55-e2e_playwright_beast_minimini_projet.md)
- [09 : Stratégie de tests (pas framework)](10-test_strategy_not_framework.md)
- [56-test_strategy_not_framework_minimini_projet.md](56-test_strategy_not_framework_minimini_projet.md)
- [Page verrouillée](90-grimoire.md)
- [EXO LECTURE : ~20 minutes : un cycle (Testing)](11-EXO_LECTURE.md)
- [Exercice : tuer une mutation (20 min)](12_EXO_VERIFICATION.md)
- [EXO IA MENTEUSE : module 02-CONSTRUCTION/03-TESTING](97-EXO-VERIFICATION.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [PONT : de prouver du code à raisonner sur les nombres à les bases mathématiques](99A-PONT.md)
- [Challenge : `03-TESTING`](95-challenge.md)
- [Grimoire : `03-TESTING`](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Le module utilise le cas d’étude pédagogique commun [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md) uniquement comme contexte partagé. Pour ce sous-module, applique la mission précise de sa ligne dans la section **Missions ciblées par sous-module** de cette carte ; le challenge local reste la consigne et le critère de validation. Cette référence ne crée ni prérequis ni gate supplémentaire.

## Ressources pratiques associées

- [Préparer l'activité (`SETUP.md`)](SETUP.md) : environnement, prérequis et commandes.
