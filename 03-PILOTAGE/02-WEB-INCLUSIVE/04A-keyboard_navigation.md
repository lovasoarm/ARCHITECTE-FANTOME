---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [fausse_piste, decision_organisationnelle]
anti_recipe_key: fausse_piste+decision_organisationnelle
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : armure Garo :** une protection qui existe mais n'est jamais vérifiée est juste un costume brillant. Ici, chaque garde-fou doit être testable et attaquable.

# Navigation clavier : quand la souris n'est pas une option

Temps de lecture ~7 min

Tab. Entrée. Espace. Flèches. Échap. Pour des millions de gens (tremblements, paralysie, amputation, ou juste une préférence de power user), c'est TOUT ce qu'ils ont pour naviguer ton interface. Si ton code suppose toujours une souris, t'as construit une porte sans poignée pour eux.

## 1) TAB ORDER : L'ORDRE DE LECTURE INVISIBLE

Le tab order (ordre de tabulation) c'est la séquence dans laquelle Tab déplace le focus. Par défaut, le navigateur suit l'ordre du DOM (Document Object Model). Le piège : un design visuel qui ne suit pas l'ordre du code.

```js
// Le DOM dit : Bouton A, puis Champ B, puis Bouton C
// Mais le CSS a tout repositionné visuellement dans un autre ordre
// Résultat : Tab saute dans le désordre, l'utilisateur clavier est perdu

// Correct : aligner le DOM avec l'ordre visuel logique, pas l'inverse
```

```js
// tabindex : modifier l'ordre, MANUELLEMENT, avec prudence
<button tabindex="1">Nom</button>
<button tabindex="2">Email</button>
<button tabindex="3">Envoyer</button>
// (tabindex positif = ordre custom, mais ça devient vite un cauchemar à maintenir)
```

```text
tabindex="0"  --> rend un élément focusable dans l'ordre naturel du DOM (le cas le plus sain)
tabindex="-1" --> focusable seulement par script (JS), jamais par Tab
tabindex="1+" --> ordre custom forcé : à éviter, ça casse vite quand le DOM change
```

## 2) FOCUS MANAGEMENT : SAVOIR OÙ EST LE FOCUS À TOUT MOMENT

Quand tu ouvres une modal, fermes un menu, ou changes de page en SPA (Single Page Application), le focus doit suivre l'action. Sinon l'utilisateur clavier reste coincé sur un élément invisible ou disparu.

```js
function ouvrirModalCombat() {
  const modal = document.querySelector("#modal-defi");
  modal.classList.remove("hidden");

  const premierElementFocusable = modal.querySelector("button, input, a");
  premierElementFocusable.focus(); // (déplace le focus DANS la modal dès l'ouverture)
}

function fermerModalCombat(elementDeclencheur) {
  const modal = document.querySelector("#modal-defi");
  modal.classList.add("hidden");

  elementDeclencheur.focus(); // (rend le focus à l'élément qui a ouvert la modal)
}
```

Sans ce deuxième `focus()`, fermer la modal laisse le focus "dans le vide" : le navigateur le replace souvent au tout début de la page (`<body>`), et l'utilisateur doit retraverser TOUTE la page au clavier pour revenir où il était.

## 3) FOCUS TRAP : EMPRISONNER LE FOCUS DANS UNE MODAL

Un focus trap (piège à focus) empêche Tab de sortir d'une modal ouverte tant qu'elle n'est pas fermée. Sans ça, Tab continue derrière la modal, sur des éléments invisibles à l'écran.

```js
function piegerFocus(modal) {
  const elementsFocusables = modal.querySelectorAll("button, input, a, select");
  const premier = elementsFocusables[0];
  const dernier = elementsFocusables[elementsFocusables.length - 1];

  modal.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;

    if (e.shiftKey && document.activeElement === premier) {
      e.preventDefault();
      dernier.focus(); // (Shift+Tab sur le premier élément renvoie au dernier)
    } else if (!e.shiftKey && document.activeElement === dernier) {
      e.preventDefault();
      premier.focus(); // (Tab sur le dernier élément renvoie au premier)
    }
  });
}
```

```text
Tab depuis dernier élément --> revient au premier (boucle fermée)
Shift+Tab depuis premier  --> revient au dernier (boucle fermée dans l'autre sens)
```

## 4) SKIP LINKS : SAUTER LE BLABLA RÉPÉTITIF

Un skip link (lien d'évitement) permet de sauter directement au contenu principal, sans traverser tout le header et le menu de navigation à chaque page.

```js
// Premier élément focusable de la page, souvent invisible jusqu'au focus
<a href="#contenu-principal" class="skip-link">
  Aller au contenu principal
</a>
```

```css
.skip-link {
  position: absolute;
  top: -40px; /* (caché hors écran par défaut) */
}
.skip-link:focus {
  top: 0; /* (apparaît seulement quand on navigue jusqu'à lui au clavier) */
}
```

Sans skip link, un utilisateur clavier qui visite 50 pages d'un site doit retraverser le même menu de navigation 50 fois avant d'atteindre le contenu. Walking Dead, mais en version "traverser le même quartier zombie chaque jour pour rien".

## 5) ESCAPE : LA SORTIE DE SECOURS UNIVERSELLE

```js
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    fermerModalCombat(document.activeElement); // (Échap ferme toujours ce qui est ouvert)
  }
});
```

Risque réel : oublier Échap sur une modal, c'est piéger l'utilisateur dans un focus trap qu'il ne peut JAMAIS quitter au clavier. Un focus trap sans sortie, c'est une prison sans porte.

---

## EXERCICES

EXO 1 : Évade-toi sans souris :
Prends une page de ton projet (ou un site connu) et navigue-la entièrement au clavier (Tab, Entrée, Échap), souris débranchée. Note tout endroit où le focus disparaît, saute dans le désordre, ou se retrouve coincé.

EXO 2 : La prison de Fox River sans porte :
Construit une modal de confirmation ("Confirmer l'évasion ?") avec un focus trap complet : focus initial dedans, Tab qui boucle, Échap qui ferme et rend le focus au bouton déclencheur.

EXO 3 : Le menu de navigation qui fatigue :
Ajoute un skip link à une page avec un header de 10 liens de navigation. Vérifie qu'il reste invisible visuellement jusqu'à ce qu'on le focus au clavier (indice : `position: absolute` + changement au `:focus`).

## RÉSUMÉ

Le tab order doit suivre l'ordre visuel logique, pas un `tabindex` bricolé partout. Le focus management déplace activement le focus à chaque ouverture/fermeture de modal ou changement d'état important. Le focus trap empêche Tab de sortir d'une modal ouverte, mais doit toujours avoir une sortie via Échap. Les skip links évitent de retraverser le même menu à chaque page.

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.

<!-- AF-LESSON-PROFILE: accessibility -->

## Repères de décision

- **Pourquoi :** L'accessibilité permet à davantage de personnes d'utiliser le produit et rend souvent l'interface plus robuste pour tous, y compris sur mobile et au clavier.
- **Quand l’utiliser / quand l’éviter :** Teste les parcours critiques avec clavier, lecteur d'écran, contraste et zoom. N'attends pas la fin du design pour corriger la structure sémantique.
- **Limites :** Un score Lighthouse ou une vérification automatique ne couvre pas tous les usages. Il faut aussi tester manuellement avec plusieurs modes d'interaction et, quand possible, avec des personnes concernées.

## Mécanisme : la version sans magie

Utilise HTML sémantique, labels, focus visible, ordre logique, messages d'état annoncés et alternatives aux interactions pointer-only.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Navigation clavier : quand la souris n'est pas une option** se rattache à ce cas concret : Le demandeur Kintana peut utiliser un petit écran, un clavier externe, le zoom ou un lecteur d'écran. Le formulaire doit rester compréhensible dans tous ces cas.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Parcours de demande accessible

> **Arc One Piece / Grand Line :** un parcours n'est pas réussi si seule une partie de l'équipage peut monter à bord. L'accessibilité enlève les obstacles inutiles.

**Mission liée à « Navigation clavier : quand la souris n'est pas une option » :** Audite le flux de création d'une demande Kintana. Corrige les labels, focus, erreurs associées, annonces de statut et navigation clavier ; ajoute des tests automatisés plus une vérification manuelle documentée.

**Livrable :** audit WCAG ciblé, patch de composants, matrice clavier/lecteur d'écran et résultats reproductibles.

**Critères d’acceptation :** aucun contrôle sans nom accessible ; focus visible et séquentiel ; erreurs reliées aux champs ; les états ne reposent pas seulement sur la couleur ; limites des outils automatiques reconnues.

**Transfert obligatoire :** Teste le même parcours à 200 % de zoom et avec un lecteur d'écran. Identifie les défauts non détectés par l'audit automatique.
