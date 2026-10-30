---
stability: evolutif
acte: apprendre
noyau: non
route: depth
---

# Leçon-pont 05 : Local-first, synchronisation et CRDT

## Résultat attendu

Concevoir une application qui reste utile sans réseau et choisir une stratégie de conflit adaptée à la sémantique des données.

## Distinguer les notions

- **Offline-first** : le parcours utilisateur fonctionne avec une connexion absente ou intermittente.
- **Local-first** : l'utilisateur conserve un contrôle durable sur ses données locales ; le cloud n'est pas l'unique copie ou condition d'existence.
- **Sync** : transfert et convergence d'états ou d'opérations entre répliques.
- **CRDT** : famille de structures conçues pour converger sous des hypothèses explicites ; elle n'est pas adaptée à tous les types de données et ne remplace pas la sécurité, les validations métier ou les sauvegardes.

## Exercices

1. Écrire l'invariant métier d'une entité et les actions qui peuvent arriver hors ordre.
2. Comparer trois stratégies : last-write-wins, résolution explicite et CRDT adapté.
3. Simuler conflit, duplicat, retard, perte de réseau et fermeture forcée.
4. Concevoir backup/export/restore sans serveur, puis tester la restauration.
5. Écrire la conséquence utilisateur de chaque résolution de conflit ; ne pas cacher une perte de données derrière une fusion “réussie”.

## Référence

- [Kleppmann et al. : Local-first software, Onward! 2019](https://martin.kleppmann.com/2019/10/23/local-first-at-onward.html)
- [Zéro Réseau](../08-zero-reseau.md)
