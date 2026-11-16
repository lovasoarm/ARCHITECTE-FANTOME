---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [fausse_piste, temps_limite]
anti_recipe_key: fausse_piste+temps_limite
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : ARIA : parler la langue des lecteurs d'écran

> **SCÈNE CRAZYDEVS : armure Garo :** une protection qui existe mais n'est jamais vérifiée est juste un costume brillant. Ici, chaque garde-fou doit être testable et attaquable.

## TYPE

Micro-drill

## Niveau

[OK] Intermédiaire

## CONTEXTE

ARIA complète le HTML sémantique, il ne le remplace pas. Une carte cliquable doit être un lien ou un bouton, pas une `div` avec `role`.

## APPLICATION

- Vérifie que chaque carte projet est un vrai lien vers sa fiche.
- Donne à chaque rangée un intitulé accessible (`aria-label` ou titre lié).
- Vérifie que ta modale expose un rôle de dialogue et un titre associé : pour une modale personnalisée, utilise les attributs ARIA adaptés (`role="dialog"`, `aria-modal="true"`) ; pour un élément natif `<dialog>` ouvert avec `showModal()`, conserve ses sémantiques natives sans ajouter des rôles redondants.

## Critère de réussite

- [ ] Vérifie que chaque carte projet est un vrai lien vers sa fiche.
- [ ] Donne à chaque rangée un intitulé accessible (`aria-label` ou titre lié).
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quand un attribut ARIA devient-il inutile parce que le HTML fait déjà le travail ?

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ta structure est annoncée correctement.

Les rangées et la modale du portfolio sont compréhensibles sans les voir. Commit.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.

## Livraison produit : Kintana : sémantique et ARIA sans surcouche inutile

> **Fil rouge :** Kintana conserve le même parcours de demande. Cet incrément porte uniquement sur la manière dont ses contrôles et ses états sont exposés dans l'arbre d'accessibilité ; il ne remplace pas les gates clavier ou lecteur d'écran des pages dédiées.

Le micro-exercice reste la mise en jambe. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), sans exiger une refonte complète.

**Mission liée à « ARIA : parler la langue des lecteurs d'écran » :** sur l'écran de création ou de suivi d'une demande, reprends les cartes de navigation, le formulaire et, si le parcours en utilise une, la confirmation dans une fenêtre modale. Utilise d'abord les éléments HTML natifs adaptés : lien pour naviguer, bouton pour agir, label associé au champ, titres pour structurer. N'ajoute ARIA que lorsque le HTML ne fournit pas déjà l'information nécessaire. Pour une modale personnalisée, expose un rôle de dialogue, son état modal et un titre associé ; avec un élément natif `<dialog>` correctement utilisé, ne duplique pas mécaniquement les rôles natifs.

**Livrable :** un incrément de composants, une courte matrice `élément / sémantique native / ajout ARIA éventuel / raison`, et des vérifications reproductibles de l'arbre d'accessibilité.

**Gate : la preuve porte sur ARIA et la sémantique :**

- chaque action de navigation est un vrai lien et chaque action locale un vrai bouton ; aucun `div` cliquable n'est maquillé en contrôle natif ;
- chaque champ possède un nom accessible relié au champ ; les boutons à icône seule ont un nom explicite ;
- le dialogue personnalisé, s'il existe, possède un nom et expose correctement son caractère modal ; une solution native conserve ses sémantiques natives sans attributs contradictoires ;
- les attributs ARIA redondants ou contradictoires sont retirés ; chaque attribut conservé a une justification dans la matrice ;
- au moins trois éléments (un lien, un champ et un dialogue ou contrôle d'état) sont vérifiés dans l'arbre d'accessibilité ou avec un lecteur d'écran, et le résultat attendu est comparé au résultat observé.

**Contre-épreuve :** retire temporairement un nom accessible ou remplace un lien par un `div` dans une branche de test ; explique quel signal devient absent ou incorrect, puis restaure le code. Cette expérience prouve le mécanisme ciblé, pas la conformité globale de Kintana.

Étiquette les résultats locaux `LAB`. Ne revendique `PRODUCTION` qu'après déploiement et observation réels.
