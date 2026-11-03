---
stability: intemporel
acte: évaluer
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Critères de vérification : `02-SCALABILITY`

Ce pack ne juge pas ta lecture : il juge ce que tu peux ouvrir et défendre.

<!-- JALON-TECH-ILA:debut -->

## Jalon TECH-ILA

Ce module porte un jalon du référentiel TECH-ILA. Le critère est **binaire** : il est
validé, ou il est **non valide**. Il n'y a pas de validation partielle, et une lecture ne
vaut pas validation.

- [ ] L'artefact demandé par ce module existe, il est daté, il tourne.
- [ ] Tu sais le défendre à l'oral en trois minutes, sans relire tes notes.

Tant qu'une case reste vide, le jalon est **non valide** : le module suivant peut s'ouvrir,
le jalon reste dû. Référentiel : [03-TECH-ILA](../../../06-ANNEXES-TRANSVERSES/04-TECH-ILA/README.md).

<!-- JALON-TECH-ILA:fin -->

### Exemple travaillé : cas métier

**Exemple résolu (fictif).** Un test de charge montre que le temps p95 reste stable à 100 requêtes/seconde, puis augmente fortement à 150. Le critère de passage n'est pas « le service semble rapide » : le profil de charge, la durée, le taux d'erreur, p50/p95 et les ressources doivent être enregistrés. Si le seuil d'erreur convenu est dépassé à 150, le test échoue même si la moyenne reste bonne. La conclusion est limitée à cette configuration et à cette durée.

**À toi :** Le débit est multiplié par vingt pendant cinq minutes ; un consommateur tombe et redémarre avec des messages en retard. Construis un cas minimal qui illustre « Critères de vérification : `02-SCALABILITY` » avec des données concrètes. Décris l’état initial, une seule opération, l’état final attendu et la raison pour laquelle ce résultat est correct.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.
