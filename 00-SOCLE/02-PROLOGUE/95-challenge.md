---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [defaut_cache, fausse_piste]
anti_recipe_key: defaut_cache+fausse_piste
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Challenge 00 : ton contrat de départ

Temps de lecture ~2 min

[Sommaire](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) | [Niveau](README.md) | [Grimoire](90-grimoire.md)

Ce niveau n'enseigne aucune technique. Il produit un **contrat provisoire de domaine candidat**. Le fil rouge définitif sera qualifié après les premiers travaux de Cadrage ; ce document conserve tes hypothèses de départ, sans te forcer à simuler une expertise métier que tu n’as pas encore.

## Repère de durée

Environ 20 à 45 minutes, sans chronomètre ni note. Si tu n'as pas assez d'informations, arrête-toi et écris `inconnu` ou `à vérifier`. Dépasser ce repère ne signifie pas un échec : le but n'est pas de choisir définitivement un projet ni d'inventer un domaine que tu ne connais pas.

## Livrable

Une entrée datée dans ton journal local ou `PREUVES/00-SOCLE/02-PROLOGUE.md`, contenant :

1. Le domaine candidat et la personne ou catégorie d’utilisateur qui pourrait rencontrer le problème.
2. Le problème supposé, en une phrase sans jargon.
3. Une première phrase de non-objectif : « ce projet ne fera pas X ».
4. Les cinq questions de repérage : marque `connu`, `à vérifier` ou `inconnu`. Tu n’as pas à rechercher les mots techniques ni à inventer une réponse ; les cinq lignes peuvent rester `inconnu`, sans note ; aucun score minimal n'est exigé pour terminer le Prologue.
5. La date et les hypothèses que tu devras vérifier pendant le Cadrage.

## Exemple de niveau attendu (tu peux le reprendre)

```text
Domaine : prêt de matériel dans un lycée
Utilisateur candidat : responsable du matériel
Problème supposé : retrouver qui a emprunté un équipement prend trop de temps.
Non-objectif : gérer les paiements.
Critères encore inconnus : règles de retard, droits exacts, historique à conserver.
```

Cet exemple est suffisant comme point de départ. Il n'affirme pas que le besoin a été observé : il reste une hypothèse à vérifier pendant le Cadrage. Tu n’as pas à compléter les cinq notions techniques maintenant ; marque-les `inconnu` si tu ne sais pas encore.

## Critères de réussite mesurables

```text
[ ] Le domaine et l’utilisateur candidat sont identifiables
[ ] Le problème est formulé comme une tâche ou une friction, pas comme une technologie
[ ] Une limite ou un non-objectif est écrit
[ ] Les cinq questions de repérage sont marquées connu / à vérifier / inconnu, même si les réponses restent toutes inconnues
[ ] Les hypothèses non vérifiées sont visibles ; aucune n’est présentée comme un fait
```

Ce contrat est une trace d’hypothèses initiales, pas un choix de projet définitif ni un ADR final. Tu peux reprendre un des exemples de la page README ; aucun domaine original n'est exigé. Tu peux utiliser un simple fichier texte dans un dossier local ; Git n’est pas requis. Si un prototype ou du code existe déjà, note-le honnêtement et conserve l’historique ; tu n’as pas à détruire ton travail ni à choisir artificiellement un autre projet. Au Cadrage, valide les besoins et la chronologie réelle avant d’en faire une preuve de décision initiale.

## Comment vérifier la chronologie sans falsifier l'histoire

Si le projet est nouveau et versionné dès le départ, conserve le commit initial et vérifie que le contrat de domaine candidat le précède. Si le projet, un prototype ou du code existe déjà, conserve cet historique : date le contrat maintenant, indique ce qui existait avant et distingue les hypothèses initiales des décisions prises après coup. **Ne présente jamais un document rédigé après le code comme une preuve de cadrage antérieur.** L'objectif est une chronologie honnête, pas une obligation de détruire ou recommencer un travail existant.

## Piège classique

Choisir un domaine qu'on ne connaît pas, pour « faire sérieux ».
Symptôme observable : au 01-PROBLEM-HUNT, tu n'arrives pas à inventer une contrainte métier
crédible sans aller la chercher sur internet. Si tu passes plus de dix minutes à documenter
ton propre domaine, il n'est pas le tien : reprends la grille de calibrage.

## Ce que tu dois savoir défendre

1. Quelles hypothèses du domaine sont encore inconnues et comment tu les vérifieras au 01-PROBLEM-HUNT.
2. Pourquoi tes critères encore inconnus doivent rester des hypothèses jusqu’au Cadrage.
3. Quelle observation pendant `01-CADRAGE/01-PROBLEM-HUNT` pourrait te faire confirmer, transformer ou abandonner ce domaine candidat.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.
