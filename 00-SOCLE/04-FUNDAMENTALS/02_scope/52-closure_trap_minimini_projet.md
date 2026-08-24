---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [decision_organisationnelle, fausse_piste]
anti_recipe_key: decision_organisationnelle+fausse_piste
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

## TYPE

Micro-drill

## Niveau

[OK] Fondamental

## Prérequis

- Connaître `useState`
- Connaître `useEffect`
- Comprendre les closures

## CONTEXTE

Une closure capture des variables, pas des valeurs figées : d'où les « stale closures » de React, où un handler lit un state périmé. Ton futur carrousel de projets tombera dedans.

Une stale closure n'est pas une anomalie des closures : c'est une conséquence normale d'une closure utilisée avec une valeur issue d'un rendu précédent.

## APPLICATION

- Crée un composant client avec un compteur et un `setInterval` dans un `useEffect` avec tableau de dépendances vide.
- Affiche la valeur lue par l'intervalle : constate qu'elle reste bloquée.
- Corrige avec la forme fonctionnelle de `setState`.
- Note en commentaire ce que la closure avait réellement capturé.

## Critère de réussite

- [ ] Crée un composant client avec un compteur et un `setInterval` dans un `useEffect` avec tableau de dépendances vide.
- [ ] Affiche la valeur lue par l'intervalle.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi l'intervalle lit-il toujours la même valeur alors que le state, lui, augmente bien ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tu as désamorcé la stale closure.

Ce bug précis coûte des heures à la plupart des devs React. Tu l'as vu, reproduit et corrigé avant qu'il n'atteigne ton carrousel Netflix.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.
