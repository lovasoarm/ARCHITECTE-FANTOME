---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [temps_limite, decision_organisationnelle]
anti_recipe_key: temps_limite+decision_organisationnelle
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Grossir un serveur ou en ajouter dix

Temps de lecture ~11 min

Walter White a un labo unique. Il l'agrandit (scale up : plus de paillasses, meilleur équipement) jusqu'à une limite pratique. Ou il ouvre des labos dans plusieurs villes (scale out : plusieurs instances qui se partagent le travail). En infrastructure, le choix change les coûts, la coordination et les modes de panne : un seul serveur reste un point de panne ; plusieurs instances peuvent maintenir le service si le répartiteur, les données partagées et les dépendances restent disponibles et dimensionnés.

Pourquoi ça compte : si t'as codé ton appli en supposant qu'elle tourne sur UN seul serveur (état en mémoire locale, fichiers écrits sur le disque local), scale out ne marche pas tel quel. Tu dois corriger le code avant de pouvoir ajouter des machines.

Avantage du scale up : souvent le changement le plus simple à court terme, sans refonte de la logique métier.
Inconvénient : plafond de capacité et toujours un point de panne applicatif unique si aucune redondance n'est prévue. La configuration (pools, workers, limites mémoire) peut malgré tout devoir être ajustée.

---

## 1) SCALE UP (VERTICAL) : LA MÊME MACHINE, EN PLUS GROS

```text
AVANT : 1 serveur, 4 CPU, 8 Go RAM
APRÈS : 1 serveur, 32 CPU, 128 Go RAM
```

Le pourquoi c'est tentant : tu changes la capacité de la machine ou son type dans l'environnement d'hébergement. La logique métier peut rester identique, mais les pools de connexions, le nombre de workers, les limites mémoire et les coûts doivent être revus ; l'opération n'est pas toujours un simple redémarrage.

```js
// Ton code reste identique, qu'il tourne sur une petite ou une grosse machine
app.listen(3000);
// scale up = changer la machine SOUS ce code, le code lui-même ne sait rien
```

Le risque réel, le plafond : tu ne peux pas scale up à l'infini. Il existe une plus grosse machine disponible chez ton cloud provider, et au-delà, tu es bloqué, peu importe combien tu payes. Et même avant d'atteindre ce plafond : un seul serveur, même énorme, reste UN SEUL serveur. S'il crash (panne hardware, mise à jour qui plante), ton appli entière est down. Pas de redondance.

```text
SCALE UP :
1 serveur --> grossit --> grossit encore --> plafond physique atteint --> bloqué
ET pendant tout ce temps : 1 seul point de panne, toujours
```

---

## 2) SCALE OUT (HORIZONTAL) : PLUS DE MACHINES, PAS PLUS GROSSES

```text
AVANT : 1 serveur, 4 CPU, 8 Go RAM
APRÈS : 5 serveurs, chacun 4 CPU, 8 Go RAM, derrière un load balancer (vu dans 01_load_balancing)
```

Le pourquoi c'est puissant à long terme : tu peux ajouter de la capacité par instances, dans les limites du coût, du réseau, du répartiteur et des dépendances partagées. Plusieurs instances offrent une possibilité de redondance : si l'une tombe, le répartiteur peut envoyer les nouvelles requêtes aux autres si les health checks fonctionnent et si la capacité restante suffit. Cela ne rend pas automatiquement la base de données ou les autres dépendances hautement disponibles.

```text
SCALE OUT :
5 instances --> 1 tombe --> le répartiteur retire l'instance défaillante
4 restantes --> continuent si leur capacité et leurs dépendances suffisent
besoin de plus ? --> ajouter une instance après vérification du coût et des goulots
```

Le risque réel : scale out exige que l'état nécessaire à une requête soit accessible depuis l'instance qui la reçoit. L'état exclusivement local (session, fichier, compteur) doit être externalisé, répliqué ou géré par une affinité de session assumée ; chaque option a des limites de panne et de cohérence. Ce changement peut coûter cher si l'application a été conçue pour un serveur unique.

```js
// Mauvais pour le scale out : état stocké EN MÉMOIRE du process
let activeUsers = {}; // existe UNIQUEMENT sur ce serveur précis

app.post("/enter-arena", (req, res) => {
  activeUsers[req.body.userId] = true;
  // Si la prochaine requête de ce shinobi atterrit sur un AUTRE serveur,
  // ce serveur-là ne sait RIEN de cette connexion
});
```

```js
// Bon candidat pour le scale out : état externalisé dans un service partagé.
// Il faut aussi définir sa disponibilité, sa durabilité et sa cohérence.
// (vu en détail dans 05-MAITRISE/01-DATABASES/04_redis_caching)
app.post("/enter-arena", async (req, res) => {
  await redis.set(`active:${req.body.userId}`, true);
  // Les instances peuvent lire cette info selon les garanties du service partagé.
});
```

---

## 3) LE TABLEAU DE DÉCISION

```text
SCALE UP, choisis ça si :
- ton appli n'a pas encore d'état partagé géré, et le réécrire coûte trop cher maintenant
- ta charge reste prévisible et sous le plafond d'une grosse machine
- tu veux la solution la plus simple à court terme

SCALE OUT, envisage-le si :
- tu as besoin de capacité ou de tolérance de panne au-delà d'une instance
- le répartiteur et les dépendances partagées peuvent eux aussi tenir les objectifs de disponibilité
- l'état de session/données est accessible de façon cohérente depuis les instances, selon le contrat choisi
```

Le piège classique : scale up « en attendant », indéfiniment, parce que scale out demande un effort de refactoring (état externalisé, sessions partagées, cohérence). Tu repousses la dette technique jusqu'au jour où la capacité ou la disponibilité ne suffit plus, et tu dois revoir la gestion de l'état pendant l'urgence. Le bon réflexe : séparer tôt la logique métier de l'état local éphémère, sans externaliser chaque donnée par réflexe ni ignorer le coût du service partagé.

---

## 4) COMBINER LES DEUX : CE QUI SE FAIT VRAIMENT EN PROD

En pratique, la plupart des architectures sérieuses font les deux, pas un choix exclusif.

```text
Chaque serveur individuel : dimensionné raisonnablement (scale up modéré)
               |
               v
Plusieurs de ces serveurs en parallèle (scale out)
               |
               v
Load balancer qui répartit entre eux (vu dans 01_load_balancing)
```

Le pourquoi : scale up pur a un plafond et zéro redondance. Scale out pur avec des machines minuscules multiplie le nombre de machines à gérer pour un gain qui pourrait être obtenu plus simplement. Le compromis réel : des machines de taille raisonnable, en nombre suffisant pour la redondance et la charge, ajustées au besoin.

---

## 5) CE QUI CASSE (MAIS FUN) : LE SCALE OUT QUI NE SCALE RIEN

```js
// exemple minimal : ça marche bien sur 1 serveur
const cache = new Map(); // cache en mémoire locale du process

function getCachedProduct(id) {
  if (cache.has(id)) return cache.get(id);
  const product = fetchFromDB(id);
  cache.set(id, product);
  return product;
}

// exemple réaliste : on scale out de 1 à 4 serveurs pour absorber le trafic du Black Friday

// exemple qui casse : chaque serveur a SON PROPRE cache local, complètement désynchronisé
// Server A a mis le jutsu 99 en cache avec l'ancien prix
// Server B vient de recevoir l'update du nouveau prix, son cache local est à jour
// Server C, D n'ont jamais mis ce jutsu en cache, ils tapent direct la DB
// Résultat : 4 shinobis qui demandent le MÊME jutsu au MÊME moment
// reçoivent potentiellement 3 prix différents selon le serveur qui les a traités
```

La leçon : scale out un serveur qui garde un état local déterminant (cache, session, compteur en mémoire) sans définir comment cet état est partagé ou invalidé ne te donne pas automatiquement 4x la capacité ; il peut créer plusieurs vues incohérentes. Le scale out n'est une victoire que si les invariants et le contrat de partage de l'état sont pensés AVANT d'ajouter des machines.

---

## 5.5) QUAND SCALER : REPÈRES À CONTEXTUALISER

Le tableau de décision de la section 3 dit quoi choisir. Ce qui manque : à quel moment de la vie d'un jutsu est-ce que la question se pose vraiment ? Les paliers d'utilisateurs ci-dessous sont des scénarios d'orientation, pas des limites de capacité universelles : la concurrence réelle, le profil de charge, la taille des données, les SLO, le coût et le goulot d'étranglement comptent davantage que le nombre de comptes inscrits.

```text
PHASE 0 : petit trafic et charge simple (les nombres sont illustratifs)
 --> une instance peut suffire si les SLO, la capacité et la tolérance aux pannes le permettent
 --> profiler avant d'acheter plus de capacité ou de multiplier les instances
 --> le scale out peut être prématuré sans besoin mesuré de capacité ou de redondance

PHASE 1 : croissance de l'usage ou de la charge
 --> identifier le goulot : CPU, mémoire, DB, réseau, stockage ou dépendance externe
 --> ne scale pas la DB en premier sans mesure qui montre qu'elle limite le parcours
 --> si le serveur app approche durablement sa capacité selon le SLO, comparer scale up et scale out
 --> préparer l'externalisation de l'état lorsque plusieurs instances deviennent une option

PHASE 2 : charge ou exigences de disponibilité qui dépassent une instance
 --> scale out peut devenir pertinent : répartiteur + plusieurs instances app
 --> vérifier que la capacité restante absorbe la panne d'une instance
 --> des read replicas peuvent aider les parcours majoritairement en lecture ; elles ajoutent
    un décalage de réplication et ne remplacent pas une stratégie d'écriture cohérente
 --> mesurer les coûts et la complexité de l'état partagé

PHASE 3 : volume, données ou contraintes opérationnelles qui justifient une distribution avancée
 --> partitionnement/sharding, CDN ou caches multiples seulement si les goulots le justifient
 --> vérifier la cohérence, la disponibilité, la restauration et le coût opérationnel
 --> les décisions d'architecture répondent à des contraintes observées, pas à un seuil d'inscrits
```

Le signal concret pour enquêter : pas un seuil universel, mais des métriques comparées
à un SLO et à une ligne de base. Ces exemples sont des **signaux de diagnostic**, pas
des ordres automatiques de scaler :

```text
CPU durablement élevé sur une fenêtre définie  --> profiler et chercher le goulot
p99 au-dessus du SLO convenu                    --> isoler le parcours et la ressource
pool de connexions DB saturé                   --> examiner les files, requêtes et limites DB
mémoire qui croît sans plateau                 --> rechercher rétention/fuite ou capacité insuffisante
```

La règle qui évite de scaler trop tôt : mesure d'abord. Un `console.time()` ou
un profiling basique (vu en `02-CONSTRUCTION/05-MEMORY-PERFORMANCE/04_profiling`) révèle souvent
qu'une requête DB non-indexée ou un calcul O(n²) est la vraie cause de la lenteur.
Ajouter des instances à un parcours lent ne le rend pas automatiquement rapide : tu peux simplement distribuer le même goulot d'étranglement.

---

## TIPS D'ÉVOLUTION TECHNIQUE

Avant, scale up était souvent le réflexe par défaut, parce que gérer plusieurs serveurs à la main (déploiement, synchronisation, load balancing) était lourd opérationnellement. Maintenant, avec les conteneurs (Docker, vu dans `05-MAITRISE/06-ANNEXES/29_toolchain/06-docker_basics.md`) et les orchestrateurs (Kubernetes), ajouter ou retirer des instances est devenu une opération quasi automatique (auto-scaling : le nombre de serveurs s'ajuste seul selon la charge mesurée). Le switch existe parce que l'outillage a rattrapé la complexité opérationnelle du scale out, pas parce que le scale up serait devenu inutile : il reste pertinent pour des charges de travail qui ne se parallélisent pas bien (calcul intensif sur une seule grosse tâche).

---

## EXERCICES

**EXO 1 : Walter White diagnostique avant de scale**
L'infrastructure de distribution de Walter a : les prix de la marchandise stockés en mémoire locale par serveur, pas de cache partagé, une seule DB PostgreSQL. La demande va x10 le mois prochain (nouveau territoire). Liste, dans l'ordre, ce qu'il faut corriger AVANT de pouvoir ajouter des serveurs sans créer une incohérence dans les stocks et les prix. (15 minutes)

**EXO 2 : Le plafond du labo de Walter**
Une tâche d'analyse chimique (calcul de pureté sur un lot) prend 2 secondes sur 1 CPU et ne se parallélise pas (elle doit être faite d'un seul bloc). Explique pourquoi scale out n'aide pas ici autant qu'on pourrait l'espérer, et ce que scale up apporte à la place. (10 minutes)

**EXO 3 : L'incohérence dans le réseau de distribution**
Reprends l'exemple du cache local du point 5. Le prix d'un lot change chez Gus, mais seulement 2 des 4 serveurs de distribution reçoivent la mise à jour (race condition lors du redémarrage). Propose la correction technique exacte (avec le nom de la techno) pour que les 4 serveurs partagent une vérité unique sur le prix. (10 minutes)

---

## RÉSUMÉ

Scale up augmente la capacité d'une machine ; scale out répartit la charge entre plusieurs instances. Les deux ont des limites de capacité, de coût et d'exploitation. Le scale out peut améliorer la capacité ou la tolérance aux pannes, mais seulement si le répartiteur, l'état partagé et les dépendances répondent eux aussi aux objectifs. Le choix découle du goulot mesuré, des SLO et du coût opérationnel, pas d'un seuil universel d'utilisateurs.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.

### Transfert : changer de contexte

Applique le mécanisme de « Grossir un serveur ou en ajouter dix » à une panne partielle avec retard, duplication et ordre différent. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: performance -->

## Repères de décision

- **Pourquoi :** La performance influence l'expérience utilisateur et le coût d'exploitation. Il faut repérer le goulot réel avant de changer l'algorithme, le cache ou la mémoire.
- **Quand l’utiliser / quand l’éviter :** Mesure avant toute optimisation. Utilise profiling et benchmark sur une charge représentative ; évite un micro-benchmark qui n'observe pas le chemin de production.
- **Limites :** Un benchmark local ne prédit pas exactement la production. Les caches chauds, le GC, le matériel, la concurrence et la distribution des données peuvent changer le résultat.

## Mécanisme : la version sans magie

Établis une baseline, profile, identifie le coût dominant, change une seule variable, relance plusieurs fois et compare quantiles et mémoire.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Grossir un serveur ou en ajouter dix** se rattache à ce cas concret : Sur Kintana, la liste des demandes ou l'agrégation des créneaux peut devenir lente à mesure que le nombre de demandes augmente.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Comparer montée en charge verticale et horizontale

**Mission liée à « Grossir un serveur ou en ajouter dix » :** Évalue pour Kintana une hausse de charge. Compare le renforcement d’une instance à l’ajout d’instances selon coût, limite matérielle, disponibilité, complexité et état partagé.

**Livrable :** Matrice comparative et décision avec seuil de réexamen.

**Critères d’acceptation :** Les hypothèses de capacité et de coût sont visibles ; la réplication n’est pas gratuite ; le point de saturation est défini.

**Transfert obligatoire :** Le coût d’exploitation change : revois le compromis sans supposer que le plus grand nombre d’instances est meilleur.
