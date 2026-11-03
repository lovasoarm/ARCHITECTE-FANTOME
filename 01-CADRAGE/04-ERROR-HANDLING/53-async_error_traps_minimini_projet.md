---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [temps_limite, solution_concurrente]
anti_recipe_key: temps_limite+solution_concurrente
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : Async error traps : les erreurs qui tombent en silence

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

## Livraison produit obligatoire : Kintana : Incident de demande dupliquée

> **Fil narratif : Équipe 7 / Naruto :** Kakashi ne lance pas l’équipe dans le brouillard sans objectif ni plan de sortie. Ici, la mission commence par une hypothèse vérifiable, pas par un clavier en surchauffe.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 53-async_error_traps_minimini_projet » :** Dans Kintana, traite une notification ou un événement soumis à délai, doublon et panne. Définis la politique de reprise et prouve qu’un rejeu ne double pas l’effet.

Reproduis un incident où un demandeur envoie deux fois la même commande après une réponse lente. Écris les hypothèses, ajoute le signal nécessaire, isole la cause et corrige sans supprimer la preuve du défaut.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Le défaut est démontré avant correction ; un test de non-régression échoue avant et passe après ; le postmortem distingue cause et symptôme. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
