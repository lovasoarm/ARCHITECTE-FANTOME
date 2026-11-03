---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [constraints_injectees, temps_limite]
anti_recipe_key: constraints_injectees+temps_limite
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : vestiaire après match :** deux personnes peuvent être techniquement en désaccord sans devenir ennemies. Le vrai skill est de séparer le problème, le modèle, la décision… et l'ego.

# Naviguer un codebase inconnu sans se perdre

Temps de lecture ~10 min

T'arrives dans une équipe. On te donne accès au dépôt. 80 000 lignes de code. Zéro contexte.
Ton manager te dit : "prends le temps de te mettre à niveau".

Ce que font la plupart des devs : ouvrir le premier fichier dans `src/`, lire ligne par ligne, se perdre au bout de 20 minutes, et passer deux semaines à se sentir inutile.

Ce que font les bons devs : ils lisent le terrain avant de lire le code.

Ce fichier t'apprend la méthode.

---

## 1) AVANT D'OUVRIR UN SEUL FICHIER

Les cinq premières questions à répondre sans toucher au code :

```text
1. Qu'est-ce que ce projet fait en production ?
  --> README, description GitHub, tickets fermés récents

2. Quelle est l'architecture de haut niveau ?
  --> ADR/, docs/architecture.md, README section "Structure"

3. Quelles sont les dépendances principales ?
  --> package.json (5 à 10 dépendances qui comptent, pas les 200)

4. Comment on fait tourner le projet localement ?
  --> README section "Installation" -- si ça marche pas, c'est déjà une information

5. Où sont les tests ?
  --> dossier tests/ -- les tests racontent ce que le code est censé faire
```

**Règle :** si tu ne peux pas répondre à ces cinq questions en 15 minutes, c'est que le projet manque de documentation. Note-le : c'est ta première contribution possible.

---

## 2) LIRE L'ARBORESCENCE COMME UNE CARTE

```text
MAUVAISE APPROCHE       BONNE APPROCHE
----------------------    ----------------------
ouvrir src/index.js      regarder la structure complète d'abord
lire ligne par ligne     identifier les couches du système
se perdre dans les imports  trouver le entry point (point d'entrée)
chercher ce que fait X    comprendre où X vit dans le système
```

L'arborescence te dit comment l'équipe pense :

```text
projet/
├── src/
│  ├── routes/    <-- les endpoints HTTP : entrée du système
│  ├── controllers/ <-- logique entre routes et services
│  ├── services/   <-- logique métier : c'est ici que les trucs intéressants se passent
│  ├── models/    <-- définitions de données / schémas
│  ├── middleware/  <-- auth, logging, validation : ce qui s'applique à toutes les routes
│  └── utils/    <-- fonctions utilitaires : souvent le cimetière du projet
├── tests/
│  ├── unit/
│  └── integration/
└── docs/
```

Chaque couche a une responsabilité. Si `utils/` fait 40 fichiers : c'est un smell (signe d'un problème d'architecture). Si `services/` et `controllers/` font la même chose : le projet a une ambiguïté de découpage.

---

## 3) SUIVRE LE FLUX D'UNE REQUÊTE

La meilleure façon de comprendre un backend : suivre une vraie requête de bout en bout.

```text
EXEMPLE : comprendre comment un vote Ballon d'Or est enregistré

ÉTAPE 1 : trouver la route
     --> grep "POST /vote" ou chercher dans routes/
     --> app.post('/vote', authMiddleware, voteController.create)

ÉTAPE 2 : lire le middleware (ce qui s'exécute avant le handler)
     --> authMiddleware : vérifie le JWT, attache l'utilisateur à req.user
     --> voteController.create : le handler

ÉTAPE 3 : lire le handler
     --> voteController.create appelle voteService.registerVote(req.user, req.body)

ÉTAPE 4 : lire le service
     --> voteService.registerVote :
       1. vérifie que le journaliste n'a pas déjà voté
       2. valide que le joueur existe
       3. insère le vote en DB
       4. invalide le cache si Redis est configuré
       5. retourne le vote enregistré

ÉTAPE 5 : lire les tests correspondants
     --> tests/unit/voteService.test.js : vérifier ce qui est testé
     --> les tests révèlent les edge cases (cas limites) que l'équipe a anticipés
```

Après cet exercice : tu comprends comment un vote entre dans le système. Tu peux commencer à travailler sur les endpoints adjacents sans te perdre.

---

## 4) GIT LOG : L'HISTOIRE DU PROJET

Le `git log` est une source d'information sous-utilisée. Il te dit ce qui a changé, pourquoi, et qui est l'expert de chaque partie du code.

```bash
# voir les 20 derniers commits avec un résumé lisible
git log --oneline -20

# qui a touché ce fichier et quand
git log --oneline -- src/services/voteService.js

# quand cette ligne a été écrite et par qui (blame : attribution ligne par ligne)
git blame src/services/voteService.js

# voir le détail d'un commit spécifique
git show abc1234

# chercher dans les messages de commit (utile pour retrouver quand un bug a été introduit)
git log --grep="rate limiting" --oneline
```

**Ce que le git log révèle :**

- les fichiers souvent modifiés : zones de changement actif ou zones instables
- les fichiers jamais touchés depuis 2 ans : potentiellement legacy (code ancien à maintenir)
- les devs qui connaissent quelle partie du code : les bonnes personnes à qui poser des questions
- les messages de commit : si ils sont bons, ils racontent l'histoire du projet

---

## 5) TROUVER LES POINTS D'ENTRÉE CRITIQUES

Dans chaque type de projet, il y a des fichiers qui orchestrent tout le reste.

```text
TYPE DE PROJET      POINT D'ENTRÉE
---------------------   -------------------
API Node/Express     src/app.js ou src/index.js (là où les routes sont montées)
CLI Node         bin/cli.js ou src/cli.js (là où process.argv est parsé)
Module npm        index.js à la racine (ce qui est exporté vers l'extérieur)
App frontend (vanilla)  index.html + main.js
Worker          worker.js (là où le message handler est défini)
```

Trouver le point d'entrée te donne le fil. Tout le reste est accessible depuis là.

---

## 6) TECHNIQUES DE RECHERCHE DANS UN CODEBASE

Savoir chercher dans un projet inconnu c'est une compétence. Pas juste `Ctrl+F`.

```bash
# trouver où une fonction est définie
grep -r "function getUserById" src/

# trouver où elle est appelée
grep -r "getUserById" src/

# trouver tous les et Correction à faire : (souvent révélateurs de la dette technique)
grep -r "\|Correction à faire : \|HACK\|XXX" src/

# trouver les imports d'un module spécifique (pour comprendre où il est utilisé)
grep -r "import.*voteService\|require.*voteService" src/

# lister tous les fichiers modifiés dans les 7 derniers jours
find src/ -newer package.json -name "*.js" -type f
```

**Dans VSCode :**

- `Ctrl+Shift+F` : recherche dans tout le projet
- `F12` sur un nom de fonction : "Go to Definition" (aller à la définition)
- `Shift+F12` : "Find All References" (tous les endroits où c'est utilisé)
- `Ctrl+P` : chercher un fichier par nom partiel
- `Ctrl+Shift+O` : chercher un symbole (fonction, classe) dans le fichier actuel

---

## 7) LES QUESTIONS À POSER À L'ÉQUIPE (ET CELLES À NE PAS POSER)

**Avant de poser une question :** essaie de répondre toi-même pendant 20-30 minutes.
Un dev senior qui rejoint une équipe et qui pose des questions auxquelles le README répond : ça envoie un mauvais signal.

```text
MAUVAISES QUESTIONS        BONNES QUESTIONS
--------------------------     --------------------------
"comment fonctionne le projet ?"  "j'ai lu le README et les ADR,
(trop large, montre que t'as    j'ai une question sur la décision
pas cherché)            ADR-003 sur Drizzle : est-ce qu'on
                  a des cas où on utilise des requêtes
                  brutes directement ?"

"où est le code de l'auth ?"    "j'ai tracé la requête POST /login
(cherchable en 2 minutes)     jusqu'à authService, mais je vois
                  pas où les refresh tokens sont
                  invalidés -- c'est dans le service
                  ou dans le middleware ?"

"qui a écrit ça ?"         "git blame m'indique que ce bloc
(contexte manquant)        a été modifié en mars, le commit
                  dit 'fix edge case' -- est-ce que
                  vous savez quel edge case c'était ?"
```

---

## EXERCICES

**EXO 1 : cartographier avant de coder**

Tu viens de cloner le projet `05_prison_break_api`. Sans ouvrir un seul fichier `.js` :

1. Identifie les cinq questions de contexte et réponds-y à partir du README et des fichiers de configuration.
2. Dessine en ASCII l'arborescence telle que tu l'imagines après lecture du README.
3. Liste les trois fichiers que tu liras en premier et justifie l'ordre.

---

**EXO 2 : suivre la requête**

Dans le projet `02_garo_no_kronika`, un Horror apparaît et une alerte est déclenchée.
Trace le flux complet de l'événement : depuis le trigger (déclencheur) jusqu'à l'envoi du SSE au Conseil.
Identifie les fichiers impliqués, leur rôle, et les points de défaillance possibles.

---

**EXO 3 : git detective**

Dans un dépôt legacy de type `10_legacy_dungeon`, imagine que tu rencontres ce fragment dans une branche de travail :

```javascript
// workaround temporaire  : à retirer après la migration du calcul de facturation
const amount = calculateLegacyAmount(invoice, { compatibilityMode: true });
```

Le fragment est un **support de drill**, pas une affirmation sur le contenu exact de la fixture fournie. Utilise `git log`, `git blame` et `git show` dans la fixture ou un dépôt autorisé pour rechercher un cas réellement présent. Ne prétends pas que ce fragment existe dans le dépôt si tu ne le retrouves pas.

1. Identifie le commit qui a introduit le contournement, si l'historique le permet.
2. Retrouve le contexte ou la raison consignée dans le commit/PR.
3. Détermine, avec une preuve, si la migration a eu lieu ; sinon indique que l'information reste inconnue.
4. Propose le prochain contrôle sans supprimer le contournement à l'aveugle.

---

## RÉSUMÉ

Lire le terrain avant de lire le code : arborescence, README, ADR, git log.
Suivre une requête de bout en bout : c'est la méthode la plus rapide pour comprendre un système.
Le git log est une source d'information : qui a touché quoi, quand, et pourquoi.
Chercher efficacement : grep, git blame, "Find References" dans VSCode.
Les bonnes questions montrent qu'on a cherché : les mauvaises montrent qu'on n'a pas essayé.

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.

### Transfert : changer de contexte

Applique le mécanisme de « Naviguer un codebase inconnu sans se perdre » à une équipe qui conteste la décision avec des preuves contraires. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Naviguer un codebase inconnu sans se perdre** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Cartographier un changement dans un codebase inconnu

**Mission liée à « Naviguer un codebase inconnu sans se perdre » :** À partir d’une demande Kintana, retrouve les points d’entrée, le propriétaire de l’état, les dépendances, les tests et les frontières touchées. Ne modifie rien avant d’avoir expliqué le trajet.

**Livrable :** Carte de navigation avec chemins, flux de données, tests pertinents et risques de changement.

**Critères d’acceptation :** Chaque affirmation renvoie à un fichier ou une preuve ; les zones inconnues sont signalées ; les dépendances implicites sont listées.

**Transfert obligatoire :** Le point d’entrée supposé est faux : explique comment tu le détectes sans élargir inutilement le changement.
