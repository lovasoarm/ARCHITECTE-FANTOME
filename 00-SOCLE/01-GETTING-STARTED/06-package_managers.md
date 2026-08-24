---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [fausse_piste, decision_inversee]
anti_recipe_key: fausse_piste+decision_inversee
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# 04 : npm / pnpm : ne bloque pas au premier `install`

Temps de lecture ~5 min

Un package manager, c'est ton système de logistique. Il descend du code des autres, gère les versions, lance des scripts.

## Le vocabulaire

- `package.json` : la liste de course de ton projet.
- `node_modules/` : l'entrepôt (jamais commit : `.gitignore`).
- `package-lock.json` / `pnpm-lock.yaml` : la facture exacte, versions gelées. **Commit obligatoire.**

## npm : 6 commandes

```bash
npm init -y      # créer package.json
npm install      # installer tout ce qui est dans package.json
npm install lodash   # ajouter une dep
npm install -D vitest # dep de dev seulement
npm uninstall lodash  # retirer
npm run test      # lancer un script défini
```

## pnpm (recommandé 2026)

Même API, disk usage divisé par 5-10. `pnpm install`, `pnpm add`, `pnpm run`. Utilise-le si tu as le choix.

## Piège

`npm install` sans lockfile en CI = build non déterministe. Utilise `npm ci` en CI, `npm install` en local.

## Ce que l'analogie cache

Le "logisticien" ne vérifie pas la qualité de la marchandise. Un paquet peut contenir du code malveillant. Voir `07-devsec_perso.md`.

## Mission

Crée un projet, ajoute `zod`, écris un script `check` qui valide `{name: string}`, lance-le via `npm run check`.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.
