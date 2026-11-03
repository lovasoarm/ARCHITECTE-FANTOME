---
stability: stable
acte: verification
assessment_role: instructional_checkpoint
---

**SCÈNE CRAZYDEVS : atelier de Konoha :** observe les contraintes avant de choisir une technique.

# EXO 11 : const : liaison fixe, objet modifiable

Temps indicatif : 10 min.

```js
const ninja = { name: "Mika", chakra: 100 };
ninja.chakra -= 20;
console.log(ninja.chakra);
```

**Questions**

1. La dernière ligne est-elle autorisée ? Prédis la sortie.
2. Pourquoi `const` n’empêche-t-il pas de modifier `chakra` ?
3. Quelle opération serait interdite : réaffecter `ninja` ou modifier une propriété ?
4. Que changerait `Object.freeze(ninja)` dans cet exemple ? Précise que ce gel est superficiel.

**Preuve** : écris la prédiction avant exécution, puis ajoute un test qui distingue réaffectation et mutation.

**Critère** : explique la différence entre l’immuabilité de la liaison et celle de l’objet sans dire que `const` rend l’objet entièrement immuable.
