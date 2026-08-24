---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [constraints_injectees, regression]
anti_recipe_key: constraints_injectees+regression
transfer_distance: low
assessment_role: instructional_checkpoint
---

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

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.
