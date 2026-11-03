---
stability: intemporel
acte: pratiquer
cognitive_level: L2
perturbation_modes: [donnee_absente, suppression]
anti_recipe_key: donnee_absente+suppression
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Pratique Storage native : conserver une préférence

**Étape canonique :** Web Basics, après la leçon [Storage treasure](04-storage_treasure.md).

**Prérequis :** savoir ouvrir une page sur une origine locale et manipuler une variable JavaScript.

## Objectif

Enregistrer une préférence de thème non sensible, la relire et supprimer uniquement la clé créée par l'exercice.

## Application

Sur la page locale `http://127.0.0.1:4173/` démarrée avec la fixture Fetch, ouvre la console développeur et exécute. Si le serveur n’est plus lancé, retourne à la [pratique Fetch locale](41-fetch-local-premiere-passe.md) et relance sa commande avant de revenir ici :

```js
const key = "af-practice:theme";
localStorage.setItem(key, "dark");

const savedTheme = localStorage.getItem(key);
console.log(savedTheme); // "dark"
```

Recharge la page. Le contexte JavaScript de la console est recréé : redéclare donc la clé avant de la relire :

```js
const keyAfterReload = "af-practice:theme";
console.log(localStorage.getItem(keyAfterReload)); // "dark"
```

La valeur reste disponible dans la même origine, sauf nettoyage ou restriction du navigateur. Supprime ensuite uniquement la clé de l'exercice :

```js
localStorage.removeItem(keyAfterReload);
console.log(localStorage.getItem(keyAfterReload)); // null
```

## Critères de réussite

- [ ] Tu peux enregistrer puis relire `"dark"`.
- [ ] Tu constates qu'un rechargement ne supprime pas automatiquement la valeur.
- [ ] Tu supprimes seulement la clé `af-practice:theme` avec `removeItem()`.
- [ ] Tu expliques pourquoi cette API ne doit pas contenir de token, mot de passe ou secret.

## Sécurité et limites

N'utilise pas `localStorage.clear()` sur une origine partagée : cette méthode efface toutes les clés de cette origine. Web Storage est lisible par le JavaScript de la même origine et n'est pas un coffre-fort. Cet exercice ne construit pas une authentification.

## Preuve à conserver

Note la clé utilisée, la valeur avant/après rechargement et la valeur après suppression.
