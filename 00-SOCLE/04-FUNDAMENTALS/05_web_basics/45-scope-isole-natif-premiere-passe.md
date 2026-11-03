---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [collision_nom, etat_prive]
anti_recipe_key: collision_nom+etat_prive
transfer_distance: medium
assessment_role: instructional_checkpoint
---

# Pratique Scope isolé native : protéger un compteur

**Étape canonique :** Web Basics, après la leçon [Scope isolé](06-module_factory.md).

**Prérequis :** fonctions, scope et closures. Aucun module React/Next.js ni système de build n'est demandé.

## Objectif

Créer une IIFE qui garde une donnée privée et n'expose que les opérations nécessaires.

## Application

Crée un fichier `scope.js` dans ton dossier d’exercice. Écris le code suivant, puis exécute `node scope.js` depuis ce dossier. Les résultats apparaissent dans le terminal ; aucun navigateur ni serveur n’est nécessaire.

```js
const CounterModule = (function () {
  let count = 0;

  return {
    increment() {
      count += 1;
      return count;
    },
    getValue() {
      return count;
    },
  };
})();

console.log(CounterModule.increment()); // 1
console.log(CounterModule.getValue()); // 1
console.log(CounterModule.count); // undefined : la variable reste privée
```

## Variations

- Crée un second module `VisitModule` avec son propre compteur.
- Vérifie que l'incrément de `CounterModule` ne modifie pas `VisitModule`.
- Essaie d'accéder à la variable `count` depuis l'extérieur et explique pourquoi elle n'est pas visible.

## Critères de réussite

- [ ] Le module expose seulement les méthodes prévues.
- [ ] La variable `count` n'est pas accessible directement depuis l'extérieur.
- [ ] Les deux modules conservent des états indépendants.
- [ ] Tu sais expliquer la différence entre une variable privée dans l'IIFE et une propriété de l'objet retourné.

## Limites

Cette pratique montre une technique d'isolation dans un script simple. Elle ne remplace pas les ES Modules : ceux-ci seront travaillés à l'étape suivante de la route canonique et sont généralement préférables pour structurer un nouveau code.

## Preuve à conserver

Note l'API publique exposée, les données qui restent privées et le résultat des deux compteurs.
