---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [solution_concurrente, decision_organisationnelle]
anti_recipe_key: solution_concurrente+decision_organisationnelle
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## TYPE

Mini-projet

## Niveau

[OK] Fondamental

## Prérequis

- Connaître `useEffect`
- Connaître la frontière Server / Client de l'App Router Next.js

## CONTEXTE

Même un portfolio statique récupère des données : compteur GitHub, derniers commits de ce parcours. Dans l'App Router, `fetch` s'écrit côté serveur, dans le composant.

## OBJECTIF

Ton portfolio parle à GitHub.

## APPLICATION

- Dans un Server Component, fais un `fetch` vers l'API publique GitHub à partir du champ `github` de ton ce parcours.
- Affiche le nombre d'étoiles et la date du dernier push.
- Gère explicitement le cas où la requête échoue : le reste de la page doit rester affiché.

## Critère de réussite

- [ ] Dans un Server Component, fais un `fetch` vers l'API publique GitHub à partir du champ `github` de ton ce parcours.
- [ ] Affiche le nombre d'étoiles et la date du dernier push.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi ce `fetch` est-il fait côté serveur et pas dans un `useEffect` ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton portfolio parle à GitHub.

La carte ce parcours affiche désormais une donnée vivante. C'est le genre de détail qu'un recruteur remarque. Commit.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.
