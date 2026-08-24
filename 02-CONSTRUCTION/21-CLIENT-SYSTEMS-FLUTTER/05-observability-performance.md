---
stability: evolutif
acte: appliquer
---

> **SCÈNE CRAZYDEVS : Dragon Ball Z :** si ton écran met trois secondes à charger, ce n’est pas « juste un peu lent ». Il y a un combat quelque part. Mesure lequel.

# Performance et observabilité client

Mesure au minimum :

- temps jusqu’au premier rendu utile ;
- latence réseau par opération ;
- taux d’erreur ;
- cache hit/miss ;
- crash ;
- taille des payloads ;
- corrélation client ↔ backend.

### Règle

Pas d’optimisation sans mesure. Une intuition de performance ne devient pas une preuve parce qu’elle vient d’un développeur expérimenté.
