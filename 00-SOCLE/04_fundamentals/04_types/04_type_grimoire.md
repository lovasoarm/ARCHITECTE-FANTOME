---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: restituer
---

# Page verrouillée

> Rappel : ce grimoire simplifie via analogies. Lire d'abord [`05-MAITRISE/06_annexes/GRIMOIRE_CODE_HONNEUR.md`](../../../05-MAITRISE/06_annexes/18_GRIMOIRE_CODE_HONNEUR.md).

Temps de lecture ~8 min

> **Interdit de lire cette page avant d'avoir coché la checklist ci-dessous.**
> Un grimoire lu trop tôt donne l'illusion de savoir. C'est le pire piège pédagogique.

## Checklist prérequis

- [ ] J'ai fini **tous** les exercices du module courant.
- [ ] J'ai réussi le `00_prereq_check.md` du module suivant.
- [ ] J'ai écrit **au moins un** de mes propres exemples (pas copié).
- [ ] Je peux réexpliquer les 3 concepts phares du module **sans regarder**.

Si une seule case n'est pas cochée : ferme ce fichier. Reviens plus tard.

---

## TYPE GRIMOIRE : LES MOTS QUE TU DOIS MAÎTRISER

Les types en JS c'est pas juste "string ou number".
C'est un système de règles silencieuses qui tourne sous ton code.
Si tu ne connais pas ces règles, tu codes à l'aveugle.

---

| Terme | Définition | Code | Analogies | Limite |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| Type primitif                 | Valeur simple, immuable, copiée directement : 7 types en JS (string, number, boolean, undefined, null, bigint, symbol) | `let hp = 100;` <br> `let name = "Naruto";` <br> `let alive = true;`                                                                            | Une pièce de monnaie : tu la copies, tu obtiens une vraie nouvelle pièce / Un ticket de caisse : tu en fais une photocopie, les deux sont indépendants                     | « Une pièce de monnaie : tu la copies, tu obtiens une vraie nouvelle... » raconte le cas nominal ; sur Type primitif, `any` et l'assertion de type éteignent le vérificateur sans prévenir. Encode l'invariant métier dans un type dédié plutôt qu'un alias de `string`. |
| Type objet                    | Structure en mémoire qui contient des données : arrays, fonctions, objets : copiés par référence                       | `let hero = { hp: 100 };` <br> `let arr = [1, 2, 3];` <br> `let fn = function() {};`                                                            | Une clé USB : deux noms qui pointent vers le même fichier / Un appartement partagé : deux locataires, une seule porte                                                      | « Une clé USB : deux noms qui pointent vers le même fichier » se rejoue à l'identique, le code non ; sur Type objet, un type trop précis interdit une évolution légitime du code appelant. Lis le type résultant, ne suppose pas ce que l'inférence a produit. |
| Typage dynamique              | En JS, une variable peut changer de type à n'importe quel moment : pas de déclaration de type obligatoire              | `let x = 10;` <br> `x = "maintenant une string";` <br> `x = true; // aucun problème`                                                            | Un acteur qui joue plusieurs rôles dans le même film / Une valise qui accepte n'importe quoi : pratique, mais faut savoir ce qu'il y a dedans                              | « Un acteur qui joue plusieurs rôles dans le même film » n'a ni facture ni horloge ; sur Typage dynamique, la donnée JSON reçue n'est pas validée par le type déclaré, seulement supposée. Valide la donnée entrante au moment de l'exécution, pas seulement à la compilation. |
| Coercion implicite            | JS convertit automatiquement les types sans te demander : peut créer des bugs silencieux                               | `"5" + 1; // "51"` <br> `"5" - 1; // 4` <br> `true + 1; // 2`                                                                                   | Un traducteur automatique qui fait de son mieux : parfois ça colle, parfois ça part en vrille / Un "ami" qui range ta chambre sans te demander                             | « Un traducteur automatique qui fait de son mieux : parfois ça... » suppose que quelqu'un surveille ; sur Coercion implicite, les types génériques rendent la signature exacte et le message d'erreur illisible. Traque les `any` et écris pourquoi chacun reste. |
| Coercion explicite            | Tu contrôles toi-même la conversion : prévisible, propre, sans surprise                                                | `Number("42"); // 42` <br> `String(10);   // "10"` <br> `Boolean(0);   // false`                                                                | Toi qui traduis toi-même plutôt que de laisser Google Translate s'en charger / Un formulaire rempli à la main : tu sais ce que tu mets                                     | « Toi qui traduis toi-même plutôt que de laisser Google Translate... » s'arrête à la première surprise ; sur Coercion explicite, la structuralité du système de types accepte un objet fortuitement compatible. Valide la donnée entrante au moment de l'exécution, pas seulement à la compilation. |
| Falsy                         | Les 6 seules valeurs considérées comme `false` dans un contexte booléen : tout le reste est truthy                     | `false, 0, "", null, undefined, NaN` <br> `if (0) { ... }   // jamais exécuté` <br> `if ("") { ... }   // jamais exécuté`                       | Une liste de gens pas invités à la fête : si t'es pas dedans, tu rentres / Les 6 noms sur la liste noire du videur                                                         | « Une liste de gens pas invités à la fête : si t'es pas dedans, tu... » a une frontière visible à l'oeil ; sur Falsy, le type décrit la forme, jamais l'invariant métier (un entier positif reste un entier). Traque les `any` et écris pourquoi chacun reste. |
| Truthy                        | Toute valeur qui n'est pas falsy : y compris des surprises comme `"0"`, `[]`, `{}`                                     | `if ("0") { ... }  // s'exécute` <br> `if ([]) { ... }  // s'exécute` <br> `if ({}) { ... }  // s'exécute`                                      | Tout ce qui existe est truthy : exister suffit pour entrer / Si ton nom n'est pas sur la liste noire, le videur te laisse passer                                           | « Tout ce qui existe est truthy : exister suffit pour entrer » tient tant que rien ne tombe en route ; sur Truthy, un type inféré change quand l'implémentation change, silencieusement chez l'appelant. Lis le type résultant, ne suppose pas ce que l'inférence a produit. |
| `==` (égalité lâche)          | Compare après coercion : JS convertit les types avant de comparer : source de pièges                                   | `5 == "5";     // true` <br> `null == undefined; // true` <br> `false == 0;    // true`                                                         | Un juge qui accepte les traductions approximatives : le sens global compte, pas les détails / Un douanier cool qui ferme les yeux sur les détails                          | « Un juge qui accepte les traductions approximatives : le sens... » s'arrête à la première surprise ; sur == (égalité lâche), les types génériques rendent la signature exacte et le message d'erreur illisible. Encode l'invariant métier dans un type dédié plutôt qu'un alias de `string`. |
| `===` (égalité stricte)       | Compare type ET valeur sans conversion : aucune magie cachée                                                           | `5 === "5";    // false` <br> `null === undefined;// false` <br> `5 === 5;      // true`                                                        | Un scanner biométrique : même physiquement ressemblant, si le type ne correspond pas, c'est non / Un juge qui lit le texte original, pas la traduction                     | « Un scanner biométrique : même physiquement ressemblant, si le type... » suppose que quelqu'un surveille ; sur === (égalité stricte), un type inféré change quand l'implémentation change, silencieusement chez l'appelant. Lis le type résultant, ne suppose pas ce que l'inférence a produit. |
| NaN                           | Not a Number : résultat d'une conversion ou opération numérique invalide : refuse même d'être égal à lui-même          | `Number("hello"); // NaN` <br> `NaN === NaN;   // false` <br> `Number.isNaN(NaN);// true`                                                       | Le fantôme du monde numérique : il existe, mais il ne reconnaît pas son propre reflet / Un employé qui répond "je sais pas" à toutes les questions, y compris "t'es qui ?" | « Le fantôme du monde numérique : il existe, mais il ne reconnaît... » tient tant que rien ne tombe en route ; sur NaN, le typage disparaît à l'exécution : rien ne protège la frontière avec le monde extérieur. Traque les `any` et écris pourquoi chacun reste. |
| `typeof`                      | Opérateur qui retourne le type d'une valeur sous forme de string : avec quelques bugs historiques                      | `typeof 10;   // "number"` <br> `typeof "yo";  // "string"` <br> `typeof null;  // "object" ← bug` <br> `typeof NaN;  // "number" ← scandaleux` | Un détective qui se trompe sur les suspects évidents / Une carte d'identité falsifiable : fiable en général, mais il faut savoir où elle ment                              | « Un détective qui se trompe sur les suspects évidents » se rejoue à l'identique, le code non ; sur typeof, le type décrit la forme, jamais l'invariant métier (un entier positif reste un entier). Encode l'invariant métier dans un type dédié plutôt qu'un alias de `string`. |
| `Number()`                    | Conversion stricte en number : retourne `NaN` dès qu'un caractère invalide est présent                                 | `Number("42");  // 42` <br> `Number("42px"); // NaN` <br> `Number(true);  // 1` <br> `Number(null);  // 0`                                      | Un vigile strict : soit t'as le bon badge, soit tu passes pas / Un formulaire qui rejette toute entrée imparfaite                                                          | « Un vigile strict : soit t'as le bon badge, soit tu passes pas » n'a ni facture ni horloge ; sur Number(), la donnée JSON reçue n'est pas validée par le type déclaré, seulement supposée. Valide la donnée entrante au moment de l'exécution, pas seulement à la compilation. |
| `parseInt()` / `parseFloat()` | Conversion tolérante : lit jusqu'au premier caractère invalide et s'arrête là                                          | `parseInt("42px");  // 42` <br> `parseFloat("3.14abc"); // 3.14` <br> `parseInt("abc");   // NaN`                                               | Un lecteur qui s'arrête au premier mot incompréhensible / Un caissier qui rend la monnaie sur ce qu'il a compris de ta demande                                             | « Un lecteur qui s'arrête au premier mot incompréhensible » suppose un seul acteur à la fois ; sur parseInt() / parseFloat(), un type trop précis interdit une évolution légitime du code appelant. Traque les `any` et écris pourquoi chacun reste. |
| Type guard                    | Vérification explicite du type avant d'utiliser une valeur : pattern défensif essentiel                                | `function isValidNumber(v) {` <br> ` return typeof v === "number"` <br> ` && !Number.isNaN(v);` <br> `}`                                        | Un agent de sécurité qui vérifie le badge avant de laisser entrer / Un médecin qui lit l'étiquette avant d'injecter                                                        | « Un agent de sécurité qui vérifie le badge avant de laisser entrer » tient tant que rien ne tombe en route ; sur Type guard, `any` et l'assertion de type éteignent le vérificateur sans prévenir. Lis le type résultant, ne suppose pas ce que l'inférence a produit. |
| `Array.isArray()`             | La seule façon fiable de vérifier si une valeur est un tableau : `typeof` retourne `"object"` pour les arrays          | `Array.isArray([]); // true` <br> `Array.isArray({}); // false` <br> `typeof [];     // "object" ← inutile`                                     | Le seul test ADN fiable dans un tribunal JS / Regarder si y'a des rails dedans plutôt que de croire l'étiquette                                                            | « Le seul test ADN fiable dans un tribunal JS » se rejoue à l'identique, le code non ; sur Array.isArray(), la structuralité du système de types accepte un objet fortuitement compatible. Valide la donnée entrante au moment de l'exécution, pas seulement à la compilation. |

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
