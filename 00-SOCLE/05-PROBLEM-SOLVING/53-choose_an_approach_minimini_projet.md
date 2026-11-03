---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [preuve_partielle, fausse_piste]
anti_recipe_key: preuve_partielle+fausse_piste
transfer_distance: medium
assessment_role: instructional_checkpoint
---

# Mise en pratique : Choisir une approche avant de coder

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

## Support de l’exercice

Utilise le [portfolio fictif de Noa](EXERCICE-PORTFOLIO-FICTIF.md). Le cas est indépendant de ton projet personnel ; travaille dans un fichier local, sur papier ou dans `scratch/problem-solving/`. Aucun dépôt Git ni site réel n’est requis.

## TYPE

Exercice de décision

## Niveau

[OK] Intermédiaire

## CONTEXTE

Il y a toujours plusieurs chemins : fenêtre modale (fenêtre au-dessus de la page) vs page de détail séparée, données écrites directement vs outil de gestion de contenu. Choisir consciemment, c'est pouvoir justifier en entretien.

## OBJECTIF

Ta première décision d'architecture est documentée.

## APPLICATION

- Pour la fiche projet, liste deux approches (modale par-dessus l'accueil / route une adresse dédiée par projet).
- Écris pour chacune 2 avantages et 2 inconvénients réels (facilité à partager une adresse, facilité à retrouver le projet, complexité).
- Tranche en une phrase et note la décision dans `04-approche.md` sous ton dossier local de preuves.

## Critère de réussite

- [ ] Pour la fiche projet, liste deux approches (modale par-dessus l'accueil / route une adresse dédiée par projet).
- [ ] Écris pour chacune 2 avantages et 2 inconvénients réels (facilité à partager une adresse, facilité à retrouver le projet, complexité).
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quel critère a réellement fait pencher ta décision, et est-il lié à l'utilisateur ou à ton confort ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Garde-fou

La création d’une fixture locale est **facultative** et n’est pas nécessaire pour valider ta décision. Si tu en crées une :

1. Utilise uniquement une copie jetable sous `scratch/problem-solving/`.
2. Vérifie son comportement seulement si tu sais déjà l’exécuter.
3. Un test ou un build n’est demandé que s’il existe déjà et si tu sais l’utiliser ; aucun outil supplémentaire n’est requis.
4. Sinon, fais l’exercice sur papier et étiquette le résultat `SIMULATION`.
5. Ne modifie jamais un projet existant pour satisfaire cet exercice.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ta première décision d'architecture est documentée.

Tu as une décision courte et traçable. Conserve `04-approche.md` dans ton dossier local de preuves. Aucun commit Git ni dossier `decisions/` de projet personnel n'est requis.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.

## Pont Kintana différé : comparer les options de reprise

**Statut : différé et non bloquant pour le Socle.** Après le Cadrage et les prérequis API/persistance/tests, tu pourras comparer les stratégies de traitement d'une demande renvoyée après un délai réseau. Pour le challenge actuel, compare les options de présentation du portfolio fictif de Noa. Aucun choix d'architecture Kintana définitif ni développement backend n'est demandé.
