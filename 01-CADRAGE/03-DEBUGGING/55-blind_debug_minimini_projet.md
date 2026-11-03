---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [fausse_piste, regression]
anti_recipe_key: fausse_piste+regression
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : Blind Debug

> **SCÈNE CRAZYDEVS : mur de siège :** le bug n'est pas “où ça a explosé ?”, mais “où la première fissure est-elle apparue ?”. Ici, chaque log, test et reproduction est une empreinte dans le mur.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

En production sur Vercel, pas de DevTools sur la machine du visiteur : il reste les logs, les traces et le raisonnement.

## OBJECTIF

Tu débogues ta prod sans y toucher.

## APPLICATION

- Déploie ton portfolio en préversion.
- Provoque une erreur côté serveur et retrouve-la uniquement via les logs de la plateforme.
- Ajoute un log structuré (contexte + identifiant du projet concerné) là où il manquait.

## Critère de réussite

- [ ] Déploie ton portfolio en préversion.
- [ ] Provoque une erreur côté serveur et retrouve-la uniquement via les logs de la plateforme.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quelle information aurais-tu voulu avoir dans le log, et l'as-tu ajoutée ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tu débogues ta prod sans y toucher.

Ton portfolio déployé est désormais observable. Commit les logs ajoutés.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.

## Livraison produit obligatoire : Kintana : Incident de demande dupliquée

> **Fil narratif : Équipe 7 / Naruto :** Kakashi ne lance pas l’équipe dans le brouillard sans objectif ni plan de sortie. Ici, la mission commence par une hypothèse vérifiable, pas par un clavier en surchauffe.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 55-blind_debug_minimini_projet » :** Dans Kintana, écris un scénario d’incident reproductible, capture la preuve avant correction et ajoute le test qui aurait empêché le retour du défaut.

Reproduis un incident où un demandeur envoie deux fois la même commande après une réponse lente. Écris les hypothèses, ajoute le signal nécessaire, isole la cause et corrige sans supprimer la preuve du défaut.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Le défaut est démontré avant correction ; un test de non-régression échoue avant et passe après ; le postmortem distingue cause et symptôme. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
