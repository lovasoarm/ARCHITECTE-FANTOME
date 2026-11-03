---
stability: intemporel
acte: reference
assessment_role: instructional_support
---

# Corrigé différé : 12-TYPESCRIPT

**Ne lire qu'après l'atelier.** Ce document est un guide de correction et non une sortie d'exécution certifiée.

## Raisonnement attendu

1. Identifier dans `03_ts_advanced/02-conditional_types.md` la précondition déterminante pour `conditional types`.
2. Produire une prédiction spécifique et falsifiable ; relever les entrées, l'environnement et la commande exacte.
3. Comparer la sortie observée à la prédiction. Ne pas modifier plusieurs facteurs en même temps.
4. Expliquer causalement la divergence : précondition, transformation, puis effet. Une simple copie de réponse échoue au critère d'autonomie.
5. Répéter le cas positif et le cas volontairement faux ; mesurer ou décrire le changement.

## Exemples résolus : Conditional types

Les exemples ci-dessous sont des **fixtures pédagogiques** : les résultats sont déduits des entrées affichées ou des hypothèses explicitement données. Ils ne prétendent pas qu’une commande, un service ou une infrastructure a été exécuté dans cette release.

### Exemple A : Type de réponse selon le mode

```ts
type Track = { id: string; title: string; duration: number; audioUrl: string };
type TrackResponse<M extends "full" | "preview"> = M extends "full"
  ? Track
  : Pick<Track, "id" | "title" | "duration">;
type Preview = TrackResponse<"preview">;
// Preview = { id: string; title: string; duration: number }
```

Si `M` vaut littéralement `'preview'`, la sortie omet `audioUrl`. Le type protège le contrat statique ; il ne retire pas magiquement une propriété d’un objet runtime.

### Exemple B : Distributivité sur une union

```ts
type ToArray<T> = T extends unknown ? T[] : never;
type Distributed = ToArray<string | number>;
// string[] | number[]
type OneArray<T> = [T] extends [unknown] ? T[] : never;
type NotDistributed = OneArray<string | number>;
// (string | number)[]
```

Le paramètre nu `T` déclenche la distribution sur chaque membre de l’union. Les crochets autour de `T` l’empêchent et testent l’union entière. La différence est importante pour les transformations de types complexes.

## Barème / 10

Prédiction précise (2), preuve reproductible (2), cas négatif observé (2), diagnostic et correctif (2), transfert contextualisé (2). **Un cas inventé ou sans trace obtient zéro sur le critère de preuve.**

**Limite :** les sorties qui dépendent d’une exécution n’ont pas été calculées ici : exécute l’exercice dans l’environnement prévu par la leçon, compare le résultat à ces critères et conserve ta preuve. Ne présente jamais un résultat attendu comme une exécution réellement observée. Ce corrigé guide le raisonnement ; il ne prétend pas fournir une implémentation complète.
