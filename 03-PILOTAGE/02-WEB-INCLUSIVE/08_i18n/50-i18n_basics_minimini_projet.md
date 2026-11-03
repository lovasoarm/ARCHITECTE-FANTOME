---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [changement_echelle, changement_contexte]
anti_recipe_key: changement_echelle+changement_contexte
transfer_distance: low
assessment_role: diagnostic_mastery
---

# Mise en pratique : I18n basics : parler toutes les langues sans tout réécrire

> **SCÈNE CRAZYDEVS : Attack on Titan :** ta frontière de confiance est un mur. Le problème n'est pas seulement de savoir s'il tient ; il faut savoir **qui peut passer, par où, avec quelle preuve et que se passe-t-il quand le mur est percé**.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Le portfolio est en français mais des recruteurs internationaux le liront. Externaliser les textes rend une version anglaise possible sans refonte.

## OBJECTIF

Tes textes d'interface sont centralisés.

## APPLICATION

- Sors les chaînes d'interface (titres de rangées, boutons, libellés) dans un fichier de dictionnaire typé.
- Remplace chaque texte en dur des composants par une clé.
- Ajoute `lang="fr"` sur le document.

## Critère de réussite

- [ ] Sors les chaînes d'interface (titres de rangées, boutons, libellés) dans un fichier de dictionnaire typé.
- [ ] Remplace chaque texte en dur des composants par une clé.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quelles chaînes ne doivent PAS être externalisées, et pourquoi ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tes textes d'interface sont centralisés.

Une version anglaise coûte désormais un fichier, pas une refonte. Commit le dictionnaire.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.

## Livraison produit : Kintana : internationaliser le parcours de demande

> **Fil rouge :** Kintana conserve le même parcours de demande. Cet incrément porte sur la séparation des textes, le choix de langue et le comportement explicite en cas de traduction manquante ; les dates, nombres et fuseaux relèvent de la mission dédiée.

Le micro-exercice reste la mise en jambe. La livraison évaluée améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), sans exiger une refonte complète.

**Mission liée à « I18n basics : parler toutes les langues sans tout réécrire » :** externalise dans deux dictionnaires nommés (par exemple `fr` et `en`) les textes du flux demande : titres, libellés, aides, boutons, validation et états de succès/erreur. Organise les clés par domaine (`request.*`, `status.*`) et ajoute un choix de langue qui met à jour les textes et l'attribut `lang` du document. N'assemble pas des fragments de phrase traduits séparément.

**Livrable :** dictionnaires, fonction de résolution des clés avec langue de repli explicitée, contrôle de clés manquantes, capture des deux langues et tableau des chaînes vérifiées.

**Gate : la preuve porte sur l'internationalisation :**

- les textes d'interface du parcours sont centralisés ; aucun texte métier visible ciblé ne reste codé en dur dans les composants ;
- le changement `fr` ↔ `en` met à jour les libellés, les validations et les messages d'état, et l'attribut `lang` reflète réellement la langue affichée ;
- la langue de repli est déterministe ; une clé absente dans toutes les langues produit un signal explicite (`[clé manquante: …]` ou équivalent), jamais `undefined` ou une chaîne vide silencieuse ;
- les phrases sont traduites comme des messages complets avec leurs paramètres, sans concaténation fragile de fragments ;
- un contrôle vérifie l'absence de clés utilisées mais non définies et de clés inutilisées dans le périmètre livré.

**Contre-épreuve :** supprime une traduction dans une branche de test ; démontre le fallback prévu puis le signalement d'une clé absente dans toutes les langues. Cette gate porte sur les textes et la structure i18n, pas sur la localisation des dates et nombres.

Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu'après déploiement et observation réels.
