---
stability: intemporel
acte: appliquer
cognitive_level: L3
perturbation_modes: [defaut_cache, regression]
anti_recipe_key: defaut_cache+regression
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Prison Break :** Scofield modifie son plan alors qu’il est déjà dans le tunnel. Le client offline fait pareil : il doit agir avec un bout de vérité, puis réconcilier le reste plus tard.

# Offline-first et synchronisation : considérer le réseau comme intermittent

<!-- AF-DIAGRAM:offline_sync -->

## 1. Définition

Une application **offline-first** (conçue pour rester utile hors connexion) lit d'abord une représentation locale fiable et synchronise les changements vers le serveur lorsque la connexion est disponible. Le mode hors ligne n'est pas seulement un écran « pas d'Internet » : il implique stockage durable, file de changements, reprise, déduplication et résolution de conflits.

## 2. Architecture logique

```text
[UI]
 |
 v
[Cas d'usage]
 |
 v
[Repository]
 |                       ^
 +--> [Base locale]       |
 |         |              |
 |         v              |
 |   [Outbox / file] ---> [Synchroniseur]
 |                            |
 |                            v
 |                        [API distante]
 |                            |
 +<---- [Réponse / conflit / version]
```

L'UI observe les données locales. Une commande métier modifie la base locale et ajoute une opération à une outbox (boîte d'envoi persistante) dans la même transaction locale lorsque la base le permet. Le synchroniseur envoie ensuite les opérations et enregistre les accusés de réception.

## 3. Écriture robuste

Pour une modification `UpdateAddress` :

1. valider localement les règles que le client peut connaître ;
2. générer un identifiant d'opération unique ;
3. persister la nouvelle donnée locale et l'opération en attente de manière atomique ;
4. mettre l'interface à jour depuis la base locale ;
5. lorsque le réseau revient, envoyer l'opération avec son identifiant, sa version de base et ses paramètres ;
6. le serveur vérifie identité, autorisation, idempotence et version ;
7. le client enregistre l'accusé ou place le conflit en résolution ;
8. le retry réutilise le même identifiant d'opération.

**Idempotence** signifie que répéter la même commande identifiée ne crée pas plusieurs effets métier. Une simple politique de retry côté client ne suffit pas : le serveur doit reconnaître les doublons et renvoyer le résultat déjà enregistré.

## 4. Synchronisation et conflits

La synchronisation n'est pas une simple comparaison d'horodatages. Les horloges des appareils peuvent être fausses ou décalées. Préférer des versions serveur, numéros de révision, ETag ou séquences métier. L'horodatage peut aider au diagnostic mais ne doit pas être l'unique preuve d'ordre si l'exactitude est importante.

### Scénario à deux appareils

Une commande `ORD-42` possède une adresse « 12 rue A », version serveur 7. Appareil A passe hors ligne et écrit « 15 rue A ». Appareil B passe hors ligne et écrit « 12 rue B ». Les deux opérations sont basées sur la version 7. A se reconnecte en premier : le serveur accepte sa modification et passe à la version 8. B envoie ensuite sa commande avec `baseVersion=7` : le serveur constate que la ressource est déjà en version 8 et répond `409 Conflict` (conflit), avec la version courante.

Le client B ne doit pas écraser silencieusement la version 8. La résolution dépend du domaine : afficher les deux valeurs et demander un choix, fusionner champ par champ si les règles métier l'autorisent, ou appliquer une règle de priorité explicite et auditée. Pour une adresse de livraison déjà expédiée, la bonne décision peut être de bloquer la modification et demander une intervention, pas de choisir automatiquement la dernière horloge.

```text
Appareil A (offline)             Serveur             Appareil B (offline)
  valeur A, base v7                 |                  valeur B, base v7
          |                        |                         |
          +------ sync A ----------> v8                      |
          |                        |<--------- sync B -------+
          |                        |  baseVersion=7 != v8
          |                        v
          |                  [409 Conflict]
          |                        |
          |                 [récupérer v8]
          |                        |
          |             [règle métier / fusion / humain]
          |                        |
          +<------ état résolu + nouvelle version -----------+
```

## 5. Détection et résolution déterministes

Définir pour chaque type de donnée : propriétaire de la vérité, version, politique de conflit, possibilité de fusion, effet métier irréversible et besoin d'audit. Ne pas utiliser « last write wins » par défaut. Cette stratégie ne convient que si la perte de mise à jour est acceptable et si l'ordre est défini avec une source de temps fiable.

Une résolution doit être reproductible : même état initial, mêmes opérations ordonnées et même règle produisent le même résultat. Si une décision humaine est nécessaire, persister l'état `conflict_pending` et afficher les deux versions sans perdre l'édition locale.

## 6. Reprise après crash

Le processus peut se fermer après l'envoi mais avant de recevoir l'accusé. Au redémarrage, il doit renvoyer le même `operationId`, pas créer une nouvelle opération. Le serveur déduplique. Une opération peut être `pending`, `in_flight`, `acknowledged`, `conflict`, `rejected` ou `needs_attention`. Une transition terminale doit être documentée.

## 7. Pièges

- Générer un nouvel ID au retry : double paiement ou double commande.
- Stocker l'outbox hors transaction de la donnée locale : l'une peut exister sans l'autre.
- « Dernière date gagne » avec horloge locale : écrasement imprévisible.
- Effacer l'opération après timeout : le serveur peut l'avoir exécutée.
- Réconcilier automatiquement un statut métier irréversible.
- Présenter un cache très ancien comme vérité actuelle sans indicateur de fraîcheur.

## 8. Exercice progressif

Implémenter une outbox pour les mises à jour d'un profil : persistance locale, ID d'opération, retry avec backoff borné, déduplication serveur simulée, conflit par version et reprise après fermeture simulée. Ajouter un test où l'envoi est accepté par le serveur mais où le client perd la réponse.

**Vérification :** deux envois avec le même ID ne produisent qu'un effet ; un conflit ne perd aucune des deux versions ; un redémarrage reprend la même opération ; les états d'erreur sont observables. Fournir tests et diagramme de séquence.

## 9. Lien et preuve

Prérequis : HTTP, persistance, transactions et programmation asynchrone. Suite : authentification, résilience, observabilité.

**Preuve attendue :** démonstration hors ligne, reprise après crash, test d'idempotence et scénario de conflit expliqué par une règle métier défendable.

## Checkpoint de profondeur conservé

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. N'utilise pas les titres de la leçon comme plan. Compare ensuite ta reconstruction avec la source et note ce qui manquait. Cette variation vérifie le transfert du modèle mental, pas la mémorisation des mots.

<!-- AF-LESSON-PROFILE: ui -->

## Repères de décision

- **Pourquoi :** Un flux utilisateur clair réduit les erreurs, les doubles actions et les abandons. L'interface doit montrer les états réels du système, pas inventer un succès optimiste.
- **Quand l’utiliser / quand l’éviter :** Modélise les parcours et états avant d'ajouter des écrans. Sur un réseau instable, prévois attente, reprise et conflit ; sur une action sensible, demande confirmation si nécessaire.
- **Limites :** Le front ne remplace ni autorisation serveur ni cohérence transactionnelle. Les états offline ne sont pas des confirmations serveur ; les tests visuels seuls ne prouvent pas l'accessibilité.

## Mécanisme : la version sans magie

Décris l'état métier, l'état de la requête et l'état de l'interface séparément. Définis les transitions et les messages pour chaque résultat.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Offline-first et synchronisation : considérer le réseau comme intermittent** se rattache à ce cas concret : Un demandeur Kintana peut perdre le réseau en envoyant une demande. Il doit voir si elle est en attente, confirmée ou rejetée et ne pas la renvoyer au hasard.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Parcours multi-états pour le demandeur Kintana

> **Arc One Piece / Grand Line :** le parcours doit rester lisible même quand le réseau fait des vagues. L'utilisateur ne doit pas deviner si son action est partie.

**Mission liée à « Offline-first et synchronisation : considérer le réseau comme intermittent » :** Construis le parcours de création et suivi d'une demande avec loading, empty, error, success et offline. Ajoute navigation clavier, annonces de statut et prévention du double envoi.

**Livrable :** un flux d'écran, les composants d'état, une matrice de parcours et des tests clavier / réseau simulé.

**Critères d’acceptation :** chaque écran correspond à un état réel ; le succès attend le serveur ; les erreurs sont récupérables ; le brouillon et la clé d'idempotence évitent la duplication ; les contrôles sont accessibles.

**Transfert obligatoire :** Le serveur accepte la demande mais la réponse se perd. Explique ce que l'interface doit afficher et comment réconcilier le statut.
