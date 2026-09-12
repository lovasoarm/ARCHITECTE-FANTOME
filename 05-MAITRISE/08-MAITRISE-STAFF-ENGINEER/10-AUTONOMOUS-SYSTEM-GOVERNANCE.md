---
stability: evolutif
acte: maitrise
noyau: oui
perishability_id: PER-0114
---

# 10 : Gouvernance des systèmes semi-autonomes

Quand un agent peut lire des données, appeler des outils ou modifier un système, la question
centrale n'est plus « quel prompt ? » mais « quel pouvoir avons-nous autorisé, sous quelles
conditions et avec quel mécanisme d'arrêt ? »

## 1. Control plane humain

```text
objectif
  ↓
permissions minimales
  ↓
policy / contraintes
  ↓
agent
  ↓
outils
  ↓
observabilité
  ↓
évaluation
  ↓
stop / rollback
```

Le système doit pouvoir être arrêté sans dépendre de la coopération de l'agent lui-même.

## 2. Matrice de pouvoir

| Capacité    | Lecture | Écriture | Effet externe | Approbation humaine |
| ----------- | ------- | -------- | ------------- | ------------------- |
| données     |         |          |               |                     |
| fichiers    |         |          |               |                     |
| production  |         |          |               |                     |
| finance     |         |          |               |                     |
| messagerie  |         |          |               |                     |
| déploiement |         |          |               |                     |

Toute capacité non nécessaire doit être refusée par défaut.

## 3. Kill switch utile

Un bouton d'arrêt n'est une garantie que si son effet est observable.

Le candidat documente :

- quel signal provoque l'arrêt ;
- quelle couche coupe réellement l'action ;
- ce qui arrive aux tâches en vol ;
- comment les credentials sont révoqués ;
- comment on évite le redémarrage automatique non autorisé ;
- comment l'incident est enregistré ;
- quelle condition autorise la reprise.

## 4. Drift de modèle et drift de politique

Ne surveille pas seulement « qualité du modèle ».

Surveille aussi :

```text
permissions réellement utilisées
fréquence des refus
actions inhabituelles
coût par tâche
latence
taux d'échec
régressions de policy
écarts entre comportement attendu et observé
```

Un modèle peut rester performant tout en devenant dangereux dans son contexte opérationnel.

## 5. Épreuve

Prends un workflow agentique du parcours. Introduis une perturbation :

- outil indisponible ;
- objectif contradictoire ;
- données inattendues ;
- permission excessive ;
- boucle coûteuse ;
- sortie plausible mais dangereuse.

Le candidat doit contenir la situation sans supprimer aveuglément l'ensemble du système.

## 6. Critère de sortie

La preuve doit relier :

**objectif → permissions → évaluation → observabilité → détection → arrêt/rollback → reprise.**

La documentation des noms d'outils est secondaire ; les contrôles doivent survivre à leur remplacement.

Ce module renforce G4, G6 et G8 et complète `06-IA-GOVERNANCE-SECURITY.md`.
