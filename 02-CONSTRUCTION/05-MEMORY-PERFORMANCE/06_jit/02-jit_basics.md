---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L4
perturbation_modes: [fausse_piste, decision_inversee]
anti_recipe_key: fausse_piste+decision_inversee
transfer_distance: low
assessment_role: diagnostic_mastery
---

**SCÈNE CRAZYDEVS : Prison Break :** le tunnel fuit lentement. Personne ne voit la panne au premier tour. Puis la cellule se remplit. Une fuite mémoire est souvent exactement aussi discrète.

> **CrazyDevs : jauge de chakra :** si tu optimises sans mesurer, tu dépenses ton chakra sur le mauvais ennemi. Mesure d’abord, attaque ensuite.

# JIT basics : le moteur qui apprend ton code en le lisant

Temps de lecture ~9 min

Ton code JS n'est jamais "juste exécuté". Il est observé, mesuré, puis réécrit en interne par V8 (le moteur JS de Chrome et Node) pendant qu'il tourne. Le JIT (Just-In-Time : compilation à la volée) regarde tes fonctions, repère celles qui tournent souvent, et les transforme en code machine optimisé.

Le piège : cette optimisation peut sauter à tout moment, sans erreur, sans log, juste un ralentissement brutal que personne ne comprend.

---

## 1) LES ÉTAPES D'EXÉCUTION DE V8 : IGNITION, SPARKPLUG, MAGLEV ET TURBOFAN

V8 n'utilise pas seulement deux moteurs. Son pipeline a évolué et dépend de la version du moteur, de l'architecture et du contexte d'exécution. Le schéma ci-dessous résume les principaux niveaux modernes ; il ne signifie pas que chaque fonction traverse obligatoirement toutes les étapes.

```text
ton code source
   |
   v
 Ignition       : interprète le bytecode (démarrage rapide)
   |
   v
 Sparkplug      : compilation de base, peu coûteuse
   |
   v
 Maglev         : compilation optimisante intermédiaire
   |
   v
 TurboFan       : compilation optimisante de niveau supérieur
```

**Ignition** transforme le code en bytecode (instructions intermédiaires) et l'exécute. **Sparkplug** peut compiler rapidement les fonctions suffisamment actives sans faire tout le travail d'un optimiseur avancé. **Maglev** ajoute une étape d'optimisation intermédiaire. **TurboFan** peut produire du code machine plus fortement optimisé à partir des informations observées.

Le moteur décide des promotions selon ses heuristiques et son état d'exécution : il n'existe pas de seuil universel du type « exactement 1 000 appels ». Toutes les fonctions ne deviennent pas chaudes et toutes ne passent pas par chaque niveau. Le backend/IR **Turboshaft** est une infrastructure de compilation utilisée par V8 ; ce n'est pas un niveau d'exécution supplémentaire à placer après TurboFan.

Pour suivre l'évolution de ces détails internes, consulte les références officielles : [Sparkplug](https://v8.dev/blog/sparkplug), [Maglev](https://v8.dev/blog/maglev), [Elements kinds in V8](https://v8.dev/blog/elements-kinds), [Fast properties in V8](https://v8.dev/blog/fast-properties) et [Turboshaft](https://v8.dev/blog/leaving-the-sea-of-nodes). Ces articles décrivent des versions et choix internes précis ; ils ne remplacent pas un profilage sur la version de runtime réellement utilisée.

Le mot clé : **hypothèses**. Un optimiseur peut spécialiser du code à partir des types et formes observés. Si une hypothèse ne tient plus, V8 peut déoptimiser et reprendre l'exécution à un niveau moins spécialisé. Le détail précis dépend de la version de V8.

---

## 2) HIDDEN CLASSES : POURQUOI LA FORME DE TON OBJET COMPTE

JS n'a pas de classes fixes comme Java ou C++. Mais V8 en crée quand même en interne, pour pouvoir optimiser l'accès aux propriétés.

```js
// le moteur de combat de rasengan_engine
function creerNinja(nom, chakra) {
  const ninja = {};
  ninja.nom = nom; // V8 crée une hidden class C0 (juste {})
  ninja.chakra = chakra; // V8 transitionne vers C1 ({nom})
  // puis vers C2 ({nom, chakra})
  return ninja;
}

const naruto = creerNinja("Naruto", 100);
const sasuke = creerNinja("Sasuke", 90);
// naruto et sasuke partagent la MÊME hidden class C2
// V8 peut donc accéder à .chakra avec un offset mémoire fixe, sans chercher
```

Tant que tous tes objets passent par le même chemin de création, dans le même ordre, V8 les range sous la même hidden class et accède à leurs propriétés quasi instantanément.

Le piège arrive quand deux objets censés être "pareils" ne le sont pas vraiment :

```js
const sakura = creerNinja("Sakura", 80);
sakura.element = "terre"; // ajouté APRÈS coup, hors du chemin habituel
// sakura bascule sur une hidden class différente de naruto et sasuke
// V8 ne peut plus traiter ces trois objets de façon uniforme
// résultat : accès plus lent, optimisations perdues sur ce groupe d'objets
```

Règle pratique : initialise toutes les propriétés d'un objet dans le même ordre, dès la construction. Ne les ajoute pas au compte-gouttes plus tard.

---

## 3) INLINE CACHES : LA MÉMOIRE COURTE DE V8

Pour aller encore plus vite, V8 retient "la dernière fois où j'ai accédé à cette propriété, c'était quelle hidden class". C'est l'inline cache (cache en ligne, attaché directement au point d'appel dans le code).

```js
function getChakra(ninja) {
  return ninja.chakra;
}

// si getChakra() est toujours appelée avec des objets de la même hidden class :
// V8 mémorise "ninja.chakra est toujours à l'offset 8" et saute la recherche
// → c'est un monomorphic inline cache (une seule forme observée, rapide)

// si getChakra() reçoit plusieurs formes d'objets, le site d'accès peut devenir polymorphe.
// Avec beaucoup de formes observées, il peut devenir mégamorphe ; le seuil et la stratégie
// dépendent du site d'accès, de V8 et de sa version.
```

Un inline cache polymorphe conserve des chemins rapides pour plusieurs formes connues. Un site mégamorphe peut utiliser une stratégie moins spécialisée, mais cela ne signifie pas automatiquement que toute la fonction perd ses optimisations ou devient lente. Profile la version et les données réelles avant de conclure ; n'utilise pas une règle fixe du type « 5 formes = deopt ».

---

## 4) DEOPTIMIZATION : QUAND LE PARI DE TURBOFAN ÉCHOUE

Un niveau optimisant (par exemple TurboFan) travaille à partir d'hypothèses observées ("cette variable reçoit des nombres", "ces objets ont la même forme"). Si une hypothèse cesse d'être valable, V8 peut invalider le code spécialisé et reprendre l'exécution à un niveau moins spécialisé. C'est une déoptimisation (_deopt_). Le niveau exact de reprise et le chemin de réoptimisation dépendent de la version et du contexte.

```js
function additionner(a, b) {
  return a + b;
}

// phase 1 : appelée 50 000 fois avec des numbers
for (let i = 0; i < 50000; i++) additionner(i, i + 1);
// TurboFan observe "toujours des numbers", optimise pour ça

// phase 2 : un appel surprise
additionner("5", "3"); // string concat, pas addition numérique
// le pari "a et b sont des numbers" vient de mourir
// V8 peut déoptimiser cette spécialisation et reprendre à un niveau moins spécialisé
```

Une deopt isolée ne tue pas ton app. Une alternance répétée entre spécialisation et déoptimisation peut toutefois coûter cher sur un hot path. Décris ce phénomène comme des **déoptimisations répétées** ou du _deopt churn_ ; « bailout loop » n'est pas un nom de mécanisme stable à enseigner comme une garantie de V8. Mesure le coût sur le runtime et les données ciblés avant d'affirmer qu'il dépasse celui d'un code non optimisé.

---

## 5) CE QUI DÉCLENCHE UNE DEOPT EN PRATIQUE

```text
type qui change sur un paramètre       --> spécialisation potentiellement invalidée
formes d'objets variées               --> site d'accès potentiellement polymorphe/mégamorphe
ajout d'un type différent dans un array --> changement de kind d'éléments possible
tableau très creux ou index atypiques --> représentation dictionnaire possible
propriété supprimée / ajoutée tardive --> transitions de forme possibles
```

**Ne confonds pas changement de type et mode dictionnaire.** Avec V8, un tableau `[1, 2, 3]` utilise généralement une représentation spécialisée pour les petits entiers. Ajouter une chaîne peut le faire évoluer vers un kind plus général, comme `PACKED_ELEMENTS` ; cela ne signifie pas qu'il passe automatiquement en `DICTIONARY_ELEMENTS`. Les tableaux creux (avec beaucoup d'indices manquants) ou certains usages atypiques peuvent, eux, utiliser une représentation dictionnaire. Les kinds exacts sont des détails internes qui varient selon le moteur et sa version.

Les anciennes recommandations catégoriques sur `try/catch` ou `arguments` ne doivent pas devenir des règles intemporelles : les optimisations évoluent. Profile le code réel avant de modifier une structure uniquement pour plaire au JIT.

---

## 6) CE QUE ÇA CHANGE CONCRÈTEMENT

Tu n'as pas besoin de penser au JIT en permanence. Une grande partie du code applicatif ne devient jamais suffisamment chaude pour bénéficier d'une compilation optimisante avancée. Le JIT compte surtout sur les hot paths identifiés par profilage (parsing de gros volumes, calculs répétés, transformations de données). Dans ces zones seulement, la stabilité des formes et des types peut devenir un levier de performance ; vérifie-le par mesure plutôt que par intuition.

---

## EXERCICES

## EXO 1 : LA HIDDEN CLASS CASSÉE

Ce code crée 10 000 ninjas pour une simulation de bataille. Identifie pourquoi certains d'entre eux vont casser l'optimisation de V8, et corrige.

```js
function creerNinjaBataille(nom, chakra, estBoss) {
  const ninja = { nom, chakra };
  if (estBoss) {
    ninja.titre = "Boss"; // ajouté seulement pour certains
  }
  return ninja;
}

const armee = [];
for (let i = 0; i < 10000; i++) {
  armee.push(creerNinjaBataille(`ninja${i}`, 100, i % 100 === 0));
}
```

(indice : toutes les hidden classes doivent être identiques dès la construction, même pour les propriétés "optionnelles")

## EXO 2 : LE TABLEAU QUI RALENTIT TOUT SEUL

Un calcul de score tourne sur un tableau de stats de joueurs. Le tableau commence propre, mais une ligne plus loin dans le code le pollue silencieusement. Trouve la ligne fautive et explique l'impact sur le mode de stockage du tableau.

```js
const scores = [42, 87, 15, 93, 28, 71];

function calculerMoyenne(arr) {
  return arr.reduce((acc, val) => acc + val, 0) / arr.length;
}

console.log(calculerMoyenne(scores));

scores.push("forfait"); // une ligne plus loin dans le vrai fichier
console.log(calculerMoyenne(scores));
```

---

## RÉSUMÉ

V8 combine un interpréteur et plusieurs niveaux de compilation dont Sparkplug, Maglev et TurboFan dans les versions modernes ; le passage entre ces niveaux dépend d'heuristiques et de la version. Les hidden classes (formes internes d'objets) et les inline caches aident à spécialiser les accès, sans qu'un nombre fixe de formes garantisse une perte d'optimisation. Une déopt n'est pas une erreur : elle retire une spécialisation dont les hypothèses ne tiennent plus. Les tableaux qui changent de type peuvent changer de kind d'éléments ; ils ne passent pas automatiquement en mode dictionnaire. Profile avant de conclure.

---

## Ou l'analogie casse (JIT)

Garde-fou epistemologique : l'analogie seduisante est utile a l'entree, dangereuse a la sortie.
Ce tableau liste les endroits **precis** ou l'analogie courante trompe.

| Analogie courante                     | Ou elle casse                                                                                                                                       |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| "JIT = toujours plus rapide"          | Faux : warmup, deoptimisation sur type qui change, code monomorphique/polymorphique/megamorphique. Un JIT confus est plus lent qu un interpret pur. |
| "Le JIT devine mon intention"         | Il devine des **types** et des **formes d objet** (hidden classes). Si tu changes la forme, tu deoptimises.                                         |
| "Micro-benchmarks reflet ent la prod" | Non : le JIT optimise agressivement du code trop simple ; en prod le comportement diverge.                                                          |

Regle : si tu ne peux pas nommer _une_ case ou ton analogie casse, tu ne l'as
pas encore comprise ; tu l'as juste memorisee.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.

### Vérification observable : critères de réussite

Prépare trois vérifications : cas nominal, cas limite et cas invalide. Écris avant l’exécution l’assertion attendue pour « JIT basics : le moteur qui apprend ton code en le lisant », puis conserve le résultat et explique tout écart.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: performance -->

## Repères de décision

- **Pourquoi :** La performance influence l'expérience utilisateur et le coût d'exploitation. Il faut repérer le goulot réel avant de changer l'algorithme, le cache ou la mémoire.
- **Quand l’utiliser / quand l’éviter :** Mesure avant toute optimisation. Utilise profiling et benchmark sur une charge représentative ; évite un micro-benchmark qui n'observe pas le chemin de production.
- **Limites :** Un benchmark local ne prédit pas exactement la production. Les caches chauds, le GC, le matériel, la concurrence et la distribution des données peuvent changer le résultat.

## Mécanisme : la version sans magie

Établis une baseline, profile, identifie le coût dominant, change une seule variable, relance plusieurs fois et compare quantiles et mémoire.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **JIT basics : le moteur qui apprend ton code en le lisant** se rattache à ce cas concret : Sur Kintana, la liste des demandes ou l'agrégation des créneaux peut devenir lente à mesure que le nombre de demandes augmente.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Comparer le comportement avant et après échauffement

**Mission liée à « JIT basics : le moteur qui apprend ton code en le lisant » :** Mesure une fonction Kintana sur plusieurs phases d’exécution (premiers appels puis régime stabilisé) et varie les formes d’entrée. Interprète les écarts sans supposer un mécanisme interne non observé.

**Livrable :** Protocole de warm-up, résultats séparés et hypothèses prudentes.

**Critères d’acceptation :** Les phases sont séparées ; les données sont répétées ; la version du runtime est indiquée ; aucune règle d’optimisation fondée sur un folklore n’est avancée.

**Transfert obligatoire :** Une variation disparaît sur un autre runtime : limite la conclusion à l’environnement mesuré.
