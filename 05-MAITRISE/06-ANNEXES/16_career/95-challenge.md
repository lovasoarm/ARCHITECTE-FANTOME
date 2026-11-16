---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [temps_limite, transmission]
anti_recipe_key: temps_limite+transmission
transfer_distance: high
assessment_role: diagnostic_mastery
---

# CHALLENGE CROSS-LANGUAGE : défendre un transfert déjà réalisé

Temps de lecture : environ 3 minutes. Travail : 2 à 4 heures selon les preuves déjà produites.

## Rôle dans le parcours

Ce challenge est une **synthèse de transfert**, pas une deuxième campagne de portage. La preuve principale de transfert obligatoire est le mini-projet [15 : Portage Rasengan Engine](../../../02-CONSTRUCTION/02-MINI-PROJECTS/15_porte_rasengan_engine_multilang/README.md) : un portage de JavaScript vers **Python OU Go**, au choix. Un seul langage cible est exigé pour cette preuve.

La validation du module [12 : TypeScript](../../../02-CONSTRUCTION/12-TYPESCRIPT/README.md) est indépendante. Aucun résultat de ce challenge, aucun troisième langage et aucune preuve du projet 17 ne peut retarder ou annuler la gate TypeScript.

Le projet [17 : Polyglot Forge](../../../02-CONSTRUCTION/02-MINI-PROJECTS/17_polyglot_forge/README.md) est un approfondissement DEPTH sur la sémantique de l'event loop. Il peut réutiliser le langage cible déjà choisi au projet 15. Il n'impose pas une troisième langue et ne bloque pas la validation fondamentale du parcours.

## Travail demandé

À partir des livrables réellement produits au projet 15 :

1. Présente le contrat fonctionnel partagé entre l'implémentation JavaScript et le portage choisi.
2. Montre au moins trois cas : nominal, limite et erreur. Indique la commande réellement exécutée, les versions de runtime et la sortie observée ; si tu ne peux pas exécuter les deux côtés, marque explicitement la comparaison `NON TESTÉE`.
3. Explique deux invariants qui restent identiques et deux différences de sémantique qui ont exigé une adaptation.
4. Présente l'ADR de comparaison et au moins une objection substantielle à ta décision. Réponds avec une preuve ou révise ta conclusion.
5. Défends oralement ce que tu pourrais transférer dans un autre langage, ce que tu ne peux pas encore affirmer et quelle documentation officielle tu consulterais.

## Livrables

Dans ton dossier de preuves du projet 15, référence :

- le commit local de référence et le commit du portage ;
- le langage cible unique (Python ou Go) et ses versions ;
- les commandes de test réellement exécutées et leurs sorties ;
- l'ADR de comparaison ;
- le rapport des écarts, hypothèses et limites ;
- la revue contradictoire individuelle (objection, réponse, preuve, décision révisée ou maintenue).

Un dépôt public peut enrichir le portfolio, mais n'est pas requis pour valider cette épreuve. L'historique Git local et les artefacts reproductibles restent nécessaires.

## Grille de validation

| Critère                   | Preuve attendue                                                                                                                     |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Contrat commun            | Entrées, sorties, erreurs et invariants explicités                                                                                  |
| Parité                    | Au moins un cas nominal, un cas limite et un cas d'erreur comparés ; résultat réellement exécuté ou `NON TESTÉ` honnêtement déclaré |
| Raisonnement de transfert | Deux invariants conservés et deux adaptations sémantiques justifiées                                                                |
| Décision                  | ADR avec contexte, alternatives, conséquences et signal de révision                                                                 |
| Défense                   | Une objection sérieuse traitée par preuve, révision ou justification                                                                |
| Limites                   | Aucune affirmation au-delà des environnements et tests réellement vérifiés                                                          |

La réussite ne repose pas sur un nombre artificiel de langages ou de mots. Une preuve incomplète reste incomplète ; une preuve honnête et limitée n'est pas présentée comme une exécution réussie.

## Enchaînement

Prérequis : le mini-projet 15 et les leçons de transfert qu'il référence. Le projet 17 peut ensuite approfondir l'event loop, sans devenir un troisième langage obligatoire. Ce challenge ne crée ni prérequis caché pour TypeScript ni gate supplémentaire pour les débutants.

## Variation de profondeur : boîte noire

Sans nommer la technologie, explique le problème, le mécanisme, les invariants et les observations attendues. Décris ensuite quelle famille d'outils pourrait implémenter ce mécanisme, pourquoi tu la choisirais et quelle hypothèse pourrait invalider ce choix.
