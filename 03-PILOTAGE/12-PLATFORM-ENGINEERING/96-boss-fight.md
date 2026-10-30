---
stability: evolutif
acte: maitriser
---

> **SCÈNE CRAZYDEVS : Attack on Titan :** la plateforme marche jusqu’au jour où une équipe casse un pipeline, une autre contourne une policy et la troisième demande une exception à 2h du matin.

# Boss fight : drift, incident de plateforme et rollback sous pression

## Scénario

À 10 h 05, un déploiement de `orders-api` augmente les erreurs 5xx. À 10 h 08, un opérateur modifie manuellement une règle réseau et réduit le nombre de réplicas. À 10 h 10, le contrôleur GitOps remet la règle déclarée dans Git et le nombre de réplicas attendu. La restauration du service échoue toujours : une migration de schéma vient de rendre l'ancienne version incompatible. À 10 h 14, l'équipe découvre qu'un secret de test est également référencé par un service de production.

## Décision attendue

Tu es responsable technique de la plateforme. Il faut stabiliser le service, préserver les preuves, contenir le risque et décider de la suite sans rendre le problème plus grave.

## Épreuve en quatre actes

### Acte 1 : Stabiliser

- déclarer l'incident et nommer un incident commander ;
- vérifier métriques, événements de déploiement, logs et traces ;
- déterminer si le drift est cause, conséquence ou simple concomitance ;
- stopper les promotions automatiques concernées si nécessaire, avec exception journalisée ;
- ne pas réconcilier aveuglément une déclaration erronée.

### Acte 2 : Choisir le rollback

Comparer : restaurer l'image précédente, corriger la configuration, appliquer un hotfix forward, restaurer des données ou utiliser un mécanisme de compatibilité. Préciser pourquoi la migration de schéma empêche ou autorise chaque option. Une transaction de base de données ne remplace pas un plan de restauration après commit.

### Acte 3 : Secrets et gouvernance

Identifier les consommateurs du secret partagé, révoquer/remplacer selon une séquence qui réduit le risque, vérifier les accès et auditer l'exposition. Définir comment prévenir les identités CI/runtime partagées.

### Acte 4 : Décision durable

Proposer les changements : compatibilité N/N-1, migrations expand/contract, contrôles de promotion, alertes, droits d'urgence, tests de rollback, ownership et runbook.

## Diagramme de décision

```text
[Erreur 5xx + changement récent]
             |
             v
[Stabiliser / geler promotion risquée]
             |
             v
[Corréler Git, runtime, métriques, logs]
             |
             v
[Déclaration Git correcte ?] -- non --> [Corriger l'intention puis promouvoir]
             |
            oui
             v
[Rollback application compatible données ?]
       | oui             | non
       v                 v
[Rollback contrôlé] [Hotfix forward / restauration planifiée]
       |                 |
       +--------+--------+
                v
       [Vérification santé + intégrité]
                |
        succès / échec confirmé
                v
       [Commit de l'état stable]
                |
                v
       [Postmortem + actions testées]
```

## Critères / 40

| Critère                                                       | Points |
| ------------------------------------------------------------- | -----: |
| Commandement, communication et sécurité des personnes/données |      5 |
| Diagnostic causal (pas de suppositions)                       |      7 |
| Décision drift/GitOps                                         |      6 |
| Compatibilité schéma et rollback                              |      8 |
| Réponse à l'exposition du secret                              |      6 |
| Prévention, tests et apprentissage                            |      8 |

Seuil : 32/40 et aucun échec critique en gestion du secret ou protection des données. Une solution qui force le rollback d'une base incompatible ou laisse un secret exposé échoue même si le total est supérieur.

## Exemples de réponses

**Insuffisante :** « Je relance le pipeline, je remets l'ancienne version et je redémarre Kubernetes. » Elle ne vérifie ni les causes, ni le schéma, ni les identités, ni les données.

**Solide :** « Je gèle la promotion et conserve les traces, vérifie la déclaration et l'état réel, identifie la migration et la compatibilité, puis choisis un hotfix forward si l'ancien binaire ne peut plus lire le schéma. Je traite le secret comme compromis, révoque et remplace ses usages, puis ajoute tests N/N-1 et contrôle de promotion. » Elle doit être complétée avec commandes, propriétaires et critères de retour au service.

## Preuve de maîtrise

Un compte rendu d'incident horodaté, une décision ADR, un plan de rollback/restauration, une matrice d'identité mise à jour et des tests qui prouvent les nouvelles protections.

## Perturbations complémentaires conservées

En plus du drift et du rollback, traiter un pipeline compromis, un coût cloud qui explose, un Golden Path contourné, une demande d'exception à 2 h du matin et un nouveau service IA à déployer. Pour chaque perturbation, définir signal, propriétaire, limite d'impact, décision temporaire, trace et condition de retour au fonctionnement normal.
