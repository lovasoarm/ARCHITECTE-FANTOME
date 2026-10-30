---
stability: stable
acte: diagnostiquer
---

# Cas opérationnel SLO : convertir une attente utilisateur en arbitrage de fiabilité

## 1. SLI, SLO, SLA

Un **SLI (Service Level Indicator, indicateur de niveau de service)** est une mesure définie de ce que vit l'utilisateur (ex. part de requêtes de création de commande réussies en moins de 500 ms). Un **SLO (Service Level Objective, objectif de niveau de service)** est une cible interne sur une fenêtre (ex. 99,9 % des requêtes éligibles sur 30 jours). Un **SLA (Service Level Agreement, engagement contractuel de niveau de service)** est un engagement envers un client, pouvant inclure exclusions et compensations. Un SLO peut être plus strict que le SLA pour garder une marge opérationnelle.

Un SLI doit préciser population, succès, latence, fenêtre, exclusions et source. « Le serveur est disponible » n'est pas une définition assez précise.

## 2. Cas fil rouge

`Orders API` traite 4 millions de requêtes sur 30 jours. L'équipe mesure les opérations métier éligibles, pas seulement le ping du processus. Elle fixe un SLO de 99,9 % de succès dans le budget de latence défini. Une erreur est une réponse qui ne permet pas à l'utilisateur de confirmer sa commande, selon le contrat métier ; une requête de santé interne n'entre pas dans la population.

Si 99,9 % des 4 000 000 requêtes réussissent, le budget d'erreur théorique est 0,1 %, soit 4 000 requêtes sur cette fenêtre. Ce calcul suppose que la population et la fenêtre sont bien définies ; les SLO basés sur les événements ou sur des fenêtres glissantes nécessitent la formule réellement choisie.

## 3. Cycle de fiabilité

```text
[Besoin utilisateur]
        |
        v
[Définir SLI + population + fenêtre]
        |
        v
[Fixer SLO + budget d'erreur]
        |
        v
[Instrumenter + alerting]
        |
        v
[Budget consommé rapidement ?] -- non --> [Amélioration continue]
        |
       oui
        v
[Incident / réduire risque / geler changements]
        |
        v
[Restaurer service + communiquer]
        |
        v
[Postmortem sans blâme + actions]
        |
        v
[Réviser architecture / SLO / pratiques]
```

## 4. Error budget et arbitrage

L'**error budget (budget d'erreur)** est la quantité d'échec compatible avec la cible pendant une fenêtre. Il donne une règle de décision : si la consommation est faible, continuer les changements avec les contrôles ; si elle accélère, prioriser la fiabilité, réduire le risque ou geler certaines livraisons selon une politique annoncée.

Ne pas traiter le budget comme une permission de « dépenser » des erreurs jusqu'à épuisement. Les incidents sévères, risques de sécurité, intégrité des données ou obligations réglementaires peuvent exiger une action même si le budget agrégé paraît sain.

## 5. Alerting

Alerter sur les symptômes qui affectent l'utilisateur et sur une consommation du budget qui nécessite une action. Une alerte doit avoir propriétaire, gravité, runbook, seuil, fenêtre, source et action attendue. Une alerte sur chaque CPU élevé peut générer du bruit sans indiquer un impact client. Les alertes doivent être testées en exercice.

## 6. Incident et postmortem

À 14 h 10, les erreurs de création de commande montent à 4 %. L'alerte indique la consommation accélérée du budget. L'incident commander nomme un responsable communication, stabilise (rollback compatible ou réduction de charge), conserve les traces et tient un journal chronologique. Après rétablissement, le postmortem reconstruit le mécanisme : changement, condition déclenchante, défaut de détection, limites de blast radius et facteurs organisationnels. Il évite de réduire la cause à « quelqu'un a fait une erreur ».

Les actions doivent avoir propriétaire, échéance, niveau de risque et preuve de fermeture. « Faire attention » n'est pas une action vérifiable ; « ajouter un test de compatibilité de schéma bloquant la promotion et l'exécuter dans CI » l'est.

## 7. Exercice

Définir un SLI sur une opération métier, choisir un SLO, calculer le budget sur un volume donné, bâtir une alerte et résoudre un scénario de panne. Produire un postmortem et proposer une politique de livraison si le budget est consommé à 80 % à mi-période.

**Grille /25 :** définition SLI (5), cible/fenêtre (4), calcul (3), alerte actionnable (4), incident/communication (4), postmortem/actions prouvables (5). Échec si l'indicateur ne reflète pas le parcours utilisateur ou si le SLA est confondu avec le SLO.

## 8. Preuve et suite

Prérequis : métriques, logs, disponibilité et exploitation. Suite : cloud, architecture, leadership et ownership de production.

**Preuve attendue :** tableau de bord, définition d'indicateur, calcul documenté, runbook et postmortem dont les actions ont des preuves de fermeture.
