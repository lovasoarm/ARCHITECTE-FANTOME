---
stability: evolutif
acte: comprendre
freshness_status: "verified_reference"
source_verified_on: "2026-11-03"
source_type: "primary"
canonical_resource: "02-CONSTRUCTION/21-CLIENT-SYSTEMS-FLUTTER/README.md"
source_url: "https://docs.flutter.dev/resources/architectural-overview"
source_scope: "Les références officielles Flutter citées dans la section Sources couvrent le modèle déclaratif (widgets immuables), la relation état/build, les arbres Element/RenderObject, le cycle de vie et les clés, ainsi que les responsabilités View/ViewModel/Repository/Service et le caractère optionnel de la couche domaine. Cette vérification confirme l’identité et la pertinence des références dans ce périmètre ; elle ne valide pas chaque phrase ni un code applicatif particulier."
source_registry_id: "PER-0119"
provenance_note: "Références officielles Flutter consultées le 2026-11-03 ; leur portée est limitée aux mécanismes et responsabilités explicitement indiqués dans source_scope. Aucun snippet applicatif n’a été exécuté."
source_access_status: "OFFICIAL_FLUTTER_ARCHITECTURAL_OVERVIEW_UI_AND_APP_ARCHITECTURE_GUIDES_RETRIEVED_2026-11-03"
claim_alignment_status: "FLUTTER_WIDGET_STATE_TREE_KEYS_AND_APP_LAYERING_SCOPE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

> **SCÈNE CRAZYDEVS : Garo :** ton écran ne « sait » rien par magie. Il reçoit un état, rend une représentation et doit survivre quand l’état change sous ses pieds.

# Modèle mental Flutter : arbre, état et reconstruction

## 1. Définition

Flutter construit l'interface à partir d'un arbre de **widgets** (des descriptions immuables d'une partie de l'interface). Un widget ne représente pas nécessairement un élément natif persistant : il décrit ce qui doit être affiché à un instant donné. Le framework compare la nouvelle description à l'arbre existant et met à jour les éléments nécessaires.

Le modèle aide à raisonner sur le rendu, mais il ne faut pas confondre widget, élément monté et objet de rendu : ils ont des responsabilités et des cycles de vie différents.

## 2. Pourquoi l'état est central

L'interface affiche une représentation d'un état métier ou d'un état de présentation. Lorsque cet état change, le widget concerné peut être reconstruit. Une reconstruction (_rebuild_) signifie que Flutter réévalue une description ; elle ne signifie pas automatiquement que tous les pixels sont redessinés ni que toute l'application recommence à zéro.

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

<!-- AF-DIAGRAM:ui -->

## Repère visuel utile : Parcours multi-états pour le demandeur Kintana

```text
saisie -> envoi avec clé stable
            |
            v
       réponse API ?
       /    |     \
   succès  erreur  timeout
     |      |       |
  confirmé retry?  état inconnu
                    |
                    v
             vérifier avant renvoi
```

## Sources officielles : périmètre vérifié

- [Flutter architectural overview](https://docs.flutter.dev/resources/architectural-overview) : widgets immuables, état, méthode `build` et séparation des arbres internes.
- [Building user interfaces with Flutter](https://docs.flutter.dev/ui) : cycle de vie des widgets, gestion de l’état et rôle des clés dans la réconciliation des éléments.
- [Guide to app architecture](https://docs.flutter.dev/app-architecture/guide) : responsabilités des Views, ViewModels, Repositories et Services ; couche domaine optionnelle.

Ces documents étayent les mécanismes nommés ci-dessus. Ils ne remplacent pas les tests du code de ton application ni une revue complète de chaque affirmation.

<!-- AF-LESSON-PROFILE: ui -->

## Repères de décision

- **Pourquoi :** Un flux utilisateur clair réduit les erreurs, les doubles actions et les abandons. L'interface doit montrer les états réels du système, pas inventer un succès optimiste.
- **Quand l’utiliser / quand l’éviter :** Modélise les parcours et états avant d'ajouter des écrans. Sur un réseau instable, prévois attente, reprise et conflit ; sur une action sensible, demande confirmation si nécessaire.
- **Limites :** Le front ne remplace ni autorisation serveur ni cohérence transactionnelle. Les états offline ne sont pas des confirmations serveur ; les tests visuels seuls ne prouvent pas l'accessibilité.

## Mécanisme : la version sans magie

Décris l'état métier, l'état de la requête et l'état de l'interface séparément. Définis les transitions et les messages pour chaque résultat.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Modèle mental Flutter : arbre, état et reconstruction** se rattache à ce cas concret : Un demandeur Kintana peut perdre le réseau en envoyant une demande. Il doit voir si elle est en attente, confirmée ou rejetée et ne pas la renvoyer au hasard.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Parcours multi-états pour le demandeur Kintana

> **Arc One Piece / Grand Line :** le parcours doit rester lisible même quand le réseau fait des vagues. L'utilisateur ne doit pas deviner si son action est partie.

**Mission liée à « Modèle mental Flutter : arbre, état et reconstruction » :** Construis le parcours de création et suivi d'une demande avec loading, empty, error, success et offline. Ajoute navigation clavier, annonces de statut et prévention du double envoi.

**Livrable :** un flux d'écran, les composants d'état, une matrice de parcours et des tests clavier / réseau simulé.

**Critères d’acceptation :** chaque écran correspond à un état réel ; le succès attend le serveur ; les erreurs sont récupérables ; le brouillon et la clé d'idempotence évitent la duplication ; les contrôles sont accessibles.

**Transfert obligatoire :** Le serveur accepte la demande mais la réponse se perd. Explique ce que l'interface doit afficher et comment réconcilier le statut.
