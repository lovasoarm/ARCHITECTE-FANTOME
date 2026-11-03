---
stability: evolutif
acte: maitrise
noyau: oui
perishability_id: PER-0114
review_interval: "3 mois"
perishability_scope: "Pratiques de gouvernance, permissions, arrêt, évaluation et observabilité de systèmes semi-autonomes ; aucune API fournisseur n’est certifiée dans cette leçon."
source_verified_on: null
freshness_status: "not_verified"
source_url: null
source_type: "none"
canonical_resource: null
source_scope: "Contenu autonome tel que délimité dans le document ; réévaluer si une affirmation externe versionnée est ajoutée."
provenance_note: "Document déclaré autonome/fictif ; cette classification ne vaut pas validation d’une affirmation externe qui serait ajoutée ultérieurement."
---

# 10 : Gouvernance des systèmes semi-autonomes

> **Périmètre de suivi (3 mois) :** Pratiques de gouvernance, permissions, arrêt, évaluation et observabilité de systèmes semi-autonomes ; aucune API fournisseur n’est certifiée dans cette leçon.

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

### Transfert : changer de contexte

Applique le mécanisme de « 10 : Gouvernance des systèmes semi-autonomes » à une décision qui touche plusieurs équipes pendant plusieurs trimestres. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **10 : Gouvernance des systèmes semi-autonomes** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Définir les limites d’un système semi-autonome

**Mission liée à « 10 : Gouvernance des systèmes semi-autonomes » :** Décris un automatisme Kintana par niveaux d’autonomie : observer, suggérer, préparer, agir sous approbation. Fixe les actions interdites, les seuils d’escalade et l’arrêt d’urgence.

**Livrable :** Matrice d’autonomie, permissions, journal d’audit et procédure d’arrêt/reprise.

**Critères d’acceptation :** Les droits sont minimaux ; les actions irréversibles exigent un contrôle ; les décisions automatiques sont traçables ; les seuils sont vérifiables.

**Transfert obligatoire :** Une approbation humaine devient indisponible : le système échoue en mode sûr plutôt que d’élargir ses droits.
