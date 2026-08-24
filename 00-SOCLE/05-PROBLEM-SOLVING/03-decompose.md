---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [fausse_piste, temps_limite]
anti_recipe_key: fausse_piste+temps_limite
transfer_distance: medium
assessment_role: diagnostic_mastery
---

**SCÈNE CRAZYDEVS : Naruto :** avant de lancer le jutsu, tu vérifies ton chakra, ton terrain et ce que tu crois savoir. Ici, le piège est de coder avant d’avoir compris.

> **CrazyDevs : mission de rang S :** avant de foncer sur la solution, identifie ce qui fait réellement échouer la mission. Le piège est souvent dans la question, pas dans la réponse.

# Décomposer un système complexe

Temps de lecture ~7 min

Tu ouvres un éditeur. Tu fixes l'écran. Le problème est flou, énorme, et tu sais pas par où attaquer. Alors tu codes quelque chose au hasard et tu espères que ça tient.

C'est là que tout le monde perd du temps.

Décomposer, c'est transformer un problème que tu peux pas résoudre en plusieurs problèmes que tu peux résoudre. C'est la compétence la plus utile d'un dev senior. Pas la syntaxe. Pas les algos. Ça.

---

## 1) LE PROBLÈME AVEC "COMMENCER À CODER"

Goku affronte Cell en mode Perfect. Il fonce tête baissée. Il se prend une raclée. Puis il réfléchit. Il identifie les faiblesses. Il construit une stratégie.

La plupart des devs font comme Goku au début : ils foncent. Ça donne du code spaghetti qu'ils comprennent plus après 3 jours.

La décomposition, c'est prendre 10 minutes pour penser avant d'écrire la première ligne.

```text
problème flou
  --> identifier les domaines
  --> identifier les responsabilités
  --> identifier les dépendances
  --> coder chaque pièce séparément
```

---

## 2) LES TROIS QUESTIONS À POSER

Avant de toucher le clavier, tu poses ces trois questions à ton problème :

**Qu'est-ce que ce système doit faire ?**
Pas comment il le fait. Juste quoi.

**Quelles sont les pièces indépendantes ?**
Une pièce indépendante : si tu la supprimes, le reste tient encore.

**Quelles pièces dépendent d'autres pièces ?**
Une flèche entre A et B veut dire : A a besoin de B pour fonctionner.

```text
Mauvais : "coder un système de combat"

Correct :

NinjaStats  --> calcule les dégâts, gère le chakra, applique les buffs
JutsuEngine  --> exécute un jutsu, retourne un résultat
CombatLoop  --> orchestre les tours, appelle NinjaStats et JutsuEngine
Display    --> affiche l'état du combat, ne touche à rien d'autre
```

Chaque pièce fait une chose. Chaque pièce peut être testée seule.

---

## 3) LA TECHNIQUE DE LA FRONTIÈRE

Prends ton système. Dessine une frontière autour de chaque pièce.

La règle : **tout ce qui traverse une frontière, c'est un contrat**.

Si `CombatLoop` appelle `JutsuEngine`, il lui passe quoi ? Il récupère quoi ?
Ce quoi et ce quoi : c'est la frontière. C'est ce que tu documentes.

```text
NinjaStats
 entrée : { chakra: number, force: number, niveau: number }
 sortie : { degats: number, chakraRestant: number }

CombatLoop
 entrée : deux ninjas, un jutsu choisi
 sortie : le nouvel état du combat (jamais une mutation de l'ancien)
```

Si tu peux pas décrire l'entrée et la sortie d'une pièce en deux lignes : elle est trop grosse. Coupe-la.

---

## 4) L'ERREUR CLASSIQUE : DÉCOMPOSER PAR FICHIER, PAS PAR RESPONSABILITÉ

```js
// Mauvais : utils.js qui fait TOUT
// calculerDegats(), afficherCombat(), chargerNinja(), sauvegarderSession()
// c'est pas une décomposition, c'est un fourre-tout avec un nom rassurant

// Correct : une responsabilité par module
// ninjaStats.js  --> tout ce qui concerne les stats
// jutsuEngine.js --> tout ce qui concerne l'exécution des jutsus
// combatLoop.js  --> l'orchestration des tours
// display.js   --> l'affichage, rien d'autre
```

Le test : si tu changes quelque chose dans `ninjaStats.js`, est-ce que tu dois toucher à `display.js` ? Non ? Parfait. La décomposition tient.

---

## 5) LES DÉPENDANCES : LE GRAPHE MENTAL

Toute décomposition produit un graphe de dépendances. Si ce graphe a des cycles, t'as un problème.

```text
// Bon : dépendances à sens unique
CombatLoop --> JutsuEngine --> NinjaStats

// Mauvais : cycle de dépendances
CombatLoop --> JutsuEngine --> CombatLoop
// résultat : impossible à tester l'un sans l'autre
// résultat : modifier l'un casse l'autre sans prévenir
```

Un cycle de dépendance : deux modules qui se tiennent en otage mutuellement.
Rick Grimes et Negan dans la même cellule : aucun peut sortir sans que l'autre s'effondre.

---

## 6) DÉCOMPOSER PAR NIVEAUX D'ABSTRACTION

Un système bien décomposé a des niveaux clairs.

```text
Niveau haut  : orchestration  (CombatLoop)
           |
           v
Niveau moyen : logique métier  (JutsuEngine, NinjaStats)
           |
           v
Niveau bas  : données/utilitaires (formules, constantes)
```

La règle : **le code d'un niveau appelle le niveau en dessous, jamais au-dessus**.

Si `NinjaStats` commence à appeler `CombatLoop` : ta décomposition est cassée.

---

## EXERCICES

## EXO 1 : Découpe le camp de Rick Grimes

Rick a besoin d'un système pour gérer son camp post-apocalyptique.
Spec brute : _"gérer les ressources, les gardes, les attaques de zombies, les rations et les soins"_.

Décompose ce système en 5 à 7 modules indépendants.
Pour chaque module : une responsabilité, une entrée, une sortie.
Dessine les dépendances entre modules (format `A --> B`).

_(indice : commence par "qu'est-ce que ce système doit faire ?" : pas "comment")_

---

## EXO 2 : Le cycle de dépendances de T-Bag

T-Bag a codé un système de prison. Il a créé deux modules :

- `PrisonGuard` qui appelle `PrisonCell` pour savoir si un prisonnier est là
- `PrisonCell` qui appelle `PrisonGuard` pour savoir si la cellule est surveillée

Identifie le problème. Propose une décomposition qui brise le cycle.
_(indice : une troisième pièce indépendante peut souvent résoudre un cycle)_

---

## EXO 3 : Décompose le pipeline de Walter White

Walter veut un système qui :

1. reçoit une requête d'inscription
2. calcule la route optimale
3. estime le risque de la route
4. génère un plan de livraison
5. enregistre le plan

Dessine la décomposition en niveaux d'abstraction.
Identifie ce qui peut être testé seul. Identifie ce qui ne peut pas l'être sans les autres.

---

## RÉSUMÉ

Décomposer avant de coder : c'est la différence entre un dev qui subit son code et un dev qui le contrôle. Chaque pièce a une responsabilité claire, une entrée et une sortie définies. Les dépendances vont dans un seul sens. Un cycle de dépendances, c'est une bombe à retardement. Si tu peux pas décrire une pièce en deux lignes, elle est trop grosse : coupe-la.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.
