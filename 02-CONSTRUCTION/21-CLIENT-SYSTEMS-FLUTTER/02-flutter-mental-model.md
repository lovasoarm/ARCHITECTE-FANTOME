---
stability: evolutif
acte: comprendre
---


> **SCÈNE CRAZYDEVS : Garo :** ton écran ne « sait » rien par magie. Il reçoit un état, rend une représentation et doit survivre quand l’état change sous ses pieds.

# Modèle mental Flutter : arbre, état et reconstruction

## 1. Définition

Flutter construit l'interface à partir d'un arbre de **widgets** (des descriptions immuables d'une partie de l'interface). Un widget ne représente pas nécessairement un élément natif persistant : il décrit ce qui doit être affiché à un instant donné. Le framework compare la nouvelle description à l'arbre existant et met à jour les éléments nécessaires.

Le modèle aide à raisonner sur le rendu, mais il ne faut pas confondre widget, élément monté et objet de rendu : ils ont des responsabilités et des cycles de vie différents.

## 2. Pourquoi l'état est central

L'interface affiche une représentation d'un état métier ou d'un état de présentation. Lorsque cet état change, le widget concerné peut être reconstruit. Une reconstruction (*rebuild*) signifie que Flutter réévalue une description ; elle ne signifie pas automatiquement que tous les pixels sont redessinés ni que toute l'application recommence à zéro.

Un état doit avoir un propriétaire clair. Si l'état est local à un formulaire, le garder près du formulaire évite une complexité inutile. S'il est partagé entre plusieurs écrans, il faut un mécanisme de partage explicite. Un cache serveur obsolète ne doit pas être confondu avec l'état local du formulaire.

## 3. Cycle simplifié

```text
[Événement utilisateur / réponse réseau]
                 |
                 v
          [Mise à jour état]
                 |
                 v
       [Build nouvelle description]
                 |
                 v
       [Comparaison / réconciliation]
                 |
                 v
         [Layout + paint si besoin]
                 |
                 v
           [Image affichée]
```

Le diagramme est simplifié : Flutter possède des phases et objets internes distincts. Pour l'architecture d'application, retiens surtout que l'état produit une nouvelle description et que le framework optimise les mises à jour.

## 4. Immutabilité et identité

L'immutabilité signifie qu'une valeur publiée n'est pas modifiée en place ; une nouvelle valeur représente le nouvel état. Cela rend les changements observables et limite les effets de bord. Les listes et modèles imbriqués doivent aussi être traités avec soin : une référence mutable partagée peut modifier des données sans déclencher le mécanisme de mise à jour attendu.

Les clés (`Key`) aident Flutter à reconnaître l'identité d'un élément quand l'ordre ou le contenu d'une liste change. Une mauvaise clé peut associer l'état local d'un item au mauvais élément après réordonnancement.

## 5. Architecture de l'écran

Un widget d'interface devrait traduire l'état en présentation et envoyer des intentions (ex. `submitOrder`). Il ne devrait pas contenir directement les règles métier, les requêtes HTTP, la logique de retry et la politique de conflit.

```text
[Widget / écran]
      | intention utilisateur
      v
[Contrôleur / ViewModel]
      | appelle
      v
[Cas d'usage métier]
      | utilise
      v
[Repository / port]
      | implémentation
      v
[Cache local ou API]
```

## 6. Cycle de vie et effets de bord

Les opérations asynchrones, abonnements, timers et contrôleurs doivent avoir un cycle de vie maîtrisé. Un écran peut être retiré de l'arbre avant le retour d'une requête : ne pas mettre à jour un contexte détruit. Annuler ou détacher les abonnements quand ils ne sont plus nécessaires. Ne pas lancer une requête réseau à chaque reconstruction sans stratégie explicite : la requête appartient généralement à un événement, un cas d'usage ou un mécanisme de chargement contrôlé.

## 7. Erreurs fréquentes

- Modifier un objet partagé en place puis s'étonner que l'UI ne reflète pas la valeur.
- Mettre toute la logique dans `build`, qui peut être appelée souvent.
- Utiliser un index comme identité stable d'élément dans une liste réordonnée.
- Mélanger état de formulaire, cache serveur et état d'authentification.
- Démarrer des abonnements sans les fermer.
- Conserver un état local alors que son propriétaire logique a disparu.

## 8. Exercice et vérification

Construis le modèle d'un écran de liste de commandes avec états `initial`, `loading`, `loaded`, `empty`, `error` et `refreshing`. Indique qui possède chaque état, ce qui déclenche les transitions et quelle donnée est locale, serveur ou partagée. Simule une réponse réseau après fermeture de l'écran.

**Vérification :** diagramme d'état, tests du contrôleur/ViewModel et justification des clés/identités. Échec si le réseau est appelé depuis `build`, si une erreur est silencieusement avalée ou si le cache est présenté comme toujours frais.

## 9. Suite et preuve

Prérequis : programmation asynchrone, HTTP, état et tests. Suite : architecture client, stockage hors ligne et synchronisation.

**Preuve attendue :** expliquer le cycle widget/état, modéliser les états d'écran et démontrer par test que les effets de bord sont découplés de la construction de l'UI.

## Exercice de cartographie conservé

Choisis un écran complexe du fil rouge. Pendant 15 minutes, ne modifie pas le code. Cartographie événements entrants, état, décisions, appels réseau et sorties visibles. Réponds ensuite : **quel morceau de logique survivrait intact si Flutter disparaissait demain ?** La réponse doit pointer vers le modèle métier ou le contrat, jamais vers un widget.
