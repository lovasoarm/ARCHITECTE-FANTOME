---
stability: intemporel
acte: construction
noyau: oui
perennite: intemporel
---

# POURQUOI CE MODULE MÉRITE TON TEMPS : DDD ET CONTRATS

Temps de lecture ~8 min

T'as déjà vu deux équipes utiliser le mot « commande » pour deux choses différentes ?
T'as déjà cassé un client en renommant un champ « parce que c'était plus propre » ?
T'as déjà lu une base de données où le mot « utilisateur » désignait trois populations ?

## 1) LE PROBLÈME QUE ÇA RÉSOUT

Un système meurt rarement d'un mauvais algorithme. Il meurt d'un vocabulaire flou.
Quand « client » veut dire *prospect* au marketing, *payeur* à la facturation et *ligne en base* pour
toi, chaque réunion produit un malentendu, et chaque malentendu produit un `if`.

```js
// Ce que devient un mot flou après dix-huit mois :
function getClient(id, { includeProspects = false, billingOnly = false, legacyShape = true } = {}) {
  // 4 booléens = 16 comportements = 16 façons de se tromper
}
```

Le découpage en **contextes bornés** ne range pas des dossiers : il déclare qu'à l'intérieur d'une
frontière, un mot a **une** définition, et qu'au passage de la frontière il y a une **traduction
explicite**. C'est tout le sujet.

## 2) LE CONTRAT, C'EST LA PARTIE QUE TU N'AS PAS LE DROIT DE CASSER

À l'intérieur d'un contexte, tu refactores librement. À la frontière, tu as des clients que tu ne
contrôles pas. Un Staff se reconnaît là : il sait dire « oui, mais en v2, et la v1 s'éteint le 30 juin ».

## 3) CE QUE ÇA CHANGE POUR TOI EN ENTRETIEN

La question posée est toujours la même : « comment tu aurais découpé ce système ? ».
Une réponse par technologie (« microservices ») vaut zéro. Une réponse par langage métier, frontières
et contrats, avec le coût de chaque frontière, vaut le niveau visé.

## 4) CE QUE CE MODULE NE FAIT PAS

Il ne te vend pas le DDD complet, ni les patterns tactiques (agrégats, événements de domaine) comme un
dogme. Il garde ce qui survit à tous les langages : le vocabulaire, les frontières, les contrats.

> **Durée de vie : intemporel.** Les frameworks changent, l'ambiguïté d'un mot ne change jamais.
