---
stability: intemporel
acte: construire
artefact: gabarit-apprenant
---

> **SCÈNE CRAZYDEVS : armure Garo :** une protection qui existe mais n'est jamais vérifiée est juste un costume brillant. Ici, chaque garde-fou doit être testable et attaquable.

# SECURITY : 10_legacy_dungeon

Ce fichier est un **gabarit de préparation**, pas une preuve de sécurité déjà obtenue.
La preuve finale est produite dans le dépôt apprenant et recroisée avec
`04-SECURITY-GATE.md`, `08-POSTMORTEM.md` et les tests du projet.

## 1. Entrées et frontières

- Sources d'entrée à relever :
- Données sensibles possibles :
- Surface d'exposition :
- Hypothèses de confiance :

## 2. Secrets et dépendances

<!-- AF-DIAGRAM:secrets -->

```text
text
┌──────────────┐
│ Secret store │
└──────┬───────┘
       │ inject
       ▼
┌──────────────┐      ✗ hardcode
│ Runtime      │◄──────────────
└──────┬───────┘
       ▼
   application
```

Un secret doit entrer dans le système au runtime et ne pas être figé dans le code ou l’image.

- Variables d'environnement réellement utilisées :
- Secrets hors dépôt vérifiés :
- Dépendances et versions relevées :
- Commande de vérification :
- Résultat daté :

## 3. Contrôles de sécurité

- Validation des entrées :
- Authentification / autorisation si applicable :
- Gestion des erreurs et des sorties :
- Journalisation sans données sensibles :
- Tests de cas adverses :

## 4. Gate de livraison

Avant de déclarer le mini-projet terminé, l'apprenant doit :

- [ ] jouer la checklist OWASP demandée par `04-SECURITY-GATE.md` ;
- [ ] conserver les commandes et résultats réellement exécutés ;
- [ ] reporter les écarts dans `08-POSTMORTEM.md` ;
- [ ] rejouer le gate après la dernière modification ;
- [ ] définir un seuil de réouverture si le contexte change.

## 5. Décision

Risque résiduel accepté :

Décision et justification :

Preuve datée :

Seuil de réouverture :

> Ce fichier ne doit jamais être interprété comme une certification tant que les
> cases et preuves réelles ne sont pas produites dans le dépôt de l'apprenant.
