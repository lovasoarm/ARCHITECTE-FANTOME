---
stability: evolutif
acte: pratiquer
noyau: renfort
route: formation-complete
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "06-ANNEXES-TRANSVERSES/01-COMMENT-UTILISER-LE-PARCOURS.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 06-ANNEXES-TRANSVERSES/01-COMMENT-UTILISER-LE-PARCOURS.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# 61 : Pack d'exercices cumulatifs : raisonner en ingénieur système

Ces exercices sont faits après les leçons associées. Ils testent le choix de modèle, la reconnaissance d'invariants et la conséquence d'une hypothèse brisée. Les solutions ci-dessous donnent les principes de correction, pas une architecture unique.

## Exercice A : Événements reçus dans le désordre

### Situation

Un service d'abonnement reçoit les événements `subscription.paused` et `subscription.resumed` d'un fournisseur externe. Le fournisseur peut renvoyer le même événement plusieurs fois et livrer un ancien événement après un événement plus récent. Chaque événement possède un `eventId` et un `occurredAt`, mais l'horloge du fournisseur peut dériver.

### Travail

1. Définis l'identité d'un événement et la clé de déduplication.
2. Distingue l'ordre de réception, l'ordre métier et la version de l'état.
3. Propose une règle de transition qui refuse ou met en quarantaine un événement obsolète.
4. Définis la stratégie de rejeu, de DLQ et de réconciliation avec le fournisseur.
5. Injecte un doublon puis un événement ancien reçu après un événement récent.

### Correction de référence

Le transport peut être au moins une fois et ne garantit pas l'ordre métier. La déduplication doit utiliser l'identifiant stable fourni par l'émetteur, avec une contrainte d'unicité dans la portée correcte. Le timestamp seul ne suffit pas toujours à établir un ordre fiable ; une séquence/version métier est préférable si le fournisseur la garantit. Chaque transition doit vérifier la version attendue et refuser ou mettre en quarantaine une transition obsolète. Le rejeu doit être idempotent et observable ; une DLQ sans procédure de résolution ne constitue pas une réparation.

**Échec éliminatoire :** un ancien événement peut écraser silencieusement un état plus récent, ou le même `eventId` applique deux fois un effet métier.

## Exercice B : Éviter une tempête de cache

### Situation

Après une invalidation planifiée, une fiche de catalogue très consultée redevient froide. À 09:00, des milliers de requêtes arrivent simultanément. Chaque miss déclenche une lecture coûteuse de la même source ; la base sature, les temps de réponse augmentent et les nouvelles requêtes multiplient la charge. Il n'y a ni donnée personnelle ni règle d'autorisation dans ce cas.

### Travail

Compare : verrou/single-flight par clé, stale-while-revalidate, TTL avec jitter, préchauffage contrôlé et limitation de concurrence. Pour chaque stratégie, précise le comportement lors du crash du détenteur du verrou, le risque de servir une valeur trop ancienne et l'effet sur la base.

### Correction de référence

Le cache ne doit pas transformer un pic de misses en pic équivalent sur la source. Un single-flight limite les chargements concurrents d'une même clé mais exige expiration du verrou et gestion des erreurs. Le stale-while-revalidate peut préserver la latence si l'ancienneté permise est acceptable ; il ne convient pas à une donnée dont la fraîcheur est impérative. Le TTL avec jitter répartit les expirations, sans remplacer une limite de concurrence. Le choix dépend de la fraîcheur métier, du coût de calcul et du rayon d'impact.

**Transfert :** applique ce raisonnement à un cache de configuration dont une valeur obsolète peut modifier le comportement d'un service.

## Exercice C : Le percentile a-t-il masqué une panne ?

### Situation

Service A : 99 % des requêtes répondent en 100 ms, 1 % en 8 s. Service B : 95 % répondent en 150 ms, 5 % en 600 ms. Les deux rapports annoncent une latence moyenne similaire.

### Travail

1. Explique pourquoi la moyenne est insuffisante.
2. Détermine les percentiles qui aideraient à discriminer les deux populations.
3. Définis un objectif de latence qui correspond à un besoin utilisateur ; ne choisis pas un nombre uniquement pour faire joli dans un dashboard.
4. Propose une mesure pour distinguer lenteur du service, dépendance lente et file d'attente.

### Correction de référence

Les distributions ont des queues très différentes : A contient une minorité qui attend très longtemps alors que B a une dégradation plus fréquente mais moins extrême. La moyenne peut masquer la forme de la distribution. Les p95/p99 seuls ne suffisent pas toujours : selon la convention de quantile (rang le plus proche ou interpolation), p99 peut encore être proche de 100 ms pour A, alors que sa queue extrême atteint 8 s. Compare aussi p99.9 lorsque l’échantillon le permet, la proportion de requêtes dépassant un seuil métier (par exemple > 1 s), les histogrammes et les comptes absolus par fenêtre. Documente la convention de calcul, la taille de l’échantillon et l’incertitude : un p99.9 calculé sur trop peu d’observations n’est pas une preuve robuste. Ventile par endpoint et dépendance, puis rapproche durée et âge des files d’attente. Le percentile et le budget doivent correspondre à l’expérience promise.

## Exercice D : Faire évoluer un contrat d'événement

### Situation

Un service publie des messages `ShipmentCreated` au format v1. Des consommateurs historiques peuvent rester arrêtés plusieurs jours puis rejouer leurs messages. Le format v2 ajoute un champ obligatoire pour un nouveau calcul, renomme un champ existant et change la représentation d'une date. Producteur et consommateurs ne peuvent pas être déployés simultanément.

### Travail

Définis une stratégie de compatibilité producteur/consommateur : enveloppe avec version de schéma, règle de lecture tolérante, période de double publication ou adaptateur, validation, métriques d'adoption, DLQ et date de retrait de v1. Montre comment un ancien consommateur réagit à v2 et comment un nouveau consommateur traite un message v1.

### Correction de référence

La compatibilité doit être vérifiée dans les deux sens réellement nécessaires pendant le déploiement. Un nouveau champ peut être optionnel pour les anciens lecteurs seulement si ceux-ci ignorent proprement les champs inconnus ; un champ renommé ou une date redéfinie exige une conversion ou un nouveau contrat explicite. La version du schéma doit être vérifiable, les messages invalides isolés sans perte et l'adoption de v2 mesurée avant retrait de v1. La durée de conservation et le rejeu des anciennes files font partie du plan de migration. Ce scénario porte sur le contrat de message et les consommateurs déployés indépendamment, pas sur un backfill de colonnes de base de données.

## Exercice E : Ajouter un modèle améliore-t-il le système ?

### Situation

Une recherche lexicale satisfait 82 % des requêtes étiquetées. Une recherche vectorielle en satisfait 79 %. Une fusion hybride en satisfait 85 %, mais ajoute 180 ms au p95 et un coût par requête supérieur. Ces valeurs proviennent d'un seul petit jeu de développement.

### Travail

1. Quelle conclusion est permise et quelle conclusion ne l'est pas ?
2. Propose une expérience qui mesure la généralisation et les sous-groupes.
3. Définis le résultat qui te ferait retirer la fusion.
4. Explique pourquoi la meilleure moyenne peut être un mauvais choix si les erreurs critiques augmentent.

### Correction de référence

On peut seulement dire que la fusion obtient 85 % sur ce jeu de développement, avec le coût/latence observés dans ce contexte. On ne peut pas affirmer qu'elle généralisera ou qu'elle améliore la sécurité. Il faut un ensemble de test conservé, une analyse des erreurs par sous-groupe, un budget de latence/coût défini et des cas critiques. Si elle augmente les fuites d'accès ou les échecs graves, la hausse moyenne n'est pas acceptable.

## Exercice F : Une action d'agent a été interrompue

### Situation

Un agent planifie trois opérations : lire une fiche, mettre à jour un dossier, envoyer une notification. Le service tombe après la mise à jour du dossier mais avant de persister le résultat de l'outil. Au redémarrage, le plan rejoue l'étape.

### Travail

Définis les états persistés, les clés d'idempotence, les effets compensables, les confirmations utilisateur et les traces minimales. Attaque ton propre modèle en interrompant chaque transition.

### Correction de référence

Il ne suffit pas de stocker le prompt et le plan. Il faut savoir si l'effet d'écriture a été accepté et si sa répétition est sûre ; le système peut avoir besoin de lire l'état externe pour réconcilier l'incertitude. L'envoi d'une notification peut être dédupliqué si le destinataire/événement porte une clé stable, mais les effets externes ne sont pas tous compensables. Les permissions restent vérifiées à l'exécution, même si le plan antérieur était autorisé.

## Exercice G : Arbitrage d'architecture sous contrainte

### Situation

Une petite équipe doit livrer en priorité. Les choix :

- A : monolithe modulaire, base relationnelle, déploiement simple ;
- B : services distribués, bus d'événements et stockage séparé ;
- C : service géré par un fournisseur, avec restrictions d'export et coût variable.

Le trafic est faible et les règles métier changent souvent, mais une future intégration avec deux systèmes externes est possible.

### Travail

Rédige une ADR : exigences, non-objectifs, options, risques, coûts d'exploitation, migration, expérience pour invalider le choix, signaux qui déclencheraient une révision.

### Correction de référence

Il n'existe pas de gagnant universel. Le bon dossier explicite les hypothèses et choisit la solution la plus simple qui répond aux exigences démontrées. Le futur possible ne justifie pas à lui seul une architecture distribuée aujourd'hui ; inversement, le choix simple doit préserver des contrats et des frontières qui rendent une évolution possible. La décision est de qualité si ses conditions de révision sont mesurables.

## Grille transversale de correction

Pour chaque exercice, évalue séparément :

1. **Exactitude** : le mécanisme est-il techniquement correct ?
2. **Hypothèses** : conditions et limites explicites ?
3. **Preuve** : test, mesure, trace ou contre-exemple réel ?
4. **Compromis** : alternatives plausibles et coût de chacune ?
5. **Transfert** : sait-il l'appliquer lorsque la contrainte change ?
6. **Communication** : un autre ingénieur peut-il reproduire le raisonnement ?

Une réponse n'est pas acquise parce qu'elle ressemble à la correction. L'apprenant doit pouvoir défendre le modèle, faire une prédiction nouvelle et modifier son choix si une hypothèse est brisée.
