---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [changement_echelle, defaut_cache]
anti_recipe_key: changement_echelle+defaut_cache
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Bloc 21-25 : API, sécu, IA, DB, scalabilité

Temps de lecture ~5 min

## Rétrospective guidée

- Qu'est-ce qui, dans le bloc, a été **le plus dur à intégrer** ?
- Cite **1 décision** que tu regrettes.
- Cite **1 décision** que tu re-prendrais.

## Mini-défi de re-contextualisation

Prends un exercice d'un module **antérieur au bloc** et refais-le avec les outils du bloc courant. Écris ce qui change.

## Rétro-ADR

Compare ton temps et ta confiance sur ce bloc (21-25) à ceux du bloc précédent.

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
