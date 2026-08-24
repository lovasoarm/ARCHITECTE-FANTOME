---
perennite: intemporel
stability: intemporel
duree_de_vie_estimee: 10+ ans
raison: Les projets sont des supports, l'exercice de conception ne se démode pas.
acte: comprendre
cognitive_level: L6
perturbation_modes: [decision_inversee, changement_contexte]
anti_recipe_key: decision_inversee+changement_contexte
transfer_distance: high
assessment_role: project_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

> **Statut de pérennité :** **intemporel** | évolutif | périssable
> Statut effectif de ce module : **intemporel**. Intemporel = mécanisme de fond (à mémoriser à vie). Évolutif = pratique métier qui bouge (relire tous les 2-3 ans). Périssable = dépend d'une version/vendor (relire tous les 12-18 mois).

# Pourquoi des projets : la différence entre savoir et pouvoir

> **Durée de vie : 5+ ans.** Barème : intemporel = mécanisme de fond (runtime, mémoire, algo, architecture) ; 5+ ans = pratique métier stable ; 2-3 ans, revenir en 2028 = outils IA / stack en mouvement.
> Temps de lecture ~9 min

Tu peux connaître `Promise.all` par coeur. Savoir ce que c'est. Savoir l'expliquer.
Et rater complètement l'implémentation dès que le contexte est réel.

Parce qu'un exercice vérifie si tu comprends un concept.
Un projet vérifie si tu sais décider sous contrainte, documenter tes choix, et livrer quelque chose qui tient.

C'est pas le même niveau. C'est pas le même cerveau qui travaille.

---

## 1) CE QUE LES PROJETS FONT QU'AUCUNE LEÇON NE PEUT FAIRE

Dans une leçon, le problème est déjà cadré. Tu sais quel concept utiliser.
Tu sais que c'est une leçon sur les closures, donc t'utilises une closure.

Dans un projet, personne ne te dit quoi utiliser.
Tu lis un cahier des charges. Tu identifies les contraintes. Tu décides.
Parfois tu te trompes. Tu documentes pourquoi tu as choisi, et pourquoi tu as changé d'avis.

```text
LEÇON      -> concept donné, problème calibré, solution attendue
MINI-PROJET   -> objectif donné, aucune solution attendue, décisions à prendre
```

La tension entre ce que tu veux faire et ce que les contraintes permettent : c'est ça, le vrai métier.

---

## 2) LES QUATRE LIVRABLES ET CE QU'ILS FONT VRAIMENT

Chaque projet a la même structure :

```text
02-CONSTRUCTION/02-MINI-PROJECTS/XX_nom_du_projet/
├── 00-CAHIER-DES-CHARGES.md   <-- le contrat avant le code
├── README.md        <-- la doc du projet fini
├── 02-TDD-JOURNAL.md     <-- la trace des décisions de test
├── 08-POSTMORTEM.md      <-- ce qui a cassé et ce que tu as appris
├── ADR/          <-- les décisions techniques documentées
├── src/          <-- le code que tu vas créer
└── tests/         <-- les tests que tu vas créer
```

### 00-CAHIER-DES-CHARGES.md : le contrat avant le code

Tu lis ça avant d'ouvrir ton éditeur.
Il définit ce que le projet doit faire, ce qu'il ne doit pas faire, et les contraintes non négociables.
Si tu codes avant de l'avoir lu entièrement : tu vas retravailler. Garanti.

### 02-TDD-JOURNAL.md : la trace des décisions de test

Pas un fichier de résultats de test. Un journal de bord.
Tu y écris pourquoi tu as écrit tel test en premier, ce qu'il a révélé, ce qu'il a forcé à changer dans le code.
C'est la preuve que tu as pensé avant de coder, pas après.

### 08-POSTMORTEM.md : ce qui a cassé

Ce fichier est autant un livrable que le code.
Il documente ce que t'as mal estimé, ce qui a pris trois fois plus de temps que prévu, ce que tu ferrais différemment la prochaine fois.
Ce n'est pas un aveu d'échec. C'est ce que les équipes senior font systématiquement.

### ADR/ : les décisions techniques documentées

ADR = Architecture Decision Record (document de décision d'architecture).
Chaque fois que tu fais un choix non évident : pourquoi tu as utilisé une queue plutôt qu'un tableau, pourquoi JWT plutôt que session, pourquoi PostgreSQL plutôt que MongoDB : tu l'écris dans un ADR.

```text
Pas après avoir codé : avant. Ou pendant. Jamais après.
Un ADR écrit après est une rationalisation, pas une décision.
```

Format minimal d'un ADR :

```md
# ADR-01 : Choix du mécanisme de persistance

## Contexte

Le système de vote CLI doit conserver les scores entre deux sessions.

## Options considérées

- JSON sur le filesystem : simple, lisible, pas de dépendance
- SQLite : requêtes, plus robuste, mais setup plus lourd
- In-memory : zéro persistance, rejette l'exigence

## Décision

JSON sur le filesystem.

## Conséquences

Risque : lecture/écriture concurrente si plusieurs processus tournent en même temps.
Acceptable pour ce cas d'usage (CLI mono-utilisateur).
```

---

## 3) COMMENT ABORDER UN PROJET

```text
ÉTAPE 1 : Lire le 00-CAHIER-DES-CHARGES.md en entier
     Pas en diagonale. En entier.
     Identifier les contraintes qui vont tout changer
     (perf, sécurité, parallélisme, typage strict...)

ÉTAPE 2 : Créer les premiers tests avant le premier fichier src/
     Qu'est-ce que "ça marche" veut dire pour ce projet ?
     Un test qui passe = une définition concrète du succès.

ÉTAPE 3 : Coder le minimum pour faire passer les tests
     Pas l'architecture parfaite. Le minimum qui marche.

ÉTAPE 4 : Documenter en continu
     ADR au moment du choix. POSTMORTEM au fil des erreurs.
     Pas à la fin : à la fin, tu ne te souviens plus des raisons.

ÉTAPE 5 : Refactorer sous le filet des tests
     Si les tests passent toujours après refacto : tu n'as rien cassé.
```

Ce qu'on évite absolument :

```text
- coder pendant une heure sans avoir lu le cahierdescharges en entier
- "je ferai les tests à la fin" (la fin n'arrive jamais)
- "je documenterai plus tard" (plus tard = jamais)
- changer d'architecture à mi-projet sans ADR pour expliquer pourquoi
```

---

## 4) QUEL PROJET ATTAQUER EN PREMIER

La progression recommandée suit la logique du curriculum.
Tu n'as pas besoin de finir tous les modules avant de commencer : chaque projet a ses prérequis propres.

```text
| Projet          | Modules requis     | Moment recommandé    |
|---------------------------|-------------------------|-------------------------|
| 01_rasengan_engine    | 01 + 05 + 11 + 12    | Après module `02-CONSTRUCTION/10-DESIGN-PATTERNS`     |
| 02_garo_no_kronika    | 03 + 04 + 15 + 20    | Après module `04-EPREUVE/03-REALTIME`     |
| 03_walking_dead_protocol | 06 + 13 + 15 + 32    | Après module `05-MAITRISE/07-TOOLS`     |
| 04_breaking_cache     | 08 + 09 + 10      | Après module `02-CONSTRUCTION/07-ALGORITHMS`     |
| 05_prison_break_api    | 17 + 21 + 22 + 24    | Après module `05-MAITRISE/01-DATABASES`     |
| 06_ultras_dashboard    | 14 + 25 + 26      | Après module `03-PILOTAGE/05-OBSERVABILITY`     |
| 07_ballon_dor_cli     | 04 + 13 + 15 + 31    | Après module `05-MAITRISE/06-ANNEXES`     |
| 08_trapsoul_radio     | 14 + 17 + 18 + 19    | Après module `03-PILOTAGE/02-WEB-INCLUSIVE`     |
| 09_oracle_glitch     | 23 + 27 + 28 + 18    | Après module `05-MAITRISE/03-EDGE-CASES`     |
| 10_legacy_dungeon     | 04 + 05 + 06 + 13 + 27  | Après module `03-PILOTAGE/10-TEAM-CRAFT`     |
| 11_scheduler       | 03           | Après module `01-CADRAGE/02-ASYNC`     |
| 12_legacy_takeover    | 04 + 06 + 13 + 27    | Après module `03-PILOTAGE/10-TEAM-CRAFT`     |
| 13_memory_hunter     | 08 + 26         | Après module `03-PILOTAGE/05-OBSERVABILITY`     |
| 14_system_design_lab   | 20 + 21 + 24 + 25 + 26  | Après module `03-PILOTAGE/05-OBSERVABILITY`     |
| 15_porte_rasengan_engine_multilang | 01 + 12 + 14 (portage de 01_rasengan_engine) | Après module `05-MAITRISE/07-TOOLS` |
| 16_distributed_arena   | 03 + 25 + 26      | Après module `03-PILOTAGE/05-OBSERVABILITY`     |
| 17_polyglot_forge     | 03 (event loop) + 15 (mini-projet cross-lang) | Après module `05-MAITRISE/07-TOOLS` |
| 18_human_vs_ai_smell   | 11 + 27 + 28 (revue de code + smells)  | Après module `05-MAITRISE/03-EDGE-CASES` |
| 19_supervise_the_ai    | 16 + 18 (ADR + revue de code IA)    | Après module `05-MAITRISE/03-EDGE-CASES` |
```

Si tu hésite entre deux projets au même niveau : choisis celui dont le contexte narratif t'accroche le plus.
L'engagement sur le contexte change la vitesse de compréhension.

### Deux projets qui peuvent se faire tôt

`01_rasengan_engine` est le projet d'entrée. Il ne touche pas aux APIs, pas à la DB, pas au réseau.
Du JS pur, fonctionnel, immutable. Si tu as fait les module `00-SOCLE/04-FUNDAMENTALS`, 05, 09 et 10 : tu peux y aller.

`04_breaking_cache` est autoportant sur les algos et structures de données.
Aucune dépendance réseau, aucun outil externe. Profilage inclus : tu mesures ce que tu écris.

---

## 5) CE QUE TU DOIS AVOIR COMPRIS APRÈS UN PROJET

Pas juste "j'ai fini le code".

```text
- Tu peux expliquer chaque décision d'architecture sans relire le code
- Tu sais ce que tu aurais fait différemment
- Tu as au moins un ADR par décision non évidente
- Ton POSTMORTEM a au moins une vraie surprise dedans (si tout s'est passé comme prévu, tu n'as pas assez challengé le scope)
- Tes tests auraient détecté les bugs que tu as corrigés en cours de route
```

Si tu peux répondre à ces cinq questions : le projet est terminé. Sinon, il reste du travail.

---

## 6) LA DIFFÉRENCE ENTRE UN PROJET RÉUSSI ET UN PROJET LIVRÉ

Un projet livré : le code tourne, les tests passent, les fichiers `.md` sont présents.

Un projet réussi : tu sortirais ce code en prod sans avoir honte. Pas parce que c'est parfait : parce que tu comprends ses limites, tu les as documentées, et tu as pris des décisions conscientes à chaque carrefour.

Le code qu'on livre sans comprendre : c'est le code qu'on appelle à 3h du matin deux semaines plus tard.

---

---

## PONT AVEC 05-MAITRISE/03-EDGE-CASES

Tu sors des cas limites théoriques et tu entres dans les projets où
l'inattendu arrive en vrai : specs qui bougent, dépendances qui cassent,
codebase inconnue. Les mini-projets sont l'arène où les 54 modules pédagogiques directs
précédents se rencontrent : pas un module de plus, une intégration.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?
