# Référence différée : RASENGAN ENGINE

**Niveau : démonstrateur fonctionnel**, pas couverture intégrale de `00-CAHIER-DES-CHARGES.md`. Pas de RNG, esquive ni critiques dans cette référence ; à compléter selon la spécification avant toute certification.

Prérequis : Node.js 22+, aucun paquet à installer. Depuis ce dossier :

```sh
node --test test.cjs
node complete.cjs
```

Progression isolée : `minimal.cjs` calcule des dégâts bornés, `intermediate.cjs` ajoute PV, chakra, attaques et cooldowns, `complete.cjs` fournit des tours alternés, repos et arrêt borné. `test.cjs` valide sorties, erreurs et invariants. Ne lire qu'après sa propre tentative, sans recopier dans `../src/`.

**Exemple TDD :** un combattant sans chakra doit recevoir `chakra insuffisant` sans mutation. **ADR :** RNG non ajouté pour conserver la déterminisme des tests, à réexaminer avant validation du cahier complet. **Postmortem d'essai :** répétition d'un jutsu pendant son cooldown ; test de non-régression dédié, compteur décrémenté au début des tours du combattant.
