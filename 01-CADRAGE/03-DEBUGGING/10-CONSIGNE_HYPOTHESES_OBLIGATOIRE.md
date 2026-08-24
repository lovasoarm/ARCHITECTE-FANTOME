---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [solution_concurrente, defaut_cache]
anti_recipe_key: solution_concurrente+defaut_cache
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : mur de siège :** le bug n'est pas “où ça a explosé ?”, mais “où la première fissure est-elle apparue ?”. Ici, chaque log, test et reproduction est une empreinte dans le mur.

# CONSIGNE : HYPOTHESES.md OBLIGATOIRE

Temps de lecture ~2 min

> Application generale de la Partie O du referentiel.
> Tout EXO du module `01-CADRAGE/03-DEBUGGING` (et tout EXO tagge `[HYP]` ailleurs) livre un `HYPOTHESES.md`.

## Format minimal (copie/colle)

```md
# HYPOTHESES.md

## Contexte

- symptome observe :
- environnement :
- ce que je peux reproduire deterministe :

## Hypothese 1

- enonce :
- test qui la falsifie :
- resultat du test :
- verdict : VRAIE / FAUSSE / INDECISE

## Hypothese 2

...

## Cause racine confirmee

- preuve reproductible :
- correctif applique :
- test de non-regression ajoute :
```

## Regle non negociable

Aucun fix commite sans `HYPOTHESES.md` a jour. Un fix sans hypothese ecrite = coup de chance, pas competence.

## Exemple rempli

Voir `_EXEMPLE_HYPOTHESES.md` a cote (cas reel : fuite memoire par closure).

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?
