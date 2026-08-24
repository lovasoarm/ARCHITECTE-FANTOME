---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [changement_contexte, preuve_partielle]
anti_recipe_key: changement_contexte+preuve_partielle
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# EXO FRONTIÈRE : quel module aurait dû accueillir ce geste ?

Temps de lecture ~2 min

Temps ~30 min

Pour chaque cas ci-dessous, indique **le module (12/13/16)** qui aurait dû l'accueillir,
en justifiant en 2 lignes. Corrige-toi avec `05-MAITRISE/06-ANNEXES/17-frontieres_modules.md`.

1. Un dev extrait 3 branches d'un `switch(role)` en 3 fonctions `handleAdmin`,
   `handleGuest`, `handleGuard`, sans changer le comportement.
2. Une équipe décide que le monolithe sera coupé en 3 services + un bus.
3. Un dev nomme "Observer" un système d'événements qu'il utilisait déjà sans le nommer.
4. Un dev remplace 200 lignes de callbacks imbriqués par `async/await`.
5. Un dev décide que la couche métier ne connaîtra plus la base de données
   (repository derrière une interface).

Réponses attendues : 1=13, 2=16, 3=12, 4=13, 5=16.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.
