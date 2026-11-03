---
stability: intemporel
scope: "portage mental (Pierre 6 : Pensee Transferable)"
acte: comprendre
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

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

Module : **02-CONSTRUCTION/04-MATH-BASICS** : logique booleenne, arithmetique modulaire, bits, hashing, probabilites.

Encart obligatoire (Pierre 6 : Pensee Transferable). 3 lignes.
Objectif : prouver que ce que tu viens d'apprendre n'est pas _JS_, c'est
un concept d'ingenierie que tu retrouveras ailleurs.

- **Python** : entiers a precision arbitraire par defaut (pas d'overflow silencieux comme en JS avec `Number`), operateurs bit-a-bit identiques (`&`, `|`, `^`, `<<`) mais rarement utilises en pratique idiomatique.
- **Go** : types entiers fixes et explicites (`int32`, `uint64`...), l'overflow est defini par le langage (wrap silencieux) et non une approximation flottante comme `Number.MAX_SAFE_INTEGER` en JS ; le hashing typique passe par `hash/fnv` ou `crypto/sha256` de la stdlib.
- **Rust** : overflow qui panique en mode debug et wrap en mode release (comportement explicite et configurable, contrairement au flottant IEEE 754 silencieux de JS) ; les memes bases (modulo, bits, hashing) mais avec des types de taille garantie a la compilation.

## Auto-test (1 min)

Ferme ce fichier. Ecris de tete, en 3 lignes, comment tu ferais la meme chose
en Python, Go, Rust. Rouvre. Compare. Ce que tu n'as pas su ecrire, c'est ce
qui reste postule sur la Pierre 6 : c'est la ta prochaine micro-lecture.

<!-- AF-TRANSFER-FIELD-1.1 -->

## Transfert terrain : Kintana

**Pourquoi ce transfert compte :** une notion que tu sais réciter mais que tu ne sais pas replacer dans un système est encore fragile.

**Quand la réutiliser :** quand une contrainte du produit change (rôle, réseau, volume, concurrence, panne ou coût) et que tu dois déterminer ce qui reste invariant.

**Limite :** ne transpose pas une syntaxe ou une solution sans vérifier ses hypothèses ; le même mécanisme peut avoir des garanties différentes selon le runtime et le stockage.

**Mission courte :** applique le principe de cette page à un incrément de [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md) : Utilise la notion pour évaluer une décision Kintana : capacité, ordonnancement, risque d’erreur ou seuil d’un modèle. Écris les variables, unités et hypothèses, puis compare au moins deux scénarios. Produis un petit test ou scénario de panne et note l'invariant conservé, l'hypothèse qui change et la limite observée. Cette mission complète le transfert ; elle ne remplace pas le projet évalué du module.
