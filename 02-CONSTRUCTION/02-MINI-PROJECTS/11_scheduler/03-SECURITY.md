---
stability: intemporel
acte: construire
artefact: gabarit-apprenant
---

# SECURITY : 11_scheduler

Ce document est un gabarit à compléter par l'apprenant. Il ne certifie pas à lui seul la sécurité du code.

## 1. Périmètre réellement livré

Le projet de base est une bibliothèque locale sans serveur, endpoint HTTP, port réseau, accès fichier utilisateur, entrée STDIN/CLI, authentification, secret ou dépendance tierce. Ne crée pas ces surfaces uniquement pour satisfaire une checklist générique.

Éléments réellement exposés :

- arguments publics de `pMap(items, mapper, options)` ;
- callbacks enregistrés dans `Loop` ;
- consommation de mémoire/CPU induite par les tableaux, les callbacks et la concurrence.

## 2. Menaces et contrôles à démontrer

| Menace contextualisée | Contrôle attendu | Preuve à référencer |
|---|---|---|
| `items` ou `mapper` invalide | Rejeter proprement avant de démarrer du travail | Test d'argument invalide |
| `concurrency` nul, non entier ou excessif | Refuser hors de l'intervalle 1–100 ; défaut documenté à 5 | Tests des bornes 0, 1, 100 et 101 |
| Trop de tâches simultanées | Ne jamais dépasser la limite configurée | Mesure du maximum de mappers actifs |
| Erreur d'un mapper | Propager l'erreur et ne pas lancer de nouveaux éléments | Test de rejet et de non-poursuite |
| Annulation avant/après le départ | Aucun lancement après abort ; transmettre le signal aux mappers | Tests d'annulation avant et pendant le traitement |
| Callback de boucle invalide ou en erreur | Refuser une callback non-fonction et propager une erreur d'exécution | Tests ciblés de `Loop` |

## 3. Limites qui doivent rester explicites

- `AbortSignal` est coopératif : il ne peut pas interrompre de force une fonction déjà en cours qui ignore le signal.
- Une limite de concurrence ne borne pas à elle seule la taille de `items` ni la mémoire occupée par le tableau résultat. Le périmètre d'entrée doit être documenté par le consommateur si les données sont externes.
- Le modèle `Loop` est pédagogique et simplifié ; il ne constitue pas une implémentation compatible avec toutes les phases de l'event loop de Node.js ou d'un navigateur.
- La bibliothèque ne fournit ni chiffrement, ni authentification, ni stockage de secrets, ni protection réseau, car elle ne traite aucune de ces fonctions.

## 4. Dépendances et secrets

- Dépendances runtime tierces : aucune dans le manifeste fourni.
- Secrets requis : aucun.
- Vérification : inspecter `package.json` et vérifier qu'aucune nouvelle dépendance ni donnée sensible n'a été ajoutée.
- Commande de test : `npm test`.

Si l'apprenant ajoute une dépendance ou une surface externe, il doit étendre le threat model et choisir une vérification adaptée. Ne prétends pas qu'un scan de dépendances a été exécuté s'il n'y en a aucune ou si l'outil n'était pas disponible.

## 5. Décision de sécurité

Risques résiduels acceptés :

Mesure et preuve réellement obtenues :

Limites non testées :

Décision et justification :

Seuil de réouverture :
