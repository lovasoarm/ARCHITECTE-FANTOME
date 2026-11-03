---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [element_cible, bubbling]
anti_recipe_key: element_cible+bubbling
transfer_distance: medium
assessment_role: instructional_checkpoint
---

# Pratique Web Helpers native : déléguer les clics

**Étape canonique :** Web Basics, après la leçon [Web helpers](05-web_helpers.md).

**Prérequis :** DOM, `addEventListener()`, conditions et sélection d'éléments.

## Objectif

Écouter les clics sur un parent stable et reconnaître le bouton réellement visé.

## Préparer la page

Crée `index.html` et `app.js` dans le même dossier. Copie cette page complète ; `defer` fait exécuter le script après lecture du HTML :

```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Délégation d'événements</title>
    <script src="app.js" defer></script>
  </head>
  <body>
    <main>
      <h1>Actions</h1>
      <ul id="actions">
        <li><button type="button" data-action="open">Ouvrir</button></li>
        <li><button type="button" data-action="close">Fermer</button></li>
        <li>
          <button type="button" data-action="reset">Réinitialiser</button>
        </li>
      </ul>
      <p id="result">Aucune action.</p>
    </main>
  </body>
</html>
```

Dans `app.js`, relie la délégation au parent `#actions` :

```js
const actions = document.querySelector("#actions");
const result = document.querySelector("#result");

actions.addEventListener("click", function (event) {
  if (!(event.target instanceof Element)) return;

  const button = event.target.closest("button[data-action]");
  if (!button || !actions.contains(button)) return;

  const action = button.dataset.action;
  if (action === "open") result.textContent = "Action : ouvrir";
  else if (action === "close") result.textContent = "Action : fermer";
  else if (action === "reset") result.textContent = "Aucune action.";
});
```

## Variations

- Retire le bouton `reset` du HTML, puis recrée-le et vérifie que la délégation fonctionne sans ajouter un écouteur sur chaque bouton.
- Clique sur le texte contenu dans un bouton, pas uniquement sur son bord.
- Ajoute un élément non cliquable dans la liste et constate qu'il ne déclenche aucune action.

## Critères de réussite

- [ ] Les trois actions produisent le texte attendu.
- [ ] Le parent reçoit les événements des boutons enfants.
- [ ] Un clic sans bouton valide ne déclenche aucune action.
- [ ] Tu expliques pourquoi `closest()` et `contains()` sont utilisés ensemble.

## Limites

La délégation fonctionne lorsque l'événement remonte jusqu'au parent ; tous les événements ne remontent pas. Le contrôle `instanceof Element` évite d'appeler `closest()` sur une cible qui ne serait pas un élément.

## Preuve à conserver

Note les trois clics testés, la cible utilisée et un cas où l'action doit rester inactive.
