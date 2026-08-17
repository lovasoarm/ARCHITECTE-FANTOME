---
stability: intemporel
acte: restituer
---

# Page verrouillée

> Rappel : ce grimoire simplifie via analogies. Lire d'abord [`05-MAITRISE/06_annexes/GRIMOIRE_CODE_HONNEUR.md`](../06_annexes/18_GRIMOIRE_CODE_HONNEUR.md).

Temps de lecture ~13 min

> **Interdit de lire cette page avant d'avoir coché la checklist ci-dessous.**
> Un grimoire lu trop tôt donne l'illusion de savoir. C'est le pire piège pédagogique.

## Checklist prérequis

- [ ] J'ai fini **tous** les exercices du module courant.
- [ ] J'ai réussi le `00_prereq_check.md` du module suivant.
- [ ] J'ai écrit **au moins un** de mes propres exemples (pas copié).
- [ ] Je peux réexpliquer les 3 concepts phares du module **sans regarder**.

Si une seule case n'est pas cochée : ferme ce fichier. Reviens plus tard.

---

## Tout le vocabulaire DB en un seul endroit

Le grimoire du module 24. Pas un résumé : la référence complète que tu rouvres quand un terme te bloque, en review de code ou en lisant une doc technique.

---

| Terme | Définition | Code | Analogies | Limite |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- / meme mecanique cote football : le staff repete jusqu'a ce que la tactique tienne sans le tableau | « -------------------------------------------------------------------... » décrit un monde où chaque étape se voit ; sur ----------------------------------, un verrou pris trop longtemps transforme un pic de charge en file d'attente. Chiffre le décalage de réplication acceptable pour ton cas. |
| DB relationnelle | Données rangées en tables avec un schéma fixe et des relations explicites entre elles. | `CREATE TABLE ninjas (id INT, name TEXT);` | classeur à compartiments fixes de Konoha / fiche de mission Prison Break, toujours le même format | « classeur à compartiments fixes de Konoha » se corrige toute seule quand elle dérape ; sur DB relationnelle, la migration s'exécute sur des données réelles, sales et volumineuses, pas sur ton jeu de test. Teste la migration sur une copie de volume réel. |
| SQL | Langage standard pour interroger et manipuler une DB relationnelle. | `SELECT * FROM ninjas WHERE id = 1;` | langue commune à toutes les DB relationnelles / les ordres radio entre Chevaliers Garo, même protocole partout | « langue commune à toutes les DB relationnelles » se rejoue à l'identique, le code non ; sur SQL, la réplication introduit un décalage de lecture qui rend un enregistrement écrit invisible. Lis le plan d'exécution avant d'ajouter un index. |
| SELECT | Instruction pour lire des données, en choisissant les colonnes voulues. | `SELECT id, chakra FROM ninjas;` | demander juste 2 infos sur la fiche de Michael Scofield / extraire 2 stats d'un combattant sans tout le dossier | « demander juste 2 infos sur la fiche de Michael Scofield » tient tant que rien ne tombe en route ; sur SELECT, la migration s'exécute sur des données réelles, sales et volumineuses, pas sur ton jeu de test. Mesure le temps de verrou, pas seulement le temps de requête. |
| WHERE | Filtre les lignes selon une condition avant de les retourner. | `WHERE rank = 'jonin'` | le tri des Horrors par menace dans Garo / le filtre de Kakashi sur les missions trop dangereuses | « le tri des Horrors par menace dans Garo » raconte le cas nominal ; sur WHERE, le niveau d'isolation décide de ce que deux transactions concurrentes voient l'une de l'autre. Lis le plan d'exécution avant d'ajouter un index. |
| JOIN | Recolle deux tables séparées via une colonne commune. | `JOIN villages ON ninjas.village_id = villages.id` | relier le dossier d'un prisonnier à son bloc cellulaire / connecter un ninja à son village d'origine | « relier le dossier d'un prisonnier à son bloc cellulaire » tient tant que rien ne tombe en route ; sur JOIN, supprimer une colonne encore lue par un ancien déploiement casse la production en pleine bascule. Mesure le temps de verrou, pas seulement le temps de requête. |
| INNER JOIN | Garde seulement les lignes qui matchent dans les deux tables. | `INNER JOIN missions ON m.ninja_id = n.id` | seulement les ninjas qui ont une mission active / l'intersection entre les évadés et ceux qui ont un plan | « seulement les ninjas qui ont une mission active » n'a ni facture ni horloge ; sur INNER JOIN, le niveau d'isolation décide de ce que deux transactions concurrentes voient l'une de l'autre. Mesure le temps de verrou, pas seulement le temps de requête. |
| LEFT JOIN | Garde toutes les lignes de la table de gauche, même sans match à droite. | `LEFT JOIN missions ON m.ninja_id = n.id` | tous les ninjas du village, mission ou pas / tous les survivants du camp, qu'ils aient une tâche assignée ou non | « tous les ninjas du village, mission ou pas » suppose que quelqu'un surveille ; sur LEFT JOIN, une jointure sur une table qui grossit change de plan d'exécution sans prévenir. Chiffre le décalage de réplication acceptable pour ton cas. |
| INDEX | Structure annexe qui accélère la recherche sur une colonne. | `CREATE INDEX idx_chakra ON ninjas(chakra_level);` | la table des matières du grimoire des jutsus / le répertoire des fréquences radio de Garo, trié par secteur | « la table des matières du grimoire des jutsus » se rejoue à l'identique, le code non ; sur INDEX, l'index accélère la lecture et ralentit chaque écriture, l'image n'en montre qu'un côté. Lis le plan d'exécution avant d'ajouter un index. |
| EXPLAIN | Affiche le plan d'exécution réel choisi par la DB pour une requête. | `EXPLAIN SELECT * FROM missions WHERE id = 1;` | la reconnaissance avant l'assaut de Michael / l'analyse tactique de Kakashi avant un combat | « la reconnaissance avant l'assaut de Michael » suppose que quelqu'un surveille ; sur EXPLAIN, une jointure sur une table qui grossit change de plan d'exécution sans prévenir. Lis le plan d'exécution avant d'ajouter un index. |
| Full table scan | La DB lit toutes les lignes d'une table car aucun index ne peut aider. | (visible dans le résultat d'`EXPLAIN` comme `Seq Scan`) | fouiller toute la prison de Fox River cellule par cellule / éplucher tout le bestiaire de Horrors sans filtre | « fouiller toute la prison de Fox River cellule par cellule » s'arrête à la première surprise ; sur Full table scan, l'index accélère la lecture et ralentit chaque écriture, l'image n'en montre qu'un côté. Teste la migration sur une copie de volume réel. |
| GROUP BY | Regroupe les lignes par valeur commune pour appliquer une agrégation. | `GROUP BY village` | classer les ninjas par village d'origine / regrouper les buts du Ballon d'Or par équipe | « classer les ninjas par village d'origine » a une frontière visible à l'oeil ; sur GROUP BY, la normalisation réduit la duplication et multiplie les jointures : le compromis est chiffrable. Chiffre le décalage de réplication acceptable pour ton cas. |
| HAVING | Filtre les groupes après agrégation, contrairement à WHERE qui filtre avant. | `GROUP BY village_id HAVING COUNT(*) > 10` | ne garder que les villages avec plus de 10 ninjas actifs / les équipes avec plus de 50 buts sur la saison | « ne garder que les villages avec plus de 10 ninjas actifs » a une frontière visible à l'oeil ; sur HAVING, la réplication introduit un décalage de lecture qui rend un enregistrement écrit invisible. Lis le plan d'exécution avant d'ajouter un index. |
| Transaction | Bloc d'opérations exécutées comme un tout : tout passe, ou rien ne passe. | `BEGIN; ... COMMIT;` | le plan d'évasion de Michael : chaque étape ou rien, pas de demi-mesure / le rituel Garo, complet ou annulé | « le plan d'évasion de Michael : chaque étape ou rien, pas de... » tient tant que rien ne tombe en route ; sur Transaction, le niveau d'isolation décide de ce que deux transactions concurrentes voient l'une de l'autre. Teste la migration sur une copie de volume réel. |
| ACID | Garanties d'une transaction fiable : atomicité, cohérence, isolation, durabilité. | (propriété du moteur DB, pas une instruction SQL) | le serment des Chevaliers Garo, incassable / le plan tatoué de Michael, jamais à moitié exécuté | « le serment des Chevaliers Garo, incassable » se corrige toute seule quand elle dérape ; sur ACID, le niveau d'isolation décide de ce que deux transactions concurrentes voient l'une de l'autre. Teste la migration sur une copie de volume réel. |
| Injection SQL | Faille où une entrée non filtrée devient du code SQL exécuté. | `'OR '1'='1` glissé dans un champ texte | T-Bag qui glisse un faux ordre dans le système de la prison / un Horror qui se déguise en humain pour entrer | « T-Bag qui glisse un faux ordre dans le système de la prison » s'arrête à la première surprise ; sur Injection SQL, un verrou pris trop longtemps transforme un pic de charge en file d'attente. Chiffre le décalage de réplication acceptable pour ton cas. |
| Requête paramétrée | Requête où les valeurs sont séparées du SQL, jamais concaténées en string. | `db.query('... WHERE id = $1', [id])` | le bulletin de vote séparé de l'enveloppe / le badge d'accès vérifié indépendamment du nom annoncé | « le bulletin de vote séparé de l'enveloppe » s'arrête à la première surprise ; sur Requête paramétrée, la normalisation réduit la duplication et multiplie les jointures : le compromis est chiffrable. Mesure le temps de verrou, pas seulement le temps de requête. |
| Normalisation | Discipline qui élimine la duplication d'un même fait dans plusieurs tables. | `jutsus` séparé de `ninjas`, référencé par `ninja_id` | un seul registre des Horrors consulté par tous les Chevaliers / une seule liste des évadés, pas une copie par garde | « un seul registre des Horrors consulté par tous les Chevaliers » se corrige toute seule quand elle dérape ; sur Normalisation, la normalisation réduit la duplication et multiplie les jointures : le compromis est chiffrable. Mesure le temps de verrou, pas seulement le temps de requête. |
| Dénormalisation | Duplication volontaire de données pour accélérer la lecture ou figer un historique. | `combats.degats_au_moment_T` copié au moment du coup | la photo du score figée à la mi-temps / le rapport de mission de Garo, figé tel qu'il a été rédigé sur le terrain | « la photo du score figée à la mi-temps » se corrige toute seule quand elle dérape ; sur Dénormalisation, la migration s'exécute sur des données réelles, sales et volumineuses, pas sur ton jeu de test. Teste la migration sur une copie de volume réel. |
| Clé primaire (Primary Key) | Identifiant unique d'une ligne dans sa propre table. | `id SERIAL PRIMARY KEY` | le numéro de plaque d'immatriculation d'un ninja au bingo / le matricule de prisonnier à Fox River | « le numéro de plaque d'immatriculation d'un ninja au bingo » n'a ni facture ni horloge ; sur Clé primaire (Primary Key), une jointure sur une table qui grossit change de plan d'exécution sans prévenir. Chiffre le décalage de réplication acceptable pour ton cas. |
| Clé étrangère (Foreign Key) | Référence vers la clé primaire d'une autre table, garantit l'intégrité. | `village_id INT REFERENCES villages(id)` | le renvoi vers le dossier complet du village / le lien obligatoire entre un Chevalier et son armure assignée | « le renvoi vers le dossier complet du village » s'arrête à la première surprise ; sur Clé étrangère (Foreign Key), une jointure sur une table qui grossit change de plan d'exécution sans prévenir. Chiffre le décalage de réplication acceptable pour ton cas. |
| Table de jointure (junction table) | Table intermédiaire qui gère une relation many-to-many. | `ninja_jutsus(ninja_id, jutsu_id)` | le carnet de qui-connaît-quel-jutsu, sans dupliquer ni les ninjas ni les jutsus / la liste des alliances entre Chevaliers et Horrors traqués | « le carnet de qui-connaît-quel-jutsu, sans dupliquer ni les ninjas... » se corrige toute seule quand elle dérape ; sur Table de jointure (junction table), une jointure sur une table qui grossit change de plan d'exécution sans prévenir. Teste la migration sur une copie de volume réel. |
| NoSQL | Famille de DB qui s'écarte du modèle relationnel strict pour gagner en flexibilité ou en vitesse. | MongoDB, Redis, Cassandra, Neo4j | la boîte à outils modulaire de Walter White, pas un classeur figé / le carnet de terrain de Rick, des notes libres, pas un tableau rigide | « la boîte à outils modulaire de Walter White, pas un classeur figé » se corrige toute seule quand elle dérape ; sur NoSQL, supprimer une colonne encore lue par un ancien déploiement casse la production en pleine bascule. Mesure le temps de verrou, pas seulement le temps de requête. |
| DB document | Stocke des objets JSON-like à schéma flexible, pas de table fixe. | `{ _id: 1, nom: "Naruto", jutsus: ["Rasengan","Kage Bunshin"] }` | le dossier perso d'un survivant, avec autant de notes que nécessaire / la fiche libre d'un ninja, pas un formulaire standardisé | « le dossier perso d'un survivant, avec autant de notes que nécessaire » décrit un monde où chaque étape se voit ; sur DB document, la réplication introduit un décalage de lecture qui rend un enregistrement écrit invisible. Lis le plan d'exécution avant d'ajouter un index. |
| DB clé-valeur | Stocke une valeur accessible directement par une clé unique, ultra rapide. | `redis.set('combat:42', etat)` | le casier numéroté du vestiaire des Chevaliers Garo / la fréquence radio dédiée d'un survivant, accès direct | « le casier numéroté du vestiaire des Chevaliers Garo » se rejoue à l'identique, le code non ; sur DB clé-valeur, un verrou pris trop longtemps transforme un pic de charge en file d'attente. Lis le plan d'exécution avant d'ajouter un index. |
| DB colonne large | Optimisée pour écrire et lire des volumes massifs répartis sur plusieurs machines. | Cassandra, ScyllaDB | l'armée entière de clones de Naruto répartie sur tout le champ de bataille / le réseau de distribution de Walter, étalé sur plusieurs villes | « l'armée entière de clones de Naruto répartie sur tout le champ de... » se rejoue à l'identique, le code non ; sur DB colonne large, supprimer une colonne encore lue par un ancien déploiement casse la production en pleine bascule. Mesure le temps de verrou, pas seulement le temps de requête. |
| DB graphe | Stocke les relations comme structure de première classe, pas comme jointure. | `MATCH (a)-[:ALLIE_DE]->(b) RETURN b` | la carte des alliances entre clans ninja / le réseau de contacts de Michael à travers tout le pays | « la carte des alliances entre clans ninja » a une frontière visible à l'oeil ; sur DB graphe, l'index accélère la lecture et ralentit chaque écriture, l'image n'en montre qu'un côté. Chiffre le décalage de réplication acceptable pour ton cas. |
| Eventual consistency | Garantie que la donnée finira par être cohérente partout, mais pas instantanément. | (comportement par défaut de beaucoup de DB distribuées) | la rumeur d'une attaque qui finit par atteindre tout le village / l'info qui circule lentement entre les groupes de survivants | « la rumeur d'une attaque qui finit par atteindre tout le village » tient tant que rien ne tombe en route ; sur Eventual consistency, l'index accélère la lecture et ralentit chaque écriture, l'image n'en montre qu'un côté. Teste la migration sur une copie de volume réel. |
| Cache | Couche de stockage temporaire et rapide qui évite de recalculer ou re-requêter. | `redis.get('classement:balondor')` | le carnet de notes de Kakashi sur les ninjas déjà évalués / le tableau de bord déjà affiché du dashboard ultras | « le carnet de notes de Kakashi sur les ninjas déjà évalués » s'arrête à la première surprise ; sur Cache, un verrou pris trop longtemps transforme un pic de charge en file d'attente. Chiffre le décalage de réplication acceptable pour ton cas. |
| TTL (time to live) | Durée de vie d'une donnée en cache avant expiration automatique. | `redis.set('armure:99', etat, 'EX', 99)` | le compte à rebours de 99,9 secondes de l'armure Garo / le ticket de garde qui expire à la fin du tour | « le compte à rebours de 99,9 secondes de l'armure Garo » décrit un monde où chaque étape se voit ; sur TTL (time to live), la normalisation réduit la duplication et multiplie les jointures : le compromis est chiffrable. Lis le plan d'exécution avant d'ajouter un index. |
| Cache HIT / MISS | HIT = la donnée était en cache. MISS = elle n'y était pas, il faut aller la chercher. | `if (cached) { /* HIT */ } else { /* MISS */ }` | trouver direct le bon jutsu dans le grimoire ouvert à la bonne page / devoir redescendre fouiller les archives de Fox River | « trouver direct le bon jutsu dans le grimoire ouvert à la bonne page » n'a ni facture ni horloge ; sur Cache HIT / MISS, supprimer une colonne encore lue par un ancien déploiement casse la production en pleine bascule. Mesure le temps de verrou, pas seulement le temps de requête. |
| Invalidation de cache | Suppression ou mise à jour du cache quand la donnée source change. | `redis.del('classement:balondor')` après un nouveau vote | jeter le brouillon de stratégie périmé après un nouveau plan / mettre à jour le tableau de menace du camp | « jeter le brouillon de stratégie périmé après un nouveau plan » n'a ni facture ni horloge ; sur Invalidation de cache, une jointure sur une table qui grossit change de plan d'exécution sans prévenir. Teste la migration sur une copie de volume réel. |
| Cache stampede | Des milliers de requêtes recalculent en même temps une donnée juste expirée. | (corrigé avec un lock, voir `04_redis_caching`) | toute la foule des ultras qui se précipite au même moment sur le live / tous les Chevaliers qui interrogent le réseau en même temps après une coupure | « toute la foule des ultras qui se précipite au même moment sur le live » suppose un seul acteur à la fois ; sur Cache stampede, la réplication introduit un décalage de lecture qui rend un enregistrement écrit invisible. Mesure le temps de verrou, pas seulement le temps de requête. |
| Cache-aside | Stratégie où l'appli vérifie le cache d'abord, sinon va en DB et remplit le cache. | voir `getClassement(saison)` dans `04_redis_caching` | demander à Kakashi avant d'aller fouiller les archives du village / vérifier le tableau de mission avant d'appeler le QG | « demander à Kakashi avant d'aller fouiller les archives du village » s'arrête à la première surprise ; sur Cache-aside, la migration s'exécute sur des données réelles, sales et volumineuses, pas sur ton jeu de test. Lis le plan d'exécution avant d'ajouter un index. |
| Write-through | Stratégie où chaque écriture DB met aussi à jour le cache immédiatement. | écrire en DB + `redis.set` dans la même opération | mise à jour simultanée du rapport de mission et du tableau de bord du QG / double inscription immédiate sur le registre des Chevaliers | « mise à jour simultanée du rapport de mission et du tableau de bord... » se corrige toute seule quand elle dérape ; sur Write-through, l'index accélère la lecture et ralentit chaque écriture, l'image n'en montre qu'un côté. Teste la migration sur une copie de volume réel. |
| Driver (DB) | Bibliothèque bas niveau qui transporte les requêtes SQL brutes vers la DB. | `import { Pool } from 'pg'` | le talkie-walkie brut sans filtre entre Chevaliers / la ligne directe sans intermédiaire entre Michael et son contact | « le talkie-walkie brut sans filtre entre Chevaliers » se rejoue à l'identique, le code non ; sur Driver (DB), le niveau d'isolation décide de ce que deux transactions concurrentes voient l'une de l'autre. Chiffre le décalage de réplication acceptable pour ton cas. |
| Query builder | Couche qui construit le SQL via des méthodes JS chaînées, lisible et typé. | `db.select().from(ninjas).where(...)` | le kit de construction modulaire de l'armure Garo / assembler une stratégie pièce par pièce, lisible à chaque étape | « le kit de construction modulaire de l'armure Garo » suppose un seul acteur à la fois ; sur Query builder, la réplication introduit un décalage de lecture qui rend un enregistrement écrit invisible. Mesure le temps de verrou, pas seulement le temps de requête. |
| ORM (object-relational mapping) | Couche qui mappe des objets JS vers des lignes de DB, génère le SQL pour toi. | `prisma.ninja.findUnique({ where: { id: 1 } })` | le traducteur qui convertit les ordres de Kakashi en mouvements concrets / l'interprète qui gère toute la conversation entre deux mondes | « le traducteur qui convertit les ordres de Kakashi en mouvements... » suppose un seul acteur à la fois ; sur ORM (object-relational mapping), supprimer une colonne encore lue par un ancien déploiement casse la production en pleine bascule. Chiffre le décalage de réplication acceptable pour ton cas. |
| Problème N+1 | Une requête initiale suivie d'une requête supplémentaire par élément, au lieu d'une seule optimisée. | boucle qui requête une fois par ninja au lieu d'un `include` | demander le dossier de chaque évadé un par un au lieu d'un rapport groupé / interroger chaque Chevalier séparément au lieu d'un seul appel radio collectif | « demander le dossier de chaque évadé un par un au lieu d'un rapport... » se corrige toute seule quand elle dérape ; sur Problème N+1, la migration s'exécute sur des données réelles, sales et volumineuses, pas sur ton jeu de test. Mesure le temps de verrou, pas seulement le temps de requête. |
| Migration (DB) | Fichier versionné qui décrit un changement de schéma, appliqué dans un ordre connu. | `prisma migrate dev --name add_ninja_rank` | le plan de Michael, mis à jour version par version, jamais réécrit en vrac / le protocole Garo qui évolue de génération en génération, documenté | « le plan de Michael, mis à jour version par version, jamais réécrit... » suppose que quelqu'un surveille ; sur Migration (DB), la migration s'exécute sur des données réelles, sales et volumineuses, pas sur ton jeu de test. Teste la migration sur une copie de volume réel. |
| Pool de connexions | Ensemble de connexions DB réutilisées au lieu d'en ouvrir une nouvelle par requête. | `new Pool({ max: 10 })` | la flotte de motos de Daryl, réutilisées au lieu d'en voler une neuve à chaque sortie / le standard radio du QG Garo, lignes limitées et partagées | « la flotte de motos de Daryl, réutilisées au lieu d'en voler une... » tient tant que rien ne tombe en route ; sur Pool de connexions, un verrou pris trop longtemps transforme un pic de charge en file d'attente. Mesure le temps de verrou, pas seulement le temps de requête. |
| BLOB (binary large object) | Donnée binaire volumineuse stockée directement dans une colonne DB. | colonne `portrait BYTEA` en PostgreSQL | le portrait peint d'un Chevalier rangé directement dans le dossier / la vidéo de combat stockée dans le rapport de mission | « le portrait peint d'un Chevalier rangé directement dans le dossier » n'a ni facture ni horloge ; sur BLOB (binary large object), supprimer une colonne encore lue par un ancien déploiement casse la production en pleine bascule. Lis le plan d'exécution avant d'ajouter un index. |
| Race condition (DB) | Deux opérations concurrentes qui se piétinent et produisent un résultat incohérent. | deux `UPDATE` simultanés sur le même JSON sans verrou | deux Chevaliers qui activent leur armure sur le même Horror en même temps, sans coordination / deux survivants qui modifient le même inventaire du camp au même instant | « deux Chevaliers qui activent leur armure sur le même Horror en... » suppose un seul acteur à la fois ; sur Race condition (DB), le niveau d'isolation décide de ce que deux transactions concurrentes voient l'une de l'autre. Teste la migration sur une copie de volume réel. |

---

## CE QUE TU DOIS RETENIR EN SORTANT DE CE MODULE

Une DB n'est jamais juste "l'endroit où on range les données". C'est un outil avec des compromis précis : SQL te donne l'intégrité et la rigueur au prix de la flexibilité, NoSQL te donne la flexibilité ou la vitesse au prix de garanties plus faibles, le cache te donne la vitesse au prix d'une fraîcheur relative que tu dois gérer activement.

Trois réflexes à garder à vie, peu importe le langage ou le framework du moment :

```
1. Avant un UPDATE/DELETE en prod : fais le SELECT équivalent d'abord
2. Avant de choisir une DB : regarde la forme de tes données ET de tes requêtes
3. Avant d'activer un ORM en confort : vérifie ce qui part vraiment en SQL (N+1, JOIN cachés)
```

Le reste (quel ORM est à la mode, quelle DB cloud est tendance) change tous les 2 ans. Ces trois réflexes ne changeront pas.

---

## OÙ L'ANALOGIE CASSE

Rappel Partie B.2 : toute analogie de ce grimoire simplifie un mécanisme.
Quand tu dois **décider** (fix, refactor, ADR), retourne au mécanisme réel,
pas à l'image. L'analogie sert à comprendre vite ; elle ment toujours un peu.

---

stability: intemporel

---

## TROIS PUBLICS : GRILLE D'AUTO-EVALUATION

> Greffe P6 : un ingenieur qui ne sait pas expliquer a trois publics ne survit
> pas a un entretien senior. Voir `03-PILOTAGE/10_team_craft/12_three_audiences_intro.md`.

Prends le concept-cle du module. Explique-le **trois fois**, chronometre en main :

### 1. A un enfant de 10 ans (60 s)

Analogie seule, zero jargon. Si le mot "runtime" sort, tu as perdu.

### 2. A un dev junior (3 min)

Un exemple de code minimal executable, un piege classique, un cas d'usage reel.

### 3. A un CTO hostile (5 min)

Trade-off, cout, quand NE PAS l'utiliser, impact business, alternative.

### Grille (coche honnetement)

- [ ] Enfant : aucun mot technique.
- [ ] Junior : l'exemple tourne vraiment.
- [ ] CTO : le mot "cout" ou "risque" est sorti au moins une fois.
- [ ] Aucune version ne ment (pas de simplification qui devient fausse).

Si une case n'est pas cochee : tu ne maitrises pas encore ce concept, tu le
recites.

---

## OÙ LES ANALOGIES CASSENT (règle B.2)

Les analogies de ce grimoire simplifient : elles ne définissent pas. Une
closure **nest pas** un tiroir ; un event loop **nest pas** un carrousel ;
une pile **nest pas** une pile de crêpes. Chaque analogie sert à visualiser
un mécanisme ; elle cesse dès que tu veux raisonner sur la complexité, la
mémoire, la concurrence ou les cas limites. Reviens toujours à la définition
technique avant de coder, débugger ou expliquer à un pair. Une analogie
prise pour la réalité devient un obstacle épistémologique.
