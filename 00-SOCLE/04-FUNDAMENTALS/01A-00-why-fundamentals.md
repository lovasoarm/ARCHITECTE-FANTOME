---
perennite: intemporel
stability: intemporel
duree_de_vie_estimee: 10+ ans
raison: "Les règles de valeurs, bindings, portée, fonctions et types constituent le socle du raisonnement en JavaScript."
acte: comprendre
cognitive_level: L3
perturbation_modes: [decision_organisationnelle, transmission]
anti_recipe_key: decision_organisationnelle+transmission
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** une équipe partage des plans, des clés et des réserves. Si chacun peut modifier la même carte sans le savoir, une petite décision locale peut envoyer toute l'équipe dans le mur. En JavaScript, les références partagées peuvent produire le même genre de surprise.

# Pourquoi les fondamentaux méritent ton temps

Temps de lecture indicatif : 8 min.

Tu peux écrire une ligne qui fonctionne sans comprendre précisément ce qu'elle lit, modifie ou partage. Le problème apparaît quand une valeur change au mauvais endroit, qu'une variable n'est pas visible là où tu l'attends ou qu'une conversion de type change le résultat.

Les fondamentaux servent à prévoir le comportement d'un programme avant de modifier le code au hasard. Ils ne remplacent ni les tests ni la documentation ; ils te donnent le modèle mental nécessaire pour les utiliser correctement.

## 1. Le problème que ça résout

JavaScript est dynamiquement typé : le type d'une valeur est connu à l'exécution et une variable peut recevoir des valeurs de types différents. Des outils comme TypeScript, un linter ou des tests peuvent détecter certaines erreurs plus tôt, mais ils ne remplacent pas la compréhension du comportement réel.

Trois confusions reviennent souvent :

- confondre un **nom** et la valeur à laquelle il est associé ;
- confondre la réaffectation d'un nom avec la modification d'un objet ;
- confondre la visibilité d'une variable (scope, ou portée) avec la durée de vie d'une fonction ou d'une donnée.

Une closure (fonction qui conserve l'accès à son environnement lexical) peut, par exemple, continuer à utiliser une variable après le retour de la fonction qui l'a créée. Ce comportement est normal ; il devient un bug seulement si le programmeur ne l'a pas anticipé. Une comparaison avec `==` peut convertir les types avant de comparer ; `===` évite cette conversion implicite, mais deux objets qui ont le même contenu ne sont pas égaux avec `===` s'ils ne partagent pas la même référence.

## 2. Qui est touché quand ces notions manquent ?

La personne qui écrit le code perd du temps à chercher une cause éloignée du symptôme. Les autres membres de l'équipe doivent ensuite deviner si une donnée peut être modifiée sans effet de bord.

Exemple : deux parties du programme conservent une référence vers le même objet `request`. Si l'une modifie son statut, l'autre observe aussi ce changement. Ce partage peut être intentionnel ; il doit être compris et contrôlé.

## 3. Où ces mécanismes apparaissent dans un système

<!-- AF-DIAGRAM:fundamentals-bindings -->

```text
nom de variable
      |
      v
valeur primitive ---------> réaffectation du binding

nom de variable
      |
      v
valeur de référence ------> objet partagé
                                ^       ^
                                |       |
                             alias A  alias B
                                |
                                v
                         mutation observable

scope lexical ---> variables accessibles à une fonction
closure -------> fonction + accès conservé à cet environnement
```

Le schéma montre deux mécanismes liés mais distincts : une affectation copie une valeur ; pour un objet, cette valeur est une référence. Une fonction peut aussi conserver l'accès à son environnement lexical.

## 4. Ce qui dure et ce qui évolue

Les concepts de valeur, de binding, de portée, de fonction et de référence restent utiles même lorsque les frameworks changent. En revanche, les API, les outils, les optimisations des moteurs JavaScript et les conventions d'équipe évoluent.

Ne mémorise pas une affirmation du type « le moteur fera toujours telle optimisation ». V8, SpiderMonkey et les autres moteurs peuvent modifier leurs stratégies internes sans changer le contrat observable du langage. Pour comprendre ton programme, pars d'abord des règles JavaScript ; n'infère pas son comportement à partir d'une hypothèse sur le JIT (compilation à la volée).

`var` existe toujours et tu peux le rencontrer dans du code ancien. Dans du code moderne, `let` et `const` sont généralement préférés parce que leur portée de bloc rend certaines erreurs plus faciles à éviter. `const` empêche de réaffecter le binding ; il ne rend pas automatiquement immuable l'objet référencé.

`map`, `filter` et `reduce` sont utiles pour exprimer des transformations de collections. Une boucle `for` reste pertinente lorsque son contrôle explicite rend le code plus clair. Aucun de ces choix n'est automatiquement le plus rapide dans tous les contextes : mesure avant d'affirmer une différence de performance.

<!-- AF-LESSON-PROFILE: learning -->

## 5. Repères de décision

- **Pourquoi :** comprendre les valeurs et les portées permet de prévoir ce qu'une instruction peut lire ou modifier, et de limiter les effets de bord accidentels.
- **Quand l'utiliser / quand l'éviter :** choisis `const` lorsqu'un nom ne doit pas être réaffecté ; choisis `let` lorsqu'une réaffectation fait partie du mécanisme ; évite `var` dans du nouveau code sauf raison de compatibilité précise. Partage un objet lorsque ce partage est voulu et documenté ; copie-le lorsque les parties doivent évoluer indépendamment.
- **Limites :** une bonne compréhension ne garantit pas l'absence de bug. Les copies superficielles laissent partagés certains objets imbriqués ; une closure peut conserver des données plus longtemps que prévu ; les tests restent nécessaires pour vérifier les comportements attendus.

## 6. Mécanisme : la version sans magie

Quand JavaScript évalue une affectation, il copie la valeur de droite dans le binding de gauche. Si cette valeur est une primitive, les bindings ont des valeurs indépendantes. Si c'est une référence vers un objet, les deux bindings peuvent désigner le même objet. Une mutation de cet objet est alors visible depuis chaque alias.

Le scope détermine où un binding peut être utilisé. Une closure conserve l'accès aux bindings de son environnement lexical. Les types et conversions déterminent ensuite quelles opérations sont possibles et comment elles sont évaluées. Ce sont trois questions distinctes : **quelle valeur ? quelle portée ? quelle opération ?**

## 7. Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), une demande possède un identifiant, un statut et des informations de rendez-vous. Deux traitements qui partagent le même objet de demande peuvent observer les modifications l'un de l'autre. Une règle de mise à jour doit donc dire si elle modifie volontairement l'objet partagé ou construit une nouvelle valeur.

Kintana est un cas d'étude fictif. À ce stade, il sert à nommer le problème ; aucune architecture Kintana, installation ou expérience de production n'est requise.

## 8. Mission utile : repérer une référence partagée (approfondissement différé)

> **Statut :** à réaliser après les leçons sur les références et les mutations (`01_variables/07-reference_chaos.md` et `01_variables/08-mutation_madness.md`). Cette mission ne fait pas partie de la première passe et ne bloque aucune étape.

À partir de deux noms qui désignent la même demande Kintana, prédis ce qui sera observé si l'un modifie son statut. Compare ensuite avec une version qui crée une copie indépendante. Tu peux réaliser le raisonnement sur papier, puis le vérifier dans un petit fichier JavaScript lorsque les notions correspondantes ont été étudiées.

**Livrable :** un schéma des deux bindings, la prédiction avant vérification et une courte comparaison entre partage volontaire et copie indépendante.

**Critères d'acceptation :** tu identifies si les deux noms désignent le même objet ; tu prédis correctement l'effet de la mutation ; tu expliques la limite d'une copie superficielle si l'objet contient des objets imbriqués. Étiquette le résultat `CONCEPT` ou `LAB` selon ce que tu as réellement fait.

**Vérification :** écris d'abord le résultat attendu pour les deux versions ; exécute ensuite le petit fichier local si tu as déjà étudié les commandes nécessaires, ou compare ton schéma à la leçon si tu restes sur papier. La prédiction doit précéder la vérification.

## 9. Transfert

Reprends le même raisonnement avec un panier de commande ou un brouillon hors ligne. Identifie ce qui doit rester partagé, ce qui doit être copié et quel test simple permettrait de détecter une mutation involontaire. Le contexte change ; le mécanisme de valeur et de référence reste le point de départ.

## Avant d'ouvrir le chapitre 01

Commence par [l'introduction aux variables](01_variables/03-intro_variables.md). Suis ensuite l'ordre indiqué dans le README du dossier `01_variables`. Ne saute pas directement aux closures ou aux mutations si les valeurs et les bindings ne sont pas encore clairs.
