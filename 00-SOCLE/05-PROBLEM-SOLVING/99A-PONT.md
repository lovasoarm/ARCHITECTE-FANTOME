---
stability: intemporel
acte: comprendre
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# PONT : de modéliser un problème à raisonner sur le temps à l'asynchrone

Temps de lecture ~2 min

-> ~10 min

> **PONT DIFFÉRÉ : À OUVRIR AU MOMENT INDIQUÉ.** Ce fichier prépare le passage conceptuel entre `00-SOCLE/05-PROBLEM-SOLVING` et `01-CADRAGE/02-ASYNC`. Il ne remplace pas les étapes intermédiaires du parcours : termine d'abord Mindset et respecte les prérequis de la Route 58. Reviens à ce pont lorsque tu abordes Async ; il ne crée pas une étape ni un gate supplémentaire.

## POURQUOI CE PONT EXISTE

Tu viens de modéliser des états, invariants, transitions. `01-CADRAGE/02-ASYNC/` ajoute une dimension : le temps qui passe entre deux états. Un modèle statique juste devient un modèle faux dès qu'on introduit une attente réseau, un timer, un handler d'événement.

## CE QUE TU MAÎTRISES DÉJÀ

- Décrire un domaine en états et transitions.
- Identifier des invariants qui doivent tenir tout le temps.
- Séparer données, contrat, et implémentation.

## VOCABULAIRE NOUVEAU QUI ARRIVE

- **Callback** : une fonction qu'on te promet d'appeler plus tard.
- **Promise** : un contrat sur une valeur pas encore là.
- **Event loop** : l'ordonnanceur qui décide quoi exécuter maintenant.
- **Microtask / macrotask** : deux files d'attente avec des priorités distinctes.

## LE PIÈGE MENTAL TYPIQUE DU SAUT

Croire qu'un `await` "bloque" comme un appel synchrone. Il ne bloque pas : il rend la main à l'event loop et reprend plus tard. Ton modèle mental doit intégrer que d'autres choses se passent entre le début et la fin d'une fonction async.

## EXERCICE-CHARNIÈRE (5 min chrono)

Sans lancer Node : quel est l'ordre d'affichage ?

```js
console.log("A");
queueMicrotask(() => console.log("B"));
setTimeout(() => console.log("C"), 0);
Promise.resolve().then(() => console.log("D"));
console.log("E");
```

Réponse attendue : `A E B D C`. Si tu hésites, ouvre `01-CADRAGE/02-ASYNC/04_event_loop/`.

## SI TU BLOQUES

Relis la partie de Problem Solving sur les états, transitions et invariants. Si tu n'as pas encore atteint Async dans la Route 58, garde cette page comme repère et poursuis le parcours normal ; ne saute pas Mindset ni les prérequis intermédiaires.

<!-- AF-TRANSFER-FIELD-1.1 -->

## Transfert terrain : Kintana

**Pourquoi ce transfert compte :** une notion que tu sais réciter mais que tu ne sais pas replacer dans un système est encore fragile.

**Quand la réutiliser :** quand une contrainte du produit change (rôle, réseau, volume, concurrence, panne ou coût) et que tu dois déterminer ce qui reste invariant.

**Limite :** ne transpose pas une syntaxe ou une solution sans vérifier ses hypothèses ; le même mécanisme peut avoir des garanties différentes selon le runtime et le stockage.

**Mission courte :** applique le principe de cette page à un incrément de [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md) : Reproduis un incident où un demandeur envoie deux fois la même commande après une réponse lente. Écris les hypothèses, ajoute le signal nécessaire, isole la cause et corrige sans supprimer la preuve du défaut. Produis un petit test ou scénario de panne et note l'invariant conservé, l'hypothèse qui change et la limite observée. Cette mission complète le transfert ; elle ne remplace pas le projet évalué du module.
