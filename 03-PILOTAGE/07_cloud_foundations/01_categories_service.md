# 01 : LES CATÉGORIES DE SERVICE, ET LE SERVICE QU'ON PREND PAR RÉFLEXE

Temps de lecture ~11 min

Les noms de services changent tous les deux ans, les catégories non. Cette leçon te fait raisonner par catégorie, choisir la plus petite qui répond au besoin, et reconnaître les trois surdimensionnements les plus coûteux.

## 1. LA GRILLE DE CHOIX EN TROIS QUESTIONS

Pour chaque composant de ton système, dans cet ordre :

1. **Est-ce que ça tourne en permanence ?** Non → fonction à la demande. Oui → conteneur ou machine.
2. **Est-ce que la donnée est structurée et interrogée par critères ?** Oui → base managée. Non → stockage objet.
3. **Est-ce que quelqu'un d'autre l'exploiterait mieux que moi ?** Oui → service managé, et tu paies pour ne pas être réveillé.

```
requête utilisateur --> diffusion (CDN) --> calcul --> base
                                             |
                                             +--> stockage objet
                                             +--> file d'événements
```

## 2. CALCUL : TROIS FAMILLES, TROIS PROFILS DE FACTURE

| Famille | Facturation | Bon usage | Mauvais usage |
| --- | --- | --- | --- |
| Machine virtuelle | au temps allumé | charge constante, besoin de contrôle système | tâche exécutée 4 fois par jour |
| Conteneur managé | au temps actif, avec mise à l'échelle | API web classique | tâche unique de 200 ms |
| Fonction à la demande | à l'invocation et à la durée | événement rare, webhook, tâche planifiée | trafic constant et élevé, où elle revient plus cher |

```js
// qui casse : une machine allumée en permanence pour un rapport quotidien
// 24 h facturées pour 90 secondes de travail utile, tous les jours de l'année
```

Intuition : en football, on ne fait pas monter toute la défense pour récupérer un ballon anodin. La question n'est jamais "quel service est le plus puissant", mais "quel est le plus petit qui fait le travail sans réveiller personne".

## 3. DONNÉES : QUATRE CONTENANTS À NE PAS CONFONDRE

- **Base relationnelle managée** : données structurées, requêtes croisées, transactions. Le choix par défaut, et il a raison de l'être.
- **Stockage objet** : fichiers entiers, adressés par chemin, peu chers, versionnables. Jamais dans une base.
- **Cache en mémoire** : lectures répétées et identiques, durée de vie courte, perte acceptable. Un cache dont la perte n'est pas acceptable est une base mal nommée.
- **File d'événements** : découplage entre deux contextes bornés ([02-CONSTRUCTION/16_ddd_contrats](../../02-CONSTRUCTION/16_ddd_contrats/00_why_ddd_contrats.md)), absorption de pointe, retraitement possible.

## 4. LES TROIS SURDIMENSIONNEMENTS QUI REVIENNENT TOUJOURS

1. **Le cluster managé pour 300 utilisateurs.** Une instance unique avec sauvegarde suffit, et le passage au cluster se fait quand le SLO l'exige, pas avant.
2. **Le multi-région "au cas où".** Coût multiplié, complexité de cohérence, pour un besoin qu'aucun SLO écrit ne formule.
3. **La chaîne de traitement de données pour trois tableaux.** Une requête planifiée et une table d'agrégats couvrent le besoin réel pendant deux ans.

Risque réel : chaque surdimensionnement se paie deux fois, en facture mensuelle et en temps d'équipe pour exploiter une machinerie que personne ne maîtrise complètement.

## 5. EXERCICES

**Exercice 1 : la cartographie par catégorie (20 min).** Liste les composants de ton fil rouge. Range chacun dans une catégorie, et écris la question de la section 1 qui a tranché.

**Exercice 2 : le procès du plus gros service (15 min).** Prends le composant le plus cher de ta liste. Écris ce que tu perdrais concrètement en prenant le palier inférieur. Si tu ne perds rien de nommable, tu as trouvé ta première économie.

## RÉSUMÉ

Six catégories couvrent 90% des besoins, et les noms commerciaux ne comptent pas. On choisit le plus petit service qui répond, en trois questions. Les fichiers vont au stockage objet, jamais en base. Les trois surdimensionnements classiques, cluster prématuré, multi-région de confort, chaîne de données inutile, se paient en facture et en temps d'équipe.

## ET APRÈS

Une fois les catégories choisies, il faut savoir comment chacune se facture : [02_modeles_cout.md](02_modeles_cout.md).
