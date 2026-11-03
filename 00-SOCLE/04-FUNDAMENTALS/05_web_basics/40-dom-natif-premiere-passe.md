---
stability: intemporel
acte: pratiquer
cognitive_level: L2
perturbation_modes: [changement_entree, observation]
anti_recipe_key: changement_entree+observation
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Pratique DOM native : un compteur accessible

**Étape canonique :** Web Basics, après la leçon [DOM manipulation](02-dom_manipulation.md).

**Prérequis :** savoir créer un fichier et ouvrir une page dans un navigateur. Aucun framework, compte distant ou projet Portfolio n'est nécessaire.

## Objectif

Relier un bouton HTML à un élément de la page avec `querySelector()`, `addEventListener()` et `textContent`.

## 1. Préparer la page

Crée un dossier de travail, puis deux fichiers `index.html` et `app.js`.

Dans `index.html`, copie ce squelette complet :

```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Mon premier compteur</title>
    <script src="app.js" defer></script>
  </head>
  <body>
    <main>
      <h1>Compteur</h1>
      <p>Valeur : <span id="count">0</span></p>
      <button id="increment" type="button">Ajouter 1</button>
    </main>
  </body>
</html>
```

L'attribut `defer` demande au navigateur de lire le HTML avant d'exécuter `app.js`. Ouvre `index.html` dans ton navigateur.

## 2. Relier JavaScript à la page

Dans `app.js`, commence avec :

```js
const button = document.querySelector("#increment");
const output = document.querySelector("#count");
let count = 0;

button.addEventListener("click", function () {
  count = count + 1;
  output.textContent = String(count);
});
```

Clique plusieurs fois sur le bouton. La valeur doit augmenter de un à chaque clic.

## 3. Vérifier et modifier

- Remplace l'incrément de `1` par `2`, puis prédis le résultat avant de cliquer.
- Ajoute un bouton « Remettre à zéro » et fais revenir le compteur à `0`.
- Modifie le titre avec `textContent`, pas avec `innerHTML`.
- Si rien ne se passe, vérifie le nom du fichier, l'identifiant `id` et les erreurs de la console.

## Critères de réussite

- [ ] La page s'ouvre sans framework.
- [ ] Le clic met à jour le texte affiché.
- [ ] Le bouton de remise à zéro remet bien la valeur à zéro.
- [ ] Tu sais expliquer le rôle de `defer`, `querySelector`, `addEventListener` et `textContent`.

## Limites et sécurité

Cet exercice manipule une page locale et ne prouve rien sur une application déployée. Pour afficher une valeur saisie par un utilisateur, préfère `textContent` ; ne transforme pas une donnée non fiable en HTML avec `innerHTML`.

## Preuve à conserver

Note le résultat attendu, le résultat observé, une erreur rencontrée et la correction qui l'a résolue.
