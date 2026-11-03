---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [regression, preuve_partielle]
anti_recipe_key: regression+preuve_partielle
transfer_distance: high
assessment_role: instructional_checkpoint
---

# Mise en pratique : Type transformers

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## TYPE

Micro-drill : première passe JavaScript natif

## Niveau

[OK] Fondamental

## CONTEXTE

Transformer une donnée brute en texte lisible est une tâche courante : convertir une année en libellé, une note en texte et un code de statut en message. Tu peux apprendre cette séparation avec des fonctions JavaScript ordinaires, sans framework ni projet Portfolio.

## OBJECTIF

Écrire trois fonctions de formatage simples, prévisibles et défensives.

## APPLICATION : SANS REACT NI JSX

Dans un fichier `format.js` :

1. Crée `formatYear(value)` : renvoie l'année sous forme de chaîne si `value` est un entier fini raisonnable (entre 1900 et 2100), sinon `"Année inconnue"`.
2. Crée `formatRating(value)` : renvoie par exemple `"4.5/5"` si `value` est un nombre fini entre 0 et 5, sinon `"Note indisponible"`.
3. Crée `formatStatus(value)` : transforme `"active"` en `"Actif"`, `"paused"` en `"En pause"` et toute autre valeur en `"Statut inconnu"`.
4. Affiche quelques appels dans la console, dont au moins deux entrées invalides.

Exemple de départ :

```js
function formatRating(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return "Note indisponible";
  }
  if (value < 0 || value > 5) {
    return "Note indisponible";
  }
  return `${value}/5`;
}

console.log(formatRating(4.5)); // "4.5/5"
console.log(formatRating("4.5")); // "Note indisponible"
```

## Critère de réussite

- [ ] Les trois fonctions sont utilisables sans React, JSX, Next.js ou projet Portfolio.
- [ ] Chaque fonction retourne une chaîne dans tous les cas testés.
- [ ] Les valeurs invalides ne sont pas transformées silencieusement en valeur plausible.
- [ ] Tu peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi est-il utile de garder les fonctions de formatage séparées du code qui les appelle ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Frontière de première passe

Cette activité se réalise dans `format.js`, un fichier d'exercice local. Elle ne demande ni projet fil rouge, ni interface graphique, ni branche Git, ni configuration de build. L'intégration dans un projet existant appartient à un approfondissement ultérieur.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ta couche de formatage existe.

Tu as isolé la transformation dans des fonctions ordinaires. Le branchement dans une interface graphique sera un approfondissement ultérieur, après les prérequis correspondants.

> **Statut :** cette micro-pratique est requise dans la première passe Fundamentals. Seuls le checkpoint de profondeur et l’approfondissement produit Kintana ci-dessous sont différés.

> **Statut : approfondissement facultatif.**

## CHECKPOINT DE PROFONDEUR : variation D : transfert négatif

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

Prends le mécanisme de cette page et transpose-le dans un contexte où il risque de devenir une mauvaise pratique. Explique **quelle hypothèse cesse d'être vraie**, quelle conséquence apparaît, et quelle stratégie tu utiliserais à la place.

## Approfondissement différé : livraison produit Kintana : règle métier et état

> **Statut : différé, facultatif pour la première passe.** Termine d’abord la pratique de base de cette page. Reviens à cette intégration après avoir étudié les notions préalables et lorsque le dépôt Kintana et son environnement sont réellement disponibles. Cette tâche ne constitue pas une gate de progression Fundamentals. Si l’environnement manque, reporte-la ; une simulation ne vaut pas une livraison intégrée.

> **Contexte de pratique :** relie le principe de cette leçon à une règle métier de Kintana, sans supposer que le projet est déjà installé.

Le micro-exercice de cette page constitue la pratique de première passe. La livraison Kintana ci-dessous est un approfondissement produit différé : elle réutilise le principe dans un contexte plus large, mais ne conditionne pas la validation de cette notion ni la progression dans Fundamentals. Elle améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 52-type_transformers_minimini_projet » :** Dans Kintana, isole la valeur ou la transformation concernée dans une fonction métier ; vérifie l’état avant/après, les entrées invalides et l’absence de mutation involontaire.

Dans `domain/requests/`, transforme une réponse brute en résumé de demande en sélectionnant et renommant les champs nécessaires. Préserve les valeurs manquantes comme cas explicites plutôt que de leur attribuer un type arbitraire.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate de cette livraison différée (pas gate de progression Fundamentals) :** un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
