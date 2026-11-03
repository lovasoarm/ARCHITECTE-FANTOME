---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [changement_donnee, contenu_non_fiable]
anti_recipe_key: changement_donnee+contenu_non_fiable
transfer_distance: medium
assessment_role: instructional_checkpoint
---

# Pratique Templates native : fabriquer une fiche

**Étape canonique :** Web Basics, après la leçon [Template portals](07-template_portals.md).

**Prérequis :** comprendre les chaînes, les fonctions et les objets simples ; savoir sélectionner un élément DOM.

## Objectif

Créer une fonction de template et afficher plusieurs fiches à partir de données contrôlées.

## Préparer la page

Crée `index.html` et `app.js` dans un dossier d'exercice :

```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Fiches de démonstration</title>
    <script src="app.js" defer></script>
  </head>
  <body>
    <main>
      <h1>Fiches</h1>
      <section id="cards"></section>
    </main>
  </body>
</html>
```

Dans `app.js`, crée une fonction `createCard(item)` qui renvoie une chaîne avec le nom et le niveau, puis place le résultat dans `#cards` avec `innerHTML` pour cet exercice sur des données écrites dans ton propre fichier.

```js
const items = [
  { name: "Ana", level: 2 },
  { name: "Bako", level: 4 },
];

function createCard(item) {
  return `<article><h2>${item.name}</h2><p>Niveau : ${item.level}</p></article>`;
}

const cards = items.map(createCard).join("");
document.querySelector("#cards").innerHTML = cards;
```

## Variante sûre pour une donnée non fiable

Le rendu `innerHTML` ci-dessus est limité aux deux objets écrits dans ton propre fichier. Pour une donnée venant d'un utilisateur ou d'une API, construis les éléments et insère le texte avec `textContent` :

```js
const container = document.querySelector("#cards");

for (const item of items) {
  const article = document.createElement("article");
  const title = document.createElement("h2");
  const description = document.createElement("p");

  title.textContent = item.name;
  description.textContent = `Niveau : ${item.level}`;
  article.append(title, description);
  container.append(article);
}
```

Cette version évite d'interpréter le texte des données comme du HTML. Elle ne remplace pas les autres contrôles nécessaires sur une vraie application.

## Variations

- Ajoute une troisième fiche.
- Ajoute une classe CSS fixe à chaque `article`.
- Modifie une valeur et prédis ce qui changera.
- Explique pourquoi cette démonstration n'autorise pas à interpoler directement du texte non fiable dans `innerHTML`.

## Critères de réussite

- [ ] Une fiche apparaît par élément du tableau.
- [ ] Modifier un objet modifie seulement les valeurs affichées correspondantes.
- [ ] Tu sais expliquer le rôle des backticks, de `${...}` et de `join("")`.
- [ ] Tu sais nommer le risque de XSS lorsqu'un contenu externe est injecté comme HTML.

## Limite

Les données de l'exercice sont écrites dans ton propre fichier. Pour du texte fourni par un utilisateur ou une API, crée les éléments et affecte le texte avec `textContent` (ou utilise le rendu texte sûr du framework). Ne sanitise du HTML avec une bibliothèque dédiée comme DOMPurify que si ton application accepte volontairement du HTML riche, juste avant son insertion dans le DOM. Une template string n'est pas un mécanisme de sécurité.

## Preuve à conserver

Garde une capture ou une courte note indiquant le nombre de fiches, la variation essayée et la limite de sécurité identifiée.
