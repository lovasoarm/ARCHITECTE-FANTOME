---
stability: intemporel
acte: transférer
---

> **SCÈNE CRAZYDEVS : univers parallèle :** Backstage, une autre plateforme ou un script maison changent les outils. Le problème reste le même : réduire le coût cognitif sans cacher le risque.

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

Porte : GitOps → autre outil de réconciliation ; IDP → portail interne ; golden path → convention locale ; policy-as-code → autre moteur de règles.

Écris les invariants, les différences et les risques de lock-in.

<!-- AF-TRANSFER-FIELD-1.1 -->

## Transfert terrain : Kintana

**Pourquoi ce transfert compte :** une notion que tu sais réciter mais que tu ne sais pas replacer dans un système est encore fragile.

**Quand la réutiliser :** quand une contrainte du produit change (rôle, réseau, volume, concurrence, panne ou coût) et que tu dois déterminer ce qui reste invariant.

**Limite :** ne transpose pas une syntaxe ou une solution sans vérifier ses hypothèses ; le même mécanisme peut avoir des garanties différentes selon le runtime et le stockage.

**Mission courte :** applique le principe de cette page à un incrément de [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md) : Rends le composant Kintana reproductible dans l’environnement prévu par le module : configuration explicite, health/readiness, arrêt propre, journal utile et procédure de retour arrière. N’ajoute pas d’outil qui n’est pas nécessaire au sujet. Produis un petit test ou scénario de panne et note l'invariant conservé, l'hypothèse qui change et la limite observée. Cette mission complète le transfert ; elle ne remplace pas le projet évalué du module.
