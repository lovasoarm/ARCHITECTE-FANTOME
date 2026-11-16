---
stability: intemporel
acte: comprendre
route_family: depth
---

> **Statut à l'état vierge :** les tests fournis importent les modules que l'apprenant doit créer dans `src/`. Ils sont donc attendus rouges au départ. Le rouge n'est acceptable que parce que l'absence de ces deux fichiers est intentionnelle et explicitement documentée.

# Cahier des charges : 11_scheduler

Le mini-projet relie une boucle d'événements pédagogique à une fonction de mapping asynchrone à concurrence bornée. Il ne cherche pas à réimplémenter le moteur JavaScript ni à fournir un service réseau.

## Prérequis et environnement

Le gate d'entrée est décrit dans le [README du projet](README.md). Il suppose les bases de fonctions, tableaux, modules ES, Promises, `async`/`await`, Event Loop, `AbortController` et lecture de tests.

Le dépôt fournit un `package.json` sans dépendances, avec modules ES et commande `npm test`. Runtime cible : Node.js `22.23.4`, cohérent avec le `.nvmrc` racine. Ne télécharge aucune dépendance pour ce mini-projet.

## Objectif

Implémenter :

1. une classe `Loop` dans `src/loop.js`, avec `queueMicro(fn)`, `queueMacro(fn)` et `drain()` ;
2. une fonction nommée `pMap` dans `src/pmap.js`, avec limite de concurrence, ordre de résultat préservé et annulation coopérative.

Les contrats complets, signatures, limites et noms attendus sont définis dans le [README](README.md). Les tests fournis font foi pour les comportements qu'ils couvrent ; toute évolution du contrat doit modifier ensemble les tests et les documents.

## Contraintes fonctionnelles

- Les files micro et macro sont FIFO.
- Si un callback échoue, `drain()` rejette immédiatement ; les callbacks non exécutés restent en file pour un nouvel appel.
- `Loop.drain()` exécute une macro puis vide la file micro avant la macro suivante ; les microtasks imbriquées sont également drainées.
- `pMap` accepte un tableau et une fonction mapper ; la concurrence doit être un entier de 1 à 100, défaut 5.
- Le résultat garde l'ordre initial, même si les opérations terminent dans le désordre.
- Une entrée invalide est rejetée avec une erreur explicite.
- Une erreur mapper arrête le lancement de nouveaux éléments et est propagée.
- Une annulation avant le départ empêche tout lancement ; une annulation en cours empêche les nouveaux lancements et est propagée. Les opérations déjà lancées ne sont annulables que si elles respectent le signal transmis.
- N'utilise pas de timer `0` pour faire passer artificiellement une macrotask pour une microtask.

## Sécurité contextuelle

Les risques réels de ce projet sont les entrées mal formées, la consommation excessive de ressources et une mauvaise compréhension de l'annulation. Ils sont analysés dans le document final `SECURITY.md`, copié depuis le modèle AF `03-SECURITY.md`, et vérifiés par [`04-SECURITY-GATE.md`](04-SECURITY-GATE.md).

Ce mini-projet n'expose par défaut ni endpoint HTTP, ni port, ni entrée STDIN/CLI, ni fichier utilisateur, ni secret, ni dépendance npm tierce. Les exigences qui supposeraient ces surfaces (authentification, stockage de secrets, scan de dépendances applicatives ou test d'endpoint) sont **non applicables au périmètre livré**. Ne crée pas artificiellement un serveur ou des secrets pour cocher une checklist générique.

## Livrables

- `src/loop.js` et `src/pmap.js` implémentés par l'apprenant ;
- tests pertinents dans `tests/` ;
- `SECURITY.md` complété avec risques, mesures et références de tests ;
- trois ADR distincts minimum, basés sur des décisions réellement prises ;
- `02-TDD-JOURNAL.md` et `08-POSTMORTEM.md` complétés honnêtement.

## ADR minimum

Produis **3 ADR** minimum dans `ADR/`. Ils doivent traiter trois décisions distinctes et réellement prises, par exemple : modèle de files et ordre de drainage ; stratégie de planification et borne de concurrence ; politique d'erreur et d'annulation. Ne crée pas de décisions fictives pour atteindre le quota. Utilise le gabarit commun et documente contexte, options, choix, conséquences et signal de révision.

## État des tests

- Les tests de `tests/` sont fournis comme contrat de départ.
- Ils sont volontairement rouges à réception car les deux modules de `src/` sont absents.
- Après implémentation, la commande canonique est `npm test` depuis ce dossier.
- Les cas supplémentaires listés dans `tests/README.md` doivent être ajoutés si l'apprenant étend le contrat au-delà de la base fournie.

## Auto-évaluation

- [ ] Les tests fournis passent sans affaiblissement.
- [ ] Les cas invalides, erreurs, limites et annulations sont testés.
- [ ] La concurrence active ne dépasse jamais la limite configurée.
- [ ] Le gate de sécurité contextuel est complété avec des preuves réelles.
- [ ] Trois ADR reflètent des décisions effectivement prises.
- [ ] Le journal TDD et le postmortem distinguent observations, hypothèses et limites.

## Rôle des dossiers

- `src/` : implémentation à produire ; les fichiers métier sont absents volontairement.
- `tests/` : contrat de départ ; ajoute des tests avant de modifier le code.
- `ADR/` : décisions architecturales de l'apprenant ; les deux fichiers fournis sont des consignes de décision, pas des décisions déjà validées.
- `02-TDD-JOURNAL.md` : traces réelles du cycle rouge/vert/refactor.
- `08-POSTMORTEM.md` : bilan final, y compris les défauts qui restent et les limites de validation.
