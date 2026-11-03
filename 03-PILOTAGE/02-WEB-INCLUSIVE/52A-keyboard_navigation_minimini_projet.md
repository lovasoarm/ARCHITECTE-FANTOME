---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [changement_contexte, transmission]
anti_recipe_key: changement_contexte+transmission
transfer_distance: low
assessment_role: diagnostic_mastery
---

# Mise en pratique : Navigation clavier : quand la souris n'est pas une option

> **SCÈNE CRAZYDEVS : armure Garo :** une protection qui existe mais n'est jamais vérifiée est juste un costume brillant. Ici, chaque garde-fou doit être testable et attaquable.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Focus visible, ordre logique, piège de focus dans la modale : c'est ce qui rend un carrousel utilisable sans souris.

## OBJECTIF

Ta modale se pilote entièrement au clavier.

## APPLICATION

- Rends le focus visible sur toutes les cartes avec un style Tailwind explicite.
- À l'ouverture de la modale, place le focus sur le premier élément interactif pertinent.
- Tant que la modale est ouverte, maintiens le focus dans celle-ci (Tab et Shift+Tab circulent en boucle).
- À la fermeture, restaure le focus sur l'élément déclencheur (la carte d'origine).
- Assure la fermeture par Échap.

## Critère de réussite

- [ ] Rends le focus visible sur toutes les cartes avec un style Tailwind explicite.
- [ ] À l'ouverture de la modale, place le focus sur le premier élément interactif pertinent.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi rendre le focus à l'élément déclencheur à la fermeture change-t-il tout pour l'utilisateur ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ta modale se pilote entièrement au clavier.

Le parcours complet du site fonctionne sans souris. Montre-le à quelqu'un en 2 minutes.

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.

## Livraison produit : Kintana : terminer le parcours sans souris

> **Fil rouge :** Kintana conserve le même parcours de demande. Cette mission porte exclusivement sur le déplacement du focus et l'activation des contrôles au clavier ; elle ne prétend pas valider le rendu d'un lecteur d'écran.

Le micro-exercice reste la mise en jambe. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), sans exiger une refonte complète.

**Mission liée à « Navigation clavier : quand la souris n'est pas une option » :** réalise le parcours complet de consultation, création et confirmation d'une demande sans utiliser la souris. Corrige l'ordre de tabulation, les indicateurs de focus et la gestion du focus dans la modale de confirmation si elle existe. Ajoute un lien d'évitement vers le contenu principal lorsque la page possède une navigation répétitive.

**Livrable :** matrice de parcours avec l'ordre attendu et observé, vidéo courte ou journal de touches, patch des composants et liste des cas retestés.

**Gate : la preuve porte sur le clavier et le focus :**

- tous les liens, boutons et champs nécessaires au parcours sont atteignables et activables au clavier ; aucun contrôle n'exige un geste de souris ;
- l'ordre du focus suit l'ordre de lecture et reste visible à chaque étape ; aucun `tabindex` positif n'est utilisé pour réparer l'ordre ;
- le lien d'évitement, s'il est pertinent, apparaît au focus et mène au contenu principal ;
- à l'ouverture d'une modale, le focus entre dans celle-ci ; `Tab` et `Shift+Tab` ne s'échappent pas de la modale tant qu'elle est ouverte ; `Échap` ferme la modale ; le focus revient au déclencheur ;
- les vérifications sont répétées sur les états normal, erreur et confirmation, et chaque échec résiduel est noté.

**Contre-épreuve :** injecte dans une branche de test un élément focusable masqué ou un ordre de tabulation incohérent ; reproduis la perte de repère, puis montre que le parcours corrigé évite ce défaut. Cette gate ne valide ni les noms accessibles ni les annonces vocales, traités dans les pages ARIA et lecteurs d'écran.

Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu'après déploiement et observation réels.
