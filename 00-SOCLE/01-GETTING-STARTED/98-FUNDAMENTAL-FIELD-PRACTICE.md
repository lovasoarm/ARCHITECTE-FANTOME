---
stability: stable
type: practice
---

# 98 - FUNDAMENTAL FIELD PRACTICE

Les fondamentaux restent courts. On ne transforme pas une boucle for en projet de production.

On ajoute simplement le réflexe terrain :

```text
QUESTION
  |
  v
HYPOTHESE
  |
  v
TEST MINIMAL
  |
  v
OBSERVATION
  |
  v
EXPLICATION
  |
  v
TRANSFER
```

## Exemples

### Fonctions

```text
Exercice :
calculer une somme

Contrainte :
entrée vide, valeur négative, grande entrée

Mesurer :
temps / résultat / erreur

Décider :
quelle implémentation et pourquoi ?

Transférer :
même logique dans un autre contexte
```

### HTTP (protocole de communication Web)

```text
Exercice :
faire une requête

Perturbation :
timeout (absence de réponse dans le délai attendu)

Observer :
status / latence / erreur

Décider :
retry (nouvelle tentative) ou abandon ?

Transférer :
autre API
```

### SQL (langage de requête pour bases relationnelles)

```text
Exercice :
lire des données

Perturbation :
volume plus grand

Observer :
temps d'exécution

Décider :
indexation ou autre stratégie ?

Transférer :
requête différente
```

L'objectif n'est pas de rendre le débutant "production-ready".
L'objectif est de lui apprendre à regarder ce que son programme fait réellement.
