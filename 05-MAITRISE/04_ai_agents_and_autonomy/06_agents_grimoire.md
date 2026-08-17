---
stability: perissable_2028
last_reviewed: 2026-07
depends_on_vendor: false
acte: restituer
---

# Page verrouillée

> Rappel : ce grimoire simplifie via analogies. Lire d'abord [`05-MAITRISE/06_annexes/GRIMOIRE_CODE_HONNEUR.md`](../06_annexes/18_GRIMOIRE_CODE_HONNEUR.md).

Temps de lecture ~10 min

> **Interdit de lire cette page avant d'avoir coché la checklist ci-dessous.**
> Un grimoire lu trop tôt donne l'illusion de savoir. C'est le pire piège pédagogique.

## Checklist prérequis

- [ ] J'ai fini **tous** les exercices du module courant.
- [ ] J'ai réussi le `00_prereq_check.md` du module suivant.
- [ ] J'ai écrit **au moins un** de mes propres exemples (pas copié).
- [ ] Je peux réexpliquer les 3 concepts phares du module **sans regarder**.

Si une seule case n'est pas cochée : ferme ce fichier. Reviens plus tard.

---

## GRIMOIRE : AI AGENTS & AUTONOMY

## Concepts intemporels

| Terme                                 | Définition                                                                                               | Code                                                                                                                           | Analogies                                                                                                        | Limite |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- | ------- |
| Agent                                 | Entité qui enchaîne des actions sur la base d'une intention.                                             | `while (!done) { act(plan.next()) }`                                                                                           | Un stagiaire à qui on confie une mission, pas une tâche / un pilote d'avion qui suit un plan de vol.             | « Un stagiaire à qui on confie une mission, pas une tâche » se rejoue à l'identique, le code non ; sur Agent, un outil appelé par l'agent produit un effet réel qu'aucune relecture ne rattrape après coup. Écris le critère de succès vérifiable par machine avant de lancer l'agent. |
| Trace                                 | Suite ordonnée des décisions et actions d'un agent.                                                      | `log = [{step, decision, action, result}, ...]`                                                                                | Boîte noire d'avion / journal de bord d'un capitaine.                                                            | « Boîte noire d'avion » suppose un seul acteur à la fois ; sur Trace, le critère de succès doit être vérifiable par une commande, sinon l'agent optimise l'apparence. Écris le critère de succès vérifiable par machine avant de lancer l'agent. |
| Cahier des charges vérifiable machine | Spécification dont le succès se prouve par un commande à code de sortie 0/1.                             | `test.sh && echo OK \|\| exit 1` | Contrat notarié avec clause d'exécution automatique / recette d'un plat testable au goût. | « Contrat notarié avec clause d'exécution automatique » décrit un monde où chaque étape se voit ; sur Cahier des charges vérifiable machine, le critère de succès doit être vérifiable par une commande, sinon l'agent optimise l'apparence. Écris le critère de succès vérifiable par machine avant de lancer l'agent. |
| Décision-racine                       | Première décision d'une trace où tu aurais tranché différemment. Cause probable des dérives ultérieures. | `firstDivergence(trace, groundTruth)`                                                                                          | Premier faux-pas d'un randonneur perdu / première note fausse d'une partition.                                   | « Premier faux-pas d'un randonneur perdu » tient tant que rien ne tombe en route ; sur Décision-racine, la même invite donne deux réponses différentes, donc rien n'est reproductible sans capture. Capture l'invite, la réponse et la date pour pouvoir rejouer. |
| Capability (vs confiance)             | Ce que l'agent PEUT faire techniquement, pas ce qu'on lui demande de faire.                              | `sandbox.allow = ['read']`                                                                                                     | Ce qu'une clé peut ouvrir vs ce qu'on autorise à ouvrir avec / permis de conduire vs choix de sortir la voiture. | « Ce qu'une clé peut ouvrir vs ce qu'on autorise à ouvrir avec » a une frontière visible à l'oeil ; sur Capability (vs confiance), un outil appelé par l'agent produit un effet réel qu'aucune relecture ne rattrape après coup. Relis ce qui a un effet réel avant exécution, pas après. |
| Refus argumenté                       | Rejet d'un travail conforme mais indésirable, avec motif explicite.                                      | `return { status: 'refused', why: '...' }`                                                                                     | Médecin qui refuse une ordonnance dangereuse / avocat qui refuse un dossier.                                     | « Médecin qui refuse une ordonnance dangereuse » raconte le cas nominal ; sur Refus argumenté, une consigne implicite est interprétée littéralement, jamais devinée. Borne le nombre d'itérations et le coût maximal. |
| B.O.R.N.É.                            | Cadre de prompt : But, Output, Ressources, Non-buts, Épreuve.                                            | `prompt = {but, output, res, nonbuts, epreuve}`                                                                                | Cahier des charges d'appel d'offres / brief créatif publicitaire.                                                | « Cahier des charges d'appel d'offres » suppose un seul acteur à la fois ; sur B.O.R.N.É., le modèle produit du plausible, la vérification reste entièrement à ta charge. Relis ce qui a un effet réel avant exécution, pas après. |
| Sandbox                               | Zone d'exécution aux droits limités où un agent ne peut pas causer de dégât hors périmètre.              | `docker run --read-only --network=none`                                                                                        | Parc pour enfants clôturé / bac à sable de laboratoire P4.                                                       | « Parc pour enfants clôturé » se corrige toute seule quand elle dérape ; sur Sandbox, un outil appelé par l'agent produit un effet réel qu'aucune relecture ne rattrape après coup. Relis ce qui a un effet réel avant exécution, pas après. |

## Réflexes à automatiser

| Réflexe                                           | Pourquoi                                                         | Signal d'alerte                                         | Contre-analogies                                                                                                                |
| ------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Rédiger B.O.R.N.É. avant de prompter              | Un prompt vague = un audit d'1h.                                 | "Fais-moi un truc qui..." sans épreuve définie.         | Demander à un stagiaire de "s'occuper du client" sans brief / lâcher un genin en mission de rang S sans ordre de mission écrit. |
| Chercher la décision-racine, pas relire les diffs | La dérive vient d'un pivot ancien, pas de l'action 39.           | Tu relis pour la 3e fois les 200 dernières lignes.      | Le médecin qui traite les symptômes sans diagnostic / le mécano qui change des pièces au hasard sans lire le voyant.            |
| Toujours sandboxer un agent                       | Un agent sans sandbox = un pistolet chargé qu'on laisse traîner. | `--network=host` ou `sudo` accordé "juste pour tester". | Laisser un apprenti seul avec la clé du coffre / donner les codes du labo à un inconnu "juste pour un test".                    |
| Refuser bien plutôt qu'accepter poliment          | Un refus argumenté préserve la trace ; un OK menteur la pollue.  | L'agent renvoie "done" sans avoir touché au code.       | Le prestataire qui facture un travail qu'il n'a pas fait / le joueur qui célèbre un but hors-jeu non signalé.                   |

## Ce qui périra (2026-2028)

Les OUTILS (Devin, Cursor Composer, Claude Code, agents maison). Les CONCEPTS
resteront tant que "déléguer une intention à une machine" existera : soit tant
qu'existera le métier de dev.

## Vérification

Peux-tu, sans relire ce module :

- citer les 5 lettres de B.O.R.N.É. ?
- lister 3 des 7 interdits sandbox ?
- expliquer pourquoi la cause d'une trace ratée n'est presque jamais l'action 39 ?

---

## OÙ L'ANALOGIE CASSE

Rappel Partie B.2 : toute analogie de ce grimoire simplifie un mécanisme.
Quand tu dois **décider** (fix, refactor, ADR), retourne au mécanisme réel,
pas à l'image. L'analogie sert à comprendre vite ; elle ment toujours un peu.

---

## OÙ LES ANALOGIES CASSENT (règle B.2)

Les analogies de ce grimoire simplifient : elles ne définissent pas. Une
closure **nest pas** un tiroir ; un event loop **nest pas** un carrousel ;
une pile **nest pas** une pile de crêpes. Chaque analogie sert à visualiser
un mécanisme ; elle cesse dès que tu veux raisonner sur la complexité, la
mémoire, la concurrence ou les cas limites. Reviens toujours à la définition
technique avant de coder, débugger ou expliquer à un pair. Une analogie
prise pour la réalité devient un obstacle épistémologique.
