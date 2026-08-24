---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [fausse_piste, regression]
anti_recipe_key: fausse_piste+regression
transfer_distance: low
assessment_role: instructional_checkpoint
---

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
