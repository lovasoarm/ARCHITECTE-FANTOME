---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [preuve_partielle, changement_contexte]
anti_recipe_key: preuve_partielle+changement_contexte
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : State et dataflow : qui possède l'état, qui le lit, qui le modifie

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

## TYPE

Micro-drill

## Niveau

[OK] Intermédiaire

## Prérequis

- Connaître `useState`

## CONTEXTE

Où vit l'état : URL, serveur, composant, stockage. Mal placé, il crée des bugs de partage de lien et de retour arrière.

## APPLICATION

- Pour ton filtre et ton tri, décide de porter l'état dans les paramètres d'URL plutôt que dans un `useState`.
- Implémente-le et vérifie qu'un lien filtré se partage et survit au rechargement.
- Vérifie que le bouton retour du navigateur fonctionne.

## Critère de réussite

- [ ] Pour ton filtre et ton tri, décide de porter l'état dans les paramètres d'URL plutôt que dans un `useState`.
- [ ] Implémente-le et vérifie qu'un lien filtré se partage et survit au rechargement.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quels états de ton site méritent l'URL, et lesquels doivent rester locaux ?

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tes filtres sont partageables par URL.

Un visiteur peut envoyer « regarde mes projets backend » en un lien. Commit.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.

## Livraison produit obligatoire : Kintana : Parcours client sous réseau instable

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 52-state_and_dataflow_minimini_projet » :** Implémente un morceau du parcours mobile/web de création ou suivi de demande. Ajoute états loading/empty/error, accessibilité clavier et conservation du brouillon quand la connexion disparaît.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Une coupure ne détruit pas la saisie ; une reprise ne crée pas de doublon ; l’état reste compréhensible sur petit écran. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
