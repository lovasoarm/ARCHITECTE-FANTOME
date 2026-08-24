---
stability: intemporel
acte: comprendre
route_family: depth
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Cahier des charges : oracle glitch

Temps de lecture ~15 min

## PRÉREQUIS

```text
Node.js    : v22.23.2
npm      : v10+
Variables env : ANTHROPIC_API_KEY (obligatoire pour les appels API réels)
Outils externes: aucun

# Installation
$ npm install

# Configurer la clé API (créer un fichier .env à la racine)
ANTHROPIC_API_KEY=sk-ant-...

# Lancer une analyse
$ node src/cli.js analyze src/target.js

# Lancer les tests (n'appellent PAS l'API réelle : streamingClient est mocké)
$ npm test
```

Le modèle utilisé dans `streamingClient.js` : `claude-haiku-4-5-20251001` (le moins coûteux, suffisant pour l'analyse de code). Les tests n'appellent jamais l'API réelle : `streamingClient` est mocké via Jest. Chaque `npm test` coûte 0 token.

---

## C'EST QUOI CE PROJET, CONCRÈTEMENT

L'IA se prend pour un génie. Elle analyse ton code JavaScript, détecte des bugs, propose des fixes, génère des tests. Parfois elle a raison. Parfois elle invente des fonctions qui n'existent pas, retourne du JSON malformé à mi-chemin, te jure qu'un `NaN === NaN` est `true`, ou te propose un fix qui introduit une dépendance circulaire. Ton boulot : construire le pipeline qui la surveille, la valide, et la remet à sa place quand elle délire.

Ce que tu dois voir à la fin :

```bash
$ node src/cli.js analyze src/target.js

[ORACLE] Analyse en cours... (streaming token par token)

--- sortie LLM brute ---
{
 "bugs": [
  { "line": 14, "description": "Reference error potentiel", "fix": "Vérifier l'existence avant l'accès" }
 ],
 "tests": [
  "test('devrait retourner undefined pour une clé inexistante', () => { ... })"
 ],
 "confidence": 0.87
}
--- fin sortie LLM ---

[VALIDATOR] Schema OK | confidence: 0.87 (> seuil 0.6)
[VALIDATOR] 1 bug détecté | 1 test généré
[OUTPUT] Résultats dans results/analysis_target.json

$ npm test
PASS tests/promptBuilder.test.js (12 tests)
PASS tests/outputValidator.test.js (20 tests)
PASS tests/codeAnalyzer.test.js (14 tests)
PASS tests/edgeCases.test.js (16 tests)
```

Ce projet est le seul qui appelle l'Anthropic API. Il mixe OOP (programmation orientée objet), gestion d'edge cases JS, et la mécanique concrète de "coder avec l'IA sans lui faire confiance aveuglément".

## POURQUOI CE PROJET EXISTE

Ce projet teste une compétence qui n'existait pas dans le métier il y a 5 ans : écrire du code qui contrôle de l'IA.

- **la sortie d'un LLM (Large Language Model : modèle de langage de grande taille) n'est jamais garantie** : même un modèle de haute qualité peut retourner du JSON malformé, une réponse tronquée, un champ avec le mauvais type. Le code qui consomme cette sortie doit être défensif par défaut.
- **streamer token par token, c'est différent de recevoir une réponse complète** : avec le streaming, la réponse arrive progressivement. Le validateur ne peut pas attendre la fin pour valider. Il doit assembler, puis valider.
- **OOP ici n'est pas un exercice scolaire** : `CodeAnalyzer`, `PromptBuilder`, `OutputValidator` ont des responsabilités distinctes. Si les trois étaient dans un seul fichier, tester une partie sans les autres serait impossible.

## LES 4 MODULES QUE CE PROJET COUVRE, ET OÙ ILS SE VOIENT DANS LE CODE

### `04-EPREUVE/04-BIG-APP-SNOOP` : workflow IA, consigne engineering, validation

**Où ça se voit** : `src/consigne/`, `src/validator/`, `src/streaming/`.
**Pourquoi c'est nécessaire ici** : le consigne n'est pas une chaîne hardcodée. Il est construit dynamiquement selon le code analysé. La sortie est validée selon un schéma attendu. Sans ces deux éléments, le pipeline est un casino.

### `02-CONSTRUCTION/17-OOP-JS` : classes, prototype chain, mixins

<!-- AF-DIAGRAM:prototype -->

```text
┌──────────────┐
│ objet        │
└──────┬───────┘
       │ [[Prototype]]
       ▼
┌──────────────┐
│ prototype    │
└──────┬───────┘
       │ [[Prototype]]
       ▼
┌──────────────┐
│ Object.proto │
└──────────────┘
```

Une propriété absente sur l’objet est recherchée le long de sa chaîne de prototypes.

**Où ça se voit** : `src/analyzer/CodeAnalyzer.js`, `src/validator/OutputValidator.js`, `src/validator/StrictValidator.js`.
**Pourquoi c'est nécessaire ici** : `Validator` → `StrictValidator` → `LLMOutputValidator` est une chaîne d'héritage réelle avec un usage intentionnel du prototype. Les mixins composent des comportements (loggable, retryable) sans hériter de tout.

### `03-PILOTAGE/10-TEAM-CRAFT` : code review outillée, ADR

**Où ça se voit** : `src/review/`, `ADR/`.
**Pourquoi c'est nécessaire ici** : l'IA propose des fixes. Un humain ne peut pas relire 200 suggestions à la main. Le pipeline de review automatise une première passe : les suggestions qui violent des règles connues (nommage, mutation, dépendances circulaires) sont rejetées avant qu'un humain les lise.

### `05-MAITRISE/03-EDGE-CASES` : NaN, floating point, undefined dans des tableaux

**Où ça se voit** : `src/edgeCases/edgeCaseInjector.js`, `tests/edgeCases.test.js`.
**Pourquoi c'est nécessaire ici** : l'IA ne voit pas que `0.1 + 0.2 !== 0.3`. Elle ne sait pas que `NaN === NaN` est `false`. Ces cas sont injectés délibérément dans les scénarios de test pour vérifier que le pipeline les détecte, même quand l'IA les rate.

### Résumé visuel

```text
04-EPREUVE/04-BIG-APP-SNOOP --> src/consigne/ (PromptBuilder), src/validator/ (schema), src/streaming/
02-CONSTRUCTION/17-OOP-JS    --> CodeAnalyzer, Validator -> StrictValidator -> LLMOutputValidator, mixins
03-PILOTAGE/10-TEAM-CRAFT  --> src/review/ (review automatisée), ADR/ (toutes les décisions du pipeline)
05-MAITRISE/03-EDGE-CASES  --> src/edgeCases/ (injecteur de pièges), tests/edgeCases.test.js
```

## ESTIMATION DE TEMPS ET ZONES DE RÉSISTANCE

**Durée totale estimée** : 16 à 22 heures de travail réel.

| Étape                 | Durée estimée | Zone de résistance                                                        |
| --------------------- | ------------- | ------------------------------------------------------------------------- |
| Validator (3 niveaux) | 3h            | Moyenne : bien utiliser le prototype sans sur-compliquer                  |
| PromptBuilder         | 2h            | Moyenne : construire un consigne qui donne du JSON fiable                 |
| streamAssembler       | 1h            | Faible                                                                    |
| streamingClient       | 2-3h          | **Haute** : l'API Anthropic streaming est différente d'un fetch classique |
| reviewPipeline        | 2h            | Moyenne                                                                   |
| mixins                | 1h30          | Moyenne : comprendre comment greffer sans héritage                        |
| CodeAnalyzer          | 2h            | Faible (orchestre les briques déjà construites)                           |
| edgeCases + tests     | 3h            | Moyenne : inventer des cas où l'IA se plante est créatif                  |

Le streaming client est le plus risqué si c'est la première fois qu'on appelle une API streaming. La différence avec un `fetch` classique : les données arrivent par morceaux, pas d'un coup. Chaque morceau est un event qu'il faut gérer.

## CAS LIMITES À TESTER OBLIGATOIREMENT

1. **JSON tronqué à mi-chemin** : l'API coupe la réponse avant la fin (timeout réseau). Le `streamAssembler.finalize()` doit lancer une erreur claire, pas retourner du JSON invalide silencieusement.
2. **Réponse vide de l'API** : l'API retourne une chaîne vide. Pas une erreur HTTP, juste du vide. Le validator doit rejeter.
3. **`confidence: NaN`** : l'IA retourne un nombre invalide. `typeof NaN === 'number'` en JS, donc le check de type ne suffit pas. Il faut `Number.isNaN()`.
4. **Bug suggéré avec une ligne négative** : `{ line: -1, description: "..." }`. Une ligne de code n'est jamais négative. Le validator rejette.
5. **Timeout API à 3 secondes** : si l'API ne répond pas en 3 secondes, abort la requête et throw `APITimeoutError`. Le pipeline ne reste pas bloqué.

## LES RÈGLES QUE TU NE DOIS JAMAIS CASSER

1. **La sortie de l'IA n'est jamais utilisée directement sans passer par le validator.** Même si le JSON semble correct à l'oeil, il passe par `LLMOutputValidator.validate()`.
2. **Chaque appel API a un timeout explicite.** Pas de requête qui peut rester en attente indéfiniment.
3. **`streamingClient` est mocké dans tous les tests.** Zéro appel API dans `npm test`. Jamais. Sinon les tests deviennent lents, coûtent de l'argent, et échouent si la connexion est coupée. Un mock qui retourne des réponses prédéfinies (valide, invalide, tronquée, vide) suffit à tout tester.
4. **Le POSTMORTEM documente au moins un cas où l'IA s'est plantée et comment le pipeline l'a détecté.** Ce fichier est la preuve que le pipeline fait son travail.

## CE QUE TU NE FAIS PAS DANS CE PROJET

- Pas d'interface graphique.
- Pas de TypeScript (ce projet reste JS pour se concentrer sur OOP et edge cases natifs).
- Pas de base de données (les résultats sont sauvegardés en JSON dans `results/`).
- Pas de streaming vidéo/audio.

## LES ADR

```text
ADR/001-pourquoi-chaine-heritage-validator-strictvalidator-llmoutputvalidator.md
ADR/002-pourquoi-timeout-3s-sur-tous-les-appels-api.md
ADR/003-pourquoi-review-pipeline-separe-du-validator.md
```

Micro-exemple de forme (contexte distinct du projet) :

Il s’agit d’un exemple de rédaction d’ADR, volontairement sans rapport avec les décisions de ce mini-projet.

```markdown
# ADR : Encapsuler la génération d’horodatage dans une petite abstraction

## Contexte

Un service produit des événements dont les tests doivent pouvoir contrôler précisément l’heure observée.

## Décision

Passer une abstraction d’horloge au service au lieu d’appeler directement l’horloge système partout.

## Alternatives considérées

- Lire l’heure système directement : rejeté car les tests deviennent dépendants du temps réel.
- Modifier globalement l’horloge pendant les tests : rejeté car cela crée des interactions cachées entre tests.

## Conséquences

Les tests deviennent déterministes ; l’API interne du service comporte une dépendance supplémentaire explicite.
```

**Important : exemple de forme uniquement. Aucune réponse au problème d’architecture du projet n’est fournie.**

## QUAND EST-CE QUE LE PROJET EST VRAIMENT FINI

```json
[ ] une analyse complète d'un fichier JS s'affiche dans la console
[ ] le streaming fonctionne (les tokens s'affichent un par un, pas tout d'un coup)
[ ] le validator rejette les 5 cas limites listés (tests verts)
[ ] le reviewPipeline rejette au moins un type de suggestion dangereuse (eval, innerHTML brut)
[ ] le POSTMORTEM documente un vrai cas où l'IA s'est plantée et le pipeline l'a attrapé
[ ] les mixins loggable et retryable sont utilisés sur au moins une classe
[ ] les 3 ADR sont remplis avec contexte, décision, alternatives, conséquences
[ ] 02-TDD-JOURNAL.md trace quels tests ont été écrits avant le code du validator
[ ] zéro appel à la sortie LLM sans passer par validate() dans le code de production
```

## SÉCURITÉ (gate obligatoire)

Un projet qui marche mais qui est vulnérable n'est pas fini. Traite ces exigences OWASP contextuelles avant de livrer.

- Injection (OWASP A03) : requêtes paramétrées uniquement, jamais de concaténation d'entrée.
- Gestion d'erreurs (OWASP A09) : messages d'erreur génériques, pas de fuite de détails internes.

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
