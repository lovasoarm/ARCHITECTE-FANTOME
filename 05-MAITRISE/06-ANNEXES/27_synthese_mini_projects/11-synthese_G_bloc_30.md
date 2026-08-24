---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [constraints_injectees, preuve_partielle]
anti_recipe_key: constraints_injectees+preuve_partielle
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Bloc 26-30 : observabilité, équipe, edge cases, agents IA, mini-projets

Temps de lecture ~5 min

## Rétrospective guidée

- Qu'est-ce qui, dans le bloc, a été **le plus dur à intégrer** ?
- Cite **1 décision** que tu regrettes.
- Cite **1 décision** que tu re-prendrais.
- Sur `05-MAITRISE/03-EDGE-CASES` : quel contrat (droits, refus, escalade) as-tu donné à ton agent ? Qu'est-ce qu'il a fait que tu n'avais pas prévu ?

## Mini-défi de re-contextualisation

Prends un exercice d'un module **antérieur au bloc** et refais-le avec les outils du bloc courant. Écris ce qui change.

## Rétro-ADR

Compile un rapport portfolio (voir 05-MAITRISE/06-ANNEXES/15-generate_portfolio_report.md).

## Question rituelle

> Relis ton ADR le plus ancien. Qu'est-ce que tu changerais aujourd'hui ? Pourquoi ?

## Chaos Day (si applicable)

Contraintes qui peuvent tomber :

1. "Le client veut du temps réel."
2. "On supprime la DB, tout en mémoire."
3. "L'API doit être idempotente."
4. "Un dev quitte, tu récupères son module sans doc."
5. "La sécu impose CSP strict."

Chaque changement → nouvel ADR (max 1 page).

---

> **Rappel `DEPENDENCY_LEDGER`** : avant de clore ce bloc, ouvre `09-DEPENDENCY_LEDGER.md` à la racine et ajoute une ligne par outil IA utilisé (quoi, quand, pourquoi, combien de temps gagné/perdu). Silence = drift.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.
