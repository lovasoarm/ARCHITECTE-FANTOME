---
stability: intemporel
acte: comprendre
cognitive_level: L6
perturbation_modes: [regression, fausse_piste]
anti_recipe_key: regression+fausse_piste
transfer_distance: medium
assessment_role: project_mastery
---

# RULES : 04 BREAKING CACHE

Ces règles définissent le contrat de livraison du mini-projet. Une règle non démontrée rend le projet **INCOMPLET** ; elle n'autorise pas à inventer une preuve.

## ADR minimum

Au moins **3 ADR** rédigés dans `ADR/`, à partir de décisions réellement prises :

1. TTL, horloge injectée et frontière d'expiration ;
2. composition des clés et isolation tenant/boutique ;
3. politique d'invalidation, fraîcheur et décision fondée sur les mesures.

D'autres ADR sont possibles. Une page recopiée sans alternative ni conséquence n'est pas une décision. Template : [03-ADR_TEMPLATE.md](../97-templates/03-ADR_TEMPLATE.md).

## Contrat fonctionnel

- `get` distingue miss et hit, y compris pour `null` ou `undefined` ;
- `set` rejette clé invalide et TTL non entier, non fini ou inférieur/égal à zéro ;
- l'expiration suit `now >= expiresAt` et l'horloge est injectable ;
- `delete` et `clear` ont un comportement testé ;
- un loader n'est appelé qu'en cas de miss et son échec ne crée pas d'entrée ;
- l'invalidation arrive après commit réussi ;
- la clé isole le tenant et la boutique, sans collision de séparateur (tuple JSON recommandé) ;
- les clés/fixtures restent bornées, car l'expiration paresseuse ne nettoie pas les entrées jamais relues.

## Tests et commandes

Le ZIP ne fournit pas de code ni de `package.json`. Pour les fichiers `.js` proposés, le choix de départ est CommonJS (`require` / `module.exports`) ; ESM reste possible avec `.mjs` ou un `package.json` déclarant `"type": "module"`. Après création des modules et des tests, la commande de référence est `node --test`. Utilise `node src/demo.js` et `node src/benchmark.js` uniquement après les avoir écrits. Ne consigne pas `npm test` sauf si tu as explicitement créé le script correspondant.

Le journal TDD doit montrer RED → GREEN → REFACTOR pour les cas importants, les résultats réels et les risques résiduels.

## Security Gate

Le gate est limité aux menaces concrètes du projet dans [04-SECURITY-GATE.md](04-SECURITY-GATE.md). Il ne requiert ni checklist OWASP Top 10 complète, ni audit de dépendances (aucune dépendance externe n'est imposée), ni scan de conteneur ou d'infrastructure.

## Mesure

Aucun temps de référence n'est fourni. Le tableau doit contenir les mesures réellement obtenues, les répétitions, le runtime et l'environnement. Si le benchmark n'a pas été exécuté, écris `NON EXÉCUTÉ` et explique pourquoi.

## Publication

Aucun code exécutable n'est livré par le curriculum. La release de ton projet nécessite les preuves créées dans ton propre dépôt, pas la seule présence des dossiers `src/` et `tests/`.
