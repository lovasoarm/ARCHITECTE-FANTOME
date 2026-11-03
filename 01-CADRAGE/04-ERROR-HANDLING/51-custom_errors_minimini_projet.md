---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [solution_concurrente, constraints_injectees]
anti_recipe_key: solution_concurrente+constraints_injectees
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : Custom errors : les erreurs qui racontent une histoire

> **SCÈNE CRAZYDEVS : traqueur de jutsu :** Naruto voit l'explosion finale et accuse le dernier fichier touché. Mauvais réflexe. Ton enquête doit remonter le flux, figer les hypothèses et retrouver la première trace qui ne colle plus.

## TYPE

Projet fil rouge

## Niveau

[OK] Intermédiaire

## CONTEXTE

Une erreur typée porte du sens : `ProjectNotFoundError` se traite autrement qu'une panne réseau, et permet une vraie 404.

## OBJECTIF

Ta 404 projet est correcte.

## APPLICATION

- Crée `lib/errors.js` avec une classe d'erreur métier pour un projet introuvable.
- Lance-la depuis `getProjectBySlug`.
- Sur la route dynamique, attrape-la et déclenche la 404 native de Next.

## Critère de réussite

- [ ] Crée `lib/errors.js` avec une classe d'erreur métier pour un projet introuvable.
- [ ] Lance-la depuis `getProjectBySlug`.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Qu'apporte une classe d'erreur dédiée par rapport à un simple message texte ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Garde-fou

Avant de modifier le projet fil rouge :

1. Vérifie que le projet fonctionne.
2. Fais une modification minimale.
3. Vérifie le comportement demandé.
4. Lance les tests/build disponibles.
5. Ne supprime pas une fonctionnalité existante pour satisfaire l'exercice.
6. Si l'expérience est volontairement destructive, fais-la dans `scratch/` ou dans une branche dédiée.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ta 404 projet est correcte.

Une URL inexistante rend maintenant une vraie page 404, bonne pour l'utilisateur et pour le SEO. Commit.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.

## Livraison produit obligatoire : Kintana : Incident de demande dupliquée

> **Fil narratif : Équipe 7 / Naruto :** Kakashi ne lance pas l’équipe dans le brouillard sans objectif ni plan de sortie. Ici, la mission commence par une hypothèse vérifiable, pas par un clavier en surchauffe.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 51-custom_errors_minimini_projet » :** Reproduis un incident où un demandeur envoie deux fois la même commande après une réponse lente. Écris les hypothèses, ajoute le signal nécessaire, isole la cause et corrige sans supprimer la preuve du défaut.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Le défaut est démontré avant correction ; un test de non-régression échoue avant et passe après ; le postmortem distingue cause et symptôme. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
