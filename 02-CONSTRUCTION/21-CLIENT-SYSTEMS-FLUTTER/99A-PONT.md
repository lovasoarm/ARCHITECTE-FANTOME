---
stability: intemporel
acte: transférer
---

> **SCÈNE CRAZYDEVS : pont de fortune :** tu quittes le client pour entrer dans le monde où plusieurs équipes doivent déployer sans se marcher dessus.

# Pont : vers Platform Engineering

Tu as appris que le client dépend d’un système qu’il ne contrôle pas. Le niveau suivant te demande de construire le **chemin de livraison** qui rend ce système opérable par plusieurs équipes sans transformer chaque développeur en administrateur de cluster.

<!-- AF-TRANSFER-FIELD-1.1 -->

## Transfert terrain : Kintana

**Pourquoi ce transfert compte :** une notion que tu sais réciter mais que tu ne sais pas replacer dans un système est encore fragile.

**Quand la réutiliser :** quand une contrainte du produit change (rôle, réseau, volume, concurrence, panne ou coût) et que tu dois déterminer ce qui reste invariant.

**Limite :** ne transpose pas une syntaxe ou une solution sans vérifier ses hypothèses ; le même mécanisme peut avoir des garanties différentes selon le runtime et le stockage.

**Mission courte :** applique le principe de cette page à un incrément de [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md) : Dans Kintana, rends un composant reproductible, vérifie sa santé, ses variables et son arrêt propre ; documente et teste le rollback quand l’environnement le permet. Produis un petit test ou scénario de panne et note l'invariant conservé, l'hypothèse qui change et la limite observée. Cette mission complète le transfert ; elle ne remplace pas le projet évalué du module.
