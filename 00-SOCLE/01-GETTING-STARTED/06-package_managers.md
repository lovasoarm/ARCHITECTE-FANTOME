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

<!-- AF-DIAGRAM:setup -->

## Repère visuel utile : Environnement reproductible et livraison

```text
clone propre
    |
    v
versions épinglées -> dépendances déclarées
    |                     |
    +----------+----------+
               v
       contrôle des prérequis
               |
       +-------+-------+
       v               v
    démarrage       blocage utile
       |               |
       v               v
    smoke test     diagnostic clair
```

<!-- AF-LESSON-PROFILE: setup -->

## Repères de décision

- **Pourquoi :** Un environnement non reproductible transforme un bug logiciel en chasse au trésor. Le but est que deux machines puissent exécuter le même projet avec des versions et des étapes connues.
- **Quand l’utiliser / quand l’éviter :** Prépare ou répare l'environnement avant une modification, un onboarding ou une livraison. N'ajoute pas d'outil si une commande native et documentée suffit.
- **Limites :** Un setup reproductible ne garantit pas que le service fonctionne en production ; il réduit seulement les différences d'environnement. Les secrets et données personnelles ne doivent jamais entrer dans le dépôt.

## Mécanisme : la version sans magie

Épingle les versions, déclare les dépendances, sépare configuration et secrets, puis vérifie les commandes depuis un clone propre.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **04 : npm / pnpm : ne bloque pas au premier `install`** se rattache à ce cas concret : Kintana doit pouvoir être repris par un autre développeur sur une machine modeste. Une commande absente, un runtime différent ou une variable cachée doit être détectable avant de toucher aux données.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Environnement reproductible et livraison

> **Arc Konoha / Naruto :** avant de partir en mission, l'équipe vérifie les outils, les accès et le plan. Sinon, tu découvres le problème au pire moment.

**Mission liée à « 04 : npm / pnpm : ne bloque pas au premier `install` » :** Prépare un clone propre du projet Kintana : vérifie le runtime, installe seulement les dépendances déclarées, ajoute un contrôle de configuration sans afficher les secrets et documente le démarrage ainsi que le nettoyage.

**Livrable :** un `SETUP.md`, un fichier de versions, un contrôle automatisé de prérequis et une capture de commandes réellement exécutées.

**Critères d’acceptation :** un autre poste suit la procédure sans deviner ; une version incorrecte échoue avec un message utile ; aucun secret n'est commité ; les commandes décrites existent.

**Transfert obligatoire :** Rejoue la procédure sur une machine différente ou avec un runtime manquant. Documente ce qui change sans prétendre tester un environnement que tu n'as pas utilisé.
