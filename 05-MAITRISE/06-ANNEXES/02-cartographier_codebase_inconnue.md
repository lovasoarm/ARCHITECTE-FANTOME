---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [fausse_piste, transmission]
anti_recipe_key: fausse_piste+transmission
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Cartographier une codebase inconnue en 15 minutes

<!-- AF-DIAGRAM:codebase_map -->

## Repère visuel : carte minimale d'une codebase

```text
README / package / config
          |
          v
    point d'entrée
          |
          v
 route / CLI / UI
          |
          v
 cas d'usage / service
      |          \
      v           v
 repository    API externe
      |
      v
 base / fichier

Tests : unitaires -> intégration -> parcours complet
Transversal : auth, config, logs, métriques
```

Les flèches sont des dépendances ou appels à confirmer dans le dépôt ; marque les liens supposés `À VÉRIFIER` tant que tu n'as pas suivi les références ou les tests.

Temps de lecture ~3 min

-> ~10 min lecture, 15 min drill

Protocole reproductible, sans IA, sans lire le code ligne à ligne. À la sortie,
tu sais **où on entre**, **où on sort**, **où c'est testé**, **où c'est fragile**.
C'est la compétence Pierre 6 qui sépare le Kick-Ass du Thor.

## Les 6 étapes (2-3 min chacune, chrono)

### 1. `README.md` : 90 secondes

Lis. Cherche 3 choses seulement :

- à quoi ça sert (une phrase)
- comment on lance ça en local (une requête)
- ce qui est promis (contrats externes, endpoints, formats)
  Note : si le README n'a pas ces 3 choses, c'est déjà un signal.

### 2. `package.json` : 90 secondes

- champ `scripts` : c'est la table des matières exécutable du projet.
- champ `dependencies` vs `devDependencies` : les runtime lourds (framework HTTP,
  ORM, moteur de rendu) te donnent la forme du projet en 3 secondes.
- champ `main` / `exports` / `bin` : les points d'entrée déclarés.

### 3. Point(s) d'entrée : 3 min

- `main`/`bin` ou `src/index.*` / `src/server.*` / `src/cli.*`.
- Ouvre le fichier. Note en 5 lignes : qui il importe, qui l'appelle.
- Trace un mini schéma ASCII : entree -> module X -> module Y -> sortie.

### 4. `tests/` : 3 min

Les tests documentent l'intention. Ouvre 3 fichiers de tests au hasard.

- Nom des `describe` / `it` : c'est la spec vivante.
- Fixtures (dossier `__fixtures__` ou `tests/data/`) : format des entrées reelles.
  Si aucun test : gros signal, note-le dans ton dessin final.

### 5. `git log --oneline -50` (ou `--stat`) : 2 min

- Les 10 derniers commits te disent l'humeur du repo (feature, bugfix, refacto,
  panique). Les zones qui bougent souvent sont les zones fragiles.
- `git shortlog -sn` : qui connait quoi.

### 6. Dessin ASCII final : 3 min

Sur papier ou dans un fichier `CARTE.md` local :

```json
[ CLI / HTTP ]
      |
      v
[ src/router.* ]---> [ auth ]     [ db/repo ]
      |                              ^
      v                              |
[ services/* ] --------------------- +
      |
      v
[ tests/ : happy path OK, edge cases minces ]
FRAGILE : services/payment.ts (10 commits en 2 semaines)
```

Ce dessin est le livrable. Il tient sur un post-it. Si tu ne peux pas le
dessiner, tu n'as pas encore cartographie : rejoue les etapes qui manquent.

## Ce qui n'est PAS dans le protocole (et pourquoi)

- **Lire tout le code** : non. Tu ne peux pas en 15 min. Tu veux la carte,
  pas le territoire.
- **Ouvrir l'IDE pour explorer les references** : plus tard. La carte d'abord,
  le zoom apres.
- **Demander a l'IA "explique-moi ce repo"** : le protocole existe justement
  pour t'en passer. La reponse IA est plausible, pas verifiable.

## Drill de validation

Prends un repo OSS que tu n'as jamais lu (ex : `expressjs/express`,
`sindresorhus/ky`, `pinojs/pino`). Chronomètre 15 min. Livre un `CARTE.md`.
Puis compare avec la doc officielle. Ecart = angle mort personnel a corriger.

## Où l'analogie casse

On dit "carte". Une vraie carte est stable, une codebase change chaque
semaine : ta carte a une date de peremption. Refais-la si tu reviens
apres 2 mois.

## Livrable exige

- `CARTE.md` avec les 6 sections remplies + un dessin ASCII.
- Une phrase "zone la plus fragile a mon avis, pourquoi".
- Une phrase "ce qui me manque encore pour toucher au code".

## Ou l'exercer

- `EXO_LECTURE.md` de tous les modules qui en portent un (voir liste dans
  `./ARBORESCENCE-CURRICULUM.md`).
- Mini-projet `02-CONSTRUCTION/02-MINI-PROJECTS/10_legacy_dungeon/` et
  `02-CONSTRUCTION/02-MINI-PROJECTS/12_legacy_takeover/` : le protocole est la premiere
  chose a executer avant toute modification.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.

### Transfert : changer de contexte

Applique le mécanisme de « Cartographier une codebase inconnue en 15 minutes » à une codebase inconnue et un incident dont les symptômes sont incomplets. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: architecture -->

## Repères de décision

- **Pourquoi :** La carte d'une codebase inconnue réduit les modifications à l'aveugle et montre où vivent les responsabilités, dépendances, tests et risques.
- **Quand l’utiliser / quand l’éviter :** Utilise-la avant une reprise, une migration, une revue ou un diagnostic. Ne prétends pas comprendre tout le dépôt après une lecture de quinze minutes : la carte doit signaler les zones inconnues.
- **Limites :** Les conventions et noms de dossiers ne prouvent pas les dépendances réelles. Vérifie les points d'entrée, appels, configurations et tests ; marque les hypothèses non confirmées.

## Mécanisme : la version sans magie

Repère les manifestes et scripts, suis un flux représentatif depuis son point d'entrée jusqu'à ses dépendances, localise les tests correspondants, relève les configurations et frontières, puis dessine la carte avec ses sources et ses inconnues.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Cartographier une codebase inconnue en 15 minutes** se rattache à ce cas concret : un nouvel ingénieur doit retrouver le parcours d'une création de demande. Il identifie le point d'entrée, le cas d'usage, la persistance, les intégrations, les contrôles d'accès et les tests avant de proposer un changement.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Cartographier un dépôt inconnu

> **Arc :** avant de réparer un vaisseau, repère le cockpit, les circuits, les alimentations et les pièces qui peuvent se bloquer ensemble.

**Mission liée à « Cartographier une codebase inconnue en 15 minutes » :** prends un dépôt que tu ne connais pas. En quinze minutes, sans demander à une IA de résumer le repo, trouve ses commandes d'entrée, ses manifestes, un parcours fonctionnel représentatif, ses principaux modules/dépendances, ses tests, sa configuration et une zone fragile à vérifier. Suis les références utiles plutôt que de lire tous les fichiers.

**Livrable :** `CARTE.md` avec les six éléments : (1) commandes et points d'entrée ; (2) flux fonctionnel principal ; (3) modules et responsabilités ; (4) dépendances externes et données ; (5) tests et commandes de vérification ; (6) zones fragiles, inconnues et sources consultées. Ajoute un diagramme ASCII lisible et la date de la carte.

**Critères d’acceptation :** chaque flèche du diagramme est confirmée par un fichier, une référence ou une commande, ou marquée `À VÉRIFIER` ; les tests cités existent ; les limites sont explicites ; aucune modification du code n'est requise pour réussir l'exercice.

**Transfert obligatoire :** applique la même méthode à un dépôt d'un autre langage ou à un service dont le point d'entrée est une CLI au lieu d'une API HTTP. Identifie ce qui change dans la carte et ce qui reste invariant.
