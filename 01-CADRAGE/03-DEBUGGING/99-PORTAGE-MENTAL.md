---
stability: intemporel
scope: "portage mental (Pierre 6 : Pensee Transferable)"
acte: comprendre
---

> **SCÈNE CRAZYDEVS : traqueur de jutsu :** Naruto voit l'explosion finale et accuse le dernier fichier touché. Mauvais réflexe. Ton enquête doit remonter le flux, figer les hypothèses et retrouver la première trace qui ne colle plus.

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

Module : **01-CADRAGE/03-DEBUGGING** : lecture de stack trace, bissection, reproduction minimale.

Encart obligatoire (Pierre 6 : Pensee Transferable). 3 lignes.
Objectif : prouver que ce que tu viens d'apprendre n'est pas _JS_, c'est
un concept d'ingenierie que tu retrouveras ailleurs.

- **Python** : `pdb`/`breakpoint()` pour le pas-a-pas, traceback lu du bas vers le haut comme en JS ; bissection via `git bisect` identique, flaky tests memes causes (I/O, horloge, ordre).
- **Go** : `delve` (`dlv debug`) pour le pas-a-pas, panics avec stack goroutine (plus verbeux qu'un throw JS car chaque goroutine a la sienne) ; race detector natif (`go run -race`) pour les bugs de concurrence, sans equivalent direct cote event loop JS.
- **Rust** : le compilateur elimine par construction une classe entiere de bugs (data races, null deref) avant meme l'execution ; ce qui reste a debugger a l'execution est logique metier ou panics explicites (`unwrap`), pas memoire.

## Auto-test (1 min)

Ferme ce fichier. Ecris de tete, en 3 lignes, comment tu ferais la meme chose
en Python, Go, Rust. Rouvre. Compare. Ce que tu n'as pas su ecrire, c'est ce
qui reste postule sur la Pierre 6 : c'est la ta prochaine micro-lecture.

<!-- AF-TRANSFER-FIELD-1.1 -->

## Transfert terrain : Kintana

**Pourquoi ce transfert compte :** une notion que tu sais réciter mais que tu ne sais pas replacer dans un système est encore fragile.

**Quand la réutiliser :** quand une contrainte du produit change (rôle, réseau, volume, concurrence, panne ou coût) et que tu dois déterminer ce qui reste invariant.

**Limite :** ne transpose pas une syntaxe ou une solution sans vérifier ses hypothèses ; le même mécanisme peut avoir des garanties différentes selon le runtime et le stockage.

**Mission courte :** applique le principe de cette page à un incrément de [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md) : Reproduis un incident où un demandeur envoie deux fois la même commande après une réponse lente. Écris les hypothèses, ajoute le signal nécessaire, isole la cause et corrige sans supprimer la preuve du défaut. Produis un petit test ou scénario de panne et note l'invariant conservé, l'hypothèse qui change et la limite observée. Cette mission complète le transfert ; elle ne remplace pas le projet évalué du module.
