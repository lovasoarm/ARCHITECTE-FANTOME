# 02 : ALERTER SUR LE SYMPTÔME, PAS SUR LA CAUSE

Temps de lecture ~11 min

Une alerte a un seul droit : réveiller un humain qui peut agir. Tout le reste est un tableau de bord. Cette leçon te fait trier tes alertes en deux tas et écrire le document que la personne d'astreinte ouvre à 3 h du matin.

## 1. LA RÈGLE DE TRI, EN UNE QUESTION

Pour chaque alerte existante, pose la question : **si je ne fais rien pendant huit heures, est-ce que l'utilisateur le remarque ?**

- Oui, et quelqu'un peut agir maintenant → alerte qui réveille (page).
- Oui, mais rien à faire avant demain → billet automatique, heures ouvrées.
- Non → tableau de bord. Pas d'alerte du tout.

```
alerte sur symptôme  : "les paiements échouent à 12%"        --> agir
alerte sur cause     : "le CPU du nœud 3 est à 91%"          --> peut-être normal
```

Intuition : dans un hôpital, on surveille le patient, pas le débit de la pompe. Le débit de la pompe est un indice ; l'arrêt cardiaque est le symptôme. On câble l'alarme sur le second.

## 2. LES QUATRE SIGNAUX D'OR, ET LEURS SEUILS

| Signal | Ce qu'il dit | Seuil de départ raisonnable |
| --- | --- | --- |
| Latence | l'utilisateur attend | p95 au-dessus du seuil du SLO, 10 min d'affilée |
| Trafic | la charge change | variation de plus de 50% par rapport à la même heure la veille |
| Erreurs | l'utilisateur échoue | plus de 2% de 5xx sur 5 min |
| Saturation | la ressource va manquer | file d'attente ou disque au-dessus de 80% |

Ces seuils sont un point de départ à corriger après trois semaines de vraies données, pas une vérité. Un seuil jamais ajusté est un seuil copié.

## 3. L'ALERTE SUR CONSOMMATION DE BUDGET

La meilleure alerte de fiabilité n'est pas "il y a des erreurs" mais "on brûle le budget trop vite".

```js
// on compare la vitesse de consommation à la vitesse soutenable
const vitesse = tauxErreurSurUneHeure / (1 - objectifSlo);
if (vitesse > 14.4) page("budget d'erreur brûlé en moins de 2 jours");
if (vitesse > 6)    ticket("dérive lente du budget, à regarder cette semaine");
```

Une vitesse de 1 signifie que tu consommeras exactement ton budget sur la fenêtre : c'est le régime nominal. Une vitesse de 14 signifie qu'un mois de budget part en deux jours.

## 4. LA FATIGUE D'ALERTE, ET COMMENT ELLE TUE

Une alerte ignorée trois fois est morte : la quatrième, réelle, sera ignorée aussi. Deux indicateurs à suivre sur tes propres alertes :

- **Taux d'action** : part des alertes qui ont mené à une action. Sous 50%, tu as un problème de seuils, pas de courage.
- **Alertes par nuit** : au-delà d'une par nuit en moyenne, personne ne tient trois mois.

Risque réel : la fatigue d'alerte ne se manifeste jamais le jour où elle s'installe. Elle se manifeste le jour du vrai incident, quand le message a été balayé d'un geste par réflexe.

## 5. LE DOCUMENT D'ASTREINTE (RUNBOOK)

Une alerte sans document associé est une punition. Le format tient en cinq blocs, une page maximum :

1. **Ce que ça veut dire**, en une phrase, côté utilisateur.
2. **Comment vérifier** que c'est réel : la requête, le tableau, le lien exact.
3. **Les trois causes les plus fréquentes**, dans l'ordre observé.
4. **L'action d'atténuation immédiate** : ce qu'on fait pour rendre le service, même dégradé.
5. **Qui appeler** si l'atténuation ne marche pas en 20 minutes, et à quel moment on assume de réveiller cette personne.

```
alerte --> runbook --> atténuation --> post-mortem
                 (jamais l'inverse)
```

## 6. EXERCICES

**Exercice 1 : le grand tri (20 min).** Liste toutes les alertes de ton projet, ou celles de ton dernier emploi. Passe chacune à la question de la section 1. Compte combien tu en supprimes : c'est le meilleur indicateur de la santé de ton système d'alerte.

**Exercice 2 : l'alerte de budget (15 min).** Écris l'alerte de vitesse de consommation pour le SLO produit en [01_sli_slo_budget_erreur.md](01_sli_slo_budget_erreur.md), avec ses deux seuils et ses deux canaux différents.

**Exercice 3 : le runbook de 3 h du matin (25 min).** Écris le document d'astreinte de ton alerte la plus critique, au format des cinq blocs. Test de validité : donne-le à quelqu'un qui ne connaît pas ton projet et demande-lui s'il saurait quoi faire.

## RÉSUMÉ

On alerte sur ce que l'utilisateur subit, pas sur ce que la machine ressent. Les quatre signaux d'or donnent un point de départ à corriger avec de vraies données. L'alerte la plus utile mesure la vitesse de consommation du budget d'erreur. Une alerte sans document d'astreinte d'une page est une punition infligée à la personne de garde.

## ET APRÈS

Quand l'atténuation ne suffit pas, il reste la restauration : [03_reprise_rpo_rto.md](03_reprise_rpo_rto.md).
