---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [temps_limite, solution_concurrente]
anti_recipe_key: temps_limite+solution_concurrente
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mission Konoha :** trois clones partent en même temps, mais un seul doit avoir le dernier mot. Si tu ne distingues pas file d'attente, concurrence et ordre d'exécution, les clones vont te livrer leurs résultats dans un ordre qui te fera accuser le mauvais ninja.

## TYPE

Micro-drill

## Niveau

[OK] Intermédiaire

## Prérequis

- Connaître `useEffect`

## CONTEXTE

Les pièges classiques : promesse non attendue, rejet non capturé, erreur avalée dans un `useEffect`. Ils passent tous silencieusement en production.

## APPLICATION

- Repère dans ton code un `await` manquant devant un appel asynchrone (ajoute-en un si besoin) et observe le comportement.
- Ajoute un gestionnaire global de rejets non capturés côté client, en journalisant.
- Vérifie qu'une erreur dans un `useEffect` asynchrone est bien attrapée à l'intérieur.

## Critère de réussite

- [ ] Repère dans ton code un `await` manquant devant un appel asynchrone (ajoute-en un si besoin) et observe le comportement.
- [ ] Ajoute un gestionnaire global de rejets non capturés côté client, en journalisant.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi un `try/catch` autour d'un `useEffect` synchrone n'attrape-t-il pas l'erreur asynchrone à l'intérieur ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tes erreurs asynchrones ne sont plus silencieuses.

Tu vois désormais ce qui casse, au lieu de le subir. Commit.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?
