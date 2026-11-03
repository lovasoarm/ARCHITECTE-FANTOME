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

<!-- AF-DIAGRAM:rto_rpo -->

```text
Incident
│<──── RTO : délai maximal de reprise ────>│
│
└─<── RPO : perte maximale de données ──>│
```

RTO mesure le temps acceptable avant reprise ; RPO mesure la quantité de données acceptable à perdre.

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
  `./16A-ARBORESCENCE.md`).
- Mini-projet `02-CONSTRUCTION/02-MINI-PROJECTS/10_legacy_dungeon/` et
  `02-CONSTRUCTION/02-MINI-PROJECTS/12_legacy_takeover/` : le protocole est la premiere
  chose a executer avant toute modification.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.

### Transfert : changer de contexte

Applique le mécanisme de « Cartographier une codebase inconnue en 15 minutes » à une codebase inconnue et un incident dont les symptômes sont incomplets. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: debug -->

## Repères de décision

- **Pourquoi :** Sans reproduction, un correctif peut masquer le symptôme tout en laissant la cause active. Un diagnostic solide réduit le risque de régression et le temps perdu en production.
- **Quand l’utiliser / quand l’éviter :** Utilise cette méthode dès qu'un défaut est observable mais sa cause incertaine. Évite de modifier plusieurs variables à la fois ou d'ajouter des logs qui exposent des données sensibles.
- **Limites :** Un bug intermittent peut disparaître sous instrumentation. Une reproduction locale peut ne pas contenir la charge, le réseau ou les données du terrain ; conserve les limites de ton diagnostic.

## Mécanisme : la version sans magie

Énonce une hypothèse falsifiable, fixe les entrées, reproduis, collecte un signal ciblé, élimine les hypothèses, corrige puis garde un test de non-régression.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Cartographier une codebase inconnue en 15 minutes** se rattache à ce cas concret : Kintana reçoit un signalement de double demande après un délai réseau. Il faut déterminer s'il s'agit d'un double clic, d'un retry, d'un worker rejoué ou d'une transaction non atomique.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Reproduction et correction d'un incident Kintana

> **Arc Walking Dead :** quand l'alerte sonne, courir dans tous les sens ne sauve personne. Reproduis, isole, mesure, puis répare.

**Mission liée à « Cartographier une codebase inconnue en 15 minutes » :** Reproduis un scénario de double création ou de notification manquante. Écris trois hypothèses classées, collecte un identifiant de corrélation, isole une cause puis ajoute un test qui échoue avant le correctif.

**Livrable :** un rapport d'incident court, les étapes de reproduction, le patch minimal, le test de régression et les limites non reproduites.

**Critères d’acceptation :** la cause est étayée par un signal ; une seule variable principale change à la fois ; le test détecte l'ancien défaut ; les données sensibles sont masquées dans les traces.

**Transfert obligatoire :** Change l'ordre des événements ou ajoute une latence variable. Vérifie si la même hypothèse tient toujours.
