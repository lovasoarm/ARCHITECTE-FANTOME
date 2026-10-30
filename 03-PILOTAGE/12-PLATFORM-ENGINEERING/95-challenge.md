---
stability: evolutif
acte: évaluer
---


> **SCÈNE CRAZYDEVS : Naruto et 20 clones :** vingt équipes veulent déployer demain, dix ont des contraintes différentes, et personne n’accepte de remplir 40 pages de formulaire.

# Challenge : livrer un chemin développeur sûr et mesurable

## Mission

À partir du cas fil rouge, concevoir un Golden Path pour créer un service HTTP, le livrer via GitOps et l'exploiter avec des garde-fous vérifiables.

## Étapes

1. Décrire les utilisateurs et une tâche réelle à simplifier.
2. Définir le template, les paramètres et les validations.
3. Dessiner le flux portail/CLI → orchestrateur → CI → dépôt de configuration → contrôleur → runtime.
4. Définir les identités et permissions distinctes pour CI, runtime et équipe plateforme.
5. Décrire l'observation d'un drift et sa correction.
6. Ajouter rollback, migration de données, procédure d'exception et retour arrière du template.
7. Choisir les métriques de valeur et de fiabilité.

## Livrables attendus

- diagramme d'architecture ;
- README d'utilisation du Golden Path ;
- exemple de configuration et de pipeline (ou pseudo-code explicitement marqué) ;
- matrice identité/permissions ;
- runbook drift/rollback ;
- trois indicateurs avec définition, source et fréquence ;
- registre de risques et décision d'exception.

## Vérification sur 30 points

| Domaine | Points | Preuve |
|---|---:|---|
| Utilisateur/problème | 4 | tâche observée et mesure de départ |
| Golden Path | 5 | étapes, entrées, validation, maintenance |
| GitOps | 5 | état désiré/réel, réconciliation, drift |
| Sécurité | 5 | permissions minimales, secret manager, audit |
| Reprise | 4 | rollback et migration compatibles |
| DX/valeur | 4 | indicateurs et hypothèses |
| Exploitabilité | 3 | runbook, propriétaire et limites |

Seuil : 24/30 et au moins 3/5 en sécurité, GitOps et reprise. Une métrique sans définition/source ou une solution qui exige un administrateur à chaque création est insuffisante.

## Auto-contrôle différé

Avant de lire une correction ou demander une revue : expliquer oralement le système à une personne qui ne connaît pas la plateforme. Si elle ne sait pas qui détient chaque responsabilité, comment on diagnostique un échec et comment revenir en arrière, le livrable n'est pas prêt.

## Variation de contrainte conservée

Le scénario représente vingt équipes, dont dix ont des contraintes spécifiques, et un délai d'un jour. La plateforme doit éviter les 40 pages de formulaire : distinguer les paramètres réellement nécessaires, automatiser les contrôles et offrir une exception encadrée. Expliquer comment on préserve sécurité et flexibilité sans fabriquer vingt chemins indépendants.


## Barrière de réussite non compensable

Une erreur critique de sécurité, d'intégrité des données ou de falsification de preuve entraîne une reprise ciblée, même si le total de points atteint le seuil. Une simulation doit être nommée comme simulation ; elle ne vaut pas preuve de production.

## Validation papier et validation terrain

**Papier :** les 30 points se notent sur le diagramme, le manifeste de configuration, la matrice IAM, le runbook, les critères de convergence et l'ADR. Tout code non exécuté doit porter l'étiquette `PSEUDO-CODE` ou `NON_EXECUTE`.

**Terrain :** pour déclarer la plateforme testée, il faut fournir versions de cluster/contrôleur, logs de réconciliation, diff de drift, résultat d'un rollback et preuve de rotation/révocation d'un secret. Aucun accès à un cluster dans l'environnement d'audit ne permet de déclarer ces essais exécutés.
