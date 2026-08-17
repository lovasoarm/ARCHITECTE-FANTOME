# Pagination, rate limiting, cache HTTP, latence perçue

## La scène

L'API du cabinet vétérinaire expose `GET /patients/{clinicId}/appointments`, qui retourne
tout l'historique de rendez-vous d'une clinique. Au lancement, une clinique a douze rendez-
vous archivés, la réponse fait 3 kilooctets, tout va bien. Deux ans plus tard, la plus grosse
clinique cliente a accumulé quatorze mille rendez-vous. Le même endpoint, jamais retouché,
renvoie maintenant onze mégaoctets de JSON à chaque appel, l'appli mobile met neuf secondes à
afficher un écran qui devrait s'afficher en une seconde, et un cron nocturne du logiciel de
comptabilité partenaire, qui appelle cet endpoint toutes les cinq minutes pour "vérifier s'il
y a du nouveau", commence à saturer la bande passante du serveur au point de ralentir tous les
autres clients au même moment. Rien n'a changé dans le code. Le succès a suffi à transformer
un endpoint honnête en incident.

## Ce qui se passe vraiment

### Pagination : ne jamais promettre de retourner "tout"

Un endpoint de liste sans pagination fonctionne à la démo et casse à l'échelle, toujours au
même rythme : lentement puis d'un coup. La pagination n'est pas une optimisation à ajouter
plus tard, c'est une garantie de contrat à poser dès le premier jour, même quand elle semble
inutile sur douze rendez-vous.

```text
Pagination par offset (page + taille) :
  GET /appointments?page=3&size=50
  + Simple à comprendre, à implémenter, à naviguer ("aller à la page 7")
  - Coûteuse en base sur de gros volumes (SKIP doit quand même parcourir les lignes sautées)
  - Instable si des lignes sont insérées/supprimées entre deux appels : un même rendez-vous
    peut apparaître deux fois ou disparaître d'une page à l'autre pendant la pagination

Pagination par curseur (basée sur une clé stable, ex: dernier ID vu) :
  GET /appointments?after=apt_9931&size=50
  + Stable même si des lignes sont insérées/supprimées pendant la navigation
  + Performance constante quelle que soit la profondeur de pagination
  - Pas de "aller directement à la page 7" : uniquement navigation séquentielle
  - Le curseur doit être un identifiant opaque et stable, jamais recalculable par le client
```

```json
{
  "data": [
    /* 50 rendez-vous */
  ],
  "pagination": {
    "nextCursor": "apt_9981",
    "hasMore": true
  }
}
```

Le choix par défaut raisonnable pour la plupart des API à volume croissant est le curseur, 
l'offset devient un piège de performance et de cohérence dès que le volume dépasse quelques
milliers de lignes actives. La taille de page doit avoir un maximum imposé côté serveur
(`size` plafonné, ex. 100), sinon un client peut demander `size=999999` et recréer
exactement le problème que la pagination devait résoudre.

### Rate limiting : protéger le système d'un client, même honnête

Le cron du logiciel comptable de la scène n'est pas malveillant : il est juste mal
configuré. Le rate limiting protège le système de ce cas bien plus fréquent que l'attaque
délibérée : un partenaire en boucle infinie accidentelle, un script de test oublié en
production, une resynchronisation trop agressive après une panne.

```text
# verifie le 2026-08-04 : les seuils chiffres ci-dessous suivent le materiel et l'usage
Fenêtre fixe :
  100 requêtes par minute, compteur remis à zéro à chaque minute pile
  - Effet de bord : un client peut envoyer 100 requêtes à 59s puis 100 à 61s,
    soit 200 requêtes en 2 secondes autour de la frontière de fenêtre

Fenêtre glissante / seau de jetons (token bucket) :
  Un seau se remplit d'un jeton toutes les 600ms, chaque requête en consomme un
  + Lisse le trafic dans le temps, pas d'effet de bord de frontière
  + Autorise des pics courts (burst) sans punir un usage normal légèrement irrégulier
```

Réponse attendue en cas de dépassement, exploitable par un client automatique :

```text
HTTP 429 Too Many Requests
Retry-After: 42
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1735689600
```

Un client bien écrit lit `Retry-After` et attend ce délai précis avant de retenter, au lieu
de deviner un backoff arbitraire qui pourrait retomber encore dans la fenêtre limitée.

### Cache HTTP : réduire le travail refait pour rien

La consommation d'énergie d'hier ne change plus une fois le jour terminé. Pourtant, sans
cache, chaque appel au comparateur de prix recalcule et retransmet la même réponse identique
des dizaines de fois par heure.

```text
Cache-Control: max-age=3600          --> le client (ou un cache intermédiaire) peut réutiliser
                                        la réponse pendant 1h sans rappeler le serveur

ETag: "a1b2c3d4"                     --> empreinte du contenu ; le client renvoie
If-None-Match: "a1b2c3d4"              cette empreinte au prochain appel, le serveur répond
                                        304 Not Found Modified (corps vide) si rien n'a changé,
                                        évitant de retransmettre un contenu identique
```

```text
Flux avec ETag :

Client                          Serveur
  |  GET /consumptions/site_1     |
  | ---------------------------> |  calcule, renvoie 200 + ETag: "a1b2c3d4"
  | <--------------------------- |
  |  (60 secondes plus tard)      |
  |  GET /consumptions/site_1     |
  |  If-None-Match: "a1b2c3d4"    |
  | ---------------------------> |  compare, rien n'a changé
  | <--------------------------- |  304 Not Modified, corps vide
```

Le piège du cache n'est jamais technique, il est humain : décider une durée de fraîcheur
(`max-age`) exige de répondre à "à quel point puis-je tolérer une donnée légèrement
périmée ?" : une décision métier, pas un réglage arbitraire copié d'un tutoriel.

### Charges utiles : ne transmettre que ce qui sert

```text
Champ renvoyé mais jamais utilisé par aucun client connu = coût réseau payé pour rien,
répété à chaque appel, à chaque client, indéfiniment.

Solutions, du plus simple au plus coûteux à maintenir :
  - Champs optionnels sélectionnables (?fields=id,date,statut) : le client choisit
  - Endpoints distincts pour vue "résumé" vs vue "détail complet"
  - Compression HTTP (gzip/brotli) : gratuite à activer, réduit la taille sur le fil
    sans changer le contrat, mais ne corrige pas un design de réponse trop lourd
```

### Latence perçue : ce que l'utilisateur ressent n'est pas ce que le serveur mesure

Le serveur peut répondre en 200ms et l'utilisateur ressentir une lenteur insupportable, ou
l'inverse. La latence perçue dépend de la structure de l'attente, pas seulement de sa durée
brute.

```text
Techniques qui réduisent la latence PERÇUE sans réduire la latence RÉELLE :

  - Réponse immédiate + traitement asynchrone : POST /deliveries répond 202 Accepted
    tout de suite avec un identifiant de suivi, le traitement long se fait en arrière-plan,
    le client interroge ou reçoit un webhook au lieu d'attendre bloqué
  - Pagination + affichage progressif : afficher les 20 premiers résultats pendant que
    les suivants se chargent, au lieu d'attendre le total avant d'afficher quoi que ce soit
  - Retour d'état intermédiaire explicite plutôt qu'un silence total pendant l'attente
    (statut "en cours de traitement" visible, pas une roue qui tourne sans information)
```

### Quand la source va plus vite que la cible

Un cas particulier mérite sa propre section : quand un système qui produit des données (un
capteur, un import de fichier, un flux d'événements) va plus vite que le système censé les
absorber. Ce n'est pas un client externe mal élevé, c'est ta propre architecture qui, à un
endroit, produit plus vite qu'un autre endroit ne peut traiter.

**Backpressure** : mécanisme qui consiste à freiner explicitement la source quand la cible
sature, au lieu de laisser les données s'accumuler sans limite jusqu'à l'incident. Sans
backpressure, une file d'attente ou une mémoire tampon grossit silencieusement jusqu'à
manquer de mémoire, souvent en pleine nuit, sans qu'aucune requête individuelle n'ait
semblé fautive.

```text
Import de 500 000 lignes de relevés de température, traité ligne par ligne :

Sans backpressure : le lecteur de fichier pousse toutes les lignes en mémoire
  dans une file d'attente pendant que le traitement (écriture en base,
  vérification de seuil) ne suit pas. La file grossit de 500 lignes/seconde
  net, jusqu'à épuiser la mémoire disponible en quelques minutes.

Avec backpressure : le lecteur de fichier attend que la file d'attente repasse
  sous un seuil avant de lire la ligne suivante. Le débit global du traitement
  est plus lent, mais borné et stable, jamais d'incident mémoire.
```

Trois réponses possibles quand la source dépasse la capacité de la cible, chacune avec son
coût propre :

```text
1. Rejeter    : refuser les nouvelles données au-delà d'un seuil (HTTP 429, ou
   message renvoyé à l'expéditeur).
   Coût : perte de données ou obligation pour la source de retenter, ce qui
   déplace le problème plutôt que de le résoudre si la source ne gère pas
   bien l'échec.

2. Mettre en file  : accepter la donnée, la stocker dans une file d'attente
   persistante (pas en mémoire volatile) pour traitement différé.
   Coût : latence de traitement qui augmente (les données attendent leur tour),
   et infrastructure supplémentaire à exploiter et surveiller (la file
   elle-même peut tomber en panne ou saturer si elle n'a pas de limite).

3. Ralentir la source  : demander explicitement à la source de produire moins
   vite (un signal de backpressure remonté au producteur, comme dans les flux
   réactifs ou les protocoles avec accusé de réception).
   Coût : demande que la source sache réagir à ce signal (ce n'est pas toujours
   possible avec un partenaire externe qui ne l'implémente pas), et réduit le
   débit global du système au rythme du maillon le plus lent.
```

Aucune des trois réponses n'est gratuite : le choix dépend de ce qui coûte le moins cher à
perdre dans ton contexte, la donnée elle-même, du temps de latence, ou du débit global.

#### Cohérence à terme : le prix à payer pour absorber le débit

Mettre les données en file avant traitement introduit presque toujours de la cohérence à
terme : la donnée existe quelque part (dans la file), mais n'est pas encore visible partout
où on s'attendrait à la voir (le tableau de bord, le calcul de conformité). Un relevé de
température mis en file peut mettre plusieurs secondes à apparaître dans l'alerte de dépassement
de seuil. Ce délai doit être une décision explicite et documentée, jamais une surprise
découverte pendant un incident où l'on cherche pourquoi une alerte semble "en retard".

Analogie : pagination, rate limiting et cache HTTP
, c'est une cuisine de restaurant en
service qui refuse d'envoyer toute la carte d'un coup et régule les commandes acceptées par
le pass, et un coureur de montagne qui rationne son effort et ses ravitaillements pour ne pas
craquer avant l'arrivée.
Où l'analogie casse : un chef ou un coureur ajustent leur rythme en sentant leur propre
fatigue. Un serveur ne perçoit sa charge qu'à travers des métriques déclarées à l'avance, et
un client mal limité peut continuer de taper dessus sans qu'aucune sensation ne l'arrête.

## Latence, partition, cohérence : ce que le réseau te fait vraiment

### La scène

Le club d'escalade appelle le service de paiement de sa fédération pour valider une adhésion.
Le service répond en 4 s, ton timeout est à 3 s. Côté club : échec affiché. Côté fédération :
adhésion validée, membre débité. Ton système croit le membre non adhérent, et lui présente
une nouvelle demande de paiement.

### Ce qui se passe vraiment

Trois faits physiques, vrais en 2026 comme en 2035, indépendants de ta stack.

- **Latence** : le réseau ne transmet pas, il retarde. Une réponse lente et une réponse
  absente sont indistinguables depuis l'appelant. Le timeout est une décision de ta part, pas
  une information sur l'état distant.
- **Partition** : quand deux machines ne se parlent plus, chacune reste persuadée d'avoir
  raison. Aucune des deux ne sait laquelle est isolée.
- **Cohérence** : après une partition, il faut choisir entre refuser de répondre et répondre
  avec une donnée peut-être périmée. Il n'y a pas de troisième porte.

```text
CLIENT --> [timeout 3s] --X   RESEAU   --> SERVEUR (a execute)
   |                                          |
   | croit : echec                            | sait : succes
   v                                          v
rejoue l'operation  -->  DOUBLON, si pas de cle d'idempotence
```

### Le code qui éclaire

La clé d'idempotence vue en [03-errors-and-idempotence.md](03-errors-and-idempotence.md) est
la seule réponse correcte à un timeout : elle rend le rejeu sûr, au lieu de le rendre
interdit.

```ts
// Le client genere la cle AVANT le premier appel, et la reutilise a chaque rejeu.
const cle = `adhesion-${membreId}-${periodeId}`; // deterministe, pas un uuid par tentative
await fetch("/paiements", {
  method: "POST",
  headers: { "Idempotency-Key": cle },
  body: JSON.stringify({ membreId, montantCents: 4500 }),
});
// Cote serveur : si la cle existe deja, renvoyer la reponse d'origine, ne pas re-debiter.
```

### Compromis pendant une partition

| Option | Coût | Bénéfice | Quand choisir |
| --- | --- | --- | --- |
| A : refuser de répondre | Service indisponible pendant la partition | Aucune donnée fausse émise | Quand une donnée fausse coûte plus cher qu'une absence de service : comptage de capacité réglementaire, places restantes, solde |
| B : répondre avec la dernière valeur connue | Décision possible sur donnée périmée | Service disponible, dégradé mais utile | Quand l'indisponibilité coûte plus cher que l'approximation : affichage d'un planning, liste de créneaux consultée |

Analogie : un appel radio sans accusé de réception en navigation maritime, et une commande
criée au passe en cuisine pendant le coup de feu.
Où l'analogie casse : en cuisine tu vois le plat partir, ici l'appelant ne voit jamais l'état
réel du serveur.

### Pièges classiques

- **« Le timeout est un échec. »** Symptôme observable : tes doublons apparaissent toujours
  par paires, à quelques secondes d'écart, et toujours quand le service tiers est lent.
- **Rejouer sans clé d'idempotence.** Symptôme : le montant facturé double exactement les
  jours de pic, jamais en heures creuses.
- **Baisser le timeout pour « aller plus vite ».** Symptôme : le taux d'erreur monte alors que
  le service distant, lui, exécute de plus en plus d'opérations.

### Ce que tu dois savoir défendre

1. Une IA te propose un retry avec backoff exponentiel sur un appel de paiement. Le code est
   propre. Qu'est-ce qui manque, et quel est le montant du bug ?
2. Sur ton comptage de capacité du capstone
   ([12-CAPSTONE-ARENA/03-deliverables.md](../../04-EPREUVE/06-CAPSTONE-ARENA/03-deliverables.md)), choisis
   l'option A ou B pendant une partition, et dis ce que ton choix rend faux.
3. Pourquoi un timeout court ne réduit-il pas le nombre d'opérations exécutées côté distant ?

## Compromis

| Option                        | Coût                                                                                  | Bénéfice                                                                                    | Quand choisir                                                       |
| ----------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Pagination par curseur        | Pas de "aller à la page N" direct, un peu plus complexe à implémenter                 | Stable et performant à tout volume                                                          | Listes à croissance non bornée (historique, journal d'événements)   |
| Pagination par offset         | Instable et coûteuse à grand volume                                                   | Simplicité, navigation directe par numéro de page                                           | Petites listes bornées, tableaux de bord internes à faible volume   |
| Rate limiting en token bucket | Implémentation et état à maintenir (compteurs, expiration)                            | Absorbe les pics courts sans punir un usage normal, protège des boucles accidentelles       | Toute API exposée à plus d'un client non totalement maîtrisé        |
| Cache HTTP avec ETag          | Complexité de calcul d'empreinte, risque de servir une donnée périmée si mal invalidé | Réduction drastique du trafic redondant, réponses quasi instantanées sur données inchangées | Données lues souvent, modifiées rarement (historique, référentiels) |

## Pièges classiques

- **L'endpoint sans pagination "parce qu'il n'y a jamais beaucoup de données".** Symptôme :
  un endpoint qui devient un incident de performance des mois après son lancement, sans
  qu'aucune ligne de code n'ait changé entre-temps.
- **Le rate limiting absent jusqu'au premier incident.** Symptôme : un client honnête mais
  mal configuré (boucle, cron trop fréquent) dégrade le service pour tous les autres clients
  en même temps, sans qu'aucune alerte n'ait prévenu avant la panne complète.
- **Le cache jamais invalidé.** Symptôme : un client affiche une donnée obsolète après une
  mise à jour, parce que la durée de cache a été choisie arbitrairement longue sans réflexion
  sur la fraîcheur métier réellement tolérable.
- **L'offset de pagination qui saute ou duplique des lignes.** Symptôme : un client qui
  parcourt toutes les pages d'une liste active manque certains éléments ou en voit d'autres
  deux fois, parce que des insertions ont eu lieu pendant la pagination.
- **La confusion entre latence réelle et perçue.** Symptôme : une équipe optimise agressivement
  le temps de réponse serveur (passe de 300ms à 150ms) alors que l'utilisateur perçoit
  toujours l'attente comme longue faute de tout retour d'état intermédiaire.

## Ce que tu dois savoir défendre

- Explique pourquoi la pagination par offset devient un piège de performance et de
  cohérence à mesure que le volume de données grandit, avec l'exemple de la clinique.
- Pourquoi le rate limiting protège autant, sinon plus, contre des clients honnêtes mal
  configurés que contre des attaques délibérées.
- Donne un exemple de technique qui réduit la latence perçue sans réduire la latence réelle,
  et explique pourquoi ça compte quand même pour l'utilisateur.
