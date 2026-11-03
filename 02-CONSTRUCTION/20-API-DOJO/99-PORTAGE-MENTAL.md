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

Module : **02-CONSTRUCTION/20-API-DOJO** : contrats d'abord, erreurs et idempotence, auth, limites de performance.

Encart obligatoire (Pierre 6 : Pensee Transferable). 3 lignes.
Objectif : prouver que ce que tu viens d'apprendre n'est pas _JS_, c'est
un concept d'ingenierie que tu retrouveras ailleurs.

- **Python** : FastAPI genere le contrat OpenAPI depuis les types Python (proche de la philosophie "contracts-first" si le typage est pris au serieux) ; l'idempotence se gere de la meme facon (cle d'idempotence en header, verifiee cote serveur).
- **Go** : pas de framework dominant, souvent `net/http` brut ou `chi` : le contrat se documente manuellement (ou via `oapi-codegen`), rien n'est automatique comme un decorateur JS ; la gestion d'erreur HTTP suit le meme principe (valeur de retour explicite) que le module error-handling.
- **Rust** : `axum`/`actix-web` avec des types de requete/reponse verifies a la compilation ; une route qui n'a pas gere un cas d'erreur declare dans son type de retour ne compile pas, la ou JS le laisserait crasher a l'execution.

## Auto-test (1 min)

Ferme ce fichier. Ecris de tete, en 3 lignes, comment tu ferais la meme chose
en Python, Go, Rust. Rouvre. Compare. Ce que tu n'as pas su ecrire, c'est ce
qui reste postule sur la Pierre 6 : c'est la ta prochaine micro-lecture.

<!-- AF-TRANSFER-FIELD-1.1 -->

## Transfert terrain : Kintana

**Pourquoi ce transfert compte :** une notion que tu sais réciter mais que tu ne sais pas replacer dans un système est encore fragile.

**Quand la réutiliser :** quand une contrainte du produit change (rôle, réseau, volume, concurrence, panne ou coût) et que tu dois déterminer ce qui reste invariant.

**Limite :** ne transpose pas une syntaxe ou une solution sans vérifier ses hypothèses ; le même mécanisme peut avoir des garanties différentes selon le runtime et le stockage.

**Mission courte :** applique le principe de cette page à un incrément de [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md) : Expose une capacité Kintana avec contrat d’entrée/sortie, codes d’erreur stables, validation, autorisation et stratégie de retry/idempotence si l’opération écrit des données. Produis un petit test ou scénario de panne et note l'invariant conservé, l'hypothèse qui change et la limite observée. Cette mission complète le transfert ; elle ne remplace pas le projet évalué du module.
