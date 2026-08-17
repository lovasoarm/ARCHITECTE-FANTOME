---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: restituer
---

# Page verrouillée

> Rappel : ce grimoire simplifie via analogies. Lire d'abord [`05-MAITRISE/06_annexes/GRIMOIRE_CODE_HONNEUR.md`](../../05-MAITRISE/06_annexes/18_GRIMOIRE_CODE_HONNEUR.md).

Temps de lecture ~8 min

> **Interdit de lire cette page avant d'avoir coché la checklist ci-dessous.**
> Un grimoire lu trop tôt donne l'illusion de savoir. C'est le pire piège pédagogique.

## Checklist prérequis

- [ ] J'ai fini **tous** les exercices du module courant.
- [ ] J'ai réussi le `00_prereq_check.md` du module suivant.
- [ ] J'ai écrit **au moins un** de mes propres exemples (pas copié).
- [ ] Je peux réexpliquer les 3 concepts phares du module **sans regarder**.

Si une seule case n'est pas cochée : ferme ce fichier. Reviens plus tard.

---

## GRIMOIRE : DESIGN PATTERNS

Le vocabulaire de tout le module 12. Si un terme te bloque dans une leçon, il est ici.

| Terme                       | Définition                                                                                                    | Code                                                                                                                                     | Analogies                                                                                                                                                                        | Limite |
| --------------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| Design Pattern              | Une solution réutilisable à un problème de structure de code qui revient souvent.                             | `// pattern = recette, pas copier-coller` (le pattern donne l'idée, pas le code exact à dupliquer)                                       | un combo en jeu de combat appris par tous les joueurs / une formation tactique en foot                                                                                           | « un combo en jeu de combat appris par tous les joueurs » tient tant que rien ne tombe en route ; sur Design Pattern, le coût de retrait du patron dépasse souvent le coût de son ajout. Compare le code avec et sans le patron avant de trancher. |
| Factory                     | Une fonction qui crée des objets sans que l'appelant connaisse les détails de construction.                   | `const createNinja = (type) => ({ type, hp: 100 })` (on demande un ninja, on reçoit un objet prêt)                                       | une académie ninja qui forme tous les genins / un centre de formation de club qui sort des joueurs prêts                                                                         | « une académie ninja qui forme tous les genins » suppose que quelqu'un surveille ; sur Factory, le patron suppose un cycle de vie d'objet que le framework contrôle déjà. Note le prix payé, pas seulement le bénéfice attendu. |
| Singleton                   | Un objet créé une seule fois, et toujours le même partout dans l'app.                                         | `const config = Object.freeze({ apiUrl: "..." })` (un seul objet config, jamais recréé)                                                  | le Hokage : un seul à la fois, tout le village s'y réfère / l'arbitre central d'un match : une seule décision finale                                                             | « le Hokage : un seul à la fois, tout le village s'y réfère » se rejoue à l'identique, le code non ; sur Singleton, le patron suppose un cycle de vie d'objet que le framework contrôle déjà. Vérifie que l'axe de variation que tu anticipes a déjà varié au moins une fois. |
| Builder                     | Construire un objet complexe étape par étape, au lieu d'un constructeur à 12 paramètres.                      | `new NinjaBuilder().setName("Sasuke").setJutsu("chidori").build()` (on empile les configs avant de build)                                | monter un deck de cartes carte par carte avant de jouer / composer une équipe de foot poste par poste                                                                            | « monter un deck de cartes carte par carte avant de jouer » a une frontière visible à l'oeil ; sur Builder, le patron suppose un cycle de vie d'objet que le framework contrôle déjà. Écris quel changement futur le patron doit rendre bon marché, sinon ne l'utilise pas. |
| Decorator                   | Ajouter du comportement à un objet sans modifier sa structure d'origine.                                      | `const withArmor = (ninja) => ({ ...ninja, defense: ninja.defense + 10 })` (le ninja de base reste intact, on ajoute une couche)         | équiper une armure par-dessus le costume de Garo / une option supplémentaire sur un contrat de joueur                                                                            | « équiper une armure par-dessus le costume de Garo » suppose que quelqu'un surveille ; sur Decorator, le nom du patron rassure l'équipe alors que l'implémentation locale s'en écarte. Note le prix payé, pas seulement le bénéfice attendu. |
| Adapter                     | Transformer l'interface d'un objet pour qu'elle soit compatible avec ce qu'on attend.                         | `const adaptApi = (oldData) => ({ name: oldData.nm, hp: oldData.health })` (on traduit l'ancien format vers le nouveau)                  | un traducteur entre Naruto et Garo qui ne parlent pas la même langue / un convertisseur de prise électrique US vers EU                                                           | « un traducteur entre Naruto et Garo qui ne parlent pas la même langue » a une frontière visible à l'oeil ; sur Adapter, le couplage supprimé en surface réapparaît dans la configuration. Compare le code avec et sans le patron avant de trancher. |
| Proxy                       | Un objet intermédiaire qui intercepte les accès à un autre objet pour y ajouter de la logique.                | `new Proxy(ninja, { get: (t, p) => { console.log(p); return t[p] } })` (chaque lecture passe par un contrôle avant d'arriver)            | un garde du corps qui filtre qui peut parler au Hokage / un agent de joueur qui filtre les appels avant qu'ils arrivent au joueur                                                | « un garde du corps qui filtre qui peut parler au Hokage » tient tant que rien ne tombe en route ; sur Proxy, appliqué avant que le besoin existe, il fige une abstraction jamais vérifiée. Écris quel changement futur le patron doit rendre bon marché, sinon ne l'utilise pas. |
| Observer                    | Un objet (le sujet) notifie automatiquement une liste d'abonnés quand son état change.                        | `subject.subscribe(fn); subject.notify(data)` (tous les abonnés reçoivent l'event sans le demander)                                      | une alerte Horror reçue par TOUS les Chevaliers en même temps / les commentateurs qui réagissent tous au même but                                                                | « une alerte Horror reçue par TOUS les Chevaliers en même temps » décrit un monde où chaque étape se voit ; sur Observer, le patron rend un axe de changement bon marché et tous les autres plus chers. Vérifie que l'axe de variation que tu anticipes a déjà varié au moins une fois. |
| Strategy                    | Un algorithme interchangeable, choisi à l'exécution, derrière une interface commune.                          | `const strategies = { rapide: (p) => p * 2 }; strategies[key]` `(power)` (le contexte ne sait pas COMMENT, juste QUI appeler)            | choisir sa technique de combat juste avant le coup / un attaquant qui choisit puissance, précision ou lob selon la situation                                                     | « choisir sa technique de combat juste avant le coup » s'arrête à la première surprise ; sur Strategy, l'indirection ajoutée par le patron déplace la complexité sans la réduire. Écris quel changement futur le patron doit rendre bon marché, sinon ne l'utilise pas. |
| Command                     | Une action encapsulée dans un objet, avec `execute()` et souvent `undo()`.                                    | `const cmd = { execute: () => {...}, undo: () => {...} }` (l'action est stockable, rejouable, annulable)                                 | Ctrl+Z sur les décisions du camp de Rick / une mission Garo mise en file d'attente avant d'être lancée                                                                           | « Ctrl+Z sur les décisions du camp de Rick » a une frontière visible à l'oeil ; sur Command, le coût de retrait du patron dépasse souvent le coût de son ajout. Compare le code avec et sans le patron avant de trancher. |
| Encapsulation               | Cacher les détails internes d'un objet et n'exposer que ce qui est nécessaire.                                | `function createCompte() { let solde = 0; return { depot: (n) => solde += n } }` (solde n'est PAS accessible directement de l'extérieur) | le coffre-fort de Walter White : personne ne voit l'intérieur, juste la porte / le vestiaire d'une équipe : l'intérieur reste privé                                              | « le coffre-fort de Walter White : personne ne voit l'intérieur,... » se corrige toute seule quand elle dérape ; sur Encapsulation, un patron résout un problème daté dans un contexte donné, il ne se transpose pas gratuitement. Vérifie que l'axe de variation que tu anticipes a déjà varié au moins une fois. |
| Composition (de patterns)   | Combiner plusieurs patterns ensemble pour résoudre un problème complet.                                       | `const ninja = withArmor(createNinja("genin"))` (Factory + Decorator combinés)                                                           | une équipe qui mélange plusieurs stratégies selon l'adversaire / un perso Naruto qui combine jutsu de base + équipement + buff                                                   | « une équipe qui mélange plusieurs stratégies selon l'adversaire » raconte le cas nominal ; sur Composition (de patterns), un patron résout un problème daté dans un contexte donné, il ne se transpose pas gratuitement. Note le prix payé, pas seulement le bénéfice attendu. |
| Immutabilité (rappel FP)    | Ne jamais modifier un objet existant : toujours en créer un nouveau.                                          | `const newState = { ...state, hp: state.hp - 10 }` (state original intact, newState est la nouvelle version)                             | chaque tour de Rasengan Engine retourne un nouvel état, jamais le même modifié / chaque journée de Walking Dead Protocol est un nouveau rapport, pas une réécriture du précédent | « chaque tour de Rasengan Engine retourne un nouvel état, jamais le... » s'arrête à la première surprise ; sur Immutabilité (rappel FP), appliqué avant que le besoin existe, il fige une abstraction jamais vérifiée. Écris quel changement futur le patron doit rendre bon marché, sinon ne l'utilise pas. |
| Coupling (couplage)         | Le degré de dépendance entre deux modules : fort couplage = changer l'un casse l'autre.                       | `// fort couplage : A importe directement B.interneSecret` (si B change sa structure interne, A casse)                                   | deux ninjas qui ne peuvent combattre que liés par une corde / deux services qui partagent direct leur base de données                                                            | « deux ninjas qui ne peuvent combattre que liés par une corde » s'arrête à la première surprise ; sur Coupling (couplage), le couplage supprimé en surface réapparaît dans la configuration. Note le prix payé, pas seulement le bénéfice attendu. |
| Interface (au sens pattern) | Le contrat qu'un objet doit respecter : quelles méthodes, quelle signature, sans dire comment elles marchent. | `// toute stratégie doit être : (power) => number` (le contrat, pas l'implémentation)                                                    | les règles d'un combo : peu importe le perso, les touches sont les mêmes / le règlement FIFA : peu importe l'équipe, les règles du jeu sont identiques                           | « les règles d'un combo : peu importe le perso, les touches sont les... » décrit un monde où chaque étape se voit ; sur Interface (au sens pattern), le patron suppose un cycle de vie d'objet que le framework contrôle déjà. Écris quel changement futur le patron doit rendre bon marché, sinon ne l'utilise pas. |

---

## RÉSUMÉ

Les patterns créationnels (Factory, Singleton, Builder) répondent à "comment je fabrique mes objets sans bordel". Les structurels (Decorator, Adapter, Proxy) répondent à "comment je connecte ou j'enrichis des objets sans tout réécrire". Les comportementaux (Observer, Strategy, Command) répondent à "comment les objets communiquent et réagissent sans être collés les uns aux autres". Un pattern n'est pas un objectif : si ton code est clair sans pattern, n'en rajoute pas pour faire joli.

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
