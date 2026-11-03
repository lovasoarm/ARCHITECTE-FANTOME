---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [preuve_partielle, fausse_piste]
anti_recipe_key: preuve_partielle+fausse_piste
transfer_distance: medium
assessment_role: instructional_checkpoint
---

# Mise en pratique : Factory pattern

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

## TYPE

Mini-projet

## Niveau

[OK] Avancé

## CONTEXTE

Une factory centralise la création d'objets conformes. Pour le portfolio : construire un `Project` complet à partir de données partielles, avec ses valeurs par défaut.

## OBJECTIF

Déclarer un projet devient trivial.

## APPLICATION

- Écris `createProject(partiel)` qui remplit les champs par défaut (`status: "concept"`, `featured: false`, `rating: 3`, `stack: []`) et calcule le `slug` à partir du `title`.
- Fais passer tes six projets par cette fabrique.
- Vérifie qu'un projet déclaré avec trois champs seulement reste affichable.

## Critère de réussite

- [ ] Fais passer tes six projets par cette fabrique.
- [ ] Vérifie qu'un projet déclaré avec trois champs seulement reste affichable.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Qu'est-ce qui serait cassé si chaque projet définissait ses valeurs par défaut lui-même ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : déclarer un projet devient trivial.

Le catalogue accepte des entrées minimalistes sans rien casser à l'affichage. Commit.

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.

## Transfert après l'exercice

Reprends la factory dans un service de génération de rapports : une implémentation mémoire pour les tests et une implémentation fichier pour l'usage local. Décris comment ajouter une implémentation sans modifier le consommateur. Vérifie que la factory rejette un driver inconnu et ne construit pas un adaptateur avec des credentials non validés. Dans le fil rouge Rasengan, le même principe ne doit pas créer une factory si une unique construction suffit.

## Livraison produit obligatoire : Kintana : Frontière à défendre

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 50-factory_pattern_minimini_projet » :** Dans Kintana, dessine les frontières et flux, compare deux options dans un ADR puis applique une évolution de besoin pour mesurer le coût de changement.

Place le concept dans l’architecture Kintana. Dessine le flux, écris un ADR comparant une solution simple et une alternative plus complexe, puis injecte une évolution de besoin.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Les responsabilités sont explicites ; le changement est localisé ; l’ADR expose au moins un coût réel et la condition qui ferait changer d’avis. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
