---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [temps_limite, decision_inversee]
anti_recipe_key: temps_limite+decision_inversee
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : prolongation au stade :** deux solutions ont l'air équivalentes jusqu'à ce que l'une épuise l'équipe au bout de 90 minutes. La mémoire et la performance se voient souvent dans la durée, pas dans la première démo.

# 03 : Fuite par closure : autopsie pas-à-pas

<!-- AF-DIAGRAM:closure -->

```text
┌──────────────┐
│ appelant     │
└──────┬───────┘
       │ crée
       ▼
┌──────────────┐       conserve
│ fonction     │────────────────┐
└──────┬───────┘                │
       │ retourne               │
       ▼                        ▼
┌──────────────┐        ┌──────────────┐
│ code suivant │        │ environnement│
└──────────────┘        │ lexical      │
                        └──────────────┘
```

Une closure reste liée à son environnement lexical même après le retour de la fonction créatrice.

Temps de lecture ~5 min

Le GC est intelligent, mais il obéit à une règle bête : **si c'est atteignable, je ne touche pas**. Une closure qui capture un gros objet, c'est une main tendue sur cet objet. Le GC passe, hausse les épaules.

## Le code coupable

```js
function attachHandler(bigData) {
  return function onClick() {
    console.log("clicked");
    // bigData n'est jamais lu, mais capturé
  };
}

const handlers = [];
for (let i = 0; i < 1000; i++) {
  handlers.push(attachHandler(new Array(100000).fill(i)));
}
```

Chaque `onClick` maintient vivant un tableau de 100000 entrées. On stocke 1000 handlers. RAM: ~800 MB pour rien.

## Le heap snapshot

```text
AVANT boucle : heap ~ 5 MB
APRÈS boucle : heap ~ 810 MB
Retained size de "onClick" : ~800 KB chacun
```

Dans DevTools > Memory > Heap snapshot : filtre par "closure", tu vois les 1000 fonctions et leur `[[Scopes]]` qui pointe sur `bigData`.

## La correction

```js
function attachHandler(bigData) {
  const summary = bigData.length; // extrais ce que tu utilises
  return function onClick() {
    console.log("clicked", summary);
  };
}
```

Le scope capturé se réduit à un nombre. Le GC balaie `bigData` dès que `attachHandler` retourne.

## Ce que l'analogie cache

Le moteur V8 fait des optimisations (escape analysis, scope pruning) mais **ne peut pas** deviner ton intention si `bigData` est référencé dans le scope même sans être lu. Ne compte pas sur la magie.

## Mission

Reproduis, mesure avec `process.memoryUsage().heapUsed`, corrige, remesure. Note l'écart en MB.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.

### Vérification observable : critères de réussite

Compare une fonction qui libère son abonnement avec une fonction qui conserve une closure vers un gros objet. Vérifie la rétention par un graphe de références, pas par une seule lecture de heap usage.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: performance -->

## Repères de décision

- **Pourquoi :** La performance influence l'expérience utilisateur et le coût d'exploitation. Il faut repérer le goulot réel avant de changer l'algorithme, le cache ou la mémoire.
- **Quand l’utiliser / quand l’éviter :** Mesure avant toute optimisation. Utilise profiling et benchmark sur une charge représentative ; évite un micro-benchmark qui n'observe pas le chemin de production.
- **Limites :** Un benchmark local ne prédit pas exactement la production. Les caches chauds, le GC, le matériel, la concurrence et la distribution des données peuvent changer le résultat.

## Mécanisme : la version sans magie

Établis une baseline, profile, identifie le coût dominant, change une seule variable, relance plusieurs fois et compare quantiles et mémoire.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **03 : Fuite par closure : autopsie pas-à-pas** se rattache à ce cas concret : Sur Kintana, la liste des demandes ou l'agrégation des créneaux peut devenir lente à mesure que le nombre de demandes augmente.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Localiser une rétention causée par une closure

**Mission liée à « 03 : Fuite par closure : autopsie pas-à-pas » :** Reproduis un gestionnaire Kintana qui conserve une closure après la fin de l’écran. Identifie la chaîne de références, supprime ou borne la rétention et compare les instantanés.

**Livrable :** Reproduction minimale, chemin de rétention annoté et comparaison avant/après.

**Critères d’acceptation :** La correction coupe la référence responsable sans supprimer une donnée encore utilisée ; la preuve ne repose pas seulement sur une baisse ponctuelle de mémoire.

**Transfert obligatoire :** Le callback doit rester actif plus longtemps : propose un cycle de vie explicite au lieu de le supprimer prématurément.
