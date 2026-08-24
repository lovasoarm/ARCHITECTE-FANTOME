---
stability: intemporel
acte: comprendre
route_family: core
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Cahier des charges : rasengan engine

Temps de lecture ~14 min

## PRÉREQUIS

```text
Node.js    : v22.23.2
npm      : v10+ (inclus avec Node.js)
Variables env : aucune
Outils externes: aucun

# Installation
$ npm install

# Lancer le moteur
$ node src/index.js

# Lancer les tests
$ npm test
```

Pas de build step, pas de transpilation. Du JS pur, Node en direct.

---

## C'EST QUOI CE PROJET, CONCRÈTEMENT

Naruto veut un simulateur de combat textuel. Chaque ninja a des stats (chakra, vitesse, force), une liste de jutsus, et un style de combat. Le moteur calcule les dégâts, gère les cooldowns, résout les esquives, et produit un log de combat lisible. Naruto affronte Sasuke, Itachi affronte Pain, Gaara défend contre une attaque surprise : le moteur tourne, les dés roulent, le résultat s'affiche dans ta console.

Ce que tu dois voir tourner à la fin :

```bash
$ node src/index.js

[COMBAT] Naruto (Uzumaki) vs Sasuke (Uchiha)
[TOUR 1] Naruto utilise Rasengan : 87 dégâts | Sasuke esquive (prob: 32%)
[TOUR 2] Sasuke utilise Chidori : 112 dégâts | Naruto bloqué (chakra: 140/200)
[TOUR 3] Naruto utilise Rasengan Ōdama : CRITIQUE x1.8 => 156 dégâts
[FIN] Sasuke KO au tour 3. Chakra restant de Naruto : 68/200.

$ npm test
PASS tests/fighter.test.js (16 tests)
PASS tests/jutsu.test.js (14 tests)
PASS tests/combat.test.js (20 tests)
PASS tests/rng.test.js (8 tests)
```

Ce projet est le premier. Tu pars d'une page blanche. Tu construis tout de zéro, sans framework, sans bibliothèque externe, juste du JS pur et des décisions de conception.

## POURQUOI CE PROJET EXISTE

Ce projet force à utiliser la programmation fonctionnelle comme outil réel, pas comme exercice académique. Voilà ce qu'il teste précisément :

- **penser en fonctions pures (entrée → sortie, jamais de mutation cachée)** : un moteur de combat où chaque tour modifie directement un objet global est impossible à tester et impossible à débugger. Ici, chaque fonction reçoit un état, retourne un nouvel état. L'ancien état est toujours disponible.
- **composer des comportements plutôt qu'empiler des conditions** : un ninja n'a pas un `if` par jutsu. Il a une liste de fonctions. Le moteur les appelle dans l'ordre.
- **séparer ce qui change de ce qui reste stable** : les stats d'un ninja changent à chaque tour. La logique qui calcule les dégâts, elle, ne change pas. Ce sont deux choses différentes, dans deux fichiers différents.

## LES 4 MODULES QUE CE PROJET COUVRE, ET OÙ ILS SE VOIENT DANS LE CODE

### `00-SOCLE/04-FUNDAMENTALS` : les bases qui tiennent

**Où ça se voit** : partout. Les données de chaque ninja sont des objets JS. Les jutsus sont des fonctions. Les HOF (`map`, `filter`, `reduce`) remplacent toutes les boucles manuelles.
**Pourquoi c'est nécessaire ici** : sans une vraie maîtrise des objets, des fonctions et des closures (une fonction qui mémorise une variable de son contexte parent, même après que ce contexte a disparu), le moteur devient un nid de bugs d'état.

### `02-CONSTRUCTION/04-MATH-BASICS` : les maths qui servent vraiment

**Où ça se voit** : `src/utils/rng.js` (RNG = Random Number Generator, générateur de nombres aléatoires), `src/utils/cooldownCycle.js`.
**Pourquoi c'est nécessaire ici** : les critiques, les esquives, les ratés sont pilotés par des probabilités. Les cooldowns des jutsus utilisent l'arithmétique modulaire (le modulo : reste de la division entière, utile pour créer des cycles). Sans ça, le combat est soit déterministe (ennuyeux), soit aléatoire sans logique (injuste).

### `02-CONSTRUCTION/09-FUNCTIONAL-JS` : coder sans effets de bord

**Où ça se voit** : `src/engine/combat.js`, `src/engine/turnResolver.js`. Chaque tour retourne un nouvel état de combat. Jamais de mutation directe sur les stats.
**Pourquoi c'est nécessaire ici** : si un ninja est muté directement à chaque tour, rejouer le combat depuis le tour 2 devient impossible. La testabilité exige l'immutabilité (le fait de ne jamais modifier un objet existant, de toujours en créer un nouveau).

### `13_design_patterns` : les recettes qui structurent

**Où ça se voit** : `src/fighters/fighterFactory.js` (Factory pattern), `src/jutsus/` (Strategy pattern).
**Pourquoi c'est nécessaire ici** : le Factory pattern (une fonction qui crée des objets sans exposer comment ils sont construits) permet de créer Naruto, Sasuke ou Gaara avec la même interface. Le Strategy pattern (échanger un algorithme à la volée) permet de brancher n'importe quel jutsu sur n'importe quel ninja sans modifier le moteur.

### Résumé visuel

```text
00-SOCLE/04-FUNDAMENTALS  --> structure des fighters, HOF dans combat.js
02-CONSTRUCTION/04-MATH-BASICS   --> rng.js (probabilités), cooldownCycle.js (modulo)
02-CONSTRUCTION/09-FUNCTIONAL-JS  --> turnResolver.js (immutabilité, pas de mutation d'état)
13_design_patterns --> fighterFactory.js (Factory), jutsus/ (Strategy)
```

## ESTIMATION DE TEMPS ET ZONES DE RÉSISTANCE

**Durée totale estimée** : 12 à 18 heures de travail réel.

| Étape                     | Durée estimée | Zone de résistance                                  |
| ------------------------- | ------------- | --------------------------------------------------- |
| rng.js + cooldownCycle.js | 1h            | Faible                                              |
| fighterStats + jutsus     | 2h            | Faible                                              |
| fighterFactory.js         | 1h30          | Moyenne : penser l'interface sans la sur-compliquer |
| damageCalc.js             | 1h            | Faible                                              |
| turnResolver.js           | 3-4h          | **Haute** : garder l'immutabilité sous pression     |
| combat.js                 | 2h            | Moyenne : la boucle de jeu et sa condition d'arrêt  |
| logger + index            | 1h            | Faible                                              |
| Tests complets            | 2-3h          | Moyenne : tester le RNG sans le rendre déterministe |

Le point de résistance majeur est `turnResolver.js`. C'est là que la tentation de muter l'état directement est la plus forte. Si tu sens que tu écris `fighter.chakra -= damages`, arrête-toi et relis le module `02-CONSTRUCTION/09-FUNCTIONAL-JS`.

## CAS LIMITES À TESTER OBLIGATOIREMENT

Ces cas doivent avoir un test chacun. Sans eux, le moteur a des angles morts :

1. **Combat avec deux fighters identiques** : `startCombat(naruto, naruto)` : le moteur ne doit pas boucler infiniment ni planter.
2. **Jutsu avec cooldown actif** : un jutsu demandé alors que son cooldown n'est pas terminé doit être remplacé par l'attaque de base, pas ignoré.
3. **Chakra à 0 avant la fin** : si un fighter tombe à 0 chakra, le combat s'arrête immédiatement, même si le tour n'est pas terminé.
4. **RNG en mode déterministe pour les tests** : `rng.js` doit accepter une seed (valeur initiale fixe) ou un mode "test" qui retourne des valeurs prédéfinies, pour que les tests de combat ne soient pas aléatoires.

## LES RÈGLES QUE TU NE DOIS JAMAIS CASSER

1. **Zéro mutation directe sur un fighter ou sur l'état du combat.** `fighter.chakra -= x` est interdit. Tu crées un nouvel objet à chaque modification.
2. **Zéro `if` par jutsu dans le moteur.** Le moteur ne connaît pas les noms des jutsus. Il appelle une fonction. C'est la fonction qui sait ce qu'elle fait.
3. **Zéro bibliothèque externe.** Pas de lodash, pas de ramda. Tu construis `pipe` et `compose` toi-même si tu en as besoin.
4. **`rng.js` doit supporter un mode déterministe pour les tests.** Sans ça, les tests de combat sont flaky : parfois verts, parfois rouges selon le résultat aléatoire. Implémente une seed ou un mock injectable (`rng.setMode('test', [0.1, 0.9, 0.5, ...])`) avant d'écrire le premier test de combat. C'est non-négociable.

## CE QUE TU NE FAIS PAS DANS CE PROJET

- Pas d'interface graphique, pas d'animation, pas de Canvas.
- Pas de persistance (sauvegarde entre deux sessions).
- Pas de multijoueur réseau.
- Pas de TypeScript (ce module arrive plus tard dans le curriculum).

## LES ADR

```text
ADR/001-pourquoi-strategy-pattern-pour-les-jutsus.md
ADR/002-pourquoi-immutabilite-totale-sur-letat-de-combat.md
ADR/003-pourquoi-rng-injectable-pour-les-tests.md
```

Micro-exemple de forme (contexte distinct du projet) :

Le bloc suivant illustre uniquement la **forme** attendue d’un ADR. Il ne fournit aucune décision à réutiliser dans ce projet.

```markdown
# ADR : Stocker les préférences d’affichage dans un objet immuable

## Contexte

Une application de bibliothèque doit transmettre les préférences d’affichage entre plusieurs composants. Deux options existent : muter un objet partagé ou produire une nouvelle valeur à chaque changement.

## Décision

Utiliser une nouvelle valeur immuable à chaque changement de préférence.

## Alternatives considérées

- Objet mutable partagé : rejeté ici à cause des effets de bord difficiles à localiser.
- Copie profonde systématique : rejetée car inutilement coûteuse pour ce petit modèle.

## Conséquences

Les transitions sont plus faciles à tester et à journaliser, au prix de quelques allocations supplémentaires.
```

**Important : cet exemple est hors contexte du projet. Pour tes ADR, la décision, les alternatives et les conséquences doivent être produites par toi.**

## QUAND EST-CE QUE LE PROJET EST VRAIMENT FINI

```json
[ ] un combat complet s'affiche dans la console avec le format exact montré en intro
[ ] les 4 fichiers de tests passent avec au moins 50 tests au total
[ ] aucune mutation directe d'état nulle part dans src/
[ ] rng.js supporte un mode déterministe (seed ou mock injectable) : vérifié dans rng.test.js
[ ] les tests de combat sont stables (relancer npm test 3 fois : toujours le même résultat)
[ ] les 4 cas limites listés ont chacun un test
[ ] fighterFactory crée des fighters indépendants (pas de référence partagée)
[ ] les 3 ADR sont remplis avec contexte, décision, alternatives, conséquences
[ ] 08-POSTMORTEM.md documente au moins une décision difficile prise pendant le dev
[ ] 02-TDD-JOURNAL.md trace l'ordre dans lequel les tests ont été écrits
```

## SÉCURITÉ (gate obligatoire)

Un projet qui marche mais qui est vulnérable n'est pas fini. Traite ces exigences OWASP contextuelles avant de livrer.

- Validation d'entrée (OWASP A03 - Injection) : le moteur doit rejeter proprement une commande/config malformée sans exposer sa stack interne.
- Déni de service (OWASP A05) : borner toute boucle/récursion pilotée par l'entrée pour éviter un blocage du process.

Pour chaque exigence : documente dans `SECURITY.md` la menace, ta contre-mesure et le test qui la prouve. Le `97-CHECKPOINT-PACK` de ce projet contient un test de sécurité qui doit passer.

---

## Securite (gate obligatoire, Partie I)

- **Exigence 1** : aucune donnee sensible (secret, token, cle) dans le code source ni dans les logs. Utiliser variables d'environnement + `.env.example` versionne (jamais `.env`).
- **Exigence 2** : toute entree externe (STDIN, fichier, HTTP, CLI) est validee AVANT usage (type, longueur, format). En cas d'invalidite : erreur explicite, jamais un crash silencieux.

Un test dans `node learner-verifier.js` (auto-verif ecrite par toi) doit prouver ces deux points (ex : lancer le programme avec une entree malformee et verifier qu'il refuse proprement).

## RÔLE DES DOSSIERS (ne skippe pas)

- `src/` : **tu remplis toi-même**. Le dossier est vide exprès : c'est ton livrable. Aucun code fourni.
- `tests/` : **TDD strict : tu écris le test AVANT le code de `src/`**. Rouge → vert → refactor. Si `tests/` est vide en fin de projet, ce projet ne compte pas dans ton portfolio.
- `ADR/` : **au moins 1 décision architecturale documentée** (choix de structure, trade-off, alternative rejetée + pourquoi). Format : Contexte / Décision / Conséquences.
- `08-POSTMORTEM.md` : **rédigé à la fin, honnête**. Ce qui a foiré, combien de temps t'a coûté chaque blocage, ce que tu referais autrement.
- `02-TDD-JOURNAL.md` : trace vivante du cycle rouge/vert/refactor.

**Un CTO qui feuillette ton portfolio regarde `src/` ET `tests/` ET `ADR/`. Un `src/` vide sans `tests/` associé = projet non fini, quelle que soit la qualité du reste.**

---

## CONTRAT ANTI-RECETTE

Tu choisis toi-même la découpe, les modules, l’ordre de construction et les tests. Aucun squelette d’architecture n’est fourni.

Avant de coder, produis :

- trois hypothèses vérifiables sur le système ;
- une première découpe que tu défends et une alternative rejetée ;
- un test falsifiant une hypothèse importante ;
- les critères qui te feront changer d’architecture en cours de route.

Ne cherche pas une architecture « correcte » dans le curriculum : le but est de reconstruire un modèle sous contrainte, puis de défendre pourquoi il tient.
