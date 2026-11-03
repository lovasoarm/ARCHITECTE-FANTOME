---
stability: intemporel
acte: comprendre
route_family: core
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Cahier des charges : distributed arena

Temps de lecture ~2 min

## C'EST QUOI CE PROJET, CONCRÈTEMENT

N processus Node qui se parlent en local et survivent au chaos. C'est l'arène du Ballon d'Or : onze joueurs coordonnés, un blessé (kill -9), et le score final doit rester juste malgré tout.

## OBJECTIF

Construire un compteur distribué (coordinateur + workers) et prouver, métriques à l'appui, qu'il survit à race condition, timeout, panne partielle et retry non idempotent.

## CONTRAINTES NON NÉGOCIABLES

- Pas de Kubernetes ni de cloud : tout en local, N processus Node.
- Le total final doit être correct OU honnêtement dégradé (mesuré).
- Retry rendu idempotent explicitement.

## Périmètre explicite : CORE (7 h) et DEPTH

Le projet complet décrit ci-dessous reste la cible de profondeur ; la route CORE de 7 h est un **slice**, pas la preuve que l'apprenant a résolu tous les problèmes distribués.

**Slice CORE : critère minimal de réussite :**

1. un coordinateur et au moins un worker local ;
2. une clé d'idempotence pour chaque incrément ;
3. tests TDD prouvant qu'un envoi dupliqué ne double pas le total ;
4. au moins un scénario de timeout ou d'arrêt/redémarrage du worker ;
5. total final vérifié par un oracle indépendant ;
6. une mesure enregistrée (latence, tentatives, erreurs ou durée de récupération) ;
7. un ADR qui énonce les hypothèses et ce que le résultat **ne prouve pas**.

**DEPTH : exigences du projet complet :** les quatre scénarios de chaos (`race`, `kill-mid`, `network-drop`, `network-partition`), le rapport de chaos complet et la reprise/réconciliation définie par le modèle retenu. Une isolation de workers par rapport à un coordinateur unique est une **partition de connectivité**, pas un split-brain de coordinateurs. Un scénario de split-brain exige d'ajouter plusieurs coordinateurs/réplicas qui peuvent accepter des écritures de manière concurrente ; c'est une extension DEPTH distincte, avec un protocole et des tests dédiés. Ces scénarios doivent être exécutés et testés ; la simple présence de `chaos.js` ne les valide pas. Ne pas prétendre qu'un test local miniature démontre la correction générale sous partition ou consensus.

## LIVRABLE

`coordinator.js`, `worker.js`, `chaos.js` (4 scénarios : `race`, `kill-mid`, `network-drop`, `network-partition`), `verify.js`, rapport de chaos, `08-POSTMORTEM.md`. L'extension multi-coordinateur/split-brain est un défi DEPTH séparé et ne doit pas être présentée comme testée par le scénario worker/coordinateur unique.

## SÉCURITÉ (gate obligatoire)

Avant de considérer le projet fini, tu dois traiter ces exigences OWASP contextuelles. Un projet qui marche mais qui est vulnérable n'est pas fini.

- Intégrité des incréments (OWASP A08) : chaque incrément porte un id unique vérifié côté coordinateur pour empêcher un rejeu malveillant de gonfler le total.
- Autorisation inter-process (OWASP A01 - Broken Access Control) : un worker ne doit pouvoir écrire que ses propres incréments, pas réécrire le total global directement.

Pour chaque exigence : écris dans `SECURITY.md` la menace, ta contre-mesure, et le test qui la prouve. Ajoute dans le dossier `tests/` de ce projet un test ciblé pour au moins une des menaces retenues. Documente dans le README la commande exacte qui exécute ce test. Aucun pack de correction séparé n’est fourni dans ce projet.

## AUTO-ÉVALUATION

- [ ] Livrable complet et fonctionnel
- [ ] Contraintes respectées et vérifiées
- [ ] Section Sécurité traitée et testée
- [ ] ADR rédigé et relu
- [ ] POSTMORTEM honnête écrit

---

## Securite (gate obligatoire, Partie I)

- **Exigence 1** : aucune donnee sensible (secret, token, cle) dans le code source ni dans les logs. Utiliser variables d'environnement + `.env.example` versionne (jamais `.env`).
- **Exigence 2** : toute entree externe (STDIN, fichier, HTTP, CLI) est validee AVANT usage (type, longueur, format). En cas d'invalidite : erreur explicite, jamais un crash silencieux.

Un test dans `node learner-verifier.js` (auto-verif ecrite par toi) doit prouver ces deux points (ex : lancer le programme avec une entree malformee et verifier qu'il refuse proprement).

## SURPRISE MI-PARCOURS (spec drift, obligatoire)

Spec drift obligatoire, voir `../../../05-MAITRISE/06-ANNEXES/27_synthese_mini_projects/04-spec_drift.md`
(protocole unique, tirage aléatoire, déclenchement à 40 % d'avancement).

Note pour ce projet : la nature distribuée fait que le drift #4 (ordre par
source), #5 (race > 200 req/s) et #8 (contrat `{data, meta}` renvoyé par
le coordinateur) sont particulièrement révélateurs. Si tu tires un autre
drift, ne le remplace PAS, c'est le hasard qui enseigne, pas ton confort.

---

## RÔLE DES DOSSIERS (ne skippe pas)

- `src/` : **tu remplis toi-même**. Le dossier est vide exprès : c'est ton livrable. Aucun code fourni.
- `tests/` : **TDD strict : tu écris le test AVANT le code de `src/`**. Rouge → vert → refactor. Si `tests/` est vide en fin de projet, ce projet ne compte pas dans ton portfolio.
- `ADR/` : **au moins 1 décision architecturale documentée** (choix de structure, trade-off, alternative rejetée + pourquoi). Format : Contexte / Décision / Conséquences.
- `08-POSTMORTEM.md` : **rédigé à la fin, honnête**. Ce qui a foiré, combien de temps t'a coûté chaque blocage, ce que tu referais autrement.
- `02-TDD-JOURNAL.md` : trace vivante du cycle rouge/vert/refactor.

**Un CTO qui feuillette ton portfolio regarde `src/` ET `tests/` ET `ADR/`. Un `src/` vide sans `tests/` associé = projet non fini, quelle que soit la qualité du reste.**

## CONTRAT ANTI-RECETTE

Tu choisis toi-même la découpe, les modules, l’ordre de construction et les tests. Aucun squelette d’architecture n’est fourni.

Avant de coder, produis :

- trois hypothèses vérifiables sur le système ;
- une première découpe que tu défends et une alternative rejetée ;
- un test falsifiant une hypothèse importante ;
- les critères qui te feront changer d’architecture en cours de route.

Ne cherche pas une architecture « correcte » dans le curriculum : le but est de reconstruire un modèle sous contrainte, puis de défendre pourquoi il tient.
