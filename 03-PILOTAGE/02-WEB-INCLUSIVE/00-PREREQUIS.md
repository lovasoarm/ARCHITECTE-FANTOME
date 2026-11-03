---
stability: intemporel
acte: évaluer
cognitive_level: L3
perturbation_modes: [decision_organisationnelle, decision_inversee]
anti_recipe_key: decision_organisationnelle+decision_inversee
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Attack on Titan :** ta frontière de confiance est un mur. Le problème n'est pas seulement de savoir s'il tient ; il faut savoir **qui peut passer, par où, avec quelle preuve et que se passe-t-il quand le mur est percé**.

# 00 : Prereq check : Web Inclusive

Temps de travail indicatif ~15 min (répondre aux quatre questions et noter les bases à réviser).

> Avant de commencer ce module, réponds à ces questions **sans regarder**. Ce diagnostic n'est pas noté et ne ferme jamais l'accès : il sert à repérer les bases web déjà acquises et à choisir une révision utile.
>
> Les questions reprennent les notions de [« Accessibilité utile, perception de vitesse, et les dangers de l'optimisme »](../../02-CONSTRUCTION/01-USER-WIZARD/05-accessibility-and-speed.md), déjà rencontrées dans le parcours. Elles ne demandent pas de connaître à l'avance les lecteurs d'écran, les critères WCAG détaillés ou ARIA : ce module les approfondit.

## Questions

1. Pourquoi un vrai élément `<button>` est-il préférable à une `<div>` avec un gestionnaire `onClick` pour une action ?
2. À quoi sert le focus clavier visible, et que doit-il se passer lorsqu'une modale se ferme ?
3. Comment relier une erreur de validation au champ concerné pour qu'elle ne soit pas seulement visible à l'écran ?
4. Pourquoi une interface optimiste doit-elle prévoir un retour arrière explicite quand le serveur refuse l'action ? Donne un exemple où cette approche serait risquée.

## Verdict

- **3+ réponses solides** → commence le module ; note les points hésitants comme objectifs de révision.
- **2 ou moins** → relis [Accessibilité utile, perception de vitesse, et les dangers de l'optimisme](../../02-CONSTRUCTION/01-USER-WIZARD/05-accessibility-and-speed.md), puis refais le diagnostic. Tu peux aussi revoir les bases HTML/DOM si les éléments, attributs ou événements te sont encore peu familiers.

> Le résultat est un repère de départ, pas une gate. Tu peux commencer le module même si tu as besoin de revoir les bases.

> **Ce que le module enseigne ensuite :** le comportement des lecteurs d'écran, les critères de contraste, l'usage raisonné d'ARIA, les audits manuels et automatisés, puis l'internationalisation. Ne pas déjà maîtriser ces notions est normal : elles font partie des objectifs du module.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.
