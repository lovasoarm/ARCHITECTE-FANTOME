---
stability: intemporel
acte: pilotage
noyau: oui
cognitive_level: L3
perturbation_modes: [changement_contexte, changement_echelle]
anti_recipe_key: changement_contexte+changement_echelle
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : QG de Konoha :** six équipes, trois régions, une mission critique. Un tableau de bord qui clignote ne suffit pas : il faut savoir quel comportement compte, à quel seuil et quelle action suivre.

# Pourquoi ce module mérite ton temps : fiabilité et SLO

Temps de lecture indicatif : 8 min.

T'as déjà entendu « le site doit être fiable » sans savoir ce que cela signifie concrètement ? Une promesse de fiabilité utile doit être observable, limitée dans le temps et reliée à une décision.

## 1. Le problème

« Fiable » sans définition mesurable est difficile à vérifier. Une équipe peut transformer cette attente en objectif, par exemple : **sur les 28 derniers jours, au moins 99,5 % des requêtes éligibles de consultation ont reçu une réponse conforme au contrat du service**.

Il faut encore préciser ce que signifie « conforme » : statut attendu, absence de timeout, données exploitables et, si c'est important pour l'utilisateur, délai maximal de réponse. Un objectif de latence et un objectif de succès sont deux indicateurs distincts, sauf si le SLI (indicateur de niveau de service) les combine explicitement.

## 2. Le mécanisme : SLI, SLO et budget d'erreur

<!-- AF-DIAGRAM:slo -->

- **SLI** : la mesure réellement observée, avec son numérateur, son dénominateur et son point de mesure.
- **SLO** : la cible choisie pour cette mesure et sa fenêtre d'observation.
- **SLA** : un engagement contractuel pouvant prévoir des conséquences si le niveau promis n'est pas tenu.
- **Budget d'erreur** : la part d'événements non conformes que le SLO autorise pendant sa fenêtre. Il ne désigne pas nécessairement une durée d'indisponibilité.

Exemple fictif : si le SLI compte les requêtes conformes et que 200 000 requêtes éligibles sont observées sur la fenêtre, un SLO de 99,5 % laisse 0,5 % d'événements non conformes, soit 1 000 requêtes. Selon la définition du SLI, ces événements peuvent être des erreurs serveur, des timeouts ou des réponses trop lentes. Ils ne sont pas tous forcément des pannes complètes.

Ne convertis ce budget en minutes d'indisponibilité que si le SLI est défini comme une mesure de disponibilité dans le temps et que les hypothèses de calcul sont explicites. Un budget calculé sur des requêtes ne se transforme pas automatiquement en heures d'arrêt.

```text
besoin utilisateur
       |
       v
SLI défini et mesuré
       |
       v
comparaison à la cible SLO
       |
       +------> objectif tenu : budget disponible
       |
       +------> objectif manqué : budget consommé
                            |
                            v
                    décision opérationnelle
             (livrer, réduire le risque, réparer)
```

## 3. Ce que le budget permet de décider

Le budget d'erreur donne un langage commun à l'équipe : il aide à décider quand poursuivre une livraison, réduire le risque, investir dans la fiabilité ou suspendre temporairement les changements les plus risqués. Les seuils et actions doivent être définis selon le service ; il n'existe pas de politique universelle valable pour toutes les équipes.

Viser 100 % n'est pas automatiquement absurde ni automatiquement nécessaire. Une cible plus stricte peut demander davantage de redondance, de capacité, de tests, d'astreinte et de procédures. Son coût marginal dépend du système et de l'impact d'une panne. La bonne cible dépend de ce que les utilisateurs doivent réellement pouvoir faire et du coût d'une interruption.

<!-- AF-LESSON-PROFILE: reliability -->

## 4. Repères de décision

- **Pourquoi :** un SLO transforme une attente vague en objectif vérifiable et relie la qualité de service aux décisions de livraison et d'exploitation.
- **Quand l'utiliser / quand l'éviter :** utilise-le pour un parcours ou une capacité dont la dégradation compte pour un utilisateur ou un métier. Ne crée pas un SLO pour chaque composant sans vérifier que sa mesure aide à comprendre le parcours réellement vécu.
- **Limites :** un SLI mal défini peut masquer les erreurs ; une moyenne peut cacher les requêtes lentes ; un bon SLO ne garantit pas une bonne expérience si l'indicateur ne représente pas le besoin. Un SLO n'est pas non plus un SLA par défaut.

## 5. Ancrage produit / terrain : Kintana

Pour Kintana, le parcours de consultation d'une demande ou d'un créneau doit fournir une réponse exploitable. Un SLI possible suit la part de requêtes éligibles qui reçoivent une réponse conforme ; un autre peut suivre le pourcentage de réponses sous un seuil de latence. Les deux mesures répondent à des questions différentes.

Les jeux de données et profils de charge fournis par le curriculum sont des scénarios pédagogiques. Une mesure obtenue dans un exercice doit être étiquetée `LAB` ou `SIMULATION`, pas `PRODUCTION`.

## 6. Mission utile : écrire une promesse mesurable

À partir du parcours de consultation Kintana, rédige une proposition d'une page qui définit **un** SLI prioritaire, son SLO, sa fenêtre, son dénominateur, les exclusions justifiées et la manière de réagir si le budget est consommé. Ajoute un second indicateur seulement s'il mesure un autre risque important, par exemple la latence.

**Livrable :** un brouillon de `SLO.md` comprenant la définition de la mesure, la cible, la fenêtre, le calcul du budget et la politique d'action.

**Critères d'acceptation :** le numérateur et le dénominateur sont compréhensibles ; les requêtes exclues sont justifiées ; le budget est calculé sur le bon type d'événements ; la décision associée au dépassement est explicite ; les chiffres fictifs sont étiquetés `SIMULATION`.

**Vérification :** teste le calcul avec un petit jeu de données synthétiques comprenant une requête conforme, une réponse en erreur et un timeout. Montre quelle catégorie consomme le budget selon ta définition. Ce test de raisonnement ne prouve pas la fiabilité d'un service réel.

## 7. Transfert

Transpose la même méthode à une action métier différente, par exemple l'enregistrement d'une demande plutôt que sa consultation. Indique quelle nouvelle définition du « succès » devient nécessaire et pourquoi le même SLO ne peut pas être copié sans vérifier le parcours.
