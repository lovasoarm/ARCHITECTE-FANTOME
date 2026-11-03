---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [changement_contexte, temps_limite]
anti_recipe_key: changement_contexte+temps_limite
transfer_distance: high
assessment_role: instructional_checkpoint
---

# Mise en pratique : Async rescue : sauver ce qui peut l'être

> **SCÈNE CRAZYDEVS : Mission Konoha :** trois clones partent en même temps, mais un seul doit avoir le dernier mot. Si tu ne distingues pas file d'attente, concurrence et ordre d'exécution, les clones vont te livrer leurs résultats dans un ordre qui te fera accuser le mauvais ninja.

## TYPE

<!-- AF-DIAGRAM:async_await -->

```text
┌──────────────┐
│ fonction     │
│ async        │
└──────┬───────┘
       │ await
       ▼
┌──────────────┐
│ suspend      │
│ la reprise   │
└──────┬───────┘
       │ Promise prête
       ▼
┌──────────────┐
│ reprend      │
│ le contexte  │
└──────────────┘
```

await suspend la reprise de la fonction async, pas l’ensemble du runtime.

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Un `await` peut propager une erreur lorsque la promesse rejetée n'est pas capturée à une frontière appropriée. Sur un portfolio, un service tiers en panne ne doit jamais coûter la visite.

## OBJECTIF

Ta page survit à une panne réseau.

## APPLICATION

- Entoure ton fetch d'un `try/catch` et renvoie une valeur de repli explicite.
- Ajoute un `error.tsx` sur la route pour capturer ce qui échappe.
- Provoque volontairement une erreur pour vérifier les deux niveaux.

## Critère de réussite

- [ ] Entoure ton fetch d'un `try/catch` et renvoie une valeur de repli explicite.
- [ ] Ajoute un `error.tsx` sur la route pour capturer ce qui échappe.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Que devient une erreur provenant d'un `await` lorsqu'aucune couche ne la capture ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ta page survit à une panne réseau.

Deux filets de sécurité en place, testés à la main. Commit-les.

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

## Livraison produit obligatoire : Kintana : Notification fiable

> **Fil narratif : Équipe 7 / Naruto :** Kakashi ne lance pas l’équipe dans le brouillard sans objectif ni plan de sortie. Ici, la mission commence par une hypothèse vérifiable, pas par un clavier en surchauffe.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 51-async_rescue_minimini_projet » :** Dans Kintana, traite une notification ou un événement soumis à délai, doublon et panne. Définis la politique de reprise et prouve qu’un rejeu ne double pas l’effet.

Intègre cette notion au traitement asynchrone des notifications Kintana. Simule au moins un timeout, un retry et un événement reçu deux fois ; conserve une clé stable pour empêcher un double effet.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Le système ne perd pas silencieusement l’événement ; il ne double pas l’effet ; le délai et le nombre de tentatives sont observables. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
