---
stability: stable
cognitive_level: L4
perturbation_modes: [temps_limite, solution_concurrente]
anti_recipe_key: temps_limite+solution_concurrente
transfer_distance: high
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# LA CARTE : Le parcours mental

ARCHITECTE-FANTOME n’est pas une collection de sujets. Chaque niveau change la question que tu poses.

```text
COMPRENDRE
   ↓
CONSTRUIRE
   ↓
CASSER
   ↓
RÉPARER
   ↓
CONCEVOIR
   ↓
EXPLOITER
   ↓
ARBITRER
   ↓
DIRIGER
```

## Comprendre

Au **00-SOCLE**, tu apprends à lire le code, à suivre l’exécution, à résoudre un problème et à nommer ce que tu ne sais pas encore.

## Construire

Au **01-CADRAGE** puis au début du **02-CONSTRUCTION**, tu transformes un besoin en comportement puis en code testable.

## Casser

Les erreurs, les tests adverses, la mémoire, les données bizarres et les contraintes font volontairement apparaître les limites de ta première solution.

## Réparer

Le debugging, la gestion d’erreur, le refactoring et la vérification t’apprennent à revenir au comportement observable avant de bricoler le patch.

## Concevoir

Le **2bis : Architecture** part des contraintes :

**problème → contraintes → options → décision → conséquences**.

Tu ne collectionnes pas des patterns. Tu choisis une forme parce qu’elle répond à un problème.

## Exploiter

Le **03-PILOTAGE** fait passer le code au système en fonctionnement : sécurité, logs, métriques, traces, SLO, récupération, cloud et coût.

## Arbitrer

Le **04-EPREUVE** ajoute l’incertitude humaine : grosse codebase, changement de spécification, temps limité, incidents et plusieurs solutions plausibles.

## Diriger

Le **05-MAITRISE** ne t’ajoute pas une montagne de jargon. Il te demande de croiser technique, produit, coût, risque, communication et transfert, puis de transmettre une décision qui peut survivre à ton absence.

### Comment utiliser cette carte

Quand tu bloques, demande-toi sur quelle question tu es actuellement :

- **Comprendre ?** reviens à un prérequis.
- **Construire ?** fais le plus petit livrable observable.
- **Casser ?** cherche le contre-exemple.
- **Réparer ?** formule une hypothèse avant de modifier.
- **Concevoir ?** compare au moins deux options.
- **Exploiter ?** mesure avant d’optimiser.
- **Arbitrer ?** écris coût, risque et conséquence.
- **Diriger ?** rends la décision transmissible.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.
