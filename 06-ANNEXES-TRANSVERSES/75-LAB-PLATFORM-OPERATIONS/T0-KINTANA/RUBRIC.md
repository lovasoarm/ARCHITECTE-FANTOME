# RUBRIC : Incident Commander T0

> Évaluation d'une simulation autonome sur artefacts synthétiques. Une note ne constitue ni expérience d'astreinte réelle ni validation de production.

## Barème reproductible (20 points)

| Domaine                               | Points | 0                                    | Moitié des points                                    | Plein crédit                                                                         |
| ------------------------------------- | -----: | ------------------------------------ | ---------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Préparation et sécurité de la release |      3 | Autorise sans critères ni inspection | Repère certains risques, seuils incomplets           | Décision stop/go justifiée, conditions écrites avant inject, rollback non destructif |
| Observabilité et interprétation       |      3 | Confond métriques ou unités          | Lit les signaux mais omet un indicateur critique     | Calcule taux d'erreur et interprète p95/p99, queue et âge avec fenêtres explicites   |
| Diagnostic et causalité               |      4 | Présente une hypothèse comme un fait | Plusieurs hypothèses mais peu de tests discriminants | Chaîne causale testable, hypothèses falsifiables, preuve et incertitudes séparées    |
| Incident et confinement               |      3 | Pas de priorité/owner/communication  | Mitigation plausible mais incomplète                 | Action réversible, owner, impact, communication et critère de sortie                 |
| Récupération et intégrité             |      3 | Restaure sans contrôle               | Vérifie une partie du manifeste/invariants           | Hash vérifié, comptes rapprochés, invariants et état des pending contrôlés           |
| Postmortem et prévention              |      2 | Blâme ou liste vague                 | Cause et actions partielles                          | Déclencheur/facteurs latents, actions priorisées avec owner et preuve de fermeture   |
| Transfert à un nouvel incident        |      2 | Répète la recette                    | Adapte un élément                                    | Rejoue la variation 2 et explicite ce qui change et ce qui reste invariant           |

Pour une valeur intermédiaire, attribue les points proportionnellement à la preuve présente ; note en une phrase ce qui manque. Total : 20.

## Échecs éliminatoires

- Restaurer ou écraser des données sans vérifier leur intégrité.
- Proposer un rollback DB destructif sans analyser compatibilité, perte de données et ordre de migration.
- Confondre processus vivant, readiness et service réellement utilisable.
- Présenter une hypothèse comme une cause prouvée.
- Inventer une métrique, un résultat de test, un hash ou une exécution.
- Marquer un paiement confirmé sans preuve de confirmation fournisseur.

## Décision

- `VALIDÉ` : au moins **16/20**, aucune condition éliminatoire et tous les livrables présents.
- `À REPRENDRE` : moins de 16/20 ou une condition éliminatoire.

Les contrôles nécessitant Docker, Cloud, un vrai fournisseur ou un déploiement réel sont marqués `NON TESTÉ` s'ils n'ont pas été exécutés. Ils ne sont pas requis pour cette simulation T0.
