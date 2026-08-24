---
stability: intemporel
acte: construction
noyau: oui
cognitive_level: L3
perturbation_modes: [changement_contexte, decision_organisationnelle]
anti_recipe_key: changement_contexte+decision_organisationnelle
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Contrôle d'entrée : DDD et contrats

<!-- AF-DIAGRAM:ddd -->

```text
┌────────────────────┐     ┌────────────────────┐
│ Context A           │     │ Context B          │
│ Order / Customer    │◄───►│ Billing / Payment  │
└────────────────────┘     └────────────────────┘
          ▲                          ▲
          └──── contrats explicites ─┘
```

Les bounded contexts isolent des modèles locaux et relient les domaines par des contrats explicites.

Temps de lecture ~2 min

Réponds sans ouvrir un autre fichier. Une seule réponse fausse = tu retournes au module cité.

1. Cite deux différences concrètes entre une architecture en couches et une architecture hexagonale.
   → sinon `../14-ARCHITECTURE-PATTERNS/`.
2. Donne le code HTTP correct d'une réponse à une requête bien formée mais métier-invalide.
   → sinon `../../01-CADRAGE/04-ERROR-HANDLING/03-custom_errors.md` (erreur métier typée puis traduite en statut).
3. Explique en une phrase pourquoi un test de contrat n'est pas un test d'intégration.
   → sinon `../03-TESTING/08-contract_testing_pact.md`.
4. Sais-tu écrire un ADR (contexte, décision, conséquences, date) ? → sinon `../15-ARCHI-LAB/`.
5. Ton fil rouge expose-t-il aujourd'hui au moins un point d'entrée consommé par autre chose que ton
   propre front ? Si non, tu joueras le module avec un consommateur simulé, décrit dans `95-challenge.md`.

## Case de sortie

- [ ] Les cinq points sont tenus, ou les renvois sont faits.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.
