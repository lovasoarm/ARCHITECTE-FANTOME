---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [temps_limite, solution_concurrente]
anti_recipe_key: temps_limite+solution_concurrente
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : Iterators et symbol.iterator : créer des structures qui se parcourent

> **SCÈNE CRAZYDEVS : clan des ninjas :** une abstraction peut être une technique secrète… ou une montagne de parchemins pour un problème de trois lignes. Ton défi est de savoir laquelle des deux tu construis.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Itérateurs et générateurs permettent de parcourir une collection à la demande : par exemple paginer un catalogue qui grandirait.

## OBJECTIF

Tu sais ce qu'apporte un itérateur : et quand t'en passer.

## APPLICATION

- Écris un générateur qui produit les projets par lots de trois.
- Utilise-le pour un bouton « voir plus » sur la page « Tous les projets ».
- Constate ce que ça change par rapport à un `slice` avec compteur.

## Critère de réussite

- [ ] Écris un générateur qui produit les projets par lots de trois.
- [ ] Utilise-le pour un bouton « voir plus » sur la page « Tous les projets ».
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Sur six projets, le générateur est-il justifié ? Réponds honnêtement.

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tu sais ce qu'apporte un itérateur : et quand t'en passer.

Tu as testé l'outil et tu peux justifier de ne pas le garder : c'est une décision, pas de l'ignorance.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.

## Livraison produit obligatoire : Kintana : Règle métier et état

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 55-iterators_symbol_minimini_projet » :** Expose l’historique d’une demande Kintana via un itérateur qui produit les événements un par un. Vérifie l’ordre, la fin de séquence et le comportement lorsque l’historique est vide.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
