---
stability: stable
acte: pratiquer
cognitive_level: L1
perturbation_modes: [consigne_simple, interface_inutilisable]
anti_recipe_key: consigne_simple+interface_inutilisable
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Accessibilité : première interface

Temps indicatif : 10 à 20 minutes. Cette fiche accompagne les premières pratiques DOM ; elle ne remplace pas le module avancé Web Inclusive.

## Pourquoi commencer maintenant ?

Dès qu'une page contient un lien, un bouton ou un formulaire, quelqu'un doit pouvoir comprendre ce que c'est et l'utiliser. L'accessibilité n'est pas une finition réservée à un projet avancé. Quelques habitudes simples évitent déjà des obstacles fréquents.

## Les six réflexes de départ

1. **Structure :** utilise les éléments HTML qui décrivent leur rôle (`header`, `nav`, `main`, `section`, `footer`) au lieu de créer chaque zone avec des `div`.
2. **Titres :** garde un ordre compréhensible (`h1`, puis `h2`, puis `h3` selon la structure), sans choisir un titre seulement pour sa taille visuelle.
3. **Formulaires :** associe chaque champ à un `label` visible grâce à `for` et `id`. Un placeholder ne remplace pas un label.
4. **Actions :** utilise un `button` pour déclencher une action et un `a` pour aller vers une autre adresse. Ne transforme pas un texte ordinaire en bouton à la souris seulement.
5. **Images :** décris en `alt` une image qui apporte une information ; utilise `alt=""` si elle est purement décorative. Ne recopie pas le nom de fichier.
6. **Clavier et lisibilité :** parcours la page avec `Tab`, `Shift+Tab`, `Entrée` et `Espace`. Le focus doit rester visible. Ne communique jamais une information uniquement par la couleur ; vérifie que le texte et l'arrière-plan restent lisibles.

## Exemple minimal

```html
<header>
  <h1>Réserver un équipement</h1>
</header>
<main>
  <form>
    <label for="equipment">Équipement demandé</label>
    <input id="equipment" name="equipment" type="text" required />
    <button type="submit">Envoyer la demande</button>
  </form>
</main>
```

Le champ possède un nom visible ; le bouton annonce son action ; les éléments décrivent la structure. Ce petit exemple n'est pas une preuve de conformité complète.

## Ta première vérification

Dans la page locale que tu as créée avec la pratique DOM :

- utilise `Tab` pour atteindre les liens, champs et boutons ;
- vérifie que le focus est visible et suit un ordre logique ;
- vérifie qu'un champ possède un `label` visible ;
- vérifie que chaque bouton décrit une action.

Si ta première page ne contient pas encore de formulaire, vérifie seulement les contrôles qui existent ; ne fabrique pas une interface supplémentaire pour satisfaire cette fiche.

## Limites et suite

Cette première passe n'est ni un audit complet, ni une certification WCAG. Elle n'évalue pas encore correctement les lecteurs d'écran, les contenus complexes, les composants riches, les erreurs de formulaire ou les critères détaillés de contraste. Ces sujets sont approfondis dans [03-PILOTAGE/02-WEB-INCLUSIVE](../../../03-PILOTAGE/02-WEB-INCLUSIVE/README.md) lorsque la route et les prérequis y conduisent.

**Preuve locale :** note un contrôle que tu as réussi et un obstacle restant (ou écris « aucun contrôle interactif sur cette page » si cela s'applique). Aucun outil externe, compte, projet personnel ou test automatisé n'est requis ici.
