---
stability: intemporel
acte: comprendre
route_family: depth
---

> **SCÈNE CRAZYDEVS : jauge de chakra :** optimiser sans mesurer, c'est demander à Naruto de vider son chakra sans regarder la jauge. D'abord la mesure, ensuite le coup de génie ; sinon tu optimises peut-être le mauvais ralentissement.

# Cahier des charges : memory hunter

Temps de lecture ~2 min

## C'EST QUOI CE PROJET, CONCRÈTEMENT

Tu construis un mini-laboratoire Node.js autour de cinq familles de rétention mémoire. Une fixture fournie illustre un cas concret ; les cinq scénarios complets sont à construire séparément dans `src/`. Aucun serveur HTTP avec cinq fuites n'est livré ou attendu comme point de départ.

## OBJECTIF

Construire, diagnostiquer, corriger et documenter cinq scénarios de rétention mémoire dans un environnement local contrôlé, preuves à l'appui (heap snapshots ou profils comparables). Les cinq familles sont listées dans le `README.md` du projet.

## CONTRAINTES NON NÉGOCIABLES

- Chaque scénario doit comporter un protocole reproductible avant/après, avec hypothèse, conditions et limites.
- La preuve identifie une référence qui retient l'objet ou la ressource ; une hausse du RSS seule ne suffit pas.
- Après warm-up et plusieurs séries identiques, les ressources gérées par le scénario ne doivent plus croître sans borne. Les seuils et invariants sont propres au scénario et justifiés ; aucun seuil absolu de RSS n'est imposé à toutes les machines.
- Les timers qui doivent s'arrêter avec leur propriétaire sont annulés avec `clearInterval()` ou `clearTimeout()`. `unref()` ne remplace pas ce nettoyage.
- Les scénarios et leurs tests sont isolés afin qu'une fuite n'en masque pas une autre.

## LIVRABLE

Cinq rapports `LEAK_REPORT_01.md` à `LEAK_REPORT_05.md`, les scénarios et tests correspondants, au moins **4 ADR réellement distincts**, et un `08-POSTMORTEM.md`. Voir `01-RULES.md` et `ADR/README.md` pour le décompte et la règle anti-ADR artificiel.

## SÉCURITÉ (gate obligatoire)

Avant de considérer le projet fini, tu dois traiter ces exigences OWASP contextuelles. Un projet qui marche mais qui est vulnérable n'est pas fini.

- Épuisement de ressources et déni de service : si ton scénario expose une API, rattache ce risque à [OWASP API4:2023 : Unrestricted Resource Consumption](https://api-security.owasp.org/editions/2023/fr/0xa4-unrestricted-resource-consumption/). Pour un scénario local sans API, décris directement la consommation de ressources non bornée sans prétendre qu'il s'agit d'une vulnérabilité API. Dans les deux cas, documente comment une entrée ou un événement répété peut déclencher la rétention.
- Conception et limites de ressources : relie les décisions de contrôle au [principe OWASP A06:2025 : Insecure Design](https://top10.owasp.org/2025/A06_2025-Insecure_Design/). Impose des limites justifiées aux collections et caches pilotés par l'utilisateur, y compris une politique de poids lorsque la taille des valeurs varie.

Pour chaque exigence : écris dans `SECURITY.md` la menace, ta contre-mesure, et le test qui la prouve. Ajoute dans le dossier `tests/` de ce projet un test ciblé pour au moins une des menaces retenues. Documente dans le README la commande exacte qui exécute ce test. Aucun pack de correction séparé n'est fourni dans ce projet.

## AUTO-ÉVALUATION

- [ ] Cinq scénarios construits et isolés ; leurs limites sont expliquées.
- [ ] Les cinq rapports contiennent une preuve comparable et un chemin de rétention.
- [ ] Contraintes de cycle de vie et de ressources respectées et vérifiées.
- [ ] Section Sécurité traitée et testée.
- [ ] Au moins quatre ADR distincts rédigés et relus.
- [ ] POSTMORTEM honnête écrit.

---

## Securite (gate obligatoire, Partie I)

- **Exigence 1** : aucune donnee sensible (secret, token, cle) dans le code source ni dans les logs. Utiliser variables d'environnement + `.env.example` versionne (jamais `.env`).
- **Exigence 2** : toute entree externe (STDIN, fichier, HTTP, CLI) est validee AVANT usage (type, longueur, format). En cas d'invalidite : erreur explicite, jamais un crash silencieux.

Un test dans `tests/` (par exemple un `learner-verifier.js` écrit par toi) doit prouver ces deux points si ton scénario expose une entrée externe. Si aucune entrée externe n'existe dans le scénario choisi, indique `N/A` et explique la frontière réelle ; ne crée pas un serveur uniquement pour satisfaire un exemple.

## RÔLE DES DOSSIERS (ne skippe pas)

- `src/` : **tu remplis toi-même**. Le dossier est un scaffold documentaire ; aucun des cinq scénarios n'est fourni comme solution.
- `tests/` : **TDD strict : tu écris le test AVANT le code de `src/`**. Rouge → vert → refactor. Si `tests/` est vide en fin de projet, ce projet ne compte pas dans ton portfolio.
- `ADR/` : au moins **4 décisions architecturales distinctes** documentées. Elles doivent découler de décisions réellement prises dans le projet ; pas d'ADR artificiels pour remplir un quota. Format : Contexte / Décision / Conséquences.
- `08-POSTMORTEM.md` : **rédigé à la fin, honnête**. Ce qui a foiré, combien de temps t'a coûté chaque blocage, ce que tu referais autrement.
- `02-TDD-JOURNAL.md` : trace vivante du cycle rouge/vert/refactor.

**Un CTO qui feuillette ton portfolio regarde `src/`, `tests/` et `ADR/`. Un `src/` vide sans `tests/` associé = projet non fini, quelle que soit la qualité du reste.**
