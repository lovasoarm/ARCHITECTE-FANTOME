---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [constraints_injectees, changement_contexte]
anti_recipe_key: constraints_injectees+changement_contexte
transfer_distance: low
assessment_role: diagnostic_mastery
---

# Mise en pratique : Reproduis avant de corriger

> **SCÈNE CRAZYDEVS : mur de siège :** le bug n'est pas “où ça a explosé ?”, mais “où la première fissure est-elle apparue ?”. Ici, chaque log, test et reproduction est une empreinte dans le mur.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Un bug non reproductible n'est pas corrigé, il est masqué. Reproduire d'abord, corriger ensuite.

## OBJECTIF

Ton bug est reproductible sur commande.

## APPLICATION

- Choisis un bug d'affichage (par ex. barre de progression absente).
- Écris les étapes exactes de reproduction, données comprises, dans un fichier.
- Vérifie que quelqu'un d'autre pourrait le reproduire sans toi.
- Corrige seulement après.

## Critère de réussite

- [ ] Choisis un bug d'affichage (par ex. barre de progression absente).
- [ ] Écris les étapes exactes de reproduction, données comprises, dans un fichier.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Comment sais-tu que ta reproduction est complète ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton bug est reproductible sur commande.

Tu tiens la base d'un futur test de non-régression en `02-CONSTRUCTION/03-TESTING`.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.

## Livraison produit obligatoire : Kintana : Incident de demande dupliquée

> **Fil narratif : Équipe 7 / Naruto :** Kakashi ne lance pas l’équipe dans le brouillard sans objectif ni plan de sortie. Ici, la mission commence par une hypothèse vérifiable, pas par un clavier en surchauffe.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 53-repro_before_fix_minimini_projet » :** Reproduis un incident où un demandeur envoie deux fois la même commande après une réponse lente. Écris les hypothèses, ajoute le signal nécessaire, isole la cause et corrige sans supprimer la preuve du défaut.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Le défaut est démontré avant correction ; un test de non-régression échoue avant et passe après ; le postmortem distingue cause et symptôme. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
