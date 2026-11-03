---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [temps_limite, changement_contexte]
anti_recipe_key: temps_limite+changement_contexte
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : Debug methodology : quatre étapes, zéro hasard

> **SCÈNE CRAZYDEVS : traqueur de jutsu :** Naruto voit l'explosion finale et accuse le dernier fichier touché. Mauvais réflexe. Ton enquête doit remonter le flux, figer les hypothèses et retrouver la première trace qui ne colle plus.

## TYPE

Micro-drill

## Niveau

[OK] Intermédiaire

## CONTEXTE

Débugger au hasard coûte des heures. Une méthode écrite (observer, isoler, hypothèse, test) rend le temps de résolution prévisible.

## APPLICATION

- Prends un bug en cours de ton portfolio (ou provoque-en un dans la rangée « Continuer à regarder »).
- Remplis un court journal : symptôme observé, ce que tu as isolé, hypothèse, test, résultat.
- Interdis-toi toute modification de code avant l'hypothèse écrite.

## Critère de réussite

- [ ] Prends un bug en cours de ton portfolio (ou provoque-en un dans la rangée « Continuer à regarder »).
- [ ] Remplis un court journal.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quelle étape t'a évité une modification inutile ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton premier journal de debug est écrit.

Tu as une méthode reproductible, pas de la chance. Garde ce journal dans `docs/`.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

## Livraison produit obligatoire : Kintana : Incident de demande dupliquée

> **Fil narratif : Équipe 7 / Naruto :** Kakashi ne lance pas l’équipe dans le brouillard sans objectif ni plan de sortie. Ici, la mission commence par une hypothèse vérifiable, pas par un clavier en surchauffe.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 51-debug_methodology_minimini_projet » :** Dans Kintana, écris un scénario d’incident reproductible, capture la preuve avant correction et ajoute le test qui aurait empêché le retour du défaut.

Reproduis un incident où un demandeur envoie deux fois la même commande après une réponse lente. Écris les hypothèses, ajoute le signal nécessaire, isole la cause et corrige sans supprimer la preuve du défaut.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Le défaut est démontré avant correction ; un test de non-régression échoue avant et passe après ; le postmortem distingue cause et symptôme. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
