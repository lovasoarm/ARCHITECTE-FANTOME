---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [solution_concurrente, decision_organisationnelle]
anti_recipe_key: solution_concurrente+decision_organisationnelle
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : Clean code basics

> **SCÈNE CRAZYDEVS : Garo :** la règle est simple jusqu'au jour où un état caché traverse une frontière. À partir de là, le “petit raccourci” devient le Horror qui te poursuit pendant trois heures.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Nommer, raccourcir, supprimer. Un composant de 200 lignes fait fuir un relecteur : et ton portfolio sera lu par des recruteurs techniques.

## OBJECTIF

Ton plus gros fichier est lisible.

## APPLICATION

- Prends ton fichier le plus long et découpe-le en composants nommés d'après ce qu'ils affichent.
- Supprime tout code mort et tout commentaire qui répète le code.
- Vise moins de 80 lignes par fichier de composant.

## Critère de réussite

- [ ] Prends ton fichier le plus long et découpe-le en composants nommés d'après ce qu'ils affichent.
- [ ] Supprime tout code mort et tout commentaire qui répète le code.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quel nom as-tu changé, et qu'est-ce qu'il cachait ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton plus gros fichier est lisible.

Le code que tu montreras en entretien tient à l'écran. Commit.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.

## Livraison produit obligatoire : Kintana : Incident de demande dupliquée

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 50-clean_code_basics_minimini_projet » :** Reproduis un incident où un demandeur envoie deux fois la même commande après une réponse lente. Écris les hypothèses, ajoute le signal nécessaire, isole la cause et corrige sans supprimer la preuve du défaut.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Le défaut est démontré avant correction ; un test de non-régression échoue avant et passe après ; le postmortem distingue cause et symptôme. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
