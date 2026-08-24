---
stability: intemporel
audience: apprenant
scope: 'template MAP_15MIN : "lire 10x mieux qu''ecrire"'
acte: comprendre
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# MAP_15MIN.md : template standardise (livrable obligatoire)

Objectif : convertir la promesse _"lire 10x mieux qu'ecrire"_ en artefact
verifiable. Tu passes **15 minutes chrono** a lire un codebase (le mini-projet
legacy, l'EXO_LECTURE cible, ou le code que tu reprends) SANS ecrire une ligne
de code, et tu produis cette carte.

Livrable obligatoire dans :

- `02-CONSTRUCTION/02-MINI-PROJECTS/10_legacy_dungeon/`
- `02-CONSTRUCTION/02-MINI-PROJECTS/12_legacy_takeover/`
- `EXO_LECTURE` des blocs "Systeme web complet" (02-CONSTRUCTION/18-WEB-CONCEPTS,
  04-EPREUVE/03-REALTIME, 02-CONSTRUCTION/19-API-CRAFT) et "Ingenierie senior" (05-MAITRISE/02-SCALABILITY,
  03-PILOTAGE/05-OBSERVABILITY, 03-PILOTAGE/10-TEAM-CRAFT).

## Regles de remplissage (chrono 15 min)

- **5 min** : cartographie fichiers -> ce qui se lit / ce qui s'ignore.
- **5 min** : chemin critique -> par ou entre la donnee, par ou elle sort.
- **3 min** : points chauds -> ce qui a l'air fragile.
- **2 min** : hypotheses -> 3 max, chacune verifiable.

Tu depasses 15 min => tu t'arretes et tu notes que tu as depasse. Le chrono
est un signal, pas une punition.

---

## 1. Contexte (2 lignes)

- Codebase / cible :
- Pourquoi je le lis (une phrase, verbe d'action) :

## 2. Cartographie (5 min)

| Fichier / dossier | Role suppose | Priorite de lecture (1..3) |
| ----------------- | ------------ | -------------------------- |
|                   |              |                            |

## 3. Chemin critique (5 min)

Entree utilisateur -> ... -> sortie observable. En 5 fleches maximum.

```json
[entree] -> [???] -> [???] -> [???] -> [sortie]
```

## 4. Points chauds (3 min)

Ce qui semble fragile, mal nomme, ou trop couple. 3 items, pas plus.

1.
2.
3.

## 5. Hypotheses de comportement (2 min)

Chaque hypothese est **testable** en < 5 min (une commande, un input, une
sortie attendue). Elles s'ecrivent aussi dans `HYPOTHESES.md`.

- H1 (verifiable par : ...) :
- H2 (verifiable par : ...) :
- H3 (verifiable par : ...) :

## 6. Ce que je ne lirai PAS aujourd'hui

Une liste. C'est le plus important. Ce n'est pas "je ne comprends pas",
c'est "je choisis de ne pas lire, et je saurai pourquoi si on me le demande".

## Critere de reussite binaire

- [ ] 15 min chrono respectees (ou depassement documente)
- [ ] Cartographie non vide
- [ ] Chemin critique en une seule ligne de fleches
- [ ] Exactement 3 points chauds
- [ ] Exactement 3 hypotheses testables
