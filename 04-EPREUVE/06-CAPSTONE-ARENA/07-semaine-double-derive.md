---
stability: intemporel
acte: appliquer
---

# La semaine a double derive (S2 du jalon Livraison)

## Pourquoi cette semaine existe

Jusqu'ici, le parcours faisait tomber les deux derives separement : la derive **technique**
(un format, une perf, un champ obligatoire — mecanique heritee de
[`SPEC_DRIFT_TRIGGERS.md`](../../02-CONSTRUCTION/02_mini_projects/01_rasengan_engine/SPEC_DRIFT_TRIGGERS.md)
et journalisee dans [`00_SPEC_DRIFT.md`](../../02-CONSTRUCTION/02_mini_projects/01_rasengan_engine/00_SPEC_DRIFT.md))
et la derive **business** ([changement de spec](05-changement-de-spec.md)).

Prises une par une, elles s'absorbent : on repousse la seconde a la semaine suivante. Or le
metier reel ne les envoie jamais en file d'attente. Elles arrivent la meme semaine, sur le
meme livrable, avec le meme budget. C'est exactement la situation ou un Staff Engineer se
distingue d'un bon developpeur : il n'optimise pas les deux, il **arbitre** et il ecrit
pourquoi.

## Le declenchement, une seule ligne de calendrier

```text
J2 Architecture ... franchi et date
   |
J3 Livraison, SEMAINE 2 (J20 a J26)  --  DOUBLE DERIVE, budget INCHANGE
   |
   +-- derive technique  : P95 exige < 100 ms sur le parcours de reservation
   |                       (declencheur T-perf, meme mecanique que SPEC_DRIFT_TRIGGERS J+5)
   +-- derive business   : la tarification differenciee par salle devient prioritaire
                           sur la file d'attente (voir 05-changement-de-spec.md)
```

Les deux tombent le meme jour simule, sur le **meme livrable** (le service de reservation),
et le budget de 20 h du jalon J3 ne bouge pas d'une heure. Aucune rallonge n'est negociable :
c'est la contrainte qui fait l'exercice.

## Ce que tu rends : une seule decision ecrite

Un seul fichier, `DECISION-DOUBLE-DERIVE.md`, dans le depot de ton capstone. Pas deux notes,
pas une note par derive : **une** decision qui absorbe les deux, ou l'exercice est rate par
construction.

Structure imposee, quatre blocs :

1. **La contradiction, nommee** — une phrase qui dit pourquoi les deux demandes ne tiennent
   pas ensemble a budget constant. Interdit : « je vais essayer de faire les deux ».
2. **L'arbitrage** — ce qui est fait cette semaine, ce qui est reporte, ce qui est abandonne.
   Chaque ligne porte son cout en heures prises sur les 20 h.
3. **Le prix paye** — la consequence chiffree du report : latence tenue mais chiffre d'affaires
   differe, ou tarification livree mais P95 hors cible et de combien.
4. **La condition de reouverture** — le signal chiffre qui te fera revenir sur l'arbitrage
   (par exemple : P95 > 180 ms deux jours de suite, ou plus de 5 % de reservations perdues).

## Criteres binaires

| Verification | Verdict |
| --- | --- |
| Une seule decision ecrite pour les deux derives | Deux fichiers separes = **non valide** |
| La contradiction est nommee explicitement, budget constant cite | Absente = **non valide** |
| L'arbitrage chiffre les heures des deux cotes | Non chiffre = **non valide** |
| La consequence du report est chiffree, pas qualifiee | « impact limite » sans nombre = **non valide** |
| Une condition de reouverture chiffree existe | Absente = **non valide** |
| Aucun secret en clair, rayon d'impact ecrit (gate A17) | Un secret = **non valide** |

## Trace

Une ligne datee dans `TDD_JOURNAL.md` :
`<date> -- Semaine double derive ouverte. DECISION-DOUBLE-DERIVE.md rendue le <date>.`
Sans date d'ouverture **et** de rendu, la semaine n'a pas eu lieu.

## Ou ca se relit

Cette decision est une piece de la soutenance ([defense-orale.md](defense-orale.md)) et une
entree de la [grille d'evaluation](04-evaluation-grid.md) : le contradicteur attaque d'abord
le prix paye, jamais l'arbitrage lui-meme.
