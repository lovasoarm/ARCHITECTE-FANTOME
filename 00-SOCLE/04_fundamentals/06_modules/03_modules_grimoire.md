---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: restituer
---

# Page verrouillée

> Rappel : ce grimoire simplifie via analogies. Lire d'abord [`05-MAITRISE/06_annexes/GRIMOIRE_CODE_HONNEUR.md`](../../../05-MAITRISE/06_annexes/18_GRIMOIRE_CODE_HONNEUR.md).

Temps de lecture ~6 min

> **Interdit de lire cette page avant d'avoir coché la checklist ci-dessous.**
> Un grimoire lu trop tôt donne l'illusion de savoir. C'est le pire piège pédagogique.

## Checklist prérequis

- [ ] J'ai fini **tous** les exercices du module courant.
- [ ] J'ai réussi le `00_prereq_check.md` du module suivant.
- [ ] J'ai écrit **au moins un** de mes propres exemples (pas copié).
- [ ] Je peux réexpliquer les 3 concepts phares du module **sans regarder**.

Si une seule case n'est pas cochée : ferme ce fichier. Reviens plus tard.

---

## GRIMOIRE DES MODULES ES6

| Terme                   | Définition                                                                                                         | Code                                                                      | Analogies                                                                                                                                   | Limite |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **Named export**        | Exporte un binding nommé depuis un module. Peut en avoir plusieurs par fichier.                                    | `export const fn = () => {}`                                              | une liste de plats au menu d'un restaurant / les techniques publiques d'un ninja                                                            | « une liste de plats au menu d'un restaurant » s'arrête à la première surprise ; sur Named export, une même syntaxe change de sens selon le contexte (module, bloc, fonction). Reproduis le cas dans un fichier isolé de dix lignes avant de généraliser. |
| **Default export**      | Export principal d'un module. Un seul par fichier. L'importeur choisit le nom.                                     | `export default maFonction`                                               | la spécialité de la maison / le jutsu signature d'un ninja                                                                                  | « la spécialité de la maison » suppose un seul acteur à la fois ; sur Default export, une même syntaxe change de sens selon le contexte (module, bloc, fonction). Reproduis le cas dans un fichier isolé de dix lignes avant de généraliser. |
| **Named import**        | Importe un binding spécifique par son nom exact (avec accolades).                                                  | `import { fn } from "./mod.js"`                                           | commander un plat précis / appeler un technique par son nom                                                                                 | « commander un plat précis » raconte le cas nominal ; sur Named import, ce qui est vrai à la déclaration ne l'est plus après une réaffectation, et rien ne prévient. Écris deux cas de test contradictoires avant de faire confiance à ta lecture. |
| **Default import**      | Importe l'export default. Pas d'accolades. Nom libre côté importeur.                                               | `import fn from "./mod.js"`                                               | demander "la spécialité" sans préciser / le boss qui répond peu importe comment on l'appelle                                                | « demander "la spécialité" sans préciser » décrit un monde où chaque étape se voit ; sur Default import, l'ordre d'évaluation des expressions n'est pas l'ordre de lecture de gauche à droite que suppose l'image. Vérifie le type réel avant de conclure, pas l'apparence. |
| **Namespace import**    | Importe tous les exports nommés sous un seul objet.                                                                | `import * as Utils from "./utils.js"`                                     | commander tout le menu / recruter tout un village de ninjas d'un coup                                                                       | « commander tout le menu » a une frontière visible à l'oeil ; sur Namespace import, la portée est décidée à l'écriture du code, pas au moment de l'appel. Lis la spécification du langage plutôt que l'exemple qui t'arrange. |
| **Re-export**           | Un module qui importe et ré-exporte pour créer un point d'entrée unique.                                           | `export { fn } from "./mod.js"`                                           | un agent qui représente plusieurs artistes / un jonin qui coordonne plusieurs équipes                                                       | « un agent qui représente plusieurs artistes » s'arrête à la première surprise ; sur Re-export, une même syntaxe change de sens selon le contexte (module, bloc, fonction). Lis la spécification du langage plutôt que l'exemple qui t'arrange. |
| **Barrel file**         | Fichier `index.js` qui agrège et ré-exporte plusieurs modules d'un dossier.                                        | `export { a } from "./a.js"; export { b } from "./b.js"`                  | un bureau de recrutement unique / le quartier général qui rassemble tous les rapports                                                       | « un bureau de recrutement unique » suppose un seul acteur à la fois ; sur Barrel file, la valeur affichée par la console n'est pas la valeur en mémoire, c'est déjà une représentation. Reproduis le cas dans un fichier isolé de dix lignes avant de généraliser. |
| **Dynamic import**      | Chargement asynchrone d'un module au runtime, pas au démarrage.                                                    | `const m = await import("./mod.js")`                                      | appeler des renforts uniquement quand la bataille commence / ouvrir un dossier classifié seulement sur demande                              | « appeler des renforts uniquement quand la bataille commence » n'a ni facture ni horloge ; sur Dynamic import, le langage tolère l'erreur silencieuse là où l'image supposerait un refus net. Écris deux cas de test contradictoires avant de faire confiance à ta lecture. |
| **Live binding**        | Les exports nommés sont des références vivantes : si la valeur change côté module, l'importeur voit le changement. | `export let count = 0` puis `count++` met à jour tous les importeurs      | un tableau de score partagé en direct / un écran de stat qui se met à jour en temps réel                                                    | « un tableau de score partagé en direct » décrit un monde où chaque étape se voit ; sur Live binding, en JavaScript la valeur est copiée ou référencée selon son type, et la frontière entre les deux ne se voit pas à la lecture. Vérifie le type réel avant de conclure, pas l'apparence. |
| **Module scope**        | Chaque module a son propre scope. Pas de pollution globale.                                                        | `let x = 1` dans `a.js` est invisible dans `b.js`                         | chaque ninja a son propre scroll : personne n'écrit dessus sauf lui / chaque vestiaire d'équipe reste privé                                 | « chaque ninja a son propre scroll : personne n'écrit dessus sauf lui » suppose que quelqu'un surveille ; sur Module scope, le moteur applique une conversion implicite avant de comparer, donc deux valeurs « identiques » à l'oeil ne le sont pas pour lui. Lis la spécification du langage plutôt que l'exemple qui t'arrange. |
| **Circular dependency** | Deux modules qui s'importent mutuellement. Cause des valeurs `undefined` difficiles à tracer.                      | `a.js` importe `b.js` qui importe `a.js`                                  | deux messagers qui attendent chacun la réponse de l'autre pour partir / une poule et un oeuf qui se bloquent mutuellement                   | « deux messagers qui attendent chacun la réponse de l'autre pour partir » tient tant que rien ne tombe en route ; sur Circular dependency, le moteur applique une conversion implicite avant de comparer, donc deux valeurs « identiques » à l'oeil ne le sont pas pour lui. Écris deux cas de test contradictoires avant de faire confiance à ta lecture. |
| **Tree shaking**        | Un bundler (Webpack, Rollup) supprime les exports jamais importés du bundle final.                                 | si `fn2` n'est jamais importée, elle disparaît du build                   | ne charger dans le sac que ce qu'on utilise vraiment / ne recruter que les ninjas qui servent dans la mission                               | « ne charger dans le sac que ce qu'on utilise vraiment » tient tant que rien ne tombe en route ; sur Tree shaking, ce qui est vrai à la déclaration ne l'est plus après une réaffectation, et rien ne prévient. Vérifie le type réel avant de conclure, pas l'apparence. |
| **Side effect import**  | Importer un module uniquement pour ses effets de bord, sans utiliser ses exports.                                  | `import "./analytics.js"`                                                 | allumer une alarme sans l'éteindre / déclencher un jutsu en entrant dans une pièce                                                          | « allumer une alarme sans l'éteindre » décrit un monde où chaque étape se voit ; sur Side effect import, une même syntaxe change de sens selon le contexte (module, bloc, fonction). Vérifie le type réel avant de conclure, pas l'apparence. |
| **Façade pattern**      | Un module qui expose une interface simple en cachant la complexité de plusieurs sous-modules.                      | `export const exec = (...) => { /* appelle 3 modules internes */ }`       | le capitaine qui donne un ordre simple alors que 10 ninjas travaillent derrière / un guichet unique pour une administration complexe        | « le capitaine qui donne un ordre simple alors que 10 ninjas... » suppose que quelqu'un surveille ; sur Façade pattern, l'ordre d'évaluation des expressions n'est pas l'ordre de lecture de gauche à droite que suppose l'image. Reproduis le cas dans un fichier isolé de dix lignes avant de généraliser. |
| **Module singleton**    | Un module est chargé une seule fois. Tous les importeurs partagent la même instance.                               | deux fichiers qui importent `config.js` partagent le même objet `_config` | un seul Hokage pour tout le village, peu importe combien de fois on l'appelle / une seule salle de contrôle partagée par toutes les équipes | « un seul Hokage pour tout le village, peu importe combien de fois... » se rejoue à l'identique, le code non ; sur Module singleton, une même syntaxe change de sens selon le contexte (module, bloc, fonction). Lis la spécification du langage plutôt que l'exemple qui t'arrange. |

---

## OÙ L'ANALOGIE CASSE

Rappel Partie B.2 : toute analogie de ce grimoire simplifie un mécanisme.
Quand tu dois **décider** (fix, refactor, ADR), retourne au mécanisme réel,
pas à l'image. L'analogie sert à comprendre vite ; elle ment toujours un peu.

---

## OÙ LES ANALOGIES CASSENT (règle B.2)

Les analogies de ce grimoire simplifient : elles ne définissent pas. Une
closure **nest pas** un tiroir ; un event loop **nest pas** un carrousel ;
une pile **nest pas** une pile de crêpes. Chaque analogie sert à visualiser
un mécanisme ; elle cesse dès que tu veux raisonner sur la complexité, la
mémoire, la concurrence ou les cas limites. Reviens toujours à la définition
technique avant de coder, débugger ou expliquer à un pair. Une analogie
prise pour la réalité devient un obstacle épistémologique.
