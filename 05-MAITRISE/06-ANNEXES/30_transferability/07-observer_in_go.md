---
stability: intemporel
acte: comprendre
---

**SCÈNE CRAZYDEVS : mission ouverte :** les contraintes viennent d’augmenter, l’information est incomplète et plusieurs solutions restent plausibles. Ne cherche pas encore la réponse : trouve d’abord ce qui pourrait casser.

# Drill : Go

Temps de lecture ~5 min

Objectif P6 : montrer que ta méthode ce parcours survit au changement de langage.

Un bug de channel Go où un observer manque des events. Ton job : identifier si c'est un problème de buffered vs unbuffered, de goroutine leak, ou de close prématuré.

- Écris ton diagnostic **avant** de tester.
- Trace le parallèle avec `EventEmitter` en JS : où est l'équivalent du buffer ?

## Debrief à écrire (obligatoire)

- Qu'est-ce qui a été **identique** à JS ?
- Qu'est-ce qui a été **différent** ?
- Qu'est-ce que tu retiens pour la prochaine fois ?

### Exemple travaillé : cas métier

**Exemple résolu (illustratif).** Une fonction Go `func Handle(ctx context.Context, id string) error` reçoit un contexte et un identifiant. Pour comprendre son flux, on cherche qui construit `ctx`, où `id` est validé, quelles erreurs sont retournées et quels tests appellent `Handle`. On note ensuite l'effet externe éventuel (base, réseau, fichier). La carte distingue ce qui est visible dans le code de ce qui exige une observation à l'exécution.

**À toi :** Tu rejoins une organisation qui possède plusieurs services, une documentation incomplète et un incident ouvert ; il faut comprendre avant de proposer. Construis un cas minimal qui illustre « Drill : Go » avec des données concrètes. Décris l’état initial, une seule opération, l’état final attendu et la raison pour laquelle ce résultat est correct.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:transfer -->

## Repère visuel utile : Transférer un invariant entre écosystèmes

```text
principe abstrait / invariant
          |
     +----+----+
     v         v
 runtime A   runtime B
     |         |
 implémenter implémenter
     |         |
     +----+----+
          v
    mêmes fixtures
          |
          v
 comparer traces + limites
```

<!-- AF-LESSON-PROFILE: transfer -->

## Repères de décision

- **Pourquoi :** Le transfert vérifie que tu as compris un principe et pas seulement mémorisé une syntaxe ou une recette liée à un outil.
- **Quand l’utiliser / quand l’éviter :** Utilise-le quand tu changes de langage, de runtime, de framework ou de contexte métier. Évite de transposer mot à mot une abstraction qui n'existe pas dans l'écosystème cible.
- **Limites :** Les sémantiques de mémoire, concurrence, erreurs et bibliothèques diffèrent. Une analogie entre langages ne prouve pas l'équivalence de leur comportement.

## Mécanisme : la version sans magie

Identifie l'invariant, lis le modèle du langage cible, implémente une version minimale, puis compare les traces et les cas limites.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Drill : Go** se rattache à ce cas concret : Kintana peut être implémenté ou instrumenté dans plusieurs technologies. Les garanties d'idempotence et d'ordre doivent rester les mêmes même si la syntaxe change.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Transférer un invariant entre écosystèmes

> **Arc One Piece / Grand Line :** si tu changes de navire, le principe doit encore naviguer. Le but n'est pas de réciter JavaScript dans un autre langage, mais de reconnaître le même mécanisme.

**Mission liée à « Drill : Go » :** Prends le mécanisme de la leçon et reconstruis-le dans un langage ou runtime différent. Utilise une fixture commune, compare les traces et note ce qui ne se transpose pas directement.

**Livrable :** deux implémentations ou une implémentation et un modèle de référence, tests partagés, tableau de sémantique et note de divergence.

**Critères d’acceptation :** les mêmes entrées sont utilisées ; les divergences sont expliquées ; aucune équivalence n'est revendiquée sans test ; les différences du runtime sont explicites.

**Transfert obligatoire :** Change l'hypothèse de concurrence ou d'erreur du second environnement. Révise ton modèle plutôt que de forcer la première solution.
