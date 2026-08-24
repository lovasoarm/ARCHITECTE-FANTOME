---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [defaut_cache, decision_inversee]
anti_recipe_key: defaut_cache+decision_inversee
transfer_distance: low
assessment_role: instructional_checkpoint
---

**SCÈNE CRAZYDEVS : Naruto :** avant de lancer le jutsu, tu vérifies ton chakra, ton terrain et ce que tu crois savoir. Ici, le piège est de coder avant d’avoir compris.

> **CrazyDevs : briefing de mission :** ce concept doit survivre au moment où quelqu’un te demande « pourquoi ? » en plein chaos. Garde l’explication technique exacte, puis donne-lui une image qu’on peut raconter demain.

# 01b : Scope lexical, en images

Temps de lecture ~5 min

Avant les closures, faut voir. Trois niveaux, trois schémas.

## Niveau 1 : Scope global

```text
+-----------------------------+
| GLOBAL           |
|  name = "Kakashi"     |
+-----------------------------+
```

Une variable, un scope, zéro drama.

## Niveau 2 : Scope de fonction

```text
+-----------------------------+
| GLOBAL           |
|  village = "Konoha"    |
|               |
|  function jutsu() {    |
|  +----------------------+ |
|  | LOCAL jutsu     | |
|  |  power = 9000    | |
|  |  (voit village)   | |
|  +----------------------+ |
|  }             |
+-----------------------------+
```

`jutsu` voit `village` (parent). L'inverse est faux : `village` ne voit pas `power`.

## Niveau 3 : Scope imbriqué

```text
GLOBAL     : hokage
 outer()   : squad
  inner()  : chakra  -> voit chakra, squad, hokage
```

La règle : on cherche du plus proche au plus loin. Trouvé = arrêt. Pas trouvé = `ReferenceError`.

## Ce que l'analogie cache

"Lexical" veut dire : décidé à l'écriture du code, pas à l'exécution. Où la fonction est **définie** compte, pas où elle est **appelée**. C'est ce qui rend les closures puissantes (et piégeuses).

## Mission

Dessine sur papier le scope chain de ce code, avant de lancer :

```js
const a = 1;
function f() {
  const b = 2;
  function g() {
    const c = 3;
    return a + b + c;
  }
  return g;
}
```

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.
