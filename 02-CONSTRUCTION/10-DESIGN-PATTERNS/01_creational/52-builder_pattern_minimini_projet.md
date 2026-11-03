---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [constraints_injectees, changement_echelle]
anti_recipe_key: constraints_injectees+changement_echelle
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : Builder pattern

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

## TYPE

Mini-projet

## Niveau

[OK] Avancé

## CONTEXTE

Le builder assemble pas à pas un objet complexe. Pour le portfolio : construire une requête de rangée (filtre + tri + limite) lisiblement.

## OBJECTIF

Tu as comparé deux styles sur ton propre code.

## APPLICATION

- Écris un petit builder `rowQuery().withRow("continuer").sortBy("year").limit(4).build()`.
- Utilise-le pour deux rangées de l'accueil.
- Compare la lisibilité avec ta version composée du module `02-CONSTRUCTION/09-FUNCTIONAL-JS` et tranche.

## Critère de réussite

- [ ] Écris un petit builder `rowQuery().withRow("continuer").sortBy("year").limit(4).build()`.
- [ ] Utilise-le pour deux rangées de l'accueil.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Entre composition de fonctions et builder, lequel gardes-tu pour ce projet, et pourquoi ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tu as comparé deux styles sur ton propre code.

Tu peux justifier ton style d'API interne avec un exemple concret sous les yeux.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.

## Transfert après l'exercice

Réutilise le builder pour une requête de reporting multi-tenant. La méthode `build()` doit refuser une période inversée, un tenant absent et une option incompatible. Transfère ensuite le problème vers un constructeur typé : justifie si un builder reste utile ou si un objet de configuration validé suffit.

## Livraison produit obligatoire : Kintana : Frontière à défendre

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 52-builder_pattern_minimini_projet » :** Dans Kintana, dessine les frontières et flux, compare deux options dans un ADR puis applique une évolution de besoin pour mesurer le coût de changement.

Place le concept dans l’architecture Kintana. Dessine le flux, écris un ADR comparant une solution simple et une alternative plus complexe, puis injecte une évolution de besoin.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Les responsabilités sont explicites ; le changement est localisé ; l’ADR expose au moins un coût réel et la condition qui ferait changer d’avis. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
