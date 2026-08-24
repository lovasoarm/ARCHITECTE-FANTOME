---
stability: stable
acte: démontrer
preuve: learner
route_family: core
---

# 29 : Épreuve D8 : reconstruire un modèle sous contraintes nouvelles

<!-- AF-DIAGRAM:d7d8 -->

```text
text
D1 connaître
  │
  ▼
D3 diagnostiquer
  │
  ▼
D4 arbitrer
  │
  ▼
D5 transférer
  │
  ▼
D7 invalider son modèle
  │
  ▼
D8 reconstruire sous contrainte
```

La profondeur D7→D8 exige de pouvoir abandonner puis reconstruire son propre modèle mental.

> **SCÈNE CRAZYDEVS : stade sous alerte :** le terrain est le même, mais les règles du match changent pendant que tu joues. Le Staff Engineer ne défend pas son ancien dessin par loyauté : il reconstruit le modèle quand les contraintes invalident ses hypothèses.

## But

Cette épreuve ferme explicitement **D8** : ne pas seulement appliquer un modèle connu, mais **reconstruire un modèle opératoire sous plusieurs contraintes nouvelles**, sans recevoir le pattern, la technologie ou l'architecture à utiliser.

## Phase 1 : Modèle initial

Choisis un système connu de ton fil rouge et écris, sans ouvrir le grimoire :

- objectif utilisateur et objectif d'exploitation ;
- invariants et données qui font foi ;
- hypothèses dont dépend la conception ;
- deux architectures plausibles ;
- critères qui tranchent ;
- décision provisoire et coût principal ;
- signal observable qui pourrait invalider cette décision.

## Phase 2 : Contraintes injectées

Après la première décision, impose **au moins cinq** changements parmi les suivants : budget divisé par deux, SLO plus strict, dépendance externe supprimée, hausse de charge, nouvelle contrainte de confidentialité, équipe réduite de moitié, région devenue indisponible, latence inter-région imposée, nouveau besoin produit ou obligation de réversibilité.

Interdit : demander quelle architecture « correspond » à la nouvelle situation.

## Phase 3 : Reconstruction

Tu dois produire un nouveau modèle, pas seulement patcher l'ancien. Montre :

1. ce qui reste invariant ;
2. ce qui devient faux ;
3. les frontières qui bougent ;
4. les nouvelles hypothèses ;
5. les alternatives nouvellement ouvertes ou fermées ;
6. le nouveau modèle ;
7. le coût / risque / externalité supplémentaire ;
8. le mécanisme de retour arrière ;
9. l'observation qui pourrait encore invalider le modèle reconstruit.

## Phase 4 : Défense adverse

Un contradicteur doit défendre l'ancien modèle. Tu dois soit :

- démontrer qu'il tient encore malgré les nouvelles contraintes,
- soit montrer précisément quelle contrainte le rend désormais non défendable.

La qualité de l'épreuve se juge sur la **chaîne de causalité**, pas sur le vocabulaire architectural.

## Phase 5 : Transfert

<!-- AF-DIAGRAM:transfer -->

```text
text
Principe appris
      │
      ▼
Nouveau contexte
      │
      ├── invariant ──► conserver
      │
      └── hypothèse cassée ─► adapter
                                │
                                ▼
                             nouvelle décision
```

Le transfert teste ce qui survit du principe et ce qui doit être révisé dans un contexte nouveau.

Rejoue la reconstruction dans un autre contexte (langage, fournisseur, équipe, échelle ou domaine). Donne une hypothèse de ton premier modèle qui ne doit surtout pas être transportée telle quelle.

## Preuve de réussite

Une réponse n'est recevable que si elle contient :

- un modèle initial ;
- une décision justifiée ;
- au moins cinq contraintes nouvelles ;
- une reconstruction réelle ;
- une défense adverse ;
- un transfert ;
- une observation falsifiante ;
- une révision explicite entre l'ancien et le nouveau modèle.

**D8 n'est pas validé par un score de connaissance. Il est validé par la reconstruction observable du modèle.**

## Règle anti-recette

Aucun corrigé, pattern, stack ou architecture de référence n'est fourni. Toute solution techniquement différente est recevable si elle tient face aux contraintes, laisse des preuves et accepte la falsification.
