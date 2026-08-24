---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [constraints_injectees, changement_contexte]
anti_recipe_key: constraints_injectees+changement_contexte
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : armure Garo :** une protection qui existe mais n'est jamais vérifiée est juste un costume brillant. Ici, chaque garde-fou doit être testable et attaquable.

# L'accessibilité n'est pas une option

Temps de lecture ~6 min

Tu codes une interface. Elle marche nickel sur ton écran, avec ta souris, tes yeux qui voient bien. Sauf que des millions de gens n'utilisent ni souris, ni vue normale, ni les deux mains. Si ton code les ignore, tu n'as pas codé "le web" : tu as codé une version pour toi-même. L'accessibilité (a11y, abréviation de "accessibility" avec 11 lettres entre le a et le y), c'est s'assurer que ton appli marche pour tout le monde, pas juste pour ceux qui te ressemblent.

## 1) LES LOIS : CE N'EST PAS QU'UNE QUESTION DE GENTILLESSE

```text
WCAG (Web Content Accessibility Guidelines) --> référentiel technique international ; les obligations juridiques dépendent du texte applicable.
ADA (Americans with Disabilities Act)    --> cadre juridique US ; l'applicabilité dépend du contexte et de la juridiction.
EAA (European Accessibility Act)       --> directive UE couvrant certaines catégories de produits et services ; applicable depuis le 28 juin 2025 après transposition nationale, avec périmètre et exceptions spécifiques.
```

Des entreprises comme Domino's Pizza ou Target ont été traînées en justice aux US pour des sites web inaccessibles. Pas une légende urbaine : un vrai procès, une vraie amende. L'accessibilité, c'est un risque légal réel, pas juste une "bonne pratique" qu'on coche si on a le temps.

## 2) LES GENS RÉELS DERRIÈRE LES CHIFFRES

Imagine Rick Grimes après avoir perdu sa main : il navigue au clavier, pas à la souris. Si ton menu déroulant ne réagit qu'au survol de souris (`:hover`), Rick reste bloqué devant un menu qu'il ne peut jamais ouvrir.

```js
// Piège classique : interaction qui ignore le clavier
menu.addEventListener("mouseenter", ouvrirMenu); // (et si t'as pas de souris ?)
// Pas de gestion du focus, pas de touche Entrée, pas de Tab : Rick est coincé
```

```js
// Version qui inclut tout le monde
menu.addEventListener("mouseenter", ouvrirMenu);
menu.addEventListener("focus", ouvrirMenu); // (le clavier déclenche pareil)
menu.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") ouvrirMenu(); // (Entrée ou Espace, comme un clic)
});
```

## 3) CE QUE ÇA COÛTE DE L'IGNORER

```text
Coder accessible dès le départ --> coût faible, intégré au design
Réparer après coup        --> peut coûter davantage une fois l'architecture et l'UI figées
Ignorer complètement       --> procès, perte de shinobis, mauvaise réputation
```

L'accessibilité ressemble à une dette de conception : plus les fondations, composants et parcours sont figés, plus une correction tardive peut devenir coûteuse. Surtout, le risque ne se réduit pas au coût : une interface inaccessible exclut directement des utilisateurs.

## 4) CE QUE LE RESTE DU MODULE COUVRE

```text
02_aria_basics      --> parler aux lecteurs d'écran
03_keyboard_navigation  --> naviguer sans souris
04_contrast_and_colors  --> les couleurs qui ne trahissent personne
05_screen_readers     --> comment VoiceOver, NVDA lisent vraiment ton code
06_a11y_audit       --> auditer une vraie page avec de vrais outils
```

Risque réel : penser que l'accessibilité, c'est un module à part qu'on traite "à la fin". Non. Si tu apprends le HTML sémantique et le focus management depuis le début, t'as zéro travail en plus à la fin. Si tu l'ignores, tu refais tout le projet.

---

## EXERCICES

EXO 1 : Le bouton qui ment :
Trouve dans un site que tu utilises souvent (le tien ou un site connu) un élément cliquable qui n'est PAS un vrai `<button>` ou `<a>` (souvent un `<div onclick="">`). Explique en une phrase pourquoi un lecteur d'écran ne le détecte pas comme interactif.

EXO 2 : Daltonien d'un jour :
Prends une capture d'écran de ton interface en cours et passe-la dans un simulateur de daltonisme (cherche "color blindness simulator" en ligne). Note ce qui devient illisible ou ambigu (indice : les boutons "valider" en vert et "annuler" en rouge sont souvent le premier piège).

EXO 3 : Rick sans souris :
Débranche ta souris (ou désactive-la) et essaie de naviguer sur ton interface uniquement au clavier (Tab, Entrée, Espace, flèches). Liste tout ce qui devient impossible à atteindre.

## RÉSUMÉ

L'accessibilité concerne une part importante de la population mondiale et constitue un enjeu technique, produit et juridique. Le coût d'une correction tardive peut augmenter lorsque les choix d'architecture, de contenu et d'UI sont déjà figés ; évite donc de présenter un multiplicateur universel comme « x10 » sans source. Le reste du module te donne les outils concrets : ARIA, clavier, contraste, lecteurs d'écran, audit.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

## Source juridique

EAA : https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/european-accessibility-act-eaa_en

Le périmètre dépend des produits/services et des exceptions prévues par la directive et sa transposition nationale.
