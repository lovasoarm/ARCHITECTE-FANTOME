# 01 : ÉCRIRE UN SLI, UN SLO ET UN BUDGET D'ERREUR QUI TIENNENT

Temps de lecture ~12 min

Un SLO qui n'est pas calculable en une requête n'est pas un SLO : c'est une intention. Cette leçon te fait produire la phrase, la formule et le nombre de requêtes ratées par semaine que tu as le droit de dépenser.

## 1. CHOISIR LE BON SLI : CELUI QUE L'UTILISATEUR SUBIT

Un SLI se choisit sur un parcours utilisateur, jamais sur un composant. "Le CPU est à 40%" n'intéresse personne : l'utilisateur ne voit pas le CPU.

| Type de SLI | Formule | Quand le choisir |
| --- | --- | --- |
| Disponibilité | `requetes_ok / requetes_totales` | parcours de lecture et d'écriture classiques |
| Latence | `requetes_sous_seuil / requetes_totales` | tout écran qu'un humain attend |
| Fraîcheur | `age_donnee < seuil` | tableaux de bord, exports, réplication |
| Exactitude | `resultats_corrects / resultats_totaux` | calculs, facturation, brique IA |

```js
// minimal : le SLI de latence est une proportion, pas une moyenne
const sli = requetes.filter((r) => r.ms < 300).length / requetes.length;
```

```js
// réaliste : fenêtre glissante, et on exclut ce qu'on ne contrôle pas
const fenetre = requetes.filter((r) => r.date > ilYA(30, "jours") && !r.annuleeParClient);
const sli = fenetre.filter((r) => r.ok && r.ms < 300).length / fenetre.length;
```

```js
// qui casse : la moyenne, qui cache exactement ce qu'il faut voir
const moyenne = requetes.reduce((a, r) => a + r.ms, 0) / requetes.length; // 180 ms
// 95% des requêtes répondent en 90 ms, 5% en 2 000 ms : la moyenne dit "tout va bien",
// et ces 5%, ce sont toujours les mêmes utilisateurs, sur le même parcours.
```

Règle : un SLI s'exprime en percentile (p95, p99), jamais en moyenne. La moyenne est la statistique préférée des systèmes qui n'ont jamais eu d'incident déclaré.

## 2. LA PHRASE DE SLO, EN UN SEUL FORMAT

> "Un utilisateur qui [action précise] obtient [résultat mesurable] dans [X %] des cas, sur [fenêtre]."

Trois pièges, tous fréquents :

- **Le SLO à 100%.** Il interdit toute mise en production. Un système qui ne change jamais est un système qui meurt lentement.
- **Le SLO copié sur le voisin.** 99,99% pour un outil interne utilisé par 12 personnes en heures ouvrées coûte cher et ne sert à rien.
- **Le SLO sans fenêtre.** "99% de disponibilité" sur quelle durée ? Un mois glissant et un trimestre ne donnent pas le même verdict le même jour.

Intuition : dans un championnat, personne ne promet de gagner tous les matchs. On promet une place dans les quatre premiers sur une saison. Le SLO est cette promesse-là : un niveau, sur une fenêtre, avec le droit de perdre un nombre connu de matchs.

## 3. LE BUDGET D'ERREUR : TRADUIRE UN POURCENTAGE EN DÉCISIONS

```
budget = (1 - objectif) * volume_de_la_fenetre
```

| Objectif | Indisponibilité tolérée / 30 jours | Sur 43 200 requêtes/semaine |
| --- | --- | --- |
| 99 % | 7 h 12 min | 432 requêtes ratées/semaine |
| 99,5 % | 3 h 36 min | 216 requêtes ratées/semaine |
| 99,9 % | 43 min | 43 requêtes ratées/semaine |
| 99,99 % | 4 min 20 s | 4 requêtes ratées/semaine |

Ce tableau est le seul argument qui fait reculer quelqu'un qui demande "quatre neuf" par confort : quatre requêtes ratées par semaine, cela signifie une astreinte qui répond en moins de cinq minutes, la nuit, tous les jours.

```js
// le budget d'erreur se pilote comme une trésorerie
const budgetHebdo = Math.floor((1 - 0.995) * 43200); // 216
const consomme = ratesDeLaSemaine();                 // 189
const restant = budgetHebdo - consomme;              // 27 : on gèle les changements risqués
```

## 4. LA POLITIQUE DE BUDGET : ÉCRITE AVANT L'INCIDENT, PAS PENDANT

Un budget d'erreur ne sert à rien si personne n'a écrit ce qui se passe quand il est épuisé. La politique tient en trois lignes, décidées à froid, signées par la personne qui arbitre les priorités :

1. Budget consommé à moins de 50% : on livre normalement, on prend des risques mesurés.
2. Entre 50% et 100% : on gèle les changements non liés à la fiabilité, les corrections passent en premier.
3. Budget épuisé : arrêt des nouvelles fonctionnalités jusqu'à retour sous le seuil, et post-mortem écrit.

Risque réel : sans cette politique écrite, le budget d'erreur devient un tableau de bord de plus. Il n'a de valeur que le jour où il fait annuler une livraison attendue, et ce jour-là il faut pouvoir montrer une règle écrite avant, pas une opinion improvisée.

## 5. EXERCICES

**Exercice 1 : le SLI du parcours qui compte (15 min).** Prends ton projet fil rouge et nomme le parcours dont l'échec ferait partir un utilisateur. Écris son SLI avec la formule exacte, la source des données, et la fenêtre.

**Exercice 2 : la phrase et le nombre (20 min).** Écris la phrase de SLO au format imposé ci-dessus, puis convertis-la en requêtes ratées par semaine avec ton volume réel estimé. Si tu ne connais pas ton volume, estime-le et note l'hypothèse : un budget avec une hypothèse datée vaut mieux qu'un pourcentage sans volume.

**Exercice 3 : la politique à froid (10 min).** Écris tes trois seuils de politique de budget. Pour chacun, nomme précisément ce que tu arrêtes. "On fera attention" n'est pas une action.

## RÉSUMÉ

Un SLI se mesure sur un parcours utilisateur, en percentile, jamais en moyenne. Un SLO est une phrase avec une action, un seuil, un pourcentage et une fenêtre. Un budget d'erreur est ce pourcentage traduit en nombre de requêtes ratées autorisées, et il ne sert qu'accompagné d'une politique écrite à froid qui dit ce qu'on arrête quand il fond.

## ET APRÈS

Un budget qui fond doit prévenir quelqu'un : c'est l'objet de [02_alerting_astreinte.md](02_alerting_astreinte.md).
