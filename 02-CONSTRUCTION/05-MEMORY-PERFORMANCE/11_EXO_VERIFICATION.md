---
stability: stable
acte: verification
assessment_role: instructional_checkpoint
---

**SCÈNE CRAZYDEVS : atelier de Konoha :** observe les contraintes avant de choisir une technique.

# EXO : cache borné : TTL, capacité et éviction

Temps indicatif : 20 min.

Un cache applicatif garde les réponses calculées. Le cache actuel ne possède ni durée de vie ni limite de taille. Cela ne prouve pas une fuite dans tous les contextes, mais une cardinalité non bornée peut faire croître la mémoire sans limite pratique.

**Mission**

1. Propose un cache avec une capacité maximale de 3 entrées et un TTL configurable.
2. À l’insertion d’une quatrième entrée, évince la moins récemment utilisée (LRU) ou justifie une autre politique.
3. Définis quand une entrée expirée est supprimée : à la lecture, à l’insertion ou par balayage périodique.
4. Ajoute des tests pour expiration, rafraîchissement et éviction.
5. Explique pourquoi le choix TTL/LRU dépend du coût de calcul, de la cardinalité des clés et de la fraîcheur métier.

**Critère** : le nombre d’entrées vivantes ne dépasse jamais la capacité définie après une opération d’insertion ; le test ne suppose pas qu’un cache doit toujours être conservé en mémoire.
