---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [solution_concurrente, defaut_cache]
anti_recipe_key: solution_concurrente+defaut_cache
transfer_distance: medium
assessment_role: instructional_checkpoint
---

# Mise en pratique : La méthode Polya (avant de toucher au clavier)

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## Support de l’exercice

Utilise le [portfolio fictif de Noa](EXERCICE-PORTFOLIO-FICTIF.md). Le cas est indépendant de ton projet personnel ; travaille dans un fichier local, sur papier ou dans `scratch/problem-solving/`. Aucun dépôt Git ni site réel n’est requis.

## TYPE

Exercice de méthode

## Niveau

[OK] Intermédiaire

## CONTEXTE

Comprendre → planifier → exécuter → relire. Appliquée au portfolio fictif de Noa, cette méthode évite de décider une interface avant d'avoir clarifié le besoin.

## OBJECTIF

Ta première fonctionnalité est pensée avant d'être écrite.

## APPLICATION

- Choisis une fonctionnalité non encore faite (par ex. la recherche de projets).
- Écris quatre courts paragraphes dans `01-polya.md` sous ton dossier local de preuves : **comprendre** la demande, **préparer** un plan, **décrire** les étapes que tu suivrais, puis **vérifier** comment tu saurais que le résultat répond à la demande.
- Pour cet exercice, l’exécution peut être décrite sur papier : aucun code n’est requis. Ne commence pas à construire avant d’avoir clarifié le besoin et le plan.

## Critère de réussite

- [ ] Choisis une fonctionnalité non encore faite (par ex. la recherche de projets).
- [ ] Les quatre étapes sont écrites avant toute tentative de construction.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quelle étape as-tu eu le plus envie de sauter, et qu'est-ce que ça t'apprend ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Garde-fou

La création d’une fixture locale est **facultative** et n’est pas nécessaire pour valider ton plan. Si tu en crées une :

1. Utilise uniquement une copie jetable sous `scratch/problem-solving/`.
2. Vérifie son comportement seulement si tu sais déjà l’exécuter.
3. Un test ou un build n’est demandé que s’il existe déjà et si tu sais l’utiliser ; aucun outil supplémentaire n’est requis.
4. Sinon, fais l’exercice sur papier et étiquette le résultat `SIMULATION`.
5. Ne modifie jamais un projet existant pour satisfaire cet exercice.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tu clarifies une demande et prépares un plan avant de construire.

Tu as un plan écrit et daté pour la recherche du catalogue fictif. Conserve `01-polya.md` dans ton dossier local de preuves : c'est la trace de ta méthode.
Aucun commit Git n'est demandé.

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.

## Pont Kintana différé : formuler le problème avant la correction

**Statut : différé et non bloquant pour le Socle.** Après le Cadrage et les modules qui enseignent API, persistance et tests, tu pourras étudier le scénario Kintana d'une demande envoyée deux fois après une réponse lente. À ce stade, limite-toi à formuler le problème, les hypothèses, les informations à collecter et le résultat qui confirmerait ou réfuterait chaque hypothèse. Aucune correction backend, intégration, suite de tests ou preuve de production n'est attendue ici.
