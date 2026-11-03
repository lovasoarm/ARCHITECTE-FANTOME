---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [solution_concurrente, transmission]
anti_recipe_key: solution_concurrente+transmission
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Attack on Titan :** le mur de l’interface est joli. Puis le réseau tombe. Puis le token expire. Puis le serveur répond à moitié. Bienvenue dans le vrai client.

# Pourquoi Client Systems existe

Un client est un participant distribué : il a une horloge, une mémoire locale, un réseau imparfait, une identité, une version et des utilisateurs impatients.

La question Staff n’est pas « comment faire cet écran ? » mais :

> « Quelles garanties le système doit-il encore tenir quand cet écran n’a plus son serveur idéal ? »

## À retenir

1. l’UI montre un état ; elle n’est pas la vérité absolue ;
2. le cache crée une seconde vérité temporaire ;
3. le réseau transforme une action locale en contrat distribué ;
4. la UX d’erreur est une partie de la fiabilité.

## Piège

Construire une belle UI puis ajouter `try/catch` à la fin est l’équivalent de mettre un casque à Scofield après l’évasion. Trop tard : les décisions importantes étaient déjà prises.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

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

<!-- AF-LESSON-PROFILE: ui -->

## Repères de décision

- **Pourquoi :** Un flux utilisateur clair réduit les erreurs, les doubles actions et les abandons. L'interface doit montrer les états réels du système, pas inventer un succès optimiste.
- **Quand l’utiliser / quand l’éviter :** Modélise les parcours et états avant d'ajouter des écrans. Sur un réseau instable, prévois attente, reprise et conflit ; sur une action sensible, demande confirmation si nécessaire.
- **Limites :** Le front ne remplace ni autorisation serveur ni cohérence transactionnelle. Les états offline ne sont pas des confirmations serveur ; les tests visuels seuls ne prouvent pas l'accessibilité.

## Mécanisme : la version sans magie

Décris l'état métier, l'état de la requête et l'état de l'interface séparément. Définis les transitions et les messages pour chaque résultat.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Pourquoi Client Systems existe** se rattache à ce cas concret : Un demandeur Kintana peut perdre le réseau en envoyant une demande. Il doit voir si elle est en attente, confirmée ou rejetée et ne pas la renvoyer au hasard.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Parcours multi-états pour le demandeur Kintana

> **Arc One Piece / Grand Line :** le parcours doit rester lisible même quand le réseau fait des vagues. L'utilisateur ne doit pas deviner si son action est partie.

**Mission liée à « Pourquoi Client Systems existe » :** Construis le parcours de création et suivi d'une demande avec loading, empty, error, success et offline. Ajoute navigation clavier, annonces de statut et prévention du double envoi.

**Livrable :** un flux d'écran, les composants d'état, une matrice de parcours et des tests clavier / réseau simulé.

**Critères d’acceptation :** chaque écran correspond à un état réel ; le succès attend le serveur ; les erreurs sont récupérables ; le brouillon et la clé d'idempotence évitent la duplication ; les contrôles sont accessibles.

**Transfert obligatoire :** Le serveur accepte la demande mais la réponse se perd. Explique ce que l'interface doit afficher et comment réconcilier le statut.
