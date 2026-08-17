> **CE MODULE RÉUTILISE** : observabilité (05_observability), sécurité (04_security), gestion d'erreurs (01-CADRAGE/04_error_handling), tests (02-CONSTRUCTION/03_testing). Si un de ces prérequis est flou, retourne le voir avant. Ce module ne les réexplique pas.

> **OÙ CE MODULE EST RECROISÉ** : au palier [04-EPREUVE](../../04-EPREUVE/06-CAPSTONE-ARENA/03-deliverables.md), le SLO écrit ici devient un livrable obligatoire du capstone, croisé avec l'ADR d'architecture (famille S2, [02-CONSTRUCTION/16_ddd_contrats](../../02-CONSTRUCTION/16_ddd_contrats/00_why_ddd_contrats.md)) et le budget cloud (famille S1, [07_cloud_foundations](../07_cloud_foundations/00_why_cloud_foundations.md)) : le même SLO doit être tenable avec le budget que tu as chiffré, sinon l'un des deux est faux. Recroisé une seconde fois au palier [05-MAITRISE/08_maitrise_staff_engineer](../../05-MAITRISE/08_maitrise_staff_engineer/01_dossier_unique.md), où tu dois défendre ton budget d'erreur devant un interlocuteur non technique.

# POURQUOI CE MODULE MÉRITE TON TEMPS : FIABILITÉ, SLO, REPRISE

Tu sais déjà voir ce qui se passe en production : c'est l'observabilité. Ce module te fait passer de "je vois" à "j'ai promis quelque chose et je sais si je le tiens". Un Staff Engineer ne dit pas "le service est lent" : il dit "on a brûlé 40% du budget d'erreur du trimestre en trois jours, voilà ce qu'on arrête". C'est cette phrase-là qui fait qu'on t'écoute en réunion.

## 1. SLI, SLO, SLA : TROIS MOTS, TROIS ENGAGEMENTS DIFFÉRENTS

Intuition : dans le football, le SLI c'est le pourcentage de passes réussies mesuré par la télémétrie, le SLO c'est l'objectif que le coach fixe au groupe, le SLA c'est la clause du contrat qui coûte de l'argent au club si l'objectif n'est pas tenu.

- **SLI** (Service Level Indicator : la mesure brute) : "99,2% des requêtes ont répondu sous 300 ms sur 30 jours".
- **SLO** (Service Level Objective : l'objectif interne) : "99% des requêtes sous 300 ms". C'est toi qui l'écris.
- **SLA** (Service Level Agreement : l'engagement contractuel) : le SLO signé avec un client, avec une pénalité derrière.

```js
// minimal : un SLI se calcule, il ne se ressent pas
const sli = requetesSous300ms / requetesTotales;
```

```js
// réaliste : le budget d'erreur, la seule métrique qui pilote vraiment
const objectif = 0.99;                 // SLO
const budget = 1 - objectif;           // 1% de requêtes ont le droit d'échouer
const consomme = (1 - sli) / budget;   // 0.4 => 40% du budget brûlé
```

```js
// qui casse : viser 100%
const objectif = 1; // budget d'erreur = 0
// conséquence : plus aucun déploiement n'est justifiable, puisque tout
// déploiement risque de consommer un budget qui n'existe pas. Une équipe
// avec un SLO à 100% ne livre plus rien, ou ment sur ses chiffres.
```

Risque réel : un SLO sans budget d'erreur explicite est un vœu. Le budget d'erreur est ce qui autorise à livrer vite quand tout va bien et ce qui impose de s'arrêter quand il est consommé.

## 2. L'ALERTE QUI RÉVEILLE QUELQU'UN

Une alerte se juge sur une seule question : quelqu'un doit-il se lever maintenant. Si la réponse est non, ce n'est pas une alerte, c'est un tableau de bord.

```
symptôme utilisateur --> alerte qui réveille
cause technique      --> tableau de bord, pas d'alerte
```

Alerte sur "le taux d'erreur du parcours de réservation dépasse 5% pendant 10 minutes" : oui. Alerte sur "le CPU d'une machine dépasse 80%" : non, c'est une cause possible, pas une douleur.

Risque réel : dans Walking Dead, une sirène qui sonne toute la nuit finit par attirer les morts et par endormir les vivants. Une alerte qui se déclenche cinquante fois par semaine ne réveille plus personne à la cinquante-et-unième, celle qui comptait.

## 3. SAUVEGARDE ET REPRISE : UNE SAUVEGARDE NON RESTAURÉE N'EXISTE PAS

Deux chiffres à écrire avant d'écrire le moindre script :

- **RPO** (Recovery Point Objective : combien de données tu acceptes de perdre) : 15 minutes, 24 heures.
- **RTO** (Recovery Time Objective : combien de temps tu acceptes d'être à l'arrêt) : 1 heure, 1 jour.

```
incident --> détection --> décision --> restauration --> vérification
   |------------------ RTO ------------------------|
dernière sauvegarde ------|--- données perdues = RPO
```

```bash
# minimal
pg_dump projet > sauvegarde.sql
```

```bash
# réaliste : la restauration est testée, datée, chronométrée
psql projet_test < sauvegarde.sql && node scripts/verifier_integrite.js
```

```
# qui casse : la sauvegarde tourne depuis huit mois, personne n'a jamais
# restauré. Le jour J, le fichier fait 12 octets : le job échouait en
# silence depuis mars, et le seul indicateur suivi était "le job a tourné",
# pas "le fichier contient quelque chose de restaurable".
```

Risque réel : la question n'est jamais "avons-nous des sauvegardes", elle est "quand avons-nous restauré pour la dernière fois, et combien de temps ça a pris".

## 4. RÉSILIENCE : TIMEOUT, RETRY, DISJONCTEUR

Trois réflexes, dans cet ordre, jamais l'un sans les autres :

1. **Timeout** : tout appel réseau a une limite de temps. Sans timeout, une dépendance lente devient une panne totale.
2. **Retry avec recul exponentiel et jitter** (attente qui double, plus un bruit aléatoire) : sinon tous tes clients réessaient à la même seconde et achèvent le service.
3. **Disjoncteur** (circuit breaker : on arrête d'appeler un service tombé, on répond dégradé) : il protège le service d'en face autant que le tien.

```js
const reponse = await fetch(url, { signal: AbortSignal.timeout(2000) });
```

Risque réel : un retry sans disjoncteur transforme une panne partielle en panne généralisée. C'est le mécanisme exact de la plupart des grosses pannes publiques.

## 5. EXERCICES

**Exercice 1 : ton premier SLO (15 min).** Choisis le parcours le plus critique de ton projet fil rouge. Écris une phrase : "X% des [action] répondent en moins de Y ms, mesuré sur 30 jours". Calcule le budget d'erreur en nombre de requêtes ratées autorisées par semaine. Un pourcentage sans ce nombre absolu ne parle à personne.

**Exercice 2 : le tri des alertes (10 min).** Liste cinq choses que tu surveillerais. Classe-les : réveille quelqu'un / tableau de bord. Justifie chaque "réveille quelqu'un" par la douleur utilisateur exacte.

**Exercice 3 : la restauration chronométrée (25 min).** Sauvegarde les données de ton projet, détruis la base locale, restaure, chronomètre. Écris ton RTO réel mesuré, pas espéré. Compare-le à celui que tu avais annoncé avant de commencer.

## RÉSUMÉ

Un SLI se mesure, un SLO s'écrit, un SLA se signe et se paie. Le budget d'erreur est la seule métrique qui arbitre vraiment entre livrer vite et se stabiliser. Une alerte qui ne réveille personne n'est pas une alerte. Une sauvegarde jamais restaurée est une croyance, pas une sécurité. Timeout, retry avec recul, disjoncteur : les trois ensemble, sinon le retry seul amplifie la panne.
