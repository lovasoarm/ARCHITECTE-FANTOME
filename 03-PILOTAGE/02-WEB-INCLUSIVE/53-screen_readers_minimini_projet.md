---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [preuve_partielle, fausse_piste]
anti_recipe_key: preuve_partielle+fausse_piste
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : Lecteurs d'écran : comment ils lisent vraiment ton code

> **SCÈNE CRAZYDEVS : Attack on Titan :** ta frontière de confiance est un mur. Le problème n'est pas seulement de savoir s'il tient ; il faut savoir **qui peut passer, par où, avec quelle preuve et que se passe-t-il quand le mur est percé**.

## TYPE

Micro-drill

## Niveau

[OK] Avancé

## CONTEXTE

Un lecteur d'écran lit ce que tu as structuré. Images décoratives, textes alternatifs, ordre des titres : tout compte sur une page très visuelle.

## APPLICATION

- Parcours ta fiche projet avec un lecteur d'écran (VoiceOver, NVDA ou l'inspecteur d'accessibilité).
- Donne un texte alternatif utile aux affiches de projets et un `alt=""` aux images purement décoratives.
- Vérifie que la hiérarchie des titres est cohérente, avec un seul `h1`.

## Critère de réussite

- [ ] Parcours ta fiche projet avec un lecteur d'écran (VoiceOver, NVDA ou l'inspecteur d'accessibilité).
- [ ] Donne un texte alternatif utile aux affiches de projets et un `alt=""` aux images purement décoratives.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Qu'est-ce qui distingue un bon texte alternatif d'une simple répétition du titre ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ta fiche projet s'écoute correctement.

Le contenu de tes projets est accessible sans l'image. Commit.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

## Livraison produit : Kintana : vérifier ce que le lecteur d'écran annonce

> **Fil rouge :** Kintana conserve le même parcours de demande. Cette mission vérifie l'arbre d'accessibilité et les annonces vocales réellement reçues ; elle ne se réduit pas à ajouter des attributs ARIA au hasard.

Le micro-exercice reste la mise en jambe. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), sans exiger une refonte complète.

**Mission liée à « Lecteurs d'écran : comment ils lisent vraiment ton code » :** utilise au moins un lecteur d'écran réel (NVDA sur Windows, VoiceOver sur Apple ou TalkBack sur Android) pour parcourir le formulaire de demande. Vérifie la navigation par titres, les noms des champs et des boutons à icône, les erreurs de validation et le message annonçant qu'une demande a été envoyée ou qu'un état a changé.

**Livrable :** matrice `action / annonce attendue / annonce observée / écart / correction`, contexte de test (lecteur d'écran, système, navigateur et date), patch ciblé et résultat d'un nouveau passage. Ne publie aucune donnée personnelle issue d'un véritable utilisateur.

**Gate : la preuve porte sur les annonces vocales :**

- la page peut être parcourue par titres et régions sans lire tout le contenu ligne par ligne ;
- chaque champ annonce un nom utile et son état ; les erreurs sont associées au champ concerné ;
- chaque bouton à icône seule annonce une action explicite, pas seulement « bouton » ;
- un changement d'état important (envoi, erreur ou statut) est annoncé une fois de façon intelligible, sans répétition excessive ;
- au moins trois annonces ont été consignées avant/après correction, avec le contexte exact du test.

**Limite de preuve :** un seul couple lecteur d'écran/navigateur ne démontre pas le comportement de toutes les technologies d'assistance. Si aucun lecteur d'écran réel n'est disponible, réalise une inspection de l'arbre d'accessibilité et marque ce gate `PARTIEL  : LECTEUR D'ÉCRAN NON TESTÉ` ; ne le déclare pas réussi.

Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu'après déploiement et observation réels.
