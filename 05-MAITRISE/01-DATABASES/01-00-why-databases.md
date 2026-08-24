---
perennite: perissable
stability: evolutif
duree_de_vie_estimee: 3-5 ans
raison: SQL éternel, moteurs et modes managés bougent.
acte: comprendre
cognitive_level: L3
perturbation_modes: [preuve_partielle, transmission]
anti_recipe_key: preuve_partielle+transmission
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

> **Statut de pérennité :** intemporel | **évolutif** | périssable
> Statut effectif de ce module : **évolutif**. Intemporel = mécanisme de fond (à mémoriser à vie). Évolutif = pratique métier qui bouge (relire tous les 2-3 ans). Périssable = dépend d'une version/vendor (relire tous les 12-18 mois).

> **CE MODULE RÉUTILISE** : structures de données (02-CONSTRUCTION/06-DATA-STRUCTURES), async (01-CADRAGE/02-ASYNC). Scalabilité (05-MAITRISE/02-SCALABILITY, approfondi plus loin dans le fil) : ce module pose les bases (index, requêtes), la vraie scalabilité de la couche données est vue plus tard. Si un de ces prérequis est flou, retourne le voir avant. Ce module ne les réexplique pas.

# Pourquoi ce module mérite ton temps : databases

Temps de lecture ~6 min

> **Durée de vie : 5+ ans.** Barème : intemporel = mécanisme de fond (runtime, mémoire, algo, architecture) ; 5+ ans = pratique métier stable ; 2-3 ans, revenir en 2028 = outils IA / stack en mouvement.

Temps de lecture ~8 min

Ton app peut avoir le frontend le plus poli du monde, l'architecture la plus propre, l'API la mieux documentée : si tes données sont mal modélisées, tout le reste s'effondre dès que le volume augmente. Une requête qui prend 5ms sur 1000 lignes peut en prendre 8 secondes sur 10 millions, juste parce que personne n'a posé un index au bon endroit.

La base de données n'est pas un détail d'infrastructure qu'on configure une fois et qu'on oublie. C'est la fondation qui décide si ton système tient debout à l'échelle ou s'effondre.

---

## 1) LE PROBLÈME QUE ÇA RÉSOUT

Stocker une donnée semble simple : tu mets ça dans une table ou une collection, et ça reste là. Le vrai problème commence quand tu dois la retrouver rapidement, la garder cohérente face à des accès concurrents, et la faire évoluer sans tout casser. Une mauvaise modélisation (relations mal pensées, absence d'index sur les colonnes interrogées souvent, duplication incohérente) transforme une opération qui devrait être instantanée en goulot d'étranglement qui ralentit tout le système.

Ce module couvre les deux grandes familles de bases de données et comment choisir entre elles : le relationnel (SQL, avec JOIN, INDEX, et le langage de requête EXPLAIN pour comprendre comment une requête est exécutée) pour des données structurées avec des relations fortes, et le NoSQL (document, clé-valeur, graphe) pour des cas où la flexibilité du schéma ou la scalabilité horizontale priment sur les relations strictes.

Il couvre aussi la modélisation de données (normalisation pour éviter la duplication, dénormalisation quand la performance de lecture prime sur la pureté du modèle), le cache avec Redis pour absorber la charge sur les données consultées souvent, et l'intégration en JS via des ORM/query builders modernes (Prisma, Drizzle) sans tomber dans le piège classique de l'"ORM hell" (dépendance excessive à l'abstraction qui cache ce qui se passe vraiment côté base de données).

---

## 2) QUI SOUFFRE QUAND ÇA MANQUE

Le dev qui ne modélise pas ses données correctement découvre, une fois l'app en prod avec des vrais volumes, que des requêtes simples deviennent lentes parce qu'aucun index n'a été posé sur les colonnes filtrées en permanence. Le correctif après coup (ajouter un index sur une table déjà énorme en prod) devient une opération risquée et délicate, alors qu'elle aurait coûté zéro effort si elle avait été pensée dès la conception.

Le dev qui choisit NoSQL par mode plutôt que par besoin réel se retrouve à réimplémenter manuellement des relations et des contraintes que le relationnel gérait nativement, ou inversement, force un modèle relationnel rigide sur des données qui auraient été beaucoup plus naturelles dans un document flexible.

Et sans cache bien pensé, chaque lecture d'une donnée consultée des milliers de fois par seconde retape la base de données à chaque fois, ce qui sature le système pour des données qui auraient pu être servies instantanément depuis une couche de cache.

---

## 3) OÙ ÇA APPARAÎT DANS UN VRAI SYSTÈME

```text
recherche fréquente sur une colonne précise      --> index       --> requête rapide même à grande échelle
données fortement relationnelles (personnages, missions) --> SQL        --> intégrité référentielle garantie
données flexibles, schéma qui évolue souvent      --> NoSQL document  --> flexibilité sans migration lourde
donnée consultée des milliers de fois par seconde    --> Redis cache    --> latence quasi nulle
accès JS à la base de données              --> ORM/query builder --> requêtes sûres et lisibles
```

Le choix de la base de données et de sa modélisation n'est jamais "juste un détail technique" : c'est une décision structurelle qui détermine directement la capacité du système à tenir la charge réelle, pas la charge de la démo.

---

## 4) MODERNE, LEGACY, OU INTEMPOREL ?

Le relationnel (SQL) est une technologie mature et stable depuis des décennies, toujours dominante pour la majorité des cas d'usage métier. Le NoSQL est plus récent dans son adoption massive, porté par les besoins de scalabilité horizontale des applications web à très grande échelle. Les deux coexistent aujourd'hui, chacun avec ses cas d'usage légitimes.

---

## 5) CE QUI A CHANGÉ AU FIL DES ANNÉES

Avant, le relationnel dominait presque sans alternative sérieuse pour la majorité des projets web. La montée des applications à très grande échelle (réseaux sociaux, plateformes avec des volumes massifs et une croissance rapide) a popularisé le NoSQL, vendu parfois comme un remplacement universel, ce qui a mené beaucoup d'équipes à l'adopter par mode plutôt que par besoin réel.

Le retour de balancier actuel est plus nuancé : la tendance privilégie de choisir l'outil selon le besoin réel plutôt que la mode, et beaucoup de bases relationnelles modernes (PostgreSQL en tête) ont intégré des capacités proches du NoSQL (stockage de documents JSON natif, par exemple), ce qui réduit le besoin de choisir un camp strict dès le départ.

---

## 6) NOYAU DUR DU MÉTIER ?

Pas dans les 6 blocs prioritaires explicitement listés, mais central dans le mini-projet `05_prison_break_api`, qui combine `02-CONSTRUCTION/19-API-CRAFT`, `03-PILOTAGE/04-SECURITY`, `05-MAITRISE/01-DATABASES`, et `02-CONSTRUCTION/18-WEB-CONCEPTS` pour une infrastructure complète où la modélisation de données et le cache Redis sont des conditions directes de tenue sous pression du système.

---

## 7) POURQUOI ÇA MÉRITE ENCORE TON TEMPS DANS 5 ANS

Peu importe à quel point les outils et les frameworks autour évoluent, le besoin de stocker, retrouver, et garder cohérentes des données à l'échelle reste un problème fondamental et permanent de l'ingénierie logicielle. Comprendre comment une requête est réellement exécutée (via EXPLAIN, par exemple), pourquoi un index change tout, et quand choisir relationnel ou NoSQL : ce sont des compétences qui transcendent l'outil précis utilisé à un instant donné.

---

## CE QUE TU DOIS RETENIR AVANT D'OUVRIR LE CHAPITRE 01

Une base de données mal modélisée transforme un système rapide en démo en système qui s'effondre à l'échelle réelle. Ça casse de trois façons sans cette compréhension : requêtes lentes faute d'index, mauvais choix entre SQL et NoSQL fait par mode, absence de cache qui sature le système. Ce problème reste permanent peu importe les outils du moment.

Maintenant, ouvre `02-sql_basics.md`. Et commence à lire une requête comme quelqu'un qui sait ce qu'elle coûte vraiment.

> Ce module réutilise : les structures de données du `02-CONSTRUCTION/06-DATA-STRUCTURES`, l'asynchrone du `01-CADRAGE/02-ASYNC`.

---

## AILLEURS QUE JS

- **Python (Django ORM, SQLAlchemy)** : les memes N+1, les memes migrations. Vocabulaire identique.
- **Java (JPA/Hibernate)** : ORM historique, memes pieges de lazy loading.
- **Go (sqlx, sqlc)** : plus proche du SQL brut, moins d'abstraction. La lecture de plan (EXPLAIN) reste la meme.
- **Rust (sqlx, diesel)** : verifications a la compilation. La DB reste externe, les regles ACID sont universelles.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.
