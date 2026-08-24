---
stability: intemporel
acte: pratique
noyau: oui
route_family: core
---

# 20 : ENGINE D'AMBIGUÏTÉ

> **Le problème n'est pas donné : il est découvert.**

## But

Le Staff Engineer reçoit rarement un énoncé complet. Il reçoit des symptômes, des contraintes, des demandes contradictoires et des informations partielles.

L'Engine d'Ambiguïté transforme les exercices AF existants en scénarios à information progressive sans modifier leur contenu de fond.

## Protocole

### Phase 0 : Silence

L'apprenant reçoit uniquement :

- symptôme ;
- objectif métier connu ;
- contrainte déjà déclarée.

Interdit d'ouvrir le corrigé, l'architecture suggérée ou le grimoire.

### Phase 1 : Questions

Avant toute solution, produire :

- cinq questions maximum ;
- les trois informations les plus critiques ;
- une hypothèse actuelle ;
- une observation qui pourrait l'invalider.

### Phase 2 : Révélation

Le facilitateur ou le scénario révèle une information nouvelle uniquement après la tentative.

### Phase 3 : Révision

L'apprenant doit indiquer :

- ce qui reste vrai ;
- ce qui devient faux ;
- ce qui change de priorité ;
- s'il change de décision.

### Phase 4 : Pression

Injecter une seule contrainte : budget, délai, sécurité, trafic, équipe réduite, dépendance supprimée ou changement produit.

### Phase 5 : Transfert

<!-- AF-DIAGRAM:transfer -->

```text
text
Principe appris
      │
      ▼
Nouveau contexte
      │
      ├── invariant ──► conserver
      │
      └── hypothèse cassée ─► adapter
                                │
                                ▼
                             nouvelle décision
```

Le transfert teste ce qui survit du principe et ce qui doit être révisé dans un contexte nouveau.

Même mécanisme, autre système.

### Phase 6 : Contre-modèle

Défendre l'approche opposée pendant cinq minutes.

## Barème anti-recette

Une bonne réponse n'est pas celle qui devine l'architecture attendue.

Elle est celle qui :

- demande l'information qui manque réellement ;
- sépare fait, hypothèse et préférence ;
- mesure avant de conclure ;
- accepte une solution imparfaite quand le contexte l'impose ;
- sait dire « je ne sais pas encore » ;
- sait changer d'avis sans réécrire l'histoire.

## Anti-biais de familiarité

Une variante doit être proposée dans un domaine jamais utilisé auparavant dans le module. Les personnages, technologies et univers changent ; le mécanisme logique reste identique.

## Preuve

Chaque session produit une fiche courte :

```text
SYMPTÔME
HYPOTHÈSE INITIALE
INFORMATION MANQUANTE
DÉCISION
SIGNAL DE RÉVISION
NOUVELLE INFORMATION
CHANGEMENT D'AVIS
CONTRE-MODÈLE
TRANSFERT
```

Ce document prouve un processus de décision ; il ne remplace pas le projet lui-même.
