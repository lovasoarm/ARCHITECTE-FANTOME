---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [preuve_partielle, fausse_piste]
anti_recipe_key: preuve_partielle+fausse_piste
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : Le modèle mental JS en 1 image

> **SCÈNE CRAZYDEVS : Kamehameha à charge :** la puissance n'arrive pas “quand tu as appelé la fonction”, elle arrive quand le runtime décide que la file peut avancer. Ici, le vrai boss est le timing, pas la syntaxe.

## TYPE

Micro-drill

## Niveau

[OK] Intermédiaire

## CONTEXTE

JS est mono-thread avec une file d'attente. Savoir ce qui bloque le rendu explique pourquoi ton splash screen fige ou pourquoi une animation saccade.

## APPLICATION

- Dans un composant client, lance une boucle synchrone de ~500 ms au clic et essaie de scroller pendant : constate le gel.
- Remplace-la par un découpage asynchrone et recommence.
- Note en une phrase ce qui bloque exactement.

## Critère de réussite

- [ ] Dans un composant client, lance une boucle synchrone de ~500 ms au clic et essaie de scroller pendant.
- [ ] Remplace-la par un découpage asynchrone et recommence.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Qu'est-ce qui est réellement bloqué pendant une boucle synchrone : le réseau, le rendu, ou les deux ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tu as vu ton interface geler à la demande.

Tu sais désormais reconnaître un blocage du thread principal dans le portfolio avant qu'un visiteur ne le subisse.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

## Livraison produit obligatoire : Kintana : Notification fiable

> **Fil narratif : Équipe 7 / Naruto :** Kakashi ne lance pas l’équipe dans le brouillard sans objectif ni plan de sortie. Ici, la mission commence par une hypothèse vérifiable, pas par un clavier en surchauffe.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 50-mental_model_js_minimini_projet » :** Intègre cette notion au traitement asynchrone des notifications Kintana. Simule au moins un timeout, un retry et un événement reçu deux fois ; conserve une clé stable pour empêcher un double effet.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Le système ne perd pas silencieusement l’événement ; il ne double pas l’effet ; le délai et le nombre de tentatives sont observables. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
