---
stability: stable
acte: preuve
noyau: oui
route_family: core
---

# 27 : MATRICE DES PREUVES CORE

> La sortie Staff ne se valide pas par couverture documentaire. Les six familles **S1–S6** doivent traverser **production → perturbation → transfert → défense**. **S7 est une preuve transversale obligatoire de transfert, pas une septième famille.**

| Famille               | Production                     | Perturbation                  | Transfert               | Défense                                |
| --------------------- | ------------------------------ | ----------------------------- | ----------------------- | -------------------------------------- |
| S1 Systèmes           | système mesuré                 | charge/incident               | autre stack             | pourquoi cette capacité est suffisante |
| S2 Architecture       | ADR + diagramme                | spec drift                    | autre contexte          | meilleur argument contre               |
| S3 Sécurité/fiabilité | threat model + SLO             | panne/attaque                 | nouvelle surface        | coût du risque restant                 |
| S4 Produit/coût       | décision chiffrée              | budget ou priorité modifiée   | autre marché            | sacrifice assumé                       |
| S5 Leadership         | stratégie + message            | partie prenante opposée       | autre organisation      | objection en direct                    |
| S6 IA                 | prompts + reviews + garde-fous | proposition IA contradictoire | autre fournisseur/outil | pourquoi ne pas déléguer               |
| S7 Transfert (transversal) | portage hors stack         | contrainte cassant un invariant | nouveau contexte     | ce qui reste invariant / ce qui change |

## Gate de compétence

Une famille ne ferme pas sur une bonne réponse écrite seule.

Il faut pouvoir montrer :

```text
J'ai produit
→ j'ai rencontré une contrainte
→ j'ai transféré le principe
→ j'ai défendu et/ou révisé la décision
```

## Gate de transfert

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

Le transfert doit changer au moins **deux** dimensions parmi :

- technologie ;
- objectif ;
- budget ;
- volume ;
- organisation ;
- modèle de défaillance ;
- utilisateur ;
- contrainte réglementaire.

Un simple changement de nom de variable ne compte pas.

## Gate anti-illusion

Une compétence critique n'est pas considérée acquise si l'apprenant :

- suit un arbre de décision fourni ;
- recopie une architecture de référence ;
- reconnaît exactement un exercice déjà vu ;
- répond correctement mais ne peut pas expliquer ce qui l'aurait fait changer d'avis ;
- ne sait pas donner un contexte où sa solution devient mauvaise.

## Gate de sortie

La soutenance finale doit choisir **au moins une décision réellement révisée** pendant le parcours et montrer la chaîne :

```text
croyance initiale
→ preuve contraire
→ révision
→ nouvelle décision
→ conséquence
→ leçon transférable
```
