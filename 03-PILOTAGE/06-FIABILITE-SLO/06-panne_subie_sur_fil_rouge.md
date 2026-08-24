---
stability: intemporel
acte: pilotage
noyau: oui
cognitive_level: L4
perturbation_modes: [constraints_injectees, changement_echelle]
anti_recipe_key: constraints_injectees+changement_echelle
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : finale au stade :** 99,9 % de disponibilité sur un slide ne sauve personne à 03:17 quand le service hurle. La vraie compétence commence quand il faut transformer la métrique en décision.

# Exercice : la panne subie (et non choisie)

Temps de lecture ~2 min

Durée : 45 min, chronomètre obligatoire.

## Protocole

1. Écris six pannes sur six papiers : base injoignable, disque plein, dépendance externe en timeout,
   certificat expiré, migration ratée, fuite mémoire lente.
2. Tire au sort. **Tu ne choisis pas.** C'est tout l'exercice : on ne s'entraîne jamais sur son
   scénario préféré.
3. Provoque-la réellement en environnement de test (coupe le service, remplis le disque avec un
   fichier, révoque le certificat).
4. Chronomètre : détection → diagnostic → rétablissement.

## Interdits pendant l'exercice

- Regarder le papier avant d'avoir observé un symptôme.
- Corriger sans avoir écrit l'hypothèse. Une ligne : « je pense que X parce que j'observe Y ».

## Rendu

`PANNE-<date>.md` : la panne tirée, les trois délais mesurés, les hypothèses fausses (elles comptent
autant que la bonne), et l'action de détection ajoutée. Ce fichier est une pièce de la famille S3.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?
