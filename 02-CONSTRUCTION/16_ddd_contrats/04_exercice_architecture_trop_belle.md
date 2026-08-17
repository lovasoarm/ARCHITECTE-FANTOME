# 05 : EXERCICE, L'ARCHITECTURE TROP BELLE
Temps de lecture ~20 min, exercice complet ~50 min

Un schéma d'architecture généré par une IA a un défaut caractéristique : il est propre, symétrique, plein de mots justes ("résilient", "scalable", "découplé"), et il ne dit jamais ce qu'il coûte ni ce qu'il ne couvre pas. Ce module t'a donné trois outils pour juger un découpage : le langage ubiquitaire et le contexte borné (`01`), le prix réel de CQRS (`02`), la discipline de contrat (`03`). Cet exercice te fait appliquer les trois sur un schéma qu'aucun humain n'a encore relu.

## LE SCHÉMA (généré par IA, présenté tel quel à un comité d'architecture)

Contexte : modernisation du système de gestion carcérale de Fox River, remplacement d'un monolithe vieillissant. Le prestataire propose ce découpage en onze services, chacun avec sa base de données dédiée, présenté comme "conforme aux meilleures pratiques DDD et microservices".

```
                        +-------------------+
                        |    api-gateway     |  (1 instance, "load balancer" logiciel devant)
                        +---------+---------+
                                  |
        +---------+---------+----+----+---------+---------+
        |         |         |         |         |         |
   +----v---+ +---v----+ +--v-----+ +-v------+ +v-------+
   |  auth  | |detenus | |surveil-| |logisti-| |visites |
   |service | |service | |lance   | |que     | |service |
   +----+---+ +---+----+ +--+-----+ +---+----+ +---+----+
        |         |          |           |          |
        |         +----------+-----+-----+----------+
        |                          |
        |                    +-----v------+
        |                    |bus-events  |  (1 broker, pas de cluster)
        |                    +-----+------+
        |                          |
   +----v----+  +------------+ +---v--------+ +-------------+ +-------------+
   |audit-log|  |notifications| |reporting   | |facturation  | |planning-    |
   |service  |  |service      | |service     | |cantine svc  | |gardiens svc |
   +---------+  +------------+ +------------+ +-------------+ +-------------+

Chaque service : 3 réplicas, base de données managée dédiée, cache dédié.
Exception documentée : "referentiel-commun-db", une base partagée où
surveillance, logistique et visites écrivent directement les champs
communs du détenu, "pour éviter la duplication".
```

## DESCRIPTION DE CHAQUE SERVICE (telle que livrée par le prestataire)

1. **api-gateway** : point d'entrée unique, routage, authentification des requêtes entrantes. Une instance, jugée suffisante car "le trafic carcéral est prévisible".
2. **auth-service** : émission et validation des jetons, 3 réplicas, base Postgres managée dédiée, cache Redis dédié pour les sessions actives.
3. **detenus-service** : source de vérité déclarée du profil détenu (identité, cellule, statut). 3 réplicas, base dédiée.
4. **surveillance-service** : calcule la dangerosité à partir des incidents. Écrit `dangerosite` dans `referentiel-commun-db`, lit aussi `detenus-service` en direct via son ORM interne pour "avoir les infos à jour".
5. **logistique-service** : planifie les transferts. Lit `referentiel-commun-db` pour le champ `poids_transport`, appelle `surveillance-service` en synchrone à chaque planification pour vérifier le niveau de risque avant d'assigner l'escorte.
6. **visites-service** : gère les rendez-vous de visite. Écrit dans `referentiel-commun-db` le champ `visites_autorisees`, seul service à ne pas avoir de cache dédié "car jugé peu sollicité".
7. **bus-events** : broker d'événements central, un seul nœud, aucune réplication documentée. Tous les services secondaires s'y abonnent.
8. **audit-log-service** : consomme tous les événements du bus, écrit un log immuable. 3 réplicas et base dédiée avec réplication synchrone multi-région, "pour ne jamais perdre une trace d'audit".
9. **notifications-service** : prévient les familles et les gardiens. Consomme le bus, mais appelle aussi en synchrone `detenus-service` puis `surveillance-service` puis `logistique-service`, dans cet ordre, pour "construire le message complet avant envoi".
10. **reporting-service** : tableau de bord de direction. Interroge directement, en SQL, les bases de `detenus-service`, `surveillance-service` et `logistique-service` "pour un chiffre exact en temps réel", en plus d'une réplique nocturne déjà en place pour les mêmes données.
11. **facturation-cantine-service** et **planning-gardiens-service** : deux services indépendants, chacun 3 réplicas et base dédiée, pour des volumes mesurés à moins de 200 écritures par jour à eux deux.

Le prestataire conclut : "architecture résiliente, chaque domaine métier est isolé dans son propre service avec sa propre base de données, conforme DDD."

## LA GRILLE DE DÉMONTAGE

Tu ne démontes pas ce schéma à l'instinct. Tu le passes à travers les trois grilles que ce module vient de te donner. Pour chaque service ou flèche, pose les trois questions dans l'ordre, et note ce qui coince.

| Axe | Question de contrôle | D'où vient la question |
| --- | --- | --- |
| Coût | Ce composant est-il dimensionné sur un volume réel mesuré, ou sur un réflexe ("3 réplicas partout")? | aucun découpage ne se justifie par un chiffre qu'on n'a pas mesuré (cf. `02`, exercice de mesure du lag) |
| Résilience | Si ce composant tombe, qui d'autre tombe avec lui, et est-ce écrit quelque part ? | un contexte borné isole une panne ; s'il ne le fait pas, ce n'est pas un contexte borné (cf. `01`) |
| Cohérence de contrat | Ce flux passe-t-il par un contrat étroit et versionné, ou par un accès direct à un modèle ou une base étrangère ? | un import déguisé ou une base partagée n'est pas un contrat (cf. `01` et `03`) |

**Consigne** : prends la liste des onze services, et pour chacun, remplis une ligne : nom du service, axe(s) où il échoue, une phrase de preuve tirée du texte ci-dessus (pas une supposition). Un service peut échouer sur zéro, un, deux ou trois axes. Compte le total avant de lire le corrigé. Si tu comptes moins de six défauts au total sur les trois axes, relis `01`, `02` et `03` avant de continuer : ce schéma en contient plus que ça, et un découpage qui te semble propre à première lecture est exactement le piège que ce module veut désarmer.

---

## CORRIGÉ

### Axe coût : sur-provisionnement

**Défaut 1 : trois réplicas partout, y compris pour `facturation-cantine-service` et `planning-gardiens-service`.**
Pourquoi c'est plausible à première vue : "3 réplicas" est devenu un réflexe copié-collé dans tout gabarit d'infrastructure moderne, et personne ne remet en cause un chiffre qui a l'air prudent. Comment le repérer méthodiquement : demande le volume réel avant d'accepter le dimensionnement. Ici, le texte donne lui-même la réponse (moins de 200 écritures par jour à eux deux) et rien ne justifie une infrastructure dimensionnée pour un pic qui n'existe pas. Le signal à chercher dans n'importe quel schéma : un chiffre de dimensionnement identique sur tous les services, sans qu'aucun ne cite un volume mesuré à côté.

**Défaut 2 : `reporting-service` interroge trois bases en direct ET maintient une réplique nocturne pour les mêmes données.**
Pourquoi c'est plausible : chaque brique prise séparément a une justification ("temps réel exact" pour l'une, "performance" pour l'autre) et personne ne les compare l'une à l'autre parce qu'elles apparaissent dans des paragraphes différents du document. Comment le repérer : liste tous les chemins d'accès à une même donnée dans le schéma. Si une donnée a deux chemins de lecture qui coexistent sans qu'un seul soit décommissionné, tu paies deux fois pour le même besoin. C'est un signal que le schéma a été assemblé par accumulation de bonnes idées locales, jamais relu dans son ensemble.

**Défaut 3 : `audit-log-service` a une réplication synchrone multi-région pour un usage d'écriture quasi exclusive.**
Pourquoi c'est plausible : "ne jamais perdre une trace d'audit" sonne comme un impératif de conformité incontestable, donc personne n'ose demander le coût. Comment le repérer : sépare toujours l'exigence métier ("ne pas perdre les traces") de la solution technique choisie pour la satisfaire ("réplication synchrone multi-région"). Une réplication asynchrone avec accusé de réception et file de rattrapage protège aussi contre la perte, pour une fraction du coût et de la latence d'écriture. La question à poser systématiquement : quelle est l'exigence exacte en RPO (perte de données maximale tolérée), et la solution proposée est-elle la moins chère qui la respecte ?

### Axe résilience : SPOF cachés

**Défaut 4 : `api-gateway` en une seule instance.**
Pourquoi c'est plausible : le mot "load balancer" apparaît dans la phrase, ce qui donne une impression de redondance alors que la phrase dit littéralement "1 instance". Comment le repérer : ignore le vocabulaire rassurant et compte les instances écrites en toutes lettres. Un point d'entrée unique en une seule instance est un SPOF (single point of failure : un composant dont la panne arrête tout le système) qui arrête onze services d'un coup, quel que soit le nombre de réplicas derrière lui.

**Défaut 5 : `bus-events`, un seul nœud, aucune réplication documentée.**
Pourquoi c'est plausible : un bus d'événements est présenté comme la solution au couplage (cf. event-driven, module `14_architecture_patterns`), donc il hérite par association d'une image de robustesse qu'il n'a pas automatiquement. Comment le repérer : un composant qui devient un point de passage obligé pour tous les autres (ici, `audit-log`, `notifications`, une partie de `surveillance`) doit être audité pour sa propre résilience avec la même rigueur que les services qu'il relie. Le signal : un composant central dessiné une seule fois sur le schéma, jamais dupliqué visuellement, alors que tout converge vers lui.

**Défaut 6 : `notifications-service` appelle en synchrone `detenus-service` puis `surveillance-service` puis `logistique-service`, dans cet ordre.**
Pourquoi c'est plausible : chaque appel pris isolément est raisonnable ("j'ai besoin de cette info pour construire le message"), et le mot "synchrone" n'est même pas présenté comme un risque dans le document, juste comme un détail d'implémentation. Comment le repérer : trace la chaîne complète, pas les maillons un par un. Trois appels synchrones en série créent une disponibilité combinée qui est le produit des trois disponibilités individuelles, pas la moyenne : à 99,9 % chacun, la chaîne tombe sous 99,7 %, et si un seul maillon est lent, `notifications-service` hérite de sa lenteur en plus de la sienne. Le service le plus périphérique du schéma (un simple envoi de message) devient l'otage des trois autres.

**Défaut 7 : `referentiel-commun-db`, présentée comme une exception documentée, donc rassurante.**
Pourquoi c'est plausible : le mot "documenté" fait croire qu'un risque nommé est un risque maîtrisé. Comment le repérer : une base partagée entre trois services (`surveillance`, `logistique`, `visites`) reste un point de couplage fort et un SPOF, que son existence soit écrite noir sur blanc ou cachée. Documenter un défaut ne le corrige pas. Le test : si cette base tombe ou si son schéma change, combien de services cessent de fonctionner correctement sans qu'aucun déploiement n'ait eu lieu de leur côté ? Ici, trois.

### Axe cohérence de contrat

**Défaut 8 : `surveillance-service` lit `detenus-service` en direct via son ORM interne.**
Pourquoi c'est plausible : "avoir les infos à jour" est un argument fonctionnel qui semble raisonnable, et un accès direct via ORM a l'air plus simple à écrire qu'un appel de contrat explicite. Comment le repérer : c'est exactement l'import déguisé décrit dans `01_langage_contextes_bornes.md` : un service qui importe le modèle interne d'un autre au lieu de passer par un contrat étroit. Le signal à chercher : la mention d'un accès "direct", "interne" ou "via l'ORM" entre deux services qui sont censés être des contextes bornés séparés.

**Défaut 9 : trois services écrivent des champs différents dans la même table de `referentiel-commun-db` sans qu'aucun champ n'ait de propriétaire déclaré.**
Pourquoi c'est plausible : "éviter la duplication" est présenté comme une vertu (et c'en est une, en base relationnelle classique), donc l'argument désamorce la méfiance avant même que la question de la cohérence ne se pose. Comment le repérer : demande, pour chaque champ de cette table, quel service a le droit exclusif de l'écrire. Si la réponse est "plusieurs", tu n'as pas un contrat, tu as un champ sans source de vérité (cf. le prérequis du module `15-ARCHI-LAB` sur la source de vérité), et le jour où deux services écrivent des valeurs contradictoires sur le même détenu au même moment, aucun des deux ne saura qui a raison.

**Défaut 10 : aucune mention de versioning entre les onze services.**
Pourquoi c'est plausible : un schéma d'architecture montre des boîtes et des flèches, pas des contrats versionnés, donc l'absence ne saute pas aux yeux : elle est invisible par construction du format du document. Comment le repérer : pour chaque flèche du schéma, demande explicitement "quelle est la forme exacte de ce qui circule, et que se passe-t-il si l'un des deux bouts change cette forme sans prévenir l'autre ?" (cf. `03_contrats_migration.md`). Si le document ne répond à cette question pour aucune flèche, le silence est le défaut, pas une flèche en particulier.

**Défaut 11 (transversal, à ne compter qu'une fois) : la conclusion du prestataire ("chaque domaine métier est isolé... conforme DDD") est fausse au sens strict du module.**
Pourquoi c'est plausible : le vocabulaire est correct (domaine, isolé, DDD), donc la phrase sonne comme une conclusion d'expert. Comment le repérer : un contexte borné se prouve par un modèle autonome et un contrat étroit (`01`, résumé), jamais par le fait d'avoir une base de données séparée. Ce schéma a onze bases de données et au moins trois accès directs entre elles : il a la forme d'un découpage DDD sans en avoir la substance. Une base de données par service est une condition nécessaire, jamais suffisante.

## CE QU'IL FAUT RETENIR DE CET EXERCICE

Un schéma généré par IA optimise pour la plausibilité de surface : bon vocabulaire, symétrie visuelle, absence de contradiction apparente dans un seul paragraphe à la fois. Il n'optimise pas pour la cohérence de bout en bout, parce qu'aucun des trois défauts ci-dessus ne se voit en lisant une seule case du schéma isolément. Les onze défauts ne se trouvent qu'en traçant les flèches, en comptant les instances écrites en toutes lettres, et en demandant un chiffre à chaque endroit où le texte utilise un adjectif rassurant à la place d'un chiffre.

## RÉSUMÉ

Un schéma d'architecture ne se juge jamais sur son vocabulaire ni sur sa symétrie visuelle. Il se juge en traçant chaque flèche à travers trois questions fixes : le dimensionnement est-il mesuré, la panne d'un composant est-elle isolée, et le flux passe-t-il par un contrat versionné. Suite : [boss-fight.md](boss-fight.md).
