---
stability: intemporel
acte: défendre
cognitive_level: L7
perturbation_modes:
  [changement_contexte, hypothese_invalidee, contrainte_nouvelle]
anti_recipe_key: transfert_sans_stack
transfer_distance: high
assessment_role: transfer_checkpoint
---

# PREUVE DE TRANSFERT : OUBLIER LA STACK

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

Temps de travail indicatif : 60–90 min

## Mission

Tu connais déjà une solution qui fonctionne. Maintenant, retire-lui volontairement son contexte.

Tu ne dois plus raisonner à partir d'un framework, d'un fournisseur, d'un langage ou d'un exemple déjà vu.

Ton objectif est de montrer que tu possèdes le **mécanisme**, pas la recette.

## Phase 1 : Reconstruction à froid

Choisis une décision technique récente de ton projet fil rouge.

Sans rouvrir tes notes :

1. décris le problème initial en cinq lignes maximum ;
2. énonce ton hypothèse centrale ;
3. donne les deux contraintes les plus importantes ;
4. explique le mécanisme qui rend ta décision plausible ;
5. donne le signal qui t'obligerait à revoir cette décision.

Ensuite seulement, compare ta reconstruction avec ton artefact réel.

## Phase 2 : Changement de terrain

Conserve le mécanisme, mais change au moins deux éléments :

- stack technique ;
- volumétrie ;
- budget ;
- latence cible ;
- profil de panne ;
- modèle de données ;
- équipe ;
- contrainte réglementaire.

Tu dois produire une nouvelle décision sans copier la forme de la première.

## Phase 3 : Défense de l'inverse

Défends pendant cinq minutes la solution que tu avais initialement rejetée.

Tu dois identifier :

- dans quelles conditions elle devient meilleure ;
- quelle hypothèse de départ change ;
- quel coût tu acceptes en échange ;
- quelle observation te ferait revenir à ton choix initial.

## Phase 4 : Perturbation tardive

Ajoute une nouvelle information qui rend ton premier raisonnement moins sûr.

Exemples :

- trafic ×10 ;
- budget divisé par deux ;
- dépendance retirée ;
- SLO plus strict ;
- incident de sécurité ;
- nouveau besoin business ;
- membre clé indisponible.

Tu dois réviser ton modèle sans effacer ton raisonnement précédent.

## Preuve attendue

Le livrable doit contenir :

```text
PROBLÈME
→ HYPOTHÈSE
→ MÉCANISME
→ DÉCISION
→ OBSERVATION CONTRADICTOIRE
→ RÉVISION
→ NOUVELLE DÉCISION
→ TRANSFERT
→ LIMITE
```

## Gate

Tu échoues si tu peux réussir uniquement en reconnaissant un template.

Tu dois notamment être capable de répondre sans documentation à :

> Quelle information nouvelle rendrait ton conseil mauvais ?

> Qu'est-ce qui reste vrai si je supprime l'outil ?

> Qu'est-ce qui change si mon hypothèse centrale est fausse ?

> Pourquoi pourrais-je défendre l'inverse sans me contredire ?

## Ce que cette épreuve ne prouve pas

Une bonne réponse ici ne prouve pas à elle seule un niveau Staff professionnel. Elle constitue une preuve de **transfert observé** dans le cadre du parcours.
