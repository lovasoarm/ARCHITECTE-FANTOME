---
stability: intemporel
scope: "portage mental (Pierre 6 : Pensee Transferable)"
acte: comprendre
---

> **SCÈNE CRAZYDEVS : QG de Konoha :** six équipes, trois régions, une mission critique. Si tu ne sais pas relier signal, seuil, coût et action, ton tableau de bord ressemble à une tour de contrôle qui clignote sans dire quel avion tombe.

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

Module : **03-PILOTAGE/06-FIABILITE-SLO** : SLI/SLO/budget d'erreur, alerting, RPO/RTO, post-mortem, injection de panne.

Encart obligatoire (Pierre 6 : Pensee Transferable). 3 lignes.
Objectif : prouver que ce que tu viens d'apprendre n'est pas _JS_, c'est
un concept d'ingenierie que tu retrouveras ailleurs.

- **Python** : SLI/SLO se mesurent et se chiffrent pareil quel que soit le runtime ; l'injection de panne se fait avec les memes outils transverses (Chaos Toolkit, Gremlin), le code applicatif change, la discipline non.
- **Go** : les services Go tiennent typiquement des SLO plus serres a budget materiel egal (latence de demarrage quasi nulle, pas de warm-up JIT) ; le RTO se mesure de la meme facon, seule la duree change.
- **Rust** : memes formules de budget d'erreur et de disponibilite ; l'avantage de Rust ici n'est pas la fiabilite logicielle (deja couverte par le compilateur) mais la previsibilite de latence sous charge, utile pour des SLO de p99 tres serres.

## Auto-test (1 min)

Ferme ce fichier. Ecris de tete, en 3 lignes, comment tu ferais la meme chose
en Python, Go, Rust. Rouvre. Compare. Ce que tu n'as pas su ecrire, c'est ce
qui reste postule sur la Pierre 6 : c'est la ta prochaine micro-lecture.

<!-- AF-TRANSFER-FIELD-1.1 -->

## Transfert terrain : Kintana

**Pourquoi ce transfert compte :** une notion que tu sais réciter mais que tu ne sais pas replacer dans un système est encore fragile.

**Quand la réutiliser :** quand une contrainte du produit change (rôle, réseau, volume, concurrence, panne ou coût) et que tu dois déterminer ce qui reste invariant.

**Limite :** ne transpose pas une syntaxe ou une solution sans vérifier ses hypothèses ; le même mécanisme peut avoir des garanties différentes selon le runtime et le stockage.

**Mission courte :** applique le principe de cette page à un incrément de [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md) : Instrumente un parcours complet de création de demande : identifiant de corrélation, métrique utile et signal d’erreur. Déclenche une panne simulée puis utilise uniquement les signaux collectés pour la localiser. Produis un petit test ou scénario de panne et note l'invariant conservé, l'hypothèse qui change et la limite observée. Cette mission complète le transfert ; elle ne remplace pas le projet évalué du module.
