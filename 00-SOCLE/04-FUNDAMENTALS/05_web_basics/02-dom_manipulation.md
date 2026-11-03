---
stability: intemporel
last_reviewed: 2026-10-31
depends_on_vendor: false
acte: comprendre
cognitive_level: L4
perturbation_modes: [solution_concurrente, temps_limite]
anti_recipe_key: solution_concurrente+temps_limite
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# DOM manipulation

Temps de lecture ~9 min

Si tu veux devenir ingénieur frontend, tu dois comprendre une vérité simple :

Le navigateur est une machine. Le DOM est une structure en mémoire. JS est l'outil qui la manipule.

Si tu manipules le DOM sans comprendre sa logique, tu écris du code fragile.

Au programme : structure interne, sélection, mutation, events, performance. Pas de gadgets. Du fond.

---

## 1) LE DOM : STRUCTURE RÉELLE

Quand le navigateur lit ton HTML, il le transforme en **arbre**. Un arbre = nodes reliés entre eux.

```html
<body>
  <div>
    <h1>Hello</h1>
  </div>
</body>
```

Devient :

```text
Document
 └── html
   └── body
     └── div
       └── h1
```

Un élément et son texte sont des nœuds de l'arbre. Un attribut est associé à l'élément, mais **n'est pas un enfant de cet élément dans l'arbre DOM principal** :

```text
Arbre DOM :
Element <p>
└── Text node : "Bonjour"

Attribut associé à <p> (hors de sa liste d'enfants) :
  class = "titre"
```

Les attributs se consultent notamment avec `element.getAttribute("class")` ou `element.attributes`. L'interface `Attr` existe dans le DOM, mais un attribut n'apparaît pas dans `childNodes` de l'élément.

Quand tu modifies le DOM, tu modifies cette représentation en mémoire. Comprendre les relations parent/enfant évite de confondre structure et attributs.

---

## 2) SÉLECTION : ACCÉDER À LA STRUCTURE

Tu ne peux pas manipuler sans référence.

```javascript
document.querySelector("h1"); // premier élément correspondant, ou null
document.querySelectorAll(".item"); // tous les éléments correspondants → NodeList
```

`querySelector` accepte un sélecteur CSS et convient à de nombreuses recherches. `getElementById("menu")` reste tout à fait valable et exprime plus directement une recherche par identifiant. Choisis l'API la plus claire pour le besoin ; il n'y a pas de règle disant que l'une doit toujours remplacer l'autre.

```javascript
// HTML : <h1>Bonjour</h1>
//    <h1>Monde</h1>

const title = document.querySelector("h1");
console.log(title); // <h1>Bonjour</h1> ← juste le premier

const titles = document.querySelectorAll("h1");
console.log(titles); // NodeList [<h1>Bonjour</h1>, <h1>Monde</h1>] ← tous
```

**Important :** `NodeList ≠ Array`, mais elle a `forEach`.

Si tu veux un vrai array :

```javascript
const items = [...document.querySelectorAll(".item")];
```

Le spread operator crée un nouveau tableau contenant les mêmes références d'éléments (copie superficielle). Tu peux alors utiliser les méthodes d'Array. Pour `querySelectorAll`, la `NodeList` retournée est statique : elle ne se met pas à jour automatiquement après une modification du DOM.

---

## 3) LECTURE DU DOM

```javascript
element.textContent; // texte brut, sans interpréter le HTML
element.innerHTML; // lit/interprète le balisage HTML ("Bonjour <b>Monde</b>")
input.value; // valeur d'un contrôle de formulaire (input, textarea, select)
```

**Différence critique :**

- `textContent` → lit ou écrit du texte sans l'interpréter comme du HTML ; c'est le choix par défaut pour afficher une donnée.
- `innerHTML` → lit ou interprète du balisage HTML → **risque XSS** si du contenu non fiable est injecté sans traitement adapté.

> Règle simple : utilise `textContent` sauf si tu dois absolument injecter du HTML : et même là, méfie-toi.

---

## 4) MUTATION : MODIFIER LE DOM

**Modifier le texte :**

```javascript
title.textContent = "Nouveau titre";
```

**Modifier un attribut :**

```javascript
element.setAttribute("disabled", ""); // API explicite toujours valide
element.disabled = true; // propriété pratique pour un attribut booléen
```

`disabled` est un attribut booléen : sa présence active l'état désactivé, quelle que soit la chaîne qui lui est associée. Ainsi, `disabled="false"` signifie encore « désactivé » ; pour réactiver le contrôle, retire l'attribut (`removeAttribute("disabled")`) ou utilise `element.disabled = false`.

```javascript

```

**Modifier les classes :**

```javascript
element.classList.add("active");
element.classList.remove("active");
element.classList.toggle("active"); // présente → enlève, absente → ajoute
```

```javascript
// HTML : <div id="menu">Menu</div>
// CSS : .active { background: blue; color: white; }

const menu = document.querySelector("#menu");
menu.classList.add("active");
menu.classList.toggle("active");
```

Pourquoi `classList` plutôt que `style` direct ? **Séparation des responsabilités** : JS gère la logique, CSS gère l'apparence. Un ingénieur ne mélange pas les deux.

---

**Créer et injecter des éléments :**

```javascript
const li = document.createElement("li");
li.textContent = "Item";

parent.appendChild(li); // un seul node
parent.append(li); // moderne -> accepte plusieurs nodes et du texte
```

Différence :

| Méthode       | Accepte                      |
| ------------- | ---------------------------- |
| `appendChild` | un seul node                 |
| `append`      | plusieurs nodes + texte brut |

```javascript
// append tout en une fois
const liste = document.querySelector("#liste");

const item1 = document.createElement("li");
item1.textContent = "Pommes";

const item2 = document.createElement("li");
item2.textContent = "Lait";

liste.append(item1, item2); // insertion unique
```

```javascript
// Mix node + texte brut
const résumé = document.querySelector("#résumé");

const span = document.createElement("span");
span.textContent = "3 articles";
span.style.fontWeight = "bold";

résumé.append("Score : ", span, " points marqués.");
// → Score : 3 points marqués. (3 en gras)
```

---

## 5) EVENTS : SYSTÈME D'INTERACTION

Un event = un signal. Les plus courants : `click`, `input`, `submit`, `keydown`. Les propriétés et le comportement exacts dépendent de l'événement.

```javascript
element.addEventListener("click", handler);
```

**Toujours séparer logique et structure.** Jamais d'attribut `onclick` dans le HTML :

```html
<!-- À éviter -->
<button onclick="maFonction()">Clique</button>
```

Pourquoi ? Séparation des responsabilités, maintenabilité, testabilité. Le HTML n'est pas là pour contenir de la logique.

---

**L'objet `event` :**

```javascript
element.addEventListener("click", function (event) {
  console.log(event.target); // élément où le clic a eu lieu
  console.log(event.currentTarget); // élément où l'écouteur est attaché
});
```

```html
<div id="parent">
  <button id="enfant">Clique moi</button>
</div>
```

```javascript
parent.addEventListener("click", function (event) {
  console.log(event.target); // <button id="enfant"> ← là où le clic a eu lieu
  console.log(event.currentTarget); // <div id="parent">  ← là où l'écouteur est attaché
});
```

---

**Empêcher le comportement natif :**

```javascript
// Sans preventDefault : le navigateur applique le comportement normal du formulaire
// (souvent une navigation ou un rechargement, selon l'attribut action).
form.addEventListener("submit", function (event) {
  console.log("Formulaire soumis !");
});

// Avec preventDefault : on garde le contrôle (Tu peux récupérer les données, les valider, les envoyer via fetch... tout ce que tu veux, à ta façon.)
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const valeur = document.querySelector("input").value;
  console.log("Nom saisi :", valeur);
});
```

---

## 6) EVENT BUBBLING : PHÉNOMÈNE FONDAMENTAL

Quand tu cliques un bouton, l'événement `click` **remonte dans l'arbre** (bubbling) :

```text
button → div → body → document
```

Ça s'appelle le **bubbling**. C'est ce qui rend possible l'**event delegation** (tu attaches un écouteur sur un parent). Attention : tous les événements ne remontent pas ; vérifie le comportement de l'événement concerné avant de compter sur la délégation.

Pour des boutons ajoutés dynamiquement, un écouteur sur le parent peut éviter d'installer un gestionnaire séparé sur chaque bouton. Le clic peut toutefois commencer sur un élément contenu dans le bouton (un `span`, une icône, etc.). Utilise `closest()` pour retrouver le bouton concerné :

```html
<div id="parent">
  <button data-action="open"><span>Ouvrir</span></button>
</div>
```

```javascript
const parent = document.querySelector("#parent");

if (!parent) {
  throw new Error("Conteneur #parent introuvable");
}

parent.addEventListener("click", (event) => {
  // event.target est un EventTarget : vérifier qu'il s'agit d'un Element.
  if (!(event.target instanceof Element)) return;

  const button = event.target.closest("button[data-action]");
  // closest() peut remonter au-delà du parent : on borne la recherche.
  if (!button || !parent.contains(button)) return;

  console.log("Bouton cliqué :", button.textContent.trim());
});
```

La délégation est particulièrement utile quand les enfants changent au cours du temps. Elle peut simplifier la gestion des événements ; ne la présente pas comme un gain de performance automatique dans tous les cas. Choisis-la pour un besoin réel et un code plus simple à maintenir.

---

## 7) RENDU ET PERFORMANCE : MESURER AVANT D'OPTIMISER

Une modification du DOM ou du style peut invalider une partie du rendu. Selon la modification, le navigateur peut recalculer les styles, le layout (souvent appelé **reflow**), peindre des pixels (**paint**) ou recomposer des couches (**composite**). Ces étapes ne sont pas déclenchées de façon identique par chaque modification.

Les navigateurs regroupent souvent plusieurs changements avant de recalculer le rendu. En revanche, lire immédiatement une mesure géométrique après une écriture qui invalide le layout peut forcer un calcul synchrone. Il ne faut donc pas déduire le nombre de reflows du seul nombre d'appels JavaScript.

**Version A : insertion directe en boucle :**

```javascript
const liste = document.querySelector("ul");

for (let i = 0; i < 1000; i++) {
  const li = document.createElement("li");
  li.textContent = `Item ${i}`;
  liste.appendChild(li); // demande une insertion DOM pour cet élément
}
```

**Version B : préparation avec DocumentFragment :**

```javascript
const liste = document.querySelector("ul");
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
  const li = document.createElement("li");
  li.textContent = `Item ${i}`;
  fragment.append(li); // travail en mémoire uniquement
}

liste.append(fragment); // insère les enfants du fragment dans la liste
```

Visualisation conceptuelle :

```text
Préparation :
[Mémoire hors de l'arbre DOM] ←── li
[Mémoire hors de l'arbre DOM] ←── li
... × 1000

Insertion :
[DOM] ←── les enfants du fragment
```

`DocumentFragment` est un conteneur temporaire hors de l'arbre DOM principal. Quand tu l'insères, ses enfants sont déplacés dans la cible et le fragment devient vide. Il permet de regrouper la construction et l'insertion, mais **ne garantit ni un seul reflow, ni une amélioration de vitesse**. Son bénéfice de performance est souvent surestimé ; optimise d'abord pour la lisibilité, puis mesure un vrai problème avec les outils du navigateur.

---

## 8) MENTALITÉ INGÉNIEUR DOM

1. Sélection explicite et vérification des éléments absents (`null`).
2. Mutation adaptée à l'intention.
3. Séparation logique / style.
4. Délégation lorsque les enfants sont dynamiques ou que cela simplifie réellement le code.
5. Mesure avant toute optimisation de performance.

Le DOM est une structure observable : raisonne sur les effets réels, pas sur une règle de performance supposée.

---

## EXERCICES

## EXO 1 : Liste Scalable

Crée dynamiquement 1000 `<li>`. Réalise une version avec insertion directe, puis une version préparée avec `DocumentFragment`.

_Indice : `DocumentFragment`._

Explique la différence de structure et d'organisation. Ne conclus pas qu'une version est plus rapide sans mesure comparable dans le navigateur ; si tu ne mesures pas, indique que le résultat de performance reste inconnu.

---

## EXO 2 : Event Delegation

Crée une liste dynamique. Un **seul** event listener doit gérer le clic sur n'importe quel item pour le supprimer.

Pas un listener par item. Un seul. Sur le parent.

---

## EXO 3 : Toggle Architecturé

Crée un bouton qui toggle la classe `"dark"` sur le body. Contrainte : pas de manipulation `style` directe : uniquement `classList`.

---

## EXO 4 : Form Control

Crée un formulaire avec ces contraintes :

- Empêcher le submit si l'input est vide
- Afficher un message d'erreur via le DOM
- Pas d'`alert()`

Gestion propre du flux.

---

## RÉSUMÉ

Le DOM est une structure arborescente en mémoire. Les attributs sont associés aux éléments mais ne sont pas leurs enfants. Les événements peuvent se propager ; `target` et `currentTarget` n'ont pas le même rôle. Les changements de DOM peuvent affecter le rendu, mais leur coût exact dépend du navigateur et du contexte : mesure avant d'optimiser.

Si tu maîtrises ça, tu peux construire n'importe quelle interface.

Sinon, tu bricoles.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.

<!-- AF-LESSON-PROFILE: browser -->

## Repères de décision

- **Pourquoi :** Le navigateur est un environnement distinct du serveur : DOM, réseau, stockage local et cycle de vie utilisateur imposent des états et des erreurs spécifiques.
- **Quand l’utiliser / quand l’éviter :** Utilise ces mécanismes pour rendre le parcours web compréhensible, résilient et accessible. Ne stocke rien de sensible dans le navigateur et ne suppose jamais que le réseau est disponible.
- **Limites :** Le client ne fait pas autorité pour les droits, les montants ou l'état métier. Le stockage local peut être effacé, altéré ou partagé sur un appareil ; la synchronisation peut produire des conflits.

## Mécanisme : la version sans magie

Modélise les états visibles, annule les requêtes devenues inutiles, traite les réponses réseau comme non fiables et synchronise les brouillons avec un identifiant stable.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **DOM manipulation** se rattache à ce cas concret : Le demandeur Kintana utilise parfois un téléphone modeste avec une connexion qui coupe. Le formulaire doit préserver son brouillon et empêcher un double envoi au retour du réseau.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : première passe : une liste interactive

**Mission liée à « DOM manipulation » :** crée une liste HTML et un bouton. Au clic, ajoute un élément contenant un texte saisi ; si le champ est vide, affiche un message simple. Utilise `createElement`, `textContent` et `addEventListener`.

**Livrable :** une petite page locale, son JavaScript et une capture ou note de résultat réellement observé.

**Critères d’acceptation :** un clic ajoute un seul élément ; le texte saisi reste du texte (pas du HTML interprété) ; le code gère l'absence d'un élément ciblé ; aucune API réseau ou persistance n'est nécessaire.

## Transfert produit différé : Kintana : parcours web résilient

Ce transfert est **différé et non bloquant**. Il ne devient pertinent qu'après Fetch, Storage, validation de formulaire, async/annulation et les notions d'accessibilité clavier/annonces accessibles.

À ce stade seulement, étends un formulaire Kintana avec chargement, succès, vide, erreur et offline ; brouillon non sensible ; synchronisation et clé d'idempotence côté serveur. Teste ensuite le stockage indisponible et une réponse tardive après fermeture de l'écran.

**Livrable avancé :** parcours UI, test navigateur ou test de composant, scénario de coupure/reprise réseau et preuve d'accessibilité.

**Statut : transfert différé, jamais une gate de cette leçon DOM.**

## Sources de référence

- [MDN : Anatomy of the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Anatomy_of_the_DOM) : relations entre nœuds, enfants et attributs.
- [MDN : Event bubbling](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling) : `target`, `currentTarget` et délégation.
- [MDN : DocumentFragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) : usage et limites de performance.
- [MDN : Critical rendering path](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Critical_rendering_path) : styles, layout, paint et rendu.

**Règle de lecture :** ces liens documentent les mécanismes des navigateurs ; ils ne remplacent pas la mesure d'une application réelle.
