---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [transmission, preuve_partielle]
anti_recipe_key: transmission+preuve_partielle
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : Devtools debugger : lire le code en train de s'exécuter

> **SCÈNE CRAZYDEVS : mur de siège :** le bug n'est pas “où ça a explosé ?”, mais “où la première fissure est-elle apparue ?”. Ici, chaque log, test et reproduction est une empreinte dans le mur.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Les breakpoints battent les `console.log` : on inspecte l'état réel, on avance pas à pas. Les React DevTools montrent en plus props et state.

## OBJECTIF

Tu inspectes ton état en direct.

## APPLICATION

- Pose un breakpoint dans ton filtre de rangée via les DevTools.
- Inspecte le tableau reçu et la valeur du filtre au moment de l'appel.
- Avec React DevTools, vérifie les props réellement reçues par une `ProjectCard`.

## Critère de réussite

- [ ] Pose un breakpoint dans ton filtre de rangée via les DevTools.
- [ ] Inspecte le tableau reçu et la valeur du filtre au moment de l'appel.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Qu'as-tu vu au breakpoint que trois `console.log` ne t'auraient pas montré ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tu inspectes ton état en direct.

Ton outillage de debug est en place pour tout le reste du projet.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

## Livraison produit obligatoire : Kintana : Incident de demande dupliquée

> **Fil narratif : Équipe 7 / Naruto :** Kakashi ne lance pas l’équipe dans le brouillard sans objectif ni plan de sortie. Ici, la mission commence par une hypothèse vérifiable, pas par un clavier en surchauffe.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 52-devtools_debugger_minimini_projet » :** Reproduis un incident où un demandeur envoie deux fois la même commande après une réponse lente. Écris les hypothèses, ajoute le signal nécessaire, isole la cause et corrige sans supprimer la preuve du défaut.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Le défaut est démontré avant correction ; un test de non-régression échoue avant et passe après ; le postmortem distingue cause et symptôme. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
