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

## Exercice A : Une requête est-elle exécutée une seule fois ?

### Situation

Un client envoie une demande de paiement. Le serveur enregistre la demande et appelle un fournisseur. Le fournisseur réalise le paiement, mais la réponse réseau se perd. Le client réessaie. Le serveur ne sait pas si le premier appel a réussi.

### Travail

1. Dessine les états et transitions du client, du serveur et du fournisseur.
2. Explique pourquoi un timeout ne signifie pas que l'effet externe n'a pas eu lieu.
3. Propose une clé d'idempotence, une durée de conservation et une contrainte d'unicité.
4. Distingue la transaction locale et l'effet externe ; décris une stratégie de reprise/réconciliation.
5. Injecte un duplicat après succès, puis un crash entre l'effet externe et la sauvegarde locale.

### Correction de référence

Le timeout crée une incertitude, pas une preuve d'échec. Si le fournisseur accepte une clé d'idempotence, les tentatives ayant la même clé doivent se rapporter au même effet dans la portée et la durée garanties par ce fournisseur. Une contrainte locale unique évite de créer deux opérations métier pour la même demande, mais ne rend pas automatiquement atomique un système externe. Il faut une machine à états persistée, une reprise explicite et une procédure de rapprochement lorsque l'état du fournisseur est inconnu. Ne promettre « exactly once » que pour une frontière où le protocole et le stockage fournissent réellement cette garantie.

**Échec éliminatoire :** l'implémentation considère un timeout comme un rollback de l'effet externe ou autorise un retry sans identité stable de l'opération.

## Exercice B : Cache ou source de vérité ?

### Situation

Un service lit un profil depuis une base. Pour réduire la latence, un cache conserve l'ancienne valeur pendant 10 minutes. L'utilisateur modifie le profil puis retire l'accès d'un autre utilisateur. Une réponse servie depuis le cache peut exposer une ancienne autorisation.

### Travail

Compare : invalidation à l'écriture, TTL seulement, cache par identité/tenant, versionnement, vérification de l'ACL avant de servir. Donne pour chaque approche la garantie réelle, le coût et le mode de panne.

### Correction de référence

Le TTL borne parfois l'ancienneté sans prouver que l'ancienne donnée est sûre. Une clé de cache doit contenir toutes les dimensions qui changent la réponse, dont les droits pertinents ; malgré cela, une révocation urgente peut exiger une vérification d'autorisation au moment de la lecture ou une invalidation forte. Ne traite jamais un cache comme source de vérité pour les permissions critiques sans une garantie explicitée et testée.

**Transfert :** applique le même raisonnement aux résultats RAG, embeddings, snippets, résumés de documents et réponses générées.

## Exercice C : Le percentile a-t-il masqué une panne ?

### Situation

Service A : 99 % des requêtes répondent en 100 ms, 1 % en 8 s. Service B : 95 % répondent en 150 ms, 5 % en 600 ms. Les deux rapports annoncent une latence moyenne similaire.

### Travail

1. Explique pourquoi la moyenne est insuffisante.
2. Détermine les percentiles qui aideraient à discriminer les deux populations.
3. Définis un objectif de latence qui correspond à un besoin utilisateur ; ne choisis pas un nombre uniquement pour faire joli dans un dashboard.
4. Propose une mesure pour distinguer lenteur du service, dépendance lente et file d'attente.

### Correction de référence

Les distributions ont des queues très différentes : A contient une minorité qui attend très longtemps alors que B a une dégradation plus fréquente mais moins extrême. La moyenne peut masquer la forme de la distribution. Les p95/p99, ventilés par endpoint et par dépendance, et la durée/âge des files d'attente aident à diagnostiquer. Le percentile choisi et le budget doivent être alignés sur l'expérience promise et la taille réelle de l'échantillon.

## Exercice D : Choisir un protocole de migration

### Situation

Deux versions d'un service tournent en même temps pendant un déploiement. La version ancienne lit le champ `status`; la nouvelle version lit `state`. La base contient des lignes historiques parfois invalides.

### Travail

Propose une migration en étapes. Définis le contrat, le backfill, la détection d'anomalies, le mode dual-read/write si nécessaire, la bascule et le moment où l'ancien champ peut être supprimé. Ajoute au moins un scénario de rollback.

### Correction de référence

La migration n'est sûre que lorsque les combinaisons de version/schema présentes durant le rollout sont compatibles. Le backfill doit être idempotent, progressif et auditable ; les données invalides doivent être quantifiées et traitées selon une règle explicite, pas converties silencieusement. Le contrat ne vient qu'après la preuve qu'aucun consommateur et aucun rollback prévu ne dépend de l'ancien champ.

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
