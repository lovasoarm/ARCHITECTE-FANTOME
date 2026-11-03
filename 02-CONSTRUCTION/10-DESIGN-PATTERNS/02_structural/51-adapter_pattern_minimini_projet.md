---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [temps_limite, preuve_partielle]
anti_recipe_key: temps_limite+preuve_partielle
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : ADAPTER : BRANCHER DEUX INTERFACES INCOMPATIBLES

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

## TYPE

Mini-projet

## Niveau

[OK] Avancé

## CONTEXTE

Un adaptateur traduit une forme de données externe vers ta forme interne. La réponse GitHub n'a pas la forme de ton type `Project`.

## OBJECTIF

L'API externe est isolée derrière un adaptateur.

## APPLICATION

- Écris `adaptGithubRepo(reponseBrute)` qui produit exactement les champs dont ton composant a besoin.
- Fais en sorte qu'aucun composant ne manipule la réponse brute.
- Ajoute un test avec un échantillon réel de la réponse.

## Critère de réussite

- [ ] Écris `adaptGithubRepo(reponseBrute)` qui produit exactement les champs dont ton composant a besoin.
- [ ] Fais en sorte qu'aucun composant ne manipule la réponse brute.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Que se passe-t-il dans ton code le jour où GitHub renomme un champ ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : l'API externe est isolée derrière un adaptateur.

Un seul fichier à changer si l'API bouge. Commit.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.

## Transfert après l'exercice

Remplace une API de notification fournisseur par un adaptateur qui expose le même contrat interne. Ajoute une fixture de réponse ancienne et une fixture nouvelle. Les tests du domaine ne doivent pas connaître le format fournisseur ; un état timeout doit rester « résultat inconnu » jusqu'à réconciliation, pas devenir arbitrairement « échec ».

## Livraison produit obligatoire : Kintana : Frontière à défendre

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 51-adapter_pattern_minimini_projet » :** Dans Kintana, dessine les frontières et flux, compare deux options dans un ADR puis applique une évolution de besoin pour mesurer le coût de changement.

Place le concept dans l’architecture Kintana. Dessine le flux, écris un ADR comparant une solution simple et une alternative plus complexe, puis injecte une évolution de besoin.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Les responsabilités sont explicites ; le changement est localisé ; l’ADR expose au moins un coût réel et la condition qui ferait changer d’avis. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
