---
stability: stable
acte: verification
assessment_role: instructional_checkpoint
---

**SCÈNE CRAZYDEVS : atelier de Konoha :** observe les contraintes avant de choisir une technique.

# EXO : compter des fréquences avec Map

Temps indicatif : 15 min.

On reçoit une liste d’événements et l’on veut compter le nombre d’apparitions de chaque type.

```js
const events = ["login", "purchase", "login", "logout", "purchase", "login"];
```

**Mission**

1. Écris `countByType(events)` qui renvoie un `Map` : `login → 3`, `purchase → 2`, `logout → 1`.
2. Ajoute les cas d’entrée vide et d’une seule valeur.
3. Explique pourquoi une boucle avec `Map.get` / `Map.set` parcourt la liste une fois et pourquoi le coût d’accès moyen à `Map` est sublinéaire selon le langage, sans promettre un O(1) strict garanti par ECMAScript.
4. Dis quand un objet simple pourrait suffire et quand `Map` est plus adapté.

**Critère** : aucun élément n’est perdu, les comptes sont exacts et la complexité annoncée distingue le nombre de passages de la garantie d’implémentation du moteur.
