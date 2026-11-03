---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [fausse_piste, defaut_cache]
anti_recipe_key: fausse_piste+defaut_cache
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : WEB HELPERS : DOM & EVENTS

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

## TYPE

Mini-projet

## Niveau

**Extension d'intégration avancée : hooks React et API navigateur (différée, hors première passe Fundamentals).** Ce livrable n'est pas la pratique de base des API navigateur et ne constitue pas une gate Fundamentals.

## Prérequis

- Avoir terminé les leçons canoniques Web Basics.
- Connaître les composants et hooks React ainsi que les Client Components.
- Connaître `matchMedia`, les événements et la gestion d'une Promise.
- Savoir que l'API Clipboard dépend du contexte sécurisé et d'une interaction utilisateur autorisée par le navigateur.

## CONTEXTE

Les API natives du navigateur (IntersectionObserver, matchMedia, clipboard) remplacent des dépendances entières. Un portfolio léger doit s'appuyer dessus.

## OBJECTIF

Ton site respecte les préférences système.

## APPLICATION

- Écris un hook `usePrefersReducedMotion` basé sur `matchMedia`.
- Utilise-le pour désactiver l'animation d'entrée des cartes.
- Ajoute un bouton « copier mon email » utilisant l'API Clipboard ; affiche un succès uniquement si la copie réussit et prévois un message si le navigateur refuse l'opération.
- Le succès affiché correspond à une copie réellement confirmée : ne change pas l'interface avant la résolution réussie de l'opération ; affiche un état d'échec si la Promise est rejetée ou si l'API est indisponible.

## Critère de réussite

- [ ] Écris un hook `usePrefersReducedMotion` basé sur `matchMedia`.
- [ ] Utilise-le pour désactiver l'animation d'entrée des cartes.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quel bénéfice concret un visiteur tire-t-il de `prefers-reduced-motion` respecté ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton site respecte les préférences système.

Deux fonctionnalités réelles, zéro dépendance ajoutée. Commit ces hooks.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.

## Approfondissement différé : livraison produit Kintana : règle métier et état

> **Statut : différé, facultatif pour la première passe.** Termine d’abord la pratique de base de cette page. Reviens à cette intégration après avoir étudié les notions préalables et lorsque le dépôt Kintana et son environnement sont réellement disponibles. Cette tâche ne constitue pas une gate de progression Fundamentals. Si l’environnement manque, reporte-la ; une simulation ne vaut pas une livraison intégrée.

> **Contexte de pratique :** relie le principe de cette leçon à une règle métier de Kintana, sans supposer que le projet est déjà installé.

Le micro-exercice de cette page constitue la pratique de première passe. La livraison Kintana ci-dessous est un approfondissement produit différé : elle réutilise le principe dans un contexte plus large, mais ne conditionne pas la validation de cette notion ni la progression dans Fundamentals. Elle améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 54-web_helpers_minimini_projet » :** Dans Kintana, réalise un parcours utilisable sur petit écran et réseau instable ; conserve le brouillon, annonce les états et évite les doubles envois.

Dans l’interface Kintana, encapsule l’écoute d’événements et le rendu d’une liste de demandes. Utilise une délégation adaptée et fournis un nettoyage explicite lorsque le composant est démonté.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate de cette livraison différée (pas gate de progression Fundamentals) :** un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
