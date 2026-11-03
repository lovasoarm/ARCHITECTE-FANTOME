---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [regression, changement_echelle]
anti_recipe_key: regression+changement_echelle
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : Singleton pattern

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

## TYPE

Micro-drill

## Niveau

[OK] Avancé

## CONTEXTE

Un module ESM est déjà un singleton : l'index slug → projet ne doit être construit qu'une fois, pas à chaque rendu.

## APPLICATION

- Vérifie que ta `Map` d'index est bien créée au niveau module et non dans une fonction appelée à chaque requête.
- Ajoute un log de construction et compte combien de fois il apparaît en navigation.
- Note pourquoi une classe Singleton explicite serait ici inutile.

## Critère de réussite

- [ ] Vérifie que ta `Map` d'index est bien créée au niveau module et non dans une fonction appelée à chaque requête.
- [ ] Ajoute un log de construction et compte combien de fois il apparaît en navigation.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi un module ESM suffit-il là où d'autres langages imposent un pattern Singleton ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton index est construit une seule fois.

Tu as compris un pattern et su ne pas le sur-implémenter : c'est le vrai signe de maîtrise.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.

## Transfert après l'exercice

Déplace le service global vers deux workers avec deux processus : démontre que chaque processus possède sa propre instance. Compare avec un pool de connexion géré au démarrage et injecté par dépendance. La preuve attendue est un test qui isole deux contextes et une note sur ce qui ne peut pas être garanti entre processus.

## Livraison produit obligatoire : Kintana : Frontière à défendre

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 51-singleton_pattern_minimini_projet » :** Dans Kintana, dessine les frontières et flux, compare deux options dans un ADR puis applique une évolution de besoin pour mesurer le coût de changement.

Place le concept dans l’architecture Kintana. Dessine le flux, écris un ADR comparant une solution simple et une alternative plus complexe, puis injecte une évolution de besoin.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Les responsabilités sont explicites ; le changement est localisé ; l’ADR expose au moins un coût réel et la condition qui ferait changer d’avis. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
