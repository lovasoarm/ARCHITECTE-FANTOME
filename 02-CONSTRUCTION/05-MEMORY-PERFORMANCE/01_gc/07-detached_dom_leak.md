---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [preuve_partielle, fausse_piste]
anti_recipe_key: preuve_partielle+fausse_piste
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : prolongation au stade :** deux solutions ont l'air équivalentes jusqu'à ce que l'une épuise l'équipe au bout de 90 minutes. La mémoire et la performance se voient souvent dans la durée, pas dans la première démo.

# Detached DOM leak : le poison des SPA

Temps de lecture ~25 min

Un nœud DOM que tu retires de l'arbre visible peut rester en RAM des heures si un seul
JS quelque part tient encore une référence. Multiplié par une SPA qui monte/démonte
20 composants par minute, ta page bouffe 500 MB en une heure sans qu'aucun bouton
n'agisse.

Prérequis : `06-heap_snapshot_hands_on.md`.

---

## 1) SCÉNARIO REPRO (à exécuter dans une page vide)

```html
<button id="mount">Mount</button>
<button id="unmount">Unmount</button>
<div id="host"></div>
<script>
  const cache = []; // <-- coupable silencieux

  document.getElementById("mount").onclick = () => {
    const el = document.createElement("div");
    el.textContent = "panel " + cache.length;
    el.onclick = () => console.log(el.textContent); // closure capture `el`
    cache.push(el); // <-- retenu à vie
    document.getElementById("host").appendChild(el);
  };

  document.getElementById("unmount").onclick = () => {
    document.getElementById("host").innerHTML = ""; // "détaché", mais...
  };
</script>
```

1. Clique Mount x 20, puis Unmount.
2. Snapshot Memory → filtre "Detached".
3. Tu verras 20 `Detached HTMLDivElement`. Ils SONT retenus par `cache`.

---

## 2) LES 3 CAUSES CANONIQUES

```text
CAUSE               COMMENT LA RECONNAÎTRE        FIX
--------------------------------  -----------------------------------  ------------------------
1. Cache/registre global      Array/Map/Set qui ne se vide jamais  WeakMap/WeakSet OU vider
2. Event listener non retiré    addEventListener sans removeListener AbortController.signal
3. Timer/interval non annulé    setInterval qui référence un nœud   clearInterval au unmount
```

---

## 3) FIX AVEC `AbortController` (moderne, propre)

```js
const ac = new AbortController();
el.addEventListener("click", handler, { signal: ac.signal });
// au unmount :
ac.abort(); // retire TOUS les listeners liés en 1 appel
```

Pourquoi c'est mieux que `removeEventListener` : tu n'as pas à garder une référence
au handler exact. Un seul `abort()` nettoie tout un scope de listeners.

---

## 4) MISSION

Reproduis le bug, capture snapshot A (avant Mount), B (après Mount + Unmount + gc()),
C (après ton fix + Unmount + gc()). Livre `LEAK_REPORT_dom.md` avec les 3 snapshots
comparés et le patch. Si le delta detached n'est pas 0 en C, ton fix est incomplet.

---

## 5) (attention) PIÈGE

`WeakMap` ne protège PAS si la clé est retenue ailleurs. Un `WeakMap<HTMLElement, data>`
ne libère l'entrée QUE si plus rien ne référence l'HTMLElement. Si `cache.push(el)`
existe, WeakMap ne t'aide pas : c'est `cache` qu'il faut virer.

Prochaine étape : `08A-worker_leak_reproduction.md`.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.

### Vérification observable : critères de réussite

Retire un nœud du DOM mais conserve volontairement une référence JS. Vérifie le chemin de rétention dans un heap snapshot avant de conclure à une fuite.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:performance -->

## Repère visuel utile : Suivre la rétention de nœuds DOM détachés

```text
monter puis démonter le composant
             |
             v
nœud absent du document mais retenu
             |
             v
chemin de rétention
             |
             v
supprimer la référence responsable
             |
             v
comparer les instantanés
```

<!-- AF-LESSON-PROFILE: performance -->

## Repères de décision

- **Pourquoi :** La performance influence l'expérience utilisateur et le coût d'exploitation. Il faut repérer le goulot réel avant de changer l'algorithme, le cache ou la mémoire.
- **Quand l’utiliser / quand l’éviter :** Mesure avant toute optimisation. Utilise profiling et benchmark sur une charge représentative ; évite un micro-benchmark qui n'observe pas le chemin de production.
- **Limites :** Un benchmark local ne prédit pas exactement la production. Les caches chauds, le GC, le matériel, la concurrence et la distribution des données peuvent changer le résultat.

## Mécanisme : la version sans magie

Établis une baseline, profile, identifie le coût dominant, change une seule variable, relance plusieurs fois et compare quantiles et mémoire.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Detached DOM leak : le poison des SPA** se rattache à ce cas concret : Sur Kintana, la liste des demandes ou l'agrégation des créneaux peut devenir lente à mesure que le nombre de demandes augmente.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Détecter une fuite de nœuds DOM détachés

**Mission liée à « Detached DOM leak : le poison des SPA » :** Dans un écran Kintana, monte puis démonte un composant contenant des événements et références DOM. Cherche les nœuds détachés encore retenus et identifie le propriétaire de la référence.

**Livrable :** Reproduction, chemin de rétention, correctif de nettoyage et vérification après démontage.

**Critères d’acceptation :** Le composant ne perd pas de fonctionnalité ; listeners et références sont libérés au bon moment ; l’état DOM détaché n’est pas confondu avec une preuve unique de fuite.

**Transfert obligatoire :** Le composant est remonté plusieurs fois : vérifie qu’aucune instance précédente ne reste retenue.
