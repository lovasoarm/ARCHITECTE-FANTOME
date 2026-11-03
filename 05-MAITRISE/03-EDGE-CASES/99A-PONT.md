---
stability: intemporel
acte: comprendre
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# PONT : des edge cases au travail durable

Temps de lecture ~2 min

Tu viens d'apprendre à chasser les cas limites, les races et les heisenbugs. Le module suivant est **05-DAY-TO-LEGEND** : il transforme cette vigilance en discipline de travail durable.

## Ce que tu réutilises

1. Tu conserves tes invariants et tes hypothèses.
2. Tu gardes les cas limites visibles dans le journal de décision.
3. Tu mesures avant de simplifier.
4. Tu ne délègues pas ton jugement à une IA.

## Exercice-charnière

Écris trois situations où une automatisation ou une suggestion d'IA pourrait choisir une action qui casse un invariant. Pour chacune : invariant, surface d'action, signal d'alerte et mécanisme de récupération.

## Transition

Ouvre [`05-DAY-TO-LEGEND/README.md`](../05-DAY-TO-LEGEND/README.md).

<!-- AF-TRANSFER-FIELD-1.1 -->

## Transfert terrain : Kintana

**Pourquoi ce transfert compte :** une notion que tu sais réciter mais que tu ne sais pas replacer dans un système est encore fragile.

**Quand la réutiliser :** quand une contrainte du produit change (rôle, réseau, volume, concurrence, panne ou coût) et que tu dois déterminer ce qui reste invariant.

**Limite :** ne transpose pas une syntaxe ou une solution sans vérifier ses hypothèses ; le même mécanisme peut avoir des garanties différentes selon le runtime et le stockage.

**Mission courte :** applique le principe de cette page à un incrément de [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md) : Construis une suite de tests autour d’un invariant Kintana lié à cette notion. Ajoute un test nominal, un cas limite, un cas d’accès refusé ou de panne selon le sujet, puis injecte volontairement une régression. Produis un petit test ou scénario de panne et note l'invariant conservé, l'hypothèse qui change et la limite observée. Cette mission complète le transfert ; elle ne remplace pas le projet évalué du module.
