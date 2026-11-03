---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [constraints_injectees, regression]
anti_recipe_key: constraints_injectees+regression
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : Regex : l'arme que personne n'enseigne correctement

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

## TYPE

Micro-drill

## Niveau

[OK] Fondamental

## CONTEXTE

Une regex simple suffit pour générer et valider les slugs d'URL de tes projets (`/projects/safe-driving`). Un slug faux = une 404.

## APPLICATION

- Écris `slugify(title)` dans `lib/format.js` : minuscules, accents retirés, tout caractère non alphanumérique remplacé par un tiret, tirets en trop supprimés.
- Teste-la sur les six titres réels du catalogue.
- Vérifie que `Safe-driving` et `ce parcours` produisent bien ce que tu attends.

## Critère de réussite

- [ ] Teste-la sur les six titres réels du catalogue.
- [ ] Vérifie que `Safe-driving` et `ce parcours` produisent bien ce que tu attends.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quelle partie de ta regex empêche les doubles tirets, et pourquoi le drapeau `g` est-il nécessaire ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tes URLs de projets sont générées.

Les routes dynamiques du portfolio ont maintenant une source fiable. Commit `format.js`.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.

## Approfondissement différé : livraison produit Kintana : règle métier et état

> **Statut : différé, facultatif pour la première passe.** Termine d’abord la pratique de base de cette page. Reviens à cette intégration après avoir étudié les notions préalables et lorsque le dépôt Kintana et son environnement sont réellement disponibles. Cette tâche ne constitue pas une gate de progression Fundamentals. Si l’environnement manque, reporte-la ; une simulation ne vaut pas une livraison intégrée.

> **Contexte de pratique :** relie le principe de cette leçon à une règle métier de Kintana, sans supposer que le projet est déjà installé.

Le micro-exercice de cette page constitue la pratique de première passe. La livraison Kintana ci-dessous est un approfondissement produit différé : elle réutilise le principe dans un contexte plus large, mais ne conditionne pas la validation de cette notion ni la progression dans Fundamentals. Elle améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 50-regex_basics_minimini_projet » :** Définis une expression régulière bornée pour reconnaître un identifiant Kintana documenté. Teste une valeur valide, une valeur avec préfixe/suffixe parasite et une chaîne vide ; explique ce que le motif ne valide pas.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate de cette livraison différée (pas gate de progression Fundamentals) :** un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
