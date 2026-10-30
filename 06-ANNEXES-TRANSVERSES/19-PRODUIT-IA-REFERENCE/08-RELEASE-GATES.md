---
stability: stable
type: exercice-decision-technique
---

# Release gates : décider avant d’exposer un service

Ce document est un support de pratique pour apprendre à distinguer une démo fonctionnelle d’un service exploitable. Il ne certifie ni le curriculum complet ni un déploiement réel. Une case ne se coche que lorsqu’une preuve a été obtenue dans l’environnement concerné.

## Grille de décision

| Gate                             | Preuve à produire                                                                             | Exemple de vérification                                              | Pourquoi c’est important                                                           |
| -------------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Runtime                          | Version réellement utilisée et version attendue                                               | `node --version`, puis comparaison aux contraintes de `package.json` | Un test sur une version différente n’établit pas le même résultat.                 |
| Tests                            | Résultats bruts, y compris les échecs attendus                                                | `npm test` depuis le dossier du laboratoire                          | Le code doit respecter ses contrats connus.                                        |
| Retrieval                        | Jeu de cas versionné, résultats et limites de mesure                                          | `npm run eval:retrieval`                                             | Un petit jeu synthétique n’est pas un benchmark représentatif.                     |
| Authentification et autorisation | Tests négatifs sur token absent/invalide et séparation des tenants                            | Tests d’intégration et requêtes adversariales                        | L’accès doit être refusé avant la récupération de documents privés.                |
| Secrets et logs                  | Secret de test non-placeholder ; absence de token, question et contenu sensible dans les logs | Cas de démarrage invalide, inspection des journaux                   | Les erreurs de configuration ne doivent pas exposer de secret.                     |
| Runtime HTTP                     | Santé, disponibilité, erreurs, délais et arrêt propre                                         | Tests locaux après démarrage du serveur                              | Un serveur qui répond à un cas nominal n’est pas nécessairement robuste.           |
| Conteneur                        | Construction reproductible, utilisateur non-root, permissions minimales et image examinée     | Docker/Compose, si cette activité est réalisée                       | La configuration réellement exécutée doit correspondre aux hypothèses de sécurité. |
| Charge                           | Profil de requêtes, latences, erreurs, saturation et coût                                     | `npm run eval:load` après démarrage du serveur                       | Un micro-test ne prouve pas la capacité de production.                             |
| Résilience                       | Réaction aux pannes du fournisseur, à la saturation et à l’arrêt ; restauration et rollback   | Scénarios contrôlés, résultats consignés                             | Les pannes partielles sont différentes d’une réponse nominale.                     |
| Revue externe                    | Regard indépendant sur les risques, les preuves et les limites                                | Compte rendu daté d’un reviewer compétent                            | Les tests écrits par l’auteur ne remplacent pas une revue indépendante.            |
| Décision                         | Portée, risques ouverts, responsable et seuils de rollback                                    | Décision explicite `PASS`, `CONDITIONAL` ou `BLOCKED`                | La décision doit correspondre aux preuves, pas à l’intention.                      |

## Exercice

1. Exécute les contrôles locaux que ton environnement permet et conserve les sorties brutes.
2. Pour chaque gate non exécuté, écris `NOT RUN` et explique ce qui manque. Ne le transforme pas en `PASS` parce qu’une documentation ou un test existe.
3. Introduis un défaut contrôlé, prédis le résultat, puis vérifie qu’un test le détecte.
4. Propose une décision adaptée aux preuves disponibles. Distingue le laboratoire local, un environnement de staging et un service exposé à de vrais utilisateurs.
5. Demande à une autre personne de contester tes hypothèses avant toute décision de production.

## Format de décision à compléter

```text
Système et version :
Date et environnement :
Décision : PASS | CONDITIONAL | BLOCKED
Preuves observées :
Contrôles non exécutés :
Risques ouverts :
Seuil de rollback :
Responsable du rollback :
```

**Règle :** aucune commande, checklist ou suite de tests ne démontre à elle seule une sécurité universelle. La décision doit rester proportionnée au contexte, aux preuves et aux risques résiduels.
