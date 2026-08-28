---
stability: evolutif
acte: transférer
noyau: oui
route: extension
---

# 43 : PONT PREUVE → TERRAIN

Ce document ne remplace aucune preuve existante. Il explique comment convertir une preuve pédagogique en expérience progressivement réelle, sans prétendre qu'une simulation vaut une responsabilité professionnelle.

## 1. Règle de réalité

Une preuve AF est **pédagogique** tant qu'elle a été produite dans une simulation, un mini-projet ou un contexte contrôlé. Elle devient une **preuve terrain** seulement lorsqu'un utilisateur, un pair, un mainteneur, un client, une association ou une équipe réelle expose le système à des contraintes qui ne viennent pas de l'auteur seul.

Chaîne minimale :

```text
exercice / simulation
        ↓
adaptation au contexte réel
        ↓
usage par une autre personne
        ↓
feedback / incident / contrainte réelle
        ↓
décision documentée
        ↓
correction / évolution
        ↓
mesure ou observation d'impact
        ↓
preuve publiable ou archivée
```

Le terrain réel n'est pas obligatoire pour commencer le CORE. Il devient une couche de maturation après ou autour des preuves existantes.

## 2. Niveaux de réalité

| Niveau | Contexte                              | Ce qu'il prouve                                      | Ce qu'il ne prouve pas                 |
| ------ | ------------------------------------- | ---------------------------------------------------- | -------------------------------------- |
| T0     | simulation AF                         | raisonnement et production contrôlée                 | impact extérieur                       |
| T1     | projet personnel vivant               | usage et maintenance réels                           | influence organisationnelle            |
| T2     | petit groupe / association / pair     | feedback et adaptation à d'autres personnes          | scope multi-équipes                    |
| T3     | open source / petite mission / client | contraintes externes, revue, conséquences            | responsabilité d'une grande plateforme |
| T4     | production suivie                     | ownership, incidents, coût, arbitrages dans la durée | aucun titre automatique                |

Lorsqu'un niveau n'est pas accessible, utilise le niveau supérieur réellement disponible ; ne fabrique pas une expérience.

## 3. Protocole commun d'une preuve terrain

```text
1. SOURCE AF
   quelle preuve, challenge, Boss ou capstone ?

2. CONTEXTE
   pour qui, quel besoin, quelles contraintes réelles ?

3. ADAPTATION
   qu'est-ce qui change par rapport à la simulation ?

4. EXPOSITION
   qui a utilisé, relu ou maintenu le résultat ?

5. SIGNAL
   feedback, bug, incident, métrique, objection ou demande réelle

6. DÉCISION
   ADR / choix / compromis / coût / risque

7. RÉSULTAT
   observation avant/après, limites et conséquences

8. PREUVE
   commit, issue, PR, capture, log, métrique, témoignage ou artefact anonymisé
```

Ne publie jamais de secret, donnée personnelle, code propriétaire ou information client confidentielle.

## 4. Six familles Staff

### S1 : Systèmes & backend

Partir d'un exercice système/backend et obtenir un service déployé, observable et maintenu. Chercher au minimum : une mesure de latence ou débit, un signal d'erreur, une stratégie de reprise et une décision écrite.

**Preuve utile :** déploiement + métriques + incident ou test de panne + décision de capacité.

### S2 : Architecture logicielle

Partir d'un ADR/diagramme du parcours et le confronter à une contrainte réelle : changement de volume, besoin d'un client, migration ou évolution de contrat. Réviser la décision au lieu de protéger l'architecture initiale.

**Preuve utile :** ADR initial, signal contradictoire, ADR révisé ou addendum, diagramme avant/après.

### S3 : Sécurité & fiabilité

Proportionner le threat model et les tests au contexte réel. Ajouter, selon le projet, sauvegarde/restauration, contrôle d'accès, test de panne, rapport d'incident, postmortem ou revue de sécurité.

**Preuve utile :** menace + contrôle + test + résultat ; ou incident + mitigation + apprentissage.

### S4 : Produit & business

Utiliser une contrainte réelle de temps, coût, utilisateur, valeur ou risque. Ne jamais inventer un chiffre business absent. Un petit projet avec une vraie contrainte et une vraie décision vaut mieux qu'un faux budget détaillé.

**Preuve utile :** demande initiale, non-objectifs, options, contrainte observée, décision et conséquence.

### S5 : Leadership & pédagogie

Faire relire une décision, aider une autre personne, mener une revue ou transmettre un critère. Une auto-évaluation ne suffit pas à constituer une influence externe. Lorsque l'exposition externe est impossible, marque explicitement la pièce comme simulation.

**Preuve utile :** feedback anonymisé, PR revue, notes de mentorat, décision collective ou amélioration observable chez le pair.

### S6 : IA & automatisation en production

N'ajoute pas d'IA pour cocher S6. Partir d'un besoin où elle peut réellement apporter de la valeur : génération assistée, extraction, recherche, RAG, workflow agentique ou automatisation. Mesurer au moins la qualité de tâche, un coût ou proxy de coût, un risque, un mécanisme d'arrêt et la supervision humaine.

**Preuve utile :** cas réel, évaluation avant/après, erreurs observées, permissions, coût/latence, décision d'adoption ou de retrait.

## 5. Le minimum si tu n'as pas de terrain

Tu peux préparer la transition sans mentir :

- `T0` : simulation AF solide ;
- `T1` : projet personnel réellement utilisé par quelques personnes ;
- `T2` : association, pair ou groupe ;
- `T3` : open source ou petite mission lorsque l'occasion arrive.

Le dossier doit conserver le niveau atteint. **T0 ≠ T4**. Cette distinction augmente la crédibilité du portfolio.

## 6. Fiche de preuve minimale

```text
Preuve AF :
Niveau terrain : T0 / T1 / T2 / T3 / T4
Contexte :
Utilisateur / pair / mainteneur :
Contrainte réelle :
Signal observé :
Décision :
Artefact / lien :
Résultat observable :
Feedback externe :
Limite restante :
Prochaine amélioration :
```

## 7. Relation avec les gates Staff

Le pont alimente `PREUVES-STAFF-ENGINEER.md` et `37-STAFF-READINESS-GATE.md` ; il ne crée pas une huitième famille ni un nouveau diplôme. Une preuve terrain peut couvrir plusieurs familles, mais le reviewer doit pouvoir distinguer ce qui relève de S1…S6 et ce qui reste seulement préparé.

**Temps CORE ajouté : 0 h.**
