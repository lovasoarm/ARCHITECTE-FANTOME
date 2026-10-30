---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [temps_limite, transmission]
anti_recipe_key: temps_limite+transmission
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## TYPE

Projet fil rouge

## Niveau

[OK] Fondamental

## CONTEXTE

Une variable, c'est une étiquette posée sur une valeur. Le portfolio Lovasoa commence exactement là : avant tout composant, il faut nommer les données du site (nom, métier, projets). Un nom flou aujourd'hui = un refactor douloureux au module 4.

Cette implémentation en JavaScript est volontaire. Elle sera progressivement typée et migrée vers TypeScript dans le module `02-CONSTRUCTION/12-TYPESCRIPT`.

## OBJECTIF

Ton nom s'affiche depuis une source unique.

## Étape obligatoire : JavaScript sans framework (guidé)

**Prérequis :** savoir créer un fichier `.js`, lancer `node --version` et `node fichier.js` ; connaître `const` et un objet simple. Aucun React, TypeScript ni Next.js nécessaire.

1. Crée `personal.js` contenant `const personalInfo = { name: "Alex", role: "développeur" }; console.log(personalInfo.name);`.
2. Lance `node personal.js` ; résultat attendu : `Alex`. Modifie `name`, relance et explique pourquoi l'affichage change.
3. **Semi-guidé :** crée deux objets de personnes avec un nom différent, écris un affichage pour chacune, et justifie pourquoi la même propriété `name` est utilisée.
4. **Indépendant :** crée `portfolio.js` qui conserve un objet `profile`, affiche son `name` puis traite un profil sans `name` en affichant `Nom indisponible` ; explique ton contrôle. Test négatif : absence de `name` ; une sortie `undefined` ne valide pas ce critère.
5. Conserve les deux sorties, ton code et l'explication dans `preuve.md`. **Critère :** la donnée est définie une seule fois et la modification est visible après relance.

## Extension optionnelle : Next.js (non requise pour valider la notion)

**Prérequis avancés :** application Next.js préalablement initialisée, navigation `app/`, import/export JavaScript, JSX et lecture de `.tsx`. Si ces acquis manquent, reporter cette extension.

## APPLICATION

- Crée le dossier `data/` à la racine de ton projet Next.js.
- Dans `data/personal.js`, déclare une variable exportée `personalInfo` qui contient tes informations personnelles : `name`, `alias`, `role`, `location`, `email`.
- Importe-la dans `app/page.tsx` et affiche uniquement le `name` dans un `<h1>`.
- Renomme ensuite ta variable pour qu'elle décrive la donnée, pas son usage (`personalInfo`, pas `data1`).

## Critère de réussite

- [ ] Niveau obligatoire sans framework : `node personal.js` affiche le nom prévu et l’absence de nom est traitée.
- [ ] Extension seulement : crée le dossier `data/` à la racine de ton projet Next.js.
- [ ] Extension seulement : importe la donnée dans `app/page.tsx` et affiche le `name` dans un `<h1>`.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi mettre ces informations dans une variable exportée plutôt que de les écrire en dur dans le JSX de la page ?

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

Dans ce scénario, tu as vérifié que : ton nom s'affiche depuis une source unique.

Tu viens de créer la première source de vérité du portfolio : `data/personal.js`. Chaque page qui parlera de toi lira ce fichier, jamais du texte recopié. C'est la brique sur laquelle les 5 modules suivants s'appuient. Commit ce fichier.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.
