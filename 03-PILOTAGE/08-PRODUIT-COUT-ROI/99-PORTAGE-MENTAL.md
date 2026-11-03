---
stability: intemporel
scope: "portage mental (Pierre 6 : Pensee Transferable)"
acte: comprendre
---

> **SCÈNE CRAZYDEVS : coach du village :** tu n'as pas 40 matchs à préparer, tu en as trois cette semaine. La question n'est donc pas “que peut-on construire ?” mais “quel pari vaut le terrain maintenant ?”.

# 99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust

<!-- AF-DIAGRAM:transfer -->

```text
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

Temps de lecture ~2 min

Module : **03-PILOTAGE/08-PRODUIT-COUT-ROI** : grille cout/risque/valeur, ROI de refactoring, dette technique, refus chiffre.

Encart obligatoire (Pierre 6 : Pensee Transferable). 3 lignes.
Objectif : prouver que ce que tu viens d'apprendre n'est pas _JS_, c'est
un concept d'ingenierie que tu retrouveras ailleurs.

- **Python** : la grille cout/risque/valeur et le calcul de point mort sont independants du langage ; ce qui change, c'est le cout horaire d'une heure de dev Python vs JS sur le marche, donnee d'entree du meme calcul.
- **Go** : le calcul de dette technique inclut un facteur specifique : la reecriture Go est souvent plus lente a livrer au depart (typage strict, pas de prototypage aussi rapide qu'en JS) mais moins couteuse a maintenir a 3 ans, meme grille, curseur different.
- **Rust** : le refus chiffre se raisonne pareil (cout de la dette vs gain attendu), mais le cout initial d'une feature Rust est structurellement plus haut (courbe d'apprentissage, ownership) : la grille du module s'applique, seuls les chiffres d'entree changent.

## Auto-test (1 min)

Ferme ce fichier. Ecris de tete, en 3 lignes, comment tu ferais la meme chose
en Python, Go, Rust. Rouvre. Compare. Ce que tu n'as pas su ecrire, c'est ce
qui reste postule sur la Pierre 6 : c'est la ta prochaine micro-lecture.

<!-- AF-TRANSFER-FIELD-1.1 -->

## Transfert terrain : Kintana

**Pourquoi ce transfert compte :** une notion que tu sais réciter mais que tu ne sais pas replacer dans un système est encore fragile.

**Quand la réutiliser :** quand une contrainte du produit change (rôle, réseau, volume, concurrence, panne ou coût) et que tu dois déterminer ce qui reste invariant.

**Limite :** ne transpose pas une syntaxe ou une solution sans vérifier ses hypothèses ; le même mécanisme peut avoir des garanties différentes selon le runtime et le stockage.

**Mission courte :** applique le principe de cette page à un incrément de [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md) : Relie la notion à une étape du parcours Kintana. Formule une hypothèse utilisateur, choisis un indicateur avant/après et définis un test qui pourrait invalider l’hypothèse. Produis un petit test ou scénario de panne et note l'invariant conservé, l'hypothèse qui change et la limite observée. Cette mission complète le transfert ; elle ne remplace pas le projet évalué du module.
