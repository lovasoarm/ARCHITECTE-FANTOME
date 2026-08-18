---
stability: intemporel
acte: restituer
---

# Page verrouillée

> Rappel : ce grimoire simplifie via analogies. Lire d'abord [`05-MAITRISE/06_annexes/GRIMOIRE_CODE_HONNEUR.md`](../../05-MAITRISE/06_annexes/18_GRIMOIRE_CODE_HONNEUR.md).

Temps de lecture ~6 min

> **Interdit de lire cette page avant d'avoir coché la checklist ci-dessous.**
> Un grimoire lu trop tôt donne l'illusion de savoir. C'est le pire piège pédagogique.

## Checklist prérequis

- [ ] J'ai fini **tous** les exercices du module courant.
- [ ] J'ai réussi le `00_prereq_check.md` du module suivant.
- [ ] J'ai écrit **au moins un** de mes propres exemples (pas copié).
- [ ] Je peux réexpliquer les 3 concepts phares du module **sans regarder**.

Si une seule case n'est pas cochée : ferme ce fichier. Reviens plus tard.

---

## TESTING GRIMOIRE

Le vocabulaire du testing. Chaque terme à sa place. Pas de confusion possible.

---

## TYPES DE TESTS

| Terme | Définition | Code | Analogies | Limite |
| ------------------ | --------------------------------------------------------------------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------- |
| Unit test          | Teste une seule fonction en isolation totale, toutes les dépendances remplacées par des mocks | `expect(calculeKDA(10,5,2)).toBe(6.25)`                 | sniper qui vise un seul ennemi / chirurgien qui opère un seul organe                               | « sniper qui vise un seul ennemi » a une frontière visible à l'oeil ; sur Unit test, l'isolation par mock rend le test vert alors que l'intégration réelle est cassée. Mesure la valeur d'un test à ce qu'il détecte, pas à sa présence. |
| Test d'intégration | Teste plusieurs modules branchés ensemble, vérifie que les interfaces sont compatibles        | `const r = validateVote(vote); stockeVote(r)`           | tester toute une chaîne de montage / brancher deux circuits et vérifier que le courant passe       | « tester toute une chaîne de montage » se corrige toute seule quand elle dérape ; sur Test d'intégration, un test écrit après le code teste souvent ce que le code fait, pas ce qu'il devrait faire. Casse volontairement le code et vérifie que le test rougit. |
| Test E2E           | Simule un shinobi réel dans un vrai navigateur du clic jusqu'à la base de données             | `await page.click('button'); expect(...).toBeVisible()` | observateur qui suit le client de l'entrée jusqu'à la caisse / agent qui teste le parcours complet | « observateur qui suit le client de l'entrée jusqu'à la caisse » tient tant que rien ne tombe en route ; sur Test E2E, le double de test fige un comportement supposé de la dépendance, pas son comportement réel. Compare le double de test au contrat réel de la dépendance avant de t'y fier. |
| Contract test      | Vérifie que le format de réponse d'un service respecte ce qu'un autre service attend          | `validContrat(réponse, schéma)`                         | contrat signé entre deux équipes / cahier des charges que chaque partie s'engage à respecter       | « contrat signé entre deux équipes » n'a ni facture ni horloge ; sur Contract test, un test vert prouve l'absence du bug testé, jamais l'absence de bug. Casse volontairement le code et vérifie que le test rougit. |
| TDD                | Écrire le test avant le code, cycle RED → GREEN → REFACTOR                                    | écrire `expect(fn()).toBe(x)` avant `fn()` existe       | dessiner le plan avant de construire / écrire le cahier des charges avant de coder                 | « dessiner le plan avant de construire » raconte le cas nominal ; sur TDD, un test qui dépend de l'horloge ou de l'ordre des fichiers devient instable sans que le code change. Compare le double de test au contrat réel de la dépendance avant de t'y fier. |

---

## DOUBLURES DE TEST

| Terme | Définition | Code | Analogies | Limite |
| ----- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- | ------- |
| Mock  | Remplace une dépendance ET enregistre les appels : qui l'a appelé, combien de fois, avec quels args            | `const envoi = jest.fn(); expect(envoi).toHaveBeenCalledWith(...)` | acteur doublure qui joue le rôle ET garde un journal de tournage / agent sous couverture qui rapporte tous les contacts | « acteur doublure qui joue le rôle ET garde un journal de tournage » suppose que quelqu'un surveille ; sur Mock, l'isolation par mock rend le test vert alors que l'intégration réelle est cassée. Compare le double de test au contrat réel de la dépendance avant de t'y fier. |
| Stub  | Remplace une fonction par une valeur fixe sans enregistrer les appels, sert juste à contrôler le retour        | `jest.fn().mockReturnValue(true)`                                  | réponse automatique sur un téléphone / panneau qui indique toujours la même direction                                   | « réponse automatique sur un téléphone » a une frontière visible à l'oeil ; sur Stub, réparer un test flaky en le relançant supprime le signal, pas la cause. Mesure la valeur d'un test à ce qu'il détecte, pas à sa présence. |
| Spy   | Surveille une vraie fonction sans la remplacer : la laisse s'exécuter et enregistre comment elle a été appelée | `jest.spyOn(logger, 'warn')`                                       | caméra de surveillance qui observe sans intervenir / observateur qui prend des notes sans toucher                       | « caméra de surveillance qui observe sans intervenir » se rejoue à l'identique, le code non ; sur Spy, la couverture mesure les lignes exécutées, pas les cas de figure envisagés. Ajoute un cas issu d'un incident réel plutôt qu'un cas inventé. |
| Fake  | Implémentation simplifiée mais fonctionnelle (ex: DB in-memory), différente de la vraie mais qui marche        | base de données tableau JS à la place de PostgreSQL                | décor de cinéma qui ressemble à la vraie chose / simulateur de vol qui reproduit les conditions sans voler vraiment     | « décor de cinéma qui ressemble à la vraie chose » suppose que quelqu'un surveille ; sur Fake, les données de test propres ne ressemblent pas aux données de production sales. Ajoute un cas issu d'un incident réel plutôt qu'un cas inventé. |

---

## CONCEPTS JEST

| Terme | Définition | Code | Analogies | Limite |
| -------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------- | ------- |
| `describe`           | Groupe logique de tests autour d'une même unité, affecte pas l'exécution, juste l'organisation | `describe('calculeKDA', () => { ... })`     | chapitre d'un livre / dossier qui regroupe les fichiers d'un même sujet                     | « chapitre d'un livre » a une frontière visible à l'oeil ; sur describe, le double de test fige un comportement supposé de la dépendance, pas son comportement réel. Casse volontairement le code et vérifie que le test rougit. |
| `it` / `test`        | Déclare un test individuel avec une description en langage humain du comportement attendu      | `it('retourne 0 si deaths vaut 0', ...)`    | scénario d'un film / règle précise dans un contrat                                          | « scénario d'un film » raconte le cas nominal ; sur it / test, le double de test fige un comportement supposé de la dépendance, pas son comportement réel. Mesure la valeur d'un test à ce qu'il détecte, pas à sa présence. |
| `expect`             | Lance une assertion : compare la valeur réelle à la valeur attendue via un matcher             | `expect(valeur).toBe(résultat)`             | balance qui compare deux poids / arbitre qui vérifie si la balle est dans la zone           | « balance qui compare deux poids » se corrige toute seule quand elle dérape ; sur expect, l'isolation par mock rend le test vert alors que l'intégration réelle est cassée. Compare le double de test au contrat réel de la dépendance avant de t'y fier. |
| `beforeEach`         | Callback qui s'exécute avant chaque test du describe : remise à zéro de l'état                 | `beforeEach(() => { store.clear() })`       | préparation du terrain avant chaque match / reset d'une console de jeu                      | « préparation du terrain avant chaque match » se corrige toute seule quand elle dérape ; sur beforeEach, réparer un test flaky en le relançant supprime le signal, pas la cause. Compare le double de test au contrat réel de la dépendance avant de t'y fier. |
| `afterEach`          | Callback après chaque test : nettoyage des effets de bord (timers, mocks, connexions)          | `afterEach(() => { jest.clearAllMocks() })` | nettoyage du plateau après chaque round / fermeture des connexions après chaque session     | « nettoyage du plateau après chaque round » raconte le cas nominal ; sur afterEach, un test écrit après le code teste souvent ce que le code fait, pas ce qu'il devrait faire. Casse volontairement le code et vérifie que le test rougit. |
| `jest.clearAllMocks` | Réinitialise les compteurs et retours de tous les mocks sans les désinstaller                  | `jest.clearAllMocks()`                      | effacer le tableau sans enlever la craie / vider les compteurs sans débrancher les capteurs | « effacer le tableau sans enlever la craie » s'arrête à la première surprise ; sur jest.clearAllMocks, l'isolation par mock rend le test vert alors que l'intégration réelle est cassée. Ajoute un cas issu d'un incident réel plutôt qu'un cas inventé. |

---

## MATCHERS

| Terme | Définition | Code | Analogies | Limite |
| ---------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------- |
| `toBe`                 | Égalité stricte (===), pour les primitives uniquement, échoue sur les objets (référence)          | `expect(42).toBe(42)`                    | comparer deux empreintes digitales / vérifier l'identité d'une personne, pas juste sa ressemblance          | « comparer deux empreintes digitales » s'arrête à la première surprise ; sur toBe, la couverture mesure les lignes exécutées, pas les cas de figure envisagés. Mesure la valeur d'un test à ce qu'il détecte, pas à sa présence. |
| `toEqual`              | Comparaison profonde de valeur, pour les objets et tableaux : compare le contenu pas la référence | `expect({a:1}).toEqual({a:1})`           | comparer le contenu de deux coffres-forts / vérifier si deux copies d'un document sont identiques           | « comparer le contenu de deux coffres-forts » se rejoue à l'identique, le code non ; sur toEqual, un test qui dépend de l'horloge ou de l'ordre des fichiers devient instable sans que le code change. Mesure la valeur d'un test à ce qu'il détecte, pas à sa présence. |
| `toBeCloseTo`          | Comparaison de flottants avec tolérance (±2 décimales par défaut)                                 | `expect(0.1+0.2).toBeCloseTo(0.3)`       | mesure à quelques millimètres près / poids au gramme près et pas à l'atome                                  | « mesure à quelques millimètres près » suppose un seul acteur à la fois ; sur toBeCloseTo, un test vert prouve l'absence du bug testé, jamais l'absence de bug. Ajoute un cas issu d'un incident réel plutôt qu'un cas inventé. |
| `toThrow`              | Vérifie qu'une fonction lève une erreur (l'appel doit être wrappé dans une arrow function)        | `expect(() => fn()).toThrow('msg')`      | tester qu'une alarme sonne / vérifier qu'un fusible saute sous surcharge                                    | « tester qu'une alarme sonne » s'arrête à la première surprise ; sur toThrow, les données de test propres ne ressemblent pas aux données de production sales. Casse volontairement le code et vérifie que le test rougit. |
| `toHaveBeenCalledWith` | Vérifie les arguments exacts avec lesquels un mock a été appelé                                   | `expect(fn).toHaveBeenCalledWith('arg')` | vérifier les logs d'accès avec les détails / contrôler l'entrée passée, pas juste qu'une entrée a été passée | « vérifier les logs d'accès avec les détails » se rejoue à l'identique, le code non ; sur toHaveBeenCalledWith, l'isolation par mock rend le test vert alors que l'intégration réelle est cassée. Casse volontairement le code et vérifie que le test rougit. |

---

## CONCEPTS AVANCÉS

| Terme | Définition | Code | Analogies | Limite |
| ------------------------ | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| Coverage                 | Pourcentage de lignes/branches/fonctions exécutées par les tests, révèle les zones non testées                | `jest --coverage`                             | carte thermique des zones visitées / audit qui montre les parties non inspectées                                                                     | « carte thermique des zones visitées » tient tant que rien ne tombe en route ; sur Coverage, la couverture mesure les lignes exécutées, pas les cas de figure envisagés. Mesure la valeur d'un test à ce qu'il détecte, pas à sa présence. |
| AAA                      | Arrange-Act-Assert : les trois phases d'un test : préparer les données, appeler le code, vérifier le résultat | commentaires `// ARRANGE / ACT / ASSERT`      | le rituel de combat de Naruto (préparer le chakra, lancer le jutsu, vérifier le résultat) / la check-list d'un pilote avant, pendant et après le vol | « le rituel de combat de Naruto » suppose un seul acteur à la fois ; sur AAA, un test qui dépend de l'horloge ou de l'ordre des fichiers devient instable sans que le code change. Casse volontairement le code et vérifie que le test rougit. |
| Consumer-driven contract | Contrat d'API défini par le consommateur, pas le fournisseur : le client dit ce dont il a besoin              | fichier pact généré par les tests consumer    | le client qui définit les specs du produit qu'il titan / l'acheteur qui rédige le cahier des charges                                                | « le client qui définit les specs du produit qu'il titan » se rejoue à l'identique, le code non ; sur Consumer-driven contract, un test écrit après le code teste souvent ce que le code fait, pas ce qu'il devrait faire. Compare le double de test au contrat réel de la dépendance avant de t'y fier. |
| Playwright locator       | Référence à un élément UI dans Playwright, préférer les sélecteurs sémantiques aux CSS                        | `page.getByRole('button', { name: 'Voter' })` | description d'une personne par son rôle plutôt que son numéro de siège / chercher "le caissier" plutôt que "siège 14-C"                              | « description d'une personne par son rôle plutôt que son numéro de siège » suppose un seul acteur à la fois ; sur Playwright locator, un test vert prouve l'absence du bug testé, jamais l'absence de bug. Ajoute un cas issu d'un incident réel plutôt qu'un cas inventé. |
| Test pyramid             | Distribution idéale des tests : beaucoup d'unit (bas) → moins d'intégration → peu d'E2E (haut)                | 80% unit / 15% intégration / 5% E2E           | pyramid alimentaire : base large de légumes, sommet étroit de sucre / architecture : fondations larges, toit étroit                                  | « pyramid alimentaire : base large de légumes, sommet étroit de sucre » suppose un seul acteur à la fois ; sur Test pyramid, les données de test propres ne ressemblent pas aux données de production sales. Compare le double de test au contrat réel de la dépendance avant de t'y fier. |

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
