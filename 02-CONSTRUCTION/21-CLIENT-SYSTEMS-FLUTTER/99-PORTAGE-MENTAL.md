---
stability: intemporel
acte: transférer
---

> **SCÈNE CRAZYDEVS : Multivers :** tu changes de framework, pas de cerveau. Si ton modèle disparaît avec le widget, ce n’était pas encore un modèle.

# Portage mental

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

Porte :

- état UI → état observable ailleurs ;
- cache local → cache distribué ;
- retry client → retry serveur ;
- contrat mobile → contrat service ;
- observabilité client → trace distribuée.

Écris ce qui reste invariant et ce qui doit être repensé.

<!-- AF-TRANSFER-FIELD-1.1 -->

## Transfert terrain : Kintana

**Pourquoi ce transfert compte :** une notion que tu sais réciter mais que tu ne sais pas replacer dans un système est encore fragile.

**Quand la réutiliser :** quand une contrainte du produit change (rôle, réseau, volume, concurrence, panne ou coût) et que tu dois déterminer ce qui reste invariant.

**Limite :** ne transpose pas une syntaxe ou une solution sans vérifier ses hypothèses ; le même mécanisme peut avoir des garanties différentes selon le runtime et le stockage.

**Mission courte :** applique le principe de cette page à un incrément de [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md) : Implémente un morceau du parcours mobile/web de création ou suivi de demande. Ajoute états loading/empty/error, accessibilité clavier et conservation du brouillon quand la connexion disparaît. Produis un petit test ou scénario de panne et note l'invariant conservé, l'hypothèse qui change et la limite observée. Cette mission complète le transfert ; elle ne remplace pas le projet évalué du module.
