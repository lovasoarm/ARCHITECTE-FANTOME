---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [temps_limite, changement_contexte]
anti_recipe_key: temps_limite+changement_contexte
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Closures : expliqué à 3 publics

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

Temps de lecture ~2 min

-> ~10 min

## À UN ENFANT

Imagine une boîte à jouets fermée à clé. Tu donnes la clé à ton frère. Lui n'a jamais vu tes jouets, mais quand il ouvre, il peut jouer avec **exactement les mêmes** que quand tu as fermé la boîte. La fonction qui "ferme la boîte", c'est une closure : elle emporte avec elle les variables telles qu'elles étaient au moment de sa création.

## À UN PAIR DEV

Une closure = une fonction + son environnement lexical capturé. Techniquement, le moteur JS garde vivant le scope parent tant que la fonction interne est référencée. Conséquences concrètes :

- **Data hiding** : émuler du privé sans `#field` (avant ES2022).
- **Module pattern** : IIFE qui expose une API publique, cache l'état interne.
- **Piège mémoire n°1** : une closure sur une grosse variable dans un event handler garde cette variable vivante indéfiniment.
- **Piège n°2** : `for (var i=0;…)` + `setTimeout(()=>console.log(i))` → toutes les closures partagent le même `i`. `let` isole par itération.

## À UN CTO

Les closures sont la base de la modularité JS avant les modules ES6, et restent la source n°1 de fuites mémoire subtiles (heap qui grimpe sans OOM immédiat, dégradation lente sur 48h). Coût : un dev qui ne maîtrise pas les closures produit du code qui **tourne en dev** et **fuit en prod**. Signal d'embauche : "explique-moi une fuite mémoire causée par une closure que tu as debug" → si la réponse est floue, red flag junior.

<!-- AF-DIAGRAM:default -->

## Repère visuel utile : Incrément vérifiable du produit Kintana

```text
acteur / besoin
      |
      v
notion de la leçon
      |
      v
comportement Kintana
      |
  +---+---+
  v       v
test     cas limite
  |       |
  +---+---+
      v
preuve + limite
```

<!-- AF-LESSON-PROFILE: scope -->

## Repères de décision

- **Pourquoi :** La portée et les closures contrôlent quelles données une fonction peut lire et combien de temps elles restent accessibles. Cela évite les états cachés et les callbacks qui perdent leur contexte.
- **Quand l’utiliser / quand l’éviter :** Utilise une fermeture pour encapsuler un état privé ou garder un contexte stable dans un callback. Préfère un paramètre explicite quand la dépendance doit être visible ou remplacée en test.
- **Limites :** Une closure peut prolonger la durée de vie d'objets et créer une fuite mémoire. `this` dépend du mode d'appel pour les fonctions classiques ; une flèche capture le `this` lexical et ne peut pas être rebondie avec `call`/`bind`.

## Mécanisme : la version sans magie

Une fonction lit les bindings de son environnement lexical. Pour `this`, regarde le call-site ; pour une closure, regarde l'endroit où la fonction est créée et les valeurs qu'elle retient.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Closures : expliqué à 3 publics** se rattache à ce cas concret : Un handler Kintana doit garder l'identité de la demande et le rôle attendu sans lire un global modifiable ni perdre le contexte quand il est passé à une file de callbacks.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Contexte sûr des handlers Kintana

> **Statut Kintana : prolongement intégré différé, facultatif et sans gate supplémentaire.** Les blocs Kintana de Scope réutilisent le même handler de notification : il s'agit d'un seul artefact à faire évoluer, pas d'un exercice complet à recommencer dans chaque leçon. Termine d'abord la pratique locale de la leçon et les étapes canoniques Scope puis Function factories. Reprends le test de passage de callback après le module [Testing](../../02-CONSTRUCTION/03-TESTING/README.md) ; le déplacement vers un worker n'est qu'une variante ultérieure, après le module Runtime concerné. Aucun worker, module supplémentaire ou test automatisé n'est requis pour valider la première passe Scope.

> **Arc Naruto / Konoha :** chaque équipe connaît son périmètre. Une variable globale qui circule partout, c'est le rouleau secret posé au milieu de la place.

**Mission liée à « Closures : expliqué à 3 publics » :** Construis un handler de notification qui conserve `requestId` et le rôle autorisé. Compare une closure, un paramètre explicite et `bind` selon le besoin. Ajoute un test qui passe le handler à un dispatcher sans changer le résultat ni exposer d'état global.

**Livrable :** un handler isolé, un test de passage de callback, un test de contexte `this` si la leçon le traite et une courte décision sur la portée choisie.

**Critères d’acceptation :** le handler garde le bon identifiant ; le comportement ne dépend pas d'un appel accidentel à travers un objet ; l'état privé n'est pas accessible de l'extérieur ; la durée de vie des références est expliquée.

## Transfert facultatif

À la reprise, lorsque tu étudieras les modules puis le runtime des workers, compare le contexte disponible dans un module et dans un worker. Pour la première passe, explique simplement avec tes mots pourquoi un worker ne partage pas automatiquement le même contexte JavaScript.
