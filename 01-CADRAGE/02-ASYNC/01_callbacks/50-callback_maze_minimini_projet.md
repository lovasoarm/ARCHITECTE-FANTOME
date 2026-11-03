---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [changement_echelle, decision_organisationnelle]
anti_recipe_key: changement_echelle+decision_organisationnelle
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : LE LABYRINTHE DU CALLBACK

> **SCÈNE CRAZYDEVS : Kamehameha à charge :** la puissance n'arrive pas “quand tu as appelé la fonction”, elle arrive quand le runtime décide que la file peut avancer. Ici, le vrai boss est le timing, pas la syntaxe.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Les callbacks sont partout en React : `onClick`, `onChange`, callbacks d'observers. Mal nommés ou imbriqués, ils rendent un composant illisible.

## OBJECTIF

Ta carte projet est devenue réutilisable.

## APPLICATION

- Dans ta rangée de projets, remplace les handlers anonymes en ligne par des fonctions nommées déclarées dans le composant.
- Passe un callback `onSelect` en prop de `ProjectCard` au lieu de gérer l'ouverture de la modale dans la carte.
- Vérifie que `ProjectCard` ne connaît plus la modale.

## Critère de réussite

- [ ] Dans ta rangée de projets, remplace les handlers anonymes en ligne par des fonctions nommées déclarées dans le composant.
- [ ] Passe un callback `onSelect` en prop de `ProjectCard` au lieu de gérer l'ouverture de la modale dans la carte.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi la carte ne doit-elle pas savoir ce qui se passe quand on clique dessus ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ta carte projet est devenue réutilisable.

Inversion de contrôle réussie : la carte est utilisable dans n'importe quelle rangée. Commit.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.

## Livraison produit obligatoire : Kintana : Notification fiable

> **Fil narratif : Équipe 7 / Naruto :** Kakashi ne lance pas l’équipe dans le brouillard sans objectif ni plan de sortie. Ici, la mission commence par une hypothèse vérifiable, pas par un clavier en surchauffe.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 50-callback_maze_minimini_projet » :** Intègre cette notion au traitement asynchrone des notifications Kintana. Simule au moins un timeout, un retry et un événement reçu deux fois ; conserve une clé stable pour empêcher un double effet.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Le système ne perd pas silencieusement l’événement ; il ne double pas l’effet ; le délai et le nombre de tentatives sont observables. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
