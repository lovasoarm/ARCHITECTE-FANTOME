---
stability: stable
acte: démontrer
---

# Cas fil rouge : plateforme interne pour trois équipes produit

## Situation

Une organisation possède `Checkout`, `Orders` et `Notifications`. Chaque équipe crée ses dépôts, configure pipeline, secrets, environnement, alertes et déploiements différemment. Les mises en production nécessitent plusieurs demandes manuelles. Une plateforme interne doit réduire les tâches répétées sans créer un point de panne incontrôlé.

## Cible et limites

L'équipe plateforme (4 ingénieurs dans le scénario) livre un parcours de création de service HTTP et une capacité de déploiement GitOps. Les équipes produit conservent la propriété de leur code et de leurs données. La plateforme ne promet ni zéro incident ni déploiement sans revue.

## Architecture proposée

```text
Equipes Checkout / Orders / Notifications
                    |
                    v
         Portail ou CLI de plateforme
                    |
                    v
   Template versionné + paramètres contrôlés
                    |
          +---------+----------+
          |                    |
          v                    v
       CI/CD              Catalogue services
          |                    |
          v                    v
   Image immuable       Owner / criticité / coût
          |
          v
  Dépôt Git de configuration
          |
          v
  Contrôleur GitOps ---> Cluster / runtime
          |                    |
          +------ observations-+
                    |
                    v
       Logs / métriques / traces / alertes
                    |
                    v
     SLO plateforme + feedback équipes
```

## Décisions à prendre

1. Qui peut créer un service et dans quelles limites ?
2. Comment les identités CI et runtime sont-elles séparées ?
3. Quel est le propriétaire du template et du contrôleur ?
4. Que se passe-t-il si le portail tombe mais que les services tournent ?
5. Comment déployer une nouvelle version du template sur les services existants ?
6. Comment mesurer la valeur sans imposer une métrique individuelle aux développeurs ?

## Livrables de l'apprenant

- carte des composants et flux ;
- Golden Path de création ;
- dépôt GitOps d'exemple ou pseudo-configuration documentée ;
- matrice des permissions ;
- 3 SLI/SLO pertinents ;
- modèle de coût mensuel avec hypothèses ;
- runbook de panne portail/contrôleur ;
- plan de feedback et de migration de template.

## Grille de validation / 30

| Critère | Points |
|---|---:|
| Responsabilités et frontières | 4 |
| Self-service et idempotence | 4 |
| GitOps, drift et rollback | 5 |
| Sécurité/identités/secrets | 5 |
| Observabilité et gestion d'incident | 4 |
| Coût, adoption et mesure de valeur | 4 |
| Documentation et migration | 4 |

Seuil proposé : 24/30, sans zéro en sécurité ni rollback. Toute identité globale sans justification, secret dans Git ou absence de procédure en cas de panne du contrôleur constitue un blocage.

## Indice différé

Commencer par un seul parcours (« créer un service HTTP »), puis identifier ce qui doit être commun et ce qui dépend du contexte. Ne commence pas par dessiner un portail avec dix menus.

## Preuve de maîtrise

L'apprenant défend sa plateforme devant un pair, explique les arbitrages, répond à un scénario d'échec et fournit les artefacts vérifiables. Le schéma seul ne valide pas le cas.

## Transfert : mesurer l'adoption et détecter le contournement du Golden Path

Après six semaines, 70 % des nouveaux services utilisent le template officiel, mais 30 % sont créés manuellement. Deux équipes disent que le template impose une base de données non adaptée ; une autre contourne le contrôle de secrets parce qu'il ralentit les déploiements.

**Travail demandé.** Segmente les frictions par type d'équipe, examine le délai de mise en production, les exceptions, incidents et abandons. Propose une modification, mais garde le contrôle de secrets non négociable. Définis les métriques de succès, un propriétaire du feedback, un essai pilote et une règle de retrait du template.

**Vérification.** Un plan acceptable distingue adoption (usage), résultat (lead time/échec) et garde-fou (défauts sécurité). Une hausse d'adoption seule n'est pas une preuve de valeur. Le changement ne doit pas masquer les exceptions ni transformer la plateforme en équipe d'approbation manuelle.
