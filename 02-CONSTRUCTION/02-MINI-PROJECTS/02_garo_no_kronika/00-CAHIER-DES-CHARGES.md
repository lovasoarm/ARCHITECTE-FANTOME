---
stability: intemporel
acte: comprendre
route_family: depth
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Cahier des charges : garo no kronika

Temps de lecture ~14 min

## PRÉREQUIS

```text
Node.js    : v22.23.2
npm      : v10+
Variables env : aucune
Outils externes: aucun

# Installation
$ npm install

# Lancer la démo
$ node src/index.js

# Lancer les tests
$ npm test
```

Le streaming est simulé via le module natif `events` de Node.js (`EventEmitter`), pas via un vrai serveur HTTP. Zéro dépendance réseau, zéro port ouvert. C'est un choix délibéré : l'objectif est de comprendre le pattern event-driven, pas de configurer un serveur SSE.

---

## C'EST QUOI CE PROJET, CONCRÈTEMENT

Inspiré de Garo Honoo no Kokuin (Garo : La flamme de la marque). Des Horrors (démons qui prennent forme humaine et dévorent les faibles) apparaissent dans plusieurs quartiers de la ville simultanément. Un Conseil de Surveillance détecte les apparitions et dispatche des missions aux Chevaliers d'Or disponibles. Chaque Chevalier prépare son armure dorée (ce qui prend du temps), combat le Horror, et streame le résultat en temps réel vers le Conseil. L'armure ne peut tenir que 99,9 secondes. Si le combat dépasse ce seuil : l'armure se désintègre, le Chevalier est vulnérable, et la mission échoue.

Ce que tu dois voir tourner à la fin :

```bash
$ node src/index.js

[CONSEIL] Horror détecté : Quartier Est (niveau CRITIQUE)
[CONSEIL] Horror détecté : Quartier Ouest (niveau MODÉRÉ)
[DISPATCH] León Luis => Quartier Est
[DISPATCH] Alfonso San Valiante => Quartier Ouest

[ARMURE] León : préparation... (2.3s)
[ARMURE] Alfonso : préparation... (1.8s)
[COMBAT] León vs Horror Anima : en cours...
[COMBAT] Alfonso vs Horror Blade : en cours...
[STREAM] Alfonso => victoire en 44.2s | Quartier Ouest sécurisé
[STREAM] León => victoire en 67.8s | Quartier Est sécurisé
[CONSEIL] Rapport : 2/2 missions réussies | 0 armures désintégrées

$ npm test
PASS tests/dispatcher.test.js (18 tests)
PASS tests/knight.test.js (14 tests)
PASS tests/armor.test.js (12 tests)
PASS tests/council.test.js (10 tests)
```

Ce projet est différent du premier : tu gères de l'asynchrone réel (des opérations qui prennent du temps et qui peuvent se produire en parallèle), des erreurs qui doivent se propager proprement, et un flux d'événements en temps réel vers un observateur.

## POURQUOI CE PROJET EXISTE

Ce projet teste la maîtrise de l'asynchrone non pas en isolation mais sous contraintes multiples simultanées :

- **gérer plusieurs opérations async en parallèle sans bloquer le Conseil** : deux Chevaliers qui combattent en même temps ne peuvent pas se bloquer mutuellement. Le Conseil doit rester réactif pendant que les combats se déroulent.
- **respecter une contrainte de timeout critique** : si un combat dépasse 99,9 secondes, l'erreur doit être levée, propagée, et traitée. Pas absorbée en silence, pas ignorée. Traitée.
- **distinguer erreur fatale et erreur récupérable** : l'armure qui se désintègre est une erreur fatale (la mission échoue, on ne réessaie pas). Un Horror qui résiste plus longtemps que prévu est une situation dégradée (on continue mais on alerte).
- **streamer des événements vers un observateur sans couplage fort** : le Conseil n'appelle pas le Chevalier pour avoir des nouvelles. C'est le Chevalier qui émet des événements, et le Conseil écoute. C'est l'inversion du contrôle (pattern event-driven).

## LES 4 MODULES QUE CE PROJET COUVRE, ET OÙ ILS SE VOIENT DANS LE CODE

### `01-CADRAGE/02-ASYNC` : Promises, async/await, race, allSettled

<!-- AF-DIAGRAM:async_await -->

```text
┌──────────────┐
│ fonction     │
│ async        │
└──────┬───────┘
       │ await
       ▼
┌──────────────┐
│ suspend      │
│ la reprise   │
└──────┬───────┘
       │ Promise prête
       ▼
┌──────────────┐
│ reprend      │
│ le contexte  │
└──────────────┘
```

await suspend la reprise de la fonction async, pas l’ensemble du runtime.

**Où ça se voit** : `src/engine/dispatcher.js`, `src/engine/missionRunner.js`.
**Pourquoi c'est nécessaire ici** : chaque mission est une Promise. Deux missions en parallèle = `Promise.allSettled`. Le timeout de 99,9 secondes = `Promise.race` entre le combat et un timer. Sans maîtrise de ces primitives async, le dispatcher bloque ou perd des missions.

### `01-CADRAGE/04-ERROR-HANDLING` : propagation et stratégies d'erreur

**Où ça se voit** : `src/errors/`, les `try/catch` dans `missionRunner.js`.
**Pourquoi c'est nécessaire ici** : `ArmorCollapseError`, `HorrorEscapeError`, `KnightDownError` sont des erreurs distinctes qui demandent des traitements distincts. Les absorber toutes dans un `catch (e) { console.log(e) }` est un crime. Le Conseil doit savoir exactement ce qui s'est passé.

### `04-EPREUVE/03-REALTIME` : SSE (Server-Sent Events) : flux d'événements unidirectionnels

**Où ça se voit** : `src/council/streamReceiver.js`, `src/knight/streamEmitter.js`.
**Pourquoi c'est nécessaire ici** : le Conseil reçoit les événements de combat en temps réel, pas à la fin du combat. Chaque coup, chaque changement de statut, chaque seconde critique : streamé. C'est le pattern SSE (Server-Sent Events : flux d'événements envoyés du serveur vers le client, unidirectionnel) simulé en JS pur ici.

### `02-CONSTRUCTION/14-ARCHITECTURE-PATTERNS` : event-driven, module pattern

<!-- AF-DIAGRAM:event_driven -->

```text
text
┌────────────┐      event      ┌────────────┐
│ Producer   │────────────────►│ Event Bus  │
└────────────┘                 └────┬───────┘
                                   ├────► Consumer A
                                   ├────► Consumer B
                                   └────► Consumer C
```

Un événement découple le producteur des consommateurs tout en faisant circuler un fait observable.

**Où ça se voit** : toute la séparation entre `src/council/` et `src/knight/`. Le Conseil ne connaît pas l'implémentation des Chevaliers.
**Pourquoi c'est nécessaire ici** : si le Conseil appelle directement les méthodes du Chevalier, tout est couplé. Si le Chevalier émet des événements et que le Conseil s'abonne, on peut changer l'implémentation d'un Chevalier sans toucher au Conseil. C'est le cœur de l'architecture event-driven.

### Résumé visuel

```text
01-CADRAGE/02-ASYNC       --> dispatcher.js (allSettled), missionRunner.js (race + timeout)
01-CADRAGE/04-ERROR-HANDLING  --> errors/ (custom errors), propagation dans missionRunner.js
04-EPREUVE/03-REALTIME     --> streamEmitter.js (Chevalier émet), streamReceiver.js (Conseil écoute)
15_architecture   --> découplage total Conseil / Chevalier via événements
```

## ESTIMATION DE TEMPS ET ZONES DE RÉSISTANCE

**Durée totale estimée** : 14 à 20 heures de travail réel.

| Étape              | Durée estimée | Zone de résistance                                        |
| ------------------ | ------------- | --------------------------------------------------------- |
| errors/            | 30min         | Faible                                                    |
| armor.js           | 2h            | Moyenne : gérer le timer correctement sans memory leak    |
| knight + stream    | 2h            | Moyenne : le pattern emitter/receiver                     |
| combat.js          | 1h30          | Faible                                                    |
| missionRunner.js   | 4-5h          | **Haute** : Promise.race + gestion des erreurs imbriquées |
| dispatcher.js      | 2h            | Moyenne : allSettled et lecture des résultats partiels    |
| council.js + index | 1h30          | Faible                                                    |
| Tests complets     | 2-3h          | Moyenne : mocker des Promises qui résolvent ou reject     |

Le point de résistance majeur est `missionRunner.js`. La combinaison de `Promise.race`, d'un timeout, et de la propagation d'erreurs typées dans un même bloc async est précisément ce que le module `01-CADRAGE/02-ASYNC` + `01-CADRAGE/04-ERROR-HANDLING` préparent. Si tu bloques ici, relis `01-CADRAGE/04-ERROR-HANDLING/04-error_propagation.md`.

## CAS LIMITES À TESTER OBLIGATOIREMENT

1. **Timeout à 99,9 secondes** : simulé avec un timer court en test (50ms). Le `Promise.race` doit rejeter avec `ArmorCollapseError`, pas une erreur générique.
2. **Plus de Horrors que de Chevaliers disponibles** : le dispatcher doit émettre un `HorrorEscapeError` pour chaque Horror sans Chevalier, sans bloquer les missions déjà lancées.
3. **Deux missions en parallèle dont une échoue** : `Promise.allSettled` doit retourner les deux résultats. Le succès de la première ne doit pas masquer l'échec de la seconde.
4. **Événement streamé après la fin de la mission** : le streamReceiver ne doit pas planter si un événement arrive après que la mission est terminée.

## LES RÈGLES QUE TU NE DOIS JAMAIS CASSER

1. **Zéro `catch` vide.** Chaque erreur est catchée, classée, et remontée ou loggée. Un `catch (e) {}` sans contenu est interdit.
2. **Le Conseil ne connaît pas les méthodes internes des Chevaliers.** `council.js` ne fait jamais `knight.attack()` ou `knight.defend()`. Il écoute des événements, c'est tout.
3. **Chaque erreur custom a ses métadonnées.** `new ArmorCollapseError({ knight: 'leon', duration: 102 })` : pas juste un message texte.

## CE QUE TU NE FAIS PAS DANS CE PROJET

- Pas de serveur HTTP réel (le streaming est simulé en JS pur, pas avec un vrai serveur SSE).
- Pas de persistance entre les sessions.
- Pas d'interface graphique.
- Pas de TypeScript.

## LES ADR

```text
ADR/001-pourquoi-promise-race-pour-le-timeout-armure.md
ADR/002-pourquoi-event-driven-entre-chevalier-et-conseil.md
ADR/003-pourquoi-allsettled-plutot-que-all-pour-le-dispatch.md
```

Micro-exemple de forme (contexte distinct du projet) :

Le bloc suivant montre seulement comment structurer un ADR ; il ne donne aucune solution pour les décisions de ce projet.

```markdown
# ADR : Utiliser un identifiant de corrélation dans les journaux

## Contexte

Un service de facturation déclenche plusieurs étapes asynchrones et doit permettre de regrouper les logs d’une même opération.

## Décision

Attribuer un identifiant de corrélation au début de l’opération et le propager dans chaque étape.

## Alternatives considérées

- Utiliser uniquement l’horodatage : rejeté car plusieurs opérations peuvent partager la même résolution temporelle.
- Déduire la relation depuis le payload : rejeté car le payload métier ne doit pas porter cette responsabilité technique.

## Conséquences

Le diagnostic devient plus simple et les logs gagnent une petite quantité de métadonnées.
```

**Important : cet exemple est hors contexte du projet. La décision réelle de chaque ADR doit être trouvée, argumentée et défendue par toi.**

## QUAND EST-CE QUE LE PROJET EST VRAIMENT FINI

```json
[ ] une démo complète avec 2 missions parallèles s'affiche dans la console
[ ] Promise.race est utilisé dans missionRunner.js avec un vrai timeout
[ ] Promise.allSettled est utilisé dans dispatcher.js pour les missions parallèles
[ ] les 3 classes d'erreur custom existent avec métadonnées
[ ] les 4 cas limites ont chacun un test
[ ] le Conseil n'appelle aucune méthode interne des Chevaliers directement
[ ] les 3 ADR sont remplis avec contexte, décision, alternatives, conséquences
[ ] 08-POSTMORTEM.md documente au moins un bug async rencontré pendant le dev
[ ] 02-TDD-JOURNAL.md trace quels tests ont été écrits en premier
```

## SÉCURITÉ (gate obligatoire)

Un projet qui marche mais qui est vulnérable n'est pas fini. Traite ces exigences OWASP contextuelles avant de livrer.

- Validation d'entrée (OWASP A03) : sanitizer les données de chronique avant traitement (pas d'injection via les champs texte).
- Intégrité des données (OWASP A08) : vérifier la cohérence des enregistrements avant persistance.

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
