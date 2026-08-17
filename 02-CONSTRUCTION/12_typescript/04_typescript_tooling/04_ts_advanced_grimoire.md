---
stability: perissable_2027
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

## TYPESCRIPT ADVANCED GRIMOIRE

Le plan détaillé de Fox River, version compilateur. Tout ce qu'un dev doit avoir en tête sur les déclarations de types externes, la config du compilateur, et la migration JS vers TS. Pas un résumé : la référence complète du module.

---

| Terme                           | Définition                                                                                                | Code                                                   | Analogies                                                                                              | Limite |
| ------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------- |
| Declaration file (.d.ts)        | Fichier qui décrit la forme d'un code existant, sans l'implémenter, jamais exécuté                        | `declare function f(x: number): string;`               | la légende d'une carte, pas le territoire / un plan d'architecte, pas le bâtiment                      | « la légende d'une carte, pas le territoire » raconte le cas nominal ; sur Declaration file (.d.ts), le type décrit la forme, jamais l'invariant métier (un entier positif reste un entier). Lis le type résultant, ne suppose pas ce que l'inférence a produit. |
| declare                         | Mot-clé qui dit à TS "fais-moi confiance, ça existe au runtime, voici juste sa forme"                     | `declare class RadioCrypte { ... }`                    | un témoignage qu'on accepte sans vérifier soi-même / une carte d'identité qu'on ne questionne pas      | « un témoignage qu'on accepte sans vérifier soi-même » décrit un monde où chaque étape se voit ; sur declare, le type décrit la forme, jamais l'invariant métier (un entier positif reste un entier). Encode l'invariant métier dans un type dédié plutôt qu'un alias de `string`. |
| @types/\*                       | Paquets npm communautaires (DefinitelyTyped) qui fournissent des types pour des libs JS sans types natifs | `npm install --save-dev @types/lodash`                 | une traduction officielle d'un texte original / un manuel d'instructions ajouté après coup             | « une traduction officielle d'un texte original » se corrige toute seule quand elle dérape ; sur @types/\, la structuralité du système de types accepte un objet fortuitement compatible. Traque les `any` et écris pourquoi chacun reste. |
| declare module (boîte noire)    | Déclare qu'un module existe sans préciser sa forme interne, tout devient implicitement any                | `declare module 'lib-sans-types';`                     | un colis accepté sans l'ouvrir / une salle sur le plan, sans savoir ce qu'il y a dedans                | « un colis accepté sans l'ouvrir » n'a ni facture ni horloge ; sur declare module (boîte noire), le type décrit la forme, jamais l'invariant métier (un entier positif reste un entier). Valide la donnée entrante au moment de l'exécution, pas seulement à la compilation. |
| declare global                  | Étend une interface globale existante (comme Window) via la fusion de déclarations                        | `declare global { interface Window {...} }`            | ajouter une annotation sur une carte officielle déjà imprimée / un avenant à un contrat existant       | « ajouter une annotation sur une carte officielle déjà imprimée » n'a ni facture ni horloge ; sur declare global, la donnée JSON reçue n'est pas validée par le type déclaré, seulement supposée. Encode l'invariant métier dans un type dédié plutôt qu'un alias de `string`. |
| tsconfig.json                   | Fichier de configuration qui pilote la sortie du compilateur et la rigueur de vérification                | `{ "compilerOptions": { "strict": true } }`            | le règlement intérieur du plan d'évasion / les statuts d'une organisation                              | « le règlement intérieur du plan d'évasion » se corrige toute seule quand elle dérape ; sur tsconfig.json, la donnée JSON reçue n'est pas validée par le type déclaré, seulement supposée. Lis le type résultant, ne suppose pas ce que l'inférence a produit. |
| target                          | Option qui détermine la version de JS générée par la compilation                                          | `"target": "ES2022"`                                   | la langue d'arrivée d'une traduction / le format de sortie d'un fichier exporté                        | « la langue d'arrivée d'une traduction » se rejoue à l'identique, le code non ; sur target, les types génériques rendent la signature exacte et le message d'erreur illisible. Valide la donnée entrante au moment de l'exécution, pas seulement à la compilation. |
| module                          | Option qui détermine le système de modules utilisé dans le JS compilé                                     | `"module": "NodeNext"`                                 | le protocole de communication choisi entre équipes / le format d'emballage du colis livré              | « le protocole de communication choisi entre équipes » décrit un monde où chaque étape se voit ; sur module, la structuralité du système de types accepte un objet fortuitement compatible. Traque les `any` et écris pourquoi chacun reste. |
| strict                          | Interrupteur qui active plusieurs vérifications rigoureuses en une fois                                   | `"strict": true`                                       | activer toutes les alarmes de sécurité d'un coup / un contrôle de sécurité renforcé                    | « activer toutes les alarmes de sécurité d'un coup » décrit un monde où chaque étape se voit ; sur strict, le typage disparaît à l'exécution : rien ne protège la frontière avec le monde extérieur. Encode l'invariant métier dans un type dédié plutôt qu'un alias de `string`. |
| strictNullChecks                | Sous-option de strict qui force à gérer explicitement null et undefined                                   | partie de `"strict": true`                             | vérifier qu'une pièce est vide avant d'y entrer / ne jamais supposer qu'une case est remplie           | « vérifier qu'une pièce est vide avant d'y entrer » a une frontière visible à l'oeil ; sur strictNullChecks, un type inféré change quand l'implémentation change, silencieusement chez l'appelant. Lis le type résultant, ne suppose pas ce que l'inférence a produit. |
| noImplicitAny                   | Sous-option de strict qui interdit les types any non déclarés explicitement                               | partie de `"strict": true`                             | interdire les zones d'ombre non identifiées sur le plan / refuser les inconnues non signalées          | « interdire les zones d'ombre non identifiées sur le plan » suppose un seul acteur à la fois ; sur noImplicitAny, un type trop précis interdit une évolution légitime du code appelant. Traque les `any` et écris pourquoi chacun reste. |
| allowJs                         | Autorise des fichiers .js à coexister dans un projet TypeScript                                           | `"allowJs": true`                                      | laisser une porte ouverte pendant la transition / un sas de décompression entre deux états             | « laisser une porte ouverte pendant la transition » n'a ni facture ni horloge ; sur allowJs, `any` et l'assertion de type éteignent le vérificateur sans prévenir. Valide la donnée entrante au moment de l'exécution, pas seulement à la compilation. |
| checkJs                         | Applique la vérification de type TypeScript même sur des fichiers .js, via JSDoc                          | `"checkJs": true`                                      | inspecter une zone sans la rénover encore / un contrôle qualité sur l'existant, sans tout reconstruire | « inspecter une zone sans la rénover encore » se rejoue à l'identique, le code non ; sur checkJs, un type inféré change quand l'implémentation change, silencieusement chez l'appelant. Lis le type résultant, ne suppose pas ce que l'inférence a produit. |
| JSDoc (typage)                  | Annotations de type écrites en commentaires, lues par TS dans les fichiers .js                            | `/** @param {number} x */`                             | des notes manuscrites en marge d'un vieux plan / des indices laissés sans réécrire le document         | « des notes manuscrites en marge d'un vieux plan » suppose que quelqu'un surveille ; sur JSDoc (typage), `any` et l'assertion de type éteignent le vérificateur sans prévenir. Encode l'invariant métier dans un type dédié plutôt qu'un alias de `string`. |
| paths / baseUrl                 | Définit des alias d'import pour raccourcir des chemins relatifs complexes                                 | `"@utils/*": ["utils/*"]`                              | un nom de code court pour une route complexe / un raccourci sur une carte au lieu du chemin détaillé   | « un nom de code court pour une route complexe » s'arrête à la première surprise ; sur paths / baseUrl, le typage disparaît à l'exécution : rien ne protège la frontière avec le monde extérieur. Encode l'invariant métier dans un type dédié plutôt qu'un alias de `string`. |
| declaration (compilerOptions)   | Génère automatiquement les fichiers .d.ts correspondant à ton code TS, pour les consommateurs externes    | `"declaration": true`                                  | publier le plan en même temps que le bâtiment construit / fournir la notice avec le jutsu              | « publier le plan en même temps que le bâtiment construit » décrit un monde où chaque étape se voit ; sur declaration (compilerOptions), un type trop précis interdit une évolution légitime du code appelant. Traque les `any` et écris pourquoi chacun reste. |
| Migration progressive           | Stratégie de conversion JS vers TS fichier par fichier, jamais en un seul bloc                            | ordre : feuilles du graphe de dépendances d'abord      | évacuer un bâtiment étage par étage / un plan d'évasion en plusieurs phases vérifiées                  | « évacuer un bâtiment étage par étage » s'arrête à la première surprise ; sur Migration progressive, le type décrit la forme, jamais l'invariant métier (un entier positif reste un entier). Valide la donnée entrante au moment de l'exécution, pas seulement à la compilation. |
| Feuille (graphe de dépendances) | Fichier sans dépendance interne vers d'autres fichiers du projet, point de départ idéal pour migrer       | `utils.ts` qui n'importe aucun autre fichier du projet | le premier maillon d'une chaîne, sans rien en amont / la première pièce libérée dans un plan d'évasion | « le premier maillon d'une chaîne, sans rien en amont » tient tant que rien ne tombe en route ; sur Feuille (graphe de dépendances), les types génériques rendent la signature exacte et le message d'erreur illisible. Lis le type résultant, ne suppose pas ce que l'inférence a produit. |

---

## CE QUE LE GRIMOIRE NE TE DIT PAS EN UNE LIGNE

**Sur les .d.ts :** un fichier de déclaration qui ment sur la vraie signature d'une fonction JS, c'est pire que pas de types du tout. Sans types, tu restes prudent. Avec des types faux, tu fais une confiance aveugle à un mensonge. Vérifie toujours qu'un `.d.ts` que tu écris colle exactement au comportement réel du JS sous-jacent, surtout sur les cas limites (valeurs nulles, erreurs possibles).

**Sur tsconfig.json :** y a pas de config universelle parfaite. Un projet greenfield, un projet en migration, et une librairie publiée ont des besoins de configuration complètement différents. Copier-coller une config sans comprendre chaque option, c'est hériter des choix de quelqu'un d'autre sans savoir ce que tu perds ou gagnes.

**Sur la migration :** la tentation de tout réécrire d'un coup revient toujours, surtout sous pression. Résiste. Une migration qui avance fichier par fichier, des feuilles vers la racine, avec une strictness qui se renforce progressivement, c'est plus lent au début mais infiniment plus fiable. Le projet reste fonctionnel à chaque étape, contrairement à un big bang qui le laisse instable pendant des semaines.

---

## CE QUI BOUGERA, CE QUI RESTERA

```
BOUGERA (probablement) :
- les options précises ajoutées ou dépréciées dans tsconfig au fil des versions TS
- les outils pour générer automatiquement des .d.ts à partir de JS (ils s'améliorent)
- la popularité de DefinitelyTyped face à d'autres solutions de typage communautaire

RESTERA :
- le besoin de décrire la forme d'un code externe sans le réécrire (.d.ts)
- le besoin de contrôler la rigueur du compilateur selon la maturité du projet
- le besoin d'une stratégie progressive pour migrer du code legacy, peu importe le langage cible
```

Retiens le PRINCIPE de chaque mécanisme, pas la liste exhaustive des options de tsconfig par coeur. Le jour où une nouvelle option apparaît dans une nouvelle version de TypeScript, tu sauras directement si c'est une option de sortie (comme `target`) ou une option de vérification (comme `strict`), parce que t'auras compris la distinction, pas juste mémorisé une liste.

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
