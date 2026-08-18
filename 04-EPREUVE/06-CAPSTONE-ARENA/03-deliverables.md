# Les livrables

## Scène d'ouverture

Comme un forgeron de village qui reçoit une commande vague ("il me faut une lame solide") et
doit décider seul ce qui compte comme "solide" avant de chauffer le métal, tu reçois un brief
et tu dois produire des preuves, pas des promesses. Personne ne validera ton travail sur ta
parole : il sera jugé sur ce que tu livres, comme la lame se juge au tranchant, pas au récit
de la forge.

## Principe

Un livrable capstone n'est pas "du code qui tourne sur ta machine". C'est un ensemble de
preuves vérifiables par quelqu'un qui n'a jamais suivi ton raisonnement. Chaque livrable
ci-dessous doit pouvoir être jugé sans que tu sois présent pour l'expliquer oralement.

## Jalons datés et condition de passage

Le capstone se découpe en trois jalons. Chacun a une fenêtre de jours indicative (comptée à
partir de ton jour de démarrage, J0) et une condition de passage vérifiable, écrite et datée,
avant d'ouvrir le jalon suivant :

```text
J1 Cadrage        (J0 a J4,   budget 4h)   condition : cahier des charges initial redige
                                            + ADR-001 redige et date, seuil challenge.md >= 12/20

J2 Architecture   (J5 a J12,  budget 8h)   condition : schema de donnees fige + contrat d'API
                                            ecrit (endpoints, entrees/sorties) + tests de
                                            concurrence en place, seuil challenge.md >= 12/20

J3 Livraison      (J13 a J32, budget 20h)  condition : POSTMORTEM.md redige + REVUE-DE-RISQUES.md
                                            signee et datee, seuil challenge.md >= 60/100
   dont SEMAINE 2 (J20 a J26)              DOUBLE DERIVE, budget inchange : derive technique
                                            (P95 < 100 ms) ET derive business (tarification
                                            prioritaire) le meme jour simule, sur le meme
                                            livrable -> une seule decision rendue,
                                            DECISION-DOUBLE-DERIVE.md
```

Un jalon ne s'ouvre jamais avant que la condition du précédent soit remplie **et datée** dans
`TDD_JOURNAL.md` : un score atteint sans date de passage écrite ne compte pas comme un jalon
franchi, au même titre qu'une revue de risques non signée ne compte pas comme livrée.

## Livrable 1 : Note de cadrage (1 à 2 pages)

- Reformulation du besoin en une phrase, validée par une relecture du brief.
- Périmètre de la version 1 : ce qui est dedans, ce qui est explicitement reporté, et
  pourquoi (avec l'argument de coût d'opportunité du Niveau 03).
- Les hypothèses explicites que tu as posées face à l'ambiguïté du brief, numérotées, avec
  leur niveau de confiance (haute, moyenne, faible).
- Une estimation en fourchette du délai de la version 1, avec les sources d'incertitude
  nommées.

## Livrable 2 : Architecture (schéma + justification)

- Un schéma des grands composants (frontend, backend, base de données, services externes
  éventuels) au niveau du Niveau 06.
- La justification des choix structurants : pourquoi cette base de données, pourquoi cette
  découpe en services ou modules, avec au moins un compromis explicite écarté et la raison
  de l'avoir écarté.
- Le modèle de données central (schéma ou diagramme), avec une attention particulière au
  modèle qui garantit le comptage de capacité en temps réel sans race condition.
- Un contrat d'API pour les opérations critiques (réservation, comptage de capacité) :
  endpoints, méthode, entrées, sorties, codes d'erreur. C'est ce contrat, daté, qui matérialise
  la condition de passage du jalon J2 décrite ci-dessus.

## Livrable 3 : Version 1 fonctionnelle

- Un système déployé et accessible (même en environnement de démonstration), pas seulement
  en local, couvrant au minimum : compte adhérent partagé entre les trois salles, création de
  créneaux par salle, réservation avec comptage de capacité fiable sous accès concurrent.
- Un jeu de données de démonstration réaliste (trois salles, adhérents, créneaux) qui permet
  de tester le scénario de bout en bout sans configuration manuelle supplémentaire.
- Au moins un test automatisé qui vérifie explicitement que le comptage de capacité résiste à
  deux réservations simultanées sur le dernier créneau disponible : c'est le point le plus
  sensible du brief, il doit être prouvé, pas juste affirmé.

## Livrable 4 : Dossier de suite (roadmap post-V1)

- Liste priorisée de ce qui a été reporté (cours collectifs, prêt de matériel, autres) avec
  une estimation grossière de l'effort pour chaque item.
- Liste des dettes techniques assumées consciemment pendant la V1, avec le risque associé si
  elles ne sont jamais traitées.
- Une proposition de ce que tu ferais pendant la "saison calme en été" mentionnée par le
  client, en lien direct avec les items reportés.

## Livrable 5 : Auto-évaluation

- Ta propre notation sur la grille de `04-evaluation-grid.md`, remplie avant toute revue
  externe, avec une justification écrite pour chaque critère où tu ne t'attribues pas le
  score maximal.


## Livrable 6 : HYPOTHESES.md

- Un fichier `HYPOTHESES.md` à la racine du dépôt, documentant un vrai bug rencontré pendant
  le capstone (pas un exemple inventé après coup), au format à 6 champs imposé par
  [`../14-TOOL-CAVE/03-debugging-toolkit.md`](../02-TOOL-CAVE/03-debugging-toolkit.md) :
  symptôme observable, hypothèse, prédiction falsifiable, expérience, résultat, conclusion.
- Au moins trois hypothèses distinctes, dont au moins une explicitement réfutée par une
  expérience : une auto-évaluation qui ne présente que des hypothèses confirmées du premier
  coup est un signal que l'enquête n'a pas été honnête.
- La preuve que le bug a été rendu reproductible à volonté avant toute tentative de
  correction (seed fixe, sleep contrôlé, injection d'ordonnancement ou harnais de répétition),
  décrite dans le champ "Expérience" de chaque hypothèse concernée.
- La preuve de non-régression après correctif : le test qui échouait doit être relancé au
  moins 200 fois de suite sans échec, avec le résultat de ce harnais consigné dans le
  document.

## Livrable 7 : TRANSFERT.md

- Un fichier `TRANSFERT.md` à la racine du dépôt, au même niveau d'exigence que les six
  livrables précédents, en trois sections.
- **La décision reprise.** Tu choisis une décision déjà validée et notée dans ton propre
  capstone : soit le modèle de données du jalon Architecture (celui qui a résisté à l'analyse
  de concurrence, critère "Justesse architecturale"), soit le contrat d'API du même jalon. Tu
  ne réécris pas tout le projet : tu retranscris une seule décision précise.
- **La retranscription.** La même décision, réécrite en pseudo-code strictement typé
  indépendant de tout langage (pas de syntaxe TypeScript), ou dans un second langage réel de
  ton choix (Python avec SQLAlchemy, Go avec un ORM léger, Java avec JPA). Le niveau
  d'exigence technique reste identique : si la version TypeScript posait une contrainte
  d'exclusion sur une période, la version transférée doit poser l'équivalent exact dans le
  nouveau langage, pas une approximation vague.
- **Ce qui reste vrai, ce qui change, et pourquoi.** Un texte d'une demi-page maximum qui
  nomme précisément ce qui est un mécanisme intemporel (l'invariant métier, la garantie de
  concurrence) et ce qui est une syntaxe remplaçable (la façon d'écrire la contrainte). C'est
  le test réel : qui ne sait pas faire cette distinction n'a pas compris le principe, il a
  mémorisé une syntaxe.

## Analogie

Analogie : des livrables, c'est le dressage attendu au passe, et la liste de matériel vérifiée avant une course.
Où l'analogie casse : une assiette se juge en trois secondes, un dossier de décisions se juge à la relecture, six mois après.

## Ce que tu dois savoir défendre

- Pourquoi le test de concurrence sur le comptage de capacité est un livrable obligatoire et
  non une amélioration optionnelle, compte tenu du contexte du brief.
- Pourquoi une note de cadrage écrite avant le code change la qualité du code produit
  ensuite.
- Ce qui distingue, dans ta roadmap post-V1, une dette technique assumée d'un report de
  fonctionnalité : et pourquoi les deux n'appellent pas le même traitement.
- Pourquoi une hypothèse réfutée dans `HYPOTHESES.md` a autant de valeur qu'une hypothèse
  confirmée pour prouver le sérieux de ton enquête.
- Pourquoi `TRANSFERT.md` distingue un mécanisme intemporel d'une syntaxe remplaçable, et ce
  que révèle sur ta compréhension le fait de confondre les deux.

## Arborescence de livraison imposée

Le dossier final du capstone respecte exactement cette structure. Une arborescence qui
s'écarte de ce gabarit (fichier manquant, dossier renommé, fichier à la racine qui devrait
être dans `ADR/`) est un défaut éliminatoire de la grille, indépendamment de la qualité du
contenu.

```text
capstone/
+-- cahierdescharges.md
+-- README.md
+-- TDD_JOURNAL.md
+-- POSTMORTEM.md
+-- REVUE-DE-RISQUES.md
+-- HYPOTHESES.md
+-- TRANSFERT.md
+-- ADR/
|   +-- ADR-0001-....md
|   \-- ADR-000N-....md
+-- src/
|   \-- (code de la V1)
\-- tests/
    +-- (dont le test de concurrence sur le comptage de capacité)
    \-- (dont le test de contrôle d'accès horizontal : 403 ou 404, jamais 200)
```

- `cahierdescharges.md` : reformulation finale du besoin, incluant les hypothèses du Livrable 1
  et les ajustements survenus après changement de spec (voir `05-changement-de-spec.md`).
- `README.md` : comment lancer le projet, jeu de données de démonstration, limites connues.
- `TDD_JOURNAL.md` : journal daté des décisions de conception et des changements de spec, avec
  leur coût mesuré en fichiers touchés et en heures.
- `POSTMORTEM.md` : ce qui a mal tourné, ce qui a bien tourné, ce que tu ferais différemment.
- `REVUE-DE-RISQUES.md` : revue de risques du projet (sécurité, coûts, données personnelles),
  produite selon le gabarit du Niveau 15 (voir `../15-BONUS-VAULT/challenge.md`).
- `HYPOTHESES.md` : le protocole d'enquête d'un vrai bug rencontré pendant le capstone, au
  format à 6 champs, avec au moins une hypothèse réfutée et la preuve de non-régression sur
  200 exécutions (voir [`../14-TOOL-CAVE/03-debugging-toolkit.md`](../02-TOOL-CAVE/03-debugging-toolkit.md)).
- `TRANSFERT.md` : la retranscription d'une décision du jalon Architecture hors de la stack du
  projet, avec la distinction explicite entre mécanisme intemporel et syntaxe remplaçable.
- `ADR/` : un fichier par décision structurante, au format du Niveau 15
  (`../15-BONUS-VAULT/01b-decision-templates.md`).
- `src/` : le code de la V1.
- `tests/` : les tests automatisés, en particulier celui qui prouve la résistance du comptage
  de capacité à l'accès concurrent, et celui qui prouve qu'un accès non autorisé à la
  ressource d'un autre adhérent est bloqué.

## Revue de risques : contenu minimal de REVUE-DE-RISQUES.md

Le fichier `REVUE-DE-RISQUES.md` couvre au minimum trois familles de risques, chacune avec au
moins deux risques identifiés, une probabilité, un impact et une mitigation :

```text
Sécurité            : ex. accès concurrent au comptage de capacité, fuite de session
Coûts                : ex. dépassement du délai de deux mois, dépendance à un service payant
Données personnelles : ex. données d'adhérents partagées entre trois salles indépendantes
```

Le scénario de contrôle d'accès horizontal décrit dans
[`../15-BONUS-VAULT/05-security-cost-privacy.md`](../01-BONUS-VAULT/05-security-cost-privacy.md)
(accès à la réservation d'un autre adhérent en modifiant l'identifiant dans l'URL) doit être
couvert par au moins un test dans `tests/`, au même titre que le test de concurrence déjà
exigé sur le comptage de capacité : une requête non autorisée doit retourner 403 ou 404,
jamais 200 avec les données de la victime.

Ce fichier doit être signé et daté par toi avant la présentation finale : une revue de
risques non signée ne compte pas comme livrée, au même titre qu'une note de cadrage non
datée.

## Compromis

| Option                                                   | Coût                                              | Bénéfice                                                    | Quand choisir                                                          |
| --------------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Livrer les 7 fichiers imposés à la lettre                | Rigueur, temps de rédaction incompressible          | Zéro ambiguïté pour un relecteur externe, critère éliminatoire acquis | Toujours, sauf accord explicite écrit avec ton formateur pour en substituer un |
| Fusionner deux livrables proches (ex. cadrage + roadmap) | Gain de temps apparent                              | Aucun : casse l'arborescence imposée, défaut éliminatoire        | Jamais dans ce niveau                                                        |
| Documenter un livrable "en cours" plutôt que complet     | Honnêteté sur l'avancement réel                     | Note la vérité plutôt qu'une façade ; peut coûter des points mais pas la note globale | Si le temps manque sur J3 : préférable à un livrable inventé au dernier moment |

## Pièges classiques

- **Livrer du code sans les preuves qui l'accompagnent.** Symptôme : tu ne peux pas répondre
  en une phrase à "montre-moi le test qui prouve la résistance à la concurrence".
- **Confondre livrable daté et livrable présent.** Symptôme : `POSTMORTEM.md` existe mais ne
  porte aucune date, donc rien ne prouve qu'il a été écrit avant la présentation finale.
- **Ouvrir le jalon suivant sans avoir écrit la condition de passage du jalon précédent.**
  Symptôme : tu codes déjà l'architecture alors que ta note de cadrage n'a jamais été relue ni
  datée.
- **Traiter l'arborescence de livraison comme un détail de forme.** Symptôme : un fichier à la
  racine qui devrait être dans `ADR/`, ce qui plafonne le score à 0/200 quelle que soit la
  qualité du contenu.

---

## Ajout ARCHITECTE-FANTOME : les quatre pièces Staff Engineer

En plus des livrables ci-dessus, le capstone du fil fusionné exige quatre pièces croisées sur le même projet : ADR d'architecture, budget cloud chiffré, SLO écrit avec son budget d'erreur, et une famille au choix parmi produit, leadership et IA. Les règles exactes et la section obligatoire "Les trois tensions" sont dans [06-addendum-staff-engineer.md](06-addendum-staff-engineer.md).

## Livrable 6 : DECISION-DOUBLE-DERIVE.md (semaine 2 du jalon Livraison)

La semaine 2 de J3 fait tomber la derive technique et la derive business le meme jour simule,
sur le meme livrable, a budget constant. Tu rends **une seule** decision ecrite qui absorbe les
deux et nomme la contradiction. Protocole complet et criteres binaires :
[07-semaine-double-derive.md](07-semaine-double-derive.md).
