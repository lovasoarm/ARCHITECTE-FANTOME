---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [changement_contexte, regression]
anti_recipe_key: changement_contexte+regression
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : ERROR STRATEGY : FAIL-FAST, FALLBACK, RETRY

> **SCÈNE CRAZYDEVS : traqueur de jutsu :** Naruto voit l'explosion finale et accuse le dernier fichier touché. Mauvais réflexe. Ton enquête doit remonter le flux, figer les hypothèses et retrouver la première trace qui ne colle plus.

## TYPE

Projet fil rouge

## Niveau

[OK] Intermédiaire

## CONTEXTE

Une stratégie, c'est une règle unique appliquée partout : que fait le portfolio quand X échoue ? Écrite une fois, elle évite dix décisions improvisées.

## OBJECTIF

Ton portfolio a une politique d'erreurs.

## APPLICATION

- Rédige `docs/strategie-erreurs.md` : trois catégories (donnée manquante, service tiers indisponible, bug interne) et la réponse pour chacune (repli, message, 404, `error.tsx`).
- Confronte ton code actuel à ces règles et corrige les écarts.

## Critère de réussite

- [ ] Confronte ton code actuel à ces règles et corrige les écarts.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quel écart entre ta stratégie écrite et ton code réel as-tu trouvé ?

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

Dans ce scénario, tu as vérifié que : ton portfolio a une politique d'erreurs.

Un document court qui rend le comportement du site prévisible. Commit-le.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.

## Livraison produit obligatoire : Kintana : Incident de demande dupliquée

> **Fil narratif : Équipe 7 / Naruto :** Kakashi ne lance pas l’équipe dans le brouillard sans objectif ni plan de sortie. Ici, la mission commence par une hypothèse vérifiable, pas par un clavier en surchauffe.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 54-error_strategy_minimini_projet » :** Dans Kintana, écris un scénario d’incident reproductible, capture la preuve avant correction et ajoute le test qui aurait empêché le retour du défaut.

Reproduis un incident où un demandeur envoie deux fois la même commande après une réponse lente. Écris les hypothèses, ajoute le signal nécessaire, isole la cause et corrige sans supprimer la preuve du défaut.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Le défaut est démontré avant correction ; un test de non-régression échoue avant et passe après ; le postmortem distingue cause et symptôme. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
