---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [temps_limite, decision_inversee]
anti_recipe_key: temps_limite+decision_inversee
transfer_distance: low
assessment_role: diagnostic_mastery
---

# Mise en pratique : Strategy pattern

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## TYPE

Mini-projet

## Niveau

[OK] Avancé

## CONTEXTE

Une stratégie = un algorithme interchangeable. Le tri du catalogue (par année, par note, par titre) est un cas d'école.

## OBJECTIF

Ton catalogue se trie à la demande.

## APPLICATION

- Définis un objet de stratégies de tri, clé → fonction de comparaison.
- Branche un sélecteur d'ordre sur la page « Tous les projets ».
- Ajoute une nouvelle stratégie sans modifier le composant.

## Critère de réussite

- [ ] Définis un objet de stratégies de tri, clé → fonction de comparaison.
- [ ] Branche un sélecteur d'ordre sur la page « Tous les projets ».
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Qu'est-ce que ce pattern t'évite d'écrire à chaque nouveau critère de tri ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton catalogue se trie à la demande.

Une vraie fonctionnalité utilisateur, extensible sans toucher l'UI. Commit.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

## Transfert après l'exercice

Ajoute une quatrième politique de calcul des frais, sélectionnée depuis une configuration validée. Fais tourner les mêmes tests de contrat sur les quatre stratégies. Si l'ajout impose de modifier chaque consommateur, la frontière de stratégie n'est pas au bon endroit ; si le choix n'évolue jamais, compare au coût d'une simple fonction.

## Livraison produit obligatoire : Kintana : Frontière à défendre

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 51-strategy_pattern_minimini_projet » :** Dans Kintana, dessine les frontières et flux, compare deux options dans un ADR puis applique une évolution de besoin pour mesurer le coût de changement.

Place le concept dans l’architecture Kintana. Dessine le flux, écris un ADR comparant une solution simple et une alternative plus complexe, puis injecte une évolution de besoin.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Les responsabilités sont explicites ; le changement est localisé ; l’ADR expose au moins un coût réel et la condition qui ferait changer d’avis. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
