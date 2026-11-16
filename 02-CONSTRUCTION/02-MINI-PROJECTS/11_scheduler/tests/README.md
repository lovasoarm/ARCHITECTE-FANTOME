---
stability: stable
acte: comprendre
---

# Tests : 11_scheduler

Les fichiers de ce dossier définissent le contrat d'acceptation initial. Ils importent les modules que l'apprenant doit créer dans `src/` : à réception, les tests sont donc rouges pour une raison pédagogique documentée, pas parce que le runner ou une dépendance manque.

## Environnement et commande

- Runtime cible : Node.js `22.23.4`, cohérent avec le `.nvmrc` racine.
- Le `package.json` local active explicitement les modules ES ; aucune dépendance npm externe n'est requise.
- Depuis ce dossier :

```bash
npm test
```

La commande équivalente est `node --test tests/*.test.js`.

## Couverture fournie

- `loop.test.js` : FIFO des macros, drainage des microtasks après une macro, microtasks imbriquées, drainage quand aucune macro ne reste, validation des callbacks et propagation des erreurs.
- `pmap.test.js` : ordre des résultats, concurrence maximale, série stricte avec `concurrency=1`, tableau vide, validation des arguments et des bornes, propagation d'erreur, annulation avant lancement et annulation en cours.

## État à réception

- `src/loop.js` et `src/pmap.js` sont absents volontairement : ils sont le livrable.
- Les tests qui importent ces fichiers échouent à l'état vierge avec une erreur de module absent. Ce rouge est attendu.
- Après implémentation, tous les tests fournis doivent passer. N'affaiblis pas les assertions pour obtenir du vert.

## Ajouter des tests

Ajoute des cas limites sans rendre les tests dépendants d'une durée de timer précise. Préfère des promesses contrôlées et des barrières explicites pour vérifier l'ordre. Si une mesure de durée est nécessaire, documente l'environnement, les répétitions, la dispersion et ce que cette mesure ne permet pas de conclure.
