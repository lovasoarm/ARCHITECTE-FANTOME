---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [fausse_piste, defaut_cache]
anti_recipe_key: fausse_piste+defaut_cache
transfer_distance: low
assessment_role: diagnostic_mastery
---

# Mise en pratique : Lire une stack trace : la carte qui te dit où le code a explosé

> **SCÈNE CRAZYDEVS : mur de siège :** le bug n'est pas “où ça a explosé ?”, mais “où la première fissure est-elle apparue ?”. Ici, chaque log, test et reproduction est une empreinte dans le mur.

## TYPE

Micro-drill

## Niveau

[OK] Intermédiaire

## CONTEXTE

Lire une stack trace Next.js, c'est distinguer ton code du code du framework et trouver la première ligne qui t'appartient.

## APPLICATION

- Provoque une erreur réelle : accède à `project.title` sur un projet introuvable par slug.
- Lis la trace complète et surligne la première ligne pointant vers ton propre code (`app/`, `components/`, `lib/`).
- Corrige, puis note en une phrase le raisonnement qui t'a mené à la ligne fautive.

## Critère de réussite

- [ ] Provoque une erreur réelle.
- [ ] Lis la trace complète et surligne la première ligne pointant vers ton propre code (`app/`, `components/`, `lib/`).
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Comment repères-tu, dans une trace de 40 lignes, celle qui t'intéresse ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tu lis une trace sans paniquer.

Tu as corrigé une vraie 404 mal gérée sur la route dynamique. Commit le correctif.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

## Livraison produit obligatoire : Kintana : Incident de demande dupliquée

> **Fil narratif : Équipe 7 / Naruto :** Kakashi ne lance pas l’équipe dans le brouillard sans objectif ni plan de sortie. Ici, la mission commence par une hypothèse vérifiable, pas par un clavier en surchauffe.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 50-read_stack_trace_minimini_projet » :** Reproduis un incident où un demandeur envoie deux fois la même commande après une réponse lente. Écris les hypothèses, ajoute le signal nécessaire, isole la cause et corrige sans supprimer la preuve du défaut.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Le défaut est démontré avant correction ; un test de non-régression échoue avant et passe après ; le postmortem distingue cause et symptôme. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
